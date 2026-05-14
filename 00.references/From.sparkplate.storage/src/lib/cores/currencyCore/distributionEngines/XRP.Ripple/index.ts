/**
 * Ripple (XRP) Distribution Engines
 * Complete export of all XRP distribution mechanisms
 */

// Manual Rewards
export * from './XRP.Ripple.rewards.manual';
export { default as RippleRewarder } from './XRP.Ripple.rewards.manual';
export { default as GameRewardManager } from './XRP.Ripple.rewards.manual';

// Smart Contract Rewards
export * from './XRP.Ripple.rewards.smartContract';
export { default as RippleSmartContractRewarder } from './XRP.Ripple.rewards.smartContract';

// Manual Escrow
export * from './XRP.Ripple.escrow.manual';
export { default as RippleGameEscrow } from './XRP.Ripple.escrow.manual';
export { default as RippleGameServer } from './XRP.Ripple.escrow.manual';

// Smart Contract Escrow
export * from './XRP.Ripple.escrow.smartContract';
export { default as RippleEscrowContractClient } from './XRP.Ripple.escrow.smartContract';

/**
 * Lazy-loading exports for better performance
 * Use these for on-demand loading in production environments
 */
export const xrpDistributionEnginesLazy = {
  rewards: {
    manual: () => import('./XRP.Ripple.rewards.manual'),
    smartContract: () => import('./XRP.Ripple.rewards.smartContract'),
  },
  escrow: {
    manual: () => import('./XRP.Ripple.escrow.manual'),
    smartContract: () => import('./XRP.Ripple.escrow.smartContract'),
  },
};

/**
 * Metadata for the XRP distribution engines
 */
export const xrpDistributionEnginesMetadata = {
  chain: 'XRP Ledger',
  ticker: 'XRP',
  networks: ['mainnet', 'testnet', 'devnet'],
  features: {
    rewards: {
      manual: {
        available: true,
        description: 'Server-managed rewards with xrpl.js',
        supports: ['XRP', 'issued currencies'],
      },
      smartContract: {
        available: true,
        description: 'On-chain rewards via XRP Ledger Hooks',
        supports: ['XRP', 'hooks-based smart contracts'],
      },
    },
    escrow: {
      manual: {
        available: true,
        description: 'Server-managed escrow with encrypted seeds',
        supports: ['XRP', 'multiplayer', 'wallet-based accounts'],
      },
      smartContract: {
        available: true,
        description: 'On-chain escrow via native Escrow transactions',
        supports: ['XRP', 'multiplayer', 'time-locked escrow'],
      },
    },
  },
  dependencies: ['xrpl'],
  documentation: './README.md',
  totalEngines: 4,
};

export default {
  xrpDistributionEnginesLazy,
  xrpDistributionEnginesMetadata,
};
