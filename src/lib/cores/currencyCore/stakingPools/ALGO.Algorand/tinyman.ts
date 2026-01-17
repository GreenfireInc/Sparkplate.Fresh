// Tinyman - Algorand Liquid Staking Pool
// AMM DEX with liquid staking functionality

export const TinymanPool = {
  name: 'Tinyman',
  ticker: 'ALGO',
  liquidStakingToken: 'tALGO',
  
  // Pool Information
  description: 'Tinyman is the leading decentralized exchange on Algorand that also offers liquid staking through tALGO tokens. Users can stake ALGO and receive tALGO which maintains liquidity while earning rewards.',
  type: 'Liquid Staking / AMM DEX',
  location: 'Decentralized (Algorand Blockchain)',
  features: [
    'Liquid staking with tALGO',
    'AMM trading pairs',
    'Liquidity provision',
    'No minimum stake',
    'Instant liquidity',
    'Governance participation'
  ],
  
  // Official Links
  website: 'https://tinyman.org/',
  app: 'https://app.tinyman.org/',
  docs: 'https://docs.tinyman.org/',
  blog: 'https://tinymanorg.medium.com/',
  analytics: 'https://mainnet.analytics.tinyman.org/',
  
  // API & SDK
  api: {
    baseUrl: 'https://mainnet.analytics.tinyman.org/api/v1',
    endpoints: {
      pools: '/pools/',
      assets: '/assets/',
      currentAssetPrices: '/current-asset-prices/',
      poolStats: '/pools/:poolId',
      swapQuote: '/swap/quote',
    },
  },
  
  // SDK Information
  sdk: {
    npm: '@tinymanorg/tinyman-js-sdk',
    version: '5.1.1',
    docs: 'https://docs.tinyman.org/v2-integration/official-sdks',
    github: 'https://github.com/tinymanorg/tinyman-js-sdk',
    installation: 'npm install @tinymanorg/tinyman-js-sdk algosdk',
  },
  
  // Smart Contract Details
  contracts: {
    mainnet: {
      validatorAppId: 'TBD', // V2 Validator App ID
      poolTemplateId: 'TBD',
      tAlgoAssetId: 'TBD',
    },
    testnet: {
      validatorAppId: 'TBD',
      poolTemplateId: 'TBD',
      tAlgoAssetId: 'TBD',
    },
  },
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/tinymanorg',
    discord: 'https://discord.gg/wvHnAdmEv6',
    telegram: 'https://t.me/tinymanofficial',
    medium: 'https://tinymanorg.medium.com/',
  },
  
  // Integration Examples
  integration: {
    fetchPoolPrices: `
import { tinymanJSSDKConfig } from '@tinymanorg/tinyman-js-sdk';
import algosdk from 'algosdk';

// Optional: Set your client name
tinymanJSSDKConfig.setClientName('my-project');

// Connect to Algorand
const algodClient = new algosdk.Algodv2('', 'https://mainnet-api.algonode.cloud', 443);

async function getTinymanPrices() {
  try {
    const response = await fetch('https://mainnet.analytics.tinyman.org/api/v1/current-asset-prices/');
    const prices = await response.json();
    return prices;
  } catch (error) {
    console.error('Error fetching Tinyman prices:', error);
    throw error;
  }
}

async function getPoolData(asset1Id: number, asset2Id: number) {
  try {
    const response = await fetch(
      \`https://mainnet.analytics.tinyman.org/api/v1/pools/?asset_1=\${asset1Id}&asset_2=\${asset2Id}\`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching pool data:', error);
    throw error;
  }
}
    `,
    
    swapTokens: `
import { Tinyman } from '@tinymanorg/tinyman-js-sdk';
import algosdk from 'algosdk';

async function performSwap(
  account: algosdk.Account,
  fromAssetId: number,
  toAssetId: number,
  amount: bigint
) {
  const algodClient = new algosdk.Algodv2('', 'https://mainnet-api.algonode.cloud', 443);
  const indexerClient = new algosdk.Indexer('', 'https://mainnet-idx.algonode.cloud', 443);
  
  const tinyman = await Tinyman.forMainnet(algodClient, indexerClient);
  const assetIn = await tinyman.fetchAsset(fromAssetId);
  const assetOut = await tinyman.fetchAsset(toAssetId);
  const pool = await tinyman.fetchPool(assetIn, assetOut);
  
  // Get quote
  const quote = await pool.fetchSwapQuote(amount);
  
  // Build transaction group for the swap
  const txnGroup = await pool.prepareSwapTransactions(account.addr, quote);
  const signedTxns = txnGroup.map((txn) => txn.signTxn(account.sk));
  
  // Send transaction
  const { txId } = await algodClient.sendRawTransaction(signedTxns).do();
  const confirmation = await algosdk.waitForConfirmation(algodClient, txId, 4);
  
  return confirmation;
}
    `,
  },
  
  // Pricing & Metrics
  metrics: {
    estimatedAPY: '3-6%',
    minimumStake: '0 ALGO',
    unbondingPeriod: 'Instant (liquid)',
    fees: '0.25-0.30% swap fee',
    tvl: 'Check analytics.tinyman.org',
  },
  
  // Additional Resources
  resources: [
    {
      title: 'Tinyman V2 Documentation',
      url: 'https://docs.tinyman.org/',
    },
    {
      title: 'SDK Integration Guide',
      url: 'https://docs.tinyman.org/v2-integration/official-sdks',
    },
    {
      title: 'Analytics Dashboard',
      url: 'https://mainnet.analytics.tinyman.org/',
    },
    {
      title: 'Liquidity Provider Guide',
      url: 'https://docs.tinyman.org/liquidity-providers',
    },
  ],
};

