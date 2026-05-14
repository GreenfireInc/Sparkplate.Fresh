// Bitcoin DEX Exports
// Comprehensive DEX integrations for Bitcoin ecosystem

export const bisq = () => import('./bisq.BTC');
export const hodlHodl = () => import('./hodlHodl.BTC');
export const robosats = () => import('./robosats.BTC');
export const boltz = () => import('./boltz.BTC');
export const fixedFloat = () => import('./fixedFloat.BTC');
export const thorchain = () => import('./thorchain.BTC');

// Bitcoin DEX Metadata
export const btcDexMetadata = {
  byType: {
    p2p: ['bisq', 'hodlHodl'],
    lightningP2P: ['robosats'],
    atomicSwap: ['boltz'],
    instantExchange: ['fixedFloat'],
    crossChainAMM: ['thorchain'],
  },

  byCustody: {
    nonCustodial: ['bisq', 'hodlHodl', 'robosats', 'boltz', 'fixedFloat', 'thorchain'],
  },

  byPrivacy: {
    privacyFocused: ['robosats', 'bisq', 'hodlHodl'],
    torRequired: ['robosats'],
    noKYC: ['bisq', 'hodlHodl', 'robosats', 'boltz', 'fixedFloat', 'thorchain'],
  },

  byLightning: {
    lightningIntegrated: ['robosats', 'boltz'],
    submarineSwaps: ['boltz'],
  },

  supportedAssets: {
    btc: ['bisq', 'hodlHodl', 'robosats', 'boltz', 'fixedFloat', 'thorchain'],
    lightning: ['robosats', 'boltz'],
    crossChain: ['boltz', 'fixedFloat', 'thorchain'],
  },

  // Integration guides by DEX type
  integrationGuides: {
    p2pDesktop: {
      description: 'Desktop P2P exchanges requiring local installation',
      tools: ['Local daemon/API', 'Multi-party computation'],
      dexes: ['bisq'],
    },
    p2pWeb: {
      description: 'Web-based P2P exchanges with escrow',
      tools: ['REST API', 'Web interface'],
      dexes: ['hodlHodl'],
    },
    lightningP2P: {
      description: 'Lightning Network P2P with Tor integration',
      tools: ['Tor', 'Lightning Network', 'REST API'],
      dexes: ['robosats'],
    },
    atomicSwap: {
      description: 'Atomic swap exchanges with Lightning integration',
      tools: ['HTLC', 'Submarine swaps', 'REST API'],
      dexes: ['boltz'],
    },
    instantExchange: {
      description: 'Fast instant exchanges with API access',
      tools: ['REST API', 'Rate monitoring'],
      dexes: ['fixedFloat'],
    },
    crossChainAMM: {
      description: 'Cross-chain AMM with native BTC support',
      tools: ['REST API', 'GraphQL', 'SDK'],
      dexes: ['thorchain'],
    },
  },
};

// Bitcoin Network Information
export const btcNetworkInfo = {
  mainnet: {
    derivationPaths: {
      legacy: 'm/44\'/0\'/0\'/0/0',
      segwit: 'm/49\'/0\'/0\'/0/0',
      nativeSegwit: 'm/84\'/0\'/0\'/0/0',
      taproot: 'm/86\'/0\'/0\'/0/0',
    },
    addressFormats: {
      legacy: '1...',
      segwit: '3...',
      nativeSegwit: 'bc1q...',
      taproot: 'bc1p...',
    },
  },
  testnet: {
    derivationPaths: {
      legacy: 'm/44\'/1\'/0\'/0/0',
      segwit: 'm/49\'/1\'/0\'/0/0',
      nativeSegwit: 'm/84\'/1\'/0\'/0/0',
      taproot: 'm/86\'/1\'/0\'/0/0',
    },
  },
};

// Key TypeScript Packages for BTC DEX Integration
export const btcNpmPackages = [
  {
    name: 'bitcoinjs-lib',
    description: 'Bitcoin transaction library',
    install: 'npm install bitcoinjs-lib',
    docs: 'https://github.com/bitcoinjs/bitcoinjs-lib',
    useCase: 'BTC transaction handling',
  },
  {
    name: '@noble/secp256k1',
    description: 'Bitcoin elliptic curve operations',
    install: 'npm install @noble/secp256k1',
    docs: 'https://github.com/paulmillr/noble-secp256k1',
    useCase: 'BTC cryptography',
  },
  {
    name: 'bip39',
    description: 'Bitcoin BIP39 mnemonic handling',
    install: 'npm install bip39',
    docs: 'https://github.com/bitcoinjs/bip39',
    useCase: 'BTC seed phrase handling',
  },
  {
    name: 'wif',
    description: 'Bitcoin WIF encoding/decoding',
    install: 'npm install wif',
    docs: 'https://github.com/bitcoinjs/wif',
    useCase: 'BTC private key format conversion',
  },
  {
    name: 'bs58',
    description: 'Bitcoin Base58 encoding',
    install: 'npm install bs58',
    docs: 'https://github.com/cryptocoinjs/bs58',
    useCase: 'BTC address encoding',
  },
  {
    name: 'cashscript',
    description: 'Bitcoin Cash smart contracts (for BCH)',
    install: 'npm install cashscript',
    docs: 'https://cashscript.org/',
    useCase: 'BTC script operations',
  },
];

// Data Sources for BTC DEX Pricing
export const btcDataSources = [
  {
    name: 'Bisq Daemon',
    type: 'Local API',
    description: 'Run Bisq locally for order book access',
    setup: 'Requires Bisq desktop application',
  },
  {
    name: 'RoboSats API',
    type: 'REST API',
    url: 'https://robosats.com/api',
    description: 'Lightning P2P order book data',
    privacy: 'Tor integration required',
  },
  {
    name: 'Boltz API',
    type: 'REST API',
    url: 'https://api.boltz.exchange',
    description: 'Atomic swap rates and status',
    features: ['Submarine swaps', 'Cross-chain rates'],
  },
  {
    name: 'FixedFloat API',
    type: 'REST API',
    url: 'https://fixedfloat.com/api/v2',
    description: 'Instant exchange rates and limits',
    features: ['Fixed/float rates', 'Multi-currency'],
  },
  {
    name: 'THORChain APIs',
    type: 'REST + GraphQL',
    urls: ['https://thornode.thorchain.info', 'https://midgard.thorchain.info'],
    description: 'Cross-chain AMM with native BTC',
    features: ['Pool data', 'Swap quotes', 'GraphQL'],
  },
  {
    name: 'CoinGecko API',
    type: 'REST API',
    url: 'https://api.coingecko.com/api/v3',
    description: 'Cryptocurrency price data',
    features: ['BTC price', 'DEX data'],
  },
  {
    name: 'Bitquery GraphQL',
    type: 'GraphQL API',
    url: 'https://bitquery.io',
    description: 'Blockchain analytics',
    features: ['DEX trades', 'BTC transactions'],
  },
];

export default btcDexMetadata;
