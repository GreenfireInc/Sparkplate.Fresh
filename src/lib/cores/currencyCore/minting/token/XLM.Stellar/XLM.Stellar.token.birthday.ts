// Stellar Birthday Token Minting Mechanism
// Creates personalized native assets based on user's birthday and initials
// Token amount = birthYear * 10000 (e.g., 1985 → 19,850,000 tokens)
// Ticker symbol = initials + birthYear (e.g., "CS1985")

/**
 * OVERVIEW:
 * 
 * This module creates personalized birthday tokens on Stellar using native asset issuance.
 * - User provides initials and birthday
 * - Token supply calculated from birth year (birthYear * 10000)
 * - Ticker symbol generated from initials + year
 * - Native Stellar asset issued (NO smart contract needed!)
 * 
 * STELLAR HIGHLIGHTS:
 * - 🌟 **Native Asset Support** - Built-in multi-currency (no contracts!)
 * - ⚡ **Ultra-Fast** - 2-5 second finality
 * - 💰 **Ultra-Cheap** - 0.00001 XLM per operation (~$0.000001!)
 * - 🌐 **Global Payments** - Optimized for cross-border transfers
 * - 🔗 **Anchors** - Connect to fiat currencies
 * - 🎯 **Simple API** - One of the easiest blockchains
 * 
 * UNIQUE FEATURES:
 * - Native multi-currency support (assets built-in!)
 * - Trustlines (explicit opt-in to hold assets)
 * - Path payments (automatic currency conversion!)
 * - Stellar Consensus Protocol (SCP) - unique consensus
 * - Ed25519 keys (modern, fast, secure)
 * - Secret keys start with 'S', public with 'G'
 * - Works on Mainnet, Testnet
 * - Built-in DEX (SDEX)
 * 
 * USAGE:
 * const creator = new StellarBirthdayTokenCreator({
 *   network: 'testnet' // or 'mainnet'
 * });
 * const result = await creator.deployToken(secretKey, {
 *   initials: "CS",
 *   birthYear: 1985,
 *   birthMonth: 6,
 *   birthDay: 15
 * });
 */

import * as StellarSdk from '@stellar/stellar-sdk';

export interface BirthdayTokenConfig {
  initials: string; // 1-8 letters (asset code limit: 12 chars total with year)
  birthYear: number; // Full year (e.g., 1985)
  birthMonth: number; // Month 1-12
  birthDay: number; // Day 1-31
  fullName?: string; // Optional full name for display
  description?: string; // Optional: custom description (stored in home domain)
}

export interface TokenDeploymentResult {
  txHash: string; // Transaction ID
  assetCode: string; // Asset code (e.g., "CS1985")
  issuer: string; // Issuer public key (G...)
  tokenAmount: string; // Total supply (e.g., "19850000")
  explorerLink: string; // Stellar Expert link
  decimals: number; // Always 7 for Stellar
}

export interface TokenMetadata {
  assetCode: string;
  name: string;
  totalSupply: string;
  decimals: number; // Always 7 for Stellar
  birthDate: {
    year: number;
    month: number;
    day: number;
  };
  issuer: string;
  createdAt: string;
  type: 'birthday-token-v1';
  chain: 'stellar';
}

export interface StellarConfig {
  network: 'mainnet' | 'testnet';
}

export class StellarBirthdayTokenCreator {
  private server: StellarSdk.Horizon.Server;
  private networkPassphrase: string;
  private network: 'mainnet' | 'testnet';
  private explorerUrl: string;

  constructor(config: StellarConfig = { network: 'testnet' }) {
    this.network = config.network;

    // Set network parameters
    if (this.network === 'mainnet') {
      this.server = new StellarSdk.Horizon.Server('https://horizon.stellar.org');
      this.networkPassphrase = StellarSdk.Networks.PUBLIC;
      this.explorerUrl = 'https://stellar.expert/explorer/public';
    } else {
      this.server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');
      this.networkPassphrase = StellarSdk.Networks.TESTNET;
      this.explorerUrl = 'https://stellar.expert/explorer/testnet';
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
   * Generate asset code from initials and birth year
   * Format: INITIALS + YEAR
   * Example: "CS" + 1985 → "CS1985"
   * Max length: 12 characters (Stellar limit)
   */
  private generateAssetCode(initials: string, birthYear: number): string {
    return `${initials.toUpperCase()}${birthYear}`;
  }

  /**
   * Validate birthday token configuration
   */
  private validateConfig(config: BirthdayTokenConfig): void {
    // Validate initials
    if (!config.initials || config.initials.length < 1 || config.initials.length > 8) {
      throw new Error('Initials must be 1-8 letters');
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

    // Validate asset code length (max 12 characters)
    const assetCode = this.generateAssetCode(config.initials, config.birthYear);
    if (assetCode.length > 12) {
      throw new Error(
        `Asset code "${assetCode}" is too long (${assetCode.length} chars). Max 12 chars. Use shorter initials.`
      );
    }
  }

  /**
   * Validate Stellar secret key format
   */
  private validateSecretKey(secretKey: string): void {
    if (!secretKey.startsWith('S')) {
      throw new Error('Stellar secret key must start with "S"');
    }

    try {
      StellarSdk.Keypair.fromSecret(secretKey);
    } catch (error) {
      throw new Error('Invalid Stellar secret key format');
    }
  }

  /**
   * Get keypair from secret key
   */
  private getKeypair(secretKey: string): StellarSdk.Keypair {
    return StellarSdk.Keypair.fromSecret(secretKey);
  }

  /**
   * Get public key from secret key
   */
  private getPublicKey(secretKey: string): string {
    return this.getKeypair(secretKey).publicKey();
  }

  /**
   * Check XLM balance
   */
  async checkBalance(secretKey: string): Promise<{
    publicKey: string;
    balanceXLM: string;
    hasEnoughBalance: boolean;
    accountExists: boolean;
  }> {
    const publicKey = this.getPublicKey(secretKey);

    try {
      const account = await this.server.loadAccount(publicKey);
      
      // Find XLM balance
      const xlmBalance = account.balances.find((b: any) => b.asset_type === 'native');
      const balanceXLM = xlmBalance ? xlmBalance.balance : '0';
      const requiredXLM = this.network === 'mainnet' ? 3 : 2;

      return {
        publicKey,
        balanceXLM,
        hasEnoughBalance: parseFloat(balanceXLM) >= requiredXLM,
        accountExists: true,
      };
    } catch (error: any) {
      if (error?.response?.status === 404) {
        return {
          publicKey,
          balanceXLM: '0',
          hasEnoughBalance: false,
          accountExists: false,
        };
      }
      throw new Error(
        `Failed to check balance: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Create token metadata
   */
  private createTokenMetadata(
    config: BirthdayTokenConfig,
    issuer: string,
    assetCode: string
  ): TokenMetadata {
    const tokenAmount = this.calculateTokenAmount(config.birthYear);
    const tokenName = config.fullName
      ? `${config.fullName} Birthday Token`
      : `Birthday Token ${assetCode}`;

    return {
      assetCode,
      name: tokenName,
      totalSupply: tokenAmount,
      decimals: 7, // Stellar always uses 7 decimals
      birthDate: {
        year: config.birthYear,
        month: config.birthMonth,
        day: config.birthDay,
      },
      issuer,
      createdAt: new Date().toISOString(),
      type: 'birthday-token-v1',
      chain: 'stellar',
    };
  }

  /**
   * Deploy birthday token to Stellar
   * Main entry point for token creation
   */
  async deployToken(
    secretKey: string,
    config: BirthdayTokenConfig
  ): Promise<TokenDeploymentResult> {
    // Validate configuration
    this.validateConfig(config);
    this.validateSecretKey(secretKey);

    // Get keypair and public key
    const keypair = this.getKeypair(secretKey);
    const issuer = keypair.publicKey();

    // Generate token details
    const assetCode = this.generateAssetCode(config.initials, config.birthYear);
    const tokenAmount = this.calculateTokenAmount(config.birthYear);
    const decimals = 7; // Stellar always uses 7 decimals

    console.log(`\n=== Birthday Token Deployment ===`);
    console.log(`Network: Stellar ${this.network.toUpperCase()}`);
    console.log(`\nToken Details:`);
    console.log(`  Asset Code: ${assetCode}`);
    console.log(`  Supply: ${parseInt(tokenAmount).toLocaleString()} tokens`);
    console.log(`  Decimals: ${decimals} (Stellar standard)`);
    console.log(`  Birthday: ${config.birthMonth}/${config.birthDay}/${config.birthYear}`);
    console.log(`  Issuer: ${issuer}`);

    // Check balance
    console.log(`\nChecking XLM balance...`);
    const balance = await this.checkBalance(secretKey);
    console.log(`  Balance: ${balance.balanceXLM} XLM`);
    console.log(`  Account Exists: ${balance.accountExists}`);

    if (!balance.accountExists) {
      const fundUrl =
        this.network === 'testnet'
          ? `https://friendbot.stellar.org?addr=${issuer}`
          : 'https://www.stellar.org/lumens/exchanges';
      throw new Error(
        `Account ${issuer} does not exist. ` +
          (this.network === 'testnet'
            ? `Fund it at: ${fundUrl}`
            : `Purchase XLM and send to: ${issuer}`)
      );
    }

    if (!balance.hasEnoughBalance) {
      const required = this.network === 'mainnet' ? 3 : 2;
      throw new Error(
        `Insufficient XLM balance. Need at least ${required} XLM, have ${balance.balanceXLM} XLM`
      );
    }

    console.log(`\nIssuing native Stellar asset...`);
    console.log(`⚠️  This will take 2-5 seconds...`);

    try {
      // Load account
      const account = await this.server.loadAccount(issuer);

      // Create the asset
      const asset = new StellarSdk.Asset(assetCode, issuer);

      // Build transaction to:
      // 1. Create trustline (from issuer to issuer - allows issuer to hold their own asset)
      // 2. Payment operation (issue tokens to self)
      const transaction = new StellarSdk.TransactionBuilder(account, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: this.networkPassphrase,
      })
        // Trustline: Allow issuer to hold their own asset
        .addOperation(
          StellarSdk.Operation.changeTrust({
            asset: asset,
            limit: tokenAmount, // Max amount issuer can hold
          })
        )
        // Payment: Issue tokens from issuer to issuer (creates the supply)
        .addOperation(
          StellarSdk.Operation.payment({
            destination: issuer,
            asset: asset,
            amount: tokenAmount,
          })
        )
        .setTimeout(30)
        .build();

      // Sign transaction
      transaction.sign(keypair);

      console.log(`Transaction created. Broadcasting...`);

      // Submit transaction
      const result = await this.server.submitTransaction(transaction);
      const txHash = result.hash;

      console.log(`\n🎉 Birthday Token Issued!`);
      console.log(`Asset Code: ${assetCode}`);
      console.log(`Transaction: ${txHash}`);

      // Generate explorer links
      const explorerLink = `${this.explorerUrl}/tx/${txHash}`;
      const assetLink = `${this.explorerUrl}/asset/${assetCode}-${issuer}`;

      console.log(`\nExplorer Links:`);
      console.log(`  Transaction: ${explorerLink}`);
      console.log(`  Asset: ${assetLink}`);
      console.log(`\n✅ Deployment complete! (2-5 seconds on Stellar)`);

      console.log(`\n💡 To allow others to hold your token:`);
      console.log(`   They must create a trustline to: ${assetCode}:${issuer}`);

      return {
        txHash,
        assetCode,
        issuer,
        tokenAmount,
        explorerLink,
        decimals,
      };
    } catch (error: any) {
      // Handle specific Stellar errors
      if (error?.response?.data?.extras?.result_codes) {
        const codes = error.response.data.extras.result_codes;
        throw new Error(
          `Stellar transaction failed: ${JSON.stringify(codes, null, 2)}`
        );
      }
      throw new Error(
        `Failed to deploy token: ${error instanceof Error ? error.message : String(error)}`
      );
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
 * // Basic usage - Stellar Mainnet
 * import { StellarBirthdayTokenCreator } from './XLM.Stellar.token.birthday';
 * 
 * const creator = new StellarBirthdayTokenCreator({ network: 'mainnet' });
 * 
 * const secretKey = 'S...'; // Your Stellar secret key (starts with S)
 * 
 * const result = await creator.deployToken(secretKey, {
 *   initials: "CS",
 *   birthYear: 1985,
 *   birthMonth: 6,
 *   birthDay: 15,
 *   fullName: "Corey Stedman",
 *   description: "My birthday token"
 * });
 * 
 * console.log(`Token ${result.assetCode} issued!`);
 * console.log(`Issuer: ${result.issuer}`);
 * console.log(`View at: ${result.explorerLink}`);
 * 
 * // Testnet configuration
 * const testnetCreator = new StellarBirthdayTokenCreator({ network: 'testnet' });
 * 
 * // With helper methods
 * const initials = StellarBirthdayTokenCreator.extractInitials("Corey Stedman");
 * const birthday = StellarBirthdayTokenCreator.parseBirthday("06/15/1985");
 * 
 * const result2 = await creator.deployToken(secretKey, {
 *   initials,
 *   ...birthday,
 *   fullName: "Corey Stedman"
 * });
 * 
 * DEPLOYMENT REQUIREMENTS:
 * - Account with at least 3 XLM (mainnet) or 2 XLM (testnet)
 * - Valid Stellar secret key (starts with 'S')
 * - Valid initials (1-8 letters, max 12 chars total with year)
 * - Valid birthday (between 1900 and current year)
 * 
 * TOKEN FEATURES:
 * - Native Stellar asset (NOT a smart contract!)
 * - Transfer tokens between addresses
 * - Query balances
 * - Get total supply
 * - Trustlines required (users opt-in to hold assets)
 * - Built-in DEX integration (SDEX)
 * - Path payments (automatic conversion!)
 * - 7 decimals (Stellar standard)
 * - 2-5 second finality
 * - Ultra-low cost (0.00001 XLM per operation)
 * 
 * SECURITY NOTES:
 * - Never commit secret keys to version control
 * - Store keys securely (hardware wallet, env variables)
 * - Use environment variables for production
 * - Test on testnet first
 * - Validate all user inputs
 * - Stellar secret = starts with 'S'
 * - Stellar public = starts with 'G'
 * - Ed25519 keys (NOT secp256k1)
 * 
 * COST ESTIMATION:
 * - Asset issuance: 0.00002 XLM (~$0.000002 at $0.10/XLM)
 * - Transfer: 0.00001 XLM (~$0.000001)
 * - Trustline: 0.00001 XLM (~$0.000001)
 * - Base reserve: 0.5 XLM per trustline
 * - Testnet: Free (get from friendbot)
 * 
 * UNIQUE STELLAR FEATURES:
 * - Native multi-currency support (assets built-in!)
 * - Trustlines (explicit opt-in security model)
 * - Path payments (automatic currency conversion)
 * - Stellar Consensus Protocol (SCP) - unique, federated
 * - Ultra-fast (2-5 seconds)
 * - Ultra-cheap (0.00001 XLM = ~$0.000001)
 * - Ed25519 keys (modern, secure)
 * - Built-in DEX (SDEX)
 * - Anchors (connect to fiat)
 * - Global payments optimized
 */

export default StellarBirthdayTokenCreator;
