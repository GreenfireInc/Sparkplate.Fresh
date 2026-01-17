# Ethereum (ETH) Oracles

Complete oracle integration guide for Ethereum blockchain data, price feeds, DEX analytics, and smart contract oracles.

## Overview

This directory contains oracle integrations for Ethereum (ETH), the largest smart contract platform with the most mature oracle ecosystem. Ethereum oracles provide decentralized price feeds, blockchain explorer APIs, DEX data, and indexing services for DeFi applications.

## Available Oracles

### Decentralized Oracles

1. **Chainlink** - Industry Standard (Primary)
   - Billions in TVL secured
   - 1000+ decentralized node operators
   - Institutional partnerships (SWIFT, DTCC, UBS, ANZ)
   - Price feeds, VRF, Automation, CCIP
   - Update frequency: ~1 minute

2. **Pyth Network** - High-Frequency (Recommended)
   - 400ms update frequency
   - 70+ data publishers (major exchanges)
   - Confidence intervals included
   - Pull-based model for gas efficiency
   - Ideal for derivatives and high-frequency trading

3. **RedStone** - L2 Optimized
   - Modular architecture
   - Pull-based for gas efficiency
   - Optimized for Layer 2 networks
   - TypeScript-first SDK
   - Lightweight integration

4. **DIA** - Open-Source
   - Transparent methodologies
   - Customizable oracle feeds
   - Verifiable data provenance
   - Historical data access
   - NFT floor price support

### Indexing & GraphQL

5. **The Graph** - Decentralized Indexing (Recommended)
   - GraphQL-based queries
   - Subgraphs for all major DEXs
   - Historical data access
   - Efficient aggregation
   - No API key required

### Block Explorers

6. **Etherscan** - Premier Explorer (Most Comprehensive)
   - Most comprehensive blockchain data
   - Smart contract verification
   - Gas price tracking
   - ENS resolution
   - Free tier: 5 calls/second

### DEX Oracles

7. **Uniswap** - Largest DEX (Primary)
   - $4B+ TVL
   - Comprehensive TypeScript SDK
   - GraphQL subgraphs
   - TWAP oracles
   - Concentrated liquidity (V3)

## Quick Start

### Installation

```bash
# Core dependencies
npm install ethers axios graphql-request graphql

# Chainlink
npm install @chainlink/contracts

# Pyth
npm install @pythnetwork/pyth-sdk-js

# Uniswap
npm install @uniswap/sdk-core @uniswap/v3-sdk

# RedStone
npm install redstone-sdk
```

### Basic Price Feed Examples

#### Chainlink (Industry Standard)
```typescript
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('YOUR_RPC_URL');
const priceFeed = new ethers.Contract(
  '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419', // ETH/USD
  ['function latestAnswer() view returns (int256)'],
  provider
);

const price = await priceFeed.latestAnswer();
console.log('ETH Price:', Number(price) / 1e8);
```

#### Pyth (High-Frequency)
```typescript
import { PythHttpClient } from '@pythnetwork/client';

const client = new PythHttpClient({
  endpoint: 'https://hermes.pyth.network',
});

const feeds = await client.getLatestPriceFeeds([
  '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874508563450', // ETH/USD
]);

console.log('ETH Price:', feeds[0].getPriceUnchecked().price);
```

#### The Graph (DEX Data)
```typescript
import { request, gql } from 'graphql-request';

const query = gql\`
  query {
    token(id: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48") {
      symbol
      derivedETH
      totalValueLockedUSD
    }
  }
\`;

const data = await request(
  'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
  query
);
```

## Use Case Recommendations

### For Wallets
- **Price Display**: Uniswap, Etherscan
- **Transaction History**: Etherscan
- **Gas Estimation**: Etherscan

### For DeFi Protocols
- **Price Oracles**: Chainlink (primary), Pyth (backup)
- **Liquidation Systems**: Pyth (for speed), Chainlink (for security)
- **TWAP Oracles**: Uniswap

### For Trading Applications
- **High-Frequency**: Pyth Network
- **Standard Trading**: Chainlink, Uniswap
- **Arbitrage**: Pyth, Uniswap

### For Analytics Dashboards
- **Historical Data**: The Graph, DIA
- **Real-time Data**: Etherscan, Pyth
- **DEX Analytics**: Uniswap, The Graph

### For L2 Applications
- **Gas Optimization**: RedStone
- **Fast Updates**: Pyth
- **Standard Feeds**: Chainlink

## Oracle Comparison

| Oracle | Update Speed | Gas Cost | Best For | Data Sources |
|--------|-------------|----------|----------|--------------|
| **Chainlink** | ~1 min | Medium | Enterprise DeFi | 1000+ nodes |
| **Pyth** | 400ms | Low | High-frequency | 70+ publishers |
| **Uniswap** | Real-time | Med-High | DEX prices | On-chain pools |
| **The Graph** | 1-5 blocks | Free | Historical data | Subgraphs |
| **Etherscan** | Real-time | Free | Blockchain data | Ethereum node |
| **RedStone** | On-demand | Very Low | L2 applications | Multiple sources |
| **DIA** | Minutes | Free | Open-source | Multi-exchange |

## Network Configuration

### Ethereum Mainnet
- **Chain ID**: 1
- **Native Token**: ETH
- **RPC Endpoints**:
  - Alchemy: `https://eth-mainnet.alchemyapi.io/v2/YOUR_KEY`
  - Infura: `https://mainnet.infura.io/v3/YOUR_KEY`
  - Public: `https://eth.public.zph.link`

## Common Price Feed Addresses

### Chainlink (Mainnet)
```
ETH/USD:  0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419
BTC/USD:  0xF4030086522a5bEEa4988F8cA5B36dbC97beE88c
USDC/USD: 0x8fFfFfd4AfB6115b954Bd29BFD33fa9e603f7717
DAI/USD:  0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1235
USDT/USD: 0x3E7d1eAB13ad0104d2750B8863529e3175eEe394
LINK/USD: 0x2c1d072e956AFFC0D435Cb7AC38EF18d24d9127c
```

### Pyth (Mainnet)
```
ETH/USD:  0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874508563450
BTC/USD:  0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43
USDC/USD: 0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a
```

## Subgraph Endpoints

```
Uniswap V3:  https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3
Uniswap V2:  https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2
SushiSwap:   https://api.thegraph.com/subgraphs/name/sushiswap/exchange
Balancer V2: https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-v2
Curve:       https://api.thegraph.com/subgraphs/name/convex-community/curve-stablecoin
```

## Important Notes

1. **Chainlink** is the industry standard - use for production DeFi
2. **Pyth** is fastest - ideal for derivatives and high-frequency trading
3. **The Graph** is essential for historical DEX data
4. **Etherscan** provides comprehensive blockchain data
5. **Uniswap** has the most liquid trading pairs
6. **RedStone** is best for L2 gas optimization
7. **DIA** offers transparent, open-source data

## Multi-Oracle Strategy

For production applications, use multiple oracles:

```typescript
// Primary: Chainlink (most reliable)
const chainlinkPrice = await getChainlinkPrice();

// Backup: Pyth (faster updates)
const pythPrice = await getPythPrice();

// Validation: Uniswap (on-chain DEX)
const uniswapPrice = await getUniswapPrice();

// Use median or average for security
const finalPrice = median([chainlinkPrice, pythPrice, uniswapPrice]);
```

## Gas Optimization

- **Chainlink**: Read from contract (~21k gas)
- **Pyth**: Pull-based, pay on update (varies)
- **Uniswap**: Swap gas (varies by route)
- **The Graph**: Free (off-chain)
- **Etherscan**: Free (REST API)
- **RedStone**: Very low (optimized)

## Rate Limits

- **Chainlink**: On-chain (no rate limit, gas only)
- **Pyth**: No rate limit (Hermes endpoint)
- **The Graph**: Fair usage policy
- **Etherscan**: 5 calls/second (free tier)
- **Uniswap**: On-chain (gas only) / Subgraph (fair usage)
- **RedStone**: No rate limit
- **DIA**: No rate limit

## Security Considerations

1. **Use multiple oracles** for critical operations
2. **Implement circuit breakers** for price deviations
3. **Check data freshness** (timestamp validation)
4. **Monitor confidence intervals** (Pyth)
5. **Set deviation thresholds** before accepting prices
6. **Test on testnet** before mainnet deployment
7. **Audit oracle-dependent code** thoroughly

## Additional Resources

### Documentation
- Chainlink: https://docs.chain.link/
- Pyth: https://docs.pyth.network/
- The Graph: https://thegraph.com/docs/
- Etherscan: https://docs.etherscan.io/
- Uniswap: https://docs.uniswap.org/
- RedStone: https://docs.redstone.finance/
- DIA: https://docs.diadata.org/

### GitHub Repositories
- Chainlink: https://github.com/smartcontractkit/chainlink
- Pyth: https://github.com/pyth-network
- The Graph: https://github.com/graphprotocol
- Uniswap: https://github.com/Uniswap
- RedStone: https://github.com/redstone-finance
- DIA: https://github.com/diadata-org

### Community
- Chainlink Discord: https://discord.gg/chainlink
- Pyth Discord: https://discord.gg/PythNetwork
- The Graph Discord: https://discord.gg/graphprotocol
- Uniswap Discord: https://discord.gg/uniswap

## License

This oracle integration guide is provided as-is for educational and development purposes.

