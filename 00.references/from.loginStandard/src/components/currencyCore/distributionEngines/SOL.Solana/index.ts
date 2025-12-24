/**
 * Solana (SOL) Distribution Engines
 * Exports for all Solana-based reward and escrow systems
 */

// Manual implementations
export * from './SOL.Solana.rewards.manual';
export * from './SOL.Solana.escrow.manual';

// Smart contract implementations (Anchor programs)
export * from './SOL.Solana.rewards.smartContract';
export * from './SOL.Solana.escrow.smartContract';

// Lazy loading objects
export const solDistributionEnginesLazy = {
  rewardsManual: () => import('./SOL.Solana.rewards.manual'),
  rewardsSmartContract: () => import('./SOL.Solana.rewards.smartContract'),
  escrowManual: () => import('./SOL.Solana.escrow.manual'),
  escrowSmartContract: () => import('./SOL.Solana.escrow.smartContract'),
};

// Metadata
export const solDistributionEnginesMetadata = {
  name: 'Solana (SOL) Distribution Engines',
  version: '1.0.0',
  description: 'Reward and escrow distribution systems for Solana - The High-Performance Blockchain',
  totalEngines: 4,
  engines: [
    {
      name: 'Manual Rewards',
      type: 'rewards',
      implementation: 'manual',
      file: 'SOL.Solana.rewards.manual.ts',
    },
    {
      name: 'Smart Contract Rewards (Anchor)',
      type: 'rewards',
      implementation: 'smartContract',
      file: 'SOL.Solana.rewards.smartContract.ts',
    },
    {
      name: 'Manual Escrow',
      type: 'escrow',
      implementation: 'manual',
      file: 'SOL.Solana.escrow.manual.ts',
    },
    {
      name: 'Smart Contract Escrow (Anchor)',
      type: 'escrow',
      implementation: 'smartContract',
      file: 'SOL.Solana.escrow.smartContract.ts',
    },
  ],
};

export default {
  ...solDistributionEnginesLazy,
  metadata: solDistributionEnginesMetadata,
};
