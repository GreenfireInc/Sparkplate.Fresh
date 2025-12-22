/**
 * Cosmos (ATOM) Distribution Engines
 * Exports for all Cosmos-based reward and escrow systems
 */

// Manual implementations
export * from './ATOM.Cosmos.rewards.manual';
export * from './ATOM.Cosmos.escrow.manual';

// Smart contract implementations
export * from './ATOM.Cosmos.rewards.smartContract';
export * from './ATOM.Cosmos.escrow.smartContract';

// Lazy loading objects
export const atomDistributionEnginesLazy = {
  rewardsManual: () => import('./ATOM.Cosmos.rewards.manual'),
  rewardsSmartContract: () => import('./ATOM.Cosmos.rewards.smartContract'),
  escrowManual: () => import('./ATOM.Cosmos.escrow.manual'),
  escrowSmartContract: () => import('./ATOM.Cosmos.escrow.smartContract'),
};

// Metadata
export const atomDistributionEnginesMetadata = {
  name: 'Cosmos (ATOM) Distribution Engines',
  version: '1.0.0',
  description: 'Reward and escrow distribution systems for Cosmos blockchain',
  totalEngines: 4,
  engines: [
    {
      name: 'Manual Rewards',
      type: 'rewards',
      implementation: 'manual',
      file: 'ATOM.Cosmos.rewards.manual.ts',
    },
    {
      name: 'Smart Contract Rewards',
      type: 'rewards',
      implementation: 'smartContract',
      file: 'ATOM.Cosmos.rewards.smartContract.ts',
    },
    {
      name: 'Manual Escrow',
      type: 'escrow',
      implementation: 'manual',
      file: 'ATOM.Cosmos.escrow.manual.ts',
    },
    {
      name: 'Smart Contract Escrow',
      type: 'escrow',
      implementation: 'smartContract',
      file: 'ATOM.Cosmos.escrow.smartContract.ts',
    },
  ],
};

export default {
  ...atomDistributionEnginesLazy,
  metadata: atomDistributionEnginesMetadata,
};
