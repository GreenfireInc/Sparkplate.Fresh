# Terra Classic (LUNC) Blockchain APIs

Comprehensive collection of blockchain API implementations for **Terra Classic (LUNC)**, the original Terra blockchain after the network's collapse and subsequent fork.

## Overview

This directory contains 9 blockchain API implementations supporting Terra Classic (LUNC):

1. **LuncScan API** - Dedicated LUNC tracker with burn data
2. **ATOMScan Terra Classic API** - LUNC tracking and historical data
3. **Terra Classic Tools API** - Ecosystem hub with DeFi data
4. **NOWNodes Terra Classic API** - Full node access with tax data
5. **Terrasco.pe API** - Terra Classic focused explorer
6. **PublicNode API** - Free public RPC, LCD, and FCD endpoints
7. **Autostake API** - Free developer access tier
8. **Mintscan Classic API** - Enterprise-grade data indexing (10k/day free)
9. **Bitquery API** - GraphQL-based blockchain data (free tier)

---

## APIs

### 1. LuncScan API (`luncScanAPI.ts`)

**Terra Classic blockchain tracker specifically designed for LUNC**

- **Base URL**: `https://luncscan.com/api`
- **Free Tier**: Free with rate limits
- **Website**: https://luncscan.com/

**Features**:
- Track LUNC (native coin of original Terra blockchain)
- **Burn tracking and statistics** (unique feature)
- Account and transaction monitoring
- Governance proposals
- Historical burn data
- Price tracking with 7d and 30d changes

**Usage**:
```typescript
import { luncScanAPI } from '@blockchainAPIs/LUNC.TerraClassic';

// Get burn information
const burnInfo = await luncScanAPI.getBurnInfo();
console.log('Total burned:', burnInfo.total_burned);
console.log('24h burn:', burnInfo.burn_24h);

// Get burn transactions
const burnTxs = await luncScanAPI.getBurnTransactions(50);

// Get chain statistics including burns
const stats = await luncScanAPI.getChainStats();
console.log('Total supply:', stats.total_supply);
console.log('Total burned:', stats.total_burned);
```

**Key Interfaces**:
- `LuncScanAccountInfo` - Account with balances and delegations
- `LuncScanBurnInfo` - Comprehensive burn statistics
- `LuncScanValidator` - Validator with uptime and rank
- `LuncScanStats` - Chain statistics including burn data

---

### 2. ATOMScan Terra Classic API (`terraClassicAtomScanAPI.ts`)

**Dedicated Terra Classic blockchain explorer**

- **Base URL**: `https://atomscan.com/terra/api`
- **Free Tier**: Free with rate limits
- **Website**: https://atomscan.com/terra

**Features**:
- Terra Classic (LUNC) specific tracking
- Account and transaction data
- Historical data for original Terra chain
- Validator information
- LUNC price tracking
- Chain statistics with burn amounts

**Usage**:
```typescript
import { terraClassicAtomScanAPI } from '@blockchainAPIs/LUNC.TerraClassic';

// Get account balance
const balance = await terraClassicAtomScanAPI.getBalance('terra1...');

// Get transaction history
const txs = await terraClassicAtomScanAPI.getTransactionHistory('terra1...', 50);

// Get LUNC price
const price = await terraClassicAtomScanAPI.getPrice();

// Get chain stats with burn amount
const stats = await terraClassicAtomScanAPI.getChainStats();
console.log('Burn amount:', stats.burn_amount);
```

**Key Interfaces**:
- `TerraClassicAccountInfo` - Account with balances, delegations, and rewards
- `TerraClassicTransaction` - Transaction with gas and fee details
- `TerraClassicBlock` - Block information
- `TerraClassicValidator` - Validator details

---

### 3. Terra Classic Tools API (`terraClassicToolsAPI.ts`)

**Ecosystem hub for Terra Classic blockchain**

- **Base URL**: `https://api.terra-classic.money`
- **Free Tier**: Free
- **Website**: https://www.terra-classic.money/

**Features**:
- Live LUNC and USTC price tracking
- Burn monitoring
- **USTC re-peg tracking** (unique feature)
- Staking yields and DeFi information
- Bridges and wallets information
- Historical price and burn data
- Community proposals

**Usage**:
```typescript
import { terraClassicToolsAPI } from '@blockchainAPIs/LUNC.TerraClassic';

// Get prices for LUNC and USTC
const prices = await terraClassicToolsAPI.getPrices();
console.log('LUNC price:', prices.lunc.usd);
console.log('USTC price:', prices.ustc.usd);

// Get burn statistics
const burnStats = await terraClassicToolsAPI.getBurnStats();
console.log('Total burned:', burnStats.total_burned);
console.log('Tax burn:', burnStats.tax_burn);

// Monitor USTC re-peg progress
const repegInfo = await terraClassicToolsAPI.getUSTCRepegInfo();
console.log('USTC price:', repegInfo.current_price);
console.log('Re-peg progress:', repegInfo.repeg_progress + '%');

// Get DeFi statistics
const defiStats = await terraClassicToolsAPI.getDefiStats();
console.log('Total Value Locked:', defiStats.total_value_locked);

// Get historical burn data
const burnHistory = await terraClassicToolsAPI.getHistoricalBurn(30);
```

**Key Interfaces**:
- `TerraClassicPrice` - Prices for LUNC and USTC
- `TerraClassicBurnStats` - Comprehensive burn statistics
- `USTCRepegInfo` - USTC re-peg progress and backing ratio
- `TerraClassicStakingInfo` - Staking information
- `TerraClassicDefiStats` - DeFi statistics

---

### 4. NOWNodes Terra Classic API (`terraClassicNOWNodesAPI.ts`)

**Instantaneous access to Terra Classic nodes and block explorers**

- **Base URLs**:
  - RPC: `https://terra-classic.nownodes.io`
  - REST: `https://terra-classic-rest.nownodes.io`
- **Free Tier**: Free tier available (requires API key)
- **Documentation**: https://nownodes.io/documentation
- **Website**: https://nownodes.io/nodes/terra-classic-lunc
- **Requires**: API Key

**Features**:
- Full node RPC and REST access for Terra Classic
- Block, transaction, and account data
- Staking and governance queries
- **Terra Classic specific treasury and tax data** (unique feature)
- Network information

**Usage**:
```typescript
import { createTerraClassicNOWNodesAPI } from '@blockchainAPIs/LUNC.TerraClassic';

const terraClassicAPI = createTerraClassicNOWNodesAPI('YOUR_API_KEY');

// Get balance
const balance = await terraClassicAPI.getBalance('terra1...');

// Get tax rate (Terra Classic specific)
const taxRate = await terraClassicAPI.getTaxRate();
console.log('Tax rate:', taxRate);

// Get tax cap for a denom
const taxCap = await terraClassicAPI.getTaxCap('uluna');

// Get treasury parameters
const treasury = await terraClassicAPI.getTreasuryParams();

// Get transaction history
const txs = await terraClassicAPI.getTransactionHistory('terra1...', 50);
```

**Key Interfaces**:
- `TerraClassicNOWNodesConfig` - Configuration with API key
- `TerraClassicBlock` - Block structure
- `TerraClassicTransaction` - Transaction with events
- `TerraClassicAccountInfo` - Account information
- `TerraClassicBalance` - Balance by denom

---

### 5. Terrasco.pe API (`terrascopeAPI.ts`)

**Terra Classic focused blockchain explorer (Chainscope)**

- **Base URL**: `https://terrasco.pe/api`
- **Free Tier**: Free with rate limits
- **Website**: https://terrasco.pe/

**Features**:
- Terra Classic specific data
- Account, transaction, and block information
- Historical data and analytics
- Validator performance metrics with uptime
- Governance proposals and voting
- **Vesting account information** (unique feature)
- Redelegations tracking

**Usage**:
```typescript
import { terrascopeAPI } from '@blockchainAPIs/LUNC.TerraClassic';

// Get account info with vesting details
const account = await terrascopeAPI.getAccountInfo('terra1...');
console.log('Vesting:', account.vesting);

// Get validator info with uptime and missed blocks
const validator = await terrascopeAPI.getValidator('terravaloper1...');
console.log('Uptime:', validator.uptime);
console.log('Missed blocks:', validator.missed_blocks);

// Get historical data
const historicalData = await terrascopeAPI.getHistoricalData('bonded_ratio', 30);

// Get redelegations
const redelegations = await terrascopeAPI.getRedelegations('terra1...');

// Get proposal votes
const votes = await terrascopeAPI.getProposalVotes(1, 100);
```

**Key Interfaces**:
- `TerrascopeAccountInfo` - Account with vesting details
- `TerrascopeValidator` - Validator with uptime and missed blocks
- `TerrascopeDelegation` - Delegation with validator moniker
- `TerrascopeStats` - Chain statistics with tax rate

---

## Key Features by Category

### 1. Burn Tracking (Terra Classic Specific)
- **LuncScan**: Most comprehensive burn tracking (total, 24h, 7d, 30d, by type)
- **Terra Classic Tools**: Burn statistics and historical burn data
- **ATOMScan**: Chain stats include burn amounts

### 2. USTC Re-peg Monitoring (Terra Classic Specific)
- **Terra Classic Tools**: USTC re-peg progress, backing ratio, price tracking

### 3. Tax System (Terra Classic Specific)
- **NOWNodes**: Tax rate, tax caps, treasury parameters
- **Terrasco.pe**: Chain stats include tax rate

### 4. Account Management
- Account balance queries (all APIs)
- Account information (all APIs)
- Vesting account details (Terrasco.pe)

### 5. Staking Operations
- Delegation tracking (all APIs)
- Unbonding delegations (all APIs)
- Redelegations (Terrasco.pe)
- Staking rewards (all APIs)
- Validator information (all APIs)

### 6. DeFi Data
- **Terra Classic Tools**: DeFi statistics, TVL, DEX volume, top dApps

### 7. Governance
- Proposal queries (LuncScan, Terrasco.pe, Terra Classic Tools)
- Voting information (Terrasco.pe)
- Proposal deposits (Terrasco.pe)

---

## Feature Comparison Table

| Feature | LuncScan | ATOMScan | Terra Classic Tools | NOWNodes | Terrasco.pe |
|---------|----------|----------|-------------------|----------|-------------|
| Account Balance | ✅ | ✅ | ✅ | ✅ | ✅ |
| Transaction History | ✅ | ✅ | ❌ | ✅ | ✅ |
| Burn Tracking | ✅ Comprehensive | ✅ Basic | ✅ Detailed | ❌ | ❌ |
| USTC Re-peg | ❌ | ❌ | ✅ | ❌ | ❌ |
| Tax System | ❌ | ❌ | ❌ | ✅ | ✅ Basic |
| DeFi Stats | ❌ | ❌ | ✅ | ❌ | ❌ |
| Staking/Delegations | ✅ | ✅ | ✅ Basic | ✅ | ✅ |
| Validators | ✅ | ✅ | ✅ | ✅ | ✅ Detailed |
| Price Tracking | ✅ | ✅ | ✅ LUNC & USTC | ❌ | ❌ |
| Historical Data | ❌ | ❌ | ✅ | ❌ | ✅ |
| Vesting Accounts | ❌ | ❌ | ❌ | ❌ | ✅ |
| Governance | ✅ | ❌ | ✅ | ❌ | ✅ Detailed |
| TX Broadcasting | ❌ | ❌ | ❌ | ✅ | ❌ |
| API Key Required | ❌ | ❌ | ❌ | ✅ | ❌ |

---

## Network Information

### Terra Classic (LUNC)
- **Chain ID**: `columbus-5` (mainnet)
- **Native Tokens**: 
  - LUNC (Luna Classic) - Governance and staking token
  - USTC (TerraUSD Classic) - Failed algorithmic stablecoin
- **Address Prefix**: `terra`
- **Consensus**: Tendermint BFT
- **Block Time**: ~6 seconds

### Important Notes

1. **Post-Collapse Chain**: Terra Classic is the continuation of the original Terra blockchain after the UST/LUNA collapse in May 2022.

2. **Massive Inflation**: Total supply increased dramatically post-collapse from ~350 million to over 6.9 trillion LUNC.

3. **Burn Mechanism**: The community implemented a tax burn mechanism to reduce supply.

4. **USTC Re-peg**: Ongoing community effort to restore USTC to $1 peg.

5. **Tax System**: Terra Classic maintains the original network's tax system for transactions.

---

### 6. PublicNode API (`publicNodeAPI.ts`)

**Free public RPC, LCD, and FCD endpoints for Terra Classic**

- **RPC URL**: `https://terra-classic-rpc.publicnode.com:443`
- **LCD URL**: `https://terra-classic-lcd.publicnode.com`
- **FCD URL**: `https://terra-classic-fcd.publicnode.com`
- **Free Tier**: Free with monitoring and caching
- **Website**: https://www.publicnode.com/

**Features**:
- Multiple endpoint types (RPC, LCD, FCD, gRPC, WebSocket)
- High availability with request monitoring
- No API key required
- Full node access
- Terra Classic tax data
- Comprehensive blockchain data

**Usage**:
```typescript
import { publicNodeAPI } from '@blockchainAPIs/LUNC.TerraClassic';

// Get account balance via LCD
const balance = await publicNodeAPI.getBalance('terra1...');

// Get transaction history via RPC
const txs = await publicNodeAPI.getTransactionHistory('terra1...', 50);

// Get tax rate (Terra Classic specific)
const taxRate = await publicNodeAPI.getTaxRate();

// Get tax cap
const taxCap = await publicNodeAPI.getTaxCap('uluna');

// Broadcast transaction
const result = await publicNodeAPI.broadcastTransaction(txBytes);
```

**Key Interfaces**:
- `PublicNodeAccountInfo` - Account information via LCD
- `PublicNodeTransaction` - Transaction via RPC
- `PublicNodeBlock` - Block data via RPC
- `FCDTransaction` - Transaction via FCD endpoint
- `PublicNodeBalance` - Balance information

---

### 7. Autostake API (`autostakeAPI.ts`)

**Free developer access tier for Terra Classic**

- **RPC URL**: `https://terraclassic-mainnet-rpc.autostake.com:443`
- **LCD URL**: `https://terraclassic-mainnet-lcd.autostake.com:443`
- **gRPC URL**: `terraclassic-mainnet-grpc.autostake.com:443`
- **Free Tier**: Free for development
- **Website**: https://autostake.com/

**Features**:
- Free access for development
- RPC, gRPC, and LCD endpoints
- High availability
- No API key required for basic access
- Full node functionality
- Terra Classic tax endpoints

**Usage**:
```typescript
import { autostakeAPI } from '@blockchainAPIs/LUNC.TerraClassic';

// Get account info
const account = await autostakeAPI.getAccountInfo('terra1...');

// Get delegations
const delegations = await autostakeAPI.getDelegations('terra1...');

// Get staking rewards
const rewards = await autostakeAPI.getRewards('terra1...');

// Get validators
const validators = await autostakeAPI.getValidators();

// Get tax information
const taxRate = await autostakeAPI.getTaxRate();
const taxCap = await autostakeAPI.getTaxCap('uluna');
```

**Key Interfaces**:
- `AutostakeAccountInfo` - Account information
- `AutostakeTransaction` - Transaction data
- `AutostakeBlock` - Block information
- `AutostakeBalance` - Balance details

---

### 8. Mintscan Classic API (`mintscanClassicAPI.ts`)

**Enterprise-grade blockchain data indexing for Terra Classic by Cosmostation**

- **Base URL**: `https://api-terra-classic.cosmostation.io`
- **Free Tier**: Up to 2 requests/second and 10,000 daily calls without API key
- **Website**: https://www.mintscan.io/terra-classic
- **Documentation**: https://docs.cosmostation.io/apis

**Features**:
- Generous free tier (10,000 calls/day)
- Account balance and transaction history
- Staking information and rewards
- Validator data
- Comprehensive Terra Classic support
- High performance and reliability

**Usage**:
```typescript
import { mintscanClassicAPI } from '@blockchainAPIs/LUNC.TerraClassic';

// Get account balance with staking info
const balance = await mintscanClassicAPI.getBalance('terra1...');
console.log('Available:', balance.available);
console.log('Delegated:', balance.delegated);
console.log('Rewards:', balance.rewards);

// Get transaction history
const txs = await mintscanClassicAPI.getTransactionHistory('terra1...', 50);

// Get delegations
const delegations = await mintscanClassicAPI.getDelegations('terra1...');

// Get staking rewards
const rewards = await mintscanClassicAPI.getRewards('terra1...');

// Get all validators
const validators = await mintscanClassicAPI.getValidators();
```

**Key Interfaces**:
- `MintscanClassicAccountInfo` - Account with coins and public key
- `MintscanClassicBalance` - Balance with staking breakdown
- `MintscanClassicTransaction` - Detailed transaction data
- `MintscanClassicValidator` - Validator information
- `MintscanClassicReward` - Staking rewards

---

### 9. Bitquery API (`bitqueryAPI.ts`)

**GraphQL-based blockchain data API for Terra Classic**

- **Base URL**: `https://graphql.bitquery.io`
- **Free Tier**: Free tier available
- **Website**: https://explorer.bitquery.io/terra
- **Documentation**: https://docs.bitquery.io/

**Features**:
- GraphQL queries for flexible data retrieval
- Transaction and address explorer functionality
- Balance and transaction fee analysis
- Charts and analytics
- Token transfers tracking
- Network statistics
- Validator information

**Usage**:
```typescript
import { bitqueryAPI, createBitqueryAPI } from '@blockchainAPIs/LUNC.TerraClassic';

// Use free tier
const addressInfo = await bitqueryAPI.getAddressInfo('terra1...');
console.log('Transaction count:', addressInfo.address.transactionCount);

// With API key for higher limits
const api = createBitqueryAPI('YOUR_API_KEY');
const balance = await api.getBalance('terra1...');

// Get transaction history
const txs = await bitqueryAPI.getTransactionHistory('terra1...', 50);

// Get network stats
const stats = await bitqueryAPI.getNetworkStats();

// Get validators
const validators = await bitqueryAPI.getValidators(100);

// Get token transfers
const transfers = await bitqueryAPI.getTokenTransfers('token_address', 50);
```

**Key Interfaces**:
- `BitqueryAddress` - Address with transaction counts and amounts
- `BitqueryTransaction` - Transaction with block and fee details
- `BitqueryBalance` - Balance by currency

---

## Installation

All dependencies are already included in the project's `package.json`:

```bash
npm install axios
```

---

## Common Use Cases

### Track LUNC Burns

```typescript
import { luncScanAPI, terraClassicToolsAPI } from '@blockchainAPIs/LUNC.TerraClassic';

// Get comprehensive burn info
const burnInfo = await luncScanAPI.getBurnInfo();
console.log('Total burned:', burnInfo.total_burned);
console.log('Tax burn:', burnInfo.tax_burned);
console.log('Oracle burn:', burnInfo.oracle_burned);

// Get historical burn data
const burnHistory = await terraClassicToolsAPI.getHistoricalBurn(30);
```

### Monitor USTC Re-peg

```typescript
import { terraClassicToolsAPI } from '@blockchainAPIs/LUNC.TerraClassic';

const repegInfo = await terraClassicToolsAPI.getUSTCRepegInfo();
console.log('Current USTC price:', repegInfo.current_price);
console.log('Target price:', repegInfo.target_price);
console.log('Re-peg progress:', repegInfo.repeg_progress + '%');
console.log('Backing ratio:', repegInfo.backing_ratio);
```

### Query Tax Information

```typescript
import { createTerraClassicNOWNodesAPI } from '@blockchainAPIs/LUNC.TerraClassic';

const api = createTerraClassicNOWNodesAPI('YOUR_API_KEY');

const taxRate = await api.getTaxRate();
const taxCapLUNC = await api.getTaxCap('uluna');
const treasuryParams = await api.getTreasuryParams();
```

### Get DeFi Statistics

```typescript
import { terraClassicToolsAPI } from '@blockchainAPIs/LUNC.TerraClassic';

const defiStats = await terraClassicToolsAPI.getDefiStats();
console.log('Total Value Locked:', defiStats.total_value_locked);
console.log('24h DEX Volume:', defiStats.dex_volume_24h);
console.log('Top dApps:', defiStats.top_dapps);
```

---

## Rate Limits and Free Tier Summary

| API | Free Tier Limit | API Key Required | Best For |
|-----|----------------|------------------|----------|
| LuncScan | Rate limited | ❌ | Burn tracking |
| ATOMScan | Rate limited | ❌ | General queries |
| Terra Classic Tools | Rate limited | ❌ | Ecosystem data, USTC re-peg |
| NOWNodes | Free tier | ✅ | Full node access, tax data |
| Terrasco.pe | Rate limited | ❌ | Analytics, vesting accounts |
| PublicNode | Free with caching | ❌ | RPC/LCD/FCD access |
| Autostake | Free for dev | ❌ | RPC/gRPC/LCD access |
| Mintscan Classic | 10,000 calls/day | ❌ | High-volume queries |
| Bitquery | Free tier | ❌ (⚠️ recommended) | GraphQL queries |

---

## Recommended API Selection

- **For Burn Tracking**: Use **LuncScan** (most comprehensive)
- **For USTC Re-peg**: Use **Terra Classic Tools** (only option)
- **For Tax Data**: Use **NOWNodes**, **PublicNode**, or **Autostake**
- **For DeFi Data**: Use **Terra Classic Tools** (only option)
- **For Vesting Accounts**: Use **Terrasco.pe** (only option)
- **For General Queries**: Use **ATOMScan** or **LuncScan**
- **For RPC Access**: Use **PublicNode** (free, no key) or **Autostake** (free)
- **For High Volume**: Use **Mintscan Classic** (10k calls/day)
- **For GraphQL Queries**: Use **Bitquery** (flexible data retrieval)
- **For Production**: Use **Mintscan Classic** (most generous free tier)

---

## API Status

All APIs listed are active and maintained as of October 2025. The Terra Classic community continues to support these services.

## Support

For API-specific issues:
- **LuncScan**: https://luncscan.com/
- **ATOMScan**: https://atomscan.com/terra
- **Terra Classic Tools**: https://www.terra-classic.money/
- **NOWNodes**: https://nownodes.io/documentation
- **Terrasco.pe**: https://terrasco.pe/
- **PublicNode**: https://www.publicnode.com/
- **Autostake**: https://autostake.com/
- **Mintscan Classic**: https://docs.cosmostation.io/apis
- **Bitquery**: https://docs.bitquery.io/

For issues with this implementation, please refer to the project's main repository.

