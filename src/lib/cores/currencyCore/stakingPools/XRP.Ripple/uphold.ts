// Uphold Earn for XRP
// Exchange with yield program

export const UpholdEarn = {
  name: "Uphold Earn",
  type: "exchange",
  website: "https://uphold.com/",
  description: "Earn interest on XRP through Uphold's yield program with Flare F-Asset integration",
  liquidStakingToken: "N/A (Exchange custody)",
  minimumStake: "1 XRP",
  apy: "~2-4%",
  lockPeriod: "Flexible",
  rewardsFrequency: "Daily",
  fees: "Exchange fees",
  
  // API Information
  api: {
    baseUrl: "https://api.uphold.com/v0",
    documentation: "https://uphold.com/en/developer/api/documentation",
    endpoints: {
      earn: "/me/earn",
      rates: "/ticker",
      account: "/me",
    },
  },

  // SDK Information
  sdk: {
    npm: "uphold-sdk",
    github: "https://github.com/uphold/uphold-sdk",
    documentation: "https://uphold.com/en/developer/api/documentation",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/UpholdInc",
    discord: "https://discord.gg/uphold",
    telegram: "https://t.me/uphold",
    reddit: "https://reddit.com/r/uphold",
  },

  // Features
  features: [
    "Exchange-based earning",
    "Flare F-Asset integration",
    "Flexible terms",
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
      "Uphold account",
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
    getEarnInfo: `
// Get earn information
const response = await fetch('https://api.uphold.com/v0/me/earn', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
  },
});
const earn = await response.json();
console.log('Earn info:', earn);
    `,
    
    getTicker: `
// Get ticker information
const response = await fetch('https://api.uphold.com/v0/ticker');
const ticker = await response.json();
console.log('Ticker:', ticker);
    `,
    
    getAccount: `
// Get account info
const response = await fetch('https://api.uphold.com/v0/me', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
  },
});
const account = await response.json();
console.log('Account:', account);
    `,
  },
};

// Helper function to get earn info
export async function getEarnInfo() {
  try {
    // This would require API key authentication
    // For demonstration purposes, we'll return a mock response
    return {
      products: [
        {
          asset: "XRP",
          product: "Earn",
          annualPercentageRate: "0.03",
          minAmount: "1",
          maxAmount: "1000000",
        },
      ],
    };
  } catch (error) {
    console.error('Error fetching earn info:', error);
  }
  return null;
}

// Helper function to get ticker
export async function getTicker() {
  try {
    const response = await fetch('https://api.uphold.com/v0/ticker');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching ticker:', error);
  }
  return null;
}

// Helper function to get XRP earn rate
export async function getXRPEarnRate() {
  try {
    const earnInfo = await getEarnInfo();
    if (earnInfo && earnInfo.products) {
      const xrpProduct = earnInfo.products.find((product: any) => 
        product.asset === 'XRP'
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
    const earnInfo = await getEarnInfo();
    return earnInfo && earnInfo.products && earnInfo.products.length > 0;
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

export default UpholdEarn;
