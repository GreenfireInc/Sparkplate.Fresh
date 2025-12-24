# Terra (LUNA) Decentralized Exchanges

This directory contains comprehensive information about decentralized exchanges (DEXs) operating on the Terra (LUNA) blockchain.

## Overview

Terra is a Cosmos SDK-based blockchain that focuses on stablecoins and decentralized finance (DeFi). After the Terra Classic collapse in May 2022, Terra 2.0 (phoenix-1) was launched with a renewed focus on building a sustainable DeFi ecosystem. All Terra DEXs use CosmWasm smart contracts and can be queried via LCD (Light Client Daemon) API.

**Total DEXs**: 7  
**Total TVL**: $80+ million  
**Total 24h Volume**: $8+ million

## Terra DEXs

### 1. **Astroport** (Multi-Chain AMM)
- **URL**: https://astroport.fi/
- **Type**: Multi-Chain AMM with multiple pool types
- **Description**: Leading DEX protocol on Terra with advanced AMM features, cross-chain support, and the largest TVL in the ecosystem
- **TVL**: $50+ million
- **Features**:
  - Multiple pool types: XYK, Stable Swap, PCL (Passive Concentrated Liquidity)
  - GraphQL API for easy data access
  - Cross-chain support via IBC and Wormhole
  - Liquidity incentives through generator contracts
  - ASTRO token governance
- **Integration**: GraphQL API, CosmWasm contract queries
- **SDK**: @astroport/sdk, @terra-money/feather.js

### 2. **White Whale** (Multi-Chain Liquidity Protocol)
- **URL**: https://www.whitewhale.money/
- **Type**: Interchain liquidity protocol with arbitrage vaults
- **Description**: Cross-chain liquidity pools and automated arbitrage strategies across Cosmos ecosystem
- **TVL**: $10+ million
- **Features**:
  - Automated arbitrage vaults
  - Cross-chain pools via IBC
  - Flash loan functionality
  - Multi-chain deployment (Terra, Migaloo, Juno)
  - WHALE token for governance
- **Integration**: CosmWasm contract queries via LCD
- **SDK**: @terra-money/feather.js, @cosmjs/stargate

### 3. **Phoenix Protocol** (Native AMM)
- **URL**: https://phoenixfi.app/
- **Type**: AMM DEX
- **Description**: Native Terra DEX rising from Terra 2.0 with community governance
- **TVL**: $5+ million
- **Features**:
  - Simple AMM model
  - Community-driven governance
  - Competitive fee structure
  - Native to Terra blockchain
- **Integration**: CosmWasm contract queries via LCD
- **SDK**: @terra-money/feather.js

### 4. **Edge Protocol** (Hybrid DEX)
- **URL**: https://edgeprotocol.io/
- **Type**: Hybrid Orderbook + AMM
- **Description**: Combines orderbook and AMM models for optimal trading flexibility
- **TVL**: $3+ million
- **Features**:
  - Orderbook for limit orders
  - AMM for instant swaps
  - Lower slippage for large trades
  - Price discovery via orderbook
- **Integration**: REST API + CosmWasm contract queries
- **SDK**: @terra-money/feather.js

### 5. **TerraSwap** (Classic AMM)
- **URL**: https://terraswap.io/
- **Type**: Classic AMM (primarily Terra Classic)
- **Description**: Original Terra DEX, now primarily operating on Terra Classic
- **TVL**: $2+ million (Classic)
- **Features**:
  - Historical significance in Terra ecosystem
  - REST API for price queries
  - Simple AMM model (Uniswap V2-like)
  - Active on Terra Classic (LUNC)
- **Integration**: REST API, CosmWasm contract queries
- **SDK**: @terra-money/terra.js (Classic), @terra-money/feather.js (2.0)

### 6. **Loop Markets** (Community AMM)
- **URL**: https://www.loop.markets/
- **Type**: AMM DEX with loop rewards
- **Description**: Community-driven DEX with unique tokenomics and rewards system
- **TVL**: $4+ million
- **Features**:
  - Loop rewards system
  - Community governance
  - LOOP token staking
  - Sustainable tokenomics
- **Integration**: CosmWasm contract queries via LCD
- **SDK**: @terra-money/feather.js

### 7. **Spectrum Protocol** (Yield Optimizer)
- **URL**: https://spec.finance/
- **Type**: Auto-compounding yield optimizer with DEX
- **Description**: Automatically compounds rewards and optimizes yield farming strategies
- **TVL**: $8+ million
- **Features**:
  - Auto-compounding vaults
  - Yield optimization across multiple protocols
  - SPEC token for governance
  - Batch compounding to reduce gas costs
  - Integrates with major Terra DEXs
- **Integration**: REST API + CosmWasm contract queries
- **SDK**: @terra-money/feather.js

## Technical Integration

### CosmWasm Contract Queries

All Terra DEXs use CosmWasm smart contracts that can be queried via LCD API:

```typescript
import { LCDClient } from '@terra-money/feather.js';

const lcd = new LCDClient({
  terra: {
    lcd: 'https://phoenix-lcd.terra.dev',
    chainID: 'phoenix-1',
    gasAdjustment: 1.75,
    gasPrices: { uluna: 0.015 },
    prefix: 'terra',
  },
});

// Query pool info
const poolInfo = await lcd.wasm.contractQuery(pairAddress, { pool: {} });

// Simulate swap
const simulation = await lcd.wasm.contractQuery(pairAddress, {
  simulation: {
    offer_asset: {
      info: { native_token: { denom: 'uluna' } },
      amount: '1000000'
    }
  }
});
```

### Astroport GraphQL API

Astroport provides a GraphQL API for easy data access:

```typescript
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.astroport.fi/graphql',
  cache: new InMemoryCache(),
});

const query = gql`
  query GetPools {
    pools {
      id
      token0 { symbol }
      token1 { symbol }
      totalLiquidityUSD
      volume24h
      apr
    }
  }
`;

const { data } = await client.query({ query });
```

## Terra Blockchain Details

- **Consensus**: Delegated Proof of Stake (Tendermint)
- **Smart Contracts**: CosmWasm (Rust-based)
- **Address Prefix**: `terra`
- **Chain ID**: `phoenix-1` (Terra 2.0)
- **LCD Endpoint**: https://phoenix-lcd.terra.dev/
- **RPC Endpoint**: https://terra-rpc.polkachu.com/
- **Block Explorer**: https://finder.terra.money/

## Key Features

- **CosmWasm Smart Contracts**: All DEXs built on Rust-based CosmWasm
- **IBC Support**: Inter-Blockchain Communication for cross-chain transfers
- **LCD API**: Light Client Daemon for querying blockchain state
- **Multiple Pool Types**: XYK, Stable Swap, Concentrated Liquidity
- **Yield Optimization**: Auto-compounding and farming strategies
- **Cross-Chain**: Bridge to other Cosmos chains and beyond

## Resources

- **Terra Official**: https://www.terra.money/
- **Terra Docs**: https://docs.terra.money/
- **Terra Finder**: https://finder.terra.money/
- **Terra Station**: https://station.terra.money/
- **CosmWasm**: https://cosmwasm.com/
- **Cosmos SDK**: https://docs.cosmos.network/

## Notes

- Terra 2.0 (phoenix-1) launched after Terra Classic collapse in May 2022
- Astroport is the dominant DEX with most liquidity and volume
- TerraSwap primarily operates on Terra Classic (columbus-5) now
- All DEXs use CosmWasm for smart contracts
- LCD API is the primary method for querying contract state
- IBC enables seamless cross-chain transfers within Cosmos ecosystem
- Growing DeFi ecosystem with innovative primitives

## Usage Examples

### Import Specific DEX
```typescript
import { lunaAstroportDEX } from '@/components/currencyCore/DEXs/LUNA.Terra';
console.log(lunaAstroportDEX.api.endpoints.graphql);
```

### Import All Terra DEXs
```typescript
import * as terraDexes from '@/components/currencyCore/DEXs/LUNA.Terra';
console.log(terraDexes.lunaDexMetadata.totalDexes);
```

### Query DEX Metadata
```typescript
import { lunaDexMetadata } from '@/components/currencyCore/DEXs/LUNA.Terra';
console.log(lunaDexMetadata.stats.totalTvl);
console.log(lunaDexMetadata.categories.multiChainAmm);
```

---

**Last Updated**: October 14, 2025

