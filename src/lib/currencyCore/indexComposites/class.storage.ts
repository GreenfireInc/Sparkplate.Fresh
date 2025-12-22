/**
 * Storage Currencies Index - Decentralized storage and data protocol cryptocurrencies
 * 
 * This list contains cryptocurrencies and tokens associated with decentralized storage
 * networks, data protocols, and distributed computing platforms. These assets power
 * various storage solutions, CDN networks, archival systems, and data infrastructure.
 * 
 * This index is used for storage-related integrations, protocol support, and
 * currency selection interfaces for decentralized storage features.
 * 
 * Last Updated: December 2025
 */

export type CurrencyType = 'coin' | 'token';

export interface StorageCurrencyItem {
  id: string;
  name: string;
  tickerSymbol: string;
  currencyType: CurrencyType;
  network: string | string[] | null;
  website: string | null;
  github: string | null;
  npm: string | null;
}

export const STORAGE_CURRENCIES: StorageCurrencyItem[] = [
  {
    id: 'aioz-network',
    name: 'AIOZ Network',
    tickerSymbol: 'AIOZ',
    currencyType: 'coin',
    network: null,
    website: 'https://aioz.network/',
    github: 'https://github.com/AIOZNetwork',
    npm: null
  },
  {
    id: 'aleph-cloud',
    name: 'Aleph Cloud',
    tickerSymbol: 'ALEPH',
    currencyType: 'token',
    network: ['Ethereum', 'Solana', 'Polkadot/Substrate', 'Cosmos'],
    website: 'https://aleph.im/',
    github: 'https://github.com/aleph-im',
    npm: 'aleph-js'
  },
  {
    id: 'archivas',
    name: 'Archivas',
    tickerSymbol: 'RCHV',
    currencyType: 'token',
    network: 'Ethereum',
    website: null,
    github: null,
    npm: null
  },
  {
    id: 'arweave',
    name: 'Arweave',
    tickerSymbol: 'AR',
    currencyType: 'coin',
    network: null,
    website: 'https://www.arweave.org/',
    github: 'https://github.com/ArweaveTeam',
    npm: 'arweave'
  },
  {
    id: 'augur',
    name: 'Augur',
    tickerSymbol: 'REP',
    currencyType: 'token',
    network: 'Ethereum',
    website: 'https://www.augur.net/',
    github: 'https://github.com/AugurProject',
    npm: null
  },
  {
    id: 'bittorrent-new',
    name: 'BitTorrent (New)',
    tickerSymbol: 'BTT',
    currencyType: 'token',
    network: 'Tron',
    website: 'https://www.bittorrent.com/',
    github: 'https://github.com/TRON-US',
    npm: null
  },
  {
    id: 'bluzelle',
    name: 'Bluzelle',
    tickerSymbol: 'BLZ',
    currencyType: 'coin',
    network: null,
    website: 'https://www.bluzelle.com/',
    github: 'https://github.com/bluzelle',
    npm: null
  },
  {
    id: 'cess-network',
    name: 'CESS Network',
    tickerSymbol: 'CESS',
    currencyType: 'coin',
    network: null,
    website: 'https://cess.cloud/',
    github: 'https://github.com/CESSProject',
    npm: null
  },
  {
    id: 'coldstack',
    name: 'Coldstack',
    tickerSymbol: 'CLS',
    currencyType: 'token',
    network: 'Ethereum',
    website: 'https://coldstack.io/',
    github: 'https://github.com/coldstack',
    npm: null
  },
  {
    id: 'crust-network',
    name: 'Crust Network',
    tickerSymbol: 'CRU',
    currencyType: 'coin',
    network: null,
    website: 'https://crust.network/',
    github: 'https://github.com/crustio',
    npm: null
  },
  {
    id: 'dat-protocol',
    name: 'Dat Protocol',
    tickerSymbol: 'DAT',
    currencyType: 'token',
    network: 'Ethereum',
    website: 'https://datprotocol.org/',
    github: 'https://github.com/datproject',
    npm: 'dat-node'
  },
  {
    id: 'dmail-network',
    name: 'DMAIL Network',
    tickerSymbol: 'DMAIL',
    currencyType: 'token',
    network: ['Ethereum', 'BNB Chain'],
    website: 'https://dmail.ai/',
    github: 'https://github.com/dmailofficial',
    npm: null
  },
  {
    id: 'edge',
    name: 'Edge',
    tickerSymbol: 'EDGE',
    currencyType: 'coin',
    network: null,
    website: 'https://edge.com/',
    github: null,
    npm: null
  },
  {
    id: 'epik-protocol',
    name: 'EpiK Protocol',
    tickerSymbol: 'AIEPK',
    currencyType: 'token',
    network: 'Ethereum',
    website: 'https://epik-protocol.io/',
    github: 'https://github.com/EpiK-Protocol',
    npm: null
  },
  {
    id: 'etho-protocol',
    name: 'Etho Protocol',
    tickerSymbol: 'ETHO',
    currencyType: 'coin',
    network: null,
    website: 'https://ethoprotocol.com/',
    github: 'https://github.com/Ether1Project',
    npm: null
  },
  {
    id: 'filecoin',
    name: 'Filecoin',
    tickerSymbol: 'FIL',
    currencyType: 'coin',
    network: null,
    website: 'https://filecoin.io/',
    github: 'https://github.com/filecoin-project',
    npm: '@filecoin-shipyard/js-filecoin-api-client'
  },
  {
    id: 'filestar',
    name: 'FileStar',
    tickerSymbol: 'STAR',
    currencyType: 'coin',
    network: null,
    website: 'https://filestar.com/',
    github: 'https://github.com/filestar-project',
    npm: null
  },
  {
    id: 'flux',
    name: 'Flux',
    tickerSymbol: 'FLUX',
    currencyType: 'coin',
    network: null,
    website: 'https://runonflux.io/',
    github: 'https://github.com/runonflux',
    npm: null
  },
  {
    id: 'folder-protocol',
    name: 'Folder Protocol',
    tickerSymbol: 'FOL',
    currencyType: 'token',
    network: 'Ethereum',
    website: null,
    github: null,
    npm: null
  },
  {
    id: 'functionland',
    name: 'Functionland',
    tickerSymbol: 'FULA',
    currencyType: 'token',
    network: 'Ethereum',
    website: 'https://functionland.org/',
    github: 'https://github.com/functionland',
    npm: null
  },
  {
    id: 'handshake',
    name: 'Handshake',
    tickerSymbol: 'HNS',
    currencyType: 'coin',
    network: null,
    website: 'https://handshake.org/',
    github: 'https://github.com/handshake-org',
    npm: null
  },
  {
    id: 'holo',
    name: 'Holo',
    tickerSymbol: 'HOT',
    currencyType: 'token',
    network: 'Ethereum',
    website: 'https://holo.host/',
    github: 'https://github.com/holochain',
    npm: null
  },
  {
    id: 'iagon',
    name: 'IAGON',
    tickerSymbol: 'IAG',
    currencyType: 'token',
    network: 'Cardano',
    website: 'https://iagon.com/',
    github: 'https://github.com/iagonnetwork',
    npm: null
  },
  {
    id: 'iexec-rlc',
    name: 'iExec RLC',
    tickerSymbol: 'RLC',
    currencyType: 'token',
    network: 'Ethereum',
    website: 'https://iex.ec/',
    github: 'https://github.com/iExecBlockchainComputing',
    npm: null
  },
  {
    id: 'impossible-cloud-network',
    name: 'Impossible Cloud Network',
    tickerSymbol: 'ICNT',
    currencyType: 'token',
    network: 'Ethereum',
    website: 'https://impossible.cloud/',
    github: null,
    npm: null
  },
  {
    id: 'internxt',
    name: 'Internxt',
    tickerSymbol: 'INXT',
    currencyType: 'token',
    network: 'Ethereum',
    website: 'https://internxt.com/',
    github: 'https://github.com/internxt',
    npm: null
  },
  {
    id: 'jackal-protocol',
    name: 'Jackal Protocol',
    tickerSymbol: 'JKL',
    currencyType: 'coin',
    network: null,
    website: 'https://jackalprotocol.com/',
    github: 'https://github.com/JackalProtocol',
    npm: null
  },
  {
    id: 'knoxfs',
    name: 'KnoxFS',
    tickerSymbol: 'KFX',
    currencyType: 'token',
    network: 'Ethereum',
    website: null,
    github: null,
    npm: null
  },
  {
    id: 'kyve-network',
    name: 'KYVE Network',
    tickerSymbol: 'KYVE',
    currencyType: 'coin',
    network: null,
    website: 'https://kyve.network/',
    github: 'https://github.com/KYVENetwork',
    npm: null
  },
  {
    id: 'lambda',
    name: 'Lambda',
    tickerSymbol: 'LAMB',
    currencyType: 'token',
    network: 'Ethereum',
    website: 'https://lambdalabs.io/',
    github: 'https://github.com/LambdaIM',
    npm: null
  },
  {
    id: 'limewire',
    name: 'LimeWire',
    tickerSymbol: 'LMWR',
    currencyType: 'token',
    network: ['Ethereum', 'Polygon'],
    website: 'https://limewire.com/',
    github: 'https://github.com/limewire',
    npm: null
  },
  {
    id: 'maidsafecoin',
    name: 'MaidSafeCoin',
    tickerSymbol: 'MAID',
    currencyType: 'token',
    network: 'Omni',
    website: 'https://maidsafe.net/',
    github: 'https://github.com/maidsafe',
    npm: null
  },
  {
    id: 'meson-network',
    name: 'Meson Network',
    tickerSymbol: 'MSN',
    currencyType: 'token',
    network: 'Ethereum',
    website: 'https://meson.network/',
    github: 'https://github.com/daqnext',
    npm: null
  },
  {
    id: 'nuco-cloud',
    name: 'Nuco.cloud',
    tickerSymbol: 'NCDT',
    currencyType: 'token',
    network: 'Ethereum',
    website: 'https://nuco.cloud/',
    github: null,
    npm: null
  },
  {
    id: 'ocean-protocol',
    name: 'Ocean Protocol',
    tickerSymbol: 'OCEAN',
    currencyType: 'token',
    network: ['Ethereum', 'Polygon'],
    website: 'https://oceanprotocol.com/',
    github: 'https://github.com/oceanprotocol',
    npm: '@oceanprotocol/lib'
  },
  {
    id: 'odin-protocol',
    name: 'Odin Protocol',
    tickerSymbol: 'ODIN',
    currencyType: 'token',
    network: 'Ethereum',
    website: 'https://odinprotocol.io/',
    github: 'https://github.com/odinprotocol',
    npm: null
  },
  {
    id: 'opacity',
    name: 'Opacity',
    tickerSymbol: 'OPCT',
    currencyType: 'token',
    network: 'Ethereum',
    website: 'https://opacity.io/',
    github: 'https://github.com/opacity',
    npm: null
  },
  {
    id: 'pac-protocol',
    name: 'PAC Protocol',
    tickerSymbol: 'PAC',
    currencyType: 'coin',
    network: null,
    website: 'https://www.pacprotocol.com/',
    github: 'https://github.com/PACProtocol',
    npm: null
  },
  {
    id: 'phantasma',
    name: 'Phantasma',
    tickerSymbol: 'SOUL',
    currencyType: 'coin',
    network: null,
    website: 'https://phantasma.io/',
    github: 'https://github.com/phantasma-io',
    npm: null
  },
  {
    id: 'psjglobal',
    name: 'PSJGlobal',
    tickerSymbol: 'CYCON',
    currencyType: 'token',
    network: 'Ethereum',
    website: null,
    github: null,
    npm: null
  },
  {
    id: 'scprime',
    name: 'ScPrime',
    tickerSymbol: 'SCP',
    currencyType: 'coin',
    network: null,
    website: 'https://scpri.me/',
    github: 'https://github.com/ScPrime',
    npm: null
  },
  {
    id: 'shadow-token',
    name: 'Shadow Token',
    tickerSymbol: 'SHDW',
    currencyType: 'token',
    network: 'Solana',
    website: 'https://genesysgo.com/',
    github: 'https://github.com/GenesysGo',
    npm: null
  },
  {
    id: 'sharder',
    name: 'Sharder',
    tickerSymbol: 'SS',
    currencyType: 'token',
    network: 'Ethereum',
    website: 'https://sharder.org/',
    github: 'https://github.com/Sharders',
    npm: null
  },
  {
    id: 'shift',
    name: 'Shift',
    tickerSymbol: 'SHIFT',
    currencyType: 'coin',
    network: null,
    website: 'https://shiftproject.io/',
    github: 'https://github.com/shiftproject',
    npm: null
  },
  {
    id: 'siacoin',
    name: 'Siacoin',
    tickerSymbol: 'SC',
    currencyType: 'coin',
    network: null,
    website: 'https://sia.tech/',
    github: 'https://github.com/SiaFoundation',
    npm: null
  },
  {
    id: 'simple-software-solutions',
    name: 'Simple Software Solutions',
    tickerSymbol: 'SSS',
    currencyType: 'token',
    network: 'Ethereum',
    website: null,
    github: null,
    npm: null
  },
  {
    id: 'sinovate',
    name: 'SINOVATE',
    tickerSymbol: 'SIN',
    currencyType: 'coin',
    network: null,
    website: 'https://sinovate.io/',
    github: 'https://github.com/SINOVATEblockchain',
    npm: null
  },
  {
    id: 'sirius-chain',
    name: 'Sirius Chain',
    tickerSymbol: 'XPX',
    currencyType: 'coin',
    network: null,
    website: 'https://siriuschain.io/',
    github: 'https://github.com/proximax-storage',
    npm: null
  },
  {
    id: 'skale',
    name: 'SKALE',
    tickerSymbol: 'SKL',
    currencyType: 'token',
    network: 'Ethereum',
    website: 'https://skale.network/',
    github: 'https://github.com/skalenetwork',
    npm: '@skalenetwork/skale.js'
  },
  {
    id: 'skycoin',
    name: 'Skycoin',
    tickerSymbol: 'SKY',
    currencyType: 'coin',
    network: null,
    website: 'https://www.skycoin.com/',
    github: 'https://github.com/skycoin',
    npm: null
  },
  {
    id: 'solbox',
    name: 'SolBox',
    tickerSymbol: 'SOLBOX',
    currencyType: 'token',
    network: 'Solana',
    website: null,
    github: null,
    npm: null
  },
  {
    id: 'storagechain',
    name: 'StorageChain',
    tickerSymbol: 'WSTOR',
    currencyType: 'token',
    network: 'Ethereum',
    website: null,
    github: null,
    npm: null
  },
  {
    id: 'storj',
    name: 'Storj',
    tickerSymbol: 'STORJ',
    currencyType: 'token',
    network: 'Ethereum',
    website: 'https://www.storj.io/',
    github: 'https://github.com/storj',
    npm: '@storj/storj'
  },
  {
    id: 'storx-network',
    name: 'StorX Network',
    tickerSymbol: 'SRX',
    currencyType: 'token',
    network: 'Ethereum',
    website: 'https://storx.io/',
    github: 'https://github.com/StorXNetwork',
    npm: null
  },
  {
    id: 'stratos',
    name: 'Stratos',
    tickerSymbol: 'STOS',
    currencyType: 'coin',
    network: null,
    website: 'https://stratos.network/',
    github: 'https://github.com/stratosnet',
    npm: null
  },
  {
    id: 'swarm',
    name: 'Swarm',
    tickerSymbol: 'BZZ',
    currencyType: 'token',
    network: 'Ethereum',
    website: 'https://www.ethswarm.org/',
    github: 'https://github.com/ethersphere',
    npm: '@ethersphere/bee-js'
  },
  {
    id: 'tapx',
    name: 'Tapx',
    tickerSymbol: 'TAP',
    currencyType: 'token',
    network: 'Ethereum',
    website: null,
    github: null,
    npm: null
  },
  {
    id: 'threefold',
    name: 'ThreeFold',
    tickerSymbol: 'TFT',
    currencyType: 'coin',
    network: null,
    website: 'https://threefold.io/',
    github: 'https://github.com/threefoldtech',
    npm: null
  },
  {
    id: 'verida',
    name: 'Verida',
    tickerSymbol: 'VDA',
    currencyType: 'token',
    network: 'Ethereum',
    website: 'https://www.verida.io/',
    github: 'https://github.com/verida',
    npm: null
  },
  {
    id: 'walrus',
    name: 'Walrus',
    tickerSymbol: 'WAL',
    currencyType: 'coin',
    network: null,
    website: null,
    github: null,
    npm: null
  },
  {
    id: 'wesendit',
    name: 'WeSendit',
    tickerSymbol: 'WSI',
    currencyType: 'token',
    network: 'Ethereum',
    website: 'https://wesendit.io/',
    github: null,
    npm: null
  },
  {
    id: 'zus',
    name: 'Zus',
    tickerSymbol: 'ZCN',
    currencyType: 'token',
    network: 'Ethereum',
    website: 'https://www.zus.network/',
    github: 'https://github.com/0chain',
    npm: null
  }
];

export default STORAGE_CURRENCIES;
