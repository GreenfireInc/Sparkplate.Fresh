# Cosmos NFT Minting via IPFS Services

This directory contains NFT minting implementations for Cosmos using various IPFS storage providers.

## Overview

These modules enable a hybrid storage approach:
- **Asset Storage**: Files stored on IPFS via various providers (fast, distributed)
- **Metadata Storage**: NFT metadata anchored on Cosmos blockchain via CosmWasm smart contracts

This provides the best of both worlds: fast IPFS retrieval with immutable Cosmos blockchain anchoring.

## Cosmos NFT Standards

All implementations follow **CW721** (CosmWasm NFT Standard):
- CosmWasm smart contracts (Rust-based)
- Compatible with Cosmos SDK chains
- Token URI pointing to IPFS metadata
- Extension field for additional metadata
- Interoperable via IBC (Inter-Blockchain Communication)

## Available Services

### 1. Pinata (`ATOM.Cosmos.nft.pinata.ts`)

Most popular IPFS pinning service with excellent reliability.

**Features:**
- Fast, reliable pinning
- 1GB free tier
- Excellent uptime
- CID management

**Usage:**

```typescript
import { CosmosPinataNFTMinter } from './ATOM.Cosmos.nft.pinata';

const minter = new CosmosPinataNFTMinter({
  apiKey: process.env.PINATA_API_KEY!,
  apiSecret: process.env.PINATA_API_SECRET!,
});

const mnemonic = 'your 12 or 24-word cosmos mnemonic...';
const contractAddress = 'cosmos1...'; // CW721 contract
const imageBuffer = fs.readFileSync('art.png');

const result = await minter.mintNFT(
  mnemonic,
  contractAddress,
  imageBuffer,
  {
    name: "Cosmic Art #1",
    description: "A unique artwork on Cosmos",
    attributes: [
      { trait_type: "Rarity", value: "Legendary" }
    ]
  },
  'token-001'
);

console.log('Token ID:', result.tokenId);
console.log('IPFS:', result.ipfsUrl);
```

### 2. Lighthouse (`ATOM.Cosmos.nft.lighthouse.ts`)

Decentralized storage with encryption and Filecoin backup.

**Features:**
- Optional encryption
- Automatic Filecoin deals
- PoDSI verification
- Pay-as-you-go

### 3. Filebase (`ATOM.Cosmos.nft.filebase.ts`)

S3-compatible IPFS storage with multi-region redundancy.

**Features:**
- S3-compatible API
- Geographic redundancy
- 5GB free tier
- Multiple backends

### 4. Storacha (`ATOM.Cosmos.nft.storacha.ts`)

Free decentralized storage powered by IPFS and Filecoin.

**Features:**
- Free storage
- Filecoin backing
- Simple API
- Protocol Labs

### 5. Infura (`ATOM.Cosmos.nft.infura.ts`)

Enterprise-grade IPFS infrastructure by ConsenSys.

**Features:**
- Enterprise reliability
- Dedicated support
- 5GB free tier
- Ethereum ecosystem

### 6. Fleek (`ATOM.Cosmos.nft.fleek.ts`)

Fast IPFS storage with CDN acceleration.

**Features:**
- CDN acceleration
- Fast global delivery
- Easy integration
- Web3 infrastructure

### 7. Crust Network (`ATOM.Cosmos.nft.crust.ts`)

Decentralized cloud storage built on IPFS and Polkadot.

**Features:**
- Decentralized infrastructure
- Storage incentives
- Polkadot integration
- Data privacy

### 8. NFT.Storage (`ATOM.Cosmos.nft.nftstorage.ts`)

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
| **Crust** | Pay-per-use | ❌ | ❌ | Via Polkadot | Decentralization |
| **NFT.Storage** | Free | ❌ | ✅ | ✅ | NFT-specific |

## Cost Breakdown

### IPFS Storage Costs
- **Pinata**: Free tier (1GB), then ~$0.15/GB/month
- **Lighthouse**: ~$0.0002/GB/month
- **Filebase**: Free tier (5GB), then $5.99/month for 1TB
- **Storacha**: Free tier
- **Infura**: Free tier (5GB), then paid
- **Fleek**: Free tier, then paid
- **Crust**: ~$0.10/GB/month
- **NFT.Storage**: Free for NFTs

### Cosmos Blockchain Costs
- **Contract Instantiation**: ~0.5 ATOM (one-time)
- **Mint Transaction**: ~0.025 ATOM gas fees
- **Transaction Fee**: Dynamic based on network congestion

**Total Cost Per NFT**: ~0.025 ATOM + IPFS storage costs

## Features

### CW721 Compliance
All implementations follow the CW721 standard:
- `token_id`: Unique identifier
- `owner`: Token owner address
- `token_uri`: IPFS metadata URL
- `extension`: Additional metadata
  - `name`: Asset name
  - `description`: Asset description
  - `image`: IPFS CID or URL
  - `attributes`: Trait-based attributes

### Media NFTs
Support for video/audio NFTs with thumbnails:

```typescript
const mediaResult = await minter.mintMediaNFT(
  mnemonic,
  contractAddress,
  videoBuffer,
  thumbnailBuffer,
  {
    name: "Video NFT #1",
    description: "An epic video",
    attributes: []
  },
  'token-001',
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
console.log(`Balance: ${balance.balanceAtom} ATOM`);
console.log(`Address: ${balance.address}`);
```

## Cosmos-Specific Considerations

### CosmWasm Smart Contracts
- **CW721**: Standard NFT contract
- **Gas**: Dynamic based on computation
- **Storage**: Paid per byte on-chain

### Network Selection
All implementations support mainnet and testnets:

```typescript
const minter = new CosmosPinataNFTMinter(
  config,
  'https://rpc-cosmos-testnet.cosmos.network', // Testnet
  'testnet'
);
```

### Explorer URLs
- **Mainnet**: `https://www.mintscan.io/cosmos/txs/{txHash}`
- **Testnet**: `https://testnet.mintscan.io/cosmoshub-testnet/txs/{txHash}`

### IBC Compatibility
- NFTs can be transferred across Cosmos chains via IBC
- Requires IBC-enabled CW721 contracts
- Cross-chain interoperability

## Security Best Practices

1. **Never commit mnemonics** to version control
2. Use **environment variables** for API keys
3. Store mnemonics in **secure vaults**
4. Enable **2FA** on IPFS provider accounts
5. Use **dedicated wallets** for minting
6. Verify **contract code** before use
7. Test on **testnet** before mainnet

## Common Issues

### Issue: Insufficient Gas
**Solution**: Increase gas limit or gas price

### Issue: Contract Not Found
**Solution**: Verify contract address and network

### Issue: IPFS Upload Timeout
**Solution**: Increase timeout, check file size

### Issue: Invalid Mnemonic
**Solution**: Verify 12 or 24-word BIP39 mnemonic

## Resources

- [Cosmos Developer Portal](https://cosmos.network/learn)
- [CosmWasm Documentation](https://docs.cosmwasm.com/)
- [CW721 Specification](https://github.com/CosmWasm/cw-nfts)
- [Mintscan Explorer](https://www.mintscan.io/)
- [IPFS Documentation](https://docs.ipfs.io/)

## Examples

See the usage examples in each implementation file for complete code samples.

## Support

For issues or questions:
- Cosmos: [Cosmos Discord](https://discord.gg/cosmosnetwork)
- IPFS: Provider-specific support channels

## License

See project root LICENSE file.
