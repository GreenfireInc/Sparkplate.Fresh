# Polkadot (DOT) DEXs Integration Guide

This directory contains comprehensive integration guides and code examples for the major decentralized exchanges (DEXs) in the Polkadot ecosystem.

## 🌐 Polkadot DEX Ecosystem Overview

The Polkadot ecosystem features a diverse range of DEXs across multiple parachains, each with unique architectures and integration patterns:

### Parachain Distribution
- **Moonbeam**: StellaSwap, Beamswap (EVM-compatible)
- **Astar**: ArthSwap (EVM-compatible)
- **Acala**: Acala Swap (Substrate-based DeFi hub)
- **Karura**: Karura Swap (Substrate-based, Kusama ecosystem)
- **HydraDX**: HydraDX (Native Polkadot DEX)
- **Cross-chain**: Zenlink, Polkaswap (Multi-parachain protocols)

## 📊 Supported DEXs

| DEX | Parachain | Type | API Support | SDK Available |
|-----|-----------|------|-------------|----------------|
| **HydraDX** | HydraDX | Omnipool AMM | ✅ Full | ✅ SDK |
| **StellaSwap** | Moonbeam | AMM DEX | ✅ Full | ✅ SDK |
| **Zenlink** | Multi-chain | Cross-chain Protocol | ⚠️ Limited | ✅ Protocol |
| **Polkaswap** | SORA | Multi-Algorithm | ✅ API | ✅ SDK |
| **Acala Swap** | Acala | DeFi Hub DEX | ✅ Full | ✅ SDK |
| **Karura Swap** | Karura | AMM DEX | ✅ Full | ✅ SDK |
| **ArthSwap** | Astar | AMM DEX | ✅ Full | ✅ SDK |
| **Beamswap** | Moonbeam | AMM DEX | ✅ Full | ✅ SDK |

## 🚀 Quick Start

### Installation

```bash
# For Substrate-based DEXs (HydraDX, Acala, Karura)
npm install @polkadot/api @polkadot/util-crypto

# For EVM-based DEXs (Moonbeam/Astar DEXs)
npm install ethers @stellaswap/swap-sdk

# For GraphQL queries (most DEXs support SubQuery)
npm install graphql-request

# For cross-chain operations
npm install @moonbeam-network/xcm-sdk
```

### Basic Usage Example

```typescript
// Import Polkadot DEXs
import { polkadotDEXs, polkadotDexHelpers } from './DOT.Polkadot';

// Get all EVM-compatible DEXs
const evmDexs = polkadotDexHelpers.getEvmDEXs();
console.log('EVM DEXs:', evmDexs);

// Get DEXs by parachain
const moonbeamDexs = polkadotDexHelpers.getDEXsByParachain('Moonbeam');
console.log('Moonbeam DEXs:', moonbeamDexs);
```

## 🔧 Integration Patterns

### 1. Substrate-based DEXs (HydraDX, Acala, Karura)

```typescript
import { ApiPromise, WsProvider } from '@polkadot/api';
import { hydraDXInfo } from './DOT.Polkadot/hydraDX';

// Connect to parachain
const provider = new WsProvider('wss://rpc.hydradx.cloud');
const api = await ApiPromise.create({ provider });

// Query DEX data
const assetData = await api.query.omnipool.assets(5); // DOT asset
console.log('DOT Pool Data:', assetData.toJSON());
```

### 2. EVM-based DEXs (Moonbeam/Astar)

```typescript
import { ethers } from 'ethers';
import stellaSwap from '@stellaswap/swap-sdk';

// Setup provider
const provider = new ethers.providers.JsonRpcProvider('https://rpc.api.moonbeam.network');

// Get price quote
const quote = await stellaSwap.getQuote(
  '0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080', // xcDOT
  '0x931715FEE2d06333043d11F658C8CE934aC61D0c', // USDC
  '1000000000000000000', // 1 DOT
  null, // account
  0.5 // slippage
);

console.log('Expected output:', quote.result.amountOut);
```

### 3. Cross-chain DEXs (Zenlink, Polkaswap)

```typescript
// Zenlink cross-chain aggregation
import { ApiPromise, WsProvider } from '@polkadot/api';

const parachains = ['wss://rpc.hydradx.cloud', 'wss://acala-rpc-0.aca-api.network'];

for (const wsUrl of parachains) {
  const api = await ApiPromise.create({ provider: new WsProvider(wsUrl) });
  // Query Zenlink liquidity across parachains
  const liquidity = await api.query.zenlinkProtocol.totalLiquidity();
  console.log(`Liquidity on parachain:`, liquidity.toString());
}
```

## 📈 Price Data Sources

### SubQuery Integration (Most DEXs)

```typescript
import { request, gql } from 'graphql-request';

const query = gql`
  query GetHydraDXData {
    pools(where: { assetId_eq: "5" }) {
      price
      volume24h
      liquidity
    }
  }
`;

const data = await request('https://api.subquery.network/sq/galacticcouncil/hydration', query);
console.log('DOT Price Data:', data);
```

### Direct API Integration

```typescript
// Example: StellaSwap direct API
const response = await fetch('https://api.stellaswap.com/v1/price/DOT/USDC');
const priceData = await response.json();
console.log('DOT/USDC Price:', priceData.price);
```

## 🌉 Cross-chain Features

### XCM (Cross-Consensus Messaging)

Polkadot's XCM enables seamless asset transfers between parachains:

```typescript
import { ApiPromise, WsProvider } from '@polkadot/api';

const polkadotApi = await ApiPromise.create({
  provider: new WsProvider('wss://rpc.polkadot.io')
});

// Transfer DOT from Polkadot to Moonbeam
const xcmTx = polkadotApi.tx.xcmPallet.limitedReserveTransferAssets(
  // Destination: Moonbeam
  { V3: { parents: 1, interior: { X1: { Parachain: 2004 } } } },
  // Beneficiary
  { V3: { parents: 0, interior: { X1: { AccountId32: { id: recipientAddress } } } } },
  // Assets: 1 DOT
  { V3: [{ id: { Concrete: { parents: 0, interior: { Here: null } } }, fun: { Fungible: 1000000000000 } }] },
  // Fee asset item
  0,
  // Weight limit
  { Unlimited: null }
);

await xcmTx.signAndSend(senderAddress);
```

### Liquid Staking Tokens

```typescript
// Acala LDOT minting
const acalaApi = await ApiPromise.create({
  provider: new WsProvider('wss://acala-rpc-0.aca-api.network')
});

const mintTx = acalaApi.tx.homa.mint(1000000000000); // 1 DOT worth
await mintTx.signAndSend(account);
```

## 🏛️ DeFi Ecosystem Features

### Stablecoins
- **AUSD**: Acala stablecoin (over-collateralized)
- **KUSD**: Karura stablecoin (over-collateralized)

### Liquid Staking
- **LDOT**: Liquid DOT on Acala
- **LKSM**: Liquid KSM on Karura

### Lending & Borrowing
- **Acala**: Integrated lending protocols
- **Karura**: Cross-chain lending

## 🔍 Monitoring & Analytics

### TVL and Volume Tracking

```typescript
// Using DeFiLlama API for ecosystem-wide metrics
const response = await fetch('https://api.llama.fi/protocol/hydradx');
const hydraDXData = await response.json();
console.log('HydraDX TVL:', hydraDXData.tvl);
```

### DEX-Specific Analytics

```typescript
// SubQuery for historical data
const historicalQuery = gql`
  query GetHistoricalData($timestamp: DateTime!) {
    pools(where: { timestamp_gte: $timestamp }) {
      timestamp
      volumeUSD
      liquidityUSD
    }
  }
`;
```

## 🛠️ Development Tools

### Local Development
```bash
# Clone parachain nodes for testing
git clone https://github.com/paritytech/cumulus.git
cd cumulus
cargo build --release --features=moonbeam-native
```

### Testing
```bash
# Test EVM contracts on Moonbeam
npx hardhat test --network moonbeam

# Test Substrate pallets
cargo test --package pallet-dex
```

## 📚 Resources

### Documentation Links
- [Polkadot Wiki - DEXs](https://wiki.polkadot.network/docs/learn-dex)
- [Moonbeam Docs](https://docs.moonbeam.network/)
- [Astar Docs](https://docs.astar.network/)
- [Acala Docs](https://docs.acala.network/)

### Community & Support
- **Polkadot Forum**: https://forum.polkadot.network/
- **Discord Channels**: Individual DEX Discords
- **GitHub Issues**: Report bugs and request features

## ⚠️ Important Notes

1. **Network Considerations**: Different parachains may have different finality times and fees
2. **XCM Limitations**: Cross-chain transfers have execution time and fees
3. **Liquidity**: DEX liquidity varies significantly between parachains
4. **API Stability**: Some DEX APIs may be in development/beta
5. **Regulatory**: Always check local regulations for DeFi activities

## 🤝 Contributing

When adding new Polkadot DEXs:

1. Follow the existing file structure
2. Include comprehensive integration examples
3. Add proper TypeScript types
4. Update this README
5. Test integration examples

---

*Built with ❤️ for the Polkadot ecosystem*
