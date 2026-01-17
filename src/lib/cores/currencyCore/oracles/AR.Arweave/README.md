# Arweave (AR) Oracles

This directory contains oracle implementations for the Arweave blockchain ecosystem. Arweave's unique permanent storage model and AO compute layer enable innovative oracle solutions that leverage the Permaweb for data verifiability.

## 🌐 Available Oracles

### 1. **RedStone Oracle** - Modular Price Oracle with Permanent Storage
- **File**: `redstone.ts`
- **Type**: Modular Price Oracle Network
- **Key Features**:
  - Stores all data permanently on Arweave
  - 1000+ asset price feeds
  - High-frequency updates
  - Signature verification
  - Historical data access
  - SmartWeave and Warp Contracts integration

**Installation:**
```bash
npm install redstone-api
```

### 2. **0rbit Oracle** - Decentralized Arbitrary Data Oracle
- **File**: `orbit.ts`
- **Type**: Permissionless Oracle for Arbitrary Data
- **Key Features**:
  - Fetch data from any URL
  - Built on AO (Arweave's compute layer)
  - Permissionless and decentralized
  - Results stored on Arweave
  - Web2 to Web3 bridge

**Installation:**
```bash
npm install @permaweb/aoconnect arweave-wallet-kit
```

### 3. **DIA Oracle** - Multi-Source Price Oracle
- **File**: `dia.ts`
- **Type**: Transparent Multi-Source Price Oracle
- **Key Features**:
  - 20,000+ assets supported
  - 85+ exchange aggregation
  - Transparent sourcing
  - Historical data
  - Exchange breakdown
  - REST and GraphQL APIs

**Installation:**
```bash
npm install axios
```

### 4. **Kyve Network** - Data Validation and Archival
- **File**: `kyve.ts`
- **Type**: Data Validation Oracle
- **Key Features**:
  - Decentralized data validation
  - Permanent archival on Arweave
  - Cross-chain data bridging
  - Custom data pools

**Installation:**
```bash
npm install @kyvejs/sdk
```

### 5. **WeaveDB Oracle** - Decentralized Database
- **File**: `weavedb.ts`
- **Type**: Database Oracle
- **Key Features**:
  - NoSQL database as a smart contract
  - Complex query support
  - Decentralized state management
  - Cryptographic access control

**Installation:**
```bash
npm install weavedb-sdk-node
```

### 6. **EverPay** - Cross-Chain Payment Oracle
- **File**: `everpay.ts`
- **Type**: Payment and Price Oracle
- **Key Features**:
  - Real-time price discovery
  - Instant transaction finality
  - Cross-chain support
  - Zero-fee transactions

**Installation:**
```bash
npm install everpay
```

### 7. **ANS & ArDrive** - Metadata Oracle
- **File**: `ans.ts`
- **Type**: Metadata and File Verification
- **Key Features**:
  - Name resolution (ArNS)
  - File integrity verification
  - Decentralized identity
  - Permanent hosting

**Installation:**
```bash
npm install @ar-io/sdk ardrive-core-js
```

## 🔧 Integration Patterns

### Price Feeds for DeFi
```typescript
// Use RedStone for high-frequency price feeds
import redstone from 'redstone-api';

async function getDeFiPrice(asset: string) {
  const price = await redstone.getPrice(asset);
  return {
    value: price.value,
    timestamp: price.timestamp,
    verified: price.permawebTx, // Verifiable on Arweave
  };
}
```

### Arbitrary Data Fetching
```typescript
// Use 0rbit for custom data sources
import { OrbitOracleClient } from './orbit';

const orbit = new OrbitOracleClient(ORBIT_PROCESS_ID, wallet);
const data = await orbit.fetchData('https://api.custom-source.com/data');
```

### Data Validation
```typescript
// Use Kyve for validated data retrieval
import { Kyve } from "@kyvejs/sdk";
const kyve = new Kyve({ network: "arweave" });
// Query validated data items...
```

## 🏗 Architecture

### Permanent Storage Model
- **RedStone, Kyve, WeaveDB**: Store core data permanently on Arweave
- **Verification**: Data can be verified by checking Arweave transaction IDs

### AO Integration
- **0rbit**: Built on AO (Arweave's compute layer)
- **Message Passing**: Uses AO's message-passing model

### Smart Contract Integration
- **SmartWeave**: RedStone and WeaveDB integrate with SmartWeave
- **Warp Contracts**: RedStone supports Warp Contracts

## 📊 Comparison

| Oracle | Best For | Data Type | Storage | Integration |
|--------|----------|-----------|---------|-------------|
| **RedStone** | Price feeds, DeFi | Price data | Permanent | SmartWeave/Warp |
| **0rbit** | Web2 bridge | Any web data | Optional | AO processes |
| **DIA** | Aggregation | Price data | External | REST/GraphQL |
| **Kyve** | Validation | Validated data | Permanent | SDK |
| **WeaveDB** | Complex data | NoSQL data | Permanent | SmartWeave |
| **EverPay** | Payments | Price/Swap | Permanent | SDK |
| **ANS** | Metadata | Names/Files | Permanent | SDK |

## 🚀 Getting Started

```typescript
// Import Arweave oracles
import { arOraclesLazy } from '@/components/currencyCore/oracles/AR.Arweave';

// Use RedStone for price feeds
const redstone = await arOraclesLazy.redstone();

// Use Kyve for validation
const kyve = await arOraclesLazy.kyve();

// Use 0rbit for arbitrary data
const orbit = await arOraclesLazy.orbit();
```

## 🔗 External Resources

- **RedStone**: https://redstone.finance/
- **0rbit**: https://0rbit.co/
- **DIA**: https://www.diadata.org/
- **Kyve**: https://www.kyve.network/
- **WeaveDB**: https://weavedb.dev/
- **EverPay**: https://everpay.io/
- **ArNS**: https://ar.io/arns/
- **Arweave Docs**: https://docs.arweave.org/
