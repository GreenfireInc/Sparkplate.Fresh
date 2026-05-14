# Algorand NFT Minting via IPFS Services

This directory contains NFT minting implementations for Algorand using various IPFS storage providers.

## Overview

These modules enable a hybrid storage approach:
- **Asset Storage**: Files stored on IPFS via various providers (fast, distributed)
- **Metadata Storage**: NFT metadata stored on Algorand blockchain as ASA (Algorand Standard Asset)

This provides the best of both worlds: fast IPFS retrieval with immutable Algorand blockchain anchoring.

## Algorand NFT Standards

All implementations follow **ARC-3** (Algorand Request for Comments) standard for NFT metadata:
- ASA (Algorand Standard Asset) with total supply of 1
- 0 decimal places
- Metadata URL pointing to IPFS
- Optional metadata hash for verification
- Properties: `image`, `image_integrity`, `image_mimetype`, `animation_url`, `properties`, `attributes`

## Available Services

### 1. Pinata (`ALGO.Algorand.nft.pinata.ts`)

Most popular IPFS pinning service with excellent reliability and speed.

**Features:**
- Fast, reliable pinning
- Generous free tier (1GB storage, unlimited gateways)
- Excellent uptime
- CID management tools

**Usage:**

```typescript
import { AlgorandPinataNFTMinter } from './ALGO.Algorand.nft.pinata';

const minter = new AlgorandPinataNFTMinter({
  apiKey: process.env.PINATA_API_KEY!,
  apiSecret: process.env.PINATA_API_SECRET!,
});

const mnemonic = 'your 25-word algorand mnemonic here...';
const imageBuffer = fs.readFileSync('art.png');

const result = await minter.mintNFT(
  mnemonic,
  imageBuffer,
  {
    name: "My NFT #1",
    description: "A unique digital artwork on Algorand",
    properties: {
      category: "art"
    },
    attributes: [
      { trait_type: "Rarity", value: "Legendary" }
    ]
  }
);

console.log('Asset ID:', result.assetId);
console.log('IPFS:', result.ipfsUrl);
```

### 2. Lighthouse (`ALGO.Algorand.nft.lighthouse.ts`)

Decentralized storage with encryption and Filecoin backup.

**Features:**
- Optional encryption
- Automatic Filecoin deals
- PoDSI verification
- Pay-as-you-go pricing

**Usage:**

```typescript
import { AlgorandLighthouseNFTMinter } from './ALGO.Algorand.nft.lighthouse';

const minter = new AlgorandLighthouseNFTMinter({
  apiKey: process.env.LIGHTHOUSE_API_KEY!,
});

const result = await minter.mintNFT(
  mnemonic,
  imageBuffer,
  'artwork.png',
  {
    name: "Digital Art #1",
    description: "Encrypted masterpiece on Algorand",
    attributes: []
  }
);
```

### 3. Filebase (`ALGO.Algorand.nft.filebase.ts`)

S3-compatible IPFS storage with multi-region redundancy.

**Features:**
- S3-compatible API
- Geographic redundancy
- 5GB free tier
- Multiple storage backends

**Usage:**

```typescript
import { AlgorandFilebaseNFTMinter } from './ALGO.Algorand.nft.filebase';

const minter = new AlgorandFilebaseNFTMinter({
  accessKeyId: process.env.FILEBASE_ACCESS_KEY!,
  secretAccessKey: process.env.FILEBASE_SECRET_KEY!,
  bucket: 'my-nft-bucket',
});

const result = await minter.mintNFT(
  mnemonic,
  imageBuffer,
  'art.png',
  {
    name: "S3-Backed NFT #1",
    description: "Stored with geographic redundancy",
    attributes: []
  }
);
```

### 4. Storacha (`ALGO.Algorand.nft.storacha.ts`)

Formerly web3.storage - free decentralized storage powered by IPFS and Filecoin.

**Features:**
- Free storage
- Filecoin backing
- Simple API
- Protocol Labs infrastructure

**Usage:**

```typescript
import { AlgorandStorachaNFTMinter } from './ALGO.Algorand.nft.storacha';

const minter = new AlgorandStorachaNFTMinter({
  email: process.env.STORACHA_EMAIL!,
});

const result = await minter.mintNFT(
  mnemonic,
  imageBuffer,
  'art.png',
  {
    name: "Free Storage NFT #1",
    description: "Backed by Filecoin",
    attributes: []
  }
);
```

### 5. Infura (`ALGO.Algorand.nft.infura.ts`)

Enterprise-grade IPFS infrastructure by ConsenSys.

**Features:**
- Enterprise reliability
- Dedicated support
- 5GB free tier
- Ethereum ecosystem integration

**Usage:**

```typescript
import { AlgorandInfuraNFTMinter } from './ALGO.Algorand.nft.infura';

const minter = new AlgorandInfuraNFTMinter({
  projectId: process.env.INFURA_PROJECT_ID!,
  projectSecret: process.env.INFURA_PROJECT_SECRET!,
});

const result = await minter.mintNFT(
  mnemonic,
  imageBuffer,
  'art.png',
  {
    name: "Enterprise NFT #1",
    description: "Infura enterprise infrastructure",
    attributes: []
  }
);
```

### 6. Fleek (`ALGO.Algorand.nft.fleek.ts`)

Fast IPFS storage with CDN acceleration.

**Features:**
- CDN acceleration
- Fast global delivery
- Easy integration
- Web3 infrastructure

**Usage:**

```typescript
import { AlgorandFleekNFTMinter } from './ALGO.Algorand.nft.fleek';

const minter = new AlgorandFleekNFTMinter({
  apiKey: process.env.FLEEK_API_KEY!,
  apiSecret: process.env.FLEEK_API_SECRET!,
});

const result = await minter.mintNFT(
  mnemonic,
  imageBuffer,
  'art.png',
  {
    name: "CDN-Accelerated NFT #1",
    description: "Fast global delivery",
    attributes: []
  }
);
```

### 7. Crust Network (`ALGO.Algorand.nft.crust.ts`)

Decentralized cloud storage built on IPFS and Polkadot.

**Features:**
- Decentralized infrastructure
- Storage incentives
- Polkadot integration
- Data privacy

**Usage:**

```typescript
import { AlgorandCrustNFTMinter } from './ALGO.Algorand.nft.crust';

const minter = new AlgorandCrustNFTMinter({
  authToken: process.env.CRUST_AUTH_TOKEN!,
});

const result = await minter.mintNFT(
  mnemonic,
  imageBuffer,
  'art.png',
  {
    name: "Decentralized NFT #1",
    description: "Stored on Crust Network",
    attributes: []
  }
);
```

### 8. NFT.Storage (`ALGO.Algorand.nft.nftstorage.ts`)

Free NFT-specific IPFS storage backed by Filecoin.

**Features:**
- Free storage for NFTs
- Filecoin redundancy
- NFT-specific features
- Protocol Labs infrastructure

**Usage:**

```typescript
import { AlgorandNFTStorageMinter } from './ALGO.Algorand.nft.nftstorage';

const minter = new AlgorandNFTStorageMinter({
  apiToken: process.env.NFT_STORAGE_TOKEN!,
});

const result = await minter.mintNFT(
  mnemonic,
  imageBuffer,
  'art.png',
  {
    name: "Free NFT Storage #1",
    description: "Backed by Filecoin",
    attributes: []
  }
);
```

## Comparison Table

| Service | Free Tier | Enterprise | CDN | Filecoin Backup | Best For |
|---------|-----------|------------|-----|-----------------|----------|
| **Pinata** | 1GB | ❌ | ✅ | ❌ | General use, reliability |
| **Lighthouse** | Pay-per-use | ❌ | ❌ | ✅ | Encryption, privacy |
| **Filebase** | 5GB | ✅ | ❌ | ✅ | S3 compatibility |
| **Storacha** | Free | ❌ | ✅ | ✅ | Free storage |
| **Infura** | 5GB | ✅ | ✅ | ❌ | Enterprise needs |
| **Fleek** | Free tier | ❌ | ✅ | ❌ | CDN acceleration |
| **Crust** | Pay-per-use | ❌ | ❌ | Via Polkadot | Decentralization |
| **NFT.Storage** | Free | ❌ | ✅ | ✅ | NFT-specific |

## Cost Breakdown

### IPFS Storage Costs
- **Pinata**: Free tier (1GB), then ~$0.15/GB/month
- **Lighthouse**: ~$0.0002/GB/month (Filecoin rates)
- **Filebase**: Free tier (5GB), then $5.99/month for 1TB
- **Storacha**: Free tier available
- **Infura**: Free tier (5GB), then paid plans
- **Fleek**: Free tier, then paid plans
- **Crust**: ~$0.10/GB/month
- **NFT.Storage**: Free for NFTs

### Algorand Blockchain Costs
- **ASA Creation**: 0.001 ALGO (~$0.0002)
- **Account Reserve**: 0.1 ALGO per ASA (~$0.02)
- **Transaction Fee**: 0.001 ALGO (~$0.0002)

**Total Cost Per NFT**: ~$0.021 ALGO + IPFS storage costs

## Features

### ARC-3 Compliance
All implementations follow the ARC-3 standard:
- `name`: Asset name
- `description`: Asset description
- `image`: IPFS CID or URL
- `image_integrity`: SHA-256 hash for verification
- `image_mimetype`: MIME type
- `animation_url`: For videos/audio
- `properties`: Additional properties
- `attributes`: Trait-based attributes

### Media NFTs
All implementations support video/audio NFTs with thumbnails:

```typescript
const mediaResult = await minter.mintMediaNFT(
  mnemonic,
  videoBuffer,
  thumbnailBuffer,
  {
    name: "Video NFT #1",
    description: "An epic video",
    attributes: [
      { trait_type: "Duration", value: "30s" }
    ]
  },
  {
    mediaOptions: { fileName: 'video.mp4' },
    thumbnailOptions: { fileName: 'thumbnail.jpg' }
  }
);
```

### Balance Checking
All implementations include balance checking:

```typescript
const balance = await minter.checkBalance(mnemonic);
console.log(`Balance: ${balance.balanceAlgo} ALGO`);
console.log(`Address: ${balance.address}`);
```

## Algorand-Specific Considerations

### Account Minimums
- **Minimum Balance**: 0.1 ALGO base + 0.1 ALGO per ASA
- **Reserve**: Returned when ASA is opted out

### Network Selection
All implementations support mainnet and testnet:

```typescript
const minter = new AlgorandPinataNFTMinter(
  config,
  'https://testnet-api.algonode.cloud', // Testnet
  443,
  '',
  'testnet'
);
```

### Explorer URLs
- **Mainnet**: `https://algoexplorer.io/asset/{assetId}`
- **Testnet**: `https://testnet.algoexplorer.io/asset/{assetId}`

## Security Best Practices

1. **Never commit mnemonics** to version control
2. Use **environment variables** for API keys
3. Store mnemonics in **secure vaults** (e.g., AWS Secrets Manager)
4. Enable **2FA** on IPFS provider accounts
5. Use **dedicated wallets** for minting
6. Verify **metadata hash** after upload
7. Test on **testnet** before mainnet deployment

## Common Issues

### Issue: Transaction Failed
**Solution**: Check balance (need 0.101+ ALGO for first NFT)

### Issue: IPFS Upload Timeout
**Solution**: Increase timeout, check file size limits

### Issue: Metadata Not Found
**Solution**: Wait for IPFS propagation (~30 seconds)

### Issue: Invalid Mnemonic
**Solution**: Verify 25-word Algorand mnemonic format

## Resources

- [Algorand Developer Portal](https://developer.algorand.org/)
- [ARC-3 Standard](https://arc.algorand.foundation/ARCs/arc-0003)
- [AlgoSDK Documentation](https://algorand.github.io/js-algorand-sdk/)
- [AlgoExplorer](https://algoexplorer.io/)
- [IPFS Documentation](https://docs.ipfs.io/)

## Examples

See the usage examples in each implementation file for complete code samples.

## Support

For issues or questions:
- Algorand: [Algorand Discord](https://discord.gg/algorand)
- IPFS: Provider-specific support channels

## License

See project root LICENSE file.
