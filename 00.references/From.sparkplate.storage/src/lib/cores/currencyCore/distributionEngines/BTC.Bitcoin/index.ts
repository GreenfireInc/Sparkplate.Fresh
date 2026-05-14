/**
 * Bitcoin (BTC) Distribution Engines
 * Exports for all Bitcoin-based reward and escrow systems
 */

// Manual implementations
export * from './BTC.Bitcoin.rewards.manual';
export * from './BTC.Bitcoin.escrow.manual';

// Smart contract implementations
export * from './BTC.Bitcoin.rewards.smartContract';
export * from './BTC.Bitcoin.escrow.smartContract';

// Lazy loading objects
export const btcDistributionEnginesLazy = {
  rewardsManual: () => import('./BTC.Bitcoin.rewards.manual'),
  rewardsSmartContract: () => import('./BTC.Bitcoin.rewards.smartContract'),
  escrowManual: () => import('./BTC.Bitcoin.escrow.manual'),
  escrowSmartContract: () => import('./BTC.Bitcoin.escrow.smartContract'),
};

// Metadata
export const btcDistributionEnginesMetadata = {
  name: 'Bitcoin (BTC) Distribution Engines',
  version: '1.0.0',
  description: 'Reward and escrow distribution systems for Bitcoin blockchain',
  totalEngines: 4,
  engines: [
    {
      name: 'Manual Rewards',
      type: 'rewards',
      implementation: 'manual',
      file: 'BTC.Bitcoin.rewards.manual.ts',
    },
    {
      name: 'Smart Contract Rewards',
      type: 'rewards',
      implementation: 'smartContract',
      file: 'BTC.Bitcoin.rewards.smartContract.ts',
    },
    {
      name: 'Manual Escrow',
      type: 'escrow',
      implementation: 'manual',
      file: 'BTC.Bitcoin.escrow.manual.ts',
    },
    {
      name: 'Smart Contract Escrow',
      type: 'escrow',
      implementation: 'smartContract',
      file: 'BTC.Bitcoin.escrow.smartContract.ts',
    },
  ],
};

export default {
  ...btcDistributionEnginesLazy,
  metadata: btcDistributionEnginesMetadata,
};
