/**
 * Tezos (XTZ) Blockchain APIs
 * 
 * Collection of blockchain APIs for Tezos (XTZ)
 */

// Tezos APIs
export * from './tzktAPI.XTZ';
export * from './tzstatsAPI.XTZ';
export * from './nowNodesAPI.XTZ';
export * from './getBlockAPI.XTZ';
export * from './bitqueryAPI.XTZ';

// Export singleton instances and factory functions for convenience
export { tzktAPI, createTzKTAPI } from './tzktAPI.XTZ';
export { tzstatsAPI, createTzStatsAPI } from './tzstatsAPI.XTZ';
export { createNOWNodesTezosAPI } from './nowNodesAPI.XTZ';
export { createGetBlockTezosAPI } from './getBlockAPI.XTZ';
export { createBitqueryTezosAPI } from './bitqueryAPI.XTZ';
