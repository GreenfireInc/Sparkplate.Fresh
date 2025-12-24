/**
 * Tezos (XTZ) Manual Escrow System for Peer-to-Peer Gaming
 * Server-managed escrow with encrypted private keys
 */

import { TezosToolkit, MichelCodecPacker } from '@taquito/taquito';
import { InMemorySigner, importKey } from '@taquito/signer';
import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';

export interface Match {
  matchId: string;
  escrowAddress: string;
  encryptedPrivateKey: string;
  buyInAmount: number;
  players: Player[];
  settled: boolean;
  createdAt: Date;
  network: 'mainnet' | 'testnet';
}

export interface Player {
  walletAddress: string;
  deposited: boolean;
  depositAmount: number;
  joinedAt: Date;
}

export interface GameConfig {
  buyInAmount: number;
  network: 'mainnet' | 'testnet';
  maxPlayers: number;
}

export interface DistributionResult {
  success: boolean;
  txHash?: string;
  error?: string;
}

export class TezosGameEscrow {
  private tezos: TezosToolkit;
  private machineSecret: string;
  private network: 'mainnet' | 'testnet';

  constructor(network: 'mainnet' | 'testnet' = 'mainnet', machineSecret?: string) {
    this.network = network;
    this.machineSecret = machineSecret || process.env.MACHINE_SECRET || 'default-machine-secret';

    const rpcUrl = this.getRpcUrl(network);
    this.tezos = new TezosToolkit(rpcUrl);
    this.tezos.setPackerProvider(new MichelCodecPacker());
  }

  private getRpcUrl(network: 'mainnet' | 'testnet'): string {
    switch (network) {
      case 'mainnet':
        return 'https://mainnet.api.tez.ie';
      case 'testnet':
        return 'https://ghostnet.ecadinfra.com';
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
      const signer = await InMemorySigner.fromFundraiser(
        'your@email.com',
        'password',
        randomBytes(15).toString('hex')
      );

      const escrowAddress = await signer.publicKeyHash();
      const escrowPrivateKey = await signer.secretKey();

      const encryptedPrivateKey = this.encrypt(escrowPrivateKey, this.machineSecret);

      console.log(`🧾 Created escrow wallet for match ${matchId}`);
      console.log(`   Address: ${escrowAddress}`);
      console.log(`   Players must deposit: ${buyInAmount} XTZ`);
      console.log(`   ⚠️  Note: Escrow account needs to be revealed (funded with >0.257 XTZ)`);

      return {
        matchId,
        escrowAddress,
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
      const balance = await this.tezos.tz.getBalance(match.escrowAddress);
      const balanceTez = balance.toNumber() / 1000000;

      const requiredAmount = match.buyInAmount * match.players.length + 0.257;

      if (balanceTez >= requiredAmount) {
        match.players.forEach((player) => {
          player.deposited = true;
          player.depositAmount = match.buyInAmount;
        });

        console.log(`✅ All deposits confirmed for match ${match.matchId}`);
        console.log(`   Total balance: ${balanceTez} XTZ`);

        return true;
      }

      console.log(`⏳ Waiting for deposits: ${balanceTez}/${requiredAmount} XTZ`);
      return false;
    } catch (error: any) {
      if (error.message && error.message.includes('not found')) {
        console.log(`⏳ Escrow account not yet funded`);
        return false;
      }
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

      const privateKey = this.decrypt(match.encryptedPrivateKey, this.machineSecret);

      this.tezos.setProvider({
        signer: await InMemorySigner.fromSecretKey(privateKey),
      });

      const balance = await this.tezos.tz.getBalance(match.escrowAddress);
      const balanceTez = balance.toNumber() / 1000000;

      const minReserve = 0.257;
      const availableBalance = balanceTez - minReserve - 0.001;

      if (availableBalance <= 0) {
        return {
          success: false,
          error: 'Insufficient balance after reserve',
        };
      }

      const operation = await this.tezos.contract.transfer({
        to: winnerAddress,
        amount: availableBalance,
      });

      await operation.confirmation();

      match.settled = true;

      console.log(`🏆 Pot of ${availableBalance.toFixed(6)} XTZ sent to winner ${winnerAddress}`);
      console.log(`   Transaction: ${operation.hash}`);

      return {
        success: true,
        txHash: operation.hash,
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
      const balance = await this.tezos.tz.getBalance(match.escrowAddress);
      return balance.toNumber() / 1000000;
    } catch (error: any) {
      if (error.message && error.message.includes('not found')) {
        return 0;
      }
      throw new Error(`Failed to get balance: ${error}`);
    }
  }
}

export class GameServer {
  private escrow: TezosGameEscrow;
  private matches: Map<string, Match> = new Map();
  private gameConfig: GameConfig;

  constructor(gameConfig: GameConfig, machineSecret?: string) {
    this.gameConfig = gameConfig;
    this.escrow = new TezosGameEscrow(gameConfig.network, machineSecret);
  }

  async createMatch(matchId?: string): Promise<Match> {
    const id = matchId || `xtz_match_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const match = await this.escrow.createEscrow(id, this.gameConfig.buyInAmount);
    this.matches.set(id, match);

    console.log(`\n🎮 Match created: ${id}`);
    console.log(`   Escrow address: ${match.escrowAddress}`);
    console.log(`   Buy-in: ${this.gameConfig.buyInAmount} XTZ per player`);

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
