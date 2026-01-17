// Algorand Manual Escrow Distribution Engine
// Server-managed escrow system for two-party interactions (gaming, trading, etc.)
// The server creates and manages escrow wallets with encrypted private keys

import algosdk from "algosdk";
import crypto from "crypto";

/**
 * ESCROW MECHANISM OVERVIEW:
 * 
 * This module provides a server-side escrow system where:
 * - Server creates a unique escrow wallet for each match/game
 * - Both players deposit funds to the escrow address
 * - Server monitors deposits via Algorand Indexer
 * - Winner receives the full pot (minus fees)
 * - Private keys are encrypted at rest and never exposed to players
 */

export interface EscrowConfig {
  algodServer: string;
  algodToken: string;
  algodPort?: number | string;
  storageKey: string; // Encryption key for storing escrow private keys
}

export interface Match {
  id: string;
  escrowAddr: string;
  encryptedEscrowSK: EncryptedKey;
  stakeMicroAlgos: number;
  players: Record<string, Player>;
  createdAt: number;
  hostMetadata?: unknown;
  status: "waiting_for_players" | "waiting_for_payments" | "ready_to_start" | "started" | "finished";
  escrowBalance?: number;
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
 * AlgorandEscrowManager - Server-side escrow management
 * Handles wallet creation, deposit tracking, and payout distribution
 */
export class AlgorandEscrowManager {
  private algodClient: algosdk.Algodv2;
  private storageKey: string;
  private matches: Map<string, Match> = new Map();

  constructor(config: EscrowConfig) {
    this.algodClient = new algosdk.Algodv2(
      { "X-API-Key": config.algodToken },
      config.algodServer,
      config.algodPort ?? ""
    );
    this.storageKey = config.storageKey;
  }

  /**
   * Create a new match with escrow wallet
   */
  async createMatch(stakeMicroAlgos: number, hostMetadata?: unknown): Promise<Match> {
    // Generate new escrow account
    const account = algosdk.generateAccount();
    const escrowAddr = account.addr;
    const escrowSK = account.sk;

    // Encrypt and store private key
    const encrypted = this.encryptSecret(escrowSK);
    
    const matchId = this.generateId();
    const match: Match = {
      id: matchId,
      escrowAddr: String(escrowAddr),
      encryptedEscrowSK: encrypted,
      stakeMicroAlgos,
      players: {},
      createdAt: Date.now(),
      hostMetadata: hostMetadata || null,
      status: "waiting_for_players",
    };

    this.matches.set(matchId, match);
    return match;
  }

  /**
   * Player joins a match
   */
  addPlayer(matchId: string, playerAddr: string): { matchId: string; playerId: string; escrowAddr: string } {
    const match = this.matches.get(matchId);
    if (!match) throw new Error("Match not found");

    if (!algosdk.isValidAddress(playerAddr)) {
      throw new Error("Invalid address");
    }

    // Limit to two players
    if (Object.keys(match.players).length >= 2) {
      throw new Error("Match full");
    }

    const playerId = this.generateId();
    match.players[playerId] = {
      addr: playerAddr,
      paid: false,
      paidTxId: null,
      joinedAt: Date.now(),
    };

    return { matchId, playerId, escrowAddr: match.escrowAddr };
  }

  /**
   * Check match status and verify deposits
   */
  async checkMatchStatus(matchId: string): Promise<Match> {
    const match = this.matches.get(matchId);
    if (!match) throw new Error("Match not found");

    // Query escrow account balance
    const acct = await this.algodClient.accountInformation(match.escrowAddr).do();
    const balance = Number(acct.amount);

    // Calculate expected pot
    const playerCount = Object.keys(match.players).length;
    const expectedPot = match.stakeMicroAlgos * playerCount;

    // Update balance
    match.escrowBalance = balance;

    // Check if ready to start (both players paid)
    const twoPlayersStake = match.stakeMicroAlgos * 2;
    if (balance >= twoPlayersStake && match.status === "waiting_for_players") {
      match.status = "ready_to_start";
    }

    return match;
  }

  /**
   * Payout winner
   */
  async payoutWinner(matchId: string, winnerAddr: string): Promise<string> {
    const match = this.matches.get(matchId);
    if (!match) throw new Error("Match not found");
    
    if (!algosdk.isValidAddress(winnerAddr)) {
      throw new Error("Invalid winner address");
    }

    if (match.status === "finished") {
      throw new Error("Match already finished");
    }

    // Decrypt escrow private key
    const escrowSK = this.decryptSecret(match.encryptedEscrowSK);
    const escrowAccount = algosdk.mnemonicToSecretKey(
      algosdk.secretKeyToMnemonic(escrowSK)
    );

    // Get current balance
    const acctInfo = await this.algodClient.accountInformation(match.escrowAddr).do();
    const fullBalance = Number(acctInfo.amount);

    // Reserve minimum balance and fee
    const minBalance = 100000; // 0.1 ALGO
    const sendAmount = Math.max(0, fullBalance - minBalance - 1000);

    if (sendAmount <= 0) {
      throw new Error("Insufficient funds to payout after min balance");
    }

    // Build and send payout transaction
    const suggestedParams = await this.algodClient.getTransactionParams().do();
    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      sender: match.escrowAddr,
      receiver: winnerAddr,
      amount: sendAmount,
      suggestedParams,
    });

    const signed = txn.signTxn(escrowSK);
    const response = await this.algodClient.sendRawTransaction(signed).do();
    const txId = txn.txID();

    // Wait for confirmation
    await this.waitForConfirmation(txId, 4);

    // Update match status
    match.status = "finished";
    match.payoutTxId = txId;
    match.winnerAddr = winnerAddr;

    return txId;
  }

  /**
   * Encrypt escrow secret key
   */
  private encryptSecret(secretBytes: Uint8Array): EncryptedKey {
    const salt = crypto.randomBytes(16);
    const key = crypto.pbkdf2Sync(this.storageKey, salt, 100000, 32, "sha256");
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
    
    const ciphertext = Buffer.concat([
      cipher.update(Buffer.from(secretBytes)),
      cipher.final(),
    ]);
    const tag = cipher.getAuthTag();

    return {
      salt: salt.toString("base64"),
      iv: iv.toString("base64"),
      tag: tag.toString("base64"),
      ciphertext: ciphertext.toString("base64"),
    };
  }

  /**
   * Decrypt escrow secret key
   */
  private decryptSecret(pkg: EncryptedKey): Uint8Array {
    const salt = Buffer.from(pkg.salt, "base64");
    const iv = Buffer.from(pkg.iv, "base64");
    const tag = Buffer.from(pkg.tag, "base64");
    const ciphertext = Buffer.from(pkg.ciphertext, "base64");
    
    const key = crypto.pbkdf2Sync(this.storageKey, salt, 100000, 32, "sha256");
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(tag);
    
    const plain = Buffer.concat([
      decipher.update(ciphertext),
      decipher.final(),
    ]);
    
    return new Uint8Array(plain);
  }

  /**
   * Wait for transaction confirmation
   */
  private async waitForConfirmation(txId: string, timeout = 10): Promise<Record<string, unknown>> {
    if (!this.algodClient) throw new Error("no algod");
    
    const status = await this.algodClient.status().do();
    if (!status) throw new Error("no status from algod");
    
    const lastRound = status["last-round"];
    for (let i = 0; i < timeout; i++) {
      const info = await this.algodClient.pendingTransactionInformation(txId).do();
      if (info && info["confirmed-round"] !== null && info["confirmed-round"] > 0) {
        return info as unknown as Record<string, unknown>;
      }
      await this.algodClient.statusAfterBlock(lastRound + 1).do();
    }
    throw new Error("tx not confirmed after timeout");
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return crypto.randomBytes(16).toString("hex");
  }

  /**
   * Get match by ID
   */
  getMatch(matchId: string): Match | undefined {
    return this.matches.get(matchId);
  }

  /**
   * Get all matches
   */
  getAllMatches(): Match[] {
    return Array.from(this.matches.values());
  }
}

/**
 * USAGE EXAMPLE:
 * 
 * // Initialize escrow manager
 * const escrowManager = new AlgorandEscrowManager({
 *   algodServer: "https://testnet-algorand.api.purestake.io/ps2",
 *   algodToken: "<PURESTAKE_KEY>",
 *   storageKey: process.env.ESCROW_STORAGE_KEY,
 * });
 * 
 * // Create match
 * const match = await escrowManager.createMatch(1000000); // 1 ALGO stake
 * console.log("Escrow address:", match.escrowAddr);
 * 
 * // Players join
 * escrowManager.addPlayer(match.id, "PLAYER1_ADDRESS");
 * escrowManager.addPlayer(match.id, "PLAYER2_ADDRESS");
 * 
 * // Check deposits
 * const status = await escrowManager.checkMatchStatus(match.id);
 * if (status.status === "ready_to_start") {
 *   console.log("Both players have deposited! Start the game.");
 * }
 * 
 * // After game ends, payout winner
 * const txId = await escrowManager.payoutWinner(match.id, "WINNER_ADDRESS");
 * console.log("Payout transaction:", txId);
 * 
 * SECURITY NOTES:
 * - Store ESCROW_STORAGE_KEY securely (environment variable, KMS, etc.)
 * - Never expose escrow private keys to clients
 * - Use Algorand Indexer to reliably track deposits
 * - Implement proper authentication for payout endpoints
 */

