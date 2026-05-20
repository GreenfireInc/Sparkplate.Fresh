# Polkadot NFT Minting via IPFS Services

This directory contains NFT minting implementations for Polkadot ecosystem using various IPFS storage providers.

## Overview

These modules enable a hybrid storage approach:
- **Asset Storage**: Files stored on IPFS via various providers (fast, distributed)
- **Metadata Storage**: NFT metadata anchored on Polkadot/Kusama via RMRK standard

This provides the best of both worlds: fast IPFS retrieval with immutable Polkadot blockchain anchoring.

## Polkadot NFT Standards

All implementations follow **RMRK 2.0** (Remark-based NFT standard):
- No smart contracts required (uses system.remark extrinsics)
- Native multi-chain support (Polkadot, Kusama, parachains)
- Advanced NFT features (nested NFTs, conditional rendering, multi-resource)
- Compatible with Singular.app, KodaDot, and other RMRK marketplaces
- Also supports Unique Network parachains for NFT collections

## Available Services

### 1. Pinata (`DOT.Polkadot.nft.pinata.ts`)

Most popular IPFS pinning service with excellent reliability.

**Features:**
- Fast, reliable pinning
- 1GB free tier
- Excellent uptime
- CID management

**Usage:**

```typescript
import { PolkadotPinataNFTMinter } from './DOT.Polkadot.nft.pinata';

const minter = new PolkadotPinataNFTMinter({
  apiKey: process.env.PINATA_API_KEY!,
  apiSecret: process.env.PINATA_API_SECRET!,
});

const mnemonic = 'your 12 or 24-word polkadot mnemonic...';
const collectionId = 'my-collection-001';
const imageBuffer = fs.readFileSync('art.png');

const result = await minter.mintNFT(
  mnemonic,
  collectionId,
  imageBuffer,
  {
    name: "Polkadot Art #1",
    description: "A unique artwork on Polkadot",
    attributes: [
      { trait_type: "Rarity", value: "Legendary" }
    ]
  },
  'nft-001'
);

console.log('NFT ID:', result.nftId);
console.log('IPFS:', result.ipfsUrl);
console.log('Subscan:', result.explorerUrl);
```

### 2. Lighthouse (`DOT.Polkadot.nft.lighthouse.ts`)

Decentralized storage with encryption and Filecoin backup.

**Features:**
- Optional encryption
- Automatic Filecoin deals
- PoDSI verification
- Pay-as-you-go

### 3. Filebase (`DOT.Polkadot.nft.filebase.ts`)

S3-compatible IPFS storage with multi-region redundancy.

**Features:**
- S3-compatible API
- Geographic redundancy
- 5GB free tier
- Multiple backends

### 4. Storacha (`DOT.Polkadot.nft.storacha.ts`)

Free decentralized storage powered by IPFS and Filecoin.

**Features:**
- Free storage
- Filecoin backing
- Simple API
- Protocol Labs

### 5. Infura (`DOT.Polkadot.nft.infura.ts`)

Enterprise-grade IPFS infrastructure by ConsenSys.

**Features:**
- Enterprise reliability
- Dedicated support
- 5GB free tier
- Ethereum ecosystem

### 6. Fleek (`DOT.Polkadot.nft.fleek.ts`)

Fast IPFS storage with CDN acceleration.

**Features:**
- CDN acceleration
- Fast global delivery
- Easy integration
- Web3 infrastructure

### 7. Crust Network (`DOT.Polkadot.nft.crust.ts`) ⭐

Decentralized cloud storage built on IPFS and Polkadot (native integration!).

**Features:**
- Decentralized infrastructure
- Storage incentives
- **Native Polkadot parachain**
- Data privacy
- Perfect synergy with Polkadot NFTs

### 8. NFT.Storage (`DOT.Polkadot.nft.nftstorage.ts`)

Free NFT-specific IPFS storage backed by Filecoin.

**Features:**
- Free storage for NFTs
- Filecoin redundancy
- NFT-specific features
- Protocol Labs

## Comparison Table

| Service | Free Tier | Enterprise | CDN | Filecoin | Best For |
|---------|-----------|------------|-----|----------|----------|
| **Pinata** | 1GB | ❌ | ✅ | ❌ | General use |
| **Lighthouse** | Pay-per-use | ❌ | ❌ | ✅ | Encryption |
| **Filebase** | 5GB | ✅ | ❌ | ✅ | S3 compatibility |
| **Storacha** | Free | ❌ | ✅ | ✅ | Free storage |
| **Infura** | 5GB | ✅ | ✅ | ❌ | Enterprise |
| **Fleek** | Free tier | ❌ | ✅ | ❌ | CDN acceleration |
| **Crust** ⭐ | Pay-per-use | ❌ | ❌ | Via Polkadot | Native Polkadot |
| **NFT.Storage** | Free | ❌ | ✅ | ✅ | NFT-specific |

## Cost Breakdown

### IPFS Storage Costs
- **Pinata**: Free tier (1GB), then ~$0.15/GB/month
- **Lighthouse**: ~$0.0002/GB/month
- **Filebase**: Free tier (5GB), then $5.99/month for 1TB
- **Storacha**: Free tier
- **Infura**: Free tier (5GB), then paid
- **Fleek**: Free tier, then paid
- **Crust**: ~$0.10/GB/month (paid in CRU tokens)
- **NFT.Storage**: Free for NFTs

### Polkadot Blockchain Costs
- **Transaction Fee**: ~0.01 DOT (~$0.10 USD at $10/DOT)
- **Kusama Fee**: ~0.001 KSM (~$0.03 USD at $30/KSM)
- **Existential Deposit**: 1 DOT minimum account balance

**Total Cost Per NFT**: ~0.01 DOT + IPFS storage costs

## Features

### RMRK 2.0 Compliance
All implementations follow the RMRK 2.0 standard:
- Uses `system.remark` extrinsic for NFT operations
- RMRK operation format: `RMRK::MINT::2.0.0::{json}`
- No smart contracts required
- Multi-chain by default (works on Polkadot, Kusama, parachains)
- Advanced features:
  - Nested NFTs (NFTs owning NFTs)
  - Multi-resource NFTs (same NFT, different representations)
  - Conditional rendering
  - On-chain emotes/reactions

### Media NFTs
Support for video/audio NFTs with thumbnails:

```typescript
const mediaResult = await minter.mintMediaNFT(
  mnemonic,
  collectionId,
  videoBuffer,
  thumbnailBuffer,
  {
    name: "Video NFT #1",
    description: "An epic video",
    attributes: []
  },
  'nft-001',
  {
    mediaOptions: { fileName: 'video.mp4' },
    thumbnailOptions: { fileName: 'thumb.jpg' }
  }
);
```

### Balance Checking
All implementations include balance checking:

```typescript
const balance = await minter.checkBalance(mnemonic);
console.log(`Balance: ${balance.balanceDOT} DOT`);
console.log(`Address: ${balance.address}`);
```

## Polkadot-Specific Considerations

### Multi-Chain Ecosystem
- **Relay Chain**: Polkadot mainnet
- **Kusama**: Polkadot's canary network (wild cousin)
- **Parachains**: 
  - Moonbeam (EVM-compatible)
  - Unique Network (NFT-specific)
  - Astar (Smart contracts + DeFi)
  - Acala (DeFi hub)

### Network Selection
All implementations support multiple networks:

```typescript
// Polkadot mainnet
const minter1 = new PolkadotPinataNFTMinter(
  config,
  'wss://rpc.polkadot.io',
  'polkadot'
);

// Kusama
const minter2 = new PolkadotPinataNFTMinter(
  config,
  'wss://kusama-rpc.polkadot.io',
  'kusama'
);

// Moonbeam parachain
const minter3 = new PolkadotPinataNFTMinter(
  config,
  'wss://wss.api.moonbeam.network',
  'moonbeam'
);
```

### Explorer URLs
- **Polkadot**: `https://polkadot.subscan.io/extrinsic/{txHash}`
- **Kusama**: `https://kusama.subscan.io/extrinsic/{txHash}`
- **Moonbeam**: `https://moonbeam.subscan.io/extrinsic/{txHash}`
- **Unique**: `https://unique.subscan.io/extrinsic/{txHash}`

### Cryptographic Schemes
- **sr25519** (Schnorrkel): Primary signing scheme, used by default
- **ed25519**: Alternative scheme for compatibility
- Supports both via `@polkadot/api`

### SS58 Address Format
- Addresses use SS58 encoding with network-specific prefixes
- Polkadot addresses start with `1`
- Kusama addresses start with letters (e.g., `D`, `E`, `F`, `G`, `H`)
- Same account, different address format per network

## Security Best Practices

1. **Never commit mnemonics** to version control
2. Use **environment variables** for API keys
3. Store mnemonics in **secure vaults** (Polkadot.js browser extension recommended)
4. Enable **2FA** on IPFS provider accounts
5. Use **dedicated wallets** for minting
6. Maintain **existential deposit** (1 DOT minimum)
7. Test on **Kusama or Westend** testnet before mainnet

## Common Issues

### Issue: Insufficient Balance
**Solution**: Maintain at least 1.01 DOT (existential deposit + fees)

### Issue: Transaction Failed
**Solution**: Check network connection, verify mnemonic, ensure sufficient balance

### Issue: IPFS Upload Timeout
**Solution**: Increase timeout, check file size, verify API credentials

### Issue: Invalid Mnemonic
**Solution**: Verify 12 or 24-word BIP39 mnemonic

### Issue: Address Format Mismatch
**Solution**: Use correct SS58 prefix for target network

## Resources

- [Polkadot Documentation](https://wiki.polkadot.network/)
- [RMRK 2.0 Specification](https://docs.rmrk.app/)
- [Polkadot.js API](https://polkadot.js.org/docs/)
- [Subscan Explorer](https://polkadot.subscan.io/)
- [Singular.app](https://singular.app/) - RMRK marketplace
- [KodaDot](https://kodadot.xyz/) - Multi-chain NFT marketplace
- [Unique Network](https://unique.network/) - NFT parachain
- [IPFS Documentation](https://docs.ipfs.io/)

## RMRK Marketplaces

- **Singular.app**: Primary RMRK 2.0 marketplace
- **KodaDot**: Multi-chain NFT platform (Polkadot, Kusama, BSC, etc.)
- **RMRK Tools**: Official RMRK explorer and tools

## Examples

See the usage examples in each implementation file for complete code samples.

## Support

For issues or questions:
- Polkadot: [Polkadot Forum](https://forum.polkadot.network/)
- RMRK: [RMRK Discord](https://discord.gg/rmrk)
- IPFS: Provider-specific support channels

## License

See project root LICENSE file.
