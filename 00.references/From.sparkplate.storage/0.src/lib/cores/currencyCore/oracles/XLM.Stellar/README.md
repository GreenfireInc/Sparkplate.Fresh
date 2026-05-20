# Stellar (XLM) Oracles Directory

This directory contains implementations for Stellar (XLM) blockchain oracles that provide off-chain data to smart contracts and dApps.

## Overview

Unlike Ethereum which relies on external oracle providers, Stellar's architecture is unique. **Stellar's native DEX serves as an implicit oracle** - pricing data is always available directly from the order book and trade history without needing external oracle providers. Additionally, Stellar's smart contract platform (Soroban) supports specialized oracle contracts for more complex data needs.

**Total Oracles**: 5
**Primary Blockchain**: Stellar (XLM)
**Primary SDK**: @stellar/stellar-sdk
**Smart Contracts**: Soroban (Rust-based)

## Included Oracles

### 1. Reflector Oracle (`reflector.ts`)
- **Type**: Native Soroban Oracle (Primary)
- **Description**: Stellar's native oracle protocol using SEP-40 standards
- **Status**: Active on Soroban mainnet
- **Features**: 
  - Aggregates data from Stellar DEX, Soroban contracts, and external sources
  - Price feed subscriptions with WebHook triggers
  - On-chain proofs and verification
  - Trusted ecosystem node consensus
- **Supported Data**: CEX/DEX exchange rates, forex, price feeds
- **Integration**: Via Stellar RPC API and Soroban smart contracts
- **Use Cases**: DeFi protocols, lending platforms, stablecoins
- **URL**: https://reflector.network/

### 2. DIA Oracle (`dia.ts`)
- **Type**: Cross-Chain Oracle
- **Description**: Audited market data for 20,000+ assets on Soroban
- **Status**: Active and integrated
- **Features**:
  - VWAPIR methodology (Volume-Weighted Average Price with Interquartile Range)
  - Standard and custom price feeds
  - Multi-exchange data aggregation
  - Cross-chain compatibility
- **Supported Assets**: BTC, USDC, DIA, XLM, and 20,000+ tokens
- **Contract**: `CAEDPEZDRCEJCF73ASC5JGNKCIJDV2QJQSW6DJ6B74MYALBNKCJ5IFP4`
- **API**: `https://api.diadata.org/v1/assetQuotation/Stellar/0x0000000000000000000000000000000000000000`
- **Use Cases**: DeFi applications, trading platforms, analytics
- **URL**: https://www.diadata.org/

### 3. Band Protocol (`band.ts`)
- **Type**: Cross-Chain Oracle Network
- **Description**: Real-time oracle services on Soroban mainnet
- **Status**: Active (Stellar Community Fund recipient 2023-2024)
- **Features**:
  - Cross-chain data feeds
  - Real-time price updates
  - Rust-based Soroban contracts
  - Multi-source aggregation
- **Integration**: Soroban smart contracts
- **Use Cases**: DeFi protocols, derivatives, cross-chain data
- **URL**: https://bandprotocol.com/

### 4. LightEcho Oracle (`lightecho.ts`)
- **Type**: Smart Contract Price Oracle
- **Description**: Cutting-edge Soroban price oracle
- **Status**: Active
- **Features**:
  - Accurate and reliable price feeds
  - Soroban-native implementation
  - Real-time data updates
  - Developer-friendly API
- **Use Cases**: Smart contract price feeds, DeFi applications
- **URL**: TBD (Stellar Soroban ecosystem)

### 5. Stellar Native DEX (`nativeDex.ts`)
- **Type**: Protocol-Level DEX Oracle
- **Description**: Built-in DEX serving as implicit oracle
- **Status**: Active (protocol-native)
- **Features**:
  - Real-time order book data
  - Trade history and pricing
  - Path finding for multi-hop exchanges
  - No external dependencies
- **API**: Horizon API (`https://horizon.stellar.org`)
- **Endpoints**: `/orderbook`, `/trades`, `/paths`
- **Use Cases**: Price feeds, trading bots, analytics
- **URL**: https://developers.stellar.org/

## Usage

### Import Stellar Oracles
```typescript
// Import from main oracles directory
import {
  reflectorOracle,
  diaOracle,
  bandOracle,
  stellarOraclesLazy,
  stellarOraclesMetadata
} from '@/components/currencyCore/oracles';

// Or import directly from Stellar directory
import {
  reflectorOracle,
  diaOracle,
  stellarNativeDexOracle,
  stellarOraclesLazy,
  stellarOraclesMetadata
} from '@/components/currencyCore/oracles/XLM.Stellar';
```

### Lazy Load Oracles
```typescript
// Lazy load specific Stellar oracles
const reflector = await stellarOraclesLazy.reflector();
const dia = await stellarOraclesLazy.dia();
const nativeDex = await stellarOraclesLazy.nativeDex();
```

### Query Oracle Metadata
```typescript
// Get Stellar oracle ecosystem information
console.log(stellarOraclesMetadata.totalOracles); // 5
console.log(stellarOraclesMetadata.categories.native); // ['Reflector', 'Stellar Native DEX']
console.log(stellarOraclesMetadata.features.priceFeeds); // All oracles
```

## Integration Examples

### Query Reflector Oracle via Soroban RPC

```typescript
import { Contract, SorobanRpc } from '@stellar/stellar-sdk';

const rpc = new SorobanRpc.Server('https://rpc.stellar.org');

// Query Reflector oracle contract
async function getReflectorPrice(asset: string) {
  const reflectorContract = new Contract('REFLECTOR_CONTRACT_ADDRESS');
  const price = await reflectorContract.methods.get_price({ asset });
  
  console.log(`${asset} Price from Reflector:`, price);
  return price;
}

getReflectorPrice('XLM');
```

### Query Stellar Native DEX

```typescript
import * as StellarSDK from '@stellar/stellar-sdk';

const server = new StellarSDK.Horizon.Server('https://horizon.stellar.org');

// Get order book price
async function getDexPrice(sellingAsset, buyingAsset) {
  const orderBook = await server
    .orderbook(sellingAsset, buyingAsset)
    .limit(1)
    .call();
  
  const bid = orderBook.bids[0]?.price || 0;
  const ask = orderBook.asks[0]?.price || 0;
  const mid = (Number(bid) + Number(ask)) / 2;
  
  console.log(`DEX Price - Bid: ${bid}, Ask: ${ask}, Mid: ${mid}`);
  return { bid, ask, mid };
}

// Example: Get XLM/USDC price
const XLM = StellarSDK.Asset.native();
const USDC = new StellarSDK.Asset('USDC', 'ISSUER_ADDRESS');

getDexPrice(XLM, USDC);
```

### Query DIA Oracle

```typescript
import { Contract } from '@stellar/stellar-sdk';

async function getDiaPrice(asset: string) {
  const diaContract = new Contract('CAEDPEZDRCEJCF73ASC5JGNKCIJDV2QJQSW6DJ6B74MYALBNKCJ5IFP4');
  const price = await diaContract.methods.get_price({ asset });
  
  console.log(`${asset} Price from DIA:`, price);
  return price;
}

getDiaPrice('BTC');
```

## Oracle Comparison

| Oracle | Type | Native Stellar | API Key Required | Cost | Best For |
|--------|------|----------------|------------------|------|----------|
| Reflector | Soroban Oracle | ✅ Yes | ❌ No | Free | Primary DeFi oracle |
| DIA | Cross-chain | ❌ Cross-chain | ❌ No | Free | Multi-asset feeds |
| Band Protocol | Cross-chain | ❌ Cross-chain | ❌ No | Free | Cross-chain data |
| LightEcho | Soroban Oracle | ✅ Yes | ❌ No | Free | Smart contract feeds |
| Native DEX | Protocol DEX | ✅ Yes | ❌ No | Free | Real-time trading data |

## Key Features by Category

### Price Feeds
- **Reflector**: Native Soroban, SEP-40 standard, multi-source aggregation
- **DIA**: 20,000+ assets, VWAPIR methodology
- **Native DEX**: Real-time order book, no external dependency
- **Band Protocol**: Cross-chain, real-time updates

### Real-World Data
- **Reflector**: CEX/DEX rates, forex, financial APIs
- **DIA**: Stock indices, commodities, crypto prices
- **Band Protocol**: Custom data feeds

### Use Case Recommendations

**DeFi Applications (Stablecoins, Lending)**
- Primary: Reflector (native Soroban, SEP-40 standard)
- Secondary: DIA (multi-source validation)

**Trading Bots & Analytics**
- Primary: Stellar Native DEX (real-time order book)
- Secondary: Reflector (aggregated pricing)

**Cross-Chain Applications**
- Primary: Band Protocol (cross-chain support)
- Secondary: DIA (multi-chain data)

**Smart Contract Integration**
- Primary: Reflector (Soroban-native)
- Secondary: LightEcho (developer-friendly)

## Integration Best Practices

1. **Primary + Fallback Strategy**: Use Reflector as primary, Native DEX as fallback
2. **Data Freshness**: Verify timestamps on oracle data
3. **Error Handling**: Implement retry logic for API calls
4. **Multiple Sources**: Aggregate data from 2-3 oracles for critical applications
5. **Soroban Integration**: Use official Stellar SDK for contract calls
6. **Network Selection**: Test on testnet before mainnet deployment
7. **Rate Limits**: Respect Horizon API rate limits

## Technical Considerations

### Stellar Networks
- **Mainnet RPC**: `https://rpc.stellar.org`
- **Testnet RPC**: `https://rpc-testnet.stellar.org`
- **Horizon API**: `https://horizon.stellar.org`
- **Testnet Horizon**: `https://horizon-testnet.stellar.org`

### Network Passphrases
- **Mainnet**: `Public Global Stellar Network ; September 2015`
- **Testnet**: `Test SDF Network ; September 2015`

### Common Asset Issuers
```typescript
// XLM (native asset)
const XLM = StellarSDK.Asset.native();

// USDC on Stellar
const USDC = new StellarSDK.Asset(
  'USDC',
  'GBBD47UB5TK5VSR7I4PSUKBT4FJDV3HF2NQMSTK3X74XEXDT5VEISP'
);

// USDT on Stellar  
const USDT = new StellarSDK.Asset(
  'USDT',
  'GBUQWP3BOUZX2NR4MLKHQSB5RFUKDAXYF4F3PYKPTMQQ2BTJGMF4XMIS'
);
```

## Resources

### Stellar Development
- **Stellar Developers**: https://developers.stellar.org/
- **Horizon API**: https://developers.stellar.org/docs/data/apis/horizon
- **Soroban Docs**: https://soroban.stellar.org/
- **Stellar SDK**: https://github.com/stellar/js-stellar-sdk
- **Stellar Laboratory**: https://laboratory.stellar.org/

### Oracle-Specific Resources
- **Reflector**: https://reflector.network/docs
- **DIA**: https://docs.diadata.org/
- **Band Protocol**: https://docs.bandchain.org/
- **Oracle Providers**: https://developers.stellar.org/docs/data/oracles/oracle-providers

### Block Explorers
- **StellarExpert**: https://stellar.expert/
- **StellarChain**: https://stellarchain.io/
- **Stellar Dashboard**: https://dashboard.stellar.org/

### Community
- **Forum**: https://stellar.stackexchange.com/
- **Discord**: https://discord.gg/stellar
- **Reddit**: https://www.reddit.com/r/Stellar/
- **Twitter**: @StellarOrg

## Unique Aspects of Stellar Oracles

Unlike Ethereum's specialized oracle providers, Stellar offers a **hybrid approach**:

1. **Native DEX as Oracle** - Protocol-level orderbook serves as implicit oracle
2. **Soroban Smart Contracts** - Rust-based oracle contracts (Reflector, DIA, Band)
3. **SEP-40 Standard** - Standardized oracle data format
4. **Low Fees** - Network fees only (~0.00001 XLM per operation)
5. **Fast Settlement** - 5-6 second transaction finality
6. **Federated Byzantine Agreement** - Consensus without mining

## Future Developments

- Expanded Soroban oracle ecosystem
- More SEP-40 compliant oracles
- Enhanced cross-chain data bridges
- Real-time WebSocket price feeds
- Advanced DeFi oracle integrations
- IoT and real-world data feeds

## Notes

- Stellar's Native DEX is the most decentralized price source
- Reflector is the recommended oracle for Soroban smart contracts
- All oracles are Soroban-compatible (Rust-based contracts)
- No API keys required for any Stellar oracles
- Test thoroughly on testnet before mainnet deployment
- Horizon API has rate limits (use caching for production)

---

For more information on integrating oracles into your Stellar application, refer to the individual oracle files in this directory.

