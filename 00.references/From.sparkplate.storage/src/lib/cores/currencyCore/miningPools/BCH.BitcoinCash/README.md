# Bitcoin Cash (BCH) Mining Pools Integration

Comprehensive TypeScript integration for major Bitcoin Cash mining pools, including API endpoints, documentation links, and helper functions for fetching mining statistics and pricing data.

## 📋 Overview

This module provides ready-to-use TypeScript integrations for the following BCH mining pools:

| Pool Name | Founded | Payment Methods | Pool Fee | Public API |
|-----------|---------|-----------------|----------|------------|
| **ViaBTC** | 2016 | PPS+, PPLNS, SOLO | 1-4% | ✅ Yes |
| **AntPool** | 2014 | PPS+, PPLNS, SOLO | 1-4% | ❌ Account Only |
| **F2Pool** | 2013 | PPS+, FPPS | 2.5% | ✅ Yes |
| **BTC.com** | 2016 | FPPS, PPS, PPLNS | 1.5-4% | ✅ Yes |
| **Poolin** | 2017 | PPS+, FPPS | 2.5% | ❌ Account Only |
| **Mining-Dutch** | 2016 | PROP | 0.9-1% | ✅ Yes |
| **Huobi Pool** | 2018 | PPS+, FPPS | 2.5% | ❌ Account Only |
| **Foundry USA** | 2019 | FPPS | Custom | ❌ Enterprise |

## 🚀 Quick Start

### Installation

No additional installation required - uses standard `fetch` API and TypeScript.

### Basic Usage

```typescript
import { ViaBTCPool, F2Pool, BTCcom } from '@/components/currencyCore/miningPools/BCH.BitcoinCash';

// Fetch pool statistics (public endpoints)
const viaBtcStats = await ViaBTCPool.fetchPoolStats();
console.log('ViaBTC Pool Hashrate:', viaBtcStats?.hashRate);
console.log('Active Miners:', viaBtcStats?.miners);

// Fetch BCH network stats from F2Pool
const f2poolStats = await F2Pool.fetchCoinStats();
console.log('BCH Network Hashrate:', f2poolStats?.hashrate);
console.log('BCH Difficulty:', f2poolStats?.difficulty);

// Fetch recent blocks from BTC.com
const recentBlocks = await BTCcom.fetchRecentBlocks(10);
console.log('Recent Blocks:', recentBlocks);
```

## 📚 Pool-Specific Documentation

### 1. ViaBTC

One of the largest BCH mining pools with consistent hashrate and public API support.

**Features:**
- ✅ Public pool statistics API
- ✅ WebSocket API support
- ✅ Multiple payment methods (PPS+, PPLNS, SOLO)
- ✅ Multi-coin support

**API Documentation:** https://viabtc.com/api/

**Example:**
```typescript
import { ViaBTCPool } from '@/components/currencyCore/miningPools/BCH.BitcoinCash/viaBtc';

// Public pool statistics (no auth required)
const poolStats = await ViaBTCPool.fetchPoolStats();
console.log(poolStats);

// Miner statistics (requires API key)
const minerStats = await ViaBTCPool.fetchMinerStats('your_wallet_address', 'your_api_key');
console.log(minerStats);

// Recent blocks
const blocks = await ViaBTCPool.fetchBlockStats();
console.log(blocks);
```

### 2. AntPool

Major mining pool operated by Bitmain with multi-coin support.

**Features:**
- ⚠️ Requires API Key + Secret + HMAC-MD5 signature
- ✅ Multi-coin support (BTC, BCH, LTC, ETH, etc.)
- ✅ Comprehensive account API

**API Documentation:** https://www.antpool.com/userApiGuide

**Example:**
```typescript
import { AntPool } from '@/components/currencyCore/miningPools/BCH.BitcoinCash';

const apiKey = 'your_antpool_api_key';
const secretKey = 'your_antpool_secret_key';

const accountStats = await AntPool.fetchAccountStats(apiKey, secretKey, 'BCH');
console.log('Total Hashrate:', accountStats?.totalHashrate);
console.log('Unpaid Balance:', accountStats?.unpaidBalance);
```

### 3. F2Pool

Long-established mining pool (since 2013) with extensive multi-coin support.

**Features:**
- ✅ Public coin statistics
- ✅ User statistics (by username)
- ✅ Earnings and worker data
- ✅ Multi-coin support (20+ coins)

**API Documentation:** https://www.f2pool.com/api_doc

**Example:**
```typescript
import { F2Pool } from '@/components/currencyCore/miningPools/BCH.BitcoinCash';

// Public BCH network statistics
const coinStats = await F2Pool.fetchCoinStats();
console.log('BCH Network Hashrate:', coinStats?.hashrate);
console.log('Block Reward:', coinStats?.blockReward);

// User statistics (replace with your F2Pool username)
const userStats = await F2Pool.fetchUserStats('your_username', 'bch');
console.log('Your Hashrate:', userStats?.hashRate);
console.log('Your Workers:', userStats?.workers);
```

### 4. BTC.com

Large mining pool with detailed statistics and historical data.

**Features:**
- ✅ Public pool statistics
- ✅ Block explorer integration
- ✅ Historical data support
- ✅ Detailed worker statistics

**API Documentation:** https://bch.btc.com/stats/api

**Example:**
```typescript
import { BTCcom } from '@/components/currencyCore/miningPools/BCH.BitcoinCash';

// Pool statistics
const poolStats = await BTCcom.fetchPoolStats();
console.log('Pool Hashrate:', poolStats?.poolHashrate);

// Recent blocks
const blocks = await BTCcom.fetchRecentBlocks(20);
blocks.forEach(block => {
  console.log(`Block #${block.height}: ${block.reward} BCH`);
});

// Miner statistics
const minerStats = await BTCcom.fetchMinerStats('your_miner_address');
console.log('Miner Stats:', minerStats);
```

### 5. Poolin

Multi-currency mining pool with smart pool features.

**Features:**
- ⚠️ Requires API Key
- ✅ Hashrate marketplace
- ✅ Merged mining support
- ✅ Multi-coin support

**API Documentation:** https://poolin.com/en/help/api

**Example:**
```typescript
import { Poolin } from '@/components/currencyCore/miningPools/BCH.BitcoinCash';

const apiKey = 'your_poolin_api_key';
const minerAddress = 'your_miner_address';

const minerStats = await Poolin.fetchMinerStats(minerAddress, apiKey);
console.log('Hashrate:', minerStats?.hashrate);
console.log('Unpaid Balance:', minerStats?.unpaid);
```

### 6. Mining-Dutch

European mining pool with multi-algorithm support and public API.

**Features:**
- ✅ Public API (no authentication)
- ✅ Multi-algorithm support
- ✅ Low fees (0.9-1%)
- ✅ Easy integration

**API Documentation:** https://www.mining-dutch.nl/api

**Example:**
```typescript
import { MiningDutch } from '@/components/currencyCore/miningPools/BCH.BitcoinCash';

// Pool statistics (no auth required)
const poolStats = await MiningDutch.fetchPoolStats();
console.log('Pool Hashrate:', poolStats?.poolHashrate);
console.log('Active Miners:', poolStats?.miners);

// User statistics by wallet address
const userStats = await MiningDutch.fetchUserStats('your_bch_wallet_address');
console.log('Your Balance:', userStats?.balance);
console.log('Unpaid:', userStats?.unpaid);
```

### 7. Huobi Pool

Mining pool operated by Huobi exchange with exchange integration.

**Features:**
- ⚠️ Requires API Key + Secret (HMAC SHA256)
- ✅ Exchange integration
- ✅ Enterprise-grade services
- ✅ Multi-coin support

**API Documentation:** https://www.huobipool.com/en-us/api

**Example:**
```typescript
import { HuobiPool } from '@/components/currencyCore/miningPools/BCH.BitcoinCash';

const apiKey = 'your_huobi_pool_api_key';
const apiSecret = 'your_huobi_pool_api_secret';

const minerStats = await HuobiPool.fetchMinerStats(apiKey, apiSecret);
console.log('Hashrate:', minerStats?.hashrate);
console.log('Earnings:', minerStats?.earnings);
```

### 8. Foundry USA

Largest North American mining pool with institutional-grade services.

**Features:**
- ⚠️ Enterprise API (requires credentials)
- ✅ Custom pricing and payouts
- ✅ Advanced analytics
- ✅ Dedicated support

**API Documentation:** https://api.foundryusapool.com/docs

**Example:**
```typescript
import { FoundryUSA } from '@/components/currencyCore/miningPools/BCH.BitcoinCash';

const apiKey = 'your_foundry_usa_api_key';

const groupStats = await FoundryUSA.fetchGroupStats(apiKey);
console.log('Group Hashrate:', groupStats?.groupHashrate);
console.log('Total Revenue:', groupStats?.revenue);
```

## 💰 Pricing Data Integration

Mining pools provide hashrate and mining statistics but **do not directly provide BCH price data**. 

For pricing information, use the helper functions or external APIs:

### Using Built-in Helper

```typescript
import { fetchBCHPrice, calculateUSDValue } from '@/components/currencyCore/miningPools/BCH.BitcoinCash';

// Fetch current BCH price
const bchPrice = await fetchBCHPrice();
console.log('BCH Price:', bchPrice, 'USD');

// Calculate USD value of BCH earnings
const earnings = 0.5; // BCH
const usdValue = await calculateUSDValue(earnings);
console.log(`${earnings} BCH = $${usdValue.toFixed(2)} USD`);
```

### External Price APIs

#### CoinGecko (Free, No Auth)
```typescript
const response = await fetch(
  'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin-cash&vs_currencies=usd'
);
const data = await response.json();
const price = data['bitcoin-cash'].usd;
```

#### Binance (Free, No Auth)
```typescript
const response = await fetch(
  'https://api.binance.com/api/v3/ticker/price?symbol=BCHUSDT'
);
const data = await response.json();
const price = parseFloat(data.price);
```

#### Kraken (Free, No Auth)
```typescript
const response = await fetch(
  'https://api.kraken.com/0/public/Ticker?pair=BCHUSD'
);
const data = await response.json();
const price = parseFloat(data.result.BCHUSD.c[0]);
```

## 🔄 Aggregate Statistics

Fetch statistics from multiple pools at once:

```typescript
import { aggregatePoolStats } from '@/components/currencyCore/miningPools/BCH.BitcoinCash';

const aggregated = await aggregatePoolStats();
console.log('Total Pools:', aggregated.pools.length);
console.log('Combined Hashrate:', aggregated.totalHashrate);
console.log('Combined Miners:', aggregated.totalMiners);

aggregated.pools.forEach(pool => {
  console.log(`${pool.name}:`, pool.stats);
});
```

## 🔐 Authentication

Different pools use different authentication methods:

| Pool | Auth Type | Signature Required |
|------|-----------|-------------------|
| ViaBTC | API Key (Bearer) | ❌ No |
| AntPool | API Key + Secret | ✅ HMAC-MD5 |
| F2Pool | Username | ❌ No |
| BTC.com | None (Public) | ❌ No |
| Poolin | API Key (Bearer) | ❌ No |
| Mining-Dutch | None (Public) | ❌ No |
| Huobi Pool | API Key + Secret | ✅ HMAC-SHA256 |
| Foundry USA | API Key (Bearer) | ❌ No |

### Signature Generation Examples

**AntPool (HMAC-MD5):**
```typescript
import * as crypto from 'crypto';

function generateAntPoolSignature(params: Record<string, any>, secret: string): string {
  const paramString = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');
  
  return crypto
    .createHmac('md5', secret)
    .update(paramString)
    .digest('hex')
    .toUpperCase();
}
```

**Huobi Pool (HMAC-SHA256):**
```typescript
import * as crypto from 'crypto';

function generateHuobiSignature(
  method: string,
  host: string,
  path: string,
  params: Record<string, any>,
  secret: string
): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

  const payload = `${method}\n${host}\n${path}\n${sortedParams}`;

  return crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('base64');
}
```

## 📊 Calculating Mining Profitability

```typescript
import { ViaBTCPool, fetchBCHPrice } from '@/components/currencyCore/miningPools/BCH.BitcoinCash';

async function calculateProfitability(walletAddress: string, apiKey: string) {
  // 1. Fetch miner statistics
  const minerStats = await ViaBTCPool.fetchMinerStats(walletAddress, apiKey);
  const earningsBCH = minerStats?.earnings || 0;
  
  // 2. Fetch current BCH price
  const bchPrice = await fetchBCHPrice();
  
  // 3. Calculate USD value
  const earningsUSD = earningsBCH * bchPrice;
  
  console.log(`Earnings: ${earningsBCH} BCH ($${earningsUSD.toFixed(2)} USD)`);
  console.log(`BCH Price: $${bchPrice.toFixed(2)}`);
  
  return {
    earningsBCH,
    earningsUSD,
    bchPrice,
  };
}
```

## 🛠️ Error Handling

All functions include error handling and return `null` or empty arrays on failure:

```typescript
import { F2Pool } from '@/components/currencyCore/miningPools/BCH.BitcoinCash';

const stats = await F2Pool.fetchCoinStats();

if (!stats) {
  console.error('Failed to fetch F2Pool statistics');
  // Handle error
} else {
  console.log('F2Pool Hashrate:', stats.hashrate);
}
```

## 📝 Notes

1. **API Rate Limits:** Be mindful of rate limits on pool APIs. Implement caching for frequently accessed data.
2. **Authentication:** Store API keys securely (environment variables, secure storage).
3. **Public vs. Account APIs:** Public APIs don't require authentication but provide limited data.
4. **Pricing Data:** Always fetch pricing data from reliable sources (exchanges, aggregators).
5. **Network Selection:** Some pools support both mainnet and testnet; specify the correct network.

## 🔗 Additional Resources

- **BCH Blockchain API:** Use `/components/currencyCore/blockchainAPIs/BCH.BitcoinCash` for on-chain data
- **BCH Currency Data:** See `/components/currencyCore/currencies/BCH.BitcoinCash.ts` for wallet operations
- **Mining Pool Stats Aggregators:** 
  - https://miningpoolstats.stream/bitcoincash
  - https://hashrateindex.com/hashrate/pools

## 📄 License

Part of the loginStandard project. See main project LICENSE for details.

