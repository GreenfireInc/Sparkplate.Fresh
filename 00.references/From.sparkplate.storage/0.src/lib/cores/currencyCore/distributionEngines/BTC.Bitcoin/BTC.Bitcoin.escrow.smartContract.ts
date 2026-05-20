/**
 * Bitcoin (BTC) Smart Contract Escrow System
 * Multi-signature and script-based escrow for multiplayer gaming
 */

import * as bitcoin from 'bitcoinjs-lib';
import * as ecc from 'tiny-secp256k1';
import { ECPairFactory } from 'ecpair';

const ECPair = ECPairFactory(ecc);

/**
 * Bitcoin Script for 2-of-3 multisig escrow
 * Players + Server as arbiter
 */
export const MULTISIG_ESCROW_SCRIPT_EXAMPLE = \`
# 2-of-3 MultiSig Escrow
# Requires 2 of 3 signatures: player1, player2, server

OP_2                    # Require 2 signatures
<player1_pubkey>
<player2_pubkey>
<server_pubkey>
OP_3                    # Out of 3 keys
OP_CHECKMULTISIG
\`;

/**
 * Hash Time-Locked Contract (HTLC) for escrow
 * Used in Lightning Network, adaptable for gaming
 */
export const HTLC_ESCROW_SCRIPT_EXAMPLE = \`
# HTLC Escrow Script
# Either: revealed secret + user sig, OR: timeout + refund

OP_IF
    OP_SHA256
    <secret_hash>
    OP_EQUALVERIFY
    <user_pubkey>
    OP_CHECKSIG
OP_ELSE
    <timeout_blocks>
    OP_CHECKLOCKTIMEVERIFY
    OP_DROP
    <refund_pubkey>
    OP_CHECKSIG
OP_ENDIF
\`;

export interface MultiSigConfig {
  player1PubKey: Buffer;
  player2PubKey: Buffer;
  serverPubKey: Buffer;
  betAmountSats: number;
}

export interface EscrowUTXO {
  txid: string;
  vout: number;
  value: number;
  redeemScript: Buffer;
}

/**
 * Bitcoin Multi-Signature Escrow Client
 */
export class BitcoinEscrowMultiSig {
  private network: bitcoin.Network;

  constructor(network: 'mainnet' | 'testnet' = 'mainnet') {
    this.network = network === 'mainnet' ? bitcoin.networks.bitcoin : bitcoin.networks.testnet;
  }

  /**
   * Create 2-of-3 multisig escrow address
   */
  createMultiSigEscrow(config: MultiSigConfig): {
    address: string;
    redeemScript: Buffer;
    scriptPubKey: Buffer;
  } {
    // Create 2-of-3 multisig
    const payment = bitcoin.payments.p2sh({
      redeem: bitcoin.payments.p2ms({
        m: 2,
        pubkeys: [config.player1PubKey, config.player2PubKey, config.serverPubKey],
        network: this.network,
      }),
      network: this.network,
    });

    return {
      address: payment.address!,
      redeemScript: payment.redeem!.output!,
      scriptPubKey: payment.output!,
    };
  }

  /**
   * Create SegWit 2-of-3 multisig escrow address (P2WSH)
   */
  createSegWitMultiSigEscrow(config: MultiSigConfig): {
    address: string;
    witnessScript: Buffer;
    scriptPubKey: Buffer;
  } {
    // Create 2-of-3 multisig witness script
    const payment = bitcoin.payments.p2wsh({
      redeem: bitcoin.payments.p2ms({
        m: 2,
        pubkeys: [config.player1PubKey, config.player2PubKey, config.serverPubKey],
        network: this.network,
      }),
      network: this.network,
    });

    return {
      address: payment.address!,
      witnessScript: payment.redeem!.output!,
      scriptPubKey: payment.output!,
    };
  }

  /**
   * Sign and broadcast payout to winner
   * Requires 2 of 3 signatures (e.g., server + winner)
   */
  async payoutWinner(
    utxos: EscrowUTXO[],
    winnerAddress: string,
    serverWIF: string,
    winnerWIF: string,
    redeemScript: Buffer
  ): Promise<{ txid: string; rawTx: string }> {
    const serverKeyPair = ECPair.fromWIF(serverWIF, this.network);
    const winnerKeyPair = ECPair.fromWIF(winnerWIF, this.network);

    const psbt = new bitcoin.Psbt({ network: this.network });

    // Add inputs
    let totalInput = 0;
    for (const utxo of utxos) {
      psbt.addInput({
        hash: utxo.txid,
        index: utxo.vout,
        witnessUtxo: {
          script: redeemScript,
          value: utxo.value,
        },
        redeemScript: utxo.redeemScript,
      });
      totalInput += utxo.value;
    }

    // Calculate payout
    const fee = 1000; // Simple fee estimate
    const payoutAmount = totalInput - fee;

    psbt.addOutput({
      address: winnerAddress,
      value: payoutAmount,
    });

    // Sign with both keys
    for (let i = 0; i < utxos.length; i++) {
      psbt.signInput(i, serverKeyPair);
      psbt.signInput(i, winnerKeyPair);
    }

    // Finalize and extract
    psbt.finalizeAllInputs();
    const tx = psbt.extractTransaction();

    return {
      txid: tx.getId(),
      rawTx: tx.toHex(),
    };
  }

  /**
   * Create HTLC escrow script
   */
  createHTLCScript(
    secretHash: Buffer,
    userPubKey: Buffer,
    refundPubKey: Buffer,
    timeoutBlocks: number
  ): Buffer {
    return bitcoin.script.compile([
      bitcoin.opcodes.OP_IF,
      bitcoin.opcodes.OP_SHA256,
      secretHash,
      bitcoin.opcodes.OP_EQUALVERIFY,
      userPubKey,
      bitcoin.opcodes.OP_CHECKSIG,
      bitcoin.opcodes.OP_ELSE,
      bitcoin.script.number.encode(timeoutBlocks),
      bitcoin.opcodes.OP_CHECKLOCKTIMEVERIFY,
      bitcoin.opcodes.OP_DROP,
      refundPubKey,
      bitcoin.opcodes.OP_CHECKSIG,
      bitcoin.opcodes.OP_ENDIF,
    ]);
  }
}

/**
 * Taproot-based escrow (modern Bitcoin)
 */
export class BitcoinTaprootEscrow {
  private network: bitcoin.Network;

  constructor(network: 'mainnet' | 'testnet' = 'mainnet') {
    this.network = network === 'mainnet' ? bitcoin.networks.bitcoin : bitcoin.networks.testnet;
  }

  /**
   * Create Taproot escrow with multiple spend paths
   * - Key path: mutual cooperation (both players agree)
   * - Script path 1: server + player1
   * - Script path 2: server + player2
   */
  createTaprootEscrow(
    player1PubKey: Buffer,
    player2PubKey: Buffer,
    serverPubKey: Buffer
  ): { address: string; internalPubKey: Buffer } {
    // Simplified Taproot escrow creation
    // Production code would use proper Taproot tree construction
    
    const internalPubKey = player1PubKey.subarray(1, 33); // Remove prefix
    
    const payment = bitcoin.payments.p2tr({
      internalPubkey: internalPubKey,
      network: this.network,
    });

    return {
      address: payment.address!,
      internalPubKey,
    };
  }
}

export default BitcoinEscrowMultiSig;
