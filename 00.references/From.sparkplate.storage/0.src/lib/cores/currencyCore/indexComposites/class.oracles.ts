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

export type OracleType = 'token' | 'coin';
export type ConsensusType = 'proof-of-stake' | 'proof-of-work' | 'proof-of-authority' | 'delegated-proof-of-stake' | 'token' | 'n/a';
export type OracleClass = 'price-feed' | 'data-oracle' | 'vrf-randomness' | 'cross-chain' | 'decentralized-indexing' | 'first-party' | 'multi-chain';

export interface OracleClassItem {
  id: string;
  symbol: string;
  name: string;
  description: string;
  ucid: number;
  type: OracleType;
  consensusType: ConsensusType;
  class: OracleClass[];
  network: string | string[] | null;
  contractAddresses: string[];
  website: string | null;
  github: string | null;
  npm: string | null;
}

export const CLASS_ORACLES: OracleClassItem[] = [
  {
    id: 'acurast',
    symbol: 'ACU',
    name: 'Acurast',
    description: 'Decentralized serverless cloud computing platform that provides confidential computing and oracle services for blockchain applications',
    ucid: 36492,
    type: 'token',
    consensusType: 'proof-of-stake',
    class: ['data-oracle', 'multi-chain'],
    network: ['Substrate', 'Polkadot', 'Ethereum', 'Kusama'],
    contractAddresses: [
      'eth://0x216b3643ff8b7bb30d8a48e9f1bd550126202add',
      'bnb://0x6EF2FFB38D64aFE18ce782DA280b300e358CFeAF'
    ],
    website: 'https://acurast.com/',
    github: 'https://github.com/Acurast',
    npm: null
  },
  {
    id: 'api3',
    symbol: 'API3',
    name: 'API3',
    description: 'First-party oracle solution that enables API providers to operate their own oracles, delivering data directly from the source without intermediaries',
    ucid: 7737,
    type: 'token',
    consensusType: 'token',
    class: ['first-party', 'data-oracle', 'multi-chain'],
    network: ['Ethereum', 'BNB Chain', 'Polygon', 'Avalanche', 'Optimism', 'Arbitrum'],
    contractAddresses: [
      'eth://0x0b38210ea11411557c13457D4dA7dC6ea731B88a'
    ],
    website: 'https://api3.org/',
    github: 'https://github.com/api3dao',
    npm: '@api3/airnode-node'
  },
  {
    id: 'band-protocol',
    symbol: 'BAND',
    name: 'Band Protocol',
    description: 'Cross-chain data oracle platform that aggregates and connects real-world data and APIs to smart contracts across multiple blockchains',
    ucid: 4679,
    type: 'coin',
    consensusType: 'delegated-proof-of-stake',
    class: ['price-feed', 'data-oracle', 'cross-chain'],
    network: ['Cosmos', 'BNB Chain', 'Ethereum', 'Avalanche', 'Fantom', 'Polygon'],
    contractAddresses: [
      'eth://0xba11d00c5f74255f56a5e366f4f77f5a186d7f55',
      'bnb://0xad6caeb32cd2c308980a548bd0bc5aa4306c6c18'
    ],
    website: 'https://bandprotocol.com/',
    github: 'https://github.com/bandprotocol',
    npm: '@bandprotocol/bandchain.js'
  },
  {
    id: 'chainlink',
    symbol: 'LINK',
    name: 'Chainlink',
    description: 'Industry-standard decentralized oracle network providing tamper-proof inputs, outputs, and computations to smart contracts on any blockchain',
    ucid: 1975,
    type: 'token',
    consensusType: 'token',
    class: ['price-feed', 'data-oracle', 'vrf-randomness', 'cross-chain', 'multi-chain'],
    network: ['Ethereum', 'BNB Chain', 'Polygon', 'Avalanche', 'Fantom', 'Arbitrum', 'Optimism', 'Solana', 'Base'],
    contractAddresses: [
      'eth://0x514910771af9ca656af840dff83e8264ecf986ca',
      'bnb://0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd',
      'sol://CWE8jPTUYhdCTZYWPTe1o5DFqfdjzWKc9WKz6rSjQUdG',
      'avax://0x5947bb275c521040051d82396192181b413227a3'
    ],
    website: 'https://chain.link/',
    github: 'https://github.com/smartcontractkit',
    npm: '@chainlink/contracts'
  },
  {
    id: 'dia',
    symbol: 'DIA',
    name: 'DIA Oracle',
    description: 'Open-source, multi-chain oracle platform delivering transparent and customizable market data feeds for DeFi and NFT applications',
    ucid: 6138,
    type: 'token',
    consensusType: 'token',
    class: ['price-feed', 'data-oracle', 'multi-chain'],
    network: ['Ethereum', 'BNB Chain', 'Polygon', 'Avalanche', 'Fantom', 'Arbitrum', 'Moonbeam', 'Aurora'],
    contractAddresses: [
      'eth://0x84ca8bc7997272c7cfb4d0cd3d55cd942b3c9419',
      'bnb://0x99956d38059cf7beda96ec91aa7bb2477e0901dd'
    ],
    website: 'https://diadata.org/',
    github: 'https://github.com/diadata-org',
    npm: null
  },
  {
    id: 'pyth-network',
    symbol: 'PYTH',
    name: 'Pyth Network',
    description: 'High-fidelity financial market data oracle designed for latency-sensitive applications, delivering sub-second price updates from institutional data providers',
    ucid: 28177,
    type: 'token',
    consensusType: 'proof-of-authority',
    class: ['price-feed', 'data-oracle', 'multi-chain'],
    network: ['Solana', 'Ethereum', 'BNB Chain', 'Avalanche', 'Polygon', 'Arbitrum', 'Optimism', 'Aptos', 'Sui'],
    contractAddresses: [
      'sol://HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3'
    ],
    website: 'https://pyth.network/',
    github: 'https://github.com/pyth-network',
    npm: '@pythnetwork/client'
  },
  {
    id: 'redstone',
    symbol: 'RED',
    name: 'RedStone',
    description: 'Modular oracle delivering high-frequency data feeds optimized for gas efficiency, using alternative data distribution methods beyond traditional on-chain storage',
    ucid: 21707,
    type: 'token',
    consensusType: 'token',
    class: ['price-feed', 'data-oracle', 'multi-chain'],
    network: ['Ethereum', 'Arbitrum', 'Optimism', 'Polygon', 'Avalanche', 'BNB Chain', 'Starknet'],
    contractAddresses: [
      'eth://0xc43c6bfeda065fe2c4c11765bf838789bd0bb5de',
      'sol://3iLDkQgwyotMWno1E2WiDvMZnirNUeDZirCLoeCNNuGo'
    ],
    website: 'https://redstone.finance/',
    github: 'https://github.com/redstone-finance',
    npm: '@redstone-finance/evm-connector'
  },
  {
    id: 'switchboard',
    symbol: 'SWTCH',
    name: 'Switchboard',
    description: 'Community-driven oracle network enabling permissionless creation and operation of customizable data feeds with multivariate configurations',
    ucid: 38318,
    type: 'token',
    consensusType: 'proof-of-stake',
    class: ['price-feed', 'data-oracle', 'vrf-randomness', 'multi-chain'],
    network: ['Solana', 'Aptos', 'Sui', 'Near', 'Avalanche', 'Arbitrum'],
    contractAddresses: [
      'sol://SW1TCHLmRGTfW5xZknqQdpdarB8PD95sJYWpNp9TbFx'
    ],
    website: 'https://switchboard.xyz/',
    github: 'https://github.com/switchboard-xyz',
    npm: '@switchboard-xyz/solana.js'
  },
  {
    id: 'tellor',
    symbol: 'TELLOR',
    name: 'Tellor',
    description: 'Decentralized oracle protocol securing data through crypto-economic incentives, allowing anyone to report data and dispute incorrect submissions',
    ucid: 4944,
    type: 'token',
    consensusType: 'proof-of-work',
    class: ['price-feed', 'data-oracle', 'multi-chain'],
    network: ['Ethereum', 'Polygon', 'Arbitrum', 'Optimism', 'Avalanche', 'BNB Chain', 'Gnosis'],
    contractAddresses: [
      'eth://0x88dF592F8eb5D7Bd38bFeF7dEb0fBc02cf3778a0'
    ],
    website: 'https://tellor.io/',
    github: 'https://github.com/tellor-io',
    npm: 'usingtellor'
  },
  {
    id: 'the-graph',
    symbol: 'GRT',
    name: 'The Graph',
    description: 'Decentralized indexing protocol for querying blockchain data through GraphQL APIs, enabling efficient access to blockchain data for dApps',
    ucid: 6719,
    type: 'token',
    consensusType: 'delegated-proof-of-stake',
    class: ['decentralized-indexing', 'data-oracle', 'multi-chain'],
    network: ['Ethereum', 'IPFS', 'Polygon', 'Avalanche', 'Arbitrum', 'Optimism', 'Celo', 'Fantom', 'Gnosis'],
    contractAddresses: [
      'eth://0xc944e90c64b2c07662a292be6244bdf05cda44a7',
      'avax://0x8a0cAc13c7da965a312f08ea4229c37869e85cB9',
      'sol://HGsLG4PnZ28L8A4R5nPqKgZd86zUUdmfnkTRnuFJ5dAX'
    ],
    website: 'https://thegraph.com/',
    github: 'https://github.com/graphprotocol',
    npm: '@graphprotocol/graph-cli'
  },
  {
    id: 'umbrella-network',
    symbol: 'UMB',
    name: 'Umbrella Network',
    description: 'Layer 2 oracle solution providing scalable and cost-efficient data feeds by batching data into Merkle trees for on-chain verification',
    ucid: 8385,
    type: 'token',
    consensusType: 'proof-of-stake',
    class: ['price-feed', 'data-oracle', 'multi-chain'],
    network: ['Ethereum', 'BNB Chain', 'Polygon', 'Avalanche', 'Arbitrum', 'Base'],
    contractAddresses: [
      'eth://0x6fc13eace26590b80cccab1ba5d51890577d83b2',
      'bnb://0x846f52020749715f02aef25b5d1d65e48945649d'
    ],
    website: 'https://www.umb.network/',
    github: 'https://github.com/umbrella-network',
    npm: null
  }
];

export default CLASS_ORACLES;
