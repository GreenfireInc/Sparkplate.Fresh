// Xverse Wallet Stacking for Stacks (STX)
// Built-in wallet stacking functionality

export const XverseStaking = {
  name: "Xverse Wallet",
  type: "Wallet Stacking",
  website: "https://xverse.app/",
  description: "Built-in stacking functionality in Xverse wallet, non-custodial, BTC rewards",
  liquidStakingToken: "N/A (Direct stacking)",
  minimumStake: "Variable (depends on current cycle)",
  apy: "~10%",
  lockPeriod: "2-3 days unstaking period",
  rewardsFrequency: "Per stacking cycle (~2 weeks)",
  fees: "No additional fees",
  
  // API Information
  api: {
    baseUrl: "https://docs.xverse.app/",
    documentation: "https://docs.xverse.app/",
    endpoints: {
      stacking: "/stacking",
      rewards: "/rewards",
      cycle: "/cycle",
    },
  },

  // SDK Information
  sdk: {
    npm: "@stacks/connect",
    github: "https://github.com/secretkeylabs/xverse-core",
    documentation: "https://docs.xverse.app/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/xverseapp",
    discord: "https://discord.gg/xverse",
    telegram: "https://t.me/xverseapp",
    reddit: "https://reddit.com/r/xverse",
  },

  // Features
  features: [
    "Built-in wallet stacking",
    "Non-custodial",
    "BTC rewards",
    "User-friendly interface",
    "No additional fees",
    "Direct STX control",
    "Mobile and web support",
  ],

  // Staking Requirements
  requirements: {
    kyc: false,
    accountVerification: false,
    minimumAge: 18,
    supportedRegions: "Global",
    technicalRequirements: [
      "Xverse wallet installed",
      "STX balance for stacking",
      "Internet connection",
    ],
  },

  // Risk Factors
  risks: [
    "Wallet security risk",
    "2-3 day unstaking period",
    "Stacking cycle timing",
    "User error risk",
  ],

  // Integration Examples
  examples: {
    connectWallet: `
// Connect to Xverse wallet
import { connect } from '@stacks/connect';

const userSession = await connect({
  appDetails: {
    name: 'My App',
    icon: 'https://example.com/icon.png',
  },
  redirectTo: '/',
  onFinish: (payload) => {
    console.log('Connected:', payload);
  },
  userSession: userSession,
});
    `,
    
    getStackingInfo: `
// Get stacking information
const stackingInfo = await userSession.loadUserData();
console.log('Stacking info:', stackingInfo);
    `,
    
    startStacking: `
// Start stacking process
const stackingTx = await makeContractCall({
  contractAddress: 'SP000000000000000000002Q6VF78',
  contractName: 'pox',
  functionName: 'stack-stx',
  functionArgs: [
    uintCV(amountInMicroSTX),
    uintCV(cycles),
    addressCV(poolAddress),
    uintCV(startBurnHeight)
  ],
  senderKey: userSession.loadUserData().appPrivateKey,
  network: network,
});
    `,
  },
};

// Helper function to get stacking info
export async function getStackingInfo() {
  try {
    // This would typically be done through the wallet connection
    // For demonstration purposes, we'll return a mock response
    return {
      isStacking: false,
      stackedAmount: 0,
      rewards: 0,
      cycle: 0,
    };
  } catch (error) {
    console.error('Error fetching stacking info:', error);
  }
  return null;
}

// Helper function to get current cycle info
export async function getCurrentCycle() {
  try {
    const response = await fetch('https://api.hiro.so/v2/pox');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching current cycle:', error);
  }
  return null;
}

// Helper function to get stacking rewards
export async function getStackingRewards(address: string) {
  try {
    const response = await fetch(`https://api.hiro.so/extended/v1/address/${address}/stacking`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching stacking rewards:', error);
  }
  return null;
}

// Helper function to check if stacking is available
export async function isStackingAvailable(): Promise<boolean> {
  try {
    const cycleInfo = await getCurrentCycle();
    return cycleInfo && cycleInfo.current_cycle;
  } catch (error) {
    console.error('Error checking stacking availability:', error);
    return false;
  }
}

// Helper function to get STX price from CoinGecko
export async function getSTXPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=blockstack&vs_currencies=usd');
    if (response.ok) {
      const data = await response.json();
      return data.blockstack?.usd || 0;
    }
  } catch (error) {
    console.error('Error fetching STX price:', error);
  }
  return 0;
}

export default XverseStaking;
