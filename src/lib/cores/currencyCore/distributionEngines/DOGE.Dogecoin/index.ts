/**
 * Dogecoin (DOGE) Distribution Engines
 * Exports for all Dogecoin-based reward and escrow systems
 * Much export! Very module! Wow! 🐕
 */

// Manual implementations
export * from './DOGE.Dogecoin.rewards.manual';
export * from './DOGE.Dogecoin.escrow.manual';

// Smart contract implementations
export * from './DOGE.Dogecoin.rewards.smartContract';
export * from './DOGE.Dogecoin.escrow.smartContract';

// Lazy loading objects
export const dogeDistributionEnginesLazy = {
  rewardsManual: () => import('./DOGE.Dogecoin.rewards.manual'),
  rewardsSmartContract: () => import('./DOGE.Dogecoin.rewards.smartContract'),
  escrowManual: () => import('./DOGE.Dogecoin.escrow.manual'),
  escrowSmartContract: () => import('./DOGE.Dogecoin.escrow.smartContract'),
};

// Metadata
export const dogeDistributionEnginesMetadata = {
  name: 'Dogecoin (DOGE) Distribution Engines',
  version: '1.0.0',
  description: 'Reward and escrow distribution systems for Dogecoin blockchain. Much wow! 🐕',
  totalEngines: 4,
  engines: [
    {
      name: 'Manual Rewards',
      type: 'rewards',
      implementation: 'manual',
      file: 'DOGE.Dogecoin.rewards.manual.ts',
      description: 'Much reward! Very manual! Wow!',
    },
    {
      name: 'Smart Contract Rewards',
      type: 'rewards',
      implementation: 'smartContract',
      file: 'DOGE.Dogecoin.rewards.smartContract.ts',
      description: 'Such smart contract! Very script! Wow!',
    },
    {
      name: 'Manual Escrow',
      type: 'escrow',
      implementation: 'manual',
      file: 'DOGE.Dogecoin.escrow.manual.ts',
      description: 'Much escrow! Very secure! Wow!',
    },
    {
      name: 'Smart Contract Escrow',
      type: 'escrow',
      implementation: 'smartContract',
      file: 'DOGE.Dogecoin.escrow.smartContract.ts',
      description: 'Such multisig! Very consensus! Wow!',
    },
  ],
};

export default {
  ...dogeDistributionEnginesLazy,
  metadata: dogeDistributionEnginesMetadata,
};
