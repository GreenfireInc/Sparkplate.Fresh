/**
 * Litecoin (LTC) Smart Contract Reward System
 * Multi-signature P2SH with server attestation
 */

import * as bitcoin from 'bitcoinjs-lib';
import * as crypto from 'crypto';
import axios from 'axios';

export interface RewardContractConfig {
  serverPublicKey: Buffer;
  rewardThreshold: number;
  network: 'mainnet' | 'testnet';
}

export interface RewardAttestation {
  playerAddress: string;
  score: number;
  timestamp: number;
  signature: string;
}

export class LitecoinRewardContract {
  private network: bitcoin.Network;
  private serverKeyPair: bitcoin.ECPairInterface;

  constructor(serverPrivateKey: string, networkType: 'mainnet' | 'testnet' = 'mainnet') {
    this.network = this.getLitecoinNetwork(networkType);
    this.serverKeyPair = bitcoin.ECPair.fromWIF(serverPrivateKey, this.network);
  }

  private getLitecoinNetwork(networkType: 'mainnet' | 'testnet'): bitcoin.Network {
    return networkType === 'mainnet'
      ? {
          messagePrefix: '\x19Litecoin Signed Message:\n',
          bech32: 'ltc',
          bip32: {
            public: 0x019da462,
            private: 0x019d9cfe,
          },
          pubKeyHash: 0x30,
          scriptHash: 0x32,
          wif: 0xb0,
        }
      : bitcoin.networks.testnet;
  }

  createRewardScript(playerPublicKey: Buffer): { redeemScript: Buffer; p2shAddress: string } {
    const redeemScript = bitcoin.script.compile([
      bitcoin.opcodes.OP_2,
      playerPublicKey,
      this.serverKeyPair.publicKey,
      bitcoin.opcodes.OP_2,
      bitcoin.opcodes.OP_CHECKMULTISIG,
    ]);

    const p2sh = bitcoin.payments.p2sh({
      redeem: { output: redeemScript, network: this.network },
      network: this.network,
    });

    if (!p2sh.address) {
      throw new Error('Failed to create P2SH address');
    }

    return {
      redeemScript,
      p2shAddress: p2sh.address,
    };
  }

  async fundRewardPool(p2shAddress: string, amount: number, utxos: UTXO[]): Promise<string> {
    try {
      const psbt = new bitcoin.Psbt({ network: this.network });

      let totalInput = 0;
      for (const utxo of utxos) {
        const tx = await this.getRawTransaction(utxo.txid);
        psbt.addInput({
          hash: utxo.txid,
          index: utxo.vout,
          nonWitnessUtxo: Buffer.from(tx, 'hex'),
        });
        totalInput += utxo.value;
      }

      const amountSatoshis = Math.floor(amount * 1e8);
      const fee = 10000;
      const change = totalInput - amountSatoshis - fee;

      psbt.addOutput({
        address: p2shAddress,
        value: amountSatoshis,
      });

      const { address: changeAddress } = bitcoin.payments.p2pkh({
        pubkey: this.serverKeyPair.publicKey,
        network: this.network,
      });

      if (change > 0 && changeAddress) {
        psbt.addOutput({
          address: changeAddress,
          value: change,
        });
      }

      psbt.signAllInputs(this.serverKeyPair);
      psbt.finalizeAllInputs();

      const txHex = psbt.extractTransaction().toHex();
      const txHash = await this.broadcastTransaction(txHex);

      console.log(`✅ Reward pool funded: ${amount} LTC`);
      console.log(`   P2SH Address: ${p2shAddress}`);
      console.log(`   Transaction: ${txHash}`);

      return txHash;
    } catch (error) {
      throw new Error(`Failed to fund reward pool: ${error}`);
    }
  }

  createAttestation(playerAddress: string, score: number): RewardAttestation {
    const timestamp = Date.now();
    const message = `${playerAddress}:${score}:${timestamp}`;
    const messageHash = crypto.createHash('sha256').update(message).digest();
    
    const signature = this.serverKeyPair.sign(messageHash);
    const signatureHex = signature.toString('hex');

    return {
      playerAddress,
      score,
      timestamp,
      signature: signatureHex,
    };
  }

  verifyAttestation(attestation: RewardAttestation): boolean {
    try {
      const message = `${attestation.playerAddress}:${attestation.score}:${attestation.timestamp}`;
      const messageHash = crypto.createHash('sha256').update(message).digest();
      const signature = Buffer.from(attestation.signature, 'hex');

      return this.serverKeyPair.verify(messageHash, signature);
    } catch (error) {
      console.error('Attestation verification failed:', error);
      return false;
    }
  }

  async claimReward(
    playerPrivateKey: string,
    redeemScript: Buffer,
    p2shUTXO: UTXO,
    playerAddress: string,
    attestation: RewardAttestation
  ): Promise<string> {
    try {
      if (!this.verifyAttestation(attestation)) {
        throw new Error('Invalid attestation signature');
      }

      const playerKeyPair = bitcoin.ECPair.fromWIF(playerPrivateKey, this.network);
      const psbt = new bitcoin.Psbt({ network: this.network });

      const tx = await this.getRawTransaction(p2shUTXO.txid);

      psbt.addInput({
        hash: p2shUTXO.txid,
        index: p2shUTXO.vout,
        nonWitnessUtxo: Buffer.from(tx, 'hex'),
        redeemScript,
      });

      const fee = 10000;
      const outputAmount = p2shUTXO.value - fee;

      psbt.addOutput({
        address: playerAddress,
        value: outputAmount,
      });

      psbt.signInput(0, playerKeyPair);
      psbt.signInput(0, this.serverKeyPair);
      psbt.finalizeAllInputs();

      const txHex = psbt.extractTransaction().toHex();
      const txHash = await this.broadcastTransaction(txHex);

      console.log(`✅ Reward claimed by ${playerAddress}`);
      console.log(`   Transaction: ${txHash}`);

      return txHash;
    } catch (error) {
      throw new Error(`Failed to claim reward: ${error}`);
    }
  }

  private async getRawTransaction(txid: string): Promise<string> {
    try {
      const response = await axios.get(
        `https://api.blockchair.com/litecoin/raw/transaction/${txid}`
      );
      return response.data.data[txid].raw_transaction;
    } catch (error) {
      throw new Error(`Failed to fetch raw transaction: ${txid}`);
    }
  }

  private async broadcastTransaction(txHex: string): Promise<string> {
    try {
      const response = await axios.post(
        'https://api.blockchair.com/litecoin/push/transaction',
        { data: txHex }
      );
      return response.data.data.transaction_hash;
    } catch (error) {
      throw new Error(`Failed to broadcast transaction: ${error}`);
    }
  }
}

interface UTXO {
  txid: string;
  vout: number;
  value: number;
  confirmations: number;
}

export class LitecoinSmartContractRewarder {
  private contract: LitecoinRewardContract;
  private config: RewardContractConfig;

  constructor(serverPrivateKey: string, config: RewardContractConfig) {
    this.contract = new LitecoinRewardContract(serverPrivateKey, config.network);
    this.config = config;
  }

  async setupRewardContract(playerPublicKey: Buffer, fundingAmount: number, utxos: UTXO[]): Promise<{
    redeemScript: Buffer;
    p2shAddress: string;
    fundingTxHash: string;
  }> {
    const { redeemScript, p2shAddress } = this.contract.createRewardScript(playerPublicKey);
    const fundingTxHash = await this.contract.fundRewardPool(p2shAddress, fundingAmount, utxos);

    return {
      redeemScript,
      p2shAddress,
      fundingTxHash,
    };
  }

  attestPlayerReward(playerAddress: string, score: number): RewardAttestation | null {
    if (score >= this.config.rewardThreshold) {
      return this.contract.createAttestation(playerAddress, score);
    }
    return null;
  }

  async processRewardClaim(
    playerPrivateKey: string,
    redeemScript: Buffer,
    p2shUTXO: UTXO,
    playerAddress: string,
    attestation: RewardAttestation
  ): Promise<string> {
    return await this.contract.claimReward(
      playerPrivateKey,
      redeemScript,
      p2shUTXO,
      playerAddress,
      attestation
    );
  }
}

export default LitecoinSmartContractRewarder;
