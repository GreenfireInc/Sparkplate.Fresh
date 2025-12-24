// Algorand Foundation - Native Governance Staking
// Official Algorand governance program

export const AlgorandFoundationGovernance = {
  name: 'Algorand Foundation Governance',
  ticker: 'ALGO',
  liquidStakingToken: 'N/A (Native staking)',
  
  // Pool Information
  description: 'The Algorand Foundation Governance program allows ALGO holders to participate in the governance of the Algorand ecosystem by committing ALGO for quarterly governance periods and voting on proposals.',
  type: 'Native Governance Staking',
  location: 'On-chain (Algorand Blockchain)',
  features: [
    'Quarterly governance periods',
    'Voting on protocol decisions',
    'Governance rewards (4-8% APY)',
    'Direct participation',
    'No intermediaries',
    'Transparent voting'
  ],
  
  // Official Links
  website: 'https://algorand.foundation/governance',
  governancePortal: 'https://governance.algorand.foundation/',
  docs: 'https://algorand.foundation/governance-documentation',
  faq: 'https://algorand.foundation/governance/governance-faq',
  blog: 'https://algorand.foundation/news',
  
  // API & Blockchain Access
  api: {
    note: 'Governance uses on-chain transactions with specific note fields',
    algodEndpoint: 'https://mainnet-api.algonode.cloud',
    indexerEndpoint: 'https://mainnet-idx.algonode.cloud',
    endpoints: {
      commitTransaction: 'On-chain transaction with note: af/gov1:j[AMOUNT,GOVERNOR_ADDRESS]',
      voteTransaction: 'On-chain transaction with note: af/gov1:v[VOTE_OPTIONS]',
      accountStatus: 'Query via Indexer for governance transactions',
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
      governorAddress: 'ALGORAND_FOUNDATION_GOVERNANCE_ADDRESS', // Official governance address
      note: 'Governance uses transaction notes, not smart contracts',
    },
  },
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/Algorand',
    discord: 'https://discord.gg/algorand',
    telegram: 'https://t.me/algorand',
    reddit: 'https://www.reddit.com/r/AlgorandOfficial/',
    linkedin: 'https://www.linkedin.com/company/algorand/',
  },
  
  // Integration Examples
  integration: {
    commitToGovernance: `
import algosdk from 'algosdk';

async function commitToGovernance(
  amount: number, // Amount in ALGO
  governorAddress: string,
  privateKey: Uint8Array
) {
  const algodClient = new algosdk.Algodv2('', 'https://mainnet-api.algonode.cloud', 443);
  
  // Get suggested parameters
  const suggestedParams = await algodClient.getTransactionParams().do();
  
  // Create commitment transaction with governance note
  const note = new TextEncoder().encode(
    \`af/gov1:j[\${amount * 1e6},\${governorAddress}]\`
  );
  
  const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from: governorAddress,
    to: governorAddress, // Self-transaction
    amount: 0, // Zero ALGO transfer
    note: note,
    suggestedParams: suggestedParams,
  });
  
  // Sign and send transaction
  const signedTxn = txn.signTxn(privateKey);
  const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
  
  // Wait for confirmation
  const confirmedTxn = await algosdk.waitForConfirmation(algodClient, txId, 4);
  return confirmedTxn;
}
    `,
    
    voteOnProposal: `
import algosdk from 'algosdk';

async function voteOnProposal(
  governorAddress: string,
  privateKey: Uint8Array,
  voteOption: string // 'a', 'b', or 'abstain'
) {
  const algodClient = new algosdk.Algodv2('', 'https://mainnet-api.algonode.cloud', 443);
  
  // Get suggested parameters
  const suggestedParams = await algodClient.getTransactionParams().do();
  
  // Create vote transaction with governance note
  const note = new TextEncoder().encode(
    \`af/gov1:v[\${voteOption}]\`
  );
  
  const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from: governorAddress,
    to: governorAddress, // Self-transaction
    amount: 0, // Zero ALGO transfer
    note: note,
    suggestedParams: suggestedParams,
  });
  
  // Sign and send transaction
  const signedTxn = txn.signTxn(privateKey);
  const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
  
  // Wait for confirmation
  const confirmedTxn = await algosdk.waitForConfirmation(algodClient, txId, 4);
  return confirmedTxn;
}
    `,
    
    checkGovernanceStatus: `
import algosdk from 'algosdk';

async function checkGovernanceStatus(governorAddress: string) {
  const indexerClient = new algosdk.Indexer('', 'https://mainnet-idx.algonode.cloud', 443);
  
  // Search for governance transactions
  const txns = await indexerClient
    .searchForTransactions()
    .address(governorAddress)
    .notePrefix(new TextEncoder().encode('af/gov1:'))
    .do();
  
  return txns.transactions;
}
    `,
  },
  
  // Governance Periods & Rewards
  metrics: {
    governancePeriods: 'Quarterly (4 periods per year)',
    estimatedAPY: '4-8% (varies by period)',
    commitmentPeriod: '~3 months per period',
    votingRequirement: 'Must vote on all proposals',
    minimumStake: '1 ALGO (recommended minimum)',
    slashing: 'No rewards if voting requirements not met',
  },
  
  // Additional Resources
  resources: [
    {
      title: 'Governance Portal',
      url: 'https://governance.algorand.foundation/',
    },
    {
      title: 'Governance Documentation',
      url: 'https://algorand.foundation/governance-documentation',
    },
    {
      title: 'Governance FAQ',
      url: 'https://algorand.foundation/governance/governance-faq',
    },
    {
      title: 'How to Participate Guide',
      url: 'https://algorand.foundation/governance/how-to-participate',
    },
    {
      title: 'Governance Rewards Calculator',
      url: 'https://governance.algorand.foundation/rewards-calculator',
    },
  ],
};

