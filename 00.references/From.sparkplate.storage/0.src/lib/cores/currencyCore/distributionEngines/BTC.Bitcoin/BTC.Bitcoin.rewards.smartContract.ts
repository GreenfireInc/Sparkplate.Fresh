/**
 * Bitcoin (BTC) Smart Contract Reward Distribution System
 * 
 * Bitcoin smart contract rewards using:
 * - Taproot scripts for on-chain logic
 * - Bitcoin Script for time-locks and multi-sig
 * - Server-signed attestations for validation
 * - RSK/Liquid sidechain support (optional)
 * 
 * Note: Bitcoin's smart contract capabilities are more limited than Ethereum.
 * Advanced logic typically requires layer 2 solutions or sidechains.
 */

import * as bitcoin from 'bitcoinjs-lib';
import * as ecc from 'tiny-secp256k1';
import { ECPairFactory } from 'ecpair';

const ECPair = ECPairFactory(ecc);

/**
 * Example Taproot Script for reward claim
 * This demonstrates a simple server-authorized claim mechanism
 */
export const TAPROOT_REWARD_SCRIPT_EXAMPLE = `
# Taproot Script Tree Leaf Example
# Requires server signature + user signature

OP_CHECKSIG          # Verify server signature
OP_SWAP
OP_CHECKSIG          # Verify user signature
OP_BOOLAND           # Both must be true
`;

/**
 * Bitcoin Script example for time-locked rewards
 */
export const BITCOIN_SCRIPT_TIMELOCK_EXAMPLE = `
# Time-locked reward script
# Allows claim after specific block height

<block_height>
OP_CHECKLOCKTIMEVERIFY
OP_DROP
OP_DUP
OP_HASH160
<pubkey_hash>
OP_EQUALVERIFY
OP_CHECKSIG
`;

export interface RewardAttestation {
  userAddress: string;
  amount: number; // satoshis
  message: string;
  signature: string;
}

export interface TaprootScriptConfig {
  serverPubKey: Buffer;
  rewardAmount: number;
  lockTime?: number;
}

/**
 * Backend service for signing reward attestations
 */
export class BitcoinRewardBackend {
  private network: bitcoin.Network;
  private serverKeyPair: ReturnType<typeof ECPair.fromWIF>;

  constructor(serverWIF: string, network: 'mainnet' | 'testnet' = 'mainnet') {
    this.network = network === 'mainnet' ? bitcoin.networks.bitcoin : bitcoin.networks.testnet;
    this.serverKeyPair = ECPair.fromWIF(serverWIF, this.network);
  }

  /**
   * Sign a reward attestation for a user
   */
  async signRewardAttestation(
    userAddress: string,
    amountSatoshis: number
  ): Promise<RewardAttestation> {
    try {
      // Create message
      const message = `reward:${userAddress}:${amountSatoshis}`;
      const messageHash = bitcoin.crypto.sha256(Buffer.from(message));
      
      // Sign message
      const signature = this.serverKeyPair.sign(messageHash);

      return {
        userAddress,
        amount: amountSatoshis,
        message,
        signature: signature.toString('hex'),
      };
    } catch (error) {
      throw new Error(
        `Failed to sign attestation: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Create Taproot script tree for reward claim
   */
  createTaprootRewardScript(config: TaprootScriptConfig): Buffer {
    // This is a simplified example. Production code would use proper Taproot construction
    const script = bitcoin.script.compile([
      config.serverPubKey,
      bitcoin.opcodes.OP_CHECKSIGVERIFY,
      bitcoin.script.number.encode(config.rewardAmount),
      bitcoin.opcodes.OP_DROP,
      bitcoin.opcodes.OP_1,
    ]);

    return script;
  }

  /**
   * Get server's Bitcoin address
   */
  getServerAddress(): string {
    const { address } = bitcoin.payments.p2wpkh({
      pubkey: this.serverKeyPair.publicKey,
      network: this.network,
    });
    return address!;
  }

  /**
   * Get server's public key
   */
  getServerPubKey(): Buffer {
    return this.serverKeyPair.publicKey;
  }
}

/**
 * Client for interacting with Bitcoin script-based rewards
 */
export class BitcoinRewardScriptClient {
  private network: bitcoin.Network;

  constructor(network: 'mainnet' | 'testnet' = 'mainnet') {
    this.network = network === 'mainnet' ? bitcoin.networks.bitcoin : bitcoin.networks.testnet;
  }

  /**
   * Create a P2SH address for reward script
   */
  createRewardScriptAddress(redeemScript: Buffer): string {
    const { address } = bitcoin.payments.p2sh({
      redeem: { output: redeemScript, network: this.network },
      network: this.network,
    });
    return address!;
  }

  /**
   * Create a Taproot address for reward script
   */
  createTaprootRewardAddress(internalPubKey: Buffer, scriptTree?: Buffer): string {
    try {
      const { address } = bitcoin.payments.p2tr({
        internalPubkey: internalPubKey.subarray(1, 33), // Remove prefix if present
        network: this.network,
      });
      return address!;
    } catch (error) {
      throw new Error(
        `Failed to create Taproot address: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Build transaction to claim reward from script
   */
  async claimReward(
    attestation: RewardAttestation,
    userWIF: string,
    utxos: Array<{ txid: string; vout: number; value: number; scriptPubKey: string }>,
    scriptPubKey: Buffer
  ): Promise<{ success: boolean; txid?: string; rawTx?: string; error?: string }> {
    try {
      const userKeyPair = ECPair.fromWIF(userWIF, this.network);
      const psbt = new bitcoin.Psbt({ network: this.network });

      // Add inputs
      let totalInput = 0;
      for (const utxo of utxos) {
        psbt.addInput({
          hash: utxo.txid,
          index: utxo.vout,
          witnessUtxo: {
            script: scriptPubKey,
            value: utxo.value,
          },
        });
        totalInput += utxo.value;
      }

      // Add output to user
      const userAddress = bitcoin.payments.p2wpkh({
        pubkey: userKeyPair.publicKey,
        network: this.network,
      }).address!;

      const fee = 1000; // Simple fee estimate
      const outputAmount = totalInput - fee;

      psbt.addOutput({
        address: userAddress,
        value: outputAmount,
      });

      // Sign inputs
      for (let i = 0; i < utxos.length; i++) {
        psbt.signInput(i, userKeyPair);
      }

      // Finalize and extract
      psbt.finalizeAllInputs();
      const tx = psbt.extractTransaction();

      return {
        success: true,
        txid: tx.getId(),
        rawTx: tx.toHex(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Verify server signature on attestation
   */
  verifyAttestation(attestation: RewardAttestation, serverPubKey: Buffer): boolean {
    try {
      const messageHash = bitcoin.crypto.sha256(Buffer.from(attestation.message));
      const signature = Buffer.from(attestation.signature, 'hex');
      
      // Note: This is simplified. Production code needs proper signature verification
      return ecc.verify(messageHash, serverPubKey, signature);
    } catch (error) {
      console.error('Failed to verify attestation:', error);
      return false;
    }
  }
}

/**
 * Complete reward flow coordinator for Bitcoin script-based rewards
 */
export class BitcoinSmartContractRewarder {
  private backend: BitcoinRewardBackend;
  private scriptClient: BitcoinRewardScriptClient;

  constructor(serverWIF: string, network: 'mainnet' | 'testnet' = 'mainnet') {
    this.backend = new BitcoinRewardBackend(serverWIF, network);
    this.scriptClient = new BitcoinRewardScriptClient(network);
  }

  /**
   * Create a reward script address
   */
  createRewardAddress(config: TaprootScriptConfig): string {
    const script = this.backend.createTaprootRewardScript(config);
    return this.scriptClient.createRewardScriptAddress(script);
  }

  /**
   * Complete reward flow: backend signs, user claims
   */
  async rewardUser(
    userAddress: string,
    amountSatoshis: number
  ): Promise<{ attestation: RewardAttestation }> {
    // Backend validates and signs
    const attestation = await this.backend.signRewardAttestation(userAddress, amountSatoshis);

    return { attestation };
  }

  /**
   * Get backend server address
   */
  getBackendAddress(): string {
    return this.backend.getServerAddress();
  }

  /**
   * Get backend server public key
   */
  getBackendPubKey(): Buffer {
    return this.backend.getServerPubKey();
  }

  /**
   * Verify attestation signature
   */
  verifyAttestation(attestation: RewardAttestation): boolean {
    return this.scriptClient.verifyAttestation(attestation, this.backend.getServerPubKey());
  }
}

/**
 * RSK (Rootstock) Smart Contract Support
 * RSK is an EVM-compatible Bitcoin sidechain
 */
export const RSK_REWARD_CONTRACT_SOLIDITY = \`
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// RSK reward contract (EVM-compatible on Bitcoin sidechain)
contract RSKGameReward {
    address public serverAddress;
    mapping(address => bool) public hasClaimed;
    
    constructor(address _serverAddress) {
        serverAddress = _serverAddress;
    }
    
    function claimReward(uint256 amount, bytes memory signature) external {
        require(!hasClaimed[msg.sender], "Already claimed");
        
        bytes32 messageHash = keccak256(abi.encodePacked(msg.sender, amount));
        bytes32 ethSignedHash = keccak256(abi.encodePacked("\\x19Ethereum Signed Message:\\n32", messageHash));
        address signer = recoverSigner(ethSignedHash, signature);
        
        require(signer == serverAddress, "Invalid signature");
        
        hasClaimed[msg.sender] = true;
        payable(msg.sender).transfer(amount);
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
}
\`;

export default BitcoinSmartContractRewarder;
