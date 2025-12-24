# Minting

This directory contains mechanisms for creating tokens and NFTs on various blockchain networks.

## Overview

The minting module provides tools for creating custom digital assets on supported blockchain networks. It includes:

- **Token Minting**: Create fungible tokens (ERC-20, SmartWeave, etc.)
- **NFT Minting**: Create non-fungible tokens (ERC-721, Atomic Assets, etc.)

## Structure

```
minting/
├── token/              # Fungible token creation
│   └── AR.Arweave/    # Arweave token minting
│       ├── AR.Arweave.token.birthday.ts
│       ├── index.ts
│       └── README.md
└── nft/               # Non-fungible token creation
    ├── arweave/       # Arweave NFT minting
    └── ipfs/          # IPFS-based NFT minting
```

## Token Minting

### Arweave (AR)

#### Birthday Tokens
Create personalized tokens based on user's birthday and initials.

**Features:**
- Token supply = birthYear × 10,000
- Ticker = initials + year (e.g., "CS1985")
- SmartWeave contract standard
- Permanent storage on Arweave

**Example:**

```typescript
import { ArweaveBirthdayTokenCreator } from '@/components/currencyCore/minting/token/AR.Arweave';

const creator = new ArweaveBirthdayTokenCreator();
const result = await creator.deployToken(privateKey, {
  initials: "CS",
  birthYear: 1985,
  birthMonth: 6,
  birthDay: 15,
  fullName: "Corey Stedman"
});

console.log(`Token: ${result.tickerSymbol}`);
console.log(`Supply: ${result.tokenAmount}`);
console.log(`View: ${result.viewBlockLink}`);
```

## NFT Minting

### Arweave
Coming soon - Atomic NFT creation on Arweave

### IPFS
Coming soon - IPFS-based NFT metadata and storage

## Supported Networks

| Network | Token Minting | NFT Minting | Status |
|---------|--------------|-------------|--------|
| Arweave (AR) | ✅ Birthday Tokens | 🚧 In Progress | Active |
| Ethereum (ETH) | 🔜 Coming Soon | 🔜 Coming Soon | Planned |
| Solana (SOL) | 🔜 Coming Soon | 🔜 Coming Soon | Planned |
| Algorand (ALGO) | 🔜 Coming Soon | 🔜 Coming Soon | Planned |

## General Requirements

### Token Minting
- Valid wallet with sufficient balance
- Network-specific configuration
- Metadata (name, symbol, supply, etc.)

### NFT Minting
- Valid wallet with sufficient balance
- Asset data (image, video, etc.)
- Metadata (name, description, attributes)
- Storage solution (Arweave, IPFS, etc.)

## Cost Estimation

### Arweave
- **Token Minting**: ~0.01 AR ($0.10-0.50 depending on AR price)
- **NFT Minting**: ~0.005-0.05 AR depending on asset size

### Ethereum (Future)
- **Token Minting (ERC-20)**: ~0.01-0.05 ETH in gas fees
- **NFT Minting (ERC-721)**: ~0.02-0.1 ETH in gas fees

### Solana (Future)
- **Token Minting**: ~0.001 SOL
- **NFT Minting**: ~0.01 SOL

## Security Best Practices

1. **Private Key Management**
   - Never commit keys to version control
   - Use environment variables
   - Implement key rotation policies

2. **Validation**
   - Validate all user inputs
   - Check wallet balances before operations
   - Verify transaction confirmations

3. **Testing**
   - Test on testnets first
   - Verify contract functionality
   - Monitor gas costs

4. **Metadata**
   - Use permanent storage (Arweave, IPFS)
   - Include proper licensing information
   - Follow metadata standards

## Usage Examples

### Check Balance Before Minting

```typescript
const creator = new ArweaveBirthdayTokenCreator();
const walletInfo = await creator.checkWalletBalance(privateKey);

if (!walletInfo.hasEnoughBalance) {
  console.log(`Need at least 0.01 AR. Current: ${walletInfo.balanceAR} AR`);
  process.exit(1);
}
```

### Helper Methods

```typescript
// Extract initials from name
const initials = ArweaveBirthdayTokenCreator.extractInitials("Corey Stedman");
// Returns: "CS"

// Parse birthday
const birthday = ArweaveBirthdayTokenCreator.parseBirthday("06/15/1985");
// Returns: { birthYear: 1985, birthMonth: 6, birthDay: 15 }

// Deploy with helpers
await creator.deployToken(privateKey, {
  initials,
  ...birthday,
  fullName: "Corey Stedman"
});
```

### Retrieve Token Info

```typescript
const tokenInfo = await creator.getTokenInfo(contractTxId);
console.log('Token:', tokenInfo.ticker);
console.log('Supply:', tokenInfo.totalSupply);
console.log('Birthday:', tokenInfo.birthDate);
```

## Future Enhancements

### Token Minting
- [ ] Custom formula tokens
- [ ] Multi-signature token creation
- [ ] Token burning mechanisms
- [ ] Governance tokens
- [ ] Staking tokens

### NFT Minting
- [ ] Collection management
- [ ] Batch minting
- [ ] Royalty configuration
- [ ] Dynamic NFTs
- [ ] Multi-chain NFTs

### Cross-Chain
- [ ] Bridge tokens between chains
- [ ] Unified minting interface
- [ ] Cross-chain metadata standards
- [ ] Interoperable NFTs

## Resources

### Arweave
- [Arweave Documentation](https://docs.arweave.org/)
- [SmartWeave Contracts](https://github.com/ArweaveTeam/SmartWeave)
- [Warp SDK](https://github.com/warp-contracts/warp)

### Ethereum
- [ERC-20 Token Standard](https://eips.ethereum.org/EIPS/eip-20)
- [ERC-721 NFT Standard](https://eips.ethereum.org/EIPS/eip-721)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)

### Solana
- [SPL Token Program](https://spl.solana.com/token)
- [Metaplex NFT Standard](https://docs.metaplex.com/)

### IPFS
- [IPFS Documentation](https://docs.ipfs.tech/)
- [NFT.Storage](https://nft.storage/)
- [Pinata](https://www.pinata.cloud/)

## Support

For issues or questions:
1. Check blockchain explorer for transaction status
2. Verify wallet balance and network
3. Review console logs for errors
4. Test on development networks first
5. Consult network-specific documentation

## Contributing

To add minting support for a new network:

1. Create directory: `minting/token/SYMBOL.NetworkName/`
2. Implement token creation class
3. Add comprehensive documentation
4. Include usage examples
5. Add tests
6. Update this README

