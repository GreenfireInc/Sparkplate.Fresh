# Stacks (STX) Oracle Integration

Comprehensive oracle integration for Stacks blockchain (Bitcoin Layer 2), providing real-time price feeds, DEX pricing, blockchain data, and market analytics for Bitcoin DeFi applications.

## Available Oracles

### 1. **Pyth Network** (Primary - High-Frequency Oracle)
- **Type**: Decentralized Oracle Network
- **Latency**: 400ms updates
- **Best For**: Real-time trading, DeFi protocols, high-frequency pricing
- **Features**:
  - Sub-second price updates (400ms)
  - 400+ real-time price feeds
  - 90+ first-party data publishers
  - Confidence intervals included
  - Pull-based oracle model
  - Wormhole bridge integration
  - Clarity smart contract support
- **Cost**: Free
- **Reliability**: ⭐⭐⭐⭐⭐ (Industry standard)

### 2. **DIA** (Primary - Customizable Oracle)
- **Type**: Decentralized Information Asset Oracle
- **Latency**: Medium
- **Best For**: Custom oracle solutions, historical analysis, analytics
- **Features**:
  - Customizable price feeds
  - 90+ data source markets
  - 3,000+ supported tokens
  - Transparent methodology
  - REST and GraphQL APIs
  - OHLC and historical data
  - Supply tracking
- **Cost**: Free
- **Reliability**: ⭐⭐⭐⭐

### 3. **ALEX** (Primary - DEX Pricing)
- **Type**: Decentralized Exchange & DeFi Platform
- **Latency**: Near-instant
- **Best For**: DEX-based pricing, liquidity analytics, Bitcoin DeFi
- **Features**:
  - AMM + orderbook hybrid
  - Deep liquidity pools
  - Lending and borrowing
  - Launchpad for new tokens
  - Real-time price discovery
  - Staking and yield farming
- **Cost**: Free
- **Reliability**: ⭐⭐⭐⭐⭐

### 4. **Hiro** (Secondary - Blockchain API)
- **Type**: Official Stacks Blockchain API
- **Latency**: Low
- **Best For**: Blockchain data, transaction tracking, smart contracts
- **Features**:
  - Official Stacks API
  - Real-time transaction data
  - Smart contract queries
  - Account balance tracking
  - Stacking information
  - Explorer integration
- **Cost**: Free tier (rate limited)
- **Reliability**: ⭐⭐⭐⭐⭐

### 5. **CoinGecko** (Tertiary - Market Data)
- **Type**: Market Data Aggregator
- **Latency**: 1-2 minute delay
- **Best For**: Historical data, market analytics, portfolio tracking
- **Features**:
  - Data from 600+ exchanges
  - Historical price charts
  - Market cap and volume tracking
  - Multi-currency support
  - Exchange listings
  - Developer/community stats
- **Cost**: Free tier (10-50 calls/min)
- **Reliability**: ⭐⭐⭐⭐⭐

## Use Case Recommendations

| Use Case | Primary Oracle | Fallback | Notes |
|----------|---------------|----------|-------|
| **Real-time Trading** | Pyth Network | ALEX | Sub-second updates critical |
| **DeFi Protocol Pricing** | Pyth Network | DIA, ALEX | Use multiple for validation |
| **DEX Price Discovery** | ALEX | Pyth Network | Best execution routing |
| **Custom Oracle Feeds** | DIA | Pyth Network | Flexible configuration |
| **Transaction Tracking** | Hiro | N/A | Official blockchain API |
| **Historical Analysis** | CoinGecko | DIA | Comprehensive historical data |
| **Portfolio Valuation** | CoinGecko | ALEX | Market data + real-time |
| **Bitcoin DeFi** | Pyth Network | ALEX | Leverages Bitcoin security |
| **Blockchain Exploration** | Hiro | N/A | Free API access |

## Integration Patterns

### Pattern 1: High-Frequency Trading
```typescript
import { pythOracle } from './oracles/STX.Stacks';

// Primary: Pyth Network (400ms updates via Wormhole)
// Fallback: ALEX (DEX-based pricing)
```

### Pattern 2: DeFi Protocol Integration
```typescript
import { pythOracle, alexOracle } from './oracles/STX.Stacks';

// Primary: Pyth Network (decentralized oracle)
// Secondary: ALEX (DEX liquidity)
// Validation: Compare both for accuracy
```

### Pattern 3: Wallet/Portfolio Application
```typescript
import { hiroOracle, coinGeckoOracle } from './oracles/STX.Stacks';

// Blockchain Data: Hiro (official API)
// Market Data: CoinGecko
```

### Pattern 4: Market Analytics Dashboard
```typescript
import { coinGeckoOracle, diaOracle } from './oracles/STX.Stacks';

// Market Data: CoinGecko
// Historical: DIA
```

## Quick Start

### Installation
```bash
# Pyth Network (Stacks integration)
npm install @stacks/transactions @stacks/network @pythnetwork/client

# DIA Oracle
npm install axios

# ALEX DEX
npm install @stacks/transactions axios

# Hiro API
npm install @stacks/blockchain-api-client @stacks/transactions @stacks/network

# General API access
npm install axios
```

### Basic Usage
```typescript
import {
  pythOracle,
  alexOracle,
  coinGeckoOracle,
} from './oracles/STX.Stacks';

// Example: Get STX price from multiple sources
async function getSTXPrice() {
  // High-frequency oracle
  const pythPrice = await getPythSTXPrice();
  
  // DEX-based price
  const alexPrice = await getALEXSTXPrice();
  
  // Market data
  const coingeckoPrice = await getCoinGeckoSTXPrice();
  
  console.log('Pyth:', pythPrice);
  console.log('ALEX:', alexPrice);
  console.log('CoinGecko:', coingeckoPrice);
}
```

## Stacks-Specific Features

### Bitcoin Layer 2 Architecture
- Stacks is Bitcoin's largest Layer 2 with smart contract capabilities
- Inherits Bitcoin's security through Proof of Transfer (PoX) consensus
- Transactions are anchored to Bitcoin blocks for finality
- Native Bitcoin integration via Clarity smart contracts

### Proof of Transfer (PoX)
- Miners commit Bitcoin to participate in Stacks mining
- STX holders can "Stack" (lock) STX to earn Bitcoin rewards
- Consensus mechanism directly tied to Bitcoin security

### Clarity Smart Contracts
- Decidable smart contract language (prevents common vulnerabilities)
- Native support for Bitcoin transactions
- Pyth oracle integration via Wormhole bridge to Clarity contracts

### Bitcoin DeFi Integration
- ALEX and other DEXs enable Bitcoin DeFi without wrapping
- Pyth Network provides price feeds for Bitcoin-secured applications
- Native Bitcoin collateral support in lending protocols

## Rate Limits & Costs

| Oracle | Free Tier | Rate Limit | API Key Required |
|--------|-----------|------------|------------------|
| Pyth Network | ✅ Unlimited | None (on-chain) | No |
| DIA | ✅ Unlimited | Varies | No |
| ALEX | ✅ Unlimited | Variable | No |
| Hiro | ✅ Limited | Rate limited | Optional (recommended) |
| CoinGecko | ✅ 10-50/min | 10-50 calls/min | Optional |

## Important Notes

- **For Production DeFi**: Use decentralized oracles (Pyth/DIA)
- **Price Validation**: Always compare multiple oracle sources
- **Latency Requirements**: Choose oracle based on update frequency needs
- **Fallback Strategy**: Implement fallback oracles for reliability
- **Cost Optimization**: Most Stacks oracles are free
- **Bitcoin Security**: Stacks transactions inherit Bitcoin finality via PoX
- **Clarity Integration**: Pyth provides native Clarity contract support

## Security Considerations

1. **Oracle Manipulation**: Use multiple sources for critical applications
2. **Price Staleness**: Check timestamps on oracle data
3. **Confidence Intervals**: Pyth provides confidence ranges - use them!
4. **Liquidity Depth**: DEX prices depend on pool liquidity
5. **Bitcoin Finality**: Wait for Bitcoin confirmation for high-value transactions
6. **Smart Contract Audits**: Ensure Clarity contracts are audited before production

## Stacks Ecosystem

### Native DEXs
- **ALEX**: Largest DEX with AMM + orderbook
- **StackSwap**: First AMM on Stacks
- **Velar**: Liquidity protocol
- **Arkadiko**: DeFi protocol with stablecoin

### DeFi Protocols
- **ALEX**: Lending, borrowing, launchpad
- **Arkadiko**: Decentralized stablecoin (USDA)
- **Stacking**: Native yield through Bitcoin rewards

### Infrastructure
- **Hiro**: Official API and developer tools
- **Leather Wallet**: Leading Stacks wallet
- **Xverse**: Multi-chain wallet with Stacks support

## Additional Resources

- [Pyth Network Documentation](https://docs.pyth.network/)
- [Pyth-Stacks Bridge](https://github.com/Trust-Machines/stacks-pyth-bridge)
- [DIA Oracle Docs](https://docs.diadata.org/)
- [ALEX Documentation](https://docs.alexlab.co/)
- [Hiro Stacks API](https://docs.hiro.so/get-started/stacks-blockchain-api)
- [Stacks Documentation](https://docs.stacks.co/)
- [Clarity Language](https://docs.stacks.co/clarity/)

## License

This oracle integration module is provided as-is for use within the loginStandard application.

