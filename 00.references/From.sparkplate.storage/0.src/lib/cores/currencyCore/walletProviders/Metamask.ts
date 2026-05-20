// Wallet Provider: MetaMask
// Source: https://metamask.io/

import type { WalletProviderData } from './walletProviderData';

export const metamaskWalletData: WalletProviderData = {
  basicInfo: {
    name: 'MetaMask',
    slug: 'metamask',
    description:
      'The most widely-used self-custody wallet for Ethereum and EVM-compatible chains. Available as a browser extension and mobile app with an integrated dApp browser, swap aggregator, and staking.',
    debutYear: 2016,
    creator: 'ConsenSys Software Inc.',
    headquarters: 'Brooklyn, New York, USA',
    website: 'https://metamask.io/',
  },
  socialMedia: {
    twitter: 'https://twitter.com/MetaMask',
    reddit: 'https://www.reddit.com/r/Metamask/',
    youtube: 'https://www.youtube.com/@MetaMask',
    github: 'https://github.com/MetaMask',
    discord: 'https://discord.gg/consensys',
    medium: 'https://medium.com/metamask',
  },
  applicationTypes: ['mobile', 'browserExtension'],
  platformSupport: {
    desktop: {
      supported: false,
      /* No standalone desktop app — the extension runs inside the desktop browser. */
    },
    mobile: {
      supported: true,
      operatingSystems: ['iOS', 'Android'],
      iosAppStoreUrl: 'https://apps.apple.com/app/metamask/id1438144202',
      androidPlayStoreUrl:
        'https://play.google.com/store/apps/details?id=io.metamask',
    },
    browserExtension: {
      supported: true,
      browsers: ['Chrome', 'Firefox', 'Edge', 'Brave', 'Opera'],
      chromeWebStoreUrl:
        'https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
      firefoxAddonUrl:
        'https://addons.mozilla.org/firefox/addon/ether-metamask/',
      edgeAddonUrl:
        'https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm',
    },
    hardware: {
      supported: true,
      compatibleDevices: [
        'Ledger Nano S',
        'Ledger Nano X',
        'Trezor Model T',
        'Trezor One',
        'Keystone',
        'Lattice1',
        'AirGap Vault',
      ],
    },
  },
  currencySupport: {
    isMultiCurrency: true,
    specializedFor: 'ETH',
    supportedTickers: ['ETH', 'SOL', 'BTC'],
    additionalChains: [
      'Polygon',
      'Arbitrum',
      'Optimism',
      'Base',
      'Avalanche C-Chain',
      'BNB Smart Chain',
      'Linea',
      'zkSync Era',
      'Fantom',
      'Gnosis',
      'Celo',
      'Any EVM-compatible network via custom RPC',
    ],
    approximateTotalSupported: 'All EVM chains + Solana (2024) + Bitcoin (2025)',
    notes:
      'Historically Ethereum + EVM only. MetaMask Snaps (2023+) extends support to non-EVM chains; first-party Solana support launched in 2024 and Bitcoin in 2025.',
  },
  features: [
    'Web3 / dApp connector (EIP-1193 provider)',
    'Token & NFT management',
    'Swap aggregator (0x, Li.Fi, Airswap)',
    'Staking (ETH pooled staking, Lido)',
    'MetaMask Snaps plugin system',
    'MetaMask Portfolio (external dashboard)',
    'Hardware-wallet integration',
  ],
  openSource: true,
  custodial: false,
};

export default metamaskWalletData;
