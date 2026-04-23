// Wallet Provider: Exodus
// Source: https://www.exodus.com/

import type { WalletProviderData } from './walletProviderData';

export const exodusWalletData: WalletProviderData = {
  basicInfo: {
    name: 'Exodus',
    slug: 'exodus',
    description:
      'Self-custody multi-currency wallet that runs on desktop, mobile, and as a browser extension. Built-in swap aggregator, portfolio tracker, staking, and Trezor hardware-wallet integration.',
    debutYear: 2015,
    creator: 'Exodus Movement, Inc.',
    headquarters: 'Omaha, Nebraska, USA',
    website: 'https://www.exodus.com/',
  },
  socialMedia: {
    twitter: 'https://twitter.com/exodus_io',
    reddit: 'https://www.reddit.com/r/ExodusWallet/',
    youtube: 'https://www.youtube.com/@exodusmovement',
    github: 'https://github.com/ExodusMovement',
    discord: 'https://discord.gg/ExodusMovement',
    medium: 'https://medium.com/exodus-movement',
  },
  applicationTypes: ['desktop', 'mobile', 'browserExtension'],
  platformSupport: {
    desktop: {
      supported: true,
      operatingSystems: ['Windows', 'macOS', 'Linux'],
      downloadUrl: 'https://www.exodus.com/download/',
    },
    mobile: {
      supported: true,
      operatingSystems: ['iOS', 'Android'],
      iosAppStoreUrl:
        'https://apps.apple.com/app/exodus-crypto-bitcoin-wallet/id1414384820',
      androidPlayStoreUrl:
        'https://play.google.com/store/apps/details?id=exodusmovement.exodus',
    },
    browserExtension: {
      supported: true,
      browsers: ['Chrome', 'Brave', 'Edge'],
      chromeWebStoreUrl:
        'https://chromewebstore.google.com/detail/exodus-web3-wallet/aholpfdialjgjfhomihkjbmgjidlcdno',
    },
    hardware: {
      supported: true,
      compatibleDevices: ['Trezor Model T', 'Trezor One'],
    },
  },
  currencySupport: {
    isMultiCurrency: true,
    supportedTickers: [
      'BTC',
      'ETH',
      'LTC',
      'BCH',
      'DOGE',
      'XRP',
      'XLM',
      'ATOM',
      'SOL',
      'TRX',
      'BNB',
      'ALGO',
      'DOT',
      'XTZ',
    ],
    additionalChains: ['Polygon', 'Avalanche', 'Cardano', 'NEAR', 'Ripple'],
    approximateTotalSupported: '260+',
    notes:
      'FTX integration was removed in 2022. Desktop and mobile apps keep wallets in sync via optional encrypted backup.',
  },
  features: [
    'Built-in swap aggregator (THORChain / partners)',
    'Portfolio tracker & price charts',
    'Staking for selected chains (ATOM, SOL, ADA, ALGO, etc.)',
    'Trezor hardware integration',
    'NFT gallery (Solana, Ethereum)',
  ],
  openSource: false,
  custodial: false,
};

export default exodusWalletData;
