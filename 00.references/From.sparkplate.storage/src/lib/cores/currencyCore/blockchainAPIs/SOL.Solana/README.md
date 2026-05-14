## Solana (SOL) Blockchain APIs

Comprehensive collection of blockchain API implementations for **Solana (SOL)**, a high-performance blockchain supporting thousands of transactions per second.

## Overview

This directory contains 5 blockchain API implementations supporting Solana (SOL):

1. **SolanaFM API** - Next-gen explorer with real-time insights (10 RPS free)
2. **Solscan API** - Comprehensive tracker with NFT support (free tier)
3. **Official Solana Explorer API** - Native RPC methods (free)
4. **Solana Beach API** - Staking and validator focused (free tier)
5. **Helius API** - Enterprise-grade with enhanced features (API key required)

---

## APIs

### 1. SolanaFM API (`solanaFMAPI.ts`)

**Next-generation block explorer with real-time insights**

- **Base URL**: `https://api.solana.fm/v1`
- **Free Tier**: 10 RPS, 1 GB bandwidth, endpoint-specific rate caps
- **Website**: https://solana.fm/
- **Documentation**: https://docs.solana.fm/

**Features**:
- Real-time transaction insights
- Network statistics
- Wallet tracking
- Token analytics with price data
- NFT metadata
- Program data
- Endpoint-specific rate caps

**Usage**:
```typescript
import { solanaFMAPI, createSolanaFMAPI } from '@blockchainAPIs/SOL.Solana';

// Use default mainnet instance
const balance = await solanaFMAPI.getBalance('address...');

// Get token balances
const tokens = await solanaFMAPI.getTokenBalances('address...');

// Get transaction history
const txs = await solanaFMAPI.getTransactionHistory('address...', 50);

// Get NFTs owned by address
const nfts = await solanaFMAPI.getNFTsByOwner('address...');

// With API key for higher limits
const api = createSolanaFMAPI({ apiKey: 'YOUR_API_KEY', network: 'mainnet' });
```

**Key Interfaces**:
- `SolanaFMAccountInfo` - Account with balance and owner
- `SolanaFMTransaction` - Transaction with instructions and status
- `SolanaFMToken` - Token with price and holder data
- `SolanaFMNetworkStats` - Network statistics with TPS

---

### 2. Solscan API (`solscanAPI.ts`)

**Comprehensive block explorer with real-time data tracking**

- **Base URL**: `https://public-api.solscan.io`
- **Free Tier**: Free with rate limits
- **Website**: https://solscan.io/
- **Documentation**: https://solscan.io/apis

**Features**:
- Transaction monitoring
- SOL and SPL token tracking
- Account analytics
- Block explorer
- Market data integration
- DeFi analytics
- NFT collections and activities

**Usage**:
```typescript
import { solscanAPI, createSolscanAPI } from '@blockchainAPIs/SOL.Solana';

// Get account info
const account = await solscanAPI.getAccountInfo('address...');

// Get token accounts
const tokens = await solscanAPI.getTokenAccounts('address...');

// Get SOL transfers
const solTransfers = await solscanAPI.getSolTransfers('address...', 50);

// Get SPL token transfers
const tokenTransfers = await solscanAPI.getTokenTransfers('address...', 50);

// Get token holders
const holders = await solscanAPI.getTokenHolders('tokenAddress...');

// Get market data
const marketData = await solscanAPI.getMarketData('tokenAddress...');

// With API key for higher limits
const api = createSolscanAPI('YOUR_API_KEY');
```

**Key Interfaces**:
- `SolscanAccountInfo` - Account information
- `SolscanTransaction` - Transaction with parsed instructions
- `SolscanToken` - Token with market data
- `SolscanTokenAccount` - Token account with balances

---

### 3. Official Solana Explorer API (`solanaExplorerAPI.ts`)

**Official Solana blockchain explorer using JSON-RPC**

- **RPC URL**: `https://api.mainnet-beta.solana.com`
- **Free Tier**: Free via public RPC endpoints
- **Website**: https://explorer.solana.com/
- **Documentation**: https://docs.solana.com/api/http

**Features**:
- Native Solana RPC methods
- Transaction inspection
- Account data retrieval
- Block information
- Token supply and holders
- Program accounts
- Performance metrics

**Usage**:
```typescript
import { solanaExplorerAPI, createSolanaExplorerAPI } from '@blockchainAPIs/SOL.Solana';

// Get account balance (in lamports)
const balance = await solanaExplorerAPI.getBalance('address...');

// Get account info
const accountInfo = await solanaExplorerAPI.getAccountInfo('address...');

// Get transaction
const tx = await solanaExplorerAPI.getTransaction('signature...');

// Get transaction history
const txs = await solanaExplorerAPI.getTransactionHistory('address...', 50);

// Get token accounts by owner
const tokenAccounts = await solanaExplorerAPI.getTokenAccountsByOwner('address...');

// Get token supply
const supply = await solanaExplorerAPI.getTokenSupply('mint...');

// Get current epoch info
const epochInfo = await solanaExplorerAPI.getEpochInfo();

// Custom RPC endpoint
const api = createSolanaExplorerAPI({
  rpcURL: 'https://your-custom-rpc.com',
  commitment: 'finalized',
});
```

**Key Interfaces**:
- `SolanaAccountInfo` - Account with lamports and owner
- `SolanaTransaction` - Full transaction with metadata
- `SolanaBlock` - Block with transactions and rewards
- `SolanaTokenAccount` - Token account with parsed data

---

### 4. Solana Beach API (`solanaBeachAPI.ts`)

**User-friendly explorer with staking and validator information**

- **Base URL**: `https://api.solanabeach.io/v1`
- **Free Tier**: Free with rate limits
- **Website**: https://solanabeach.io/
- **Documentation**: https://solanabeach.io/api

**Features**:
- Block explorer
- Comprehensive staking information
- Validator statistics and rankings
- Epoch data and history
- Network analytics
- Stake account tracking
- TPS history

**Usage**:
```typescript
import { solanaBeachAPI, createSolanaBeachAPI } from '@blockchainAPIs/SOL.Solana';

// Get account balance
const balance = await solanaBeachAPI.getBalance('address...');

// Get validators
const validators = await solanaBeachAPI.getValidators(100);

// Get validator info
const validator = await solanaBeachAPI.getValidator('pubkey...');

// Get stake accounts
const stakeAccounts = await solanaBeachAPI.getStakeAccounts('address...');

// Get current epoch
const epoch = await solanaBeachAPI.getCurrentEpoch();

// Get epoch validators
const epochValidators = await solanaBeachAPI.getEpochValidators();

// Get network stats
const stats = await solanaBeachAPI.getNetworkStats();

// Get TPS history
const tpsHistory = await solanaBeachAPI.getTpsHistory(24);

// With API key
const api = createSolanaBeachAPI('YOUR_API_KEY');
```

**Key Interfaces**:
- `SolanaBeachValidator` - Validator with commission and stake
- `SolanaBeachEpoch` - Epoch information
- `SolanaBeachStakeAccount` - Stake account with delegation
- `SolanaBeachNetworkStats` - Network statistics

---

### 5. Helius API (`heliusAPI.ts`)

**Enterprise-grade Solana APIs trusted by leading wallets and DeFi apps**

- **Base URL**: `https://api.helius.xyz/v0`
- **RPC URL**: `https://mainnet-beta.helius-rpc.com`
- **Free Tier**: Requires API key (generous free tier available)
- **Website**: https://www.helius.dev/
- **Documentation**: https://docs.helius.dev/

**Features**:
- Enhanced token metadata and balances
- Comprehensive NFT APIs
- Transaction parsing and enrichment
- DAS (Digital Asset Standard) API
- Compressed NFT support
- WebSocket support
- Webhook notifications
- Enhanced RPC methods

**Usage**:
```typescript
import { createHeliusAPI } from '@blockchainAPIs/SOL.Solana';

// API key is required
const helius = createHeliusAPI('YOUR_API_KEY', 'mainnet-beta');

// Get token balances with metadata
const tokens = await helius.getTokenBalances('address...');

// Get NFTs owned by address
const nfts = await helius.getNFTsByOwner('address...');

// Get enhanced transaction history
const txs = await helius.getEnhancedTransactions('address...');

// DAS API - Get asset
const asset = await helius.getAsset('assetId...');

// DAS API - Get assets by owner
const assets = await helius.getAssetsByOwner('address...', 1, 1000);

// DAS API - Get assets by collection
const collectionAssets = await helius.getAssetsByGroup(
  'collection',
  'collectionId...'
);

// Search assets
const searchResults = await helius.searchAssets({
  name: 'MyNFT',
  owner: 'address...',
});

// Get NFT events (sales, listings)
const events = await helius.getNFTEvents(['address...']);

// Parse transactions
const parsed = await helius.parseTransaction(['signature...']);
```

**Key Interfaces**:
- `HeliusTokenBalance` - Token balance with metadata
- `HeliusNFTMetadata` - NFT with attributes and creators
- `HeliusEnhancedTransaction` - Parsed transaction with transfers
- `HeliusAsset` - DAS asset with compression and grouping

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
import { solanaExplorerAPI, solscanAPI } from '@blockchainAPIs/SOL.Solana';

// Using official RPC (balance in lamports)
const lamports = await solanaExplorerAPI.getBalance('address...');
const sol = lamports / 1e9; // Convert to SOL

// Using Solscan
const accountInfo = await solscanAPI.getAccountInfo('address...');
console.log('Balance:', accountInfo.lamports / 1e9, 'SOL');
```

### Get All Tokens Owned by Address

```typescript
import { solanaExplorerAPI, heliusAPI } from '@blockchainAPIs/SOL.Solana';

// Using official RPC
const tokenAccounts = await solanaExplorerAPI.getTokenAccountsByOwner('address...');

// Using Helius (with metadata)
const helius = createHeliusAPI('YOUR_API_KEY');
const tokens = await helius.getTokenBalances('address...');
console.log('Token balances with metadata:', tokens);
```

### Track NFT Collection

```typescript
import { heliusAPI } from '@blockchainAPIs/SOL.Solana';

const helius = createHeliusAPI('YOUR_API_KEY');

// Get all NFTs in a collection
const collection = await helius.getAssetsByGroup(
  'collection',
  'collectionId...',
  1,
  1000
);

// Get sales events
const events = await helius.getNFTEvents([collectionId], ['NFT_SALE']);
console.log('Recent sales:', events);
```

### Monitor Staking

```typescript
import { solanaBeachAPI } from '@blockchainAPIs/SOL.Solana';

// Get stake accounts
const stakeAccounts = await solanaBeachAPI.getStakeAccounts('address...');

// Get validator performance
const validator = await solanaBeachAPI.getValidator('validatorPubkey...');
console.log('Commission:', validator.commission, '%');
console.log('Active stake:', validator.activatedStake / 1e9, 'SOL');

// Get current epoch
const epoch = await solanaBeachAPI.getCurrentEpoch();
console.log('Current epoch:', epoch.epoch);
```

### Get Transaction History

```typescript
import { solscanAPI, heliusAPI } from '@blockchainAPIs/SOL.Solana';

// Using Solscan
const txs = await solscanAPI.getTransactionHistory('address...', 50);

// Using Helius (enhanced with parsed data)
const helius = createHeliusAPI('YOUR_API_KEY');
const enhancedTxs = await helius.getEnhancedTransactions('address...');
console.log('Native transfers:', enhancedTxs[0].nativeTransfers);
console.log('Token transfers:', enhancedTxs[0].tokenTransfers);
```

---

## Rate Limits and Free Tier Summary

| API | Free Tier Limit | API Key Required | Best For |
|-----|----------------|------------------|----------|
| SolanaFM | 10 RPS, 1 GB bandwidth | ❌ (⚠️ recommended) | Real-time insights |
| Solscan | Rate limited | ❌ (⚠️ recommended) | General queries, NFTs |
| Official Solana Explorer | Public RPC limits | ❌ | Native RPC access |
| Solana Beach | Rate limited | ❌ (⚠️ recommended) | Staking, validators |
| Helius | Generous free tier | ✅ | Enhanced data, NFTs, webhooks |

---

## Recommended API Selection

- **For Basic Queries**: Use **Official Solana Explorer** (free RPC)
- **For Token Data**: Use **Solscan** or **Helius**
- **For NFTs**: Use **Helius** (best metadata and DAS support)
- **For Staking/Validators**: Use **Solana Beach** (most comprehensive)
- **For Real-time Data**: Use **SolanaFM** (10 RPS free)
- **For Production Apps**: Use **Helius** (enhanced features, webhooks)
- **For DeFi**: Use **Solscan** or **Helius**

---

## Network Support

All APIs support multiple Solana networks:
- **Mainnet-beta** (production)
- **Devnet** (development/testing)
- **Testnet** (public testing)

---

## API Status

All APIs listed are active and maintained as of October 2025. Solana continues to be one of the most actively developed blockchain ecosystems.

## Support

For API-specific issues:
- **SolanaFM**: https://docs.solana.fm/
- **Solscan**: https://solscan.io/apis
- **Official Solana Explorer**: https://docs.solana.com/api/http
- **Solana Beach**: https://solanabeach.io/api
- **Helius**: https://docs.helius.dev/

For issues with this implementation, please refer to the project's main repository.

