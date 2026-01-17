/**
 * Waves (WAVES) Manual Escrow System for Peer-to-Peer Gaming
 * Server-managed escrow with encrypted private keys
 */

import { transfer, broadcast, ITransferParams } from '@waves/waves-transactions';
import { randomSeed, address, privateKey as derivePrivateKey } from '@waves/waves-crypto';
import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';
import axios from 'axios';

export interface Match {
  matchId: string;
  escrowAddress: string;
  encryptedSeed: string;
  buyInAmount: number;
  players: Player[];
  settled: boolean;
  createdAt: Date;
  network: 'mainnet' | 'testnet' | 'stagenet';
  chainId: 'W' | 'T' | 'S';
}

export interface Player {
  walletAddress: string;
  deposited: boolean;
  depositAmount: number;
  joinedAt: Date;
}

export interface GameConfig {
  buyInAmount: number;
  network: 'mainnet' | 'testnet' | 'stagenet';
  maxPlayers: number;
}

export interface DistributionResult {
  success: boolean;
  txId?: string;
  error?: string;
}

export class WavesGameEscrow {
  private nodeUrl: string;
  private machineSecret: string;
  private network: 'mainnet' | 'testnet' | 'stagenet';
  private chainId: 'W' | 'T' | 'S';

  constructor(
    network: 'mainnet' | 'testnet' | 'stagenet' = 'mainnet',
    machineSecret?: string
  ) {
    this.network = network;
    this.machineSecret = machineSecret || process.env.MACHINE_SECRET || 'default-machine-secret';
    this.chainId = this.getChainId(network);
    this.nodeUrl = this.getNodeUrl(network);
  }

  private getChainId(network: 'mainnet' | 'testnet' | 'stagenet'): 'W' | 'T' | 'S' {
    switch (network) {
      case 'mainnet':
        return 'W';
      case 'testnet':
        return 'T';
      case 'stagenet':
        return 'S';
    }
  }

  private getNodeUrl(network: 'mainnet' | 'testnet' | 'stagenet'): string {
    switch (network) {
      case 'mainnet':
        return 'https://nodes.wavesnodes.com';
      case 'testnet':
        return 'https://nodes-testnet.wavesnodes.com';
      case 'stagenet':
        return 'https://nodes-stagenet.wavesnodes.com';
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
      const seed = randomSeed();
      const escrowAddress = address(seed, this.chainId);
      
      const encryptedSeed = this.encrypt(seed, this.machineSecret);

      console.log(`🧾 Created escrow wallet for match ${matchId}`);
      console.log(`   Address: ${escrowAddress}`);
      console.log(`   Players must deposit: ${buyInAmount} WAVES`);

      return {
        matchId,
        escrowAddress,
        encryptedSeed,
        buyInAmount,
        players: [],
        settled: false,
        createdAt: new Date(),
        network: this.network,
        chainId: this.chainId,
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
      const response = await axios.get(
        `${this.nodeUrl}/addresses/balance/${match.escrowAddress}`
      );
      const balance = response.data.balance / 1e8;

      const requiredAmount = match.buyInAmount * match.players.length;

      if (balance >= requiredAmount) {
        match.players.forEach((player) => {
          player.deposited = true;
          player.depositAmount = match.buyInAmount;
        });

        console.log(`✅ All deposits confirmed for match ${match.matchId}`);
        console.log(`   Total balance: ${balance} WAVES`);

        return true;
      }

      console.log(`⏳ Waiting for deposits: ${balance}/${requiredAmount} WAVES`);
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

      const response = await axios.get(
        `${this.nodeUrl}/addresses/balance/${match.escrowAddress}`
      );
      const balance = response.data.balance;

      if (balance === 0) {
        return {
          success: false,
          error: 'Escrow is empty',
        };
      }

      const seed = this.decrypt(match.encryptedSeed, this.machineSecret);
      const privateKey = derivePrivateKey(seed);

      const fee = 100000;
      const amountToSend = balance - fee;

      const params: ITransferParams = {
        recipient: winnerAddress,
        amount: amountToSend,
        assetId: null,
        fee: fee,
        chainId: match.chainId,
      };

      const signedTx = transfer(params, privateKey);
      const result = await broadcast(signedTx, this.nodeUrl);

      match.settled = true;

      const balanceWaves = balance / 1e8;

      console.log(`🏆 Pot of ${balanceWaves} WAVES sent to winner ${winnerAddress}`);
      console.log(`   Transaction: ${result.id}`);

      return {
        success: true,
        txId: result.id,
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
      const response = await axios.get(
        `${this.nodeUrl}/addresses/balance/${match.escrowAddress}`
      );
      return response.data.balance / 1e8;
    } catch (error) {
      throw new Error(`Failed to get balance: ${error}`);
    }
  }
}

export class GameServer {
  private escrow: WavesGameEscrow;
  private matches: Map<string, Match> = new Map();
  private gameConfig: GameConfig;

  constructor(gameConfig: GameConfig, machineSecret?: string) {
    this.gameConfig = gameConfig;
    this.escrow = new WavesGameEscrow(gameConfig.network, machineSecret);
  }

  async createMatch(matchId?: string): Promise<Match> {
    const id = matchId || `waves_match_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const match = await this.escrow.createEscrow(id, this.gameConfig.buyInAmount);
    this.matches.set(id, match);

    console.log(`\n🎮 Match created: ${id}`);
    console.log(`   Escrow address: ${match.escrowAddress}`);
    console.log(`   Buy-in: ${this.gameConfig.buyInAmount} WAVES per player`);

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
