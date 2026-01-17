# Terra NFT Minting via IPFS Services

This directory contains NFT minting implementations for Terra (LUNA 2.0) using various IPFS storage providers.

## Overview

Terra is a Cosmos-based blockchain focused on stablecoins and payments. These modules enable a hybrid storage approach:
- **Asset Storage**: Files stored on IPFS via various providers (fast, distributed)
- **Metadata Storage**: NFT metadata anchored on Terra blockchain via CW721 contracts (CosmWasm)

## Terra NFT Standards

All implementations follow **CW721** (CosmWasm NFT standard):
- CosmWasm smart contracts (Rust-based)
- Compatible with Cosmos SDK chains
- Token URI pointing to IPFS metadata
- Extension field for additional metadata
- RandomEarth, Knowhere marketplaces

## Terra 2.0 Context

**Important Historical Note:**
- **May 2022**: Terra Classic (LUNC) collapsed due to UST depeg
- **May 2022**: Terra 2.0 (LUNA) launched via hard fork
- **Current**: Terra 2.0 is the active chain, Terra Classic is legacy

## Available Services

All 8 IPFS providers are supported. See individual files for detailed documentation.

## Cost Breakdown

### IPFS Storage Costs
Same as other chains (see individual provider documentation).

### Terra Blockchain Costs
- **Contract Instantiation**: ~0.5 LUNA (one-time)
- **Mint Transaction**: ~0.025 LUNA gas fees
- **Transaction Fee**: Dynamic based on network congestion

**Total Cost Per NFT**: ~0.025 LUNA (~$0.025 USD at $1/LUNA) + IPFS storage costs

## Features

✅ CW721 compliant (CosmWasm NFT standard)
✅ Support for image NFTs
✅ Support for video/audio NFTs with thumbnails
✅ Balance checking functionality
✅ Mainnet and testnet support
✅ Token URI with IPFS CIDs
✅ Extension field for metadata
✅ **Terra 2.0** (post-collapse relaunch)
✅ **Cosmos SDK** architecture
✅ **CosmWasm** smart contracts (Rust)
✅ **IBC compatible** (inter-blockchain communication)

## Terra-Specific Considerations

### Terra 2.0 Architecture
- **Cosmos SDK**: Built on Cosmos SDK like Cosmos Hub
- **CosmWasm**: Smart contracts in Rust
- **IBC**: Inter-blockchain communication enabled
- **Stablecoin Focus**: Originally built for algorithmic stablecoins

### Network Selection

```typescript
// Mainnet
const minter1 = new TerraPinataNFTMinter(
  config,
  'https://phoenix-lcd.terra.dev',
  'mainnet'
);

// Testnet (Pisco)
const minter2 = new TerraPinataNFTMinter(
  config,
  'https://pisco-lcd.terra.dev',
  'testnet'
);
```

### Explorer URLs
- **Mainnet**: `https://finder.terra.money/mainnet/tx/{txHash}`
- **Testnet**: `https://finder.terra.money/testnet/tx/{txHash}`

### NFT Marketplaces
- **RandomEarth**: Primary Terra NFT marketplace
- **Knowhere**: Secondary marketplace
- **Talis Protocol**: NFT lending

### Terra Station Wallet
- Official Terra wallet
- Browser extension + mobile app
- Supports LUNA, CW20 tokens, CW721 NFTs
- Staking and governance

## Security Best Practices

1. **Never commit mnemonics** to version control
2. Use **environment variables** for API keys
3. Store mnemonics in **secure vaults** (Terra Station recommended)
4. Enable **2FA** on IPFS provider accounts
5. Use **dedicated wallets** for minting
6. Verify **contract code** before use
7. Test on **testnet** before mainnet
8. **Understand Terra 2.0**: This is NOT Terra Classic (LUNC)

## Common Issues

### Issue: Insufficient Balance
**Solution**: Maintain at least 1 LUNA for gas fees

### Issue: Transaction Failed
**Solution**: Check network connection, verify mnemonic, ensure sufficient balance

### Issue: IPFS Upload Timeout
**Solution**: Increase timeout, check file size, verify API credentials

### Issue: Invalid Mnemonic
**Solution**: Verify 12 or 24-word BIP39 mnemonic

### Issue: Wrong Chain
**Solution**: Ensure using Terra 2.0 (LUNA), not Terra Classic (LUNC)

## Resources

- [Terra Official Site](https://www.terra.money/)
- [Terra Finder Explorer](https://finder.terra.money/)
- [CosmWasm Documentation](https://docs.cosmwasm.com/)
- [CW721 Specification](https://github.com/CosmWasm/cw-nfts)
- [RandomEarth](https://randomearth.io/) - Primary NFT marketplace
- [Terra Station](https://station.terra.money/) - Official wallet
- [IPFS Documentation](https://docs.ipfs.io/)

## Terra History & Context

### The Collapse (May 2022)
- UST (algorithmic stablecoin) lost its $1 peg
- LUNA hyperinflated from $80 to $0.0001
- $40+ billion in market cap evaporated
- One of crypto's largest collapses

### The Relaunch (May 2022)
- Terra 2.0 launched via hard fork
- Original chain became "Terra Classic" (LUNC)
- New chain has no algorithmic stablecoins
- Focus shifted to regular blockchain applications

### Current State
- **Terra 2.0 (LUNA)**: Active, supported chain
- **Terra Classic (LUNC)**: Legacy chain, minimal activity
- **NFTs**: Moved to Terra 2.0
- **Community**: Rebuilding after collapse

## License

See project root LICENSE file.
