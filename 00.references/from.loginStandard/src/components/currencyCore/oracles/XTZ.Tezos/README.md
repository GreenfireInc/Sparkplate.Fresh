# Tezos (XTZ) Oracles Directory

This directory contains implementations for Tezos (XTZ) blockchain oracles that provide off-chain data to smart contracts and dApps.

## Overview

Oracles bridge the gap between blockchains and the real world by providing external data (price feeds, computations, real-world events, IoT data, etc.) to smart contracts. The Tezos oracle ecosystem includes both native solutions and cross-chain integrations.

**Total Oracles**: 6
**Primary Blockchain**: Tezos (XTZ)
**Primary SDK**: @taquito/taquito

## Included Oracles

### 1. Harbinger (`harbinger.ts`)
- **Type**: Decentralized Price Oracle (Native Tezos)
- **Description**: Most widely adopted Tezos oracle for price feeds
- **Status**: Active since 2020
- **Features**: 
  - Self-sustaining via transaction fees
  - Volume-weighted average pricing
  - Outlier exclusion
  - Multi-source aggregation (Binance, CoinMarketCap, Quipuswap)
- **Supported Assets**: XTZ, BTC, ETH, USDT, DOGE, LINK
- **Contract**: `KT1Jr5t9UvGiqkvvsuUbPJHaYx24NzdUwNW9` (Mainnet Normalizer)
- **API**: Via Taquito SDK + TzKT API
- **Use Cases**: DeFi (lending, borrowing, stablecoins)
- **URL**: https://github.com/tacoinfra/harbinger

### 2. Chainlink (`chainlink.ts`)
- **Type**: Decentralized Oracle Network (Cross-chain)
- **Description**: Proven decentralized oracle with Tezos integration
- **Status**: Integrated since 2020
- **Features**:
  - Decentralized price feeds
  - Verifiable Random Function (VRF)
  - Custom external adapters
  - Cross-chain compatibility
- **Partnerships**: SmartPy, Cryptonomic
- **API**: Tezos integration via SmartPy
- **Use Cases**: Production DeFi, high-security applications
- **URL**: https://chain.link/solutions/tezos

### 3. Wolfram Alpha (`wolframalpha.ts`)
- **Type**: Computational Oracle
- **Description**: Access to Wolfram|Alpha knowledge base
- **Status**: Integrated since 2021
- **Features**:
  - Complex computational queries
  - Scientific computations
  - Real-world data (weather, stocks)
  - Natural language queries
- **API**: https://api.wolframalpha.com/v2
- **Requires**: API key (free tier available)
- **Use Cases**: Scientific computations, educational apps, complex queries
- **URL**: https://www.wolframblockchainlabs.com/

### 4. DIA (`dia.ts`)
- **Type**: Multi-Source Oracle (Cross-chain)
- **Description**: Transparent price feeds from 100+ exchanges
- **Status**: Active
- **Features**:
  - Real-time price feeds
  - Historical data
  - Customizable feeds
  - Transparent sourcing
- **Coverage**: 2000+ assets, 100+ exchanges
- **API**: https://api.diadata.org
- **Requires**: No API key for basic usage
- **Use Cases**: DeFi, trading bots, analytics
- **URL**: https://www.diadata.org/

### 5. Kaiko (`kaiko.ts`)
- **Type**: Market Data Oracle
- **Description**: Institutional-grade market data
- **Status**: Active
- **Features**:
  - Real-time market data
  - Order book snapshots
  - Trade history
  - OHLCV data
- **Coverage**: 100+ CEXs/DEXs, 10,000+ pairs
- **API**: https://us.market-api.kaiko.io
- **Requires**: API key (paid service)
- **Use Cases**: Institutional trading, professional analytics
- **URL**: https://www.kaiko.com/

### 6. Ubinetic (`ubinetic.ts`)
- **Type**: API Oracle Service
- **Description**: Secure API pulls for payments and IoT
- **Status**: Active
- **Features**:
  - Payment API integration
  - IoT sensor data
  - Custom API endpoints
  - Secure data transmission
- **API**: Custom integration
- **Requires**: API key (custom setup)
- **Use Cases**: Payment verification, IoT tracking, supply chain
- **URL**: https://ubinetic.com/

## Usage

### Import Tezos Oracles
```typescript
// Import from main oracles directory
import {
  harbingerOracle,
  chainlinkOracle,
  diaOracle,
  tezosOraclesLazy,
  tezosOraclesMetadata
} from '@/components/currencyCore/oracles';

// Or import directly from Tezos directory
import {
  harbingerOracle,
  chainlinkOracle,
  diaOracle,
  tezosOraclesLazy,
  tezosOraclesMetadata
} from '@/components/currencyCore/oracles/XTZ.Tezos';
```

### Lazy Load Oracles
```typescript
// Lazy load specific Tezos oracles
const harbinger = await tezosOraclesLazy.harbinger();
const chainlink = await tezosOraclesLazy.chainlink();
const dia = await tezosOraclesLazy.dia();
```

### Query Oracle Metadata
```typescript
// Get Tezos oracle ecosystem information
console.log(tezosOraclesMetadata.totalOracles); // 6
console.log(tezosOraclesMetadata.categories.decentralized); // ['Harbinger', 'Chainlink', 'DIA']
console.log(tezosOraclesMetadata.features.priceFeeds); // ['Harbinger', 'Chainlink', 'DIA', 'Kaiko']
```

## Integration Examples

### Basic Oracle Query via Taquito

```typescript
import { TezosToolkit } from '@taquito/taquito';

const Tezos = new TezosToolkit('https://mainnet.api.tez.ie');

// Query Harbinger Oracle
async function getHarbingerPrice(assetSymbol: string) {
  const HARBINGER_NORMALIZER = 'KT1Jr5t9UvGiqkvvsuUbPJHaYx24NzdUwNW9';
  
  const contract = await Tezos.contract.at(HARBINGER_NORMALIZER);
  const storage: any = await contract.storage();
  
  const assetData = await storage.assets.get(assetSymbol);
  const price = assetData.price.toNumber() / 1000000;
  
  console.log(`${assetSymbol} Price: $${price}`);
  return price;
}

getHarbingerPrice('XTZ');
```

### Query via TzKT API (Faster)

```typescript
async function getOraclePriceViaTzKT(contractAddress: string) {
  const response = await fetch(
    `https://api.tzkt.io/v1/contracts/${contractAddress}/storage`
  );
  const storage = await response.json();
  
  // Parse storage for price data
  return storage;
}
```

### DIA REST API

```typescript
async function getDIAPrice() {
  const response = await fetch(
    'https://api.diadata.org/v1/assetQuotation/Tezos/0x0000000000000000000000000000000000000000'
  );
  const data = await response.json();
  
  console.log('XTZ Price:', data.Price);
  return data.Price;
}
```

### Wolfram Alpha Query

```typescript
async function queryWolframAlpha(query: string, appId: string) {
  const response = await fetch(
    `https://api.wolframalpha.com/v2/query?input=${encodeURIComponent(query)}&format=plaintext&output=json&appid=${appId}`
  );
  const data = await response.json();
  return data;
}
```

## Oracle Comparison

| Oracle | Type | Native Tezos | API Key Required | Cost | Best For |
|--------|------|--------------|------------------|------|----------|
| Harbinger | Price Oracle | ✅ Yes | ❌ No | Free | DeFi price feeds |
| Chainlink | Price/VRF | ❌ Cross-chain | Varies | Varies | High-security DeFi |
| Wolfram Alpha | Computational | ❌ Cross-chain | ✅ Yes | Freemium | Complex queries |
| DIA | Price Oracle | ❌ Cross-chain | ❌ No | Free | Multi-source prices |
| Kaiko | Market Data | ❌ Cross-chain | ✅ Yes | Paid | Institutional data |
| Ubinetic | API Service | ❌ Cross-chain | ✅ Yes | Custom | IoT/Payments |

## Key Features by Category

### Price Feeds
- **Harbinger**: Native Tezos, self-sustaining, volume-weighted
- **Chainlink**: Decentralized, proven security
- **DIA**: 100+ exchanges, transparent sourcing
- **Kaiko**: Institutional-grade, order book data

### Real-World Data
- **Wolfram Alpha**: Computational, scientific data
- **Kaiko**: Market analytics, historical data
- **Ubinetic**: IoT sensors, payment verification

### Use Case Recommendations

**DeFi Applications (Stablecoins, Lending)**
- Primary: Harbinger (native, widely adopted)
- Secondary: DIA (multi-source validation)

**High-Security Production Apps**
- Primary: Chainlink (proven security)
- Secondary: Harbinger (backup)

**IoT & Supply Chain**
- Primary: Ubinetic (specialized)

**Trading & Analytics**
- Primary: Kaiko (institutional data)
- Secondary: DIA (transparent feeds)

**Scientific/Educational Apps**
- Primary: Wolfram Alpha (computational)

## Integration Best Practices

1. **Multiple Oracle Strategy**: Use multiple oracles for critical applications
2. **Data Freshness**: Always check timestamps on oracle data
3. **Error Handling**: Implement robust fallback mechanisms
4. **Scaling Factors**: Different oracles use different decimal precision
5. **Gas Optimization**: Use TzKT API for read-only operations
6. **Security**: Validate data sources and signatures
7. **Rate Limits**: Respect API rate limits for external oracles

## Technical Considerations

### Data Format
- **Harbinger**: 6 decimals (price * 1,000,000)
- **Chainlink**: Typically 8 decimals
- **DIA**: Standard decimal format
- **Kaiko**: Standard decimal format

### Update Frequency
- **Harbinger**: Every few minutes (variable)
- **Chainlink**: Deviation-based or heartbeat
- **DIA**: Real-time
- **Kaiko**: Real-time (milliseconds)

### Network
- **Mainnet RPC**: https://mainnet.api.tez.ie
- **Ghostnet RPC**: https://ghostnet.tezos.marigold.dev
- **TzKT API**: https://api.tzkt.io

## Resources

### Tezos Development
- **Taquito SDK**: https://tezostaquito.io/
- **TzKT API**: https://api.tzkt.io/
- **Better Call Dev**: https://better-call.dev/
- **Tezos Docs**: https://tezos.gitlab.io/

### Oracle-Specific Resources
- **Harbinger**: https://github.com/tacoinfra/harbinger
- **Chainlink Tezos**: https://docs.chain.link/docs/tezos/
- **Wolfram**: https://www.wolframblockchainlabs.com/
- **DIA**: https://docs.diadata.org/
- **Kaiko**: https://docs.kaiko.com/
- **Ubinetic**: https://ubinetic.com/

### Guides & Tutorials
- **Tezos Oracles Overview**: https://opentezos.com/defi/oracles/
- **Tezos B9lab**: https://tezos.b9lab.com/oracles/
- **Harbinger Introduction**: https://medium.com/@Blockscale/introducing-harbinger-a-self-sustaining-price-oracle-for-tezos-7cab5c9971d

## Future Developments

- Expanded asset coverage across all oracles
- More DeFi protocol integrations
- Enhanced cross-chain oracle bridges
- Additional oracle providers
- Improved data aggregation standards
- On-chain oracle verification protocols

## Notes

- Harbinger is the go-to oracle for most Tezos DeFi applications
- Always validate oracle data before using in production
- Consider using multiple oracles for mission-critical applications
- API keys are required for Wolfram Alpha, Kaiko, and Ubinetic
- Gas costs vary based on oracle contract complexity
- Test thoroughly on Ghostnet before mainnet deployment

---

For more information on integrating oracles into your Tezos application, refer to the individual oracle files in this directory.

