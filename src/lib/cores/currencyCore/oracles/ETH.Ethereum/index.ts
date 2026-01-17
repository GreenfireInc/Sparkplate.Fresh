// Ethereum (ETH) Oracles Index - Export Module
// This module exports all Ethereum oracles for price feeds, blockchain data, DEX analytics, and indexing

export { chainlinkOracle as ethereumChainlinkOracle } from './chainlink';
export { pythOracle as ethereumPythOracle } from './pyth';
export { thegraphOracle as ethereumThegraphOracle } from './thegraph';
export { etherscanOracle as ethereumEtherscanOracle } from './etherscan';
export { uniswapOracle as ethereumUniswapOracle } from './uniswap';
export { redstoneOracle as ethereumRedstoneOracle } from './redstone';
export { diaOracle as ethereumDiaOracle } from './dia';

// Lazy-load object for all Ethereum oracles
export const ethereumOraclesLazy = {
  chainlink: () => import('./chainlink').then(m => m.chainlinkOracle),
  pyth: () => import('./pyth').then(m => m.pythOracle),
  thegraph: () => import('./thegraph').then(m => m.thegraphOracle),
  etherscan: () => import('./etherscan').then(m => m.etherscanOracle),
  uniswap: () => import('./uniswap').then(m => m.uniswapOracle),
  redstone: () => import('./redstone').then(m => m.redstoneOracle),
  dia: () => import('./dia').then(m => m.diaOracle),
};

// Metadata for Ethereum Oracle ecosystem
export const ethereumOraclesMetadata = {
  totalOracles: 7,
  blockchain: 'Ethereum (ETH)',
  categories: {
    decentralized: ['Chainlink', 'Pyth', 'DIA', 'RedStone'],
    indexing: ['The Graph'],
    blockchainExplorers: ['Etherscan'],
    dexOracles: ['Uniswap'],
  },
  features: {
    priceFeeds: ['Chainlink', 'Pyth', 'DIA', 'RedStone', 'Uniswap'],
    blockchainData: ['Etherscan', 'The Graph'],
    historicalData: ['The Graph', 'Etherscan', 'DIA', 'Uniswap'],
    realTimeData: ['Pyth', 'Chainlink', 'Uniswap'],
    dexData: ['Uniswap', 'The Graph'],
    gasTracking: ['Etherscan'],
  },
  integration: {
    primaryPackages: ['ethers', 'axios', 'graphql-request', '@uniswap/sdk-core'],
    evmCompatible: true,
    chainId: 1,
    rpcEndpoints: [
      'https://eth-mainnet.alchemyapi.io/v2/YOUR_KEY',
      'https://mainnet.infura.io/v3/YOUR_KEY',
      'https://eth.public.zph.link',
    ],
    indexers: ['The Graph', 'Etherscan'],
  },
  notes: [
    'Ethereum is the largest smart contract platform',
    'Chainlink is the industry standard oracle (billions in TVL secured)',
    'Pyth provides fastest updates (400ms) for high-frequency trading',
    'The Graph is the standard for indexing and GraphQL queries',
    'Etherscan is the premier Ethereum block explorer',
    'Uniswap is the largest DEX with comprehensive SDK and subgraphs',
    'RedStone is optimized for L2 networks and gas efficiency',
    'DIA provides open-source, transparent oracle data',
    'Most DeFi protocols use multiple oracles for redundancy',
    'Ethereum has the most mature oracle ecosystem',
  ],
  dataSourcesByType: {
    price: {
      recommended: ['Chainlink', 'Pyth', 'Uniswap'],
      realTime: ['Pyth', 'Chainlink', 'Uniswap'],
      historical: ['The Graph', 'DIA', 'Etherscan'],
      decentralized: ['Chainlink', 'Pyth', 'DIA', 'RedStone'],
      highFrequency: ['Pyth'],
      gasOptimized: ['RedStone', 'Pyth'],
    },
    blockchain: {
      recommended: ['Etherscan', 'The Graph'],
      transactions: ['Etherscan', 'The Graph'],
      addresses: ['Etherscan'],
      blocks: ['Etherscan'],
      contracts: ['Etherscan'],
      gasTracking: ['Etherscan'],
    },
    dex: {
      recommended: ['Uniswap', 'The Graph'],
      pairs: ['Uniswap', 'The Graph'],
      liquidity: ['Uniswap', 'The Graph'],
      volume: ['Uniswap', 'The Graph'],
      swaps: ['The Graph'],
      twap: ['Uniswap'],
    },
  },
  nativeSupport: {
    evmSmartContracts: true,
    chainId: 1,
    soliditySupport: true,
    web3Compatible: true,
    oracleContracts: true,
    l2Support: true,
  },
  recommendations: {
    forWallets: ['Etherscan', 'Uniswap'],
    forDeFi: ['Chainlink', 'Pyth', 'Uniswap'],
    forAnalytics: ['The Graph', 'Etherscan', 'DIA'],
    forBlockchainData: ['Etherscan', 'The Graph'],
    forDEXIntegration: ['Uniswap', 'The Graph'],
    forHighFrequency: ['Pyth'],
    forL2Applications: ['RedStone', 'Pyth'],
    forEnterprise: ['Chainlink'],
    forOpenSource: ['DIA'],
  },
  dexSupport: {
    uniswap: ['Uniswap SDK', 'The Graph subgraph'],
    sushiswap: ['The Graph subgraph'],
    curve: ['The Graph subgraph'],
    balancer: ['The Graph subgraph'],
    '1inch': ['DEX Aggregator API'],
  },
  institutionalAdoption: {
    chainlink: [
      'SWIFT',
      'DTCC',
      'Euroclear',
      'UBS',
      'ANZ',
      'Aave',
      'Synthetix',
      'Compound',
    ],
    pyth: [
      'Jump Trading',
      'GTS',
      'Jane Street',
      'Binance',
      'OKX',
      'Bybit',
    ],
  },
  updateFrequency: {
    chainlink: '~1 minute (deviation threshold based)',
    pyth: '400ms (continuous)',
    uniswap: 'Real-time on-chain',
    thegraph: '1-5 blocks delay',
    etherscan: 'Real-time',
    redstone: 'Pull-based (on-demand)',
    dia: 'Varies by asset (typically minutes)',
  },
  gasCosts: {
    chainlink: 'Medium (read from contract)',
    pyth: 'Low (pull-based, pay on update)',
    uniswap: 'Medium-High (swap gas)',
    thegraph: 'Free (off-chain queries)',
    etherscan: 'Free (REST API)',
    redstone: 'Very Low (optimized for L2)',
    dia: 'Free (REST API)',
  },
};

