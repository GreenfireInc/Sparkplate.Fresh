/**
 * Cosmos (ATOM) Manual Reward Distribution System
 * 
 * This module provides a server-side reward distribution mechanism for Cosmos (ATOM) that:
 * - Accepts public wallet addresses or human-readable names (via pluggable nameResolver)
 * - Resolves & validates addresses and fires gameStart callbacks
 * - Sends native Cosmos denoms (e.g. ATOM/uatom) or CW20 tokens from your wallet
 * - Exposes callbacks for onGameStart, onRewardSent, and onError
 * 
 * Security: Never expose mnemonics or private keys client-side. This runs server-side only.
 */

import { DirectSecp256k1HdWallet, OfflineSigner } from '@cosmjs/proto-signing';
import { SigningStargateClient, StargateClient, coin, StdFee, coins } from '@cosmjs/stargate';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { Bech32 } from '@cosmjs/encoding';
import { bech32 } from 'bech32';

export type NameResolver = (name: string) => Promise<string | null>;

/**
 * RewardSpec describes how much & what to send
 */
export type RewardSpec =
  | { type: 'NATIVE'; denom: string; amount: number } // amount in human units
  | { type: 'CW20'; contractAddress: string; amount: string }; // amount as string (raw token units)

/**
 * Config for rewarder
 */
export interface CosmosConfig {
  rpcEndpoint: string; // RPC endpoint e.g. "https://rpc.cosmos.network:26657"
  prefix?: string; // bech32 prefix, e.g. "cosmos" (defaults to "cosmos")
  senderMnemonic: string; // mnemonic of the wallet that will pay rewards (keep secure, server-side only)
  nameResolver?: NameResolver; // optional resolver for human readable names
  defaultFee?: StdFee; // optional default fee for native transfers
}

/**
 * Chain configuration for different Cosmos chains
 */
export interface CosmosChainConfig {
  chainId: string;
  rpcEndpoint: string;
  restEndpoint: string;
  prefix: string;
  denom: string;
  gasPrice: string;
}

/**
 * Predefined chain configurations
 */
export const CHAIN_CONFIGS: Record<string, CosmosChainConfig> = {
  cosmos: {
    chainId: 'cosmoshub-4',
    rpcEndpoint: 'https://rpc-cosmoshub.keplr.app',
    restEndpoint: 'https://lcd-cosmoshub.keplr.app',
    prefix: 'cosmos',
    denom: 'uatom',
    gasPrice: '0.025uatom',
  },
  osmosis: {
    chainId: 'osmosis-1',
    rpcEndpoint: 'https://rpc-osmosis.keplr.app',
    restEndpoint: 'https://lcd-osmosis.keplr.app',
    prefix: 'osmo',
    denom: 'uosmo',
    gasPrice: '0.025uosmo',
  },
  juno: {
    chainId: 'juno-1',
    rpcEndpoint: 'https://rpc-juno.keplr.app',
    restEndpoint: 'https://lcd-juno.keplr.app',
    prefix: 'juno',
    denom: 'ujuno',
    gasPrice: '0.025ujuno',
  },
};

type Callback<T> = (payload: T) => void;

/**
 * Transaction result
 */
export interface TransactionResult {
  success: boolean;
  txHash?: string;
  error?: string;
  rawLog?: string;
}

/**
 * Player information
 */
export interface Player {
  publicWalletAddress: string;
  humanReadableAddress?: string;
  currentScore: number;
  hasBeenRewarded: boolean;
  chainType: 'cosmos' | 'osmosis' | 'juno' | 'other';
}

/**
 * Game configuration
 */
export interface GameConfig {
  rewardThreshold: number; // e.g., 10000 points
  rewardAmount: string; // Amount as string (e.g., "1000000uatom")
  denom: string; // e.g., "uatom", "uosmo", "ujuno"
  chainId: string; // e.g., "cosmoshub-4", "osmosis-1"
}

/**
 * Wallet configuration
 */
export interface WalletConfig {
  privateKey?: string;
  mnemonic: string;
  prefix: string; // e.g., "cosmos", "osmo", "juno"
}

/**
 * Main Cosmos Rewarder class
 */
export class CosmosRewarder {
  private rpc: string;
  private prefix: string;
  private mnemonic: string;
  private nameResolver?: NameResolver;
  private defaultFee?: StdFee;

  // callbacks
  private onGameStartCb?: Callback<{ resolvedAddress: string }>;
  private onRewardSentCb?: Callback<{ txHash: string; rawResult: unknown }>;
  private onErrorCb?: Callback<Error>;

  constructor(cfg: CosmosConfig) {
    this.rpc = cfg.rpcEndpoint;
    this.prefix = cfg.prefix ?? 'cosmos';
    this.mnemonic = cfg.senderMnemonic;
    this.nameResolver = cfg.nameResolver;
    this.defaultFee = cfg.defaultFee;
  }

  onGameStart(cb: Callback<{ resolvedAddress: string }>) {
    this.onGameStartCb = cb;
  }

  onRewardSent(cb: Callback<{ txHash: string; rawResult: unknown }>) {
    this.onRewardSentCb = cb;
  }

  onError(cb: Callback<Error>) {
    this.onErrorCb = cb;
  }

  /**
   * Called when a user types/pastes an address or human-readable name
   */
  async onAddressInput(input: string): Promise<string> {
    try {
      const resolved = await this.resolveAddress(input);
      if (!resolved) throw new Error('Could not resolve address');
      this.onGameStartCb?.({ resolvedAddress: resolved });
      return resolved;
    } catch (err) {
      this.onErrorCb?.(err as Error);
      throw err;
    }
  }

  /**
   * Resolve a raw address or attempt nameResolver
   */
  async resolveAddress(input: string): Promise<string | null> {
    const v = input.trim();

    // If it decodes as bech32, accept it
    const isBech = this.isBech32(v);
    if (isBech) {
      const { prefix } = bech32.decode(v);
      // Optional: enforce prefix match
      if (prefix && prefix.length > 0) {
        // Uncomment to require exact prefix match:
        // if (prefix !== this.prefix) return null;
      }
      return v;
    }

    // Otherwise try nameResolver if provided
    if (this.nameResolver) {
      const resolved = await this.nameResolver(v);
      if (resolved && this.isBech32(resolved)) return resolved;
    }

    return null;
  }

  /**
   * Lightweight bech32 check
   */
  private isBech32(addr: string): boolean {
    try {
      const decoded = bech32.decode(addr);
      return !!decoded?.words;
    } catch {
      return false;
    }
  }

  /**
   * Reward a user (call from your server or trusted environment)
   * recipientOrResolvedAddress must be the resolved bech32 address
   */
  async rewardUser(recipientOrResolvedAddress: string, rewardSpec: RewardSpec): Promise<TransactionResult> {
    try {
      if (!this.isBech32(recipientOrResolvedAddress)) {
        throw new Error('Invalid recipient address');
      }

      if (rewardSpec.type === 'NATIVE') {
        const res = await this.sendNative(
          recipientOrResolvedAddress,
          rewardSpec.denom,
          rewardSpec.amount
        );
        this.onRewardSentCb?.({ txHash: res.txHash!, rawResult: res.raw });
        return res;
      } else {
        const res = await this.sendCw20(
          recipientOrResolvedAddress,
          rewardSpec.contractAddress,
          rewardSpec.amount
        );
        this.onRewardSentCb?.({ txHash: res.txHash!, rawResult: res.raw });
        return res;
      }
    } catch (err) {
      this.onErrorCb?.(err as Error);
      throw err;
    }
  }

  /**
   * Create signer from mnemonic (HD wallet)
   */
  private async getSigner(): Promise<OfflineSigner> {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(this.mnemonic, {
      prefix: this.prefix,
    });
    return wallet;
  }

  /**
   * Send native denom (e.g., denom='uatom'). amountHuman is in human units.
   * If denom === 'uatom' we convert ATOM -> micro (amount * 1e6).
   */
  private async sendNative(
    recipient: string,
    denom: string,
    amountHuman: number
  ): Promise<{ txHash: string; raw: unknown }> {
    const signer = await this.getSigner();
    const [firstAccount] = await signer.getAccounts();
    const senderAddress = firstAccount.address;

    // Determine amount in base units (string)
    let amountBase: string;
    if (denom === 'uatom') {
      // ATOM has 6 decimal places
      const micro = Math.floor(amountHuman * 1e6);
      if (micro <= 0) throw new Error('amount too small after conversion to micro units');
      amountBase = micro.toString();
    } else {
      // For other denoms, default to 1e6 conversion
      const micro = Math.floor(amountHuman * 1e6);
      amountBase = micro.toString();
    }

    const client = await SigningStargateClient.connectWithSigner(this.rpc, signer);

    const coinAmount = [coin(amountBase, denom)];
    const fee = this.defaultFee ?? {
      amount: [coin('2000', denom === 'uatom' ? 'uatom' : denom)],
      gas: '200000',
    };

    const result = await client.sendTokens(
      senderAddress,
      recipient,
      coinAmount,
      fee,
      `Game reward to ${recipient}`
    );

    // Extract txHash robustly
    const txHash = (result as Record<string, unknown>)?.transactionHash ?? 
                   (result as Record<string, unknown>)?.txResponse?.['txhash'] ?? 
                   (result as Record<string, unknown>)?.txhash;

    return { txHash: (txHash as string) ?? '', raw: result };
  }

  /**
   * Send CW20 token using CosmWasm execute (standard CW20 transfer)
   */
  private async sendCw20(
    recipient: string,
    contractAddress: string,
    amount: string
  ): Promise<{ txHash: string; raw: unknown }> {
    const signer = await this.getSigner();
    const [firstAccount] = await signer.getAccounts();
    const senderAddress = firstAccount.address;

    const client = await SigningCosmWasmClient.connectWithSigner(this.rpc, signer);

    // Standard CW20 transfer message
    const cw20Msg = {
      transfer: {
        recipient: recipient,
        amount: amount.toString(),
      },
    };

    const fee = this.defaultFee ?? {
      amount: [{ denom: 'ucosm', amount: '2000' }],
      gas: '200000',
    };

    const res = await client.execute(
      senderAddress,
      contractAddress,
      cw20Msg,
      fee,
      `Game reward CW20 to ${recipient}`
    );

    const txHash = (res as Record<string, unknown>)?.transactionHash ?? 
                   (res as Record<string, unknown>)?.txResponse?.['txhash'] ?? 
                   (res as Record<string, unknown>)?.txhash;
    return { txHash: (txHash as string) ?? '', raw: res };
  }
}

/**
 * Address Resolver for Cosmos chains
 */
export class CosmosAddressResolver {
  private static readonly BECH32_PREFIXES = ['cosmos', 'osmo', 'juno', 'stars', 'akash', 'regen'];

  /**
   * Resolve any address format to a standard Cosmos wallet address
   */
  static async resolveAddress(
    input: string
  ): Promise<{ address: string; prefix: string; chainType: string }> {
    // If it's already a valid bech32 address
    const bech32Info = this.parseBech32Address(input);
    if (bech32Info) {
      return {
        address: input,
        prefix: bech32Info.prefix,
        chainType: this.prefixToChainType(bech32Info.prefix),
      };
    }

    // Handle human-readable addresses (like names, ENS-like systems)
    const resolved = await this.resolveHumanReadableAddress(input);
    if (resolved) {
      return resolved;
    }

    throw new Error(`Unable to resolve address: ${input}`);
  }

  /**
   * Parse and validate bech32 address
   */
  private static parseBech32Address(address: string): { prefix: string; data: Uint8Array } | null {
    try {
      const decoded = Bech32.decode(address);
      return {
        prefix: decoded.prefix,
        data: decoded.data,
      };
    } catch {
      return null;
    }
  }

  /**
   * Convert between different chain address formats
   */
  static convertAddress(address: string, targetPrefix: string): string {
    try {
      const decoded = Bech32.decode(address);
      return Bech32.encode(targetPrefix, decoded.data);
    } catch (error) {
      throw new Error(`Failed to convert address: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Resolve human-readable addresses (like .cosmos names, Stargaze names, etc.)
   */
  private static async resolveHumanReadableAddress(
    input: string
  ): Promise<{ address: string; prefix: string; chainType: string } | null> {
    try {
      // Check if it's a .cosmos name (ICNS - Interchain Name Service)
      if (input.includes('.') && !input.includes(' ')) {
        const icnsAddress = await this.resolveICNSAddress(input);
        if (icnsAddress) {
          return icnsAddress;
        }
      }

      // Check if it's a Stargaze name
      if (input.endsWith('.stars')) {
        const stargazeAddress = await this.resolveStargazeName(input);
        if (stargazeAddress) {
          return stargazeAddress;
        }
      }

      return null;
    } catch (error) {
      console.error('Error resolving human-readable address:', error);
      return null;
    }
  }

  /**
   * Resolve ICNS (.cosmos) names
   */
  private static async resolveICNSAddress(
    name: string
  ): Promise<{ address: string; prefix: string; chainType: string } | null> {
    try {
      const response = await fetch(`https://icns-api.stargaze-apis.com/domains/${name}`);
      if (response.ok) {
        const data = await response.json() as { owner?: string };
        if (data.owner) {
          return {
            address: data.owner,
            prefix: 'stars',
            chainType: 'cosmos',
          };
        }
      }
      return null;
    } catch (error) {
      console.error('Error resolving ICNS address:', error);
      return null;
    }
  }

  /**
   * Resolve Stargaze names
   */
  private static async resolveStargazeName(
    name: string
  ): Promise<{ address: string; prefix: string; chainType: string } | null> {
    try {
      const query = `{"domain":{"name":"${name.replace('.stars', '')}"}}`;
      const encodedQuery = btoa(query);
      const response = await fetch(
        `https://rest.stargaze-apis.com/cosmwasm/wasm/v1/contract/stars1fx74nkqkw2748av8j7ew7r3xt9cgjqduwn8m0ur5lhe49uhlsasszc5fhr/smart/${encodedQuery}`
      );
      if (response.ok) {
        const data = await response.json() as { data?: { owner?: string } };
        if (data.data?.owner) {
          return {
            address: data.data.owner,
            prefix: 'stars',
            chainType: 'cosmos',
          };
        }
      }
      return null;
    } catch (error) {
      console.error('Error resolving Stargaze name:', error);
      return null;
    }
  }

  /**
   * Validate Cosmos address format
   */
  static isValidCosmosAddress(address: string, expectedPrefix?: string): boolean {
    try {
      const decoded = Bech32.decode(address);
      if (expectedPrefix && decoded.prefix !== expectedPrefix) {
        return false;
      }
      return this.BECH32_PREFIXES.includes(decoded.prefix);
    } catch {
      return false;
    }
  }

  /**
   * Map prefix to chain type
   */
  private static prefixToChainType(prefix: string): string {
    const prefixMap: Record<string, string> = {
      'cosmos': 'cosmos',
      'osmo': 'osmosis',
      'juno': 'juno',
      'stars': 'stargaze',
      'akash': 'akash',
      'regen': 'regen',
    };

    return prefixMap[prefix] || 'cosmos';
  }
}

/**
 * Cosmos Service for blockchain interactions
 */
export class CosmosService {
  private client: StargateClient | null = null;
  private signingClient: SigningStargateClient | null = null;

  constructor(private chainConfig: CosmosChainConfig) {}

  /**
   * Initialize the service
   */
  async initialize(): Promise<void> {
    this.client = await StargateClient.connect(this.chainConfig.rpcEndpoint);
  }

  /**
   * Initialize with signer for sending transactions
   */
  async initializeWithMnemonic(mnemonic: string): Promise<void> {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
      prefix: this.chainConfig.prefix,
    });

    this.signingClient = await SigningStargateClient.connectWithSigner(
      this.chainConfig.rpcEndpoint,
      wallet
    );

    this.client = this.signingClient;
  }

  /**
   * Send reward to player
   */
  async sendReward(toAddress: string, amount: string, memo?: string): Promise<TransactionResult> {
    if (!this.signingClient) {
      throw new Error('Signing client not initialized. Call initializeWithMnemonic first.');
    }

    try {
      // Get the sender address
      const wallet = (this.signingClient as unknown as { signer: OfflineSigner }).signer;
      const [account] = await wallet.getAccounts();
      const fromAddress = account.address;

      // Validate recipient address
      if (!CosmosAddressResolver.isValidCosmosAddress(toAddress, this.chainConfig.prefix)) {
        // Try to convert address if it's from different chain
        toAddress = CosmosAddressResolver.convertAddress(toAddress, this.chainConfig.prefix);
      }

      // Parse amount
      const rewardCoins = coins(amount, this.chainConfig.denom);

      // Send transaction
      const result = await this.signingClient.sendTokens(
        fromAddress,
        toAddress,
        rewardCoins,
        {
          amount: coins(5000, this.chainConfig.denom),
          gas: '200000',
        },
        memo || 'Game reward for achieving high score!'
      );

      if (result.code === 0) {
        return {
          success: true,
          txHash: result.transactionHash,
        };
      } else {
        return {
          success: false,
          error: `Transaction failed with code ${result.code}`,
          rawLog: result.rawLog,
        };
      }
    } catch (error) {
      console.error('Error sending reward:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Get account balance
   */
  async getBalance(address: string): Promise<string> {
    if (!this.client) {
      throw new Error('Client not initialized. Call initialize first.');
    }

    try {
      const balance = await this.client.getBalance(address, this.chainConfig.denom);
      return balance.amount;
    } catch (error) {
      console.error('Error getting balance:', error);
      return '0';
    }
  }
}

/**
 * Game Reward Manager for handling game logic and rewards
 */
export class CosmosGameRewardManager {
  private players: Map<string, Player> = new Map();
  private cosmosService: CosmosService;
  private isInitialized: boolean = false;

  constructor(private gameConfig: GameConfig, private walletConfig: WalletConfig) {
    const chainConfig = this.getChainConfigFromDenom(gameConfig.denom);
    this.cosmosService = new CosmosService(chainConfig);
  }

  /**
   * Initialize the reward manager
   */
  async initialize(): Promise<void> {
    if (!this.walletConfig.mnemonic) {
      throw new Error('Mnemonic is required for initialization');
    }

    await this.cosmosService.initializeWithMnemonic(this.walletConfig.mnemonic);
    this.isInitialized = true;

    console.log('Cosmos Game Reward Manager initialized');
  }

  /**
   * Start game for a player with their address
   */
  async startGame(addressInput: string): Promise<Player> {
    if (!this.isInitialized) {
      throw new Error('Reward manager not initialized. Call initialize() first.');
    }

    try {
      const resolvedInfo = await CosmosAddressResolver.resolveAddress(addressInput);

      const player: Player = {
        publicWalletAddress: resolvedInfo.address,
        humanReadableAddress: addressInput !== resolvedInfo.address ? addressInput : undefined,
        currentScore: 0,
        hasBeenRewarded: false,
        chainType: resolvedInfo.chainType as Player['chainType'],
      };

      this.players.set(resolvedInfo.address, player);

      console.log(`Game started for player: ${resolvedInfo.address}`);
      return player;
    } catch (error) {
      throw new Error(
        `Failed to start game: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Update player score and check for rewards
   */
  async updateScore(
    addressInput: string,
    newScore: number
  ): Promise<{ player: Player; rewardSent?: TransactionResult }> {
    if (!this.isInitialized) {
      throw new Error('Reward manager not initialized. Call initialize() first.');
    }

    try {
      const resolvedInfo = await CosmosAddressResolver.resolveAddress(addressInput);
      const player = this.players.get(resolvedInfo.address);

      if (!player) {
        throw new Error('Player not found. Please start game first.');
      }

      player.currentScore = newScore;

      // Check if player qualifies for reward
      if (newScore >= this.gameConfig.rewardThreshold && !player.hasBeenRewarded) {
        const rewardResult = await this.sendReward(player.publicWalletAddress);

        if (rewardResult.success) {
          player.hasBeenRewarded = true;
          console.log(
            `Reward sent to ${player.publicWalletAddress}. Transaction: ${rewardResult.txHash}`
          );
        }

        return { player, rewardSent: rewardResult };
      }

      return { player };
    } catch (error) {
      throw new Error(
        `Failed to update score: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Send reward to player
   */
  private async sendReward(toAddress: string): Promise<TransactionResult> {
    try {
      return await this.cosmosService.sendReward(
        toAddress,
        this.gameConfig.rewardAmount,
        `Game reward for achieving ${this.gameConfig.rewardThreshold} points!`
      );
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Get player by address
   */
  getPlayer(address: string): Player | undefined {
    return this.players.get(address);
  }

  /**
   * Get all players
   */
  getAllPlayers(): Player[] {
    return Array.from(this.players.values());
  }

  /**
   * Get chain configuration based on denom
   */
  private getChainConfigFromDenom(denom: string): CosmosChainConfig {
    if (denom.includes('uatom')) {
      return CHAIN_CONFIGS.cosmos;
    } else if (denom.includes('uosmo')) {
      return CHAIN_CONFIGS.osmosis;
    } else if (denom.includes('ujuno')) {
      return CHAIN_CONFIGS.juno;
    } else {
      // Default to Cosmos
      return CHAIN_CONFIGS.cosmos;
    }
  }

  /**
   * Check if service is ready
   */
  isReady(): boolean {
    return this.isInitialized;
  }
}

// Export all classes and types
export default CosmosRewarder;

