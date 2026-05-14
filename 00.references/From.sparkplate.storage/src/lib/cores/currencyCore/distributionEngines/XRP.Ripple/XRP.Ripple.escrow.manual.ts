/**
 * Ripple (XRP) Manual Escrow System for Peer-to-Peer Gaming
 * Server-managed escrow with encrypted seeds
 */

import {
  Client,
  Wallet,
  xrpToDrops,
  dropsToXrp,
} from 'xrpl';
import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';

export interface Match {
  matchId: string;
  escrowAddress: string;
  encryptedSeed: string;
  buyInAmount: number;
  players: Player[];
  settled: boolean;
  createdAt: Date;
  network: 'mainnet' | 'testnet' | 'devnet';
}

export interface Player {
  walletAddress: string;
  deposited: boolean;
  depositAmount: number;
  joinedAt: Date;
}

export interface GameConfig {
  buyInAmount: number;
  network: 'mainnet' | 'testnet' | 'devnet';
  maxPlayers: number;
}

export interface DistributionResult {
  success: boolean;
  txHash?: string;
  error?: string;
}

export class RippleGameEscrow {
  private client: Client;
  private machineSecret: string;
  private network: 'mainnet' | 'testnet' | 'devnet';

  constructor(
    network: 'mainnet' | 'testnet' | 'devnet' = 'mainnet',
    machineSecret?: string
  ) {
    this.network = network;
    this.machineSecret = machineSecret || process.env.MACHINE_SECRET || 'default-machine-secret';

    const serverUrl = this.getServerUrl(network);
    this.client = new Client(serverUrl);
  }

  private getServerUrl(network: 'mainnet' | 'testnet' | 'devnet'): string {
    switch (network) {
      case 'mainnet':
        return 'wss://xrplcluster.com';
      case 'testnet':
        return 'wss://s.altnet.rippletest.net:51233';
      case 'devnet':
        return 'wss://s.devnet.rippletest.net:51233';
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
      const wallet = Wallet.generate();
      const escrowAddress = wallet.address;
      const escrowSeed = wallet.seed;

      const encryptedSeed = this.encrypt(escrowSeed, this.machineSecret);

      console.log(`🧾 Created escrow wallet for match ${matchId}`);
      console.log(`   Address: ${escrowAddress}`);
      console.log(`   Players must deposit: ${buyInAmount} XRP`);
      console.log(`   ⚠️  Note: Escrow account needs to be funded with 10 XRP minimum reserve`);

      return {
        matchId,
        escrowAddress,
        encryptedSeed,
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
      if (!this.client.isConnected()) {
        await this.client.connect();
      }

      const response = await this.client.request({
        command: 'account_info',
        account: match.escrowAddress,
        ledger_index: 'validated',
      });

      const balance = parseFloat(dropsToXrp(response.result.account_data.Balance));
      const requiredAmount = match.buyInAmount * match.players.length + 10;

      if (balance >= requiredAmount) {
        match.players.forEach((player) => {
          player.deposited = true;
          player.depositAmount = match.buyInAmount;
        });

        console.log(`✅ All deposits confirmed for match ${match.matchId}`);
        console.log(`   Total balance: ${balance} XRP`);

        return true;
      }

      console.log(`⏳ Waiting for deposits: ${balance}/${requiredAmount} XRP`);
      return false;
    } catch (error: any) {
      if (error.data && error.data.error === 'actNotFound') {
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

      const seed = this.decrypt(match.encryptedSeed, this.machineSecret);
      const wallet = Wallet.fromSeed(seed);

      if (!this.client.isConnected()) {
        await this.client.connect();
      }

      const accountResponse = await this.client.request({
        command: 'account_info',
        account: wallet.address,
        ledger_index: 'validated',
      });

      const balance = parseFloat(dropsToXrp(accountResponse.result.account_data.Balance));
      const minReserve = 10.0;
      const fee = 0.000012;
      const availableBalance = balance - minReserve - fee;

      if (availableBalance <= 0) {
        return {
          success: false,
          error: 'Insufficient balance after reserve',
        };
      }

      const payment: any = {
        TransactionType: 'Payment',
        Account: wallet.address,
        Amount: xrpToDrops(availableBalance.toFixed(6)),
        Destination: winnerAddress,
      };

      const prepared = await this.client.autofill(payment);
      const signed = wallet.sign(prepared);
      const result = await this.client.submitAndWait(signed.tx_blob);

      match.settled = true;

      console.log(`🏆 Pot of ${availableBalance.toFixed(6)} XRP sent to winner ${winnerAddress}`);
      console.log(`   Transaction: ${result.result.hash}`);

      return {
        success: true,
        txHash: result.result.hash,
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
      if (!this.client.isConnected()) {
        await this.client.connect();
      }

      const response = await this.client.request({
        command: 'account_info',
        account: match.escrowAddress,
        ledger_index: 'validated',
      });

      return parseFloat(dropsToXrp(response.result.account_data.Balance));
    } catch (error: any) {
      if (error.data && error.data.error === 'actNotFound') {
        return 0;
      }
      throw new Error(`Failed to get balance: ${error}`);
    }
  }

  async cleanup(): Promise<void> {
    if (this.client.isConnected()) {
      await this.client.disconnect();
    }
  }
}

export class GameServer {
  private escrow: RippleGameEscrow;
  private matches: Map<string, Match> = new Map();
  private gameConfig: GameConfig;

  constructor(gameConfig: GameConfig, machineSecret?: string) {
    this.gameConfig = gameConfig;
    this.escrow = new RippleGameEscrow(gameConfig.network, machineSecret);
  }

  async createMatch(matchId?: string): Promise<Match> {
    const id = matchId || `xrp_match_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const match = await this.escrow.createEscrow(id, this.gameConfig.buyInAmount);
    this.matches.set(id, match);

    console.log(`\n🎮 Match created: ${id}`);
    console.log(`   Escrow address: ${match.escrowAddress}`);
    console.log(`   Buy-in: ${this.gameConfig.buyInAmount} XRP per player`);

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

  async cleanup(): Promise<void> {
    await this.escrow.cleanup();
  }
}

export default GameServer;
