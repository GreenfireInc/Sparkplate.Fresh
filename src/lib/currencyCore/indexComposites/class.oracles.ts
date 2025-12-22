/**
 * Oracle Class Index - Comprehensive list of all blockchain oracles
 * 
 * This list contains all oracle services and protocols available across
 * different blockchain networks. Oracles provide price feeds, randomness,
 * off-chain data, and blockchain indexing services.
 * 
 * This index is used for oracle selection, integration features, and
 * cross-chain oracle compatibility displays.
 * 
 * Last Updated: December 2025
 * Source: Oracle implementations across all supported blockchains
 */

export interface OracleClassItem {
  id: string;
  symbol: string;
  name: string;
}

export const CLASS_ORACLES: OracleClassItem[] = [
  { id: 'acurast', symbol: 'ACU', name: 'Acurast' },
  { id: 'api3', symbol: 'API3', name: 'API3' },
  { id: 'band-protocol', symbol: 'BAND', name: 'Band Protocol' },
  { id: 'chainlink', symbol: 'LINK', name: 'Chainlink' },
  { id: 'dia', symbol: 'DIA', name: 'DIA Oracle' },
  { id: 'pyth-network', symbol: 'PYTH', name: 'Pyth Network' },
  { id: 'redstone', symbol: 'RED', name: 'RedStone' }, // RedStone Finance tickerSymbol is RED
  { id: 'switchboard', symbol: 'SWTCH', name: 'Switchboard' }, // Switchboard Finance tickerSymbol is SWTCH
  { id: 'tellor', symbol: 'TELLOR', name: 'Tellor' },
  { id: 'the-graph', symbol: 'GRT', name: 'The Graph' },
  { id: 'umbrella-network', symbol: 'UMB', name: 'Umbrella Network' } // Umbrella Network tickerSymbol is UMB
];

export default CLASS_ORACLES;
