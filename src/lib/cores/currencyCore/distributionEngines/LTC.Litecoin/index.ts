/**
 * Litecoin (LTC) Distribution Engines
 * Exports for all Litecoin-based reward and escrow systems
 */

// Manual implementations
export * from './LTC.Litecoin.rewards.manual';
export * from './LTC.Litecoin.escrow.manual';

// Smart contract implementations (P2SH multi-signature)
export * from './LTC.Litecoin.rewards.smartContract';
export * from './LTC.Litecoin.escrow.smartContract';

// Lazy loading objects
export const ltcDistributionEnginesLazy = {
  rewardsManual: () => import('./LTC.Litecoin.rewards.manual'),
  rewardsSmartContract: () => import('./LTC.Litecoin.rewards.smartContract'),
  escrowManual: () => import('./LTC.Litecoin.escrow.manual'),
  escrowSmartContract: () => import('./LTC.Litecoin.escrow.smartContract'),
};

// Metadata
export const ltcDistributionEnginesMetadata = {
  name: 'Litecoin (LTC) Distribution Engines',
  version: '1.0.0',
  description: 'Reward and escrow distribution systems for Litecoin - The Silver to Bitcoin\'s Gold',
  totalEngines: 4,
  engines: [
    {
      name: 'Manual Rewards',
      type: 'rewards',
      implementation: 'manual',
      file: 'LTC.Litecoin.rewards.manual.ts',
    },
    {
      name: 'Smart Contract Rewards (P2SH)',
      type: 'rewards',
      implementation: 'smartContract',
      file: 'LTC.Litecoin.rewards.smartContract.ts',
    },
    {
      name: 'Manual Escrow',
      type: 'escrow',
      implementation: 'manual',
      file: 'LTC.Litecoin.escrow.manual.ts',
    },
    {
      name: 'Smart Contract Escrow (P2SH)',
      type: 'escrow',
      implementation: 'smartContract',
      file: 'LTC.Litecoin.escrow.smartContract.ts',
    },
  ],
};

export default {
  ...ltcDistributionEnginesLazy,
  metadata: ltcDistributionEnginesMetadata,
};
