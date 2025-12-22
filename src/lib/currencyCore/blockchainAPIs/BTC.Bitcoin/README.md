# Bitcoin (BTC) Blockchain APIs

This directory contains implementations for various Bitcoin blockchain APIs, providing access to transaction data, UTXOs, balances, and broadcasting capabilities.

## 📋 Overview

Bitcoin is a **UTXO-based** blockchain (not account-based like Ethereum). All APIs in this directory support:
- **UTXO Fetching**: Get unspent transaction outputs for addresses
- **Balance Queries**: Check address balances
- **Transaction History**: Retrieve historical transactions
- **Transaction Broadcasting**: Broadcast signed transactions to the network
- **Block Information**: Query blocks by height or hash
- **Fee Estimation**: Get recommended transaction fees

## 🚀 Available APIs

### 1. **Blockstream API** (Recommended)
**Status:** ✅ Free, Open Source, Tracking-Free  
**Rate Limits:** Generous rate limits, no API key required  
**Networks:** Mainnet, Testnet, Liquid

**Features:**
- Privacy-focused (no tracking)
- WebSocket support for real-time updates
- High reliability and uptime
- Open-source backend (Blockstream Electrs)
- Supports SegWit and Taproot

**Usage:**
```typescript
import { blockstreamMainnet } from '@/components/currencyCore/blockchainAPIs/BTC.Bitcoin';

// Get address balance
const balance = await blockstreamMainnet.getBalance('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');

// Get UTXOs
const utxos = await blockstreamMainnet.getUTXOs('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');

// Broadcast transaction
const txid = await blockstreamMainnet.broadcastTransaction('01000000...');
```

---

### 2. **Blockchain.com API**
**Status:** ✅ Free Tier Available  
**Rate Limits:** Moderate rate limits, no API key for basic endpoints  
**Networks:** Mainnet, Testnet

**Features:**
- Trusted provider (oldest Bitcoin API)
- Extensive documentation
- Multi-address balance queries
- Transaction fee recommendations
- WebSocket support for real-time data

**Usage:**
```typescript
import { blockchainCom } from '@/components/currencyCore/blockchainAPIs/BTC.Bitcoin';

// Get address info
const info = await blockchainCom.getAddressInfo('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');

// Get UTXOs
const utxos = await blockchainCom.getUTXOs('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');

// Get multi-address balance
const balances = await blockchainCom.getMultiAddressBalance([
  '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
  '1dice8EMZmqKvrGE4Qc9bUFf9PX3xaYDp'
]);
```

---

### 3. **BlockCypher API**
**Status:** ✅ Free Tier Available  
**Rate Limits:** 3 req/sec (non-registered), 200 req/hour  
**Networks:** Mainnet, Testnet

**Features:**
- Unified blockchain API
- WebHooks for address monitoring
- Transaction confidence scores
- Address generation for testing
- Advanced transaction building
- Microservices support

**Usage:**
```typescript
import { BlockCypherAPI } from '@/components/currencyCore/blockchainAPIs/BTC.Bitcoin';

// With API key for higher limits
const api = new BlockCypherAPI({ apiKey: 'YOUR_API_KEY' });

// Get address info
const info = await api.getAddressInfo('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');

// Get blockchain info
const chainInfo = await api.getBlockchainInfo();

// Decode raw transaction
const decoded = await api.decodeTransaction('01000000...');
```

---

### 4. **Bitaps API**
**Status:** ✅ Free (No API Key Required)  
**Rate Limits:** Reasonable rate limits apply  
**Networks:** Bitcoin, Testnet

**Features:**
- Modern RESTful API
- No API key required
- Clean JSON responses
- Transaction decoding
- Fee recommendations
- Comprehensive transaction details

**Usage:**
```typescript
import { bitapsMainnet } from '@/components/currencyCore/blockchainAPIs/BTC.Bitcoin';

// Get balance
const balance = await bitapsMainnet.getBalance('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');

// Get UTXOs
const utxos = await bitapsMainnet.getUTXOs('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');

// Get recommended fees
const fees = await bitapsMainnet.getRecommendedFees();

// Get blockchain info
const info = await bitapsMainnet.getBlockchainInfo();
```

---

### 5. **Tokenview API**
**Status:** ⚠️ Requires API Key  
**Rate Limits:** 100 requests/day (free tier)  
**Networks:** BTC, BTC Testnet

**Features:**
- Multi-chain support (70+ blockchains)
- Comprehensive API coverage
- Transaction history with pagination
- Block explorer functionality
- Paid plans available for higher limits

**Usage:**
```typescript
import { TokenviewAPI } from '@/components/currencyCore/blockchainAPIs/BTC.Bitcoin';

const api = new TokenviewAPI({ apiKey: 'YOUR_API_KEY' });

// Get address info
const info = await api.getAddressInfo('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');

// Get UTXOs
const utxos = await api.getUTXOs('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');

// Get transaction history with pagination
const history = await api.getTransactionHistory('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', 1, 20);
```

---

### 6. **NOWNodes API**
**Status:** ⚠️ Requires API Key  
**Rate Limits:** 5,000 requests/month (free tier)  
**Networks:** Bitcoin, Bitcoin Testnet

**Features:**
- Full node access via Blockbook
- Multi-chain support (60+ blockchains)
- Real blockchain node data
- Comprehensive block explorer features
- High reliability
- Paid plans for unlimited access

**Usage:**
```typescript
import { NOWNodesAPI } from '@/components/currencyCore/blockchainAPIs/BTC.Bitcoin';

const api = new NOWNodesAPI({ apiKey: 'YOUR_API_KEY' });

// Get address info
const info = await api.getAddressInfo('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');

// Get UTXOs
const utxos = await api.getUTXOs('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');

// Get blockchain info
const chainInfo = await api.getBlockchainInfo();

// Estimate fee
const fee = await api.estimateFee(2); // for 2 blocks confirmation
```

---

### 7. **Blast API**
**Status:** ⚠️ Requires API Key  
**Rate Limits:** 12M requests/month (free tier)  
**Networks:** Mainnet, Testnet

**Features:**
- High-performance infrastructure
- Full Bitcoin Core RPC access
- WebSocket support
- Enterprise-grade reliability
- Project-based organization
- Very generous free tier

**Usage:**
```typescript
import { BlastAPI } from '@/components/currencyCore/blockchainAPIs/BTC.Bitcoin';

const api = new BlastAPI({ apiKey: 'YOUR_API_KEY', projectId: 'YOUR_PROJECT_ID' });

// Get blockchain info
const info = await api.getBlockchainInfo();

// Get transaction
const tx = await api.getTransaction('txid', true);

// Get block by height
const block = await api.getBlockByHeight(700000);

// Estimate smart fee
const fee = await api.estimateSmartFee(6);

// Test mempool accept (validate without broadcasting)
const validation = await api.testMempoolAccept('01000000...');
```

---

### 8. **SoChain API**
**Status:** ✅ Free (No API Key Required)  
**Rate Limits:** 300 requests/minute  
**Networks:** BTC, BTCTEST

**Features:**
- Simple and reliable
- No API key required
- Clean API responses
- Address validation
- Network statistics
- High rate limits

**Usage:**
```typescript
import { sochainMainnet } from '@/components/currencyCore/blockchainAPIs/BTC.Bitcoin';

// Get balance
const balance = await sochainMainnet.getBalance('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');

// Get UTXOs
const utxos = await sochainMainnet.getUTXOs('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');

// Validate address
const isValid = await sochainMainnet.isAddressValid('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');

// Get network info
const networkInfo = await sochainMainnet.getNetworkInfo();
```

---

## 📊 API Comparison

| API | Free Tier | Rate Limits | API Key Required | Networks | Special Features |
|-----|-----------|-------------|------------------|----------|------------------|
| **Blockstream** | ✅ Yes | Generous | ❌ No | 3 | Privacy-focused, WebSockets |
| **Blockchain.com** | ✅ Yes | Moderate | ❌ No | 2 | Oldest/trusted, multi-address |
| **BlockCypher** | ✅ Yes | 3 req/sec | ⚠️ Optional | 2 | WebHooks, confidence scores |
| **Bitaps** | ✅ Yes | Moderate | ❌ No | 2 | Modern, clean responses |
| **Tokenview** | ⚠️ Limited | 100/day | ✅ Yes | 70+ chains | Multi-chain support |
| **NOWNodes** | ⚠️ Limited | 5K/month | ✅ Yes | 60+ chains | Full node access |
| **Blast** | ✅ Generous | 12M/month | ✅ Yes | 2 | Enterprise-grade, RPC access |
| **SoChain** | ✅ Yes | 300/min | ❌ No | 2 | Simple, reliable |

## 🎯 Recommended Usage Strategy

### For Production (Fallback Chain):

```typescript
import {
  blockstreamMainnet,
  blockchainCom,
  bitapsMainnet,
  sochainMainnet
} from '@/components/currencyCore/blockchainAPIs/BTC.Bitcoin';

async function getBalanceWithFallback(address: string): Promise<number> {
  const apis = [
    blockstreamMainnet,  // Primary: Free, privacy-focused
    blockchainCom,       // Fallback 1: Trusted, reliable
    bitapsMainnet,       // Fallback 2: Modern, no key required
    sochainMainnet       // Fallback 3: High rate limits
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

  throw new Error('All Bitcoin APIs failed');
}
```

### For High-Volume Applications:

```typescript
import { BlastAPI, NOWNodesAPI } from '@/components/currencyCore/blockchainAPIs/BTC.Bitcoin';

// Use Blast API for high-volume applications
const blastAPI = new BlastAPI({
  apiKey: process.env.BLAST_API_KEY,
  projectId: process.env.BLAST_PROJECT_ID
});

// Or NOWNodes for full node access
const nowNodesAPI = new NOWNodesAPI({
  apiKey: process.env.NOWNODES_API_KEY
});
```

### For Development/Testing:

```typescript
import { blockcypherTestnet, sochainTestnet } from '@/components/currencyCore/blockchainAPIs/BTC.Bitcoin';

// Use testnet endpoints for development
const balance = await blockcypherTestnet.getBalance('testnetAddress');
const utxos = await sochainTestnet.getUTXOs('testnetAddress');
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

## 🔄 Migration Notes

If you're switching from one API to another:

1. Most APIs follow similar patterns but have different response formats
2. UTXO structures may vary slightly between APIs
3. Fee estimation methods differ in precision and format
4. Some APIs require satoshi values, others use BTC
5. Rate limiting strategies vary significantly

## 📚 Additional Resources

- [Bitcoin Developer Documentation](https://developer.bitcoin.org/)
- [BIP Standards](https://github.com/bitcoin/bips)
- [Bitcoin Core RPC Documentation](https://bitcoincore.org/en/doc/)
- [Blockstream Electrs](https://github.com/Blockstream/electrs)

## 🐛 Troubleshooting

### Common Issues:

1. **Rate Limit Exceeded**
   - Solution: Implement caching or use multiple APIs with fallback

2. **Transaction Not Found**
   - Solution: Wait for network propagation, check multiple APIs

3. **Invalid Address Format**
   - Solution: Ensure proper address validation for different formats (P2PKH, P2SH, P2WPKH, P2TR)

4. **UTXO Already Spent**
   - Solution: Refresh UTXO list before transaction creation

5. **Broadcast Failed**
   - Solution: Verify transaction validity with `decodeTransaction` or `testMempoolAccept`

## 📝 Contributing

When adding new Bitcoin APIs:

1. Follow the existing pattern for consistency
2. Include TypeScript interfaces for all API responses
3. Implement error handling and logging
4. Add comprehensive JSDoc comments
5. Update this README with API details
6. Test against both mainnet and testnet

