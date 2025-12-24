# Solana (SOL) Decentralized Exchanges

This directory contains comprehensive information about decentralized exchanges (DEXs) operating on the Solana blockchain.

## Overview

Solana is a high-performance blockchain platform designed for decentralized applications and crypto-currencies. With its unique Proof of History consensus mechanism combined with Proof of Stake, Solana achieves industry-leading transaction speeds (<400ms) and ultra-low fees (~$0.00025), making it ideal for DEX trading and high-frequency operations.

**Total DEXs**: 7  
**Total TVL**: $1+ billion  
**Total 24h Volume**: $2+ billion

## Solana DEXs

### 1. **Jupiter** (DEX Aggregator)
- **URL**: https://jup.ag/
- **Type**: DEX Aggregator
- **Description**: Largest DEX aggregator on Solana, routing across 20+ DEXs
- **Volume**: $1+ billion daily
- **Features**:
  - Best price routing across all Solana DEXs
  - Token swaps, limit orders, DCA
  - Comprehensive API and SDK
  - JUP token for governance
  - No direct liquidity (aggregates from others)
- **Integration**: REST API, @jup-ag/api SDK
- **Unique**: Aggregates all major Solana DEXs for optimal prices

### 2. **Raydium** (AMM DEX)
- **URL**: https://raydium.io/
- **Type**: Automated Market Maker
- **Description**: First AMM on Solana with OpenBook integration
- **TVL**: $200+ million
- **Volume**: $300+ million daily
- **Features**:
  - Integrates with OpenBook's central limit order book
  - V3 concentrated liquidity
  - Yield farming and staking
  - RAY token for governance
- **Integration**: @raydium-io/raydium-sdk, REST API, Bitquery GraphQL
- **Unique**: Combines AMM with orderbook liquidity

### 3. **Orca** (AMM DEX)
- **URL**: https://www.orca.so/
- **Type**: Automated Market Maker
- **Description**: User-friendly DEX with Whirlpools (concentrated liquidity)
- **TVL**: $100+ million
- **Volume**: $150+ million daily
- **Features**:
  - Best-in-class UX
  - Whirlpools for concentrated liquidity
  - Fair launch model
  - Carbon neutral / climate-friendly
  - ORCA token for governance
- **Integration**: @orca-so/whirlpools-sdk, @orca-so/sdk
- **Unique**: Focus on UX and concentrated liquidity

### 4. **Phoenix** (CLOB DEX)
- **URL**: https://phoenix.trade/
- **Type**: Central Limit Order Book
- **Description**: Fully on-chain orderbook DEX for traditional trading
- **TVL**: $10+ million
- **Volume**: $50+ million daily
- **Features**:
  - Fully on-chain CLOB
  - Limit and market orders
  - High-speed matching engine
  - No AMM slippage
  - Open-source and audited
- **Integration**: @ellipsis-labs/phoenix-sdk
- **Unique**: Traditional orderbook trading on Solana

### 5. **Meteora** (Dynamic Liquidity)
- **URL**: https://app.meteora.ag/
- **Type**: Dynamic Liquidity Protocol
- **Description**: Advanced liquidity with dynamic pools and vaults
- **TVL**: $150+ million
- **Volume**: $100+ million daily
- **Features**:
  - Dynamic Liquidity Market Makers (DLMM)
  - Automated liquidity vaults
  - Dynamic fee structures
  - High capital efficiency
  - MET token for governance
- **Integration**: @meteora-ag/dlmm SDK
- **Unique**: Dynamic bins and automated strategies

### 6. **Lifinity** (Proactive Market Maker)
- **URL**: https://lifinity.io/
- **Type**: Proactive Market Maker (PMM)
- **Description**: Oracle-based DEX with reduced impermanent loss
- **TVL**: $30+ million
- **Volume**: $20+ million daily
- **Features**:
  - Proactive market making
  - Oracle-based pricing (Pyth/Switchboard)
  - Protocol-owned liquidity
  - Reduced impermanent loss
  - LFNTY token with revenue sharing
- **Integration**: Solana Web3.js, Pyth oracle client
- **Unique**: PMM model with oracle pricing

### 7. **Drift Protocol** (Perpetuals & Spot)
- **URL**: https://www.drift.trade/
- **Type**: Perpetuals and Spot DEX
- **Description**: Decentralized derivatives and spot trading
- **TVL**: $100+ million
- **Volume**: $200+ million daily
- **Features**:
  - Perpetual futures (up to 20x leverage)
  - Spot trading
  - Cross-margining
  - On-chain orderbook
  - DRIFT token for governance
- **Integration**: @drift-labs/sdk, REST API
- **Unique**: Perpetuals with leverage on Solana

## Technical Integration

### Jupiter API Integration

```typescript
import axios from 'axios';

// Get quote for SOL to USDC swap
async function getJupiterQuote() {
  const SOL = 'So11111111111111111111111111111111111111112';
  const USDC = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
  
  const response = await axios.get(
    'https://quote-api.jup.ag/v6/quote',
    {
      params: {
        inputMint: SOL,
        outputMint: USDC,
        amount: 1000000000, // 1 SOL
        slippageBps: 50,
      }
    }
  );
  
  return response.data;
}
```

### Raydium API Integration

```typescript
import axios from 'axios';

// Get Raydium pool info
async function getRaydiumPools() {
  const response = await axios.get('https://api.raydium.io/v2/main/pairs');
  
  const solUsdcPool = response.data.find((pool: any) => 
    pool.name === 'SOL-USDC'
  );
  
  console.log('SOL/USDC Price:', solUsdcPool.price);
  
  return solUsdcPool;
}
```

### Solana Web3.js Integration

All Solana DEXs can be queried using Solana Web3.js:

```typescript
import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection('https://api.mainnet-beta.solana.com');

// Query account info
async function getAccountInfo(address: PublicKey) {
  const accountInfo = await connection.getAccountInfo(address);
  return accountInfo;
}
```

## Solana Blockchain Details

- **Consensus**: Proof of Stake + Proof of History
- **Smart Contracts**: Rust / C / C++ (compiled to BPF bytecode)
- **VM**: Solana VM (non-EVM)
- **Transaction Speed**: <400ms
- **Average TX Cost**: ~$0.00025
- **TPS**: 65,000+ theoretical, 2,000-4,000 practical
- **Signatures**: Ed25519
- **Address Format**: Base58 encoded public keys
- **RPC Endpoint**: https://api.mainnet-beta.solana.com
- **Block Explorer**: https://solscan.io/

## Key Features

- **Ultra-Fast Transactions**: <400ms confirmation times
- **Ultra-Low Fees**: ~$0.00025 per transaction
- **High Throughput**: 2,000-4,000 TPS in practice
- **Jupiter Aggregation**: Best prices across all DEXs
- **Concentrated Liquidity**: Orca Whirlpools, Raydium V3, Meteora DLMM
- **Perpetuals Trading**: Drift Protocol with leverage
- **Oracle Integration**: Pyth Network, Switchboard
- **On-Chain Orderbooks**: Phoenix, Drift
- **Proactive Market Making**: Lifinity PMM model

## Oracles

Solana DEXs integrate with leading oracle networks:

### Pyth Network
- High-fidelity, low-latency price feeds
- Data from 120+ financial institutions
- Used by most Solana DEXs
- https://pyth.network/

### Switchboard
- Decentralized oracle with TEE security
- Customizable data feeds
- Sub-100ms latency
- https://switchboard.xyz/

## Resources

- **Solana Official**: https://solana.com/
- **Solana Docs**: https://docs.solana.com/
- **Solscan Explorer**: https://solscan.io/
- **Solana FM Explorer**: https://solana.fm/
- **Pyth Network**: https://pyth.network/
- **Switchboard**: https://switchboard.xyz/
- **Bitquery Solana API**: https://docs.bitquery.io/docs/blockchain/Solana/
- **Jupiter Docs**: https://docs.jup.ag/
- **Raydium Docs**: https://docs.raydium.io/
- **Orca Docs**: https://docs.orca.so/

## Notes

- Solana is the fastest blockchain for DEX trading
- Transaction costs are ~100x lower than Ethereum
- Jupiter is essential for price discovery and routing
- Raydium pioneered AMM + orderbook hybrid model
- Orca leads in UX and concentrated liquidity
- Phoenix brings traditional orderbook trading on-chain
- Meteora innovates with dynamic liquidity strategies
- Lifinity reduces impermanent loss via PMM
- Drift enables leveraged perpetuals trading
- All DEXs benefit from Solana's high performance
- Ed25519 signatures enable fast validation
- Proof of History provides verifiable time ordering

## Usage Examples

### Import Specific DEX
```typescript
import { jupiterDEX } from '@/components/currencyCore/DEXs/SOL.Solana';
console.log(jupiterDEX.api.endpoints.quote);
```

### Import All Solana DEXs
```typescript
import * as solanaDexes from '@/components/currencyCore/DEXs/SOL.Solana';
console.log(solanaDexes.solDexMetadata.totalDexes);
```

### Query DEX Metadata
```typescript
import { solDexMetadata } from '@/components/currencyCore/DEXs/SOL.Solana';
console.log(solDexMetadata.stats.totalTvl);
console.log(solDexMetadata.categories.aggregators);
```

---

**Last Updated**: October 14, 2025

