// Folks Finance - Algorand Liquid Staking Pool
// Liquid staking protocol offering xALGO tokens

export const FolksFinancePool = {
  name: 'Folks Finance',
  ticker: 'ALGO',
  liquidStakingToken: 'xALGO',
  
  // Pool Information
  description: 'Folks Finance is a decentralized capital markets protocol on Algorand offering liquid staking through xALGO tokens. Users can stake ALGO and receive xALGO which can be used in DeFi while earning staking rewards.',
  type: 'Liquid Staking / Lending/Borrowing',
  location: 'Decentralized (Algorand Blockchain)',
  features: [
    'Liquid staking with xALGO',
    'Governance participation',
    'Lending and borrowing',
    'No minimum stake requirement',
    'Instant liquidity'
  ],
  
  // Official Links
  website: 'https://folks.finance/',
  app: 'https://app.folks.finance/',
  governance: 'https://app.folks.finance/governance',
  docs: 'https://docs.folks.finance/',
  blog: 'https://medium.com/folks-finance',
  
  // API & SDK
  api: {
    baseUrl: 'https://api.folks.finance/api/v1',
    endpoints: {
      pools: '/pools',
      stakingData: '/staking',
      exchangeRate: '/xalgo/rate', // xALGO to ALGO exchange rate
      governance: '/governance',
      userStats: '/user/:address',
    },
  },
  
  // SDK Information
  sdk: {
    npm: '@folks-finance/algo-sdk',
    docs: 'https://docs.folks.finance/developers/sdk',
    github: 'https://github.com/Folks-Finance',
    installation: 'npm install @folks-finance/algo-sdk algosdk',
  },
  
  // Oracle Information
  oracle: {
    name: 'Folks Feed Oracle',
    description: 'Real-world data feeds for DeFi applications',
    docs: 'https://docs.folksfeed.io/developers/sdk',
    priceFeeds: [
      'ALGO/USD',
      'xALGO/ALGO',
      'Various ASA prices'
    ],
  },
  
  // Smart Contract Details
  contracts: {
    mainnet: {
      stakingAppId: 'TBD', // Application ID for staking contract
      xAlgoAssetId: 'TBD', // Asset ID for xALGO token
      governanceAppId: 'TBD',
    },
    testnet: {
      stakingAppId: 'TBD',
      xAlgoAssetId: 'TBD',
      governanceAppId: 'TBD',
    },
  },
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/FolksFinance',
    discord: 'https://discord.gg/folksfinance',
    telegram: 'https://t.me/FolksFinanceOfficial',
    medium: 'https://medium.com/folks-finance',
  },
  
  // Integration Examples
  integration: {
    fetchExchangeRate: `
import algosdk from 'algosdk';

const algodClient = new algosdk.Algodv2('', 'https://mainnet-api.algonode.cloud', 443);
const indexerClient = new algosdk.Indexer('', 'https://mainnet-idx.algonode.cloud', 443);

async function getXAlgoExchangeRate() {
  try {
    // Fetch from Folks Finance API
    const response = await fetch('https://api.folks.finance/api/v1/xalgo/rate');
    const data = await response.json();
    return data.rate; // xALGO to ALGO exchange rate
  } catch (error) {
    console.error('Error fetching xALGO rate:', error);
    throw error;
  }
}

async function getUserStakingInfo(address: string) {
  try {
    const response = await fetch(\`https://api.folks.finance/api/v1/user/\${address}\`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user staking info:', error);
    throw error;
  }
}
    `,
    
    stakeAlgo: `
import algosdk from 'algosdk';

async function stakeAlgo(amount: number, userAddress: string, privateKey: Uint8Array) {
  const algodClient = new algosdk.Algodv2('', 'https://mainnet-api.algonode.cloud', 443);
  
  // Get suggested parameters
  const suggestedParams = await algodClient.getTransactionParams().do();
  
  // Create application call transaction to Folks Finance staking contract
  const appCallTxn = algosdk.makeApplicationCallTxnFromObject({
    from: userAddress,
    appIndex: STAKING_APP_ID, // Replace with actual app ID
    onComplete: algosdk.OnApplicationComplete.NoOpOC,
    appArgs: [
      new Uint8Array(Buffer.from('stake')),
      algosdk.encodeUint64(amount * 1e6) // Convert to microAlgos
    ],
    suggestedParams,
  });
  
  // Sign and send transaction
  const signedTxn = appCallTxn.signTxn(privateKey);
  const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
  
  // Wait for confirmation
  const confirmedTxn = await algosdk.waitForConfirmation(algodClient, txId, 4);
  return confirmedTxn;
}
    `,
  },
  
  // Pricing & APY Information
  metrics: {
    estimatedAPY: '4-8%', // Variable based on governance rewards
    minimumStake: '0 ALGO',
    unbondingPeriod: 'Instant (liquid)',
    fees: '~1-2% protocol fee',
  },
  
  // Additional Resources
  resources: [
    {
      title: 'Folks Finance Documentation',
      url: 'https://docs.folks.finance/',
    },
    {
      title: 'xALGO Tokenomics',
      url: 'https://docs.folks.finance/xalgo',
    },
    {
      title: 'Governance Guide',
      url: 'https://docs.folks.finance/governance',
    },
    {
      title: 'SDK Integration Guide',
      url: 'https://docs.folks.finance/developers/sdk',
    },
  ],
};

