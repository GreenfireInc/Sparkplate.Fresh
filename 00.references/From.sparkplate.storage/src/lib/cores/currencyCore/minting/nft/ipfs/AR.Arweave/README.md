# Arweave NFT Minting via IPFS Services

This directory contains NFT minting implementations for Arweave using various IPFS storage providers.

## Overview

These modules enable a hybrid storage approach:
- **Asset Storage**: Files stored on IPFS via various providers (fast, distributed)
- **Metadata Storage**: NFT metadata permanently stored on Arweave (immutable, permanent)

This provides the best of both worlds: fast IPFS retrieval with permanent Arweave anchoring.

## Available Services

### 1. Pinata (`AR.Arweave.nft.pinata.ts`)

Most popular IPFS pinning service with excellent reliability and speed.

**Features:**
- Fast, reliable pinning
- Generous free tier (1GB storage, unlimited gateways)
- Excellent uptime
- CID management tools

**Usage:**

```typescript
import { ArweavePinataNFTMinter } from './AR.Arweave.nft.pinata';

const minter = new ArweavePinataNFTMinter({
  apiKey: process.env.PINATA_API_KEY!,
  apiSecret: process.env.PINATA_API_SECRET!,
});

const result = await minter.mintNFT(
  privateKey,
  imageBuffer,
  {
    name: "My NFT #1",
    description: "A unique digital artwork",
    attributes: [
      { trait_type: "Rarity", value: "Legendary" }
    ]
  }
);
```

### 2. Lighthouse (`AR.Arweave.nft.lighthouse.ts`)

Decentralized storage with encryption and Filecoin backup.

**Features:**
- Optional encryption
- Automatic Filecoin deals
- PoDSI verification
- Pay-as-you-go pricing

**Usage:**

```typescript
import { ArweaveLighthouseNFTMinter } from './AR.Arweave.lighthouse.nft';

const minter = new ArweaveLighthouseNFTMinter({
  apiKey: process.env.LIGHTHOUSE_API_KEY!,
});

const result = await minter.mintNFT(
  privateKey,
  imageBuffer,
  'artwork.png',
  {
    name: "Digital Art #1",
    description: "Encrypted masterpiece",
    attributes: []
  }
);
```

### 3. Filebase (`AR.Arweave.nft.filebase.ts`)

S3-compatible IPFS storage with multi-region redundancy.

**Features:**
- S3-compatible API
- Geographic redundancy
- 5GB free tier
- Multiple storage backends

**Usage:**

```typescript
import { ArweaveFilebaseNFTMinter } from './AR.Arweave.nft.filebase';

const minter = new ArweaveFilebaseNFTMinter({
  accessKeyId: process.env.FILEBASE_ACCESS_KEY!,
  secretAccessKey: process.env.FILEBASE_SECRET_KEY!,
  bucket: 'my-nft-bucket',
});

const result = await minter.mintNFT(
  privateKey,
  imageBuffer,
  'art.png',
  {
    name: "Geo-Redundant NFT #1",
    description: "Multi-region storage",
    attributes: []
  }
);
```

### 4. Storacha (`AR.Arweave.nft.storacha.ts`)

Free decentralized storage (formerly web3.storage).

**Features:**
- Free storage (5GB+)
- Filecoin redundancy
- UCAN authentication
- Zero API keys needed

**Usage:**

```typescript
import { ArweaveStorachaNFTMinter } from './AR.Arweave.nft.storacha';

const minter = new ArweaveStorachaNFTMinter({
  email: '[email protected]',
});

const result = await minter.mintNFT(
  privateKey,
  imageBuffer,
  'art.png',
  {
    name: "Free Storage NFT #1",
    description: "Stored on Storacha",
    attributes: []
  }
);
```

### 5. Infura (`AR.Arweave.nft.infura.ts`)

Enterprise-grade IPFS infrastructure by ConsenSys.

**Features:**
- Enterprise reliability
- Dedicated gateways available
- 5GB free tier
- Ethereum ecosystem integration

**Usage:**

```typescript
import { ArweaveInfuraNFTMinter } from './AR.Arweave.nft.infura';

const minter = new ArweaveInfuraNFTMinter({
  projectId: process.env.INFURA_PROJECT_ID!,
  projectSecret: process.env.INFURA_PROJECT_SECRET!,
});

const result = await minter.mintNFT(
  privateKey,
  imageBuffer,
  'art.png',
  {
    name: "Enterprise NFT #1",
    description: "Enterprise-grade storage",
    attributes: []
  }
);
```

### 6. Fleek (`AR.Arweave.nft.fleek.ts`)

Web3 infrastructure with CDN integration.

**Features:**
- Global CDN distribution
- Fast delivery
- Developer-friendly SDK
- Integrated hosting

**Usage:**

```typescript
import { ArweaveFleekNFTMinter } from './AR.Arweave.nft.fleek';

const minter = new ArweaveFleekNFTMinter({
  accessToken: process.env.FLEEK_ACCESS_TOKEN!,
});

const result = await minter.mintNFT(
  privateKey,
  imageBuffer,
  'art.png',
  {
    name: "CDN NFT #1",
    description: "Global CDN delivery",
    attributes: []
  }
);
```

### 7. Crust Network (`AR.Arweave.nft.crust.ts`)

Decentralized IPFS storage with token incentives.

**Features:**
- Decentralized pinning network
- CRU token incentivized storage
- Pinning Services API compatible
- Multiple gateway options

**Usage:**

```typescript
import { ArweaveCrustNFTMinter } from './AR.Arweave.nft.crust';

const minter = new ArweaveCrustNFTMinter({
  apiEndpoint: 'https://gw-seattle.crustcloud.io', // Optional
  gatewayUrl: 'https://ipfs-gw.crust.network/ipfs', // Optional
});

const result = await minter.mintNFT(
  privateKey,
  imageBuffer,
  'art.png',
  {
    name: "Decentralized NFT #1",
    description: "Stored on Crust Network",
    attributes: [
      { trait_type: "Storage", value: "Crust Network" }
    ]
  }
);

// Pin existing content
await minter.pinCID('QmExampleCID...');
const pins = await minter.listPins();
```

### 8. NFT.Storage (`AR.Arweave.nft.nftstorage.ts`)

Free NFT-specific storage by Protocol Labs.

**Features:**
- Free permanent storage for NFTs
- Filecoin redundancy built-in
- NFT-optimized workflow
- Protocol Labs infrastructure

**Usage:**

```typescript
import { ArweaveNFTStorageMinter } from './AR.Arweave.nft.nftstorage';

const minter = new ArweaveNFTStorageMinter({
  apiToken: process.env.NFT_STORAGE_TOKEN!,
});

const result = await minter.mintNFT(
  privateKey,
  imageBuffer,
  'art.png',
  {
    name: "Free NFT Storage #1",
    description: "Stored on NFT.Storage with Filecoin",
    attributes: [
      { trait_type: "Storage", value: "NFT.Storage" },
      { trait_type: "Backup", value: "Filecoin" }
    ]
  }
);

// Check storage status
const status = await minter.checkStatus(result.ipfsCid);
```

**Note:** NFT.Storage Classic API was decommissioned June 30, 2024. This implementation uses the current API where available.

## Direct Blockchain Minting

For direct blockchain minting without IPFS (100% on-chain permanent storage), see:

**Location:** `src/components/currencyCore/minting/nft/blockchain/`  
**File:** `AR.Arweave.nft.arweaveDirect.ts`  
**Class:** `ArweaveDirectNFTMinter`

**Key Differences:**
- No IPFS - 100% blockchain storage
- 200+ year permanence guarantee (Arweave)
- Pay once, store forever (no recurring fees)
- Cost estimation before minting
- Transaction status tracking

## Supported File Types

All implementations support:

### Images
- PNG, JPG, JPEG
- GIF (animated)
- SVG (vector)
- WebP
- AVIF

### Videos
- MP4, WebM, MOV
- AVI, MKV
- With thumbnail support

### Audio
- MP3, WAV, FLAC
- OGG, M4A
- With cover art support

### Documents
- PDF
- Text files
- JSON

### 3D Models
- GLB, GLTF
- OBJ, FBX

## Common Features

### NFT Metadata Standard

All implementations follow the standard NFT metadata format:

```typescript
{
  name: string;              // NFT name
  description: string;       // Description
  image: string;             // IPFS CID or URL
  animation_url?: string;    // For videos/audio
  external_url?: string;     // Website link
  attributes: Array<{        // Traits
    trait_type: string;
    value: string | number;
  }>;
  properties?: Record<string, any>;
}
```

### Mint Result

All methods return consistent result format:

```typescript
{
  ipfsCid: string;           // IPFS CID of uploaded file
  ipfsUrl: string;           // Gateway URL to file
  metadataCid: string;       // IPFS CID of metadata JSON
  metadataUrl: string;       // Gateway URL to metadata
  arweaveTxId: string;       // Arweave transaction ID
  arweaveUrl: string;        // Arweave URL
  viewBlockUrl: string;      // ViewBlock explorer URL
}
```

## Cost Comparison

| Service | Storage | Retrieval | Free Tier | Notes |
|---------|---------|-----------|-----------|-------|
| **Pinata** | Free/Paid | Free | 1GB | Most popular, reliable |
| **Lighthouse** | Pay-as-you-go | Free | Trial | Encryption, Filecoin backup |
| **Filebase** | Paid | Free | 5GB | S3-compatible |
| **Storacha** | Free | Free | 5GB+ | Web3.storage successor |
| **Infura** | Paid | Paid | 5GB | Enterprise-grade |
| **Fleek** | Free/Paid | Free | Yes | CDN integration |
| **Crust** | Pay with CRU | Free | Pay-per-use | Decentralized, incentivized |
| **NFT.Storage** | Free | Free | Free | NFT-specific, Filecoin backup |

**IPFS + Arweave cost**: ~0.005-0.01 AR per NFT metadata transaction + IPFS fees

For direct blockchain minting (no IPFS): See `../blockchain/` directory

## Installation

### Required Dependencies

```bash
# Core
npm install arweave axios form-data

# Pinata
npm install @pinata/sdk

# Lighthouse
npm install @lighthouse-web3/sdk

# Filebase
npm install @filebase/sdk

# Storacha
npm install @storacha/client

# Infura & Crust (both use kubo-rpc-client)
npm install kubo-rpc-client

# Fleek
npm install @fleek-platform/sdk

# NFT.Storage
npm install nft.storage
```

## Quick Start

### 1. Get API Keys

- **Pinata**: https://app.pinata.cloud/keys
- **Lighthouse**: https://files.lighthouse.storage/
- **Filebase**: https://console.filebase.com/
- **Storacha**: https://storacha.network/
- **Infura**: https://infura.io/
- **Fleek**: https://fleek.co/
- **Crust Network**: https://crust.network/
- **NFT.Storage**: https://nft.storage/

### 2. Get Arweave Wallet

Generate at https://arweave.app or using CLI:

```bash
npm install -g arweave
arweave key-create wallet.json
```

### 3. Fund Wallet

Get AR tokens from an exchange or faucet (testnet).

### 4. Mint NFT

```typescript
import { ArweavePinataNFTMinter } from '@/components/currencyCore/minting/nft/ipfs/AR.Arweave';
import * as fs from 'fs';

const minter = new ArweavePinataNFTMinter({
  apiKey: process.env.PINATA_API_KEY!,
  apiSecret: process.env.PINATA_API_SECRET!,
});

const privateKey = JSON.parse(fs.readFileSync('wallet.json', 'utf-8'));
const imageData = fs.readFileSync('art.png');

const result = await minter.mintNFT(privateKey, imageData, {
  name: "My First NFT",
  description: "A unique piece of digital art",
  attributes: [
    { trait_type: "Type", value: "Art" },
    { trait_type: "Year", value: 2025 }
  ]
});

console.log('NFT Minted!');
console.log('View on IPFS:', result.ipfsUrl);
console.log('View on Arweave:', result.arweaveUrl);
```

## Advanced Usage

### Video NFT with Thumbnail

```typescript
const videoData = fs.readFileSync('animation.mp4');
const thumbnailData = fs.readFileSync('thumbnail.jpg');

const result = await minter.mintMediaNFT(
  privateKey,
  videoData,
  thumbnailData,
  {
    name: "Epic Animation",
    description: "A 3D animated masterpiece",
    attributes: [
      { trait_type: "Duration", value: "30s" },
      { trait_type: "Resolution", value: "4K" }
    ]
  }
);
```

### Encrypted NFT (Lighthouse)

```typescript
import { ArweaveLighthouseNFTMinter } from './AR.Arweave.lighthouse.nft';

const minter = new ArweaveLighthouseNFTMinter({
  apiKey: process.env.LIGHTHOUSE_API_KEY!,
});

const encryptedResult = await minter.uploadEncryptedFile(
  fileBuffer,
  'private-content.png',
  publicKey // Recipient's public key
);
```

### Batch Minting

```typescript
const files = [
  { path: 'art1.png', name: 'Art #1' },
  { path: 'art2.png', name: 'Art #2' },
  { path: 'art3.png', name: 'Art #3' },
];

const results = await Promise.all(
  files.map(async (file) => {
    const data = fs.readFileSync(file.path);
    return await minter.mintNFT(privateKey, data, {
      name: file.name,
      description: `Unique artwork ${file.name}`,
      attributes: []
    });
  })
);
```

## Error Handling

```typescript
try {
  const result = await minter.mintNFT(privateKey, imageData, metadata);
  console.log('Success:', result.arweaveTxId);
} catch (error) {
  if (error.message.includes('Pinata')) {
    console.error('IPFS upload failed:', error);
  } else if (error.message.includes('Arweave')) {
    console.error('Arweave transaction failed:', error);
  } else {
    console.error('Unknown error:', error);
  }
}
```

## Best Practices

1. **Check Balance First**
   ```typescript
   const balance = await minter.checkBalance(privateKey);
   if (parseFloat(balance.balanceAR) < 0.01) {
     throw new Error('Insufficient AR balance');
   }
   ```

2. **Validate Files**
   - Check file size (recommend < 100MB for IPFS)
   - Validate MIME types
   - Compress images when possible

3. **Test Connection**
   ```typescript
   const isConnected = await minter.testPinataConnection();
   if (!isConnected) {
     throw new Error('Cannot connect to Pinata');
   }
   ```

4. **Store CIDs**
   - Save both IPFS and Arweave identifiers
   - Implement database tracking
   - Monitor transaction confirmations

5. **Use Metadata Standards**
   - Follow OpenSea/marketplace standards
   - Include all required fields
   - Use consistent attribute naming

## Troubleshooting

### "Pinata upload failed"
- Check API keys are correct
- Verify account has storage available
- Check file size limits

### "Arweave transaction failed"
- Ensure wallet has sufficient AR
- Check network connectivity
- Verify JWK format is correct

### "Insufficient AR balance"
- Fund wallet with AR tokens
- Check transaction fee estimation

### "Gateway timeout"
- Try alternative IPFS gateway
- Wait and retry (IPFS propagation takes time)
- Verify CID is correct

## Service Selection Guide

### Choose Pinata if:
- You want simplicity and reliability
- You need excellent free tier
- You value uptime and speed

### Choose Lighthouse if:
- You need encryption
- You want Filecoin redundancy
- You need verifiable storage proofs

### Choose Filebase if:
- You prefer S3-compatible API
- You need multi-region storage
- You have existing S3 workflows

### Choose Storacha if:
- You want zero-cost storage
- You need UCAN-based auth
- You prefer web3-native solutions

## Resources

- [Arweave Documentation](https://docs.arweave.org/)
- [Pinata Documentation](https://docs.pinata.cloud/)
- [Lighthouse Documentation](https://docs.lighthouse.storage/)
- [IPFS Documentation](https://docs.ipfs.tech/)
- [NFT Metadata Standards](https://docs.opensea.io/docs/metadata-standards)

## Support

For issues or questions:
1. Check API service status pages
2. Verify credentials and quotas
3. Review error messages carefully
4. Test with small files first
5. Monitor blockchain explorers for confirmations

