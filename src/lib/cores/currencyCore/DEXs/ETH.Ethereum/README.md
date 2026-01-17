# Ethereum DEXs

Comprehensive integration information for decentralized exchanges on the Ethereum blockchain.

## Overview

Ethereum hosts the largest and most mature decentralized exchange ecosystem in the cryptocurrency space. With over $10 billion in total value locked and $12+ billion in daily trading volume, Ethereum DEXs represent the foundation of decentralized finance (DeFi).

## Supported DEXs

### 1. **Uniswap** (Largest DEX)
- **Type**: Concentrated Liquidity AMM
- **TVL**: $4+ billion
- **Volume**: $8.6+ billion/day
- **Features**: V3 concentrated liquidity, smart order router, extensive SDK
- **Best For**: General trading, highest liquidity
- **Integration**: Full SDK, subgraph, contract support

### 2. **Curve Finance** (Stablecoin Specialist)
- **Type**: Stablecoin AMM
- **Features**: Low slippage for similar assets, specialized bonding curves
- **Best For**: Stablecoin swaps (USDC, USDT, DAI)
- **Integration**: Direct contract calls, subgraph

### 3. **SushiSwap** (Community-Driven)
- **Type**: Multi-Chain AMM
- **Features**: Cross-chain support, yield farming, lending
- **Best For**: Multi-chain DeFi, community governance
- **Integration**: Subgraph, multi-chain contracts

### 4. **Balancer** (Portfolio Manager)
- **Type**: Weighted Pool AMM
- **Features**: 2-8 token pools, custom weights, boosted pools
- **Best For**: Portfolio management, multi-token exposure
- **Integration**: SDK, subgraph, vault contracts

### 5. **1inch** (DEX Aggregator)
- **Type**: DEX Aggregator
- **Features**: Optimal routing, Fusion gasless swaps, 100+ DEX sources
- **Best For**: Best execution, price optimization
- **Integration**: REST API, Fusion SDK

### 6. **Bancor** (IL Protection)
- **Type**: Single-Sided Liquidity AMM
- **Features**: Impermanent loss protection, single-sided liquidity
- **Best For**: Risk-averse liquidity provision
- **Integration**: Contract calls

### 7. **KyberSwap** (Hybrid Aggregator)
- **Type**: Liquidity Aggregator + AMM
- **Features**: Aggregation + own liquidity, 14+ chains, dynamic fees
- **Best For**: Combined liquidity sources
- **Integration**: API, contract calls

## Integration Methods

### The Graph (Subgraphs)
Most Ethereum DEXs have subgraphs for efficient data querying:

```typescript
import { request, gql } from 'graphql-request';

const query = gql`
  query GetPools {
    pools(first: 5, orderBy: totalValueLocked, orderDirection: desc) {
      id
      token0 { symbol }
      token1 { symbol }
      totalValueLocked
    }
  }
`;

const data = await request('SUBGRAPH_URL', query);
```

### Direct SDK Integration (Uniswap)
```typescript
import { AlphaRouter } from '@uniswap/smart-order-router';
import { Token, CurrencyAmount, TradeType } from '@uniswap/sdk-core';

const router = new AlphaRouter({ chainId: 1, provider });
const route = await router.route(inputAmount, outputToken, TradeType.EXACT_INPUT);
```

### REST API (1inch, KyberSwap)
```typescript
const response = await fetch(`https://api.1inch.io/v5.0/1/quote?fromTokenAddress=${FROM}&toTokenAddress=${TO}&amount=${AMOUNT}`);
const quote = await response.json();
```

### Direct Contract Calls (Curve, Bancor)
```typescript
import { ethers } from 'ethers';

const curvePool = new ethers.Contract(poolAddress, curveABI, provider);
const amountOut = await curvePool.get_dy(0, 1, amountIn);
```

## Common Ethereum Tokens

```typescript
const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
const USDT = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
const DAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
```

## Usage Examples

### Import Specific DEX
```typescript
import { uniswapDEX } from '@/components/currencyCore/DEXs/ETH.Ethereum';
console.log(uniswapDEX.api.endpoints.v3Subgraph);
```

### Import All Ethereum DEXs
```typescript
import * as ethereumDEXs from '@/components/currencyCore/DEXs/ETH.Ethereum';
console.log(ethereumDEXs.ethDexMetadata.totalDexes);
```

### Lazy Load DEX
```typescript
import { ethereumDexes } from '@/components/currencyCore/DEXs/ETH.Ethereum';
const uniswap = await ethereumDexes.uniswap();
```

## Key Considerations

### Gas Costs
Ethereum mainnet has relatively high gas costs. Consider:
- Using aggregators (1inch, KyberSwap) for optimal routing
- Batch transactions when possible
- Layer 2 solutions for smaller trades

### Slippage
- Uniswap V3: Better for most pairs due to concentrated liquidity
- Curve: Best for stablecoins (minimal slippage)
- Aggregators: Help minimize slippage through routing

### Liquidity
- Uniswap has the deepest liquidity for most pairs
- Curve dominates stablecoin pairs
- Check TVL before large trades

### MEV Protection
- Use private RPCs (Flashbots RPC)
- Set appropriate slippage tolerance
- Consider MEV-protected services

## Resources

- **Ethereum Docs**: https://ethereum.org/
- **The Graph**: https://thegraph.com/
- **DeFi Llama**: https://defillama.com/
- **Uniswap Docs**: https://docs.uniswap.org/
- **Curve Docs**: https://docs.curve.fi/
- **1inch Docs**: https://docs.1inch.io/

## Development Tools

### Required Packages
```bash
npm install ethers @uniswap/sdk-core @uniswap/v3-sdk graphql-request
```

### RPC Providers
- Alchemy: https://www.alchemy.com/
- Infura: https://infura.io/
- QuickNode: https://www.quicknode.com/

## Notes

- Ethereum DEXs are the most battle-tested in DeFi
- Strong developer tools and documentation
- High gas costs require strategic trade planning
- Multiple specialized DEXs for different use cases
- Comprehensive subgraph support via The Graph

---

**Last Updated**: October 14, 2025

