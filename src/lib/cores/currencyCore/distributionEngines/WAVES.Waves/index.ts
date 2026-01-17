/**
 * Waves (WAVES) Distribution Engines
 * Complete export of all WAVES distribution mechanisms
 */

// Manual Rewards
export * from './WAVES.Waves.rewards.manual';
export { default as WavesRewarder } from './WAVES.Waves.rewards.manual';
export { default as GameRewardManager } from './WAVES.Waves.rewards.manual';

// Smart Contract Rewards
export * from './WAVES.Waves.rewards.smartContract';
export { default as WavesSmartContractRewarder } from './WAVES.Waves.rewards.smartContract';

// Manual Escrow
export * from './WAVES.Waves.escrow.manual';
export { default as WavesGameEscrow } from './WAVES.Waves.escrow.manual';
export { default as WavesGameServer } from './WAVES.Waves.escrow.manual';

// Smart Contract Escrow
export * from './WAVES.Waves.escrow.smartContract';
export { default as WavesEscrowContractClient } from './WAVES.Waves.escrow.smartContract';

/**
 * Lazy-loading exports for better performance
 * Use these for on-demand loading in production environments
 */
export const wavesDistributionEnginesLazy = {
  rewards: {
    manual: () => import('./WAVES.Waves.rewards.manual'),
    smartContract: () => import('./WAVES.Waves.rewards.smartContract'),
  },
  escrow: {
    manual: () => import('./WAVES.Waves.escrow.manual'),
    smartContract: () => import('./WAVES.Waves.escrow.smartContract'),
  },
};

/**
 * Metadata for the WAVES distribution engines
 */
export const wavesDistributionEnginesMetadata = {
  chain: 'Waves',
  ticker: 'WAVES',
  networks: ['mainnet', 'testnet', 'stagenet'],
  features: {
    rewards: {
      manual: {
        available: true,
        description: 'Server-managed rewards with Waves SDK',
        supports: ['WAVES', 'custom assets', 'alias resolution'],
      },
      smartContract: {
        available: true,
        description: 'On-chain rewards via Ride smart contracts',
        supports: ['WAVES', 'player stats', 'claim intervals'],
      },
    },
    escrow: {
      manual: {
        available: true,
        description: 'Server-managed escrow with encrypted seeds',
        supports: ['WAVES', 'multiplayer', 'seed-based accounts'],
      },
      smartContract: {
        available: true,
        description: 'On-chain escrow via Ride smart contracts',
        supports: ['WAVES', 'multiplayer', 'trustless'],
      },
    },
  },
  dependencies: ['@waves/waves-transactions', '@waves/waves-crypto', 'axios'],
  documentation: './README.md',
  totalEngines: 4,
};

export default {
  wavesDistributionEnginesLazy,
  wavesDistributionEnginesMetadata,
};
