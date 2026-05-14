# Dogecoin DEX Directory

Comprehensive DEX integrations for the Dogecoin ecosystem, covering Dogechain EVM sidechain DEXs and instant exchanges with native DOGE support.

## 📁 Directory Structure

```
DOGE.Dogecoin/
├── dogeswap.ts      # Dogechain AMM DEX
├── kibbleSwap.ts    # Dogechain AMM DEX with farming
├── yodeswap.ts      # Dogechain community DEX
├── stealthex.ts     # Instant exchange (limitless)
├── index.ts         # Exports and metadata
└── README.md        # This documentation
```

## 🔍 Supported DEXs

### Dogechain AMM DEXs

#### 1. Dogeswap - Dogechain DEX
- **Type:** AMM DEX
- **Chain:** Dogechain (EVM-compatible)
- **Features:** Swaps, liquidity pools, farming, staking
- **Token:** WDOGE (Wrapped Dogecoin)
- **Docs:** https://docs.dogeswap.org/

#### 2. Kibble Swap - Dogechain DEX
- **Type:** AMM DEX
- **Chain:** Dogechain (EVM-compatible)
- **Features:** Swaps, farming, NFT marketplace, lottery
- **Token:** KIBBLE
- **Docs:** https://docs.kibbleswap.dog/

#### 3. Yodeswap - Community DEX
- **Type:** AMM DEX
- **Chain:** Dogechain (EVM-compatible)
- **Features:** Swaps, farming, launchpad, bridge integration
- **Token:** YODE
- **Docs:** https://docs.yodeswap.dog/

### Instant Exchanges

#### 4. StealthEX - Limitless Exchange
- **Type:** Instant Exchange
- **Features:** No limits, 400+ assets, privacy-focused
- **API:** REST API available
- **Custody:** Non-custodial
- **Docs:** API documentation on website

## 🚀 Usage Examples

### Import Specific DEX

```typescript
// Import a Dogechain DEX
import { dogeswap } from './DOGE.Dogecoin/dogeswap';

// Load the DEX data
const dogeswapData = await dogeswap();
console.log('Dogeswap contracts:', dogeswapData.contracts);
```

### Import from Index

```typescript
// Import from main index
import { dogeswap, dogeDexMetadata } from './DOGE.Dogecoin';

// Get DEX metadata
console.log('DOGE DEX by type:', dogeDexMetadata.byType);
console.log('Dogechain DEXs:', dogeDexMetadata.byChain.dogechain);
```

### Query DEX Metadata

```typescript
import { dogeDexMetadata } from './DOGE.Dogecoin';

// Get all AMM DEXs
const ammDexes = dogeDexMetadata.byType.amm;
console.log('AMM DEXs:', ammDexes);

// Get DEXs with farming
const farmingDexes = dogeDexMetadata.byFeatures.farming;
console.log('Farming DEXs:', farmingDexes);

// Get DEXs supporting DOGE
const dogeDexes = dogeDexMetadata.supportedAssets.doge;
console.log('DOGE supporting DEXs:', dogeDexes);
```

## 🛠️ Integration Guides

### Dogechain AMM DEXs

Use standard Ethereum tooling for Dogechain DEXs:

```typescript
// Connect to Dogechain
const provider = new ethers.providers.JsonRpcProvider(
  'https://rpc.dogechain.dog'
);

// Get pair reserves
const pair = new ethers.Contract(pairAddress, PAIR_ABI, provider);
const [reserve0, reserve1] = await pair.getReserves();

// Calculate price
const price = reserve1 / reserve0;
```

### Instant Exchanges

Use REST APIs for instant exchanges:

```typescript
// StealthEX API integration
const response = await fetch('https://api.stealthex.io/api/v2/exchange', {
  method: 'POST',
  body: JSON.stringify({
    from: 'DOGE',
    to: 'BTC',
    amount: '10000',
    address: 'bc1q...'
  })
});
const exchange = await response.json();
```

## 📊 Network Information

### Dogecoin Mainnet
- **Algorithm:** Scrypt (PoW)
- **Block Time:** ~1 minute
- **Derivation Path:** `m/44'/3'/0'/0/0`
- **Address Format:** D... (base58)
- **Max Supply:** Unlimited (10,000 DOGE per block)

### Dogechain Sidechain
- **Type:** EVM-compatible sidechain
- **Chain ID:** 2000
- **Block Time:** ~3 seconds
- **Derivation Path:** `m/44'/60'/0'/0/0` (Ethereum-compatible)
- **Address Format:** 0x... (Ethereum-compatible)
- **Native Token:** DOGE (18 decimals)

## 🔑 Key TypeScript Packages

### Dogecoin Core Libraries
```bash
npm install bitcoinjs-lib @noble/secp256k1
```

### Dogechain (EVM) Libraries
```bash
npm install ethers web3
```

### API Integration
```bash
npm install node-fetch axios
```

## 📡 Data Sources & APIs

### Dogecoin APIs
- **Dogechain.info API:** `https://dogechain.info/api`
- **Bitquery GraphQL:** `https://bitquery.io`
- **CoinGecko API:** `https://api.coingecko.com/api/v3`

### Dogechain APIs
- **Dogechain Explorer:** `https://explorer.dogechain.dog`
- **DexScreener SDK:** `https://dexscreener.com`

### Price Oracles
- **DIA Oracle:** `https://www.diadata.org`
- **CoinGecko DEX API:** `https://api.coingecko.com`

## 🏛️ Unique Dogecoin Features

### Dual Ecosystem
Dogecoin has two distinct ecosystems:
- **Native DOGE:** UTXO-based, Scrypt mining
- **Dogechain:** EVM-compatible sidechain

### Wrapped DOGE (WDOGE)
- ERC-20 compatible token on Dogechain
- 1:1 backed by native DOGE
- Used in DeFi protocols and DEXs

### Community-Driven DEXs
Most Dogechain DEXs are community-driven:
- Focus on DOGE ecosystem growth
- Include NFT marketplaces and lotteries
- Support token launches and bridges

### Instant Exchanges
Dogecoin is popular on instant exchanges:
- No DEX limits or liquidity issues
- Fast transactions
- Privacy-focused options

## 📋 Data Schema

Each DEX file follows this structure:

```typescript
export const dexName = {
  name: string,           // DEX name
  chain: string,          // 'Dogechain' or 'External'
  type: string,           // DEX type

  // Platform info
  website: string,
  docs?: string,

  // Network info
  network?: object,

  // Contracts and tokens
  contracts?: object,
  tokens?: object,

  // Features
  features: object,

  // Integration
  integrationExample: string,

  // Additional metadata
  notes: string[],
};
```

## 🏷️ Best Practices

### For Dogechain DEXs
1. Use ethers.js or web3.js for contract interaction
2. Always check Chain ID 2000
3. WDOGE is the wrapped version of DOGE
4. Account for 18 decimal places
5. Test on Dogechain testnet first

### For Instant Exchanges
1. Compare rates across platforms
2. Use fixed rates for price protection
3. Check exchange limits and fees
4. Monitor transaction status
5. Use reputable platforms

### For Native DOGE
1. Use bitcoinjs-lib for transactions
2. Account for DOGE-specific address formats
3. Use correct derivation paths
4. Handle Scrypt mining rewards
5. Consider block time differences

## 🔗 Related Resources

### Dogecoin Ecosystem
- **Dogecoin.com:** https://dogecoin.com/
- **Dogechain:** https://dogechain.dog/
- **Dogecoin Core:** https://github.com/dogecoin/dogecoin

### Development Tools
- **Dogecoin Developer Docs:** https://github.com/dogecoin/dogecoin/tree/master/doc
- **Dogechain Docs:** https://docs.dogechain.dog/
- **Bitcoin.js:** https://github.com/bitcoinjs/bitcoinjs-lib

### Community
- **Dogecoin Reddit:** https://reddit.com/r/dogecoin
- **Dogecoin Discord:** https://discord.gg/dogecoin
- **Dogechain Discord:** https://discord.gg/dogechain

## ⚠️ Important Notes

### Technical Considerations
- **Chain Differences:** Native DOGE vs Dogechain
- **Address Formats:** D... vs 0x...
- **Decimal Places:** 8 vs 18 decimals
- **Block Times:** 1 minute vs 3 seconds
- **Mining Algorithm:** Scrypt vs Proof of Stake

### Security Considerations
- **Private Keys:** Never share private keys
- **Contract Audits:** Check DEX contract security
- **Liquidity Risks:** Monitor pool depths
- **Bridge Risks:** Dogechain bridge security
- **Exchange Risks:** Counterparty risk in P2P

### Market Considerations
- **High Volatility:** DOGE price can swing dramatically
- **Meme Coin Status:** Community-driven price action
- **Limited Adoption:** Fewer DEXs than major cryptocurrencies
- **Mining Rewards:** Continuous inflation (10,000 DOGE/block)

---

## 📈 Future Roadmap

### Potential Additions
- [ ] More Dogechain DEXs (as ecosystem grows)
- [ ] Native DOGE DEX protocols
- [ ] RGB Protocol DEXs (advanced smart contracts)
- [ ] Additional instant exchange integrations
- [ ] Price aggregator implementations
- [ ] Cross-chain bridge DEXs

### Maintenance Tasks
- [ ] Monitor DEX contract updates
- [ ] Update API endpoints and documentation
- [ ] Track Dogechain development
- [ ] Update supported asset lists
- [ ] Monitor security incidents

---

**Last Updated:** October 14, 2025
**Total DEXs:** 4
**Categories:** Dogechain AMM (3), Instant Exchange (1)
**Chains Supported:** Dogechain (EVM), External APIs
**Integration Types:** Web3 contracts, REST APIs

