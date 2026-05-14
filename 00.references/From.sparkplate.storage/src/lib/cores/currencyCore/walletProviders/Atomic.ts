// Wallet Provider: Atomic Wallet
// Source: https://atomicwallet.io/ (website, docs, app-store listings)

import type { WalletProviderData } from './walletProviderData';

export const atomicWalletData: WalletProviderData = {
  basicInfo: {
    name: 'Atomic Wallet',
    slug: 'atomic',
    description:
      'Self-custody multi-currency wallet with built-in atomic swaps, staking, and a third-party exchange / buy-crypto aggregator. Keys are encrypted locally and never leave the device.',
    debutYear: 2018,
    creator: 'Atomic Wallet',
    headquarters: 'Tallinn, Estonia',
    website: 'https://atomicwallet.io/',
  },
  socialMedia: {
    twitter: 'https://twitter.com/atomicwallet',
    telegram: 'https://t.me/atomicwalletchat',
    reddit: 'https://www.reddit.com/r/AtomicWallet/',
    youtube: 'https://www.youtube.com/c/AtomicWallet',
    medium: 'https://medium.com/@atomicwallet',
    facebook: 'https://www.facebook.com/atomicwallet',
  },
  applicationTypes: ['desktop', 'mobile'],
  platformSupport: {
    desktop: {
      supported: true,
      operatingSystems: ['Windows', 'macOS', 'Linux'],
      downloadUrl: 'https://atomicwallet.io/downloads',
    },
    mobile: {
      supported: true,
      operatingSystems: ['iOS', 'Android'],
      iosAppStoreUrl: 'https://apps.apple.com/app/atomic-wallet/id1478257827',
      androidPlayStoreUrl:
        'https://play.google.com/store/apps/details?id=io.atomicwallet',
    },
    browserExtension: {
      supported: false,
    },
    hardware: {
      supported: false,
    },
  },
  currencySupport: {
    isMultiCurrency: true,
    supportedTickers: [
      'BTC',
      'ETH',
      'BCH',
      'LTC',
      'DOGE',
      'XRP',
      'XLM',
      'ATOM',
      'TRX',
      'BNB',
      'SOL',
      'ALGO',
      'DOT',
      'XTZ',
    ],
    approximateTotalSupported: '1000+',
    additionalChains: ['Avalanche', 'Polygon', 'Cardano', 'NEAR', 'Zcash'],
    notes:
      'Ships with built-in atomic swap pairs for select assets; other assets use third-party exchange aggregators (Changelly, ChangeNOW, Simplex).',
  },
  features: [
    'Atomic swaps (DEX)',
    'In-wallet staking (ATOM, TRX, SOL, XTZ, ALGO, etc.)',
    'Buy crypto with card (third-party)',
    'Built-in portfolio view',
  ],
  openSource: false,
  custodial: false,
};

export default atomicWalletData;
