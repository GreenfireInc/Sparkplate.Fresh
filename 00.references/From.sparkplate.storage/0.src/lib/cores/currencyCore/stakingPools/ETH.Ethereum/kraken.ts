// Kraken Staking Pool for Ethereum (ETH)
// Exchange-based staking service

export const KrakenStaking = {
  name: "Kraken Staking",
  type: "Exchange Staking",
  website: "https://www.kraken.com/features/staking-coins",
  description: "Stake ETH through Kraken exchange with flexible options",
  minimumStake: "No minimum",
  apy: "Variable (based on network rewards)",
  lockPeriod: "Flexible",
  rewardsFrequency: "Daily",
  fees: "15% commission",
  
  // API Information
  api: {
    baseUrl: "https://api.kraken.com",
    documentation: "https://docs.kraken.com/rest/",
    endpoints: {
      staking: "/0/private/Staking/Stake",
      unstaking: "/0/private/Staking/Unstake",
      rewards: "/0/private/Staking/Rewards",
      assets: "/0/public/Assets",
    },
  },

  // SDK Information
  sdk: {
    npm: "kraken-api",
    github: "https://github.com/nothingisdead/npm-kraken-api",
    documentation: "https://www.npmjs.com/package/kraken-api",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/krakenfx",
    discord: "https://discord.gg/kraken",
    telegram: "https://t.me/kraken",
    reddit: "https://reddit.com/r/Kraken",
  },

  // Features
  features: [
    "No minimum stake requirement",
    "Flexible unstaking",
    "Daily rewards",
    "Trade staked ETH on exchange",
    "Mobile app support",
    "24/7 customer support",
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
    checkStakingBalance: `
// Check staking balance
const kraken = require('kraken-api');
const api = kraken();

api.query('Staking/Stake', { asset: 'ETH' })
  .then(result => console.log('Staking balance:', result))
  .catch(err => console.error('Error:', err));
    `,
    
    stakeETH: `
// Stake ETH
const stakeAmount = '1.0'; // Amount in ETH
api.query('Staking/Stake', {
  asset: 'ETH',
  amount: stakeAmount
}).then(result => {
  console.log('Staking successful:', result);
}).catch(err => console.error('Staking failed:', err));
    `,
    
    unstakeETH: `
// Unstake ETH
const unstakeAmount = '0.5'; // Amount in ETH
api.query('Staking/Unstake', {
  asset: 'ETH',
  amount: unstakeAmount
}).then(result => {
  console.log('Unstaking successful:', result);
}).catch(err => console.error('Unstaking failed:', err));
    `,
  },
};

// Helper function to get current staking rates
export async function getKrakenStakingRates() {
  try {
    const response = await fetch('https://api.kraken.com/0/public/Assets');
    if (response.ok) {
      const data = await response.json();
      return data.result?.ETH?.staking || null;
    }
  } catch (error) {
    console.error('Error fetching Kraken staking rates:', error);
  }
  return null;
}

// Helper function to check if staking is available
export async function isStakingAvailable() {
  try {
    const rates = await getKrakenStakingRates();
    return rates && rates.enabled === true;
  } catch (error) {
    console.error('Error checking staking availability:', error);
    return false;
  }
}

// Helper function to get staking rewards history
export async function getStakingRewards(apiKey: string, apiSecret: string) {
  try {
    const kraken = require('kraken-api');
    const api = kraken(apiKey, apiSecret);
    
    const result = await api.query('Staking/Rewards');
    return result;
  } catch (error) {
    console.error('Error fetching staking rewards:', error);
    throw error;
  }
}

// Helper function to get ETH price from Kraken
export async function getETHPrice() {
  try {
    const response = await fetch('https://api.kraken.com/0/public/Ticker?pair=ETHUSD');
    if (response.ok) {
      const data = await response.json();
      return parseFloat(data.result?.ETHUSD?.c?.[0]) || 0;
    }
  } catch (error) {
    console.error('Error fetching ETH price:', error);
  }
  return 0;
}

export default KrakenStaking;

