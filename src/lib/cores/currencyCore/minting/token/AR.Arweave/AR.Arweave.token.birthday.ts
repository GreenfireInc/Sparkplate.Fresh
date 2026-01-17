// Arweave Birthday Token Minting Mechanism
// Creates personalized tokens based on user's birthday and initials
// Token amount = birthYear * 10000 (e.g., 1985 → 19,850,000 tokens)
// Ticker symbol = initials + birthYear (e.g., "CS1985")

/**
 * OVERVIEW:
 * 
 * This module creates personalized birthday tokens on Arweave using SmartWeave.
 * - User provides initials and birthday
 * - Token supply calculated from birth year (birthYear * 10000)
 * - Ticker symbol generated from initials + year
 * - Token contract deployed to Arweave with full metadata
 * 
 * FEATURES:
 * - SmartWeave token standard compliance
 * - Transfer functionality
 * - Balance queries
 * - Birthday metadata embedded in contract
 * - Full transaction history on Arweave
 * 
 * USAGE:
 * const creator = new ArweaveBirthdayTokenCreator();
 * const result = await creator.deployToken(privateKey, {
 *   initials: "CS",
 *   birthYear: 1985,
 *   birthMonth: 6,
 *   birthDay: 15
 * });
 */

// @ts-expect-error - arweave is a runtime dependency
import Arweave from 'arweave';
// @ts-expect-error - arweave types may not be available
import { JWKInterface } from 'arweave/node/lib/wallet';

export interface BirthdayTokenConfig {
  initials: string; // 2-3 letter initials (e.g., "CS")
  birthYear: number; // Full year (e.g., 1985)
  birthMonth: number; // Month 1-12
  birthDay: number; // Day 1-31
  fullName?: string; // Optional full name for display
}

export interface TokenDeploymentResult {
  txId: string; // Arweave transaction ID
  contractTxId: string; // SmartWeave contract TX ID
  tickerSymbol: string; // Generated ticker (e.g., "CS1985")
  tokenAmount: number; // Total supply (e.g., 19850000)
  ownerAddress: string; // Arweave wallet address
  viewBlockLink: string; // ViewBlock explorer link
  arweaveLink: string; // Arweave.net link
}

export interface TokenMetadata {
  ticker: string;
  name: string;
  balances: Record<string, number>;
  totalSupply: number;
  birthDate: {
    year: number;
    month: number;
    day: number;
  };
  owner: string;
  createdAt: string;
  type: 'birthday-token-v1';
}

/**
 * SmartWeave Token Contract Source
 * Standard token implementation with transfer and balance functions
 */
export const BIRTHDAY_TOKEN_CONTRACT_SOURCE = `
// Birthday Token SmartWeave Contract
// Implements standard token transfer and balance operations

export function handle(state, action) {
  const balances = state.balances;
  const input = action.input;
  const caller = action.caller;

  // Transfer tokens between addresses
  if (input.function === 'transfer') {
    const target = input.target;
    const qty = input.qty;

    // Validation
    if (!Number.isInteger(qty) || qty <= 0) {
      throw new ContractError('Invalid token transfer quantity');
    }

    if (!target) {
      throw new ContractError('No target specified');
    }

    if (!balances[caller] || balances[caller] < qty) {
      throw new ContractError('Caller balance not high enough');
    }

    // Execute transfer
    balances[caller] -= qty;
    if (target in balances) {
      balances[target] += qty;
    } else {
      balances[target] = qty;
    }

    return { state };
  }

  // Query balance
  if (input.function === 'balance') {
    const target = input.target || caller;
    const balance = target in balances ? balances[target] : 0;
    return { result: { target, balance } };
  }

  // Get total supply
  if (input.function === 'totalSupply') {
    return { result: { totalSupply: state.totalSupply } };
  }

  // Get token info
  if (input.function === 'info') {
    return {
      result: {
        name: state.name,
        ticker: state.ticker,
        totalSupply: state.totalSupply,
        birthDate: state.birthDate,
        owner: state.owner,
        type: state.type
      }
    };
  }

  throw new ContractError(\`Invalid function: \${input.function}\`);
}
`;

export class ArweaveBirthdayTokenCreator {
  private arweave: Arweave;
  private host: string;
  private port: number;
  private protocol: string;

  constructor(
    host: string = 'arweave.net',
    port: number = 443,
    protocol: string = 'https'
  ) {
    this.host = host;
    this.port = port;
    this.protocol = protocol;

    this.arweave = Arweave.init({
      host: this.host,
      port: this.port,
      protocol: this.protocol,
    });
  }

  /**
   * Calculate token amount based on birth year
   * Formula: birthYear * 10000
   * Example: 1985 → 19,850,000 tokens
   */
  private calculateTokenAmount(birthYear: number): number {
    return birthYear * 10000;
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
   * Create token initial state and metadata
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
      balances: {
        [ownerAddress]: tokenAmount,
      },
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
   * Deploy token contract source to Arweave
   */
  private async deployContractSource(privateKey: JWKInterface): Promise<string> {
    const srcTx = await this.arweave.createTransaction(
      {
        data: BIRTHDAY_TOKEN_CONTRACT_SOURCE,
      },
      privateKey
    );

    srcTx.addTag('App-Name', 'SmartWeaveContractSource');
    srcTx.addTag('App-Version', '0.3.0');
    srcTx.addTag('Content-Type', 'application/javascript');
    srcTx.addTag('Contract-Type', 'Birthday-Token');

    await this.arweave.transactions.sign(srcTx, privateKey);
    await this.arweave.transactions.post(srcTx);

    return srcTx.id;
  }

  /**
   * Deploy token initial state to Arweave
   */
  private async deployTokenState(
    privateKey: JWKInterface,
    metadata: TokenMetadata,
    contractSourceTxId: string
  ): Promise<string> {
    const initStateTx = await this.arweave.createTransaction(
      {
        data: JSON.stringify(metadata),
      },
      privateKey
    );

    initStateTx.addTag('App-Name', 'SmartWeaveContract');
    initStateTx.addTag('App-Version', '0.3.0');
    initStateTx.addTag('Content-Type', 'application/json');
    initStateTx.addTag('Contract-Src', contractSourceTxId);
    initStateTx.addTag('Ticker', metadata.ticker);
    initStateTx.addTag('Token-Supply', metadata.totalSupply.toString());
    initStateTx.addTag('Birth-Year', metadata.birthDate.year.toString());
    initStateTx.addTag('Token-Type', 'birthday-token-v1');

    await this.arweave.transactions.sign(initStateTx, privateKey);
    await this.arweave.transactions.post(initStateTx);

    return initStateTx.id;
  }

  /**
   * Check wallet balance before deployment
   */
  async checkWalletBalance(privateKey: JWKInterface): Promise<{
    address: string;
    balanceAR: string;
    balanceWinston: string;
    hasEnoughBalance: boolean;
  }> {
    const address = await this.arweave.wallets.jwkToAddress(privateKey);
    const balanceWinston = await this.arweave.wallets.getBalance(address);
    const balanceAR = this.arweave.ar.winstonToAr(balanceWinston);

    // Minimum 0.01 AR required for deployment
    const hasEnoughBalance = parseFloat(balanceAR) >= 0.01;

    return {
      address,
      balanceAR,
      balanceWinston,
      hasEnoughBalance,
    };
  }

  /**
   * Deploy birthday token to Arweave
   * Main entry point for token creation
   */
  async deployToken(
    privateKey: JWKInterface,
    config: BirthdayTokenConfig
  ): Promise<TokenDeploymentResult> {
    // Validate configuration
    this.validateConfig(config);

    // Check wallet balance
    const walletInfo = await this.checkWalletBalance(privateKey);
    console.log(`\n=== Birthday Token Deployment ===`);
    console.log(`Wallet Address: ${walletInfo.address}`);
    console.log(`Wallet Balance: ${walletInfo.balanceAR} AR`);

    if (!walletInfo.hasEnoughBalance) {
      throw new Error(
        `Insufficient AR balance. Need at least 0.01 AR for deployment. Current: ${walletInfo.balanceAR} AR`
      );
    }

    // Generate token metadata
    const metadata = this.createTokenMetadata(config, walletInfo.address);
    const tickerSymbol = metadata.ticker;
    const tokenAmount = metadata.totalSupply;

    console.log(`\nToken Details:`);
    console.log(`  Name: ${metadata.name}`);
    console.log(`  Ticker: ${tickerSymbol}`);
    console.log(`  Supply: ${tokenAmount.toLocaleString()} tokens`);
    console.log(`  Birthday: ${config.birthMonth}/${config.birthDay}/${config.birthYear}`);

    // Deploy contract source
    console.log(`\nDeploying contract source...`);
    const contractSourceTxId = await this.deployContractSource(privateKey);
    console.log(`Contract Source TX: ${contractSourceTxId}`);

    // Wait a moment for propagation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Deploy token state
    console.log(`\nDeploying token state...`);
    const contractTxId = await this.deployTokenState(
      privateKey,
      metadata,
      contractSourceTxId
    );
    console.log(`Token Contract TX: ${contractTxId}`);

    // Generate explorer links
    const viewBlockLink = `https://viewblock.io/arweave/tx/${contractTxId}`;
    const arweaveLink = `https://arweave.net/${contractTxId}`;

    console.log(`\n🎉 Birthday Token Created!`);
    console.log(`\nExplorer Links:`);
    console.log(`  ViewBlock: ${viewBlockLink}`);
    console.log(`  Arweave: ${arweaveLink}`);

    return {
      txId: contractSourceTxId,
      contractTxId,
      tickerSymbol,
      tokenAmount,
      ownerAddress: walletInfo.address,
      viewBlockLink,
      arweaveLink,
    };
  }

  /**
   * Interactive token creation with user prompts
   * For CLI/terminal usage
   */
  async createTokenInteractive(privateKey: JWKInterface): Promise<TokenDeploymentResult> {
    // This would use readline or inquirer for interactive prompts
    // For now, throwing an error to indicate it needs implementation
    throw new Error(
      'Interactive mode requires readline or inquirer. Use deployToken() with config object instead.'
    );
  }

  /**
   * Get token info from deployed contract
   */
  async getTokenInfo(contractTxId: string): Promise<TokenMetadata | null> {
    try {
      const tx = await this.arweave.transactions.get(contractTxId);
      const data = tx.get('data', { decode: true, string: true });
      return JSON.parse(data as string) as TokenMetadata;
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
 * // Basic usage
 * import { ArweaveBirthdayTokenCreator } from './AR.Arweave.token.birthday';
 * import * as fs from 'fs';
 * 
 * const creator = new ArweaveBirthdayTokenCreator();
 * const privateKey = JSON.parse(fs.readFileSync('wallet.json', 'utf-8'));
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
 * console.log(`View at: ${result.viewBlockLink}`);
 * 
 * // With helper methods
 * const initials = ArweaveBirthdayTokenCreator.extractInitials("Corey Stedman");
 * const birthday = ArweaveBirthdayTokenCreator.parseBirthday("06/15/1985");
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
 * // Get token info after deployment
 * const tokenInfo = await creator.getTokenInfo(result.contractTxId);
 * console.log('Token Info:', tokenInfo);
 * 
 * DEPLOYMENT REQUIREMENTS:
 * - Arweave wallet with at least 0.01 AR
 * - Valid JWK private key
 * - Valid initials (2-3 letters)
 * - Valid birthday (between 1900 and current year)
 * 
 * TOKEN FEATURES:
 * - Transfer tokens between addresses
 * - Query balances
 * - Get total supply
 * - Get token metadata including birthday
 * - Full transaction history on Arweave
 * - Permanent storage (pay once, store forever)
 * 
 * SECURITY NOTES:
 * - Never commit private keys to version control
 * - Store JWK files securely
 * - Use environment variables for production
 * - Test on testnet/ArLocal first
 * - Validate all user inputs
 * 
 * COST ESTIMATION:
 * - Contract source: ~0.005 AR
 * - Token state: ~0.005 AR
 * - Total: ~0.01 AR per token deployment
 * - Exact cost depends on data size and network fees
 */

export default ArweaveBirthdayTokenCreator;

