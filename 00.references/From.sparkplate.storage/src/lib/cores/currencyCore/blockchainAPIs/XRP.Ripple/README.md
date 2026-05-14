# Ripple (XRP) Blockchain APIs

Comprehensive collection of blockchain API implementations for **Ripple (XRP)**, a fast, low-cost digital payment network and protocol with a native cryptocurrency XRP.

## Overview

This directory contains 7 blockchain API implementations supporting Ripple (XRP):

1. **XRP Ledger (XRPL) API** - Official public servers (free, no auth)
2. **XRPSCAN API** - Comprehensive explorer (free)
3. **Bithomp API** - Fast explorer with username resolution (free)
4. **Bitquery API** - GraphQL with real-time data (requires key)
5. **NOWNodes API** - Full node access (5k/day free)
6. **GetBlock API** - RPC node provider (requires key)
7. **QuickNode API** - Fast RPC endpoints (requires key)

---

## APIs

### 1. XRP Ledger (XRPL) API (`xrplAPI.ts`)

**Official XRP Ledger public servers**

- **Base URLs**:
  - Mainnet: `https://s1.ripple.com:51234`
  - Testnet: `https://s.altnet.rippletest.net:51234`
  - Devnet: `https://s.devnet.rippletest.net:51234`
- **Free Tier**: Free, no authentication
- **Documentation**: https://xrpl.org/docs/references/http-websocket-apis/

**Features**:
- Complete ledger data access
- Transaction submission
- Account information and balances
- Payment channels
- Escrows and checks
- Order books and DEX trading
- Trust lines (issued currencies)
- WebSocket support

**Usage**:
```typescript
import { xrplAPI, createXRPLAPI } from '@blockchainAPIs/XRP.Ripple';

// Get account information
const accountInfo = await xrplAPI.getAccountInfo('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf');

// Get XRP balance
const balance = await xrplAPI.getBalance('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf');
console.log('Balance:', balance, 'XRP');

// Get all balances (XRP + issued currencies)
const allBalances = await xrplAPI.getAllBalances('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf');

// Get transaction history
const txs = await xrplAPI.getTransactions('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf', 50);

// Get transaction by hash
const tx = await xrplAPI.getTransaction('txhash...');

// Submit transaction
await xrplAPI.submitTransaction(signedTxBlob);

// Get order book
const orderbook = await xrplAPI.getOrderBook(
  { currency: 'USD', issuer: 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B' },
  { currency: 'XRP' }
);

// Get payment channels
const channels = await xrplAPI.getAccountChannels('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf');

// For testnet
const testnetAPI = createXRPLAPI({ network: 'testnet' });
```

**Key Interfaces**:
- `XRPLAccountInfo` - Account with balance and metadata
- `XRPLTransaction` - Transaction details
- `XRPLBalance` - Balance for XRP or issued currency
- `XRPLServerInfo` - Server and network information

---

### 2. XRPSCAN API (`xrpscanAPI.ts`)

**Comprehensive XRP Ledger Explorer**

- **Base URL**: `https://api.xrpscan.com/api/v1`
- **Free Tier**: Free public API access
- **Website**: https://xrpscan.com/

**Features**:
- Account information and balances
- Transaction histories
- Token (IOU) tracking
- MPT (Multi-Purpose Tokens)
- NFT tracking and metadata
- DID and credentials
- Oracles and validators
- AMM (Automated Market Makers)
- XRP rich list
- Network metrics and charts

**Usage**:
```typescript
import { xrpscanAPI, createXRPSCANAPI } from '@blockchainAPIs/XRP.Ripple';

// Get account
const account = await xrpscanAPI.getAccount('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf');

// Get balance
const balance = await xrpscanAPI.getBalance('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf');

// Get transactions
const txs = await xrpscanAPI.getTransactions('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf', 50);

// Get payments only
const payments = await xrpscanAPI.getPayments('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf');

// Get account tokens
const tokens = await xrpscanAPI.getAccountTokens('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf');

// Get account NFTs
const nfts = await xrpscanAPI.getAccountNFTs('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf');

// Get validators
const validators = await xrpscanAPI.getValidators();

// Get network metrics
const metrics = await xrpscanAPI.getMetrics();

// Get rich list
const richList = await xrpscanAPI.getRichList(100);

// Get AMM pools
const amms = await xrpscanAPI.getAMMs();

// For testnet
const testnetAPI = createXRPSCANAPI({ network: 'testnet' });
```

**Key Interfaces**:
- `XRPSCANAccount` - Account with domain and metadata
- `XRPSCANTransaction` - Transaction with detailed data
- `XRPSCANToken` - Token/IOU information
- `XRPSCANNFT` - NFT metadata

---

### 3. Bithomp API (`bithompAPI.ts`)

**Fast and trusted XRP Ledger Explorer**

- **Base URL**: `https://bithomp.com/api/v2`
- **Free Tier**: Free (API key recommended for higher limits)
- **Website**: https://bithomp.com/
- **Documentation**: https://docs.bithomp.com/

**Features**:
- Fast account scanning
- Transaction tracking
- Token (IOU) information
- NFT support
- Username resolution (Bithomp names)
- Payment history
- High performance

**Usage**:
```typescript
import { bithompAPI, createBithompAPI } from '@blockchainAPIs/XRP.Ripple';

// Get account
const account = await bithompAPI.getAccount('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf');

// Get balance
const balance = await bithompAPI.getBalance('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf');

// Resolve username to address
const addressInfo = await bithompAPI.resolveUsername('wietse');
console.log('Address:', addressInfo.address);

// Get address by username
const address = await bithompAPI.getAddressByUsername('wietse');

// Get NFTs
const nfts = await bithompAPI.getNFTs('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf');

// Get tokens
const tokens = await bithompAPI.getTokens('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf');

// With API key for higher limits
const api = createBithompAPI('YOUR_API_KEY');
```

**Key Interfaces**:
- `BithompAccount` - Account with username
- `BithompTransaction` - Transaction data

---

### 4. Bitquery API (`bitqueryAPI.ts`)

**GraphQL API with real-time and historical data**

- **Base URL**: `https://graphql.bitquery.io`
- **Free Tier**: Free tier available with API key
- **Website**: https://bitquery.io/blockchains/ripple-blockchain-api

**Features**:
- Historical and real-time blockchain data
- Flexible GraphQL queries
- Transfers, offers, checks, escrows
- Payment tracking
- Complex filtering

**Usage**:
```typescript
import { createBitqueryXRPAPI } from '@blockchainAPIs/XRP.Ripple';

// API key is required
const bitquery = createBitqueryXRPAPI('YOUR_API_KEY');

// Get balance
const balance = await bitquery.getBalance('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf');

// Get transfers
const transfers = await bitquery.getTransfers('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf', 50);

// Get transactions
const txs = await bitquery.getTransactions('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf');

// Get XRP payments only
const payments = await bitquery.getPayments('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf');
```

---

### 5. NOWNodes API (`nowNodesAPI.ts`)

**Full node access with free tier**

- **Base URL**: `https://xrp.nownodes.io`
- **Free Tier**: 5,000 requests/day with API key
- **Website**: https://nownodes.io/nodes/ripple-xrp

**Features**:
- Full node access
- Transaction tracking
- Account queries
- JSON-RPC support
- High uptime

**Usage**:
```typescript
import { createNOWNodesXRPAPI } from '@blockchainAPIs/XRP.Ripple';

// API key is required
const nownodes = createNOWNodesXRPAPI('YOUR_API_KEY');

// Get account info
const info = await nownodes.getAccountInfo('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf');

// Get balance
const balance = await nownodes.getBalance('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf');

// Get transactions
const txs = await nownodes.getTransactions('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf');

// Submit transaction
await nownodes.submitTransaction(signedTxBlob);
```

---

### 6. GetBlock API (`getBlockAPI.ts`)

**RPC node provider for XRP Ledger**

- **Endpoint**: `https://go.getblock.io/{API_KEY}/`
- **Free Tier**: Free tier with API key
- **Website**: https://getblock.io/nodes/xrp/
- **Documentation**: https://getblock.io/docs/xrp/

**Features**:
- Instant XRP RPC node access
- Transaction retrieval
- Account queries
- High availability
- Reliable infrastructure

**Usage**:
```typescript
import { createGetBlockXRPAPI } from '@blockchainAPIs/XRP.Ripple';

// API key is required
const getblock = createGetBlockXRPAPI('YOUR_API_KEY');

// Get account info
const info = await getblock.getAccountInfo('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf');

// Get balance
const balance = await getblock.getBalance('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf');

// Get transactions
const txs = await getblock.getTransactions('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf');

// Submit transaction
await getblock.submitTransaction(signedTxBlob);

// For testnet
const testnetAPI = createGetBlockXRPAPI('YOUR_API_KEY', 'testnet');
```

---

### 7. QuickNode API (`quickNodeAPI.ts`)

**Reliable XRP Ledger RPC endpoints**

- **Endpoint**: `https://example.xrpl.quiknode.pro/{API_KEY}/`
- **Free Tier**: Free tier available
- **Website**: https://www.quicknode.com/chains/xrpl
- **Documentation**: https://www.quicknode.com/docs/xrpl

**Features**:
- Fast RPC nodes
- Web3 application support
- High performance
- Global infrastructure
- Account lines and offers

**Usage**:
```typescript
import { createQuickNodeXRPAPI } from '@blockchainAPIs/XRP.Ripple';

// API key is required
const quicknode = createQuickNodeXRPAPI('YOUR_API_KEY');

// Get account info
const info = await quicknode.getAccountInfo('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf');

// Get balance
const balance = await quicknode.getBalance('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf');

// Get account lines (trust lines)
const lines = await quicknode.getAccountLines('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf');

// Get account offers
const offers = await quicknode.getAccountOffers('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf');
```

---

## Common Use Cases

### Get XRP Balance

```typescript
import { xrplAPI } from '@blockchainAPIs/XRP.Ripple';

const balance = await xrplAPI.getBalance('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf');
console.log('Balance:', balance, 'XRP');
```

### Get All Balances (XRP + Issued Currencies)

```typescript
import { xrplAPI } from '@blockchainAPIs/XRP.Ripple';

const balances = await xrplAPI.getAllBalances('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf');
balances.forEach(b => {
  if (b.currency === 'XRP') {
    console.log('XRP:', b.value);
  } else {
    console.log(`${b.currency}:`, b.value, 'from', b.issuer);
  }
});
```

### Get Transaction History

```typescript
import { xrpscanAPI } from '@blockchainAPIs/XRP.Ripple';

const txs = await xrpscanAPI.getTransactions('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf', 100);
console.log('Transactions:', txs.transactions);
```

### Track NFTs

```typescript
import { xrpscanAPI } from '@blockchainAPIs/XRP.Ripple';

const nfts = await xrpscanAPI.getAccountNFTs('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf');
console.log('NFTs owned:', nfts.length);
```

### Check AMM Pools

```typescript
import { xrpscanAPI } from '@blockchainAPIs/XRP.Ripple';

const amms = await xrpscanAPI.getAMMs();
console.log('AMM pools:', amms);
```

---

## Rate Limits and Free Tier Summary

| API | Free Tier Limit | API Key Required | Best For |
|-----|----------------|------------------|----------|
| XRPL API | No limit | ❌ | Official API, complete features |
| XRPSCAN | No limit specified | ❌ | Explorer, NFTs, metrics |
| Bithomp | Rate limited | ❌ (⚠️ recommended) | Fast queries, usernames |
| Bitquery | Limited | ✅ | GraphQL, complex queries |
| NOWNodes | 5,000/day | ✅ | Full node access |
| GetBlock | Free tier | ✅ | RPC access |
| QuickNode | Free tier | ✅ | High performance |

---

## XRP-Specific Features

### Balance Units
- **Drop**: Smallest unit (1 XRP = 1,000,000 drops)
- Most APIs return XRP balances (already converted from drops)

### Address Format
- **Base58 encoding** with checksum
- Classic addresses start with `r`
- X-Addresses combine address + destination tag
- Example classic: `rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf`
- Example X-Address: `X7AcgcsBL6XDcUb289X4mJ8djcdyKaB5K4`

### Cryptography
- **Ed25519** or **secp256k1** key pairs
- Keys derived from seed phrase
- Master keys and regular keys
- Multi-signature support

### Account Model
- Accounts require minimum XRP reserve (base reserve)
- Each object (trust line, offer, etc.) requires additional reserve
- Accounts can have data, signers, and domain
- Optional features: RequireAuth, RequireDest, etc.

### Issued Currencies (IOUs)
- Custom tokens issued by gateways
- Format: `{currency}:{issuer}`
- Require trust lines to receive
- Popular issuers: Bitstamp, Gatehub, etc.

### Transaction Types
- **Payment**: Send XRP or issued currencies
- **OfferCreate**: Place order on DEX
- **TrustSet**: Create trust line for issued currency
- **NFTokenMint**: Create NFT
- **NFTokenBurn**: Destroy NFT
- **NFTokenCreateOffer**: Sell/buy NFT
- **EscrowCreate**: Time-locked payment
- **PaymentChannelCreate**: Payment channel
- And many more...

### Destination Tags
- Optional numeric identifier for recipients
- Used by exchanges to identify deposits
- Can be combined with address in X-Address format

### Path Payments
- Automatic currency conversion
- Multi-hop payments through order books
- Finds best exchange rate automatically

### Decentralized Exchange (DEX)
- Built-in order book for all asset pairs
- No separate DEX contract needed
- Direct XRP/IOU or IOU/IOU trading

### Automated Market Makers (AMM)
- Liquidity pools for trading
- LP tokens for liquidity providers
- Trading fees configurable

### NFTs
- Native NFT support (NFTokens)
- On-ledger metadata URIs
- Transfer fees, taxons, collections
- Burning, minting, offers

---

## Network Support

All APIs support multiple XRP Ledger networks:
- **Mainnet** (production)
- **Testnet** (testing) - Free test XRP from faucets
- **Devnet** (development) - For developers

---

## Installation

All dependencies are already included in the project's `package.json`:

```bash
npm install axios
```

For transaction creation and signing:
```bash
npm install xrpl
```

---

## API Status

All APIs listed are active and maintained as of October 2025. XRP continues to be one of the leading cryptocurrencies for fast, low-cost international payments.

## Support

For API-specific issues:
- **XRPL API**: https://xrpl.org/docs/
- **XRPSCAN**: https://xrpscan.com/
- **Bithomp**: https://docs.bithomp.com/
- **Bitquery**: https://bitquery.io/blockchains/ripple-blockchain-api
- **NOWNodes**: https://nownodes.io/nodes/ripple-xrp
- **GetBlock**: https://getblock.io/nodes/xrp/
- **QuickNode**: https://www.quicknode.com/chains/xrpl

For issues with this implementation, please refer to the project's main repository.

