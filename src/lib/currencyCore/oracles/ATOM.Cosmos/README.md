# Cosmos (ATOM) Oracles

This directory contains comprehensive oracle implementations for the Cosmos (ATOM) blockchain ecosystem, providing off-chain data feeds, price oracles, and cross-chain data integration.

## Overview

Cosmos has a unique oracle ecosystem due to its Inter-Blockchain Communication (IBC) protocol and modular Cosmos SDK architecture. The oracles range from native Cosmos SDK solutions to cross-chain integrations, offering diverse options for different use cases.

## Available Oracles (6 Total)

### 1. 🌟 **Band Protocol** (Native Cosmos SDK Oracle)
**File:** `bandProtocol.ts`  
**Type:** Native Cosmos SDK Decentralized Oracle  
**Status:** Mainnet since 2020

**Key Features:**
- Built on Cosmos SDK with native IBC integration
- 100+ validators worldwide
- Multi-source data aggregation
- Customizable oracle scripts
- Real-time and historical data access

**Best For:**
- Native Cosmos DeFi applications
- Cross-chain applications via IBC
- Interchain lending and borrowing
- Custom oracle requirements

**Integration:**
```typescript
import { bandProtocolOracleATOM } from '@/components/currencyCore/oracles/ATOM.Cosmos';
```

**API Endpoints:**
- gRPC Mainnet: `https://laozi-mainnet3.bandchain.org/grpc-web`
- gRPC Testnet: `https://laozi-testnet4.bandchain.org/grpc-web`
- REST API: `https://api.bandchain.org`

**SDK:** `@bandprotocol/bandchain.js`

---

### 2. ⚡ **Pyth Network** (High-Fidelity Pull-Model Oracle)
**File:** `pythNetwork.ts`  
**Type:** High-Frequency Pull-Model Price Oracle  
**Status:** Live on Osmosis, Injective, Cronos, Kava, Evmos

**Key Features:**
- Sub-second updates (typically 400ms)
- 90+ first-party data publishers
- Confidence intervals with each price
- Pull oracle model (cost-effective)
- 500+ price feeds available

**Best For:**
- High-frequency trading applications
- Perpetual futures and options
- Sophisticated DeFi protocols
- Algorithmic trading

**Integration:**
```typescript
import { atomPythNetworkOracle } from '@/components/currencyCore/oracles/ATOM.Cosmos';
```

**API Endpoints:**
- Hermes: `https://hermes.pyth.network`
- Price Feed IDs: `https://pyth.network/developers/price-feed-ids/`

**SDK:** `@pythnetwork/hermes-client`

---

### 3. 🔗 **Chainlink** (Cross-Chain Decentralized Oracle)
**File:** `chainlink.ts`  
**Type:** Cross-Chain Decentralized Oracle Network  
**Status:** Expanding to Cosmos via CCIP

**Key Features:**
- 1000+ professional node operators
- Proven security ($75B+ secured)
- VRF for verifiable randomness
- CCIP for cross-chain data
- Any API for custom integrations

**Best For:**
- Enterprise-grade applications
- Applications requiring proven security
- Cross-chain data requirements
- Gaming and NFTs (VRF)

**Integration:**
```typescript
import { atomChainlinkOracle } from '@/components/currencyCore/oracles/ATOM.Cosmos';
```

**API Endpoints:**
- Documentation: `https://docs.chain.link/`
- Price Feeds: `https://docs.chain.link/data-feeds/price-feeds`
- VRF: `https://docs.chain.link/vrf/v2/introduction`

**SDK:** `@cosmjs/stargate` + cross-chain access

---

### 4. 📊 **DIA Oracle** (Transparent Multi-Source Oracle)
**File:** `dia.ts`  
**Type:** Community-Driven Multi-Source Price Oracle  
**Status:** Active on Cosmos

**Key Features:**
- 20,000+ assets supported
- 85+ exchange integrations
- Transparent data sourcing
- Volume and supply data
- Customizable feeds

**Best For:**
- Transparent data sourcing requirements
- Institutional-grade data needs
- Multi-asset price tracking
- Volume and supply monitoring

**Integration:**
```typescript
import { atomDiaOracle } from '@/components/currencyCore/oracles/ATOM.Cosmos';
```

**API Endpoints:**
- Base URL: `https://api.diadata.org/v1`
- ATOM Price: `https://api.diadata.org/v1/assetQuotation/Cosmos/0x0000000000000000000000000000000000000000`

**SDK:** `axios` (REST API)

---

### 5. ☂️ **Umbrella Network** (High-Throughput Layer-2 Oracle)
**File:** `umbrellaNetwork.ts`  
**Type:** Scalable Layer-2 Oracle  
**Status:** Active on select Cosmos chains

**Key Features:**
- Layer-2 architecture
- High throughput
- Cost-effective
- Frequent data updates
- Merkle proof verification

**Best For:**
- High-frequency data updates
- Cost-sensitive applications
- Applications requiring real-time streaming
- Scalable data feeds

**Integration:**
```typescript
import { atomUmbrellaOracle } from '@/components/currencyCore/oracles/ATOM.Cosmos';
```

**API Endpoints:**
- Documentation: `https://umbrella-network.readme.io/`

**SDK:** `@umb-network/toolbox`

---

### 6. ⚙️ **Cosmos SDK Oracle Module** (Protocol-Level Oracle)
**File:** `cosmosSdkOracle.ts`  
**Type:** Native Protocol-Level Oracle Module  
**Status:** Available in Cosmos SDK v0.50+

**Key Features:**
- Built into Cosmos SDK
- ABCI++ vote extensions
- Validator-driven data aggregation
- Consensus-level security
- No external dependencies

**Best For:**
- Chains requiring native oracle modules
- Protocol-level security needs
- Validator-driven oracle data
- Self-contained oracle solutions

**Integration:**
```typescript
import { atomCosmosSDKOracle } from '@/components/currencyCore/oracles/ATOM.Cosmos';
```

**API Endpoints:**
- Standard Cosmos SDK gRPC/REST endpoints

**SDK:** `@cosmjs/stargate` with oracle extensions

---

## Quick Start

### Installation

```bash
# Core Cosmos SDK integration
npm install @cosmjs/stargate @cosmjs/proto-signing @cosmjs/cosmwasm-stargate

# Band Protocol (native)
npm install @bandprotocol/bandchain.js

# Pyth Network
npm install @pythnetwork/hermes-client @pythnetwork/client

# DIA Oracle (REST API)
npm install axios

# Umbrella Network
npm install @umb-network/toolbox

# For Tendermint RPC
npm install @cosmjs/tendermint-rpc
```

### Basic Usage

#### Band Protocol Example
```typescript
import { Client } from '@bandprotocol/bandchain.js';

const client = new Client('https://laozi-mainnet3.bandchain.org/grpc-web');
const oracleScriptId = 1; // Standard price feeds

const result = await client.getReferenceData(
  ['ATOM/USD', 'OSMO/USD'],
  4, // minCount
  4  // askCount
);

console.log('ATOM Price:', result['ATOM/USD'].rate);
```

#### Pyth Network Example
```typescript
import { HermesPriceServiceConnection } from '@pythnetwork/hermes-client';

const connection = new HermesPriceServiceConnection('https://hermes.pyth.network');

const atomFeedId = 'b00b60f88b03a6a625a8d1c048c3f66653edf217439983d037e7222c4e612819';
const priceFeed = await connection.getPriceFeed(atomFeedId);
const price = priceFeed.getPriceUnchecked().price;

console.log('ATOM Price:', price);
```

#### DIA Oracle Example
```typescript
import axios from 'axios';

const response = await axios.get(
  'https://api.diadata.org/v1/assetQuotation/Cosmos/0x0000000000000000000000000000000000000000'
);

console.log('ATOM Price:', response.data.Price);
```

#### Cosmos SDK Oracle Module Example
```typescript
import { QueryClient, setupOracleExtension } from '@cosmjs/stargate';
import { Tendermint34Client } from '@cosmjs/tendermint-rpc';

const tmClient = await Tendermint34Client.connect('https://rpc.cosmos.network');
const queryClient = QueryClient.withExtensions(tmClient, setupOracleExtension);

const params = await queryClient.oracle.params();
console.log('Oracle Params:', params);
```

---

## Oracle Comparison

| Feature | Band Protocol | Pyth Network | Chainlink | DIA Oracle | Umbrella | Cosmos SDK |
|---------|--------------|--------------|-----------|------------|----------|------------|
| **Native Cosmos** | ✅ Yes | ❌ Cross-chain | ❌ Cross-chain | ⚠️ Partial | ⚠️ Partial | ✅ Yes |
| **IBC Integrated** | ✅ Yes | ✅ Via Wormhole | ❌ No | ⚠️ Partial | ⚠️ Partial | ✅ Yes |
| **Update Frequency** | Real-time | Sub-second | Deviation-based | Real-time | High | Per-block |
| **Data Sources** | 100+ validators | 90+ publishers | 1000+ nodes | 85+ exchanges | Multiple | Validators |
| **Cost Model** | Per-request | Pull (cheap) | Per-update | Per-request | Layer-2 (cheap) | Protocol-level |
| **Customization** | ✅ High | ❌ Limited | ✅ High | ⚠️ Medium | ⚠️ Medium | ✅ High |
| **Best For** | Cosmos DeFi | HFT | Enterprise | Transparency | High-throughput | Native chains |

---

## Use Case Recommendations

### Interchain DeFi (Lending, Borrowing, DEXs)
**Primary:** Band Protocol (native IBC integration)  
**Secondary:** Pyth Network (high-frequency updates)  
**Tertiary:** DIA Oracle (transparent sourcing)

### High-Frequency Trading
**Primary:** Pyth Network (sub-second updates)  
**Secondary:** Umbrella Network (high throughput)

### Cross-Chain Applications
**Primary:** Band Protocol (IBC-native)  
**Secondary:** Chainlink (cross-chain proven)

### Native Chain Integration
**Primary:** Cosmos SDK Oracle Module (protocol-level)  
**Secondary:** Band Protocol (Cosmos-native)

### Enterprise Applications
**Primary:** Chainlink (proven security)  
**Secondary:** Band Protocol (mature ecosystem)

### Custom Data Requirements
**Primary:** Band Protocol (custom oracle scripts)  
**Secondary:** Chainlink (Any API)

---

## Ecosystem Integration

### Supported Cosmos Chains
- **Cosmos Hub** (ATOM)
- **Osmosis** (OSMO)
- **Injective** (INJ)
- **Cronos** (CRO)
- **Kava** (KAVA)
- **Juno** (JUNO)
- **Akash** (AKT)
- **Evmos** (EVMOS)
- And 50+ other Cosmos SDK chains

### IBC (Inter-Blockchain Communication)
- Oracle data flows between chains via IBC
- Band Protocol provides native IBC oracle feeds
- Pyth Network uses Wormhole + IBC
- Enables cross-chain price data without bridges

### CosmWasm Integration
- Oracle data accessible from smart contracts
- Band Protocol and Pyth Network have CosmWasm contracts
- Query oracle prices from within smart contracts

---

## Configuration

### Common Cosmos Chain Endpoints

```typescript
export const CHAIN_CONFIGS = {
  COSMOS_HUB: {
    rpc: 'https://rpc.cosmos.network',
    rest: 'https://api.cosmos.network',
    chainId: 'cosmoshub-4',
    prefix: 'cosmos'
  },
  OSMOSIS: {
    rpc: 'https://rpc.osmosis.zone',
    rest: 'https://api.osmosis.zone',
    chainId: 'osmosis-1',
    prefix: 'osmo'
  },
  BANDCHAIN: {
    rpc: 'https://rpc-laozi-testnet6.bandchain.org',
    rest: 'https://api-laozi-testnet6.bandchain.org',
    chainId: 'band-laozi-testnet6',
    prefix: 'band'
  }
};
```

---

## Best Practices

1. **Multiple Oracle Strategy:** Use multiple oracles for critical applications to ensure data reliability
2. **Data Freshness:** Always check timestamps on oracle data to ensure it's recent
3. **Error Handling:** Implement robust fallback mechanisms for oracle failures
4. **Gas Optimization:** Use appropriate gas limits for oracle queries
5. **Rate Limits:** Respect API rate limits for off-chain oracle access
6. **Security:** Validate data sources and use cryptographic proofs when available
7. **IBC Considerations:** Understand IBC packet delays when using cross-chain oracles
8. **Testnet First:** Always test oracle integrations on testnets before mainnet deployment

---

## Resources

### Official Documentation
- **Band Protocol:** https://docs.bandchain.org/
- **Pyth Network:** https://docs.pyth.network/documentation/pythnet-price-feeds/cosmos
- **Chainlink:** https://docs.chain.link/
- **DIA Oracle:** https://docs.diadata.org/
- **Umbrella Network:** https://umbrella-network.readme.io/
- **Cosmos SDK:** https://docs.cosmos.network/

### SDKs and Libraries
- **CosmJS:** https://cosmos.github.io/cosmjs/
- **BandChain.js:** https://github.com/bandprotocol/bandchain.js
- **Pyth Client:** https://github.com/pyth-network/pyth-client-js
- **IBC Protocol:** https://ibc.cosmos.network/

### Community
- **Cosmos Discord:** https://discord.gg/cosmosnetwork
- **Band Protocol Discord:** https://discord.com/invite/3t4bsY7
- **Pyth Network Discord:** https://discord.com/invite/pythnetwork
- **Chainlink Discord:** https://discord.gg/chainlink

---

## Troubleshooting

### Common Issues

**Issue:** Oracle data is stale  
**Solution:** Check network connectivity, verify RPC endpoints, ensure oracle service is active

**Issue:** CORS errors when accessing off-chain APIs  
**Solution:** Use server-side requests or configure CORS proxies for browser applications

**Issue:** Gas estimation failures  
**Solution:** Increase gas limits for oracle queries, especially for complex aggregations

**Issue:** IBC packet timeouts  
**Solution:** Adjust timeout parameters, verify relayer activity, check channel status

---

## Contributing

To add new oracle integrations:
1. Create oracle file following existing pattern
2. Export from `index.ts` with `atom` prefix
3. Update this README with oracle details
4. Add usage examples
5. Update metadata in `index.ts`

---

**For more information, see the main [Oracles README](../README.md)**

