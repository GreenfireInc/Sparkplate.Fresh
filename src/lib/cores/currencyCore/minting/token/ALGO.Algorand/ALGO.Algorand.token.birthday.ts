// Algorand Birthday Token Minting Mechanism
// Creates personalized tokens based on user's birthday and initials
// Token amount = birthYear * 10000 (e.g., 1985 → 19,850,000 tokens)
// Ticker symbol = initials + birthYear (e.g., "CS1985")

/**
 * OVERVIEW:
 * 
 * This module creates personalized birthday tokens on Algorand using ASA (Algorand Standard Assets).
 * - User provides initials and birthday
 * - Token supply calculated from birth year (birthYear * 10000)
 * - Ticker symbol generated from initials + year
 * - ASA deployed to Algorand with full metadata
 * 
 * FEATURES:
 * - Algorand Standard Asset (ASA) compliance
 * - Transfer functionality
 * - Balance queries
 * - Birthday metadata embedded in asset
 * - Full transaction history on Algorand blockchain
 * 
 * USAGE:
 * const creator = new AlgorandBirthdayTokenCreator();
 * const result = await creator.deployToken(mnemonic, {
 *   initials: "CS",
 *   birthYear: 1985,
 *   birthMonth: 6,
 *   birthDay: 15
 * });
 */

import algosdk from 'algosdk';

export interface BirthdayTokenConfig {
  initials: string; // 2-3 letter initials (e.g., "CS")
  birthYear: number; // Full year (e.g., 1985)
  birthMonth: number; // Month 1-12
  birthDay: number; // Day 1-31
  fullName?: string; // Optional full name for display
}

export interface TokenDeploymentResult {
  txId: string; // Algorand transaction ID
  assetId: number; // ASA ID
  tickerSymbol: string; // Generated ticker (e.g., "CS1985")
  tokenAmount: number; // Total supply (e.g., 19850000)
  ownerAddress: string; // Algorand wallet address
  algoExplorerLink: string; // AlgoExplorer link
  nftExplorerLink: string; // NFTExplorer link
}

export interface TokenMetadata {
  ticker: string;
  name: string;
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

export interface AlgorandConfig {
  algodToken: string;
  algodServer: string;
  algodPort: number | string;
  network: 'mainnet' | 'testnet';
}

export class AlgorandBirthdayTokenCreator {
  private algodClient: algosdk.Algodv2;
  private network: 'mainnet' | 'testnet';

  constructor(config?: Partial<AlgorandConfig>) {
    // Default to mainnet
    const defaultConfig: AlgorandConfig = {
      algodToken: '',
      algodServer: 'https://mainnet-api.algonode.cloud',
      algodPort: 443,
      network: 'mainnet',
    };

    const finalConfig = { ...defaultConfig, ...config };
    
    this.algodClient = new algosdk.Algodv2(
      finalConfig.algodToken,
      finalConfig.algodServer,
      typeof finalConfig.algodPort === 'string' 
        ? parseInt(finalConfig.algodPort) 
        : finalConfig.algodPort
    );
    
    this.network = finalConfig.network;
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
   * Wait for transaction confirmation
   */
  private async waitForConfirmation(
    txId: string,
    timeout: number = 10
  ): Promise<algosdk.modelsv2.PendingTransactionResponse> {
    const startRound = (await this.algodClient.status().do())['last-round'];
    let currentRound = startRound;

    while (currentRound < startRound + timeout) {
      try {
        const pendingInfo = await this.algodClient
          .pendingTransactionInformation(txId)
          .do();
        
        if (pendingInfo['confirmed-round']) {
          return pendingInfo;
        }
        
        if (pendingInfo['pool-error']) {
          throw new Error(`Transaction error: ${pendingInfo['pool-error']}`);
        }
      } catch (error) {
        if (error instanceof Error && !error.message.includes('Transaction not found')) {
          throw error;
        }
      }
      
      currentRound++;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    
    throw new Error('Transaction confirmation timeout');
  }

  /**
   * Check wallet balance before deployment
   */
  async checkWalletBalance(mnemonic: string): Promise<{
    address: string;
    balanceALGO: string;
    balanceMicroALGO: number;
    hasEnoughBalance: boolean;
  }> {
    const account = algosdk.mnemonicToSecretKey(mnemonic);
    const accountInfo = await this.algodClient.accountInformation(account.addr).do();
    const balanceMicroALGO = accountInfo.amount;
    const balanceALGO = algosdk.microalgosToAlgos(balanceMicroALGO);

    // Minimum 0.1 ALGO required for ASA creation
    const hasEnoughBalance = balanceMicroALGO >= 100000; // 0.1 ALGO in microALGOs

    return {
      address: account.addr,
      balanceALGO: balanceALGO.toString(),
      balanceMicroALGO,
      hasEnoughBalance,
    };
  }

  /**
   * Deploy birthday token to Algorand
   * Main entry point for token creation
   */
  async deployToken(
    mnemonic: string,
    config: BirthdayTokenConfig
  ): Promise<TokenDeploymentResult> {
    // Validate mnemonic
    if (!mnemonic || mnemonic.trim().split(/\s+/).length !== 25) {
      throw new Error('Algorand mnemonic must be 25 words');
    }

    // Validate configuration
    this.validateConfig(config);

    // Get account from mnemonic
    const account = algosdk.mnemonicToSecretKey(mnemonic);

    // Check wallet balance
    const walletInfo = await this.checkWalletBalance(mnemonic);
    console.log(`\n=== Birthday Token Deployment ===`);
    console.log(`Network: ${this.network.toUpperCase()}`);
    console.log(`Wallet Address: ${walletInfo.address}`);
    console.log(`Wallet Balance: ${walletInfo.balanceALGO} ALGO`);

    if (!walletInfo.hasEnoughBalance) {
      throw new Error(
        `Insufficient ALGO balance. Need at least 0.1 ALGO for deployment. Current: ${walletInfo.balanceALGO} ALGO`
      );
    }

    // Generate token metadata
    const metadata = this.createTokenMetadata(config, walletInfo.address);
    const tickerSymbol = metadata.ticker;
    const tokenAmount = metadata.totalSupply;
    const assetName = metadata.name;

    console.log(`\nToken Details:`);
    console.log(`  Name: ${assetName}`);
    console.log(`  Ticker: ${tickerSymbol}`);
    console.log(`  Supply: ${tokenAmount.toLocaleString()} tokens`);
    console.log(`  Birthday: ${config.birthMonth}/${config.birthDay}/${config.birthYear}`);

    // Get suggested transaction parameters
    const suggestedParams = await this.algodClient.getTransactionParams().do();

    // Create asset creation transaction
    const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      from: account.addr,
      total: tokenAmount,
      decimals: 0,
      assetName: assetName,
      unitName: tickerSymbol,
      assetURL: `https://birthday-token.algo/${tickerSymbol}`,
      assetMetadataHash: undefined,
      defaultFrozen: false,
      freeze: undefined,
      manager: account.addr,
      clawback: undefined,
      reserve: undefined,
      note: new Uint8Array(Buffer.from(JSON.stringify({
        type: 'birthday-token-v1',
        birthDate: metadata.birthDate,
        createdAt: metadata.createdAt,
      }))),
      suggestedParams,
    });

    console.log(`\nCreating ASA...`);

    // Sign the transaction
    const signedTxn = txn.signTxn(account.sk);

    // Submit the transaction
    const { txId } = await this.algodClient.sendRawTransaction(signedTxn).do();
    console.log(`Transaction ID: ${txId}`);
    console.log(`Waiting for confirmation...`);

    // Wait for confirmation
    const confirmedTxn = await this.waitForConfirmation(txId);
    const assetId = confirmedTxn['asset-index'];

    if (!assetId) {
      throw new Error('Failed to get asset ID from confirmed transaction');
    }

    console.log(`\n🎉 Birthday Token Created!`);
    console.log(`Asset ID: ${assetId}`);

    // Generate explorer links
    const algoExplorerLink =
      this.network === 'mainnet'
        ? `https://algoexplorer.io/asset/${assetId}`
        : `https://testnet.algoexplorer.io/asset/${assetId}`;

    const nftExplorerLink =
      this.network === 'mainnet'
        ? `https://www.nftexplorer.app/asset/${assetId}`
        : `https://testnet.nftexplorer.app/asset/${assetId}`;

    console.log(`\nExplorer Links:`);
    console.log(`  AlgoExplorer: ${algoExplorerLink}`);
    console.log(`  NFTExplorer: ${nftExplorerLink}`);

    return {
      txId,
      assetId,
      tickerSymbol,
      tokenAmount,
      ownerAddress: walletInfo.address,
      algoExplorerLink,
      nftExplorerLink,
    };
  }

  /**
   * Get asset info from deployed ASA
   */
  async getAssetInfo(assetId: number): Promise<any> {
    try {
      return await this.algodClient.getAssetByID(assetId).do();
    } catch (error) {
      console.error('Error fetching asset info:', error);
      return null;
    }
  }

  /**
   * Get account's asset holdings
   */
  async getAccountAssets(address: string): Promise<any[]> {
    try {
      const accountInfo = await this.algodClient.accountInformation(address).do();
      return accountInfo.assets || [];
    } catch (error) {
      console.error('Error fetching account assets:', error);
      return [];
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
 * // Basic usage - Mainnet
 * import { AlgorandBirthdayTokenCreator } from './ALGO.Algorand.token.birthday';
 * 
 * const creator = new AlgorandBirthdayTokenCreator();
 * const mnemonic = 'your 25 word mnemonic phrase here...';
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
 * console.log(`Asset ID: ${result.assetId}`);
 * console.log(`View at: ${result.algoExplorerLink}`);
 * 
 * // TestNet configuration
 * const testnetCreator = new AlgorandBirthdayTokenCreator({
 *   algodServer: 'https://testnet-api.algonode.cloud',
 *   network: 'testnet'
 * });
 * 
 * // With helper methods
 * const initials = AlgorandBirthdayTokenCreator.extractInitials("Corey Stedman");
 * const birthday = AlgorandBirthdayTokenCreator.parseBirthday("06/15/1985");
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
 * // Get asset info after deployment
 * const assetInfo = await creator.getAssetInfo(result.assetId);
 * console.log('Asset Info:', assetInfo);
 * 
 * // Get account assets
 * const assets = await creator.getAccountAssets(walletInfo.address);
 * console.log('Account Assets:', assets);
 * 
 * DEPLOYMENT REQUIREMENTS:
 * - Algorand wallet with at least 0.1 ALGO
 * - Valid 25-word mnemonic
 * - Valid initials (2-3 letters)
 * - Valid birthday (between 1900 and current year)
 * 
 * TOKEN FEATURES:
 * - Transfer tokens between addresses
 * - Query balances
 * - Get total supply
 * - Get asset metadata including birthday
 * - Full transaction history on Algorand blockchain
 * - Native Algorand Standard Asset (ASA)
 * 
 * SECURITY NOTES:
 * - Never commit mnemonics to version control
 * - Store mnemonics securely
 * - Use environment variables for production
 * - Test on TestNet first
 * - Validate all user inputs
 * 
 * COST ESTIMATION:
 * - ASA creation: ~0.1 ALGO (minimum balance increase)
 * - Transaction fee: ~0.001 ALGO
 * - Total: ~0.101 ALGO per token deployment
 * - Exact cost depends on network fees
 */

export default AlgorandBirthdayTokenCreator;
