/**
 * NY Exchange Offerings - bitFlyer Index - Cryptocurrencies available on bitFlyer NY Exchange
 * 
 * This list contains cryptocurrencies that are available for trading on bitFlyer's
 * New York State cryptocurrency exchange. These offerings represent a curated selection
 * of digital assets that have been approved for trading in New York State through
 * bitFlyer's platform.
 * 
 * This index is used for NY exchange-specific displays, bitFlyer integration features,
 * and regulatory-compliant currency selection interfaces.
 * 
 * Last Updated: December 2025
 * Regulatory Body: New York State Department of Financial Services (NYDFS)
 */

export type CurrencyType = 'coin' | 'token';
export type ConsensusType = 'proof-of-stake' | 'proof-of-work' | 'proof-of-authority' | 'delegated-proof-of-stake' | 'nominated-proof-of-stake' | 'liquid-proof-of-stake' | 'byzantine-fault-tolerance' | 'proof-of-transfer' | 'token' | 'hybrid';
export type CurrencyClass = 'layer-1' | 'layer-2' | 'defi' | 'dex' | 'nft' | 'gaming' | 'metaverse' | 'oracle' | 'privacy' | 'meme' | 'staking' | 'governance' | 'lending' | 'data' | 'infrastructure' | 'smart-contract-platform' | 'exchange-token' | 'ai' | 'storage' | 'payment' | 'social' | 'interoperability';

export interface NYExchangeOfferingsBitFlyerItem {
  id: string;
  symbol: string;
  name: string;
  description: string;
  ucid: number;
  type: CurrencyType;
  consensusType: ConsensusType;
  class: CurrencyClass[];
  website: string | null;
  github: string | null;
  npm: string | null;
}

export const NY_EXCHANGE_OFFERINGS_BITFLYER: NYExchangeOfferingsBitFlyerItem[] = [
  { 
    id: 'bitcoin-cash', 
    symbol: 'BCH', 
    name: 'Bitcoin Cash',
    description: 'A peer-to-peer electronic cash system forked from Bitcoin with larger block sizes for faster transactions.',
    ucid: 1831,
    type: 'coin',
    consensusType: 'proof-of-work',
    class: ['layer-1', 'payment'],
    website: 'https://bitcoincash.org',
    github: 'https://github.com/bitcoin-cash-node',
    npm: null
  },
  { 
    id: 'bitcoin', 
    symbol: 'BTC', 
    name: 'Bitcoin',
    description: 'The first decentralized cryptocurrency, serving as digital gold and a peer-to-peer electronic cash system.',
    ucid: 1,
    type: 'coin',
    consensusType: 'proof-of-work',
    class: ['layer-1', 'payment'],
    website: 'https://bitcoin.org',
    github: 'https://github.com/bitcoin',
    npm: 'https://www.npmjs.com/package/bitcoinjs-lib'
  },
  { 
    id: 'ethereum-classic', 
    symbol: 'ETC', 
    name: 'Ethereum Classic',
    description: 'The original Ethereum blockchain maintaining immutability and proof-of-work consensus.',
    ucid: 1321,
    type: 'coin',
    consensusType: 'proof-of-work',
    class: ['layer-1', 'smart-contract-platform'],
    website: 'https://ethereumclassic.org',
    github: 'https://github.com/ethereumclassic',
    npm: null
  },
  { 
    id: 'ethereum', 
    symbol: 'ETH', 
    name: 'Ethereum',
    description: 'A decentralized platform enabling smart contracts and distributed applications with its native currency Ether.',
    ucid: 1027,
    type: 'coin',
    consensusType: 'proof-of-stake',
    class: ['layer-1', 'smart-contract-platform'],
    website: 'https://ethereum.org',
    github: 'https://github.com/ethereum',
    npm: 'https://www.npmjs.com/package/ethers'
  },
  { 
    id: 'litecoin', 
    symbol: 'LTC', 
    name: 'Litecoin',
    description: 'A peer-to-peer cryptocurrency created as the "silver to Bitcoin\'s gold" with faster block times.',
    ucid: 2,
    type: 'coin',
    consensusType: 'proof-of-work',
    class: ['layer-1', 'payment'],
    website: 'https://litecoin.org',
    github: 'https://github.com/litecoin-project',
    npm: null
  }
];

export default NY_EXCHANGE_OFFERINGS_BITFLYER;

