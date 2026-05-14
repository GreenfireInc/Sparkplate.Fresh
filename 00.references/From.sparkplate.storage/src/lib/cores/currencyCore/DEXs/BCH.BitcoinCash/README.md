# Bitcoin Cash DEX Directory

Comprehensive DEX integrations for the Bitcoin Cash ecosystem, covering both smartBCH (EVM-compatible) and native BCH (UTXO-based) exchanges.

## 📁 Directory Structure

```
BCH.BitcoinCash/
├── benSwap.ts         # Leading smartBCH DEX with REST API
├── mistSwap.ts        # smartBCH AMM DEX
├── tangoSwap.ts       # smartBCH AMM DEX
├── cashDEX.ts         # Native BCH atomic swap DEX
├── sideShift.ts       # Cross-chain instant exchange
├── changeNOW.ts       # Non-custodial instant exchange
├── simpleSwap.ts      # Easy instant exchange
├── index.ts           # Exports and metadata
└── README.md          # This documentation
```

## 🔍 Supported DEXs

### smartBCH DEXs (EVM-Compatible)

#### 1. BenSwap - Leading DEX
- **Type:** AMM DEX
- **Chain:** smartBCH (Chain ID: 10000)
- **Features:** REST API, farming, staking, liquidity pools
- **API:** `https://api.benswap.cash/`
- **SDK:** No official SDK
- **Docs:** https://docs.benswap.cash/

#### 2. MistSwap - AMM DEX
- **Type:** AMM DEX
- **Chain:** smartBCH (Chain ID: 10000)
- **Features:** Swaps, farming, staking, pools
- **Integration:** Direct contract queries via ethers.js
- **Docs:** https://docs.mistswap.fi/

#### 3. TangoSwap - AMM DEX
- **Type:** AMM DEX
- **Chain:** smartBCH (Chain ID: 10000)
- **Features:** Token swaps, liquidity pools, farming
- **Integration:** Uniswap V2 compatible contracts
- **Docs:** https://docs.tangoswap.cash/

### Native BCH DEXs

#### 4. CashDEX - Atomic Swap DEX
- **Type:** Atomic Swap DEX
- **Chain:** Native BCH (UTXO-based)
- **Features:** Trustless cross-chain swaps, HTLC contracts
- **Integration:** CashScript for smart contracts
- **Docs:** https://cashdex.network/docs

### Instant Exchanges

#### 5. SideShift.ai - Cross-Chain Exchange
- **Type:** Instant Exchange
- **Features:** No registration, 50+ assets, fixed/variable rates
- **API:** `https://sideshift.ai/api/v2`
- **Custody:** Non-custodial
- **Docs:** https://sideshift.ai/api

#### 6. ChangeNOW - Instant Exchange
- **Type:** Instant Exchange
- **Features:** No registration, 150+ assets, competitive rates
- **API:** `https://api.changenow.io/v2`
- **Custody:** Non-custodial
- **Docs:** https://changenow.io/api

#### 7. SimpleSwap - Instant Exchange
- **Type:** Instant Exchange
- **Features:** Simple interface, 500+ assets, user-friendly
- **API:** `https://api.simpleswap.io/v1`
- **Custody:** Non-custodial
- **Docs:** https://simpleswap.io/api

## 🚀 Usage Examples

### Import Specific DEX

```typescript
// Import a specific DEX
import { benSwap } from './BCH.BitcoinCash/benSwap';

// Load the DEX data
const benSwapData = await benSwap();
console.log('BenSwap API endpoints:', benSwapData.endpoints);
```

### Import from Index

```typescript
// Import from main index
import { benSwap, cashDEX, bchDexMetadata } from './BCH.BitcoinCash';

// Get DEX metadata
console.log('BCH DEX by type:', bchDexMetadata.byType);
console.log('smartBCH DEXs:', bchDexMetadata.byChain.smartBCH);
```

### Query DEX Metadata

```typescript
import { bchDexMetadata } from './BCH.BitcoinCash';

// Get all AMM DEXs
const ammDexes = bchDexMetadata.byType.amm;
console.log('AMM DEXs:', ammDexes); // ['benSwap', 'mistSwap', 'tangoSwap']

// Get DEXs with REST API
const restApiDexes = bchDexMetadata.byFeature.restAPI;
console.log('REST API DEXs:', restApiDexes);

// Get DEXs supporting BCH
const bchSupportingDexes = bchDexMetadata.supportedAssets.bch;
console.log('BCH supporting DEXs:', bchSupportingDexes);
```

## 🛠️ Integration Guides

### smartBCH DEXs (EVM-Compatible)

Use standard Ethereum tooling for smartBCH DEXs:

```typescript
import { ethers } from 'ethers';

// Connect to smartBCH
const provider = new ethers.providers.JsonRpcProvider(
  'https://smartbch.greyh.at'
);

// Example: Query BenSwap router
const routerAddress = '0x...'; // BenSwap router address
const routerABI = [...]; // Router ABI
const router = new ethers.Contract(routerAddress, routerABI, provider);

// Get price quote
const amounts = await router.getAmountsOut(
  ethers.utils.parseEther('1'),
  [tokenA, tokenB]
);
```

### Native BCH DEXs

Use CashScript for native BCH DEXs:

```typescript
import { Contract, ElectrumNetworkProvider } from 'cashscript';

// Connect to BCH network
const provider = new ElectrumNetworkProvider('mainnet');

// Example: Atomic swap contract
const htlcContract = new Contract(contractArtifact, [...params], { provider });
```

### Instant Exchanges

Use REST APIs for instant exchanges:

```typescript
import fetch from 'node-fetch';

// Example: SideShift.ai exchange
const response = await fetch('https://sideshift.ai/api/v2/quotes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    depositMethod: 'bch',
    settleMethod: 'btc',
    depositAmount: '1',
  }),
});
const quote = await response.json();
```

## 📊 Network Information

### Bitcoin Cash (Native)
- **Type:** UTXO-based blockchain
- **Derivation Path:** `m/44'/145'/0'/0/0`
- **Address Format:** Legacy (P2PKH) or CashAddr
- **Block Time:** ~10 minutes
- **Smart Contracts:** CashScript

### smartBCH (Sidechain)
- **Type:** EVM-compatible sidechain
- **Chain ID:** 10000
- **Derivation Path:** `m/44'/60'/0'/0/0` (Ethereum-compatible)
- **Address Format:** 0x... (Ethereum-compatible)
- **Block Time:** ~3 seconds
- **Smart Contracts:** Solidity

## 🔑 Key TypeScript Packages

### For smartBCH DEXs
```bash
npm install ethers web3
```

### For Native BCH DEXs
```bash
npm install cashscript @psf/bch-js bitcoinjs-lib
```

### For Instant Exchanges
```bash
npm install node-fetch axios
```

## 📡 Data Sources & APIs

### Official DEX APIs
- **BenSwap API:** `https://api.benswap.cash/`
- **SideShift API:** `https://sideshift.ai/api/v2`
- **ChangeNOW API:** `https://api.changenow.io/v2`
- **SimpleSwap API:** `https://api.simpleswap.io/v1`

### Blockchain Data
- **Blockchair:** `https://api.blockchair.com/bitcoin-cash/`
- **Bitquery GraphQL:** `https://bitquery.io/blockchains/bitcoin-cash-api`
- **SmartScan:** `https://www.smartscan.cash/`

### Price Oracles
- **CoinGecko:** `https://api.coingecko.com/api/v3/simple/price`
- **DIA Oracle:** `https://www.diadata.org/app/price/asset/BitcoinCash/`

## 🏛️ Block Explorers & APIs

### Bitcoin Cash
- **Blockchair:** https://blockchair.com/bitcoin-cash
- **Tokenview:** https://bch.tokenview.io
- **BscScan-style:** https://www.smartscan.cash/ (for smartBCH)

### API Endpoints
- **Blockchair API:** `https://api.blockchair.com/bitcoin-cash/`
- **SmartScan API:** `https://api.smartscan.cash/`

## 🌐 Unique Features

### Dual Ecosystem
BCH has two distinct DEX ecosystems:
- **smartBCH:** EVM-compatible sidechain with standard AMM DEXs
- **Native BCH:** UTXO-based with atomic swaps and CashTokens

### CashTokens Standard
Native token standard for BCH enabling:
- Fungible tokens
- NFTs
- DEX functionality
- Crowdfunding protocols

### Atomic Swaps
Trustless cross-chain swaps using HTLC contracts:
- No intermediaries required
- Works across different blockchains
- Time-locked for security

## 📋 Data Schema

Each DEX file follows this structure:

```typescript
export const dexName = {
  name: string,           // DEX name
  chain: string,          // 'Bitcoin Cash' or 'smartBCH'
  type: string,           // DEX type
  
  // URLs and documentation
  website: string,
  docs: string,
  apiDocs?: string,
  
  // API information
  apiBase?: string,
  endpoints?: object,
  
  // Social media
  social?: object,
  
  // Network info
  network?: object,
  
  // Contracts and tokens
  contracts?: object,
  tokens?: object,
  
  // Features and capabilities
  features: object,
  
  // Integration example
  integrationExample: string,
  
  // Additional metadata
  notes: string[],
};
```

## 🏷️ Best Practices

### For smartBCH DEXs
1. Use ethers.js or web3.js for contract interaction
2. Always check Chain ID 10000
3. Handle SEP-20 token approvals
4. Account for BCH-specific gas costs

### For Native BCH DEXs
1. Use CashScript for smart contracts
2. Handle UTXO-based transactions
3. Implement proper HTLC timeouts
4. Use CashAddr for addresses

### For Instant Exchanges
1. Check minimum/maximum amounts
2. Monitor exchange status regularly
3. Handle network-specific requirements
4. Implement proper error handling

## 🔗 Related Resources

### Bitcoin Cash Ecosystem
- **BCH Website:** https://bitcoincash.org/
- **CashScript:** https://cashscript.org/
- **CashTokens:** https://cashtokens.org/
- **smartBCH:** https://smartbch.org/

### Development Tools
- **BCH Developer Docs:** https://developer.bitcoin.org/
- **CashScript Docs:** https://next.cashscript.org/docs/
- **smartBCH Docs:** https://docs.smartbch.org/

### Community
- **BCH Reddit:** https://reddit.com/r/BitcoinCash
- **BCH Telegram:** https://t.me/bitcoincash
- **smartBCH Discord:** https://discord.gg/smartbch

## ⚠️ Important Notes

### smartBCH Considerations
- EVM-compatible but separate from Ethereum mainnet
- Uses BCH as native currency (18 decimals)
- SEP-20 tokens are ERC-20 compatible
- Block time is ~3 seconds (faster than Ethereum)

### Native BCH Considerations
- UTXO-based blockchain (not account-based)
- Smart contracts via CashScript
- CashTokens for token functionality
- Atomic swaps require both parties online

### General DEX Notes
- No centralized exchange fees for instant exchanges
- Atomic swaps are trustless but require coordination
- smartBCH DEXs follow Ethereum patterns
- Always verify contract addresses before use

---

## 📈 Future Roadmap

### Potential Additions
- [ ] More smartBCH DEXs (as ecosystem grows)
- [ ] Native CashTokens DEX implementations
- [ ] Cross-chain bridge integrations
- [ ] Additional instant exchange APIs
- [ ] Price aggregator implementations
- [ ] MEV protection strategies

### Maintenance Tasks
- [ ] Monitor DEX contract address changes
- [ ] Update API endpoint availability
- [ ] Track new DEX launches
- [ ] Update social media links
- [ ] Refresh integration examples

---

**Last Updated:** October 13, 2025
**Total DEXs:** 7
**Chains Supported:** Bitcoin Cash + smartBCH
**Integration Types:** REST API, Web3, CashScript

