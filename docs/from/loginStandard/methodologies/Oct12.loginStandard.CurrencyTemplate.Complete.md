# Currency Data Complete Template - October 12, 2025

## Overview
This template provides the complete structure for cryptocurrency data files based on the expanded `CurrencyData` interface. All parameters from the specification have been implemented.

## Template Structure

### BasicInfo
```typescript
basicInfo: {
  name: string;                         // Full name of the cryptocurrency
  symbolTicker: string;                 // Ticker symbol (BTC, ETH, etc.)
  description: string;                  // Detailed description
  creator: string;                      // Creator/founder name or organization
  debutYear: number;                    // Year of launch
  website: string;                      // Official website URL
  whitePaper?: string;                  // Link to whitepaper (optional)
  primaryNFTMarketplace?: string;       // Primary NFT marketplace URL (optional)
  secondaryNFTMarketplace?: string;     // Secondary NFT marketplace URL (optional)
}
```

### TechnicalInfo
```typescript
technicalInfo: {
  proofingType: "Proof of Work" | "Proof of Stake" | "Proof of Authority" | "Proof of Space" | "Proof of Time" | "Other";
  class: string;                                    // Layer 1 Blockchain, Layer 2, etc.
  totalSupply: string;                              // Maximum supply
  libraryHashing?: string;                          // Hashing algorithm used
  librarySigning?: string;                          // Signing algorithm used
  mnemonicSeedPhraseLengths?: string;               // e.g., "12, 24 words"
  privateKeyFormat?: string;                        // Format description
  privateKeyToPublicKeyCurve?: string;              // Curve used (Ed25519, secp256k1, etc.)
  publicKeyToPublicWalletAddressHashing?: string;   // Address derivation method
  NPMLibraryHashing?: string;                       // NPM package for hashing
  NPMLibrarySigning?: string;                       // NPM package for signing
  keyStoreFormat?: string;                          // Keystore file format
  jsonFormat?: string;                              // JSON standard used
  smartContractLanguage?: string;                   // Smart contract language(s)
  primaryNPMPackage?: string;                       // Main NPM package
  secondaryNPMPackage?: string;                     // Secondary NPM package
  tertiaryNPMPackage?: string;                      // Tertiary NPM package
  web3ConnectMechanism?: string;                    // Web3 connection method
  nativeWallet?: string;                            // Official/native wallet(s)
  humanReadableAddressingPlatform?: string;         // Name service (ENS, etc.)
  humanReadableAddressingNPMPackage?: string;       // NPM package for name service
  SendingMechanism?: string;                        // Transaction sending method
  NFTMintingMechanism?: string;                     // NFT minting standards
  AssetTokenSupportAndMechanism?: string;           // Token/asset support
}
```

### MarketInfo
```typescript
marketInfo: {
  allTimeHigh: {
    price: number;                      // ATH price
    currency: string;                   // Currency (usually "USD")
    date: string;                       // Date of ATH
  }
}
```

### SocialMedia
```typescript
socialMedia: {
  discord?: string;                     // Discord server URL
  instagram?: string;                   // Instagram profile URL
  linkedin?: string;                    // LinkedIn company page URL
  reddit?: string;                      // Reddit community URL
  slack?: string;                       // Slack workspace URL
  telegram?: string;                    // Telegram channel URL
  twitterX?: string;                    // Twitter/X profile URL
}
```

### Identifiers
```typescript
identifiers: {
  UCID: string;                         // Unique Crypto ID (required)
  identifierBraveNewCoin?: string;      // BraveNewCoin identifier
  identifierCoinAPI?: string;           // CoinAPI identifier
  identifierCoinCap?: string;           // CoinCap identifier
  identifierCoinGecko?: string;         // CoinGecko identifier
  identifierCoinPaprika?: string;       // CoinPaprika identifier
}
```

### BlockExplorer
```typescript
blockExplorer: {
  blockExplorerAPI?: string;            // Block explorer API endpoint
  blockExplorerLink?: string;           // Block explorer base URL
}
```

## Complete Example: Algorand (ALGO)

```typescript
export const algorandData: CurrencyData = {
  basicInfo: {
    name: "Algorand",
    symbolTicker: "ALGO",
    description: "A pure proof-of-stake blockchain protocol that aims to deliver decentralization, scalability, and security for the next generation of financial products and applications.",
    creator: "Silvio Micali",
    debutYear: 2019,
    website: "https://www.algorand.com/",
    whitePaper: "https://algorandcom.cdn.prismic.io/algorandcom/eed2b6b6-f8b2-4b59-bcf9-564e86a252d5_Algorand_WhitePaper_v1.pdf",
    primaryNFTMarketplace: "https://www.nftexplorer.app/",
    secondaryNFTMarketplace: "https://ab2.gallery/",
  },

  technicalInfo: {
    proofingType: "Proof of Stake",
    class: "Layer 1 Blockchain",
    totalSupply: "10,000,000,000 ALGO",
    libraryHashing: "SHA-512/256",
    librarySigning: "Ed25519",
    mnemonicSeedPhraseLengths: "25 words",
    privateKeyFormat: "64-character hexadecimal (32 bytes)",
    privateKeyToPublicKeyCurve: "Ed25519",
    publicKeyToPublicWalletAddressHashing: "Base32 encoding with checksum",
    NPMLibraryHashing: "@noble/hashes/sha512",
    NPMLibrarySigning: "@noble/ed25519",
    keyStoreFormat: "Algorand JSON Keystore",
    jsonFormat: "Algorand Standard Asset (ASA) JSON",
    smartContractLanguage: "TEAL (Transaction Execution Approval Language) / PyTeal",
    primaryNPMPackage: "algosdk",
    secondaryNPMPackage: "@noble/ed25519",
    tertiaryNPMPackage: "tweetnacl",
    web3ConnectMechanism: "WalletConnect / Pera Connect / MyAlgo Connect",
    nativeWallet: "Pera Wallet / Algorand Wallet",
    humanReadableAddressingPlatform: "Algorand Name Service (ANS)",
    humanReadableAddressingNPMPackage: "N/A",
    SendingMechanism: "Algorand SDK transaction signing",
    NFTMintingMechanism: "Algorand Standard Assets (ASA) - Arc3/Arc19",
    AssetTokenSupportAndMechanism: "Algorand Standard Assets (ASA) - native token support",
  },

  marketInfo: {
    allTimeHigh: {
      price: 3.56,
      currency: "USD",
      date: "June 20, 2019",
    },
  },

  socialMedia: {
    discord: "https://discord.gg/algorand",
    instagram: "https://www.instagram.com/algorand/",
    linkedin: "https://www.linkedin.com/company/algorand/",
    reddit: "https://www.reddit.com/r/AlgorandOfficial/",
    slack: "https://algorand.foundation/slack",
    telegram: "https://t.me/algorand",
    twitterX: "https://twitter.com/Algorand",
  },

  identifiers: {
    UCID: "4030",
    identifierBraveNewCoin: "ALGO",
    identifierCoinAPI: "ALGO",
    identifierCoinCap: "algorand",
    identifierCoinGecko: "algorand",
    identifierCoinPaprika: "algo-algorand",
  },

  blockExplorer: {
    blockExplorerAPI: "https://algoexplorer.io/api",
    blockExplorerLink: "https://allo.info/account/",
  },
  
  deriveFromPrivateKey: async (privateKey: string): Promise<DerivedInfo> => {
    // Implementation...
  }
};
```

## Implementation Notes

### Required Fields
- All fields in `basicInfo` except `whitePaper`, `primaryNFTMarketplace`, and `secondaryNFTMarketplace`
- `proofingType`, `class`, and `totalSupply` in `technicalInfo`
- All fields in `marketInfo.allTimeHigh`
- `UCID` in `identifiers`

### Optional Fields
- All social media links
- All technical details beyond the required three
- All block explorer information
- All other identifiers

### Field Naming Conventions
- **camelCase** for all field names
- **Optional fields** marked with `?` in TypeScript
- **URLs** should include `https://` protocol

## Usage

When creating a new currency file:

1. Copy the template structure
2. Fill in all available information
3. Leave optional fields undefined if information is not available
4. Implement `deriveFromPrivateKey` function if supported
5. Implement `decryptKeystore`, `exportKeystore`, `importWallet` as needed

## Benefits

- **Comprehensive Documentation**: All technical and market information in one place
- **Consistent Structure**: All currencies follow the same format
- **Easy Research**: Researchers can quickly find all relevant links and identifiers
- **Developer Resources**: All necessary NPM packages and mechanisms documented
- **Community Links**: Social media channels easily accessible
- **Market Data**: Historical price information preserved

## Next Steps

1. Update existing currency files with new parameters
2. Document research sources for each currency
3. Create validation scripts to ensure completeness
4. Build UI components to display new information

