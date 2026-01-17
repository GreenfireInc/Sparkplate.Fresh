# Stacks (STX) Blockchain APIs

Comprehensive collection of blockchain API implementations for **Stacks (STX)**, the leading Bitcoin Layer 2 enabling smart contracts and decentralized applications on Bitcoin.

## Overview

This directory contains 3 blockchain API implementations supporting Stacks (STX):

1. **Hiro Stacks API** - Official comprehensive REST API (free with rate limits)
2. **QuickNode API** - Fast RPC nodes with free tier
3. **NOWNodes API** - Full node access (5000 requests/month free)

---

## APIs

### 1. Hiro Stacks API (`hiroStacksAPI.ts`)

**Official comprehensive REST API for Stacks blockchain**

- **Base URL**: `https://api.hiro.so` (mainnet) / `https://api.testnet.hiro.so` (testnet)
- **Free Tier**: Free with rate limits
- **Website**: https://www.hiro.so/stacks-api
- **Documentation**: https://docs.hiro.so/stacks-blockchain-api

**Features**:
- High-performance REST interface
- Transaction queries and filtering
- Smart contract interaction and read-only calls
- Block and microblock data
- Account balance and nonce tracking
- Token metadata (FT and NFT)
- Mempool tracking
- Search functionality
- Fee estimation

**Usage**:
```typescript
import { hiroStacksAPI, createHiroStacksAPI } from '@blockchainAPIs/STX.Stacks';

// Use default mainnet instance
const balance = await hiroStacksAPI.getBalance('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7');

// Get transaction history
const txs = await hiroStacksAPI.getTransactionHistory('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7', 50);

// Get account info
const accountInfo = await hiroStacksAPI.getAccountInfo('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7');
console.log('Balance:', accountInfo.balance);
console.log('Nonce:', accountInfo.nonce);

// Get block by height
const block = await hiroStacksAPI.getBlock(123456);

// Call read-only contract function
const result = await hiroStacksAPI.callReadOnlyFunction(
  'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
  'my-contract',
  'get-balance',
  ['0x0516...'] // function arguments
);

// Get token metadata
const tokenMeta = await hiroStacksAPI.getTokenMetadata('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7.my-token');

// Search blockchain
const searchResults = await hiroStacksAPI.search('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7');

// With testnet or API key
const api = createHiroStacksAPI({ network: 'testnet', apiKey: 'YOUR_API_KEY' });
```

**Key Interfaces**:
- `HiroAccountInfo` - Account with balance, locked, nonce
- `HiroTransaction` - Transaction with type-specific data
- `HiroBlock` - Block with transactions and microblocks
- `HiroContract` - Smart contract with source and ABI
- `HiroTokenMetadata` - Token metadata

---

### 2. QuickNode API (`quicknodeAPI.ts`)

**Fast RPC nodes and comprehensive Web3 APIs**

- **Endpoint**: Custom endpoint provided by QuickNode
- **Free Tier**: Free tier with registration
- **Website**: https://www.quicknode.com/chains/stx
- **Documentation**: https://www.quicknode.com/docs/stacks

**Features**:
- Fast RPC node access
- High-performance infrastructure
- Custom endpoints
- WebSocket support
- Archive data access
- Multi-network support
- REST and RPC methods

**Usage**:
```typescript
import { createQuickNodeStacksAPI } from '@blockchainAPIs/STX.Stacks';

// API key and endpoint are required
const quicknode = createQuickNodeStacksAPI(
  'YOUR_API_KEY',
  'https://YOUR-ENDPOINT.stacks-mainnet.quiknode.pro/YOUR_API_KEY/'
);

// Get account balance
const balance = await quicknode.getBalance('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7');

// Get transaction
const tx = await quicknode.getTransaction('0x...');

// Get transaction history
const txs = await quicknode.getTransactionHistory('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7', 50);

// Get block
const block = await quicknode.getBlock(123456);

// Call read-only function
const result = await quicknode.callReadOnlyFunction(
  'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
  'my-contract',
  'get-value',
  []
);

// Broadcast transaction
const txId = await quicknode.broadcastTransaction('0x...');

// Get network info
const info = await quicknode.getNetworkInfo();
```

**Key Interfaces**:
- `QuickNodeAccountInfo` - Account information
- `QuickNodeTransaction` - Transaction data
- `QuickNodeBlock` - Block information
- `StacksRPCRequest` - RPC request format
- `StacksRPCResponse` - RPC response format

---

### 3. NOWNodes API (`nowNodesAPI.ts`)

**Full node access and block explorers via API key**

- **Base URL**: `https://stx.nownodes.io`
- **Free Tier**: 5000 requests/month
- **Website**: https://nownodes.io/nodes/stacks-stx
- **Documentation**: https://nownodes.io/documentation

**Features**:
- Full node access
- Multiple network support
- High availability
- REST endpoints
- Real-time data
- Transaction broadcasting
- Contract interaction

**Usage**:
```typescript
import { createNOWNodesStacksAPI } from '@blockchainAPIs/STX.Stacks';

// API key is required
const nownodes = createNOWNodesStacksAPI('YOUR_API_KEY');

// Get account info
const accountInfo = await nownodes.getAccountInfo('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7');
console.log('Balance:', accountInfo.balance);
console.log('Nonce:', accountInfo.nonce);

// Get transaction history
const txs = await nownodes.getTransactionHistory('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7', 50);

// Get mempool transactions
const mempoolTxs = await nownodes.getMempoolTransactions('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7');

// Get block
const block = await nownodes.getBlock(123456);

// Get contract
const contract = await nownodes.getContract('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7.my-contract');

// Get STX transfers
const transfers = await nownodes.getSTXTransfers('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7');

// Get fungible tokens
const tokens = await nownodes.getFungibleTokens('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7');

// Get STX supply
const supply = await nownodes.getSTXSupply();
console.log('Total STX:', supply.total_stx);
console.log('Unlocked:', supply.unlocked_stx);

// Search blockchain
const searchResults = await nownodes.search('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7');
```

**Key Interfaces**:
- `NOWNodesAccountInfo` - Account with balance proof
- `NOWNodesTransaction` - Transaction with events
- `NOWNodesBlock` - Block with microblocks
- `NOWNodesContract` - Contract with ABI

---

## Installation

All dependencies are already included in the project's `package.json`:

```bash
npm install axios
```

---

## Common Use Cases

### Get Account Balance

```typescript
import { hiroStacksAPI } from '@blockchainAPIs/STX.Stacks';

const principal = 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7';
const balance = await hiroStacksAPI.getBalance(principal);
const stxBalance = parseInt(balance) / 1_000_000; // Convert from microSTX to STX
console.log('Balance:', stxBalance, 'STX');
```

### Get Transaction History

```typescript
import { hiroStacksAPI } from '@blockchainAPIs/STX.Stacks';

const principal = 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7';
const history = await hiroStacksAPI.getTransactionHistory(principal, 50);

console.log('Total transactions:', history.total);
history.results.forEach(tx => {
  console.log(`${tx.tx_type}: ${tx.tx_id}`);
  console.log(`Status: ${tx.tx_status}`);
  console.log(`Block: ${tx.block_height}`);
  
  if (tx.token_transfer) {
    console.log(`Transfer to: ${tx.token_transfer.recipient_address}`);
    console.log(`Amount: ${parseInt(tx.token_transfer.amount) / 1_000_000} STX`);
  }
});
```

### Call Smart Contract Function

```typescript
import { hiroStacksAPI } from '@blockchainAPIs/STX.Stacks';

// Read-only function call
const result = await hiroStacksAPI.callReadOnlyFunction(
  'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR',
  'arkadiko-token',
  'get-balance',
  ['0x051699e41e4c9ef2db09c86e3db58be66e1a7cf3e7'] // encoded address
);

console.log('Result:', result.result);
console.log('Success:', result.okay);
```

### Broadcast Transaction

```typescript
import { hiroStacksAPI } from '@blockchainAPIs/STX.Stacks';

// Transaction hex (signed transaction)
const txHex = '0x...'; // Your signed transaction

const txId = await hiroStacksAPI.broadcastTransaction(txHex);
console.log('Transaction ID:', txId);

// Wait for confirmation
const tx = await hiroStacksAPI.getTransaction(txId);
console.log('Status:', tx.tx_status);
```

### Get Token Holdings

```typescript
import { hiroStacksAPI } from '@blockchainAPIs/STX.Stacks';

const principal = 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7';

// Get fungible tokens
const ftTokens = await hiroStacksAPI.getFungibleTokens(principal);
console.log('Fungible tokens:', ftTokens.results);

// Get NFTs
const nftTokens = await hiroStacksAPI.getNonFungibleTokens(principal);
console.log('NFTs:', nftTokens.results);
```

---

## Rate Limits and Free Tier Summary

| API | Free Tier Limit | API Key Required | Best For |
|-----|----------------|------------------|----------|
| Hiro Stacks | Rate limited | ❌ (⚠️ recommended) | General queries, smart contracts |
| QuickNode | Free tier | ✅ | Fast RPC, production apps |
| NOWNodes | 5000 req/month | ✅ | Full node access |

---

## Recommended API Selection

- **For General Queries**: Use **Hiro Stacks API** (most comprehensive, free)
- **For Smart Contracts**: Use **Hiro Stacks API** (best read-only function support)
- **For Production Apps**: Use **QuickNode** (fast, reliable)
- **For High Volume**: Use **NOWNodes** or **QuickNode** with paid plans
- **For Mempool Data**: Use **Hiro Stacks API** or **NOWNodes**

---

## Stacks-Specific Features

### Account Model
Stacks uses an accounts-based model (like Ethereum), not UTXO (like Bitcoin). Each account has:
- **Address**: Stacks address (c32check encoding)
- **Balance**: STX balance in microSTX (1 STX = 1,000,000 microSTX)
- **Nonce**: Transaction counter for the account
- **Locked**: Locked STX (stacking)

### Address Format
- **Mainnet addresses**: Start with `SP` (e.g., `SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7`)
- **Testnet addresses**: Start with `ST` (e.g., `ST2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7`)
- **Contract addresses**: Format `{address}.{contract-name}`

### Derivation Path
- Stacks uses BIP44 path: `m/44'/5757'/0'/0/0`
- Different from Bitcoin's `m/44'/0'/0'/0/0`

---

## Network Support

All APIs support multiple Stacks networks:
- **Mainnet** (production)
- **Testnet** (development/testing)

---

## API Status

All APIs listed are active and maintained as of October 2025. Stacks continues to be the leading Bitcoin Layer 2 solution.

## Support

For API-specific issues:
- **Hiro Stacks API**: https://docs.hiro.so/stacks-blockchain-api
- **QuickNode**: https://www.quicknode.com/docs/stacks
- **NOWNodes**: https://nownodes.io/documentation

For issues with this implementation, please refer to the project's main repository.

