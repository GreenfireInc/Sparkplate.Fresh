// Flare Network (FXRP) for XRP
// Wrapped XRP on Flare Network

export const FlareNetworkEarning = {
  name: "Flare Network (FXRP)",
  type: "defi",
  website: "https://flare.xyz/",
  description: "Earn 2-5% APY on XRP through Flare Network's wrapped XRP (FXRP) with lending and liquidity pools",
  liquidStakingToken: "FXRP",
  minimumStake: "1 XRP",
  apy: "~2-5%",
  lockPeriod: "Variable",
  rewardsFrequency: "Per block",
  fees: "Protocol fees",
  
  // API Information
  api: {
    baseUrl: "https://api.flare.xyz",
    documentation: "https://docs.flare.xyz",
    endpoints: {
      flare: "/api/v1/flare",
      fxrp: "/api/v1/fxrp",
      rates: "/api/v1/rates",
    },
  },

  // SDK Information
  sdk: {
    npm: "flare-sdk",
    github: "https://github.com/flare-foundation/flare-sdk",
    documentation: "https://docs.flare.xyz",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/FlareNetworks",
    discord: "https://discord.gg/flare",
    telegram: "https://t.me/FlareNetworks",
    reddit: "https://reddit.com/r/FlareNetworks",
  },

  // Features
  features: [
    "Wrapped XRP (FXRP)",
    "Lending protocols",
    "Liquidity pools",
    "Variable APY",
    "No lockup period",
    "Transparent fees",
    "Community governance",
  ],

  // Staking Requirements
  requirements: {
    kyc: false,
    accountVerification: false,
    minimumAge: 18,
    supportedRegions: "Global",
    technicalRequirements: [
      "XRP wallet",
      "1 XRP minimum",
      "Flare network access",
    ],
  },

  // Risk Factors
  risks: [
    "Smart contract risk",
    "Protocol fees",
    "Market volatility",
    "Liquidity risk",
  ],

  // Integration Examples
  examples: {
    getFlareInfo: `
// Get Flare network information
const response = await fetch('https://api.flare.xyz/api/v1/flare');
const flare = await response.json();
console.log('Flare info:', flare);
    `,
    
    getFXRPInfo: `
// Get FXRP information
const response = await fetch('https://api.flare.xyz/api/v1/fxrp');
const fxrp = await response.json();
console.log('FXRP info:', fxrp);
    `,
    
    getRates: `
// Get current rates
const response = await fetch('https://api.flare.xyz/api/v1/rates');
const rates = await response.json();
console.log('Rates:', rates);
    `,
  },
};

// Helper function to get Flare info
export async function getFlareInfo() {
  try {
    const response = await fetch('https://api.flare.xyz/api/v1/flare');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching Flare info:', error);
  }
  return null;
}

// Helper function to get FXRP info
export async function getFXRPInfo() {
  try {
    const response = await fetch('https://api.flare.xyz/api/v1/fxrp');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching FXRP info:', error);
  }
  return null;
}

// Helper function to get rates
export async function getRates() {
  try {
    const response = await fetch('https://api.flare.xyz/api/v1/rates');
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
    const flareInfo = await getFlareInfo();
    return flareInfo && flareInfo.available;
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

export default FlareNetworkEarning;
