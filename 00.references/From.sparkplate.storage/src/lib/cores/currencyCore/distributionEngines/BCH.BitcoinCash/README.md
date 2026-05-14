# Bitcoin Cash (BCH) Distribution Engines

This directory contains distribution engine implementations for Bitcoin Cash (BCH) blockchain, providing both reward distribution and escrow functionality for gaming applications.

## Contents

### Reward Systems
- **BCH.BitcoinCash.rewards.manual.ts**: Server-side manual reward distribution
- **BCH.BitcoinCash.rewards.smartContract.ts**: CashScript smart contract-based rewards

### Escrow Systems
- **BCH.BitcoinCash.escrow.manual.ts**: Server-managed escrow for peer-to-peer gaming
- **BCH.BitcoinCash.escrow.smartContract.ts**: CashScript smart contract-based escrow

## Features

### Manual Rewards
- Direct wallet-to-wallet BCH transfers
- CashAddress and legacy address support
- Score-based automatic reward distribution
- Secure private key management (server-side only)

### Smart Contract Rewards
- CashScript-based on-chain contracts
- Server-signed attestations for validation
- Trustless reward distribution
- Automatic payout execution via contract functions

### Manual Escrow
- AES-256-GCM encrypted private key storage
- Server-controlled pot distribution
- Two-player game support
- UTXO-based transaction building
- WebRTC/Colyseus integration ready

### Smart Contract Escrow
- CashScript-based escrow contract
- On-chain pot management
- Automatic winner distribution
- Two-signature refund mechanism
- Immutable game rules

## Usage

```typescript
import { 
  BitcoinCashRewarder, 
  BitcoinCashGameRewardManager,
  BitcoinCashGameEscrow 
} from './BCH.BitcoinCash';

// Manual rewards
const rewarder = new BitcoinCashRewarder('mainnet');
const gameManager = new BitcoinCashGameRewardManager(
  {
    rewardThreshold: 100,
    rewardAmount: 0.01,
    network: 'mainnet'
  },
  {
    privateKeyWIF: process.env.BCH_WIF!,
    network: 'mainnet'
  }
);

await gameManager.initialize();
await gameManager.startGame('bitcoincash:qp...');

// Manual escrow
const escrow = new BitcoinCashGameEscrow({
  betAmount: 0.01,
  player1Address: 'bitcoincash:qp...',
  player2Address: 'bitcoincash:qq...',
  hostEncryptionKey: BitcoinCashGameEscrow.generateHostEncryptionKey(),
  network: 'mainnet'
});

const escrowAddress = await escrow.createEscrowWallet();
await escrow.canStartGame();
await escrow.distributePot('bitcoincash:qp...');
```

## Address Formats

Bitcoin Cash supports two address formats:
- **CashAddress** (preferred): `bitcoincash:qp...`
- **Legacy**: `1ABC...`

The library automatically converts between formats.

## CashScript Smart Contracts

Smart contract implementations use CashScript, Bitcoin Cash's smart contract language:

```cash
pragma cashscript ^0.8.0;

contract GameReward(pubkey serverPubKey, int rewardAmount) {
    function claimReward(sig serverSig, pubkey userPubKey) {
        require(checkSig(serverSig, serverPubKey));
        // ... payout logic
    }
}
```

Compile CashScript with: `cashc contract.cash -o artifact.json`

## Security

- **Private Keys**: Always keep WIF private keys server-side
- **Encryption**: Use strong encryption keys for stored data
- **Validation**: Verify all transactions on-chain
- **Anti-cheat**: Implement proper game validation before rewards
- **UTXO Management**: Handle UTXOs carefully to avoid dust

## Dependencies

```json
{
  "@psf/bch-js": "^6.x",
  "bitbox-sdk": "^8.x",
  "cashscript": "^0.8.x"
}
```

## Network Configuration

- **Mainnet**: `https://bchn.fullstack.cash/v5/`
- **Testnet**: `https://testnet3.fullstack.cash/v5/`

## Transaction Fees

- Typical fee: ~250 satoshis
- Dust limit: 546 satoshis
- Always calculate change to avoid dust outputs

## Resources

- [Bitcoin Cash Documentation](https://documentation.cash/)
- [CashScript Documentation](https://cashscript.org/)
- [BCH-JS SDK](https://fullstack.cash/)
