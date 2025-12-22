# Cryptocurrency Pricing Sources

This directory contains comprehensive configuration files for various cryptocurrency pricing APIs. All sources listed here provide **free API access** (with varying limitations).

## 📋 Table of Contents

- [Available Pricing Sources](#available-pricing-sources)
- [Categories](#categories)
- [Quick Comparison](#quick-comparison)
- [Usage](#usage)
- [Recommendations](#recommendations)

## 🌐 Available Pricing Sources

### Data Aggregators

| Source | API Key | Rate Limit | Features |
|--------|---------|------------|----------|
| [CoinGecko](./coinGeckoAPI.ts) | Optional | 30/min, 10k/month | Most comprehensive, no key required |
| [CoinMarketCap](./coinMarketCapAPI.ts) | Required | 10k/month | Industry standard, reliable |
| [Coinpaprika](./coinpaprikaAPI.ts) | Optional | Unlimited | Completely free, unlimited |
| [CryptoCompare](./cryptoCompareAPI.ts) | Required | 100k/month | Social data, news |
| [CoinCap](./coinCapAPI.ts) | Optional | No strict limit | WebSocket support |
| [CoinLore](./coinLoreAPI.ts) | None | No strict limit | No registration needed |
| [CoinStats](./coinStatsAPI.ts) | Optional | Unlimited | Portfolio tracking |
| [Coinlib](./coinlibAPI.ts) | Required | 15k/month | Simple API |

### Exchange APIs

| Source | API Key | Rate Limit | Features |
|--------|---------|------------|----------|
| [Binance](./binanceAPI.ts) | Optional | 1200/min | Largest exchange, free public data |
| [Coinbase](./coinbaseAPI.ts) | Optional | 10k/hour | Regulated, trusted |
| [Kraken](./krakenAPI.ts) | Optional | Variable | Oldest exchange, reliable |

### Blockchain Data

| Source | API Key | Rate Limit | Features |
|--------|---------|------------|----------|
| [Bitquery](./bitqueryAPI.ts) | Required | 100k points/month | GraphQL, multi-chain, DEX data |
| [Messari](./messariAPI.ts) | Optional | 1k/day | Research, on-chain metrics, subgraphs |

### Specialized Sources

| Source | API Key | Rate Limit | Features |
|--------|---------|------------|----------|
| [LunarCrush](./lunarCrushAPI.ts) | Required | 50/day | Social metrics, sentiment analysis |
| [Coindar](./coindarAPI.ts) | Required | Limited | Events calendar |
| [Blockmarkets](./blockmarketsAPI.ts) | Required | Unlimited | Institutional-grade |

### Simple/Lightweight

| Source | API Key | Rate Limit | Features |
|--------|---------|------------|----------|
| [Cryptonator](./cryptonatorAPI.ts) | None | No strict limit | Very simple, free |
| [Coinlayer](./coinlayerAPI.ts) | Required | 100/month | Simple rate API |
| [CoinAPI](./coinAPI.ts) | Required | 100/day | Unified exchange data |

## 📂 Categories

### No API Key Required
- CoinGecko
- Coinpaprika
- CoinCap
- Cryptonator
- Binance (public endpoints)
- CoinLore
- Messari (basic)

### Free Tier with API Key
- CoinMarketCap
- CryptoCompare
- Coinlayer
- CoinAPI
- Coinbase
- Kraken
- Bitquery
- CoinStats
- LunarCrush
- Blockmarkets
- Coindar
- Coinlib

### WebSocket Support
- Binance
- Coinbase
- Kraken
- CryptoCompare
- CoinCap

### Subgraph Support
- Messari (DeFi protocols)

### Social Analytics
- LunarCrush (sentiment, influencer tracking)
- CryptoCompare (social stats)

### Events & Calendar
- Coindar (crypto events)

## 📊 Quick Comparison

### Best for General Price Data
1. **CoinGecko** - Most reliable free API, comprehensive data
2. **CoinMarketCap** - Industry standard, widely recognized
3. **Coinpaprika** - Completely free, unlimited requests

### Best for Trading
1. **Binance** - Largest exchange, best liquidity data
2. **Coinbase** - Regulated, trusted in US
3. **Kraken** - Established, reliable

### Best for Free Unlimited Access
1. **Coinpaprika** - Truly unlimited
2. **CoinGecko** - 10k calls/month, no key
3. **CoinLore** - No registration needed
4. **Cryptonator** - Simple and free

### Best for Social Metrics
1. **LunarCrush** - Social listening, sentiment
2. **CryptoCompare** - Social stats included

### Best for On-Chain Data
1. **Bitquery** - Multi-chain GraphQL API
2. **Messari** - Research-grade data, subgraphs

### Best for Events
1. **Coindar** - Comprehensive event calendar

## 💻 Usage

### Import Individual APIs

```typescript
import { coinGeckoAPI } from '@/components/currencyCore/aggregators';

// Access configuration
console.log(coinGeckoAPI.baseURL);
console.log(coinGeckoAPI.endpoints);
console.log(coinGeckoAPI.documentation);
```

### Import All Sources

```typescript
import { aggregators } from '@/components/currencyCore/aggregators';

// Access by name
const geckoAPI = aggregators.coinGecko;
```

### Import by Category

```typescript
import { aggregatorCategories } from '@/components/currencyCore/aggregators';

// Get all sources that don't require API key
const noAuthSources = aggregatorCategories.noAuthRequired;

// Get all exchange APIs
const exchangeAPIs = aggregatorCategories.exchanges;
```

### Get Recommended Sources

```typescript
import { recommendedAggregators } from '@/components/currencyCore/aggregators';

// Best for general pricing
const bestForPricing = recommendedAggregators.generalPricing;

// Best for trading
const bestForTrading = recommendedAggregators.trading;

// Best free unlimited
const freeUnlimited = recommendedAggregators.freeUnlimited;
```

## 🎯 Recommendations

### For Quick Prototyping
- **CoinGecko** - No API key needed, generous limits
- **Coinpaprika** - Truly unlimited, free
- **CoinLore** - No registration required

### For Production Applications
- **CoinGecko** - Most reliable, 10k calls/month free
- **CoinMarketCap** - Industry standard, 10k calls/month
- **Binance** - Best for trading pairs and real-time data

### For Comprehensive Data
- **CoinGecko** - 10,000+ cryptocurrencies
- **CryptoCompare** - Includes social data and news
- **Messari** - Institutional research and on-chain data

### For Real-Time Data
- **Binance** - WebSocket support, high-frequency updates
- **Coinbase** - Real-time trading data
- **CoinCap** - WebSocket for live prices

### For Social Sentiment
- **LunarCrush** - Galaxy Score, AltRank, influencer tracking
- **CryptoCompare** - Basic social stats

### For DeFi and On-Chain
- **Bitquery** - Multi-chain GraphQL, DEX trades
- **Messari** - DeFi protocol subgraphs

## 📝 Each API File Includes

- **API Configuration**: Base URLs, versions
- **Endpoints**: Complete list of available endpoints
- **Authentication**: Requirements and how to obtain keys
- **Rate Limits**: Free and paid tier limits
- **NPM Packages**: Official and community SDKs
- **Subgraph Links**: If available
- **Documentation**: Links to official docs
- **Social Media**: Twitter, Telegram, Discord, etc.
- **Features**: List of capabilities
- **CORS Support**: Browser compatibility
- **Example Usage**: Sample API calls
- **Notes**: Key features and recommendations

## 🔗 External Resources

- [CoinGecko API Docs](https://docs.coingecko.com/)
- [CoinMarketCap API Docs](https://coinmarketcap.com/api/documentation/v1/)
- [Binance API Docs](https://binance-docs.github.io/apidocs/)
- [Messari API Docs](https://messari.io/api/docs)
- [Bitquery Docs](https://docs.bitquery.io/)

## 📄 License

This documentation is part of the loginStandard project.

---

**Last Updated**: October 14, 2025  
**Total APIs Documented**: 19  
**Free APIs**: 19 (all provide free tier)

