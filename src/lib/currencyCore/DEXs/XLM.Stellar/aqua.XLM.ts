// Aqua - AMM and Liquidity Rewards on Stellar
// Type: AMM + Liquidity Rewards
// Blockchain: Stellar (XLM)

export const aquaDEX = {
  name: "Aqua",
  blockchain: "Stellar (XLM)",
  type: "AMM + Liquidity Rewards",
  description: "Liquidity rewards and governance protocol for Stellar DEX with AQUA token distribution and AMM features",
  
  url: "https://aqua.network/",
  app: "https://aqua.network/rewards",
  docs: "https://aqua.network/about",
  
  api: {
    horizonEndpoint: "https://horizon.stellar.org",
    rpcEndpoint: "https://rpc.stellar.org",
    aquaEndpoint: "https://api.aqua.network/",
    documentation: "https://aqua.network/developers",
    rateLimit: "Public endpoints available",
    authentication: "None required for public data",
  },
  
  sdk: {
    npm: "@stellar/stellar-sdk",
    installation: "npm install @stellar/stellar-sdk",
    documentation: "https://stellar.github.io/js-stellar-sdk/",
    features: [
      "Liquidity rewards",
      "AQUA token staking",
      "Governance voting",
      "AMM swaps",
      "Yield farming",
    ],
  },
  
  integration: {
    example: `
// Aqua Integration Example
import * as StellarSDK from '@stellar/stellar-sdk';

const server = new StellarSDK.Horizon.Server('https://horizon.stellar.org');
const AQUA_API = 'https://api.aqua.network/';
const AQUA_ASSET = new StellarSDK.Asset(
  'AQUA',
  'GBNZILSTVQZ4R7IKQDGHYGY2QXL5QOFJYQMXPKWRRM5PAV7Y4M67AQUA'
);

// Get AQUA rewards for account
async function getAquaRewards(accountId: string) {
  const response = await fetch(\`\${AQUA_API}rewards/\${accountId}\`);
  const rewards = await response.json();
  
  console.log('AQUA rewards:', rewards);
  return rewards;
}

// Get liquidity pools eligible for rewards
async function getRewardPools() {
  const response = await fetch(\`\${AQUA_API}pools/rewards\`);
  const pools = await response.json();
  
  console.log('Reward pools:', pools);
  return pools;
}

// Claim AQUA rewards
async function claimRewards(keypair: StellarSDK.Keypair) {
  // First, add trustline for AQUA if not already added
  const account = await server.loadAccount(keypair.publicKey());
  
  // Check if trustline exists
  const hasAquaTrust = account.balances.some(
    b => b.asset_code === 'AQUA' && 
         b.asset_issuer === AQUA_ASSET.getIssuer()
  );
  
  if (!hasAquaTrust) {
    const trustTx = new StellarSDK.TransactionBuilder(account, {
      fee: StellarSDK.BASE_FEE,
      networkPassphrase: StellarSDK.Networks.PUBLIC
    })
      .addOperation(
        StellarSDK.Operation.changeTrust({
          asset: AQUA_ASSET
        })
      )
      .setTimeout(StellarSDK.TimeoutInfinite)
      .build();
    
    trustTx.sign(keypair);
    await server.submitTransaction(trustTx);
    console.log('AQUA trustline added');
  }
  
  // Claim rewards through Aqua protocol
  const response = await fetch(\`\${AQUA_API}rewards/claim\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      account: keypair.publicKey()
    })
  });
  
  const claimData = await response.json();
  console.log('Rewards claimed:', claimData);
  return claimData;
}

// Vote on governance proposal
async function voteOnProposal(
  keypair: StellarSDK.Keypair,
  proposalId: string,
  vote: 'yes' | 'no' | 'abstain'
) {
  const account = await server.loadAccount(keypair.publicKey());
  
  // Create vote transaction with memo
  const voteMemo = StellarSDK.Memo.text(\`VOTE:\${proposalId}:\${vote}\`);
  
  const transaction = new StellarSDK.TransactionBuilder(account, {
    fee: StellarSDK.BASE_FEE,
    networkPassphrase: StellarSDK.Networks.PUBLIC,
    memo: voteMemo
  })
    .addOperation(
      StellarSDK.Operation.payment({
        destination: 'AQUA_GOVERNANCE_ADDRESS',
        asset: AQUA_ASSET,
        amount: '0.0000001' // Minimal amount for vote
      })
    )
    .setTimeout(StellarSDK.TimeoutInfinite)
    .build();
  
  transaction.sign(keypair);
  
  const result = await server.submitTransaction(transaction);
  console.log('Vote submitted:', result.hash);
  return result;
}

// Get AQUA token price
async function getAquaPrice() {
  const orderBook = await server
    .orderbook(AQUA_ASSET, StellarSDK.Asset.native())
    .limit(1)
    .call();
  
  const bids = orderBook.bids || [];
  const asks = orderBook.asks || [];
  
  const bid = bids.length > 0 ? Number(bids[0].price) : 0;
  const ask = asks.length > 0 ? Number(asks[0].price) : 0;
  const mid = bid && ask ? (bid + ask) / 2 : bid || ask || 0;
  
  console.log(\`AQUA price: \${mid} XLM\`);
  return mid;
}

// Provide liquidity to earn AQUA
async function provideLiquidity(
  keypair: StellarSDK.Keypair,
  poolId: string,
  amountA: string,
  amountB: string
) {
  const account = await server.loadAccount(keypair.publicKey());
  
  const transaction = new StellarSDK.TransactionBuilder(account, {
    fee: StellarSDK.BASE_FEE,
    networkPassphrase: StellarSDK.Networks.PUBLIC
  })
    .addOperation(
      StellarSDK.Operation.liquidityPoolDeposit({
        liquidityPoolId: poolId,
        maxAmountA: amountA,
        maxAmountB: amountB,
        minPrice: '0.001',
        maxPrice: '1000'
      })
    )
    .setTimeout(StellarSDK.TimeoutInfinite)
    .build();
  
  transaction.sign(keypair);
  
  const result = await server.submitTransaction(transaction);
  console.log('Liquidity provided:', result.hash);
  return result;
}

// Get governance proposals
async function getGovernanceProposals() {
  const response = await fetch(\`\${AQUA_API}governance/proposals\`);
  const proposals = await response.json();
  
  console.log('Active proposals:', proposals);
  return proposals;
}

// Usage
getRewardPools().then(pools => {
  console.log(\`\${pools.length} pools offering AQUA rewards\`);
});
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/aqua_token",
    telegram: "https://t.me/aquarius_HOME",
    discord: "https://discord.gg/aqua",
    medium: "https://medium.com/aqua-token",
  },
  
  features: {
    liquidity_rewards: true,
    governance: true,
    amm: true,
    yield_farming: true,
    staking: true,
    voting: true,
    orderbook: true,
    analytics: true,
  },
  
  fees: {
    trading: "Network fee: 0.00001 XLM per operation",
    liquidityProvision: "Network fee: 0.00001 XLM",
    claimRewards: "Network fee: 0.00001 XLM",
    voting: "Network fee: 0.00001 XLM",
  },
  
  notes: [
    "First liquidity rewards protocol on Stellar",
    "AQUA token distributed to liquidity providers",
    "Governance for Stellar ecosystem decisions",
    "AMM with liquidity pools",
    "Vote on market listings and rewards distribution",
    "Community-driven protocol",
    "Integrated with major Stellar DEXs",
    "No minimum stake required for rewards",
  ],
};

