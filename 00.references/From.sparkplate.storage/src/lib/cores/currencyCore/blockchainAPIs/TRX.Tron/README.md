# Tron (TRX) Blockchain APIs

Comprehensive collection of blockchain API implementations for **Tron (TRX)**, a high-throughput decentralized blockchain platform supporting smart contracts and dApps.

## Overview

This directory contains 5 blockchain API implementations supporting Tron (TRX):

1. **TRONSCAN API** - Official blockchain explorer (free with registration)
2. **TronGrid API** - Official TRON API with fast node access (free with rate limits)
3. **GetBlock API** - RPC node access (free tier with API key)
4. **NOWNodes API** - Full node access (5000 requests/month free)
5. **Blockchair API** - Fast blockchain explorer (free tier)

---

## APIs

### 1. TRONSCAN API (`tronscanAPI.ts`)

**Official blockchain explorer for the TRON network**

- **Base URL**: `https://apilist.tronscanapi.com/api`
- **Free Tier**: Free with registration for API key
- **Website**: https://tronscan.org/
- **Documentation**: https://docs.tronscan.org/

**Features**:
- Detailed block, transaction, and account information
- Token tracking (TRC10, TRC20)
- Smart contract data
- Voting and staking info
- Network statistics
- Witness (super representative) data

**Usage**:
```typescript
import { tronscanAPI, createTronscanAPI } from '@blockchainAPIs/TRX.Tron';

// Use without API key (limited)
const balance = await tronscanAPI.getBalance('TYkJFW7v7A6NmWGKcuNMGbAQWgpPdE7h5');
const trxBalance = balance / 1_000_000; // Convert from SUN to TRX

// Get transaction history
const txHistory = await tronscanAPI.getTransactionHistory('TYkJFW7v7A6NmWGKcuNMGbAQWgpPdE7h5', 50);

// Get TRC20 transfers
const trc20Transfers = await tronscanAPI.getTRC20Transfers('TYkJFW7v7A6NmWGKcuNMGbAQWgpPdE7h5');

// With API key for higher limits
const api = createTronscanAPI('YOUR_API_KEY');
```

---

### 2. TronGrid API (`tronGridAPI.ts`)

**Official TRON API with fast and reliable node access**

- **Base URLs**: 
  - Mainnet: `https://api.trongrid.io`
  - Shasta Testnet: `https://api.shasta.trongrid.io`
  - Nile Testnet: `https://api.nile.trongrid.io`
- **Free Tier**: Free with rate limits
- **Website**: https://www.trongrid.io/
- **Documentation**: https://developers.tron.network/docs/trongrid

**Features**:
- Full node HTTP APIs
- Smart contract deployment and interaction
- Transaction broadcasting
- Account and balance queries
- Block and transaction data
- Energy and bandwidth tracking

**Usage**:
```typescript
import { tronGridAPI, createTronGridAPI } from '@blockchainAPIs/TRX.Tron';

// Get account info
const account = await tronGridAPI.getAccount('TYkJFW7v7A6NmWGKcuNMGbAQWgpPdE7h5');

// Get balance
const balance = await tronGridAPI.getBalance('TYkJFW7v7A6NmWGKcuNMGbAQWgpPdE7h5');

// Get transaction
const tx = await tronGridAPI.getTransactionById('tx_id...');

// Trigger constant contract (read-only)
const result = await tronGridAPI.triggerConstantContract(
  'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', // USDT contract
  'balanceOf(address)',
  'encoded_address',
  'TYkJFW7v7A6NmWGKcuNMGbAQWgpPdE7h5'
);

// Broadcast transaction
await tronGridAPI.broadcastTransaction(signedTransaction);

// With testnet
const testnetAPI = createTronGridAPI({ network: 'shasta' });
```

---

### 3. GetBlock API (`getBlockAPI.ts`)

**RPC node access for Tron blockchain**

- **Endpoint**: `https://trx.getblock.io/{API_KEY}/mainnet/`
- **Free Tier**: Free tier with API key
- **Website**: https://getblock.io/nodes/tron-trx/
- **Documentation**: https://getblock.io/docs/tron/

**Features**:
- RPC node access
- Fast and reliable
- Transaction broadcasting
- Smart contract interaction
- Multiple network support

**Usage**:
```typescript
import { createGetBlockTronAPI } from '@blockchainAPIs/TRX.Tron';

// API key is required
const getblock = createGetBlockTronAPI('YOUR_API_KEY');

// Get account
const account = await getblock.getAccount('TYkJFW7v7A6NmWGKcuNMGbAQWgpPdE7h5');

// Get balance
const balance = await getblock.getBalance('TYkJFW7v7A6NmWGKcuNMGbAQWgpPdE7h5');

// Get block
const block = await getblock.getBlockByNum(12345678);

// For testnet
const testnetAPI = createGetBlockTronAPI('YOUR_API_KEY', 'testnet');
```

---

### 4. NOWNodes API (`nowNodesAPI.ts`)

**Full node access with free tier**

- **Base URL**: `https://trx.nownodes.io`
- **Free Tier**: 5000 requests/month
- **Website**: https://nownodes.io/nodes/tron-trx
- **Documentation**: https://nownodes.io/docs/

**Usage**:
```typescript
import { createNOWNodesTronAPI } from '@blockchainAPIs/TRX.Tron';

const nownodes = createNOWNodesTronAPI('YOUR_API_KEY');

const account = await nownodes.getAccount('TYkJFW7v7A6NmWGKcuNMGbAQWgpPdE7h5');
const balance = await nownodes.getBalance('TYkJFW7v7A6NmWGKcuNMGbAQWgpPdE7h5');
```

---

### 5. Blockchair API (`blockchairAPI.ts`)

**Fast and reliable blockchain explorer**

- **Base URL**: `https://api.blockchair.com/tron`
- **Free Tier**: Free tier available
- **Website**: https://blockchair.com/tron
- **Documentation**: https://blockchair.com/api/docs

**Usage**:
```typescript
import { blockchairTronAPI, createBlockchairTronAPI } from '@blockchainAPIs/TRX.Tron';

const address = await blockchairTronAPI.getAddress('TYkJFW7v7A6NmWGKcuNMGbAQWgpPdE7h5');
const stats = await blockchairTronAPI.getStats();
```

---

## Common Use Cases

### Get TRX Balance

```typescript
import { tronGridAPI } from '@blockchainAPIs/TRX.Tron';

const balance = await tronGridAPI.getBalance('TYkJFW7v7A6NmWGKcuNMGbAQWgpPdE7h5');
const trxBalance = balance / 1_000_000; // Convert from SUN to TRX
console.log('Balance:', trxBalance, 'TRX');
```

### Get TRC20 Token Balance

```typescript
import { tronGridAPI } from '@blockchainAPIs/TRX.Tron';

// Get USDT balance (TRC20)
const result = await tronGridAPI.getTRC20Balance(
  'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', // USDT contract
  'TYkJFW7v7A6NmWGKcuNMGbAQWgpPdE7h5' // owner address
);
console.log('USDT Balance:', parseInt(result.balance, 16) / 1e6);
```

### Get Transaction History

```typescript
import { tronscanAPI } from '@blockchainAPIs/TRX.Tron';

const history = await tronscanAPI.getTransactionHistory('TYkJFW7v7A6NmWGKcuNMGbAQWgpPdE7h5', 50);
console.log('Total transactions:', history.total);
```

---

## Rate Limits and Free Tier Summary

| API | Free Tier Limit | API Key Required | Best For |
|-----|----------------|------------------|----------|
| TRONSCAN | Free with registration | ✅ (recommended) | Block explorer, tokens |
| TronGrid | Rate limited | ❌ (⚠️ recommended) | Official API, smart contracts |
| GetBlock | Free tier | ✅ | RPC access |
| NOWNodes | 5000 req/month | ✅ | Full node access |
| Blockchair | Free tier | ❌ (⚠️ recommended) | Quick queries |

---

## Tron-Specific Features

### Balance Units
- **SUN**: Smallest unit (1 TRX = 1,000,000 SUN)
- All API responses use SUN

### Address Format
- **Base58Check encoding**
- Mainnet addresses start with `T`
- Example: `TYkJFW7v7A6NmWGKcuNMGbAQWgpPdE7h5`

### Resources
- **Bandwidth**: For transactions
- **Energy**: For smart contract execution
- Can be obtained by freezing TRX

### Token Standards
- **TRC10**: Native token standard
- **TRC20**: Smart contract token standard (similar to ERC20)

---

## Network Support

All APIs support:
- **Mainnet** (production)
- **Shasta Testnet** (testing)
- **Nile Testnet** (testing)

---

## API Status

All APIs listed are active and maintained as of October 2025. Tron continues to be a leading blockchain platform with high transaction throughput.

## Support

For API-specific issues:
- **TRONSCAN**: https://docs.tronscan.org/
- **TronGrid**: https://developers.tron.network/docs/trongrid
- **GetBlock**: https://getblock.io/docs/tron/
- **NOWNodes**: https://nownodes.io/docs/
- **Blockchair**: https://blockchair.com/api/docs

For issues with this implementation, please refer to the project's main repository.

