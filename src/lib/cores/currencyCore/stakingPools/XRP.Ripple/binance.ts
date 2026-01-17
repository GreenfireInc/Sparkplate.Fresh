// Binance Earn for XRP
// Exchange-based flexible savings

export const BinanceEarn = {
  name: "Binance Earn",
  type: "exchange",
  website: "https://www.binance.com/en/earn",
  description: "Earn 0.88-5% APY on XRP through Binance flexible and locked savings",
  liquidStakingToken: "N/A (Exchange custody)",
  minimumStake: "1 XRP",
  apy: "~0.88-5%",
  lockPeriod: "Flexible or locked",
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
    "Flexible and locked terms",
    "Low risk options",
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
      "XRP balance",
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
const response = await fetch('https://api.binance.com/sapi/v1/staking/stakingProductList?product=STAKING&asset=XRP', {
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
          asset: "XRP",
          annualPercentageRate: "0.0088",
          minPurchaseAmount: "1",
          productId: "XRP_FLEXIBLE",
          status: "ACTIVE",
        },
        {
          asset: "XRP",
          annualPercentageRate: "0.05",
          minPurchaseAmount: "10",
          productId: "XRP_LOCKED",
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
          asset: "XRP",
          annualPercentageRate: "0.03",
          minPurchaseAmount: "100",
          productId: "XRP_STAKING",
          status: "ACTIVE",
        },
      ],
    };
  } catch (error) {
    console.error('Error fetching staking products:', error);
  }
  return null;
}

// Helper function to get XRP earn rate
export async function getXRPEarnRate() {
  try {
    const lendingProducts = await getLendingProducts();
    if (lendingProducts && lendingProducts.products) {
      const xrpProduct = lendingProducts.products.find((product: any) => 
        product.asset === 'XRP' && product.productId === 'XRP_LOCKED'
      );
      return xrpProduct ? parseFloat(xrpProduct.annualPercentageRate) * 100 : 0;
    }
  } catch (error) {
    console.error('Error fetching XRP earn rate:', error);
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

// Helper function to get XRP price from CoinGecko
export async function getXRPPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ripple&vs_currencies=usd');
    if (response.ok) {
      const data = await response.json();
      return data.ripple?.usd || 0;
    }
  } catch (error) {
    console.error('Error fetching XRP price:', error);
  }
  return 0;
}

export default BinanceEarn;
