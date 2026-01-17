# Tezos Token Minting

This directory contains token minting mechanisms for **Tezos (XTZ)**, the self-amending blockchain with formal verification and on-chain governance.

## Overview

Tezos is a self-upgrading blockchain platform that uses Liquid Proof of Stake. This implementation provides birthday-themed token creation using the **FA1.2** standard (Tezos' ERC-20 equivalent) with Michelson smart contracts.

## Why Tezos is Revolutionary

🔄 **Self-Amending**
- **No hard forks** - Upgrades automatically
- **On-chain governance** - Stakeholders vote
- **Protocol amendments** - Built-in evolution
- **Smooth upgrades** - No chain splits

📜 **Formal Verification**
- **Michelson** - Mathematically provable
- **Security** - Formally verified contracts
- **Predictable** - No surprises
- **Safety-first** - Banking-grade security

🎯 **Liquid Proof of Stake**
- **Baking** - Stake & validate
- **Delegation** - Earn without validating
- **Energy efficient** - Green blockchain
- **Decentralized** - Anyone can bake

🎨 **NFT Powerhouse**
- **Objkt** - Leading NFT marketplace
- **fxhash** - Generative art platform
- **Major art community**
- **Cultural hub**

## Features

### FA1.2 Token Standard
- Tezos' fungible token standard
- ERC-20 equivalent
- Transfer, approve, allowance
- Michelson smart contracts

### Smart Contract Languages
- **Michelson** - Low-level, formal verification
- **SmartPy** - Python-like
- **LIGO** - OCaml/ReasonML-like
- **Archetype** - Formal spec language

## Usage

```typescript
import { TezosBirthdayTokenCreator } from './XTZ.Tezos.token.birthday';

// Mainnet
const creator = new TezosBirthdayTokenCreator({ network: 'mainnet' });

// Ghostnet (testnet)
const testnetCreator = new TezosBirthdayTokenCreator({ network: 'ghostnet' });

// Private key (starts with 'edsk')
const privateKey = 'edsk...';

const result = await creator.deployToken(privateKey, {
  initials: "CS",
  birthYear: 1985,
  birthMonth: 6,
  birthDay: 15,
  fullName: "Corey Stedman",
  decimals: 0
});

console.log(`Token: ${result.tickerSymbol}`); // CS1985
console.log(`Contract: ${result.contractAddress}`);
```

## Requirements

### Minimum XTZ Balance
- **Mainnet**: 2 XTZ (~$2 at $1/XTZ)
- **Ghostnet**: 1 XTZ (free from faucet)

### Configuration
- **Initials**: 2-3 letters
- **Birth Year**: 1900 - current
- **Private Key**: edsk... format

### Dependencies
```bash
npm install @taquito/taquito @taquito/signer
```

## Network Configuration

### Mainnet
```typescript
const creator = new TezosBirthdayTokenCreator({ network: 'mainnet' });
```
- **Explorer**: https://tzkt.io
- **RPC**: https://mainnet.api.tez.ie

### Ghostnet (Testnet)
```typescript
const creator = new TezosBirthdayTokenCreator({ network: 'ghostnet' });
```
- **Explorer**: https://ghostnet.tzkt.io
- **RPC**: https://ghostnet.ecadinfra.com
- **Faucet**: https://faucet.ghostnet.teztnets.com

## Comparison: Tezos vs Others

| Feature | Tezos | Ethereum | Solana |
|---------|-------|----------|--------|
| **Upgrades** | **Self-amending** | Hard forks | Hard forks |
| **Verification** | **Formal** | None | None |
| **Governance** | **On-chain** | Off-chain | Off-chain |
| **Cost** | $1-2 | $30-90 | $0.50 |
| **Speed** | 30-60s | 12s | 0.4s |
| **NFTs** | **Major hub** | Large | Growing |

**Tezos = Only self-upgrading blockchain!**

## Cost Breakdown

### Mainnet
| Item | Cost (XTZ) | Cost (USD*) |
|------|-----------|-------------|
| Contract Deploy | 1-2 | $1-2 |
| Transfer | 0.001 | $0.001 |
| **Total** | **~1.5** | **~$1.50** |

*Based on $1/XTZ

### Ghostnet
| Item | Cost |
|------|------|
| Everything | **FREE** |

## Getting Testnet XTZ

**Ghostnet Faucet**: https://faucet.ghostnet.teztnets.com

1. Visit faucet
2. Enter address (tz1...)
3. Request funds
4. Receive instant testnet XTZ

## Troubleshooting

### "Insufficient XTZ" Error
- Need at least 2 XTZ (mainnet) or 1 XTZ (testnet)
- Get testnet XTZ from faucet

### Private Key Format Error
- Must start with 'edsk'
- Ed25519 format
- NOT the mnemonic

### Contract Deployment Failed
- Check XTZ balance
- Verify private key
- Ensure network connectivity

## Resources

### Official Tezos
- [Tezos](https://tezos.com/)
- [Tezos Docs](https://docs.tezos.com/)
- [TzKT](https://tzkt.io/) - Explorer

### Development
- [Taquito](https://tezostaquito.io/) - JS SDK
- [SmartPy](https://smartpy.io/) - Python contracts
- [LIGO](https://ligolang.org/) - ML contracts

### Wallets
- [Temple Wallet](https://templewallet.com/)
- [Kukai](https://wallet.kukai.app/)

### NFT Marketplaces
- [Objkt](https://objkt.com/)
- [fxhash](https://fxhash.xyz/)

## Why Choose Tezos?

### ✅ Use Tezos If You Want:
- **Self-amending** (no hard forks!)
- **Formal verification** (provably secure)
- **On-chain governance**
- **NFT ecosystem** (major art hub)
- **Energy efficient**
- **Smooth upgrades**

### ⚠️ Consider Other Chains If You Need:
- Faster (use Solana)
- Cheaper (use Stellar/XRP)
- Larger DeFi (use Ethereum)

**Tezos = Only blockchain that upgrades itself!** 🔄

---

Tezos provides **self-amending capabilities + formal verification + on-chain governance**, making it the only truly upgradeable blockchain! 🚀
