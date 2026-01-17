**# Ethereum Classic (ETC) Blockchain APIs

This directory contains 6 different blockchain API implementations for interacting with the Ethereum Classic network.

## Overview

Ethereum Classic is the original Ethereum blockchain that emerged after the DAO fork in 2016. It's fully EVM-compatible and shares many technical characteristics with Ethereum:

- **EVM-Compatible**: Runs Ethereum smart contracts
- **Address Format**: Same as Ethereum (0x... format)
- **Smallest Unit**: Wei (1 ETC = 10^18 Wei)
- **Consensus**: Proof of Work (Ethash algorithm)

## 🚀 Implemented APIs (6 of 10)

### 1. **Blockscout API** (Recommended - Official Explorer)
**Status:** ✅ **IMPLEMENTED**  
**Rate Limits:** Free and open-source  
**Website:** https://etc.blockscout.com/

**Features:**
- Official Ethereum Classic explorer
- Etherscan-compatible API
- Balance queries
- Transaction history
- ERC20 token transfers
- Internal transactions
- Smart contract ABIs
- No API key required

**Usage:**
```typescript
import { blockscoutETC } from '@/components/currencyCore/blockchainAPIs/ETC.EthereumClassic';

// Get balance
const balance = await blockscoutETC.getBalance('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb');

// Get transaction history
const history = await blockscoutETC.getTransactionHistory('0x742d35Cc...', 0, 99999999, 1, 100);

// Get token transfers
const transfers = await blockscoutETC.getTokenTransfers('0x742d35Cc...');

// Get contract ABI
const abi = await blockscoutETC.getContractABI('0xContractAddress...');
```

---

### 2. **BlockCypher API** (Comprehensive with Webhooks)
**Status:** ✅ **IMPLEMENTED**  
**Rate Limits:** 3 requests/second (no API key), higher with key  
**Website:** https://live.blockcypher.com/etc/

**Features:**
- Comprehensive blockchain API
- Address information with transaction counts
- Transaction details
- Broadcast transactions
- Chain statistics
- Webhook support (with API key)
- Fee estimates

**Usage:**
```typescript
import { blockcypherETC, createBlockCypherETC } from '@/components/currencyCore/blockchainAPIs/ETC.EthereumClassic';

// No API key (3 req/sec)
const balance = await blockcypherETC.getBalance('0x742d35Cc...');

// With API key (higher limits)
const blockcypher = createBlockCypherETC('YOUR_API_KEY');
const addressInfo = await blockcypher.getAddressInfo('0x742d35Cc...');
const chainInfo = await blockcypher.getChainInfo();
```

---

### 3. **Blockchair API** (Analytics Platform)
**Status:** ✅ **IMPLEMENTED**  
**Rate Limits:** 1,000 requests/day (no API key), higher with key  
**Website:** https://blockchair.com/ethereum-classic

**Features:**
- Multi-chain analytics platform
- Detailed address information
- Transaction history
- Network statistics
- Broadcast transactions
- USD value tracking

**Usage:**
```typescript
import { blockchairETC, createBlockchairETC } from '@/components/currencyCore/blockchainAPIs/ETC.EthereumClassic';

// No API key (1k/day)
const balance = await blockchairETC.getBalance('0x742d35Cc...');
const addressInfo = await blockchairETC.getAddressInfo('0x742d35Cc...');

// With API key (higher limits)
const blockchair = createBlockchairETC('YOUR_API_KEY');
const history = await blockchair.getTransactionHistory('0x742d35Cc...', 100, 0);
const stats = await blockchair.getNetworkStats();
```

---

### 4. **GetBlock API** (RPC Node Access)
**Status:** ✅ **IMPLEMENTED**  
**Rate Limits:** Free tier available  
**Website:** https://getblock.io/nodes/etc/

**Features:**
- Instant RPC node access
- Standard JSON-RPC methods
- Balance queries
- Transaction broadcasting
- Contract calls
- Gas estimation
- Requires API key

**Usage:**
```typescript
import { createGetBlockETC } from '@/components/currencyCore/blockchainAPIs/ETC.EthereumClassic';

const getblock = createGetBlockETC('YOUR_API_KEY');

// Get balance
const balance = await getblock.getBalance('0x742d35Cc...');

// Get gas price
const gasPrice = await getblock.getGasPrice();

// Estimate gas
const gas = await getblock.estimateGas({
  from: '0x...',
  to: '0x...',
  value: '0x...'
});

// Broadcast transaction
const txHash = await getblock.sendRawTransaction('0xSignedTx...');
```

---

### 5. **NOWNodes API** (Full Node Access)
**Status:** ✅ **IMPLEMENTED**  
**Rate Limits:** Free API key (5,000 requests/month)  
**Website:** https://nownodes.io/nodes/etc

**Features:**
- Full node access
- Standard JSON-RPC methods
- Balance and transaction queries
- Block information
- Gas estimation
- Transaction receipts
- Requires API key

**Usage:**
```typescript
import { createNOWNodesETC } from '@/components/currencyCore/blockchainAPIs/ETC.EthereumClassic';

const nownodes = createNOWNodesETC('YOUR_API_KEY');

// Get balance
const balance = await nownodes.getBalance('0x742d35Cc...');

// Get transaction
const tx = await nownodes.getTransaction('0xTxHash...');

// Get receipt
const receipt = await nownodes.getTransactionReceipt('0xTxHash...');

// Get block
const block = await nownodes.getBlockByNumber(12345678);
```

---

### 6. **Tokenview API** (Multi-chain Explorer)
**Status:** ✅ **IMPLEMENTED**  
**Rate Limits:** Free tier (100 requests/day with API key)  
**Website:** https://etc.tokenview.io/

**Features:**
- Multi-chain explorer with ETC support
- Account balances
- Transaction history
- Latest block info
- Transaction details
- Requires API key

**Usage:**
```typescript
import { createTokenviewETC } from '@/components/currencyCore/blockchainAPIs/ETC.EthereumClassic';

const tokenview = createTokenviewETC('YOUR_API_KEY');

// Get balance
const balance = await tokenview.getBalance('0x742d35Cc...');

// Get transaction history
const history = await tokenview.getTransactionHistory('0x742d35Cc...', 1);

// Get latest block
const latestBlock = await tokenview.getLatestBlock();
```

---

## 📊 API Comparison

| API | Status | Free Tier | API Key | Best For | Special Features |
|-----|--------|-----------|---------|----------|------------------|
| **Blockscout** | ✅ | Unlimited | ❌ No | Official explorer, comprehensive | Etherscan-compatible, open-source |
| **BlockCypher** | ✅ | 3 req/sec | 🟡 Optional | Comprehensive API | Webhooks, fee estimates |
| **Blockchair** | ✅ | 1K/day | 🟡 Optional | Analytics | USD tracking, network stats |
| **GetBlock** | ✅ | Free tier | ✅ Yes | RPC access | Instant node access |
| **NOWNodes** | ✅ | 5K/month | ✅ Yes | Full node | RPC methods |
| **Tokenview** | ✅ | 100/day | ✅ Yes | Multi-chain | Chain-agnostic API |

**Legend:**
- ✅ Yes: API key required
- 🟡 Optional: Works without key, better with key
- ❌ No: No key needed

**Future Enhancements (Noted but not implemented):**
- **Expedition Explorer** - Self-hostable, open-source
- **BlockExplorer.one** - Multi-chain support
- **CryptoAPIs** - Unified blockchain API
- **Trezor ETC Explorer** - Wallet-focused, Blockbook-based

---

## 🎯 Recommended Usage Strategy

### For General Queries (No API Key):
```typescript
import { blockscoutETC, blockcypherETC, blockchairETC } from '@/components/currencyCore/blockchainAPIs/ETC.EthereumClassic';

// Blockscout for most queries (unlimited, official)
const balance = await blockscoutETC.getBalance('0x742d35Cc...');
const history = await blockscoutETC.getTransactionHistory('0x742d35Cc...');

// BlockCypher for quick lookups (3 req/sec)
const addressInfo = await blockcypherETC.getAddressInfo('0x742d35Cc...');

// Blockchair for analytics (1k/day)
const stats = await blockchairETC.getNetworkStats();
```

### For Production (With API Keys):
```typescript
import { createGetBlockETC, createNOWNodesETC, createBlockCypherETC } from '@/components/currencyCore/blockchainAPIs/ETC.EthereumClassic';

// GetBlock for RPC access
const getblock = createGetBlockETC(process.env.GETBLOCK_KEY!);
const balance = await getblock.getBalance('0x742d35Cc...');

// NOWNodes for full node features
const nownodes = createNOWNodesETC(process.env.NOWNODES_KEY!);
const receipt = await nownodes.getTransactionReceipt('0xTxHash...');

// BlockCypher for webhooks and comprehensive data
const blockcypher = createBlockCypherETC(process.env.BLOCKCYPHER_KEY!);
const chainInfo = await blockcypher.getChainInfo();
```

### Fallback Strategy:
```typescript
async function getBalanceWithFallback(address: string) {
  // Try Blockscout first (unlimited, free)
  try {
    return await blockscoutETC.getBalance(address);
  } catch (error) {
    console.warn('Blockscout failed, trying BlockCypher...', error);
    
    try {
      return await blockcypherETC.getBalance(address);
    } catch (error2) {
      console.warn('BlockCypher failed, trying Blockchair...', error2);
      
      // Final fallback
      return await blockchairETC.getBalance(address);
    }
  }
}
```

---

## 💡 Key Concepts

### EVM Compatibility:
Ethereum Classic is fully EVM-compatible, meaning:
- Same address format as Ethereum (0x...)
- Same smart contract bytecode
- Same RPC methods
- Can use Ethereum tooling (MetaMask, Web3.js, ethers.js)

### Wei Conversion:
```typescript
// Convert Wei to ETC
const balanceETC = Number(balanceWei) / 1e18;

// Convert ETC to Wei
const balanceWei = BigInt(Math.round(balanceETC * 1e18));
```

### Gas and Fees:
```typescript
// Gas price in Wei (or Gwei)
const gasPriceWei = await api.getGasPrice();
const gasPriceGwei = Number(gasPriceWei) / 1e9;

// Estimate gas for transaction
const gasLimit = await api.estimateGas({
  from: '0x...',
  to: '0x...',
  value: '0x...'
});

// Calculate total fee
const totalFee = gasPriceWei * gasLimit;
```

---

## 🚀 Quick Start

```typescript
// 1. Import the API you want to use
import { blockscoutETC } from '@/components/currencyCore/blockchainAPIs/ETC.EthereumClassic';

// 2. Get balance (no API key needed)
const balance = await blockscoutETC.getBalance('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb');
console.log(`Balance: ${balance.balanceETC} ETC`);

// 3. Get transaction history
const history = await blockscoutETC.getTransactionHistory(
  '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  0,
  99999999,
  1,
  100
);
console.log(`Found ${history.transactions.length} transactions`);

// 4. Get latest block number
const chainInfo = await blockcypherETC.getChainInfo();
console.log(`Latest block: #${chainInfo.height}`);
```

---

## 📚 Additional Resources

- [Ethereum Classic Official Site](https://ethereumclassic.org/)
- [Ethereum Classic GitHub](https://github.com/ethereumclassic)
- [ETC Cooperative](https://etccooperative.org/)
- [Blockscout Explorer](https://etc.blockscout.com/)
- [ETC vs ETH Differences](https://ethereumclassic.org/why-classic)

---

**Note:** All APIs use the same address format as Ethereum. ETC addresses start with `0x` followed by 40 hexadecimal characters.

