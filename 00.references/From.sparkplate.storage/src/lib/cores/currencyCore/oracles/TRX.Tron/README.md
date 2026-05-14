# Tron (TRX) Oracle Integrations

Comprehensive oracle integration guide for Tron (TRX) blockchain data, price feeds, and market information.

## Overview

This module provides TypeScript integrations for 5 major oracle and data providers on the Tron network:

1. **Chainlink** - Official oracle solution (replaced WINkLink in Oct 2024)
2. **DIA** - Customizable decentralized oracle with 90+ data sources
3. **SunSwap** - Official Tron DEX with real-time AMM pricing
4. **TronGrid** - Official Tron blockchain API provider
5. **CoinGecko** - Market data aggregator from 700+ exchanges

## Quick Start

```typescript
import {
  chainlinkOracle,
  diaOracle,
  sunswapOracle,
  trongridOracle,
  coinGeckoOracle
} from './oracles/TRX.Tron';

// Use official Chainlink oracle for DeFi
const trxPrice = await chainlinkOracle.integration.getChainlinkTRXPrice();

// Or use CoinGecko for market data
const marketData = await coinGeckoOracle.integration.getCoinGeckoTRXPrice();
```

## Oracle Comparison

| Oracle | Type | Status | Best For | Cost | Update Frequency |
|--------|------|--------|----------|------|------------------|
| **Chainlink** | Decentralized Oracle | Official | DeFi protocols, price feeds | Gas only | Heartbeat + Deviation |
| **DIA** | Decentralized Oracle | Active | Custom oracles, analytics | Free API | Customizable |
| **SunSwap** | DEX (AMM) | Active | DEX pricing, liquidity | Gas only | Real-time |
| **TronGrid** | Blockchain API | Official | Blockchain data, transactions | Free + Paid | Real-time |
| **CoinGecko** | Market Aggregator | Active | Market data, multi-currency | Free + Paid | 1-5 minutes |

## Oracle Details

### 1. Chainlink (Official Oracle)

**Status:** Official (since October 31, 2024)  
**Use Case:** DeFi protocols, lending platforms, price feeds

```typescript
import { chainlinkOracle } from './oracles/TRX.Tron';

// Get TRX price
const price = await chainlinkOracle.integration.getChainlinkTRXPrice();
console.log(`TRX: $${price.price.toFixed(6)}`);

// Get multiple asset prices
const prices = await chainlinkOracle.integration.getMultiplePrices([
  'TRX/USD',
  'BTC/USD',
  'ETH/USD'
]);
```

**Features:**
- Official oracle for Tron (replaced WINkLink)
- Secures $5.5B+ TVL on Tron
- Industry-standard reliability
- Regular heartbeat updates
- Deviation threshold protection
- Powers JustLend, JustStable, USDD

**Mainnet Price Feeds:**
- BTC/USD: `TYZxQSHAhxGgUWzxYEZAohvWtyN6YXYgDB`
- ETH/USD: `TRVvV3oJhC5iKZ5H4DFz4EB8KfJRPG4kWB`
- TRX/USD: `TQHr7fMpzWGjKR8Xu9wCJSyVT6sJYTwKnU`
- USDT/USD: `TF6wpHjEzZJ4fR6BjEscXmzVKbPNgQVsKe`
- USDC/USD: `TUCyeXHwEK66xK5MWMwQR5R7GrR1ZpscBG`

**Documentation:**
- Tron Integration: https://docs.chain.link/data-feeds/tron
- Price Feeds: https://docs.chain.link/data-feeds/price-feeds/addresses
- Tutorial: https://trondao.medium.com/integrating-chainlink-oracles-with-tron-a-practical-guide-3a4ece864a0a

---

### 2. DIA (Customizable Oracle)

**Use Case:** Custom oracles, historical data, analytics

```typescript
import { diaOracle } from './oracles/TRX.Tron';

// Get TRX price
const price = await diaOracle.integration.getDIATRXPrice();

// Get OHLC data
const ohlc = await diaOracle.integration.getTRXOHLCData(
  startTime,
  endTime,
  '1h'
);

// Get supply data
const supply = await diaOracle.integration.getTRXSupplyData();
```

**Features:**
- Customizable price oracles
- Data from 90+ markets
- 3,000+ tokens supported
- Transparent methodology
- Free REST and GraphQL APIs
- OHLC candlestick data
- Historical price data
- Supply tracking

**API Endpoints:**
- REST: `https://api.diadata.org/v1`
- GraphQL: `https://api.diadata.org/graphql`
- TRX Price: `https://www.diadata.org/app/price/asset/Tron/0x0000000000000000000000000000000000000000/`

**Documentation:** https://docs.diadata.org/

---

### 3. SunSwap (Official DEX)

**Use Case:** DEX pricing, liquidity data, volume tracking

```typescript
import { sunswapOracle } from './oracles/TRX.Tron';

// Get TRX price from DEX
const price = await sunswapOracle.integration.getSunSwapTRXPrice();

// Get price for any token pair
const customPrice = await sunswapOracle.integration.getSunSwapPrice(
  TOKEN_ADDRESSES.WTRX,
  TOKEN_ADDRESSES.USDT,
  1000
);

// Calculate price impact
const impact = await sunswapOracle.integration.calculatePriceImpact(
  TOKEN_ADDRESSES.WTRX,
  TOKEN_ADDRESSES.USDT,
  100000
);
```

**Features:**
- Official Tron DEX
- Deep liquidity pools
- Low transaction fees
- Real-time price discovery
- AMM functionality
- Yield farming
- TRC-20 token support

**Contract Addresses:**
- Router V2: `TKzxdSv2FZKQrEqkKVgp5DcwEXBEKMg2Ax`
- Factory V2: `TXJgMdjVX5dKiQaUi9QobwNxtSQaFqccvd`
- WTRX: `TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR`

**Documentation:** https://sunswap.com/docs/justswap-interfaces_en.pdf

---

### 4. TronGrid (Official Blockchain API)

**Use Case:** Blockchain data, transaction tracking, account queries

```typescript
import { trongridOracle } from './oracles/TRX.Tron';

// Get TRX balance
const balance = await trongridOracle.integration.getTRXBalance(address);

// Get transaction history
const txHistory = await trongridOracle.integration.getTransactionHistory(
  address,
  20
);

// Get network info
const networkInfo = await trongridOracle.integration.getNetworkInfo();

// Get account resources
const resources = await trongridOracle.integration.getAccountResources(address);
```

**Features:**
- Official Tron blockchain API
- Fast RPC endpoints
- Comprehensive blockchain data
- Transaction tracking
- Smart contract interactions
- WebSocket support
- Free tier + API keys

**API Endpoints:**
- Mainnet: `https://api.trongrid.io`
- Nile Testnet: `https://nile.trongrid.io`
- Event Server: `https://api.trongrid.io/event`

**Documentation:** https://developers.tron.network/reference/trongrid-api

---

### 5. CoinGecko (Market Aggregator)

**Use Case:** Market data, multi-currency prices, historical analysis

```typescript
import { coinGeckoOracle } from './oracles/TRX.Tron';

// Get TRX price with market data
const price = await coinGeckoOracle.integration.getCoinGeckoTRXPrice();

// Get detailed market data
const marketData = await coinGeckoOracle.integration.getTRXMarketData();

// Get historical data
const historical = await coinGeckoOracle.integration.getTRXHistoricalData(30);

// Get multi-currency prices
const multiCurrency = await coinGeckoOracle.integration.getTRXMultiCurrency([
  'usd', 'eur', 'btc', 'eth'
]);

// Get OHLC candlestick data
const ohlc = await coinGeckoOracle.integration.getTRXOHLCData(7);
```

**Features:**
- Free API access (no key required)
- Data from 700+ exchanges
- Multi-currency support
- Historical price data
- OHLC candlestick data
- Market cap and volume
- 24h price changes
- Trending coins

**API Endpoints:**
- API Base: `https://api.coingecko.com/api/v3`
- TRX Page: `https://www.coingecko.com/en/coins/tron`

**Documentation:** https://docs.coingecko.com/reference/introduction

---

## Use Case Recommendations

### DeFi Protocols
**Recommended:** Chainlink, DIA

```typescript
// Use Chainlink for production DeFi protocols
const chainlinkPrice = await chainlinkOracle.integration.getChainlinkTRXPrice();

// Validate with DIA for redundancy
const diaPrice = await diaOracle.integration.getDIATRXPrice();
```

### Real-Time Trading
**Recommended:** SunSwap, Chainlink

```typescript
// Get real-time DEX price
const dexPrice = await sunswapOracle.integration.getSunSwapTRXPrice();

// Compare with oracle price
const oraclePrice = await chainlinkOracle.integration.getChainlinkTRXPrice();
```

### Market Analytics
**Recommended:** CoinGecko, DIA

```typescript
// Get comprehensive market data
const marketData = await coinGeckoOracle.integration.getTRXMarketData();

// Get historical OHLC data
const ohlc = await diaOracle.integration.getTRXOHLCData(
  startTime,
  endTime,
  '1h'
);
```

### Blockchain Data
**Recommended:** TronGrid

```typescript
// Query blockchain data
const balance = await trongridOracle.integration.getTRXBalance(address);
const txHistory = await trongridOracle.integration.getTransactionHistory(address);
```

---

## Installation

```bash
# Install required dependencies
npm install tronweb axios
npm install @chainlink/contracts  # For Chainlink integration
```

## Network Configuration

### Mainnet
```typescript
const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io',
  headers: { 'TRON-PRO-API-KEY': process.env.TRONGRID_API_KEY }  // Optional
});
```

### Nile Testnet
```typescript
const tronWeb = new TronWeb({
  fullHost: 'https://nile.trongrid.io',
});

// Get testnet TRX: https://nileex.io/join/getJoinPage
```

---

## Important Notes

### Oracle Transition
- **October 31, 2024:** TRON DAO officially switched from WINkLink to Chainlink as the primary oracle solution
- **May 15, 2025:** Full Chainlink implementation securing $5.5B+ TVL
- **WINkLink is now deprecated** and no longer supported

### Rate Limits
- **TronGrid:** Free tier has rate limits; API key recommended for production
- **CoinGecko:** 10-50 calls/minute on free tier
- **DIA:** Rate limits apply on free tier
- **Chainlink:** Gas fees only (no rate limits)
- **SunSwap:** Gas fees only (no rate limits)

### Best Practices

1. **Use Chainlink for DeFi:** Official oracle with highest reliability
2. **Cache prices:** Implement caching to reduce API calls
3. **Validate data freshness:** Check timestamps before using price data
4. **Use redundancy:** Compare multiple oracles for critical operations
5. **Handle errors gracefully:** Implement fallback mechanisms
6. **Monitor price deviation:** Alert on large price discrepancies
7. **Use API keys:** Get TronGrid API key for production use

---

## Error Handling Example

```typescript
async function getSafeTRXPrice(): Promise<number> {
  try {
    // Try Chainlink first (official oracle)
    const chainlinkPrice = await chainlinkOracle.integration.getChainlinkTRXPrice();
    return chainlinkPrice.price;
  } catch (chainlinkError) {
    console.warn('Chainlink failed, trying fallback...');
    
    try {
      // Fallback to CoinGecko
      const coinGeckoPrice = await coinGeckoOracle.integration.getCoinGeckoTRXPrice();
      return coinGeckoPrice.usd;
    } catch (coinGeckoError) {
      console.error('All oracles failed');
      throw new Error('Unable to fetch TRX price');
    }
  }
}
```

---

## Price Monitoring Example

```typescript
import {
  chainlinkOracle,
  coinGeckoOracle,
  sunswapOracle
} from './oracles/TRX.Tron';

async function monitorTRXPrice() {
  // Monitor with multiple oracles
  chainlinkOracle.integration.monitorChainlinkTRXPrice(
    (price, change) => {
      console.log(`Chainlink: $${price.toFixed(6)} (${change.toFixed(2)}%)`);
    },
    15000
  );

  coinGeckoOracle.integration.monitorCoinGeckoTRXPrice(
    (price, change) => {
      console.log(`CoinGecko: $${price.toFixed(6)} (${change.toFixed(2)}%)`);
    },
    60000
  );

  sunswapOracle.integration.monitorSunSwapTRXPrice(
    (price, change) => {
      console.log(`SunSwap: $${price.toFixed(6)} (${change.toFixed(2)}%)`);
    },
    10000
  );
}
```

---

## Resources

### Official Documentation
- **Chainlink on Tron:** https://docs.chain.link/data-feeds/tron
- **Tron Developers:** https://developers.tron.network/
- **TronGrid API:** https://developers.tron.network/reference/trongrid-api
- **TronWeb SDK:** https://developers.tron.network/docs/tronweb

### Explorers
- **Mainnet:** https://tronscan.org/
- **Nile Testnet:** https://nile.tronscan.org/

### Community
- **Discord:** https://discord.gg/tron
- **Telegram:** https://t.me/tronnetworkEN
- **Twitter:** https://twitter.com/trondao

---

## Contributing

When adding new oracles or updating existing integrations:

1. Follow the established file structure
2. Include comprehensive code examples
3. Document API endpoints and rate limits
4. Add social media links
5. Test all integration examples
6. Update this README with new information

---

## License

This oracle integration module is part of the loginStandard project.

---

**Last Updated:** October 2025  
**Oracle Count:** 5  
**Status:** ✅ Active and Production-Ready

