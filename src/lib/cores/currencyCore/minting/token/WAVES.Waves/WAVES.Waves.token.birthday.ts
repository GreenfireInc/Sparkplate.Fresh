// Waves Birthday Token Minting Mechanism
// Creates personalized native tokens based on user's birthday and initials
// Token amount = birthYear * 10000 (e.g., 1985 → 19,850,000 tokens)
// Ticker symbol = initials + birthYear (e.g., "CS1985")

/**
 * OVERVIEW:
 * 
 * This module creates personalized birthday tokens on Waves using native asset issuance.
 * - User provides initials and birthday
 * - Token supply calculated from birth year (birthYear * 10000)
 * - Ticker symbol generated from initials + year
 * - Native Waves asset issued (NO smart contract needed!)
 * 
 * WAVES HIGHLIGHTS:
 * - 🎯 **Native Token Support** - Built-in token issuance (no contracts!)
 * - ⚡ **Fast** - 1 minute block time, ~1000 TPS
 * - 💰 **Low Cost** - ~1 WAVES (~$2) for token issuance
 * - 🔧 **Simple** - One function call to create tokens
 * - 🌊 **Ride Smart Contracts** - Functional language (optional)
 * - 📊 **Built-in DEX** - Waves.Exchange integration
 * 
 * UNIQUE FEATURES:
 * - Native asset issuance (NOT a smart contract token!)
 * - 15-word Waves-specific seed phrase
 * - Curve25519 cryptography
 * - Ride smart contract language (if needed)
 * - Built-in decentralized exchange
 * - Sponsorship feature (pay fees in your token!)
 * - Works on Mainnet, Testnet, Stagenet
 * 
 * USAGE:
 * const creator = new WavesBirthdayTokenCreator({
 *   network: 'mainnet' // or 'testnet' or 'stagenet'
 * });
 * const result = await creator.deployToken(seedPhrase, {
 *   initials: "CS",
 *   birthYear: 1985,
 *   birthMonth: 6,
 *   birthDay: 15
 * });
 */

import { issue, broadcast, IIssueParams } from '@waves/waves-transactions';
import { address as getAddress } from '@waves/ts-lib-crypto';

export interface BirthdayTokenConfig {
  initials: string; // 2-3 letter initials (e.g., "CS")
  birthYear: number; // Full year (e.g., 1985)
  birthMonth: number; // Month 1-12
  birthDay: number; // Day 1-31
  fullName?: string; // Optional full name for display
  decimals?: number; // Optional: 0-8 decimals (default: 0)
  reissuable?: boolean; // Optional: can create more tokens later (default: false)
  description?: string; // Optional: custom description
}

export interface TokenDeploymentResult {
  txHash: string; // Transaction ID
  assetId: string; // Waves Asset ID (also the txHash for issue txns)
  tickerSymbol: string; // Generated ticker (e.g., "CS1985")
  tokenAmount: string; // Total supply (e.g., "19850000")
  ownerAddress: string; // Waves wallet address
  explorerLink: string; // Waves Explorer link
  decimals: number; // Token decimals
  reissuable: boolean; // Can create more tokens
}

export interface TokenMetadata {
  ticker: string;
  name: string;
  totalSupply: string;
  decimals: number;
  birthDate: {
    year: number;
    month: number;
    day: number;
  };
  owner: string;
  assetId: string;
  reissuable: boolean;
  createdAt: string;
  type: 'birthday-token-v1';
  chain: 'waves';
}

export interface WavesConfig {
  network: 'mainnet' | 'testnet' | 'stagenet';
  nodeUrl?: string; // Custom node URL (optional)
}

export class WavesBirthdayTokenCreator {
  private chainId: 'W' | 'T' | 'S';
  private network: 'mainnet' | 'testnet' | 'stagenet';
  private nodeUrl: string;
  private explorerUrl: string;

  constructor(config: WavesConfig = { network: 'testnet' }) {
    this.network = config.network;

    // Set network parameters
    if (this.network === 'mainnet') {
      this.chainId = 'W';
      this.nodeUrl = config.nodeUrl || 'https://nodes.wavesnodes.com';
      this.explorerUrl = 'https://wavesexplorer.com';
    } else if (this.network === 'testnet') {
      this.chainId = 'T';
      this.nodeUrl = config.nodeUrl || 'https://nodes-testnet.wavesnodes.com';
      this.explorerUrl = 'https://wavesexplorer.com/testnet';
    } else {
      // stagenet
      this.chainId = 'S';
      this.nodeUrl = config.nodeUrl || 'https://nodes-stagenet.wavesnodes.com';
      this.explorerUrl = 'https://wavesexplorer.com/stagenet';
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

    // Validate decimals if provided
    if (config.decimals !== undefined) {
      if (config.decimals < 0 || config.decimals > 8) {
        throw new Error('Decimals must be between 0 and 8');
      }
    }
  }

  /**
   * Validate Waves seed phrase format
   */
  private validateSeedPhrase(seed: string): void {
    const words = seed.trim().split(/\s+/);
    if (words.length !== 15) {
      throw new Error('Waves seed phrase must be exactly 15 words');
    }
  }

  /**
   * Get address from seed phrase
   */
  private getAddress(seed: string): string {
    return getAddress(seed, this.chainId);
  }

  /**
   * Check WAVES balance
   */
  async checkBalance(seed: string): Promise<{
    address: string;
    balanceWAVES: string;
    hasEnoughBalance: boolean;
  }> {
    const address = this.getAddress(seed);

    try {
      const response = await fetch(`${this.nodeUrl}/addresses/balance/${address}`);
      const data = await response.json();
      
      // Balance is in WAVLETS (1 WAVES = 100,000,000 WAVLETS)
      const balanceWAVLETS = data.balance || 0;
      const balanceWAVES = (balanceWAVLETS / 100000000).toFixed(8);
      const requiredWAVES = this.network === 'mainnet' ? 2 : 1;

      return {
        address,
        balanceWAVES,
        hasEnoughBalance: parseFloat(balanceWAVES) >= requiredWAVES,
      };
    } catch (error) {
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
    ownerAddress: string,
    assetId: string
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
      decimals: config.decimals || 0,
      birthDate: {
        year: config.birthYear,
        month: config.birthMonth,
        day: config.birthDay,
      },
      owner: ownerAddress,
      assetId,
      reissuable: config.reissuable || false,
      createdAt: new Date().toISOString(),
      type: 'birthday-token-v1',
      chain: 'waves',
    };
  }

  /**
   * Deploy birthday token to Waves
   * Main entry point for token creation
   */
  async deployToken(
    seedPhrase: string,
    config: BirthdayTokenConfig
  ): Promise<TokenDeploymentResult> {
    // Validate configuration
    this.validateConfig(config);
    this.validateSeedPhrase(seedPhrase);

    // Get owner address
    const ownerAddress = this.getAddress(seedPhrase);

    // Generate token details
    const tickerSymbol = this.generateTickerSymbol(config.initials, config.birthYear);
    const tokenAmount = this.calculateTokenAmount(config.birthYear);
    const tokenName = config.fullName
      ? `${config.fullName} Birthday Token`
      : `Birthday Token ${tickerSymbol}`;
    const decimals = config.decimals || 0;
    const reissuable = config.reissuable || false;

    // Generate description
    const description =
      config.description ||
      `Birthday token for ${config.fullName || 'user'} born on ${config.birthMonth}/${config.birthDay}/${config.birthYear}. Ticker: ${tickerSymbol}. Supply: ${tokenAmount} tokens.`;

    console.log(`\n=== Birthday Token Deployment ===`);
    console.log(`Network: Waves ${this.network.toUpperCase()}`);
    console.log(`\nToken Details:`);
    console.log(`  Name: ${tokenName}`);
    console.log(`  Ticker: ${tickerSymbol}`);
    console.log(`  Supply: ${parseInt(tokenAmount).toLocaleString()} tokens`);
    console.log(`  Decimals: ${decimals}`);
    console.log(`  Reissuable: ${reissuable ? 'Yes' : 'No'}`);
    console.log(`  Birthday: ${config.birthMonth}/${config.birthDay}/${config.birthYear}`);
    console.log(`  Owner: ${ownerAddress}`);

    // Check balance
    console.log(`\nChecking WAVES balance...`);
    const balance = await this.checkBalance(seedPhrase);
    console.log(`  Balance: ${balance.balanceWAVES} WAVES`);

    if (!balance.hasEnoughBalance) {
      const required = this.network === 'mainnet' ? 2 : 1;
      throw new Error(
        `Insufficient WAVES balance. Need at least ${required} WAVES, have ${balance.balanceWAVES} WAVES`
      );
    }

    console.log(`\nIssuing native Waves asset...`);
    console.log(`⚠️  This will take ~1 minute...`);

    try {
      // Create issue transaction parameters
      const issueParams: IIssueParams = {
        name: tokenName,
        description,
        quantity: parseInt(tokenAmount),
        decimals,
        reissuable,
        chainId: this.chainId,
        fee: 100000000, // 1 WAVES in WAVLETS (required for issue transaction)
      };

      // Create and sign the issue transaction
      const signedIssueTx = issue(issueParams, seedPhrase);

      console.log(`Transaction created. Broadcasting...`);

      // Broadcast the transaction
      const result = await broadcast(signedIssueTx, this.nodeUrl);

      // For issue transactions, the transaction ID IS the asset ID
      const txHash = result.id;
      const assetId = result.id;

      console.log(`\n🎉 Birthday Token Issued!`);
      console.log(`Asset ID: ${assetId}`);
      console.log(`Transaction: ${txHash}`);

      // Generate explorer links
      const explorerLink = `${this.explorerUrl}/tx/${txHash}`;
      const assetLink = `${this.explorerUrl}/assets/${assetId}`;

      console.log(`\nExplorer Links:`);
      console.log(`  Transaction: ${explorerLink}`);
      console.log(`  Asset: ${assetLink}`);
      console.log(`\n✅ Deployment complete! (~1 minute on Waves)`);

      return {
        txHash,
        assetId,
        tickerSymbol,
        tokenAmount,
        ownerAddress,
        explorerLink,
        decimals,
        reissuable,
      };
    } catch (error) {
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
 * // Basic usage - Waves Mainnet
 * import { WavesBirthdayTokenCreator } from './WAVES.Waves.token.birthday';
 * 
 * const creator = new WavesBirthdayTokenCreator({ network: 'mainnet' });
 * 
 * const seedPhrase = 'your 15-word waves seed phrase here'; // 15 words!
 * 
 * const result = await creator.deployToken(seedPhrase, {
 *   initials: "CS",
 *   birthYear: 1985,
 *   birthMonth: 6,
 *   birthDay: 15,
 *   fullName: "Corey Stedman",
 *   decimals: 0, // Optional: 0-8
 *   reissuable: false, // Optional: can create more tokens later
 *   description: "Custom description" // Optional
 * });
 * 
 * console.log(`Token ${result.tickerSymbol} issued!`);
 * console.log(`Asset ID: ${result.assetId}`);
 * console.log(`View at: ${result.explorerLink}`);
 * 
 * // Testnet configuration
 * const testnetCreator = new WavesBirthdayTokenCreator({ network: 'testnet' });
 * 
 * // With helper methods
 * const initials = WavesBirthdayTokenCreator.extractInitials("Corey Stedman");
 * const birthday = WavesBirthdayTokenCreator.parseBirthday("06/15/1985");
 * 
 * const result2 = await creator.deployToken(seedPhrase, {
 *   initials,
 *   ...birthday,
 *   fullName: "Corey Stedman"
 * });
 * 
 * DEPLOYMENT REQUIREMENTS:
 * - Wallet with at least 2 WAVES (mainnet) or 1 WAVES (testnet)
 * - Valid 15-word Waves seed phrase
 * - Valid initials (2-3 letters)
 * - Valid birthday (between 1900 and current year)
 * 
 * TOKEN FEATURES:
 * - Native Waves asset (NOT a smart contract!)
 * - Transfer tokens between addresses
 * - Query balances
 * - Get total supply
 * - Optional: Make reissuable (create more tokens later)
 * - Optional: 0-8 decimals
 * - Built-in DEX integration (Waves.Exchange)
 * - Sponsorship feature (pay fees in your token!)
 * - 1 minute block time
 * - Very simple issuance
 * 
 * SECURITY NOTES:
 * - Never commit seed phrases to version control
 * - Store seeds securely (hardware wallet, env variables)
 * - Use environment variables for production
 * - Test on testnet first
 * - Validate all user inputs
 * - Waves seed = 15 words (NOT 12 or 24!)
 * - Seed phrases are NOT compatible with Bitcoin/Ethereum
 * 
 * COST ESTIMATION:
 * - Token issuance: 1 WAVES (~$2 at $2/WAVES)
 * - Transfer: 0.001 WAVES (~$0.002)
 * - Reissue (if enabled): 1 WAVES
 * - Testnet: Free (get from faucet)
 * 
 * UNIQUE WAVES FEATURES:
 * - Native token support (no smart contracts needed!)
 * - 15-word Waves-specific seed phrase
 * - Built-in decentralized exchange
 * - Sponsorship (let others pay fees in your token!)
 * - Leasing (stake for others, earn rewards)
 * - Ride smart contracts (functional language)
 * - ~1000 TPS
 * - 1 minute block time
 * - Curve25519 cryptography
 * - Fixed 100M WAVES supply
 */

export default WavesBirthdayTokenCreator;
