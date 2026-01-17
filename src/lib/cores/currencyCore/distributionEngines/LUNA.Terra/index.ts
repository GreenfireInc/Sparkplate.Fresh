/**
 * Terra (LUNA) Distribution Engines
 * Exports for all Terra-based reward and escrow systems
 */

// Manual implementations
export * from './LUNA.Terra.rewards.manual';
export * from './LUNA.Terra.escrow.manual';

// Smart contract implementations (CosmWasm)
export * from './LUNA.Terra.rewards.smartContract';
export * from './LUNA.Terra.escrow.smartContract';

// Lazy loading objects
export const lunaDistributionEnginesLazy = {
  rewardsManual: () => import('./LUNA.Terra.rewards.manual'),
  rewardsSmartContract: () => import('./LUNA.Terra.rewards.smartContract'),
  escrowManual: () => import('./LUNA.Terra.escrow.manual'),
  escrowSmartContract: () => import('./LUNA.Terra.escrow.smartContract'),
};

// Metadata
export const lunaDistributionEnginesMetadata = {
  name: 'Terra (LUNA) Distribution Engines',
  version: '1.0.0',
  description: 'Reward and escrow distribution systems for Terra - The Decentralized Economy Platform',
  totalEngines: 4,
  engines: [
    {
      name: 'Manual Rewards',
      type: 'rewards',
      implementation: 'manual',
      file: 'LUNA.Terra.rewards.manual.ts',
    },
    {
      name: 'Smart Contract Rewards (CosmWasm)',
      type: 'rewards',
      implementation: 'smartContract',
      file: 'LUNA.Terra.rewards.smartContract.ts',
    },
    {
      name: 'Manual Escrow',
      type: 'escrow',
      implementation: 'manual',
      file: 'LUNA.Terra.escrow.manual.ts',
    },
    {
      name: 'Smart Contract Escrow (CosmWasm)',
      type: 'escrow',
      implementation: 'smartContract',
      file: 'LUNA.Terra.escrow.smartContract.ts',
    },
  ],
};

export default {
  ...lunaDistributionEnginesLazy,
  metadata: lunaDistributionEnginesMetadata,
};
