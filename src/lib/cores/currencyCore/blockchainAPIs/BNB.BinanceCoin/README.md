# BNB (Binance Smart Chain) Blockchain APIs

This directory contains modular blockchain API implementations for interacting with the BNB Smart Chain (BSC) network.

**Important Note:** BNB Smart Chain is an **EVM-compatible, account-based** blockchain (like Ethereum), not UTXO-based (like Bitcoin). Therefore, UTXO-related functionality is not applicable.

## Available APIs

BNB Smart Chain has **4 different API implementations** available:

### 1. BscScan API (Official Block Explorer) - Recommended for Rich Features

Located in `BNB.BinanceCoin/bscscanAPI.ts`

**Features:**
- Get BNB balance for single or multiple addresses (up to 20)
- Get transaction history with pagination
- Get internal transactions
- Get BEP-20 token transfer events
- Get transaction by hash and receipt
- Get current gas price
- Get latest block number
- Comprehensive indexed data

**API Limits:**
- Free tier: **~5 calls/second**
- Free tier: **~100,000 calls/day**
- **Requires free API key** (get one at https://bscscan.com/myapikey)
- Attribution required

**Endpoints:**
- Mainnet: `https://api.bscscan.com/api`
- Testnet: `https://api-testnet.bscscan.com/api`
- Documentation: https://docs.bscscan.com

**Usage:**
```typescript
import { BscScanAPI } from '@/components/currencyCore/blockchainAPIs/BNB.BinanceCoin';

// Requires API key
const api = new BscScanAPI({ apiKey: 'YOUR_BSCSCAN_API_KEY' });

// Get balance
const balance = await api.getBalance('0x...');

// Get transaction history
const history = await api.getTransactionHistory('0x...', 0, 99999999, 1, 100);

// Get token transfers
const tokenTransfers = await api.getTokenTransfers('0x...');

// Get multiple balances at once (up to 20 addresses)
const balances = await api.getBalanceMulti(['0x...', '0x...']);
```

---

### 2. Public RPC API (Official Binance Nodes) - Recommended for No API Key

Located in `BNB.BinanceCoin/publicRPCAPI.ts`

**Features:**
- Get BNB balance
- Get transaction count (nonce)
- Get transaction by hash and receipt
- Get block by number
- Get latest block number
- Get current gas price
- Estimate gas for transactions
- Send raw transactions
- Get smart contract code
- Call smart contract functions (read-only)
- Get chain ID
- **13 official Binance RPC endpoints** for failover

**API Limits:**
- Free public access
- Rate limits vary by endpoint provider
- No API key required

**Public Endpoints:**
```typescript
// Mainnet (13 endpoints):
- https://bsc-dataseed1.binance.org
- https://bsc-dataseed2.binance.org
- https://bsc-dataseed3.binance.org
- https://bsc-dataseed4.binance.org
- https://bsc-dataseed1.defibit.io
- https://bsc-dataseed2.defibit.io
- https://bsc-dataseed3.defibit.io
- https://bsc-dataseed4.defibit.io
- https://bsc-dataseed1.ninicoin.io
- https://bsc-dataseed2.ninicoin.io
- https://bsc-dataseed3.ninicoin.io
- https://bsc-dataseed4.ninicoin.io
- https://bsc-rpc.publicnode.com

// Testnet (4 endpoints):
- https://data-seed-prebsc-1-s1.binance.org:8545
- https://data-seed-prebsc-2-s1.binance.org:8545
- https://data-seed-prebsc-1-s3.binance.org:8545
- https://data-seed-prebsc-2-s3.binance.org:8545
```

**Usage:**
```typescript
import { PublicRPCAPI, publicRPCMainnet } from '@/components/currencyCore/blockchainAPIs/BNB.BinanceCoin';

// Using default endpoint
const balance = await publicRPCMainnet.getBalance('0x...');

// Switch between public endpoints for failover
const api = new PublicRPCAPI('mainnet');
api.switchEndpoint(1); // Switch to second endpoint
const balance2 = await api.getBalance('0x...');

// Get list of available endpoints
const endpoints = PublicRPCAPI.getPublicEndpoints('mainnet');
console.log('Available RPC endpoints:', endpoints);

// Use custom endpoint
import { createPublicRPCAPI } from '@/components/currencyCore/blockchainAPIs/BNB.BinanceCoin';
const customApi = createPublicRPCAPI('https://your-custom-rpc.com', 'mainnet');
```

---

### 3. Ankr API - Free RPC Provider with WebSocket Support

Located in `BNB.BinanceCoin/ankrAPI.ts`

**Features:**
- Get BNB balance
- Get transaction count (nonce)
- Get transaction by hash and receipt
- Get block by number
- Get latest block number
- Get current gas price
- Estimate gas for transactions
- Send raw transactions
- Get smart contract code
- Call smart contract functions (read-only)
- Get chain ID
- **HTTPS & WebSocket endpoints**

**API Limits:**
- Free tier with rate limits
- Optional API key for premium features
- No sign-up required for basic usage

**Endpoints:**
- Mainnet HTTPS: `https://rpc.ankr.com/bsc`
- Mainnet WebSocket: `wss://rpc.ankr.com/bsc/ws`
- Testnet HTTPS: `https://rpc.ankr.com/bsc_testnet_chapel`
- Testnet WebSocket: `wss://rpc.ankr.com/bsc_testnet_chapel/ws`
- Documentation: https://www.ankr.com/rpc/bsc

**Usage:**
```typescript
import { ankrMainnet, AnkrAPI } from '@/components/currencyCore/blockchainAPIs/BNB.BinanceCoin';

// Using default instance
const balance = await ankrMainnet.getBalance('0x...');

// With optional API key for premium features
const api = new AnkrAPI({ 
  network: 'mainnet',
  apiKey: 'YOUR_ANKR_API_KEY' // optional
});

// Get WebSocket URL for real-time subscriptions
const wsUrl = api.getWebSocketUrl();
console.log('WebSocket URL:', wsUrl);
```

---

### 4. 1RPC API - Privacy-Focused Free RPC

Located in `BNB.BinanceCoin/oneRPCAPI.ts`

**Features:**
- Get BNB balance
- Get transaction count (nonce)
- Get transaction by hash and receipt
- Get block by number
- Get latest block number
- Get current gas price
- Estimate gas for transactions
- Send raw transactions
- Get smart contract code
- Call smart contract functions (read-only)
- Get chain ID
- **Privacy-focused** (no tracking)

**API Limits:**
- Free public access
- Rate limits apply
- No API key required
- No sign-up required

**Endpoints:**
- Mainnet: `https://1rpc.io/bnb`
- Testnet: `https://1rpc.io/bnb-testnet`
- Website: https://www.1rpc.io/ecosystem/bnb-chain

**Usage:**
```typescript
import { oneRPCMainnet } from '@/components/currencyCore/blockchainAPIs/BNB.BinanceCoin';

// Simple usage - no API key needed
const balance = await oneRPCMainnet.getBalance('0x...');
const gasPrice = await oneRPCMainnet.getGasPrice();
const txReceipt = await oneRPCMainnet.getTransactionReceipt('0x...');
```

---

## API Comparison

| Feature | BscScan | Public RPC | Ankr | 1RPC |
|---------|---------|------------|------|------|
| **Get Balance** | ✅ | ✅ | ✅ | ✅ |
| **Multi-Balance** | ✅ (20 max) | ❌ | ❌ | ❌ |
| **TX History** | ✅ Advanced | ❌ | ❌ | ❌ |
| **Internal TX** | ✅ | ❌ | ❌ | ❌ |
| **Token Transfers** | ✅ BEP-20 | ❌ | ❌ | ❌ |
| **TX by Hash** | ✅ | ✅ | ✅ | ✅ |
| **TX Receipt** | ✅ | ✅ | ✅ | ✅ |
| **Get Block** | ✅ | ✅ | ✅ | ✅ |
| **Gas Price** | ✅ | ✅ | ✅ | ✅ |
| **Estimate Gas** | ❌ | ✅ | ✅ | ✅ |
| **Broadcast TX** | ❌ | ✅ | ✅ | ✅ |
| **Contract Call** | ❌ | ✅ | ✅ | ✅ |
| **WebSocket** | ❌ | ❌ | ✅ | ❌ |
| **Multiple Endpoints** | ❌ | ✅ (13) | ❌ | ❌ |
| **API Key Required** | ✅ | ❌ | ❌ (optional) | ❌ |
| **Free Tier Limit** | 5 calls/sec, 100k/day | Rate Limited | Rate Limited | Rate Limited |
| **Privacy-Focused** | ❌ | ❌ | ❌ | ✅ |

---

## Recommended Usage Pattern

For a complete BNB Smart Chain implementation, use multiple APIs with fallback:

```typescript
import { 
  BscScanAPI,
  publicRPCMainnet,
  ankrMainnet,
  oneRPCMainnet
} from '@/components/currencyCore/blockchainAPIs/BNB.BinanceCoin';

// Primary: Use BscScan for rich indexed data (if you have API key)
const bscscan = new BscScanAPI({ apiKey: process.env.BSCSCAN_API_KEY });

// Secondary: Use Public RPC for transaction broadcasting
const publicRPC = publicRPCMainnet;

// Tertiary: Use Ankr or 1RPC as fallback
const ankr = ankrMainnet;
const oneRPC = oneRPCMainnet;

// Example: Get balance with fallback
async function getBalance(address: string) {
  // Try BscScan first (if API key available)
  if (process.env.BSCSCAN_API_KEY) {
    try {
      return await bscscan.getBalance(address);
    } catch (error) {
      console.log('BscScan failed, trying Public RPC...');
    }
  }
  
  // Try Public RPC
  try {
    return await publicRPC.getBalance(address);
  } catch (error) {
    console.log('Public RPC failed, trying Ankr...');
    try {
      return await ankr.getBalance(address);
    } catch (error2) {
      console.log('Ankr failed, trying 1RPC...');
      return await oneRPC.getBalance(address);
    }
  }
}

// Example: Broadcast transaction
async function broadcastTransaction(signedTx: string) {
  // Try Public RPC first
  try {
    return await publicRPC.sendRawTransaction(signedTx);
  } catch (error) {
    console.log('Public RPC failed, trying Ankr...');
    try {
      return await ankr.sendRawTransaction(signedTx);
    } catch (error2) {
      console.log('Ankr failed, trying 1RPC...');
      return await oneRPC.sendRawTransaction(signedTx);
    }
  }
}

// Example: Get transaction history (BscScan only)
async function getTransactionHistory(address: string) {
  if (!process.env.BSCSCAN_API_KEY) {
    throw new Error('BscScan API key required for transaction history');
  }
  return await bscscan.getTransactionHistory(address);
}
```

---

## BNB Smart Chain Specifics

### EVM-Compatible Account Model
Unlike Bitcoin (UTXO-based), BNB Smart Chain uses an Ethereum-compatible account-based model:
- No UTXOs to fetch
- Accounts have balances in BNB and BEP-20 tokens
- Smart contract support
- Compatible with Ethereum tools (MetaMask, Web3.js, ethers.js)

### Units
- **Wei**: Base unit (1 BNB = 10^18 Wei)
- **Gwei**: 1 Gwei = 10^9 Wei (commonly used for gas prices)
- **BNB**: 1 BNB = 10^18 Wei

### Chain IDs
- **Mainnet**: 56
- **Testnet**: 97

### Transaction Types
- Standard transfers (BNB)
- BEP-20 token transfers
- Smart contract interactions
- Internal transactions (contract-to-contract)

### Gas
- Dynamic gas pricing (like Ethereum)
- Typical gas price: 3-5 Gwei (much lower than Ethereum)
- Block gas limit: 140,000,000

---

## Error Handling

All APIs follow consistent error handling:

```typescript
try {
  const balance = await api.getBalance(address);
} catch (error) {
  if (error.message.includes('rate limit')) {
    // Rate limit exceeded, implement retry logic
  } else if (error.message.includes('API key')) {
    // API key issue (BscScan)
  } else {
    // Other errors
  }
}
```

---

## Rate Limiting

| API | Free Limit | Notes |
|-----|------------|-------|
| BscScan | 5 calls/sec, 100k/day | Requires API key |
| Public RPC | Varies by endpoint | Multiple endpoints available |
| Ankr | Rate limited | Free tier, optional paid plans |
| 1RPC | Rate limited | Public access |

### Rate Limit Best Practices
1. Implement exponential backoff
2. Cache responses when possible
3. Use BscScan for indexed data queries
4. Use Public RPC/Ankr/1RPC for broadcasting
5. Implement fallback between endpoints
6. For Public RPC, switch endpoints on failure

---

## Getting Started

### 1. For Rich Indexed Data (Transaction History, Token Transfers)
```typescript
import { BscScanAPI } from '@/components/currencyCore/blockchainAPIs/BNB.BinanceCoin';

// Get free API key at https://bscscan.com/myapikey
const api = new BscScanAPI({ apiKey: 'YOUR_API_KEY' });

const balance = await api.getBalance('0x...');
const history = await api.getTransactionHistory('0x...');
const tokens = await api.getTokenTransfers('0x...');
```

### 2. For Simple Queries (No API Key)
```typescript
import { publicRPCMainnet } from '@/components/currencyCore/blockchainAPIs/BNB.BinanceCoin';

const balance = await publicRPCMainnet.getBalance('0x...');
const txReceipt = await publicRPCMainnet.getTransactionReceipt('0x...');
```

### 3. For Transaction Broadcasting
```typescript
import { publicRPCMainnet } from '@/components/currencyCore/blockchainAPIs/BNB.BinanceCoin';

// Sign transaction with your preferred library (ethers.js, web3.js, etc.)
const signedTx = '0x...'; // signed transaction hex

const txHash = await publicRPCMainnet.sendRawTransaction(signedTx);
console.log('Transaction hash:', txHash);
```

### 4. For Real-Time Data (WebSocket)
```typescript
import { ankrMainnet } from '@/components/currencyCore/blockchainAPIs/BNB.BinanceCoin';

const wsUrl = ankrMainnet.getWebSocketUrl();
// Use with your WebSocket client for real-time subscriptions
```

### 5. Multiple Endpoint Fallback
```typescript
import { PublicRPCAPI } from '@/components/currencyCore/blockchainAPIs/BNB.BinanceCoin';

const endpoints = PublicRPCAPI.getPublicEndpoints('mainnet');

for (let i = 0; i < endpoints.length; i++) {
  try {
    const api = new PublicRPCAPI('mainnet');
    api.switchEndpoint(i);
    const balance = await api.getBalance('0x...');
    console.log('Success with endpoint:', endpoints[i]);
    break;
  } catch (error) {
    console.log(`Endpoint ${i} failed, trying next...`);
  }
}
```

---

## Resources

- **BNB Smart Chain Official:** https://www.bnbchain.org/
- **BscScan (Official Explorer):** https://bscscan.com/
- **BscScan API Docs:** https://docs.bscscan.com/
- **Public RPC Nodes:** https://docs.bscscan.com/misc-tools-and-utilities/public-rpc-nodes
- **Ankr:** https://www.ankr.com/rpc/bsc/
- **1RPC:** https://www.1rpc.io/ecosystem/bnb-chain
- **ChainList:** https://chainlist.org/chain/56
- **BNB Chain Docs:** https://docs.bnbchain.org/

---

**Last Updated:** October 12, 2025

