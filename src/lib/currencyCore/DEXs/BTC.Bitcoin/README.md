# Bitcoin DEX Directory

Comprehensive DEX integrations for the Bitcoin ecosystem, covering P2P exchanges, atomic swaps, Lightning Network DEXs, and cross-chain AMMs with native BTC support.

## 📁 Directory Structure

```
BTC.Bitcoin/
├── bisq.ts           # P2P decentralized exchange
├── hodlHodl.ts       # Non-custodial P2P exchange
├── robosats.ts       # Lightning Network P2P (Tor)
├── boltz.ts          # Atomic swap exchange
├── fixedFloat.ts     # Instant exchange
├── thorchain.ts      # Cross-chain AMM (native BTC)
├── index.ts          # Exports and metadata
└── README.md         # This documentation
```

## 🔍 Supported DEXs

### P2P Decentralized Exchanges

#### 1. Bisq - Decentralized P2P Exchange
- **Type:** P2P Decentralized Exchange
- **Custody:** Non-custodial
- **Features:** Multisig escrow, arbitration, reputation system
- **Integration:** Local daemon API
- **Docs:** https://docs.basicswapdex.com/

#### 2. HODL HODL - Non-Custodial P2P Exchange
- **Type:** P2P Trading Platform
- **Custody:** Non-custodial
- **Features:** 2-of-2 multisig escrow, fiat onramp, no arbitration
- **Integration:** Limited API access
- **Docs:** https://hodlhodl.com/pages/faq

### Lightning Network DEXs

#### 3. RoboSats - Lightning P2P Exchange
- **Type:** Lightning Network P2P
- **Custody:** Non-custodial
- **Features:** Tor privacy, Lightning escrow, no KYC
- **Integration:** REST API (Tor required)
- **Docs:** https://learn.robosats.com/

#### 4. Boltz - Atomic Swap Exchange
- **Type:** Atomic Swap Exchange
- **Custody:** Non-custodial
- **Features:** Submarine swaps, Lightning integration, cross-chain
- **Integration:** REST API + SDK
- **Docs:** https://docs.boltz.exchange/

### Instant Exchanges

#### 5. FixedFloat - Instant Exchange
- **Type:** Instant Exchange
- **Custody:** Non-custodial
- **Features:** Fixed/float rates, 50+ assets, no registration
- **Integration:** REST API
- **Docs:** https://fixedfloat.com/api

### Cross-Chain AMMs

#### 6. THORChain - Cross-Chain AMM
- **Type:** Cross-Chain AMM
- **Custody:** Non-custodial
- **Features:** Native BTC support, 60+ assets, TSS security
- **Integration:** REST API + GraphQL + SDK
- **Docs:** https://docs.thorchain.org/

## 🚀 Usage Examples

### Import Specific DEX

```typescript
// Import a specific DEX
import { bisq } from './BTC.Bitcoin/bisq';

// Load the DEX data
const bisqData = await bisq();
console.log('Bisq features:', bisqData.features);
```

### Import from Index

```typescript
// Import from main index
import { bisq, btcDexMetadata } from './BTC.Bitcoin';

// Get DEX metadata
console.log('BTC DEX by type:', btcDexMetadata.byType);
console.log('Lightning DEXs:', btcDexMetadata.byLightning.lightningIntegrated);
```

### Query DEX Metadata

```typescript
import { btcDexMetadata } from './BTC.Bitcoin';

// Get all non-custodial DEXs
const nonCustodial = btcDexMetadata.byCustody.nonCustodial;
console.log('Non-custodial DEXs:', nonCustodial);

// Get privacy-focused DEXs
const privacyDexes = btcDexMetadata.byPrivacy.privacyFocused;
console.log('Privacy DEXs:', privacyDexes);

// Get DEXs supporting BTC
const btcDexes = btcDexMetadata.supportedAssets.btc;
console.log('BTC supporting DEXs:', btcDexes);
```

## 🛠️ Integration Guides

### P2P Desktop Exchanges

Use local daemon APIs for desktop P2P exchanges:

```typescript
// Example: Bisq daemon integration
import { spawn } from 'child_process';

async function startBisqDaemon() {
  const daemon = spawn('bisq-daemon', ['--apiPort=9998']);
  // Daemon runs locally for API access
}

// Query order book
async function getBisqOffers() {
  const response = await fetch('http://localhost:9998/api/offers');
  return await response.json();
}
```

### Lightning Network DEXs

Use Lightning Network and Tor for privacy-focused DEXs:

```typescript
// Example: RoboSats integration (requires Tor)
const ROBOSATS_API = 'https://robosats.com/api';

async function getRoboSatsOrderBook() {
  const response = await fetch(`${ROBOSATS_API}/book`);
  return await response.json();
}

// Example: Boltz submarine swap
async function createSubmarineSwap(invoice: string) {
  const response = await fetch('https://api.boltz.exchange/v2/swap/submarine', {
    method: 'POST',
    body: JSON.stringify({ invoice })
  });
  return await response.json();
}
```

### Instant Exchanges

Use REST APIs for fast instant exchanges:

```typescript
// Example: FixedFloat integration
const FIXEDFLOAT_API = 'https://fixedfloat.com/api/v2';

async function createFixedFloatExchange() {
  const response = await fetch(`${FIXEDFLOAT_API}/exchange`, {
    method: 'POST',
    body: JSON.stringify({
      fromCurrency: 'BTC',
      toCurrency: 'ETH',
      amount: '0.1',
      toAddress: '0x...'
    })
  });
  return await response.json();
}
```

### Cross-Chain AMMs

Use REST + GraphQL APIs for cross-chain AMMs:

```typescript
// Example: THORChain integration
const THORCHAIN_API = 'https://thornode.thorchain.info';

async function getThorchainQuote() {
  const response = await fetch(
    `${THORCHAIN_API}/thorchain/quote/swap?` +
    'from_asset=BTC.BTC&to_asset=ETH.ETH&amount=1000000&destination=0x...'
  );
  return await response.json();
}
```

## 📊 Network Information

### Bitcoin Mainnet
- **Address Formats:** Legacy (1...), SegWit (3...), Native SegWit (bc1q...), Taproot (bc1p...)
- **Derivation Paths:**
  - Legacy: `m/44'/0'/0'/0/0`
  - SegWit: `m/49'/0'/0'/0/0`
  - Native SegWit: `m/84'/0'/0'/0/0`
  - Taproot: `m/86'/0'/0'/0/0`

### Lightning Network
- **Payment Channels:** Bidirectional payment channels
- **Invoices:** BOLT11 standard
- **Privacy:** Onion routing
- **Speed:** Near-instant settlements

## 🔑 Key TypeScript Packages

### Bitcoin Core Libraries
```bash
npm install bitcoinjs-lib @noble/secp256k1 bip39 wif bs58
```

### Lightning Network
```bash
npm install @lightninglabs/lnc-core lightning
```

### API Integration
```bash
npm install node-fetch axios
```

## 📡 Data Sources & APIs

### DEX APIs
- **Bisq Daemon:** Local API (requires Bisq installation)
- **RoboSats API:** `https://robosats.com/api`
- **Boltz API:** `https://api.boltz.exchange`
- **FixedFloat API:** `https://fixedfloat.com/api/v2`
- **THORChain APIs:** `https://thornode.thorchain.info`, `https://midgard.thorchain.info`

### Price Oracles
- **CoinGecko API:** `https://api.coingecko.com/api/v3`
- **Bitquery GraphQL:** `https://bitquery.io`

### Block Explorers
- **Blockstream:** `https://blockstream.info/api`
- **Blockchair:** `https://api.blockchair.com/bitcoin`
- **Blockchain.com:** `https://blockchain.info/api`

## 🏛️ Unique Bitcoin Features

### Multiple Address Formats
Bitcoin supports multiple address formats for different use cases:
- **Legacy (P2PKH):** Original format, widely compatible
- **SegWit (P2SH):** SegWit compatibility wrapper
- **Native SegWit (P2WPKH):** Efficient SegWit addresses
- **Taproot (P2TR):** Latest upgrade with advanced features

### Lightning Network
Second-layer scaling solution:
- **Instant Payments:** Sub-second confirmations
- **Low Fees:** Micropayment-capable
- **Privacy:** Onion routing
- **Scalability:** Off-chain transactions

### Atomic Swaps
Trustless cross-chain value transfer:
- **HTLC Contracts:** Hash timelock contracts
- **No Intermediaries:** Direct peer-to-peer
- **Cross-Chain:** Bitcoin to other blockchains
- **Security:** Cryptographic guarantees

### Privacy Considerations
Many BTC DEXs emphasize privacy:
- **Tor Integration:** RoboSats requires Tor
- **No KYC:** Most DEXs don't require identity
- **Non-Custodial:** Funds never held by platform
- **P2P Trading:** Direct between users

## 📋 Data Schema

Each DEX file follows this structure:

```typescript
export const dexName = {
  name: string,           // DEX name
  type: string,           // DEX type
  website: string,        // Main website
  docs?: string,          // Documentation URL

  // Features and capabilities
  features: object,       // Feature flags
  social?: object,        // Social media links

  // Supported assets
  supportedAssets?: string[],

  // Integration
  integrationExample: string,  // TypeScript example

  // Additional metadata
  notes: string[],        // Important notes
};
```

## 🏷️ Best Practices

### For P2P DEXs
1. Use multisig escrow for security
2. Verify counterparty reputation
3. Use secure communication channels
4. Follow platform dispute procedures

### For Lightning DEXs
1. Use Tor for privacy (RoboSats)
2. Understand Lightning channel management
3. Monitor channel liquidity
4. Use reputable Lightning nodes

### For Atomic Swaps
1. Verify contract addresses
2. Understand timelock mechanisms
3. Test on testnet first
4. Monitor swap status closely

### For Instant Exchanges
1. Compare rates across platforms
2. Use fixed rates for price protection
3. Verify exchange limits
4. Monitor transaction status

### For Cross-Chain AMMs
1. Check pool liquidity
2. Understand bridge security
3. Verify TSS implementation
4. Monitor cross-chain fees

## 🔗 Related Resources

### Bitcoin Ecosystem
- **Bitcoin.org:** https://bitcoin.org/
- **Bitcoin Core:** https://bitcoincore.org/
- **Lightning Network:** https://lightning.network/

### Development Tools
- **Bitcoin Developer Docs:** https://developer.bitcoin.org/
- **Lightning Labs:** https://lightning.engineering/
- **BIP Repository:** https://github.com/bitcoin/bips

### Community
- **Bitcoin Stack Exchange:** https://bitcoin.stackexchange.com/
- **Lightning Dev Mailing List:** https://lists.linuxfoundation.org/mailman/listinfo/lightning-dev
- **Bitcoin Core IRC:** irc://irc.freenode.net/bitcoin-core-dev

## ⚠️ Important Notes

### Security Considerations
- **Private Keys:** Never share private keys
- **Multisig:** Use multisig for large amounts
- **Verification:** Always verify addresses and amounts
- **Updates:** Keep software updated
- **Backups:** Secure wallet backups

### Privacy Considerations
- **Tor Usage:** Use Tor for privacy-focused DEXs
- **IP Protection:** Avoid IP logging
- **No KYC:** Choose non-KYC platforms when possible
- **VPN Usage:** Consider VPN for additional privacy

### Technical Considerations
- **Network Fees:** Account for Bitcoin network fees
- **Confirmation Times:** Bitcoin confirmations take ~10 minutes
- **Lightning Channels:** Requires channel management
- **Cross-Chain:** Additional security considerations
- **Liquidity:** Check available liquidity before trading

### Regulatory Considerations
- **Jurisdiction:** Different platforms have different legal status
- **Compliance:** Some platforms may require KYC in certain jurisdictions
- **Tax Reporting:** Keep records for tax purposes
- **AML:** Be aware of AML requirements

---

## 📈 Future Roadmap

### Potential Additions
- [ ] More Lightning Network DEXs (as ecosystem grows)
- [ ] Additional atomic swap protocols
- [ ] RGB Protocol DEXs (Bitcoin smart contracts)
- [ ] Liquid Network DEXs
- [ ] Additional cross-chain AMM integrations
- [ ] Privacy coin atomic swaps
- [ ] Lightning channel management tools
- [ ] Multi-party computation DEXs

### Maintenance Tasks
- [ ] Monitor DEX security incidents
- [ ] Update API endpoints and documentation
- [ ] Track new Bitcoin upgrades (Taproot, etc.)
- [ ] Update Lightning Network developments
- [ ] Monitor cross-chain bridge security
- [ ] Update privacy tool recommendations

---

**Last Updated:** October 14, 2025
**Total DEXs:** 6
**Categories:** P2P (2), Lightning (2), Instant (1), Cross-Chain AMM (1)
**Integration Types:** Daemon APIs, REST APIs, Tor, Lightning Network

