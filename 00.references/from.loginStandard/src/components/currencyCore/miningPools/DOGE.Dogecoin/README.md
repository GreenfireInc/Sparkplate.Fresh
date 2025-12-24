# Dogecoin (DOGE) Mining Pool Integrations

This directory contains TypeScript integration modules for major Dogecoin mining pools. Each module provides API access, documentation links, and helper functions for interacting with pool statistics and miner data.

## Overview

Dogecoin mining uses the Scrypt algorithm and is often merged-mined with Litecoin (LTC), allowing miners to earn both DOGE and LTC simultaneously. This collection includes integrations for the largest and most established Dogecoin mining pools globally.

## Supported Pools

### 1. **Prohashing** (`prohashing.ts`)
- **Type**: Multi-Algo / PPS
- **Location**: United States
- **Description**: Multi-algorithm pool with comprehensive API, profit-switching, and multi-coin payouts
- **Special Features**: Developer-friendly API, extensive documentation, flexible payout options
- **Website**: https://prohashing.com/

### 2. **F2Pool** (`f2Pool.ts`)
- **Type**: PPS / PPS+
- **Location**: China (Global Operations)
- **Description**: One of the oldest and largest mining pools, established in 2013
- **Special Features**: Merged mining with LTC, high reliability, large hashrate
- **Website**: https://www.f2pool.com/

### 3. **ViaBTC** (`viaBtc.ts`)
- **Type**: PPS+ / FPPS
- **Location**: China (Global Operations)
- **Description**: Comprehensive multi-currency pool with significant DOGE hashrate
- **Special Features**: REST API with HMAC-SHA256 authentication, merged mining
- **Website**: https://www.viabtc.com/

### 4. **LitecoinPool.org** (`litecoinPool.ts`)
- **Type**: PPS / Merged Mining
- **Location**: Global
- **Description**: Largest merged mining pool for LTC and DOGE
- **Special Features**: Simultaneous LTC and DOGE rewards, extensive JSON API, long-running reliability
- **Website**: https://www.litecoinpool.org/

### 5. **AikaPool** (`aikaPool.ts`)
- **Type**: PPLNS / PPS
- **Location**: Global
- **Description**: Dedicated Dogecoin mining pool
- **Special Features**: Stratum endpoints, public statistics
- **Website**: https://aikapool.com/doge/

### 6. **Poolin** (`poolin.ts`)
- **Type**: FPPS / PPS+
- **Location**: China (Global Operations)
- **Description**: Multi-currency pool with DOGE merged mining
- **Special Features**: Detailed API, merged mining with LTC, modern interface
- **Website**: https://www.poolin.com/

### 7. **ZergPool** (`zergPool.ts`)
- **Type**: Auto-Switching / Multi-Algo
- **Location**: Global
- **Description**: Auto-switching pool for maximum profitability
- **Special Features**: Automatic profit switching, wallet-based API, no registration
- **Website**: https://zergpool.com/

### 8. **2Miners** (`twoMiners.ts`)
- **Type**: PPLNS
- **Location**: Global
- **Description**: Modern multi-coin pool with comprehensive API
- **Special Features**: User-friendly interface, detailed statistics, active community
- **Website**: https://doge.2miners.com/

### 9. **MiningPoolHub** (`miningPoolHub.ts`)
- **Type**: Multi-Coin / Auto-Exchange
- **Location**: Global
- **Description**: Multi-coin platform with auto-exchange features
- **Special Features**: Auto-exchange, profit-switching, HMAC-SHA256 authentication
- **Website**: https://miningpoolhub.com/

### 10. **Multipool** (`multipool.ts`)
- **Type**: Multi-Coin / Auto-Switching
- **Location**: United States
- **Description**: Multi-coin pool supporting Scrypt coins
- **Special Features**: Automatic switching, simple interface
- **Website**: https://www.multipool.us/

## Installation

```bash
npm install @noble/hashes @noble/secp256k1 crypto
```

## Usage Examples

### Basic Pool Statistics

```typescript
import { ProhashingPool } from '@/components/currencyCore/miningPools/DOGE.Dogecoin/prohashing';

// Fetch account statistics (requires API key)
const apiKey = 'your-api-key';
const accountStats = await ProhashingPool.fetchAccountStats(apiKey);
console.log(accountStats);
```

### F2Pool Integration

```typescript
import { F2Pool } from '@/components/currencyCore/miningPools/DOGE.Dogecoin/f2Pool';

// Public coin statistics
const coinStats = await F2Pool.fetchCoinStats();
console.log(coinStats);

// User statistics (username-based, no auth required)
const username = 'your-username';
const userStats = await F2Pool.fetchUserStats(username);
console.log(userStats);
```

### ViaBTC with Authentication

```typescript
import { ViaBTCPool } from '@/components/currencyCore/miningPools/DOGE.Dogecoin/viaBtc';

// Public pool statistics
const poolStats = await ViaBTCPool.fetchPoolStats();
console.log(poolStats);

// Authenticated user statistics (requires API key and signature)
const apiKey = 'your-api-key';
const accessId = 'your-access-id';
const secret = 'your-secret';
const message = 'your-message';
const signature = await ViaBTCPool.generateSignature(secret, message);
const userStats = await ViaBTCPool.fetchUserStats(apiKey, accessId, signature);
console.log(userStats);
```

### Merged Mining with LitecoinPool

```typescript
import { LitecoinPool } from '@/components/currencyCore/miningPools/DOGE.Dogecoin/litecoinPool';

// Fetch user stats (includes both LTC and DOGE rewards)
const apiKey = 'your-litecoinpool-api-key';
const userStats = await LitecoinPool.fetchUserStats(apiKey);
console.log('LTC Balance:', userStats.user.confirmed_rewards);
console.log('DOGE Balance:', userStats.user.doge_confirmed_rewards);
```

### ZergPool (Wallet-Based API)

```typescript
import { ZergPool } from '@/components/currencyCore/miningPools/DOGE.Dogecoin/zergPool';

// Fetch wallet statistics (no authentication required)
const walletAddress = 'your-doge-wallet-address';
const walletStats = await ZergPool.fetchWalletStats(walletAddress);
console.log(walletStats);
```

### 2Miners Address Tracking

```typescript
import { TwoMinersPool } from '@/components/currencyCore/miningPools/DOGE.Dogecoin/twoMiners';

// Pool statistics
const poolStats = await TwoMinersPool.fetchPoolStats();
console.log(poolStats);

// Address statistics
const address = 'your-doge-address';
const addressStats = await TwoMinersPool.fetchAddressStats(address);
console.log(addressStats);

// Payment history
const payments = await TwoMinersPool.fetchPayments(address);
console.log(payments);
```

### Price Helpers

```typescript
import { getDOGEPrice, calculateDogeValue } from '@/components/currencyCore/miningPools/DOGE.Dogecoin';

// Get current DOGE price in USD
const price = await getDOGEPrice();
console.log(`Current DOGE Price: $${price}`);

// Calculate USD value of DOGE amount
const dogeAmount = 1000;
const usdValue = await calculateDogeValue(dogeAmount);
console.log(`${dogeAmount} DOGE = $${usdValue.toFixed(2)}`);
```

## Authentication Methods

Different pools use different authentication methods:

### 1. **API Key (Query Parameter)**
- **Pools**: Prohashing, LitecoinPool
- **Method**: Append `api_key` as query parameter
- **Example**: `https://api.pool.com/stats?api_key=YOUR_KEY`

### 2. **Username-Based (No Auth)**
- **Pools**: F2Pool
- **Method**: Use username in URL path
- **Example**: `https://api.f2pool.com/dogecoin/USERNAME`

### 3. **Wallet Address-Based**
- **Pools**: ZergPool, AikaPool, 2Miners
- **Method**: Use DOGE wallet address for queries
- **Example**: `https://api.pool.com/wallet?address=YOUR_ADDRESS`

### 4. **HMAC-SHA256 Signature**
- **Pools**: ViaBTC, MiningPoolHub
- **Method**: Generate signature using secret key
- **Implementation**: See individual pool files for signature generation

### 5. **Header-Based API Key**
- **Pools**: Poolin
- **Method**: Pass API key in Authorization header
- **Example**: `Authorization: Bearer YOUR_KEY`

## Pool Comparison

| Pool | Type | Merged Mining | Min Payout | API Quality | Auth Method |
|------|------|---------------|------------|-------------|-------------|
| Prohashing | Multi-Algo | Yes | 1 DOGE | Excellent | API Key |
| F2Pool | PPS+ | Yes | 100 DOGE | Good | Username |
| ViaBTC | PPS+ | Yes | 100 DOGE | Excellent | HMAC-SHA256 |
| LitecoinPool | PPS | Yes | 100 DOGE | Excellent | API Key |
| AikaPool | PPLNS | No | 50 DOGE | Limited | Address |
| Poolin | FPPS | Yes | 100 DOGE | Good | Header Key |
| ZergPool | Auto-Switch | No | 0.5 DOGE | Good | Address |
| 2Miners | PPLNS | No | 100 DOGE | Excellent | Address |
| MiningPoolHub | Multi-Coin | No | 0.001 DOGE | Good | HMAC-SHA256 |
| Multipool | Auto-Switch | No | 100 DOGE | Limited | Address |

## Merged Mining Explained

Merged mining allows miners to mine multiple cryptocurrencies simultaneously without additional computational cost:

- **Primary Coin**: Usually Litecoin (LTC)
- **Auxiliary Coin**: Dogecoin (DOGE)
- **Benefit**: Earn both LTC and DOGE rewards with the same hashpower
- **Pools Supporting Merged Mining**: LitecoinPool, F2Pool, ViaBTC, Poolin, Prohashing

## Error Handling

All API functions include error handling and return empty objects on failure:

```typescript
try {
  const stats = await SomePool.fetchPoolStats();
  if (Object.keys(stats).length === 0) {
    console.warn('Failed to fetch pool statistics');
  } else {
    console.log('Pool stats:', stats);
  }
} catch (error) {
  console.error('Error:', error);
}
```

## Rate Limiting

Most pools implement rate limiting. Best practices:

1. **Cache Results**: Cache API responses for 30-60 seconds
2. **Exponential Backoff**: Implement retry logic with increasing delays
3. **Respect Limits**: Follow each pool's documented rate limits
4. **Batch Requests**: Combine multiple queries when possible

## Testing

Test pool integrations with demo/test accounts before production use:

```typescript
// Example test function
async function testPoolIntegration() {
  try {
    // Test public endpoints first
    const poolStats = await F2Pool.fetchCoinStats();
    console.log('✓ Public API working');
    
    // Test authenticated endpoints with test credentials
    if (process.env.TEST_API_KEY) {
      const userStats = await ProhashingPool.fetchAccountStats(process.env.TEST_API_KEY);
      console.log('✓ Authenticated API working');
    }
  } catch (error) {
    console.error('✗ Test failed:', error);
  }
}
```

## Security Considerations

1. **API Keys**: Never commit API keys to version control
2. **Environment Variables**: Store sensitive data in `.env` files
3. **HTTPS Only**: All pool APIs use HTTPS
4. **Validate Responses**: Always validate API response structure
5. **Rate Limiting**: Implement proper rate limiting to avoid bans

## Additional Resources

- **Dogecoin Official**: https://dogecoin.com/
- **Dogecoin Core**: https://github.com/dogecoin/dogecoin
- **Mining Calculator**: https://www.coinwarz.com/mining/dogecoin
- **Network Hashrate**: https://bitinfocharts.com/dogecoin/
- **Pool Comparison**: https://miningpoolstats.stream/dogecoin

## Support

For pool-specific issues:
- Check individual pool documentation and help pages
- Contact pool support through their official channels
- Join pool communities (Discord, Telegram, Reddit)

For integration issues:
- Review the TypeScript files in this directory
- Check API documentation links provided in each pool file
- Ensure all required dependencies are installed

## Contributing

When adding new pools:
1. Follow the existing file structure and naming conventions (camelCase)
2. Include comprehensive TypeScript types
3. Add proper error handling
4. Document authentication methods
5. Update this README with the new pool information

## License

This integration code is provided as-is for use within the loginStandard application.

