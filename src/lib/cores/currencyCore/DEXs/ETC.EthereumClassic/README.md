# Ethereum Classic (ETC) DEX Integration

Comprehensive integration for Ethereum Classic decentralized exchanges and instant exchange services.

## Overview

Ethereum Classic's DeFi ecosystem is smaller than Ethereum's but maintains active native DEXs and benefits from extensive cross-chain instant exchange support. This directory provides TypeScript-ready integrations for all major ETC trading venues.

## Native DEXs

### ETCswap
**Type:** AMM DEX (V2 & V3)  
**TVL:** Active  
**Features:**
- Concentrated liquidity (V3)
- Multiple fee tiers
- TWAP oracles for reliable price feeds
- Uniswap-style architecture
- NPM SDK: `@_etcswap/v2-sdk`, `@_etcswap/universal-router-sdk`

**Integration:**
```typescript
import { etcswapDEX } from './etcswap';
import { ethers } from 'ethers';
import { request, gql } from 'graphql-request';

// Query subgraph for pricing
const query = gql`
  query GetPool($poolId: ID!) {
    pair(id: $poolId) {
      reserve0
      reserve1
      volumeUSD
    }
  }
`;

const data = await request(etcswapDEX.api.endpoints.v2Subgraph, query, { poolId: '0x...' });
```

### HebeSwap
**Type:** AMM DEX (Uniswap V2 Fork)  
**TVL:** ~$350,000 USD (largest on ETC)  
**Features:**
- Largest DEX on Ethereum Classic
- Integrated NFT marketplace
- Oracle services
- Launched December 29, 2021

**Integration:**
```typescript
import { hebeswapDEX } from './hebeswap';
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider('https://etc.rivet.link');
const routerAbi = ['function getAmountsOut(uint, address[]) view returns (uint[])'];
const router = new ethers.Contract('ROUTER_ADDRESS', routerAbi, provider);

const amounts = await router.getAmountsOut(amountIn, [tokenA, tokenB]);
```

### ClassicDAO
**Type:** DAO & DEX  
**Features:**
- Combines governance with DeFi
- Community-driven development
- Focus on ETC ecosystem growth

## Instant Exchanges

All instant exchanges support ETC with no registration or KYC requirements.

### SideShift.ai
**Supported Assets:** Many  
**API:** REST API with no API key required  
**Features:**
- Fast non-custodial swaps
- No registration
- Affiliate program

```typescript
import { sideShiftDEX } from './sideShift';
import axios from 'axios';

// Get quote
const quote = await axios.post('https://sideshift.ai/api/v2/quotes', {
  depositCoin: 'etc',
  settleCoin: 'btc',
  depositAmount: '10',
});
```

### ChangeNOW
**Supported Assets:** 850+  
**API:** REST API with API key  
**Features:**
- Standard and fixed-rate swaps
- No limits
- Affiliate program

```typescript
import { changeNOWDEX } from './changeNOW';
import axios from 'axios';

const estimate = await axios.get('https://api.changenow.io/v2/exchange/estimated-amount', {
  params: {
    fromCurrency: 'etc',
    toCurrency: 'btc',
    fromAmount: '10',
  },
  headers: { 'x-changenow-api-key': API_KEY },
});
```

### SimpleSwap
**Supported Assets:** 1500+  
**API:** REST API with API key  
**Features:**
- User-friendly interface
- Floating and fixed-rate
- Comprehensive API

```typescript
import { simpleSwapDEX } from './simpleSwap';

const estimate = await axios.get('https://api.simpleswap.io/get_estimated', {
  params: {
    api_key: API_KEY,
    currency_from: 'etc',
    currency_to: 'btc',
    amount: '10',
  },
});
```

### StealthEX
**Supported Assets:** 1400+  
**API:** REST API with API key  
**Features:**
- Anonymous exchanges
- No limits
- Privacy-focused

## Quick Start

### Install Dependencies
```bash
npm install ethers axios graphql-request
```

### Basic Price Query
```typescript
import { etcswapDEX, hebeswapDEX } from './ETC.EthereumClassic';
import { ethers } from 'ethers';

// Connect to ETC network
const provider = new ethers.providers.JsonRpcProvider('https://etc.rivet.link');

// Query ETCswap for price
const routerAddress = 'CHECK_ETCSWAP_DOCS';
const routerAbi = ['function getAmountsOut(uint, address[]) view returns (uint[])'];
const router = new ethers.Contract(routerAddress, routerAbi, provider);

const path = [TOKEN_A, TOKEN_B];
const amountIn = ethers.utils.parseEther('1');
const amounts = await router.getAmountsOut(amountIn, path);

console.log('Price:', ethers.utils.formatEther(amounts[1]));
```

### Cross-Chain Swap
```typescript
import { sideShiftDEX } from './ETC.EthereumClassic';
import axios from 'axios';

// Get quote
const quote = await axios.post('https://sideshift.ai/api/v2/quotes', {
  depositCoin: 'etc',
  settleCoin: 'btc',
  depositAmount: '10',
});

// Create order
const order = await axios.post('https://sideshift.ai/api/v2/orders', {
  quoteId: quote.data.id,
  settleAddress: 'YOUR_BTC_ADDRESS',
});

console.log('Send', order.data.depositAmount, 'ETC to', order.data.depositAddress);
```

## Network Configuration

```typescript
const ETC_CONFIG = {
  chainId: 61,
  name: 'Ethereum Classic',
  nativeCurrency: {
    name: 'Ethereum Classic',
    symbol: 'ETC',
    decimals: 18,
  },
  rpcUrls: [
    'https://etc.rivet.link',
    'https://www.ethercluster.com/etc',
    'https://etc.ethercluster.com',
  ],
  blockExplorers: [
    'https://blockscout.com/etc/mainnet/',
    'https://etcblockexplorer.com/',
  ],
};
```

## Resources

### Official Documentation
- **ETCswap:** https://docs.etcswap.org/
- **HebeSwap:** https://hebeswap.com/
- **Ethereum Classic:** https://ethereumclassic.org/

### Data Providers
- **DexScreener:** https://dexscreener.com/ethereumclassic
- **DeFiLlama:** https://defillama.com/chain/Ethereum%20Classic
- **Blockscout API:** https://etc.blockscout.com/api-docs

### Instant Exchange APIs
- **SideShift.ai:** https://sideshift.ai/api
- **ChangeNOW:** https://changenow.io/api/docs
- **SimpleSwap:** https://simpleswap.io/api-docs
- **StealthEX:** https://stealthex.io/api-docs

## Notes

### Ecosystem Characteristics
- **Smaller DeFi Ecosystem:** ETC has significantly less DeFi activity than Ethereum
- **Proof of Work:** Uses Ethash PoW consensus (unlike Ethereum's PoS)
- **Code is Law:** Maintains immutability philosophy from Ethereum's founding
- **EVM Compatible:** Full compatibility with Ethereum tooling and SDKs
- **Lower Fees:** Generally cheaper transaction costs than Ethereum

### Integration Considerations
1. **Limited Subgraphs:** Few indexed data sources; rely more on direct RPC calls
2. **Lower Liquidity:** Native DEXs have smaller liquidity pools
3. **Instant Exchanges:** Often better option for larger swaps or cross-chain trades
4. **Contract Verification:** Always verify contract addresses from official sources
5. **Network Stability:** ETC has experienced 51% attacks in the past; use appropriate confirmation times

## Support

For issues or questions:
- ETCswap: https://github.com/etcswap
- HebeSwap: https://t.me/hebeswap
- Ethereum Classic: https://discord.gg/ethereumclassic

