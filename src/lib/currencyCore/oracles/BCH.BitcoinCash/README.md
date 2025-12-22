# Bitcoin Cash (BCH) Oracles

This directory contains implementations for Bitcoin Cash oracles that provide off-chain data and price feeds, tailored for BCH's unique UTXO-based architecture.

## 🌟 Overview

Bitcoin Cash has a **unique oracle ecosystem** due to its UTXO-based architecture and intentionally limited scripting capabilities. Unlike Ethereum or Cosmos, BCH doesn't support Turing-complete smart contracts, which affects how oracles are implemented and integrated.

### Key Differences from Other Blockchains:
- **UTXO Model:** Different oracle patterns than account-based chains
- **OP_CHECKDATASIG:** Native opcode for cryptographic signature verification
- **Limited Smart Contracts:** BCH Script is intentionally restricted
- **CashScript:** TypeScript-based language for BCH smart contracts
- **Hybrid Approach:** Combines on-chain verification with off-chain data

---

## 📁 Directory Structure

```
BCH.BitcoinCash/
├── oracleCash.ts         # Native BCH oracle (OP_CHECKDATASIG-based)
├── anyhedge.ts           # DeFi derivatives price oracle
├── dia.ts                # Multi-source aggregated price feeds
├── generalCash.ts        # Simple price feed API
├── externalApis.ts       # Multi-source external API aggregator
├── index.ts              # Exports and metadata
└── README.md             # This file
```

---

## 🪙 Supported Oracles (5 Total)

### 1. **Oracle.cash** (Native BCH Oracle)
**Type:** OP_CHECKDATASIG-based On-Chain Oracle  
**Status:** Active since 2019  
**Platform:** Bitcoin.com

**Key Features:**
- Uses OP_CHECKDATASIG opcode for signature verification
- Signed messages published on-chain via OP_RETURN
- Cryptographic proof without trusted intermediaries
- Compatible with CashScript smart contracts
- Example contracts (HodlVault for price-triggered releases)

**Best For:**
- Price-triggered smart contracts
- Prediction markets
- Conditional payments
- Event-based contract execution

**Integration:**
```typescript
import { oracleCashOracle as bchOracleCashOracle } from '@/components/currencyCore/oracles/BCH.BitcoinCash';

// CashScript + Libauth for on-chain verification
const oracle = new PriceOracle(privateKey);
const message = oracle.createMessage(blockHeight, price);
const signature = oracle.signMessage(message);
```

---

### 2. **AnyHedge Oracle** (DeFi-Specific)
**Type:** Specialized Derivatives Price Oracle  
**Purpose:** Decentralized derivatives and hedging on BCH

**Key Features:**
- Price feeds for AnyHedge contracts
- Real-time updates for derivatives
- Historical price data
- Multi-pair support

**Best For:**
- Decentralized derivatives
- Hedging contracts
- DeFi lending
- Risk management

**Integration:**
```typescript
import { bchAnyhedgeOracle } from '@/components/currencyCore/oracles/BCH.BitcoinCash';

const oracle = new AnyHedgeOracle();
const bchPrice = await oracle.getPriceFeed('BCH/USD');
```

---

### 3. **DIA Oracle** (Multi-Source Aggregation)
**Type:** Community-Driven Multi-Source Price Oracle  
**Methodology:** MAIR (Market Aggregated Index Rate)  
**Sources:** 85+ exchanges

**Key Features:**
- Aggregates from 85+ on-chain and off-chain exchanges
- Transparent data sourcing
- MAIR methodology for price aggregation
- REST API for off-chain queries

**Best For:**
- Transparent price aggregation
- DeFi protocols
- Institutional-grade data
- Research platforms

**Integration:**
```typescript
import { bchDiaOracle } from '@/components/currencyCore/oracles/BCH.BitcoinCash';

const response = await axios.get(
  'https://api.diadata.org/v1/assetQuotation/BitcoinCash/0x0000000000000000000000000000000000000000'
);
```

---

### 4. **General.cash Oracle** (Simple API)
**Type:** Simple Price Feed API  
**Purpose:** Quick cryptocurrency price integration

**Key Features:**
- Simple REST API
- No authentication required
- Multi-currency support
- Part of General Protocols ecosystem

**Best For:**
- Quick prototypes
- Simple price displays
- Educational projects
- MVPs

**Integration:**
```typescript
import { bchGeneralCashOracle } from '@/components/currencyCore/oracles/BCH.BitcoinCash';

const oracle = new GeneralCashOracle();
const bchPrice = await oracle.getBCHPrice('USD');
```

---

### 5. **External APIs** (Multi-Source Aggregator)
**Type:** Aggregated Multi-Source Price Feeds  
**Sources:** CoinGecko, Kraken, Binance, Coinbase  
**Validation:** Median calculation with outlier detection

**Key Features:**
- Aggregates from 4 major sources
- No single point of failure
- Automatic failover
- Confidence interval calculation
- Price validation against history

**Best For:**
- Production applications
- Reliable trading systems
- Portfolio management
- Risk assessment

**Integration:**
```typescript
import { bchExternalApisOracle } from '@/components/currencyCore/oracles/BCH.BitcoinCash';

const oracle = new BCHExternalPriceOracle();
const aggregated = await oracle.getAggregatedBCHPrice();
console.log(`BCH: $${aggregated.median.toFixed(2)} (confidence: ${confidence}%)`);
```

---

## 🔧 Technical Specifications

### OP_CHECKDATASIG Integration (Oracle.cash)
- **Opcode:** Introduced in BCH 2018 upgrade
- **Purpose:** Verify cryptographic signatures of external data
- **Method:** Schnorr signatures for oracle messages
- **Verification:** On-chain without trusted parties
- **Storage:** OP_RETURN transactions
- **Encoding:** Minimal VM number encoding

### CashScript SDK
- **Language:** TypeScript/JavaScript
- **Purpose:** Smart contract development for BCH
- **Network:** ElectrumNetworkProvider for mainnet/testnet/chipnet
- **Installation:** `npm install cashscript @bitauth/libauth`
- **Documentation:** https://cashscript.org/

### Off-Chain Integration
- **Method:** REST APIs via axios
- **Validation:** Multi-source aggregation
- **Reliability:** Median calculation with outlier detection
- **Failover:** Automatic if sources fail

---

## 📊 Comparison Matrix

| Oracle | Type | Integration | Best Use Case | Reliability |
|--------|------|-------------|---------------|-------------|
| **Oracle.cash** | On-chain | CashScript + OP_CHECKDATASIG | Price-triggered contracts | High (cryptographic) |
| **AnyHedge** | Off-chain API | REST API | DeFi derivatives | High (specialized) |
| **DIA** | Off-chain API | REST API | Transparent aggregation | High (85+ sources) |
| **General.cash** | Off-chain API | REST API | Simple price feeds | Medium (single source) |
| **External APIs** | Off-chain API | REST API | Production reliability | Very High (4 sources) |

---

## 🎯 Use Case Recommendations

### Price-Triggered Contracts
✅ **Primary:** Oracle.cash (native OP_CHECKDATASIG)  
✅ **Secondary:** External APIs for verification

### DeFi Derivatives
✅ **Primary:** AnyHedge Oracle (specialized)  
✅ **Secondary:** DIA Oracle (multi-source)

### Production Price Feeds
✅ **Primary:** External APIs (multi-source aggregation)  
✅ **Secondary:** DIA Oracle (transparent sourcing)

### Prediction Markets
✅ **Primary:** Oracle.cash (custom data sources)  
✅ **Secondary:** Off-chain APIs for validation

### Simple Applications
✅ **Primary:** General.cash Oracle (easy integration)  
✅ **Secondary:** External APIs

---

## 💡 Unique BCH Features

### 1. **OP_CHECKDATASIG Opcode**
Enables cryptographic verification of oracle signatures directly on-chain without trusted parties.

### 2. **UTXO Model**
Requires different oracle patterns compared to account-based chains like Ethereum.

### 3. **Low Transaction Fees**
~$0.01 per transaction enables frequent oracle updates economically.

### 4. **CashScript**
TypeScript-based smart contract language designed for BCH.

### 5. **OP_RETURN Storage**
Oracle data stored in transactions via OP_RETURN outputs.

---

## ⚠️ Challenges & Solutions

### Challenges:
1. **No Turing-Complete Smart Contracts** → BCH Script is intentionally limited
2. **UTXO Model** → Different from account-based oracle patterns
3. **Limited Native Storage** → Cannot store external data like EVM chains
4. **Restricted Opcodes** → Missing opcodes for complex oracle logic
5. **Emerging Ecosystem** → Fewer mature oracle solutions than Ethereum

### Solutions:
1. **OP_CHECKDATASIG** → Enable cryptographic signature verification
2. **OP_RETURN** → Store oracle data in transactions
3. **CashScript** → High-level language for BCH smart contracts
4. **Off-Chain APIs** → Leverage external price sources
5. **Hybrid Approach** → Combine on-chain verification with off-chain data

---

## 🚀 Quick Start Examples

### Native On-Chain Oracle (Oracle.cash)
```typescript
import { Contract, ElectrumNetworkProvider } from 'cashscript';
import { secp256k1, signSchnorr } from '@bitauth/libauth';

// Create oracle instance
const oracle = new PriceOracle(privateKey);

// Create and sign price message
const message = oracle.createMessage(blockHeight, price);
const signature = oracle.signMessage(message);

// Deploy HodlVault contract
const contract = new Contract(artifact, [ownerPub, oraclePub, minBlock, targetPrice], { provider });
```

### Multi-Source Aggregation (External APIs)
```typescript
import { BCHExternalPriceOracle } from './externalApis';

const oracle = new BCHExternalPriceOracle();
const data = await oracle.getAggregatedBCHPrice();

console.log(`BCH Price: $${data.median.toFixed(2)}`);
console.log(`Confidence: ${data.successfulSources}/4 sources`);
console.log(`Spread: ${((data.max - data.min) / data.median * 100).toFixed(2)}%`);
```

### Simple Price Feed (General.cash)
```typescript
import { GeneralCashOracle } from './generalCash';

const oracle = new GeneralCashOracle();
const bchPrice = await oracle.getBCHPrice('USD');

console.log(`BCH: $${bchPrice.price}`);
```

---

## 📚 Resources

### BCH Development
- **CashScript:** https://cashscript.org/
- **Libauth:** https://libauth.org/
- **BCH Developers:** https://www.bitcoincash.org/developers.html
- **CashTokens:** https://cashtokens.org/

### Oracle Platforms
- **Oracle.cash:** https://oracles.cash/
- **AnyHedge:** https://anyhedge.com/
- **DIA Oracle:** https://www.diadata.org/
- **General.cash:** https://general.cash/

### Price APIs
- **CoinGecko:** https://www.coingecko.com/en/api
- **Kraken:** https://docs.kraken.com/rest/
- **Binance:** https://binance-docs.github.io/apidocs/spot/en/
- **Coinbase:** https://docs.cloud.coinbase.com/exchange/reference

---

## 🔍 Integration Best Practices

1. **Use Multi-Source Aggregation:** Reduce manipulation risk with External APIs
2. **Validate Prices:** Check against historical data and multiple sources
3. **Implement Caching:** Respect API rate limits and reduce latency
4. **Handle Failures:** Use fallback mechanisms and retry logic
5. **Monitor Confidence:** Track spread and source availability
6. **Choose Right Oracle:** Match oracle type to your use case
7. **Test on Testnet:** Use BCH chipnet for development and testing

---

## 📈 Oracle Maturity

| Feature | BCH | Ethereum | Cosmos | Algorand |
|---------|-----|----------|--------|----------|
| **Native Oracles** | Limited | Extensive | Extensive | Extensive |
| **Smart Contracts** | Limited (CashScript) | Full (Solidity) | Full (CosmWasm) | Full (TEAL) |
| **Oracle Ecosystem** | Emerging | Mature | Mature | Mature |
| **Integration Complexity** | Medium | Low | Low | Low |
| **Transaction Fees** | Very Low (~$0.01) | Variable | Low | Very Low |
| **Best Approach** | Hybrid (on-chain + off-chain) | Native | Native | Native |

---

## 🎓 Learning Resources

### Tutorials
- Oracle.cash examples on GitHub
- CashScript documentation
- Bitcoin.com developer resources

### Sample Contracts
- HodlVault (price-triggered BCH release)
- Prediction market contracts
- Conditional payment contracts

### Community
- Bitcoin Cash Research Forum
- CashScript Discord
- r/btc (Reddit)

---

## 🤝 Contributing

Improvements and additional oracle integrations are welcome! Please follow the established patterns in the existing oracle files.

---

**Note:** Bitcoin Cash's oracle ecosystem is still emerging. For production applications requiring reliable price feeds, we recommend using the External APIs aggregator which combines multiple sources for maximum reliability. For on-chain verification, Oracle.cash with OP_CHECKDATASIG provides cryptographically secure data validation.
