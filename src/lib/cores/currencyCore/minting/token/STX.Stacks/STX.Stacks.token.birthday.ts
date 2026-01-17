// Stacks Birthday Token Minting Mechanism
// Creates personalized SIP-010 tokens based on user's birthday and initials
// Token amount = birthYear * 10000 (e.g., 1985 → 19,850,000 tokens)
// Ticker symbol = initials + birthYear (e.g., "CS1985")

/**
 * OVERVIEW:
 * 
 * This module creates personalized birthday tokens on Stacks using SIP-010 (Clarity).
 * - User provides initials and birthday
 * - Token supply calculated from birth year (birthYear * 10000)
 * - Ticker symbol generated from initials + year
 * - Clarity smart contract deployed to Stacks
 * 
 * STACKS HIGHLIGHTS:
 * - 🔗 **Bitcoin Layer** - Settles on Bitcoin blockchain
 * - 📜 **Clarity** - Decidable, predictable smart contracts
 * - 🔒 **Bitcoin Security** - Inherits Bitcoin's security
 * - ⚡ Proof of Transfer (PoX) consensus
 * - 🎯 Read Bitcoin state in smart contracts
 * 
 * UNIQUE FEATURES:
 * - Deploys full Clarity smart contract (not just token creation)
 * - SIP-010 token standard (Stacks' ERC-20)
 * - Contract source code generated dynamically
 * - Bitcoin-anchored finality
 * - Works on Mainnet and Testnet
 * 
 * USAGE:
 * const creator = new StacksBirthdayTokenCreator({
 *   network: 'mainnet' // or 'testnet'
 * });
 * const result = await creator.deployToken(privateKeyHex, {
 *   initials: "CS",
 *   birthYear: 1985,
 *   birthMonth: 6,
 *   birthDay: 15
 * });
 */

import {
  makeContractDeploy,
  broadcastTransaction,
  AnchorMode,
  PostConditionMode,
  StacksTestnet,
  StacksMainnet,
  StacksNetwork,
  TxBroadcastResult,
} from '@stacks/transactions';

export interface BirthdayTokenConfig {
  initials: string; // 2-3 letter initials (e.g., "CS")
  birthYear: number; // Full year (e.g., 1985)
  birthMonth: number; // Month 1-12
  birthDay: number; // Day 1-31
  fullName?: string; // Optional full name for display
}

export interface TokenDeploymentResult {
  txHash: string; // Transaction ID
  contractName: string; // Deployed contract name
  tickerSymbol: string; // Generated ticker (e.g., "CS1985")
  tokenAmount: string; // Total supply (e.g., "19850000")
  ownerAddress: string; // Stacks wallet address
  explorerLink: string; // Stacks Explorer link
  contractSource: string; // Clarity contract source code
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
  contractName: string;
  createdAt: string;
  type: 'birthday-token-v1';
  chain: 'stacks';
}

export interface StacksConfig {
  network: 'mainnet' | 'testnet';
}

export class StacksBirthdayTokenCreator {
  private network: StacksNetwork;
  private networkType: 'mainnet' | 'testnet';
  private explorerUrl: string;

  constructor(config: StacksConfig = { network: 'testnet' }) {
    this.networkType = config.network;

    // Set network
    if (this.networkType === 'mainnet') {
      this.network = new StacksMainnet();
      this.explorerUrl = 'https://explorer.hiro.so';
    } else {
      this.network = new StacksTestnet();
      this.explorerUrl = 'https://explorer.hiro.so/?chain=testnet';
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
   * Generate contract name from ticker
   * Format: ticker-birthday-token (lowercase)
   */
  private generateContractName(tickerSymbol: string): string {
    return `${tickerSymbol.toLowerCase()}-birthday-token`;
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
   * Generate Clarity smart contract source code
   * This is a SIP-010 compliant fungible token contract
   */
  private generateClarityContract(
    tokenName: string,
    tickerSymbol: string,
    totalSupply: string,
    birthYear: number,
    birthMonth: number,
    birthDay: number
  ): string {
    return `
;; ${tokenName} - Birthday Token
;; SIP-010 Fungible Token Standard
;; Created: ${new Date().toISOString()}
;; Birth Year: ${birthYear}, Birth Date: ${birthMonth}/${birthDay}/${birthYear}
;; Total Supply: ${totalSupply} tokens

;; Define the fungible token
(define-fungible-token ${tickerSymbol.toLowerCase()} u${totalSupply})

;; Define constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-token-owner (err u101))
(define-constant err-insufficient-balance (err u102))

;; SIP-010 Functions

;; Transfer tokens
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (begin
    (asserts! (is-eq tx-sender sender) err-not-token-owner)
    (try! (ft-transfer? ${tickerSymbol.toLowerCase()} amount sender recipient))
    (match memo to-print (print to-print) 0x)
    (ok true)
  )
)

;; Get token name
(define-read-only (get-name)
  (ok "${tokenName}")
)

;; Get token symbol
(define-read-only (get-symbol)
  (ok "${tickerSymbol}")
)

;; Get decimals
(define-read-only (get-decimals)
  (ok u6)
)

;; Get balance of address
(define-read-only (get-balance (account principal))
  (ok (ft-get-balance ${tickerSymbol.toLowerCase()} account))
)

;; Get total supply
(define-read-only (get-total-supply)
  (ok (ft-get-supply ${tickerSymbol.toLowerCase()}))
)

;; Get token URI (optional for SIP-010)
(define-read-only (get-token-uri)
  (ok (some "https://birthday-token.stacks/${tickerSymbol}"))
)

;; Initialize: Mint total supply to contract deployer
(begin
  (try! (ft-mint? ${tickerSymbol.toLowerCase()} u${totalSupply} contract-owner))
  (print {
    event: "birthday-token-deployed",
    ticker: "${tickerSymbol}",
    name: "${tokenName}",
    supply: u${totalSupply},
    owner: contract-owner,
    birth-year: u${birthYear},
    birth-date: "${birthMonth}/${birthDay}/${birthYear}"
  })
)
`.trim();
  }

  /**
   * Create token metadata
   */
  private createTokenMetadata(
    config: BirthdayTokenConfig,
    ownerAddress: string,
    contractName: string
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
      contractName,
      createdAt: new Date().toISOString(),
      type: 'birthday-token-v1',
      chain: 'stacks',
    };
  }

  /**
   * Get address from private key
   */
  private getAddressFromPrivateKey(privateKey: string): string {
    // In Stacks, the address is derived from the private key
    // This is a simplified version - actual implementation would use Stacks.js
    // For now, we'll extract it from the transaction
    return 'Address will be determined during deployment';
  }

  /**
   * Check STX balance (simplified - would need actual API call)
   */
  async checkWalletBalance(privateKey: string): Promise<{
    address: string;
    balanceSTX: string;
    hasEnoughBalance: boolean;
  }> {
    // In production, this would make an API call to Stacks node
    // For now, return placeholder
    return {
      address: this.getAddressFromPrivateKey(privateKey),
      balanceSTX: '0',
      hasEnoughBalance: true, // Assume true for demo
    };
  }

  /**
   * Deploy birthday token to Stacks
   * Main entry point for token creation
   */
  async deployToken(
    privateKeyHex: string,
    config: BirthdayTokenConfig
  ): Promise<TokenDeploymentResult> {
    // Validate configuration
    this.validateConfig(config);

    // Generate token details
    const tickerSymbol = this.generateTickerSymbol(config.initials, config.birthYear);
    const tokenAmount = this.calculateTokenAmount(config.birthYear);
    const contractName = this.generateContractName(tickerSymbol);
    const tokenName = config.fullName
      ? `${config.fullName} Birthday Token`
      : `Birthday Token ${tickerSymbol}`;

    console.log(`\n=== Birthday Token Deployment ===`);
    console.log(`Network: Stacks ${this.networkType.toUpperCase()}`);
    console.log(`\nToken Details:`);
    console.log(`  Name: ${tokenName}`);
    console.log(`  Ticker: ${tickerSymbol}`);
    console.log(`  Contract: ${contractName}`);
    console.log(`  Supply: ${parseInt(tokenAmount).toLocaleString()} tokens`);
    console.log(`  Decimals: 6`);
    console.log(`  Birthday: ${config.birthMonth}/${config.birthDay}/${config.birthYear}`);

    // Generate Clarity contract
    const contractSource = this.generateClarityContract(
      tokenName,
      tickerSymbol,
      tokenAmount,
      config.birthYear,
      config.birthMonth,
      config.birthDay
    );

    console.log(`\nDeploying Clarity contract to Stacks...`);

    try {
      // Create contract deploy transaction
      const txOptions = {
        contractName,
        codeBody: contractSource,
        senderKey: privateKeyHex,
        network: this.network,
        anchorMode: AnchorMode.Any,
        postConditionMode: PostConditionMode.Allow,
        fee: 100000n, // 0.1 STX in microSTX
      };

      const transaction = await makeContractDeploy(txOptions);
      
      console.log(`Transaction created. Broadcasting...`);

      const result: TxBroadcastResult = await broadcastTransaction(transaction, this.network);

      if (result.error) {
        throw new Error(`Transaction failed: ${result.error} - ${result.reason}`);
      }

      const txHash = result.txid;
      const ownerAddress = this.getAddressFromPrivateKey(privateKeyHex);

      console.log(`\n🎉 Birthday Token Deployed!`);
      console.log(`Contract Name: ${contractName}`);
      console.log(`Transaction: ${txHash}`);

      // Generate explorer links
      const explorerLink = `${this.explorerUrl}/txid/${txHash}`;
      const contractLink = `${this.explorerUrl}/txid/${txHash}?chain=${this.networkType}`;
      
      console.log(`\nExplorer Links:`);
      console.log(`  Transaction: ${explorerLink}`);
      console.log(`  Contract: ${contractLink}`);
      console.log(`\n⚠️  Note: Contract deployment takes ~10-30 minutes on Stacks`);
      console.log(`⚠️  Transaction must be confirmed on Bitcoin for finality`);

      return {
        txHash,
        contractName,
        tickerSymbol,
        tokenAmount,
        ownerAddress,
        explorerLink,
        contractSource,
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
 * // Basic usage - Stacks Mainnet
 * import { StacksBirthdayTokenCreator } from './STX.Stacks.token.birthday';
 * 
 * const creator = new StacksBirthdayTokenCreator({ network: 'mainnet' });
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
 * console.log(`Contract: ${result.contractName}`);
 * console.log(`View at: ${result.explorerLink}`);
 * console.log(`\nClarity Contract:\n${result.contractSource}`);
 * 
 * // Testnet configuration
 * const testnetCreator = new StacksBirthdayTokenCreator({ network: 'testnet' });
 * 
 * // With helper methods
 * const initials = StacksBirthdayTokenCreator.extractInitials("Corey Stedman");
 * const birthday = StacksBirthdayTokenCreator.parseBirthday("06/15/1985");
 * 
 * const result2 = await creator.deployToken(privateKey, {
 *   initials,
 *   ...birthday,
 *   fullName: "Corey Stedman"
 * });
 * 
 * DEPLOYMENT REQUIREMENTS:
 * - Wallet with at least 0.5 STX for contract deployment
 * - Valid private key (64-character hexadecimal)
 * - Valid initials (2-3 letters)
 * - Valid birthday (between 1900 and current year)
 * 
 * TOKEN FEATURES:
 * - SIP-010 standard (Stacks fungible token)
 * - Transfer tokens between addresses
 * - Query balances
 * - Get total supply
 * - Full Clarity contract source included
 * - Bitcoin-anchored finality
 * - 6 decimals (Stacks standard)
 * 
 * SECURITY NOTES:
 * - Never commit private keys to version control
 * - Store keys securely (hardware wallet, env variables)
 * - Use environment variables for production
 * - Test on testnet first
 * - Validate all user inputs
 * - Clarity contracts are immutable once deployed
 * 
 * COST ESTIMATION:
 * - Contract deployment: ~0.1-0.5 STX (~$0.15-0.75 at $1.50/STX)
 * - Must wait for Bitcoin confirmation (10-30 minutes)
 * - Testnet: Free (get testnet STX from faucet)
 * 
 * UNIQUE STACKS FEATURES:
 * - Settles on Bitcoin blockchain
 * - Clarity smart contracts (decidable, predictable)
 * - Can read Bitcoin state in contracts
 * - Proof of Transfer (PoX) consensus
 * - Bitcoin security without Bitcoin smart contracts
 * - Slower but more secure finality
 */

export default StacksBirthdayTokenCreator;
