/**
 * Ethereum Classic (ETC) Smart Contract Reward Distribution System
 * 
 * Solidity-based smart contract rewards for Ethereum Classic
 * - On-chain contract logic using Solidity
 * - Server-signed attestations for off-chain validation
 * - Trustless reward distribution
 * - ERC-20 token and native ETC support
 * - "Code is Law" immutability
 */

import { ethers } from 'ethers';

export const REWARD_CONTRACT_SOLIDITY = \`
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Ethereum Classic Game Reward Contract
// "Code is Law" - Immutable once deployed
contract ETCGameReward {
    address public serverAddress;
    mapping(address => bool) public hasClaimed;
    mapping(address => uint256) public rewardAmounts;
    
    event RewardClaimed(address indexed player, uint256 amount);
    event RewardDeposited(uint256 amount);
    
    constructor(address _serverAddress) {
        serverAddress = _serverAddress;
    }
    
    receive() external payable {
        emit RewardDeposited(msg.value);
    }
    
    function claimReward(uint256 amount, bytes memory signature) external {
        require(!hasClaimed[msg.sender], "Already claimed");
        require(address(this).balance >= amount, "Insufficient contract balance");
        
        bytes32 messageHash = keccak256(abi.encodePacked(msg.sender, amount));
        bytes32 ethSignedHash = keccak256(abi.encodePacked("\\x19Ethereum Signed Message:\\n32", messageHash));
        address signer = recoverSigner(ethSignedHash, signature);
        
        require(signer == serverAddress, "Invalid signature");
        
        hasClaimed[msg.sender] = true;
        rewardAmounts[msg.sender] = amount;
        
        payable(msg.sender).transfer(amount);
        
        emit RewardClaimed(msg.sender, amount);
    }
    
    function recoverSigner(bytes32 ethSignedHash, bytes memory signature) internal pure returns (address) {
        require(signature.length == 65, "Invalid signature length");
        bytes32 r; bytes32 s; uint8 v;
        assembly {
            r := mload(add(signature, 32))
            s := mload(add(signature, 64))
            v := byte(0, mload(add(signature, 96)))
        }
        return ecrecover(ethSignedHash, v, r, s);
    }
    
    function hasClaimedReward(address player) external view returns (bool) {
        return hasClaimed[player];
    }
    
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
\`;

export interface RewardAttestation {
  playerAddress: string;
  amount: string;
  signature: string;
}

export class EthereumClassicRewardBackend {
  private provider: ethers.JsonRpcProvider;
  private serverWallet: ethers.Wallet;

  constructor(serverPrivateKey: string, network: 'mainnet' | 'mordor' = 'mainnet') {
    const rpcUrl = network === 'mainnet' 
      ? 'https://etc.rivet.link'
      : 'https://rpc.mordor.etccooperative.org';
    
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.serverWallet = new ethers.Wallet(serverPrivateKey, this.provider);
  }

  async signRewardAttestation(playerAddress: string, amountETC: string): Promise<RewardAttestation> {
    try {
      if (!ethers.isAddress(playerAddress)) {
        throw new Error('Invalid player address');
      }

      const amountWei = ethers.parseEther(amountETC);
      const messageHash = ethers.solidityPackedKeccak256(['address', 'uint256'], [playerAddress, amountWei]);
      const signature = await this.serverWallet.signMessage(ethers.getBytes(messageHash));

      return { playerAddress, amount: amountWei.toString(), signature };
    } catch (error) {
      throw new Error(\`Failed to sign attestation: \${error instanceof Error ? error.message : 'Unknown error'}\`);
    }
  }

  getServerAddress(): string {
    return this.serverWallet.address;
  }
}

export class EthereumClassicRewardContractClient {
  private provider: ethers.JsonRpcProvider;
  private contract: ethers.Contract | null = null;
  private contractAddress: string;

  constructor(contractAddress: string, network: 'mainnet' | 'mordor' = 'mainnet') {
    this.contractAddress = contractAddress;
    const rpcUrl = network === 'mainnet' 
      ? 'https://etc.rivet.link'
      : 'https://rpc.mordor.etccooperative.org';
    
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
  }

  async initializeContract(): Promise<void> {
    const abi = [
      'function claimReward(uint256 amount, bytes memory signature) external',
      'function hasClaimedReward(address player) external view returns (bool)',
      'function getBalance() external view returns (uint256)',
      'function serverAddress() external view returns (address)',
    ];

    this.contract = new ethers.Contract(this.contractAddress, abi, this.provider);
    console.log('Contract initialized at:', this.contractAddress);
  }

  async claimReward(
    attestation: RewardAttestation,
    playerPrivateKey: string
  ): Promise<{ success: boolean; txHash?: string; error?: string }> {
    try {
      if (!this.contract) {
        throw new Error('Contract not initialized');
      }

      const playerWallet = new ethers.Wallet(playerPrivateKey, this.provider);
      const contractWithSigner = this.contract.connect(playerWallet);

      const hasClaimed = await this.contract.hasClaimedReward(playerWallet.address);
      if (hasClaimed) {
        throw new Error('Reward already claimed');
      }

      const tx = await contractWithSigner.claimReward(attestation.amount, attestation.signature);
      console.log(\`Claim transaction sent: \${tx.hash}\`);
      
      const receipt = await tx.wait();

      return { success: true, txHash: receipt.hash };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  async hasClaimedReward(playerAddress: string): Promise<boolean> {
    try {
      if (!this.contract) {
        throw new Error('Contract not initialized');
      }
      return await this.contract.hasClaimedReward(playerAddress);
    } catch (error) {
      console.error('Error checking claim status:', error);
      return false;
    }
  }

  async getContractBalance(): Promise<string> {
    try {
      if (!this.contract) {
        throw new Error('Contract not initialized');
      }
      const balanceWei = await this.contract.getBalance();
      return ethers.formatEther(balanceWei);
    } catch (error) {
      console.error('Error getting contract balance:', error);
      return '0';
    }
  }
}

export class EthereumClassicSmartContractRewarder {
  private backend: EthereumClassicRewardBackend;
  private contractClient: EthereumClassicRewardContractClient;

  constructor(serverPrivateKey: string, contractAddress: string, network: 'mainnet' | 'mordor' = 'mainnet') {
    this.backend = new EthereumClassicRewardBackend(serverPrivateKey, network);
    this.contractClient = new EthereumClassicRewardContractClient(contractAddress, network);
  }

  async initialize(): Promise<void> {
    await this.contractClient.initializeContract();
  }

  async rewardUser(
    playerAddress: string,
    amountETC: string,
    playerPrivateKey: string
  ): Promise<{ txHash: string; attestation: RewardAttestation }> {
    const attestation = await this.backend.signRewardAttestation(playerAddress, amountETC);
    const result = await this.contractClient.claimReward(attestation, playerPrivateKey);

    if (!result.success) {
      throw new Error(result.error || 'Failed to claim reward');
    }

    return { txHash: result.txHash!, attestation };
  }

  getBackendAddress(): string {
    return this.backend.getServerAddress();
  }

  async getContractBalance(): Promise<string> {
    return await this.contractClient.getContractBalance();
  }

  async hasPlayerClaimed(playerAddress: string): Promise<boolean> {
    return await this.contractClient.hasClaimedReward(playerAddress);
  }
}

export default EthereumClassicSmartContractRewarder;
