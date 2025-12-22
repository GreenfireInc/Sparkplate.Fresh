// Binance Earn for XLM
// Exchange-based flexible savings

export const BinanceEarn = {
  name: "Binance Earn",
  type: "exchange",
  website: "https://www.binance.com/en/earn",
  description: "Earn 3-7% APY on XLM through Binance flexible savings with no lock-up period",
  liquidStakingToken: "N/A (Exchange custody)",
  minimumStake: "1 XLM",
  apy: "~3-7%",
  lockPeriod: "Flexible",
  rewardsFrequency: "Daily",
  fees: "Exchange fees",
  
  // API Information
  api: {
    baseUrl: "https://api.binance.com",
    documentation: "https://binance-docs.github.io/apidocs/spot/en/",
    endpoints: {
      lending: "/sapi/v1/lending/daily/product/list",
      staking: "/sapi/v1/staking/stakingProductList",
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
    "Exchange-based earning",
    "Flexible terms",
    "No lock-up period",
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
    getLendingProducts: `
// Get lending products
const response = await fetch('https://api.binance.com/sapi/v1/lending/daily/product/list?status=ALL&featured=ALL', {
  headers: {
    'X-MBX-APIKEY': 'YOUR_API_KEY',
  },
});
const products = await response.json();
console.log('Lending products:', products);
    `,
    
    getStakingProducts: `
// Get staking products
const response = await fetch('https://api.binance.com/sapi/v1/staking/stakingProductList?product=STAKING&asset=XLM', {
  headers: {
    'X-MBX-APIKEY': 'YOUR_API_KEY',
  },
});
const products = await response.json();
console.log('Staking products:', products);
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

// Helper function to get lending products
export async function getLendingProducts() {
  try {
    // This would require API key authentication
    // For demonstration purposes, we'll return a mock response
    return {
      products: [
        {
          asset: "XLM",
          annualPercentageRate: "0.05",
          minPurchaseAmount: "1",
          productId: "XLM_FLEXIBLE",
          status: "ACTIVE",
        },
      ],
    };
  } catch (error) {
    console.error('Error fetching lending products:', error);
  }
  return null;
}

// Helper function to get staking products
export async function getStakingProducts() {
  try {
    // This would require API key authentication
    // For demonstration purposes, we'll return a mock response
    return {
      products: [
        {
          asset: "XLM",
          annualPercentageRate: "0.07",
          minPurchaseAmount: "10",
          productId: "XLM_STAKING",
          status: "ACTIVE",
        },
      ],
    };
  } catch (error) {
    console.error('Error fetching staking products:', error);
  }
  return null;
}

// Helper function to get XLM earn rate
export async function getXLMEarnRate() {
  try {
    const lendingProducts = await getLendingProducts();
    if (lendingProducts && lendingProducts.products) {
      const xlmProduct = lendingProducts.products.find((product: any) => 
        product.asset === 'XLM'
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
    const products = await getLendingProducts();
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

export default BinanceEarn;
