/**
 * Stellar Lumens (XLM) Distribution Engines
 * Complete export of all XLM distribution mechanisms
 */

// Manual Rewards
export * from './XLM.StellarLumens.rewards.manual';
export { default as StellarRewarder } from './XLM.StellarLumens.rewards.manual';
export { default as GameRewardManager } from './XLM.StellarLumens.rewards.manual';

// Smart Contract Rewards
export * from './XLM.StellarLumens.rewards.smartContract';
export { default as StellarSmartContractRewarder } from './XLM.StellarLumens.rewards.smartContract';

// Manual Escrow
export * from './XLM.StellarLumens.escrow.manual';
export { default as StellarGameEscrow } from './XLM.StellarLumens.escrow.manual';
export { default as StellarGameServer } from './XLM.StellarLumens.escrow.manual';

// Smart Contract Escrow
export * from './XLM.StellarLumens.escrow.smartContract';
export { default as StellarEscrowContractClient } from './XLM.StellarLumens.escrow.smartContract';

/**
 * Lazy-loading exports for better performance
 * Use these for on-demand loading in production environments
 */
export const xlmDistributionEnginesLazy = {
  rewards: {
    manual: () => import('./XLM.StellarLumens.rewards.manual'),
    smartContract: () => import('./XLM.StellarLumens.rewards.smartContract'),
  },
  escrow: {
    manual: () => import('./XLM.StellarLumens.escrow.manual'),
    smartContract: () => import('./XLM.StellarLumens.escrow.smartContract'),
  },
};

/**
 * Metadata for the XLM distribution engines
 */
export const xlmDistributionEnginesMetadata = {
  chain: 'Stellar',
  ticker: 'XLM',
  networks: ['public', 'testnet'],
  features: {
    rewards: {
      manual: {
        available: true,
        description: 'Server-managed rewards with Stellar SDK',
        supports: ['XLM', 'custom assets', 'federated addresses'],
      },
      smartContract: {
        available: true,
        description: 'On-chain rewards via Soroban smart contracts',
        supports: ['XLM', 'player stats', 'claim system'],
      },
    },
    escrow: {
      manual: {
        available: true,
        description: 'Server-managed escrow with encrypted keypairs',
        supports: ['XLM', 'multiplayer', 'keypair-based accounts'],
      },
      smartContract: {
        available: true,
        description: 'On-chain escrow via Soroban smart contracts',
        supports: ['XLM', 'multiplayer', 'trustless'],
      },
    },
  },
  dependencies: ['stellar-sdk'],
  documentation: './README.md',
  totalEngines: 4,
};

export default {
  xlmDistributionEnginesLazy,
  xlmDistributionEnginesMetadata,
};
