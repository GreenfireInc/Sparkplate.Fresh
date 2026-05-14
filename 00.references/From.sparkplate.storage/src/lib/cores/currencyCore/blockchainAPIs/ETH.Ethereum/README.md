# Ethereum (ETH) Blockchain APIs

This directory contains implementations for various Ethereum blockchain APIs, providing access to transaction data, balances, smart contracts, and node operations.

## 📋 Overview

Ethereum is an **account-based** blockchain (not UTXO-based like Bitcoin). All APIs in this directory support:
- **Balance Queries**: Check ETH and ERC20 token balances
- **Transaction History**: Retrieve historical transactions
- **Transaction Broadcasting**: Send signed transactions to the network
- **Smart Contract Interaction**: Call and query smart contracts
- **Block Information**: Query blocks by number or hash
- **Gas Estimation**: Get recommended gas prices and estimate gas usage
- **ERC20 Token Operations**: Track token transfers and balances

## 🚀 Implemented APIs (7 of 12)

### 1. **Etherscan API** (Recommended for Explorers)
**Status:** ✅ **IMPLEMENTED**  
**Rate Limits:** 5 calls per second (requires API key)  
**Networks:** Mainnet, Goerli, Sepolia

**Features:**
- Most comprehensive Ethereum block explorer
- Address balance queries (ETH and tokens)
- Transaction history with full details
- Internal transactions tracking
- ERC20 token transfer events
- Smart contract ABI retrieval
- Gas oracle for fee recommendations
- Token supply information
- Transitioning to V2 API by May 31, 2025

**Usage:**
```typescript
import { EtherscanAPI } from '@/components/currencyCore/blockchainAPIs/ETH.Ethereum';

const etherscan = new EtherscanAPI({ apiKey: 'YOUR_API_KEY' }, 'mainnet');

// Get ETH balance
const balance = await etherscan.getBalance('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb');

// Get transaction history
const history = await etherscan.getTransactionHistory('0x742d35Cc...');

// Get ERC20 token transfers
const transfers = await etherscan.getTokenTransfers('0x742d35Cc...');

// Get gas oracle
const gasOracle = await etherscan.getGasOracle();
```

---

### 2. **Infura API** (Recommended for Node Access)
**Status:** ✅ **IMPLEMENTED**  
**Rate Limits:** 100,000 requests/day (free tier)  
**Networks:** Mainnet, Goerli, Sepolia

**Features:**
- Direct Ethereum node access via JSON-RPC
- Operated by Consensys (trusted infrastructure)
- Full RPC method support
- Balance queries
- Transaction broadcasting
- Contract calls (read-only)
- Block information
- Gas price and estimation
- Chain ID and network info

**Usage:**
```typescript
import { InfuraAPI } from '@/components/currencyCore/blockchainAPIs/ETH.Ethereum';

const infura = new InfuraAPI({ apiKey: 'YOUR_PROJECT_ID' }, 'mainnet');

// Get balance
const balance = await infura.getBalance('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb');

// Send transaction
const txHash = await infura.sendRawTransaction('0x...');

// Call contract (read-only)
const result = await infura.call({
  to: '0xContractAddress',
  data: '0x...' // encoded function call
});

// Estimate gas
const gas = await infura.estimateGas({
  from: '0x...',
  to: '0x...',
  data: '0x...'
});
```

---

### 3. **Alchemy API** (Enterprise-grade Infrastructure)
**Status:** ✅ **IMPLEMENTED**  
**Rate Limits:** 300M compute units/month (free tier)  
**Networks:** Mainnet, Goerli, Sepolia, Polygon, Arbitrum, Optimism

**Features:**
- Enhanced APIs beyond standard JSON-RPC
- Asset transfer tracking (all tokens, NFTs)
- Token balance queries
- Token metadata
- NFT ownership queries
- Transaction receipts (batch)
- Multi-chain support
- WebHooks (requires premium)

**Usage:**
```typescript
import { AlchemyAPI } from '@/components/currencyCore/blockchainAPIs/ETH.Ethereum';

const alchemy = new AlchemyAPI({ apiKey: 'YOUR_API_KEY' }, 'mainnet');

// Get asset transfers (enhanced)
const transfers = await alchemy.getAssetTransfers({
  fromAddress: '0x...',
  category: ['external', 'erc20', 'erc721']
});

// Get token balances
const balances = await alchemy.getTokenBalances('0x...');

// Get NFTs for owner
const nfts = await alchemy.getNFTsForOwner('0x...');
```

---

### 4. **Blockscout API** (Open-source Alternative)
**Status:** ✅ **IMPLEMENTED**  
**Rate Limits:** Unlimited (open-source, self-hostable)  
**Networks:** Mainnet, Goerli, Sepolia (+ custom)

**Features:**
- Etherscan-compatible API
- Open-source and self-hostable
- Balance queries
- Transaction history
- ERC20 token transfers
- Smart contract ABIs
- No API key required

**Usage:**
```typescript
import { blockscoutMainnet } from '@/components/currencyCore/blockchainAPIs/ETH.Ethereum';

// Get balance
const balance = await blockscoutMainnet.getBalance('0x...');

// Get transaction history
const history = await blockscoutMainnet.getTransactionHistory('0x...');

// Get contract ABI
const abi = await blockscoutMainnet.getContractABI('0xContractAddress');
```

---

### 5. **Ethplorer API** (ERC20 Token Specialist)
**Status:** ✅ **IMPLEMENTED**  
**Rate Limits:** Limited (freekey available)  
**Networks:** Mainnet

**Features:**
- Specialized in ERC20 token tracking
- Address info with all token balances
- Token information and metadata
- Token history
- Top tokens list
- Price information (where available)

**Usage:**
```typescript
import { ethplorer } from '@/components/currencyCore/blockchainAPIs/ETH.Ethereum';

// Get address info with all tokens
const info = await ethplorer.getAddressInfo('0x...');

// Get token info
const tokenInfo = await ethplorer.getTokenInfo('0xTokenAddress');

// Get address history
const history = await ethplorer.getAddressHistory('0x...', 'transfer', 50);
```

---

### 6. **QuickNode API** (High-performance RPC)
**Status:** ✅ **IMPLEMENTED**  
**Rate Limits:** Trial available, varies by plan  
**Networks:** All major networks (custom endpoint)

**Features:**
- High-performance RPC endpoints
- Standard JSON-RPC methods
- Low latency
- High reliability
- Custom endpoint per project

**Usage:**
```typescript
import { createQuickNode } from '@/components/currencyCore/blockchainAPIs/ETH.Ethereum';

const quicknode = createQuickNode('https://your-endpoint.quiknode.pro/...');

// Standard RPC operations
const balance = await quicknode.getBalance('0x...');
const txHash = await quicknode.sendRawTransaction('0x...');
```

---

### 7. **GetBlock API** (Instant Node Access)
**Status:** ✅ **IMPLEMENTED**  
**Rate Limits:** Free tier available  
**Networks:** Mainnet, Goerli, Sepolia

**Features:**
- Instant access to Ethereum nodes
- Standard JSON-RPC methods
- Multiple network support
- Reliable infrastructure

**Usage:**
```typescript
import { GetBlockAPI } from '@/components/currencyCore/blockchainAPIs/ETH.Ethereum';

const getblock = new GetBlockAPI({ apiKey: 'YOUR_API_KEY' }, 'mainnet');

// Standard RPC operations
const balance = await getblock.getBalance('0x...');
const gasPrice = await getblock.getGasPrice();
```

---

## 📊 API Comparison

| API | Status | Free Tier | API Key Required | Best For |
|-----|--------|-----------|------------------|----------|
| **Etherscan** | ✅ Implemented | 5 calls/sec | ✅ Yes | Block explorer, history, tokens |
| **Infura** | ✅ Implemented | 100K/day | ✅ Yes | Node access, RPC calls |
| **Alchemy** | ✅ Implemented | 300M CU/month | ✅ Yes | Enterprise node, NFTs, enhanced APIs |
| **Blockscout** | ✅ Implemented | Unlimited | ❌ No | Open-source, self-hosted |
| **Ethplorer** | ✅ Implemented | Limited | 🟡 Optional | ERC20 token tracking |
| **QuickNode** | ✅ Implemented | Trial | ✅ Yes | High-performance RPC |
| **GetBlock** | ✅ Implemented | Free tier | ✅ Yes | Instant node access |
| **Beaconcha.in** | 📋 Future | Free | ❌ No | Ethereum 2.0 beacon chain |
| **Blockchain.com** | 📋 Future | Limited | 🟡 Optional | Multi-chain explorer |
| **Tokenview** | 📋 Future | Limited | ✅ Yes | Multi-chain support |
| **BlockCypher** | 📋 Future | 200/hour | 🟡 Optional | Unified blockchain API |
| **Blockchair** | 📋 Future | 1K/day | ❌ No | Analytics platform |

## 🎯 Recommended Usage Strategy

### For Block Explorer Features (History, Tokens, etc.):

```typescript
import { EtherscanAPI } from '@/components/currencyCore/blockchainAPIs/ETH.Ethereum';

const etherscan = new EtherscanAPI({ apiKey: process.env.ETHERSCAN_API_KEY }, 'mainnet');

// Get comprehensive address history
const transactions = await etherscan.getTransactionHistory('0x...');
const tokenTransfers = await etherscan.getTokenTransfers('0x...');
const internalTxs = await etherscan.getInternalTransactions('0x...');
```

### For Node Access & Transaction Broadcasting:

```typescript
import { InfuraAPI } from '@/components/currencyCore/blockchainAPIs/ETH.Ethereum';

const infura = new InfuraAPI({ 
  apiKey: process.env.INFURA_PROJECT_ID,
  apiSecret: process.env.INFURA_PROJECT_SECRET // optional
}, 'mainnet');

// Direct RPC access
const balance = await infura.getBalance('0x...');
const gasPrice = await infura.getGasPrice();
const txHash = await infura.sendRawTransaction('0x...');
```

### With Fallback Strategy:

```typescript
import { EtherscanAPI, InfuraAPI } from '@/components/currencyCore/blockchainAPIs/ETH.Ethereum';

async function getBalanceWithFallback(address: string): Promise<bigint> {
  // Try Infura first (faster for simple queries)
  try {
    const infura = new InfuraAPI({ apiKey: process.env.INFURA_KEY }, 'mainnet');
    const result = await infura.getBalance(address);
    return result.balance;
  } catch (error) {
    console.warn('Infura failed, trying Etherscan...');
  }
  
  // Fallback to Etherscan
  const etherscan = new EtherscanAPI({ apiKey: process.env.ETHERSCAN_KEY }, 'mainnet');
  const result = await etherscan.getBalance(address);
  return result.balance;
}
```

## 🔒 Security Best Practices

1. **Never expose API keys in client-side code**
   - Use environment variables
   - Implement server-side proxy
   - Rotate keys regularly

2. **Handle rate limiting**
   - Implement exponential backoff
   - Cache responses when appropriate
   - Use multiple API providers for redundancy

3. **Validate addresses**
   - Use EIP-55 checksum validation
   - Handle both uppercase and lowercase addresses
   - Verify address format before API calls

4. **Handle BigInt values correctly**
   - Ethereum uses very large numbers (wei)
   - Use BigInt for precision
   - Convert to number only when necessary

5. **Verify transaction data**
   - Always verify recipient address
   - Check gas limits and prices
   - Validate contract interactions

## 💰 Ethereum-Specific Considerations

### Address Format & Checksums
Ethereum uses EIP-55 checksummed addresses:
- Addresses are 40 hex characters (20 bytes)
- Prefixed with `0x`
- Checksum uses capitalization for validation
- Example: `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`

**Checksum Algorithm:**
1. Lowercase address and remove `0x` prefix
2. Keccak-256 hash the lowercased string
3. For each character in address:
   - If hash digit is 0-7: lowercase
   - If hash digit is 8-f: uppercase

### Units
- **1 ETH** = 1,000,000,000,000,000,000 wei (10^18)
- **1 Gwei** = 1,000,000,000 wei (10^9)
- Common units: wei, kwei, mwei, gwei, szabo, finney, ether

### Gas & Fees
- **Gas**: Computational steps required for transaction
- **Gas Price**: Wei per gas unit (in Gwei)
- **Gas Limit**: Maximum gas for transaction
- **Total Fee**: gas used × gas price
- **EIP-1559**: Base fee + priority fee (tip)

### Transaction Types
- **Type 0**: Legacy transactions (pre-EIP-2718)
- **Type 1**: EIP-2930 (optional access lists)
- **Type 2**: EIP-1559 (base fee + priority fee)

### Block Time
- Average: ~12 seconds
- Varies based on network conditions
- Post-Merge (Proof of Stake): more consistent

## 🔄 Migration Notes

### From Web3.js/Ethers.js
Most methods are similar, but responses are in raw format:
- Numbers are hex strings (convert with parseInt/BigInt)
- Addresses are checksummed
- Block tags: 'latest', 'earliest', 'pending', or block number

### API Selection Guide
- **Etherscan**: Best for historical data, token tracking, contract ABIs
- **Infura**: Best for real-time data, broadcasting, contract calls
- **Alchemy**: Best for enhanced APIs, webhooks, analytics (when implemented)
- **Blockscout**: Best for self-hosted, privacy-focused solutions (when implemented)

## 📚 Additional Resources

- [Ethereum Official Documentation](https://ethereum.org/en/developers/docs/)
- [Ethereum JSON-RPC Specification](https://ethereum.github.io/execution-apis/api-documentation/)
- [EIP-55: Mixed-case checksum address encoding](https://eips.ethereum.org/EIPS/eip-55)
- [EIP-1559: Fee market change](https://eips.ethereum.org/EIPS/eip-1559)
- [Etherscan API Documentation](https://docs.etherscan.io/)
- [Infura Documentation](https://docs.infura.io/)
- [Web3.js Documentation](https://web3js.readthedocs.io/)
- [Ethers.js Documentation](https://docs.ethers.org/)

## 🐛 Troubleshooting

### Common Issues:

1. **"Invalid Address" Error**
   - Solution: Ensure address is checksummed or all lowercase
   - Verify address starts with `0x`

2. **"Insufficient Funds" on Transaction**
   - Solution: Check balance includes gas fees
   - Ensure account has enough ETH for gas

3. **"Nonce Too Low" Error**
   - Solution: Get latest nonce with `getTransactionCount`
   - Wait for pending transactions to complete

4. **Rate Limit Exceeded**
   - Solution: Implement rate limiting/queuing
   - Use multiple API keys or providers

5. **"Gas Estimation Failed"**
   - Solution: Contract call may revert
   - Manually set gas limit higher

6. **"Transaction Underpriced"**
   - Solution: Increase gas price
   - Use gas oracle for current prices

## 📝 Future Enhancements

Planned implementations:
1. **Alchemy API** - Enhanced node infrastructure with webhooks
2. **Blockscout API** - Open-source, self-hostable alternative
3. **Ethplorer API** - Specialized ERC20 token analytics
4. **Beaconcha.in API** - Ethereum 2.0 beacon chain data
5. **QuickNode API** - High-performance RPC endpoints
6. **GetBlock API** - Additional node provider option
7. **WebSocket support** - Real-time event subscriptions
8. **ENS resolution** - Ethereum Name Service integration

## 🎉 Contributing

When adding new Ethereum APIs:
1. Follow the existing RPC pattern for node providers
2. Use BigInt for wei values
3. Include proper TypeScript interfaces
4. Add comprehensive JSDoc comments
5. Implement error handling
6. Update this README
7. Test against mainnet and testnets
8. Consider EIP-1559 transaction types

---

**Status:** 2 of 12 APIs implemented  
**Last Updated:** October 12, 2025  
**Build Status:** ✅ Passing

