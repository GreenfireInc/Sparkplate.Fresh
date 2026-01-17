# Waves (WAVES) Blockchain APIs

Comprehensive collection of blockchain API implementations for **Waves (WAVES)**, a decentralized blockchain platform supporting smart contracts, dApps, and custom tokens.

## Overview

This directory contains 3 blockchain API implementations supporting Waves (WAVES):

1. **Waves Node REST API** - Official node API (free with rate limits)
2. **WScan API** - Explorer with NFT and portfolio tracking (free)
3. **GetBlock API** - RPC node provider (free tier with API key)

---

## APIs

### 1. Waves Node REST API (`wavesNodeAPI.ts`)

**Official node REST API - main interface for blockchain interaction**

- **Base URLs**: 
  - Mainnet: `https://nodes.wavesnodes.com`
  - Testnet: `https://nodes-testnet.wavesnodes.com`
  - Stagenet: `https://nodes-stagenet.wavesnodes.com`
- **Free Tier**: Free with rate limits
- **Documentation**: https://docs.waves.tech/en/waves-node/node-api/

**Features**:
- Complete blockchain data access
- Transaction broadcasting
- Smart contract (dApp) interaction
- Asset and NFT queries
- Staking and leasing information
- Data entries and script evaluation
- Alias management

**Usage**:
```typescript
import { wavesNodeAPI, createWavesNodeAPI } from '@blockchainAPIs/WAVES.Waves';

// Use default mainnet instance
const balance = await wavesNodeAPI.getBalance('3PMwoP5yMXsj7G4QDSzuTFBAM574mQbHiaa');

// Get account details with all balances
const details = await wavesNodeAPI.getAddressDetails('3PMwoP5yMXsj7G4QDSzuTFBAM574mQbHiaa');
console.log('Available:', details.regular.available);
console.log('Effective:', details.regular.effective);

// Get transaction history
const txs = await wavesNodeAPI.getTransactionHistory('3PMwoP5yMXsj7G4QDSzuTFBAM574mQbHiaa', 50);

// Get asset balance
const assetBalance = await wavesNodeAPI.getAssetBalance(
  '3PMwoP5yMXsj7G4QDSzuTFBAM574mQbHiaa',
  'assetId...'
);

// Get NFTs owned by address
const nfts = await wavesNodeAPI.getNFTBalances('3PMwoP5yMXsj7G4QDSzuTFBAM574mQbHiaa');

// Get leasing information
const leases = await wavesNodeAPI.getActiveLeases('3PMwoP5yMXsj7G4QDSzuTFBAM574mQbHiaa');

// Get data entries (smart contract storage)
const data = await wavesNodeAPI.getDataEntries('3PMwoP5yMXsj7G4QDSzuTFBAM574mQbHiaa');

// Broadcast transaction
await wavesNodeAPI.broadcastTransaction(signedTransaction);

// With testnet
const testnetAPI = createWavesNodeAPI({ network: 'testnet' });
```

**Key Interfaces**:
- `WavesAccountInfo` - Account with detailed balance breakdown
- `WavesTransaction` - Transaction with all fields
- `WavesBlock` - Block with transactions
- `WavesAsset` - Asset/token metadata
- `WavesAssetBalance` - Asset balance for address

---

### 2. WScan API (`wscanAPI.ts`)

**Explorer with tokens, NFTs, and portfolio tracking**

- **Base URL**: `https://api.wscan.io`
- **Free Tier**: Free with rate limits
- **Website**: https://wscan.io/

**Features**:
- Latest tokens and NFTs
- Transaction search with filters
- Portfolio overviews
- NFT tracking by owner
- CSV export capabilities

**Usage**:
```typescript
import { wscanAPI, createWScanAPI } from '@blockchainAPIs/WAVES.Waves';

// Get account information
const account = await wscanAPI.getAccount('3PMwoP5yMXsj7G4QDSzuTFBAM574mQbHiaa');

// Get balance
const balance = await wscanAPI.getBalance('3PMwoP5yMXsj7G4QDSzuTFBAM574mQbHiaa');

// Get transaction history
const txs = await wscanAPI.getTransactionHistory('3PMwoP5yMXsj7G4QDSzuTFBAM574mQbHiaa');

// Get latest tokens
const tokens = await wscanAPI.getLatestTokens(50);

// Get latest NFTs
const nfts = await wscanAPI.getLatestNFTs(50);

// Get NFTs by owner
const myNFTs = await wscanAPI.getNFTsByOwner('3PMwoP5yMXsj7G4QDSzuTFBAM574mQbHiaa');

// Search transactions
const results = await wscanAPI.searchTransactions('query', 50);

// With API key for higher limits
const api = createWScanAPI('YOUR_API_KEY');
```

**Key Interfaces**:
- `WScanAccount` - Account with assets
- `WScanTransaction` - Transaction data

---

### 3. GetBlock API (`getBlockAPI.ts`)

**RPC node provider for Waves blockchain**

- **Endpoint**: `https://go.getblock.io/{API_KEY}/`
- **Free Tier**: Free tier with API key
- **Website**: https://getblock.io/nodes/waves/
- **Documentation**: https://getblock.io/docs/waves/

**Features**:
- Instant access to Waves RPC nodes
- Reliable infrastructure
- High availability
- Transaction broadcasting
- Asset queries

**Usage**:
```typescript
import { createGetBlockWavesAPI } from '@blockchainAPIs/WAVES.Waves';

// API key is required
const getblock = createGetBlockWavesAPI('YOUR_API_KEY');

// Get balance
const balance = await getblock.getBalance('3PMwoP5yMXsj7G4QDSzuTFBAM574mQbHiaa');

// Get transaction
const tx = await getblock.getTransaction('txId...');

// Get block
const block = await getblock.getBlockByHeight(123456);

// Get asset balance
const assetBalance = await getblock.getAssetBalance(
  '3PMwoP5yMXsj7G4QDSzuTFBAM574mQbHiaa',
  'assetId...'
);

// For testnet
const testnetAPI = createGetBlockWavesAPI('YOUR_API_KEY', 'testnet');
```

**Key Interfaces**:
- `GetBlockBalance` - Address balance
- `GetBlockTransaction` - Transaction data
- `GetBlockBlock` - Block information

---

## Common Use Cases

### Get WAVES Balance

```typescript
import { wavesNodeAPI } from '@blockchainAPIs/WAVES.Waves';

const balance = await wavesNodeAPI.getBalance('3PMwoP5yMXsj7G4QDSzuTFBAM574mQbHiaa');
const wavesBalance = balance / 100000000; // Convert from wavelets to WAVES
console.log('Balance:', wavesBalance, 'WAVES');
```

### Get All Assets Owned

```typescript
import { wavesNodeAPI } from '@blockchainAPIs/WAVES.Waves';

const assets = await wavesNodeAPI.getAllAssetBalances('3PMwoP5yMXsj7G4QDSzuTFBAM574mQbHiaa');
console.log('Assets:', assets.balances);
```

### Get Transaction History

```typescript
import { wavesNodeAPI } from '@blockchainAPIs/WAVES.Waves';

const txs = await wavesNodeAPI.getTransactionHistory('3PMwoP5yMXsj7G4QDSzuTFBAM574mQbHiaa', 100);
console.log('Transactions:', txs);
```

### Get NFTs Owned

```typescript
import { wavesNodeAPI } from '@blockchainAPIs/WAVES.Waves';

const nfts = await wavesNodeAPI.getNFTBalances('3PMwoP5yMXsj7G4QDSzuTFBAM574mQbHiaa', 100);
console.log('NFTs:', nfts);
```

### Check Leasing (Staking)

```typescript
import { wavesNodeAPI } from '@blockchainAPIs/WAVES.Waves';

const leases = await wavesNodeAPI.getActiveLeases('3PMwoP5yMXsj7G4QDSzuTFBAM574mQbHiaa');
console.log('Active leases:', leases);
```

---

## Rate Limits and Free Tier Summary

| API | Free Tier Limit | API Key Required | Best For |
|-----|----------------|------------------|----------|
| Waves Node REST | Rate limited | ❌ | Official API, complete features |
| WScan | Rate limited | ❌ (⚠️ recommended) | NFTs, portfolio tracking |
| GetBlock | Free tier | ✅ | RPC access, reliability |

---

## Waves-Specific Features

### Balance Units
- **Wavelet**: Smallest unit (1 WAVES = 100,000,000 wavelets)
- All API responses use wavelets

### Address Format
- **Base58 encoding**
- Mainnet addresses start with `3P`
- Testnet addresses start with `3M` or `3N`
- Example: `3PMwoP5yMXsj7G4QDSzuTFBAM574mQbHiaa`

### Cryptography
- **Curve25519-ED25519** with X25519 keys
- Blake2b256 and Keccak256 for hashing
- Base58 encoding for keys and addresses

### Account Features
- **Data Storage**: Key-value storage on-chain
- **Aliases**: Human-readable address names
- **Scripts**: Smart accounts with custom logic
- **Leasing**: Stake WAVES to nodes for rewards

### Assets
- **Custom Tokens**: Create your own tokens
- **NFTs**: Non-fungible tokens support
- **Smart Assets**: Tokens with custom scripts
- **Sponsorship**: Pay fees in custom tokens

---

## Network Support

All APIs support multiple Waves networks:
- **Mainnet** (production) - Chain ID: 'W'
- **Testnet** (testing) - Chain ID: 'T'
- **Stagenet** (staging) - Chain ID: 'S'

---

## Installation

All dependencies are already included in the project's `package.json`:

```bash
npm install axios
```

---

## API Status

All APIs listed are active and maintained as of October 2025. Waves continues to be a leading blockchain platform with a strong developer community.

## Support

For API-specific issues:
- **Waves Node REST API**: https://docs.waves.tech/en/waves-node/node-api/
- **WScan**: https://wscan.io/
- **GetBlock**: https://getblock.io/docs/waves/

For issues with this implementation, please refer to the project's main repository.

