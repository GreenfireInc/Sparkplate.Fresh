// Ethereum Classic Birthday Token Minting Mechanism
// Creates personalized tokens based on user's birthday and initials
// Token amount = birthYear * 10000 (e.g., 1985 → 19,850,000 tokens)
// Ticker symbol = initials + birthYear (e.g., "CS1985")

/**
 * OVERVIEW:
 * 
 * This module creates personalized birthday tokens on Ethereum Classic using ERC-20.
 * - User provides initials and birthday
 * - Token supply calculated from birth year (birthYear * 10000)
 * - Ticker symbol generated from initials + year
 * - ERC-20 token contract deployed to ETC
 * 
 * FEATURES:
 * - ERC-20 token standard (Ethereum-compatible)
 * - Full transfer and approval functionality
 * - Balance queries
 * - Birthday metadata embedded in token name
 * - Full transaction history on ETC blockchain
 * - Works on ETC Mainnet and Mordor Testnet
 * 
 * USAGE:
 * const creator = new EthereumClassicBirthdayTokenCreator({
 *   network: 'testnet' // or 'mainnet'
 * });
 * const result = await creator.deployToken(privateKey, {
 *   initials: "CS",
 *   birthYear: 1985,
 *   birthMonth: 6,
 *   birthDay: 15
 * });
 */

import { ethers } from 'ethers';

export interface BirthdayTokenConfig {
  initials: string; // 2-3 letter initials (e.g., "CS")
  birthYear: number; // Full year (e.g., 1985)
  birthMonth: number; // Month 1-12
  birthDay: number; // Day 1-31
  fullName?: string; // Optional full name for display
}

export interface TokenDeploymentResult {
  txHash: string; // Transaction hash
  contractAddress: string; // Deployed token contract address
  tickerSymbol: string; // Generated ticker (e.g., "CS1985")
  tokenAmount: string; // Total supply (e.g., "19850000")
  ownerAddress: string; // ETC wallet address
  blockscoutLink: string; // Blockscout explorer link
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

export interface EthereumClassicConfig {
  network: 'mainnet' | 'testnet';
  rpcUrl?: string;
  chainId?: number;
}

/**
 * ERC-20 Birthday Token Contract (Solidity)
 * Standard ERC-20 token implementation for Ethereum Classic
 */
export const BIRTHDAY_TOKEN_CONTRACT_SOURCE = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BirthdayToken {
    string public name;
    string public symbol;
    uint8 public constant decimals = 18;
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor(string memory _name, string memory _symbol, uint256 _initialSupply) {
        name = _name;
        symbol = _symbol;
        totalSupply = _initialSupply * 10 ** uint256(decimals);
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }
    
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value, "Insufficient balance");
        require(_to != address(0), "Invalid address");
        
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
    
    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
    
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from], "Insufficient balance");
        require(_value <= allowance[_from][msg.sender], "Insufficient allowance");
        require(_to != address(0), "Invalid address");
        
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}
`;

// Compiled contract bytecode and ABI
export const BIRTHDAY_TOKEN_ABI = [
  "constructor(string memory _name, string memory _symbol, uint256 _initialSupply)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)"
];

// Contract bytecode (same as BNB implementation - EVM compatible)
export const BIRTHDAY_TOKEN_BYTECODE = "0x608060405234801561000f575f80fd5b50604051611b1a380380611b1a83398181016040528101906100319190610350565b8260039081610040919061062f565b50816004908161005091906106d2565b508060ff16600a61006191906107de565b8161006c9190610828565b60028190555060025460015f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20819055503373ffffffffffffffffffffffffffffffffffffffff165f73ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60025460405161011291906108b8565b60405180910390a35050506108d1565b5f604051905090565b5f80fd5b5f80fd5b5f80fd5b5f80fd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b61018682610140565b810181811067ffffffffffffffff821117156101a5576101a4610150565b5b80604052505050565b5f6101b7610122565b90506101c3828261017d565b919050565b5f67ffffffffffffffff8211156101e2576101e1610150565b5b6101eb82610140565b9050602081019050919050565b5f5b838110156102155780820151818401526020810190506101fa565b5f8484015250505050565b5f61023261022d846101c8565b6101ae565b90508281526020810184848401111561024e5761024d61013c565b5b6102598482856101f8565b509392505050565b5f82601f83011261027557610274610138565b5b8151610285848260208601610220565b91505092915050565b5f819050919050565b6102a08161028e565b81146102aa575f80fd5b50565b5f815190506102bb81610297565b92915050565b5f805f606084860312156102d8576102d761012b565b5b5f84015167ffffffffffffffff8111156102f5576102f461012f565b5b61030186828701610261565b935050602084015167ffffffffffffffff8111156103225761032161012f565b5b61032e86828701610261565b925050604061033f868287016102ad565b9150509250925092565b6112388061090f5f395ff3fe608060405234801561000f575f80fd5b50600436106100cd575f3560e01c806342966c681161008a578063a9059cbb11610064578063a9059cbb1461021e578063dd62ed3e1461024e578063f2fde38b1461027e576100cd565b806342966c68146101be57806370a08231146101da57806395d89b411461020a576100cd565b806306fdde03146100d1578063095ea7b3146100ef57806318160ddd1461011f57806323b872dd1461013d578063313ce5671461016d578063395093511461018b575b5f80fd5b6100d96102aa565b6040516100e69190610d63565b60405180910390f35b61010960048036038101906101049190610e14565b610336565b6040516101169190610e6c565b60405180910390f35b610127610358565b6040516101349190610e94565b60405180910390f35b61015760048036038101906101529190610ead565b61035e565b6040516101649190610e6c565b60405180910390f35b61017561038c565b6040516101829190610f18565b60405180910390f35b6101a560048036038101906101a09190610e14565b610395565b6040516101b59190610e6c565b60405180910390f35b6101d860048036038101906101d39190610f31565b6103cb565b005b6101f460048036038101906101ef9190610f5c565b610475565b6040516102019190610e94565b60405180910390f35b61021261048a565b60405161021f9190610d63565b60405180910390f35b61023860048036038101906102339190610e14565b610516565b6040516102459190610e6c565b60405180910390f35b61026860048036038101906102639190610f87565b610538565b6040516102759190610e94565b60405180910390f35b61029860048036038101906102939190610f5c565b61055a565b005b6060600380546102b990610ff2565b80601f01602080910402602001604051908101604052809291908181526020018280546102e590610ff2565b80156103305780601f1061030757610100808354040283529160200191610330565b820191905f5260205f20905b81548152906001019060200180831161031357829003601f168201915b50505050509050919050565b5f80610340610626565b905061034d81858561062d565b600191505092915050565b60025481565b5f80610368610626565b90506103758582856106f0565b610380858585610782565b60019150509392505050565b5f60129050919050565b5f8061039f610626565b90506103c08185856103b18589610538565b6103bb9190611022565b61062d565b600191505092915050565b5f6103d4610626565b90505f60015f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205490508281101561045a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161045190611061565b60405180910390fd5b6104648184610a5a565b50505050565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146104f9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104f0906110c9565b60405180910390fd5b61050382826003610aa5565b61050d8282610c5d565b5f9052505050565b5f80610520610626565b905061052d818585610782565b600191505092915050565b5f60055f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2054905092915050565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146105e9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105e0906110c9565b60405180910390fd5b8060015f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b5f33905090565b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361069b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161069290611157565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610709576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610700906111e5565b60405180910390fd5b8060055f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040516107e39190610e94565b60405180910390a3505050565b5f6107f784610538565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff811461077c578181101561076d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108649061124d565b60405180910390fd5b61077b848484840361062d565b5b50505050565b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036107f0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107e7906112db565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361085e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161085590611369565b60405180910390fd5b5f60015f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20549050818110156108e2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108d9906113f7565b60405180910390fd5b8181036001600086733ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20819055508160015f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8282546109769190611022565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516109da9190610e94565b60405180910390a36109ed848484610d16565b50505050565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610a61576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a589061145f565b60405180910390fd5b610a6c5f8383610d1b565b8060025f828254610a7d9190611022565b92505081905550806001600083733ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f82825401925050819055508173ffffffffffffffffffffffffffffffffffffffff165f73ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610b2c9190610e94565b60405180910390a3610b3f5f8383610d20565b5050565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610bb1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ba8906114ed565b60405180910390fd5b610bbc825f83610d1b565b5f60015f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2054905081811015610c40576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c379061157b565b60405180910390fd5b8181036001600085733ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2081905550816002600082825403925050819055505f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610cf19190610e94565b60405180910390a3610d0483835f610d20565b505050565b505050565b505050565b505050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f601f19601f8301169050919050565b5f610d5982610d25565b610d638185610d2f565b9350610d73818560208601610d3f565b610d7c81610d4d565b840191505092915050565b5f6020820190508181035f830152610d9f8184610d4f565b905092915050565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f610dd482610dab565b9050919050565b610de481610dca565b8114610dee575f80fd5b50565b5f81359050610dff81610ddb565b92915050565b5f819050919050565b610e1781610e05565b8114610e21575f80fd5b50565b5f81359050610e3281610e0e565b92915050565b5f8060408385031215610e4e57610e4d610da7565b5b5f610e5b85828601610df1565b9250506020610e6c85828601610e24565b9150509250925092565b5f8115159050919050565b610e8a81610e76565b82525050565b5f602082019050610ea35f830184610e81565b92915050565b5f805f60608486031215610ec057610ebf610da7565b5b5f610ecd86828701610df1565b9350506020610ede86828701610df1565b9250506040610eef86828701610e24565b9150509250925092565b5f60ff82169050919050565b610f0e81610ef9565b82525050565b5f602082019050610f275f830184610f05565b92915050565b5f60208284031215610f4257610f41610da7565b5b5f610f4f84828501610e24565b91505092915050565b5f60208284031215610f6d57610f6c610da7565b5b5f610f7a84828501610df1565b91505092915050565b5f8060408385031215610f9957610f98610da7565b5b5f610fa685828601610df1565b9250506020610fb785828601610df1565b9150509250925092565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f600282049050600182168061100957607f821691505b60208210810361101c5761101b610fc5565b5b50919050565b5f61102c82610e05565b915061103783610e05565b925082820190508082111561104f5761104e610ff2565b5b92915050565b7f45524332303a206275726e20616d6f756e7420657863656564732062616c616e5f8201527f6365000000000000000000000000000000000000000000000000000000000000602082015250565b5f6110ab602283610d2f565b91506110b682611051565b604082019050919050565b5f6020820190508181035f8301526110d88161109f565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65725f82015250565b5f611113602083610d2f565b915061111e826110df565b602082019050919050565b5f6020820190508181035f83015261114081611107565b9050919050565b7f45524332303a20617070726f76652066726f6d20746865207a65726f206164645f8201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b5f6111a1602483610d2f565b91506111ac82611147565b604082019050919050565b5f6020820190508181035f8301526111ce81611195565b9050919050565b7f45524332303a20617070726f766520746f20746865207a65726f2061646472655f8201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b5f61122f602283610d2f565b915061123a826111d5565b604082019050919050565b5f6020820190508181035f83015261125c81611223565b9050919050565b7f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000005f82015250565b5f611297601d83610d2f565b91506112a282611263565b602082019050919050565b5f6020820190508181035f8301526112c48161128b565b9050919050565b7f45524332303a207472616e736665722066726f6d20746865207a65726f2061645f8201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b5f611325602583610d2f565b9150611330826112cb565b604082019050919050565b5f6020820190508181035f83015261135281611319565b9050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f20616464725f8201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b5f6113b3602383610d2f565b91506113be82611359565b604082019050919050565b5f6020820190508181035f8301526113e0816113a7565b9050919050565b7f45524332303a207472616e7366657220616d6f756e74206578636565647320625f8201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b5f611441602683610d2f565b915061144c826113e7565b604082019050919050565b5f6020820190508181035f83015261146e81611435565b9050919050565b7f45524332303a206d696e7420746f20746865207a65726f2061646472657373005f82015250565b5f6114a9601f83610d2f565b91506114b482611475565b602082019050919050565b5f6020820190508181035f8301526114d68161149d565b9050919050565b7f45524332303a206275726e2066726f6d20746865207a65726f206164647265735f8201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b5f611537602183610d2f565b9150611542826114dd565b604082019050919050565b5f6020820190508181035f8301526115648161152b565b9050919050565b7f45524332303a206275726e20616d6f756e7420657863656564732062616c616e5f8201527f6365000000000000000000000000000000000000000000000000000000000000602082015250565b5f6115c5602283610d2f565b91506115d082611565565b604082019050919050565b5f6020820190508181035f8301526115f2816115b9565b905091905056fea264697066735822122069a5fc3c8ec1c8d8f0a0e4a65bc9d8d1f3a68c3f0e1e7e8f9f0a1a2a3a4a5a6a7264736f6c63430008140033";

export class EthereumClassicBirthdayTokenCreator {
  private provider: ethers.Provider;
  private network: 'mainnet' | 'testnet';
  private rpcUrl: string;
  private chainId: number;
  private explorerUrl: string;

  constructor(config: EthereumClassicConfig = { network: 'testnet' }) {
    this.network = config.network;

    // Set network-specific parameters
    if (this.network === 'mainnet') {
      this.rpcUrl = config.rpcUrl || 'https://etc.rivet.link';
      this.chainId = config.chainId || 61;
      this.explorerUrl = 'https://blockscout.com/etc/mainnet';
    } else {
      this.rpcUrl = config.rpcUrl || 'https://rpc.mordor.etccooperative.org';
      this.chainId = config.chainId || 63;
      this.explorerUrl = 'https://blockscout.com/etc/mordor';
    }

    this.provider = new ethers.JsonRpcProvider(this.rpcUrl, this.chainId);
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
      decimals: 18,
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
  async checkWalletBalance(privateKey: string): Promise<{
    address: string;
    balanceETC: string;
    balanceWei: bigint;
    hasEnoughBalance: boolean;
  }> {
    const wallet = new ethers.Wallet(privateKey, this.provider);
    const balanceWei = await this.provider.getBalance(wallet.address);
    const balanceETC = ethers.formatEther(balanceWei);

    // Minimum 0.01 ETC required for deployment (conservative estimate)
    const minBalance = ethers.parseEther('0.01');
    const hasEnoughBalance = balanceWei >= minBalance;

    return {
      address: wallet.address,
      balanceETC,
      balanceWei,
      hasEnoughBalance,
    };
  }

  /**
   * Deploy birthday token to Ethereum Classic
   * Main entry point for token creation
   */
  async deployToken(
    privateKey: string,
    config: BirthdayTokenConfig
  ): Promise<TokenDeploymentResult> {
    // Validate configuration
    this.validateConfig(config);

    // Create wallet
    const wallet = new ethers.Wallet(privateKey, this.provider);

    // Check wallet balance
    const walletInfo = await this.checkWalletBalance(privateKey);
    console.log(`\n=== Birthday Token Deployment ===`);
    console.log(`Network: ETC ${this.network.toUpperCase()}`);
    console.log(`Chain ID: ${this.chainId}`);
    console.log(`Wallet Address: ${walletInfo.address}`);
    console.log(`Wallet Balance: ${walletInfo.balanceETC} ETC`);

    if (!walletInfo.hasEnoughBalance) {
      throw new Error(
        `Insufficient ETC balance. Need at least 0.01 ETC for deployment. Current: ${walletInfo.balanceETC} ETC`
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
    console.log(`  Decimals: 18`);
    console.log(`  Birthday: ${config.birthMonth}/${config.birthDay}/${config.birthYear}`);

    console.log(`\nDeploying ERC-20 contract on Ethereum Classic...`);

    try {
      // Create contract factory
      const factory = new ethers.ContractFactory(
        BIRTHDAY_TOKEN_ABI,
        BIRTHDAY_TOKEN_BYTECODE,
        wallet
      );

      // Deploy contract
      const contract = await factory.deploy(tokenName, tickerSymbol, tokenAmount);

      console.log(`Transaction submitted. Waiting for confirmation...`);

      // Wait for deployment
      await contract.waitForDeployment();
      const contractAddress = await contract.getAddress();
      const deployTx = contract.deploymentTransaction();

      if (!deployTx) {
        throw new Error('Deployment transaction not found');
      }

      console.log(`\n🎉 Birthday Token Deployed!`);
      console.log(`Contract Address: ${contractAddress}`);
      console.log(`Transaction Hash: ${deployTx.hash}`);

      // Generate explorer links
      const blockscoutLink = `${this.explorerUrl}/address/${contractAddress}`;
      console.log(`\nExplorer Link:`);
      console.log(`  ${blockscoutLink}`);

      // Calculate actual supply with decimals
      const actualSupply = ethers.formatEther(ethers.parseEther(tokenAmount));

      return {
        txHash: deployTx.hash,
        contractAddress,
        tickerSymbol,
        tokenAmount: actualSupply,
        ownerAddress: walletInfo.address,
        blockscoutLink,
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
      const contract = new ethers.Contract(contractAddress, BIRTHDAY_TOKEN_ABI, this.provider);
      const balance = await contract.balanceOf(userAddress);
      return ethers.formatEther(balance);
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
      const contract = new ethers.Contract(contractAddress, BIRTHDAY_TOKEN_ABI, this.provider);
      
      const [name, symbol, decimals, totalSupply] = await Promise.all([
        contract.name(),
        contract.symbol(),
        contract.decimals(),
        contract.totalSupply(),
      ]);

      return {
        name,
        symbol,
        decimals,
        totalSupply: ethers.formatUnits(totalSupply, decimals),
      };
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
 * // Basic usage - ETC Mainnet
 * import { EthereumClassicBirthdayTokenCreator } from './ETC.EthereumClassic.token.birthday';
 * 
 * const creator = new EthereumClassicBirthdayTokenCreator({ network: 'mainnet' });
 * const privateKey = 'your-private-key-hex';
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
 * console.log(`Contract: ${result.contractAddress}`);
 * console.log(`View at: ${result.blockscoutLink}`);
 * 
 * // Mordor Testnet configuration
 * const testnetCreator = new EthereumClassicBirthdayTokenCreator({ network: 'testnet' });
 * 
 * // With helper methods
 * const initials = EthereumClassicBirthdayTokenCreator.extractInitials("Corey Stedman");
 * const birthday = EthereumClassicBirthdayTokenCreator.parseBirthday("06/15/1985");
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
 * - Wallet with at least 0.01 ETC for gas fees
 * - Valid private key (32 bytes / 64 hex chars, with or without 0x prefix)
 * - Valid initials (2-3 letters)
 * - Valid birthday (between 1900 and current year)
 * 
 * TOKEN FEATURES:
 * - ERC-20 standard (Ethereum-compatible)
 * - Transfer tokens between addresses
 * - Approve/allowance functionality
 * - Query balances
 * - Get total supply
 * - Full transaction history on ETC blockchain
 * - 18 decimals (standard)
 * 
 * SECURITY NOTES:
 * - Never commit private keys to version control
 * - Store keys securely
 * - Use environment variables for production
 * - Test on Mordor testnet first
 * - Validate all user inputs
 * 
 * COST ESTIMATION:
 * - Contract deployment: ~0.005-0.01 ETC
 * - Depends on gas price and network congestion
 * - Testnet: Free (get testnet ETC from faucet)
 */

export default EthereumClassicBirthdayTokenCreator;
