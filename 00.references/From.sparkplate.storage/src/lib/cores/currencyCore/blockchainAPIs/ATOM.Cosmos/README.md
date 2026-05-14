# Cosmos (ATOM) Blockchain APIs

This directory contains modular blockchain API implementations for interacting with the Cosmos Hub network.

**Important Note:** Cosmos is an **account-based** blockchain (like Ethereum), not UTXO-based (like Bitcoin). Therefore, UTXO-related functionality is not applicable.

## Available APIs

Cosmos has **3 different API implementations** available:

### 1. Mintscan API (by Cosmostation) - Recommended for Production

Located in `ATOM.Cosmos/mintscanAPI.ts`

**Features:**
- Enterprise-grade indexed API
- Get account balance and information
- Get transaction by hash
- Get transaction history with pagination
- Get block by height
- Get latest block height
- Broadcast transactions
- Get validator information
- Historical statistics and analytics

**API Limits:**
- Free tier: **2 requests/second**
- Free tier: **10,000 calls/day** without API key
- Optional API key for higher limits (approval flow)

**Endpoints:**
- Base URL: `https://apis.mintscan.io/v1`
- Documentation: https://docs.cosmostation.io/apis

**Usage:**
```typescript
import { MintscanAPI } from '@/components/currencyCore/blockchainAPIs/ATOM.Cosmos';

// Without API key (free tier)
const api = new MintscanAPI('mainnet');
const balance = await api.getBalance('cosmos1...');

// With API key (higher limits)
const apiWithKey = new MintscanAPI('mainnet', { apiKey: 'YOUR_KEY' });
const history = await apiWithKey.getTransactionHistory('cosmos1...', 50);
```

---

### 2. ATOMScan API - Recommended for Simple Queries

Located in `ATOM.Cosmos/atomscanAPI.ts`

**Features:**
- Public LCD/REST gateway
- Get account balance and information
- Get transaction by hash
- Get transaction history (sender-based)
- Get block by height and latest block
- Broadcast transactions
- Get delegations
- Get validators with status filtering

**API Limits:**
- Free public access
- Standard rate limits (no specific limit documented)
- No API key required

**Endpoints:**
- Mainnet LCD: `https://cosmos.lcd.atomscan.com`
- Mainnet RPC: `https://cosmos.rpc.atomscan.com`

**Usage:**
```typescript
import { atomscanMainnet } from '@/components/currencyCore/blockchainAPIs/ATOM.Cosmos';

const balance = await atomscanMainnet.getBalance('cosmos1...');
const delegations = await atomscanMainnet.getDelegations('cosmos1...');
const validators = await atomscanMainnet.getValidators('BOND_STATUS_BONDED');
```

---

### 3. Public LCD API - Direct Node Access

Located in `ATOM.Cosmos/publicLCDAPI.ts`

**Features:**
- Direct access to public Cosmos SDK full nodes
- Standard Cosmos SDK gRPC-gateway (REST/LCD) endpoints
- Multiple public endpoints with automatic fallback
- Get account balance and information
- Get transaction by hash
- Get transaction history
- Broadcast transactions
- Get delegations
- Get staking pool information
- Get latest block height

**API Limits:**
- Free public access
- Rate limits vary by endpoint provider (~5-10 req/sec typical)
- No API key required

**Public Endpoints:**
```typescript
// Available LCD endpoints:
- https://cosmos-lcd.quickapi.com
- https://lcd-cosmoshub.keplr.app
- https://rest-cosmoshub-ia.cosmosia.notional.ventures
- https://cosmos-rest.staketab.org
- https://rest.cosmos.directory/cosmoshub
- https://lcd-cosmos.whispernode.com

// Available RPC endpoints:
- https://cosmos-rpc.quickapi.com
- https://rpc-cosmoshub.keplr.app
- https://rpc-cosmoshub-ia.cosmosia.notional.ventures
- https://cosmos-rpc.staketab.org
- https://rpc.cosmos.directory/cosmoshub
```

**Usage:**
```typescript
import { PublicLCDAPI, publicLCD } from '@/components/currencyCore/blockchainAPIs/ATOM.Cosmos';

// Using default endpoint
const balance = await publicLCD.getBalance('cosmos1...');

// Using custom endpoint
const customApi = new PublicLCDAPI({
  lcdUrl: 'https://lcd-cosmoshub.keplr.app',
  rpcUrl: 'https://rpc-cosmoshub.keplr.app'
});

// Switch between public endpoints
const api = new PublicLCDAPI();
api.switchEndpoint(1); // Switch to second LCD endpoint
const balance2 = await api.getBalance('cosmos1...');

// Get list of available endpoints
const endpoints = PublicLCDAPI.getPublicEndpoints();
console.log('Available LCD endpoints:', endpoints.lcd);
```

---

## API Comparison

| Feature | Mintscan | ATOMScan | Public LCD |
|---------|----------|----------|------------|
| **Get Balance** | ✅ | ✅ | ✅ |
| **Account Info** | ✅ | ✅ | ✅ |
| **Broadcast TX** | ✅ | ✅ | ✅ |
| **TX History** | ✅ Advanced | ✅ Basic | ✅ Basic |
| **TX by Hash** | ✅ | ✅ | ✅ |
| **Get Block** | ✅ | ✅ | ❌ |
| **Get Delegations** | ❌ | ✅ | ✅ |
| **Get Validators** | ✅ | ✅ | ❌ |
| **Staking Info** | ❌ | ❌ | ✅ |
| **Historical Stats** | ✅ | ❌ | ❌ |
| **API Key Required** | ❌ (optional) | ❌ | ❌ |
| **Free Tier Limit** | 2 req/sec, 10k/day | Rate Limited | Rate Limited |
| **Endpoint Flexibility** | ❌ | ❌ | ✅ Multiple |

---

## Recommended Usage Pattern

For a complete Cosmos implementation, use multiple APIs with fallback:

```typescript
import { 
  MintscanAPI,
  atomscanMainnet,
  publicLCD
} from '@/components/currencyCore/blockchainAPIs/ATOM.Cosmos';

// Primary: Use Mintscan for rich features (within rate limits)
const mintscan = new MintscanAPI('mainnet');

// Secondary: Use ATOMScan as fallback
const atomscan = atomscanMainnet;

// Tertiary: Use Public LCD as last resort
const lcd = publicLCD;

async function getBalance(address: string) {
  try {
    return await mintscan.getBalance(address);
  } catch (error) {
    console.log('Mintscan failed, trying ATOMScan...');
    try {
      return await atomscan.getBalance(address);
    } catch (error2) {
      console.log('ATOMScan failed, trying Public LCD...');
      return await lcd.getBalance(address);
    }
  }
}

async function broadcastTransaction(txBytes: string) {
  try {
    return await atomscan.broadcastTransaction(txBytes);
  } catch (error) {
    console.log('ATOMScan failed, trying Public LCD...');
    return await lcd.broadcastTransaction(txBytes);
  }
}

async function getTransactionHistory(address: string) {
  // Mintscan has the best transaction history features
  return await mintscan.getTransactionHistory(address, 50);
}

async function getDelegations(address: string) {
  // ATOMScan or Public LCD for delegation queries
  try {
    return await atomscan.getDelegations(address);
  } catch (error) {
    return await lcd.getDelegations(address);
  }
}
```

---

## Cosmos Specifics

### Account-Based Model
Unlike Bitcoin (UTXO-based), Cosmos uses an account-based model:
- No UTXOs to fetch
- Accounts have balances in multiple denominations
- Primary denomination: `uatom` (1 ATOM = 1,000,000 uatom)
- Supports IBC (Inter-Blockchain Communication) tokens

### Denominations
- **uatom**: Base unit (1 ATOM = 1,000,000 uatom)
- IBC tokens: `ibc/...` format
- All API responses use base denominations

### Transaction Types
Common message types:
- `/cosmos.bank.v1beta1.MsgSend` - Send tokens
- `/cosmos.staking.v1beta1.MsgDelegate` - Delegate to validator
- `/cosmos.staking.v1beta1.MsgUndelegate` - Undelegate from validator
- `/cosmos.staking.v1beta1.MsgBeginRedelegate` - Redelegate to different validator
- `/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward` - Claim staking rewards
- `/cosmos.gov.v1beta1.MsgVote` - Vote on governance proposals
- `/ibc.applications.transfer.v1.MsgTransfer` - IBC transfer

### Staking
- Cosmos uses Proof-of-Stake consensus
- Users can delegate ATOM to validators
- Rewards are distributed to delegators
- Unbonding period: 21 days

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
| Mintscan | 2 req/sec, 10k/day | Best for production |
| ATOMScan | ~5-10 req/sec | Shared public API |
| Public LCD | ~5-10 req/sec | Varies by provider |

### Rate Limit Best Practices
1. Implement exponential backoff
2. Cache responses when possible
3. Use Mintscan for production (clear limits)
4. Implement fallback between APIs
5. For high-volume apps, run your own full node

---

## Getting Started

### 1. For Simple Queries (No API Key)
```typescript
import { atomscanMainnet } from '@/components/currencyCore/blockchainAPIs/ATOM.Cosmos';

const balance = await atomscanMainnet.getBalance('cosmos1...');
```

### 2. For Transaction Broadcasting
```typescript
import { atomscanMainnet } from '@/components/currencyCore/blockchainAPIs/ATOM.Cosmos';

const result = await atomscanMainnet.broadcastTransaction(txBytes);
console.log('Transaction hash:', result.tx_response.txhash);
```

### 3. For Transaction History
```typescript
import { mintscanMainnet } from '@/components/currencyCore/blockchainAPIs/ATOM.Cosmos';

const history = await mintscanMainnet.getTransactionHistory('cosmos1...', 50);
```

### 4. For Staking Operations
```typescript
import { atomscanMainnet } from '@/components/currencyCore/blockchainAPIs/ATOM.Cosmos';

// Get delegations
const delegations = await atomscanMainnet.getDelegations('cosmos1...');

// Get validators
const validators = await atomscanMainnet.getValidators('BOND_STATUS_BONDED');
```

### 5. Using Multiple Endpoints (Fallback)
```typescript
import { PublicLCDAPI } from '@/components/currencyCore/blockchainAPIs/ATOM.Cosmos';

const endpoints = PublicLCDAPI.getPublicEndpoints();

for (let i = 0; i < endpoints.lcd.length; i++) {
  try {
    const api = new PublicLCDAPI({ lcdUrl: endpoints.lcd[i] });
    const balance = await api.getBalance('cosmos1...');
    console.log('Success with endpoint:', endpoints.lcd[i]);
    break;
  } catch (error) {
    console.log(`Endpoint ${i} failed, trying next...`);
  }
}
```

---

## Resources

- **Cosmos Network:** https://cosmos.network/
- **Cosmos SDK Documentation:** https://docs.cosmos.network/
- **Mintscan (Cosmostation):** https://www.mintscan.io/
- **Cosmostation API Docs:** https://docs.cosmostation.io/apis
- **ATOMScan:** https://atomscan.com/
- **Cosmos Chain Registry:** https://github.com/cosmos/chain-registry
- **Big Dipper (Open Source Explorer):** https://docs.bigdipper.live/
- **Ping.pub Dashboard:** https://ping.pub/cosmos

---

## Notes on Other Services

### Big Dipper (Forbole)
- Open-source block explorer stack
- Self-hosted option with GraphQL/Hasura indexer
- Not included as a pre-built API (requires deployment)
- Documentation: https://docs.bigdipper.live/

### GetBlock.io & NOWNodes
- Commercial RPC node providers
- Require API keys (free tiers available)
- Not implemented here (use Public LCD API instead for free access)

---

**Last Updated:** October 12, 2025

