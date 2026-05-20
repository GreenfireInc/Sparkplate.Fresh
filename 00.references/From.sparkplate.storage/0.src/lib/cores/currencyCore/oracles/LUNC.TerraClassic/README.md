# Terra Classic (LUNC) Oracle Integrations

Comprehensive oracle and price feed integrations for **Terra Classic (LUNC)**, the original Terra blockchain (columbus-5) that experienced a catastrophic collapse in May 2022. This module provides access to multiple oracle sources for tracking LUNC's price, historical data, and community revival efforts.

## 🌍 About Terra Classic (LUNC)

Terra Classic is the original Terra blockchain that launched in 2019 and collapsed in May 2022 when its algorithmic stablecoin UST lost its peg. The chain continues to operate as Terra Classic with a community-driven revival effort, while a new chain (Terra 2.0) was created via hard fork.

**Key Characteristics:**
- **Chain ID**: columbus-5
- **Consensus**: Tendermint PoS
- **Block Time**: ~6 seconds
- **Address Format**: Bech32 with "terra" prefix
- **Smart Contracts**: CosmWasm (Rust/Go)
- **Derivation Path**: m/44'/330'/0'/0/0
- **Collapsed**: May 9, 2022 (UST de-peg)
- **Supply**: ~6.9T LUNC (inflated from ~350M)

## 📊 Available Oracles

### 1. **Terra Classic Oracle Module** (`terraclassicoracle.ts`)
Native on-chain oracle with validator consensus.

**Best For:**
- On-chain dApp integrations
- Validator operations
- Native Terra Classic protocols
- Price-dependent smart contracts

**Features:**
- Validator-based consensus pricing
- Weighted median aggregation
- Commit-reveal voting scheme
- Block-time updates (~6 seconds)

**API:** `https://fcd.terra.money`  
**Docs:** https://classic-docs.terra.money/docs/develop/module-specifications/spec-oracle.html

---

### 2. **Pyth Network** (`pyth.ts`)
High-frequency oracle with sub-second price updates.

**Best For:**
- Real-time trading applications
- Volatility monitoring
- High-frequency applications
- Arbitrage monitoring

**Features:**
- 400ms update frequency
- 70+ data publishers
- Confidence intervals included
- Pull-based model

**API:** `https://hermes.pyth.network`  
**Docs:** https://docs.pyth.network/

---

### 3. **Band Protocol** (`band.ts`)
Native Cosmos SDK oracle with CosmWasm integration.

**Best For:**
- Community DeFi projects
- Custom feed requirements
- Revival project integrations
- Smart contract price feeds

**Features:**
- Decentralized validator network
- CosmWasm smart contract support
- GraphQL and REST APIs
- Customizable data feeds

**API:** `https://lasr.bandprotocol.org/api`  
**Docs:** https://docs.bandchain.org/

---

### 4. **DIA** (`dia.ts`)
Open-source oracle with transparent methodologies.

**Best For:**
- Auditable price feeds
- Historical collapse analysis
- Research and analytics
- Multi-source price validation

**Features:**
- Fully transparent data sources
- 80+ exchange aggregation
- Free API access
- Historical data including collapse

**API:** `https://api.diadata.org/v1`  
**Docs:** https://docs.diadata.org/

---

### 5. **CoinGecko** (`coingecko.ts`)
Comprehensive cryptocurrency market data aggregator.

**Best For:**
- Market analytics
- Historical collapse data
- Multi-currency pricing
- Community sentiment tracking

**Features:**
- 600+ exchange aggregation
- Free tier (10-50 calls/min)
- Market cap and volume data
- Historical charts including collapse

**API:** `https://api.coingecko.com/api/v3`  
**Docs:** https://www.coingecko.com/en/api/documentation

---

### 6. **Mintscan** (`mintscan.ts`)
Premier Cosmos ecosystem block explorer and API.

**Best For:**
- Blockchain data queries
- Transaction tracking
- Account balance checks
- Validator statistics

**Features:**
- 2 req/s, 10k daily calls (free)
- Comprehensive blockchain data
- Real-time transaction tracking
- Staking and delegation data

**API:** `https://api-terra-classic.cosmostation.io`  
**Docs:** https://docs.cosmostation.io/apis

---

### 7. **TerraSwap Classic** (`terraswap.ts`)
Primary DEX on Terra Classic with AMM pools.

**Best For:**
- DEX-based price discovery
- Liquidity pool analytics
- On-chain swap pricing
- Community trading metrics

**Features:**
- Primary Terra Classic DEX
- AMM-based pricing
- Direct smart contract queries
- LP token support

**API:** Smart contract queries via Terra.js  
**Docs:** https://docs.terraswap.io/

---

## 🚀 Quick Start

### Installation

```bash
npm install axios @terra-money/terra.js
```

### Basic Usage

#### Get LUNC Price (CoinGecko - Simplest)

```typescript
import axios from 'axios';

async function getLUNCPrice() {
  const response = await axios.get(
    'https://api.coingecko.com/api/v3/simple/price',
    {
      params: {
        ids: 'terra-luna-classic',
        vs_currencies: 'usd',
        include_24hr_change: true,
      },
    }
  );
  
  const data = response.data['terra-luna-classic'];
  console.log(`LUNC Price: $${data.usd.toFixed(8)}`);
  console.log(`24h Change: ${data.usd_24h_change.toFixed(2)}%`);
  
  return data.usd;
}
```

#### Query Terra Classic Oracle Module (Native)

```typescript
import axios from 'axios';

async function getTerraClassicOracleRate() {
  const response = await axios.get(
    'https://fcd.terra.money/terra/oracle/v1beta1/denoms/exchange_rates'
  );
  
  const rates = response.data.exchange_rates;
  console.log('Terra Classic Oracle Rates:', rates);
  
  return rates;
}
```

#### Get DEX Price from TerraSwap

```typescript
import { LCDClient } from '@terra-money/terra.js';

const terra = new LCDClient({
  URL: 'https://fcd.terra.money',
  chainID: 'columbus-5',
});

async function getTerraSwapPoolPrice(poolAddress: string) {
  const poolInfo = await terra.wasm.contractQuery(poolAddress, {
    pool: {},
  });
  
  const asset0 = parseFloat(poolInfo.assets[0].amount);
  const asset1 = parseFloat(poolInfo.assets[1].amount);
  const price = asset1 / asset0;
  
  console.log(`TerraSwap Pool Price: $${price.toFixed(8)}`);
  return price;
}
```

---

## 🎯 Oracle Selection Guide

| **Use Case** | **Recommended Oracle** | **Why?** |
|--------------|------------------------|----------|
| Real-time trading | Pyth Network | 400ms updates, confidence intervals |
| Community projects | Terra Classic Oracle Module | Native on-chain, validator consensus |
| On-chain dApps | Terra Classic Oracle Module | Block-time updates, trusted source |
| Market analytics | CoinGecko | Historical data, collapse analysis |
| DEX integration | TerraSwap Classic | Direct price discovery, on-chain |
| Blockchain queries | Mintscan | Transaction tracking, validator stats |
| Historical research | DIA | Transparent, collapse period data |
| Auditable feeds | DIA | Open-source, verifiable methodologies |

---

## 📈 Update Frequencies

| **Oracle** | **Update Frequency** | **Latency** |
|------------|---------------------|-------------|
| Pyth Network | 400 milliseconds | Ultra-low |
| Terra Classic Oracle Module | ~6 seconds (block time) | Very low |
| TerraSwap Classic | Per block (~6 seconds) | Very low |
| Band Protocol | 2-5 minutes | Low |
| DIA | 2-5 minutes | Low |
| CoinGecko | 1-2 minutes | Moderate |
| Mintscan | 1-2 minutes | Low |

---

## 🔐 Rate Limits & API Keys

| **Oracle** | **Free Tier** | **API Key Required?** |
|------------|---------------|----------------------|
| Pyth Network | Unlimited | ❌ No |
| Terra Classic Oracle Module | Public LCD limits | ❌ No |
| TerraSwap Classic | Contract query limits | ❌ No |
| Band Protocol | Public RPC limits | ❌ No |
| DIA | Unlimited | ❌ No |
| CoinGecko | 10-50 calls/min | ⚠️ Optional (higher limits with key) |
| Mintscan | 2 req/s, 10k daily | ⚠️ Optional (higher limits with key) |

---

## 🏗️ Integration Complexity

| **Oracle** | **Complexity** | **Setup Time** |
|------------|---------------|---------------|
| CoinGecko | ⭐ Easy | 5 minutes |
| DIA | ⭐ Easy | 5 minutes |
| Pyth Network | ⭐⭐ Medium | 15 minutes |
| Mintscan | ⭐⭐ Medium | 15 minutes |
| Terra Classic Oracle Module | ⭐⭐⭐ Advanced | 30 minutes |
| Band Protocol | ⭐⭐⭐ Advanced | 30 minutes |
| TerraSwap Classic | ⭐⭐⭐⭐ Advanced | 45 minutes |

---

## ⚠️ Historical Context: May 2022 Collapse

**The Terra Classic Collapse:**

Terra Classic experienced a catastrophic collapse in May 2022 when its algorithmic stablecoin UST lost its $1 peg, triggering a death spiral that devastated the ecosystem.

**Key Events:**
- **May 7-9, 2022**: UST loses peg to $1
- **May 9-12, 2022**: LUNA (now LUNC) drops from $80 to <$0.01
- **Peak Supply**: Inflated from ~350M to 6.9 trillion tokens
- **All-Time High**: $119.18 (April 5, 2022)
- **All-Time Low**: $0.00000099 (May 13, 2022)
- **Total Value Lost**: Over $40 billion

**Post-Collapse:**
- **May 28, 2022**: Terra 2.0 (LUNA) launched via hard fork
- **Original chain renamed**: Terra Classic (LUNC)
- **Community effort**: Revival attempts through burn mechanisms
- **Current state**: Reduced liquidity, community-driven development

**When integrating LUNC data:**
- Be aware of extreme historical volatility
- Understand reduced post-collapse liquidity
- Use appropriate price precision (8+ decimals)
- Consider confidence intervals for low-liquidity periods
- Reference collapse period for historical analysis

---

## 🛠️ Advanced Integration Patterns

### Multi-Source Price Aggregation

```typescript
async function getAggregatedLUNCPrice() {
  const [pythPrice, oraclePrice, geckoPrice] = await Promise.all([
    getPythLUNCPrice(),
    getTerraClassicOracleRate(),
    getCoinGeckoLUNCPrice(),
  ]);
  
  const avgPrice = (pythPrice + oraclePrice + geckoPrice) / 3;
  const variance = Math.max(pythPrice, oraclePrice, geckoPrice) - 
                   Math.min(pythPrice, oraclePrice, geckoPrice);
  
  console.log(`Average: $${avgPrice.toFixed(8)}`);
  console.log(`Variance: $${variance.toFixed(8)}`);
  
  return { avgPrice, variance };
}
```

### Historical Collapse Analysis

```typescript
async function analyzeCollapsePeriod() {
  // Get data from May 2022
  const startDate = new Date('2022-05-01');
  const endDate = new Date('2022-05-20');
  
  const historicalData = await getLUNCHistoricalPrices(startDate, endDate);
  
  const prices = historicalData.map(d => d.price);
  const preCollapsePrice = prices[0];
  const postCollapsePrice = prices[prices.length - 1];
  const lowestPrice = Math.min(...prices);
  const dropPercent = ((preCollapsePrice - postCollapsePrice) / preCollapsePrice) * 100;
  
  console.log(`Pre-collapse: $${preCollapsePrice.toFixed(4)}`);
  console.log(`Post-collapse: $${postCollapsePrice.toFixed(8)}`);
  console.log(`Lowest: $${lowestPrice.toFixed(10)}`);
  console.log(`Drop: ${dropPercent.toFixed(4)}%`);
}
```

### Fallback Oracle Chain

```typescript
async function getLUNCPriceWithFallback() {
  try {
    return await getTerraClassicOracleRate();
  } catch (error) {
    console.warn('Native oracle failed, trying Pyth...');
    try {
      return await getPythLUNCPrice();
    } catch (error) {
      console.warn('Pyth failed, trying CoinGecko...');
      return await getCoinGeckoLUNCPrice();
    }
  }
}
```

---

## 📚 Resources

### Official Terra Classic Links
- **Community Website**: https://www.terraclassic.community/
- **Documentation**: https://classic-docs.terra.money/
- **GitHub**: https://github.com/classic-terra
- **Discord**: https://discord.gg/terraclassic
- **Twitter**: https://twitter.com/TerraClassic
- **Explorer**: https://finder.terra.money/classic

### Oracle Documentation
- **Pyth**: https://docs.pyth.network/
- **Band Protocol**: https://docs.bandchain.org/
- **DIA**: https://docs.diadata.org/
- **CoinGecko**: https://www.coingecko.com/en/api/documentation
- **Mintscan**: https://docs.cosmostation.io/
- **TerraSwap**: https://docs.terraswap.io/

### Terra Classic Development
- **Terra.js SDK**: https://github.com/terra-money/terra.js
- **CosmJS**: https://github.com/cosmos/cosmjs
- **LCD Endpoint**: https://fcd.terra.money
- **Community Forum**: https://classic-agora.terra.money/

---

## 🤝 Support

For issues or questions:
- **Terra Classic Discord**: https://discord.gg/terraclassic
- **Community Forum**: https://classic-agora.terra.money/
- **GitHub Issues**: https://github.com/classic-terra/core/issues

---

## 📄 License

These integrations are provided as-is for educational and development purposes. Always verify price data from multiple sources for production applications, especially given Terra Classic's volatile history.

---

## ⚠️ Important Disclaimer

Terra Classic (LUNC) is the remnant of a collapsed blockchain ecosystem. The token lost over 99.99% of its value in May 2022 and carries extreme risk. This integration is provided for educational and historical purposes. Always conduct thorough research and understand the risks before interacting with Terra Classic assets.

---

**Last Updated**: October 2025  
**Terra Classic Version**: columbus-5  
**Oracles**: 7 integrated sources  
**Status**: Community-driven revival effort

