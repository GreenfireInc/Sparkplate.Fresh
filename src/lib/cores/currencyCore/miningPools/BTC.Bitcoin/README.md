# Bitcoin (BTC) Mining Pool Integrations

This directory contains TypeScript integration modules for major Bitcoin mining pools. Each module provides API access, documentation links, and helper functions for interacting with pool statistics and miner data.

## Overview

Bitcoin mining pools coordinate the collective hashing power of miners to increase the probability of finding blocks and earning rewards. This collection includes integrations for the largest and most established Bitcoin mining pools globally.

## Supported Pools

### 1. **Foundry USA** (`foundryUsa.ts`)
- **Type**: FPPS (Full Pay Per Share)
- **Location**: United States
- **Description**: One of the largest Bitcoin mining pools globally with enterprise-grade infrastructure
- **Special Features**: Institutional custody options, advanced analytics
- **Website**: https://foundrydigital.com/

### 2. **AntPool** (`antPool.ts`)
- **Type**: PPS+ / PPLNS
- **Location**: China (Global Operations)
- **Description**: Major mining pool operated by Bitmain, established in 2014
- **Authentication**: HMAC-MD5 signature required
- **Website**: https://www.antpool.com/

### 3. **F2Pool** (`f2Pool.ts`)
- **Type**: PPS+
- **Location**: China (Global Operations)
- **Description**: One of the oldest Bitcoin mining pools (since 2013)
- **Special Features**: Comprehensive public API, multi-currency support
- **Website**: https://www.f2pool.com/

### 4. **ViaBTC** (`viaBtc.ts`)
- **Type**: PPS+ / FPPS
- **Location**: China (Global Operations)
- **Description**: Multi-currency mining pool with REST and WebSocket APIs
- **Special Features**: Open-source mining server software
- **Website**: https://www.viabtc.com/

### 5. **Binance Pool** (`binancePool.ts`)
- **Type**: FPPS
- **Location**: Global
- **Description**: Mining pool operated by Binance exchange
- **Authentication**: HMAC SHA256 signature required
- **Special Features**: Seamless integration with Binance trading platform
- **Website**: https://pool.binance.com/

### 6. **Braiins Pool** (`braiinsPool.ts`)
- **Type**: FPPS / PPLNS
- **Location**: Czech Republic (Global Operations)
- **Description**: The first Bitcoin mining pool (formerly Slush Pool, established 2010)
- **Special Features**: Creator of Stratum V2 protocol, Braiins OS firmware
- **Website**: https://braiins.com/pool

### 7. **Luxor** (`luxor.ts`)
- **Type**: FPPS
- **Location**: United States
- **Description**: North American pool with institutional-grade infrastructure
- **Special Features**: Hashrate Index data provider, advanced analytics
- **Website**: https://luxor.tech/

## Installation

All required dependencies should already be installed in the project. The modules use standard `fetch` API for HTTP requests and Node.js `crypto` module for authentication.

```bash
npm install  # Install project dependencies
```

## Usage Examples

### Import a Single Pool

```typescript
import { F2Pool } from '@/components/currencyCore/miningPools/BTC.Bitcoin/f2Pool';

// Fetch public pool statistics
const poolStats = await F2Pool.fetchCoinStats();
console.log(poolStats);

// Fetch user statistics (requires authentication)
const userStats = await F2Pool.fetchUserStats('your-username', 'your-api-key');
console.log(userStats);
```

### Import All Pools

```typescript
import { 
  FoundryUSAPool, 
  AntPool, 
  F2Pool, 
  ViaBTCPool,
  BinancePool,
  BraiinsPool,
  LuxorPool
} from '@/components/currencyCore/miningPools/BTC.Bitcoin';

// Get pool stats from multiple pools
const foundryStats = await FoundryUSAPool.fetchPoolStats();
const viaBtcStats = await ViaBTCPool.fetchPoolStats();
```

### Use Helper Functions

```typescript
import { getBTCPrice, calculateBTCtoUSD } from '@/components/currencyCore/miningPools/BTC.Bitcoin';

// Get current BTC price in USD
const btcPrice = await getBTCPrice();
console.log(`BTC Price: $${btcPrice}`);

// Calculate USD value from BTC amount
const usdValue = await calculateBTCtoUSD(0.5);
console.log(`0.5 BTC = $${usdValue}`);
```

## Authentication

Different pools use different authentication mechanisms:

### HMAC-MD5 (AntPool)
```typescript
import { AntPool } from '@/components/currencyCore/miningPools/BTC.Bitcoin/antPool';

const apiKey = 'your-api-key';
const secretKey = 'your-secret-key';

const accountStats = await AntPool.fetchAccountStats(apiKey, secretKey);
```

### HMAC SHA256 (Binance Pool)
```typescript
import { BinancePool } from '@/components/currencyCore/miningPools/BTC.Bitcoin/binancePool';

const apiKey = 'your-binance-api-key';
const secretKey = 'your-binance-secret-key';

const earnings = await BinancePool.fetchEarnings(apiKey, secretKey);
```

### Bearer Token (Luxor)
```typescript
import { LuxorPool } from '@/components/currencyCore/miningPools/BTC.Bitcoin/luxor';

const apiKey = 'your-luxor-api-key';

const miningStats = await LuxorPool.fetchMiningStats(apiKey);
```

### API Token (Braiins Pool)
```typescript
import { BraiinsPool } from '@/components/currencyCore/miningPools/BTC.Bitcoin/braiinsPool';

const apiToken = 'your-api-token';

const accountStats = await BraiinsPool.fetchAccountStats(apiToken);
```

## API Rate Limits

Be mindful of API rate limits when making requests:

- **F2Pool**: Generally permissive for public endpoints
- **AntPool**: Check official documentation for limits
- **ViaBTC**: Rate limits apply to authenticated endpoints
- **Binance Pool**: Standard Binance API rate limits apply
- **Braiins Pool**: Reasonable limits for account data
- **Luxor**: Contact pool for enterprise limits

## Common Operations

### Fetch Pool Statistics

```typescript
// Example with ViaBTC
import { ViaBTCPool } from '@/components/currencyCore/miningPools/BTC.Bitcoin/viaBtc';

async function getPoolInfo() {
  const stats = await ViaBTCPool.fetchPoolStats();
  console.log('Pool Hashrate:', stats.hash_rate);
  console.log('Active Miners:', stats.miners);
  console.log('Blocks Found:', stats.blocks_24h);
}
```

### Monitor Miner Performance

```typescript
// Example with F2Pool
import { F2Pool } from '@/components/currencyCore/miningPools/BTC.Bitcoin/f2Pool';

async function monitorMiner(username: string, apiKey: string) {
  const stats = await F2Pool.fetchUserStats(username, apiKey);
  console.log('Current Hashrate:', stats.hash_rate);
  console.log('Total Earnings:', stats.total_paid);
  console.log('Unpaid Balance:', stats.unpaid);
}
```

### Track Recent Blocks

```typescript
// Example with Foundry USA
import { FoundryUSAPool } from '@/components/currencyCore/miningPools/BTC.Bitcoin/foundryUsa';

async function trackBlocks() {
  const blocks = await FoundryUSAPool.fetchRecentBlocks();
  blocks.forEach(block => {
    console.log(`Block ${block.height}: ${block.hash}`);
  });
}
```

## Payout Methods Explained

- **PPS (Pay Per Share)**: Fixed payout per share submitted, pool takes risk
- **PPS+**: PPS plus transaction fees from blocks
- **FPPS (Full Pay Per Share)**: Includes block reward and transaction fees
- **PPLNS (Pay Per Last N Shares)**: Variance-based, rewards proportional to shares in last N shares

## Pool Fees

| Pool | Fee | Payout Method |
|------|-----|---------------|
| Foundry USA | Competitive | FPPS |
| AntPool | 2.5% (PPS+), 1% (PPLNS) | PPS+ / PPLNS |
| F2Pool | 2.5% | PPS+ |
| ViaBTC | 2% (PPS+), 1.5% (FPPS) | PPS+ / FPPS |
| Binance Pool | 1.5% | FPPS |
| Braiins Pool | 2% | FPPS |
| Luxor | Contact Pool | FPPS |

## Minimum Payouts

| Pool | Minimum Payout |
|------|----------------|
| AntPool | 0.001 BTC |
| F2Pool | 0.001 BTC |
| ViaBTC | 0.001 BTC |
| Binance Pool | 0.0001 BTC (to Binance account) |
| Braiins Pool | 0.001 BTC |
| Foundry USA | Contact Pool |
| Luxor | Contact Pool |

## Error Handling

All API functions include error handling and will return empty objects/arrays on failure:

```typescript
try {
  const stats = await F2Pool.fetchCoinStats();
  if (Object.keys(stats).length === 0) {
    console.log('Failed to fetch stats or no data available');
  }
} catch (error) {
  console.error('Error:', error);
}
```

## Resources

### General Bitcoin Mining
- Bitcoin Mining Explained: https://bitcoin.org/en/how-it-works
- Mining Pool Statistics: https://miningpoolstats.stream/bitcoin

### Pool-Specific Documentation
- Foundry USA: https://foundrydigital.com/api-docs
- AntPool: https://www.antpool.com/userApiGuide
- F2Pool: https://www.f2pool.com/developer/api
- ViaBTC: https://www.viabtc.com/api/
- Binance Pool: https://binance-docs.github.io/apidocs/pool/en/
- Braiins Pool: https://docs.braiins.com/pool/
- Luxor: https://docs.luxor.tech/public-api/

### Mining Economics
- Hashrate Index: https://hashrateindex.com/
- Bitcoin Mining Council: https://bitcoinminingcouncil.com/

## Contributing

When adding new pools or updating existing integrations:

1. Follow the existing TypeScript structure
2. Include comprehensive error handling
3. Document authentication requirements
4. Provide usage examples
5. Update this README with pool information

## Notes

- All pools support SHA-256 algorithm (Bitcoin mining)
- API keys and secrets should be stored securely (use environment variables)
- Consider implementing caching for frequently accessed data
- Monitor API changes and update integrations accordingly
- Some pools may require registration before API access

## Support

For pool-specific issues:
- Check the official pool documentation
- Contact pool support teams
- Join pool communities (Telegram, Discord)

For integration issues:
- Review the TypeScript module for the specific pool
- Check error messages and API responses
- Ensure authentication credentials are correct

## License

These integrations are part of the loginStandard project. Refer to the main project license for usage terms.

