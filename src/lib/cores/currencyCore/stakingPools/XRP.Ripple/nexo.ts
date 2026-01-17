// Nexo Earning for XRP
// Lending platform with interest earning

export const NexoEarning = {
  name: "Nexo",
  type: "lending",
  website: "https://nexo.io/",
  description: "Earn up to 8% APY on XRP through Nexo's lending platform with flexible terms",
  liquidStakingToken: "N/A (Platform custody)",
  minimumStake: "1 XRP",
  apy: "~4-8%",
  lockPeriod: "Flexible or fixed terms",
  rewardsFrequency: "Daily",
  fees: "Platform fees",
  
  // API Information
  api: {
    baseUrl: "https://api.nexo.io/v1",
    documentation: "https://docs.nexo.io/",
    endpoints: {
      earn: "/earn/products",
      rates: "/rates",
      account: "/account/balance",
    },
  },

  // SDK Information
  sdk: {
    npm: "nexo-sdk",
    github: "https://github.com/nexo/nexo-sdk",
    documentation: "https://docs.nexo.io/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/nexofinance",
    discord: "https://discord.gg/nexo",
    telegram: "https://t.me/nexofinance",
    reddit: "https://reddit.com/r/nexo",
  },

  // Features
  features: [
    "Lending platform",
    "Flexible and fixed terms",
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
      "Nexo account",
      "KYC verification",
      "XRP balance",
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
const response = await fetch('https://api.nexo.io/v1/earn/products', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
  },
});
const products = await response.json();
console.log('Earn products:', products);
    `,
    
    getRates: `
// Get current rates
const response = await fetch('https://api.nexo.io/v1/rates');
const rates = await response.json();
console.log('Rates:', rates);
    `,
    
    getAccountBalance: `
// Get account balance
const response = await fetch('https://api.nexo.io/v1/account/balance', {
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
          asset: "XRP",
          product: "Flexible",
          interestRate: 0.04,
          minAmount: 1,
          maxAmount: 1000000,
        },
        {
          asset: "XRP",
          product: "FixedTerm",
          interestRate: 0.08,
          minAmount: 100,
          maxAmount: 1000000,
        },
      ],
    };
  } catch (error) {
    console.error('Error fetching earn products:', error);
  }
  return null;
}

// Helper function to get XRP earn rate
export async function getXRPEarnRate() {
  try {
    const products = await getEarnProducts();
    if (products && products.products) {
      const xrpProduct = products.products.find((product: any) => 
        product.asset === 'XRP' && product.product === 'FixedTerm'
      );
      return xrpProduct ? xrpProduct.interestRate * 100 : 0;
    }
  } catch (error) {
    console.error('Error fetching XRP earn rate:', error);
  }
  return 0;
}

// Helper function to get rates
export async function getRates() {
  try {
    const response = await fetch('https://api.nexo.io/v1/rates');
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

export default NexoEarning;
