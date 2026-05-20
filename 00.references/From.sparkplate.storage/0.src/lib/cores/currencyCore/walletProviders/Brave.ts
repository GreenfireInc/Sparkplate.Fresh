// Wallet Provider: Brave Wallet
// Source: https://brave.com/wallet/ (Brave Software)
// Shipped built-in with the Brave browser on desktop and mobile; also
// available as a standalone browser extension in other Chromium browsers.

import type { WalletProviderData } from './walletProviderData';

export const braveWalletData: WalletProviderData = {
  basicInfo: {
    name: 'Brave Wallet',
    slug: 'brave',
    description:
      'Native self-custody wallet built into the Brave browser. Supports Ethereum + EVM chains, Solana, Bitcoin (read-only / send via Ledger), and Filecoin, with hardware-wallet integration.',
    debutYear: 2021,
    creator: 'Brave Software, Inc.',
    headquarters: 'San Francisco, California, USA',
    website: 'https://brave.com/wallet/',
  },
  socialMedia: {
    twitter: 'https://twitter.com/brave',
    reddit: 'https://www.reddit.com/r/brave_browser/',
    youtube: 'https://www.youtube.com/@BraveSoftware',
    github: 'https://github.com/brave/brave-browser',
    discord: 'https://community.brave.com/',
  },
  applicationTypes: ['desktop', 'mobile', 'browserExtension'],
  platformSupport: {
    desktop: {
      supported: true,
      operatingSystems: ['Windows', 'macOS', 'Linux'],
      downloadUrl: 'https://brave.com/download/',
      /* Shipped inside the Brave browser itself. */
    },
    mobile: {
      supported: true,
      operatingSystems: ['iOS', 'Android'],
      iosAppStoreUrl:
        'https://apps.apple.com/app/brave-private-web-browser/id1052879175',
      androidPlayStoreUrl:
        'https://play.google.com/store/apps/details?id=com.brave.browser',
    },
    browserExtension: {
      supported: true,
      browsers: ['Brave', 'Chrome', 'Firefox', 'Edge'],
      /* Built into Brave; a standalone extension for other browsers is also offered. */
    },
    hardware: {
      supported: true,
      compatibleDevices: ['Ledger Nano S', 'Ledger Nano X', 'Trezor Model T', 'Trezor One'],
    },
  },
  currencySupport: {
    isMultiCurrency: true,
    supportedTickers: ['ETH', 'BTC', 'SOL', 'BNB'],
    additionalChains: [
      'Polygon',
      'Avalanche C-Chain',
      'Arbitrum',
      'Optimism',
      'Fantom',
      'Celo',
      'zkSync Era',
      'Base',
      'Filecoin',
    ],
    approximateTotalSupported: 'All EVM chains + Solana + Bitcoin + Filecoin',
    notes:
      'Primary focus is EVM + Solana. Bitcoin support is limited to receive / send with a connected hardware device (Ledger).',
  },
  features: [
    'Native in-browser wallet (no extension required in Brave)',
    'Hardware wallet support (Ledger, Trezor)',
    'NFT gallery',
    'DApp / Web3 connect',
    'Swap aggregator (0x / Jupiter)',
    'Token & network auto-detection',
  ],
  openSource: true,
  custodial: false,
};

export default braveWalletData;
