/**
 * Waves (WAVES) Blockchain APIs
 * 
 * Collection of blockchain APIs for Waves (WAVES)
 */

// Waves APIs
export * from './wavesNodeAPI.WAVES';
export * from './wscanAPI.WAVES';
export * from './getBlockAPI.WAVES';

// Export singleton instances and factory functions for convenience
export { wavesNodeAPI, createWavesNodeAPI } from './wavesNodeAPI.WAVES';
export { wscanAPI, createWScanAPI } from './wscanAPI.WAVES';
export { createGetBlockWavesAPI } from './getBlockAPI.WAVES';
