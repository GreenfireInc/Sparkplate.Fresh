// Pact - Algorand Staking Pool
// AMM DEX with consensus staking

export const PactPool = {
  name: 'Pact',
  ticker: 'ALGO',
  liquidStakingToken: 'N/A',
  
  // Pool Information
  description: 'Pact is a mobile-first decentralized exchange on Algorand offering deep liquidity, low fees, and consensus staking opportunities. Users can participate in liquidity pools while earning trading fees.',
  type: 'Consensus Staking / AMM DEX',
  location: 'Decentralized (Algorand Blockchain)',
  features: [
    'Consensus staking (30,000 ALGO minimum)',
    'AMM liquidity pools',
    'Low transaction fees',
    'Mobile-optimized interface',
    'Node operation or pool joining',
    'Trading fee rewards'
  ],
  
  // Official Links
  website: 'https://www.pact.fi/',
  app: 'https://app.pact.fi/',
  docs: 'https://docs.pact.fi/',
  blog: 'https://medium.com/@pactfi',
  
  // API & SDK
  api: {
    baseUrl: 'https://api.pact.fi/api',
    endpoints: {
      pools: '/pools',
      assets: '/assets',
      swaps: '/swaps',
      liquidity: '/liquidity',
      stakingInfo: '/staking',
    },
  },
  
  // SDK Information
  sdk: {
    python: 'pact-py-sdk',
    pythonDocs: 'https://pactfi.github.io/pact-py-sdk/latest/',
    github: 'https://github.com/pactfi/pact-py-sdk',
    installation: 'pip install pactsdk',
    note: 'Currently Python SDK only; use algosdk for TypeScript/JavaScript integration',
  },
  
  // Smart Contract Details
  contracts: {
    mainnet: {
      ammAppId: 'TBD', // Pact AMM contract
      stakingAppId: 'TBD',
    },
    testnet: {
      ammAppId: 'TBD',
      stakingAppId: 'TBD',
    },
  },
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/pactfi',
    discord: 'https://discord.gg/pactfi',
    telegram: 'https://t.me/pactfi',
    medium: 'https://medium.com/@pactfi',
  },
  
  // Integration Examples
  integration: {
    fetchPoolData: `
import algosdk from 'algosdk';

async function getPactPools() {
  try {
    const response = await fetch('https://api.pact.fi/api/pools');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Pact pools:', error);
    throw error;
  }
}

async function getPoolLiquidity(poolId: string) {
  try {
    const response = await fetch(\`https://api.pact.fi/api/pools/\${poolId}/liquidity\`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching pool liquidity:', error);
    throw error;
  }
}
    `,
    
    interactWithPool: `
import algosdk from 'algosdk';

async function addLiquidityToPact(
  poolAppId: number,
  userAddress: string,
  privateKey: Uint8Array,
  asset1Amount: number,
  asset2Amount: number
) {
  const algodClient = new algosdk.Algodv2('', 'https://mainnet-api.algonode.cloud', 443);
  
  // Get suggested parameters
  const suggestedParams = await algodClient.getTransactionParams().do();
  
  // Create application call to add liquidity
  // Note: This is a simplified example; actual implementation requires
  // following Pact's specific contract interface
  const appCallTxn = algosdk.makeApplicationCallTxnFromObject({
    from: userAddress,
    appIndex: poolAppId,
    onComplete: algosdk.OnApplicationComplete.NoOpOC,
    appArgs: [
      new Uint8Array(Buffer.from('add_liquidity')),
      algosdk.encodeUint64(asset1Amount),
      algosdk.encodeUint64(asset2Amount),
    ],
    suggestedParams,
  });
  
  // Sign and send
  const signedTxn = appCallTxn.signTxn(privateKey);
  const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
  
  // Wait for confirmation
  const confirmedTxn = await algosdk.waitForConfirmation(algodClient, txId, 4);
  return confirmedTxn;
}
    `,
  },
  
  // Staking & Metrics
  metrics: {
    consensusStakingMinimum: '30,000 ALGO',
    lpStaking: 'Variable APY based on pool',
    tradingFees: '~0.25-0.30%',
    estimatedAPY: '5-15% (varies by pool)',
    unbondingPeriod: 'Depends on staking type',
  },
  
  // Additional Resources
  resources: [
    {
      title: 'Pact Documentation',
      url: 'https://docs.pact.fi/',
    },
    {
      title: 'Python SDK Documentation',
      url: 'https://pactfi.github.io/pact-py-sdk/latest/',
    },
    {
      title: 'Liquidity Provider Guide',
      url: 'https://docs.pact.fi/liquidity-providers',
    },
    {
      title: 'Staking Guide',
      url: 'https://docs.pact.fi/staking',
    },
  ],
};

