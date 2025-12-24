# Stellar (XLM) Blockchain APIs

Comprehensive collection of blockchain API implementations for **Stellar Lumens (XLM)**, a fast, low-cost blockchain platform for payments and asset tokenization.

## Overview

This directory contains 7 blockchain API implementations supporting Stellar (XLM):

1. **Horizon API** - Official Stellar API (free, no auth)
2. **StellarExpert API** - Analytics platform (free, no auth)
3. **NOWNodes API** - Full node access (5k/day free)
4. **Bitquery API** - GraphQL with real-time data (requires key)
5. **Tatum API** - Powerful APIs and RPCs (requires key)
6. **GetBlock API** - RPC node provider (requires key)
7. **Ankr API** - RPC for dApps (free tier)

---

## APIs

### 1. Horizon API (`horizonAPI.ts`)

**Official API for the Stellar network**

- **Base URLs**: 
  - Mainnet: `https://horizon.stellar.org`
  - Testnet: `https://horizon-testnet.stellar.org`
- **Free Tier**: Free, no authentication required
- **Documentation**: https://developers.stellar.org/docs/data/apis/horizon

**Features**:
- Complete blockchain data access
- Transaction submission
- Account operations and balances
- Asset tracking
- Payment streams
- Order book queries
- Network info

**Usage**:
```typescript
import { horizonAPI, createHorizonAPI } from '@blockchainAPIs/XLM.Stellar';

// Get account information
const account = await horizonAPI.getAccount('GBZXN7PIRZGNMHGA7MUUUF4GWPY5AYPV6LY4UV2GL6VJGIQRXFDNMADI');

// Get XLM balance
const balance = await horizonAPI.getBalance('GBZXN7PIRZGNMHGA7MUUUF4GWPY5AYPV6LY4UV2GL6VJGIQRXFDNMADI');
console.log('Balance:', balance, 'XLM');

// Get all balances (XLM + assets)
const balances = await horizonAPI.getAllBalances('GBZXN7PIRZGNMHGA7MUUUF4GWPY5AYPV6LY4UV2GL6VJGIQRXFDNMADI');

// Get transaction history
const txs = await horizonAPI.getTransactions('GBZXN7PIRZGNMHGA7MUUUF4GWPY5AYPV6LY4UV2GL6VJGIQRXFDNMADI', 50);

// Get payments only
const payments = await horizonAPI.getPayments('GBZXN7PIRZGNMHGA7MUUUF4GWPY5AYPV6LY4UV2GL6VJGIQRXFDNMADI');

// Submit transaction
await horizonAPI.submitTransaction(txEnvelope);

// Get asset info
const asset = await horizonAPI.getAsset('USDC', 'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN');

// For testnet
const testnetAPI = createHorizonAPI({ network: 'testnet' });
```

**Key Interfaces**:
- `HorizonAccount` - Account with balances, signers, data
- `HorizonTransaction` - Transaction details
- `HorizonOperation` - Individual operations
- `HorizonLedger` - Ledger (block) information
- `HorizonAsset` - Asset metadata and stats

---

### 2. StellarExpert API (`stellarExpertAPI.ts`)

**Comprehensive block explorer and analytics platform**

- **Base URL**: `https://api.stellar.expert/explorer/public`
- **Free Tier**: Free, no authentication, CORS enabled
- **Website**: https://stellar.expert/explorer/public
- **Documentation**: https://stellar.expert/openapi.html

**Features**:
- Detailed account statistics
- Asset analytics and ratings
- Price history and market data
- Network metrics
- Liquidity pool information
- Top accounts directory
- Advanced search

**Usage**:
```typescript
import { stellarExpertAPI, createStellarExpertAPI } from '@blockchainAPIs/XLM.Stellar';

// Get account information
const account = await stellarExpertAPI.getAccount('GBZXN7PIRZGNMHGA7MUUUF4GWPY5AYPV6LY4UV2GL6VJGIQRXFDNMADI');

// Get account history
const history = await stellarExpertAPI.getAccountHistory('GBZXN7PIRZGNMHGA7MUUUF4GWPY5AYPV6LY4UV2GL6VJGIQRXFDNMADI', 50);

// Get asset with rating
const asset = await stellarExpertAPI.getAsset('USDC', 'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN');
console.log('Asset rating:', asset.rating.average);

// Get asset market data
const market = await stellarExpertAPI.getAssetMarket('USDC', 'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN');
console.log('Price:', market.price, 'USD');
console.log('24h Volume:', market.volume24h);

// Get price history
const priceHistory = await stellarExpertAPI.getAssetPriceHistory('USDC', 'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN', '7d');

// Get network stats
const stats = await stellarExpertAPI.getNetworkStats();

// Search
const results = await stellarExpertAPI.search('USDC');

// For testnet
const testnetAPI = createStellarExpertAPI({ network: 'testnet' });
```

**Key Interfaces**:
- `StellarExpertAccount` - Account with detailed stats
- `StellarExpertAsset` - Asset with rating and market data
- `StellarExpertMarketStats` - Market statistics
- `StellarExpertNetworkStats` - Network-wide statistics

---

### 3. NOWNodes API (`nowNodesAPI.ts`)

**Full node access with free tier**

- **Base URL**: `https://xlm.nownodes.io`
- **Free Tier**: 5,000 requests/day with API key
- **Uptime**: 99.95%
- **Website**: https://nownodes.io/nodes/stellar-xlm

**Features**:
- Real-time blockchain data
- Transaction and block details
- Full node access
- High uptime guarantee

**Usage**:
```typescript
import { createNOWNodesStellarAPI } from '@blockchainAPIs/XLM.Stellar';

// API key is required
const nownodes = createNOWNodesStellarAPI('YOUR_API_KEY');

// Get account
const account = await nownodes.getAccount('GBZXN7PIRZGNMHGA7MUUUF4GWPY5AYPV6LY4UV2GL6VJGIQRXFDNMADI');

// Get balance
const balance = await nownodes.getBalance('GBZXN7PIRZGNMHGA7MUUUF4GWPY5AYPV6LY4UV2GL6VJGIQRXFDNMADI');

// Get transactions
const txs = await nownodes.getTransactions('GBZXN7PIRZGNMHGA7MUUUF4GWPY5AYPV6LY4UV2GL6VJGIQRXFDNMADI');

// Submit transaction
await nownodes.submitTransaction(txEnvelope);
```

---

### 4. Bitquery API (`bitqueryAPI.ts`)

**GraphQL API with real-time data streaming**

- **Base URL**: `https://graphql.bitquery.io`
- **Free Tier**: Requires API key (free tier available)
- **Website**: https://bitquery.io/blockchains/stellar-blockchain-api

**Features**:
- Historical and real-time blockchain data
- Flexible GraphQL queries
- Token transfers and payments
- Real-time data streaming
- Complex filtering

**Usage**:
```typescript
import { createBitqueryStellarAPI } from '@blockchainAPIs/XLM.Stellar';

// API key is required
const bitquery = createBitqueryStellarAPI('YOUR_API_KEY');

// Get balance
const balance = await bitquery.getBalance('GBZXN7PIRZGNMHGA7MUUUF4GWPY5AYPV6LY4UV2GL6VJGIQRXFDNMADI');

// Get transaction history
const txs = await bitquery.getTransactionHistory('GBZXN7PIRZGNMHGA7MUUUF4GWPY5AYPV6LY4UV2GL6VJGIQRXFDNMADI', 50);

// Get transfers/payments
const transfers = await bitquery.getTransfers('GBZXN7PIRZGNMHGA7MUUUF4GWPY5AYPV6LY4UV2GL6VJGIQRXFDNMADI');

// Get transaction
const tx = await bitquery.getTransaction('txhash...');
```

---

### 5. Tatum API (`tatumAPI.ts`)

**Powerful APIs and RPCs for Stellar blockchain**

- **Base URL**: `https://api.tatum.io/v3`
- **Free Tier**: Free tier available with API key
- **Website**: https://tatum.io/chain/stellar

**Features**:
- Mainnet and testnet endpoints
- Blockchain data retrieval
- Transaction operations
- Payment processing
- Account management
- Fee statistics

**Usage**:
```typescript
import { createTatumStellarAPI } from '@blockchainAPIs/XLM.Stellar';

// API key is required
const tatum = createTatumStellarAPI('YOUR_API_KEY');

// Get account
const account = await tatum.getAccount('GBZXN7PIRZGNMHGA7MUUUF4GWPY5AYPV6LY4UV2GL6VJGIQRXFDNMADI');

// Get transactions
const txs = await tatum.getTransactions('GBZXN7PIRZGNMHGA7MUUUF4GWPY5AYPV6LY4UV2GL6VJGIQRXFDNMADI');

// Broadcast transaction
await tatum.broadcastTransaction(txData);

// Get blockchain info
const info = await tatum.getBlockchainInfo();

// Get fee stats
const fees = await tatum.getFeeStats();

// For testnet
const testnetAPI = createTatumStellarAPI('YOUR_API_KEY', 'testnet');
```

---

### 6. GetBlock API (`getBlockAPI.ts`)

**RPC node provider for Stellar blockchain**

- **Endpoint**: `https://go.getblock.io/{API_KEY}/`
- **Free Tier**: Free tier with API key
- **Website**: https://getblock.io/nodes/xlm/
- **Documentation**: https://getblock.io/docs/stellar/

**Features**:
- Instant access to Stellar RPC nodes
- Reliable infrastructure
- High availability
- Transaction broadcasting

**Usage**:
```typescript
import { createGetBlockStellarAPI } from '@blockchainAPIs/XLM.Stellar';

// API key is required
const getblock = createGetBlockStellarAPI('YOUR_API_KEY');

// Get account
const account = await getblock.getAccount('GBZXN7PIRZGNMHGA7MUUUF4GWPY5AYPV6LY4UV2GL6VJGIQRXFDNMADI');

// Get balance
const balance = await getblock.getBalance('GBZXN7PIRZGNMHGA7MUUUF4GWPY5AYPV6LY4UV2GL6VJGIQRXFDNMADI');

// Get transactions
const txs = await getblock.getTransactions('GBZXN7PIRZGNMHGA7MUUUF4GWPY5AYPV6LY4UV2GL6VJGIQRXFDNMADI');

// Submit transaction
await getblock.submitTransaction(txEnvelope);

// For testnet
const testnetAPI = createGetBlockStellarAPI('YOUR_API_KEY', 'testnet');
```

---

### 7. Ankr API (`ankrAPI.ts`)

**Stellar RPC for dApps and crypto projects**

- **Base URL**: `https://rpc.ankr.com/stellar`
- **Free Tier**: Free public endpoint
- **Website**: https://www.ankr.com/rpc/stellar/
- **Documentation**: https://www.ankr.com/docs/rpc-service/chains/chains-list/#stellar

**Features**:
- Free tier available
- Reliable web3 data
- Blockchain interaction
- RPC endpoints
- High-performance infrastructure

**Usage**:
```typescript
import { ankrStellarAPI, createAnkrStellarAPI } from '@blockchainAPIs/XLM.Stellar';

// Use free public endpoint
const account = await ankrStellarAPI.getAccount('GBZXN7PIRZGNMHGA7MUUUF4GWPY5AYPV6LY4UV2GL6VJGIQRXFDNMADI');

// Get balance
const balance = await ankrStellarAPI.getBalance('GBZXN7PIRZGNMHGA7MUUUF4GWPY5AYPV6LY4UV2GL6VJGIQRXFDNMADI');

// Get transactions
const txs = await ankrStellarAPI.getTransactions('GBZXN7PIRZGNMHGA7MUUUF4GWPY5AYPV6LY4UV2GL6VJGIQRXFDNMADI');

// With API key for higher limits
const api = createAnkrStellarAPI('YOUR_API_KEY');
```

---

## Common Use Cases

### Get XLM Balance

```typescript
import { horizonAPI } from '@blockchainAPIs/XLM.Stellar';

const balance = await horizonAPI.getBalance('GBZXN7PIRZGNMHGA7MUUUF4GWPY5AYPV6LY4UV2GL6VJGIQRXFDNMADI');
console.log('Balance:', balance, 'XLM');
```

### Get All Assets Owned

```typescript
import { horizonAPI } from '@blockchainAPIs/XLM.Stellar';

const balances = await horizonAPI.getAllBalances('GBZXN7PIRZGNMHGA7MUUUF4GWPY5AYPV6LY4UV2GL6VJGIQRXFDNMADI');
balances.forEach(b => {
  if (b.asset_type === 'native') {
    console.log('XLM:', b.balance);
  } else {
    console.log(`${b.asset_code}:`, b.balance);
  }
});
```

### Get Payment History

```typescript
import { horizonAPI } from '@blockchainAPIs/XLM.Stellar';

const payments = await horizonAPI.getPayments('GBZXN7PIRZGNMHGA7MUUUF4GWPY5AYPV6LY4UV2GL6VJGIQRXFDNMADI', 100);
console.log('Payments:', payments._embedded.records);
```

### Track Asset Price

```typescript
import { stellarExpertAPI } from '@blockchainAPIs/XLM.Stellar';

const market = await stellarExpertAPI.getAssetMarket('USDC', 'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN');
console.log('USDC Price:', market.price, 'USD');
console.log('24h Change:', market.change24h, '%');
```

---

## Rate Limits and Free Tier Summary

| API | Free Tier Limit | API Key Required | Best For |
|-----|----------------|------------------|----------|
| Horizon | No limit | ❌ | Official API, complete features |
| StellarExpert | No limit specified | ❌ | Analytics, asset ratings |
| NOWNodes | 5,000/day | ✅ | Full node access |
| Bitquery | Limited | ✅ | GraphQL, complex queries |
| Tatum | Free tier | ✅ | Multi-chain development |
| GetBlock | Free tier | ✅ | RPC access |
| Ankr | Free tier | ❌ (⚠️ recommended) | dApp development |

---

## Stellar-Specific Features

### Balance Units
- **Stroop**: Smallest unit (1 XLM = 10,000,000 stroops)
- Most APIs return balances in XLM (decimal format)

### Address Format
- **Base32 encoding** (not Base58 like Bitcoin)
- Public keys start with `G`
- Example: `GBZXN7PIRZGNMHGA7MUUUF4GWPY5AYPV6LY4UV2GL6VJGIQRXFDNMADI`

### Account Model
- Accounts must be funded with minimum XLM balance (base reserve)
- Each subentry (trustline, offer, signer) requires additional reserve
- Accounts can have data entries (key-value storage)
- Multi-signature support

### Assets
- **Native asset**: XLM (Stellar Lumens)
- **Custom assets**: Format `CODE:ISSUER`
- Assets require trustlines before receiving
- Popular assets: USDC, USDT, yXLM, AQUA

### Operations
- Transactions contain 1+ operations
- Operation types: payment, path payment, create account, manage offer, etc.
- Each operation has specific parameters

### Memos
- Optional transaction notes
- Types: MEMO_TEXT, MEMO_ID, MEMO_HASH, MEMO_RETURN

---

## Network Support

All APIs support multiple Stellar networks:
- **Mainnet** (production) - Public network
- **Testnet** (testing) - For development

---

## Installation

All dependencies are already included in the project's `package.json`:

```bash
npm install axios
```

For transaction creation, you may also need:
```bash
npm install stellar-sdk
```

---

## API Status

All APIs listed are active and maintained as of October 2025. Stellar continues to be a leading blockchain for cross-border payments and asset tokenization.

## Support

For API-specific issues:
- **Horizon API**: https://developers.stellar.org/docs/data/apis/horizon
- **StellarExpert**: https://stellar.expert/openapi.html
- **NOWNodes**: https://nownodes.io/nodes/stellar-xlm
- **Bitquery**: https://bitquery.io/blockchains/stellar-blockchain-api
- **Tatum**: https://tatum.io/chain/stellar
- **GetBlock**: https://getblock.io/nodes/xlm/
- **Ankr**: https://www.ankr.com/rpc/stellar/

For issues with this implementation, please refer to the project's main repository.

