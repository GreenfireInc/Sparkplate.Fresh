/**
 * Terra Classic (LUNC) Distribution Engines
 * Exports for all Terra Classic-based reward and escrow systems
 */

// Manual implementations
export * from './LUNC.TerraClassic.rewards.manual';
export * from './LUNC.TerraClassic.escrow.manual';

// Smart contract implementations (CosmWasm 0.16)
export * from './LUNC.TerraClassic.rewards.smartContract';
export * from './LUNC.TerraClassic.escrow.smartContract';

// Lazy loading objects
export const luncDistributionEnginesLazy = {
  rewardsManual: () => import('./LUNC.TerraClassic.rewards.manual'),
  rewardsSmartContract: () => import('./LUNC.TerraClassic.rewards.smartContract'),
  escrowManual: () => import('./LUNC.TerraClassic.escrow.manual'),
  escrowSmartContract: () => import('./LUNC.TerraClassic.escrow.smartContract'),
};

// Metadata
export const luncDistributionEnginesMetadata = {
  name: 'Terra Classic (LUNC) Distribution Engines',
  version: '1.0.0',
  description: 'Reward and escrow distribution systems for Terra Classic - The Original Terra Blockchain',
  totalEngines: 4,
  engines: [
    {
      name: 'Manual Rewards',
      type: 'rewards',
      implementation: 'manual',
      file: 'LUNC.TerraClassic.rewards.manual.ts',
    },
    {
      name: 'Smart Contract Rewards (CosmWasm 0.16)',
      type: 'rewards',
      implementation: 'smartContract',
      file: 'LUNC.TerraClassic.rewards.smartContract.ts',
    },
    {
      name: 'Manual Escrow',
      type: 'escrow',
      implementation: 'manual',
      file: 'LUNC.TerraClassic.escrow.manual.ts',
    },
    {
      name: 'Smart Contract Escrow (CosmWasm 0.16)',
      type: 'escrow',
      implementation: 'smartContract',
      file: 'LUNC.TerraClassic.escrow.smartContract.ts',
    },
  ],
};

export default {
  ...luncDistributionEnginesLazy,
  metadata: luncDistributionEnginesMetadata,
};
