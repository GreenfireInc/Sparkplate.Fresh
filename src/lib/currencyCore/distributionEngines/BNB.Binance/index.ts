/**
 * Binance (BNB) Distribution Engines
 * Exports for all BNB Smart Chain-based reward and escrow systems
 */

// Manual implementations
export * from './BNB.Binance.rewards.manual';
export * from './BNB.Binance.escrow.manual';

// Smart contract implementations
export * from './BNB.Binance.rewards.smartContract';
export * from './BNB.Binance.escrow.smartContract';

// Lazy loading objects
export const bnbDistributionEnginesLazy = {
  rewardsManual: () => import('./BNB.Binance.rewards.manual'),
  rewardsSmartContract: () => import('./BNB.Binance.rewards.smartContract'),
  escrowManual: () => import('./BNB.Binance.escrow.manual'),
  escrowSmartContract: () => import('./BNB.Binance.escrow.smartContract'),
};

// Metadata
export const bnbDistributionEnginesMetadata = {
  name: 'Binance (BNB) Distribution Engines',
  version: '1.0.0',
  description: 'Reward and escrow distribution systems for BNB Smart Chain (BSC)',
  totalEngines: 4,
  engines: [
    {
      name: 'Manual Rewards',
      type: 'rewards',
      implementation: 'manual',
      file: 'BNB.Binance.rewards.manual.ts',
    },
    {
      name: 'Smart Contract Rewards',
      type: 'rewards',
      implementation: 'smartContract',
      file: 'BNB.Binance.rewards.smartContract.ts',
    },
    {
      name: 'Manual Escrow',
      type: 'escrow',
      implementation: 'manual',
      file: 'BNB.Binance.escrow.manual.ts',
    },
    {
      name: 'Smart Contract Escrow',
      type: 'escrow',
      implementation: 'smartContract',
      file: 'BNB.Binance.escrow.smartContract.ts',
    },
  ],
};

export default {
  ...bnbDistributionEnginesLazy,
  metadata: bnbDistributionEnginesMetadata,
};
