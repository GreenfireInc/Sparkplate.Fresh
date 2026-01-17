/**
 * Tron (TRX) Distribution Engines
 * Complete export of all TRX distribution mechanisms
 */

// Manual Rewards
export * from './TRX.Tron.rewards.manual';
export { default as TronRewarder } from './TRX.Tron.rewards.manual';
export { default as GameRewardManager } from './TRX.Tron.rewards.manual';

// Smart Contract Rewards
export * from './TRX.Tron.rewards.smartContract';
export { default as TronSmartContractRewarder } from './TRX.Tron.rewards.smartContract';

// Manual Escrow
export * from './TRX.Tron.escrow.manual';
export { default as TronGameEscrow } from './TRX.Tron.escrow.manual';
export { default as TronGameServer } from './TRX.Tron.escrow.manual';

// Smart Contract Escrow
export * from './TRX.Tron.escrow.smartContract';
export { default as TronEscrowContractClient } from './TRX.Tron.escrow.smartContract';

/**
 * Lazy-loading exports for better performance
 * Use these for on-demand loading in production environments
 */
export const trxDistributionEnginesLazy = {
  rewards: {
    manual: () => import('./TRX.Tron.rewards.manual'),
    smartContract: () => import('./TRX.Tron.rewards.smartContract'),
  },
  escrow: {
    manual: () => import('./TRX.Tron.escrow.manual'),
    smartContract: () => import('./TRX.Tron.escrow.smartContract'),
  },
};

/**
 * Metadata for the TRX distribution engines
 */
export const trxDistributionEnginesMetadata = {
  chain: 'Tron',
  ticker: 'TRX',
  networks: ['mainnet', 'shasta', 'nile'],
  features: {
    rewards: {
      manual: {
        available: true,
        description: 'Server-managed rewards with TronWeb',
        supports: ['TRX', 'TRC20'],
      },
      smartContract: {
        available: true,
        description: 'On-chain rewards via Solidity smart contracts',
        supports: ['TRX'],
      },
    },
    escrow: {
      manual: {
        available: true,
        description: 'Server-managed escrow with encrypted keys',
        supports: ['TRX', 'multiplayer'],
      },
      smartContract: {
        available: true,
        description: 'On-chain escrow via Solidity smart contracts',
        supports: ['TRX', 'multiplayer', 'trustless'],
      },
    },
  },
  dependencies: ['tronweb'],
  documentation: './README.md',
  totalEngines: 4,
};

export default {
  trxDistributionEnginesLazy,
  trxDistributionEnginesMetadata,
};
