// Native Solana Staking
// Direct staking to validators through Solana wallets

export const NativeSolanaStaking = {
  name: "Native Solana Staking",
  type: "Native Staking",
  website: "https://solana.com/staking",
  description: "Stake directly to 3,000+ validators through Solana wallets (Phantom, Solflare)",
  liquidStakingToken: "N/A (Direct SOL staking)",
  minimumStake: "0.01 SOL",
  apy: "~6-7%",
  lockPeriod: "2-3 days unstaking period",
  rewardsFrequency: "Per epoch",
  fees: "Validator commission (0-100%)",
  
  // API Information
  api: {
    baseUrl: "https://api.mainnet-beta.solana.com",
    documentation: "https://docs.solana.com/developing/clients/jsonrpc-api",
    endpoints: {
      validators: "/getVoteAccounts",
      stakeAccounts: "/getStakeAccounts",
      rewards: "/getInflationReward",
      supply: "/getSupply",
    },
  },

  // SDK Information
  sdk: {
    npm: "@solana/web3.js",
    github: "https://github.com/solana-labs/solana-web3.js",
    documentation: "https://solana-labs.github.io/solana-web3.js/",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/solana",
    discord: "https://discord.gg/solana",
    telegram: "https://t.me/solana",
    reddit: "https://reddit.com/r/solana",
  },

  // Features
  features: [
    "Direct validator staking",
    "3,000+ validators available",
    "No protocol fees",
    "Full control over delegation",
    "Governance participation",
    "Validator selection freedom",
    "Native Solana experience",
  ],

  // Staking Requirements
  requirements: {
    kyc: false,
    accountVerification: false,
    minimumAge: 18,
    supportedRegions: "Global",
    technicalRequirements: [
      "0.01 SOL minimum",
      "Solana wallet (Phantom, Solflare, etc.)",
      "Validator selection",
      "Basic Solana knowledge",
    ],
  },

  // Risk Factors
  risks: [
    "Validator slashing risk",
    "Validator downtime",
    "2-3 day unstaking period",
    "Validator commission changes",
    "Validator selection responsibility",
  ],

  // Integration Examples
  examples: {
    getValidators: `
// Get list of validators
import { Connection } from '@solana/web3.js';

const connection = new Connection('https://api.mainnet-beta.solana.com');
const validators = await connection.getVoteAccounts();
console.log('Validators:', validators);
    `,
    
    getStakeAccounts: `
// Get stake accounts for a wallet
const stakeAccounts = await connection.getStakeAccounts(stakeAuthority);
console.log('Stake accounts:', stakeAccounts);
    `,
    
    getRewards: `
// Get staking rewards
const rewards = await connection.getInflationReward(stakeAccounts);
console.log('Staking rewards:', rewards);
    `,
    
    delegateStake: `
// Delegate stake to a validator
import { StakeProgram, PublicKey } from '@solana/web3.js';

const stakeAccount = new PublicKey('...');
const voteAccount = new PublicKey('...');

const delegateInstruction = StakeProgram.delegate({
  stakePubkey: stakeAccount,
  authorizedPubkey: stakeAuthority,
  votePubkey: voteAccount,
});
    `,
  },
};

// Helper function to get validators
export async function getValidators() {
  try {
    const response = await fetch('https://api.mainnet-beta.solana.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getVoteAccounts'
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.result;
    }
  } catch (error) {
    console.error('Error fetching validators:', error);
  }
  return null;
}

// Helper function to get stake accounts
export async function getStakeAccounts(stakeAuthority: string) {
  try {
    const response = await fetch('https://api.mainnet-beta.solana.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getStakeAccounts',
        params: [stakeAuthority]
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.result;
    }
  } catch (error) {
    console.error('Error fetching stake accounts:', error);
  }
  return null;
}

// Helper function to get staking rewards
export async function getStakingRewards(stakeAccounts: string[]) {
  try {
    const response = await fetch('https://api.mainnet-beta.solana.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getInflationReward',
        params: [stakeAccounts]
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.result;
    }
  } catch (error) {
    console.error('Error fetching staking rewards:', error);
  }
  return null;
}

// Helper function to get supply information
export async function getSupply() {
  try {
    const response = await fetch('https://api.mainnet-beta.solana.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getSupply'
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.result;
    }
  } catch (error) {
    console.error('Error fetching supply:', error);
  }
  return null;
}

// Helper function to check if staking is available
export async function isStakingAvailable(): Promise<boolean> {
  try {
    const validators = await getValidators();
    return validators && validators.length > 0;
  } catch (error) {
    console.error('Error checking staking availability:', error);
    return false;
  }
}

// Helper function to get SOL price from CoinGecko
export async function getSOLPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
    if (response.ok) {
      const data = await response.json();
      return data.solana?.usd || 0;
    }
  } catch (error) {
    console.error('Error fetching SOL price:', error);
  }
  return 0;
}

export default NativeSolanaStaking;
