# Polkadot (DOT) Oracles

Comprehensive oracle infrastructure for Polkadot price feeds, blockchain data, off-chain computation, and DEX analytics.

## Overview

Polkadot is a multi-chain network (Layer 0) with a unique architecture. Oracles on Polkadot typically integrate via **runtime pallets** (not smart contracts) or operate on EVM-compatible parachains like Moonbeam. This directory contains integrations for all major Polkadot data providers.

## Available Oracles

### 1. **Acurast** (`acurast.ts`)
- **Type**: Decentralized Off-Chain Compute Platform
- **Best For**: Custom data jobs, off-chain computation, flexible oracle needs
- **Features**: TEE-secured execution, arbitrary job definitions, proof verification
- **Integration**: Runtime pallet on Substrate chains
- **Website**: https://acurast.com

### 2. **Chainlink** (`chainlink.ts`)
- **Type**: Decentralized Oracle Network
- **Best For**: High-security DeFi applications, proven reliability
- **Features**: Substrate pallet + Moonbeam EVM integration, decentralized feeds
- **Note**: Substrate pallet repo is archived; Moonbeam integration more active
- **Website**: https://chain.link

### 3. **DIA** (`dia.ts`)
- **Type**: Multi-Source Decentralized Oracle
- **Best For**: Transparent price feeds, customizable oracles
- **Features**: 85+ exchange aggregation, Polkadot Medianizer algorithm, institutional-grade
- **API**: `https://api.diadata.org/v1/priceFeed/DOT`
- **Website**: https://www.diadata.org

### 4. **Kylin Network** (`kylin.ts`)
- **Type**: Cross-Chain Oracle Platform
- **Best For**: Cross-chain data, analytics, custom queries
- **Features**: Real-time feeds, analytics engine, RESTful API
- **Integration**: Substrate pallet, REST API
- **Website**: https://kylin.network

### 5. **Subscan** (`subscan.ts`)
- **Type**: Blockchain Explorer API
- **Best For**: Account tracking, transaction history, network statistics
- **Features**: Supports 100+ Substrate networks, comprehensive blockchain data
- **API**: `https://polkadot.api.subscan.io/api`
- **Requires**: API key
- **Website**: https://polkadot.subscan.io

### 6. **SubQuery** (`subquery.ts`)
- **Type**: Blockchain Indexer / GraphQL API
- **Best For**: DEX data, historical analytics, custom indexing
- **Features**: GraphQL queries, DEX trades/swaps, liquidity tracking
- **Description**: Polkadot's equivalent to The Graph
- **Website**: https://subquery.network

### 7. **Polkadot.js API** (`polkadotjs.ts`)
- **Type**: Direct RPC Access / SDK
- **Best For**: Direct blockchain access, real-time data, no intermediaries
- **Features**: Complete blockchain access, event subscriptions, state queries
- **RPC**: `wss://rpc.polkadot.io`
- **Free**: Completely free, no API keys required
- **Website**: https://polkadot.js.org

## Quick Start

```typescript
import { polkadotDiaOracle } from './oracles/DOT.Polkadot';

// Example: Get DOT price from DIA
const oracle = polkadotDiaOracle;
// Use oracle.api.priceEndpoint to fetch data
```

## Recommendations by Use Case

### For Wallets
- **Primary**: Polkadot.js API
- **Secondary**: Subscan

### For DeFi Applications
- **Primary**: DIA, Chainlink
- **Secondary**: Acurast, SubQuery

### For Analytics
- **Primary**: SubQuery
- **Secondary**: Subscan, DIA

### For Blockchain Data
- **Primary**: Polkadot.js API
- **Secondary**: Subscan, SubQuery

### For DEX Integration
- **Primary**: SubQuery
- **Secondary**: DIA

### For Custom Off-Chain Compute
- **Primary**: Acurast

## Architecture Notes

### Runtime Pallets vs Smart Contracts
Unlike EVM chains, Polkadot oracles typically integrate via **runtime pallets**:
- Native integration at protocol level
- More efficient than smart contracts
- Requires parachain to include the pallet
- Example: Chainlink feed pallet, Acurast pallet

### EVM Parachains
EVM-compatible parachains (Moonbeam, Astar) support standard oracle patterns:
- Chainlink price feed contracts
- Standard EVM oracle integrations
- Compatible with existing EVM tooling

### Off-Chain Workers
Substrate 2.0+ includes native off-chain worker functionality:
- Built into the protocol
- No external oracle needed for some use cases
- Can fetch external data directly

## Integration Patterns

### Pattern 1: Direct RPC (Polkadot.js API)
```typescript
import { ApiPromise, WsProvider } from '@polkadot/api';

const provider = new WsProvider('wss://rpc.polkadot.io');
const api = await ApiPromise.create({ provider });

// Query account balance
const { data: balance } = await api.query.system.account(address);
```

### Pattern 2: REST API (DIA, Subscan, Kylin)
```typescript
import axios from 'axios';

const response = await axios.get('https://api.diadata.org/v1/priceFeed/DOT');
const price = response.data.price;
```

### Pattern 3: GraphQL (SubQuery)
```typescript
import { request, gql } from 'graphql-request';

const query = gql`query { pools { nodes { price } } }`;
const data = await request(endpoint, query);
```

### Pattern 4: Runtime Pallet (Chainlink, Acurast)
```typescript
import { ApiPromise } from '@polkadot/api';

// Query oracle pallet storage
const feedData = await api.query.chainlinkFeed.latestRoundData(feedId);
const price = feedData.answer / 1e8;
```

## Data Sources

### Price Data
- **Recommended**: DIA, Chainlink, Kylin Network
- **Real-time**: Kylin Network, DIA, Polkadot.js API
- **Historical**: DIA, SubQuery
- **Decentralized**: DIA, Chainlink, Acurast

### Blockchain Data
- **Recommended**: Polkadot.js API, Subscan
- **Transactions**: Subscan, Polkadot.js API, SubQuery
- **Events**: Polkadot.js API, SubQuery
- **Staking**: Polkadot.js API, Subscan

### DEX Data
- **Recommended**: SubQuery
- **Trades/Swaps**: SubQuery
- **Liquidity**: SubQuery
- **Prices**: SubQuery, DIA

## Supported Networks

All oracles support:
- **Polkadot** mainnet
- **Kusama** (Polkadot's canary network)
- **Westend** testnet
- **Parachains**: Acala, Moonbeam, Astar, HydraDX, etc.

## Key Differences from EVM Oracles

1. **Runtime Pallets**: Native integration at protocol level
2. **No Gas Fees** for oracle reads (from external perspective)
3. **Substrate-Specific**: Different architecture than EVM
4. **Cross-Chain Native**: XCM for cross-parachain communication
5. **Off-Chain Workers**: Built-in oracle-like functionality

## Installation

```bash
# For Substrate/Polkadot integration
npm install @polkadot/api @polkadot/util-crypto @polkadot/keyring

# For REST APIs
npm install axios

# For GraphQL (SubQuery)
npm install graphql-request graphql

# For Moonbeam EVM integration
npm install ethers
```

## Common RPC Endpoints

- **Polkadot**: `wss://rpc.polkadot.io`
- **Kusama**: `wss://kusama-rpc.polkadot.io`
- **Westend**: `wss://westend-rpc.polkadot.io`
- **Moonbeam**: `https://rpc.api.moonbeam.network`
- **Astar**: `https://evm.astar.network`
- **HydraDX**: `wss://rpc.hydradx.cloud`

## Resources

- Research Document: `docs/From/from.Corey/Oct14.Research.Cryptocurrency.DOT.Polkadot`
- Currency Data: `src/components/currencyCore/currencies/DOT.Polkadot.ts`
- Oracle Index: `./index.ts`
- Polkadot Docs: https://docs.polkadot.com
- Polkadot Wiki: https://wiki.polkadot.network

## Notes

- Polkadot uses **sr25519** signatures (Schnorrkel), not secp256k1
- Addresses use **SS58 encoding** with network-specific prefixes
- **Polkadot prefix 0** (addresses start with 1)
- **Kusama prefix 2** (addresses start with capital letter)
- **Substrate prefix 42** (addresses start with 5)
- DEXs on parachains (HydraDX, Acala Swap, StellaSwap on Moonbeam)
- XCM enables cross-parachain asset transfers
- Runtime upgrades without hard forks

## Parachain-Specific Oracles

### Moonbeam (EVM)
- Chainlink EVM contracts
- Standard EVM oracle patterns
- SubQuery indexing

### Acala
- SubQuery for DEX data
- DIA price feeds
- Native runtime pallets

### HydraDX
- SubQuery for Omnipool data
- DIA price feeds

### Astar
- SubQuery for DEX data
- EVM and WASM oracle support

## API Keys

**Required**:
- Subscan (free tier available)
- Kylin Network (free tier available)

**Not Required**:
- Polkadot.js API (free)
- DIA (free)
- SubQuery (free tier)
- Acurast (depends on implementation)
- Chainlink (on-chain reads)

