// Bitcoin Cash DEX Exports
// Comprehensive DEX integrations for Bitcoin Cash ecosystem

export const benSwap = () => import('./benSwap.BCH');
export const mistSwap = () => import('./mistSwap.BCH');
export const tangoSwap = () => import('./tangoSwap.BCH');
export const cashDEX = () => import('./cashDEX.BCH');
export const sideShift = () => import('./sideShift.BCH');
export const changeNOW = () => import('./changeNOW.BCH');
export const simpleSwap = () => import('./simpleSwap.BCH');

// Bitcoin Cash DEX Metadata
export const bchDexMetadata = {
  byType: {
    amm: ['benSwap', 'mistSwap', 'tangoSwap'],
    atomicSwap: ['cashDEX'],
    instantExchange: ['sideShift', 'changeNOW', 'simpleSwap'],
    crossChain: ['sideShift', 'changeNOW', 'simpleSwap'],
  },

  byChain: {
    smartBCH: ['benSwap', 'mistSwap', 'tangoSwap'],
    nativeBCH: ['cashDEX'],
    external: ['sideShift', 'changeNOW', 'simpleSwap'],
  },

  byFeature: {
    restAPI: ['benSwap', 'sideShift', 'changeNOW', 'simpleSwap'],
    web3Integration: ['benSwap', 'mistSwap', 'tangoSwap'],
    cashScript: ['cashDEX'],
    noRegistration: ['sideShift', 'changeNOW', 'simpleSwap'],
    nonCustodial: ['cashDEX', 'sideShift', 'changeNOW', 'simpleSwap'],
    crossChain: ['sideShift', 'changeNOW', 'simpleSwap'],
    farming: ['benSwap', 'mistSwap', 'tangoSwap'],
    staking: ['benSwap', 'mistSwap', 'tangoSwap'],
  },

  supportedAssets: {
    bch: ['benSwap', 'mistSwap', 'tangoSwap', 'cashDEX', 'sideShift', 'changeNOW', 'simpleSwap'],
    btc: ['cashDEX', 'sideShift', 'changeNOW', 'simpleSwap'],
    eth: ['sideShift', 'changeNOW', 'simpleSwap'],
    ltc: ['cashDEX', 'sideShift', 'changeNOW', 'simpleSwap'],
    usdt: ['benSwap', 'mistSwap', 'tangoSwap', 'sideShift', 'changeNOW', 'simpleSwap'],
    usdc: ['benSwap', 'mistSwap', 'tangoSwap', 'sideShift', 'changeNOW', 'simpleSwap'],
  },

  // Integration guides by DEX type
  integrationGuides: {
    smartBCH: {
      description: 'EVM-compatible sidechain DEXs using ethers.js/web3.js',
      tools: ['ethers', 'web3', '@pancakeswap/sdk'],
      dexes: ['benSwap', 'mistSwap', 'tangoSwap'],
    },
    nativeBCH: {
      description: 'UTXO-based DEXs using CashScript and atomic swaps',
      tools: ['cashscript', '@psf/bch-js', 'bitcoinjs-lib'],
      dexes: ['cashDEX'],
    },
    instantExchange: {
      description: 'REST API-based instant exchanges for quick swaps',
      tools: ['node-fetch', 'axios'],
      dexes: ['sideShift', 'changeNOW', 'simpleSwap'],
    },
  },
};

// Bitcoin Cash Network Information
export const bchNetworkInfo = {
  mainnet: {
    chainId: null, // UTXO-based
    nativeCurrency: {
      name: 'Bitcoin Cash',
      symbol: 'BCH',
      decimals: 8,
    },
    rpcUrls: [
      'https://api.fullstack.cash/v5/bch/mainnet',
      'https://bch.trezor.io/',
      'https://bch.api.blokhub.io/',
    ],
    blockExplorerUrls: ['https://blockchair.com/bitcoin-cash'],
  },
  smartBCH: {
    chainId: 10000,
    nativeCurrency: {
      name: 'Bitcoin Cash',
      symbol: 'BCH',
      decimals: 18,
    },
    rpcUrls: [
      'https://smartbch.greyh.at',
      'https://smartbch.fountainhead.cash/mainnet',
    ],
    blockExplorerUrls: ['https://www.smartscan.cash/'],
  },
};

// Key TypeScript Packages for BCH DEX Integration
export const bchNpmPackages = [
  {
    name: 'cashscript',
    description: 'TypeScript SDK for Bitcoin Cash smart contracts',
    install: 'npm install cashscript',
    docs: 'https://cashscript.org/docs/',
    useCase: 'Native BCH DEXs and atomic swaps',
  },
  {
    name: '@psf/bch-js',
    description: 'JavaScript library for Bitcoin Cash blockchain',
    install: 'npm install @psf/bch-js',
    docs: 'https://bchjs.cash/',
    useCase: 'BCH blockchain interaction',
  },
  {
    name: 'bitcoinjs-lib',
    description: 'Bitcoin/BCH transaction library',
    install: 'npm install bitcoinjs-lib',
    docs: 'https://github.com/bitcoinjs/bitcoinjs-lib',
    useCase: 'UTXO transaction handling',
  },
  {
    name: 'ethers',
    description: 'Ethereum/BCH EVM interaction',
    install: 'npm install ethers',
    docs: 'https://docs.ethers.org/',
    useCase: 'smartBCH DEXs',
  },
  {
    name: 'web3',
    description: 'Web3.js library for EVM chains',
    install: 'npm install web3',
    docs: 'https://web3js.readthedocs.io/',
    useCase: 'smartBCH DEXs',
  },
];

// Data Sources for BCH Pricing
export const bchDataSources = [
  {
    name: 'BenSwap API',
    type: 'REST API',
    url: 'https://api.benswap.cash/',
    description: 'smartBCH DEX data and pricing',
    features: ['Live prices', 'Trading data', 'Pair info', 'Historical data'],
  },
  {
    name: 'Blockchair API',
    type: 'REST API',
    url: 'https://api.blockchair.com/bitcoin-cash/',
    description: 'Bitcoin Cash blockchain data',
    features: ['UTXOs', 'Transactions', 'Addresses', 'Stats'],
  },
  {
    name: 'Bitquery GraphQL',
    type: 'GraphQL API',
    url: 'https://bitquery.io/blockchains/bitcoin-cash-api',
    description: 'Indexed Bitcoin Cash data',
    features: ['Transactions', 'Addresses', 'Analytics'],
  },
  {
    name: 'CoinGecko API',
    type: 'REST API',
    url: 'https://api.coingecko.com/api/v3/simple/price',
    description: 'Cryptocurrency price data',
    features: ['BCH price', 'Market data'],
  },
  {
    name: 'DIA Oracle',
    type: 'API',
    url: 'https://www.diadata.org/app/price/asset/BitcoinCash/',
    description: 'Decentralized oracle price feeds',
    features: ['Price feeds', 'Historical data'],
  },
];

export default bchDexMetadata;
