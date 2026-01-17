# Bitcoin (BTC) Distribution Engines

This directory contains distribution engine implementations for Bitcoin blockchain, providing both reward distribution and escrow functionality for gaming applications.

## Contents

### Reward Systems
- **BTC.Bitcoin.rewards.manual.ts**: Server-side manual reward distribution with UTXO management
- **BTC.Bitcoin.rewards.smartContract.ts**: Bitcoin Script and Taproot-based smart contract rewards

### Escrow Systems
- **BTC.Bitcoin.escrow.manual.ts**: Server-managed escrow for peer-to-peer gaming
- **BTC.Bitcoin.escrow.smartContract.ts**: Multi-signature and script-based escrow contracts

## Features

### Manual Rewards
- Direct wallet-to-wallet BTC transfers
- UTXO-based transaction building
- Multiple address format support (P2PKH, P2SH, P2WPKH, Bech32)
- SegWit support for lower fees
- Secure private key management (server-side only)

### Smart Contract Rewards
- Taproot script-based rewards
- Bitcoin Script time-locks and conditions
- Server-signed attestations for validation
- RSK/Rootstock sidechain support (EVM-compatible)
- Limited but secure on-chain logic

### Manual Escrow
- AES-256-GCM encrypted private key storage
- Server-controlled pot distribution
- UTXO management and consolidation
- Two-player game support
- Automatic deposit verification

### Smart Contract Escrow
- 2-of-3 multi-signature escrow (players + server arbiter)
- Hash Time-Locked Contracts (HTLC)
- Taproot with multiple spend paths
- SegWit (P2WSH) for lower fees
- Refund mechanisms

## Usage

```typescript
import { 
  BitcoinRewarder, 
  BitcoinGameRewardManager,
  BitcoinGameEscrow,
  BitcoinSmartContractRewarder,
  BitcoinEscrowMultiSig
} from './BTC.Bitcoin';

// Manual rewards (requires UTXO and broadcast providers)
const rewarder = new BitcoinRewarder('mainnet');

const utxoProvider = async (address: string) => {
  // Fetch UTXOs from blockchain API (e.g., BlockCypher, Blockchain.info)
  return [];
};

const broadcastProvider = async (rawTx: string) => {
  // Broadcast transaction via blockchain API
  return 'txid';
};

const gameManager = new BitcoinGameRewardManager(
  {
    rewardThreshold: 100,
    rewardAmountBTC: 0.001,
    network: 'mainnet'
  },
  {
    privateKeyWIF: process.env.BTC_WIF!,
    network: 'mainnet'
  },
  utxoProvider,
  broadcastProvider
);

await gameManager.initialize();
await gameManager.startGame('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh');

// Manual escrow
const escrow = new BitcoinGameEscrow(
  {
    betAmountBTC: 0.001,
    player1Address: 'bc1q...',
    player2Address: 'bc1q...',
    hostEncryptionKey: BitcoinGameEscrow.generateHostEncryptionKey(),
    network: 'mainnet'
  },
  utxoProvider,
  broadcastProvider
);

const escrowAddress = await escrow.createEscrowWallet();
await escrow.canStartGame();
await escrow.distributePot('bc1q...');

// Smart contract escrow (2-of-3 multisig)
const multiSigEscrow = new BitcoinEscrowMultiSig('mainnet');

const escrowData = multiSigEscrow.createSegWitMultiSigEscrow({
  player1PubKey: Buffer.from('...', 'hex'),
  player2PubKey: Buffer.from('...', 'hex'),
  serverPubKey: Buffer.from('...', 'hex'),
  betAmountSats: 100000
});

console.log('Escrow address:', escrowData.address);
```

## Bitcoin Script Capabilities

Bitcoin's scripting language is intentionally limited for security:

### Supported Operations
- Signature verification (`OP_CHECKSIG`, `OP_CHECKMULTISIG`)
- Time locks (`OP_CHECKLOCKTIMEVERIFY`, `OP_CHECKSEQUENCEVERIFY`)
- Hash verification (`OP_SHA256`, `OP_HASH160`)
- Multi-signature (2-of-3, 3-of-5, etc.)

### Advanced Features
- **Taproot**: More efficient and private scripts (BIP 340, 341, 342)
- **HTLC**: Hash Time-Locked Contracts (Lightning Network)
- **Multi-sig**: Trustless escrow with arbitration

### Limitations
- No loops or complex logic
- No floating point arithmetic
- Limited stack operations
- For advanced smart contracts, consider:
  - **RSK (Rootstock)**: EVM-compatible Bitcoin sidechain
  - **Liquid Network**: Confidential assets sidechain
  - **Lightning Network**: Layer 2 payment channels

## Address Formats

Bitcoin supports multiple address formats:

### Legacy (P2PKH)
- Format: `1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa`
- Higher fees, older format

### Script Hash (P2SH)
- Format: `3J98t1WpEZ73CNmYviecrnyiWrnqRhWNLy`
- For multisig and custom scripts

### SegWit (P2WPKH)
- Format: `bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4`
- Lower fees, modern format (Bech32)

### Taproot (P2TR)
- Format: `bc1p5d7rjq7g6rdk2yhzks9smlaqtedr4dekq08ge8ztwac72sfr9rusxg3297`
- Most efficient and private (Bech32m)

## UTXO Model

Bitcoin uses Unspent Transaction Outputs (UTXOs):

```typescript
// Example UTXO
const utxo = {
  txid: '1a2b3c...',
  vout: 0,
  value: 100000, // satoshis
  scriptPubKey: '0014...' // hex
};

// Transactions consume UTXOs as inputs
// and create new UTXOs as outputs
```

## Network Configuration

### Mainnet
- Network: `bitcoin.networks.bitcoin`
- Address prefix: `1`, `3`, or `bc1`

### Testnet
- Network: `bitcoin.networks.testnet`
- Address prefix: `m`, `n`, `2`, or `tb1`
- Faucet: https://testnet-faucet.mempool.co/

## Fee Estimation

Bitcoin fees are calculated per byte (or vByte for SegWit):

```typescript
// Simple fee calculation
const inputSize = 148; // bytes per input (P2WPKH)
const outputSize = 34; // bytes per output
const overhead = 10; // transaction overhead

const txSize = inputs.length * inputSize + outputs.length * outputSize + overhead;
const feeRate = 10; // sat/vB (check mempool for current rates)
const totalFee = txSize * feeRate;
```

Check current fee rates: https://mempool.space/

## Security

- **Private Keys**: Always keep WIF keys server-side
- **UTXO Management**: Consolidate UTXOs to reduce fees
- **Multi-sig**: Use 2-of-3 for trustless escrow
- **Time Locks**: Use CLTV for refund mechanisms
- **Validation**: Always verify addresses before sending

## Dependencies

```json
{
  "bitcoinjs-lib": "^6.x",
  "ecpair": "^2.x",
  "tiny-secp256k1": "^2.x",
  "crypto": "node built-in"
}
```

## Blockchain APIs

For UTXO fetching and broadcasting:

- **BlockCypher**: https://www.blockcypher.com/dev/bitcoin/
- **Blockchain.info**: https://www.blockchain.com/api
- **Blockstream**: https://blockstream.info/api/
- **Mempool.space**: https://mempool.space/api/

## Resources

- [Bitcoin Developer Documentation](https://developer.bitcoin.org/)
- [Bitcoin Script Reference](https://en.bitcoin.it/wiki/Script)
- [BIP 340, 341, 342 (Taproot)](https://github.com/bitcoin/bips)
- [Lightning Network](https://lightning.network/)
- [RSK (Rootstock)](https://www.rsk.co/)
- [bitcoinjs-lib Documentation](https://github.com/bitcoinjs/bitcoinjs-lib)
