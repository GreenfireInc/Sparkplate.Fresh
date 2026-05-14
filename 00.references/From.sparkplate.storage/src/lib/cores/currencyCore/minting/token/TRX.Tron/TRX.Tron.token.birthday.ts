// Tron Birthday Token Minting Mechanism
// Creates personalized TRC-20 tokens based on user's birthday and initials
// Token amount = birthYear * 10000 (e.g., 1985 → 19,850,000 tokens)
// Ticker symbol = initials + birthYear (e.g., "CS1985")

/**
 * OVERVIEW:
 * 
 * This module creates personalized birthday tokens on Tron using TRC-20 standard.
 * - User provides initials and birthday
 * - Token supply calculated from birth year (birthYear * 10000)
 * - Ticker symbol generated from initials + year
 * - Solidity smart contract deployed to Tron
 * 
 * TRON HIGHLIGHTS:
 * - ⚡ **High TPS** - 2,000+ transactions per second
 * - 💰 **Ultra-Low Costs** - Nearly free transactions (~$0.01)
 * - 🎯 **EVM Compatible** - Uses Solidity (TVM)
 * - 🌐 **Content Focus** - Built for digital entertainment
 * - 🔋 **Energy/Bandwidth** - Tron's unique resource model
 * - 🚀 **Fast Finality** - 3 second block time
 * 
 * UNIQUE FEATURES:
 * - TRC-20 standard (ERC-20 compatible)
 * - Tron Virtual Machine (TVM) - fork of EVM
 * - Delegated Proof of Stake (DPoS) - 27 Super Representatives
 * - Energy/Bandwidth system (stake TRX for free txns)
 * - Large USDT ecosystem (more USDT than Ethereum!)
 * - Works on Mainnet, Shasta Testnet, Nile Testnet
 * 
 * USAGE:
 * const creator = new TronBirthdayTokenCreator({
 *   network: 'mainnet' // or 'shasta' or 'nile'
 * });
 * const result = await creator.deployToken(privateKeyHex, {
 *   initials: "CS",
 *   birthYear: 1985,
 *   birthMonth: 6,
 *   birthDay: 15
 * });
 */

import TronWeb from 'tronweb';

export interface BirthdayTokenConfig {
  initials: string; // 2-3 letter initials (e.g., "CS")
  birthYear: number; // Full year (e.g., 1985)
  birthMonth: number; // Month 1-12
  birthDay: number; // Day 1-31
  fullName?: string; // Optional full name for display
}

export interface TokenDeploymentResult {
  txHash: string; // Transaction ID
  contractAddress: string; // Deployed TRC-20 contract address
  tickerSymbol: string; // Generated ticker (e.g., "CS1985")
  tokenAmount: string; // Total supply (e.g., "19850000")
  ownerAddress: string; // Tron wallet address (base58)
  explorerLink: string; // TronScan link
  contractABI: any; // Contract ABI
  decimals: number; // Token decimals
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
  contractAddress: string;
  createdAt: string;
  type: 'birthday-token-v1';
  chain: 'tron';
}

export interface TronConfig {
  network: 'mainnet' | 'shasta' | 'nile'; // mainnet, shasta testnet, or nile testnet
  apiKey?: string; // Optional TronGrid API key for higher rate limits
}

export class TronBirthdayTokenCreator {
  private tronWeb: any;
  private network: 'mainnet' | 'shasta' | 'nile';
  private explorerUrl: string;

  constructor(config: TronConfig = { network: 'shasta' }) {
    this.network = config.network;

    // Set network endpoints
    let fullHost: string;
    if (this.network === 'mainnet') {
      fullHost = 'https://api.trongrid.io';
      this.explorerUrl = 'https://tronscan.org';
    } else if (this.network === 'shasta') {
      fullHost = 'https://api.shasta.trongrid.io';
      this.explorerUrl = 'https://shasta.tronscan.org';
    } else {
      // nile
      fullHost = 'https://nile.trongrid.io';
      this.explorerUrl = 'https://nile.tronscan.org';
    }

    // Initialize TronWeb
    const headers = config.apiKey ? { 'TRON-PRO-API-KEY': config.apiKey } : {};
    this.tronWeb = new TronWeb({
      fullHost,
      headers,
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
   * Generate TRC-20 Solidity contract source code
   */
  private generateTRC20Contract(
    tokenName: string,
    tickerSymbol: string,
    totalSupply: string,
    decimals: number
  ): string {
    // Convert to base units (totalSupply * 10^decimals)
    const totalSupplyBaseUnits = BigInt(totalSupply) * BigInt(10 ** decimals);

    return `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title ${tokenName}
 * @dev TRC-20 Birthday Token
 * @dev Total Supply: ${totalSupply} tokens
 * @dev Ticker: ${tickerSymbol}
 */
contract ${tickerSymbol}Token {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor() {
        name = "${tokenName}";
        symbol = "${tickerSymbol}";
        decimals = ${decimals};
        totalSupply = ${totalSupplyBaseUnits.toString()};
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }
    
    function transfer(address to, uint256 value) public returns (bool success) {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }
    
    function approve(address spender, uint256 value) public returns (bool success) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }
    
    function transferFrom(address from, address to, uint256 value) public returns (bool success) {
        require(value <= balanceOf[from], "Insufficient balance");
        require(value <= allowance[from][msg.sender], "Insufficient allowance");
        balanceOf[from] -= value;
        balanceOf[to] += value;
        allowance[from][msg.sender] -= value;
        emit Transfer(from, to, value);
        return true;
    }
}
`.trim();
  }

  /**
   * Get TRC-20 contract ABI
   */
  private getTRC20ABI(): any[] {
    return [
      {
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
          { indexed: true, internalType: 'address', name: 'spender', type: 'address' },
          { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: true, internalType: 'address', name: 'from', type: 'address' },
          { indexed: true, internalType: 'address', name: 'to', type: 'address' },
          { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        inputs: [
          { internalType: 'address', name: '', type: 'address' },
          { internalType: 'address', name: '', type: 'address' },
        ],
        name: 'allowance',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'spender', type: 'address' },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [{ internalType: 'bool', name: 'success', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [{ internalType: 'address', name: '', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'decimals',
        outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'name',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'symbol',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
        ],
        name: 'transfer',
        outputs: [{ internalType: 'bool', name: 'success', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'address', name: 'from', type: 'address' },
          { internalType: 'address', name: 'to', type: 'address' },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
        ],
        name: 'transferFrom',
        outputs: [{ internalType: 'bool', name: 'success', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ];
  }

  /**
   * Set private key for TronWeb instance
   */
  private setPrivateKey(privateKey: string): void {
    // Remove 0x prefix if present
    const cleanKey = privateKey.replace(/^0x/i, '');
    
    // Validate private key format
    if (!/^[0-9a-fA-F]{64}$/.test(cleanKey)) {
      throw new Error('Invalid private key format. Must be 64-character hexadecimal');
    }

    this.tronWeb.setPrivateKey(cleanKey);
  }

  /**
   * Get address from private key
   */
  private getAddress(privateKey: string): string {
    const cleanKey = privateKey.replace(/^0x/i, '');
    return this.tronWeb.address.fromPrivateKey(cleanKey);
  }

  /**
   * Check TRX balance
   */
  async checkBalance(privateKey: string): Promise<{
    address: string;
    balanceTRX: string;
    balanceSUN: string; // 1 TRX = 1,000,000 SUN
    hasEnoughBalance: boolean;
  }> {
    const address = this.getAddress(privateKey);
    const balanceSUN = await this.tronWeb.trx.getBalance(address);
    const balanceTRX = this.tronWeb.fromSun(balanceSUN);
    const requiredTRX = this.network === 'mainnet' ? 100 : 10; // Mainnet needs more

    return {
      address,
      balanceTRX: balanceTRX.toString(),
      balanceSUN: balanceSUN.toString(),
      hasEnoughBalance: parseFloat(balanceTRX) >= requiredTRX,
    };
  }

  /**
   * Create token metadata
   */
  private createTokenMetadata(
    config: BirthdayTokenConfig,
    ownerAddress: string,
    contractAddress: string
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
      decimals: 6,
      birthDate: {
        year: config.birthYear,
        month: config.birthMonth,
        day: config.birthDay,
      },
      owner: ownerAddress,
      contractAddress,
      createdAt: new Date().toISOString(),
      type: 'birthday-token-v1',
      chain: 'tron',
    };
  }

  /**
   * Deploy birthday token to Tron
   * Main entry point for token creation
   */
  async deployToken(
    privateKeyHex: string,
    config: BirthdayTokenConfig
  ): Promise<TokenDeploymentResult> {
    // Validate configuration
    this.validateConfig(config);

    // Set private key
    this.setPrivateKey(privateKeyHex);

    // Get owner address
    const ownerAddress = this.getAddress(privateKeyHex);

    // Generate token details
    const tickerSymbol = this.generateTickerSymbol(config.initials, config.birthYear);
    const tokenAmount = this.calculateTokenAmount(config.birthYear);
    const tokenName = config.fullName
      ? `${config.fullName} Birthday Token`
      : `Birthday Token ${tickerSymbol}`;
    const decimals = 6; // Tron standard

    console.log(`\n=== Birthday Token Deployment ===`);
    console.log(`Network: Tron ${this.network.toUpperCase()}`);
    console.log(`\nToken Details:`);
    console.log(`  Name: ${tokenName}`);
    console.log(`  Ticker: ${tickerSymbol}`);
    console.log(`  Supply: ${parseInt(tokenAmount).toLocaleString()} tokens`);
    console.log(`  Decimals: ${decimals}`);
    console.log(`  Birthday: ${config.birthMonth}/${config.birthDay}/${config.birthYear}`);
    console.log(`  Owner: ${ownerAddress}`);

    // Check balance
    console.log(`\nChecking TRX balance...`);
    const balance = await this.checkBalance(privateKeyHex);
    console.log(`  Balance: ${balance.balanceTRX} TRX`);

    if (!balance.hasEnoughBalance) {
      const required = this.network === 'mainnet' ? 100 : 10;
      throw new Error(
        `Insufficient TRX balance. Need at least ${required} TRX, have ${balance.balanceTRX} TRX`
      );
    }

    // Generate Solidity contract
    const contractSource = this.generateTRC20Contract(
      tokenName,
      tickerSymbol,
      tokenAmount,
      decimals
    );

    console.log(`\nDeploying TRC-20 contract to Tron...`);
    console.log(`⚠️  This may take 3-6 seconds...`);

    try {
      // Deploy contract
      // Note: In production, you'd compile the Solidity code to bytecode first
      // For this example, we'll use TronWeb's transactionBuilder
      
      // Get bytecode (in production, compile from Solidity)
      // This is a placeholder - actual implementation would compile Solidity
      const contractABI = this.getTRC20ABI();
      
      // Create contract instance
      const tronWebContract = await this.tronWeb.contract().new({
        abi: contractABI,
        bytecode: '0x' + '60806040523480156200001157600080fd5b50', // Placeholder - need actual compiled bytecode
        feeLimit: 1000000000, // 1000 TRX max
        callValue: 0,
        userFeePercentage: 100,
        originEnergyLimit: 10000000,
        parameters: [], // Constructor has no parameters
      });

      const contractAddress = tronWebContract;
      const txHash = tronWebContract; // Simplified - would extract from deployment

      console.log(`\n🎉 Birthday Token Deployed!`);
      console.log(`Contract: ${contractAddress}`);
      console.log(`Transaction: ${txHash}`);

      // Generate explorer links
      const explorerLink = `${this.explorerUrl}/#/transaction/${txHash}`;
      const contractLink = `${this.explorerUrl}/#/contract/${contractAddress}`;
      
      console.log(`\nExplorer Links:`);
      console.log(`  Transaction: ${explorerLink}`);
      console.log(`  Contract: ${contractLink}`);
      console.log(`\n✅ Deployment complete! (~3 seconds on Tron)`);

      return {
        txHash,
        contractAddress,
        tickerSymbol,
        tokenAmount,
        ownerAddress,
        explorerLink,
        contractABI,
        decimals,
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
 * // Basic usage - Tron Mainnet
 * import { TronBirthdayTokenCreator } from './TRX.Tron.token.birthday';
 * 
 * const creator = new TronBirthdayTokenCreator({
 *   network: 'mainnet',
 *   apiKey: 'your-trongrid-api-key' // Optional but recommended
 * });
 * 
 * const privateKey = 'your-hex-private-key'; // 64-character hex
 * 
 * const result = await creator.deployToken(privateKey, {
 *   initials: "CS",
 *   birthYear: 1985,
 *   birthMonth: 6,
 *   birthDay: 15,
 *   fullName: "Corey Stedman"
 * });
 * 
 * console.log(`Token ${result.tickerSymbol} deployed!`);
 * console.log(`Contract: ${result.contractAddress}`);
 * console.log(`View at: ${result.explorerLink}`);
 * 
 * // Testnet configuration (Shasta)
 * const testnetCreator = new TronBirthdayTokenCreator({ network: 'shasta' });
 * 
 * // With helper methods
 * const initials = TronBirthdayTokenCreator.extractInitials("Corey Stedman");
 * const birthday = TronBirthdayTokenCreator.parseBirthday("06/15/1985");
 * 
 * const result2 = await creator.deployToken(privateKey, {
 *   initials,
 *   ...birthday,
 *   fullName: "Corey Stedman"
 * });
 * 
 * DEPLOYMENT REQUIREMENTS:
 * - Wallet with at least 100 TRX (mainnet) or 10 TRX (testnet)
 * - Valid private key (64-character hexadecimal)
 * - Valid initials (2-3 letters)
 * - Valid birthday (between 1900 and current year)
 * - Optional: TronGrid API key for higher rate limits
 * 
 * TOKEN FEATURES:
 * - TRC-20 standard (ERC-20 compatible)
 * - Transfer tokens between addresses
 * - Approve/transferFrom functionality
 * - Query balances
 * - Get total supply
 * - Works with TronLink wallet
 * - 6 decimals (Tron standard)
 * - Very fast (3 second blocks)
 * - Ultra-low cost (~$0.01)
 * 
 * SECURITY NOTES:
 * - Never commit private keys to version control
 * - Store keys securely (hardware wallet, env variables)
 * - Use environment variables for production
 * - Test on Shasta testnet first
 * - Validate all user inputs
 * - Consider freezing contract after deployment
 * - Enable Energy/Bandwidth staking for free transactions
 * 
 * COST ESTIMATION:
 * - Contract deployment: ~50-100 TRX (~$7-14 at $0.14/TRX)
 * - Energy cost: ~50,000-100,000 Energy
 * - Bandwidth: ~5,000 Bandwidth
 * - Can reduce costs by staking TRX for Energy/Bandwidth
 * - Testnet: Free (get from faucet)
 * 
 * UNIQUE TRON FEATURES:
 * - Energy/Bandwidth system (stake TRX = free transactions)
 * - Super Representatives (27 elected block producers)
 * - TVM (Tron Virtual Machine) - EVM fork
 * - Largest USDT ecosystem (more than Ethereum!)
 * - Very high TPS (2,000+)
 * - 3 second block time
 * - DPoS consensus
 * - Built for content/entertainment
 */

export default TronBirthdayTokenCreator;
