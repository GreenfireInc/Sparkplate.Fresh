/**
 * Bitcoin Cash (BCH) Distribution Engines
 * Exports for all Bitcoin Cash-based reward and escrow systems
 */

// Manual implementations
export * from './BCH.BitcoinCash.rewards.manual';
export * from './BCH.BitcoinCash.escrow.manual';

// Smart contract implementations
export * from './BCH.BitcoinCash.rewards.smartContract';
export * from './BCH.BitcoinCash.escrow.smartContract';

// Lazy loading objects
export const bchDistributionEnginesLazy = {
  rewardsManual: () => import('./BCH.BitcoinCash.rewards.manual'),
  rewardsSmartContract: () => import('./BCH.BitcoinCash.rewards.smartContract'),
  escrowManual: () => import('./BCH.BitcoinCash.escrow.manual'),
  escrowSmartContract: () => import('./BCH.BitcoinCash.escrow.smartContract'),
};

// Metadata
export const bchDistributionEnginesMetadata = {
  name: 'Bitcoin Cash (BCH) Distribution Engines',
  version: '1.0.0',
  description: 'Reward and escrow distribution systems for Bitcoin Cash blockchain',
  totalEngines: 4,
  engines: [
    {
      name: 'Manual Rewards',
      type: 'rewards',
      implementation: 'manual',
      file: 'BCH.BitcoinCash.rewards.manual.ts',
    },
    {
      name: 'Smart Contract Rewards',
      type: 'rewards',
      implementation: 'smartContract',
      file: 'BCH.BitcoinCash.rewards.smartContract.ts',
    },
    {
      name: 'Manual Escrow',
      type: 'escrow',
      implementation: 'manual',
      file: 'BCH.BitcoinCash.escrow.manual.ts',
    },
    {
      name: 'Smart Contract Escrow',
      type: 'escrow',
      implementation: 'smartContract',
      file: 'BCH.BitcoinCash.escrow.smartContract.ts',
    },
  ],
};

export default {
  ...bchDistributionEnginesLazy,
  metadata: bchDistributionEnginesMetadata,
};
