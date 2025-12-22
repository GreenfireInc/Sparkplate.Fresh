// Kraken - BNB Exchange Staking
// Stake BNB through Kraken exchange

export const KrakenBNBStaking = {
  name: 'Kraken',
  ticker: 'BNB',
  liquidStakingToken: 'N/A (Custodial staking)',
  
  // Pool Information
  description: 'Kraken offers custodial staking for BNB with competitive rates and flexible terms. Users can earn staking rewards while maintaining the ability to trade their staked BNB on the exchange.',
  type: 'Exchange Staking',
  location: 'Centralized Exchange (US-based)',
  features: [
    'Low minimum stake (0.0001 BNB)',
    'Flexible staking (unstake anytime)',
    'Twice-weekly reward distribution',
    'On-exchange trading of staked BNB',
    'Regulated exchange',
    'Institutional options available'
  ],
  
  // Official Links
  website: 'https://www.kraken.com/',
  staking: 'https://www.kraken.com/features/staking-coins',
  learn: 'https://www.kraken.com/learn/what-is-bnb',
  support: 'https://support.kraken.com/hc/en-us/articles/360037895351-BNB-staking-FAQ',
  
  // Staking Information
  stakingInfo: {
    provider: 'Kraken Exchange',
    custodial: true,
    flexible: true,
    minimumStake: '0.0001 BNB',
    rewardDistribution: 'Twice weekly (Tuesday and Friday)',
    commission: 'Variable (check current rates)',
  },
  
  // API & SDK
  api: {
    restAPI: 'https://api.kraken.com',
    websocket: 'wss://ws.kraken.com',
    endpoints: {
      assetInfo: '/0/public/Assets',
      ticker: '/0/public/Ticker',
      balance: '/0/private/Balance',
      stakingAssets: '/0/private/Staking/Assets',
      stakingTransactions: '/0/private/Staking/Transactions',
    },
    docs: 'https://docs.kraken.com/rest/',
  },
  
  // SDK Information
  sdk: {
    npm: 'kraken-api',
    npmAlternative: 'ccxt',
    docs: 'https://docs.kraken.com/',
    github: 'https://github.com/nothingisdead/npm-kraken-api',
    installation: 'npm install kraken-api',
  },
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/krakenfx',
    reddit: 'https://www.reddit.com/r/Kraken/',
    linkedin: 'https://www.linkedin.com/company/krakenfx/',
    support: 'https://support.kraken.com/',
  },
  
  // Integration Examples
  integration: {
    checkStakingRate: `
import fetch from 'node-fetch';

async function getKrakenBNBStakingRate() {
  try {
    // Get BNB ticker info (public endpoint)
    const response = await fetch('https://api.kraken.com/0/public/Ticker?pair=BNBUSD');
    const data = await response.json();
    
    if (data.error && data.error.length > 0) {
      throw new Error(\`Kraken API error: \${data.error.join(', ')}\`);
    }
    
    console.log('BNB ticker data:', data.result);
    
    // For staking rate, visit https://www.kraken.com/features/staking-coins
    // or check through authenticated API
    
    return data.result;
  } catch (error) {
    console.error('Error fetching Kraken data:', error);
    throw error;
  }
}
    `,
    
    getStakingInfo: `
import KrakenClient from 'kraken-api';

async function getKrakenBNBStakingInfo(apiKey: string, apiSecret: string) {
  const kraken = new KrakenClient(apiKey, apiSecret);
  
  try {
    // Get staking assets (requires authentication)
    const stakingAssets = await kraken.api('Staking/Assets', {});
    console.log('Staking assets:', stakingAssets);
    
    // Get staking transactions for BNB
    const stakingTransactions = await kraken.api('Staking/Transactions', {
      asset: 'BNB'
    });
    console.log('BNB staking transactions:', stakingTransactions);
    
    return {
      assets: stakingAssets,
      transactions: stakingTransactions
    };
  } catch (error) {
    console.error('Error fetching Kraken BNB staking info:', error);
    throw error;
  }
}
    `,
    
    stakeBNB: `
import KrakenClient from 'kraken-api';

async function stakeBNBOnKraken(
  apiKey: string,
  apiSecret: string,
  amount: number
) {
  const kraken = new KrakenClient(apiKey, apiSecret);
  
  try {
    // Note: Staking on Kraken is typically done through the web interface
    // The API provides read access to staking information
    
    // Check balance first
    const balance = await kraken.api('Balance');
    console.log('Current BNB balance:', balance.result?.BNB || 0);
    
    // For actual staking operations, use Kraken web interface:
    // https://www.kraken.com/u/staking
    
    return balance;
  } catch (error) {
    console.error('Error with Kraken API:', error);
    throw error;
  }
}
    `,
  },
  
  // Staking Metrics
  metrics: {
    estimatedAPY: '3-6% (variable, check current rates)',
    commission: 'Built into displayed APY',
    minimumStake: '0.0001 BNB',
    unbondingPeriod: 'Instant (on-exchange)',
    paymentFrequency: 'Twice weekly (Tuesday and Friday)',
    tradingWhileStaked: 'Yes (on Kraken exchange)',
  },
  
  // Kraken Pro Features
  proFeatures: {
    features: [
      'API access for monitoring',
      'Advanced trading tools',
      'Margin trading available',
      'Futures trading',
      'OTC desk for large trades',
      'Institutional custody'
    ],
    website: 'https://pro.kraken.com/'
  },
  
  // Important Notes
  notes: [
    'Custodial solution - Kraken holds your keys',
    'Subject to exchange risk',
    'Can trade staked BNB on exchange',
    'Flexible staking - unstake anytime',
    'Rewards distributed twice weekly',
    'No lock-up period',
    'Requires KYC verification'
  ],
  
  // Additional Resources
  resources: [
    {
      title: 'Kraken Staking',
      url: 'https://www.kraken.com/features/staking-coins',
    },
    {
      title: 'BNB Staking FAQ',
      url: 'https://support.kraken.com/hc/en-us/articles/360037895351',
    },
    {
      title: 'Kraken API Documentation',
      url: 'https://docs.kraken.com/',
    },
    {
      title: 'Learn About BNB',
      url: 'https://www.kraken.com/learn/what-is-bnb',
    },
    {
      title: 'Kraken Support',
      url: 'https://support.kraken.com/',
    },
  ],
};
