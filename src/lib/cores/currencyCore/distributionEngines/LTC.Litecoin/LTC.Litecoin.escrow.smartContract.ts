/**
 * Litecoin (LTC) Smart Contract Escrow System
 * Multi-signature P2SH escrow with server arbitration
 */

import * as bitcoin from 'bitcoinjs-lib';
import * as crypto from 'crypto';
import axios from 'axios';

export interface EscrowContractConfig {
  player1PublicKey: Buffer;
  player2PublicKey: Buffer;
  serverPublicKey: Buffer;
  betAmount: number;
  network: 'mainnet' | 'testnet';
}

export interface UTXO {
  txid: string;
  vout: number;
  value: number;
  confirmations: number;
}

export interface GameResult {
  winner: 'player1' | 'player2';
  timestamp: number;
  signature: string;
}

export class LitecoinEscrowContract {
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

  createEscrowScript(config: EscrowContractConfig): { redeemScript: Buffer; p2shAddress: string } {
    const redeemScript = bitcoin.script.compile([
      bitcoin.opcodes.OP_2,
      config.player1PublicKey,
      config.player2PublicKey,
      config.serverPublicKey,
      bitcoin.opcodes.OP_3,
      bitcoin.opcodes.OP_CHECKMULTISIG,
    ]);

    const p2sh = bitcoin.payments.p2sh({
      redeem: { output: redeemScript, network: this.network },
      network: this.network,
    });

    if (!p2sh.address) {
      throw new Error('Failed to create P2SH escrow address');
    }

    return {
      redeemScript,
      p2shAddress: p2sh.address,
    };
  }

  async depositToEscrow(
    playerPrivateKey: string,
    p2shAddress: string,
    amount: number,
    utxos: UTXO[]
  ): Promise<string> {
    try {
      const playerKeyPair = bitcoin.ECPair.fromWIF(playerPrivateKey, this.network);
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
        pubkey: playerKeyPair.publicKey,
        network: this.network,
      });

      if (change > 0 && changeAddress) {
        psbt.addOutput({
          address: changeAddress,
          value: change,
        });
      }

      psbt.signAllInputs(playerKeyPair);
      psbt.finalizeAllInputs();

      const txHex = psbt.extractTransaction().toHex();
      const txHash = await this.broadcastTransaction(txHex);

      console.log(`✅ Deposited ${amount} LTC to escrow`);
      console.log(`   Transaction: ${txHash}`);

      return txHash;
    } catch (error) {
      throw new Error(`Failed to deposit to escrow: ${error}`);
    }
  }

  signGameResult(winner: 'player1' | 'player2'): GameResult {
    const timestamp = Date.now();
    const message = `${winner}:${timestamp}`;
    const messageHash = crypto.createHash('sha256').update(message).digest();
    
    const signature = this.serverKeyPair.sign(messageHash);
    const signatureHex = signature.toString('hex');

    return {
      winner,
      timestamp,
      signature: signatureHex,
    };
  }

  verifyGameResult(result: GameResult): boolean {
    try {
      const message = `${result.winner}:${result.timestamp}`;
      const messageHash = crypto.createHash('sha256').update(message).digest();
      const signature = Buffer.from(result.signature, 'hex');

      return this.serverKeyPair.verify(messageHash, signature);
    } catch (error) {
      console.error('Game result verification failed:', error);
      return false;
    }
  }

  async payoutWinner(
    winnerPrivateKey: string,
    redeemScript: Buffer,
    escrowUTXO: UTXO,
    winnerAddress: string,
    gameResult: GameResult
  ): Promise<string> {
    try {
      if (!this.verifyGameResult(gameResult)) {
        throw new Error('Invalid game result signature');
      }

      const winnerKeyPair = bitcoin.ECPair.fromWIF(winnerPrivateKey, this.network);
      const psbt = new bitcoin.Psbt({ network: this.network });

      const tx = await this.getRawTransaction(escrowUTXO.txid);

      psbt.addInput({
        hash: escrowUTXO.txid,
        index: escrowUTXO.vout,
        nonWitnessUtxo: Buffer.from(tx, 'hex'),
        redeemScript,
      });

      const fee = 10000;
      const outputAmount = escrowUTXO.value - fee;

      psbt.addOutput({
        address: winnerAddress,
        value: outputAmount,
      });

      psbt.signInput(0, winnerKeyPair);
      psbt.signInput(0, this.serverKeyPair);

      psbt.finalizeAllInputs();

      const txHex = psbt.extractTransaction().toHex();
      const txHash = await this.broadcastTransaction(txHex);

      console.log(`✅ Pot paid to winner: ${winnerAddress}`);
      console.log(`   Transaction: ${txHash}`);

      return txHash;
    } catch (error) {
      throw new Error(`Failed to payout winner: ${error}`);
    }
  }

  async refundEscrow(
    player1PrivateKey: string,
    player2PrivateKey: string,
    redeemScript: Buffer,
    escrowUTXO: UTXO,
    player1Address: string,
    player2Address: string
  ): Promise<string> {
    try {
      const player1KeyPair = bitcoin.ECPair.fromWIF(player1PrivateKey, this.network);
      const player2KeyPair = bitcoin.ECPair.fromWIF(player2PrivateKey, this.network);
      const psbt = new bitcoin.Psbt({ network: this.network });

      const tx = await this.getRawTransaction(escrowUTXO.txid);

      psbt.addInput({
        hash: escrowUTXO.txid,
        index: escrowUTXO.vout,
        nonWitnessUtxo: Buffer.from(tx, 'hex'),
        redeemScript,
      });

      const fee = 10000;
      const halfAmount = Math.floor((escrowUTXO.value - fee) / 2);

      psbt.addOutput({
        address: player1Address,
        value: halfAmount,
      });

      psbt.addOutput({
        address: player2Address,
        value: halfAmount,
      });

      psbt.signInput(0, player1KeyPair);
      psbt.signInput(0, player2KeyPair);
      psbt.signInput(0, this.serverKeyPair);

      psbt.finalizeAllInputs();

      const txHex = psbt.extractTransaction().toHex();
      const txHash = await this.broadcastTransaction(txHex);

      console.log(`✅ Escrow refunded to both players`);
      console.log(`   Transaction: ${txHash}`);

      return txHash;
    } catch (error) {
      throw new Error(`Failed to refund escrow: ${error}`);
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

  async getEscrowBalance(p2shAddress: string): Promise<number> {
    try {
      const response = await axios.get(
        `https://api.blockchair.com/litecoin/dashboards/address/${p2shAddress}`
      );
      const balanceSatoshis = response.data.data[p2shAddress].address.balance;
      return balanceSatoshis / 1e8;
    } catch (error) {
      console.error('Failed to fetch escrow balance:', error);
      return 0;
    }
  }
}

export class LitecoinEscrowContractClient {
  private contract: LitecoinEscrowContract;
  private config: EscrowContractConfig;
  private redeemScript?: Buffer;
  private p2shAddress?: string;

  constructor(serverPrivateKey: string, config: EscrowContractConfig) {
    this.contract = new LitecoinEscrowContract(serverPrivateKey, config.network);
    this.config = config;
  }

  async deployEscrowContract(): Promise<{ redeemScript: Buffer; p2shAddress: string }> {
    const { redeemScript, p2shAddress } = this.contract.createEscrowScript(this.config);
    this.redeemScript = redeemScript;
    this.p2shAddress = p2shAddress;

    console.log(`✅ Escrow contract deployed`);
    console.log(`   P2SH Address: ${p2shAddress}`);

    return { redeemScript, p2shAddress };
  }

  async player1Deposit(player1PrivateKey: string, utxos: UTXO[]): Promise<string> {
    if (!this.p2shAddress) {
      throw new Error('Escrow contract not deployed');
    }

    return await this.contract.depositToEscrow(
      player1PrivateKey,
      this.p2shAddress,
      this.config.betAmount,
      utxos
    );
  }

  async player2Deposit(player2PrivateKey: string, utxos: UTXO[]): Promise<string> {
    if (!this.p2shAddress) {
      throw new Error('Escrow contract not deployed');
    }

    return await this.contract.depositToEscrow(
      player2PrivateKey,
      this.p2shAddress,
      this.config.betAmount,
      utxos
    );
  }

  declareWinner(winner: 'player1' | 'player2'): GameResult {
    return this.contract.signGameResult(winner);
  }

  async payoutToWinner(
    winnerPrivateKey: string,
    escrowUTXO: UTXO,
    winnerAddress: string,
    gameResult: GameResult
  ): Promise<string> {
    if (!this.redeemScript) {
      throw new Error('Escrow contract not deployed');
    }

    return await this.contract.payoutWinner(
      winnerPrivateKey,
      this.redeemScript,
      escrowUTXO,
      winnerAddress,
      gameResult
    );
  }

  async refundBothPlayers(
    player1PrivateKey: string,
    player2PrivateKey: string,
    escrowUTXO: UTXO,
    player1Address: string,
    player2Address: string
  ): Promise<string> {
    if (!this.redeemScript) {
      throw new Error('Escrow contract not deployed');
    }

    return await this.contract.refundEscrow(
      player1PrivateKey,
      player2PrivateKey,
      this.redeemScript,
      escrowUTXO,
      player1Address,
      player2Address
    );
  }

  async getBalance(): Promise<number> {
    if (!this.p2shAddress) {
      throw new Error('Escrow contract not deployed');
    }

    return await this.contract.getEscrowBalance(this.p2shAddress);
  }
}

export default LitecoinEscrowContractClient;
