# BNB Smart Chain NFT Minting via IPFS Services

This directory contains NFT minting implementations for Binance Smart Chain (BSC) using various IPFS storage providers.

## Overview

These modules enable a hybrid storage approach:
- **Asset Storage**: Files stored on IPFS via various providers (fast, distributed)
- **Metadata Storage**: NFT metadata anchored on BSC blockchain via BEP-721 contracts

This provides the best of both worlds: fast IPFS retrieval with immutable BSC blockchain anchoring.

## BSC NFT Standards

All implementations follow **BEP-721** (ERC-721 compatible):
- EVM-compatible smart contracts (Solidity/Vyper)
- Compatible with Ethereum tooling (MetaMask, ethers.js, web3.js)
- Token URI pointing to IPFS metadata
- Low gas fees compared to Ethereum mainnet
- High transaction throughput (3-second block times)

## Available Services

### 1. Pinata (`BNB.BinanceCoin.nft.pinata.ts`)

Most popular IPFS pinning service with excellent reliability.

**Features:**
- Fast, reliable pinning
- 1GB free tier
- Excellent uptime
- CID management

**Usage:**

```typescript
import { BNBPinataNFTMinter } from './BNB.BinanceCoin.nft.pinata';

const minter = new BNBPinataNFTMinter({
  apiKey: process.env.PINATA_API_KEY!,
  apiSecret: process.env.PINATA_API_SECRET!,
});

const privateKey = '0x...'; // or use mnemonic
const contractAddress = '0x...'; // BEP-721 contract
const imageBuffer = fs.readFileSync('art.png');

const result = await minter.mintNFT(
  privateKey,
  contractAddress,
  imageBuffer,
  {
    name: "BSC Art #1",
    description: "A unique artwork on BSC",
    attributes: [
      { trait_type: "Rarity", value: "Legendary" }
    ]
  },
  '1' // Token ID
);

console.log('Token ID:', result.tokenId);
console.log('IPFS:', result.ipfsUrl);
console.log('BscScan:', result.bscScanUrl);
```

### 2. Lighthouse (`BNB.BinanceCoin.nft.lighthouse.ts`)

Decentralized storage with encryption and Filecoin backup.

**Features:**
- Optional encryption
- Automatic Filecoin deals
- PoDSI verification
- Pay-as-you-go

### 3. Filebase (`BNB.BinanceCoin.nft.filebase.ts`)

S3-compatible IPFS storage with multi-region redundancy.

**Features:**
- S3-compatible API
- Geographic redundancy
- 5GB free tier
- Multiple backends

### 4. Storacha (`BNB.BinanceCoin.nft.storacha.ts`)

Free decentralized storage powered by IPFS and Filecoin.

**Features:**
- Free storage
- Filecoin backing
- Simple API
- Protocol Labs

### 5. Infura (`BNB.BinanceCoin.nft.infura.ts`)

Enterprise-grade IPFS infrastructure by ConsenSys.

**Features:**
- Enterprise reliability
- Dedicated support
- 5GB free tier
- Ethereum ecosystem

### 6. Fleek (`BNB.BinanceCoin.nft.fleek.ts`)

Fast IPFS storage with CDN acceleration.

**Features:**
- CDN acceleration
- Fast global delivery
- Easy integration
- Web3 infrastructure

### 7. Crust Network (`BNB.BinanceCoin.nft.crust.ts`)

Decentralized cloud storage built on IPFS and Polkadot.

**Features:**
- Decentralized infrastructure
- Storage incentives
- Polkadot integration
- Data privacy

### 8. NFT.Storage (`BNB.BinanceCoin.nft.nftstorage.ts`)

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

### BSC Blockchain Costs
- **Contract Deployment**: ~0.0005 BNB (one-time)
- **Mint Transaction**: ~0.0001 BNB gas fees
- **Transaction Fee**: Dynamic based on network congestion

**Total Cost Per NFT**: ~0.0001 BNB (~$0.05 USD at $500/BNB) + IPFS storage costs

## Features

### BEP-721 Compliance
All implementations follow the BEP-721 standard (ERC-721 compatible):
- Standard EVM NFT contract
- `tokenURI` pointing to IPFS metadata
- Compatible with OpenSea, Element Market, and other NFT marketplaces
- Cross-chain bridgeable to Ethereum

### Media NFTs
Support for video/audio NFTs with thumbnails:

```typescript
const mediaResult = await minter.mintMediaNFT(
  privateKey,
  contractAddress,
  videoBuffer,
  thumbnailBuffer,
  {
    name: "Video NFT #1",
    description: "An epic video",
    attributes: []
  },
  '1',
  {
    mediaOptions: { fileName: 'video.mp4' },
    thumbnailOptions: { fileName: 'thumb.jpg' }
  }
);
```

### Balance Checking
All implementations include balance checking:

```typescript
const balance = await minter.checkBalance(privateKey);
console.log(`Balance: ${balance.balanceBNB} BNB`);
console.log(`Address: ${balance.address}`);
```

## BSC-Specific Considerations

### EVM Compatibility
- **Fully EVM-compatible**: Use Ethereum tools (MetaMask, Remix, Hardhat)
- **Chain ID**: 56 (mainnet) / 97 (testnet)
- **Gas Price**: ~5 Gwei (much lower than Ethereum)
- **Block Time**: ~3 seconds (20x faster than Ethereum)

### Network Selection
All implementations support mainnet and testnet:

```typescript
const minter = new BNBPinataNFTMinter(
  config,
  'https://data-seed-prebsc-1-s1.binance.org:8545', // Testnet
  'testnet'
);
```

### Explorer URLs
- **Mainnet**: `https://bscscan.com/tx/{txHash}`
- **Testnet**: `https://testnet.bscscan.com/tx/{txHash}`

### Wallet Compatibility
- **MetaMask**: Full support (add BSC network)
- **Trust Wallet**: Native support
- **Binance Chain Wallet**: Native support
- **WalletConnect**: Full support

## Security Best Practices

1. **Never commit private keys** to version control
2. Use **environment variables** for API keys
3. Store private keys in **secure vaults** (Hardware wallets recommended)
4. Enable **2FA** on IPFS provider accounts
5. Use **dedicated wallets** for minting
6. Verify **contract code** before use (BSCScan verification)
7. Test on **testnet** before mainnet

## Common Issues

### Issue: Insufficient Gas
**Solution**: Increase gas limit or gas price (usually auto-calculated)

### Issue: Contract Not Found
**Solution**: Verify contract address and network (mainnet vs testnet)

### Issue: IPFS Upload Timeout
**Solution**: Increase timeout, check file size, verify API credentials

### Issue: Invalid Private Key
**Solution**: Verify hex format (0x prefix) or 12/24-word mnemonic

### Issue: Transaction Reverted
**Solution**: Check if token ID already exists, verify contract permissions

## Resources

- [Binance Smart Chain Documentation](https://docs.bnbchain.org/)
- [BEP-721 Specification](https://github.com/bnb-chain/BEPs/blob/master/BEP721.md)
- [BSCScan Explorer](https://bscscan.com/)
- [BSC Testnet Faucet](https://testnet.binance.org/faucet-smart)
- [MetaMask BSC Setup Guide](https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain)
- [IPFS Documentation](https://docs.ipfs.io/)

## Examples

See the usage examples in each implementation file for complete code samples.

## Support

For issues or questions:
- BSC: [Binance Chain Forum](https://forum.bnbchain.org/)
- IPFS: Provider-specific support channels

## License

See project root LICENSE file.
