/**
 * Stellar (XLM) Blockchain APIs
 * 
 * Collection of blockchain APIs for Stellar Lumens (XLM)
 */

// Stellar APIs
export * from './horizonAPI.XLM';
export * from './stellarExpertAPI.XLM';
export * from './nowNodesAPI.XLM';
export * from './bitqueryAPI.XLM';
export * from './tatumAPI.XLM';
export * from './getBlockAPI.XLM';
export * from './ankrAPI.XLM';

// Export singleton instances and factory functions for convenience
export { horizonAPI, createHorizonAPI } from './horizonAPI.XLM';
export { stellarExpertAPI, createStellarExpertAPI } from './stellarExpertAPI.XLM';
export { createNOWNodesStellarAPI } from './nowNodesAPI.XLM';
export { createBitqueryStellarAPI } from './bitqueryAPI.XLM';
export { createTatumStellarAPI } from './tatumAPI.XLM';
export { createGetBlockStellarAPI } from './getBlockAPI.XLM';
export { ankrStellarAPI, createAnkrStellarAPI } from './ankrAPI.XLM';
