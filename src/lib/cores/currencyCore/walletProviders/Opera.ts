// Wallet Provider: Opera Crypto Browser Wallet
// Source: https://www.opera.com/crypto-browser
// Built-in wallet of the Opera Crypto Browser (desktop) and Opera browser
// (Android). There is no standalone browser extension — the wallet is shipped
// with the browser itself.

import type { WalletProviderData } from './walletProviderData';

export const operaWalletData: WalletProviderData = {
  basicInfo: {
    name: 'Opera Crypto Browser Wallet',
    slug: 'opera',
    description:
      'Non-custodial wallet bundled inside the Opera Crypto Browser and Opera for Android. Supports Ethereum, EVM sidechains, Bitcoin, TRON, Solana, and Celo with native dApp + Web3 integration.',
    debutYear: 2018,
    creator: 'Opera Software AS',
    headquarters: 'Oslo, Norway',
    website: 'https://www.opera.com/crypto-browser',
  },
  socialMedia: {
    twitter: 'https://twitter.com/opera',
    reddit: 'https://www.reddit.com/r/operabrowser/',
    youtube: 'https://www.youtube.com/@opera',
    facebook: 'https://www.facebook.com/Opera',
    github: 'https://github.com/operasoftware',
  },
  applicationTypes: ['desktop', 'mobile'],
  platformSupport: {
    desktop: {
      supported: true,
      operatingSystems: ['Windows', 'macOS', 'Linux'],
      downloadUrl: 'https://www.opera.com/crypto-browser',
    },
    mobile: {
      supported: true,
      /* iOS "Opera" ships without the built-in crypto wallet due to App Store policy. */
      operatingSystems: ['Android'],
      androidPlayStoreUrl:
        'https://play.google.com/store/apps/details?id=com.opera.browser',
    },
    browserExtension: {
      supported: false,
      /* Ships inside the browser; no standalone extension. */
    },
    hardware: {
      supported: false,
    },
  },
  currencySupport: {
    isMultiCurrency: true,
    supportedTickers: ['ETH', 'BTC', 'TRX', 'SOL', 'BNB'],
    additionalChains: [
      'Polygon',
      'Celo',
      'StarkNet',
      'Bitcoin Lightning (partial)',
    ],
    approximateTotalSupported: 'ETH + major EVM chains, BTC, TRX, SOL, Celo',
    notes:
      'Different feature sets on desktop vs Android: StarkNet support is desktop-only; Bitcoin send is available on Android.',
  },
  features: [
    'Integrated Web3 / dApp browser',
    'Built-in crypto on-ramp (third-party)',
    'NFT gallery',
    'Free VPN bundled in Opera browser',
    'Crypto news + price sidebar',
  ],
  openSource: false,
  custodial: false,
};

export default operaWalletData;
