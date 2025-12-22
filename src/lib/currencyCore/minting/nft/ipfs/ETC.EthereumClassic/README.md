# Ethereum Classic NFT Minting via IPFS Services

This directory contains NFT minting implementations for Ethereum Classic using various IPFS storage providers.

## Overview

These modules enable a hybrid storage approach:
- **Asset Storage**: Files stored on IPFS via various providers (fast, distributed)
- **Metadata Storage**: NFT metadata anchored on Ethereum Classic blockchain via ERC-721 contracts

This provides the best of both worlds: fast IPFS retrieval with immutable ETC blockchain anchoring.

## ETC NFT Standards

All implementations follow **ERC-721** (Ethereum-compatible):
- EVM-compatible smart contracts (Solidity/Vyper)
- Compatible with Ethereum tooling (MetaMask, ethers.js, web3.js)
- Token URI pointing to IPFS metadata
- **Original Ethereum protocol** (no DAO fork)
- Proof of Work consensus (like Bitcoin)
- Capped supply (210.7M ETC)

## Available Services

All 8 IPFS providers are supported: **Pinata**, **Infura**, **NFT.Storage**, **Lighthouse**, **Filebase**, **Storacha**, **Fleek**, and **Crust Network**.

**Usage Example:**

```typescript
import { ETCPinataNFTMinter } from './ETC.EthereumClassic.nft.pinata';

const minter = new ETCPinataNFTMinter({
  apiKey: process.env.PINATA_API_KEY!,
  apiSecret: process.env.PINATA_API_SECRET!,
});

const privateKey = '0x...';
const contractAddress = '0x...'; // ERC-721 contract
const imageBuffer = fs.readFileSync('art.png');

const result = await minter.mintNFT(
  privateKey,
  contractAddress,
  imageBuffer,
  {
    name: "ETC Art #1",
    description: "Original Ethereum artwork",
    attributes: [{ trait_type: "Rarity", value: "Legendary" }]
  },
  '1'
);

console.log('Blockscout:', result.blockscoutUrl);
```

## Cost Breakdown

### IPFS Storage Costs
Same as other chains (see individual provider documentation).

### ETC Blockchain Costs
- **Contract Deployment**: ~0.001 ETC (one-time)
- **Mint Transaction**: ~0.0001 ETC gas fees
- **Gas Price**: ~1 Gwei (much lower than Ethereum)

**Total Cost Per NFT**: ~0.0001 ETC (~$0.02 USD at $20/ETC) + IPFS storage costs

## Features

✅ ERC-721 compliant (Ethereum-compatible)
✅ EVM-compatible (use Ethereum tools)
✅ Support for image NFTs
✅ Support for video/audio NFTs with thumbnails
✅ Balance checking functionality
✅ Mainnet and Mordor testnet support
✅ Token URI with IPFS CIDs
✅ **Low gas fees** (~1 Gwei)
✅ **Proof of Work security**
✅ **Original Ethereum protocol**
✅ **Capped supply** (no inflation)

## ETC-Specific Considerations

### Original Ethereum
- **No DAO Fork**: ETC maintains the original Ethereum blockchain
- **"Code is Law"**: Immutability principle
- **Community-driven**: Decentralized governance
- **Proof of Work**: ASIC-resistant mining algorithm

### EVM Compatibility
- **Fully EVM-compatible**: Use Ethereum tools (MetaMask, Remix, Hardhat)
- **Chain ID**: 61 (mainnet) / 63 (Mordor testnet)
- **Gas Price**: ~1 Gwei (very cheap)
- **Block Time**: ~13 seconds

### Network Selection

```typescript
// Mainnet
const minter1 = new ETCPinataNFTMinter(
  config,
  'https://etc.rivet.link',
  'mainnet'
);

// Mordor testnet
const minter2 = new ETCPinataNFTMinter(
  config,
  'https://rpc.mordor.etccooperative.org',
  'mordor'
);
```

### Explorer URLs
- **Mainnet**: `https://blockscout.com/etc/mainnet/tx/{txHash}`
- **Mordor**: `https://blockscout.com/etc/mordor/tx/{txHash}`

### Wallet Compatibility
- **MetaMask**: Full support (add ETC network)
- **Core-Geth**: Native ETC client
- **Emerald Wallet**: Native ETC wallet
- **WalletConnect**: Full support

## Security Best Practices

1. **Never commit private keys** to version control
2. Use **environment variables** for API keys
3. Store private keys in **secure vaults** (Hardware wallets recommended)
4. Enable **2FA** on IPFS provider accounts
5. Use **dedicated wallets** for minting
6. Verify **contract code** before use (Blockscout verification)
7. Test on **Mordor testnet** before mainnet

## Common Issues

### Issue: Insufficient Gas
**Solution**: Increase gas limit or gas price (usually auto-calculated)

### Issue: Contract Not Found
**Solution**: Verify contract address and network (mainnet vs Mordor)

### Issue: IPFS Upload Timeout
**Solution**: Increase timeout, check file size, verify API credentials

### Issue: Invalid Private Key
**Solution**: Verify hex format (0x prefix) or 12/24-word mnemonic

### Issue: Transaction Reverted
**Solution**: Check if token ID already exists, verify contract permissions

## Resources

- [Ethereum Classic Official Site](https://ethereumclassic.org/)
- [ETC Declaration of Independence](https://ethereumclassic.org/ETC_Declaration_of_Independence.pdf)
- [Blockscout Explorer](https://blockscout.com/etc/mainnet/)
- [ERC-721 Specification](https://eips.ethereum.org/EIPS/eip-721)
- [MetaMask ETC Setup Guide](https://ethereumclassic.org/guides/metamask)
- [IPFS Documentation](https://docs.ipfs.io/)

## ETC Philosophy

Ethereum Classic maintains the original Ethereum blockchain and philosophy:
- **Immutability**: "Code is Law" - smart contracts cannot be reversed
- **Decentralization**: No central authority or foundation control
- **Censorship Resistance**: Transactions cannot be censored
- **Proof of Work**: Maintains PoW consensus for security

## License

See project root LICENSE file.
