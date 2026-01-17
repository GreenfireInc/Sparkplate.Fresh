# Stacks NFT Minting via IPFS Services

This directory contains NFT minting implementations for Stacks (STX), a Bitcoin Layer 2 blockchain using various IPFS storage providers.

## Overview

Stacks brings smart contracts and decentralized applications to Bitcoin. These modules enable a hybrid storage approach:
- **Asset Storage**: Files stored on IPFS via various providers (fast, distributed)
- **Metadata Storage**: NFT metadata anchored on Stacks blockchain via Clarity smart contracts

## Stacks NFT Standards

All implementations follow **SIP-009** (Stacks Improvement Proposal 009):
- Clarity smart contract based NFTs
- Bitcoin-secured finality
- On-chain metadata URI
- Transfer and ownership functions
- Compatible with Gamma.io, Tradeport, and other marketplaces

## What Makes Stacks Unique

**Stacks is the ONLY blockchain that enables smart contracts secured by Bitcoin.**

### Bitcoin Layer 2
- **Anchored to Bitcoin**: Every Stacks block is hashed to Bitcoin
- **Bitcoin Finality**: Transactions inherit Bitcoin's security
- **No Bridge**: Direct connection to Bitcoin
- **Read Bitcoin State**: Smart contracts can read Bitcoin transactions

### Proof of Transfer (PoX)
- **Revolutionary Consensus**: Miners send BTC to STX holders
- **Stacking**: Lock STX, earn BTC yield (~6-10% APY)
- **No New Mining**: Reuses Bitcoin's mining power
- **Eco-Friendly**: No additional energy consumption

### Clarity Smart Contracts
- **Decidable Language**: Eliminates entire classes of bugs
- **No Reentrancy**: By design impossible
- **Visible Logic**: What you see is what executes
- **Post-Conditions**: Built-in security checks

## Available Services

All 8 IPFS providers are supported. See individual files for detailed documentation.

## Cost Breakdown

### IPFS Storage Costs
Same as other chains (see individual provider documentation).

### Stacks Blockchain Costs
- **Contract Deploy**: ~1-2 STX (one-time, ~$1-2 USD)
- **NFT Mint**: ~0.01-0.05 STX (~$0.01-0.05 USD)
- **Transaction Fee**: Dynamic based on network congestion
- **Typical Total**: ~0.05 STX (~$0.05 USD)

**Total Cost Per NFT**: ~0.05 STX (~$0.05 USD at $1/STX) + IPFS storage costs

## Features

✅ SIP-009 compliant (Stacks NFT standard)
✅ Support for image NFTs
✅ Support for video/audio NFTs with thumbnails
✅ Balance checking functionality
✅ Mainnet and testnet support
✅ Clarity smart contract integration
✅ **Bitcoin-secured finality**
✅ **Proof of Transfer consensus**
✅ **Clarity decidable language**
✅ **No reentrancy attacks**
✅ **Read Bitcoin state**
✅ **BNS (.btc domains)**
✅ **Stacking (earn BTC yield)**

## Stacks-Specific Considerations

### Network Selection

```typescript
// Mainnet
const minter1 = new StacksPinataNFTMinter(
  config,
  'mainnet'
);

// Testnet
const minter2 = new StacksPinataNFTMinter(
  config,
  'testnet'
);
```

### Explorer URLs
- **Mainnet**: `https://explorer.stacks.co/txid/{txId}`
- **Testnet**: `https://explorer.stacks.co/txid/{txId}?chain=testnet`

### Private Key Formats

Stacks supports multiple private key formats:

```typescript
// 64-character hex (32 bytes)
const hexKey = '5a8d9f2c3b1e4a7d8e9f0c1b2a3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d';

// 24-word BIP39 mnemonic
const mnemonic = 'word1 word2 ... word24';
```

### Address Formats
- **c32check Encoding**: Stacks-specific encoding (not Base58)
- **Mainnet Prefix**: `SP` (e.g., `SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7`)
- **Testnet Prefix**: `ST` (e.g., `ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM`)

### NFT Marketplaces
- **Gamma.io**: Primary Stacks NFT marketplace
- **Tradeport**: Multi-chain marketplace (includes Stacks)
- **STXNFT**: Early Stacks NFT marketplace
- **Byzantion**: Curated Stacks art platform

### Wallets
- **Leather Wallet**: Official Stacks wallet (formerly Hiro)
- **Xverse**: Popular Stacks + Bitcoin wallet
- **Stacks Web Wallet**: Browser-based wallet
- **Asigna**: Multi-sig Stacks wallet

### Clarity Smart Contract Example

```clarity
;; SIP-009 NFT Contract Example
(define-non-fungible-token my-nft uint)

(define-public (mint (token-id uint) (metadata (string-ascii 256)))
  (let ((minter tx-sender))
    (try! (nft-mint? my-nft token-id minter))
    (ok token-id)))

(define-read-only (get-owner (token-id uint))
  (ok (nft-get-owner? my-nft token-id)))

(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) (err u403))
    (nft-transfer? my-nft token-id sender recipient)))
```

## Stacks Architecture

### How Stacks Connects to Bitcoin

1. **Block Production**: Stacks miners produce blocks every ~10 minutes
2. **Bitcoin Anchor**: Each Stacks block hash is written to Bitcoin
3. **Finality**: Once confirmed on Bitcoin, Stacks block is final
4. **State Sync**: All Stacks nodes verify Bitcoin anchor

### Proof of Transfer (PoX) Flow

1. **Mining**: Miners bid BTC to mine Stacks blocks
2. **Winning**: Highest BTC bid wins the block
3. **Distribution**: Winning BTC goes to STX Stackers
4. **Stacking**: STX holders lock tokens for 2 weeks, earn BTC

### Clarity vs Solidity

| Feature | Clarity (Stacks) | Solidity (Ethereum) |
|---------|------------------|---------------------|
| **Decidability** | Yes | No |
| **Reentrancy** | Impossible | Possible (risky) |
| **Visibility** | Complete | Hidden (bytecode) |
| **Bugs** | Fewer classes | More classes |
| **Learning Curve** | Steeper | Gentler |
| **Execution** | Interpreted | Compiled to bytecode |

## Usage Example

```typescript
import { StacksPinataNFTMinter } from './STX.Stacks.nft.pinata';
import fs from 'fs';

const minter = new StacksPinataNFTMinter(
  {
    apiKey: process.env.PINATA_API_KEY!,
    apiSecret: process.env.PINATA_API_SECRET!,
  },
  'mainnet'
);

// Mint NFT
const imageData = fs.readFileSync('artwork.png');
const result = await minter.mintNFT(
  process.env.STX_PRIVATE_KEY!, // Hex or mnemonic
  'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7', // Contract address
  'my-nft-contract', // Contract name
  imageData,
  {
    name: 'My Stacks NFT',
    description: 'Secured by Bitcoin',
    attributes: [
      { trait_type: 'Rarity', value: 'Legendary' },
      { trait_type: 'Bitcoin Block', value: '800000' },
    ],
  },
  '1', // Token ID
  { fileName: 'artwork.png' }
);

console.log('Token ID:', result.tokenId);
console.log('Contract:', result.contractAddress);
console.log('Explorer:', result.explorerUrl);
console.log('IPFS:', result.ipfsUrl);
```

## Security Best Practices

1. **Never commit private keys** to version control
2. Use **environment variables** for API keys
3. Store private keys in **secure vaults** (Leather recommended)
4. Enable **2FA** on IPFS provider accounts
5. Use **dedicated wallets** for minting
6. Test on **testnet** before mainnet
7. **Verify Clarity contracts** before deployment
8. **Use post-conditions** for security
9. **Understand Clarity** (decidable = safer)
10. **Stack your STX** to earn BTC yield

## Common Issues

### Issue: Insufficient Balance
**Solution**: Maintain at least 0.5 STX for contract deployment + minting

### Issue: Transaction Failed
**Solution**: Check network connection, verify private key, ensure sufficient balance

### Issue: IPFS Upload Timeout
**Solution**: Increase timeout, check file size, verify API credentials

### Issue: Invalid Private Key Format
**Solution**: Verify key format (64-char hex or 24-word mnemonic)

### Issue: Contract Not Found
**Solution**: Ensure contract is deployed on the network (mainnet vs testnet)

### Issue: Post-Condition Failed
**Solution**: Review post-conditions in your Clarity contract

## Stacking (Earn BTC Yield)

**Stacking** is Stacks' unique feature - lock STX to earn BTC:

### How It Works
1. **Lock STX**: Commit STX for reward cycles (2 weeks each)
2. **Earn BTC**: Receive BTC from miners
3. **APY**: Historically ~6-10% APY in BTC
4. **Unlock**: STX unlocks after chosen cycles

### Stacking Requirements
- **Minimum**: 100,000 STX (or pool with others)
- **Duration**: Minimum 1 cycle (2 weeks)
- **BTC Address**: Need Bitcoin address for rewards
- **Timing**: Must commit before cycle starts

### Stacking Pools
- **Xverse Pool**: Built into Xverse wallet
- **Planbetter**: Popular stacking pool
- **Friedger Pool**: Community-run pool
- **Fast Pool**: Liquid stacking option

## Bitcoin Name System (BNS)

Stacks includes **.btc domains**:

### Features
- **On Bitcoin**: Names anchored to Bitcoin
- **Decentralized**: No company controls .btc
- **Permanent**: Buy once, own forever
- **Subdomains**: Create unlimited subdomains

### Example
```typescript
// Resolve .btc name
const address = await resolveUsername('alice.btc');
// Returns: SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7
```

## Nakamoto Upgrade

**Upcoming major upgrade** (2024-2025):

### Features
- **Faster Blocks**: ~5 second blocks (vs 10 minutes)
- **100% Bitcoin Finality**: Every transaction final on Bitcoin
- **sBTC**: Trustless Bitcoin DeFi
- **MEV Resistance**: Built-in MEV protection

### Impact on NFTs
- **Faster Minting**: 5 second confirmations
- **Same Security**: Still Bitcoin-secured
- **More Activity**: Expected NFT volume increase

## Resources

- [Stacks Official Site](https://stacks.org/)
- [Stacks Explorer](https://explorer.stacks.co/)
- [Clarity Documentation](https://docs.stacks.co/clarity)
- [SIP-009 NFT Standard](https://github.com/stacksgov/sips/blob/main/sips/sip-009/sip-009-nft-standard.md)
- [Gamma.io](https://gamma.io/) - Primary NFT marketplace
- [Leather Wallet](https://leather.io/) - Official wallet
- [Xverse](https://www.xverse.app/) - Popular wallet
- [Stacking Documentation](https://stacking.club/)
- [IPFS Documentation](https://docs.ipfs.io/)

## Why Stacks for NFTs?

### Advantages
✅ **Bitcoin Security**: Inherit Bitcoin's $1T+ security budget
✅ **Low Fees**: ~$0.05 per mint (vs $50+ on Ethereum)
✅ **Clarity Safety**: Decidable language eliminates bug classes
✅ **Stacking Yield**: Earn BTC while holding STX
✅ **BNS Integration**: Native .btc domain support
✅ **Growing Ecosystem**: Increasing NFT activity
✅ **Nakamoto Upgrade**: 5-second blocks coming

### Considerations
⚠️ **Smaller Ecosystem**: Less than Ethereum/Solana
⚠️ **Learning Curve**: Clarity is different from Solidity
⚠️ **Slower Blocks**: 10 min currently (5s after Nakamoto)
⚠️ **Market Size**: Smaller NFT trading volume
⚠️ **Tool Maturity**: Fewer developer tools

## The Stacks Philosophy

**"Bringing Bitcoin to Web3"**

Stacks believes Bitcoin should be more than digital gold - it should power the decentralized internet. By anchoring to Bitcoin instead of competing with it, Stacks enables smart contracts while maintaining Bitcoin's security and decentralization.

**Key Principles:**
- **Bitcoin First**: Use Bitcoin's security, don't replace it
- **Decidability**: Smart contracts should be provably correct
- **True Decentralization**: No company should control the chain
- **Sustainable**: Reuse Bitcoin's PoW, don't create new waste

## License

See project root LICENSE file.
