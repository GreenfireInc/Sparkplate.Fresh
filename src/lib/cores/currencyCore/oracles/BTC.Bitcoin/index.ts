// Bitcoin (BTC) Oracles Export Module
// Provides access to all Bitcoin oracle implementations

// Import for internal use
import { diaOracle as btcDiaOracle } from './dia';
import { chainlinkOracle as btcChainlinkOracle } from './chainlink';
import { pythOracle as btcPythOracle } from './pyth';
import { bandOracle as btcBandOracle } from './band';
import { bitcoinOracle } from './bitcoinOracle';
import { proofOfExistenceOracle } from './proofOfExistence';
import { openTimestampsOracle } from './openTimestamps';
import { redstoneOracle as btcRedstoneOracle } from './redstone';

// Direct exports for external use (with BTC prefix to avoid naming conflicts)
export { btcDiaOracle, btcChainlinkOracle, btcPythOracle, btcBandOracle, bitcoinOracle, proofOfExistenceOracle, openTimestampsOracle, btcRedstoneOracle };

// Lazy-loaded exports for performance optimization
export const bitcoinOraclesLazy = {
  dia: () => import('./dia').then(m => m.diaOracle),
  chainlink: () => import('./chainlink').then(m => m.chainlinkOracle),
  pyth: () => import('./pyth').then(m => m.pythOracle),
  band: () => import('./band').then(m => m.bandOracle),
  bitcoinOracle: () => import('./bitcoinOracle').then(m => m.bitcoinOracle),
  proofOfExistence: () => import('./proofOfExistence').then(m => m.proofOfExistenceOracle),
  openTimestamps: () => import('./openTimestamps').then(m => m.openTimestampsOracle),
  redstone: () => import('./redstone').then(m => m.redstoneOracle),
};

// Aggregate object for convenient access to all oracles
export const bitcoinOracles = {
  dia: btcDiaOracle,
  chainlink: btcChainlinkOracle,
  pyth: btcPythOracle,
  band: btcBandOracle,
  bitcoinOracle: bitcoinOracle,
  proofOfExistence: proofOfExistenceOracle,
  openTimestamps: openTimestampsOracle,
  redstone: btcRedstoneOracle,
};

// Oracle categories for filtering
export const bitcoinOracleCategories = {
  priceFeeds: ['dia', 'chainlink', 'pyth', 'band', 'redstone'],
  timestamping: ['proofOfExistence', 'openTimestamps'],
  native: ['bitcoinOracle'],
  layer2: ['chainlink', 'pyth', 'band', 'bitcoinOracle'],
  crossChain: ['dia', 'chainlink', 'pyth', 'band', 'redstone'],
  decentralized: ['dia', 'chainlink', 'pyth', 'band', 'bitcoinOracle'],
  free: ['openTimestamps', 'proofOfExistence'],
};

// Helper function to get oracles by category
export function getBitcoinOraclesByCategory(category: keyof typeof bitcoinOracleCategories) {
  const oracleKeys = bitcoinOracleCategories[category];
  return oracleKeys.map(key => bitcoinOracles[key as keyof typeof bitcoinOracles]);
}

// Bitcoin Oracle Architecture Information
export const bitcoinOracleArchitecture = {
  limitations: {
    noNativeOracles: "Bitcoin lacks native oracle infrastructure due to limited scripting",
    noTuringComplete: "Bitcoin Script is not Turing-complete",
    noNativeStorage: "Cannot store external data directly on-chain",
    limitedOpcodes: "Missing critical opcodes for oracle functionality",
  },
  solutions: {
    layer2: "Smart contract layers like Stacks and Rootstock (RSK)",
    dlc: "Discreet Log Contracts for oracle-based contracts",
    opReturn: "OP_RETURN for 80-byte data storage",
    taproot: "Enhanced scripting capabilities (activated 2021)",
    timestamping: "Using blockchain for immutable timestamps",
  },
  integrationMethods: {
    offChain: "REST APIs, WebSocket feeds, GraphQL endpoints",
    layer2SmartContracts: "Stacks (Clarity), RSK (Solidity)",
    lightning: "Payment channels with oracle functionality",
    sidechains: "Liquid Network, Rootstock",
  },
};

