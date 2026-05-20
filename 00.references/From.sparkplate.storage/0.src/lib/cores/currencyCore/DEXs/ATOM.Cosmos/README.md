# ATOM.Cosmos DEXs Directory

This directory contains comprehensive information about decentralized exchanges (DEXs) in the Cosmos ecosystem, organized by specific chains and protocols.

## 📁 Structure

```
ATOM.Cosmos/
├── osmosis.ts          # Leading Cosmos DEX with AMM
├── astroport.ts        # Multi-chain AMM protocol
├── crescent.ts         # Hybrid orderbook-AMM DEX
├── kujira.ts           # DeFi platform with FIN, BOW, ORCA
├── shadeProtocol.ts    # Privacy-focused DEX on Secret
├── umee.ts             # Cross-chain DeFi hub
├── gravityDEX.ts       # Native Cosmos Hub DEX
├── index.ts            # Exports and metadata
└── README.md           # This file
```

## 🔍 Supported DEXs (7 entries)

### 1. **Osmosis** - Leading Cosmos DEX
- **Type:** AMM DEX
- **Chain:** Osmosis (osmosis-1)
- **Description:** Largest DEX in Cosmos with IBC cross-chain swaps
- **SDK:** OsmoJS, @cosmjs/stargate, @osmosis-labs/* packages
- **Features:** AMM, concentrated liquidity, superfluid staking
- **Indexing:** SubQuery, The Graph support

### 2. **Astroport** - Multi-Chain AMM
- **Type:** Multi-Chain AMM
- **Chains:** Neutron, Terra, Injective
- **Description:** Advanced AMM protocol with multiple pool types
- **SDK:** @cosmjs/cosmwasm-stargate
- **Features:** XYK pools, stable swap, passive concentrated liquidity

### 3. **Crescent** - Hybrid DEX
- **Type:** Hybrid Orderbook-AMM
- **Chain:** Crescent Network (crescent-1)
- **Description:** Combines orderbook and AMM functionality
- **SDK:** @cosmjs/stargate, crescentjs
- **Features:** Limit orders, ranged pools, lending/borrowing

### 4. **Kujira** - DeFi Platform
- **Type:** Comprehensive DeFi Platform
- **Chain:** Kujira (kaiyo-1)
- **Description:** DeFi suite with FIN (orderbook), BOW (AMM), ORCA (liquidations)
- **SDK:** kujira.js (official)
- **Features:** Orderbook, AMM, liquidations, lending, margin trading

### 5. **Shade Protocol** - Privacy DEX
- **Type:** Private DeFi
- **Chain:** Secret Network (secret-4)
- **Description:** Privacy-preserving DeFi with ShadeSwap DEX
- **SDK:** secretjs
- **Features:** Private transactions, encrypted contracts, stablecoin (SILK)

### 6. **Umee** - Cross-Chain Hub
- **Type:** Cross-Chain DEX
- **Chain:** Umee (umee-1)
- **Description:** Cross-chain DeFi hub with lending markets
- **SDK:** @cosmjs/stargate, umee-js
- **Features:** Cross-chain lending, meTokens, leveraged yield

### 7. **Gravity DEX** - Cosmos Hub DEX
- **Type:** Native DEX
- **Chain:** Cosmos Hub (cosmoshub-4)
- **Description:** Native DEX on Cosmos Hub with Gravity Bridge
- **SDK:** @cosmjs/stargate, @gravity-bridge/client
- **Features:** Native liquidity module, Ethereum bridge

## 🚀 Usage

### Import Specific DEX

```typescript
import { osmosisDEX } from '@/components/currencyCore/DEXs/ATOM.Cosmos/osmosis';

console.log(osmosisDEX.name); // "Osmosis"
console.log(osmosisDEX.api.endpoints.lcd); // "https://lcd.osmosis.zone"
```

### Import All Cosmos DEXs

```typescript
import { cosmosDEXs } from '@/components/currencyCore/DEXs/ATOM.Cosmos';

// Lazy load specific DEX
const osmosisModule = await cosmosDEXs.osmosis();
```

### Query by Type

```typescript
import { cosmosDexMetadata } from '@/components/currencyCore/DEXs/ATOM.Cosmos';

// Get all AMM DEXs
const ammDexs = cosmosDexMetadata.byType.amm;
// ['osmosis', 'astroport', 'crescent', 'gravityDEX']

// Get DEXs with official TypeScript SDKs
const tsSDKs = cosmosDexMetadata.withSDK.typescript;
// ['osmosis', 'kujira', 'shadeProtocol']

// Get DEXs with lending features
const lendingDexs = cosmosDexMetadata.byFeature.lending;
// ['kujira', 'umee', 'crescent']
```

## 📊 Integration Guide

### Common Pattern: Using CosmJS

Most Cosmos DEXs can be queried using `@cosmjs/stargate`:

```typescript
import { StargateClient } from "@cosmjs/stargate";

// Connect to chain
const rpcEndpoint = "https://rpc.osmosis.zone";
const client = await StargateClient.connect(rpcEndpoint);

// Query via LCD REST endpoints
const lcdEndpoint = "https://lcd.osmosis.zone";
const response = await fetch(`${lcdEndpoint}/osmosis/gamm/v1beta1/pools/1`);
const poolData = await response.json();
```

### Pricing Data Approaches

1. **Direct Pool Queries** - Query pool reserves via LCD/RPC
2. **REST APIs** - Use chain-specific REST endpoints
3. **GraphQL/SubQuery** - Use indexed data for historical queries
4. **Official SDKs** - Use chain-specific TypeScript libraries

### Public RPC/LCD Providers

- **Polkachu:** `https://{chain}-rpc.polkachu.com`
- **All That Node:** Various Cosmos chains
- **Chain-specific:** Each DEX has its own public endpoints

## 🔧 Key TypeScript Packages

### Core Cosmos
```bash
npm install @cosmjs/stargate @cosmjs/encoding @cosmjs/proto-signing
npm install @cosmjs/tendermint-rpc
```

### CosmWasm Contracts
```bash
npm install @cosmjs/cosmwasm-stargate
```

### Chain-Specific
```bash
npm install osmojs @osmosis-labs/math @osmosis-labs/pools  # Osmosis
npm install kujira.js                                        # Kujira
npm install secretjs                                         # Secret Network
```

### GraphQL Indexing
```bash
npm install graphql-request graphql  # For SubQuery/The Graph
```

## 📡 Subgraph / Indexing

### SubQuery (Recommended for Cosmos)
- **Osmosis SubQuery Starter:** https://docs.osmosis.zone/overview/integrate/external_projects/subquery
- **SubQuery Cosmos Quickstart:** https://subquery.network/doc/indexer/quickstart/quickstart_chains/cosmos-osmosis.html

### The Graph
- **Cosmos Support:** https://docs.thegraph.academy/official-docs/supported-networks/building-subgraphs-on-cosmos
- **Supported Networks:** Cosmos Hub (cosmoshub-4), Osmosis (osmosis-1)

## 🌐 Network Information

| DEX | Chain ID | RPC Endpoint | LCD Endpoint |
|-----|----------|-------------|--------------|
| Osmosis | osmosis-1 | https://rpc.osmosis.zone | https://lcd.osmosis.zone |
| Astroport (Neutron) | neutron-1 | https://rpc.neutron.org | https://rpc.neutron.org |
| Crescent | crescent-1 | https://mainnet.crescent.network:26657 | https://mainnet.crescent.network:1317 |
| Kujira | kaiyo-1 | https://rpc.kaiyo.kujira.setten.io | https://lcd.kaiyo.kujira.setten.io |
| Shade (Secret) | secret-4 | https://rpc.secret.express | https://lcd.secret.express |
| Umee | umee-1 | https://umee-rpc.polkachu.com | https://umee-api.polkachu.com |
| Gravity DEX | cosmoshub-4 | https://rpc.cosmos.network | https://lcd.cosmos.network |

## ✨ Unique Features by DEX

- **Osmosis:** Superfluid staking, concentrated liquidity, largest liquidity
- **Astroport:** Multi-chain deployment, passive CL
- **Crescent:** Hybrid orderbook + AMM, ranged pools
- **Kujira:** Complete DeFi suite (FIN, BOW, ORCA, GHOST)
- **Shade Protocol:** Privacy via Secret Network TEE
- **Umee:** Cross-chain lending, meTokens
- **Gravity DEX:** Native Cosmos Hub integration, Ethereum bridge

## 📝 Data Schema

Each DEX file exports an object with this structure:

```typescript
{
  name: string;
  blockchain: string;
  type: string;
  description: string;
  urls: { main, app, docs, ... };
  api: { endpoints, documentation, requiresApiKey, ... };
  sdk: { typescript: { packages, documentation } };
  integration: { exampleUsage: string };
  socialMedia: { twitter, discord, telegram, ... };
  network: { mainnet, testnet? };
  features: { swaps, lending, orderbook, ... };
  notes: string[];
}
```

## 🛠️ Best Practices

1. **Use Official SDKs** when available (Osmosis, Kujira, Shade)
2. **Fallback to CosmJS** for chains without dedicated SDKs
3. **Query via LCD** for simple REST queries (pool data, prices)
4. **Use SubQuery/Graph** for historical or aggregated data
5. **Test on Testnets** before mainnet integration
6. **Handle IBC Denoms** properly (long hash identifiers)
7. **Account for Decimals** (usually 6 for Cosmos tokens)

## 🔗 Related Resources

### Cosmos Development
- **Cosmos SDK Docs:** https://docs.cosmos.network/
- **CosmJS Tutorials:** https://tutorials.cosmos.network/tutorials/7-cosmjs/
- **IBC Protocol:** https://ibcprotocol.org/

### Block Explorers
- **Mintscan:** https://www.mintscan.io/ (Most Cosmos chains)
- **ATOMScan:** https://atomscan.com/
- **Ping.pub:** https://ping.pub/

### Node Providers
- **Polkachu:** Multiple Cosmos chains
- **All That Node:** https://allthatnode.gitbook.io/
- **Chain Registry:** https://github.com/cosmos/chain-registry

## ⚠️ Important Notes

- **IBC Tokens:** Cross-chain tokens use long IBC denom hashes
- **Privacy Limits:** Shade Protocol queries may require viewing keys
- **Rate Limits:** Public endpoints may have rate limits
- **Chain-Specific:** Each chain may have unique modules/features
- **CosmWasm:** Many Cosmos DEXs use CosmWasm smart contracts

---

**Last Updated:** October 14, 2025  
**Maintained By:** Currency Core Team  
**Total DEXs:** 7

