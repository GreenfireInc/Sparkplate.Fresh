// Arweave Manual Rewards Distribution Engine
// This module provides a server-side mechanism to reward users with AR or PST tokens
// when they accomplish specific goals in applications (e.g., gaming, achievements)

// @ts-expect-error - arweave is a runtime dependency
import Arweave from 'arweave';
// @ts-expect-error - arweave types may not be available
import { JWKInterface } from 'arweave/node/lib/wallet';

// Type definitions
export type NameResolver = (name: string) => Promise<string | null>;

export type RewardSpec = {
  currency: 'AR' | 'PST';
  amount: number; // In AR for native, or token units for PST
  contractId?: string; // Required if currency === 'PST'
  tags?: Record<string, string>; // Optional transaction tags
};

export type RewardConfig = {
  host?: string; // e.g. 'arweave.net'
  port?: number; // e.g. 443
  protocol?: string; // e.g. 'https'
  timeout?: number; // e.g. 20000
  senderKey?: JWKInterface; // Private key (JWK object)
  nameResolver?: NameResolver; // Optional custom resolver for ArNS or other naming services
};

// Event callback types
type Callback<T> = (payload: T) => void;

/**
 * ArweaveRewarder - Manual reward distribution system
 * Allows server-side reward distribution to users based on achievements
 */
export class ArweaveRewarder {
  private arweave: Arweave;
  private senderKey: JWKInterface;
  private nameResolver?: NameResolver;

  // Callbacks
  private onRewardStartCb?: Callback<{ resolvedAddress: string }>;
  private onRewardSentCb?: Callback<{ txId: string; status: number }>;
  private onErrorCb?: Callback<Error>;

  constructor(config: RewardConfig) {
    // Initialize Arweave client
    this.arweave = Arweave.init({
      host: config.host || 'arweave.net',
      port: config.port || 443,
      protocol: config.protocol || 'https',
      timeout: config.timeout || 20000,
    });

    // Initialize sender account from provided credentials
    if (config.senderKey) {
      this.senderKey = config.senderKey;
    } else {
      throw new Error('Sender credentials required (JWK key)');
    }

    this.nameResolver = config.nameResolver;
  }

  // Register event callbacks
  onRewardStart(cb: Callback<{ resolvedAddress: string }>) {
    this.onRewardStartCb = cb;
  }

  onRewardSent(cb: Callback<{ txId: string; status: number }>) {
    this.onRewardSentCb = cb;
  }

  onError(cb: Callback<Error>) {
    this.onErrorCb = cb;
  }

  /**
   * Validate and resolve a user address
   * Supports both direct Arweave addresses and human-readable names (ArNS)
   */
  async resolveAddress(input: string): Promise<string | null> {
    const v = input.trim();

    // Arweave addresses are 43 characters long, base64url encoded
    // Simplistic check: length 43 and no spaces
    if (v.length === 43 && !/\s/.test(v)) return v;

    // Otherwise, attempt name resolution via provided resolver
    if (this.nameResolver) {
      const resolved = await this.nameResolver(v);
      if (resolved && resolved.length === 43) return resolved;
    }

    return null;
  }

  /**
   * Process address input from user
   * Triggers reward start callback when address is successfully resolved
   */
  async onAddressInput(input: string) {
    try {
      const resolved = await this.resolveAddress(input);
      if (!resolved) throw new Error('Could not resolve address');

      // Emit reward start event
      this.onRewardStartCb?.({ resolvedAddress: resolved });
      return resolved;
    } catch (err) {
      this.onErrorCb?.(err as Error);
      throw err;
    }
  }

  /**
   * Send reward to a user when they meet achievement criteria
   * @param recipientAddress - Resolved Arweave address
   * @param rewardSpec - Reward specification (AR or PST)
   */
  async rewardUser(recipientAddress: string, rewardSpec: RewardSpec) {
    try {
      if (rewardSpec.currency === 'AR') {
        const txId = await this.sendAR(
          recipientAddress,
          rewardSpec.amount,
          rewardSpec.tags
        );
        return txId;
      } else {
        if (!rewardSpec.contractId) throw new Error('contractId required for PST transfer');
        const txId = await this.sendPST(
          recipientAddress,
          rewardSpec.contractId,
          rewardSpec.amount,
          rewardSpec.tags
        );
        return txId;
      }
    } catch (err) {
      this.onErrorCb?.(err as Error);
      throw err;
    }
  }

  /**
   * Internal: send AR (amount in AR, e.g. 0.1)
   */
  private async sendAR(recipient: string, amountAR: number, tags?: Record<string, string>) {
    // Convert AR to Winston
    const quantity = this.arweave.ar.arToWinston(amountAR.toString());

    // Create transaction
    const transaction = await this.arweave.createTransaction(
      {
        target: recipient,
        quantity: quantity,
      },
      this.senderKey
    );

    // Add tags
    if (tags) {
      for (const [key, value] of Object.entries(tags)) {
        transaction.addTag(key, value);
      }
    }
    // Always add a tag to identify the app/source
    transaction.addTag('App-Name', 'ArweaveManualRewards');
    transaction.addTag('App-Version', '1.0.0');

    // Sign transaction
    await this.arweave.transactions.sign(transaction, this.senderKey);

    // Post transaction
    const response = await this.arweave.transactions.post(transaction);

    if (response.status === 200 || response.status === 202) {
      this.onRewardSentCb?.({ txId: transaction.id, status: response.status });
      return transaction.id;
    } else {
      throw new Error(`Failed to post transaction: ${response.status} - ${response.statusText}`);
    }
  }

  /**
   * Internal: send PST (Profit Sharing Token) via SmartWeave interaction
   * This typically involves writing an interaction to the contract
   */
  private async sendPST(recipient: string, contractId: string, amount: number, tags?: Record<string, string>) {
    // Note: For actual PST transfers, you would typically use a SmartWeave SDK like Warp Contracts.
    // Here we simulate the interaction by creating an Arweave transaction with specific tags
    // that a SmartWeave execution environment would interpret as a transfer.
    // OR use Warp SDK if available. For simplicity in this manual engine, we'll construct the input tag.

    const input = {
      function: 'transfer',
      target: recipient,
      qty: amount, // PST contracts typically use integer units, ensure 'amount' is correct format
    };

    const transaction = await this.arweave.createTransaction(
      {
        data: Math.random().toString().slice(-4), // Random data to ensure unique TX ID if needed, or empty
      },
      this.senderKey
    );

    transaction.addTag('App-Name', 'SmartWeaveAction');
    transaction.addTag('App-Version', '0.3.0');
    transaction.addTag('Contract', contractId);
    transaction.addTag('Input', JSON.stringify(input));

    if (tags) {
      for (const [key, value] of Object.entries(tags)) {
        transaction.addTag(key, value);
      }
    }

    await this.arweave.transactions.sign(transaction, this.senderKey);
    const response = await this.arweave.transactions.post(transaction);

    if (response.status === 200 || response.status === 202) {
      this.onRewardSentCb?.({ txId: transaction.id, status: response.status });
      return transaction.id;
    } else {
      throw new Error(`Failed to post PST transfer: ${response.status} - ${response.statusText}`);
    }
  }

  /**
   * Helper to generate a new wallet (for testing)
   */
  async generateWallet() {
    return await this.arweave.wallets.generate();
  }

  /**
   * Helper to get wallet address from key
   */
  async getAddress(key: JWKInterface) {
    return await this.arweave.wallets.jwkToAddress(key);
  }
}

/**
 * Example usage:
 * 
 * const rewarder = new ArweaveRewarder({
 *   host: 'arweave.net',
 *   senderKey: JSON.parse(fs.readFileSync('arweave-keyfile.json')),
 *   nameResolver: async (name) => {
 *     // Implement ArNS resolution logic
 *     return null;
 *   }
 * });
 * 
 * rewarder.onRewardStart(({ resolvedAddress }) => {
 *   console.log('Reward initiated for', resolvedAddress)
 * });
 * 
 * rewarder.onRewardSent(({ txId, status }) => {
 *   console.log('Reward tx', txId, 'status', status)
 * });
 * 
 * rewarder.onError((err) => console.error(err));
 * 
 * // When user inputs address/name
 * await rewarder.onAddressInput("my-arns-name.ar");
 * 
 * // Later, when they reach the goal:
 * await rewarder.rewardUser(resolvedAddress, { 
 *   currency: 'AR', 
 *   amount: 0.5, 
 *   tags: { 'Reason': 'Highscore' } 
 * });
 */

