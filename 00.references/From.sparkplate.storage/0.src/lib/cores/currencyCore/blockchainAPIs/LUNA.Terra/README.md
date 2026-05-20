# Terra 2.0 (LUNA) Blockchain APIs

Comprehensive collection of blockchain API implementations for **Terra 2.0 (LUNA)**, the new Terra blockchain after the network fork.

## Overview

This directory contains 6 blockchain API implementations for Terra 2.0 (LUNA):

**Note**: For Terra Classic (LUNC) APIs, see [`../LUNC.TerraClassic/`](../LUNC.TerraClassic/README.md)

## Terra 2.0 (LUNA) APIs

### 1. Mintscan API (`mintscanAPI.ts`)

**Official Cosmos ecosystem explorer by Cosmostation**

- **Base URL**: `https://api-terra.cosmostation.io`
- **Free Tier**: Up to 2 requests per second and 10,000 daily calls without API key
- **Documentation**: https://docs.cosmostation.io/apis
- **Website**: https://www.mintscan.io/terra

**Features**:
- Account balance and transaction history
- Staking information and delegations
- Validator data and rankings
- Block queries
- Rewards tracking
- Transaction broadcasting

**Usage**:
```typescript
import { mintscanAPI } from '@blockchainAPIs/LUNA.Terra';

// Get account balance
const balance = await mintscanAPI.getBalance('terra1...');

// Get transaction history
const txs = await mintscanAPI.getTransactionHistory('terra1...', 50);

// Get validators
const validators = await mintscanAPI.getValidators();
```

---

### 2. Terra Finder API (`terraFinderAPI.ts`)

**Official Terra block explorer using Terra LCD (Light Client Daemon)**

- **Base URL**: `https://phoenix-lcd.terra.dev`
- **Free Tier**: Free access
- **Documentation**: https://docs.terra.money/
- **Website**: https://finder.terra.money/

**Features**:
- Direct blockchain queries via REST
- Account, transaction, and block data
- Staking and governance information
- Network parameters
- Supply information

**Usage**:
```typescript
import { terraFinderAPI } from '@blockchainAPIs/LUNA.Terra';

// Get account info
const account = await terraFinderAPI.getAccountInfo('terra1...');

// Get balance
const balances = await terraFinderAPI.getBalance('terra1...');

// Get latest block
const block = await terraFinderAPI.getLatestBlock();
```

---

### 3. ATOMScan API for Terra 2.0 (`atomscanAPI.ts`)

**Cosmos ecosystem explorer supporting Terra 2.0**

- **Base URL**: `https://atomscan.com/terra2/api`
- **Free Tier**: Free access with rate limits
- **Website**: https://atomscan.com/terra2/

**Features**:
- Account and transaction data
- Price information
- Transaction statistics
- Validator information
- Chain statistics

**Usage**:
```typescript
import { atomscanLunaAPI } from '@blockchainAPIs/LUNA.Terra';

// Get account info
const account = await atomscanLunaAPI.getAccountInfo('terra1...');

// Get price information
const price = await atomscanLunaAPI.getPrice();

// Get chain stats
const stats = await atomscanLunaAPI.getChainStats();
```

---

### 4. Stake.ID API (`stakeIdAPI.ts`)

**Explorer for Terra network with search and analytics**

- **Base URL**: `https://terra.stake.id/api`
- **Free Tier**: Free access
- **Website**: https://terra.stake.id/

**Features**:
- Search addresses, blocks, transactions, validators
- Key statistics and metrics
- Network visualization
- Governance proposals

**Usage**:
```typescript
import { stakeIdAPI } from '@blockchainAPIs/LUNA.Terra';

// Search the blockchain
const result = await stakeIdAPI.search('terra1...');

// Get validators
const validators = await stakeIdAPI.getValidators();

// Get chain statistics
const stats = await stakeIdAPI.getChainStats();
```

---

### 5. GetBlock API (`getblockAPI.ts`)

**Instant access to Terra 2.0 RPC nodes**

- **Base URL**: Custom with API key
- **Free Tier**: 50,000 compute units per month and 5 requests per second
- **Documentation**: https://getblock.io/docs/
- **Website**: https://getblock.io/nodes/luna/
- **Requires**: API Key

**Features**:
- RPC and REST endpoints
- Block, transaction, and account data
- Network information
- Transaction broadcasting

**Usage**:
```typescript
import { createGetBlockLunaAPI } from '@blockchainAPIs/LUNA.Terra';

const getBlockAPI = createGetBlockLunaAPI('YOUR_API_KEY');

// Get block
const block = await getBlockAPI.getBlock(12345);

// Get transaction
const tx = await getBlockAPI.getTransaction('TXHASH');

// Broadcast transaction
const result = await getBlockAPI.broadcastTransaction(txBytes);
```

---

### 6. NOWNodes API (`nownodesAPI.ts`)

**Full node access for Terra blockchain**

- **Base URLs**: 
  - RPC: `https://luna.nownodes.io`
  - REST: `https://luna-rest.nownodes.io`
- **Free Tier**: Free tier available (requires API key)
- **Documentation**: https://nownodes.io/documentation
- **Website**: https://nownodes.io/terra-luna
- **Requires**: API Key

**Features**:
- Full node RPC and REST access
- Block, transaction, and account data
- Staking and governance queries
- Network information

**Usage**:
```typescript
import { createNOWNodesLunaAPI } from '@blockchainAPIs/LUNA.Terra';

const nowNodesAPI = createNOWNodesLunaAPI('YOUR_API_KEY');

// Get balance
const balance = await nowNodesAPI.getBalance('terra1...');

// Get delegations
const delegations = await nowNodesAPI.getDelegations('terra1...');

// Get validators
const validators = await nowNodesAPI.getValidators();
```

---

## Key Features Comparison

| API | Free Tier | API Key Required | Rate Limits |
|-----|-----------|------------------|-------------|
| Mintscan | ✅ (10K/day) | ❌ | 2 req/s |
| Terra Finder | ✅ | ❌ | Yes |
| ATOMScan | ✅ | ❌ | Yes |
| Stake.ID | ✅ | ❌ | Yes |
| GetBlock | ✅ (50K units/mo) | ✅ | 5 req/s |
| NOWNodes | ✅ | ✅ | Yes |

## Installation

All dependencies are already included in the project's `package.json`:

```bash
npm install axios
```

## Common Use Cases

### Query Terra 2.0 Account Balance

```typescript
import { mintscanAPI } from '@blockchainAPIs/LUNA.Terra';

const address = 'terra1...';
const balances = await mintscanAPI.getBalance(address);
console.log('Balances:', balances);
```

### Get Validator Information

```typescript
import { mintscanAPI } from '@blockchainAPIs/LUNA.Terra';

// Terra 2.0 validators
const validators = await mintscanAPI.getValidators();
console.log('Active validators:', validators);
```

### Get Transaction History

```typescript
import { terraFinderAPI } from '@blockchainAPIs/LUNA.Terra';

const address = 'terra1...';
const txs = await terraFinderAPI.getTransactionHistory(address, 50);
console.log('Transaction history:', txs);
```

### Broadcast Transaction

```typescript
import { terraFinderAPI } from '@blockchainAPIs/LUNA.Terra';

const txResult = await terraFinderAPI.broadcastTransaction(txBytes);
console.log('Transaction hash:', txResult.txhash);
```

### Get Staking Information

```typescript
import { mintscanAPI } from '@blockchainAPIs/LUNA.Terra';

const address = 'terra1...';
const delegations = await mintscanAPI.getDelegations(address);
const rewards = await mintscanAPI.getRewards(address);
console.log('Delegations:', delegations);
console.log('Rewards:', rewards);
```

## Network Information

### Terra 2.0 (LUNA)
- **Chain ID**: `phoenix-1` (mainnet)
- **Native Token**: LUNA
- **Address Prefix**: `terra`
- **Consensus**: Tendermint BFT
- **Block Time**: ~6 seconds

## Notes

1. **API Keys**: GetBlock and NOWNodes APIs require API keys. Sign up on their respective websites to obtain free tier access.

2. **Rate Limits**: All free tier APIs have rate limits. For production use with high traffic, consider upgrading to paid tiers.

3. **Terra Classic**: For Terra Classic (LUNC) APIs, see [`../LUNC.TerraClassic/`](../LUNC.TerraClassic/README.md)

4. **Address Format**: Terra 2.0 uses the `terra...` address format with Bech32 encoding.

## API Status

All APIs listed are active and maintained as of October 2025. For the most current information about API availability and endpoints, refer to each provider's official documentation.

## Support

For API-specific issues:
- **Mintscan**: https://docs.cosmostation.io/
- **Terra Finder**: https://docs.terra.money/
- **ATOMScan**: https://atomscan.com/terra2/
- **Stake.ID**: https://terra.stake.id/
- **GetBlock**: https://getblock.io/docs/
- **NOWNodes**: https://nownodes.io/documentation

For issues with this implementation, please refer to the project's main repository.

