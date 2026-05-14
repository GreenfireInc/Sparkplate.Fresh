# Algorand Blockchain APIs

This directory contains modular blockchain API implementations for interacting with the Algorand network.

**Important Note:** Algorand is an **account-based** blockchain (like Ethereum), not UTXO-based (like Bitcoin). Therefore, UTXO-related functionality is not applicable.

## Available APIs

Algorand has **6 different API implementations** available:

### 1. AlgoExplorer API (Recommended for Simple Queries)

Located in `ALGO.Algorand/algoExplorerAPI.ts`

**Features:**
- Get account balance and information
- Broadcast transactions
- Get transaction history
- Get network statistics
- Get transaction by ID

**API Limits:**
- Free tier: Public API with rate limits
- No API key required
- Rate limiting applies

**Endpoints:**
- Mainnet: `https://algoexplorerapi.io`
- Testnet: `https://testnet.algoexplorerapi.io`

**Usage:**
```typescript
import { AlgoExplorerAPI } from '@/components/currencyCore/blockchainAPIs/ALGO.Algorand';

const api = new AlgoExplorerAPI('mainnet');
const balance = await api.getBalance('ALGORAND_ADDRESS_HERE');
console.log(`Balance: ${balance.balanceAlgo} ALGO`);

const history = await api.getTransactionHistory('ALGORAND_ADDRESS_HERE', 10);
console.log(`Found ${history.transactions.length} transactions`);
```

---

### 2. Algorand Node API (Algod) - Recommended for Broadcasting

Located in `ALGO.Algorand/algoNodeAPI.ts`

**Features:**
- Get account balance and information
- Broadcast transactions
- Get suggested transaction parameters (required for creating transactions)
- Wait for transaction confirmation
- Get node status

**API Limits:**
- Free tier: Public nodes via Algonode.io
- No API key required
- Rate limiting applies

**Endpoints:**
- Mainnet: `https://mainnet-api.algonode.cloud`
- Testnet: `https://testnet-api.algonode.cloud`

**Usage:**
```typescript
import { AlgoNodeAPI } from '@/components/currencyCore/blockchainAPIs/ALGO.Algorand';

const api = new AlgoNodeAPI('mainnet');

// Get suggested params for creating a transaction
const params = await api.getSuggestedParams();

// Broadcast a signed transaction
const result = await api.broadcastTransaction(signedTxnBytes);
console.log(`Transaction ID: ${result.txId}`);

// Wait for confirmation
const confirmation = await api.waitForConfirmation(result.txId);
console.log(`Confirmed in round: ${confirmation.confirmedRound}`);
```

---

### 3. Algorand Indexer API (Recommended for Transaction History)

Located in `ALGO.Algorand/algoIndexerAPI.ts`

**Features:**
- Get account balance and information
- **Advanced transaction history** with filtering
- Search transactions by various criteria
- Get transaction by ID
- Search for assets (ASAs)
- Network health status

**API Limits:**
- Free tier: Public indexer via Algonode.io
- No API key required
- Rate limiting applies

**Endpoints:**
- Mainnet: `https://mainnet-idx.algonode.cloud`
- Testnet: `https://testnet-idx.algonode.cloud`

**Usage:**
```typescript
import { AlgoIndexerAPI } from '@/components/currencyCore/blockchainAPIs/ALGO.Algorand';

const api = new AlgoIndexerAPI('mainnet');

// Get transaction history with pagination
const history = await api.getTransactionHistory('ALGORAND_ADDRESS_HERE', 50);
console.log(`Found ${history.transactions.length} transactions`);

// Search for specific transactions
const searchResults = await api.searchTransactions({
  address: 'ALGORAND_ADDRESS_HERE',
  addressRole: 'sender',
  txType: 'pay',
  minRound: 1000000,
  limit: 20
});

// Search for assets
const assets = await api.searchAssets({
  creator: 'ALGORAND_ADDRESS_HERE',
  limit: 10
});
```

---

### 4. PureStake API (Requires API Key)

Located in `ALGO.Algorand/pureStakeAPI.ts`

**Features:**
- All Algod features (balance, broadcast, suggested params)
- All Indexer features (transaction history, asset search)
- **Higher rate limits** with API key
- Combined Algod + Indexer in one API

**API Limits:**
- Free tier: 25,000 requests/day with API key
- Requires registration at https://developer.purestake.io/
- Higher rate limits available on paid plans

**Endpoints:**
- Mainnet Algod: `https://mainnet-algorand.api.purestake.io/ps2`
- Mainnet Indexer: `https://mainnet-algorand.api.purestake.io/idx2`
- Testnet Algod: `https://testnet-algorand.api.purestake.io/ps2`
- Testnet Indexer: `https://testnet-algorand.api.purestake.io/idx2`

**Usage:**
```typescript
import { PureStakeAPI } from '@/components/currencyCore/blockchainAPIs/ALGO.Algorand';

// Requires API key from https://developer.purestake.io/
const api = new PureStakeAPI('mainnet', {
  apiKey: 'YOUR_PURESTAKE_API_KEY'
});

const balance = await api.getBalance('ALGORAND_ADDRESS_HERE');
const history = await api.getTransactionHistory('ALGORAND_ADDRESS_HERE', 50);
```

---

### 5. Dappflow API

Located in `ALGO.Algorand/dappflowAPI.ts`

**Features:**
- Get account balance and information
- Broadcast transactions
- Get suggested transaction parameters
- Get node status
- Basic transaction history

**API Limits:**
- Free tier: Public API
- Optional API key for higher limits
- Rate limiting applies

**Endpoints:**
- Mainnet: `https://mainnet-api.dappflow.org`
- Testnet: `https://testnet-api.dappflow.org`

**Usage:**
```typescript
import { DappflowAPI } from '@/components/currencyCore/blockchainAPIs/ALGO.Algorand';

// Without API key
const api = new DappflowAPI('mainnet');
const balance = await api.getBalance('YOUR_ADDRESS');

// With API key (for higher limits)
const apiWithKey = new DappflowAPI('mainnet', { apiKey: 'YOUR_KEY' });
const params = await apiWithKey.getSuggestedParams();
```

---

### 6. Nodely API

Located in `ALGO.Algorand/nodelyAPI.ts`

**Features:**
- Get account balance and information
- Broadcast transactions
- Get suggested transaction parameters
- Get node status
- Advanced transaction history (via Indexer)
- Transaction search and filtering
- **Supports 4 networks**: MainNet, TestNet, BetaNet, FNet

**API Limits:**
- Free tier: Public API
- No API key required
- Rate limiting applies

**Endpoints:**
- MainNet Algod: `https://mainnet-api.4160.nodely.dev`
- MainNet Indexer: `https://mainnet-idx.4160.nodely.dev`
- TestNet Algod: `https://testnet-api.4160.nodely.dev`
- TestNet Indexer: `https://testnet-idx.4160.nodely.dev`
- BetaNet Algod: `https://betanet-api.4160.nodely.dev`
- BetaNet Indexer: `https://betanet-idx.4160.nodely.dev`
- FNet Algod: `https://fnet-api.4160.nodely.dev`
- FNet Indexer: `https://fnet-idx.4160.nodely.dev`

**Usage:**
```typescript
import { NodelyAPI, nodelyMainnet } from '@/components/currencyCore/blockchainAPIs/ALGO.Algorand';

// Using singleton instances
const balance = await nodelyMainnet.getBalance('YOUR_ADDRESS');

// Creating custom instance
const betanetApi = new NodelyAPI('betanet');
const history = await betanetApi.getTransactionHistory('YOUR_ADDRESS');

// Advanced search
const searchResults = await nodelyMainnet.searchTransactions({
  address: 'YOUR_ADDRESS',
  minRound: 1000000,
  limit: 50
});
```

---

## API Comparison

| Feature | AlgoExplorer | AlgoNode | AlgoIndexer | PureStake | Dappflow | Nodely |
|---------|--------------|----------|-------------|-----------|----------|--------|
| **Get Balance** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Account Info** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Broadcast TX** | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ |
| **TX History** | ✅ Basic | ❌ | ✅ Advanced | ✅ Advanced | ✅ Basic | ✅ Advanced |
| **TX Search/Filter** | ❌ | ❌ | ✅ | ✅ | ❌ | ✅ |
| **Suggested Params** | ❌ | ✅ | ❌ | ✅ | ✅ | ✅ |
| **Wait for Confirm** | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Asset Search** | ❌ | ❌ | ✅ | ✅ | ❌ | ✅ |
| **Multi-Network** | MainNet/TestNet | MainNet/TestNet | MainNet/TestNet | MainNet/TestNet | MainNet/TestNet | **4 Networks** |
| **API Key Required** | ❌ | ❌ | ❌ | ✅ | ❌ (optional) | ❌ |
| **Free Tier Limit** | Rate Limited | Rate Limited | Rate Limited | 25k/day | Rate Limited | Rate Limited |

---

## Recommended Usage Pattern

For a complete Algorand implementation, use multiple APIs:

```typescript
import { 
  AlgoNodeAPI,      // For broadcasting and params
  AlgoIndexerAPI,   // For transaction history
  AlgoExplorerAPI   // As fallback
} from '@/components/currencyCore/blockchainAPIs/ALGO.Algorand';

// Primary: Use Algod for broadcasting
const algod = new AlgoNodeAPI('mainnet');

// Primary: Use Indexer for transaction history
const indexer = new AlgoIndexerAPI('mainnet');

// Fallback: Use AlgoExplorer if others fail
const explorer = new AlgoExplorerAPI('mainnet');

async function getBalance(address: string) {
  try {
    return await indexer.getBalance(address);
  } catch (error) {
    console.log('Indexer failed, trying AlgoNode...');
    try {
      return await algod.getBalance(address);
    } catch (error2) {
      console.log('AlgoNode failed, trying AlgoExplorer...');
      return await explorer.getBalance(address);
    }
  }
}

async function broadcastTransaction(signedTxn: Uint8Array) {
  try {
    return await algod.broadcastTransaction(signedTxn);
  } catch (error) {
    console.log('AlgoNode failed, trying AlgoExplorer...');
    return await explorer.broadcastTransaction(signedTxn);
  }
}

async function getTransactionHistory(address: string) {
  // Always use Indexer for best transaction history
  return await indexer.getTransactionHistory(address, 50);
}
```

---

## Algorand Specifics

### Account-Based Model
Unlike Bitcoin (UTXO-based), Algorand uses an account-based model:
- No UTXOs to fetch
- Accounts have a single balance
- Minimum balance requirement (100,000 microAlgos = 0.1 ALGO)
- Balance increases with assets and apps opted into

### MicroAlgos
- 1 ALGO = 1,000,000 microAlgos
- All API responses use microAlgos
- Minimum transaction amount: 1 microAlgo
- Minimum fee: 1,000 microAlgos (0.001 ALGO)

### Transaction Types
- `pay` - Payment transaction
- `keyreg` - Key registration (participation)
- `acfg` - Asset configuration
- `axfer` - Asset transfer
- `afrz` - Asset freeze
- `appl` - Application call

### Rounds vs Blocks
- Algorand uses "rounds" instead of "blocks"
- Each round ~4.5 seconds
- Transaction confirmation typically in 1-2 rounds

---

## Error Handling

All APIs follow consistent error handling:

```typescript
try {
  const balance = await api.getBalance(address);
} catch (error) {
  if (error.message.includes('404')) {
    // Account doesn't exist (0 balance)
  } else if (error.message.includes('rate limit')) {
    // Rate limit exceeded, implement retry logic
  } else {
    // Other errors
  }
}
```

---

## Rate Limiting

| API | Free Limit | Notes |
|-----|------------|-------|
| AlgoExplorer | ~5-10 req/sec | Shared public API |
| AlgoNode | ~5-10 req/sec | Shared public API |
| AlgoIndexer | ~5-10 req/sec | Shared public API |
| PureStake | 25k req/day | Requires API key |
| Dappflow | ~5-10 req/sec | Shared public API, optional API key |
| Nodely | ~5-10 req/sec | Shared public API, 4 networks |

### Rate Limit Best Practices
1. Implement exponential backoff
2. Cache responses when possible
3. Use PureStake for production (higher limits)
4. Implement fallback between APIs

---

## Getting Started

### 1. For Simple Queries (No API Key)
```typescript
import { algoExplorerMainnet } from '@/components/currencyCore/blockchainAPIs/ALGO.Algorand';

const balance = await algoExplorerMainnet.getBalance('YOUR_ADDRESS');
```

### 2. For Transaction Broadcasting
```typescript
import { algoNodeMainnet } from '@/components/currencyCore/blockchainAPIs/ALGO.Algorand';

const params = await algoNodeMainnet.getSuggestedParams();
// Create and sign transaction with algosdk
const result = await algoNodeMainnet.broadcastTransaction(signedTxn);
```

### 3. For Transaction History
```typescript
import { algoIndexerMainnet } from '@/components/currencyCore/blockchainAPIs/ALGO.Algorand';

const history = await algoIndexerMainnet.getTransactionHistory('YOUR_ADDRESS');
```

### 4. For Production (With API Key)
```typescript
import { PureStakeAPI } from '@/components/currencyCore/blockchainAPIs/ALGO.Algorand';

const api = new PureStakeAPI('mainnet', { 
  apiKey: process.env.PURESTAKE_API_KEY 
});
```

---

## Resources

- **Algorand Developer Portal:** https://developer.algorand.org/
- **AlgoExplorer:** https://algoexplorer.io/
- **Algonode.io:** https://algonode.io/
- **PureStake:** https://developer.purestake.io/
- **Dappflow:** https://docs.dappflow.org
- **Nodely:** https://nodely.io/docs/free/start
- **Algorand SDK (algosdk):** https://www.npmjs.com/package/algosdk

