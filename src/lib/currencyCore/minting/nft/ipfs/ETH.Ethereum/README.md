# Ethereum NFT Minting via IPFS Services

This directory contains NFT minting implementations for Ethereum using various IPFS storage providers.

## Overview

Ethereum is the world's leading smart contract platform and the birthplace of the NFT revolution. These modules enable a hybrid storage approach:
- **Asset Storage**: Files stored on IPFS via various providers (fast, distributed)
- **Metadata Storage**: NFT metadata anchored on Ethereum blockchain via ERC-721 contracts

## Ethereum NFT Standards

All implementations support **ERC-721** (primary), **ERC-1155** (multi-token), and **ERC-4907** (rentable NFTs):
- EVM smart contracts (Solidity/Vyper)
- Compatible with OpenSea, Blur, Foundation, SuperRare
- Token URI pointing to IPFS metadata
- **Largest NFT ecosystem** in crypto
- **ENS support** for human-readable addresses

## Available Services

All 8 IPFS providers are supported. See individual files for detailed documentation.

## Cost Breakdown

### IPFS Storage Costs
Same as other chains (see individual provider documentation).

### Ethereum Blockchain Costs
- **Contract Deployment**: ~0.05-0.1 ETH (one-time, varies with gas)
- **Mint Transaction**: ~0.005-0.02 ETH gas fees
- **Gas Price**: 20-100 Gwei (varies with network congestion)

**Total Cost Per NFT**: ~$10-$50 USD (at typical gas prices) + IPFS storage costs

## Features

✅ ERC-721/ERC-1155/ERC-4907 compliant
✅ Compatible with all major NFT marketplaces (OpenSea, Blur, etc.)
✅ Support for image NFTs
✅ Support for video/audio NFTs with thumbnails
✅ Balance checking functionality
✅ Mainnet, Sepolia, and Goerli testnet support
✅ Token URI with IPFS CIDs
✅ **ENS name service** support
✅ **Largest NFT ecosystem**
✅ **Most valuable NFTs** (Bored Apes, CryptoPunks, etc.)
✅ **Proof of Stake** (energy efficient)

## Ethereum-Specific Considerations

### The Merge & Proof of Stake
- **Post-Merge**: Ethereum now uses Proof of Stake (September 2022)
- **Energy Efficient**: 99.95% reduction in energy consumption
- **Staking**: ETH holders can stake to secure the network
- **Finality**: ~13 minutes for transaction finality

### EVM Compatibility
- **Chain ID**: 1 (mainnet) / 11155111 (Sepolia) / 5 (Goerli)
- **Gas Price**: Dynamic, varies 20-100+ Gwei
- **Block Time**: ~12 seconds
- **Native currency**: ETH

### Network Selection

```typescript
// Mainnet
const minter1 = new ETHPinataNFTMinter(
  config,
  'https://eth.llamarpc.com',
  'mainnet'
);

// Sepolia testnet (recommended)
const minter2 = new ETHPinataNFTMinter(
  config,
  'https://sepolia.infura.io/v3/YOUR_PROJECT_ID',
  'sepolia'
);
```

### Explorer URLs
- **Mainnet**: `https://etherscan.io/tx/{txHash}`
- **Sepolia**: `https://sepolia.etherscan.io/tx/{txHash}`
- **Goerli**: `https://goerli.etherscan.io/tx/{txHash}`

### Major NFT Marketplaces
- **OpenSea**: Largest NFT marketplace
- **Blur**: Pro traders, zero fees
- **Foundation**: Curated art
- **SuperRare**: High-end art
- **Rarible**: Community-owned
- **LooksRare**: Rewards traders

### ENS (Ethereum Name Service)
- Human-readable addresses (vitalik.eth)
- Decentralized domain names
- Built-in support via ethers.js

## Gas Optimization Tips

1. **Batch minting**: Mint multiple NFTs in one transaction
2. **Off-peak hours**: Mint during low network activity (weekends)
3. **Gas trackers**: Use ethgasstation.info or etherscan gas tracker
4. **Layer 2**: Consider Arbitrum, Optimism, or zkSync for cheaper mints
5. **EIP-1559**: Set base fee + priority fee appropriately

## Security Best Practices

1. **Never commit private keys** to version control
2. Use **environment variables** for API keys
3. Store private keys in **hardware wallets** (Ledger, Trezor)
4. Enable **2FA** on IPFS provider accounts
5. Use **dedicated wallets** for minting
6. Verify **contract code** on Etherscan before use
7. Test on **Sepolia testnet** before mainnet
8. **Audit smart contracts** before deployment

## Common Issues

### Issue: High Gas Fees
**Solution**: Wait for lower gas prices, use gas trackers, consider L2 solutions

### Issue: Transaction Failed (Out of Gas)
**Solution**: Increase gas limit estimate by 20-30%

### Issue: Contract Not Found
**Solution**: Verify contract address and network (mainnet vs testnet)

### Issue: Transaction Stuck (Pending)
**Solution**: Speed up with higher gas price or cancel with replacement tx

## Resources

- [Ethereum Official Site](https://ethereum.org/)
- [Ethereum Whitepaper](https://ethereum.org/en/whitepaper/)
- [Etherscan Explorer](https://etherscan.io/)
- [OpenSea Documentation](https://docs.opensea.io/)
- [ERC-721 Specification](https://eips.ethereum.org/EIPS/eip-721)
- [ERC-1155 Specification](https://eips.ethereum.org/EIPS/eip-1155)
- [ENS Documentation](https://docs.ens.domains/)
- [IPFS Documentation](https://docs.ipfs.io/)

## Ethereum NFT History

- **2017**: CryptoKitties launches, congests Ethereum network
- **2021**: NFT summer - Bored Apes, Art Blocks, etc.
- **2022**: The Merge - Ethereum transitions to Proof of Stake
- **2023**: NFT royalties debate, OpenSea vs Blur
- **2024**: Continued dominance in NFT ecosystem

## License

See project root LICENSE file.
