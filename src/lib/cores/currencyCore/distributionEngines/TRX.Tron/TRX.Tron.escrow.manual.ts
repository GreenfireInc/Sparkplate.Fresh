/**
 * Tron (TRX) Manual Escrow System for Peer-to-Peer Gaming
 * Server-managed escrow with encrypted private keys
 */

import TronWeb from 'tronweb';
import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';

export interface Match {
  matchId: string;
  escrowAddress: string;
  encryptedPrivateKey: string;
  buyInAmount: number;
  players: Player[];
  settled: boolean;
  createdAt: Date;
  network: 'mainnet' | 'shasta' | 'nile';
}

export interface Player {
  walletAddress: string;
  deposited: boolean;
  depositAmount: number;
  joinedAt: Date;
}

export interface GameConfig {
  buyInAmount: number;
  network: 'mainnet' | 'shasta' | 'nile';
  maxPlayers: number;
}

export interface DistributionResult {
  success: boolean;
  txId?: string;
  error?: string;
}

export class TronGameEscrow {
  private tronWeb: TronWeb;
  private machineSecret: string;
  private network: 'mainnet' | 'shasta' | 'nile';

  constructor(network: 'mainnet' | 'shasta' | 'nile' = 'mainnet', machineSecret?: string) {
    this.network = network;
    this.machineSecret = machineSecret || process.env.MACHINE_SECRET || 'default-machine-secret';

    const fullHost = this.getFullHost(network);

    this.tronWeb = new TronWeb({
      fullHost,
    });
  }

  private getFullHost(network: 'mainnet' | 'shasta' | 'nile'): string {
    switch (network) {
      case 'mainnet':
        return 'https://api.trongrid.io';
      case 'shasta':
        return 'https://api.shasta.trongrid.io';
      case 'nile':
        return 'https://nile.trongrid.io';
    }
  }

  private encrypt(text: string, secret: string): string {
    const algorithm = 'aes-256-gcm';
    const salt = randomBytes(16);
    const key = scryptSync(secret, salt, 32);
    const iv = randomBytes(16);

    const cipher = createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag();

    return JSON.stringify({
      encrypted,
      salt: salt.toString('hex'),
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex'),
    });
  }

  private decrypt(encryptedData: string, secret: string): string {
    const algorithm = 'aes-256-gcm';
    const data = JSON.parse(encryptedData);

    const salt = Buffer.from(data.salt, 'hex');
    const iv = Buffer.from(data.iv, 'hex');
    const authTag = Buffer.from(data.authTag, 'hex');
    const key = scryptSync(secret, salt, 32);

    const decipher = createDecipheriv(algorithm, key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(data.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }

  async createEscrow(matchId: string, buyInAmount: number): Promise<Match> {
    try {
      const account = await this.tronWeb.createAccount();
      const address = account.address.base58;
      const privateKey = account.privateKey;

      const encryptedPrivateKey = this.encrypt(privateKey, this.machineSecret);

      console.log(`🧾 Created escrow wallet for match ${matchId}`);
      console.log(`   Address: ${address}`);
      console.log(`   Players must deposit: ${buyInAmount} TRX`);

      return {
        matchId,
        escrowAddress: address,
        encryptedPrivateKey,
        buyInAmount,
        players: [],
        settled: false,
        createdAt: new Date(),
        network: this.network,
      };
    } catch (error) {
      throw new Error(`Failed to create escrow: ${error}`);
    }
  }

  addPlayer(match: Match, walletAddress: string): void {
    if (match.players.length >= 2) {
      throw new Error('Match is full');
    }

    if (match.players.find((p) => p.walletAddress === walletAddress)) {
      throw new Error('Player already joined');
    }

    match.players.push({
      walletAddress,
      deposited: false,
      depositAmount: 0,
      joinedAt: new Date(),
    });

    console.log(`👤 Player ${walletAddress} joined match ${match.matchId}`);
  }

  async checkDeposits(match: Match): Promise<boolean> {
    try {
      const balance = await this.tronWeb.trx.getBalance(match.escrowAddress);
      const balanceTrx = balance / 1_000_000;

      const requiredAmount = match.buyInAmount * match.players.length;

      if (balanceTrx >= requiredAmount) {
        match.players.forEach((player) => {
          player.deposited = true;
          player.depositAmount = match.buyInAmount;
        });

        console.log(`✅ All deposits confirmed for match ${match.matchId}`);
        console.log(`   Total balance: ${balanceTrx} TRX`);

        return true;
      }

      console.log(`⏳ Waiting for deposits: ${balanceTrx}/${requiredAmount} TRX`);
      return false;
    } catch (error) {
      throw new Error(`Failed to check deposits: ${error}`);
    }
  }

  async distributePot(match: Match, winnerAddress: string): Promise<DistributionResult> {
    try {
      if (match.settled) {
        return {
          success: false,
          error: 'Match already settled',
        };
      }

      if (!match.players.find((p) => p.walletAddress === winnerAddress)) {
        return {
          success: false,
          error: 'Winner not in match',
        };
      }

      const balance = await this.tronWeb.trx.getBalance(match.escrowAddress);

      if (balance === 0) {
        return {
          success: false,
          error: 'Escrow is empty',
        };
      }

      const privateKey = this.decrypt(match.encryptedPrivateKey, this.machineSecret);

      const escrowTronWeb = new TronWeb({
        fullHost: this.getFullHost(match.network),
        privateKey,
      });

      const tx = await escrowTronWeb.transactionBuilder.sendTrx(winnerAddress, balance);
      const signedTx = await escrowTronWeb.trx.sign(tx);
      const result = await escrowTronWeb.trx.sendRawTransaction(signedTx);

      if (!result.result) {
        throw new Error(result.message || 'Transaction failed');
      }

      match.settled = true;

      const balanceTrx = balance / 1_000_000;

      console.log(`🏆 Pot of ${balanceTrx} TRX sent to winner ${winnerAddress}`);
      console.log(`   Transaction: ${result.txid}`);

      return {
        success: true,
        txId: result.txid,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async getEscrowBalance(match: Match): Promise<number> {
    try {
      const balance = await this.tronWeb.trx.getBalance(match.escrowAddress);
      return balance / 1_000_000;
    } catch (error) {
      throw new Error(`Failed to get balance: ${error}`);
    }
  }
}

export class GameServer {
  private escrow: TronGameEscrow;
  private matches: Map<string, Match> = new Map();
  private gameConfig: GameConfig;

  constructor(gameConfig: GameConfig, machineSecret?: string) {
    this.gameConfig = gameConfig;
    this.escrow = new TronGameEscrow(gameConfig.network, machineSecret);
  }

  async createMatch(matchId?: string): Promise<Match> {
    const id = matchId || `trx_match_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const match = await this.escrow.createEscrow(id, this.gameConfig.buyInAmount);
    this.matches.set(id, match);

    console.log(`\n🎮 Match created: ${id}`);
    console.log(`   Escrow address: ${match.escrowAddress}`);
    console.log(`   Buy-in: ${this.gameConfig.buyInAmount} TRX per player`);

    return match;
  }

  joinMatch(matchId: string, walletAddress: string): void {
    const match = this.matches.get(matchId);

    if (!match) {
      throw new Error('Match not found');
    }

    this.escrow.addPlayer(match, walletAddress);
  }

  async checkMatchReady(matchId: string): Promise<boolean> {
    const match = this.matches.get(matchId);

    if (!match) {
      throw new Error('Match not found');
    }

    if (match.players.length < this.gameConfig.maxPlayers) {
      console.log(`⏳ Waiting for ${this.gameConfig.maxPlayers - match.players.length} more player(s)`);
      return false;
    }

    return await this.escrow.checkDeposits(match);
  }

  async settleMatch(matchId: string, winnerAddress: string): Promise<DistributionResult> {
    const match = this.matches.get(matchId);

    if (!match) {
      return {
        success: false,
        error: 'Match not found',
      };
    }

    return await this.escrow.distributePot(match, winnerAddress);
  }

  getMatch(matchId: string): Match | undefined {
    return this.matches.get(matchId);
  }

  getAllMatches(): Match[] {
    return Array.from(this.matches.values());
  }

  async getMatchBalance(matchId: string): Promise<number> {
    const match = this.matches.get(matchId);

    if (!match) {
      throw new Error('Match not found');
    }

    return await this.escrow.getEscrowBalance(match);
  }
}

export default GameServer;
