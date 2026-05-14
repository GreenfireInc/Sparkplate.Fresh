# Cosmos (ATOM) Distribution Engines

This directory contains distribution engine implementations for Cosmos (ATOM) blockchain, providing both reward distribution and escrow functionality for gaming applications.

## Contents

### Reward Systems
- **ATOM.Cosmos.rewards.manual.ts**: Server-side manual reward distribution
- **ATOM.Cosmos.rewards.smartContract.ts**: CosmWasm smart contract-based rewards

### Escrow Systems
- **ATOM.Cosmos.escrow.manual.ts**: Server-managed escrow for peer-to-peer gaming
- **ATOM.Cosmos.escrow.smartContract.ts**: CosmWasm smart contract-based escrow

## Features

### Manual Rewards
- Direct wallet-to-wallet transfers
- Human-readable address resolution (ICNS, Stargaze names)
- Native token (ATOM) and CW20 token support
- Callback system for game events

### Smart Contract Rewards
- On-chain verification and distribution
- Server-signed attestations
- Trustless reward distribution
- Automatic payout execution

### Manual Escrow
- Encrypted private key storage
- Server-controlled pot distribution
- Multi-player support
- WebRTC/Colyseus integration

### Smart Contract Escrow
- On-chain pot management
- Automatic winner distribution
- Player deposit verification
- Immutable game rules

## Usage

```typescript
import { CosmosRewarder, CosmosGameEscrow } from './ATOM.Cosmos';

// Manual rewards
const rewarder = new CosmosRewarder({
  rpcEndpoint: 'https://rpc.cosmos.network',
  senderMnemonic: process.env.COSMOS_MNEMONIC,
  prefix: 'cosmos'
});

// Manual escrow
const escrow = new CosmosGameEscrow({
  betAmount: '1000000',
  denom: 'uatom',
  player1Address: 'cosmos1...',
  player2Address: 'cosmos1...',
  hostEncryptionKey: CosmosGameEscrow.generateHostEncryptionKey(),
  rpcEndpoint: 'https://rpc.cosmos.network'
});
```

## Security

- Private keys and mnemonics must be kept server-side
- Use environment variables for sensitive data
- Implement proper anti-cheat mechanisms
- Verify all transactions on-chain

## Dependencies

- @cosmjs/stargate
- @cosmjs/proto-signing
- @cosmjs/cosmwasm-stargate
- @cosmjs/crypto
- @cosmjs/encoding
