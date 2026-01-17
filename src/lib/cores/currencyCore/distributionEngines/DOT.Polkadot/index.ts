/**
 * Polkadot (DOT) Distribution Engines
 * Exports for all Polkadot/Substrate-based reward and escrow systems
 */

// Manual implementations
export * from './DOT.Polkadot.rewards.manual';
export * from './DOT.Polkadot.escrow.manual';

// Smart contract implementations
export * from './DOT.Polkadot.rewards.smartContract';
export * from './DOT.Polkadot.escrow.smartContract';

// Lazy loading objects
export const dotDistributionEnginesLazy = {
  rewardsManual: () => import('./DOT.Polkadot.rewards.manual'),
  rewardsSmartContract: () => import('./DOT.Polkadot.rewards.smartContract'),
  escrowManual: () => import('./DOT.Polkadot.escrow.manual'),
  escrowSmartContract: () => import('./DOT.Polkadot.escrow.smartContract'),
};

// Metadata
export const dotDistributionEnginesMetadata = {
  name: 'Polkadot (DOT) Distribution Engines',
  version: '1.0.0',
  description: 'Reward and escrow distribution systems for Polkadot/Substrate blockchain',
  totalEngines: 4,
  engines: [
    {
      name: 'Manual Rewards',
      type: 'rewards',
      implementation: 'manual',
      file: 'DOT.Polkadot.rewards.manual.ts',
    },
    {
      name: 'Smart Contract Rewards',
      type: 'rewards',
      implementation: 'smartContract',
      file: 'DOT.Polkadot.rewards.smartContract.ts',
    },
    {
      name: 'Manual Escrow',
      type: 'escrow',
      implementation: 'manual',
      file: 'DOT.Polkadot.escrow.manual.ts',
    },
    {
      name: 'Smart Contract Escrow',
      type: 'escrow',
      implementation: 'smartContract',
      file: 'DOT.Polkadot.escrow.smartContract.ts',
    },
  ],
};

export default {
  ...dotDistributionEnginesLazy,
  metadata: dotDistributionEnginesMetadata,
};
