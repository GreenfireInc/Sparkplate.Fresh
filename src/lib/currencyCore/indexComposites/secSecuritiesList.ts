/**
 * SEC Securities List - Cryptocurrencies that have been subject to SEC regulatory action or scrutiny
 * 
 * This list contains digital assets that have been identified in SEC enforcement actions,
 * regulatory guidance, or other securities-related proceedings. This list is used for
 * compliance monitoring and regulatory awareness purposes.
 * 
 * Note: Inclusion in this list does not constitute legal advice or a determination
 * of securities status. Always consult with legal counsel for regulatory compliance.
 */

export interface SecSecurityItem {
  id: string;
  symbol: string;
  name: string;
}

export const SEC_SECURITIES_LIST: SecSecurityItem[] = [
  { id: 'airtoken', symbol: 'AIR', name: 'AirToken' },
  { id: 'algorand', symbol: 'ALGO', name: 'Algorand' },
  { id: 'amp-token', symbol: 'AMP', name: 'Amp' },
  { id: 'axie-infinity', symbol: 'AXS', name: 'Axie Infinity' },
  { id: 'beaxy-token', symbol: 'BXY', name: 'Beaxy Token' },
  { id: 'binance-usd', symbol: 'BUSD', name: 'Binance USD' },
  { id: 'bitconnect', symbol: 'BCC', name: 'BitConnect' },
  { id: 'bittorrent', symbol: 'BTT', name: 'BitTorrent' },
  { id: 'binancecoin', symbol: 'BNB', name: 'BNB' },
  { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
  { id: 'chiliz', symbol: 'CHZ', name: 'Chiliz' },
  { id: 'cosmos', symbol: 'ATOM', name: 'Cosmos' },
  { id: 'coti', symbol: 'COTI', name: 'COTI' },
  { id: 'dash', symbol: 'DASH', name: 'DASH' },
  { id: 'decentraland', symbol: 'MANA', name: 'Decentraland' },
  { id: 'derivadao', symbol: 'DDX', name: 'DerivaDAO' },
  { id: 'dfx-finance', symbol: 'DFX', name: 'DFX Finance' },
  { id: 'dragonchain', symbol: 'DRGN', name: 'DragonChain' },
  { id: 'ducat', symbol: 'DUCAT', name: 'Ducat' },
  { id: 'ethereummax', symbol: 'EMAX', name: 'EthereumMax' },
  { id: 'filecoin', symbol: 'FIL', name: 'Filecoin' },
  { id: 'flow', symbol: 'FLOW', name: 'Flow' },
  { id: 'hydro', symbol: 'HYDRO', name: 'Hydro' },
  { id: 'iht-real-estate', symbol: 'IHT', name: 'IHT Real Estate' },
  { id: 'internet-computer', symbol: 'ICP', name: 'Internet Computer' },
  { id: 'kromatika', symbol: 'KROM', name: 'Kromatika' },
  { id: 'kin', symbol: 'KIN', name: 'Kin' },
  { id: 'lbry-credits', symbol: 'LBC', name: 'LBRY Credits' },
  { id: 'lcx', symbol: 'LCX', name: 'Liechtenstein Cryptoasset Exchange' },
  { id: 'locke', symbol: 'LOCKE', name: 'Locke' },
  { id: 'omisego', symbol: 'OMG', name: 'OmiseGo' },
  { id: 'meta-1-coin', symbol: 'META1', name: 'Meta 1 Coin' },
  { id: 'mango-markets', symbol: 'MNGO', name: 'Mango' },
  { id: 'mirror-protocol', symbol: 'MIR', name: 'Mirror Protocol' },
  { id: 'tokencard', symbol: 'TKN', name: 'Monolith' },
  { id: 'naga', symbol: 'NGC', name: 'Naga' },
  { id: 'near', symbol: 'NEAR', name: 'Near' },
  { id: 'nexo', symbol: 'NEXO', name: 'Nexo' },
  { id: 'power-ledger', symbol: 'POWR', name: 'Power Ledger' },
  { id: 'paragon', symbol: 'PRG', name: 'Paragon' },
  { id: 'matic-network', symbol: 'MATIC', name: 'Polygon' },
  { id: 'rally-2', symbol: 'RLY', name: 'Rally' },
  { id: 'rari-governance-token', symbol: 'RGT', name: 'Rari Governance Token' },
  { id: 'salt', symbol: 'SALT', name: 'Salt Lending' },
  { id: 'solana', symbol: 'SOL', name: 'Solana' },
  { id: 'the-sandbox', symbol: 'SAND', name: 'Sandbox, The' },
  { id: 'the-open-network', symbol: 'TON', name: 'Telegram\'s Gram' },
  { id: 'terra-luna', symbol: 'LUNA', name: 'Terra (Classic)' },
  { id: 'terrausd', symbol: 'USTC', name: 'Terra USD' },
  { id: 'tron', symbol: 'TRX', name: 'Tron' },
  { id: 'voyager-token', symbol: 'VGX', name: 'Voyager Token' },
  { id: 'xyo-network', symbol: 'XYO', name: 'XYO Network' },
  { id: 'ripple', symbol: 'XRP', name: 'XRP' }
];

export default SEC_SECURITIES_LIST;

