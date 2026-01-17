# Algorand (ALGO) Oracles Directory

This directory contains comprehensive integration details for various oracle solutions available on the Algorand blockchain. Oracles bridge the gap between blockchain smart contracts and real-world data, enabling decentralized applications across DeFi, gaming, NFTs, supply chain, and more.

Algorand's unique features—low transaction fees, high speed, and stateless smart contracts—make it an ideal platform for oracle integration, particularly for cost-effective pull-model oracles like Pyth Network.

## 📁 Directory Structure

```
ALGO.Algorand/
├── pythNetwork.ts          # Pyth Network high-fidelity pull-model oracle
├── chainlink.ts            # Chainlink decentralized oracle network
├── algorandFoundation.ts   # Official Algorand Foundation oracles
├── goracle.ts              # Goracle (Gora Network) multi-purpose oracle
├── folksFeedOracle.ts      # Folks Feed Oracle for lending protocols
├── dia.ts                  # DIA community-driven multi-source oracle
├── randomnessBeacon.ts     # Official Algorand Randomness Beacon (VRF)
├── index.ts                # Exports all Algorand oracles and metadata
└── README.md               # This documentation file
```

## 💡 Overview of Supported Oracles

Algorand supports a diverse ecosystem of oracle solutions, each tailored to specific use cases:

| Oracle Name | Type | Key Features |
|------------|------|--------------|
| **Pyth Network** | Pull-Model Price Oracle | Sub-second updates, 90+ publishers, cost-effective |
| **Chainlink** | Decentralized Network | 1000+ nodes, VRF, Any API, proven security |
| **Algorand Foundation Oracles** | Official Reference Oracle | Core asset prices, Foundation-maintained, reliable |
| **Goracle (Gora Network)** | Multi-Purpose Oracle | App-specific oracles, custom data, GORA governance |
| **Folks Feed Oracle** | Lending Protocol Oracle | Specialized for DeFi lending, SDK available |
| **DIA Oracle** | Community-Driven Oracle | 20,000+ assets, transparent sourcing, 100+ exchanges |
| **Randomness Beacon** | VRF Randomness Oracle | Verifiable randomness, official service, gaming/NFTs |

## 🔧 Integration Examples

### Import Algorand Oracles
```typescript
// Import from main oracles directory
import {
  algoPythNetworkOracle,
  algoChainlinkOracle,
  algoFoundationOracle,
  algoRandomnessBeacon,
  algoOraclesLazy,
  algoOraclesMetadata
} from '@/components/currencyCore/oracles';

// Or import directly from Algorand directory
import {
  algoPythNetworkOracle,
  algoChainlinkOracle,
  algoFoundationOracle,
  algoGoracleOracle,
  algoFolksFeedOracle,
  algoDiaOracle,
  algoRandomnessBeacon,
  algoOraclesLazy,
  algoOraclesMetadata
} from '@/components/currencyCore/oracles/ALGO.Algorand';
```

### Lazy Load Oracles
```typescript
// Lazy load specific Algorand oracles
const pythNetwork = await algoOraclesLazy.pythNetwork();
const chainlink = await algoOraclesLazy.chainlink();
const randomnessBeacon = await algoOraclesLazy.randomnessBeacon();
```

### Query Oracle Metadata
```typescript
// Get Algorand oracle ecosystem information
console.log(algoOraclesMetadata.totalOracles); // 7
console.log(algoOraclesMetadata.categories.priceFeeds); // All price feed oracles
console.log(algoOraclesMetadata.features.vrfRandomness); // Randomness oracles
```

## 📊 Detailed Oracle Information

### 1. Pyth Network (`pythNetwork.ts`)
- **Type**: Pull-Model Price Oracle
- **Description**: High-frequency, low-latency price feeds from 90+ first-party publishers
- **Key Features**:
  - Sub-second updates (typically 400ms)
  - Cost-effective pull-model (perfect for Algorand's low fees)
  - Cryptographic proof verification
  - Confidence intervals with each price
  - 90+ first-party data publishers
- **Best For**: DeFi protocols, perpetual futures, high-frequency trading
- **Mainnet App ID**: 818176933
- **Testnet App ID**: 6525
- **Docs**: https://docs.pyth.network/documentation/pythnet-price-feeds/algorand

### 2. Chainlink (`chainlink.ts`)
- **Type**: Decentralized Oracle Network
- **Description**: Industry-leading oracle with 1000+ nodes, VRF, and Any API
- **Key Features**:
  - 1000+ professional node operators
  - Verifiable Random Function (VRF) for provably-fair randomness
  - Chainlink Any API for custom external data
  - Proven security ($75B+ secured)
  - Deviation-based and heartbeat price updates
- **Best For**: High-security DeFi, NFT minting with VRF, custom data integration
- **Docs**: https://docs.chain.link/docs/algorand/

### 3. Algorand Foundation Oracles (`algorandFoundation.ts`)
- **Type**: Official Reference Oracle
- **Description**: Foundation-maintained oracles for core cryptocurrency prices
- **Key Features**:
  - Official and trusted source
  - Core asset prices (ALGO, BTC, ETH, USDC)
  - Simple and reliable integration
  - Open-source implementation
- **Best For**: General-purpose dApps, core Algorand ecosystem assets
- **GitHub**: https://github.com/AlgorandFoundation/oracles

### 4. Goracle (Gora Network) (`goracle.ts`)
- **Type**: Multi-Purpose Decentralized Oracle
- **Description**: Next-gen oracle with app-specific oracles and custom data feeds
- **Key Features**:
  - App-specific oracles (ASOs) for custom use cases
  - Weather, sports, credit scores, API calls
  - Web Assembly code execution off-chain
  - GORA token governance
  - Mainnet launched July 2023
- **Best For**: Fintech, healthcare, gaming, supply chain, custom data needs
- **Website**: https://www.gora.io/
- **Docs**: https://docs.gora.network/

### 5. Folks Feed Oracle (`folksFeedOracle.ts`)
- **Type**: Lending Protocol Oracle
- **Description**: Specialized oracle for web3 apps, focusing on lending protocol price feeds
- **Key Features**:
  - Price feeds for lending protocol assets
  - SDK available for easy integration
  - Real-world data focus
  - Smart contract storage
- **Best For**: Lending/borrowing protocols, collateral valuation
- **Docs**: https://docs.folksfeed.io/

### 6. DIA Oracle (`dia.ts`)
- **Type**: Community-Driven Multi-Source Oracle
- **Description**: Transparent price feeds from 100+ exchanges with multi-source aggregation
- **Key Features**:
  - 20,000+ assets supported
  - 100+ exchange data sources
  - Transparent VWAPIR methodology
  - Volume and supply data
  - REST API access
- **Best For**: Transparent data sourcing, institutional-grade feeds, multi-asset tracking
- **Website**: https://www.diadata.org/
- **API**: https://api.diadata.org/v1

### 7. Algorand Randomness Beacon (`randomnessBeacon.ts`)
- **Type**: VRF-Based Randomness Oracle
- **Description**: Official randomness service providing verifiable randomness via VRF
- **Key Features**:
  - Verifiable Random Function (VRF)
  - Tamper-proof and unpredictable
  - On-chain verification available
  - Periodic VRF proof posting
  - Commit-reveal pattern support
- **Best For**: Lotteries, NFT generation, gaming, fair selection
- **Mainnet App ID**: 1615566206
- **Testnet App ID**: 600011887
- **Docs**: https://developer.algorand.org/articles/usage-and-best-practices-for-randomness-beacon/

## 🎯 Oracle Comparison

| Feature | Pyth | Chainlink | Foundation | Goracle | Folks Feed | DIA | Randomness |
|---------|------|-----------|------------|---------|------------|-----|------------|
| **Price Feeds** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Randomness** | ❌ | ✅ VRF | ❌ | ❌ | ❌ | ❌ | ✅ VRF |
| **Custom Data** | ❌ | ✅ Any API | ❌ | ✅ ASO | ❌ | ❌ | ❌ |
| **Update Frequency** | Sub-second | Deviation | Regular | Custom | Regular | Real-time | Per round |
| **Cost Model** | Pull | Push | Push | Request | Push | API | Call |
| **Data Sources** | 90+ | 1000+ | Foundation | Custom | Varies | 100+ | VRF |
| **Best For** | HFT DeFi | Security | Core assets | Custom | Lending | Transparency | Gaming/NFTs |

## 🔗 Integration Best Practices

### Multiple Oracle Strategy
For critical applications, use multiple oracles with fallback logic:

```typescript
async function getReliableAlgoPrice() {
  const sources = [
    () => pythNetwork.getPrice(),
    () => chainlink.getPrice(),
    () => foundation.getPrice(),
    () => dia.getPrice()
  ];
  
  const prices = await Promise.allSettled(sources.map(fn => fn()));
  const validPrices = prices
    .filter(p => p.status === 'fulfilled')
    .map(p => p.value);
  
  // Calculate median for reliability
  return calculateMedian(validPrices);
}
```

### Data Freshness Validation
Always check timestamps and implement staleness checks:

```typescript
function isDataFresh(timestamp: Date, maxAge: number = 60000) {
  const now = Date.now();
  const age = now - timestamp.getTime();
  return age <= maxAge;
}
```

### Algorand SDK Setup
```typescript
import algosdk from 'algosdk';

// Initialize Algorand client
const algodClient = new algosdk.Algodv2(
  '', // No API key needed for public endpoints
  'https://mainnet-api.algonode.cloud',
  443
);

// Initialize Indexer for historical queries
const indexerClient = new algosdk.Indexer(
  '',
  'https://mainnet-idx.algonode.cloud',
  443
);
```

## 📈 Use Case Recommendations

### DeFi Protocols (AMMs, Lending, Derivatives)
- **Primary**: Pyth Network (sub-second updates)
- **Secondary**: Chainlink (proven security)
- **Tertiary**: DIA Oracle (transparent sourcing)

### High-Frequency Trading
- **Primary**: Pyth Network (400ms latency)
- **Secondary**: DIA Oracle (real-time data)

### Lending/Borrowing Protocols
- **Primary**: Folks Feed Oracle (specialized)
- **Secondary**: Pyth Network or Chainlink

### Gaming & NFTs (Randomness)
- **Primary**: Algorand Randomness Beacon (official VRF)
- **Secondary**: Chainlink (VRF support)

### Custom Data Requirements
- **Primary**: Goracle (app-specific oracles)
- **Secondary**: Chainlink (Any API)

### Core Algorand Assets
- **Primary**: Algorand Foundation Oracles (official)

## 🛠️ Technical Considerations

### Algorand SDK
```bash
npm install algosdk
```

All oracles integrate via `algosdk` for Algorand interactions. The SDK provides:
- Transaction construction and signing
- Application (smart contract) calls
- State reading and querying
- Indexer integration for historical data

### Network Endpoints

**Mainnet:**
- Algod: `https://mainnet-api.algonode.cloud:443`
- Indexer: `https://mainnet-idx.algonode.cloud:443`

**Testnet:**
- Algod: `https://testnet-api.algonode.cloud:443`
- Indexer: `https://testnet-idx.algonode.cloud:443`

**Other Options:**
- Nodely: `https://mainnet-api.4160.nodely.dev`
- PureStake: `https://mainnet-algorand.api.purestake.io/ps2` (requires API key)

### AVM Version Requirements
- **Randomness Beacon**: Requires AVM version 7+ (for `block` and `vrf_verify` opcodes)
- **Other Oracles**: Standard AVM support

### Data Format
- **Pyth Network**: Exponential notation with exponent field
- **Chainlink**: Typically 8 decimals
- **Foundation Oracles**: Typically 6 decimals (microAlgos scaling)
- **DIA**: Standard decimal format
- **Randomness Beacon**: Raw bytes (32 bytes of randomness)

## 📚 Resources

### Algorand Development
- **Algorand JS SDK**: https://github.com/algorand/js-algorand-sdk
- **Algorand Documentation**: https://developer.algorand.org/
- **AlgoKit**: https://developer.algorand.org/algokit/
- **Algorand Foundation**: https://algorand.foundation/

### Oracle-Specific Resources
- **Pyth Network**: https://docs.pyth.network/documentation/pythnet-price-feeds/algorand
- **Chainlink**: https://docs.chain.link/docs/algorand/
- **Foundation Oracles**: https://github.com/AlgorandFoundation/oracles
- **Goracle**: https://docs.gora.network/
- **Folks Feed**: https://docs.folksfeed.io/
- **DIA**: https://docs.diadata.org/
- **Randomness Beacon**: https://developer.algorand.org/articles/usage-and-best-practices-for-randomness-beacon/

### Community & Support
- **Algorand Discord**: https://discord.gg/algorand
- **Algorand Forum**: https://forum.algorand.org/
- **Developer Portal**: https://developer.algorand.org/

## 🚀 Future Developments

- Expanded oracle provider ecosystem
- More app-specific oracles via Goracle
- Enhanced VRF capabilities
- Cross-chain oracle bridges
- Real-time WebSocket subscriptions
- Advanced aggregation methods
- Standardized oracle interfaces

## 📝 Notes

- Algorand's low fees make pull-model oracles (like Pyth) highly cost-effective
- Multiple oracle solutions available for diverse use cases
- Official randomness beacon for verifiable randomness (VRF)
- Foundation-maintained oracles for core assets
- Always validate oracle data before using in production
- Implement multi-oracle strategies for mission-critical applications
- Test thoroughly on testnet before mainnet deployment
- Monitor oracle health and data freshness
- Be aware of API rate limits for HTTP-based oracles
- Smart contract integration requires understanding of TEAL/PyTeal

---

For detailed integration examples and API documentation, refer to the individual oracle files in this directory.
