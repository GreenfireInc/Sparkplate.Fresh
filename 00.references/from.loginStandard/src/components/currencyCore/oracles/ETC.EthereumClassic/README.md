# Ethereum Classic (ETC) Oracles

Complete oracle integration guide for Ethereum Classic blockchain data, price feeds, and DEX analytics.

## Overview

This directory contains oracle integrations for Ethereum Classic (ETC), providing decentralized price feeds, blockchain explorer APIs, market data, and DEX analytics. Ethereum Classic is EVM-compatible, enabling smart contract oracle solutions similar to Ethereum.

## Available Oracles

### Decentralized Oracles

1. **HebeSwap Oracle** - Native ETC oracle (Primary)
   - Multi-source data aggregation (CoinMarketCap, CoinGecko, Binance, Coinbase, Kraken)
   - Validator-based verification system
   - Smart contract integration for DeFi applications
   - Native Ethereum Classic support

2. **RedStone Oracle** - Direct ETC support (Recommended)
   - Only major oracle with direct ETC price feeds
   - No wrapped tokens required
   - REST API for easy integration
   - Multi-chain support

3. **Chainlink** - Limited native support
   - Collaboration with ETC Labs
   - Primarily for wrapped ETC (wETC) on other chains
   - Cross-chain oracle solution
   - Industry-standard oracle network

### Blockchain Explorers & APIs

4. **Blockscout** - Official ETC explorer (Recommended)
   - Etherscan-compatible API
   - REST and GraphQL support
   - Smart contract verification
   - Open-source and free

5. **BlockCypher** - Multi-chain API
   - Transaction broadcasting
   - Webhook support for real-time notifications
   - Address and transaction queries
   - Free tier: 200 requests/hour

### Market Data APIs

6. **CoinGecko** - Market data (Most reliable)
   - Real-time ETC price data
   - Historical price and volume data
   - Market cap and exchange listings
   - Free API with generous limits

### DEX Aggregators

7. **DEX Screener** - DEX analytics
   - HebeSwap and ETCswap data aggregation
   - Real-time DEX pair tracking
   - Liquidity and volume analytics
   - Token discovery

## Quick Start

### Installation

```bash
npm install ethers axios graphql-request
```

### Basic Price Feed Example

```typescript
import { ethereumClassicCoingeckoOracle } from './oracles/ETC.EthereumClassic';
import axios from 'axios';

// Get ETC price from CoinGecko
async function getETCPrice() {
  const response = await axios.get(
    'https://api.coingecko.com/api/v3/simple/price',
    {
      params: {
        ids: 'ethereum-classic',
        vs_currencies: 'usd',
      },
    }
  );
  return response.data['ethereum-classic'].usd;
}
```

### Blockchain Data Example

```typescript
import { ethereumClassicBlockscoutOracle } from './oracles/ETC.EthereumClassic';
import axios from 'axios';

// Get address balance from Blockscout
async function getBalance(address: string) {
  const response = await axios.get('https://etc.blockscout.com/api', {
    params: {
      module: 'account',
      action: 'balance',
      address,
    },
  });
  return parseFloat(response.data.result) / 1e18; // Convert Wei to ETC
}
```

### DEX Data Example

```typescript
import { ethereumClassicDexscreenerOracle } from './oracles/ETC.EthereumClassic';
import axios from 'axios';

// Get DEX pairs from DEX Screener
async function getETCDexPairs() {
  const response = await axios.get(
    'https://api.dexscreener.com/latest/dex/pairs/ethereumclassic'
  );
  return response.data.pairs;
}
```

## Use Case Recommendations

### For Wallets
- **Price Display**: CoinGecko (reliable, free)
- **Blockchain Data**: Blockscout (official explorer)
- **Transaction Broadcasting**: BlockCypher

### For DeFi Applications
- **Price Oracles**: HebeSwap Oracle (native), RedStone (direct support)
- **Smart Contract Integration**: HebeSwap Oracle
- **Cross-chain Prices**: Chainlink (via wETC)

### For Trading Bots
- **Real-time Prices**: CoinGecko, RedStone
- **Historical Data**: CoinGecko
- **DEX Data**: DEX Screener

### For Analytics
- **Market Data**: CoinGecko
- **DEX Analytics**: DEX Screener
- **Blockchain Stats**: Blockscout

### For Real-time Notifications
- **Webhooks**: BlockCypher (transaction alerts)

## Network Configuration

### Ethereum Classic Mainnet
- **Chain ID**: 61
- **RPC Endpoints**:
  - https://www.ethercluster.com/etc
  - https://etc.rivet.link
  - https://besu-at.etc-network.info

### EVM Compatibility
- Ethereum Classic is fully EVM-compatible
- Use standard Ethereum tools (ethers.js, web3.js)
- Smart contracts written in Solidity/Vyper work on ETC

## Important Notes

1. **HebeSwap Oracle** is the primary native oracle solution for ETC
2. **RedStone** is unique in offering direct ETC price feeds without wrapped tokens
3. **Chainlink** support is limited; use for wrapped ETC on other chains
4. **Blockscout** is the official ETC explorer with Etherscan-compatible API
5. **CoinGecko** provides the most reliable free API for market data
6. **DEX Screener** aggregates data from HebeSwap and ETCswap

## Oracle Comparison

| Oracle | Type | Native ETC | Smart Contracts | Free API | Best For |
|--------|------|------------|----------------|----------|----------|
| HebeSwap Oracle | Decentralized | ✅ Yes | ✅ Yes | ✅ Yes | DeFi price feeds |
| RedStone | Decentralized | ✅ Yes | ⚠️ Limited | ✅ Yes | Direct ETC prices |
| Chainlink | Decentralized | ⚠️ Limited | ✅ Yes | ✅ Yes | Cross-chain wETC |
| Blockscout | Explorer | ✅ Yes | ❌ No | ✅ Yes | Blockchain data |
| BlockCypher | Explorer | ✅ Yes | ❌ No | ✅ Yes | Tx broadcasting |
| CoinGecko | Market Data | ✅ Yes | ❌ No | ✅ Yes | Price tracking |
| DEX Screener | DEX Aggregator | ✅ Yes | ❌ No | ✅ Yes | DEX analytics |

## Rate Limits

- **HebeSwap Oracle**: On-chain (gas limits)
- **RedStone**: Fair usage
- **Chainlink**: On-chain (gas limits)
- **Blockscout**: Free with limits
- **BlockCypher**: 200 requests/hour (free), 3/sec
- **CoinGecko**: 10-50 calls/minute
- **DEX Screener**: Fair usage policy

## Additional Resources

- [Ethereum Classic Official Website](https://ethereumclassic.org/)
- [Blockscout ETC Explorer](https://etc.blockscout.com/)
- [HebeSwap Oracle Documentation](https://oracle.hebeswap.com/)
- [ETC Community Discord](https://discord.gg/ethereumclassic)
- [Ethereum Classic Development Guides](https://ethereumclassic.org/development/guides/)

## License

This oracle integration guide is provided as-is for educational and development purposes.

