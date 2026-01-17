# Tezos (XTZ) Blockchain APIs

Comprehensive collection of blockchain API implementations for **Tezos (XTZ)**, a self-amending blockchain platform with on-chain governance and smart contracts.

## Overview

This directory contains 5 blockchain API implementations supporting Tezos (XTZ):

1. **TzKT API** - Comprehensive explorer and indexer (free, open-source)
2. **TzStats API** - Analytics-focused explorer by Blockwatch (free)
3. **NOWNodes API** - Full node access (20k requests/day free)
4. **GetBlock API** - RPC node provider (requires key)
5. **Bitquery API** - GraphQL with real-time data (requires key)

---

## APIs

### 1. TzKT API (`tzktAPI.ts`)

**Comprehensive Tezos Explorer and API**

- **Base URLs**:
  - Mainnet: `https://api.tzkt.io`
  - Ghostnet (Testnet): `https://api.ghostnet.tzkt.io`
- **Free Tier**: Free, no authentication, open-source
- **Documentation**: https://tzkt.io/api

**Features**:
- Most comprehensive blockchain data
- REST and WebSocket APIs
- Account balances and operations
- Smart contract storage and BigMap support
- Mempool monitoring
- Token balances and transfers (FA1.2, FA2)
- Delegates (bakers) information
- Voting and governance data
- Network statistics

**Usage**:
```typescript
import { tzktAPI, createTzKTAPI } from '@blockchainAPIs/XTZ.Tezos';

// Get account information
const account = await tzktAPI.getAccount('tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb');

// Get XTZ balance
const balance = await tzktAPI.getBalance('tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb');
console.log('Balance:', balance, 'XTZ');

// Get account operations
const ops = await tzktAPI.getOperations('tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb', undefined, 50);

// Get transactions only
const txs = await tzktAPI.getTransactions('tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb');

// Get token balances
const tokens = await tzktAPI.getTokenBalances('tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb');

// Get token transfers
const transfers = await tzktAPI.getTokenTransfers('tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb');

// Get contract storage
const storage = await tzktAPI.getContractStorage('KT1...');

// Get BigMap keys
const keys = await tzktAPI.getBigMapKeys(12345);

// Get current head block
const head = await tzktAPI.getHead();

// Get delegates (bakers)
const bakers = await tzktAPI.getDelegates(50);

// For testnet
const testnetAPI = createTzKTAPI({ network: 'ghostnet' });
```

**Key Interfaces**:
- `TzKTAccount` - Account with balance and metadata
- `TzKTOperation` - Operation/transaction details
- `TzKTTransaction` - Transaction-specific data
- `TzKTBlock` - Block information
- `TzKTTokenBalance` - Token balance for account
- `TzKTTokenTransfer` - Token transfer event

---

### 2. TzStats API (`tzstatsAPI.ts`)

**Analytics-focused Tezos Explorer by Blockwatch**

- **Base URL**: `https://api.tzstats.com`
- **Free Tier**: Free API access
- **Website**: https://tzstats.com/
- **Documentation**: https://tzstats.com/docs/api

**Features**:
- In-depth blockchain statistics
- Michelson decoding
- Full BigMap support
- Time-series and table APIs
- Advanced analytics
- Market data
- Supply information

**Usage**:
```typescript
import { tzstatsAPI, createTzStatsAPI } from '@blockchainAPIs/XTZ.Tezos';

// Get account
const account = await tzstatsAPI.getAccount('tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb');

// Get balance
const balance = await tzstatsAPI.getBalance('tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb');

// Get operations
const ops = await tzstatsAPI.getOperations('tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb');

// Get contract calls
const calls = await tzstatsAPI.getContractCalls('KT1...');

// Get market data
const market = await tzstatsAPI.getMarketData();

// Get supply info
const supply = await tzstatsAPI.getSupply();

// Get statistics
const stats = await tzstatsAPI.getStatistics();

// Search
const results = await tzstatsAPI.search('tz1...');
```

**Key Interfaces**:
- `TzStatsAccount` - Account with detailed statistics
- `TzStatsOperation` - Operation with analytics
- `TzStatsBlock` - Block with comprehensive data

---

### 3. NOWNodes API (`nowNodesAPI.ts`)

**Full node access with free tier**

- **Base URL**: `https://xtz.nownodes.io`
- **Free Tier**: 20,000 requests/day with API key
- **Website**: https://nownodes.io/nodes/tezos-xtz

**Features**:
- Full Tezos RPC node access
- Block explorer data
- Testnet support
- Transaction broadcasting
- Contract interaction

**Usage**:
```typescript
import { createNOWNodesTezosAPI } from '@blockchainAPIs/XTZ.Tezos';

// API key is required
const nownodes = createNOWNodesTezosAPI('YOUR_API_KEY');

// Get balance
const balance = await nownodes.getBalance('tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb');

// Get account
const account = await nownodes.getAccount('tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb');

// Get block
const block = await nownodes.getBlock('head');

// Inject operation (broadcast)
await nownodes.injectOperation(signedOp);

// Get contract storage
const storage = await nownodes.getContractStorage('KT1...');

// For testnet
const testnetAPI = createNOWNodesTezosAPI('YOUR_API_KEY', 'testnet');
```

---

### 4. GetBlock API (`getBlockAPI.ts`)

**RPC node provider for Tezos blockchain**

- **Endpoint**: `https://go.getblock.io/{API_KEY}/`
- **Free Tier**: Free tier with API key
- **Website**: https://getblock.io/nodes/xtz/
- **Documentation**: https://getblock.io/docs/tezos/

**Features**:
- Instant Tezos RPC node access
- Reliable infrastructure
- High availability
- Transaction broadcasting
- Contract queries

**Usage**:
```typescript
import { createGetBlockTezosAPI } from '@blockchainAPIs/XTZ.Tezos';

// API key is required
const getblock = createGetBlockTezosAPI('YOUR_API_KEY');

// Get balance
const balance = await getblock.getBalance('tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb');

// Get block
const block = await getblock.getBlock('head');

// Inject operation
await getblock.injectOperation(signedOp);

// Get contract storage
const storage = await getblock.getContractStorage('KT1...');

// For testnet
const testnetAPI = createGetBlockTezosAPI('YOUR_API_KEY', 'testnet');
```

---

### 5. Bitquery API (`bitqueryAPI.ts`)

**GraphQL API with real-time and historical data**

- **Base URL**: `https://graphql.bitquery.io`
- **Free Tier**: Free tier available with API key
- **Website**: https://bitquery.io/blockchains/tezos-blockchain-api

**Features**:
- Historical and real-time blockchain data
- Flexible GraphQL queries
- Token transfers and operations
- Complex filtering
- Real-time data streaming

**Usage**:
```typescript
import { createBitqueryTezosAPI } from '@blockchainAPIs/XTZ.Tezos';

// API key is required
const bitquery = createBitqueryTezosAPI('YOUR_API_KEY');

// Get balance
const balance = await bitquery.getBalance('tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb');

// Get operations
const ops = await bitquery.getOperations('tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb');

// Get transfers
const transfers = await bitquery.getTransfers('tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb');

// Get token transfers
const tokenTransfers = await bitquery.getTokenTransfers('tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb');
```

---

## Common Use Cases

### Get XTZ Balance

```typescript
import { tzktAPI } from '@blockchainAPIs/XTZ.Tezos';

const balance = await tzktAPI.getBalance('tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb');
console.log('Balance:', balance, 'XTZ');
```

### Get Transaction History

```typescript
import { tzktAPI } from '@blockchainAPIs/XTZ.Tezos';

const txs = await tzktAPI.getTransactions('tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb', 100);
console.log('Transactions:', txs);
```

### Get Token Balances (FA1.2, FA2)

```typescript
import { tzktAPI } from '@blockchainAPIs/XTZ.Tezos';

const tokens = await tzktAPI.getTokenBalances('tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb');
tokens.forEach(t => {
  console.log(`${t.token.metadata?.symbol || 'Token'}: ${t.balance}`);
});
```

### Query Smart Contract Storage

```typescript
import { tzktAPI } from '@blockchainAPIs/XTZ.Tezos';

const storage = await tzktAPI.getContractStorage('KT1PWx2mnDueood7fEmfbBDKx1D9BAnnXitn');
console.log('Contract storage:', storage);
```

### Get Delegates (Bakers)

```typescript
import { tzktAPI } from '@blockchainAPIs/XTZ.Tezos';

const bakers = await tzktAPI.getDelegates(50);
console.log('Active bakers:', bakers);
```

---

## Rate Limits and Free Tier Summary

| API | Free Tier Limit | API Key Required | Best For |
|-----|----------------|------------------|----------|
| TzKT | No limit | ❌ | Explorer, comprehensive data |
| TzStats | No limit specified | ❌ | Analytics, statistics |
| NOWNodes | 20,000/day | ✅ | Full RPC node access |
| GetBlock | Free tier | ✅ | RPC access, reliability |
| Bitquery | Limited | ✅ | GraphQL, complex queries |

---

## Tezos-Specific Features

### Balance Units
- **Mutez**: Smallest unit (1 XTZ = 1,000,000 mutez)
- Most APIs return XTZ (already converted from mutez)

### Address Format
- **Base58 encoding** with prefixes
- Implicit accounts: `tz1`, `tz2`, `tz3`
- Smart contracts: `KT1`
- Example: `tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb`

### Cryptography
- **Ed25519** (tz1), **secp256k1** (tz2), or **P-256** (tz3) keys
- Blake2b hashing
- Public key hashes as addresses

### Account Types
- **Implicit accounts**: User wallets (tz1, tz2, tz3)
- **Originated accounts**: Smart contracts (KT1)
- **Bakers**: Delegates that participate in consensus

### Token Standards
- **FA1.2**: Fungible token standard (similar to ERC-20)
- **FA2**: Multi-asset standard (fungible, NFT, semi-fungible)
- **Tickets**: Future base-layer data type

### Smart Contracts
- Written in **Michelson** or higher-level languages (SmartPy, LIGO, Archetype)
- On-chain storage and BigMaps
- Formal verification capabilities

### Baking (Consensus)
- Liquid Proof-of-Stake (LPoS)
- Delegates (bakers) secure the network
- Delegation without giving up custody
- Rewards for baking and endorsing

### Governance
- **Self-amending blockchain**
- On-chain voting process
- Proposal, exploration, cooldown, promotion, adoption phases
- Amendment process integrated into protocol

### Operations
- **Transaction**: Transfer XTZ or call contract
- **Origination**: Deploy smart contract
- **Delegation**: Delegate to a baker
- **Reveal**: Reveal public key
- **Endorsement**: Attest to block validity
- **Activation**: Activate fundraiser account

---

## Network Support

All APIs support multiple Tezos networks:
- **Mainnet** (production)
- **Ghostnet** (primary testnet) - Faucet available
- **Other testnets** may be supported

---

## Installation

All dependencies are already included in the project's `package.json`:

```bash
npm install axios
```

For transaction creation and signing:
```bash
npm install @taquito/taquito @taquito/signer
```

---

## API Status

All APIs listed are active and maintained as of October 2025. Tezos continues to be a leading blockchain for institutional adoption and DeFi applications.

## Support

For API-specific issues:
- **TzKT**: https://tzkt.io/
- **TzStats**: https://tzstats.com/
- **NOWNodes**: https://nownodes.io/nodes/tezos-xtz
- **GetBlock**: https://getblock.io/nodes/xtz/
- **Bitquery**: https://bitquery.io/blockchains/tezos-blockchain-api

For issues with this implementation, please refer to the project's main repository.

