# Polkadot (DOT) Blockchain APIs

This directory contains 8 different blockchain API implementations for interacting with the Polkadot network.

## Overview

Polkadot is a next-generation blockchain protocol connecting multiple specialized blockchains into one unified network. It uses the Substrate framework and has several unique characteristics:

- **Account-based**: Uses SS58 address format (not UTXO-based)
- **Multiple Networks**: Polkadot (mainnet), Kusama (canary network), Westend (testnet)
- **Smallest Unit**: Planck (1 DOT = 10^10 Planck)
- **Address Prefixes**: 
  - Polkadot addresses start with `1`
  - Kusama addresses start with capital letters (C, D, E, F, G, H, J, etc.)
  - Generic Substrate addresses start with `5`

## 🚀 Implemented APIs (8 of 8)

### 1. **Subscan API** (Recommended - Most Comprehensive)
**Status:** ✅ **IMPLEMENTED**  
**Rate Limits:** Free with API key (quotas apply)  
**Networks:** Polkadot, Kusama, Westend, and ~100 Substrate networks

**Features:**
- Most comprehensive Substrate ecosystem explorer
- Account balances with staking/bonding info
- Transaction and transfer history
- Block information and searches
- Network statistics
- Identity lookups
- EVM support on compatible chains

**Usage:**
```typescript
import { SubscanAPI, subscanPolkadot } from '@/components/currencyCore/blockchainAPIs/DOT.Polkadot';

// Using singleton (no API key)
const balance = await subscanPolkadot.getBalance('1a1LcBX6hGPKg5aQ6DXZpAHCCzWjckhea4sz3P1PvL3oc4F');

// With API key for higher limits
const subscan = new SubscanAPI({ apiKey: 'YOUR_KEY' }, 'polkadot');
const accountInfo = await subscan.getAccountInfo('1a1LcBX6...');
const transfers = await subscan.getTransferHistory('1a1LcBX6...', 0, 25);
```

---

### 2. **Polkadot.js API** (Official Library)
**Status:** ✅ **IMPLEMENTED** (Placeholder)  
**Rate Limits:** N/A (library, not service)  
**Networks:** All Substrate-based chains

**Features:**
- Official Polkadot JavaScript/TypeScript library
- Direct blockchain interaction via RPC
- Query chain state
- Submit transactions
- Subscribe to events
- Smart contract interaction
- Account and key management

**Note:**
This is a placeholder implementation. Requires `@polkadot/api` package:
```bash
npm install @polkadot/api
```

**Usage:**
```typescript
import { PolkadotjsAPI } from '@/components/currencyCore/blockchainAPIs/DOT.Polkadot';

const api = new PolkadotjsAPI({ endpoint: 'wss://rpc.polkadot.io' }, 'polkadot');
await api.connect();

const balance = await api.getBalance('1a1LcBX6...');
const block = await api.getLatestBlock();

await api.disconnect();
```

---

### 3. **Statescan API** (Substrate Explorer)
**Status:** ✅ **IMPLEMENTED**  
**Rate Limits:** Free access  
**Networks:** Polkadot, Kusama, Westend

**Features:**
- Explorer for Substrate-based chains
- Account information with detailed balances
- Transfer history
- Extrinsic history
- No API key required

**Usage:**
```typescript
import { statescanPolkadot } from '@/components/currencyCore/blockchainAPIs/DOT.Polkadot';

const balance = await statescanPolkadot.getBalance('1a1LcBX6...');
const transfers = await statescanPolkadot.getTransferHistory('1a1LcBX6...', 1, 25);
const extrinsics = await statescanPolkadot.getExtrinsicHistory('1a1LcBX6...', 1, 25);
```

---

### 4. **GetBlock API** (Node Access)
**Status:** ✅ **IMPLEMENTED**  
**Rate Limits:** Free tier available  
**Networks:** Polkadot, Kusama

**Features:**
- Instant access to Polkadot RPC nodes
- Direct blockchain queries via RPC
- Block and chain information
- Submit extrinsics
- Requires API key

**Usage:**
```typescript
import { GetBlockAPI } from '@/components/currencyCore/blockchainAPIs/DOT.Polkadot';

const getblock = new GetBlockAPI({ apiKey: 'YOUR_KEY' }, 'polkadot');

const accountInfo = await getblock.getAccountInfo('1a1LcBX6...');
const block = await getblock.getLatestBlock();
const chain = await getblock.getChainName();
```

---

### 5. **NOWNodes API** (Full Node Access)
**Status:** ✅ **IMPLEMENTED**  
**Rate Limits:** Free API key (5,000 requests/month)  
**Networks:** Polkadot, Kusama

**Features:**
- Full node access and block explorer
- RPC method support
- Account information
- Block queries
- Chain properties
- Runtime version info

**Usage:**
```typescript
import { NOWNodesAPI } from '@/components/currencyCore/blockchainAPIs/DOT.Polkadot';

const nownodes = new NOWNodesAPI({ apiKey: 'YOUR_KEY' }, 'polkadot');

const balance = await nownodes.getBalance('1a1LcBX6...');
const accountInfo = await nownodes.getAccountInfo('1a1LcBX6...');
const props = await nownodes.getChainProperties();
```

---

### 6. **Tokenview API** (Multi-chain Support)
**Status:** ✅ **IMPLEMENTED**  
**Rate Limits:** Free tier (100 requests/day with API key)  
**Networks:** Polkadot, Kusama

**Features:**
- Multi-chain explorer with Polkadot support
- Account balances
- Transaction history
- Latest block info
- Transaction details

**Usage:**
```typescript
import { TokenviewAPI } from '@/components/currencyCore/blockchainAPIs/DOT.Polkadot';

const tokenview = new TokenviewAPI({ apiKey: 'YOUR_KEY' }, 'polkadot');

const balance = await tokenview.getBalance('1a1LcBX6...');
const history = await tokenview.getTransactionHistory('1a1LcBX6...', 1);
const latestBlock = await tokenview.getLatestBlock();
```

---

### 7. **3xpl API** (Multi-chain Explorer)
**Status:** ✅ **IMPLEMENTED**  
**Rate Limits:** Free tier available  
**Networks:** Polkadot, Kusama

**Features:**
- Multi-chain explorer
- Account balances (confirmed and unconfirmed)
- Transaction history
- Transaction details
- Latest block information
- No API key required

**Usage:**
```typescript
import { threexplPolkadot } from '@/components/currencyCore/blockchainAPIs/DOT.Polkadot';

const balance = await threexplPolkadot.getBalance('1a1LcBX6...');
const history = await threexplPolkadot.getTransactionHistory('1a1LcBX6...', 25, 0);
const tx = await threexplPolkadot.getTransaction('0xTxHash...');
```

---

### 8. **Polkascan API** (Substrate Chain Explorer)
**Status:** ✅ **IMPLEMENTED**  
**Rate Limits:** Free access  
**Networks:** Polkadot, Kusama

**Features:**
- Substrate-based chain explorer
- Account information with free/reserved balances
- Extrinsic history
- Block information
- Latest blocks query
- No API key required

**Usage:**
```typescript
import { polkascanPolkadot } from '@/components/currencyCore/blockchainAPIs/DOT.Polkadot';

const balance = await polkascanPolkadot.getBalance('1a1LcBX6...');
const extrinsics = await polkascanPolkadot.getExtrinsicHistory('1a1LcBX6...', 1, 25);
const block = await polkascanPolkadot.getBlock(12345678);
```

---

## 📊 API Comparison

| API | Status | Free Tier | API Key | Best For | Special Features |
|-----|--------|-----------|---------|----------|------------------|
| **Subscan** | ✅ | Quotas | ✅ Yes | Comprehensive explorer | ~100 networks, staking info, identity |
| **Polkadot.js** | ✅ (Placeholder) | Unlimited | ❌ No | Direct blockchain interaction | Official library, full control |
| **Statescan** | ✅ | Unlimited | ❌ No | Simple queries | Clean API, no key required |
| **GetBlock** | ✅ | Free tier | ✅ Yes | Node access | Direct RPC, reliable |
| **NOWNodes** | ✅ | 5k/month | ✅ Yes | Full node access | RPC methods, runtime info |
| **Tokenview** | ✅ | 100/day | ✅ Yes | Multi-chain | Supports multiple chains |
| **3xpl** | ✅ | Free tier | ❌ No | Quick lookups | No key required |
| **Polkascan** | ✅ | Unlimited | ❌ No | Block exploration | Substrate-focused |

**Legend:**
- ✅ Yes: API key required or recommended
- ❌ No: No API key needed

---

## 🎯 Recommended Usage Strategy

### For General Queries (No API Key):
```typescript
import { statescanPolkadot, threexplPolkadot, polkascanPolkadot } from '@/components/currencyCore/blockchainAPIs/DOT.Polkadot';

// Statescan for detailed balance info
const balance = await statescanPolkadot.getBalance('1a1LcBX6...');

// 3xpl for quick transaction lookups
const history = await threexplPolkadot.getTransactionHistory('1a1LcBX6...');

// Polkascan for block exploration
const blocks = await polkascanPolkadot.getLatestBlocks(10);
```

### For Production (With API Keys):
```typescript
import { SubscanAPI, NOWNodesAPI } from '@/components/currencyCore/blockchainAPIs/DOT.Polkadot';

// Subscan for comprehensive data
const subscan = new SubscanAPI({ apiKey: process.env.SUBSCAN_KEY }, 'polkadot');
const accountInfo = await subscan.getAccountInfo('1a1LcBX6...');
const transfers = await subscan.getTransferHistory('1a1LcBX6...', 0, 100);

// NOWNodes for RPC access
const nownodes = new NOWNodesAPI({ apiKey: process.env.NOWNODES_KEY }, 'polkadot');
const balance = await nownodes.getBalance('1a1LcBX6...');
```

### For Direct Blockchain Interaction:
```typescript
// Install @polkadot/api first: npm install @polkadot/api
import { ApiPromise, WsProvider } from '@polkadot/api';

const provider = new WsProvider('wss://rpc.polkadot.io');
const api = await ApiPromise.create({ provider });

// Full blockchain interaction
const { data: { free } } = await api.query.system.account('1a1LcBX6...');
const chain = await api.rpc.system.chain();

await api.disconnect();
```

### Fallback Strategy:
```typescript
async function getBalanceWithFallback(address: string) {
  // Try free APIs first
  try {
    return await statescanPolkadot.getBalance(address);
  } catch (error) {
    console.warn('Statescan failed, trying 3xpl...', error);
    
    try {
      return await threexplPolkadot.getBalance(address);
    } catch (error2) {
      console.warn('3xpl failed, trying Polkascan...', error2);
      
      try {
        return await polkascanPolkadot.getBalance(address);
      } catch (error3) {
        console.warn('Polkascan failed, trying Subscan...', error3);
        
        // Final fallback to Subscan
        return await subscanPolkadot.getBalance(address);
      }
    }
  }
}
```

---

## 🔍 Polkadot Address Format (SS58)

Polkadot uses the SS58 address format with different prefixes for different networks:

### Address Examples:
```typescript
// Polkadot (prefix 0) - always starts with 1
const polkadotAddress = '1a1LcBX6hGPKg5aQ6DXZpAHCCzWjckhea4sz3P1PvL3oc4F';

// Kusama (prefix 2) - always starts with capital letter
const kusamaAddress = 'CpjsLDC1JFyrhm3ftC9Gs4QoyrkHKhZKtK7YqGTRFtTafgp';

// Generic Substrate (prefix 42) - always starts with 5
const substrateAddress = '5CdiCGvTEuzut954STAXRfL8Lazs3KCZa5LPpkPeqqJXdTHp';
```

### Address Conversion:
The same public key can be represented in different formats:
```typescript
// All these addresses represent the same account, just in different formats
PublicKey: 0x192c3c7e5789b461fbf1c7f614ba5eed0b22efc507cda60a5e7fda8e046bcdce
Polkadot:  1a1LcBX6hGPKg5aQ6DXZpAHCCzWjckhea4sz3P1PvL3oc4F
Kusama:    CpjsLDC1JFyrhm3ftC9Gs4QoyrkHKhZKtK7YqGTRFtTafgp
Substrate: 5CdiCGvTEuzut954STAXRfL8Lazs3KCZa5LPpkPeqqJXdTHp
```

Use [Subscan's Address Transform tool](https://polkadot.subscan.io/tools/format_transform) to convert between formats.

---

## 💡 Key Concepts

### Balance Types:
- **Free**: Transferable balance
- **Reserved**: Balance reserved for operations (e.g., governance)
- **Locked/Frozen**: Balance locked for staking or other purposes
- **Total**: Sum of all balances

### Extrinsics vs Transactions:
- **Extrinsics**: Substrate's term for state transitions (includes transactions, governance votes, etc.)
- **Transactions**: Specifically signed extrinsics that transfer value
- **Transfers**: Subset of transactions that move tokens between accounts

### Networks:
- **Polkadot**: Main production network
- **Kusama**: Canary network (experimental, faster governance)
- **Westend**: Test network

---

## 📚 Additional Resources

- [Polkadot Wiki](https://wiki.polkadot.network/)
- [Polkadot.js Documentation](https://polkadot.js.org/docs/)
- [Substrate Documentation](https://docs.substrate.io/)
- [SS58 Address Format](https://wiki.polkadot.network/docs/learn-accounts)
- [Subscan Support](https://support.subscan.io/)
- [Polkadot Account Advanced](https://wiki.polkadot.network/docs/learn-accounts-advanced)

---

## 🚀 Quick Start

```typescript
// 1. Import the API you want to use
import { subscanPolkadot, statescanPolkadot } from '@/components/currencyCore/blockchainAPIs/DOT.Polkadot';

// 2. Get balance (no API key needed for some)
const balance = await statescanPolkadot.getBalance('1a1LcBX6hGPKg5aQ6DXZpAHCCzWjckhea4sz3P1PvL3oc4F');
console.log(`Balance: ${balance.balanceDOT} DOT`);

// 3. Get transaction history
const transfers = await subscanPolkadot.getTransferHistory('1a1LcBX6...', 0, 10);
console.log(`Found ${transfers.transfers.length} transfers`);

// 4. Get latest block
const stats = await subscanPolkadot.getNetworkStats();
console.log(`Latest block: #${stats.blockNum}`);
```

---

**Note:** All APIs support both Polkadot and Kusama networks. Some also support Westend testnet and other Substrate-based chains. Check individual API documentation for specific network support.

