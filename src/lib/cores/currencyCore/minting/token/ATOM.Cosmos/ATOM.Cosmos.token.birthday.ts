// Cosmos Birthday Token Minting Mechanism
// Creates personalized tokens based on user's birthday and initials
// Token amount = birthYear * 10000 (e.g., 1985 → 19,850,000 tokens)
// Ticker symbol = initials + birthYear (e.g., "CS1985")

/**
 * OVERVIEW:
 * 
 * This module creates personalized birthday tokens on Cosmos SDK chains using TokenFactory.
 * - User provides initials and birthday
 * - Token supply calculated from birth year (birthYear * 10000)
 * - Ticker symbol generated from initials + year
 * - Token deployed using TokenFactory module (Osmosis, Neutron, etc.)
 * 
 * FEATURES:
 * - TokenFactory module support (Osmosis, Neutron, Quasar)
 * - Transfer functionality via IBC
 * - Balance queries
 * - Birthday metadata embedded in token
 * - Full transaction history on-chain
 * 
 * IMPORTANT NOTE:
 * - Cosmos Hub (mainnet ATOM) does NOT support TokenFactory
 * - Use Osmosis, Neutron, or other chains with TokenFactory module
 * - For Cosmos Hub, tokens must be created via governance or CosmWasm
 * 
 * USAGE:
 * const creator = new CosmosBirthdayTokenCreator({
 *   rpcEndpoint: 'https://rpc.osmosis.zone',
 *   chainId: 'osmosis-1'
 * });
 * const result = await creator.deployToken(privateKey, {
 *   initials: "CS",
 *   birthYear: 1985,
 *   birthMonth: 6,
 *   birthDay: 15
 * });
 */

import { DirectSecp256k1Wallet } from '@cosmjs/proto-signing';
import { SigningStargateClient, GasPrice, StdFee } from '@cosmjs/stargate';
import { EncodeObject } from '@cosmjs/proto-signing';

export interface BirthdayTokenConfig {
  initials: string; // 2-3 letter initials (e.g., "CS")
  birthYear: number; // Full year (e.g., 1985)
  birthMonth: number; // Month 1-12
  birthDay: number; // Day 1-31
  fullName?: string; // Optional full name for display
}

export interface TokenDeploymentResult {
  txHash: string; // Transaction hash
  denom: string; // Full token denomination (factory/{address}/{subdenom})
  subdenom: string; // Token subdenom
  tickerSymbol: string; // Generated ticker (e.g., "CS1985")
  tokenAmount: string; // Total supply (e.g., "19850000")
  ownerAddress: string; // Cosmos wallet address
  explorerLink: string; // Block explorer link
}

export interface TokenMetadata {
  ticker: string;
  name: string;
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

export interface CosmosConfig {
  rpcEndpoint: string;
  chainId: string;
  gasPrice: string;
  prefix: string;
  explorerUrl: string;
}

// Predefined chain configurations
export const CHAIN_CONFIGS: Record<string, CosmosConfig> = {
  osmosis: {
    rpcEndpoint: 'https://rpc.osmosis.zone',
    chainId: 'osmosis-1',
    gasPrice: '0.025uosmo',
    prefix: 'osmo',
    explorerUrl: 'https://www.mintscan.io/osmosis/tx',
  },
  'osmosis-testnet': {
    rpcEndpoint: 'https://rpc.testnet.osmosis.zone',
    chainId: 'osmo-test-5',
    gasPrice: '0.025uosmo',
    prefix: 'osmo',
    explorerUrl: 'https://testnet.mintscan.io/osmosis-testnet/tx',
  },
  neutron: {
    rpcEndpoint: 'https://rpc-kralum.neutron-1.neutron.org',
    chainId: 'neutron-1',
    gasPrice: '0.025untrn',
    prefix: 'neutron',
    explorerUrl: 'https://www.mintscan.io/neutron/tx',
  },
  'neutron-testnet': {
    rpcEndpoint: 'https://rpc-palvus.pion-1.ntrn.tech',
    chainId: 'pion-1',
    gasPrice: '0.025untrn',
    prefix: 'neutron',
    explorerUrl: 'https://testnet.mintscan.io/neutron-testnet/tx',
  },
};

export class CosmosBirthdayTokenCreator {
  private config: CosmosConfig;

  constructor(config?: Partial<CosmosConfig> | string) {
    if (typeof config === 'string') {
      // If string provided, use predefined chain config
      const predefinedConfig = CHAIN_CONFIGS[config];
      if (!predefinedConfig) {
        throw new Error(
          `Unknown chain: ${config}. Available: ${Object.keys(CHAIN_CONFIGS).join(', ')}`
        );
      }
      this.config = predefinedConfig;
    } else {
      // Use default Osmosis config or merge with provided config
      this.config = {
        ...CHAIN_CONFIGS.osmosis,
        ...config,
      };
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
   */
  private generateTickerSymbol(initials: string, birthYear: number): string {
    return `${initials.toUpperCase()}${birthYear}`;
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
      ticker: tickerSymbol,
      name: tokenName,
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
   * Create wallet from private key
   */
  private async createWallet(privateKey: string): Promise<DirectSecp256k1Wallet> {
    // Handle hex private key (with or without 0x prefix)
    const cleanKey = privateKey.replace(/^0x/, '').trim();
    
    if (!/^[0-9a-f]{64}$/i.test(cleanKey)) {
      throw new Error('Private key must be 64 hexadecimal characters (32 bytes)');
    }

    const keyBytes = Uint8Array.from(Buffer.from(cleanKey, 'hex'));
    return DirectSecp256k1Wallet.fromKey(keyBytes, this.config.prefix);
  }

  /**
   * Check wallet balance before deployment
   */
  async checkWalletBalance(privateKey: string): Promise<{
    address: string;
    balance: string;
    denom: string;
    hasEnoughBalance: boolean;
  }> {
    const wallet = await this.createWallet(privateKey);
    const [account] = await wallet.getAccounts();

    const client = await SigningStargateClient.connectWithSigner(
      this.config.rpcEndpoint,
      wallet,
      {
        gasPrice: GasPrice.fromString(this.config.gasPrice),
      }
    );

    const balances = await client.getAllBalances(account.address);
    const mainBalance = balances.find((b) => b.denom === this.config.gasPrice.match(/[a-z]+$/)?.[0]);

    const balance = mainBalance ? mainBalance.amount : '0';
    const denom = mainBalance ? mainBalance.denom : this.config.gasPrice.match(/[a-z]+$/)?.[0] || 'unknown';

    // Estimate minimum required: ~0.5 tokens for gas (conservative estimate)
    const hasEnoughBalance = parseInt(balance) >= 500000;

    return {
      address: account.address,
      balance,
      denom,
      hasEnoughBalance,
    };
  }

  /**
   * Deploy birthday token to Cosmos chain
   * Main entry point for token creation
   */
  async deployToken(
    privateKey: string,
    config: BirthdayTokenConfig
  ): Promise<TokenDeploymentResult> {
    // Validate configuration
    this.validateConfig(config);

    // Create wallet
    const wallet = await this.createWallet(privateKey);
    const [account] = await wallet.getAccounts();

    // Check wallet balance
    const walletInfo = await this.checkWalletBalance(privateKey);
    console.log(`\n=== Birthday Token Deployment ===`);
    console.log(`Chain: ${this.config.chainId}`);
    console.log(`Wallet Address: ${walletInfo.address}`);
    console.log(`Wallet Balance: ${walletInfo.balance} ${walletInfo.denom}`);

    if (!walletInfo.hasEnoughBalance) {
      throw new Error(
        `Insufficient balance. Need at least 0.5 ${walletInfo.denom} for deployment. Current: ${walletInfo.balance}`
      );
    }

    // Generate token metadata
    const metadata = this.createTokenMetadata(config, walletInfo.address);
    const tickerSymbol = metadata.ticker;
    const tokenAmount = metadata.totalSupply;
    const subdenom = tickerSymbol.toLowerCase();
    const fullDenom = `factory/${account.address}/${subdenom}`;

    console.log(`\nToken Details:`);
    console.log(`  Name: ${metadata.name}`);
    console.log(`  Ticker: ${tickerSymbol}`);
    console.log(`  Supply: ${parseInt(tokenAmount).toLocaleString()} tokens`);
    console.log(`  Birthday: ${config.birthMonth}/${config.birthDay}/${config.birthYear}`);
    console.log(`  Denom: ${fullDenom}`);

    // Connect to chain
    const client = await SigningStargateClient.connectWithSigner(
      this.config.rpcEndpoint,
      wallet,
      {
        gasPrice: GasPrice.fromString(this.config.gasPrice),
      }
    );

    console.log(`\nCreating token on ${this.config.chainId}...`);

    // Create messages for TokenFactory
    const createDenomMsg: EncodeObject = {
      typeUrl: '/osmosis.tokenfactory.v1beta1.MsgCreateDenom',
      value: {
        sender: account.address,
        subdenom: subdenom,
      },
    };

    const mintMsg: EncodeObject = {
      typeUrl: '/osmosis.tokenfactory.v1beta1.MsgMint',
      value: {
        sender: account.address,
        amount: {
          denom: fullDenom,
          amount: tokenAmount,
        },
        mintToAddress: account.address,
      },
    };

    // Add metadata as memo
    const memo = JSON.stringify({
      type: 'birthday-token-v1',
      birthDate: metadata.birthDate,
      createdAt: metadata.createdAt,
      ticker: tickerSymbol,
    });

    try {
      // Broadcast transaction with both messages
      const result = await client.signAndBroadcast(
        account.address,
        [createDenomMsg, mintMsg],
        'auto',
        memo
      );

      if (result.code !== 0) {
        throw new Error(`Transaction failed: ${result.rawLog}`);
      }

      console.log(`\n🎉 Birthday Token Created!`);
      console.log(`Transaction Hash: ${result.transactionHash}`);

      // Generate explorer link
      const explorerLink = `${this.config.explorerUrl}/${result.transactionHash}`;
      console.log(`\nExplorer Link:`);
      console.log(`  ${explorerLink}`);

      return {
        txHash: result.transactionHash,
        denom: fullDenom,
        subdenom,
        tickerSymbol,
        tokenAmount,
        ownerAddress: walletInfo.address,
        explorerLink,
      };
    } catch (error) {
      throw new Error(
        `Failed to create token: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Query token supply
   */
  async getTokenSupply(denom: string): Promise<string> {
    const wallet = await DirectSecp256k1Wallet.generate(24, { prefix: this.config.prefix });
    const client = await SigningStargateClient.connectWithSigner(
      this.config.rpcEndpoint,
      wallet,
      {
        gasPrice: GasPrice.fromString(this.config.gasPrice),
      }
    );

    try {
      const supply = await client.getBalance(denom, denom);
      return supply.amount;
    } catch (error) {
      console.error('Error fetching token supply:', error);
      return '0';
    }
  }

  /**
   * Get account's token balance
   */
  async getTokenBalance(address: string, denom: string): Promise<string> {
    const wallet = await DirectSecp256k1Wallet.generate(24, { prefix: this.config.prefix });
    const client = await SigningStargateClient.connectWithSigner(
      this.config.rpcEndpoint,
      wallet,
      {
        gasPrice: GasPrice.fromString(this.config.gasPrice),
      }
    );

    try {
      const balance = await client.getBalance(address, denom);
      return balance.amount;
    } catch (error) {
      console.error('Error fetching balance:', error);
      return '0';
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
 * // Basic usage - Osmosis Mainnet
 * import { CosmosBirthdayTokenCreator } from './ATOM.Cosmos.token.birthday';
 * 
 * const creator = new CosmosBirthdayTokenCreator('osmosis');
 * const privateKey = 'your-64-char-hex-private-key';
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
 * console.log(`Denom: ${result.denom}`);
 * console.log(`View at: ${result.explorerLink}`);
 * 
 * // Neutron configuration
 * const neutronCreator = new CosmosBirthdayTokenCreator('neutron');
 * 
 * // Custom configuration
 * const customCreator = new CosmosBirthdayTokenCreator({
 *   rpcEndpoint: 'https://your-rpc-endpoint.com',
 *   chainId: 'your-chain-1',
 *   gasPrice: '0.025utoken',
 *   prefix: 'cosmos',
 *   explorerUrl: 'https://explorer.com/tx'
 * });
 * 
 * // With helper methods
 * const initials = CosmosBirthdayTokenCreator.extractInitials("Corey Stedman");
 * const birthday = CosmosBirthdayTokenCreator.parseBirthday("06/15/1985");
 * 
 * const result2 = await creator.deployToken(privateKey, {
 *   initials,
 *   ...birthday,
 *   fullName: "Corey Stedman"
 * });
 * 
 * // Check wallet balance first
 * const walletInfo = await creator.checkWalletBalance(privateKey);
 * if (!walletInfo.hasEnoughBalance) {
 *   console.log('Insufficient balance for deployment');
 * }
 * 
 * // Get token balance after deployment
 * const balance = await creator.getTokenBalance(
 *   walletInfo.address,
 *   result.denom
 * );
 * console.log('Token Balance:', balance);
 * 
 * DEPLOYMENT REQUIREMENTS:
 * - Wallet with at least 0.5 native tokens (OSMO, NTRN, etc.)
 * - Valid secp256k1 private key (32 bytes / 64 hex chars)
 * - Valid initials (2-3 letters)
 * - Valid birthday (between 1900 and current year)
 * - Chain must support TokenFactory module
 * 
 * SUPPORTED CHAINS:
 * - Osmosis (mainnet & testnet)
 * - Neutron (mainnet & testnet)
 * - Any Cosmos SDK chain with TokenFactory module
 * 
 * NOTE: Cosmos Hub (ATOM) does NOT support TokenFactory!
 * 
 * TOKEN FEATURES:
 * - Transfer tokens between addresses via IBC
 * - Query balances on-chain
 * - Get total supply
 * - Full transaction history on Cosmos blockchain
 * - Native Cosmos SDK token
 * 
 * SECURITY NOTES:
 * - Never commit private keys to version control
 * - Store keys securely
 * - Use environment variables for production
 * - Test on testnets first
 * - Validate all user inputs
 * 
 * COST ESTIMATION:
 * - Token creation: ~0.001-0.01 native tokens (varies by chain)
 * - Minting: included in creation
 * - Total: <0.1 native tokens typically
 * - Exact cost depends on gas prices and chain congestion
 */

export default CosmosBirthdayTokenCreator;
