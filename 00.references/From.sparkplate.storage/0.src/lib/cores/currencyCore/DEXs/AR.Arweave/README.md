# Arweave (AR) Decentralized Exchanges (DEXs)

This directory contains DEX implementations and swap protocols for the Arweave blockchain ecosystem. Due to Arweave's unique architecture (storage-focused), DEXs often utilize off-chain computation models like the Storage-based Consensus Paradigm (SCP) or SmartWeave contracts.

## 🔄 Available DEXs

### 1. **Permaswap** - First Cross-Chain DEX
- **File**: `permaswap.AR.ts`
- **Type**: AMM DEX (SCP based)
- **Key Features**:
  - 0 Gas Fees
  - Instant Settlement
  - Cross-Chain Support
  - 100% Permanent Storage
- **Status**: Live & Recommended

### 2. **EverPay** - Real-time Financial Protocol
- **File**: `everpay.AR.ts`
- **Type**: Infrastructure / Settlement Layer
- **Key Features**:
  - Instant Finality
  - Zero Fees
  - Cross-Chain Bridging
- **Status**: Live (Infrastructure for Permaswap)

### 3. **Verto** - Legacy Trading Protocol
- **File**: `verto.AR.ts`
- **Type**: SmartWeave AMM
- **Key Features**:
  - Profit Sharing Token (PST) Support
  - "Trading Post" Architecture
- **Status**: Legacy / Inactive

### 4. **ArSwap** - Swap Protocol
- **File**: `arswap.AR.ts`
- **Type**: Swap Protocol
- **Status**: Alpha / Early Stage

## 🛠 Integration Patterns

### Pricing Data (Permaswap)
The recommended way to get AR price data on-chain is via Permaswap using the everPay GraphQL API.

```typescript
import axios from 'axios';
import { GraphQLClient, gql } from 'graphql-request';

// Example: Get AR/USDC Price
// See permaswap.AR.ts for full implementation details
```

### Settlement (EverPay)
For moving assets or settling trades:

```typescript
import Everpay from 'everpay';
const everpay = new Everpay();
// Use everpay SDK for transfers and info
```

## 🏗 Architecture Note

Arweave DEXs differ from Ethereum/Solana DEXs:
- **No On-Chain EVM**: Logic often runs off-chain (SCP) or via SmartWeave lazy-evaluation.
- **Permanent History**: All transaction data is stored permanently on Arweave.
- **Zero Gas**: Protocols like Permaswap/EverPay enable zero-gas trading by bundling transactions.

## 🔗 External Resources

- **Permaswap**: https://permaswap.network/
- **EverPay**: https://everpay.io/
- **Verto**: https://verto.exchange/
- **ArSwap**: https://arswap.org/

