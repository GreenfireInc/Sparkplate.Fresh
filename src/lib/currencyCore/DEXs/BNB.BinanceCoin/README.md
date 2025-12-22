# BNB.BinanceCoin DEXs Directory

This directory contains comprehensive information about decentralized exchanges (DEXs) on BNB Smart Chain (BSC), the EVM-compatible blockchain in the Binance ecosystem.

## 📁 Structure

```
BNB.BinanceCoin/
├── pancakeSwap.ts      # Leading DEX on BSC
├── biswap.ts           # Low-fee multi-type DEX
├── apeSwap.ts          # Multi-chain DeFi hub
├── thena.ts            # ve(3,3) liquidity layer
├── uniswapV3.ts        # Concentrated liquidity AMM
├── babySwap.ts         # Community DEX with NFTs
├── dodo.ts             # Proactive Market Maker
├── index.ts            # Exports and metadata
└── README.md           # This file
```

## 🔍 Supported DEXs (7 entries)

### 1. **PancakeSwap** - Leading BSC DEX
- **Type:** AMM DEX
- **Description:** Largest DEX on BNB Chain with $6.09B volume (35.1% chain dominance)
- **SDK:** @pancakeswap/sdk (TypeScript), forked from Uniswap V2
- **Subgraph:** The Graph (V2 and V3), SubQuery available
- **Features:** V2/V3, farms, pools, lottery, NFTs, perpetuals, multi-chain
- **Chains:** BSC, Ethereum, Arbitrum, zkSync, more

### 2. **Biswap** - Low-Fee DEX
- **Type:** AMM DEX with V3
- **Description:** Multi-type pools with low fees and referral system
- **SDK:** None (use ethers.js/web3.js)
- **Data:** Bitquery API, DIA Oracle
- **Features:** V3, lottery, launchpad, NFT marketplace, multi-chain
- **Token:** BSW for governance and rewards

### 3. **ApeSwap** - Multi-Chain DeFi Hub
- **Type:** Multi-Chain AMM
- **Description:** Community-driven DEX with comprehensive DeFi suite
- **SDK:** None (standard EVM libraries)
- **Features:** Swaps, farms, pools, lending, IAO launchpad, NFTs, bonds
- **Chains:** BSC, Polygon, Ethereum, Arbitrum, Telos
- **Token:** BANANA for rewards and governance

### 4. **THENA** - Next-Gen Liquidity Layer
- **Type:** ve(3,3) AMM
- **Description:** Solidly-inspired DEX with vote-escrowed tokenomics
- **SDK:** None (use ethers.js/web3.js)
- **Features:** Stable/volatile pools, gauge voting, bribes, NFT positions
- **Mechanism:** ve(3,3) model with THE/veTHE tokens
- **Unique:** Capital efficient for correlated pairs

### 5. **Uniswap V3** - Concentrated Liquidity
- **Type:** Concentrated Liquidity AMM
- **Description:** Uniswap V3 deployment on BSC with capital-efficient LPs
- **SDK:** @uniswap/v3-sdk, @uniswap/smart-order-router
- **Features:** Concentrated liquidity, multiple fees (0.01%-1%), NFT positions
- **Chains:** Multi-chain (20+ networks)
- **Documentation:** Extensive official docs and SDK

### 6. **BabySwap** - Community DEX
- **Type:** AMM DEX
- **Description:** Community-driven with integrated NFT marketplace
- **SDK:** None (standard EVM tools)
- **Features:** Swaps, farms, pools, NFT marketplace, NFT staking
- **Token:** BABY for governance and rewards

### 7. **DODO** - Proactive Market Maker
- **Type:** PMM DEX
- **Description:** Unique PMM algorithm for capital efficiency
- **SDK:** Available (check documentation)
- **Subgraph:** The Graph (multiple chains)
- **Features:** PMM algorithm, single-sided LP, crowdpooling, custom pools
- **Chains:** BSC, Ethereum, Polygon, Arbitrum, Optimism, more
- **Unique:** Better capital efficiency than constant product AMMs

## 🚀 Usage

### Import Specific DEX

```typescript
import { pancakeSwapDEX } from '@/components/currencyCore/DEXs/BNB.BinanceCoin/pancakeSwap';

console.log(pancakeSwapDEX.name); // "PancakeSwap"
console.log(pancakeSwapDEX.contracts.mainnet.routerV2); // Router address
```

### Import All BNB DEXs

```typescript
import { bnbDEXs } from '@/components/currencyCore/DEXs/BNB.BinanceCoin';

// Lazy load specific DEX
const pancakeModule = await bnbDEXs.pancakeSwap();
```

### Query by Type

```typescript
import { bnbDexMetadata } from '@/components/currencyCore/DEXs/BNB.BinanceCoin';

// Get all AMM DEXs
const ammDexs = bnbDexMetadata.byType.amm;
// ['pancakeSwap', 'biswap', 'apeSwap', 'babySwap']

// Get DEXs with official TypeScript SDKs
const tsSDKs = bnbDexMetadata.withSDK.typescript;
// ['pancakeSwap', 'uniswapV3', 'dodo']

// Get DEXs with subgraph support
const subgraphDexs = bnbDexMetadata.byFeature.subgraph;
// ['pancakeSwap', 'dodo']
```

## 📊 Integration Guide

### Common Pattern: Using Ethers.js

All BNB Chain DEXs are EVM-compatible and can be queried using `ethers.js` or `web3.js`:

```typescript
import { ethers } from 'ethers';

// Connect to BSC
const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');

// Query any DEX router
const ROUTER_ABI = [
  'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)'
];

const router = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, provider);

// Get swap quote
const amounts = await router.getAmountsOut(
  ethers.utils.parseEther('1'),
  [TOKEN_IN, TOKEN_OUT]
);

const outputAmount = ethers.utils.formatEther(amounts[1]);
```

### Pricing Data Approaches

1. **Direct Router Queries** - Query DEX router for instant quotes
2. **The Graph Subgraphs** - Historical data (PancakeSwap, DODO)
3. **Bitquery API** - Indexed trade data across DEXs
4. **Official SDKs** - Use PancakeSwap/Uniswap SDKs for advanced features
5. **Chainlink Oracles** - Decentralized price feeds

### Public RPC Endpoints

**Official Binance:**
- https://bsc-dataseed.binance.org/
- https://bsc-dataseed1.binance.org/
- https://bsc-dataseed2.binance.org/

**Third-Party Providers:**
- **Ankr:** https://rpc.ankr.com/bsc
- **1RPC:** https://1rpc.io/bnb
- **NOWNodes:** https://nownodes.io/nodes/bsc
- **GetBlock:** https://getblock.io/nodes/bsc
- **QuickNode:** https://www.quicknode.com/docs/bnb-smart-chain

## 🔧 Key TypeScript Packages

### Core EVM Interaction
```bash
npm install ethers web3
```

### PancakeSwap Integration
```bash
npm install @pancakeswap/sdk
```

### Uniswap V3 Integration
```bash
npm install @uniswap/v3-sdk @uniswap/sdk-core @uniswap/smart-order-router
```

### GraphQL Subgraphs
```bash
npm install graphql-request graphql
```

## 📡 Block Explorers & APIs

### BscScan (Official)
- **Website:** https://bscscan.com
- **API:** https://api.bscscan.com/api
- **Documentation:** https://docs.bscscan.com
- **Free Tier:** API key required, generous limits

### Alternative Explorers
- **Bitquery:** https://bitquery.io/blockchains/bnb-blockchain-api
- **Tokenview:** https://bsc.tokenview.io
- **BSCTrace:** https://bsctrace.com
- **Ankr:** https://www.ankr.com/rpc/bsc

## 🌐 Network Information

| Parameter | Value |
|-----------|-------|
| **Chain ID** | 56 (mainnet), 97 (testnet) |
| **Native Token** | BNB |
| **Block Time** | ~3 seconds |
| **Consensus** | Proof of Stake Authority (PoSA) |
| **EVM Compatible** | Yes (Ethereum-compatible) |
| **RPC** | https://bsc-dataseed.binance.org/ |

## ✨ Unique Features by DEX

- **PancakeSwap:** Largest liquidity, V2/V3, comprehensive DeFi suite, multi-chain
- **Biswap:** Low fees, V3 features, referral system, lottery
- **ApeSwap:** Multi-chain, lending, bonds, IAO launchpad
- **THENA:** ve(3,3) tokenomics, stable/volatile pools, gauge voting
- **Uniswap V3:** Concentrated liquidity, capital efficient, NFT positions
- **BabySwap:** NFT marketplace, NFT staking, community focus
- **DODO:** PMM algorithm, single-sided LP, crowdpooling, capital efficient

## 📝 Data Schema

Each DEX file exports an object with this structure:

```typescript
{
  name: string;
  blockchain: string;
  type: string;
  description: string;
  urls: { main, app, docs, ... };
  api: { endpoints, documentation, requiresApiKey, ... };
  contracts: { mainnet: { router, factory, ... } };
  tokens: { symbol, address, decimals, ... };
  sdk: { typescript: { packages, documentation } };
  integration: { exampleUsage: string };
  socialMedia: { twitter, discord, telegram, ... };
  features: { swaps, liquidityProvision, ... };
  notes: string[];
}
```

## 🛠️ Best Practices

1. **Use Official SDKs** when available (PancakeSwap, Uniswap V3, DODO)
2. **Fallback to Ethers.js** for DEXs without SDKs
3. **Query via Subgraphs** for historical/aggregated data
4. **Use BscScan API** for address/transaction lookups
5. **Test on BSC Testnet** before mainnet (Chain ID 97)
6. **Handle Gas Limits** properly for complex swaps
7. **Account for Slippage** in swap calculations
8. **Use Price Impact Calculations** for large trades

## 🔗 Related Resources

### BNB Chain Development
- **Official Docs:** https://docs.bnbchain.org/
- **Developer Portal:** https://www.bnbchain.org/en/developers
- **JSON-RPC Docs:** https://docs.bnbchain.org/bnb-smart-chain/developers/json_rpc/

### Tools & Services
- **ChainList:** https://chainlist.org/chain/56
- **Alchemy:** https://docs.alchemy.com/reference/api-overview
- **Moralis:** https://moralis.io/nodes/
- **Chainstack:** https://chainstack.com/build-better-with-binance-smart-chain/

### Oracles
- **Chainlink:** https://data.chain.link/ (BNB/USD feeds)
- **DIA:** https://www.diadata.org/
- **Band Protocol:** https://bandprotocol.com/

## ⚠️ Important Notes

- **EVM Compatible:** BSC is Ethereum-compatible, use standard EVM tools
- **Gas Token:** BNB is used for gas fees (not ETH)
- **Address Format:** Same as Ethereum (0x... addresses)
- **Derivation Path:** m/44'/60'/0'/0/0 (same as Ethereum)
- **Contract Verification:** Use BscScan for verification
- **Rate Limits:** Public RPC endpoints have rate limits
- **Test Networks:** BSC Testnet (Chain ID 97) for testing

---

**Last Updated:** October 14, 2025  
**Maintained By:** Currency Core Team  
**Total DEXs:** 7  
**Chain ID:** 56 (mainnet)


