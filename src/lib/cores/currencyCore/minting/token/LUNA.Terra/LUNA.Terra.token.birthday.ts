// Terra Birthday Token Minting Mechanism
// Creates personalized tokens based on user's birthday and initials
// Token amount = birthYear * 10000 (e.g., 1985 → 19,850,000 tokens)
// Ticker symbol = initials + birthYear (e.g., "CS1985")

/**
 * OVERVIEW:
 * 
 * This module creates personalized birthday tokens on Terra using CW20 (CosmWasm).
 * - User provides initials and birthday
 * - Token supply calculated from birth year (birthYear * 10000)
 * - Ticker symbol generated from initials + year
 * - CW20 token contract instantiated on Terra
 * 
 * IMPORTANT TERRA HISTORY:
 * - Terra Classic (LUNC): Original chain that collapsed in May 2022 (UST depeg)
 * - Terra 2.0 (LUNA): New chain created post-collapse, active and supported
 * - This implementation supports both chains but recommends Terra 2.0
 * 
 * FEATURES:
 * - CW20 token standard (CosmWasm fungible token)
 * - Full transfer and allowance functionality
 * - Balance queries
 * - Birthday metadata embedded in token name
 * - Full transaction history on Terra blockchain
 * - Works on Terra 2.0 (Phoenix) and Terra Classic (Columbus)
 * - IBC-compatible tokens
 * 
 * USAGE:
 * const creator = new TerraBirthdayTokenCreator({
 *   network: 'mainnet' // Terra 2.0 Phoenix
 * });
 * const result = await creator.deployToken(mnemonic, {
 *   initials: "CS",
 *   birthYear: 1985,
 *   birthMonth: 6,
 *   birthDay: 15
 * });
 */

import { LCDClient, MnemonicKey, MsgInstantiateContract, Coin } from '@terra-money/feather.js';

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
  ownerAddress: string; // Terra wallet address
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
}

export interface TerraConfig {
  network: 'mainnet' | 'testnet' | 'classic';
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

// Standard CW20 code IDs (these need to be verified for each network)
export const DEFAULT_CW20_CODE_IDS = {
  'phoenix-1': 1, // Terra 2.0 Mainnet (example, verify actual code ID)
  'pisco-1': 1,   // Terra 2.0 Testnet (example, verify actual code ID)
  'columbus-5': 1 // Terra Classic (example, verify actual code ID)
};

export class TerraBirthdayTokenCreator {
  private lcd: LCDClient;
  private network: 'mainnet' | 'testnet' | 'classic';
  private chainId: string;
  private lcdUrl: string;
  private explorerUrl: string;
  private cw20CodeId: number;
  private gasDenom: string;

  constructor(config: TerraConfig = { network: 'mainnet' }) {
    this.network = config.network;

    // Set network-specific parameters
    if (this.network === 'mainnet') {
      // Terra 2.0 Phoenix Mainnet
      this.chainId = config.chainId || 'phoenix-1';
      this.lcdUrl = config.lcdUrl || 'https://phoenix-lcd.terra.dev';
      this.explorerUrl = 'https://finder.terra.money/mainnet';
      this.cw20CodeId = config.cw20CodeId || DEFAULT_CW20_CODE_IDS['phoenix-1'];
      this.gasDenom = 'uluna';
    } else if (this.network === 'testnet') {
      // Terra 2.0 Pisco Testnet
      this.chainId = config.chainId || 'pisco-1';
      this.lcdUrl = config.lcdUrl || 'https://pisco-lcd.terra.dev';
      this.explorerUrl = 'https://finder.terra.money/testnet';
      this.cw20CodeId = config.cw20CodeId || DEFAULT_CW20_CODE_IDS['pisco-1'];
      this.gasDenom = 'uluna';
    } else {
      // Terra Classic Columbus
      this.chainId = config.chainId || 'columbus-5';
      this.lcdUrl = config.lcdUrl || 'https://columbus-lcd.terra.dev';
      this.explorerUrl = 'https://finder.terra.money/classic';
      this.cw20CodeId = config.cw20CodeId || DEFAULT_CW20_CODE_IDS['columbus-5'];
      this.gasDenom = 'uluna';
    }

    // Initialize LCD client
    this.lcd = new LCDClient({
      [this.chainId]: {
        lcd: this.lcdUrl,
        chainID: this.chainId,
        gasAdjustment: 1.75,
        gasPrices: { [this.gasDenom]: 0.015 },
        prefix: 'terra',
      },
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
      decimals: 6, // Terra standard
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
   * Check wallet balance before deployment
   */
  async checkWalletBalance(mnemonic: string): Promise<{
    address: string;
    balanceLUNA: string;
    balanceUluna: string;
    hasEnoughBalance: boolean;
  }> {
    const mk = new MnemonicKey({ mnemonic });
    const wallet = this.lcd.wallet(mk);
    const address = wallet.key.accAddress(this.chainId);

    const [balance] = await this.lcd.bank.balance(address, this.chainId);
    const lunaBalance = balance.get(this.gasDenom);
    const balanceUluna = lunaBalance ? lunaBalance.amount.toString() : '0';
    const balanceLUNA = lunaBalance ? (parseInt(balanceUluna) / 1_000_000).toString() : '0';

    // Minimum 0.5 LUNA required for deployment (conservative estimate)
    const minBalance = 500_000; // 0.5 LUNA in uluna
    const hasEnoughBalance = parseInt(balanceUluna) >= minBalance;

    return {
      address,
      balanceLUNA,
      balanceUluna,
      hasEnoughBalance,
    };
  }

  /**
   * Deploy birthday token to Terra
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
    const walletAddress = wallet.key.accAddress(this.chainId);

    // Check wallet balance
    const walletInfo = await this.checkWalletBalance(mnemonic);
    console.log(`\n=== Birthday Token Deployment ===`);
    console.log(`Network: Terra ${this.network.toUpperCase()} (${this.chainId})`);
    console.log(`Wallet Address: ${walletInfo.address}`);
    console.log(`Wallet Balance: ${walletInfo.balanceLUNA} LUNA`);

    if (!walletInfo.hasEnoughBalance) {
      throw new Error(
        `Insufficient LUNA balance. Need at least 0.5 LUNA for deployment. Current: ${walletInfo.balanceLUNA} LUNA`
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

    console.log(`\nInstantiating CW20 contract on Terra...`);
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
          description: `Birthday token for ${config.fullName || tickerSymbol} - Birth year: ${config.birthYear}`,
        },
      };

      // Create instantiate contract message
      const instantiate = new MsgInstantiateContract(
        walletAddress, // sender
        walletAddress, // admin
        this.cw20CodeId, // code ID
        instantiateMsg, // init msg
        [], // init coins
        `${tickerSymbol} Birthday Token` // label
      );

      // Create and broadcast transaction
      const tx = await wallet.createAndSignTx(
        this.chainId,
        {
          msgs: [instantiate],
          memo: `Birthday Token ${tickerSymbol}`,
        }
      );

      console.log(`Transaction created. Broadcasting...`);

      const result = await this.lcd.tx.broadcast(tx, this.chainId);

      console.log(`Transaction broadcast. Hash: ${result.txhash}`);
      console.log(`Waiting for confirmation...`);

      // Wait for transaction confirmation
      let txInfo;
      let attempts = 0;
      const maxAttempts = 10;

      while (attempts < maxAttempts) {
        try {
          await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
          txInfo = await this.lcd.tx.txInfo(result.txhash, this.chainId);
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

      console.log(`\n🎉 Birthday Token Deployed!`);
      console.log(`Contract Address: ${contractAddress}`);
      console.log(`Transaction Hash: ${result.txhash}`);

      // Generate explorer links
      const explorerLink = `${this.explorerUrl}/tx/${result.txhash}`;
      console.log(`\nExplorer Link:`);
      console.log(`  ${explorerLink}`);

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
      const result: any = await this.lcd.wasm.contractQuery(
        contractAddress,
        queryMsg,
        this.chainId
      );
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
      const result = await this.lcd.wasm.contractQuery(
        contractAddress,
        queryMsg,
        this.chainId
      );
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
 * // Basic usage - Terra 2.0 Mainnet
 * import { TerraBirthdayTokenCreator } from './LUNA.Terra.token.birthday';
 * 
 * const creator = new TerraBirthdayTokenCreator({ network: 'mainnet' });
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
 * // Pisco Testnet configuration
 * const testnetCreator = new TerraBirthdayTokenCreator({ network: 'testnet' });
 * 
 * // Terra Classic configuration
 * const classicCreator = new TerraBirthdayTokenCreator({ network: 'classic' });
 * 
 * // With custom CW20 code ID
 * const customCreator = new TerraBirthdayTokenCreator({
 *   network: 'mainnet',
 *   cw20CodeId: 1234 // your verified CW20 code ID
 * });
 * 
 * // With helper methods
 * const initials = TerraBirthdayTokenCreator.extractInitials("Corey Stedman");
 * const birthday = TerraBirthdayTokenCreator.parseBirthday("06/15/1985");
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
 * - Wallet with at least 0.5 LUNA for gas fees
 * - Valid mnemonic (12 or 24 words BIP39)
 * - Valid initials (2-3 letters)
 * - Valid birthday (between 1900 and current year)
 * - CW20 base contract must be uploaded to the chain
 * 
 * TOKEN FEATURES:
 * - CW20 standard (CosmWasm fungible token)
 * - Transfer tokens between addresses
 * - Approve/allowance functionality
 * - Query balances
 * - Get total supply
 * - Marketing metadata support
 * - Full transaction history on Terra blockchain
 * - 6 decimals (Terra standard)
 * - IBC-compatible
 * 
 * SECURITY NOTES:
 * - Never commit mnemonics to version control
 * - Store mnemonics securely (encrypted, hardware wallet)
 * - Use environment variables for production
 * - Test on Pisco testnet first
 * - Validate all user inputs
 * - Verify CW20 code ID before deployment
 * 
 * COST ESTIMATION:
 * - Contract instantiation: ~0.1-0.3 LUNA
 * - Depends on gas price and network congestion
 * - Testnet: Free (get testnet LUNA from faucet)
 * 
 * IMPORTANT NOTES:
 * - Terra 2.0 (phoenix-1) is the recommended network
 * - Terra Classic (columbus-5) is maintained but less active
 * - CW20 code IDs must be verified for each network
 * - Upload CW20 base contract if code ID doesn't exist
 */

export default TerraBirthdayTokenCreator;
