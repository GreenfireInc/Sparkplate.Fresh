# Waves (WAVES) Oracles Directory

This directory contains implementations for Waves (WAVES) blockchain oracles that provide off-chain data to smart contracts and dApps.

## Overview

Oracles on Waves operate through **data transactions** - accounts write data entries to their account's data storage on the blockchain, which other accounts and smart contracts can then read. Unlike Ethereum's specialized oracle providers, Waves uses a more decentralized, open approach where any account can become an oracle by publishing data to the blockchain.

**Total Oracles**: 6
**Primary Blockchain**: Waves (WAVES)
**Primary SDK**: @waves/ts-lib-crypto, @waves/waves-transactions

## Included Oracles

### 1. Waves Data Oracle (`wavesData.ts`)
- **Type**: Native Account-Based Oracle
- **Description**: Any account can publish data via data transactions
- **Status**: Active (native blockchain feature)
- **Features**: 
  - Decentralized, account-based
  - No middleman required
  - Permanently stored on blockchain
  - Community-driven data provision
- **Supported Assets**: Any (user-defined)
- **Access**: Via Node REST API
- **API**: `https://nodes.wavesnodes.com/addresses/data/{address}/{key}`
- **Cost**: Free to read, 0.1 WAVES per KB to publish
- **Use Cases**: Custom price feeds, event triggers, custom data
- **URL**: https://docs.waves.tech/en/blockchain/oracle

### 2. Band Protocol (`band.ts`)
- **Type**: Decentralized Oracle Network (Cross-chain)
- **Description**: Decentralized price feeds from multiple sources
- **Status**: Integrated
- **Features**:
  - Aggregated from CoinGecko, CryptoCompare, Binance
  - Decentralized validators
  - Bridge contract on Waves
  - Cross-chain compatibility
- **Supported Assets**: WAVES, BTC, ETH, major cryptocurrencies
- **API**: Via bridge contract on Waves
- **Use Cases**: DeFi (lending, borrowing, stablecoins)
- **URL**: https://bandprotocol.com/

### 3. Swop.fi Oracle (`swopfi.ts`)
- **Type**: DeFi DEX Oracle
- **Description**: Price feeds from Swop.fi AMM DEX
- **Status**: Active
- **Features**:
  - Real-time DEX prices
  - Liquidity pool data
  - dApp state storage
  - Native Waves oracle
- **Contract**: `3PJaDyprveVP7agoN4w3CwvjDoMoH5meDpP`
- **API**: Via account data storage
- **Use Cases**: DeFi price feeds, DEX arbitrage
- **URL**: https://swop.fi/

### 4. Neutrino Oracle (`neutrino.ts`)
- **Type**: DeFi Protocol Oracle
- **Description**: Price feeds from Neutrino stablecoin protocol
- **Status**: Active
- **Features**:
  - Asset price feeds
  - USDN stablecoin data
  - NSBT governance token data
  - dApp state storage
- **Contract**: `3PC9BfRwJWWiw48yoa4Ap6bSqc9c4xUUR5m`
- **API**: Via account data storage
- **Use Cases**: Stablecoin systems, DeFi protocols
- **URL**: https://neutrino.at/

### 5. Waves.Exchange Matcher (`matcher.ts`)
- **Type**: DEX Order Book Oracle
- **Description**: Real-time price feeds from Waves DEX order book
- **Status**: Active
- **Features**:
  - Real-time order book data
  - Trade history
  - OHLCV candles
  - Fixed fees (0.003 WAVES)
- **API**: `https://matcher.waves.exchange/api/v1`
- **Requires**: No authentication for public data
- **Use Cases**: Trading bots, price monitoring, arbitrage
- **URL**: https://waves.exchange/

### 6. Waves Enterprise Oracle (`enterprise.ts`)
- **Type**: Enterprise-Grade Hybrid Blockchain Oracle
- **Description**: Reliable data feeds for permissioned systems
- **Status**: Active (enterprise product)
- **Features**:
  - Enterprise-grade reliability
  - Hybrid blockchain infrastructure
  - Secure data delivery
  - Heterogeneous data sources
- **API**: Waves Enterprise infrastructure
- **Requires**: Enterprise setup
- **Use Cases**: Private/permissioned systems, enterprise DeFi
- **URL**: https://wavesenterprise.com/

## Usage

### Import Waves Oracles
```typescript
// Import from main oracles directory
import {
  wavesDataOracle,
  bandOracle,
  swopfiOracle,
  wavesOraclesLazy,
  wavesOraclesMetadata
} from '@/components/currencyCore/oracles';

// Or import directly from Waves directory
import {
  wavesDataOracle,
  bandOracle,
  swopfiOracle,
  wavesOraclesLazy,
  wavesOraclesMetadata
} from '@/components/currencyCore/oracles/WAVES.Waves';
```

### Lazy Load Oracles
```typescript
// Lazy load specific Waves oracles
const wavesData = await wavesOraclesLazy.wavesData();
const band = await wavesOraclesLazy.band();
const swopfi = await wavesOraclesLazy.swopfi();
```

### Query Oracle Metadata
```typescript
// Get Waves oracle ecosystem information
console.log(wavesOraclesMetadata.totalOracles); // 6
console.log(wavesOraclesMetadata.categories.native); // ['Waves Data Oracle', 'Swop.fi', 'Neutrino']
console.log(wavesOraclesMetadata.features.priceFeeds); // All oracles
```

## Integration Examples

### Read Oracle Data via Node API

```typescript
// Read oracle data from a Waves account's data storage
async function readOracleData(
  oracleAccountAddress: string,
  dataKey: string
) {
  const nodeUrl = 'https://nodes.wavesnodes.com';
  
  const response = await fetch(
    `${nodeUrl}/addresses/data/${oracleAccountAddress}/${dataKey}`
  );
  
  const oracleData = await response.json();
  console.log(`Oracle data for key "${dataKey}":`, oracleData);
  
  return oracleData;
}

// Example: Get WAVES price from Swop.fi oracle
readOracleData('3PJaDyprveVP7agoN4w3CwvjDoMoH5meDpP', 'WAVES_USD');
```

### Query Waves DEX Matcher for Real-Time Prices

```typescript
// Get order book for real-time prices
async function getMatcherPrice(amountAsset: string, priceAsset: string) {
  const matcherUrl = 'https://matcher.waves.exchange/api/v1';
  
  const response = await fetch(
    `${matcherUrl}/orderbook/${amountAsset || 'WAVES'}/${priceAsset || 'WAVES'}?depth=1`
  );
  
  const orderBook = await response.json();
  const bid = orderBook.bids[0]?.price || 0;
  const ask = orderBook.asks[0]?.price || 0;
  const mid = (bid + ask) / 2;
  
  console.log(`${amountAsset}/${priceAsset} - Bid: ${bid}, Ask: ${ask}, Mid: ${mid}`);
  return { bid, ask, mid };
}

// Example: Get WAVES/USDT price
getMatcherPrice('WAVES', '34N9YcEETLWn4QeGT5NSWNzhKQCAJXDW1K5CqPHf3S7A');
```

### Publish Oracle Data

```typescript
import { data } from '@waves/waves-transactions';

// Publish oracle data to blockchain
async function publishOracleData(seed: string, entries: Array<{key: string, value: any}>) {
  const nodeUrl = 'https://nodes.wavesnodes.com';
  
  const dataEntries = entries.map(entry => ({
    key: entry.key,
    type: typeof entry.value === 'number' ? 'integer' : 'string',
    value: entry.value
  }));
  
  const tx = data({ data: dataEntries }, seed);
  
  const response = await fetch(`${nodeUrl}/transactions/broadcast`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tx)
  });
  
  return await response.json();
}

// Example: Publish WAVES price
publishOracleData('YOUR_SEED', [
  { key: 'WAVES_USD', value: 2.50 },
  { key: 'updated', value: Date.now() }
]);
```

## Oracle Comparison

| Oracle | Type | Native Waves | API Key Required | Cost | Best For |
|--------|------|--------------|------------------|------|----------|
| Waves Data Oracle | Account Data | ✅ Yes | ❌ No | 0.1 WAVES/KB | Custom data feeds |
| Band Protocol | Price Oracle | ❌ Cross-chain | ❌ No | Free to read | DeFi price feeds |
| Swop.fi | DEX Oracle | ✅ Yes | ❌ No | Free | DEX prices |
| Neutrino | DeFi Oracle | ✅ Yes | ❌ No | Free | Stablecoin data |
| Matcher | DEX Oracle | ✅ Yes | ❌ No | Free | Real-time trading |
| Waves Enterprise | Enterprise | ✅ Yes | ✅ Yes | Custom | Enterprise systems |

## Key Features by Category

### Price Feeds
- **Swop.fi**: Native DEX, real-time AMM prices
- **Neutrino**: Stablecoin protocol, asset prices
- **Matcher**: Order book, trade history, OHLCV
- **Band Protocol**: Multi-source aggregation

### Real-World Data
- **Waves Data Oracle**: Any custom data via data transactions
- **Waves Enterprise**: IoT, payments, enterprise data

### Use Case Recommendations

**DeFi Applications (Stablecoins, Lending)**
- Primary: Swop.fi (native DEX prices)
- Secondary: Neutrino (stablecoin focus)
- Tertiary: Band Protocol (multi-source validation)

**Trading Bots & Arbitrage**
- Primary: Matcher API (real-time order book)
- Secondary: Swop.fi (AMM prices)

**Custom Data Feeds**
- Primary: Waves Data Oracle (native, flexible)

**Enterprise Applications**
- Primary: Waves Enterprise (reliability, support)

## Integration Best Practices

1. **Multiple Oracle Strategy**: Use multiple oracles for critical applications
2. **Data Freshness**: Always check timestamps on oracle data
3. **Error Handling**: Implement robust fallback mechanisms
4. **Scaling Factors**: Check decimal precision for each oracle
5. **Common Key Patterns**: Use standard naming (WAVES_USD, BTC_USD, etc.)
6. **Rate Limits**: Respect API rate limits
7. **Security**: Validate data sources and account addresses

## Technical Considerations

### Common Data Key Patterns
```
# Single asset prices
{ASSET}_USD        // e.g., WAVES_USD, BTC_USD
{ASSET}            // e.g., WAVES, BTC
price_{ASSET}      // e.g., price_WAVES
{ASSET}_price      // e.g., WAVES_price

# Exchange rates
{ASSET1}_{ASSET2}  // e.g., WAVES_USDT
rate_{ASSET}       // e.g., rate_WAVES

# Metadata
updated            // Last update timestamp
{ASSET}_updated    // Asset-specific timestamp
```

### Update Frequency
- **Waves Data Oracle**: On-demand (user-controlled)
- **Band Protocol**: Every few minutes
- **Swop.fi**: Real-time (per swap)
- **Neutrino**: Real-time (per transaction)
- **Matcher**: Real-time (per order)

### Network Endpoints
- **Mainnet Node**: https://nodes.wavesnodes.com
- **Testnet Node**: https://nodes-testnet.wavesnodes.com
- **Matcher**: https://matcher.waves.exchange/api/v1
- **Data Service**: https://api.wavesprotocol.org/v0

## Resources

### Waves Development
- **Waves Docs**: https://docs.waves.tech/
- **Node REST API**: https://docs.waves.tech/en/waves-node/node-api
- **Waves Transactions**: https://github.com/wavesplatform/waves-transactions-ts
- **Waves Signer**: https://github.com/wavesprotocol/waves-signer
- **Waves Explorer**: https://wavesexplorer.com/

### Oracle-Specific Resources
- **Waves Oracle Concept**: https://docs.waves.tech/en/blockchain/oracle
- **Data Transactions**: https://docs.waves.tech/en/blockchain/transaction-type/data-transaction
- **Band Protocol**: https://docs.bandchain.org/
- **Swop.fi**: https://swop.fi/
- **Neutrino**: https://neutrino.at/
- **Waves.Exchange**: https://waves.exchange/
- **Waves Enterprise**: https://wavesenterprise.com/

### Community
- **Forum**: https://forum.waves.tech/
- **Discord**: https://discord.gg/waves
- **GitHub**: https://github.com/wavesprotocol
- **Twitter**: https://twitter.com/wavesprotocol

## Unique Aspects of Waves Oracles

Unlike Ethereum's centralized oracle providers (Chainlink, Pyth), Waves takes a **democratic, decentralized approach** where:

1. **Any account can be an oracle** - No special permissions needed
2. **Data is permanently on-chain** - Stored in account data storage
3. **Simple key-value model** - Easy to understand and use
4. **Low, fixed fees** - 0.1 WAVES per KB vs variable gas
5. **Native blockchain feature** - No complex smart contracts needed

## Future Developments

- Expanded asset coverage across all oracles
- More DeFi protocol integrations
- Enhanced cross-chain oracle bridges
- Additional oracle providers
- Improved data aggregation standards
- On-chain oracle verification protocols

## Notes

- Waves Data Oracle is the most flexible (any data, any account)
- Swop.fi and Neutrino are the most widely used for DeFi
- Matcher API provides the most real-time data
- Always validate oracle account addresses before using
- Consider using multiple oracles for mission-critical applications
- Test thoroughly on testnet before mainnet deployment

---

For more information on integrating oracles into your Waves application, refer to the individual oracle files in this directory.

