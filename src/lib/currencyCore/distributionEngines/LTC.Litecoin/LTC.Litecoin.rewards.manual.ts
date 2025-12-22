/**
 * Litecoin (LTC) Manual Reward System for Gaming
 * Server-managed rewards with UTXO management
 */

import * as bitcoin from 'bitcoinjs-lib';
import axios from 'axios';

export interface GameConfig {
  rewardThreshold: number;
  rewardAmount: number;
  tickerSymbol: string;
  network: 'mainnet' | 'testnet';
}

export interface WalletConfig {
  privateKey: string;
  rpcUrl?: string;
  network?: 'mainnet' | 'testnet';
}

export interface Player {
  walletAddress: string;
  score: number;
  hasBeenRewarded: boolean;
  gameStartedAt: Date;
}

export interface TransactionResult {
  success: boolean;
  txHash?: string;
  error?: string;
}

export interface UTXO {
  txid: string;
  vout: number;
  value: number;
  confirmations: number;
}

export class AddressResolver {
  async resolveAddress(input: string, network: 'mainnet' | 'testnet'): Promise<string> {
    if (this.isValidLitecoinAddress(input, network)) {
      return input;
    }
    
    throw new Error(`Invalid Litecoin address: ${input}`);
  }

  private isValidLitecoinAddress(address: string, network: 'mainnet' | 'testnet'): boolean {
    const ltcMainnetRegex = /^[LM3][a-km-zA-HJ-NP-Z1-9]{26,33}$/;
    const ltcTestnetRegex = /^[mn2t][a-km-zA-HJ-NP-Z1-9]{26,33}$/;
    
    return network === 'mainnet' 
      ? ltcMainnetRegex.test(address)
      : ltcTestnetRegex.test(address);
  }
}

export class LitecoinService {
  private privateKey: string;
  private rpcUrl: string;
  private network: 'mainnet' | 'testnet';
  private litecoinNetwork: bitcoin.Network;

  constructor(config: WalletConfig) {
    this.privateKey = config.privateKey;
    this.network = config.network || 'mainnet';
    this.rpcUrl = config.rpcUrl || this.getDefaultRpcUrl();
    this.litecoinNetwork = this.getLitecoinNetwork();
  }

  private getDefaultRpcUrl(): string {
    return this.network === 'mainnet' 
      ? 'https://litecoin.nownodes.io'
      : 'https://testnet.litecore.io';
  }

  private getLitecoinNetwork(): bitcoin.Network {
    return this.network === 'mainnet'
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

  async sendTransaction(toAddress: string, amount: number): Promise<string> {
    try {
      const keyPair = bitcoin.ECPair.fromWIF(this.privateKey, this.litecoinNetwork);
      const { address: fromAddress } = bitcoin.payments.p2pkh({
        pubkey: keyPair.publicKey,
        network: this.litecoinNetwork,
      });

      if (!fromAddress) {
        throw new Error('Failed to derive address from private key');
      }

      const utxos = await this.getUTXOs(fromAddress);
      
      if (utxos.length === 0) {
        throw new Error('No UTXOs available for transaction');
      }

      const psbt = new bitcoin.Psbt({ network: this.litecoinNetwork });
      
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
        address: toAddress,
        value: amountSatoshis,
      });

      if (change > 0) {
        psbt.addOutput({
          address: fromAddress,
          value: change,
        });
      }

      psbt.signAllInputs(keyPair);
      psbt.finalizeAllInputs();

      const txHex = psbt.extractTransaction().toHex();
      const txHash = await this.broadcastTransaction(txHex);

      console.log(`✅ Sent ${amount} LTC to ${toAddress}`);
      console.log(`   Transaction: ${txHash}`);

      return txHash;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Litecoin transaction failed: ${errorMessage}`);
    }
  }

  private async getUTXOs(address: string): Promise<UTXO[]> {
    try {
      const response = await axios.get(
        `https://api.blockchair.com/litecoin/dashboards/address/${address}`
      );

      const utxos: UTXO[] = [];
      const outputs = response.data.data[address].utxo || [];

      for (const output of outputs) {
        utxos.push({
          txid: output.transaction_hash,
          vout: output.index,
          value: output.value,
          confirmations: output.confirmations || 0,
        });
      }

      return utxos;
    } catch (error) {
      console.error('Failed to fetch UTXOs:', error);
      return [];
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

  async getBalance(): Promise<number> {
    try {
      const keyPair = bitcoin.ECPair.fromWIF(this.privateKey, this.litecoinNetwork);
      const { address } = bitcoin.payments.p2pkh({
        pubkey: keyPair.publicKey,
        network: this.litecoinNetwork,
      });

      if (!address) {
        throw new Error('Failed to derive address');
      }

      const response = await axios.get(
        `https://api.blockchair.com/litecoin/dashboards/address/${address}`
      );

      const balanceSatoshis = response.data.data[address].address.balance;
      return balanceSatoshis / 1e8;
    } catch (error) {
      throw new Error(`Balance check failed: ${error}`);
    }
  }
}

export class LitecoinRewarder {
  private addressResolver: AddressResolver;
  private litecoinService: LitecoinService;

  constructor(walletConfig: WalletConfig) {
    this.addressResolver = new AddressResolver();
    this.litecoinService = new LitecoinService(walletConfig);
  }

  async sendReward(playerAddress: string, amount: number, network: 'mainnet' | 'testnet'): Promise<TransactionResult> {
    try {
      const resolvedAddress = await this.addressResolver.resolveAddress(playerAddress, network);
      const balance = await this.litecoinService.getBalance();

      if (balance < amount) {
        throw new Error(
          `Insufficient LTC balance. Required: ${amount}, Available: ${balance}`
        );
      }

      const txHash = await this.litecoinService.sendTransaction(resolvedAddress, amount);

      return {
        success: true,
        txHash,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

export class GameRewardManager {
  private players: Map<string, Player> = new Map();
  private rewarder: LitecoinRewarder;
  private gameConfig: GameConfig;

  constructor(gameConfig: GameConfig, walletConfig: WalletConfig) {
    this.gameConfig = gameConfig;
    this.rewarder = new LitecoinRewarder(walletConfig);
  }

  async startGame(walletInput: string): Promise<{ success: boolean; address?: string; error?: string }> {
    try {
      const addressResolver = new AddressResolver();
      const resolvedAddress = await addressResolver.resolveAddress(walletInput, this.gameConfig.network);

      if (this.players.has(resolvedAddress)) {
        return {
          success: false,
          error: 'Game already started for this address',
        };
      }

      const player: Player = {
        walletAddress: resolvedAddress,
        score: 0,
        hasBeenRewarded: false,
        gameStartedAt: new Date(),
      };

      this.players.set(resolvedAddress, player);
      console.log(`Litecoin game started for: ${resolvedAddress}`);

      return {
        success: true,
        address: resolvedAddress,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async updateScore(
    walletInput: string,
    newScore: number
  ): Promise<{ success: boolean; rewardSent?: boolean; txHash?: string; error?: string }> {
    try {
      const addressResolver = new AddressResolver();
      const resolvedAddress = await addressResolver.resolveAddress(walletInput, this.gameConfig.network);
      const player = this.players.get(resolvedAddress);

      if (!player) {
        return {
          success: false,
          error: 'Player not found. Start game first.',
        };
      }

      player.score = newScore;
      console.log(`Score updated for ${resolvedAddress}: ${newScore}`);

      if (newScore >= this.gameConfig.rewardThreshold && !player.hasBeenRewarded) {
        const result = await this.rewarder.sendReward(
          player.walletAddress,
          this.gameConfig.rewardAmount,
          this.gameConfig.network
        );

        if (result.success) {
          player.hasBeenRewarded = true;
          return {
            success: true,
            rewardSent: true,
            txHash: result.txHash,
          };
        } else {
          return {
            success: false,
            error: result.error,
          };
        }
      }

      return {
        success: true,
        rewardSent: false,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  getPlayer(walletAddress: string): Player | undefined {
    return this.players.get(walletAddress);
  }

  getAllPlayers(): Player[] {
    return Array.from(this.players.values());
  }
}

export default GameRewardManager;
