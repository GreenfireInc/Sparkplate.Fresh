// Wallet Provider: Coinomi
// Source: https://www.coinomi.com/

import type { WalletProviderData } from './walletProviderData';

export const coinomiWalletData: WalletProviderData = {
  basicInfo: {
    name: 'Coinomi',
    slug: 'coinomi',
    description:
      'One of the longest-running self-custody multi-chain wallets (since 2014). Supports 125+ blockchains and 1,770+ tokens across mobile and desktop, with a built-in exchange aggregator and cross-chain swaps.',
    debutYear: 2014,
    creator: 'Coinomi Ltd.',
    headquarters: 'London, United Kingdom',
    website: 'https://www.coinomi.com/',
  },
  socialMedia: {
    twitter: 'https://twitter.com/CoinomiWallet',
    telegram: 'https://t.me/Coinomi',
    reddit: 'https://www.reddit.com/r/Coinomi/',
    youtube: 'https://www.youtube.com/@CoinomiOfficial',
    github: 'https://github.com/Coinomi',
    facebook: 'https://www.facebook.com/coinomiwallet',
    medium: 'https://medium.com/@Coinomi',
  },
  applicationTypes: ['desktop', 'mobile'],
  platformSupport: {
    desktop: {
      supported: true,
      operatingSystems: ['Windows', 'macOS', 'Linux'],
      downloadUrl: 'https://www.coinomi.com/en/downloads/',
    },
    mobile: {
      supported: true,
      operatingSystems: ['iOS', 'Android'],
      iosAppStoreUrl: 'https://apps.apple.com/app/coinomi-wallet/id1333588809',
      androidPlayStoreUrl:
        'https://play.google.com/store/apps/details?id=com.coinomi.wallet',
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
      'DOT',
      'ALGO',
      'XTZ',
      'ETC',
      'WAVES',
    ],
    additionalChains: [
      'Dash',
      'Zcash',
      'Monero (via watch-only)',
      'Polygon',
      'BNB Smart Chain',
      'Avalanche',
      'Fantom',
      'Cardano',
      'NEO',
      'Ontology',
    ],
    approximateTotalSupported: '125+ blockchains, 1,770+ tokens',
    notes:
      'One of the earliest multi-chain wallets. Strong Bitcoin-derivative support (Dash, Zcash, Groestlcoin, Decred, etc.). No browser extension or hardware-wallet integration.',
  },
  features: [
    'Built-in exchange aggregator (ChangeNOW, Changelly, SimpleSwap)',
    'Cross-chain swaps',
    'SegWit + Bech32 support for Bitcoin',
    'Strong-privacy mode (Tor-friendly, no IP logs)',
    'Custom tokens + custom networks',
    'Cold-staking (where supported by the chain)',
  ],
  openSource: false,
  custodial: false,
};

export default coinomiWalletData;
