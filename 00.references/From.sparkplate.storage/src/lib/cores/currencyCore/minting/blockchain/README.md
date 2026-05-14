# Direct Blockchain NFT Minting

Direct NFT minting to blockchain with permanent on-chain storage (no IPFS).

## Overview

This directory contains implementations for minting NFTs directly to blockchain networks without using IPFS or external storage services. Everything (file + metadata) is stored directly on-chain.

### Available Blockchains

#### Arweave (AR)
Direct minting to Arweave blockchain with 200+ year permanence guarantee.

## Key Features

- **100% Arweave Storage:** No IPFS, no external services
- **True Permanence:** 200+ year storage guarantee
- **Pay Once, Store Forever:** No recurring fees
- **Immutable:** Content cannot be changed or deleted
- **Cost Estimation:** Preview costs before minting
- **Transaction Tracking:** Monitor confirmation status
- **All File Types:** Images, videos, audio, documents, 3D models, archives

## Implementation

### File: `AR.Arweave.nft.arweaveDirect.ts`

**Class:** `ArweaveDirectNFTMinter`

**Key Methods:**
- `mintNFT()` - Mint single file NFT
- `mintMediaNFT()` - Mint media NFT with thumbnail
- `estimateCost()` - Preview minting costs
- `checkTransactionStatus()` - Monitor confirmations
- `checkBalance()` - Check wallet balance
- `getTransaction()` - Get transaction details
- `getTransactionTags()` - View NFT metadata tags

## Usage Example

```typescript
import { ArweaveDirectNFTMinter } from './AR.Arweave.nft.arweaveDirect';
import * as fs from 'fs';

const minter = new ArweaveDirectNFTMinter({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
});

const privateKey = JSON.parse(fs.readFileSync('wallet.json', 'utf-8'));
const imageData = fs.readFileSync('art.png');

// Check balance
const balance = await minter.checkBalance(privateKey);
console.log(`Balance: ${balance.balanceAR} AR`);

// Estimate cost
const cost = await minter.estimateCost(imageData);
console.log(`Estimated cost: ${cost.ar} AR`);

// Mint NFT
const result = await minter.mintNFT(
  privateKey,
  imageData,
  'art.png',
  {
    name: "Permanent Art #1",
    description: "Stored permanently on Arweave",
    attributes: [
      { trait_type: "Rarity", value: "Legendary" },
      { trait_type: "Storage", value: "Permanent" }
    ]
  },
  {
    tags: [
      { name: 'Collection', value: 'My Collection' },
      { name: 'Creator', value: 'Artist Name' }
    ]
  }
);

console.log('NFT Minted!');
console.log('File TX:', result.fileUrl);
console.log('Metadata TX:', result.metadataUrl);
console.log('Total cost:', result.totalCost.totalAR, 'AR');

// Check confirmation status
const status = await minter.checkTransactionStatus(result.fileTransactionId);
console.log('Confirmed:', status.confirmed);
console.log('Confirmations:', status.confirmations);
```

## Media NFT Example

```typescript
const videoData = fs.readFileSync('animation.mp4');
const thumbnailData = fs.readFileSync('thumbnail.jpg');

const mediaResult = await minter.mintMediaNFT(
  privateKey,
  videoData,
  'animation.mp4',
  thumbnailData,
  'thumbnail.jpg',
  {
    name: "Animated Art #1",
    description: "Permanent animation on Arweave",
    attributes: [
      { trait_type: "Duration", value: "10s" },
      { trait_type: "Type", value: "Animation" }
    ]
  }
);
```

## Supported File Types

### Images
- PNG, JPG, JPEG, GIF, SVG, WebP, AVIF, BMP, ICO

### Videos
- MP4, WebM, MOV, AVI, MKV, FLV

### Audio
- MP3, WAV, OGG, FLAC, M4A, AAC

### Documents
- PDF, DOC, DOCX, TXT, MD, HTML, CSS, JS, JSON, XML

### 3D Models
- GLB, GLTF, OBJ, FBX, STL

### Archives
- ZIP, RAR, TAR, GZ

## Cost Structure

- **File Upload:** ~0.0001-0.01 AR per MB (one-time)
- **Metadata Upload:** ~0.005-0.01 AR per transaction
- **Total per NFT:** ~0.01-0.02 AR (depending on file size)
- **Recurring Fees:** None - pay once, store forever

## Atomic NFT Standard

All minted NFTs follow the Atomic NFT standard with proper tags:

```typescript
{
  'Content-Type': 'application/json',
  'App-Name': 'Atomic-NFT',
  'Type': 'nft-metadata',
  'Title': metadata.name,
  'Description': metadata.description,
  'Image-TX': fileTransactionId,
  'Animation-TX': animationTransactionId // if media NFT
}
```

## Comparison: IPFS vs Direct Arweave

| Feature | IPFS + Arweave | Direct Arweave |
|---------|----------------|----------------|
| **Storage** | IPFS (fast) + Arweave (metadata) | 100% Arweave |
| **Permanence** | Depends on IPFS pinning | 200+ year guarantee |
| **Recurring Fees** | Yes (IPFS pinning) | No |
| **Speed** | Fast (IPFS CDN) | Gateway-dependent |
| **Simplicity** | Two services | One service |
| **Immutability** | Metadata only | File + Metadata |
| **Cost** | IPFS fees + AR | AR only |

## Dependencies

```bash
npm install arweave
```

## Configuration Options

```typescript
{
  host?: string;        // Default: 'arweave.net'
  port?: number;        // Default: 443
  protocol?: string;    // Default: 'https'
  timeout?: number;     // Default: 60000
  logging?: boolean;    // Default: false
}
```

## Benefits

1. **True Permanence:** 200+ year storage guarantee
2. **No Recurring Costs:** Pay once, store forever
3. **Complete Immutability:** File and metadata cannot be changed
4. **No Dependencies:** No reliance on external services
5. **Cost Transparency:** Estimate costs before minting
6. **Transaction Tracking:** Monitor confirmation status
7. **Marketplace Compatible:** Atomic NFT standard

## When to Use

### Use Direct Arweave When:
- Permanence is critical
- No recurring fees desired
- Complete immutability required
- Simplicity preferred (one service)
- File size is reasonable (< 10MB)

### Use IPFS + Arweave When:
- Fast retrieval is critical
- Large files (> 10MB)
- CDN distribution needed
- Existing IPFS infrastructure
- Cost-sensitive for large files

## Future Implementations

This directory is designed to accommodate direct blockchain minting for multiple chains:

- **Arweave (AR):** ✅ Implemented
- **Solana (SOL):** Coming soon
- **Ethereum (ETH):** Coming soon
- **Bitcoin (BTC):** Ordinals/Inscriptions
- **Others:** As needed

## Related Implementations

- **IPFS Minting:** `../ipfs/AR.Arweave/`
- **Token Minting:** `../../token/AR.Arweave/`
- **Distribution Engines:** `../../distributionEngines/AR.Arweave/`
- **Block Explorers:** `../../blockchainAPIs/AR.Arweave/`
- **Oracles:** `../../oracles/AR.Arweave/`
- **DEXs:** `../../DEXs/AR.Arweave/`

## Support

For issues or questions:
1. Check transaction status with `checkTransactionStatus()`
2. Verify wallet balance with `checkBalance()`
3. Review transaction tags with `getTransactionTags()`
4. Check ViewBlock explorer for transaction details

