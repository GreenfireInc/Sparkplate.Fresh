# Dogecoin (DOGE) Oracles

Comprehensive oracle infrastructure for Dogecoin price feeds, blockchain data, and market information.

## Overview

Dogecoin is a UTXO-based blockchain without native smart contract support, so oracles are primarily off-chain APIs or cross-chain solutions. This directory contains integrations for all major Dogecoin data providers.

## Available Oracles

### 1. **DIA Oracle** (`dia.ts`)
- **Type**: Multi-Source Decentralized Oracle
- **Best For**: DeFi applications, custom oracle deployment on Dogechain
- **Features**: 85+ exchange aggregation, MAIR methodology, deployable on 35+ chains
- **API**: `https://api.diadata.org/v1/price/DOGE`

### 2. **CoinGecko** (`coingecko.ts`)
- **Type**: Market Data API
- **Best For**: Wallets, general price tracking, historical data
- **Features**: 500+ exchanges, free tier, no API key required
- **API**: `https://api.coingecko.com/api/v3/simple/price?ids=dogecoin&vs_currencies=usd`

### 3. **Binance** (`binance.ts`)
- **Type**: Exchange API
- **Best For**: Trading bots, high-frequency data, order book analysis
- **Features**: Real-time WebSocket, order book depth, kline data
- **API**: `https://api.binance.com/api/v3/ticker/price?symbol=DOGEUSDT`

### 4. **CryptoCompare** (`cryptocompare.ts`)
- **Type**: Market Data API
- **Best For**: Historical OHLCV data, social stats, news aggregation
- **Features**: 200+ exchanges, minute/hour/day data, trading signals
- **API**: `https://min-api.cryptocompare.com/data/price?fsym=DOGE&tsyms=USD`

### 5. **Bitquery** (`bitquery.ts`)
- **Type**: GraphQL Blockchain API
- **Best For**: Blockchain analytics, DEX trades (wrapped DOGE)
- **Features**: GraphQL queries, transaction tracking, address monitoring
- **API**: `https://graphql.bitquery.io/`
- **Requires**: API key

### 6. **BlockCypher** (`blockcypher.ts`)
- **Type**: Blockchain Explorer API
- **Best For**: Transaction monitoring, webhooks, UTXO queries
- **Features**: Transaction broadcasting, webhooks, address tracking
- **API**: `https://api.blockcypher.com/v1/doge/main`

### 7. **Chainlink** (`chainlink.ts`)
- **Type**: Decentralized Oracle (Limited DOGE support)
- **Best For**: DeFi on EVM chains requiring DOGE/USD price
- **Features**: Decentralized, high security, available on BSC/Ethereum
- **Note**: Not natively on Dogecoin blockchain

### 8. **Dogechain** (`dogechain.ts`)
- **Type**: Blockchain Explorer
- **Best For**: Simple blockchain queries, address balances
- **Features**: Oldest DOGE explorer, free API, network statistics
- **API**: `https://dogechain.info/api/v1`

## Quick Start

```typescript
import { dogecoinCoingeckoOracle } from './oracles/DOGE.Dogecoin';

// Get DOGE price
const oracle = dogecoinCoingeckoOracle;
// Use oracle.api.priceEndpoint to fetch data
```

## Recommendations by Use Case

### For Wallets
- **Primary**: CoinGecko
- **Secondary**: Dogechain

### For Trading Bots
- **Primary**: Binance
- **Secondary**: CoinGecko, CryptoCompare

### For DeFi Applications
- **Primary**: DIA
- **Secondary**: Chainlink (on EVM chains)

### For Analytics
- **Primary**: Bitquery
- **Secondary**: CoinGecko, BlockCypher

### For Blockchain Data
- **Primary**: Dogechain, BlockCypher
- **Secondary**: Bitquery

## Notes

- Dogecoin has no native on-chain oracles (UTXO-based, no smart contracts)
- For DEX data, use wrapped DOGE on EVM chains
- Dogechain (EVM sidechain) supports oracle deployment (e.g., DIA)
- Most oracles are free with rate limits
- Some require API keys (Bitquery, CryptoCompare Pro)

## Data Sources

### Price Data
- **Recommended**: CoinGecko, DIA, CryptoCompare
- **Real-time**: Binance, CoinGecko
- **Historical**: CoinGecko, CryptoCompare
- **Decentralized**: DIA

### Blockchain Data
- **Recommended**: Dogechain, BlockCypher
- **Transactions**: Dogechain, BlockCypher, Bitquery
- **Addresses**: Dogechain, BlockCypher, Bitquery
- **Webhooks**: BlockCypher

## Integration Example

```typescript
import axios from 'axios';

// Simple price fetch from CoinGecko
async function getDOGEPrice() {
  const response = await axios.get(
    'https://api.coingecko.com/api/v3/simple/price?ids=dogecoin&vs_currencies=usd'
  );
  return response.data.dogecoin.usd;
}
```

## Resources

- Research Document: `docs/From/from.Corey/Oct14.Research.Cryptocurrency.DOGE.Dogecoin`
- Currency Data: `src/components/currencyCore/currencies/DOGE.Dogecoin.ts`
- Oracle Index: `./index.ts`

