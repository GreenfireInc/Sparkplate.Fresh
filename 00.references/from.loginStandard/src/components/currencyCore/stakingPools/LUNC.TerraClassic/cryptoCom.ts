// Crypto.com Staking Pool for Terra Classic (LUNC)
// Exchange-based staking service

export const CryptoComStaking = {
  name: "Crypto.com",
  type: "Exchange Staking",
  website: "https://crypto.com/earn",
  description: "Earn rewards on LUNC through Crypto.com",
  minimumStake: "1 LUNC",
  apy: "Variable (based on network rewards)",
  lockPeriod: "Flexible (0 days) or Locked (1-3 months)",
  rewardsFrequency: "Daily",
  fees: "No fees",
  
  // API Information
  api: {
    baseUrl: "https://api.crypto.com",
    documentation: "https://crypto.com/docs/",
    endpoints: {
      staking: "/v1/staking/stake",
      unstaking: "/v1/staking/unstake",
      rewards: "/v1/staking/rewards",
      products: "/v1/staking/products",
      history: "/v1/staking/history",
    },
  },

  // SDK Information
  sdk: {
    npm: "crypto-com-api",
    github: "https://github.com/crypto-com/crypto-com-api",
    documentation: "https://crypto.com/docs/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/cryptocom",
    discord: "https://discord.gg/cryptocom",
    telegram: "https://t.me/CryptoComOfficial",
    reddit: "https://reddit.com/r/Crypto_com",
  },

  // Features
  features: [
    "Flexible and locked staking options",
    "Low minimum stake (1 LUNC)",
    "Daily rewards distribution",
    "Auto-compounding available",
    "Mobile app support",
    "24/7 customer support",
    "Crypto.com Visa Card integration",
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
      name: "1-Month Locked",
      lockPeriod: "30 days",
      apy: "3-5%",
      description: "Higher rewards for 1-month commitment",
    },
    {
      name: "3-Month Locked",
      lockPeriod: "90 days",
      apy: "4-6%",
      description: "Maximum rewards for 3-month commitment",
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
const CryptoCom = require('crypto-com-api');
const client = new CryptoCom({
  apiKey: 'YOUR_API_KEY',
  secretKey: 'YOUR_SECRET_KEY'
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
  amount: '100', // Amount in LUNC
  term: '1M' // 1 month term
};

client.stake(stakeData)
  .then(result => {
    console.log('Staking successful:', result);
  })
  .catch(err => console.error('Staking failed:', err));
    `,
    
    unstakeLUNC: `
// Unstake LUNC
const unstakeData = {
  currency: 'LUNC',
  amount: '100' // Amount to unstake
};

client.unstake(unstakeData)
  .then(result => {
    console.log('Unstaking successful:', result);
  })
  .catch(err => console.error('Unstaking failed:', err));
    `,
    
    getStakingHistory: `
// Get staking history
client.getStakingHistory()
  .then(history => {
    const luncHistory = history.filter(h => h.currency === 'LUNC');
    console.log('LUNC staking history:', luncHistory);
  })
  .catch(err => console.error('Error:', err));
    `,
  },
};

// Helper function to get current staking products
export async function getCryptoComStakingProducts() {
  try {
    const response = await fetch('https://api.crypto.com/v1/staking/products');
    if (response.ok) {
      const data = await response.json();
      return data.data.filter(product => product.currency === 'LUNC');
    }
  } catch (error) {
    console.error('Error fetching Crypto.com staking products:', error);
  }
  return [];
}

// Helper function to get staking rates
export async function getCryptoComStakingRates() {
  try {
    const products = await getCryptoComStakingProducts();
    return products.map(product => ({
      currency: product.currency,
      term: product.term,
      apy: product.apy,
      minAmount: product.minAmount,
    }));
  } catch (error) {
    console.error('Error fetching Crypto.com staking rates:', error);
  }
  return [];
}

// Helper function to check if staking is available
export async function isStakingAvailable() {
  try {
    const products = await getCryptoComStakingProducts();
    return products.length > 0;
  } catch (error) {
    console.error('Error checking staking availability:', error);
    return false;
  }
}

// Helper function to get LUNC price from Crypto.com
export async function getLUNCPrice() {
  try {
    const response = await fetch('https://api.crypto.com/v2/public/get-ticker?instrument_name=LUNC_USDT');
    if (response.ok) {
      const data = await response.json();
      return parseFloat(data.result.data.a); // Ask price
    }
  } catch (error) {
    console.error('Error fetching LUNC price:', error);
  }
  return 0;
}

export default CryptoComStaking;

