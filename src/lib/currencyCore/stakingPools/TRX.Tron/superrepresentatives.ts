// Tron Super Representatives (SRs) Staking for TRX
// Native voting/staking mechanism

export const SuperRepresentativesStaking = {
  name: "Tron Super Representatives",
  type: "native",
  website: "https://tronscan.org/#/sr/representatives",
  description: "Vote for 27 Super Representatives and earn TRX rewards through native DPoS mechanism",
  liquidStakingToken: "N/A (Native TRX voting)",
  minimumStake: "1 TRX",
  apy: "~5-8%",
  lockPeriod: "Variable (cycle dependent)",
  rewardsFrequency: "Per block",
  fees: "SR fees only",
  
  // API Information
  api: {
    baseUrl: "https://api.trongrid.io",
    documentation: "https://developers.tron.network/reference",
    endpoints: {
      srList: "/wallet/listwitnesses",
      voting: "/wallet/votewitnessaccount",
      rewards: "/wallet/getaccount",
    },
  },

  // SDK Information
  sdk: {
    npm: "tronweb",
    github: "https://github.com/tronprotocol/tron-web",
    documentation: "https://developers.tron.network/docs/tronweb-intro",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/trondao",
    discord: "https://discord.gg/tron",
    telegram: "https://t.me/tronnetworkEN",
    reddit: "https://reddit.com/r/Tronix",
  },

  // Features
  features: [
    "Native DPoS voting",
    "27 Super Representatives",
    "No lockup period",
    "Real-time rewards",
    "Decentralized governance",
    "Transparent fees",
    "Community participation",
  ],

  // Staking Requirements
  requirements: {
    kyc: false,
    accountVerification: false,
    minimumAge: 18,
    supportedRegions: "Global",
    technicalRequirements: [
      "TRX wallet",
      "1 TRX minimum",
      "SR selection",
    ],
  },

  // Risk Factors
  risks: [
    "SR performance risk",
    "Voting power concentration",
    "Network governance changes",
    "Technical complexity",
  ],

  // Integration Examples
  examples: {
    getSRList: `
// Get list of Super Representatives
const response = await fetch('https://api.trongrid.io/wallet/listwitnesses');
const data = await response.json();
console.log('SR List:', data);
    `,
    
    voteForSR: `
// Vote for Super Representative
const voteData = {
  owner_address: "YOUR_ADDRESS",
  votes: [{
    vote_address: "SR_ADDRESS",
    vote_count: 1000000
  }]
};
const response = await fetch('https://api.trongrid.io/wallet/votewitnessaccount', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(voteData)
});
    `,
    
    getAccountInfo: `
// Get account information including votes
const response = await fetch('https://api.trongrid.io/wallet/getaccount?address=YOUR_ADDRESS');
const account = await response.json();
console.log('Account:', account);
    `,
  },
};

// Helper function to get SR list
export async function getSRList() {
  try {
    const response = await fetch('https://api.trongrid.io/wallet/listwitnesses');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching SR list:', error);
  }
  return null;
}

// Helper function to get account votes
export async function getAccountVotes(address: string) {
  try {
    const response = await fetch(`https://api.trongrid.io/wallet/getaccount?address=${address}`);
    if (response.ok) {
      const account = await response.json();
      return account.votes || [];
    }
  } catch (error) {
    console.error('Error fetching account votes:', error);
  }
  return null;
}

// Helper function to get SR performance
export async function getSRPerformance() {
  try {
    const srList = await getSRList();
    if (srList && srList.witnesses) {
      return srList.witnesses.map((sr: any) => ({
        address: sr.address,
        url: sr.url,
        totalVotes: sr.totalVotes,
        isJobs: sr.isJobs,
        isJobsV2: sr.isJobsV2,
      }));
    }
  } catch (error) {
    console.error('Error fetching SR performance:', error);
  }
  return null;
}

// Helper function to check if voting is available
export async function isVotingAvailable(): Promise<boolean> {
  try {
    const srList = await getSRList();
    return srList && srList.witnesses && srList.witnesses.length > 0;
  } catch (error) {
    console.error('Error checking voting availability:', error);
    return false;
  }
}

// Helper function to get TRX price from CoinGecko
export async function getTRXPrice(): Promise<number> {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=usd');
    if (response.ok) {
      const data = await response.json();
      return data.tron?.usd || 0;
    }
  } catch (error) {
    console.error('Error fetching TRX price:', error);
  }
  return 0;
}

export default SuperRepresentativesStaking;
