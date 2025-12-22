/**
 * Proof of Stake Index - Cryptocurrencies using Proof of Stake consensus
 * 
 * This list contains cryptocurrencies that utilize Proof of Stake (PoS) or
 * similar consensus mechanisms. These currencies are organized by their
 * staking capabilities and validator networks.
 * 
 * This index is used for staking operations, validator selection, and
 * PoS-related features throughout the application.
 */

export interface ProofOfStakeItem {
  id: string;
  symbol: string;
  name: string;
}

export const PROOF_OF_STAKE: ProofOfStakeItem[] = [
  { id: 'algorand', symbol: 'ALGO', name: 'Algorand' },
  { id: 'aptos', symbol: 'APT', name: 'Aptos' },
  { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche' },
  { id: 'beldex', symbol: 'BDX', name: 'Beldex' },
  { id: 'binancecoin', symbol: 'BNB', name: 'Binance' },
  { id: 'bittensor', symbol: 'TAO', name: 'Bittensor' },
  { id: 'crypto-com-chain', symbol: 'CRO', name: 'Cronos' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
  { id: 'casper-network', symbol: 'CSPR', name: 'Casper Network' },
  { id: 'celestia', symbol: 'TIA', name: 'Celestia' },
  { id: 'cosmos', symbol: 'ATOM', name: 'Cosmos' },
  { id: 'dash', symbol: 'DASH', name: 'Dash' },
  { id: 'decred', symbol: 'DCR', name: 'Decred' },
  { id: 'dymension', symbol: 'DYM', name: 'Dymension' },
  { id: 'eos', symbol: 'EOS', name: 'EOS' },
  { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
  { id: 'flow', symbol: 'FLOW', name: 'Flow' },
  { id: 'fantom', symbol: 'FTM', name: 'Fantom' },
  { id: 'gatechain-token', symbol: 'GT', name: 'Gate Token' },
  { id: 'gnosis', symbol: 'GNO', name: 'Gnosis' },
  { id: 'hedera-hashgraph', symbol: 'HBAR', name: 'Hedera' },
  { id: 'hyperliquid', symbol: 'HYPE', name: 'Hyperliquid' },
  { id: 'immutable-x', symbol: 'IMX', name: 'Immutable X' },
  { id: 'injective-protocol', symbol: 'INJ', name: 'Injective' },
  { id: 'iota', symbol: 'IOTA', name: 'IOTA' },
  { id: 'iostoken', symbol: 'IOST', name: 'IOST' },
  { id: 'internet-computer', symbol: 'ICP', name: 'Internet Computer' },
  { id: 'komodo', symbol: 'KMD', name: 'Komodo' },
  { id: 'kusama', symbol: 'KSM', name: 'Kusama' },
  { id: 'mina-protocol', symbol: 'MINA', name: 'Mina Protocol' },
  { id: 'elrond-erd-2', symbol: 'EGLD', name: 'MultiversX' },
  { id: 'near', symbol: 'NEAR', name: 'Near' },
  { id: 'neo', symbol: 'NEO', name: 'NEO' },
  { id: 'mantra-dao', symbol: 'OM', name: 'MANTRA' },
  { id: 'oasis-network', symbol: 'ROSE', name: 'Oasis' },
  { id: 'oasys', symbol: 'OAS', name: 'Oasys' },
  { id: 'ontology', symbol: 'ONT', name: 'Ontology' },
  { id: 'osmosis', symbol: 'OSMO', name: 'Osmosis' },
  { id: 'polkadot', symbol: 'DOT', name: 'Polkadot' },
  { id: 'provenance-blockchain', symbol: 'HASH', name: 'Provenance Blockchain' },
  { id: 'qtum', symbol: 'QTUM', name: 'Qtum' },
  { id: 'reddcoin', symbol: 'RDD', name: 'Reddcoin' },
  { id: 'saga-2', symbol: 'SAGA', name: 'Saga' },
  { id: 'secret', symbol: 'SCRT', name: 'Secret' },
  { id: 'sei-network', symbol: 'SEI', name: 'Sei' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'blockstack', symbol: 'STX', name: 'Stacks' },
  { id: 'stellar', symbol: 'XLM', name: 'Stellar' },
  { id: 'story', symbol: 'IP', name: 'Story' },
  { id: 'sui', symbol: 'SUI', name: 'Sui' },
  { id: 'terra-luna', symbol: 'LUNA', name: 'Terra' },
  { id: 'terra-luna-2', symbol: 'LUNC', name: 'Terra Classic' },
  { id: 'tezos', symbol: 'XTZ', name: 'Tezos' },
  { id: 'thorchain', symbol: 'RUNE', name: 'THORChain' },
  { id: 'the-open-network', symbol: 'TON', name: 'Toncoin' },
  { id: 'tron', symbol: 'TRX', name: 'TRON' },
  { id: 'vechain', symbol: 'VET', name: 'Vechain' },
  { id: 'xdce-crowd-sale', symbol: 'XDC', name: 'XDC Network' },
  { id: 'strax', symbol: 'STRAX', name: 'Xertra' },
  { id: 'ripple', symbol: 'XRP', name: 'XRP' },
  { id: 'wanchain', symbol: 'WAN', name: 'Wanchain' },
  { id: 'waves', symbol: 'WAVES', name: 'Waves' },
  { id: 'zano', symbol: 'ZANO', name: 'Zano' },
  { id: 'zetachain', symbol: 'ZETA', name: 'ZetaChain' }
];

export default PROOF_OF_STAKE;

