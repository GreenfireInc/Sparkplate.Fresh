/**
 * Ethereum (ETH) Distribution Engines
 * Exports for all Ethereum-based reward and escrow systems
 */

// Manual implementations
export * from './ETH.Ethereum.rewards.manual';
export * from './ETH.Ethereum.escrow.manual';

// Smart contract implementations
export * from './ETH.Ethereum.rewards.smartContract';
export * from './ETH.Ethereum.escrow.smartContract';

// Lazy loading objects
export const ethDistributionEnginesLazy = {
  rewardsManual: () => import('./ETH.Ethereum.rewards.manual'),
  rewardsSmartContract: () => import('./ETH.Ethereum.rewards.smartContract'),
  escrowManual: () => import('./ETH.Ethereum.escrow.manual'),
  escrowSmartContract: () => import('./ETH.Ethereum.escrow.smartContract'),
};

// Metadata
export const ethDistributionEnginesMetadata = {
  name: 'Ethereum (ETH) Distribution Engines',
  version: '1.0.0',
  description: 'Reward and escrow distribution systems for Ethereum - The World Computer',
  totalEngines: 4,
  engines: [
    {
      name: 'Manual Rewards',
      type: 'rewards',
      implementation: 'manual',
      file: 'ETH.Ethereum.rewards.manual.ts',
    },
    {
      name: 'Smart Contract Rewards',
      type: 'rewards',
      implementation: 'smartContract',
      file: 'ETH.Ethereum.rewards.smartContract.ts',
    },
    {
      name: 'Manual Escrow',
      type: 'escrow',
      implementation: 'manual',
      file: 'ETH.Ethereum.escrow.manual.ts',
    },
    {
      name: 'Smart Contract Escrow',
      type: 'escrow',
      implementation: 'smartContract',
      file: 'ETH.Ethereum.escrow.smartContract.ts',
    },
  ],
};

export default {
  ...ethDistributionEnginesLazy,
  metadata: ethDistributionEnginesMetadata,
};
