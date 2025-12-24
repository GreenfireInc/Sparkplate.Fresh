// Algorand Manual Rewards Distribution Engine
// This module provides a server-side mechanism to reward users with ALGO or ASA tokens
// when they accomplish specific goals in applications (e.g., gaming, achievements)

import algosdk, { Algodv2, Account } from "algosdk";

// Type definitions
export type NameResolver = (name: string) => Promise<string | null>;

export type RewardSpec = {
  currency: "ALGO" | "ASA";
  amount: number; // In ALGOS for ALGO, or asset units for ASA
  assetId?: number; // Required if currency === 'ASA'
  note?: string; // Optional transaction memo
};

export type RewardConfig = {
  algodServer: string; // e.g. 'https://testnet-algorand.api.purestake.io/ps2'
  algodToken: string;
  algodPort?: number | string;
  senderMnemonic?: string; // Private key source (use one of these)
  senderSecretKey?: Uint8Array;
  nameResolver?: NameResolver; // Optional custom resolver for human-readable names
};

// Event callback types
type Callback<T> = (payload: T) => void;

/**
 * AlgorandRewarder - Manual reward distribution system
 * Allows server-side reward distribution to users based on achievements
 */
export class AlgorandRewarder {
  private algodClient: Algodv2;
  private senderAccount: Account;
  private nameResolver?: NameResolver;

  // Callbacks
  private onRewardStartCb?: Callback<{ resolvedAddress: string }>;
  private onRewardSentCb?: Callback<{ txId: string; confirmedRound: number }>;
  private onErrorCb?: Callback<Error>;

  constructor(config: RewardConfig) {
    // Initialize Algod client
    this.algodClient = new algosdk.Algodv2(
      { "X-API-Key": config.algodToken },
      config.algodServer,
      config.algodPort ?? ""
    );

    // Initialize sender account from provided credentials
    if (config.senderMnemonic) {
      this.senderAccount = algosdk.mnemonicToSecretKey(config.senderMnemonic);
    } else if (config.senderSecretKey) {
      const addr = algosdk.encodeAddress(config.senderSecretKey.slice(32));
      this.senderAccount = { addr, sk: config.senderSecretKey } as Account;
    } else {
      throw new Error("Sender credentials required (mnemonic or secret key)");
    }

    this.nameResolver = config.nameResolver;
  }

  // Register event callbacks
  onRewardStart(cb: Callback<{ resolvedAddress: string }>) {
    this.onRewardStartCb = cb;
  }

  onRewardSent(cb: Callback<{ txId: string; confirmedRound: number }>) {
    this.onRewardSentCb = cb;
  }

  onError(cb: Callback<Error>) {
    this.onErrorCb = cb;
  }

  /**
   * Validate and resolve a user address
   * Supports both direct Algorand addresses and human-readable names
   */
  async resolveAddress(input: string): Promise<string | null> {
    const v = input.trim();

    // If looks like a valid Algorand address, accept it
    if (algosdk.isValidAddress(v)) return v;

    // Otherwise, attempt name resolution via provided resolver
    if (this.nameResolver) {
      const resolved = await this.nameResolver(v);
      if (resolved && algosdk.isValidAddress(resolved)) return resolved;
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
      if (!resolved) throw new Error("Could not resolve address");
      
      // Emit reward start event
      this.onRewardStartCb?.({ resolvedAddress: resolved });
      return resolved;
    } catch (err: any) {
      this.onErrorCb?.(err);
      throw err;
    }
  }

  /**
   * Send reward to a user when they meet achievement criteria
   * @param recipientAddress - Resolved Algorand address
   * @param rewardSpec - Reward specification (ALGO or ASA)
   */
  async rewardUser(recipientAddress: string, rewardSpec: RewardSpec) {
    try {
      if (!algosdk.isValidAddress(recipientAddress)) {
        throw new Error("Invalid recipient address");
      }

      if (rewardSpec.currency === "ALGO") {
        const txId = await this.sendAlgos(
          recipientAddress,
          rewardSpec.amount,
          rewardSpec.note
        );
        return txId;
      } else {
        if (!rewardSpec.assetId) throw new Error("assetId required for ASA transfer");
        const txId = await this.sendAsset(
          recipientAddress,
          rewardSpec.assetId,
          rewardSpec.amount,
          rewardSpec.note
        );
        return txId;
      }
    } catch (err: any) {
      this.onErrorCb?.(err);
      throw err;
    }
  }

  /**
   * Internal: send ALGO (amount in ALGOS, e.g. 0.1)
   */
  private async sendAlgos(recipient: string, amountAlgos: number, note?: string) {
    const params = await this.algodClient.getTransactionParams().do();
    const microAmount = Math.round(amountAlgos * 1e6);

    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: this.senderAccount.addr,
      to: recipient,
      amount: microAmount,
      suggestedParams: params,
      note: note ? new TextEncoder().encode(note) : undefined,
    });

    const signed = txn.signTxn(this.senderAccount.sk);
    const { txId } = await this.algodClient.sendRawTransaction(signed).do();

    const confirmed = await this.waitForConfirmation(txId);
    this.onRewardSentCb?.({ txId, confirmedRound: confirmed });
    return txId;
  }

  /**
   * Internal: send ASA (amount is in asset-unit; user must ensure decimals)
   */
  private async sendAsset(recipient: string, assetId: number, amount: number, note?: string) {
    const params = await this.algodClient.getTransactionParams().do();

    const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: this.senderAccount.addr,
      to: recipient,
      assetIndex: assetId,
      amount: amount,
      suggestedParams: params,
      note: note ? new TextEncoder().encode(note) : undefined,
    });

    const signed = txn.signTxn(this.senderAccount.sk);
    const { txId } = await this.algodClient.sendRawTransaction(signed).do();

    const confirmed = await this.waitForConfirmation(txId);
    this.onRewardSentCb?.({ txId, confirmedRound: confirmed });
    return txId;
  }

  /**
   * Wait for transaction confirmation
   */
  private async waitForConfirmation(txId: string, timeout = 10): Promise<number> {
    const algod = this.algodClient;
    const startRound = (await algod.status().do())["last-round"];
    let currentRound = startRound;
    const endRound = startRound + timeout;

    while (currentRound < endRound) {
      const pending = await algod.pendingTransactionInformation(txId).do();
      if (pending["confirmed-round"] !== undefined && pending["confirmed-round"] > 0) {
        return pending["confirmed-round"];
      }
      await this.sleep(1000);
      currentRound++;
    }
    throw new Error("Transaction not confirmed after timeout");
  }

  private sleep(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
  }
}

/**
 * Example usage:
 * 
 * const rewarder = new AlgorandRewarder({
 *   algodServer: "https://testnet-algorand.api.purestake.io/ps2",
 *   algodToken: "<PURESTAKE_KEY>",
 *   senderMnemonic: "...",
 *   nameResolver: async (name) => {
 *     // Implement your name resolution logic
 *     return null;
 *   }
 * });
 * 
 * rewarder.onRewardStart(({ resolvedAddress }) => {
 *   console.log('Reward initiated for', resolvedAddress)
 * });
 * 
 * rewarder.onRewardSent(({ txId, confirmedRound }) => {
 *   console.log('Reward tx', txId, 'confirmed in', confirmedRound)
 * });
 * 
 * rewarder.onError((err) => console.error(err));
 * 
 * // When user inputs address/name
 * await rewarder.onAddressInput("some.algoname.or.address");
 * 
 * // Later, when they reach the goal:
 * await rewarder.rewardUser(resolvedAddress, { 
 *   currency: 'ALGO', 
 *   amount: 0.05, 
 *   note: 'Highscore reward' 
 * });
 */

