// Terra Classic Birthday Token Minting Mechanism
// Creates personalized tokens based on user's birthday and initials
// Token amount = birthYear * 10000 (e.g., 1985 → 19,850,000 tokens)
// Ticker symbol = initials + birthYear (e.g., "CS1985")

/**
 * OVERVIEW:
 * 
 * This module creates personalized birthday tokens on Terra Classic (LUNC) using CW20.
 * - User provides initials and birthday
 * - Token supply calculated from birth year (birthYear * 10000)
 * - Ticker symbol generated from initials + year
 * - CW20 token contract instantiated on Terra Classic
 * 
 * ⚠️ CRITICAL TERRA CLASSIC CONTEXT:
 * 
 * Terra Classic is the ORIGINAL Terra blockchain after the May 2022 collapse:
 * - UST algorithmic stablecoin lost $1 peg (death spiral event)
 * - $40B+ market cap wiped out in days
 * - LUNA hyperinflated from 350M to 6.9 TRILLION tokens
 * - Network forked: Original = Terra Classic (LUNC), New = Terra 2.0 (LUNA)
 * - Ecosystem significantly reduced, most dApps migrated to Terra 2.0
 * - Trading at ~$0.0001 vs pre-collapse ~$100
 * 
 * ⚠️ RECOMMENDATION: Use Terra 2.0 (LUNA) instead for most use cases.
 * This implementation is for those who specifically need Terra Classic support.
 * 
 * FEATURES:
 * - CW20 token standard (CosmWasm fungible token)
 * - Full transfer and allowance functionality
 * - Balance queries
 * - Birthday metadata embedded in token name
 * - Full transaction history on Terra Classic blockchain
 * - Works on Terra Classic Columbus-5
 * - Extremely low gas costs (due to low LUNC value)
 * 
 * USAGE:
 * const creator = new TerraClassicBirthdayTokenCreator();
 * const result = await creator.deployToken(mnemonic, {
 *   initials: "CS",
 *   birthYear: 1985,
 *   birthMonth: 6,
 *   birthDay: 15
 * });
 */

import { LCDClient, MnemonicKey, MsgInstantiateContract, Coin } from '@terra-money/terra.js';

export interface BirthdayTokenConfig {
  initials: string; // 2-3 letter initials (e.g., "CS")
  birthYear: number; // Full year (e.g., 1985)
  birthMonth: number; // Month 1-12
  birthDay: number; // Day 1-31
  fullName?: string; // Optional full name for display
}

export interface TokenDeploymentResult {
  txHash: string; // Transaction hash
  contractAddress: string; // Deployed CW20 token contract address
  tickerSymbol: string; // Generated ticker (e.g., "CS1985")
  tokenAmount: string; // Total supply (e.g., "19850000")
  ownerAddress: string; // Terra Classic wallet address
  explorerLink: string; // Finder explorer link
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
  createdAt: string;
  type: 'birthday-token-v1';
  chain: 'terra-classic';
}

export interface TerraClassicConfig {
  lcdUrl?: string;
  chainId?: string;
  cw20CodeId?: number; // CW20 base contract code ID
}

/**
 * CW20 Token Instantiate Message
 * Standard CosmWasm CW20 token initialization
 */
export interface CW20InstantiateMsg {
  name: string;
  symbol: string;
  decimals: number;
  initial_balances: Array<{
    address: string;
    amount: string;
  }>;
  mint?: {
    minter: string;
    cap?: string;
  };
  marketing?: {
    project?: string;
    description?: string;
    marketing?: string;
    logo?: any;
  };
}

// Default CW20 code ID for Terra Classic (verify before use)
export const DEFAULT_LUNC_CW20_CODE_ID = 1;

export class TerraClassicBirthdayTokenCreator {
  private lcd: LCDClient;
  private chainId: string;
  private lcdUrl: string;
  private explorerUrl: string;
  private cw20CodeId: number;
  private gasDenom: string;

  constructor(config: TerraClassicConfig = {}) {
    // Terra Classic Columbus-5 configuration
    this.chainId = config.chainId || 'columbus-5';
    this.lcdUrl = config.lcdUrl || 'https://columbus-lcd.terra.dev';
    this.explorerUrl = 'https://finder.terra.money/classic';
    this.cw20CodeId = config.cw20CodeId || DEFAULT_LUNC_CW20_CODE_ID;
    this.gasDenom = 'uluna'; // Note: This is LUNC on Terra Classic

    // Initialize LCD client (terra.js for Terra Classic)
    this.lcd = new LCDClient({
      URL: this.lcdUrl,
      chainID: this.chainId,
      gasPrices: { [this.gasDenom]: 0.015 },
      gasAdjustment: 1.75,
    });
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
      decimals: 6, // Terra Classic standard
      birthDate: {
        year: config.birthYear,
        month: config.birthMonth,
        day: config.birthDay,
      },
      owner: ownerAddress,
      createdAt: new Date().toISOString(),
      type: 'birthday-token-v1',
      chain: 'terra-classic',
    };
  }

  /**
   * Check wallet balance before deployment
   */
  async checkWalletBalance(mnemonic: string): Promise<{
    address: string;
    balanceLUNC: string;
    balanceUluna: string;
    hasEnoughBalance: boolean;
  }> {
    const mk = new MnemonicKey({ mnemonic });
    const wallet = this.lcd.wallet(mk);
    const address = wallet.key.accAddress;

    const [balance] = await this.lcd.bank.balance(address);
    const luncBalance = balance.get(this.gasDenom);
    const balanceUluna = luncBalance ? luncBalance.amount.toString() : '0';
    const balanceLUNC = luncBalance ? (parseInt(balanceUluna) / 1_000_000).toString() : '0';

    // Minimum 1 LUNC required for deployment (very cheap due to low LUNC value)
    const minBalance = 1_000_000; // 1 LUNC in uluna
    const hasEnoughBalance = parseInt(balanceUluna) >= minBalance;

    return {
      address,
      balanceLUNC,
      balanceUluna,
      hasEnoughBalance,
    };
  }

  /**
   * Deploy birthday token to Terra Classic
   * Main entry point for token creation
   */
  async deployToken(
    mnemonic: string,
    config: BirthdayTokenConfig
  ): Promise<TokenDeploymentResult> {
    // Validate configuration
    this.validateConfig(config);

    // Create wallet
    const mk = new MnemonicKey({ mnemonic });
    const wallet = this.lcd.wallet(mk);
    const walletAddress = wallet.key.accAddress;

    // Check wallet balance
    const walletInfo = await this.checkWalletBalance(mnemonic);
    
    console.log(`\n=== ⚠️  Terra Classic Birthday Token Deployment ⚠️  ===`);
    console.log(`\n⚠️  WARNING: You are deploying on Terra Classic (LUNC)`);
    console.log(`⚠️  This is the original chain that collapsed in May 2022`);
    console.log(`⚠️  Consider using Terra 2.0 (LUNA) instead for active ecosystem\n`);
    console.log(`Network: Terra Classic (${this.chainId})`);
    console.log(`Wallet Address: ${walletInfo.address}`);
    console.log(`Wallet Balance: ${walletInfo.balanceLUNC} LUNC`);

    if (!walletInfo.hasEnoughBalance) {
      throw new Error(
        `Insufficient LUNC balance. Need at least 1 LUNC for deployment. Current: ${walletInfo.balanceLUNC} LUNC`
      );
    }

    // Generate token metadata
    const metadata = this.createTokenMetadata(config, walletInfo.address);
    const tickerSymbol = metadata.ticker;
    const tokenAmount = metadata.totalSupply;
    const tokenName = metadata.name;

    console.log(`\nToken Details:`);
    console.log(`  Name: ${tokenName}`);
    console.log(`  Ticker: ${tickerSymbol}`);
    console.log(`  Supply: ${parseInt(tokenAmount).toLocaleString()} tokens`);
    console.log(`  Decimals: 6`);
    console.log(`  Birthday: ${config.birthMonth}/${config.birthDay}/${config.birthYear}`);

    console.log(`\nInstantiating CW20 contract on Terra Classic...`);
    console.log(`Using CW20 Code ID: ${this.cw20CodeId}`);

    try {
      // Create CW20 instantiate message
      const instantiateMsg: CW20InstantiateMsg = {
        name: tokenName,
        symbol: tickerSymbol,
        decimals: 6,
        initial_balances: [
          {
            address: walletAddress,
            amount: tokenAmount,
          },
        ],
        marketing: {
          project: 'Birthday Token',
          description: `Birthday token for ${config.fullName || tickerSymbol} on Terra Classic - Birth year: ${config.birthYear}`,
        },
      };

      // Create instantiate contract message
      const instantiate = new MsgInstantiateContract(
        walletAddress, // sender
        walletAddress, // admin
        this.cw20CodeId, // code ID
        instantiateMsg, // init msg
        undefined, // init coins
        `${tickerSymbol} Birthday Token` // label
      );

      // Create and sign transaction
      const tx = await wallet.createAndSignTx({
        msgs: [instantiate],
        memo: `Birthday Token ${tickerSymbol}`,
      });

      console.log(`Transaction created. Broadcasting...`);

      const result = await this.lcd.tx.broadcast(tx);

      console.log(`Transaction broadcast. Hash: ${result.txhash}`);
      console.log(`Waiting for confirmation...`);

      // Wait for transaction confirmation
      let txInfo;
      let attempts = 0;
      const maxAttempts = 10;

      while (attempts < maxAttempts) {
        try {
          await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
          txInfo = await this.lcd.tx.txInfo(result.txhash);
          break;
        } catch (error) {
          attempts++;
          if (attempts >= maxAttempts) {
            throw new Error('Transaction confirmation timeout');
          }
        }
      }

      if (!txInfo) {
        throw new Error('Failed to get transaction info');
      }

      // Extract contract address from logs
      let contractAddress = '';
      if (txInfo.logs && txInfo.logs[0]) {
        const events = txInfo.logs[0].events;
        for (const event of events) {
          if (event.type === 'instantiate') {
            const addrAttr = event.attributes.find(attr => attr.key === '_contract_address');
            if (addrAttr) {
              contractAddress = addrAttr.value;
              break;
            }
          }
        }
      }

      if (!contractAddress) {
        throw new Error('Failed to extract contract address from transaction logs');
      }

      console.log(`\n🎉 Birthday Token Deployed on Terra Classic!`);
      console.log(`Contract Address: ${contractAddress}`);
      console.log(`Transaction Hash: ${result.txhash}`);

      // Generate explorer links
      const explorerLink = `${this.explorerUrl}/tx/${result.txhash}`;
      console.log(`\nExplorer Link:`);
      console.log(`  ${explorerLink}`);
      console.log(`\n⚠️  Remember: This token is on Terra Classic (LUNC)`);
      console.log(`⚠️  Ecosystem is limited compared to Terra 2.0`);

      return {
        txHash: result.txhash,
        contractAddress,
        tickerSymbol,
        tokenAmount,
        ownerAddress: walletInfo.address,
        explorerLink,
      };
    } catch (error) {
      throw new Error(
        `Failed to deploy token: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Get token balance for an address
   */
  async getTokenBalance(contractAddress: string, userAddress: string): Promise<string> {
    try {
      const queryMsg = { balance: { address: userAddress } };
      const result: any = await this.lcd.wasm.contractQuery(contractAddress, queryMsg);
      return result.balance || '0';
    } catch (error) {
      console.error('Error fetching token balance:', error);
      return '0';
    }
  }

  /**
   * Get token info
   */
  async getTokenInfo(contractAddress: string): Promise<any> {
    try {
      const queryMsg = { token_info: {} };
      const result = await this.lcd.wasm.contractQuery(contractAddress, queryMsg);
      return result;
    } catch (error) {
      console.error('Error fetching token info:', error);
      return null;
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
 * // ⚠️  WARNING: Use Terra 2.0 instead unless you specifically need Terra Classic
 * 
 * // Basic usage - Terra Classic Columbus
 * import { TerraClassicBirthdayTokenCreator } from './LUNC.TerraClassic.token.birthday';
 * 
 * const creator = new TerraClassicBirthdayTokenCreator({
 *   cw20CodeId: 1234 // Verify actual CW20 code ID on Terra Classic
 * });
 * const mnemonic = 'your 24 word mnemonic phrase here...';
 * 
 * const result = await creator.deployToken(mnemonic, {
 *   initials: "CS",
 *   birthYear: 1985,
 *   birthMonth: 6,
 *   birthDay: 15,
 *   fullName: "Corey Stedman"
 * });
 * 
 * console.log(`Token ${result.tickerSymbol} created!`);
 * console.log(`Contract: ${result.contractAddress}`);
 * console.log(`View at: ${result.explorerLink}`);
 * 
 * // With helper methods
 * const initials = TerraClassicBirthdayTokenCreator.extractInitials("Corey Stedman");
 * const birthday = TerraClassicBirthdayTokenCreator.parseBirthday("06/15/1985");
 * 
 * const result2 = await creator.deployToken(mnemonic, {
 *   initials,
 *   ...birthday,
 *   fullName: "Corey Stedman"
 * });
 * 
 * // Check wallet balance first
 * const walletInfo = await creator.checkWalletBalance(mnemonic);
 * if (!walletInfo.hasEnoughBalance) {
 *   console.log('Insufficient balance for deployment');
 * }
 * 
 * // Get token info after deployment
 * const tokenInfo = await creator.getTokenInfo(result.contractAddress);
 * console.log('Token Info:', tokenInfo);
 * 
 * // Get token balance
 * const balance = await creator.getTokenBalance(
 *   result.contractAddress,
 *   walletInfo.address
 * );
 * console.log('Balance:', balance);
 * 
 * DEPLOYMENT REQUIREMENTS:
 * - Wallet with at least 1 LUNC for gas fees (very cheap)
 * - Valid mnemonic (12 or 24 words BIP39)
 * - Valid initials (2-3 letters)
 * - Valid birthday (between 1900 and current year)
 * - CW20 base contract must be uploaded to Terra Classic
 * 
 * TOKEN FEATURES:
 * - CW20 standard (CosmWasm fungible token)
 * - Transfer tokens between addresses
 * - Approve/allowance functionality
 * - Query balances
 * - Get total supply
 * - Marketing metadata support
 * - Full transaction history on Terra Classic blockchain
 * - 6 decimals (Terra standard)
 * 
 * SECURITY NOTES:
 * - Never commit mnemonics to version control
 * - Store mnemonics securely (encrypted, hardware wallet)
 * - Use environment variables for production
 * - Validate all user inputs
 * - Verify CW20 code ID before deployment
 * 
 * COST ESTIMATION:
 * - Contract instantiation: ~0.1-0.5 LUNC (~$0.00001-0.00005)
 * - Extremely cheap due to low LUNC value
 * 
 * IMPORTANT NOTES:
 * - Terra Classic is the POST-COLLAPSE original chain
 * - Ecosystem is significantly reduced
 * - Most dApps migrated to Terra 2.0
 * - LUNC trades at ~$0.0001 vs pre-collapse $100
 * - 6.9 TRILLION LUNC supply (hyperinflated)
 * - ⚠️  RECOMMENDATION: Use Terra 2.0 (LUNA) instead
 * - Only use Terra Classic if you have a specific reason
 */

export default TerraClassicBirthdayTokenCreator;
