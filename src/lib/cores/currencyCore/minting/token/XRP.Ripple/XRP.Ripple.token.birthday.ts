// Ripple Birthday Token Minting Mechanism
// Creates personalized issued currencies based on user's birthday and initials
// Token amount = birthYear * 10000 (e.g., 1985 → 19,850,000 tokens)
// Currency code = initials + birthYear (e.g., "CS1985")

/**
 * OVERVIEW:
 * 
 * This module creates personalized birthday tokens on XRP Ledger using issued currencies (IOUs).
 * - User provides initials and birthday
 * - Token supply calculated from birth year (birthYear * 10000)
 * - Currency code generated from initials + year
 * - Native XRP Ledger issued currency (NO smart contract!)
 * 
 * XRP LEDGER HIGHLIGHTS:
 * - 💰 **Ultra-Cheap** - 0.00001 XRP (~$0.000006!) per transaction
 * - ⚡ **Ultra-Fast** - 3-5 second finality
 * - 🌐 **Payment Focus** - Built for global payments
 * - 🔗 **Trustlines** - Users opt-in to hold currencies (like Stellar)
 * - 📊 **DEX Built-in** - Native decentralized exchange
 * - 💵 **IOUs** - Issued currencies represent any value
 * 
 * UNIQUE FEATURES:
 * - Issued currencies (IOUs) - native multi-currency support
 * - Trustlines (explicit opt-in to hold currencies)
 * - XRP Ledger Consensus Protocol (unique, efficient)
 * - Payment channels (instant micropayments)
 * - Escrow (time-locked payments)
 * - Works on Mainnet, Testnet, Devnet
 * - Secret keys (s...), addresses (r...)
 * - Ed25519 or secp256k1 keys
 * 
 * USAGE:
 * const creator = new RippleBirthdayTokenCreator({
 *   network: 'testnet' // or 'mainnet'
 * });
 * const result = await creator.deployToken(secretKey, {
 *   initials: "CS",
 *   birthYear: 1985,
 *   birthMonth: 6,
 *   birthDay: 15
 * });
 */

import { Client, Wallet, TrustSetFlagsInterface } from 'xrpl';

export interface BirthdayTokenConfig {
  initials: string; // 1-8 letters (currency code max 12 chars with year)
  birthYear: number; // Full year (e.g., 1985)
  birthMonth: number; // Month 1-12
  birthDay: number; // Day 1-31
  fullName?: string; // Optional full name for display
  description?: string; // Optional: custom description
}

export interface TokenDeploymentResult {
  txHash: string; // Transaction ID
  currencyCode: string; // Currency code (e.g., "CS1985")
  currencyHex: string; // Hex-encoded currency code
  issuer: string; // Issuer address (r...)
  tokenAmount: string; // Total supply (e.g., "19850000")
  explorerLink: string; // XRP Explorer link
}

export interface TokenMetadata {
  currencyCode: string;
  name: string;
  totalSupply: string;
  birthDate: {
    year: number;
    month: number;
    day: number;
  };
  issuer: string;
  createdAt: string;
  type: 'birthday-token-v1';
  chain: 'xrp';
}

export interface RippleConfig {
  network: 'mainnet' | 'testnet' | 'devnet';
}

export class RippleBirthdayTokenCreator {
  private client: Client;
  private network: 'mainnet' | 'testnet' | 'devnet';
  private explorerUrl: string;

  constructor(config: RippleConfig = { network: 'testnet' }) {
    this.network = config.network;

    // Set network parameters
    let serverUrl: string;
    if (this.network === 'mainnet') {
      serverUrl = 'wss://xrplcluster.com';
      this.explorerUrl = 'https://livenet.xrpl.org';
    } else if (this.network === 'devnet') {
      serverUrl = 'wss://s.devnet.rippletest.net:51233';
      this.explorerUrl = 'https://devnet.xrpl.org';
    } else {
      // testnet
      serverUrl = 'wss://s.altnet.rippletest.net:51233';
      this.explorerUrl = 'https://testnet.xrpl.org';
    }

    this.client = new Client(serverUrl);
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
   * Generate currency code from initials and birth year
   * Format: INITIALS + YEAR
   * Example: "CS" + 1985 → "CS1985"
   * Max length: 20 characters (XRP Ledger limit for hex-encoded)
   */
  private generateCurrencyCode(initials: string, birthYear: number): string {
    return `${initials.toUpperCase()}${birthYear}`;
  }

  /**
   * Convert currency code to hex format (XRP Ledger requirement for non-standard codes)
   * Standard codes are 3 characters (e.g., "USD", "EUR")
   * Non-standard codes must be hex-encoded (40 hex chars = 20 bytes)
   */
  private currencyToHex(currencyCode: string): string {
    // Pad to 20 bytes and convert to hex
    const padded = currencyCode.padEnd(20, '\0');
    return Buffer.from(padded, 'utf-8').toString('hex').toUpperCase();
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

    // Validate currency code length (max 20 characters before hex encoding)
    const currencyCode = this.generateCurrencyCode(config.initials, config.birthYear);
    if (currencyCode.length > 20) {
      throw new Error(
        `Currency code "${currencyCode}" is too long (${currencyCode.length} chars). Max 20 chars. Use shorter initials.`
      );
    }
  }

  /**
   * Validate XRP secret key format
   */
  private validateSecretKey(secretKey: string): void {
    if (!secretKey.startsWith('s')) {
      throw new Error('XRP secret key must start with "s"');
    }

    try {
      Wallet.fromSeed(secretKey);
    } catch (error) {
      throw new Error('Invalid XRP secret key format');
    }
  }

  /**
   * Get wallet from secret key
   */
  private getWallet(secretKey: string): Wallet {
    return Wallet.fromSeed(secretKey);
  }

  /**
   * Get address from secret key
   */
  private getAddress(secretKey: string): string {
    return this.getWallet(secretKey).address;
  }

  /**
   * Check XRP balance
   */
  async checkBalance(secretKey: string): Promise<{
    address: string;
    balanceXRP: string;
    hasEnoughBalance: boolean;
    accountExists: boolean;
  }> {
    const address = this.getAddress(secretKey);

    try {
      await this.client.connect();

      const response = await this.client.request({
        command: 'account_info',
        account: address,
        ledger_index: 'validated',
      });

      const balanceDrops = response.result.account_data.Balance;
      const balanceXRP = (parseInt(balanceDrops) / 1000000).toFixed(6);
      const requiredXRP = this.network === 'mainnet' ? 20 : 10;

      await this.client.disconnect();

      return {
        address,
        balanceXRP,
        hasEnoughBalance: parseFloat(balanceXRP) >= requiredXRP,
        accountExists: true,
      };
    } catch (error: any) {
      await this.client.disconnect();

      if (error?.data?.error === 'actNotFound') {
        return {
          address,
          balanceXRP: '0',
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
    currencyCode: string
  ): TokenMetadata {
    const tokenAmount = this.calculateTokenAmount(config.birthYear);
    const tokenName = config.fullName
      ? `${config.fullName} Birthday Token`
      : `Birthday Token ${currencyCode}`;

    return {
      currencyCode,
      name: tokenName,
      totalSupply: tokenAmount,
      birthDate: {
        year: config.birthYear,
        month: config.birthMonth,
        day: config.birthDay,
      },
      issuer,
      createdAt: new Date().toISOString(),
      type: 'birthday-token-v1',
      chain: 'xrp',
    };
  }

  /**
   * Deploy birthday token to XRP Ledger
   * Main entry point for token creation
   * 
   * Note: XRP Ledger issued currencies require trustlines before users can receive them.
   * This method issues tokens to the issuer's own account (which doesn't require a trustline).
   */
  async deployToken(
    secretKey: string,
    config: BirthdayTokenConfig
  ): Promise<TokenDeploymentResult> {
    // Validate configuration
    this.validateConfig(config);
    this.validateSecretKey(secretKey);

    // Get wallet
    const wallet = this.getWallet(secretKey);
    const issuer = wallet.address;

    // Generate token details
    const currencyCode = this.generateCurrencyCode(config.initials, config.birthYear);
    const currencyHex = this.currencyToHex(currencyCode);
    const tokenAmount = this.calculateTokenAmount(config.birthYear);

    console.log(`\n=== Birthday Token Deployment ===`);
    console.log(`Network: XRP Ledger ${this.network.toUpperCase()}`);
    console.log(`\nToken Details:`);
    console.log(`  Currency Code: ${currencyCode}`);
    console.log(`  Currency Hex: ${currencyHex}`);
    console.log(`  Supply: ${parseInt(tokenAmount).toLocaleString()} units`);
    console.log(`  Birthday: ${config.birthMonth}/${config.birthDay}/${config.birthYear}`);
    console.log(`  Issuer: ${issuer}`);

    // Check balance
    console.log(`\nChecking XRP balance...`);
    const balance = await this.checkBalance(secretKey);
    console.log(`  Balance: ${balance.balanceXRP} XRP`);
    console.log(`  Account Exists: ${balance.accountExists}`);

    if (!balance.accountExists) {
      const fundMessage =
        this.network === 'testnet'
          ? `Fund at: https://faucet.altnet.rippletest.net (request ${issuer})`
          : `Purchase XRP and send to: ${issuer}`;
      throw new Error(`Account ${issuer} does not exist. ${fundMessage}`);
    }

    if (!balance.hasEnoughBalance) {
      const required = this.network === 'mainnet' ? 20 : 10;
      throw new Error(
        `Insufficient XRP balance. Need at least ${required} XRP, have ${balance.balanceXRP} XRP`
      );
    }

    console.log(`\nIssuing XRP Ledger currency...`);
    console.log(`⚠️  This will take 3-5 seconds...`);

    try {
      await this.client.connect();

      // Create trustline from issuer to issuer (allows issuer to hold their own currency)
      // Note: In XRP Ledger, the issuer account can hold issued currencies without a trustline
      // We create a Payment transaction that issues tokens to the issuer

      // Prepare Payment transaction to issue tokens
      const payment: any = {
        TransactionType: 'Payment',
        Account: issuer,
        Destination: issuer, // Issue to self
        Amount: {
          currency: currencyHex,
          value: tokenAmount,
          issuer: issuer,
        },
      };

      console.log(`Transaction created. Broadcasting...`);

      // Autofill, sign, and submit
      const prepared = await this.client.autofill(payment);
      const signed = wallet.sign(prepared);
      const result = await this.client.submitAndWait(signed.tx_blob);

      await this.client.disconnect();

      if (result.result.meta && typeof result.result.meta !== 'string') {
        if (result.result.meta.TransactionResult !== 'tesSUCCESS') {
          throw new Error(`Transaction failed: ${result.result.meta.TransactionResult}`);
        }
      }

      const txHash = result.result.hash;

      console.log(`\n🎉 Birthday Currency Issued!`);
      console.log(`Currency Code: ${currencyCode}`);
      console.log(`Transaction: ${txHash}`);

      // Generate explorer links
      const explorerLink = `${this.explorerUrl}/transactions/${txHash}`;
      const currencyLink = `${this.explorerUrl}/accounts/${issuer}`;

      console.log(`\nExplorer Links:`);
      console.log(`  Transaction: ${explorerLink}`);
      console.log(`  Issuer Account: ${currencyLink}`);
      console.log(`\n✅ Deployment complete! (3-5 seconds on XRP Ledger)`);

      console.log(`\n💡 To allow others to hold your currency:`);
      console.log(`   Currency: ${currencyCode} (Hex: ${currencyHex})`);
      console.log(`   Issuer: ${issuer}`);
      console.log(`   They must create a trustline first!`);

      return {
        txHash,
        currencyCode,
        currencyHex,
        issuer,
        tokenAmount,
        explorerLink,
      };
    } catch (error: any) {
      await this.client.disconnect();

      // Handle specific XRP Ledger errors
      if (error?.data?.error_message) {
        throw new Error(`XRP Ledger transaction failed: ${error.data.error_message}`);
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
 * // Basic usage - XRP Ledger Mainnet
 * import { RippleBirthdayTokenCreator } from './XRP.Ripple.token.birthday';
 * 
 * const creator = new RippleBirthdayTokenCreator({ network: 'mainnet' });
 * 
 * const secretKey = 's...'; // Your XRP secret key (starts with s)
 * 
 * const result = await creator.deployToken(secretKey, {
 *   initials: "CS",
 *   birthYear: 1985,
 *   birthMonth: 6,
 *   birthDay: 15,
 *   fullName: "Corey Stedman",
 *   description: "My birthday currency"
 * });
 * 
 * console.log(`Currency ${result.currencyCode} issued!`);
 * console.log(`Issuer: ${result.issuer}`);
 * console.log(`View at: ${result.explorerLink}`);
 * 
 * // Testnet configuration
 * const testnetCreator = new RippleBirthdayTokenCreator({ network: 'testnet' });
 * 
 * // With helper methods
 * const initials = RippleBirthdayTokenCreator.extractInitials("Corey Stedman");
 * const birthday = RippleBirthdayTokenCreator.parseBirthday("06/15/1985");
 * 
 * const result2 = await creator.deployToken(secretKey, {
 *   initials,
 *   ...birthday,
 *   fullName: "Corey Stedman"
 * });
 * 
 * DEPLOYMENT REQUIREMENTS:
 * - Account with at least 20 XRP (mainnet) or 10 XRP (testnet)
 * - Valid XRP secret key (starts with 's')
 * - Valid initials (1-8 letters, max 20 chars total with year)
 * - Valid birthday (between 1900 and current year)
 * 
 * TOKEN FEATURES:
 * - XRP Ledger issued currency (IOU)
 * - Transfer currencies between addresses
 * - Query balances
 * - Trustlines required (users opt-in to hold currencies)
 * - Built-in DEX integration
 * - Payment channels (instant micropayments)
 * - Escrow (time-locked payments)
 * - 3-5 second finality
 * - Ultra-low cost (0.00001 XRP per transaction)
 * 
 * SECURITY NOTES:
 * - Never commit secret keys to version control
 * - Store keys securely (hardware wallet, env variables)
 * - Use environment variables for production
 * - Test on testnet first
 * - Validate all user inputs
 * - XRP secret = starts with 's'
 * - XRP address = starts with 'r'
 * - Ed25519 or secp256k1 keys
 * 
 * COST ESTIMATION:
 * - Currency issuance: 0.00001 XRP (~$0.000006 at $0.60/XRP)
 * - Transfer: 0.00001 XRP (~$0.000006)
 * - Trustline: 0.00001 XRP (~$0.000006)
 * - Base reserve: 10 XRP (recoverable if account deleted)
 * - Testnet: Free (get from faucet)
 * 
 * UNIQUE XRP FEATURES:
 * - Issued currencies (IOUs) - native multi-currency
 * - Trustlines (explicit opt-in security model)
 * - XRP Ledger Consensus Protocol (unique, fast)
 * - Payment channels (instant, off-ledger micropayments)
 * - Escrow (time-locked or condition-based payments)
 * - Ultra-fast (3-5 seconds)
 * - Ultra-cheap (0.00001 XRP = ~$0.000006)
 * - Built-in DEX
 * - Global payment focused
 * - Used by financial institutions
 */

export default RippleBirthdayTokenCreator;
