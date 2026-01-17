# Litecoin (LTC) Distribution Engines

**The Silver to Bitcoin's Gold** - Fast, low-cost cryptocurrency

This directory contains distribution engine implementations for Litecoin, providing both reward distribution and escrow functionality for gaming applications.

## Features

### Manual Rewards
- Direct wallet-to-wallet LTC transfers
- UTXO-based transaction management
- Blockchair API integration
- Score-based automatic reward distribution

### Smart Contract Rewards (P2SH)
- Multi-signature Pay-to-Script-Hash contracts
- Server-signed attestations
- Two-of-two signature requirement
- Trustless reward distribution

### Manual Escrow
- AES-256-GCM encrypted key storage
- Server-controlled pot distribution
- UTXO management
- Two-player game support

### Smart Contract Escrow (P2SH)
- 2-of-3 multi-signature escrow
- On-chain pot management
- Server arbitration capability
- Refund mechanism for both players

## Network Configuration

### Mainnet
- **RPC**: `https://litecoin.nownodes.io`
- **Block Time**: ~2.5 minutes
- **Symbol**: LTC
- **Address Prefix**: L, M, or 3

### Testnet
- **RPC**: `https://testnet.litecore.io`
- **Block Time**: ~2.5 minutes
- **Address Prefix**: m, n, or 2

## Usage

\`\`\`typescript
import { 
  GameRewardManager,
  GameConfig,
  WalletConfig 
} from './LTC.Litecoin';

const gameConfig: GameConfig = {
  rewardThreshold: 100,
  rewardAmount: 0.1,
  tickerSymbol: 'LTC',
  network: 'mainnet'
};

const walletConfig: WalletConfig = {
  privateKey: process.env.LTC_PRIVATE_KEY!,
  network: 'mainnet'
};

const gameManager = new GameRewardManager(gameConfig, walletConfig);

await gameManager.startGame('LTC1234...');
await gameManager.updateScore('LTC1234...', 10000);
\`\`\`

## Transaction Structure

Litecoin uses UTXO (Unspent Transaction Output) model:
- **Inputs**: Previous transaction outputs being spent
- **Outputs**: New outputs being created
- **Fees**: Difference between input and output totals

## Key Advantages

- **Faster Confirmations**: 2.5 minute block time vs Bitcoin's 10 minutes
- **Lower Fees**: Significantly cheaper than Bitcoin transactions
- **Scrypt Algorithm**: Different mining algorithm from Bitcoin
- **MimbleWimble**: Optional privacy feature via extension blocks
- **Wide Support**: Accepted by many merchants and exchanges

## Multi-Signature P2SH

Litecoin supports Pay-to-Script-Hash (P2SH) for smart contract-like functionality:
- **2-of-2**: Player + Server for rewards
- **2-of-3**: Player1 + Player2 + Server for escrow
- **Script Hash**: M-prefix addresses (mainnet)

## Dependencies

\`\`\`json
{
  "bitcoinjs-lib": "^6.x",
  "axios": "^1.x",
  "crypto": "node built-in"
}
\`\`\`

## Resources

- [Litecoin.org](https://litecoin.org/)
- [Litecoin Explorer](https://live.blockcypher.com/ltc/)
- [Blockchair API](https://blockchair.com/api)

---

**The Silver to Bitcoin's Gold** - Build fast, low-cost gaming experiences on Litecoin.
