// YouHodler Earning for XLM
// Lending platform with high yield

export const YouHodlerEarning = {
  name: "YouHodler",
  type: "lending",
  website: "https://www.youhodler.com/",
  description: "Earn up to 12% APY on XLM through YouHodler's lending platform with flexible terms",
  liquidStakingToken: "N/A (Platform custody)",
  minimumStake: "1 XLM",
  apy: "~8-12%",
  lockPeriod: "Flexible",
  rewardsFrequency: "Daily",
  fees: "Platform fees",
  
  // API Information
  api: {
    baseUrl: "https://api.youhodler.com/v1",
    documentation: "https://docs.youhodler.com/",
    endpoints: {
      earn: "/earn/products",
      rates: "/rates",
      account: "/account/balance",
    },
  },

  // SDK Information
  sdk: {
    npm: "youhodler-sdk",
    github: "https://github.com/youhodler/youhodler-sdk",
    documentation: "https://docs.youhodler.com/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/youhodler",
    discord: "https://discord.gg/youhodler",
    telegram: "https://t.me/youhodler",
    reddit: "https://reddit.com/r/youhodler",
  },

  // Features
  features: [
    "High yield lending",
    "Flexible terms",
    "Daily interest payments",
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
      "YouHodler account",
      "KYC verification",
      "XLM balance",
    ],
  },

  // Risk Factors
  risks: [
    "Platform custody risk",
    "KYC requirement",
    "Platform fees",
    "Regional restrictions",
  ],

  // Integration Examples
  examples: {
    getEarnProducts: `
// Get earning products
const response = await fetch('https://api.youhodler.com/v1/earn/products', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
  },
});
const products = await response.json();
console.log('Earn products:', products);
    `,
    
    getRates: `
// Get current rates
const response = await fetch('https://api.youhodler.com/v1/rates');
const rates = await response.json();
console.log('Rates:', rates);
    `,
    
    getAccountBalance: `
// Get account balance
const response = await fetch('https://api.youhodler.com/v1/account/balance', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
  },
});
const balance = await response.json();
console.log('Balance:', balance);
    `,
  },
};

// Helper function to get earning products
export async function getEarnProducts() {
  try {
    // This would require API key authentication
    // For demonstration purposes, we'll return a mock response
    return {
      products: [
        {
          asset: "XLM",
          product: "Flexible",
          interestRate: 0.08,
          minAmount: 1,
          maxAmount: 1000000,
        },
        {
          asset: "XLM",
          product: "Premium",
          interestRate: 0.12,
          minAmount: 1000,
          maxAmount: 1000000,
        },
      ],
    };
  } catch (error) {
    console.error('Error fetching earn products:', error);
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
      return xlmProduct ? xlmProduct.interestRate * 100 : 0;
    }
  } catch (error) {
    console.error('Error fetching XLM earn rate:', error);
  }
  return 0;
}

// Helper function to get rates
export async function getRates() {
  try {
    const response = await fetch('https://api.youhodler.com/v1/rates');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching rates:', error);
  }
  return null;
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

export default YouHodlerEarning;
