// Algorand (ALGO) Distribution Engines Index - Export Module
// This module exports all Algorand-based distribution mechanisms

// Manual Rewards Distribution
export { 
  AlgorandRewarder,
  type RewardConfig,
  type RewardSpec,
  type NameResolver
} from './ALGO.Algorand.rewards.manual';

// Smart Contract Rewards Distribution
export {
  AlgorandSmartContractRewarder,
  type SmartContractRewardConfig,
  PYTEAL_CONTRACT_SOURCE as REWARDS_PYTEAL_CONTRACT
} from './ALGO.Algorand.rewards.smartContract';

// Manual Escrow Distribution
export {
  AlgorandEscrowManager,
  type EscrowConfig,
  type Match,
  type Player,
  type EncryptedKey
} from './ALGO.Algorand.escrow.manual';

// Smart Contract Escrow Distribution
export {
  AlgorandEscrowContract,
  type EscrowContractConfig,
  PYTEAL_ESCROW_CONTRACT
} from './ALGO.Algorand.escrow.smartContract';

// Lazy-load object for all Algorand distribution engines
export const algoDistributionEnginesLazy = {
  rewardsManual: () => import('./ALGO.Algorand.rewards.manual').then(m => m.AlgorandRewarder),
  rewardsSmartContract: () => import('./ALGO.Algorand.rewards.smartContract').then(m => m.AlgorandSmartContractRewarder),
  escrowManual: () => import('./ALGO.Algorand.escrow.manual').then(m => m.AlgorandEscrowManager),
  escrowSmartContract: () => import('./ALGO.Algorand.escrow.smartContract').then(m => m.AlgorandEscrowContract),
};

// Metadata for Algorand Distribution Engines ecosystem
export const algoDistributionEnginesMetadata = {
  totalEngines: 4,
  blockchain: 'Algorand (ALGO)',
  categories: {
    rewards: ['Manual Rewards', 'Smart Contract Rewards'],
    escrow: ['Manual Escrow', 'Smart Contract Escrow'],
    trustModel: {
      manual: ['Server-managed', 'Centralized trust'],
      smartContract: ['On-chain', 'Trustless', 'Cryptographically secure']
    }
  },
  features: {
    manualRewards: {
      name: 'Manual Rewards Distribution',
      description: 'Server-side reward distribution for achievements',
      trustModel: 'Centralized (server holds keys)',
      useCases: ['Gaming rewards', 'Achievement systems', 'Loyalty programs'],
      pros: ['Simple integration', 'Flexible logic', 'No blockchain fees per claim'],
      cons: ['Requires trust in server', 'Single point of failure']
    },
    smartContractRewards: {
      name: 'Smart Contract Rewards Distribution',
      description: 'Trustless reward claims with server attestations',
      trustModel: 'Hybrid (server attests, blockchain enforces)',
      useCases: ['Verifiable gaming', 'Auditable rewards', 'Transparent systems'],
      pros: ['Trustless', 'Transparent', 'Auditable', 'No custody risk'],
      cons: ['Higher complexity', 'Blockchain fees', 'Requires PyTEAL deployment']
    },
    manualEscrow: {
      name: 'Manual Escrow Distribution',
      description: 'Server-managed escrow for two-party interactions',
      trustModel: 'Centralized (server holds escrow keys)',
      useCases: ['PvP gaming', 'Peer-to-peer trading', 'Wagering'],
      pros: ['Simple setup', 'Fast deployment', 'Flexible payout logic'],
      cons: ['Trust in server required', 'Encrypted keys need secure storage']
    },
    smartContractEscrow: {
      name: 'Smart Contract Escrow Distribution',
      description: 'On-chain escrow with automatic payout',
      trustModel: 'Hybrid (operator triggers, contract enforces)',
      useCases: ['Trustless gaming', 'Decentralized wagering', 'Fair competitions'],
      pros: ['Funds secured on-chain', 'Transparent rules', 'Cannot be stolen'],
      cons: ['Operator still needed for outcomes', 'Higher complexity', 'Deployment costs']
    }
  },
  integration: {
    primarySDK: 'algosdk',
    mainnetEndpoint: 'https://mainnet-api.algonode.cloud',
    testnetEndpoint: 'https://testnet-api.algonode.cloud',
    indexerMainnet: 'https://mainnet-idx.algonode.cloud',
    indexerTestnet: 'https://testnet-idx.algonode.cloud',
  },
  notes: [
    'Manual engines are faster to integrate but require server trust',
    'Smart contract engines provide transparency and security',
    'All engines support both ALGO and Algorand Standard Assets (ASA)',
    'Escrow mechanisms support multi-player scenarios',
    'Rewards mechanisms support achievement-based distribution',
    'PyTEAL contracts require compilation and deployment',
    'Server-signed attestations prevent cheating in hybrid models',
    'Inner transactions enable contracts to hold and distribute funds',
    'Test on TestNet before mainnet deployment',
    'Consider gas fees when choosing between manual and smart contract approaches'
  ],
  securityConsiderations: {
    manualEngines: [
      'Store private keys/mnemonics securely (environment variables, KMS)',
      'Encrypt escrow keys at rest using strong encryption',
      'Implement rate limiting to prevent abuse',
      'Use secure authentication for payout endpoints',
      'Monitor for suspicious activity'
    ],
    smartContractEngines: [
      'Audit PyTEAL contracts before deployment',
      'Test thoroughly on TestNet',
      'Ensure operator keys are secured',
      'Implement nonce mechanisms to prevent replay attacks',
      'Fund contract accounts appropriately',
      'Consider minimum balance requirements',
      'Validate all user inputs on-chain',
      'Use atomic transactions for deposits'
    ]
  }
};

