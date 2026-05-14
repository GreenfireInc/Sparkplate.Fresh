// Dogecoin DEX Exports
// Comprehensive DEX integrations for Dogecoin ecosystem

export const dogeswap = () => import('./dogeswap.DOGE');
export const kibbleSwap = () => import('./kibbleSwap.DOGE');
export const yodeswap = () => import('./yodeswap.DOGE');
export const stealthex = () => import('./stealthex.DOGE');

// Dogecoin DEX Metadata
export const dogeDexMetadata = {
  byType: {
    amm: ['dogeswap', 'kibbleSwap', 'yodeswap'],
    instantExchange: ['stealthex'],
  },

  byChain: {
    dogechain: ['dogeswap', 'kibbleSwap', 'yodeswap'],
    external: ['stealthex'],
  },

  byCustody: {
    nonCustodial: ['dogeswap', 'kibbleSwap', 'yodeswap', 'stealthex'],
  },

  byPrivacy: {
    privacyFocused: ['stealthex'],
    noKYC: ['stealthex'],
  },

  byFeatures: {
    farming: ['dogeswap', 'kibbleSwap', 'yodeswap'],
    staking: ['dogeswap', 'kibbleSwap', 'yodeswap'],
    nftMarketplace: ['kibbleSwap'],
    lottery: ['kibbleSwap'],
    launchpad: ['yodeswap'],
    bridge: ['yodeswap'],
    apiAccess: ['stealthex'],
  },

  supportedAssets: {
    doge: ['dogeswap', 'kibbleSwap', 'yodeswap', 'stealthex'],
    wdoge: ['dogeswap', 'kibbleSwap', 'yodeswap'],
    crossChain: ['stealthex'],
  },

  // Integration guides by DEX type
  integrationGuides: {
    dogechainAMM: {
      description: 'EVM-compatible AMM DEXs on Dogechain sidechain',
      tools: ['ethers.js', 'web3.js', 'Uniswap V2 SDK'],
      dexes: ['dogeswap', 'kibbleSwap', 'yodeswap'],
    },
    instantExchange: {
      description: 'Fast instant exchanges with REST API access',
      tools: ['node-fetch', 'axios'],
      dexes: ['stealthex'],
    },
  },
};

// Dogecoin Network Information
export const dogeNetworkInfo = {
  mainnet: {
    derivationPath: 'm/44\'/3\'/0\'/0/0',
    addressFormat: 'D...',
    scriptHash: 0x16, // P2SH
    pubkeyHash: 0x1e, // P2PKH
  },
  dogechain: {
    chainId: 2000,
    derivationPath: 'm/44\'/60\'/0\'/0/0', // Ethereum-compatible
    addressFormat: '0x...',
    nativeCurrency: {
      name: 'Dogecoin',
      symbol: 'DOGE',
      decimals: 18,
    },
    rpcUrls: [
      'https://rpc.dogechain.dog',
      'https://rpc01-sg.dogechain.dog',
      'https://rpc02-sg.dogechain.dog',
    ],
    blockExplorerUrls: ['https://explorer.dogechain.dog'],
  },
};

// Key TypeScript Packages for Dogecoin DEX Integration
export const dogeNpmPackages = [
  {
    name: 'bitcoinjs-lib',
    description: 'Bitcoin/Dogecoin transaction library',
    install: 'npm install bitcoinjs-lib',
    docs: 'https://github.com/bitcoinjs/bitcoinjs-lib',
    useCase: 'DOGE transaction handling',
  },
  {
    name: '@noble/secp256k1',
    description: 'Bitcoin elliptic curve operations',
    install: 'npm install @noble/secp256k1',
    docs: 'https://github.com/paulmillr/noble-secp256k1',
    useCase: 'DOGE cryptography',
  },
  {
    name: 'ethers',
    description: 'Ethereum/Dogechain interaction',
    install: 'npm install ethers',
    docs: 'https://docs.ethers.org/',
    useCase: 'Dogechain DEXs',
  },
  {
    name: 'web3',
    description: 'Web3.js library for EVM chains',
    install: 'npm install web3',
    docs: 'https://web3js.readthedocs.io/',
    useCase: 'Dogechain DEXs',
  },
  {
    name: 'node-fetch',
    description: 'HTTP requests for APIs',
    install: 'npm install node-fetch',
    docs: 'https://github.com/node-fetch/node-fetch',
    useCase: 'DEX API integration',
  },
];

// Data Sources for Dogecoin DEX Pricing
export const dogeDataSources = [
  {
    name: 'Dogechain API',
    type: 'REST API',
    url: 'https://dogechain.info/api',
    description: 'Dogecoin blockchain data and transactions',
    features: ['Address balances', 'Transactions', 'Network stats'],
  },
  {
    name: 'Bitquery GraphQL',
    type: 'GraphQL API',
    url: 'https://bitquery.io',
    description: 'Advanced blockchain analytics',
    features: ['DEX trades', 'Token transfers', 'Analytics'],
  },
  {
    name: 'CoinGecko API',
    type: 'REST API',
    url: 'https://api.coingecko.com/api/v3',
    description: 'Cryptocurrency market data',
    features: ['DOGE price', 'Market stats', 'Exchange data'],
  },
  {
    name: 'DIA Oracle',
    type: 'API + Smart Contracts',
    url: 'https://www.diadata.org',
    description: 'Decentralized price oracles',
    features: ['DOGE/USD feeds', 'Cross-chain oracles'],
  },
  {
    name: 'Dogechain Explorer',
    type: 'Block Explorer API',
    url: 'https://explorer.dogechain.dog',
    description: 'Dogechain block explorer',
    features: ['Contract data', 'Transactions', 'Token info'],
  },
  {
    name: 'DexScreener SDK',
    type: 'SDK',
    url: 'https://dexscreener.com',
    description: 'DEX aggregator with API',
    features: ['Multi-chain DEX data', 'Price feeds'],
  },
];

export default dogeDexMetadata;
