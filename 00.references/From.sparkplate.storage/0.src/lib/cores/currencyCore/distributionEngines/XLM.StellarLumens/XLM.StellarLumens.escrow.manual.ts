/**
 * Stellar Lumens (XLM) Manual Escrow System for Peer-to-Peer Gaming
 * Server-managed escrow with encrypted keypairs
 */

import {
  Server,
  Keypair,
  TransactionBuilder,
  Networks,
  Operation,
  Asset,
} from 'stellar-sdk';
import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';

export interface Match {
  matchId: string;
  escrowPublicKey: string;
  encryptedSecretKey: string;
  buyInAmount: number;
  players: Player[];
  settled: boolean;
  createdAt: Date;
  network: 'public' | 'testnet';
}

export interface Player {
  walletAddress: string;
  deposited: boolean;
  depositAmount: number;
  joinedAt: Date;
}

export interface GameConfig {
  buyInAmount: number;
  network: 'public' | 'testnet';
  maxPlayers: number;
}

export interface DistributionResult {
  success: boolean;
  txHash?: string;
  error?: string;
}

export class StellarGameEscrow {
  private server: Server;
  private machineSecret: string;
  private network: 'public' | 'testnet';
  private networkPassphrase: string;

  constructor(network: 'public' | 'testnet' = 'public', machineSecret?: string) {
    this.network = network;
    this.machineSecret = machineSecret || process.env.MACHINE_SECRET || 'default-machine-secret';

    const horizonUrl = network === 'public'
      ? 'https://horizon.stellar.org'
      : 'https://horizon-testnet.stellar.org';

    this.server = new Server(horizonUrl);
    this.networkPassphrase = network === 'public'
      ? Networks.PUBLIC
      : Networks.TESTNET;
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
      const escrowKeypair = Keypair.random();
      const escrowPublicKey = escrowKeypair.publicKey();
      const escrowSecretKey = escrowKeypair.secret();

      const encryptedSecretKey = this.encrypt(escrowSecretKey, this.machineSecret);

      console.log(`🧾 Created escrow wallet for match ${matchId}`);
      console.log(`   Public Key: ${escrowPublicKey}`);
      console.log(`   Players must deposit: ${buyInAmount} XLM`);
      console.log(`   ⚠️  Note: Escrow account needs to be funded with 1 XLM minimum reserve`);

      return {
        matchId,
        escrowPublicKey,
        encryptedSecretKey,
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
      const account = await this.server.loadAccount(match.escrowPublicKey);
      
      const xlmBalance = account.balances.find(
        (balance) => balance.asset_type === 'native'
      );

      if (!xlmBalance) {
        console.log(`⏳ Escrow account not yet funded`);
        return false;
      }

      const balance = parseFloat(xlmBalance.balance);
      const requiredAmount = match.buyInAmount * match.players.length + 1;

      if (balance >= requiredAmount) {
        match.players.forEach((player) => {
          player.deposited = true;
          player.depositAmount = match.buyInAmount;
        });

        console.log(`✅ All deposits confirmed for match ${match.matchId}`);
        console.log(`   Total balance: ${balance} XLM`);

        return true;
      }

      console.log(`⏳ Waiting for deposits: ${balance}/${requiredAmount} XLM`);
      return false;
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        console.log(`⏳ Escrow account not yet created on network`);
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

      const secretKey = this.decrypt(match.encryptedSecretKey, this.machineSecret);
      const escrowKeypair = Keypair.fromSecret(secretKey);

      const account = await this.server.loadAccount(escrowKeypair.publicKey());

      const xlmBalance = account.balances.find(
        (balance) => balance.asset_type === 'native'
      );

      if (!xlmBalance) {
        return {
          success: false,
          error: 'Escrow has no balance',
        };
      }

      const balance = parseFloat(xlmBalance.balance);
      const minReserve = 1.0;
      const availableBalance = balance - minReserve - 0.00001;

      if (availableBalance <= 0) {
        return {
          success: false,
          error: 'Insufficient balance after reserve',
        };
      }

      const baseFee = await this.server.fetchBaseFee();

      const transaction = new TransactionBuilder(account, {
        fee: baseFee.toString(),
        networkPassphrase: this.networkPassphrase,
      })
        .addOperation(
          Operation.payment({
            destination: winnerAddress,
            asset: Asset.native(),
            amount: availableBalance.toFixed(7),
          })
        )
        .setTimeout(30)
        .build();

      transaction.sign(escrowKeypair);

      const result = await this.server.submitTransaction(transaction);

      match.settled = true;

      console.log(`🏆 Pot of ${availableBalance} XLM sent to winner ${winnerAddress}`);
      console.log(`   Transaction: ${result.hash}`);

      return {
        success: true,
        txHash: result.hash,
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
      const account = await this.server.loadAccount(match.escrowPublicKey);
      
      const xlmBalance = account.balances.find(
        (balance) => balance.asset_type === 'native'
      );

      return xlmBalance ? parseFloat(xlmBalance.balance) : 0;
    } catch (error) {
      if (error instanceof Error && error.message.includes('404')) {
        return 0;
      }
      throw new Error(`Failed to get balance: ${error}`);
    }
  }
}

export class GameServer {
  private escrow: StellarGameEscrow;
  private matches: Map<string, Match> = new Map();
  private gameConfig: GameConfig;

  constructor(gameConfig: GameConfig, machineSecret?: string) {
    this.gameConfig = gameConfig;
    this.escrow = new StellarGameEscrow(gameConfig.network, machineSecret);
  }

  async createMatch(matchId?: string): Promise<Match> {
    const id = matchId || `xlm_match_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const match = await this.escrow.createEscrow(id, this.gameConfig.buyInAmount);
    this.matches.set(id, match);

    console.log(`\n🎮 Match created: ${id}`);
    console.log(`   Escrow address: ${match.escrowPublicKey}`);
    console.log(`   Buy-in: ${this.gameConfig.buyInAmount} XLM per player`);

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
