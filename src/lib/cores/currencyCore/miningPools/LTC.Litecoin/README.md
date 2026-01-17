# Litecoin (LTC) Mining Pool Integrations

This directory contains TypeScript integration modules for major Litecoin mining pools. Each module provides API access, documentation links, and helper functions for interacting with pool statistics and miner data.

## Overview

Litecoin uses the Scrypt Proof of Work consensus mechanism. Mining pools coordinate the collective hashing power of miners to increase the probability of finding blocks and earning LTC rewards. Many pools also support merged mining with Dogecoin (DOGE), allowing miners to earn both LTC and DOGE simultaneously. This collection includes integrations for the largest and most established Litecoin mining pools globally.

## Supported Pools

### 1. **Litecoinpool.org** (`litecoinpool.ts`)
- **Type**: PPS (Pay Per Share)
- **Location**: Global
- **Fee**: 0% (donations accepted)
- **Min Payout**: 0.01 LTC
- **Description**: Oldest and most trusted LTC pool with merged mining (LTC + DOGE)
- **Website**: https://www.litecoinpool.org/
- **API Docs**: https://www.litecoinpool.org/help/api

### 2. **F2Pool** (`f2Pool.ts`)
- **Type**: PPS
- **Location**: China (Global Operations)
- **Fee**: 2.5%
- **Min Payout**: 0.001 LTC
- **Description**: Large multi-currency pool with LTC and DOGE merged mining
- **Website**: https://www.f2pool.com/coin/litecoin
- **API Docs**: https://www.f2pool.com/api_doc

### 3. **ViaBTC** (`viaBtc.ts`)
- **Type**: FPPS / PPLNS
- **Location**: China (Global Operations)
- **Fee**: 2% (FPPS), 1% (PPLNS)
- **Min Payout**: 0.01 LTC
- **Description**: Multi-currency pool with flexible payout options
- **Website**: https://www.viabtc.com/pool/ltc
- **API Docs**: https://viabtc.github.io/api_en/

### 4. **Prohashing** (`prohashing.ts`)
- **Type**: PPS
- **Location**: United States
- **Fee**: 4.99%
- **Min Payout**: Varies by currency
- **Description**: U.S.-based multipool with payouts in any currency (BTC, LTC, USD)
- **Website**: https://prohashing.com/
- **API Docs**: https://prohashing.com/help/prohashing-api-developing

### 5. **Poolin** (`poolin.ts`)
- **Type**: PPS+ / FPPS / PPLNS
- **Location**: China (Global Operations)
- **Fee**: 2.5% (varies by mode)
- **Min Payout**: 0.01 LTC
- **Description**: Large pool with multiple payout modes and mining tools
- **Website**: https://www.poolin.com/pool/ltc
- **API Docs**: https://poolin.com/en/help/api

### 6. **AntPool** (`antPool.ts`)
- **Type**: PPS+
- **Location**: China (Global Operations)
- **Fee**: 2.5%
- **Min Payout**: 0.001 LTC
- **Description**: Major pool operated by Bitmain with merged mining
- **Website**: https://www.antpool.com/
- **API Docs**: https://www.antpool.com/help.html#/api

### 7. **2Miners** (`twoMiners.ts`)
- **Type**: SOLO / PPLNS
- **Location**: Global
- **Fee**: 1%
- **Min Payout**: 0.05 LTC
- **Description**: Transparent and beginner-friendly platform
- **Website**: https://ltc.2miners.com/
- **API Docs**: https://2miners.com/api/

## Installation

```bash
npm install axios
```

## Usage Examples

### Fetching Pool Statistics

```typescript
import { TwoMinersLtc } from '@/components/currencyCore/miningPools/LTC.Litecoin/twoMiners';

// Get pool statistics
const stats = await TwoMinersLtc.fetchPoolStats();
console.log('Pool Hashrate:', stats.hashrate);
console.log('Active Miners:', stats.miners);
```

### Fetching Miner Statistics

```typescript
import { TwoMinersLtc } from '@/components/currencyCore/miningPools/LTC.Litecoin/twoMiners';

// Get miner statistics
const minerAddress = 'your-ltc-address';
const minerStats = await TwoMinersLtc.fetchMinerStats(minerAddress);
console.log('Miner Hashrate:', minerStats.hashrate);
console.log('Unpaid Balance:', minerStats.balance);
```

### Fetching LTC Price

```typescript
import { getLTCPrice, calculateLTCtoUSD } from '@/components/currencyCore/miningPools/LTC.Litecoin';

// Get current LTC price
const ltcPrice = await getLTCPrice();
console.log('LTC Price:', ltcPrice, 'USD');

// Calculate USD value
const ltcAmount = 10;
const usdValue = await calculateLTCtoUSD(ltcAmount);
console.log(`${ltcAmount} LTC = $${usdValue}`);
```

### Getting All Pool Statistics

```typescript
import { getAllPoolStats } from '@/components/currencyCore/miningPools/LTC.Litecoin';

// Get statistics from all pools
const allStats = await getAllPoolStats();
for (const [poolName, stats] of Object.entries(allStats)) {
  console.log(`${poolName}:`, stats.hashrate, 'H/s');
}
```

### Converting Between LTC and Satoshis

```typescript
import { formatLTCAmount, ltcToSatoshis } from '@/components/currencyCore/miningPools/LTC.Litecoin';

// Convert satoshis to LTC
const satoshis = '100000000'; // 1 LTC in satoshis
const ltcAmount = formatLTCAmount(satoshis);
console.log('LTC Amount:', ltcAmount);

// Convert LTC to satoshis
const ltcValue = 1.5;
const satoshiValue = ltcToSatoshis(ltcValue);
console.log('Satoshi Amount:', satoshiValue.toString());
```

## API Authentication

Different pools have different authentication requirements:

### Litecoinpool.org
- Requires API key from account settings
- Simple API key parameter in URL

### F2Pool
- Requires API key for user-specific endpoints
- Bearer token authentication

### ViaBTC
- Requires API key for miner statistics
- Bearer token in headers

### Prohashing
- Requires API key for all endpoints
- API key as URL parameter

### Poolin
- Requires API key for user-specific data
- Bearer token authentication

### AntPool
- Requires HMAC-MD5 authentication
- Complex signature generation required

### 2Miners
- Public API (no authentication required)
- Open access to pool and miner statistics

## Mining Configuration

Each pool module includes stratum server information for mining configuration:

```typescript
import { F2PoolLtc } from '@/components/currencyCore/miningPools/LTC.Litecoin/f2Pool';

console.log('Server:', F2PoolLtc.stratum.host);
console.log('Port:', F2PoolLtc.stratum.port);
```

## Merged Mining

Most major Litecoin pools support merged mining with Dogecoin, allowing miners to earn both LTC and DOGE rewards simultaneously without additional computational effort:

- **Litecoinpool.org**: ✅ Merged mining (LTC + DOGE)
- **F2Pool**: ✅ Merged mining (LTC + DOGE)
- **ViaBTC**: ✅ Merged mining (LTC + DOGE)
- **Poolin**: ✅ Merged mining (LTC + DOGE)
- **AntPool**: ✅ Merged mining (LTC + DOGE)

## LTC Price Sources

The `getLTCPrice()` helper function tries multiple sources in order:

1. **CoinGecko API** - Primary source
2. **Binance API** - First fallback
3. **Kraken API** - Second fallback

This ensures reliable price data even if one source is unavailable.

## Rate Limiting

All APIs have rate limits. Best practices:

- Cache responses when possible
- Implement exponential backoff for retries
- Use batch endpoints when available
- Monitor rate limit headers in responses

## Error Handling

All API functions include built-in error handling and return empty objects on failure. Implement additional error handling as needed:

```typescript
try {
  const stats = await TwoMinersLtc.fetchPoolStats();
  if (Object.keys(stats).length === 0) {
    console.error('Failed to fetch pool stats');
  }
} catch (error) {
  console.error('Error:', error);
}
```

## Block Explorers

- **Blockchair**: https://blockchair.com/litecoin
- **BlockCypher**: https://live.blockcypher.com/ltc/
- **Litecoin Space**: https://litecoinspace.org/
- **SoChain**: https://chain.so/ltc

## Litecoin Features

### Scrypt Algorithm
- Litecoin uses the Scrypt hashing algorithm instead of SHA-256
- Requires different mining hardware (typically GPUs or ASIC miners designed for Scrypt)

### Faster Block Times
- Block time: ~2.5 minutes (4x faster than Bitcoin)
- Faster transaction confirmations

### Larger Supply
- Total supply: 84 million LTC (4x Bitcoin's supply)

### SegWit and Lightning Network
- Native SegWit support (P2WPKH addresses with 'ltc1' prefix)
- Lightning Network compatibility for instant payments

### MWEB (MimbleWimble Extension Block)
- Optional privacy layer for confidential transactions
- Addresses starting with 'ltc1mweb'

## Additional Resources

- **Litecoin Website**: https://litecoin.org/
- **Litecoin GitHub**: https://github.com/litecoin-project/litecoin
- **Litecoin Foundation**: https://litecoin-foundation.org/
- **Mining Pool Stats**: https://miningpoolstats.stream/litecoin

## Contributing

When adding new pool integrations:

1. Create a new file in camelCase (e.g., `newPool.ts`)
2. Follow the existing structure and patterns
3. Include all API endpoints and documentation links
4. Add TypeScript integration functions
5. Update `index.ts` to export the new pool
6. Update this README with pool information

## License

This integration module is part of the loginStandard project.

## Support

For issues or questions:
- Check pool-specific API documentation
- Verify API endpoints are current
- Ensure proper authentication when required
- Monitor rate limits and implement appropriate delays

---

**Last Updated**: October 2025

