// Messina One - Algorand Liquid Staking
// Liquid staking with mALGO tokens

export const MessinaOnePool = {
  name: 'Messina One',
  ticker: 'ALGO',
  liquidStakingToken: 'mALGO',
  
  // Pool Information
  description: 'Messina One provides liquid staking services on Algorand, allowing users to stake ALGO and receive mALGO tokens that represent their staked position while maintaining liquidity.',
  type: 'Liquid Staking',
  location: 'Decentralized (Algorand Blockchain)',
  features: [
    'Liquid staking with mALGO',
    'Instant liquidity',
    'Governance rewards',
    'No minimum stake',
    'DeFi composability',
    'Automatic reward compounding'
  ],
  
  // Official Links
  website: 'https://www.messina.one/',
  app: 'https://app.messina.one/',
  docs: 'https://docs.messina.one/',
  
  // API & SDK
  api: {
    note: 'Messina One uses on-chain contracts; query via Algorand Indexer',
    algodEndpoint: 'https://mainnet-api.algonode.cloud',
    indexerEndpoint: 'https://mainnet-idx.algonode.cloud',
    endpoints: {
      stakingContract: 'Query via application ID',
      exchangeRate: 'Query contract global state for mALGO/ALGO rate',
      userPosition: 'Query user account for mALGO balance',
    },
  },
  
  // SDK Information
  sdk: {
    npm: 'algosdk',
    docs: 'https://developer.algorand.org/docs/sdks/javascript/',
    github: 'https://github.com/algorand/js-algorand-sdk',
    installation: 'npm install algosdk',
  },
  
  // Smart Contract Details
  contracts: {
    mainnet: {
      stakingAppId: 'TBD',
      mAlgoAssetId: 'TBD',
    },
    testnet: {
      stakingAppId: 'TBD',
      mAlgoAssetId: 'TBD',
    },
  },
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/messinaone',
    discord: 'https://discord.gg/messinaone',
    telegram: 'https://t.me/messinaone',
  },
  
  // Integration Examples
  integration: {
    stakeAlgo: `
import algosdk from 'algosdk';

async function stakeToMessina(
  amount: number,
  userAddress: string,
  privateKey: Uint8Array
) {
  const algodClient = new algosdk.Algodv2('', 'https://mainnet-api.algonode.cloud', 443);
  
  // Get suggested parameters
  const suggestedParams = await algodClient.getTransactionParams().do();
  
  // Create staking transaction to Messina contract
  const appCallTxn = algosdk.makeApplicationCallTxnFromObject({
    from: userAddress,
    appIndex: MESSINA_APP_ID, // Replace with actual app ID
    onComplete: algosdk.OnApplicationComplete.NoOpOC,
    appArgs: [
      new Uint8Array(Buffer.from('stake')),
      algosdk.encodeUint64(amount * 1e6) // Convert to microAlgos
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
    
    getExchangeRate: `
import algosdk from 'algosdk';

async function getMALGOExchangeRate() {
  const algodClient = new algosdk.Algodv2('', 'https://mainnet-api.algonode.cloud', 443);
  
  // Get Messina staking contract state
  const appInfo = await algodClient.getApplicationByID(MESSINA_APP_ID).do();
  const globalState = appInfo.params['global-state'];
  
  // Parse exchange rate from global state
  // Note: Actual key names depend on Messina's contract implementation
  const totalStaked = globalState.find((kv: any) => 
    Buffer.from(kv.key, 'base64').toString() === 'total_staked'
  )?.value.uint;
  
  const totalMAlgo = globalState.find((kv: any) => 
    Buffer.from(kv.key, 'base64').toString() === 'total_malgo'
  )?.value.uint;
  
  if (totalStaked && totalMAlgo) {
    return totalStaked / totalMAlgo; // ALGO per mALGO
  }
  
  throw new Error('Could not fetch exchange rate');
}
    `,
  },
  
  // Staking Metrics
  metrics: {
    estimatedAPY: '4-7%',
    minimumStake: '0 ALGO',
    unbondingPeriod: 'Instant (liquid)',
    exchangeRate: 'Dynamic (typically > 1 ALGO per mALGO)',
    fees: '~1-2% protocol fee',
  },
  
  // Additional Resources
  resources: [
    {
      title: 'Messina One Documentation',
      url: 'https://docs.messina.one/',
    },
    {
      title: 'Liquid Staking Guide',
      url: 'https://docs.messina.one/staking',
    },
    {
      title: 'mALGO Tokenomics',
      url: 'https://docs.messina.one/tokenomics',
    },
  ],
};

