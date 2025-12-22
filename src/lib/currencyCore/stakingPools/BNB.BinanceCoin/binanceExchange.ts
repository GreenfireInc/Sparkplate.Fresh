// Binance Exchange - Official BNB Staking
// Stake BNB through Binance exchange

export const BinanceExchangeStaking = {
  name: 'Binance Exchange',
  ticker: 'BNB',
  liquidStakingToken: 'N/A (Custodial staking)',
  
  // Pool Information
  description: 'Official Binance exchange provides custodial staking services for BNB, offering flexible and locked staking options with competitive rates and easy management.',
  type: 'Exchange Staking',
  location: 'Centralized Exchange (Global)',
  features: [
    'Flexible staking (redeem anytime)',
    'Locked staking (higher rewards)',
    'Auto-compounding',
    'No minimum stake',
    'Easy on/off ramp',
    'Mobile app support'
  ],
  
  // Official Links
  website: 'https://www.binance.com/',
  staking: 'https://www.binance.com/en/staking',
  app: 'https://www.binance.com/en/download',
  docs: 'https://www.binance.com/en/support/faq/staking',
  support: 'https://www.binance.com/en/support',
  
  // Staking Information
  stakingInfo: {
    provider: 'Binance Exchange',
    custodial: true,
    flexible: true,
    locked: true,
    minimumStake: 'None',
    rewardDistribution: 'Daily',
    commission: 'Variable (check current rates)',
  },
  
  // API & SDK
  api: {
    restAPI: 'https://api.binance.com',
    websocket: 'wss://stream.binance.com:9443',
    endpoints: {
      account: '/api/v3/account',
      staking: '/sapi/v1/staking/stakingRecord',
      productList: '/sapi/v1/staking/productList',
      purchase: '/sapi/v1/staking/purchase',
      redeem: '/sapi/v1/staking/redeem',
    },
    docs: 'https://binance-docs.github.io/apidocs/spot/en/',
  },
  
  // SDK Information
  sdk: {
    npm: 'binance-api-node',
    npmAlternative: 'ccxt',
    docs: 'https://github.com/binance/binance-connector-node',
    github: 'https://github.com/binance/binance-connector-node',
    installation: 'npm install binance-api-node',
  },
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/binance',
    discord: 'https://discord.gg/binance',
    telegram: 'https://t.me/binance',
    reddit: 'https://www.reddit.com/r/binance/',
    youtube: 'https://www.youtube.com/binance',
  },
  
  // Integration Examples
  integration: {
    getStakingProducts: `
import Binance from 'binance-api-node';

async function getBinanceStakingProducts() {
  try {
    // Initialize Binance client
    const client = Binance({
      apiKey: process.env.BINANCE_API_KEY,
      apiSecret: process.env.BINANCE_API_SECRET,
    });
    
    // Get available staking products
    const products = await client.stakingProductList({
      product: 'STAKING',
      asset: 'BNB'
    });
    
    console.log('Available BNB staking products:', products);
    return products;
  } catch (error) {
    console.error('Error fetching Binance staking products:', error);
    throw error;
  }
}
    `,
    
    stakeBNB: `
import Binance from 'binance-api-node';

async function stakeBNBOnBinance(
  apiKey: string,
  apiSecret: string,
  productId: string,
  amount: number
) {
  try {
    const client = Binance({
      apiKey: apiKey,
      apiSecret: apiSecret,
    });
    
    // Purchase staking product
    const result = await client.stakingPurchase({
      product: 'STAKING',
      productId: productId,
      amount: amount.toString(),
    });
    
    console.log('Staking purchase result:', result);
    return result;
  } catch (error) {
    console.error('Error staking BNB on Binance:', error);
    throw error;
  }
}
    `,
    
    getStakingHistory: `
import Binance from 'binance-api-node';

async function getBinanceStakingHistory(
  apiKey: string,
  apiSecret: string
) {
  try {
    const client = Binance({
      apiKey: apiKey,
      apiSecret: apiSecret,
    });
    
    // Get staking records
    const records = await client.stakingStakingRecord({
      product: 'STAKING',
      asset: 'BNB',
      startTime: Date.now() - (30 * 24 * 60 * 60 * 1000), // Last 30 days
      endTime: Date.now(),
    });
    
    console.log('Staking history:', records);
    return records;
  } catch (error) {
    console.error('Error fetching staking history:', error);
    throw error;
  }
}
    `,
    
    redeemStaking: `
import Binance from 'binance-api-node';

async function redeemBinanceStaking(
  apiKey: string,
  apiSecret: string,
  productId: string,
  amount?: number
) {
  try {
    const client = Binance({
      apiKey: apiKey,
      apiSecret: apiSecret,
    });
    
    // Redeem staking (partial or full)
    const redeemParams: any = {
      product: 'STAKING',
      productId: productId,
    };
    
    if (amount) {
      redeemParams.amount = amount.toString();
    }
    
    const result = await client.stakingRedeem(redeemParams);
    
    console.log('Staking redeem result:', result);
    return result;
  } catch (error) {
    console.error('Error redeeming Binance staking:', error);
    throw error;
  }
}
    `,
  },
  
  // Staking Metrics
  metrics: {
    flexibleAPY: '3-5% (variable, check current rates)',
    lockedAPY: '5-8% (variable, check current rates)',
    commission: 'Built into displayed APY',
    minimumStake: 'No minimum',
    unbondingPeriod: 'Flexible: Instant, Locked: Varies by term',
    paymentFrequency: 'Daily',
    taxReporting: 'User responsibility',
  },
  
  // Staking Types
  stakingTypes: {
    flexible: {
      description: 'Redeem anytime, lower rewards',
      features: [
        'Instant redemption',
        'Lower APY',
        'No lock period',
        'Daily rewards'
      ]
    },
    locked: {
      description: 'Fixed term, higher rewards',
      features: [
        'Higher APY',
        'Fixed lock period',
        'Auto-renewal option',
        'Early redemption penalty'
      ],
      terms: ['15 days', '30 days', '60 days', '90 days', '120 days']
    }
  },
  
  // Important Notes
  notes: [
    'Custodial solution - Binance holds your keys',
    'Subject to exchange risk and regulatory changes',
    'Tax reporting is user responsibility',
    'API access requires Binance account and API keys',
    'Different rates for flexible vs locked staking',
    'Early redemption penalties may apply for locked staking'
  ],
  
  // Additional Resources
  resources: [
    {
      title: 'Binance Staking',
      url: 'https://www.binance.com/en/staking',
    },
    {
      title: 'Staking FAQ',
      url: 'https://www.binance.com/en/support/faq/staking',
    },
    {
      title: 'API Documentation',
      url: 'https://binance-docs.github.io/apidocs/spot/en/',
    },
    {
      title: 'Node.js SDK',
      url: 'https://github.com/binance/binance-connector-node',
    },
    {
      title: 'Support Center',
      url: 'https://www.binance.com/en/support',
    },
  ],
};
