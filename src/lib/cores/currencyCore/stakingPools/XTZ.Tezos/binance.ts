// Binance Staking for XTZ
// Exchange-based flexible and locked staking

export const BinanceStaking = {
  name: "Binance Staking",
  type: "exchange",
  website: "https://www.binance.com/en/staking",
  description: "Flexible and locked staking for XTZ on Binance with competitive rates",
  liquidStakingToken: "N/A (Exchange custody)",
  minimumStake: "1 XTZ",
  apy: "~4-6%",
  lockPeriod: "Flexible or locked",
  rewardsFrequency: "Daily",
  fees: "Exchange fees",
  
  // API Information
  api: {
    baseUrl: "https://api.binance.com",
    documentation: "https://binance-docs.github.io/apidocs/spot/en/",
    endpoints: {
      staking: "/sapi/v1/staking/stakingProductList",
      history: "/sapi/v1/staking/stakingRecord",
      account: "/sapi/v1/account",
    },
  },

  // SDK Information
  sdk: {
    npm: "binance-api-node",
    github: "https://github.com/binance/binance-api-node",
    documentation: "https://binance-docs.github.io/apidocs/spot/en/",
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
    "Exchange-based staking",
    "Flexible and locked terms",
    "Competitive rates",
    "Custodial service",
    "User-friendly interface",
    "Mobile app support",
    "24/7 support",
  ],

  // Staking Requirements
  requirements: {
    kyc: true,
    accountVerification: true,
    minimumAge: 18,
    supportedRegions: "Global",
    technicalRequirements: [
      "Binance account",
      "KYC verification",
      "XTZ balance",
    ],
  },

  // Risk Factors
  risks: [
    "Exchange custody risk",
    "KYC requirement",
    "Exchange fees",
    "Regional restrictions",
  ],

  // Integration Examples
  examples: {
    getStakingProducts: `
// Get staking products
const response = await fetch('https://api.binance.com/sapi/v1/staking/stakingProductList?product=STAKING&asset=XTZ', {
  headers: {
    'X-MBX-APIKEY': 'YOUR_API_KEY',
  },
});
const products = await response.json();
console.log('Staking products:', products);
    `,
    
    getStakingHistory: `
// Get staking history
const response = await fetch('https://api.binance.com/sapi/v1/staking/stakingRecord?product=STAKING&asset=XTZ', {
  headers: {
    'X-MBX-APIKEY': 'YOUR_API_KEY',
  },
});
const history = await response.json();
console.log('Staking history:', history);
    `,
    
    getAccount: `
// Get account info
const response = await fetch('https://api.binance.com/sapi/v1/account', {
  headers: {
    'X-MBX-APIKEY': 'YOUR_API_KEY',
  },
});
const account = await response.json();
console.log('Account:', account);
    `,
  },
};

// Helper function to get staking products
export async function getStakingProducts() {
  try {
    // This would require API key authentication
    // For demonstration purposes, we'll return a mock response
    return {
      products: [
        {
          asset: "XTZ",
          product: "STAKING",
          annualPercentageRate: "0.05",
          minPurchaseAmount: "1",
          maxPurchaseAmount: "1000000",
          status: "ACTIVE",
        },
        {
          asset: "XTZ",
          product: "FLEXIBLE_SAVINGS",
          annualPercentageRate: "0.04",
          minPurchaseAmount: "1",
          maxPurchaseAmount: "1000000",
          status: "ACTIVE",
        },
      ],
    };
  } catch (error) {
    console.error('Error fetching staking products:', error);
  }
  return null;
}

// Helper function to get staking history
export async function getStakingHistory() {
  try {
    // This would require API key authentication
    // For demonstration purposes, we'll return a mock response
    return {
      records: [
        {
          id: "123456",
          asset: "XTZ",
          amount: "100.00",
          product: "STAKING",
          status: "SUCCESS",
          timestamp: Date.now(),
        },
      ],
    };
  } catch (error) {
    console.error('Error fetching staking history:', error);
  }
  return null;
}

// Helper function to get XTZ staking rate
export async function getXTZStakingRate() {
  try {
    const products = await getStakingProducts();
    if (products && products.products) {
      const xtzProduct = products.products.find((product: any) => 
        product.asset === 'XTZ' && product.product === 'STAKING'
      );
      return xtzProduct ? parseFloat(xtzProduct.annualPercentageRate) * 100 : 0;
    }
  } catch (error) {
    console.error('Error fetching XTZ staking rate:', error);
  }
  return 0;
}

// Helper function to check if staking is available
export async function isStakingAvailable(): Promise<boolean> {
  try {
    const products = await getStakingProducts();
    return products && products.products && products.products.length > 0;
  } catch (error) {
    console.error('Error checking staking availability:', error);
    return false;
  }
}

// Helper function to get XTZ price from CoinGecko
export async function getXTZPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tezos&vs_currencies=usd');
    if (response.ok) {
      const data = await response.json();
      return data.tezos?.usd || 0;
    }
  } catch (error) {
    console.error('Error fetching XTZ price:', error);
  }
  return 0;
}

export default BinanceStaking;
