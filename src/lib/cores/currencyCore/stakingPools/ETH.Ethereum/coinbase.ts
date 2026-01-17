// Coinbase Staking Pool for Ethereum (ETH)
// Exchange-based staking service with cbETH tokens

export const CoinbaseStaking = {
  name: "Coinbase Staking",
  type: "Exchange Staking",
  website: "https://www.coinbase.com/earn/staking/ethereum",
  description: "Stake ETH through Coinbase exchange with cbETH tokens",
  minimumStake: "No minimum",
  apy: "Variable (based on network rewards)",
  lockPeriod: "Flexible with cbETH",
  rewardsFrequency: "Daily",
  fees: "25% commission",
  
  // API Information
  api: {
    baseUrl: "https://api.coinbase.com",
    documentation: "https://docs.cloud.coinbase.com/",
    endpoints: {
      staking: "/v2/accounts/{account_id}/staking",
      rewards: "/v2/accounts/{account_id}/staking/rewards",
      positions: "/v2/accounts/{account_id}/staking/positions",
      unstaking: "/v2/accounts/{account_id}/staking/positions/{position_id}/unstake",
    },
  },

  // SDK Information
  sdk: {
    npm: "coinbase",
    github: "https://github.com/coinbase/coinbase-node",
    documentation: "https://github.com/coinbase/coinbase-node",
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
    "No minimum stake requirement",
    "User-friendly interface",
    "cbETH token for liquidity",
    "Mobile app support",
    "Educational resources",
    "24/7 customer support",
  ],

  // Liquid Staking Tokens
  liquidTokens: [
    {
      name: "cbETH",
      symbol: "cbETH",
      description: "Coinbase Wrapped Staked ETH token",
      exchangeRate: "Variable (increases over time)",
    },
  ],

  // Contract Addresses
  contracts: {
    cbETH: "0xBe9895146f7AF43049ca1c1AE358B0541Ea49704",
    stakingContract: "0x00000000219ab540356cBB839Cbe05303d7705Fa",
  },

  // Staking Requirements
  requirements: {
    kyc: true,
    accountVerification: true,
    minimumAge: 18,
    supportedRegions: "US, Europe, UK, Canada, Australia",
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
    getStakingPositions: `
// Get staking positions
const Coinbase = require('coinbase');
const client = new Coinbase.Client({
  apiKey: 'your-api-key',
  apiSecret: 'your-api-secret',
  sandbox: false
});

client.getAccounts((err, accounts) => {
  if (err) return console.error('Error:', err);
  
  const ethAccount = accounts.find(acc => acc.currency === 'ETH');
  if (ethAccount) {
    client.getStakingPositions(ethAccount.id, (err, positions) => {
      if (err) return console.error('Error:', err);
      console.log('ETH staking positions:', positions);
    });
  }
});
    `,
    
    stakeETH: `
// Stake ETH
const stakeData = {
  amount: '1.0', // Amount in ETH
  currency: 'ETH'
};

client.stake(ethAccount.id, stakeData, (err, result) => {
  if (err) return console.error('Staking failed:', err);
  console.log('Staking successful:', result);
});
    `,
    
    unstakeETH: `
// Unstake ETH
const positionId = 'position-id-here';
const unstakeData = {
  amount: '0.5' // Amount in ETH
};

client.unstake(ethAccount.id, positionId, unstakeData, (err, result) => {
  if (err) return console.error('Unstaking failed:', err);
  console.log('Unstaking successful:', result);
});
    `,
    
    getStakingRewards: `
// Get staking rewards
client.getStakingRewards(ethAccount.id, (err, rewards) => {
  if (err) return console.error('Error:', err);
  console.log('ETH staking rewards:', rewards);
});
    `,
  },
};

// Helper function to get current staking rates
export async function getCoinbaseStakingRates() {
  try {
    const response = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=ETH');
    if (response.ok) {
      const data = await response.json();
      return {
        currency: 'ETH',
        rates: data.data.rates,
        timestamp: new Date().toISOString(),
      };
    }
  } catch (error) {
    console.error('Error fetching Coinbase staking rates:', error);
  }
  return null;
}

// Helper function to check if staking is available
export async function isStakingAvailable() {
  try {
    const response = await fetch('https://api.coinbase.com/v2/currencies');
    if (response.ok) {
      const data = await response.json();
      const ethCurrency = data.data.find(currency => currency.id === 'ETH');
      return ethCurrency && ethCurrency.staking_enabled === true;
    }
  } catch (error) {
    console.error('Error checking staking availability:', error);
  }
  return false;
}

// Helper function to get ETH price from Coinbase
export async function getETHPrice() {
  try {
    const response = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=ETH');
    if (response.ok) {
      const data = await response.json();
      return parseFloat(data.data.rates.USD);
    }
  } catch (error) {
    console.error('Error fetching ETH price:', error);
  }
  return 0;
}

// Helper function to get cbETH exchange rate
export async function getCbETHExchangeRate() {
  try {
    const response = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=cbETH');
    if (response.ok) {
      const data = await response.json();
      return parseFloat(data.data.rates.ETH);
    }
  } catch (error) {
    console.error('Error fetching cbETH exchange rate:', error);
  }
  return 0;
}

// Helper function to get staking rewards history
export async function getStakingRewards(apiKey: string, apiSecret: string, accountId: string) {
  try {
    const response = await fetch(`https://api.coinbase.com/v2/accounts/${accountId}/staking/rewards`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.data;
    }
  } catch (error) {
    console.error('Error fetching staking rewards:', error);
    throw error;
  }
}

// Helper function to calculate cbETH amount from ETH
export async function calculateCbETHAmount(ethAmount: number) {
  try {
    const exchangeRate = await getCbETHExchangeRate();
    return ethAmount * exchangeRate;
  } catch (error) {
    console.error('Error calculating cbETH amount:', error);
    return 0;
  }
}

// Helper function to calculate ETH amount from cbETH
export async function calculateETHAmount(cbethAmount: number) {
  try {
    const exchangeRate = await getCbETHExchangeRate();
    return cbethAmount / exchangeRate;
  } catch (error) {
    console.error('Error calculating ETH amount:', error);
    return 0;
  }
}

export default CoinbaseStaking;

