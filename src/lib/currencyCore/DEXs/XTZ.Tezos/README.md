# Tezos (XTZ) DEXs

This directory contains implementations for decentralized exchanges (DEXs) and liquidity protocols on the Tezos blockchain.

## Overview

Tezos is a self-amending blockchain with on-chain governance, utilizing Liquid Proof of Stake (LPoS) consensus. The Tezos DeFi ecosystem features multiple DEXs with different approaches to liquidity provision, from traditional AMMs to concentrated liquidity and synthetic assets.

**Total DEXs**: 7
**Total TVL**: ~$20-30M (as of October 2025)
**Token Standards**: FA1.2, FA2
**Smart Contract Languages**: Michelson, SmartPy, LIGO, Archetype

## Included DEXs

### 1. QuipuSwap (`quipuswap.ts`)
- **Type**: AMM DEX
- **Description**: Leading AMM on Tezos with highest liquidity
- **TVL**: ~$8-10M
- **Features**: Traditional AMM, yield farming, staking, governance
- **Token**: QUIPU
- **API**: GraphQL, REST
- **URL**: https://quipuswap.com/

### 2. Plenty DeFi (`plenty.ts`)
- **Type**: Multi-Feature DeFi Platform
- **Description**: Comprehensive DeFi platform with multiple pool types
- **TVL**: ~$100k
- **Features**: Constant product AMM, stableswap, concentrated liquidity, farming, governance
- **Token**: PLENTY
- **API**: GraphQL, REST
- **URL**: https://www.plentydefi.com/

### 3. SpicySwap (`spicyswap.ts`)
- **Type**: AMM DEX
- **Description**: Gamified DEX with NFT rewards
- **TVL**: ~$50k
- **Features**: AMM swaps, yield farming, NFT rewards, gamification
- **Token**: SPI
- **API**: GraphQL, REST
- **URL**: https://spicyswap.xyz/

### 4. Vortex (`vortex.ts`)
- **Type**: Concentrated Liquidity AMM
- **Description**: Uniswap V3-style concentrated liquidity DEX
- **Features**: Concentrated liquidity, multiple fee tiers, NFT positions, range orders
- **Fee Tiers**: 0.05%, 0.30%, 1.00%
- **API**: GraphQL, REST
- **URL**: https://vortex.network/

### 5. Youves (`youves.ts`)
- **Type**: Synthetic Asset Platform
- **Description**: Platform for minting synthetic assets (uUSD, uBTC, uDEFI)
- **TVL**: ~$5-10M
- **Features**: Synthetic assets, collateralized vaults, governance, savings rate
- **Token**: YOU
- **Synthetic Assets**: uUSD (USD), uBTC (BTC), uDEFI (DeFi Index)
- **API**: REST, GraphQL
- **URL**: https://youves.com/

### 6. Ctez (`ctez.ts`)
- **Type**: Collateralized Asset Platform
- **Description**: Liquid staking derivative platform (ctez)
- **TVL**: ~$1-2M
- **Features**: Liquid staking, ovens (vaults), autonomous interest rate, delegation
- **Token**: ctez
- **Mechanism**: Soft peg via drift adjustment
- **API**: REST, TzKT indexer
- **URL**: https://ctez.app/

### 7. 3Route (`3route.ts`)
- **Type**: DEX Aggregator
- **Description**: Leading DEX aggregator finding optimal routes
- **Features**: Multi-DEX routing, split routes, gas optimization, slippage protection
- **Aggregator Fee**: 0.05%
- **Supported DEXs**: 8+ (QuipuSwap, Plenty, SpicySwap, Vortex, Youves, Ctez, Flat Curve, Liquidity Baking)
- **API**: REST
- **URL**: https://3route.io/

## Integration Examples

### Basic Token Swap via QuipuSwap

```typescript
import { TezosToolkit } from '@taquito/taquito';
import { xtzQuipuSwapDEX } from '@/components/currencyCore/DEXs/XTZ.Tezos';

const Tezos = new TezosToolkit('https://mainnet.api.tez.ie');

async function swapTokens() {
  const contract = await Tezos.wallet.at(xtzQuipuSwapDEX.contracts.router);
  
  const operation = await contract.methods
    .swap(
      'tokenIn',
      'tokenOut',
      amountIn,
      minAmountOut,
      await Tezos.wallet.pkh()
    )
    .send();
  
  await operation.confirmation();
  console.log('Swap confirmed:', operation.hash);
}
```

### Get Best Price via 3Route Aggregator

```typescript
import axios from 'axios';
import { xtzThreeRouteDEX } from '@/components/currencyCore/DEXs/XTZ.Tezos';

async function getBestPrice(tokenIn: string, tokenOut: string, amountIn: number) {
  const response = await axios.get(`${xtzThreeRouteDEX.api.quoteApi}`, {
    params: { tokenIn, tokenOut, amountIn },
  });
  
  console.log('Best route:', response.data.route);
  console.log('Expected output:', response.data.amountOut);
  return response.data;
}
```

### Mint Synthetic USD via Youves

```typescript
import { TezosToolkit } from '@taquito/taquito';
import { xtzYouvesDEX } from '@/components/currencyCore/DEXs/XTZ.Tezos';

const Tezos = new TezosToolkit('https://mainnet.api.tez.ie');

async function mintUSD(collateralAmount: number, mintAmount: number) {
  const contract = await Tezos.wallet.at(xtzYouvesDEX.contracts.uUSDEngine);
  
  const operation = await contract.methods
    .mint(collateralAmount, mintAmount)
    .send({ amount: collateralAmount, mutez: false });
  
  await operation.confirmation();
  console.log('uUSD minted:', operation.hash);
}
```

### Provide Concentrated Liquidity via Vortex

```typescript
import { TezosToolkit } from '@taquito/taquito';
import { xtzVortexDEX } from '@/components/currencyCore/DEXs/XTZ.Tezos';

const Tezos = new TezosToolkit('https://mainnet.api.tez.ie');

async function mintPosition(
  poolAddress: string,
  tickLower: number,
  tickUpper: number,
  amount0: number,
  amount1: number
) {
  const positionManager = await Tezos.wallet.at(xtzVortexDEX.contracts.positionManager);
  
  const operation = await positionManager.methods
    .mint({
      pool: poolAddress,
      tickLower,
      tickUpper,
      amount0Desired: amount0,
      amount1Desired: amount1,
      amount0Min: amount0 * 0.95, // 5% slippage
      amount1Min: amount1 * 0.95,
      recipient: await Tezos.wallet.pkh(),
      deadline: Math.floor(Date.now() / 1000) + 3600,
    })
    .send();
  
  await operation.confirmation();
  console.log('Position created:', operation.hash);
}
```

## Tezos-Specific Features

### Self-Amending Governance
- On-chain voting for protocol upgrades
- No hard forks required
- Regular protocol amendments (Granada, Hangzhou, Ithaca, Jakarta, Kathmandu, Lima, Mumbai, Nairobi, Oxford, Paris, Quebec)

### Token Standards

#### FA1.2 (Fungible Assets)
- Simple fungible token standard
- Similar to ERC-20
- Used by: ctez, QUIPU

#### FA2 (Multi-Asset)
- Advanced multi-asset standard
- Supports fungible, non-fungible, and semi-fungible tokens
- Similar to ERC-1155
- Used by: Most modern Tezos tokens

### Formal Verification
- Michelson smart contracts support formal verification
- Mathematical proof of correctness
- Enhanced security for critical DeFi operations

### Baking (Staking)
- Liquid Proof of Stake consensus
- ~6% annual staking rewards
- Delegation without locking tokens
- Bakers validate transactions and create blocks

## API Integration

### Taquito (Primary SDK)

```bash
npm install @taquito/taquito @taquito/signer
```

```typescript
import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';

const Tezos = new TezosToolkit('https://mainnet.api.tez.ie');
const signer = await InMemorySigner.fromSecretKey('edsk...');
Tezos.setSignerProvider(signer);

// Contract interaction
const contract = await Tezos.wallet.at('KT1...');
const operation = await contract.methods.entrypoint(params).send();
await operation.confirmation();
```

### TzKT Indexer (Historical Data)

```typescript
import axios from 'axios';

// Get contract storage
const storage = await axios.get('https://api.tzkt.io/v1/contracts/KT1.../storage');

// Get contract operations
const operations = await axios.get('https://api.tzkt.io/v1/contracts/KT1.../operations');

// Get account balance
const balance = await axios.get('https://api.tzkt.io/v1/accounts/tz1.../balance');
```

### DEX-Specific GraphQL

```typescript
import axios from 'axios';

// QuipuSwap GraphQL
const query = `
  query {
    pool(id: "pool_address") {
      token1 { symbol }
      token2 { symbol }
      tvl
      volume24h
    }
  }
`;

const response = await axios.post('https://analytics-api.quipuswap.com/graphql', {
  query,
  headers: { 'Content-Type': 'application/json' }
});
```

## Wallets

### Temple Wallet
- Most popular Tezos wallet
- Browser extension + mobile
- DApp connector
- https://templewallet.com/

### Kukai
- Web-based wallet
- Social login options
- Easy onboarding
- https://wallet.kukai.app/

### Umami
- Desktop + mobile wallet
- Ledger support
- Multi-account management
- https://umamiwallet.com/

## Price Oracles

### Harbinger
- Decentralized price oracle for Tezos
- Multiple price feeds
- Used by major DeFi protocols

### Acurast
- Multi-chain oracle network
- Real-world data integration
- https://acurast.com/

### Chainlink (Limited)
- Limited availability on Tezos
- Expanding oracle services

## Block Explorers

- **TzKT**: https://tzkt.io/ (Most feature-rich)
- **TzStats**: https://tzstats.com/
- **Better Call Dev**: https://better-call.dev/ (Contract explorer)

## Resources

### Official Documentation
- Tezos Developer Portal: https://tezos.com/developers/
- Taquito Documentation: https://tezostaquito.io/
- FA2 Standard: https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-12/

### Development Tools
- SmartPy: https://smartpy.io/ (Python-based smart contract language)
- LIGO: https://ligolang.org/ (ML-inspired smart contract language)
- Archetype: https://archetype-lang.org/ (Specification language)

### DeFi Analytics
- TzKT API: https://api.tzkt.io/
- QuipuSwap Analytics: https://analytics.quipuswap.com/
- DeFi Pulse (Tezos): https://defipulse.com/tezos

### Community
- Tezos Agora: https://www.tezosagora.org/ (Governance forum)
- Tezos Commons: https://tezoscommons.org/
- r/tezos: https://reddit.com/r/tezos

## Notes

- **Self-Amending**: Tezos uniquely allows protocol upgrades via on-chain governance without hard forks
- **Formal Verification**: Strong focus on security through mathematical proof of correctness
- **Energy Efficient**: LPoS consensus is highly energy-efficient compared to PoW
- **Low Fees**: Transaction fees typically $0.01-0.10
- **TVL**: Lower than major EVM chains, but growing ecosystem
- **QuipuSwap Dominance**: QuipuSwap holds ~40% of Tezos DeFi TVL
- **3Route Integration**: Most traders use 3Route for best execution
- **Etherlink**: New EVM-compatible Layer 2 expanding Tezos ecosystem
- **FA2 Adoption**: Most new tokens use FA2 standard over FA1.2
- **Baking Rewards**: ~6% APY for staking/delegation

## Future Developments

- Etherlink (EVM-compatible rollup) integration
- Expanded Chainlink oracle support
- More institutional adoption
- Improved cross-chain bridges
- Enhanced DEX aggregation
- Privacy features (Sapling protocol)

