// Polkadot Birthday Token Minting Mechanism
// Creates personalized tokens based on user's birthday and initials
// Token amount = birthYear * 10000 (e.g., 1985 → 19,850,000 tokens)
// Ticker symbol = initials + birthYear (e.g., "CS1985")

/**
 * OVERVIEW:
 * 
 * This module creates personalized birthday tokens on Polkadot Asset Hub using the Assets pallet.
 * - User provides initials and birthday
 * - Token supply calculated from birth year (birthYear * 10000)
 * - Ticker symbol generated from initials + year
 * - Asset deployed to Polkadot Asset Hub
 * 
 * FEATURES:
 * - Assets pallet integration (Polkadot Asset Hub)
 * - Full transfer functionality
 * - Balance queries
 * - Birthday metadata embedded in asset metadata
 * - Full transaction history on Polkadot blockchain
 * - Supports both sr25519 and ed25519 key types
 * 
 * IMPORTANT NOTE:
 * - Tokens are created on Asset Hub (Polkadot parachain), not the relay chain
 * - Requires minimum deposit (~1 DOT) to create asset
 * - Ticker symbols limited to 10 bytes
 * 
 * USAGE:
 * const creator = new PolkadotBirthdayTokenCreator({
 *   network: 'polkadot' // or 'kusama' or 'westend'
 * });
 * const result = await creator.deployToken(privateKey, {
 *   initials: "CS",
 *   birthYear: 1985,
 *   birthMonth: 6,
 *   birthDay: 15
 * });
 */

import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import type { KeyringPair } from '@polkadot/keyring/types';

export interface BirthdayTokenConfig {
  initials: string; // 2-3 letter initials (e.g., "CS")
  birthYear: number; // Full year (e.g., 1985)
  birthMonth: number; // Month 1-12
  birthDay: number; // Day 1-31
  fullName?: string; // Optional full name for display
  decimals?: number; // Token decimals (default: 0)
}

export interface TokenDeploymentResult {
  assetId: number; // Unique asset ID on Asset Hub
  txHash: string; // Transaction hash
  tickerSymbol: string; // Generated ticker (e.g., "CS1985")
  tokenAmount: string; // Total supply (e.g., "19850000")
  ownerAddress: string; // Polkadot SS58 address
  subscanLink: string; // Subscan explorer link
  network: string; // Network name
}

export interface TokenMetadata {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: string;
  birthDate: {
    year: number;
    month: number;
    day: number;
  };
  owner: string;
  createdAt: string;
  type: 'birthday-token-v1';
}

export interface PolkadotConfig {
  network: 'polkadot' | 'kusama' | 'westend';
  rpcUrl?: string;
  keyType?: 'sr25519' | 'ed25519';
}

// Predefined network configurations
const NETWORK_CONFIGS = {
  polkadot: {
    assetHubRpc: 'wss://polkadot-asset-hub-rpc.polkadot.io',
    explorerUrl: 'https://assethub-polkadot.subscan.io',
    ss58Format: 0,
    name: 'Polkadot Asset Hub',
    minDeposit: '1 DOT',
  },
  kusama: {
    assetHubRpc: 'wss://kusama-asset-hub-rpc.polkadot.io',
    explorerUrl: 'https://assethub-kusama.subscan.io',
    ss58Format: 2,
    name: 'Kusama Asset Hub',
    minDeposit: '0.1 KSM',
  },
  westend: {
    assetHubRpc: 'wss://westend-asset-hub-rpc.polkadot.io',
    explorerUrl: 'https://assethub-westend.subscan.io',
    ss58Format: 42,
    name: 'Westend Asset Hub',
    minDeposit: '0.01 WND (testnet)',
  },
};

export class PolkadotBirthdayTokenCreator {
  private api: ApiPromise | null = null;
  private keyring: Keyring;
  private network: 'polkadot' | 'kusama' | 'westend';
  private rpcUrl: string;
  private keyType: 'sr25519' | 'ed25519';
  private networkConfig: typeof NETWORK_CONFIGS.polkadot;

  constructor(config: PolkadotConfig = { network: 'westend' }) {
    this.network = config.network;
    this.keyType = config.keyType || 'sr25519';
    this.networkConfig = NETWORK_CONFIGS[this.network];
    this.rpcUrl = config.rpcUrl || this.networkConfig.assetHubRpc;
    this.keyring = new Keyring({ 
      type: this.keyType,
      ss58Format: this.networkConfig.ss58Format 
    });
  }

  /**
   * Initialize connection to Asset Hub
   */
  private async initializeApi(): Promise<void> {
    if (!this.api) {
      await cryptoWaitReady();
      const provider = new WsProvider(this.rpcUrl);
      this.api = await ApiPromise.create({ provider });
      console.log(`Connected to ${this.networkConfig.name}`);
    }
  }

  /**
   * Calculate token amount based on birth year
   * Formula: birthYear * 10000
   * Example: 1985 → 19,850,000 tokens
   */
  private calculateTokenAmount(birthYear: number): string {
    return (birthYear * 10000).toString();
  }

  /**
   * Generate ticker symbol from initials and birth year
   * Format: INITIALS + YEAR
   * Example: "CS" + 1985 → "CS1985"
   * Note: Limited to 10 bytes for Asset Hub
   */
  private generateTickerSymbol(initials: string, birthYear: number): string {
    const ticker = `${initials.toUpperCase()}${birthYear}`;
    if (ticker.length > 10) {
      throw new Error('Ticker symbol too long (max 10 characters)');
    }
    return ticker;
  }

  /**
   * Validate birthday token configuration
   */
  private validateConfig(config: BirthdayTokenConfig): void {
    // Validate initials
    if (!config.initials || config.initials.length < 2 || config.initials.length > 3) {
      throw new Error('Initials must be 2-3 letters');
    }

    if (!/^[A-Za-z]+$/.test(config.initials)) {
      throw new Error('Initials must contain only letters');
    }

    // Validate birth year
    const currentYear = new Date().getFullYear();
    if (config.birthYear < 1900 || config.birthYear > currentYear) {
      throw new Error(`Birth year must be between 1900 and ${currentYear}`);
    }

    // Validate month
    if (config.birthMonth < 1 || config.birthMonth > 12) {
      throw new Error('Birth month must be between 1 and 12');
    }

    // Validate day
    if (config.birthDay < 1 || config.birthDay > 31) {
      throw new Error('Birth day must be between 1 and 31');
    }

    // Validate date exists
    const date = new Date(config.birthYear, config.birthMonth - 1, config.birthDay);
    if (
      date.getFullYear() !== config.birthYear ||
      date.getMonth() !== config.birthMonth - 1 ||
      date.getDate() !== config.birthDay
    ) {
      throw new Error('Invalid date');
    }
  }

  /**
   * Create token metadata
   */
  private createTokenMetadata(
    config: BirthdayTokenConfig,
    ownerAddress: string
  ): TokenMetadata {
    const tokenAmount = this.calculateTokenAmount(config.birthYear);
    const tickerSymbol = this.generateTickerSymbol(config.initials, config.birthYear);
    const tokenName = config.fullName
      ? `${config.fullName} Birthday Token`
      : `Birthday Token ${tickerSymbol}`;

    return {
      name: tokenName,
      symbol: tickerSymbol,
      decimals: config.decimals || 0,
      totalSupply: tokenAmount,
      birthDate: {
        year: config.birthYear,
        month: config.birthMonth,
        day: config.birthDay,
      },
      owner: ownerAddress,
      createdAt: new Date().toISOString(),
      type: 'birthday-token-v1',
    };
  }

  /**
   * Create keypair from private key/seed phrase
   */
  private createKeypair(privateKey: string): KeyringPair {
    try {
      // Try as seed phrase first (most common)
      if (privateKey.split(' ').length >= 12) {
        return this.keyring.addFromMnemonic(privateKey);
      }
      // Try as URI (supports //Alice, //Bob, etc. for testing)
      return this.keyring.addFromUri(privateKey);
    } catch (error) {
      throw new Error(
        `Failed to create keypair: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Generate a unique asset ID
   * In production, you should query for available IDs or use a deterministic method
   */
  private async generateAssetId(): Promise<number> {
    // Simple method: use timestamp-based ID
    // In production, check if ID is already taken
    const timestamp = Date.now();
    const assetId = timestamp % 1000000; // Keep it manageable
    return assetId;
  }

  /**
   * Check account balance
   */
  async checkBalance(privateKey: string): Promise<{
    address: string;
    balance: string;
    balancePlanck: bigint;
    hasEnoughBalance: boolean;
  }> {
    await this.initializeApi();
    if (!this.api) throw new Error('API not initialized');

    const keypair = this.createKeypair(privateKey);
    const accountInfo = await this.api.query.system.account(keypair.address);
    const balancePlanck = accountInfo.data.free.toBigInt();
    
    // Convert to DOT/KSM/WND (10 decimals)
    const balance = (Number(balancePlanck) / 1e10).toFixed(4);

    // Minimum 1 DOT for Polkadot, 0.1 KSM for Kusama, 0.01 WND for Westend
    const minBalances = { polkadot: 1e10, kusama: 1e9, westend: 1e8 };
    const hasEnoughBalance = balancePlanck >= BigInt(minBalances[this.network]);

    return {
      address: keypair.address,
      balance,
      balancePlanck,
      hasEnoughBalance,
    };
  }

  /**
   * Deploy birthday token to Polkadot Asset Hub
   * Main entry point for token creation
   */
  async deployToken(
    privateKey: string,
    config: BirthdayTokenConfig
  ): Promise<TokenDeploymentResult> {
    // Validate configuration
    this.validateConfig(config);

    // Initialize API
    await this.initializeApi();
    if (!this.api) throw new Error('API not initialized');

    // Create keypair
    const keypair = this.createKeypair(privateKey);

    // Check balance
    const balanceInfo = await this.checkBalance(privateKey);
    console.log(`\n=== Birthday Token Deployment ===`);
    console.log(`Network: ${this.networkConfig.name}`);
    console.log(`Address: ${balanceInfo.address}`);
    console.log(`Balance: ${balanceInfo.balance} ${this.network.toUpperCase()}`);

    if (!balanceInfo.hasEnoughBalance) {
      throw new Error(
        `Insufficient balance. Need at least ${this.networkConfig.minDeposit}. Current: ${balanceInfo.balance}`
      );
    }

    // Generate token metadata
    const metadata = this.createTokenMetadata(config, balanceInfo.address);
    const tickerSymbol = metadata.symbol;
    const tokenAmount = metadata.totalSupply;
    const decimals = metadata.decimals;

    console.log(`\nToken Details:`);
    console.log(`  Name: ${metadata.name}`);
    console.log(`  Symbol: ${tickerSymbol}`);
    console.log(`  Supply: ${parseInt(tokenAmount).toLocaleString()} tokens`);
    console.log(`  Decimals: ${decimals}`);
    console.log(`  Birthday: ${config.birthMonth}/${config.birthDay}/${config.birthYear}`);

    // Generate asset ID
    const assetId = await this.generateAssetId();
    console.log(`\nAsset ID: ${assetId}`);
    console.log(`Creating asset on ${this.networkConfig.name}...`);

    try {
      // Step 1: Create the asset
      const minBalance = 1; // Minimum balance required to hold this asset
      const createTx = this.api.tx.assets.create(
        assetId,
        keypair.address, // admin
        minBalance
      );

      // Step 2: Set metadata
      const name = metadata.name.substring(0, 32); // Max 32 bytes
      const symbol = tickerSymbol;
      const setMetadataTx = this.api.tx.assets.setMetadata(
        assetId,
        name,
        symbol,
        decimals
      );

      // Step 3: Mint tokens
      const mintAmount = BigInt(tokenAmount) * BigInt(10 ** decimals);
      const mintTx = this.api.tx.assets.mint(
        assetId,
        keypair.address,
        mintAmount
      );

      // Batch all transactions
      console.log(`\nSubmitting batch transaction...`);
      const batchTx = this.api.tx.utility.batchAll([createTx, setMetadataTx, mintTx]);

      // Sign and send
      const txHash = await new Promise<string>((resolve, reject) => {
        batchTx
          .signAndSend(keypair, ({ status, events, dispatchError }) => {
            if (status.isInBlock) {
              console.log(`Transaction included in block: ${status.asInBlock.toHex()}`);
            }

            if (status.isFinalized) {
              console.log(`Transaction finalized: ${status.asFinalized.toHex()}`);

              if (dispatchError) {
                if (dispatchError.isModule) {
                  const decoded = this.api!.registry.findMetaError(dispatchError.asModule);
                  reject(new Error(`${decoded.section}.${decoded.name}: ${decoded.docs}`));
                } else {
                  reject(new Error(dispatchError.toString()));
                }
              } else {
                resolve(status.asFinalized.toHex());
              }
            }
          })
          .catch(reject);
      });

      console.log(`\n🎉 Birthday Token Created!`);

      // Generate explorer link
      const subscanLink = `${this.networkConfig.explorerUrl}/asset/${assetId}`;
      console.log(`\nExplorer Link:`);
      console.log(`  ${subscanLink}`);

      return {
        assetId,
        txHash,
        tickerSymbol,
        tokenAmount,
        ownerAddress: balanceInfo.address,
        subscanLink,
        network: this.network,
      };
    } catch (error) {
      throw new Error(
        `Failed to deploy token: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Get asset info
   */
  async getAssetInfo(assetId: number): Promise<any> {
    await this.initializeApi();
    if (!this.api) throw new Error('API not initialized');

    try {
      const [details, metadata] = await Promise.all([
        this.api.query.assets.asset(assetId),
        this.api.query.assets.metadata(assetId),
      ]);

      if (details.isNone) {
        return null;
      }

      const asset = details.unwrap();
      const meta = metadata;

      return {
        assetId,
        owner: asset.owner.toString(),
        issuer: asset.issuer.toString(),
        admin: asset.admin.toString(),
        supply: asset.supply.toString(),
        minBalance: asset.minBalance.toString(),
        accounts: asset.accounts.toNumber(),
        name: meta.name.toUtf8(),
        symbol: meta.symbol.toUtf8(),
        decimals: meta.decimals.toNumber(),
      };
    } catch (error) {
      console.error('Error fetching asset info:', error);
      return null;
    }
  }

  /**
   * Get asset balance for an address
   */
  async getAssetBalance(assetId: number, address: string): Promise<string> {
    await this.initializeApi();
    if (!this.api) throw new Error('API not initialized');

    try {
      const balance = await this.api.query.assets.account(assetId, address);
      if (balance.isNone) {
        return '0';
      }
      return balance.unwrap().balance.toString();
    } catch (error) {
      console.error('Error fetching asset balance:', error);
      return '0';
    }
  }

  /**
   * Disconnect from API
   */
  async disconnect(): Promise<void> {
    if (this.api) {
      await this.api.disconnect();
      console.log('\nDisconnected from Asset Hub');
    }
  }

  /**
   * Helper: Convert initials from full name
   */
  static extractInitials(fullName: string): string {
    return fullName
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  }

  /**
   * Helper: Parse birthday string to config
   * Supports formats: "MM/DD/YYYY", "YYYY-MM-DD"
   */
  static parseBirthday(
    birthdayString: string
  ): Pick<BirthdayTokenConfig, 'birthYear' | 'birthMonth' | 'birthDay'> {
    let year: number, month: number, day: number;

    if (birthdayString.includes('/')) {
      // Format: MM/DD/YYYY
      const [m, d, y] = birthdayString.split('/').map(Number);
      month = m;
      day = d;
      year = y;
    } else if (birthdayString.includes('-')) {
      // Format: YYYY-MM-DD
      const [y, m, d] = birthdayString.split('-').map(Number);
      year = y;
      month = m;
      day = d;
    } else {
      throw new Error('Invalid birthday format. Use MM/DD/YYYY or YYYY-MM-DD');
    }

    return { birthYear: year, birthMonth: month, birthDay: day };
  }
}

/**
 * USAGE EXAMPLES:
 * 
 * // Basic usage - Westend Testnet
 * import { PolkadotBirthdayTokenCreator } from './DOT.Polkadot.token.birthday';
 * 
 * const creator = new PolkadotBirthdayTokenCreator({ network: 'westend' });
 * const privateKey = 'your mnemonic seed phrase here...';
 * 
 * const result = await creator.deployToken(privateKey, {
 *   initials: "CS",
 *   birthYear: 1985,
 *   birthMonth: 6,
 *   birthDay: 15,
 *   fullName: "Corey Stedman"
 * });
 * 
 * console.log(`Token ${result.tickerSymbol} created!`);
 * console.log(`Asset ID: ${result.assetId}`);
 * console.log(`View at: ${result.subscanLink}`);
 * 
 * // Kusama configuration
 * const kusamaCreator = new PolkadotBirthdayTokenCreator({ network: 'kusama' });
 * 
 * // Polkadot mainnet
 * const polkadotCreator = new PolkadotBirthdayTokenCreator({ network: 'polkadot' });
 * 
 * // With helper methods
 * const initials = PolkadotBirthdayTokenCreator.extractInitials("Corey Stedman");
 * const birthday = PolkadotBirthdayTokenCreator.parseBirthday("06/15/1985");
 * 
 * const result2 = await creator.deployToken(privateKey, {
 *   initials,
 *   ...birthday,
 *   fullName: "Corey Stedman"
 * });
 * 
 * // Check balance first
 * const balanceInfo = await creator.checkBalance(privateKey);
 * if (!balanceInfo.hasEnoughBalance) {
 *   console.log('Insufficient balance for deployment');
 * }
 * 
 * // Get asset info after deployment
 * const assetInfo = await creator.getAssetInfo(result.assetId);
 * console.log('Asset Info:', assetInfo);
 * 
 * // Get asset balance
 * const balance = await creator.getAssetBalance(
 *   result.assetId,
 *   balanceInfo.address
 * );
 * console.log('Asset Balance:', balance);
 * 
 * // Cleanup
 * await creator.disconnect();
 * 
 * DEPLOYMENT REQUIREMENTS:
 * - Wallet with sufficient balance (1 DOT / 0.1 KSM / 0.01 WND)
 * - Valid seed phrase or private key
 * - Valid initials (2-3 letters)
 * - Valid birthday (between 1900 and current year)
 * - Ticker symbol max 10 characters
 * 
 * SUPPORTED NETWORKS:
 * - Polkadot Asset Hub (mainnet)
 * - Kusama Asset Hub (mainnet)
 * - Westend Asset Hub (testnet)
 * 
 * TOKEN FEATURES:
 * - Transfer tokens between addresses
 * - Query balances on-chain
 * - Get total supply
 * - Full transaction history on Polkadot blockchain
 * - Native Substrate asset
 * 
 * SECURITY NOTES:
 * - Never commit seed phrases to version control
 * - Store keys securely
 * - Use environment variables for production
 * - Test on Westend testnet first
 * - Validate all user inputs
 * 
 * COST ESTIMATION:
 * - Polkadot: ~1 DOT deposit (refundable on asset destruction)
 * - Kusama: ~0.1 KSM deposit (refundable)
 * - Westend: ~0.01 WND (testnet, free from faucet)
 * - Transaction fees: ~0.01 DOT/KSM/WND
 */

export default PolkadotBirthdayTokenCreator;
