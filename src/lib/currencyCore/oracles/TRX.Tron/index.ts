// ==========================================
// TRX.Tron - Oracle Integrations Index
// ==========================================
// 
// Exports all oracle integrations for Tron (TRX):
// - Chainlink: Official oracle solution (replaced WINkLink in Oct 2024)
// - DIA: Customizable decentralized oracle
// - SunSwap: Official DEX with AMM pricing
// - TronGrid: Official blockchain API provider
// - CoinGecko: Market data aggregator
//
// Usage:
//   import { tronChainlinkOracle, tronDiaOracle, sunswapOracle } from './oracles/TRX.Tron';

export { chainlinkOracle as tronChainlinkOracle } from './chainlink';
export { diaOracle as tronDiaOracle } from './dia';
export { sunswapOracle } from './sunswap';
export { trongridOracle } from './trongrid';
export { coinGeckoOracle } from './coingecko';

// Oracle metadata for Tron
export const TRX_TRON_ORACLES = {
  blockchain: 'Tron',
  symbol: 'TRX',
  nativeToken: 'TRX',
  
  // Official oracle solution
  primary: 'chainlink',
  
  // Available oracles
  oracles: {
    chainlink: {
      name: 'Chainlink',
      type: 'Decentralized Oracle Network',
      status: 'Official',
      reliability: 'Very High',
      updateFrequency: 'Heartbeat + Deviation',
      dataSource: 'Multiple aggregated sources',
      costModel: 'Gas fees only',
      bestFor: ['DeFi protocols', 'Price feeds', 'Lending platforms'],
    },
    dia: {
      name: 'DIA',
      type: 'Decentralized Oracle',
      status: 'Active',
      reliability: 'High',
      updateFrequency: 'Customizable',
      dataSource: '90+ markets',
      costModel: 'Free API',
      bestFor: ['Custom oracles', 'Historical data', 'Analytics'],
    },
    sunswap: {
      name: 'SunSwap',
      type: 'DEX (AMM)',
      status: 'Active',
      reliability: 'High',
      updateFrequency: 'Real-time (on-chain)',
      dataSource: 'On-chain liquidity pools',
      costModel: 'Gas fees only',
      bestFor: ['DEX pricing', 'Liquidity data', 'Volume tracking'],
    },
    trongrid: {
      name: 'TronGrid',
      type: 'Blockchain API',
      status: 'Official',
      reliability: 'Very High',
      updateFrequency: 'Real-time',
      dataSource: 'Tron blockchain',
      costModel: 'Free tier + paid API keys',
      bestFor: ['Blockchain data', 'Transaction tracking', 'Account queries'],
    },
    coingecko: {
      name: 'CoinGecko',
      type: 'Market Data Aggregator',
      status: 'Active',
      reliability: 'High',
      updateFrequency: '1-5 minutes',
      dataSource: '700+ exchanges',
      costModel: 'Free tier + paid plans',
      bestFor: ['Market data', 'Multi-currency prices', 'Historical analysis'],
    },
  },

  // Oracle recommendations by use case
  recommendations: {
    defiProtocols: ['chainlink', 'dia'],
    priceFeeds: ['chainlink', 'sunswap', 'coingecko'],
    dexIntegration: ['sunswap'],
    blockchainData: ['trongrid'],
    marketData: ['coingecko', 'dia'],
    historicalData: ['dia', 'coingecko'],
    customOracles: ['dia'],
    realTimePricing: ['sunswap', 'chainlink'],
  },

  // Network information
  networks: {
    mainnet: {
      name: 'Tron Mainnet',
      chainId: 'N/A (TVM)',
      rpc: 'https://api.trongrid.io',
      explorer: 'https://tronscan.org',
    },
    testnet: {
      name: 'Nile Testnet',
      chainId: 'N/A (TVM)',
      rpc: 'https://nile.trongrid.io',
      explorer: 'https://nile.tronscan.org',
      faucet: 'https://nileex.io/join/getJoinPage',
    },
  },

  // Important dates
  timeline: {
    'Oct 31, 2024': 'TRON DAO switched from WINkLink to Chainlink as official oracle',
    'May 15, 2025': 'Full Chainlink implementation securing $5.5B+ TVL',
  },

  // Integration notes
  notes: [
    'Chainlink is the official oracle solution (since Oct 2024)',
    'WINkLink is deprecated and no longer supported',
    'TronGrid requires API key for production use',
    'SunSwap provides real-time DEX-based pricing',
    'DIA offers customizable oracle solutions',
    'CoinGecko aggregates data from 700+ exchanges',
  ],

  // Documentation links
  documentation: {
    chainlink: 'https://docs.chain.link/data-feeds/tron',
    dia: 'https://docs.diadata.org/',
    sunswap: 'https://sunswap.com/docs/justswap-interfaces_en.pdf',
    trongrid: 'https://developers.tron.network/reference/trongrid-api',
    coingecko: 'https://docs.coingecko.com/reference/introduction',
    tronDevelopers: 'https://developers.tron.network/',
  },
};

// Export oracle count
export const ORACLE_COUNT = Object.keys(TRX_TRON_ORACLES.oracles).length;

// Helper function to get oracle by name
export function getOracleByName(name: string) {
  const oracles = {
    chainlink: require('./chainlink').chainlinkOracle,
    dia: require('./dia').diaOracle,
    sunswap: require('./sunswap').sunswapOracle,
    trongrid: require('./trongrid').trongridOracle,
    coingecko: require('./coingecko').coinGeckoOracle,
  };

  return oracles[name as keyof typeof oracles];
}

// Helper function to get recommended oracles for a use case
export function getRecommendedOracles(useCase: keyof typeof TRX_TRON_ORACLES.recommendations): string[] {
  return TRX_TRON_ORACLES.recommendations[useCase] || [];
}

// Default export
export default TRX_TRON_ORACLES;

