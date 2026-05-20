# Stacks (STX) Decentralized Exchanges

This directory contains comprehensive information about decentralized exchanges (DEXs) operating on the Stacks blockchain.

## Overview

Stacks is a Bitcoin Layer 2 blockchain that brings smart contracts and decentralized applications to Bitcoin. Using its unique Proof of Transfer (PoX) consensus mechanism, Stacks anchors to Bitcoin and enables STX stackers to earn Bitcoin rewards. All DEXs on Stacks inherit Bitcoin's security while leveraging Clarity smart contracts for DeFi functionality.

**Total DEXs**: 7  
**Total TVL**: $250+ million  
**Total 24h Volume**: $45+ million

## Stacks DEXs

### 1. **Velar** (Liquidity Protocol)
- **URL**: https://www.velar.co/
- **Type**: Liquidity Protocol
- **Description**: Leading liquidity protocol with concentrated liquidity
- **TVL**: $50+ million
- **Volume**: $10+ million daily
- **Features**:
  - Concentrated liquidity pools
  - Yield farming and staking rewards
  - Efficient capital deployment
  - Multi-asset liquidity pools
- **Integration**: @stacks/transactions
- **Unique**: Concentrated liquidity on Bitcoin L2

### 2. **ALEX** (DeFi Platform)
- **URL**: https://alexgo.io/
- **Type**: Comprehensive DeFi Hub
- **Description**: Largest DeFi platform with AMM, orderbook, lending, and launchpad
- **TVL**: $100+ million
- **Volume**: $20+ million daily
- **Features**:
  - AMM + Orderbook hybrid
  - Lending and borrowing
  - Project launchpad
  - ALEX token governance
- **Integration**: @alex-go/sdk, REST API
- **Unique**: First comprehensive DeFi hub on Bitcoin

### 3. **StackSwap** (AMM DEX)
- **URL**: https://www.stackswap.org/
- **Type**: Automated Market Maker
- **Description**: First AMM DEX on Stacks, pioneering DeFi on Bitcoin
- **TVL**: $20+ million
- **Volume**: $5+ million daily
- **Features**:
  - Simple AMM swaps
  - Liquidity provision
  - STSW governance token
  - Community-driven
- **Integration**: @stacks/transactions
- **Unique**: First AMM on Stacks

### 4. **Arkadiko Swap** (DeFi Protocol)
- **URL**: https://arkadiko.finance/
- **Type**: DeFi Protocol with Stablecoin
- **Description**: Decentralized stablecoin (USDA) and AMM swap
- **TVL**: $30+ million
- **Volume**: $3+ million daily
- **Features**:
  - USDA stablecoin (collateralized by STX)
  - AMM swap functionality
  - Vault system for CDPs
  - Self-repaying loans
  - DIKO governance token
- **Integration**: @arkadiko-dao/arkadiko-sdk
- **Unique**: First decentralized stablecoin on Bitcoin

### 5. **LNSwap** (Lightning Swap)
- **URL**: https://lnswap.org/
- **Type**: Lightning Network Atomic Swaps
- **Description**: Trustless swaps between Lightning and on-chain
- **TVL**: $5+ million
- **Volume**: $1+ million daily
- **Features**:
  - Atomic swaps (HTLC-based)
  - Lightning Network integration
  - Instant and low-cost
  - Trustless and non-custodial
- **Integration**: Lightning SDK + @stacks/transactions
- **Unique**: Bridges Lightning to Stacks ecosystem

### 6. **Bitflow** (Bitcoin DeFi)
- **URL**: https://www.bitflow.finance/
- **Type**: Native Bitcoin DEX
- **Description**: UTXO-based swaps for true Bitcoin DeFi
- **TVL**: $15+ million
- **Volume**: $2+ million daily
- **Features**:
  - Native Bitcoin swaps (no wrapping)
  - UTXO-based trading
  - Direct BTC to STX
  - True Bitcoin integration
- **Integration**: @stacks/transactions
- **Unique**: First truly Bitcoin-native DEX

### 7. **Charisma** (Gaming DEX)
- **URL**: https://charisma.rocks/
- **Type**: Gamified DeFi
- **Description**: Gamified DeFi with interactive experiences
- **TVL**: $10+ million
- **Volume**: $1+ million daily
- **Features**:
  - Gamification mechanics
  - NFT integration
  - Community governance
  - CHA utility token
- **Integration**: @stacks/transactions
- **Unique**: Gamified approach to DeFi

## Technical Integration

### Stacks Contract Interaction

```typescript
import { callReadOnlyFunction, makeContractCall } from '@stacks/transactions';
import { StacksMainnet } from '@stacks/network';

// Read contract data
async function getPoolInfo(contractAddress: string, contractName: string) {
  const network = new StacksMainnet();
  
  const result = await callReadOnlyFunction({
    network,
    contractAddress,
    contractName,
    functionName: 'get-pool-details',
    functionArgs: [],
    senderAddress: contractAddress,
  });
  
  return result;
}
```

### ALEX API Integration

```typescript
import axios from 'axios';

// Get STX price from ALEX
async function getALEXPrice(token: string = 'STX') {
  const response = await axios.get(
    `https://api.alexlab.co/v1/price?token=${token}`
  );
  
  console.log('STX Price:', response.data.price);
  
  return response.data;
}
```

### Stacks Blockchain API

```typescript
import axios from 'axios';

// Query Stacks blockchain
async function getAccountInfo(address: string) {
  const response = await axios.get(
    `https://api.mainnet.stacks.co/extended/v1/address/${address}/balances`
  );
  
  console.log('STX Balance:', response.data.stx.balance);
  
  return response.data;
}
```

## Stacks Blockchain Details

- **Consensus**: Proof of Transfer (PoX) - anchored to Bitcoin
- **Smart Contracts**: Clarity (decidable, non-Turing complete language)
- **Block Time**: ~10 minutes (follows Bitcoin)
- **Signatures**: secp256k1 (same as Bitcoin)
- **Address Format**: C32Check encoding (based on Bitcoin's Base58Check)
- **Derivation Path**: m/44'/5757'/0'/0/0 (BIP44 Stacks standard)
- **API Endpoint**: https://api.mainnet.stacks.co/
- **Block Explorer**: https://explorer.stacks.co/

## Key Features

- **Bitcoin Security**: All Stacks blocks anchored to Bitcoin blockchain
- **Bitcoin Rewards**: STX stackers earn native Bitcoin (not just STX)
- **Proof of Transfer**: Unique consensus mechanism linking to Bitcoin
- **Clarity Contracts**: Decidable smart contract language (no reentrancy bugs)
- **Native Bitcoin DeFi**: Trade BTC without wrapping (Bitflow)
- **Lightning Integration**: Atomic swaps with Lightning Network (LNSwap)
- **Decentralized Stablecoin**: USDA backed by STX collateral (Arkadiko)
- **Comprehensive DeFi**: Lending, borrowing, swaps, launchpad (ALEX)

## Oracles

Stacks DEXs integrate with leading oracle networks:

### Pyth Network
- Real-time price feeds for 300+ assets
- Low-latency updates
- BTC/USD, STX/USD, ETH/USD, and more
- https://pyth.network/

### DIA Oracle
- Transparent and customizable price feeds
- Data from 90+ markets
- 3,000+ supported tokens
- https://www.diadata.org/

## Resources

- **Stacks Official**: https://stacks.org/
- **Stacks Docs**: https://docs.stacks.co/
- **Stacks Explorer**: https://explorer.stacks.co/
- **Hiro Stacks API**: https://www.hiro.so/stacks-api
- **Clarity Language**: https://docs.stacks.co/clarity/
- **BNS (Bitcoin Name System)**: https://docs.stacks.co/build-apps/references/bns
- **Stacks.js Library**: https://github.com/hirosystems/stacks.js
- **Proof of Transfer Explained**: https://docs.stacks.co/stacks-101/proof-of-transfer

## Wallets

- **Leather Wallet** (formerly Hiro): https://leather.io/
- **Xverse Wallet**: https://www.xverse.app/
- **Asigna Wallet**: https://www.asigna.io/

## Notes

- Stacks is the premier Bitcoin Layer 2 for smart contracts
- Uses Proof of Transfer to inherit Bitcoin security
- STX stackers earn Bitcoin rewards through PoX consensus
- Clarity language is decidable, preventing many common vulnerabilities
- All Stacks transactions achieve Bitcoin finality
- Native Bitcoin DeFi without wrapping tokens
- Lightning Network integration for instant swaps
- First decentralized stablecoin on Bitcoin (USDA)
- secp256k1 signatures maintain Bitcoin compatibility
- C32Check addresses are derived from Bitcoin addresses
- Non-EVM architecture optimized for Bitcoin ecosystem
- Block time follows Bitcoin (~10 minutes)
- Pyth and DIA provide oracle price feeds
- Growing DeFi ecosystem with $250M+ TVL

## Usage Examples

### Import Specific DEX
```typescript
import { alexDEX } from '@/components/currencyCore/DEXs/STX.Stacks';
console.log(alexDEX.api.endpoints.pricing);
```

### Import All Stacks DEXs
```typescript
import * as stacksDexes from '@/components/currencyCore/DEXs/STX.Stacks';
console.log(stacksDexes.stxDexMetadata.totalDexes);
```

### Query DEX Metadata
```typescript
import { stxDexMetadata } from '@/components/currencyCore/DEXs/STX.Stacks';
console.log(stxDexMetadata.stats.totalTvl);
console.log(stxDexMetadata.categories.defiPlatforms);
```

---

**Last Updated**: October 14, 2025

