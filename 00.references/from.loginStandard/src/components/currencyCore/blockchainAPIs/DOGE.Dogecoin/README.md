# Dogecoin (DOGE) Blockchain APIs

This directory contains implementations for various Dogecoin blockchain APIs, providing access to transaction data, UTXOs, balances, and broadcasting capabilities.

## 📋 Overview

Dogecoin is a **UTXO-based** blockchain (similar to Bitcoin). All APIs in this directory support:
- **UTXO Fetching**: Get unspent transaction outputs for addresses
- **Balance Queries**: Check address balances
- **Transaction History**: Retrieve historical transactions
- **Transaction Broadcasting**: Broadcast signed transactions to the network
- **Block Information**: Query blocks by height or hash
- **Fee Estimation**: Get recommended transaction fees

## 🚀 Available APIs

### 1. **Dogechain.info API** (Recommended)
**Status:** ✅ Free, One of the Oldest Dogecoin Explorers  
**Rate Limits:** Free developer API, moderate rate limits  
**Networks:** Mainnet, Testnet

**Features:**
- Established and reliable
- Free developer API access
- Address balance and transaction history
- UTXO fetching
- Transaction broadcasting
- Block information
- Network statistics

**Usage:**
```typescript
import { dogechainMainnet } from '@/components/currencyCore/blockchainAPIs/DOGE.Dogecoin';

// Get address balance
const balance = await dogechainMainnet.getBalance('D7P2qjEuqVn7tkS9vFVV7Jq3a8Wb6hLDdv');

// Get UTXOs
const utxos = await dogechainMainnet.getUTXOs('D7P2qjEuqVn7tkS9vFVV7Jq3a8Wb6hLDdv');

// Broadcast transaction
const result = await dogechainMainnet.broadcastTransaction('01000000...');
```

---

### 2. **BlockCypher API**
**Status:** ✅ Free Tier Available  
**Rate Limits:** 3 req/sec (non-registered), 200 req/hour, 2000/day with token  
**Networks:** Mainnet, Testnet

**Features:**
- Unified blockchain API
- WebHooks for address monitoring
- Transaction confidence scores
- Comprehensive address information
- Transaction decoding
- Blockchain statistics

**Usage:**
```typescript
import { BlockCypherDogeAPI } from '@/components/currencyCore/blockchainAPIs/DOGE.Dogecoin';

// With API key for higher limits
const api = new BlockCypherDogeAPI({ apiKey: 'YOUR_API_KEY' });

// Get address info
const info = await api.getAddressInfo('D7P2qjEuqVn7tkS9vFVV7Jq3a8Wb6hLDdv');

// Get blockchain info
const chainInfo = await api.getBlockchainInfo();

// Create webhook for address monitoring
const webhook = await api.createWebhook('address', 'https://your-callback.com', 'confirmed-tx');
```

---

### 3. **Blockchair API**
**Status:** ✅ Free Tier Available  
**Rate Limits:** 14,400 requests/day (no API key required)  
**Networks:** Mainnet

**Features:**
- Fast and reliable
- No API key required for basic usage
- Comprehensive transaction details
- Bulk balance queries (multiple addresses)
- Network statistics
- Fee recommendations

**Usage:**
```typescript
import { blockchairDoge } from '@/components/currencyCore/blockchainAPIs/DOGE.Dogecoin';

// Get balance
const balance = await blockchairDoge.getBalance('D7P2qjEuqVn7tkS9vFVV7Jq3a8Wb6hLDdv');

// Get UTXOs
const utxos = await blockchairDoge.getUTXOs('D7P2qjEuqVn7tkS9vFVV7Jq3a8Wb6hLDdv');

// Get multiple addresses balances
const balances = await blockchairDoge.getBalances([
  'D7P2qjEuqVn7tkS9vFVV7Jq3a8Wb6hLDdv',
  'DH5yaieqoZN36fDVciNyRueRGvGLR3mr7L'
]);

// Get network stats
const stats = await blockchairDoge.getNetworkStats();
```

---

### 4. **Tokenview API**
**Status:** ⚠️ Requires API Key  
**Rate Limits:** 100 requests/day (free tier)  
**Networks:** DOGE, DOGE Testnet

**Features:**
- Multi-chain support (70+ blockchains)
- Comprehensive API coverage
- Transaction history with pagination
- Block explorer functionality
- Fee recommendations
- Paid plans available for higher limits

**Usage:**
```typescript
import { TokenviewDogeAPI } from '@/components/currencyCore/blockchainAPIs/DOGE.Dogecoin';

const api = new TokenviewDogeAPI({ apiKey: 'YOUR_API_KEY' });

// Get address info
const info = await api.getAddressInfo('D7P2qjEuqVn7tkS9vFVV7Jq3a8Wb6hLDdv');

// Get UTXOs
const utxos = await api.getUTXOs('D7P2qjEuqVn7tkS9vFVV7Jq3a8Wb6hLDdv');

// Get transaction history with pagination
const history = await api.getTransactionHistory('D7P2qjEuqVn7tkS9vFVV7Jq3a8Wb6hLDdv', 1);
```

---

### 5. **NOWNodes API**
**Status:** ⚠️ Requires API Key  
**Rate Limits:** 5,000 requests/month (free tier)  
**Networks:** Dogecoin, Dogecoin Testnet

**Features:**
- Full node access via Blockbook
- Multi-chain support (60+ blockchains)
- Real blockchain node data
- Comprehensive block explorer features
- High reliability
- Paid plans for unlimited access

**Usage:**
```typescript
import { NOWNodesDogeAPI } from '@/components/currencyCore/blockchainAPIs/DOGE.Dogecoin';

const api = new NOWNodesDogeAPI({ apiKey: 'YOUR_API_KEY' });

// Get address info
const info = await api.getAddressInfo('D7P2qjEuqVn7tkS9vFVV7Jq3a8Wb6hLDdv');

// Get UTXOs
const utxos = await api.getUTXOs('D7P2qjEuqVn7tkS9vFVV7Jq3a8Wb6hLDdv');

// Get blockchain info
const chainInfo = await api.getBlockchainInfo();

// Estimate fee
const fee = await api.estimateFee(2); // for 2 blocks confirmation
```

---

### 6. **DogeClient API**
**Status:** ✅ Free Tier Available  
**Rate Limits:** ~1000 requests/hour  
**Networks:** Mainnet

**Features:**
- Professional Dogecoin infrastructure
- Address balance and transaction history
- Block information
- Network statistics
- Mempool information
- Fee recommendations

**Usage:**
```typescript
import { dogeClient } from '@/components/currencyCore/blockchainAPIs/DOGE.Dogecoin';

// Get balance
const balance = await dogeClient.getBalance('D7P2qjEuqVn7tkS9vFVV7Jq3a8Wb6hLDdv');

// Get transaction history
const history = await dogeClient.getTransactionHistory('D7P2qjEuqVn7tkS9vFVV7Jq3a8Wb6hLDdv', 50);

// Get network stats
const stats = await dogeClient.getNetworkStats();

// Get mempool info
const mempool = await dogeClient.getMempoolInfo();
```

---

### 7. **Electrs-Dogecoin API**
**Status:** ✅ Free (Public Demo Available)  
**Rate Limits:** Moderate rate limits, public demo endpoint  
**Networks:** Mainnet

**Features:**
- Modern, open-source block explorer
- Full history API
- Real-time fee estimates
- UTXO fetching
- Transaction broadcasting
- Mempool monitoring
- No API key required for public demo

**Usage:**
```typescript
import { electrsDoge } from '@/components/currencyCore/blockchainAPIs/DOGE.Dogecoin';

// Get balance
const balance = await electrsDoge.getBalance('D7P2qjEuqVn7tkS9vFVV7Jq3a8Wb6hLDdv');

// Get UTXOs
const utxos = await electrsDoge.getUTXOs('D7P2qjEuqVn7tkS9vFVV7Jq3a8Wb6hLDdv');

// Get fee estimates
const feeEstimates = await electrsDoge.getFeeEstimates();

// Get latest block height
const height = await electrsDoge.getLatestBlockHeight();

// Get recent mempool transactions
const mempoolTxs = await electrsDoge.getMempoolRecent();
```

---

## 📊 API Comparison

| API | Free Tier | Rate Limits | API Key Required | Networks | Special Features |
|-----|-----------|-------------|------------------|----------|------------------|
| **Dogechain.info** | ✅ Yes | Moderate | ❌ No | 2 | Oldest/most established |
| **BlockCypher** | ✅ Yes | 3 req/sec | ⚠️ Optional | 2 | WebHooks, confidence scores |
| **Blockchair** | ✅ Yes | 14.4K/day | ❌ No | 1 | Bulk queries, fast |
| **Tokenview** | ⚠️ Limited | 100/day | ✅ Yes | 70+ chains | Multi-chain support |
| **NOWNodes** | ⚠️ Limited | 5K/month | ✅ Yes | 60+ chains | Full node access |
| **DogeClient** | ✅ Yes | 1K/hour | ⚠️ Optional | 1 | Professional infrastructure |
| **Electrs-DOGE** | ✅ Yes | Moderate | ❌ No | 1 | Open-source, modern |

## 🎯 Recommended Usage Strategy

### For Production (Fallback Chain):

```typescript
import {
  dogechainMainnet,  // Primary: Established, reliable
  blockchairDoge,    // Fallback 1: Fast, high limits
  electrsDoge,       // Fallback 2: Modern, open-source
  dogeClient         // Fallback 3: Professional infrastructure
} from '@/components/currencyCore/blockchainAPIs/DOGE.Dogecoin';

async function getBalanceWithFallback(address: string): Promise<number> {
  const apis = [
    dogechainMainnet,
    blockchairDoge,
    electrsDoge,
    dogeClient
  ];

  for (const api of apis) {
    try {
      const result = await api.getBalance(address);
      return result.balance;
    } catch (error) {
      console.warn(`API ${api.constructor.name} failed, trying next...`);
      continue;
    }
  }

  throw new Error('All Dogecoin APIs failed');
}
```

### For High-Volume Applications:

```typescript
import { BlockchairDogeAPI, NOWNodesDogeAPI } from '@/components/currencyCore/blockchainAPIs/DOGE.Dogecoin';

// Use Blockchair for high-volume (14,400/day free)
const blockchairAPI = new BlockchairDogeAPI('YOUR_API_KEY'); // Optional key for higher limits

// Or NOWNodes for full node access
const nowNodesAPI = new NOWNodesDogeAPI({
  apiKey: process.env.NOWNODES_API_KEY
});
```

### For Development/Testing:

```typescript
import { dogechainTestnet, blockcypherDogeTestnet } from '@/components/currencyCore/blockchainAPIs/DOGE.Dogecoin';

// Use testnet endpoints for development
const balance = await blockcypherDogeTestnet.getBalance('testnetAddress');
const utxos = await dogechainTestnet.getUTXOs('testnetAddress');
```

## 🔒 Security Best Practices

1. **Never expose API keys in client-side code**
   - Use environment variables for API keys
   - Implement server-side proxy if needed

2. **Implement rate limiting**
   - Respect API rate limits
   - Use exponential backoff for retries
   - Implement caching where appropriate

3. **Validate transaction data**
   - Always verify transaction details before broadcasting
   - Use multiple APIs to cross-verify critical data
   - Implement transaction confidence checks

4. **Handle errors gracefully**
   - Implement fallback APIs
   - Log errors for monitoring
   - Provide meaningful error messages to users

## 💰 Dogecoin-Specific Considerations

### Transaction Fees
Dogecoin has relatively low transaction fees compared to Bitcoin:
- Typical fee: 1 DOGE (~100,000,000 shibes) per transaction
- Fee recommendations:
  - Fast: 1000 shibes/byte
  - Medium: 500 shibes/byte
  - Slow: 100 shibes/byte

### Address Formats
Dogecoin uses similar address formats to Bitcoin:
- **P2PKH** (Pay to Public Key Hash): Starts with 'D'
- **P2SH** (Pay to Script Hash): Starts with '9' or 'A'
- Example: `D7P2qjEuqVn7tkS9vFVV7Jq3a8Wb6hLDdv`

### Units
- **1 DOGE** = 100,000,000 shibes (smallest unit)
- Similar to Bitcoin's satoshi system

### Block Time
- Average block time: ~1 minute
- Faster than Bitcoin (~10 minutes)

## 🔄 Migration Notes

If you're switching from one API to another:

1. Most APIs follow similar patterns but have different response formats
2. UTXO structures may vary slightly between APIs
3. Fee estimation methods differ in precision and format
4. Some APIs require shibes (smallest unit), others use DOGE
5. Rate limiting strategies vary significantly
6. Dogecoin's low fees mean fee estimation is less critical than Bitcoin

## 📚 Additional Resources

- [Dogecoin Official Website](https://dogecoin.com/)
- [Dogecoin GitHub](https://github.com/dogecoin/dogecoin)
- [Dogecoin Developer Forum](https://forum.dogecoin.org/)
- [Dogecoin Subreddit](https://www.reddit.com/r/dogecoin/)
- [Dogecoin Wikipedia](https://en.wikipedia.org/wiki/Dogecoin)

## 🐛 Troubleshooting

### Common Issues:

1. **Rate Limit Exceeded**
   - Solution: Implement caching or use multiple APIs with fallback

2. **Transaction Not Found**
   - Solution: Wait for network propagation (~1 minute), check multiple APIs

3. **Invalid Address Format**
   - Solution: Ensure address starts with 'D', '9', or 'A' for mainnet

4. **UTXO Already Spent**
   - Solution: Refresh UTXO list before transaction creation

5. **Broadcast Failed - Fee Too Low**
   - Solution: Use recommended fee rates (minimum 1 DOGE per tx)

6. **Public Demo Endpoint Slow/Unavailable**
   - Solution: Use alternative APIs or self-host Electrs-Dogecoin

## 📝 Contributing

When adding new Dogecoin APIs:

1. Follow the existing pattern for consistency
2. Include TypeScript interfaces for all API responses
3. Implement error handling and logging
4. Add comprehensive JSDoc comments
5. Update this README with API details
6. Test against both mainnet and testnet (where available)
7. Consider Dogecoin's specific characteristics (low fees, fast blocks)

## 🎉 Fun Facts

- Dogecoin was created in 2013 as a "joke" cryptocurrency based on the Doge meme
- It has one of the most active and friendly cryptocurrency communities
- Dogecoin has no maximum supply limit (inflationary model)
- Block reward: 10,000 DOGE per block
- Endorsed by Elon Musk and used for various charitable causes
- Much wow! 🐕

