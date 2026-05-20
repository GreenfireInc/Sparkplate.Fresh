// Arweave Manual Escrow Distribution Engine
// Server-managed escrow system for two-party interactions (gaming, trading, etc.)
// The server creates and manages escrow wallets with encrypted private keys

// @ts-expect-error - arweave is a runtime dependency
import Arweave from 'arweave';
// @ts-expect-error - arweave types may not be available
import { JWKInterface } from 'arweave/node/lib/wallet';
import crypto from 'crypto';

/**
 * ESCROW MECHANISM OVERVIEW:
 * 
 * This module provides a server-side escrow system where:
 * - Server creates a unique escrow wallet for each match/game
 * - Both players deposit AR funds to the escrow address
 * - Server monitors deposits via Arweave network queries
 * - Winner receives the full pot (minus transaction fees)
 * - Private keys are encrypted at rest and never exposed to players
 */

export interface EscrowConfig {
  host?: string; // e.g., 'arweave.net'
  port?: number; // e.g., 443
  protocol?: string; // e.g., 'https'
  timeout?: number; // e.g., 20000
  storageKey: string; // Encryption key for storing escrow private keys
}

export interface Match {
  id: string;
  escrowAddr: string;
  encryptedEscrowKey: EncryptedKey;
  stakeWinstons: string; // Stake in Winston (smallest AR unit)
  players: Record<string, Player>;
  createdAt: number;
  hostMetadata?: unknown;
  status: 'waiting_for_players' | 'waiting_for_payments' | 'ready_to_start' | 'started' | 'finished';
  escrowBalance?: string; // Balance in Winston
  payoutTxId?: string;
  winnerAddr?: string;
}

export interface Player {
  addr: string;
  paid: boolean;
  paidTxId: string | null;
  joinedAt: number;
}

export interface EncryptedKey {
  salt: string;
  iv: string;
  tag: string;
  ciphertext: string;
}

/**
 * ArweaveEscrowManager - Server-side escrow management
 * Handles wallet creation, deposit tracking, and payout distribution
 */
export class ArweaveEscrowManager {
  private arweave: Arweave;
  private storageKey: string;
  private matches: Map<string, Match> = new Map();

  constructor(config: EscrowConfig) {
    this.arweave = Arweave.init({
      host: config.host || 'arweave.net',
      port: config.port || 443,
      protocol: config.protocol || 'https',
      timeout: config.timeout || 20000,
    });
    this.storageKey = config.storageKey;
  }

  /**
   * Create a new match with escrow wallet
   */
  async createMatch(stakeAR: number, hostMetadata?: unknown): Promise<Match> {
    // Generate new escrow account
    const escrowKey = await this.arweave.wallets.generate();
    const escrowAddr = await this.arweave.wallets.jwkToAddress(escrowKey);

    // Convert AR to Winston
    const stakeWinstons = this.arweave.ar.arToWinston(stakeAR.toString());

    // Encrypt and store private key
    const encrypted = this.encryptSecret(JSON.stringify(escrowKey));

    const matchId = this.generateId();
    const match: Match = {
      id: matchId,
      escrowAddr: escrowAddr,
      encryptedEscrowKey: encrypted,
      stakeWinstons: stakeWinstons,
      players: {},
      createdAt: Date.now(),
      hostMetadata: hostMetadata || null,
      status: 'waiting_for_players',
    };

    this.matches.set(matchId, match);
    return match;
  }

  /**
   * Player joins a match
   */
  addPlayer(matchId: string, playerAddr: string): { matchId: string; playerId: string; escrowAddr: string } {
    const match = this.matches.get(matchId);
    if (!match) throw new Error('Match not found');

    // Simple validation (43 characters for Arweave addresses)
    if (playerAddr.length !== 43) {
      throw new Error('Invalid Arweave address');
    }

    // Limit to two players
    if (Object.keys(match.players).length >= 2) {
      throw new Error('Match full');
    }

    const playerId = this.generateId();
    match.players[playerId] = {
      addr: playerAddr,
      paid: false,
      paidTxId: null,
      joinedAt: Date.now(),
    };

    // Update status
    if (Object.keys(match.players).length === 2) {
      match.status = 'waiting_for_payments';
    }

    return { matchId, playerId, escrowAddr: match.escrowAddr };
  }

  /**
   * Check match status and verify deposits
   */
  async checkMatchStatus(matchId: string): Promise<Match> {
    const match = this.matches.get(matchId);
    if (!match) throw new Error('Match not found');

    // Query escrow wallet balance
    const balanceWinston = await this.arweave.wallets.getBalance(match.escrowAddr);
    match.escrowBalance = balanceWinston;

    // Calculate expected pot (2 players * stake)
    const playerCount = Object.keys(match.players).length;
    const expectedPotWinstons = BigInt(match.stakeWinstons) * BigInt(playerCount);

    // Check if ready to start (both players paid)
    if (BigInt(balanceWinston) >= expectedPotWinstons && match.status === 'waiting_for_payments') {
      match.status = 'ready_to_start';
    }

    return match;
  }

  /**
   * Start the match (called by server when ready)
   */
  startMatch(matchId: string): Match {
    const match = this.matches.get(matchId);
    if (!match) throw new Error('Match not found');

    if (match.status !== 'ready_to_start') {
      throw new Error('Match not ready to start');
    }

    match.status = 'started';
    return match;
  }

  /**
   * Payout winner
   */
  async payoutWinner(matchId: string, winnerAddr: string): Promise<string> {
    const match = this.matches.get(matchId);
    if (!match) throw new Error('Match not found');

    if (winnerAddr.length !== 43) {
      throw new Error('Invalid winner address');
    }

    if (match.status === 'finished') {
      throw new Error('Match already finished');
    }

    // Decrypt escrow private key
    const escrowKeyJson = this.decryptSecret(match.encryptedEscrowKey);
    const escrowKey: JWKInterface = JSON.parse(escrowKeyJson);

    // Get current balance
    const balanceWinstons = await this.arweave.wallets.getBalance(match.escrowAddr);

    // Reserve a small amount for transaction fee (estimate)
    const feeWinstons = this.arweave.ar.arToWinston('0.001'); // 0.001 AR fee estimate
    const sendAmountWinstons = BigInt(balanceWinstons) - BigInt(feeWinstons);

    if (sendAmountWinstons <= BigInt(0)) {
      throw new Error('Insufficient funds to payout after fee');
    }

    // Create transaction
    const transaction = await this.arweave.createTransaction(
      {
        target: winnerAddr,
        quantity: sendAmountWinstons.toString(),
      },
      escrowKey
    );

    // Add tags for identification
    transaction.addTag('App-Name', 'ArweaveEscrowPayout');
    transaction.addTag('Match-ID', matchId);
    transaction.addTag('Payout-Type', 'Winner');

    // Sign and post transaction
    await this.arweave.transactions.sign(transaction, escrowKey);
    const response = await this.arweave.transactions.post(transaction);

    if (response.status !== 200 && response.status !== 202) {
      throw new Error(`Failed to post payout transaction: ${response.status}`);
    }

    const txId = transaction.id;

    // Update match status
    match.status = 'finished';
    match.payoutTxId = txId;
    match.winnerAddr = winnerAddr;

    return txId;
  }

  /**
   * Get match by ID
   */
  getMatch(matchId: string): Match | undefined {
    return this.matches.get(matchId);
  }

  /**
   * List all matches
   */
  listMatches(): Match[] {
    return Array.from(this.matches.values());
  }

  /**
   * Encrypt secret (JWK as string)
   */
  private encryptSecret(secretString: string): EncryptedKey {
    const salt = crypto.randomBytes(16);
    const key = crypto.pbkdf2Sync(this.storageKey, salt, 100000, 32, 'sha256');
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

    const ciphertext = Buffer.concat([
      cipher.update(Buffer.from(secretString, 'utf8')),
      cipher.final(),
    ]);
    const tag = cipher.getAuthTag();

    return {
      salt: salt.toString('base64'),
      iv: iv.toString('base64'),
      tag: tag.toString('base64'),
      ciphertext: ciphertext.toString('base64'),
    };
  }

  /**
   * Decrypt secret (returns JWK as string)
   */
  private decryptSecret(pkg: EncryptedKey): string {
    const salt = Buffer.from(pkg.salt, 'base64');
    const iv = Buffer.from(pkg.iv, 'base64');
    const tag = Buffer.from(pkg.tag, 'base64');
    const ciphertext = Buffer.from(pkg.ciphertext, 'base64');

    const key = crypto.pbkdf2Sync(this.storageKey, salt, 100000, 32, 'sha256');
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);

    const plain = Buffer.concat([decipher.update(ciphertext), decipher.final()]);

    return plain.toString('utf8');
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return crypto.randomBytes(16).toString('hex');
  }

  /**
   * Helper: Convert AR to Winston
   */
  arToWinston(ar: number): string {
    return this.arweave.ar.arToWinston(ar.toString());
  }

  /**
   * Helper: Convert Winston to AR
   */
  winstonToAr(winston: string): string {
    return this.arweave.ar.winstonToAr(winston);
  }
}

/**
 * Example usage:
 * 
 * const escrowManager = new ArweaveEscrowManager({
 *   storageKey: process.env.ESCROW_STORAGE_KEY!,
 * });
 * 
 * // Host creates a match with 10 AR stake per player
 * const match = await escrowManager.createMatch(10, { gameName: 'Chess Match' });
 * console.log('Escrow Address:', match.escrowAddr);
 * 
 * // Players join
 * escrowManager.addPlayer(match.id, 'player1-arweave-address-here');
 * escrowManager.addPlayer(match.id, 'player2-arweave-address-here');
 * 
 * // Players send AR to escrow address (done externally by players)
 * 
 * // Server checks if deposits are complete
 * const updatedMatch = await escrowManager.checkMatchStatus(match.id);
 * if (updatedMatch.status === 'ready_to_start') {
 *   escrowManager.startMatch(match.id);
 *   // ... game logic ...
 * }
 * 
 * // After game ends, payout winner
 * const txId = await escrowManager.payoutWinner(match.id, 'winner-arweave-address');
 * console.log('Payout Transaction:', txId);
 */

