/**
 * Proof of Work Index - Curated list of Proof of Work cryptocurrencies
 * 
 * This list contains cryptocurrencies that use Proof of Work (PoW) consensus mechanisms.
 * Proof of Work is a consensus algorithm that requires miners to solve complex
 * cryptographic puzzles to validate transactions and create new blocks.
 * 
 * This index is used for PoW-specific displays, mining-related features, and
 * consensus mechanism categorization interfaces.
 */

export interface ProofOfWorkItem {
  id: string;
  symbol: string;
  name: string;
}

export const PROOF_OF_WORK: ProofOfWorkItem[] = [
  { id: 'beam', symbol: 'BEAM', name: 'Beam' },
  { id: 'beldex', symbol: 'BDX', name: 'Beldex' },
  { id: 'bismuth', symbol: 'BIS', name: 'Bismuth' },
  { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
  { id: 'bitcoin-cash', symbol: 'BCH', name: 'Bitcoin Cash' },
  { id: 'bitcoin-diamond', symbol: 'BCD', name: 'Bitcoin Diamond' },
  { id: 'bitcoin-gold', symbol: 'BTG', name: 'Bitcoin Gold' },
  { id: 'bitcoin-cash-sv', symbol: 'BSV', name: 'Bitcoin SV' },
  { id: 'bytecoin', symbol: 'BCN', name: 'Bytecoin' },
  { id: 'bytom', symbol: 'BTM', name: 'Bytom' },
  { id: 'californium', symbol: 'CF', name: 'Californium' },
  { id: 'callisto', symbol: 'CLO', name: 'Callisto Network' },
  { id: 'carboncoin', symbol: 'CARBON', name: 'Carboncoin' },
  { id: 'clams', symbol: 'CLAM', name: 'Clams' },
  { id: 'clore-ai', symbol: 'CLORE', name: 'Clore.ai' },
  { id: 'comet', symbol: 'CMT', name: 'Comet' },
  { id: 'conflux-token', symbol: 'CFX', name: 'Conflux Network' },
  { id: 'counterparty', symbol: 'XCP', name: 'Counterparty' },
  { id: 'dash', symbol: 'DASH', name: 'Dash' },
  { id: 'decred', symbol: 'DCR', name: 'Decred' },
  { id: 'deutsche-emark', symbol: 'DEM', name: 'Deutsche eMark' },
  { id: 'digitalcoin', symbol: 'DGC', name: 'Digitalcoin' },
  { id: 'digitalnote', symbol: 'XDN', name: 'DigitalNote' },
  { id: 'digibyte', symbol: 'DGB', name: 'Digibyte' },
  { id: 'dimecoin', symbol: 'DIME', name: 'Dimecoin' },
  { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
  { id: 'dollarcoin', symbol: 'DLC', name: 'Dollarcoin' },
  { id: 'e-gulden', symbol: 'EFL', name: 'e-Gulden' },
  { id: 'edge-matrix-computing', symbol: 'EMC', name: 'Edge Matrix Computing' },
  { id: 'energi', symbol: 'NRG', name: 'Energi' },
  { id: 'epic-cash', symbol: 'EPIC', name: 'Epic Cash' },
  { id: 'ergo', symbol: 'ERG', name: 'Ergo' },
  { id: 'ethereum-classic', symbol: 'ETC', name: 'Ethereum Classic' },
  { id: 'ethereum-pow', symbol: 'ETHW', name: 'EthereumPOW' },
  { id: 'feathercoin', symbol: 'FTC', name: 'Feathercoin' },
  { id: 'firo', symbol: 'FIRO', name: 'Firo' },
  { id: 'zelcash', symbol: 'FLUX', name: 'Flux' },
  { id: 'francs', symbol: 'FRN', name: 'Francs' },
  { id: 'freicoin', symbol: 'FRC', name: 'Freicoin' },
  { id: 'gamecredits', symbol: 'GAME', name: 'GameCredits' },
  { id: 'goldcoin', symbol: 'GLC', name: 'Goldcoin' },
  { id: 'grin', symbol: 'GRIN', name: 'Grin' },
  { id: 'groestlcoin', symbol: 'GRS', name: 'Groestlcoin' },
  { id: 'handshake', symbol: 'HNS', name: 'Handshake' },
  { id: 'hathor', symbol: 'HTR', name: 'Hathor' },
  { id: 'zencash', symbol: 'ZEN', name: 'Horizen' },
  { id: 'hush', symbol: 'HUSH', name: 'Hush' },
  { id: 'ilcoin', symbol: 'ILC', name: 'ILCoin' },
  { id: 'ixcoin', symbol: 'IXC', name: 'Ixcoin' },
  { id: 'kadena', symbol: 'KDA', name: 'Kadena' },
  { id: 'kaspa', symbol: 'KAS', name: 'Kaspa' },
  { id: 'komodo', symbol: 'KMD', name: 'Komodo' },
  { id: 'lbry-credits', symbol: 'LBC', name: 'LBRY Credits' },
  { id: 'litecoin', symbol: 'LTC', name: 'Litecoin' },
  { id: 'litecoin-cash', symbol: 'LCC', name: 'Litecoin Cash' },
  { id: 'luckycoin', symbol: 'LKY', name: 'Luckycoin' },
  { id: 'marscoin', symbol: 'MARS', name: 'Marscoin' },
  { id: 'matrix-ai-network', symbol: 'MAN', name: 'Matrix AI Network' },
  { id: 'mimblewimblecoin', symbol: 'MWC', name: 'MimbleWimbleCoin' },
  { id: 'monacoin', symbol: 'MONA', name: 'MonaCoin' },
  { id: 'monero', symbol: 'XMR', name: 'Monero' },
  { id: 'myriad', symbol: 'XMY', name: 'MyriadCoin' },
  { id: 'namecoin', symbol: 'NMC', name: 'Namecoin' },
  { id: 'nervos-network', symbol: 'CKB', name: 'Nervos Network' },
  { id: 'nexa', symbol: 'NEXA', name: 'Nexa' },
  { id: 'nimiq', symbol: 'NIM', name: 'Nimiq' },
  { id: 'newyorkcoin', symbol: 'NYC', name: 'NewYorkCoin' },
  { id: 'omni', symbol: 'OMNI', name: 'Omni' },
  { id: 'pascal', symbol: 'PASC', name: 'Pascal' },
  { id: 'peercoin', symbol: 'PPC', name: 'Peercoin' },
  { id: 'phoenixcoin', symbol: 'PXC', name: 'Phoenixcoin' },
  { id: 'polis', symbol: 'POLIS', name: 'Polis' },
  { id: 'potcoin', symbol: 'POT', name: 'PotCoin' },
  { id: 'primecoin', symbol: 'XPM', name: 'Primecoin' },
  { id: 'quantum-resistant-ledger', symbol: 'QRL', name: 'Quantum Resistant Ledger' },
  { id: 'quark', symbol: 'QRK', name: 'QuarkCoin' },
  { id: 'qubic', symbol: 'QUBIC', name: 'Qubic' },
  { id: 'qubitcoin', symbol: 'QTC', name: 'Qubitcoin' },
  { id: 'radiant', symbol: 'RXD', name: 'Radiant' },
  { id: 'ravencoin', symbol: 'RVN', name: 'Ravencoin' },
  { id: 'scprime', symbol: 'SCP', name: 'ScPrime' },
  { id: 'siacoin', symbol: 'SC', name: 'Siacoin' },
  { id: 'stratis', symbol: 'STRAX', name: 'Stratis [New]' },
  { id: 'stronghands', symbol: 'SHND', name: 'StrongHands' },
  { id: 'syscoin', symbol: 'SYS', name: 'Syscoin' },
  { id: 'terracoin', symbol: 'TRC', name: 'Terracoin' },
  { id: 'unobtanium', symbol: 'UNO', name: 'Unobtanium' },
  { id: 'verge', symbol: 'XVG', name: 'Verge' },
  { id: 'vertcoin', symbol: 'VTC', name: 'Vertcoin' },
  { id: 'viacoin', symbol: 'VIA', name: 'Viacoin' },
  { id: 'zano', symbol: 'ZANO', name: 'Zano' },
  { id: 'zcash', symbol: 'ZEC', name: 'ZCash' },
  { id: 'zclassic', symbol: 'ZCL', name: 'ZClassic' },
  { id: 'zero', symbol: 'ZER', name: 'Zero' },
  { id: 'zetacoin', symbol: 'ZET', name: 'Zetacoin' }
];

export default PROOF_OF_WORK;

