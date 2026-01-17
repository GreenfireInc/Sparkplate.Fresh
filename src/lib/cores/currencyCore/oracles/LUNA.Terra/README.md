# Terra (LUNA) Oracle Integrations

Comprehensive oracle and price feed integrations for **Terra (LUNA)**, the Cosmos SDK-based blockchain focused on DeFi and stablecoins. This module provides access to multiple oracle sources including high-frequency feeds, native on-chain oracles, DEX-based pricing, and market data aggregators.

## 🌍 About Terra (LUNA)

Terra 2.0 (LUNA) is a Cosmos SDK blockchain that launched in May 2022 after the collapse of Terra Classic. Built on Tendermint consensus with ~130 validators, Terra provides a robust ecosystem for DeFi applications, featuring CosmWasm smart contracts, IBC interoperability, and a thriving DEX ecosystem led by Astroport.

**Key Characteristics:**
- **Chain ID**: phoenix-1
- **Consensus**: Tendermint PoS
- **Block Time**: ~6 seconds
- **Address Format**: Bech32 with "terra" prefix
- **Smart Contracts**: CosmWasm (Rust/Go)
- **Derivation Path**: m/44'/330'/0'/0/0

## 📊 Available Oracles

### 1. **Pyth Network** (`pyth.ts`)
High-frequency oracle with sub-second price updates.

**Best For:**
- Real-time trading applications
- Derivatives and options platforms
- High-frequency DeFi protocols
- Arbitrage monitoring

**Features:**
- 400ms update frequency
- 70+ data publishers
- Confidence intervals included
- Pull-based model

**API:** `https://hermes.pyth.network`  
**Docs:** https://docs.pyth.network/

---

### 2. **Band Protocol** (`band.ts`)
Native Cosmos SDK oracle with CosmWasm integration.

**Best For:**
- DeFi protocol integrations
- Lending and borrowing platforms
- Stablecoin mechanisms
- Smart contract price feeds

**Features:**
- Decentralized validator network
- CosmWasm smart contract support
- GraphQL and REST APIs
- Customizable data feeds

**API:** `https://lasr.bandchain.org/api`  
**Docs:** https://docs.bandchain.org/

---

### 3. **DIA** (`dia.ts`)
Open-source oracle with transparent methodologies.

**Best For:**
- Auditable price feeds
- Custom feed requirements
- Historical price analysis
- Multi-exchange aggregation

**Features:**
- Fully transparent data sources
- 80+ exchange aggregation
- Free API access
- Supply and market cap data

**API:** `https://api.diadata.org/v1`  
**Docs:** https://docs.diadata.org/

---

### 4. **Terra Oracle Module** (`terraoracle.ts`)
Native on-chain oracle with validator consensus.

**Best For:**
- Terra-native dApp integrations
- On-chain governance
- Validator operations
- Price-dependent smart contracts

**Features:**
- Validator-based consensus pricing
- Weighted median aggregation
- Slashing for incorrect votes
- Block-time updates (~6 seconds)

**API:** `https://phoenix-lcd.terra.dev`  
**Docs:** https://classic-docs.terra.money/docs/develop/module-specifications/spec-oracle.html

---

### 5. **Mintscan** (`mintscan.ts`)
Premier Cosmos ecosystem block explorer and API.

**Best For:**
- Blockchain data queries
- Transaction tracking
- Account balance checks
- Validator statistics

**Features:**
- 2 req/s, 10k daily calls (free)
- Comprehensive blockchain data
- Real-time transaction tracking
- Staking and delegation data

**API:** `https://api-terra.cosmostation.io`  
**Docs:** https://docs.cosmostation.io/apis

---

### 6. **Astroport** (`astroport.ts`)
Leading Terra DEX with GraphQL API.

**Best For:**
- DEX-based price discovery
- Liquidity pool analytics
- Trading volume tracking
- Real-time swap prices

**Features:**
- Largest Terra DEX
- Multiple AMM types (XYK, Stableswap, PCL)
- GraphQL and REST APIs
- Deep LUNA liquidity

**API:** `https://api.astroport.fi/graphql`  
**Docs:** https://docs.astroport.fi/

---

### 7. **CoinGecko** (`coingecko.ts`)
Comprehensive cryptocurrency market data aggregator.

**Best For:**
- Market analytics
- Historical price charts
- Multi-currency pricing
- Exchange listings

**Features:**
- 600+ exchange aggregation
- Free tier (10-50 calls/min)
- Market cap and volume data
- Developer and community stats

**API:** `https://api.coingecko.com/api/v3`  
**Docs:** https://www.coingecko.com/en/api/documentation

---

## 🚀 Quick Start

### Installation

```bash
npm install axios @terra-money/terra.js @apollo/client graphql
```

### Basic Usage

#### Get LUNA Price (Pyth - Fastest)

```typescript
import axios from 'axios';

const LUNA_FEED_ID = '0x09b7c7072c57f0e19c5dd1df8e81d96b4c08c58a7c9414e89f422aebcd8a2590';

async function getLUNAPrice() {
  const response = await axios.get(
    'https://hermes.pyth.network/v2/updates/price/latest',
    { params: { ids: [LUNA_FEED_ID] } }
  );
  
  const priceData = response.data.parsed[0].price;
  const price = parseFloat(priceData.price) * Math.pow(10, priceData.expo);
  
  console.log(`LUNA Price: $${price.toFixed(4)}`);
  return price;
}
```

#### Get LUNA Price (CoinGecko - Simplest)

```typescript
import axios from 'axios';

async function getLUNAPrice() {
  const response = await axios.get(
    'https://api.coingecko.com/api/v3/simple/price',
    {
      params: {
        ids: 'terra-luna-2',
        vs_currencies: 'usd',
        include_24hr_change: true,
      },
    }
  );
  
  const data = response.data['terra-luna-2'];
  console.log(`LUNA Price: $${data.usd}`);
  console.log(`24h Change: ${data.usd_24h_change.toFixed(2)}%`);
  
  return data.usd;
}
```

#### Query Terra Oracle Module (Native)

```typescript
import { LCDClient } from '@terra-money/terra.js';
import axios from 'axios';

async function getTerraOracleRate() {
  const response = await axios.get(
    'https://phoenix-lcd.terra.dev/terra/oracle/v1beta1/denoms/exchange_rates'
  );
  
  const rates = response.data.exchange_rates;
  console.log('Terra Oracle Rates:', rates);
  
  return rates;
}
```

#### Get DEX Price from Astroport

```typescript
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.astroport.fi/graphql',
  cache: new InMemoryCache(),
});

async function getAstroportLUNAPrice() {
  const query = gql`
    query {
      pools(where: { assets: { contains: "uluna" } }, first: 5) {
        token0 { symbol }
        token1 { symbol }
        token0Price
        token1Price
        totalLiquidityUSD
      }
    }
  `;
  
  const { data } = await client.query({ query });
  console.log('Astroport Pools:', data.pools);
  
  return data.pools;
}
```

---

## 🎯 Oracle Selection Guide

| **Use Case** | **Recommended Oracle** | **Why?** |
|--------------|------------------------|----------|
| Real-time trading | Pyth Network | 400ms updates, confidence intervals |
| DeFi protocols | Band Protocol | Native Cosmos SDK, CosmWasm integration |
| On-chain dApps | Terra Oracle Module | Validator consensus, block-time updates |
| Market analytics | CoinGecko | Historical data, market cap, multi-currency |
| DEX integration | Astroport | Deepest liquidity, real-time pool data |
| Blockchain queries | Mintscan | Transaction tracking, validator stats |
| Auditable feeds | DIA | Open-source, transparent methodologies |

---

## 📈 Update Frequencies

| **Oracle** | **Update Frequency** | **Latency** |
|------------|---------------------|-------------|
| Pyth Network | 400 milliseconds | Ultra-low |
| Terra Oracle Module | ~6 seconds (block time) | Very low |
| Astroport | Per block (~6 seconds) | Very low |
| Band Protocol | 2-5 minutes | Low |
| DIA | 2-5 minutes | Low |
| Mintscan | 1-2 minutes | Low |
| CoinGecko | 1-2 minutes | Moderate |

---

## 🔐 Rate Limits & API Keys

| **Oracle** | **Free Tier** | **API Key Required?** |
|------------|---------------|----------------------|
| Pyth Network | Unlimited | ❌ No |
| Band Protocol | Public RPC limits | ❌ No |
| DIA | Unlimited | ❌ No |
| Terra Oracle Module | Public LCD limits | ❌ No |
| Astroport | GraphQL rate limits | ❌ No |
| Mintscan | 2 req/s, 10k daily | ⚠️ Optional (higher limits with key) |
| CoinGecko | 10-50 calls/min | ⚠️ Optional (higher limits with key) |

---

## 🏗️ Integration Complexity

| **Oracle** | **Complexity** | **Setup Time** |
|------------|---------------|---------------|
| CoinGecko | ⭐ Easy | 5 minutes |
| DIA | ⭐ Easy | 5 minutes |
| Pyth Network | ⭐⭐ Medium | 15 minutes |
| Mintscan | ⭐⭐ Medium | 15 minutes |
| Band Protocol | ⭐⭐⭐ Advanced | 30 minutes |
| Terra Oracle Module | ⭐⭐⭐ Advanced | 30 minutes |
| Astroport | ⭐⭐⭐ Advanced | 30 minutes |

---

## ⚠️ Historical Context

**Terra 2.0 vs. Terra Classic:**

Terra 2.0 (LUNA) launched in May 2022 after the catastrophic collapse of Terra Classic (LUNC). The original Terra blockchain failed when its algorithmic stablecoin UST lost its peg, leading to a death spiral.

**Key Differences:**
- **Terra 2.0 (LUNA)**: New chain (phoenix-1), no algorithmic stablecoins, general-purpose DeFi
- **Terra Classic (LUNC)**: Original chain (columbus-5), contains failed UST mechanism

**When integrating price data:**
- Use `terra-luna-2` identifier for Terra 2.0 (LUNA)
- Use `terra-luna` or `terra-luna-classic` for Terra Classic (LUNC)
- Verify you're querying the correct chain (phoenix-1 for Terra 2.0)

---

## 🛠️ Advanced Integration Patterns

### Multi-Source Price Aggregation

```typescript
async function getAggregatedLUNAPrice() {
  const [pythPrice, bandPrice, coinGeckoPrice] = await Promise.all([
    getPythLUNAPrice(),
    getBandLUNAPrice(),
    getCoinGeckoLUNAPrice(),
  ]);
  
  const avgPrice = (pythPrice + bandPrice + coinGeckoPrice) / 3;
  const priceVariance = Math.max(pythPrice, bandPrice, coinGeckoPrice) - 
                        Math.min(pythPrice, bandPrice, coinGeckoPrice);
  
  console.log(`Average: $${avgPrice.toFixed(4)}`);
  console.log(`Variance: $${priceVariance.toFixed(4)}`);
  
  return { avgPrice, priceVariance };
}
```

### Price Monitoring with Alerts

```typescript
async function monitorLUNAWithAlerts(
  priceThreshold: number,
  callback: (price: number) => void
) {
  setInterval(async () => {
    const price = await getPythLUNAPrice();
    
    if (price > priceThreshold) {
      console.log(`🚨 Alert: LUNA price $${price.toFixed(4)} exceeded threshold!`);
      callback(price);
    }
  }, 5000); // Check every 5 seconds
}
```

### Fallback Oracle Chain

```typescript
async function getLUNAPriceWithFallback() {
  try {
    return await getPythLUNAPrice();
  } catch (error) {
    console.warn('Pyth failed, trying Band Protocol...');
    try {
      return await getBandLUNAPrice();
    } catch (error) {
      console.warn('Band failed, trying CoinGecko...');
      return await getCoinGeckoLUNAPrice();
    }
  }
}
```

---

## 📚 Resources

### Official Terra Links
- **Website**: https://www.terra.money/
- **Documentation**: https://docs.terra.money/
- **GitHub**: https://github.com/terra-money
- **Discord**: https://discord.gg/terra-money
- **Twitter**: https://twitter.com/terra_money
- **Explorer**: https://finder.terra.money/

### Oracle Documentation
- **Pyth**: https://docs.pyth.network/
- **Band Protocol**: https://docs.bandchain.org/
- **DIA**: https://docs.diadata.org/
- **Mintscan**: https://docs.cosmostation.io/
- **Astroport**: https://docs.astroport.fi/
- **CoinGecko**: https://www.coingecko.com/en/api/documentation

### Terra Development
- **Terra.js SDK**: https://github.com/terra-money/terra.js
- **Feather.js (Multi-chain)**: https://github.com/terra-money/feather.js
- **CosmJS**: https://github.com/cosmos/cosmjs
- **LCD Endpoint**: https://phoenix-lcd.terra.dev

---

## 🤝 Support

For issues or questions:
- **Terra Discord**: https://discord.gg/terra-money
- **Terra Forum**: https://agora.terra.money/
- **Pyth Discord**: https://discord.gg/PythNetwork
- **Band Protocol Discord**: https://discord.com/invite/3t4bsY7

---

## 📄 License

These integrations are provided as-is for educational and development purposes. Always verify price data from multiple sources for production applications.

---

**Last Updated**: October 2025  
**Terra Version**: Terra 2.0 (phoenix-1)  
**Oracles**: 7 integrated sources

