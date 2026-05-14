/**
 * Tezos (XTZ) Distribution Engines
 * Complete export of all XTZ distribution mechanisms
 */

// Manual Rewards
export * from './XTZ.Tezos.rewards.manual';
export { default as TezosRewarder } from './XTZ.Tezos.rewards.manual';
export { default as GameRewardManager } from './XTZ.Tezos.rewards.manual';

// Smart Contract Rewards
export * from './XTZ.Tezos.rewards.smartContract';
export { default as TezosSmartContractRewarder } from './XTZ.Tezos.rewards.smartContract';

// Manual Escrow
export * from './XTZ.Tezos.escrow.manual';
export { default as TezosGameEscrow } from './XTZ.Tezos.escrow.manual';
export { default as TezosGameServer } from './XTZ.Tezos.escrow.manual';

// Smart Contract Escrow
export * from './XTZ.Tezos.escrow.smartContract';
export { default as TezosEscrowContractClient } from './XTZ.Tezos.escrow.smartContract';

/**
 * Lazy-loading exports for better performance
 * Use these for on-demand loading in production environments
 */
export const xtzDistributionEnginesLazy = {
  rewards: {
    manual: () => import('./XTZ.Tezos.rewards.manual'),
    smartContract: () => import('./XTZ.Tezos.rewards.smartContract'),
  },
  escrow: {
    manual: () => import('./XTZ.Tezos.escrow.manual'),
    smartContract: () => import('./XTZ.Tezos.escrow.smartContract'),
  },
};

/**
 * Metadata for the XTZ distribution engines
 */
export const xtzDistributionEnginesMetadata = {
  chain: 'Tezos',
  ticker: 'XTZ',
  networks: ['mainnet', 'testnet'],
  features: {
    rewards: {
      manual: {
        available: true,
        description: 'Server-managed rewards with Taquito',
        supports: ['XTZ', 'FA1.2 tokens', 'FA2 tokens'],
      },
      smartContract: {
        available: true,
        description: 'On-chain rewards via Michelson/SmartPy smart contracts',
        supports: ['XTZ', 'player registration', 'claim system'],
      },
    },
    escrow: {
      manual: {
        available: true,
        description: 'Server-managed escrow with encrypted private keys',
        supports: ['XTZ', 'multiplayer', 'keypair-based accounts'],
      },
      smartContract: {
        available: true,
        description: 'On-chain escrow via Michelson/SmartPy smart contracts',
        supports: ['XTZ', 'multiplayer', 'trustless'],
      },
    },
  },
  dependencies: ['@taquito/taquito', '@taquito/signer'],
  documentation: './README.md',
  totalEngines: 4,
};

export default {
  xtzDistributionEnginesLazy,
  xtzDistributionEnginesMetadata,
};
