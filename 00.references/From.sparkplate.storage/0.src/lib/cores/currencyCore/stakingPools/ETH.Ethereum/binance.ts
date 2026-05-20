// Binance Staking Pool for Ethereum (ETH)
// Exchange-based staking service

export const BinanceStaking = {
  name: "Binance Staking",
  type: "Exchange Staking",
  website: "https://www.binance.com/en/staking",
  description: "Flexible and locked ETH staking on Binance",
  minimumStake: "0.001 ETH",
  apy: "Variable (based on network rewards)",
  lockPeriod: "Flexible (0 days) or Locked (30-90 days)",
  rewardsFrequency: "Daily",
  fees: "No fees",
  
  // API Information
  api: {
    baseUrl: "https://api.binance.com",
    documentation: "https://binance-docs.github.io/apidocs/spot/en/",
    endpoints: {
      staking: "/sapi/v1/staking/stake",
      unstaking: "/sapi/v1/staking/unstake",
      rewards: "/sapi/v1/staking/stakingRecord",
      products: "/sapi/v1/staking/stakingProductList",
      history: "/sapi/v1/staking/stakingRecord",
    },
  },

  // SDK Information
  sdk: {
    npm: "binance",
    github: "https://github.com/binance/binance-connector-node",
    documentation: "https://github.com/binance/binance-connector-node",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/binance",
    discord: "https://discord.gg/binance",
    telegram: "https://t.me/binanceexchange",
    reddit: "https://reddit.com/r/binance",
  },

  // Features
  features: [
    "Flexible and locked staking options",
    "Low minimum stake (0.001 ETH)",
    "Daily rewards distribution",
    "Auto-compounding available",
    "Mobile app support",
    "24/7 customer support",
  ],

  // Staking Products
  products: [
    {
      name: "Flexible Staking",
      lockPeriod: "0 days",
      apy: "3-5%",
      description: "Stake and unstake anytime",
    },
    {
      name: "30-Day Locked",
      lockPeriod: "30 days",
      apy: "4-6%",
      description: "Higher rewards for 30-day commitment",
    },
    {
      name: "60-Day Locked",
      lockPeriod: "60 days",
      apy: "5-7%",
      description: "Maximum rewards for 60-day commitment",
    },
  ],

  // Staking Requirements
  requirements: {
    kyc: true,
    accountVerification: true,
    minimumAge: 18,
    supportedRegions: "Most countries (check website)",
  },

  // Risk Factors
  risks: [
    "Centralized custody",
    "Exchange risk",
    "Regulatory risk",
    "Counterparty risk",
  ],

  // Integration Examples
  examples: {
    getStakingProducts: `
// Get available staking products
const Binance = require('binance-api-node').default;
const client = Binance();

client.stakingProductList({ product: 'STAKING' })
  .then(products => {
    const ethProducts = products.filter(p => p.asset === 'ETH');
    console.log('ETH staking products:', ethProducts);
  })
  .catch(err => console.error('Error:', err));
    `,
    
    stakeETH: `
// Stake ETH
const stakeData = {
  product: 'STAKING',
  productId: 'ETH*30', // 30-day locked staking
  amount: '1.0' // Amount in ETH
};

client.stakingStake(stakeData)
  .then(result => {
    console.log('Staking successful:', result);
  })
  .catch(err => console.error('Staking failed:', err));
    `,
    
    unstakeETH: `
// Unstake ETH
const unstakeData = {
  product: 'STAKING',
  productId: 'ETH*30',
  positionId: '1234567890' // Position ID from staking record
};

client.stakingUnstake(unstakeData)
  .then(result => {
    console.log('Unstaking successful:', result);
  })
  .catch(err => console.error('Unstaking failed:', err));
    `,
    
    getStakingHistory: `
// Get staking history
client.stakingRecord({ product: 'STAKING' })
  .then(records => {
    const ethRecords = records.filter(r => r.asset === 'ETH');
    console.log('ETH staking history:', ethRecords);
  })
  .catch(err => console.error('Error:', err));
    `,
  },
};

// Helper function to get current staking products
export async function getBinanceStakingProducts() {
  try {
    const response = await fetch('https://api.binance.com/sapi/v1/staking/stakingProductList?product=STAKING');
    if (response.ok) {
      const data = await response.json();
      return data.filter(product => product.asset === 'ETH');
    }
  } catch (error) {
    console.error('Error fetching Binance staking products:', error);
  }
  return [];
}

// Helper function to get staking rates
export async function getBinanceStakingRates() {
  try {
    const products = await getBinanceStakingProducts();
    return products.map(product => ({
      productId: product.productId,
      asset: product.asset,
      apy: product.apy,
      lockPeriod: product.lockPeriod,
      minPurchaseAmount: product.minPurchaseAmount,
    }));
  } catch (error) {
    console.error('Error fetching Binance staking rates:', error);
    return [];
  }
}

// Helper function to check if staking is available
export async function isStakingAvailable() {
  try {
    const products = await getBinanceStakingProducts();
    return products.length > 0;
  } catch (error) {
    console.error('Error checking staking availability:', error);
    return false;
  }
}

// Helper function to get ETH price from Binance
export async function getETHPrice() {
  try {
    const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT');
    if (response.ok) {
      const data = await response.json();
      return parseFloat(data.price);
    }
  } catch (error) {
    console.error('Error fetching ETH price:', error);
  }
  return 0;
}

export default BinanceStaking;

