# Ethereum Classic (ETC) Mining Pool Integrations

This directory contains TypeScript integration modules for major Ethereum Classic mining pools. Each module provides API access, documentation links, and helper functions for interacting with pool statistics and miner data.

## Overview

Ethereum Classic uses the Ethash (Etchash) Proof of Work consensus mechanism. Mining pools coordinate the collective hashing power of miners to increase the probability of finding blocks and earning ETC rewards. This collection includes integrations for the largest and most established Ethereum Classic mining pools globally.

## Supported Pools

### 1. **2Miners** (`twoMiners.ts`)
- **Type**: PPLNS
- **Location**: Global
- **Fee**: 1%
- **Min Payout**: 0.1 ETC
- **Description**: Popular ETC mining pool with comprehensive API and low fees
- **Website**: https://etc.2miners.com/
- **API Docs**: https://2miners.com/api/

### 2. **Ethermine** (`ethermine.ts`)
- **Type**: PPLNS
- **Location**: Global
- **Fee**: 1%
- **Min Payout**: 0.1 ETC
- **Description**: One of the largest and most established ETC mining pools
- **Website**: https://etc.ethermine.org/
- **API Docs**: https://etc.ethermine.org/api

### 3. **Nanopool** (`nanopool.ts`)
- **Type**: PPLNS
- **Location**: Global
- **Fee**: 1%
- **Min Payout**: 0.1 ETC
- **Description**: Established multi-currency pool with anonymous mining support
- **Website**: https://etc.nanopool.org/
- **API Docs**: https://etc.nanopool.org/api

### 4. **F2Pool** (`f2Pool.ts`)
- **Type**: PPS
- **Location**: China (Global Operations)
- **Fee**: 2.5%
- **Min Payout**: 0.1 ETC
- **Description**: Large multi-currency pool with PPS payout method
- **Website**: https://www.f2pool.com/coin/etc
- **API Docs**: https://www.f2pool.com/api_doc

### 5. **Flexpool** (`flexpool.ts`)
- **Type**: PPLNS / SOLO
- **Location**: Global
- **Fee**: 0.5% (PPLNS), 3% (SOLO)
- **Min Payout**: 0.05 ETC
- **Description**: Modern, efficient pool with comprehensive API and monitoring
- **Website**: https://flexpool.io/coin/etc
- **API Docs**: https://docs.flexpool.io/

### 6. **ViaBTC** (`viaBtc.ts`)
- **Type**: PPS+ / PPLNS
- **Location**: China (Global Operations)
- **Fee**: 2% (PPS+), 1% (PPLNS)
- **Min Payout**: 0.1 ETC
- **Description**: Multi-currency pool with flexible payout options
- **Website**: https://www.viabtc.com/pool/etc
- **API Docs**: https://www.viabtc.com/api/

### 7. **Hiveon** (`hiveon.ts`)
- **Type**: PPS+
- **Location**: Global
- **Fee**: 0%
- **Min Payout**: 0.1 ETC
- **Description**: Zero-fee pool integrated with Hive OS
- **Website**: https://hiveon.com/pool/
- **API Docs**: https://hiveon.net/api-docs

### 8. **MiningPoolHub** (`miningPoolHub.ts`)
- **Type**: PPLNS
- **Location**: Global
- **Fee**: 0.9%
- **Min Payout**: 0.01 ETC
- **Description**: Multi-algorithm pool with auto-switching capabilities
- **Website**: https://ethereumclassic.miningpoolhub.com/
- **API Docs**: https://miningpoolhub.com/index.php?page=api

## Installation

```bash
npm install ethers axios
```

## Usage Examples

### Fetching Pool Statistics

```typescript
import { TwoMinersPool } from '@/components/currencyCore/miningPools/ETC.EthereumClassic/twoMiners';

// Get pool statistics
const stats = await TwoMinersPool.fetchPoolStats();
console.log('Pool Hashrate:', stats.hashrate);
console.log('Active Miners:', stats.miners);
```

### Fetching Miner Statistics

```typescript
import { EtherminePool } from '@/components/currencyCore/miningPools/ETC.EthereumClassic/ethermine';

// Get miner statistics
const minerAddress = '0xYourETCAddress';
const minerStats = await EtherminePool.fetchMinerStats(minerAddress);
console.log('Miner Hashrate:', minerStats.currentHashrate);
console.log('Unpaid Balance:', minerStats.unpaid);
```

### Fetching ETC Price

```typescript
import { getETCPrice, calculateETCtoUSD } from '@/components/currencyCore/miningPools/ETC.EthereumClassic';

// Get current ETC price
const etcPrice = await getETCPrice();
console.log('ETC Price:', etcPrice, 'USD');

// Calculate USD value
const etcAmount = 10;
const usdValue = await calculateETCtoUSD(etcAmount);
console.log(`${etcAmount} ETC = $${usdValue}`);
```

### Getting All Pool Statistics

```typescript
import { getAllPoolStats } from '@/components/currencyCore/miningPools/ETC.EthereumClassic';

// Get statistics from all pools
const allStats = await getAllPoolStats();
for (const [poolName, stats] of Object.entries(allStats)) {
  console.log(`${poolName}:`, stats.hashrate, 'H/s');
}
```

### Getting Miner Stats Across All Pools

```typescript
import { getMinerStatsAllPools } from '@/components/currencyCore/miningPools/ETC.EthereumClassic';

// Check miner stats across all pools
const minerAddress = '0xYourETCAddress';
const allMinerStats = await getMinerStatsAllPools(minerAddress);

for (const [poolName, stats] of Object.entries(allMinerStats)) {
  console.log(`${poolName}:`, stats);
}
```

### Converting Between ETC and Wei

```typescript
import { formatETCAmount, etcToWei } from '@/components/currencyCore/miningPools/ETC.EthereumClassic';

// Convert Wei to ETC
const weiAmount = '1000000000000000000'; // 1 ETC in Wei
const etcAmount = formatETCAmount(weiAmount);
console.log('ETC Amount:', etcAmount);

// Convert ETC to Wei
const etcValue = 1.5;
const weiValue = etcToWei(etcValue);
console.log('Wei Amount:', weiValue.toString());
```

## API Authentication

Most pool APIs provide public endpoints for pool statistics and individual miner data. However, some pools require authentication:

### F2Pool
- Requires API key for user-specific endpoints
- Obtain from F2Pool dashboard

### ViaBTC
- Requires API key for miner statistics
- Obtain from ViaBTC account settings

### MiningPoolHub
- Requires API key for all user-specific data
- Generate from account settings

## Mining Configuration

Each pool module includes stratum server information for mining configuration:

```typescript
import { EtherminePool } from '@/components/currencyCore/miningPools/ETC.EthereumClassic/ethermine';

console.log('EU Server:', EtherminePool.stratum.eu.host);
console.log('US Server:', EtherminePool.stratum.us.host);
console.log('Asia Server:', EtherminePool.stratum.asia.host);
```

## ETC Price Sources

The `getETCPrice()` helper function tries multiple sources in order:

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
  const stats = await TwoMinersPool.fetchPoolStats();
  if (Object.keys(stats).length === 0) {
    console.error('Failed to fetch pool stats');
  }
} catch (error) {
  console.error('Error:', error);
}
```

## Block Explorers

- **Blockscout**: https://blockscout.com/etc/mainnet/
- **OKLink**: https://www.oklink.com/etc
- **Tokenview**: https://etc.tokenview.io/

## Additional Resources

- **Ethereum Classic Website**: https://ethereumclassic.org/
- **ETC GitHub**: https://github.com/ethereumclassic
- **ETC Discord**: https://discord.gg/ethereumclassic
- **Mining Pool Stats**: https://miningpoolstats.stream/ethereumclassic

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

