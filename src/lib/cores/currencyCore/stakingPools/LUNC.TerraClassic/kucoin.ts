// KuCoin Staking Pool for Terra Classic (LUNC)
// Exchange-based staking service

export const KuCoinStaking = {
  name: "KuCoin Staking",
  type: "Exchange Staking",
  website: "https://www.kucoin.com/earn",
  description: "Stake LUNC through KuCoin exchange",
  minimumStake: "1 LUNC",
  apy: "Variable (based on network rewards)",
  lockPeriod: "Flexible (0 days) or Locked (7-30 days)",
  rewardsFrequency: "Daily",
  fees: "No fees",
  
  // API Information
  api: {
    baseUrl: "https://api.kucoin.com",
    documentation: "https://docs.kucoin.com/",
    endpoints: {
      staking: "/api/v1/staking/orders",
      unstaking: "/api/v1/staking/orders",
      rewards: "/api/v1/staking/orders",
      products: "/api/v1/staking/products",
      history: "/api/v1/staking/orders",
    },
  },

  // SDK Information
  sdk: {
    npm: "kucoin-node-sdk",
    github: "https://github.com/Kucoin/kucoin-node-sdk",
    documentation: "https://docs.kucoin.com/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/kucoincom",
    discord: "https://discord.gg/kucoin",
    telegram: "https://t.me/Kucoin_Exchange",
    reddit: "https://reddit.com/r/kucoin",
  },

  // Features
  features: [
    "Flexible and locked staking options",
    "Low minimum stake (1 LUNC)",
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
      apy: "2-4%",
      description: "Stake and unstake anytime",
    },
    {
      name: "7-Day Locked",
      lockPeriod: "7 days",
      apy: "3-5%",
      description: "Higher rewards for 7-day commitment",
    },
    {
      name: "30-Day Locked",
      lockPeriod: "30 days",
      apy: "4-6%",
      description: "Maximum rewards for 30-day commitment",
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
const KuCoin = require('kucoin-node-sdk');
const client = new KuCoin({
  apiKey: 'YOUR_API_KEY',
  secretKey: 'YOUR_SECRET_KEY',
  passphrase: 'YOUR_PASSPHRASE',
  sandbox: false
});

client.getStakingProducts()
  .then(products => {
    const luncProducts = products.filter(p => p.currency === 'LUNC');
    console.log('LUNC staking products:', luncProducts);
  })
  .catch(err => console.error('Error:', err));
    `,
    
    stakeLUNC: `
// Stake LUNC
const stakeData = {
  currency: 'LUNC',
  type: 'lockup', // or 'flexible'
  size: '100', // Amount in LUNC
  period: '7' // Days for lockup
};

client.createStakingOrder(stakeData)
  .then(result => {
    console.log('Staking successful:', result);
  })
  .catch(err => console.error('Staking failed:', err));
    `,
    
    unstakeLUNC: `
// Unstake LUNC
const unstakeData = {
  orderId: '1234567890' // Order ID from staking record
};

client.cancelStakingOrder(unstakeData)
  .then(result => {
    console.log('Unstaking successful:', result);
  })
  .catch(err => console.error('Unstaking failed:', err));
    `,
    
    getStakingHistory: `
// Get staking history
client.getStakingOrders()
  .then(orders => {
    const luncOrders = orders.filter(o => o.currency === 'LUNC');
    console.log('LUNC staking history:', luncOrders);
  })
  .catch(err => console.error('Error:', err));
    `,
  },
};

// Helper function to get current staking products
export async function getKuCoinStakingProducts() {
  try {
    const response = await fetch('https://api.kucoin.com/api/v1/staking/products');
    if (response.ok) {
      const data = await response.json();
      return data.data.filter(product => product.currency === 'LUNC');
    }
  } catch (error) {
    console.error('Error fetching KuCoin staking products:', error);
  }
  return [];
}

// Helper function to get staking rates
export async function getKuCoinStakingRates() {
  try {
    const products = await getKuCoinStakingProducts();
    return products.map(product => ({
      currency: product.currency,
      type: product.type,
      apy: product.apy,
      period: product.period,
      minSize: product.minSize,
    }));
  } catch (error) {
    console.error('Error fetching KuCoin staking rates:', error);
  }
  return [];
}

// Helper function to check if staking is available
export async function isStakingAvailable() {
  try {
    const products = await getKuCoinStakingProducts();
    return products.length > 0;
  } catch (error) {
    console.error('Error checking staking availability:', error);
    return false;
  }
}

// Helper function to get LUNC price from KuCoin
export async function getLUNCPrice() {
  try {
    const response = await fetch('https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=LUNC-USDT');
    if (response.ok) {
      const data = await response.json();
      return parseFloat(data.data.price);
    }
  } catch (error) {
    console.error('Error fetching LUNC price:', error);
  }
  return 0;
}

export default KuCoinStaking;

