// Bitcoin Cash (BCH) Oracles Index - Export Module
// This module exports all Bitcoin Cash-based oracles for price feeds and external data

export { oracleCashOracle as bchOracleCashOracle } from './oracleCash';
export { anyhedgeOracle as bchAnyhedgeOracle } from './anyhedge';
export { bchDiaOracle } from './dia';
export { generalCashOracle as bchGeneralCashOracle } from './generalCash';
export { bchExternalApisOracle } from './externalApis';

// Lazy-load object for all BCH oracles
export const bchOraclesLazy = {
  oracleCash: () => import('./oracleCash').then(m => m.oracleCashOracle),
  anyhedge: () => import('./anyhedge').then(m => m.anyhedgeOracle),
  dia: () => import('./dia').then(m => m.bchDiaOracle),
  generalCash: () => import('./generalCash').then(m => m.generalCashOracle),
  externalApis: () => import('./externalApis').then(m => m.bchExternalApisOracle),
};

// Metadata for Bitcoin Cash Oracle ecosystem
export const bchOraclesMetadata = {
  totalOracles: 5,
  blockchain: 'Bitcoin Cash (BCH)',
  categories: {
    native: ['Oracle.cash'],
    defiFocused: ['AnyHedge Oracle'],
    multiSource: ['DIA Oracle', 'External APIs'],
    simple: ['General.cash Oracle'],
    opCheckDataSig: ['Oracle.cash'],
    offChain: ['AnyHedge Oracle', 'DIA Oracle', 'General.cash Oracle', 'External APIs'],
  },
  features: {
    nativeBCH: ['Oracle.cash'],
    cryptographicProofs: ['Oracle.cash'],
    derivatives: ['AnyHedge Oracle'],
    multiSourceAggregation: ['DIA Oracle', 'External APIs'],
    simpleAPI: ['General.cash Oracle'],
    priceFeeds: ['All'],
  },
  integration: {
    primarySDK: 'cashscript (for Oracle.cash)',
    libauthSDK: '@bitauth/libauth (for Oracle.cash)',
    httpClient: 'axios (for off-chain APIs)',
    opcode: 'OP_CHECKDATASIG (for Oracle.cash)',
    network: 'Bitcoin Cash mainnet/testnet',
  },
  uniqueFeatures: {
    utxoModel: 'BCH uses UTXO model, different from account-based chains',
    opCheckDataSig: 'OP_CHECKDATASIG opcode enables cryptographic oracle verification',
    cashScript: 'TypeScript-based smart contract language for BCH',
    opReturn: 'Data stored via OP_RETURN transactions',
    lowFees: '~$0.01 per transaction enables frequent oracle updates',
    limitedSmartContracts: 'BCH Script is intentionally limited vs. Turing-complete chains',
  },
  notes: [
    'Bitcoin Cash has limited native oracle infrastructure compared to EVM chains',
    'Oracle.cash uses OP_CHECKDATASIG for on-chain signature verification',
    'Most practical approach is hybrid: on-chain verification + off-chain data',
    'External APIs provide reliable off-chain price data',
    'Multi-source aggregation (External APIs) recommended for production',
    'CashScript enables smart contract development on BCH',
    'Low transaction fees make frequent oracle updates economical',
    'UTXO model requires different oracle patterns than account-based chains',
  ],
  recommendations: {
    priceTriggerredContracts: 'Oracle.cash (native OP_CHECKDATASIG)',
    defiDerivatives: 'AnyHedge Oracle (specialized)',
    productionPricing: 'External APIs (multi-source aggregation)',
    simplePriceFeeds: 'General.cash Oracle (easy integration)',
    transparentAggregation: 'DIA Oracle (85+ exchanges)',
    predictionMarkets: 'Oracle.cash (custom data sources)',
  },
  challenges: [
    'No Turing-complete smart contracts',
    'UTXO model vs. account-based oracle patterns',
    'Limited native data storage',
    'Restricted opcode set',
    'Emerging oracle ecosystem',
  ],
  solutions: [
    'OP_CHECKDATASIG for signature verification',
    'OP_RETURN for on-chain data storage',
    'CashScript for smart contract development',
    'Off-chain APIs for price data',
    'Hybrid on-chain verification + off-chain data',
  ],
};

