/**
 * Ethereum Classic (ETC) Distribution Engines
 * Exports for all Ethereum Classic-based reward and escrow systems
 */

// Manual implementations
export * from './ETC.EthereumClassic.rewards.manual';
export * from './ETC.EthereumClassic.escrow.manual';

// Smart contract implementations
export * from './ETC.EthereumClassic.rewards.smartContract';
export * from './ETC.EthereumClassic.escrow.smartContract';

// Lazy loading objects
export const etcDistributionEnginesLazy = {
  rewardsManual: () => import('./ETC.EthereumClassic.rewards.manual'),
  rewardsSmartContract: () => import('./ETC.EthereumClassic.rewards.smartContract'),
  escrowManual: () => import('./ETC.EthereumClassic.escrow.manual'),
  escrowSmartContract: () => import('./ETC.EthereumClassic.escrow.smartContract'),
};

// Metadata
export const etcDistributionEnginesMetadata = {
  name: 'Ethereum Classic (ETC) Distribution Engines',
  version: '1.0.0',
  description: 'Reward and escrow distribution systems for Ethereum Classic - "Code is Law"',
  totalEngines: 4,
  engines: [
    {
      name: 'Manual Rewards',
      type: 'rewards',
      implementation: 'manual',
      file: 'ETC.EthereumClassic.rewards.manual.ts',
    },
    {
      name: 'Smart Contract Rewards',
      type: 'rewards',
      implementation: 'smartContract',
      file: 'ETC.EthereumClassic.rewards.smartContract.ts',
    },
    {
      name: 'Manual Escrow',
      type: 'escrow',
      implementation: 'manual',
      file: 'ETC.EthereumClassic.escrow.manual.ts',
    },
    {
      name: 'Smart Contract Escrow',
      type: 'escrow',
      implementation: 'smartContract',
      file: 'ETC.EthereumClassic.escrow.smartContract.ts',
    },
  ],
};

export default {
  ...etcDistributionEnginesLazy,
  metadata: etcDistributionEnginesMetadata,
};
