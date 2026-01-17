/**
 * Coinbase 50 Index - Top 50 cryptocurrencies by market cap
 * Based on Coinbase's curated list of popular cryptocurrencies
 * 
 * This list is filtered to only include currencies for which we have icons
 * and is commonly used for price tickers and market displays.
 * 
 * Last Updated: December 2025
 * Source: Coinbase cryptocurrency listings
 */

export type CurrencyType = 'coin' | 'token';
export type ConsensusType = 'proof-of-stake' | 'proof-of-work' | 'proof-of-authority' | 'delegated-proof-of-stake' | 'nominated-proof-of-stake' | 'liquid-proof-of-stake' | 'byzantine-fault-tolerance' | 'token' | 'hybrid';
export type CurrencyClass = 'layer-1' | 'layer-2' | 'defi' | 'dex' | 'nft' | 'gaming' | 'metaverse' | 'oracle' | 'privacy' | 'meme' | 'staking' | 'governance' | 'lending' | 'data' | 'infrastructure' | 'smart-contract-platform' | 'exchange-token' | 'ai' | 'storage';

export interface CoinbaseIndexItem {
  id: string;
  symbol: string;
  name: string;
  description: string;
  ucid: number;
  type: CurrencyType;
  consensusType: ConsensusType;
  class: CurrencyClass[];
  network: string | null;
  contractAddresses: string[];
  website: string | null;
  github: string | null;
  npm: string | null;
}

export const COINBASE50: CoinbaseIndexItem[] = [
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    description: 'The first decentralized cryptocurrency and digital payment system, operating without a central authority using peer-to-peer technology',
    ucid: 1,
    type: 'coin',
    consensusType: 'proof-of-work',
    class: ['layer-1'],
    network: null,
    contractAddresses: [],
    website: 'https://bitcoin.org/',
    github: 'https://github.com/bitcoin',
    npm: 'bitcoinjs-lib'
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    description: 'Decentralized platform enabling smart contracts and distributed applications built on blockchain technology',
    ucid: 1027,
    type: 'coin',
    consensusType: 'proof-of-stake',
    class: ['layer-1', 'smart-contract-platform'],
    network: null,
    contractAddresses: [],
    website: 'https://ethereum.org/',
    github: 'https://github.com/ethereum',
    npm: 'web3'
  },
  {
    id: 'ripple',
    symbol: 'XRP',
    name: 'XRP',
    description: 'Digital payment protocol and cryptocurrency designed for fast, low-cost international money transfers and remittances',
    ucid: 52,
    type: 'coin',
    consensusType: 'byzantine-fault-tolerance',
    class: ['layer-1'],
    network: null,
    contractAddresses: [],
    website: 'https://xrpl.org/',
    github: 'https://github.com/XRPLF',
    npm: 'xrpl'
  },
  {
    id: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    description: 'High-performance blockchain supporting builders around the world creating crypto apps that scale',
    ucid: 5426,
    type: 'coin',
    consensusType: 'proof-of-stake',
    class: ['layer-1', 'smart-contract-platform'],
    network: null,
    contractAddresses: [],
    website: 'https://solana.com/',
    github: 'https://github.com/solana-labs',
    npm: '@solana/web3.js'
  },
  {
    id: 'dogecoin',
    symbol: 'DOGE',
    name: 'Dogecoin',
    description: 'Peer-to-peer cryptocurrency featuring the Shiba Inu dog meme, created as a lighthearted alternative to Bitcoin',
    ucid: 74,
    type: 'coin',
    consensusType: 'proof-of-work',
    class: ['layer-1', 'meme'],
    network: null,
    contractAddresses: [],
    website: 'https://dogecoin.com/',
    github: 'https://github.com/dogecoin',
    npm: null
  },
  {
    id: 'cardano',
    symbol: 'ADA',
    name: 'Cardano',
    description: 'Proof-of-stake blockchain platform founded on peer-reviewed research and developed through evidence-based methods',
    ucid: 2010,
    type: 'coin',
    consensusType: 'proof-of-stake',
    class: ['layer-1', 'smart-contract-platform'],
    network: null,
    contractAddresses: [],
    website: 'https://cardano.org/',
    github: 'https://github.com/input-output-hk',
    npm: '@emurgo/cardano-serialization-lib-nodejs'
  },
  {
    id: 'avalanche-2',
    symbol: 'AVAX',
    name: 'Avalanche',
    description: 'Open-source platform for launching decentralized applications and enterprise blockchain deployments in one interoperable ecosystem',
    ucid: 5805,
    type: 'coin',
    consensusType: 'proof-of-stake',
    class: ['layer-1', 'smart-contract-platform'],
    network: null,
    contractAddresses: [],
    website: 'https://www.avax.network/',
    github: 'https://github.com/ava-labs',
    npm: 'avalanche'
  },
  {
    id: 'chainlink',
    symbol: 'LINK',
    name: 'Chainlink',
    description: 'Decentralized oracle network providing tamper-proof inputs and outputs for complex smart contracts on any blockchain',
    ucid: 1975,
    type: 'token',
    consensusType: 'token',
    class: ['oracle', 'infrastructure'],
    network: 'Ethereum',
    contractAddresses: [
      'eth://0x514910771af9ca656af840dff83e8264ecf986ca'
    ],
    website: 'https://chain.link/',
    github: 'https://github.com/smartcontractkit',
    npm: '@chainlink/contracts'
  },
  {
    id: 'stellar',
    symbol: 'XLM',
    name: 'Stellar',
    description: 'Open network for storing and moving money that connects banks, payment systems, and people',
    ucid: 512,
    type: 'coin',
    consensusType: 'byzantine-fault-tolerance',
    class: ['layer-1'],
    network: null,
    contractAddresses: [],
    website: 'https://stellar.org/',
    github: 'https://github.com/stellar',
    npm: '@stellar/stellar-sdk'
  },
  {
    id: 'tezos',
    symbol: 'XTZ',
    name: 'Tezos',
    description: 'Self-amending blockchain network with on-chain governance allowing stakeholders to vote on protocol upgrades',
    ucid: 2011,
    type: 'coin',
    consensusType: 'liquid-proof-of-stake',
    class: ['layer-1', 'smart-contract-platform'],
    network: null,
    contractAddresses: [],
    website: 'https://tezos.com/',
    github: 'https://gitlab.com/tezos/tezos',
    npm: '@taquito/taquito'
  },
  {
    id: 'near',
    symbol: 'NEAR',
    name: 'Near',
    description: 'Sharded, developer-friendly, proof-of-stake blockchain designed for usability and scalability',
    ucid: 6535,
    type: 'coin',
    consensusType: 'proof-of-stake',
    class: ['layer-1', 'smart-contract-platform'],
    network: null,
    contractAddresses: [],
    website: 'https://near.org/',
    github: 'https://github.com/near',
    npm: 'near-api-js'
  },
  {
    id: 'render-token',
    symbol: 'RENDER',
    name: 'Render',
    description: 'Distributed GPU rendering network built on blockchain for next-generation 3D content creation',
    ucid: 5690,
    type: 'token',
    consensusType: 'token',
    class: ['infrastructure', 'ai'],
    network: 'Ethereum',
    contractAddresses: [
      'eth://0x6de037ef9ad2725eb40118bb1702ebb27e4aeb24'
    ],
    website: 'https://rendernetwork.com/',
    github: 'https://github.com/rndr-network',
    npm: null
  },
  {
    id: 'blockstack',
    symbol: 'STX',
    name: 'Stacks',
    description: 'Bitcoin layer for smart contracts enabling decentralized apps and protocols without modifying Bitcoin itself',
    ucid: 4847,
    type: 'coin',
    consensusType: 'proof-of-work',
    class: ['layer-2', 'smart-contract-platform'],
    network: null,
    contractAddresses: [],
    website: 'https://www.stacks.co/',
    github: 'https://github.com/stacks-network',
    npm: '@stacks/transactions'
  },
  {
    id: 'zcash',
    symbol: 'ZEC',
    name: 'ZCash',
    description: 'Privacy-focused cryptocurrency using zero-knowledge proofs to enable shielded transactions',
    ucid: 1437,
    type: 'coin',
    consensusType: 'proof-of-work',
    class: ['layer-1', 'privacy'],
    network: null,
    contractAddresses: [],
    website: 'https://z.cash/',
    github: 'https://github.com/zcash',
    npm: null
  },
  {
    id: 'shiba-inu',
    symbol: 'SHIB',
    name: 'Shiba Inu',
    description: 'Decentralized meme token evolved into a vibrant ecosystem with DeFi capabilities and NFT platform',
    ucid: 5994,
    type: 'token',
    consensusType: 'token',
    class: ['meme', 'defi'],
    network: 'Ethereum',
    contractAddresses: [
      'eth://0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce'
    ],
    website: 'https://shibatoken.com/',
    github: 'https://github.com/shytoshikusama',
    npm: null
  },
  {
    id: 'mina-protocol',
    symbol: 'MINA',
    name: 'Mina Protocol',
    description: 'Lightweight blockchain with a constant size of 22KB using zero-knowledge proofs for verification',
    ucid: 8646,
    type: 'coin',
    consensusType: 'proof-of-stake',
    class: ['layer-1', 'privacy'],
    network: null,
    contractAddresses: [],
    website: 'https://minaprotocol.com/',
    github: 'https://github.com/MinaProtocol',
    npm: null
  },
  {
    id: 'apecoin',
    symbol: 'APE',
    name: 'ApeCoin',
    description: 'Governance and utility token for the APE ecosystem supporting decentralized community building',
    ucid: 18876,
    type: 'token',
    consensusType: 'token',
    class: ['governance', 'nft'],
    network: 'Ethereum',
    contractAddresses: [
      'eth://0x4d224452801aced8b2f0aebe155379bb5d594381'
    ],
    website: 'https://apecoin.com/',
    github: 'https://github.com/apecoincom',
    npm: null
  },
  {
    id: 'immutable-x',
    symbol: 'IMX',
    name: 'Immutable X',
    description: 'Layer-2 scaling solution for NFTs on Ethereum with instant trade confirmation and zero gas fees',
    ucid: 10603,
    type: 'token',
    consensusType: 'token',
    class: ['layer-2', 'nft'],
    network: 'Ethereum',
    contractAddresses: [
      'eth://0xf57e7e7c23978c3caec3c3548e3d615c346e79ff'
    ],
    website: 'https://www.immutable.com/',
    github: 'https://github.com/immutable',
    npm: '@imtbl/core-sdk'
  },
  {
    id: 'oasis-network',
    symbol: 'ROSE',
    name: 'Oasis Network',
    description: 'Privacy-enabled blockchain platform for open finance and responsible data economy',
    ucid: 7653,
    type: 'coin',
    consensusType: 'proof-of-stake',
    class: ['layer-1', 'privacy', 'smart-contract-platform'],
    network: null,
    contractAddresses: [],
    website: 'https://oasisprotocol.org/',
    github: 'https://github.com/oasisprotocol',
    npm: null
  },
  {
    id: 'lido-dao',
    symbol: 'LDO',
    name: 'Lido DAO',
    description: 'Governance token for Lido, a liquid staking solution for Ethereum and other PoS blockchains',
    ucid: 8000,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'staking', 'governance'],
    network: 'Ethereum',
    contractAddresses: [
      'eth://0x5a98fcbea516cf06857215779fd812ca3bef1b32'
    ],
    website: 'https://lido.fi/',
    github: 'https://github.com/lidofinance',
    npm: null
  },
  {
    id: 'bonk',
    symbol: 'BONK',
    name: 'BONK',
    description: 'Community-driven meme coin on Solana aiming to increase liquidity in Solana-based DEXes',
    ucid: 23095,
    type: 'token',
    consensusType: 'token',
    class: ['meme'],
    network: 'Solana',
    contractAddresses: [
      'sol://DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263'
    ],
    website: 'https://bonkcoin.com/',
    github: 'https://github.com/bonk-inu',
    npm: null
  },
  {
    id: 'elrond-erd-2',
    symbol: 'EGLD',
    name: 'MultiversX',
    description: 'Highly scalable, fast and secure blockchain platform for distributed apps and digital assets',
    ucid: 6892,
    type: 'coin',
    consensusType: 'proof-of-stake',
    class: ['layer-1', 'smart-contract-platform'],
    network: null,
    contractAddresses: [],
    website: 'https://multiversx.com/',
    github: 'https://github.com/multiversx',
    npm: '@multiversx/sdk-core'
  },
  {
    id: 'helium',
    symbol: 'HNT',
    name: 'Helium',
    description: 'Decentralized wireless network powered by blockchain enabling IoT devices to connect and communicate',
    ucid: 5665,
    type: 'coin',
    consensusType: 'proof-of-work',
    class: ['infrastructure'],
    network: null,
    contractAddresses: [],
    website: 'https://www.helium.com/',
    github: 'https://github.com/helium',
    npm: null
  },
  {
    id: 'jasmycoin',
    symbol: 'JASMY',
    name: 'JasmyCoin',
    description: 'IoT platform democratizing data by giving users full control of their personal information',
    ucid: 8425,
    type: 'token',
    consensusType: 'token',
    class: ['data', 'infrastructure'],
    network: 'Ethereum',
    contractAddresses: [
      'eth://0x7420b4b9a0110cdc71fb720908340c03f9bc03ec'
    ],
    website: 'https://www.jasmy.co.jp/',
    github: 'https://github.com/JasmyCoin',
    npm: null
  },
  {
    id: 'blur',
    symbol: 'BLUR',
    name: 'Blur',
    description: 'NFT marketplace and aggregator platform designed for professional traders with advanced features',
    ucid: 23121,
    type: 'token',
    consensusType: 'token',
    class: ['nft', 'governance'],
    network: 'Ethereum',
    contractAddresses: [
      'eth://0x5283d291dbcf85356a21ba090e6db59121208b44'
    ],
    website: 'https://blur.io/',
    github: null,
    npm: null
  },
  {
    id: 'polkadot',
    symbol: 'DOT',
    name: 'Polkadot',
    description: 'Multi-chain protocol enabling cross-blockchain transfers of any data or asset type',
    ucid: 6636,
    type: 'coin',
    consensusType: 'nominated-proof-of-stake',
    class: ['layer-1', 'smart-contract-platform'],
    network: null,
    contractAddresses: [],
    website: 'https://polkadot.network/',
    github: 'https://github.com/paritytech',
    npm: '@polkadot/api'
  },
  {
    id: 'bitcoin-cash',
    symbol: 'BCH',
    name: 'Bitcoin Cash',
    description: 'Peer-to-peer electronic cash system designed to become sound global money with fast payments and low fees',
    ucid: 1831,
    type: 'coin',
    consensusType: 'proof-of-work',
    class: ['layer-1'],
    network: null,
    contractAddresses: [],
    website: 'https://www.bitcoincash.org/',
    github: 'https://github.com/bitcoincashorg',
    npm: null
  },
  {
    id: 'uniswap',
    symbol: 'UNI',
    name: 'Uniswap',
    description: 'Governance token for the Uniswap decentralized exchange protocol on Ethereum',
    ucid: 7083,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'governance'],
    network: 'Ethereum',
    contractAddresses: [
      'eth://0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'
    ],
    website: 'https://uniswap.org/',
    github: 'https://github.com/Uniswap',
    npm: '@uniswap/sdk'
  },
  {
    id: 'litecoin',
    symbol: 'LTC',
    name: 'Litecoin',
    description: 'Peer-to-peer cryptocurrency created as the silver to Bitcoin\'s gold with faster transaction times',
    ucid: 2,
    type: 'coin',
    consensusType: 'proof-of-work',
    class: ['layer-1'],
    network: null,
    contractAddresses: [],
    website: 'https://litecoin.org/',
    github: 'https://github.com/litecoin-project',
    npm: null
  },
  {
    id: 'aave',
    symbol: 'AAVE',
    name: 'Aave',
    description: 'Decentralized lending protocol enabling users to lend and borrow cryptocurrencies without intermediaries',
    ucid: 7278,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'lending', 'governance'],
    network: 'Ethereum',
    contractAddresses: [
      'eth://0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9'
    ],
    website: 'https://aave.com/',
    github: 'https://github.com/aave',
    npm: '@aave/protocol-js'
  },
  {
    id: 'internet-computer',
    symbol: 'ICP',
    name: 'Internet Computer',
    description: 'Blockchain that runs at web speed with unbounded capacity, hosting software and data directly on the public internet',
    ucid: 8916,
    type: 'coin',
    consensusType: 'byzantine-fault-tolerance',
    class: ['layer-1', 'smart-contract-platform'],
    network: null,
    contractAddresses: [],
    website: 'https://internetcomputer.org/',
    github: 'https://github.com/dfinity',
    npm: '@dfinity/agent'
  },
  {
    id: 'ethereum-classic',
    symbol: 'ETC',
    name: 'Ethereum Classic',
    description: 'Original Ethereum blockchain following the principle of "code is law" without rollback of smart contracts',
    ucid: 1321,
    type: 'coin',
    consensusType: 'proof-of-work',
    class: ['layer-1', 'smart-contract-platform'],
    network: null,
    contractAddresses: [],
    website: 'https://ethereumclassic.org/',
    github: 'https://github.com/ethereumclassic',
    npm: null
  },
  {
    id: 'matic-network',
    symbol: 'MATIC',
    name: 'Polygon',
    description: 'Layer-2 scaling solution for Ethereum providing faster transactions and lower fees',
    ucid: 3890,
    type: 'token',
    consensusType: 'proof-of-stake',
    class: ['layer-2'],
    network: 'Ethereum',
    contractAddresses: [
      'eth://0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0'
    ],
    website: 'https://polygon.technology/',
    github: 'https://github.com/maticnetwork',
    npm: '@maticnetwork/maticjs'
  },
  {
    id: 'fetch-ai',
    symbol: 'FET',
    name: 'Fetch.ai',
    description: 'Decentralized machine learning platform enabling autonomous economic agents to perform tasks',
    ucid: 3773,
    type: 'token',
    consensusType: 'token',
    class: ['ai', 'infrastructure'],
    network: 'Ethereum',
    contractAddresses: [
      'eth://0xaea46a60368a7bd060eec7df8cba43b7ef41ad85'
    ],
    website: 'https://fetch.ai/',
    github: 'https://github.com/fetchai',
    npm: null
  },
  {
    id: 'algorand',
    symbol: 'ALGO',
    name: 'Algorand',
    description: 'Pure proof-of-stake blockchain designed for speed, security, and decentralization',
    ucid: 4030,
    type: 'coin',
    consensusType: 'proof-of-stake',
    class: ['layer-1', 'smart-contract-platform'],
    network: null,
    contractAddresses: [],
    website: 'https://algorand.com/',
    github: 'https://github.com/algorand',
    npm: 'algosdk'
  },
  {
    id: 'cosmos',
    symbol: 'ATOM',
    name: 'Cosmos',
    description: 'Ecosystem of interconnected blockchains enabling interoperability and scalability',
    ucid: 3794,
    type: 'coin',
    consensusType: 'byzantine-fault-tolerance',
    class: ['layer-1', 'smart-contract-platform'],
    network: null,
    contractAddresses: [],
    website: 'https://cosmos.network/',
    github: 'https://github.com/cosmos',
    npm: '@cosmjs/stargate'
  },
  {
    id: 'injective-protocol',
    symbol: 'INJ',
    name: 'Injective',
    description: 'Layer-1 blockchain optimized for decentralized finance applications with cross-chain compatibility',
    ucid: 7226,
    type: 'coin',
    consensusType: 'proof-of-stake',
    class: ['layer-1', 'defi', 'dex'],
    network: null,
    contractAddresses: [],
    website: 'https://injective.com/',
    github: 'https://github.com/InjectiveLabs',
    npm: '@injectivelabs/sdk-ts'
  },
  {
    id: 'the-graph',
    symbol: 'GRT',
    name: 'The Graph',
    description: 'Decentralized indexing protocol for querying blockchain data through GraphQL APIs',
    ucid: 6719,
    type: 'token',
    consensusType: 'delegated-proof-of-stake',
    class: ['infrastructure', 'data'],
    network: 'Ethereum',
    contractAddresses: [
      'eth://0xc944e90c64b2c07662a292be6244bdf05cda44a7'
    ],
    website: 'https://thegraph.com/',
    github: 'https://github.com/graphprotocol',
    npm: '@graphprotocol/graph-cli'
  },
  {
    id: 'quant-network',
    symbol: 'QNT',
    name: 'Quant Network',
    description: 'Blockchain operating system enabling interoperability between different distributed ledgers',
    ucid: 3155,
    type: 'token',
    consensusType: 'token',
    class: ['infrastructure'],
    network: 'Ethereum',
    contractAddresses: [
      'eth://0x4a220e6096b25eadb88358cb44068a3248254675'
    ],
    website: 'https://quant.network/',
    github: null,
    npm: null
  },
  {
    id: 'maker',
    symbol: 'MKR',
    name: 'Maker',
    description: 'Governance token for MakerDAO and the Maker Protocol, backing the DAI stablecoin',
    ucid: 1518,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'governance'],
    network: 'Ethereum',
    contractAddresses: [
      'eth://0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2'
    ],
    website: 'https://makerdao.com/',
    github: 'https://github.com/makerdao',
    npm: '@makerdao/dai'
  },
  {
    id: 'the-sandbox',
    symbol: 'SAND',
    name: 'Sand',
    description: 'Metaverse platform enabling users to create, own, and monetize gaming experiences on Ethereum',
    ucid: 6210,
    type: 'token',
    consensusType: 'token',
    class: ['metaverse', 'gaming', 'nft'],
    network: 'Ethereum',
    contractAddresses: [
      'eth://0x3845badade8e6dff049820680d1f14bd3903a5d0'
    ],
    website: 'https://www.sandbox.game/',
    github: 'https://github.com/thesandboxgame',
    npm: null
  },
  {
    id: 'curve-dao-token',
    symbol: 'CRV',
    name: 'Curve DAO Token',
    description: 'Governance token for Curve Finance, a decentralized exchange optimized for stablecoin trading',
    ucid: 6538,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'governance'],
    network: 'Ethereum',
    contractAddresses: [
      'eth://0xd533a949740bb3306d119cc777fa900ba034cd52'
    ],
    website: 'https://curve.fi/',
    github: 'https://github.com/curvefi',
    npm: null
  },
  {
    id: 'eos',
    symbol: 'EOS',
    name: 'EOS',
    description: 'Blockchain platform designed for the deployment of industrial-scale decentralized applications',
    ucid: 1765,
    type: 'coin',
    consensusType: 'delegated-proof-of-stake',
    class: ['layer-1', 'smart-contract-platform'],
    network: null,
    contractAddresses: [],
    website: 'https://eosnetwork.com/',
    github: 'https://github.com/EOSIO',
    npm: 'eosjs'
  },
  {
    id: 'axie-infinity',
    symbol: 'AXS',
    name: 'Axie Infinity',
    description: 'Governance token for Axie Infinity, a blockchain-based trading and battling game',
    ucid: 6783,
    type: 'token',
    consensusType: 'token',
    class: ['gaming', 'nft', 'governance'],
    network: 'Ethereum',
    contractAddresses: [
      'eth://0xbb0e17ef65f82ab018d8edd776e8dd940327b28b'
    ],
    website: 'https://axieinfinity.com/',
    github: 'https://github.com/axieinfinity',
    npm: null
  },
  {
    id: 'decentraland',
    symbol: 'MANA',
    name: 'Decentraland',
    description: 'Virtual reality platform powered by Ethereum where users can create, experience, and monetize content',
    ucid: 1966,
    type: 'token',
    consensusType: 'token',
    class: ['metaverse', 'gaming', 'nft'],
    network: 'Ethereum',
    contractAddresses: [
      'eth://0x0f5d2fb29fb7d3cfee444a200298f468908cc942'
    ],
    website: 'https://decentraland.org/',
    github: 'https://github.com/decentraland',
    npm: 'decentraland'
  },
  {
    id: 'chiliz',
    symbol: 'CHZ',
    name: 'Chiliz',
    description: 'Sports and entertainment blockchain platform enabling fan engagement through fan tokens',
    ucid: 4066,
    type: 'token',
    consensusType: 'token',
    class: ['exchange-token'],
    network: 'Ethereum',
    contractAddresses: [
      'eth://0x3506424f91fd33084466f402d5d97f05f8e3b4af'
    ],
    website: 'https://www.chiliz.com/',
    github: 'https://github.com/chiliz-chain',
    npm: null
  },
  {
    id: 'havven',
    symbol: 'SNX',
    name: 'Synthetix',
    description: 'Decentralized protocol for creating synthetic assets that track the value of real-world assets',
    ucid: 2586,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'governance'],
    network: 'Ethereum',
    contractAddresses: [
      'eth://0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f'
    ],
    website: 'https://synthetix.io/',
    github: 'https://github.com/Synthetixio',
    npm: 'synthetix'
  },
  {
    id: 'livepeer',
    symbol: 'LPT',
    name: 'Livepeer',
    description: 'Decentralized video transcoding network built on Ethereum for live and on-demand video streaming',
    ucid: 3640,
    type: 'token',
    consensusType: 'token',
    class: ['infrastructure'],
    network: 'Ethereum',
    contractAddresses: [
      'eth://0x58b6a8a3302369daec383334672404ee733ab239'
    ],
    website: 'https://livepeer.org/',
    github: 'https://github.com/livepeer',
    npm: '@livepeer/sdk'
  },
  {
    id: 'kusama',
    symbol: 'KSM',
    name: 'Kusama',
    description: 'Canary network for Polkadot enabling early-stage deployment and testing of new blockchain technologies',
    ucid: 5034,
    type: 'coin',
    consensusType: 'nominated-proof-of-stake',
    class: ['layer-1'],
    network: null,
    contractAddresses: [],
    website: 'https://kusama.network/',
    github: 'https://github.com/paritytech',
    npm: null
  },
  {
    id: '1inch',
    symbol: '1INCH',
    name: '1inch',
    description: 'DEX aggregator finding the best prices across multiple exchanges and governance token for 1inch Network',
    ucid: 8104,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'governance'],
    network: 'Ethereum',
    contractAddresses: [
      'eth://0x111111111117dc0aa78b770fa6a738034120c302'
    ],
    website: 'https://1inch.io/',
    github: 'https://github.com/1inch',
    npm: '@1inch/limit-order-protocol'
  }
];

export default COINBASE50;

