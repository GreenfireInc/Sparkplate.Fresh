# Terra Classic NFT Minting via IPFS Services

This directory contains NFT minting implementations for Terra Classic (LUNC), the legacy Terra blockchain after the May 2022 collapse.

## Overview

Terra Classic is the **original Terra blockchain** that experienced a catastrophic collapse in May 2022. These modules enable NFT minting on the legacy chain:
- **Asset Storage**: Files stored on IPFS via various providers (fast, distributed)
- **Metadata Storage**: NFT metadata anchored on Terra Classic blockchain via CW721 contracts (CosmWasm)

## Terra Classic NFT Standards

All implementations follow **CW721** (CosmWasm NFT standard):
- CosmWasm smart contracts (Rust-based)
- Compatible with Cosmos SDK chains
- Token URI pointing to IPFS metadata
- Extension field for additional metadata
- Legacy RandomEarth, Knowhere marketplaces (limited activity)

## Terra Classic Historical Context

**CRITICAL INFORMATION:**

### The Collapse (May 2022)
- **UST Depeg**: Algorithmic stablecoin UST lost its $1 peg
- **Death Spiral**: LUNA hyperinflated from $80 to $0.0001 in days
- **Supply Explosion**: From ~350M LUNA to 6.9 TRILLION LUNC
- **Market Cap Loss**: $40+ billion evaporated
- **One of crypto's largest collapses**

### The Fork
- **May 2022**: New chain "Terra 2.0" launched (LUNA)
- **Original chain**: Renamed "Terra Classic" (LUNC)
- **Community Takeover**: No Terraform Labs support
- **Current State**: Legacy chain with minimal activity

### Terra Classic Today
- **Legacy Chain**: Original Terra before collapse
- **6.9 Trillion Supply**: Massively inflated (from 350M)
- **Low Value**: ~$0.00006 per LUNC (vs $80 pre-collapse)
- **Community-Run**: Decentralized governance
- **Limited Development**: Maintenance mode
- **Burn Mechanism**: 1.2% tax to reduce supply

## Available Services

All 8 IPFS providers are supported. See individual files for detailed documentation.

## Cost Breakdown

### IPFS Storage Costs
Same as other chains (see individual provider documentation).

### Terra Classic Blockchain Costs
- **Contract Instantiation**: ~0.5 LUNC (one-time, ~$0.00003)
- **Mint Transaction**: ~0.025 LUNC gas fees (~$0.0000015)
- **Transaction Fee**: Dynamic based on network congestion
- **Extremely Low**: Due to collapsed token value

**Total Cost Per NFT**: ~0.025 LUNC (~$0.0000015 USD) + IPFS storage costs

## Features

✅ CW721 compliant (CosmWasm NFT standard)
✅ Support for image NFTs
✅ Support for video/audio NFTs with thumbnails
✅ Balance checking functionality
✅ Mainnet and testnet support
✅ Token URI with IPFS CIDs
✅ Extension field for metadata
✅ **Terra Classic** (LUNC - legacy chain)
✅ **Cosmos SDK** architecture
✅ **CosmWasm** smart contracts (Rust)
✅ **Community-maintained** (no official support)

## Terra Classic-Specific Considerations

### Network Selection

```typescript
// Mainnet (Terra Classic)
const minter1 = new TerraClassicPinataNFTMinter(
  config,
  'https://terra-classic-lcd.publicnode.com',
  'mainnet'
);

// Testnet (if still operational)
const minter2 = new TerraClassicPinataNFTMinter(
  config,
  'https://bombay-lcd.terra.dev',
  'testnet'
);
```

### Explorer URLs
- **Mainnet**: `https://finder.terra.money/classic/tx/{txHash}`
- **Testnet**: `https://finder.terra.money/testnet/tx/{txHash}`

### RPC Endpoints
- **terra-classic-lcd.publicnode.com** - Community-maintained
- **columbus-lcd.terra.dev** - Original (may be deprecated)
- **Limited options** due to reduced support

### NFT Marketplaces
- **RandomEarth**: Limited Terra Classic support
- **Knowhere**: Limited Terra Classic support
- **Very Low Activity**: Most moved to Terra 2.0

### Terra Station Classic
- **Terra Station Classic**: Legacy wallet version
- **Limited Support**: Most wallets dropped LUNC support
- **Keplr**: Still supports Terra Classic

## Differences from Terra 2.0 (LUNA)

| Feature | Terra Classic (LUNC) | Terra 2.0 (LUNA) |
|---------|---------------------|------------------|
| **Status** | Legacy chain | Active chain |
| **Supply** | 6.9 trillion (hyperinflated) | 1 billion (capped) |
| **Value** | ~$0.00006 per LUNC | ~$1+ per LUNA |
| **Development** | Maintenance only | Active development |
| **Support** | Community-run | Terraform Labs |
| **NFT Activity** | Very low | Active |
| **Marketplaces** | Limited | Active (RandomEarth) |
| **Burn Tax** | 1.2% (to reduce supply) | None |

## Security Best Practices

1. **Understand the risks**: Terra Classic is a legacy chain
2. **Never commit mnemonics** to version control
3. Use **environment variables** for API keys
4. Store mnemonics in **secure vaults**
5. Enable **2FA** on IPFS provider accounts
6. Use **dedicated wallets** for minting
7. Verify **contract code** before use
8. Test on **testnet** before mainnet
9. **Be aware**: LUNC has minimal value and activity
10. **Consider Terra 2.0 (LUNA)** for active projects

## Common Issues

### Issue: Why is Terra Classic separate from Terra 2.0?
**Answer**: Terra Classic (LUNC) is the original chain after collapse. Terra 2.0 (LUNA) is a new chain launched after the fork. They are completely separate blockchains.

### Issue: Should I use Terra Classic for new projects?
**Answer**: **No.** Terra Classic is a legacy chain in maintenance mode. For new projects, use **Terra 2.0 (LUNA)** or another active blockchain.

### Issue: Insufficient Balance
**Solution**: Maintain at least 1 LUNC for gas fees (costs ~$0.00006)

### Issue: Transaction Failed
**Solution**: Check network connection, verify mnemonic, ensure sufficient balance

### Issue: IPFS Upload Timeout
**Solution**: Increase timeout, check file size, verify API credentials

### Issue: RPC Endpoint Down
**Solution**: Terra Classic has limited RPC support. Try community-maintained endpoints or consider migrating to Terra 2.0.

### Issue: Marketplace Not Showing NFT
**Solution**: Terra Classic NFT marketplaces have minimal activity. Most have migrated to Terra 2.0.

## Resources

- [Terra Classic Community](https://www.terraclassic.community/)
- [Terra Finder Explorer (Classic)](https://finder.terra.money/classic/)
- [CosmWasm Documentation](https://docs.cosmwasm.com/)
- [CW721 Specification](https://github.com/CosmWasm/cw-nfts)
- [Terra Classic Revival Plan](https://agora.terra.money/)
- [IPFS Documentation](https://docs.ipfs.io/)

## The Full Story: From $80 to $0.0001

### Timeline of the Collapse

**May 7-8, 2022**: UST begins losing its $1 peg
- UST drops to $0.98, then $0.95, then $0.90
- Panic selling begins

**May 9-10, 2022**: The Death Spiral
- UST drops to $0.50
- LUNA starts minting exponentially to restore UST peg
- LUNA supply explodes from 350M to billions

**May 11-12, 2022**: Complete Collapse
- UST drops to $0.10
- LUNA drops from $80 to $0.0001
- Supply reaches 6.9 trillion LUNC
- $40 billion in market cap evaporated

**May 27, 2022**: The Fork
- New chain "Terra 2.0" (LUNA) launches
- Original chain becomes "Terra Classic" (LUNC)
- Airdrop to pre-collapse holders

### Current State (2025)
- **LUNC**: ~$0.00006 (99.9999% down from peak)
- **Community Efforts**: 1.2% burn tax to reduce supply
- **Limited Activity**: Most projects migrated to Terra 2.0
- **Legacy Status**: Maintained but not actively developed

### Why NFT on Terra Classic?
**Most users should use Terra 2.0 (LUNA) instead.** Terra Classic is only relevant for:
- Historical/archival purposes
- Existing LUNC holder communities
- Educational demonstrations of the collapse
- Legacy contract maintenance

## Recommendation

**For new NFT projects, use Terra 2.0 (LUNA) instead.**

Terra Classic (LUNC) is a legacy chain with:
- Minimal development activity
- Very low token value (~$0.00006)
- Limited marketplace support
- Uncertain long-term viability

Terra 2.0 (LUNA) offers:
- Active development
- Better token value (~$1+)
- Active NFT marketplaces
- Community and Terraform Labs support

## License

See project root LICENSE file.
