# DEXs Directory

This directory contains comprehensive information about decentralized exchanges (DEXs) across various blockchains, with initial focus on the Algorand ecosystem.

## 📁 Structure

Each DEX has its own TypeScript file containing:
- **Basic Information**: Name, blockchain, type, description
- **URLs**: Main website, app, documentation
- **API Details**: Endpoints, documentation, rate limits
- **SDK Information**: npm packages, GitHub repos, installation commands
- **Integration Examples**: Code snippets for TypeScript/JavaScript
- **Social Media Links**: Twitter, Discord, Telegram, Medium, GitHub
- **Smart Contract IDs**: Mainnet and testnet app IDs
- **Features**: Available functionality (swaps, liquidity, farming, etc.)
- **Notes**: Important considerations and current status

## 🔍 Currently Supported

### Algorand DEXs (8 entries)

#### AMM DEXs
1. **Tinyman** - Leading AMM with V2 on mainnet, comprehensive SDK
2. **Pact** - Mobile-first AMM with Python SDK
3. **Humble Swap** - User-friendly AMM DEX
4. **AlgoFi AMM** - Part of comprehensive DeFi suite
5. **WagmiSwap** - AMM with farming opportunities

#### Integrated DEXs
6. **Folks Finance Swap** - Integrated within capital markets protocol

#### Aggregators
7. **Vestige** - Swap aggregator for best prices

#### Order Book
8. **Algodex** - On-chain order book DEX (currently under maintenance)

## 🚀 Usage

### Import Individual DEX
```typescript
import { tinymanDEX } from '@/components/currencyCore/DEXs/tinyman';

console.log(tinymanDEX.name); // "Tinyman"
console.log(tinymanDEX.sdk.npm.package); // "@tinymanorg/tinyman-js-sdk"
```

### Import All Algorand DEXs
```typescript
import { algorandDEXs } from '@/components/currencyCore/DEXs';

// Lazy load specific DEX
const tinymanModule = await algorandDEXs.tinyman();
```

### Query by Type
```typescript
import { algorandDexMetadata } from '@/components/currencyCore/DEXs';

// Get all AMM DEXs
const ammDexs = algorandDexMetadata.byType.amm; 
// ['tinyman', 'pact', 'humbleSwap', 'algofi', 'wagmiSwap']

// Get DEXs with TypeScript SDKs
const tsSDKs = algorandDexMetadata.withSDK.typescript;
// ['tinyman', 'algofi', 'folksFinance']
```

## 📊 Data Schema

Each DEX file exports an object with this structure:

```typescript
{
  name: string;
  blockchain: string;
  type: string;
  description: string;
  
  urls: {
    main: string;
    app?: string;
    docs?: string;
  };
  
  api: {
    endpoints: {
      mainnet?: string;
      testnet?: string;
    };
    documentation: string;
    rateLimit?: string;
    requiresApiKey: boolean;
  };
  
  sdk?: {
    npm?: {
      package: string;
      version?: string;
      installCommand: string;
      github: string;
      npmLink: string;
    };
    python?: {
      package: string;
      github: string;
      documentation: string;
    };
    typescript?: {
      available: boolean;
      note?: string;
    };
    documentation?: string;
    typescriptSupport?: boolean;
    features?: string[];
  };
  
  integration: {
    exampleUsage: string; // Code snippet
  };
  
  socialMedia: {
    twitter?: string;
    discord?: string;
    telegram?: string;
    medium?: string;
    github?: string;
  };
  
  contracts?: {
    mainnet?: Record<string, any>;
    testnet?: Record<string, any>;
  };
  
  features: {
    swaps: boolean;
    liquidityProvision?: boolean;
    yieldFarming?: boolean;
    limitOrders?: boolean;
    governance?: boolean;
    nftSupport?: boolean;
    // ... additional features
  };
  
  notes: string[];
}
```

## 🛠️ Integration Tips

### Algorand DEXs
Most Algorand DEXs require:
- `algosdk` npm package
- Algorand node connection (algod)
- Algorand indexer for historical data
- Knowledge of specific app IDs and contract structure

**Free Public RPC Endpoints:**
- **Algonode**: `https://mainnet-api.algonode.cloud` (no API key)
- **Nodely**: `https://mainnet-api.4160.nodely.dev` (no API key)
- **PureStake**: Requires free API key

### Indexing & Data Queries
- Use **Algorand Indexer** for historical data (subgraph equivalent)
- **Conduit** for custom block ingestion pipelines
- Most DEXs don't have Graph Protocol subgraphs

### Best Practices
1. **Use Official SDKs** when available (Tinyman, AlgoFi, Folks Finance)
2. **Direct Contract Interaction** for DEXs without SDKs (use `algosdk`)
3. **Check Status** before integration (some DEXs may be in maintenance)
4. **Test on Testnet** before mainnet deployment
5. **Handle Fees** - Algorand transactions require minimum ALGO for fees
6. **Asset Opt-In** - Users must opt-in to ASAs before receiving them

## 📝 Adding New DEXs

To add a new DEX:

1. Create a new TypeScript file in this directory (e.g., `newdex.ts`)
2. Follow the schema shown above
3. Include all available information
4. Add integration examples
5. Export the DEX object
6. Update `index.ts` to include the new DEX
7. Update this README

## 🔗 Related Resources

### Algorand Development
- **Algorand Developer Portal**: https://developer.algorand.org/
- **Algorand JS SDK**: https://github.com/algorand/js-algorand-sdk
- **AlgoKit TypeScript Utils**: https://dev.algorand.co/algokit/utils/typescript/overview/
- **Algorand Indexer Guide**: https://developer.algorand.org/docs/get-details/indexer/

### Node Endpoints
- **Algonode Docs**: https://docs.algonode.io
- **Nodely Docs**: https://nodely.io/docs/free/start
- **PureStake API**: https://developer.purestake.io/

### Oracles (for price feeds)
- **Gora Network**: https://www.gora.io/ (decentralized oracle)
- **Algorand Randomness Beacon**: For VRF/randomness needs
- **Bitquery**: GraphQL API for Algorand data

## 📮 Future Additions

Planned expansions:
- [ ] Ethereum DEXs (Uniswap, Curve, Balancer, etc.)
- [ ] Solana DEXs (Jupiter, Raydium, Orca, etc.)
- [ ] Cosmos DEXs (Osmosis, Astroport, etc.)
- [ ] Additional Algorand DEXs as they launch
- [ ] Cross-chain DEX aggregators
- [ ] DEX analytics and volume data

## ⚠️ Disclaimers

- **Status**: DEX operational status can change. Always verify before integration.
- **SDKs**: SDK availability and versions may change. Check official docs.
- **Security**: Always audit smart contracts before interacting with them.
- **Funds**: Never send funds without testing on testnet first.
- **API Limits**: Respect rate limits on public endpoints.

---

**Last Updated**: October 13, 2025  
**Maintained By**: Currency Core Team

