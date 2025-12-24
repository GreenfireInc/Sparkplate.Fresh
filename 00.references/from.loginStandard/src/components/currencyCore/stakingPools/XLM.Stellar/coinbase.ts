// Coinbase Earn for XLM
// Exchange-based earning service

export const CoinbaseEarn = {
  name: "Coinbase Earn",
  type: "exchange",
  website: "https://www.coinbase.com/earn",
  description: "Earn interest on XLM through Coinbase's earning service with flexible terms",
  liquidStakingToken: "N/A (Exchange custody)",
  minimumStake: "1 XLM",
  apy: "~2.5%",
  lockPeriod: "Flexible",
  rewardsFrequency: "Daily",
  fees: "Exchange fees",
  
  // API Information
  api: {
    baseUrl: "https://api.coinbase.com",
    documentation: "https://docs.cloud.coinbase.com/",
    endpoints: {
      earn: "/v2/accounts/earn",
      rates: "/v2/exchange-rates",
      account: "/v2/accounts",
    },
  },

  // SDK Information
  sdk: {
    npm: "coinbase-sdk",
    github: "https://github.com/coinbase/coinbase-sdk",
    documentation: "https://docs.cloud.coinbase.com/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/coinbase",
    discord: "https://discord.gg/coinbase",
    telegram: "https://t.me/coinbase",
    reddit: "https://reddit.com/r/coinbase",
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
      "Coinbase account",
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
    getEarnAccounts: `
// Get earn accounts
const response = await fetch('https://api.coinbase.com/v2/accounts/earn', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
  },
});
const accounts = await response.json();
console.log('Earn accounts:', accounts);
    `,
    
    getExchangeRates: `
// Get exchange rates
const response = await fetch('https://api.coinbase.com/v2/exchange-rates');
const rates = await response.json();
console.log('Exchange rates:', rates);
    `,
    
    getAccounts: `
// Get accounts
const response = await fetch('https://api.coinbase.com/v2/accounts', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
  },
});
const accounts = await response.json();
console.log('Accounts:', accounts);
    `,
  },
};

// Helper function to get earn accounts
export async function getEarnAccounts() {
  try {
    // This would require API key authentication
    // For demonstration purposes, we'll return a mock response
    return {
      accounts: [
        {
          id: "XLM_EARN",
          currency: "XLM",
          balance: "0",
          available: "0",
          hold: "0",
          type: "earn",
        },
      ],
    };
  } catch (error) {
    console.error('Error fetching earn accounts:', error);
  }
  return null;
}

// Helper function to get exchange rates
export async function getExchangeRates() {
  try {
    const response = await fetch('https://api.coinbase.com/v2/exchange-rates');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
  }
  return null;
}

// Helper function to get XLM earn rate
export async function getXLMEarnRate() {
  try {
    // Coinbase typically offers around 2.5% APY for XLM
    return 2.5;
  } catch (error) {
    console.error('Error fetching XLM earn rate:', error);
  }
  return 0;
}

// Helper function to check if earning is available
export async function isEarningAvailable(): Promise<boolean> {
  try {
    const accounts = await getEarnAccounts();
    return accounts && accounts.accounts && accounts.accounts.length > 0;
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

export default CoinbaseEarn;
