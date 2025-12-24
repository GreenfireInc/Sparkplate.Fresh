// Bitrue Earning for XLM
// Exchange with liquidity pools

export const BitrueEarning = {
  name: "Bitrue",
  type: "exchange",
  website: "https://www.bitrue.com/",
  description: "Earn 4-6% APY on XLM through Bitrue's liquidity pools and DeFi integrations",
  liquidStakingToken: "N/A (Exchange custody)",
  minimumStake: "10 XLM",
  apy: "~4-6%",
  lockPeriod: "Flexible",
  rewardsFrequency: "Daily",
  fees: "Exchange fees",
  
  // API Information
  api: {
    baseUrl: "https://openapi.bitrue.com",
    documentation: "https://github.com/Bitrue-exchange/bitrue-official-api-docs",
    endpoints: {
      earn: "/api/v1/earn/products",
      rates: "/api/v1/rates",
      account: "/api/v1/account",
    },
  },

  // SDK Information
  sdk: {
    npm: "bitrue-sdk",
    github: "https://github.com/Bitrue-exchange/bitrue-sdk",
    documentation: "https://github.com/Bitrue-exchange/bitrue-official-api-docs",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/BitrueExchange",
    discord: "https://discord.gg/bitrue",
    telegram: "https://t.me/BitrueExchange",
    reddit: "https://reddit.com/r/bitrue",
  },

  // Features
  features: [
    "Exchange-based earning",
    "Liquidity pools",
    "DeFi integrations",
    "Flexible terms",
    "Custodial service",
    "User-friendly interface",
    "Mobile app support",
  ],

  // Staking Requirements
  requirements: {
    kyc: true,
    accountVerification: true,
    minimumAge: 18,
    supportedRegions: "Global",
    technicalRequirements: [
      "Bitrue account",
      "KYC verification",
      "XLM balance",
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
    getEarnProducts: `
// Get earn products
const response = await fetch('https://openapi.bitrue.com/api/v1/earn/products', {
  headers: {
    'X-BTR-APIKEY': 'YOUR_API_KEY',
  },
});
const products = await response.json();
console.log('Earn products:', products);
    `,
    
    getRates: `
// Get current rates
const response = await fetch('https://openapi.bitrue.com/api/v1/rates');
const rates = await response.json();
console.log('Rates:', rates);
    `,
    
    getAccount: `
// Get account info
const response = await fetch('https://openapi.bitrue.com/api/v1/account', {
  headers: {
    'X-BTR-APIKEY': 'YOUR_API_KEY',
  },
});
const account = await response.json();
console.log('Account:', account);
    `,
  },
};

// Helper function to get earn products
export async function getEarnProducts() {
  try {
    // This would require API key authentication
    // For demonstration purposes, we'll return a mock response
    return {
      products: [
        {
          asset: "XLM",
          product: "Flexible",
          annualPercentageRate: "0.04",
          minAmount: "10",
          maxAmount: "1000000",
        },
        {
          asset: "XLM",
          product: "Premium",
          annualPercentageRate: "0.06",
          minAmount: "1000",
          maxAmount: "1000000",
        },
      ],
    };
  } catch (error) {
    console.error('Error fetching earn products:', error);
  }
  return null;
}

// Helper function to get rates
export async function getRates() {
  try {
    const response = await fetch('https://openapi.bitrue.com/api/v1/rates');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching rates:', error);
  }
  return null;
}

// Helper function to get XLM earn rate
export async function getXLMEarnRate() {
  try {
    const products = await getEarnProducts();
    if (products && products.products) {
      const xlmProduct = products.products.find((product: any) => 
        product.asset === 'XLM' && product.product === 'Premium'
      );
      return xlmProduct ? parseFloat(xlmProduct.annualPercentageRate) * 100 : 0;
    }
  } catch (error) {
    console.error('Error fetching XLM earn rate:', error);
  }
  return 0;
}

// Helper function to check if earning is available
export async function isEarningAvailable(): Promise<boolean> {
  try {
    const products = await getEarnProducts();
    return products && products.products && products.products.length > 0;
  } catch (error) {
    console.error('Error checking earning availability:', error);
    return false;
  }
}

// Helper function to get XLM price from CoinGecko
export async function getXLMPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=stellar&vs_currencies=usd');
    if (response.ok) {
      const data = await response.json();
      return data.stellar?.usd || 0;
    }
  } catch (error) {
    console.error('Error fetching XLM price:', error);
  }
  return 0;
}

export default BitrueEarning;
