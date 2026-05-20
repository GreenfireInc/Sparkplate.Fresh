// Wallet Provider: Trust Wallet
// Source: https://trustwallet.com/ (Trust Wallet / Binance)

import type { WalletProviderData } from './walletProviderData';

export const trustWalletData: WalletProviderData = {
  basicInfo: {
    name: 'Trust Wallet',
    slug: 'trust',
    description:
      'Self-custody multi-chain wallet supporting 100+ blockchains and millions of tokens. Available on mobile and as a browser extension, with a built-in dApp browser, swap aggregator, staking, and NFT gallery.',
    debutYear: 2017,
    creator: 'Trust Wallet (acquired by Binance in 2018)',
    headquarters: 'Cayman Islands',
    website: 'https://trustwallet.com/',
  },
  socialMedia: {
    twitter: 'https://twitter.com/TrustWallet',
    telegram: 'https://t.me/trust_announcements',
    reddit: 'https://www.reddit.com/r/TrustApp/',
    youtube: 'https://www.youtube.com/@TrustWalletApp',
    github: 'https://github.com/trustwallet',
    discord: 'https://discord.gg/trustwallet',
    medium: 'https://community.trustwallet.com/',
    facebook: 'https://www.facebook.com/trustwalletapp',
  },
  applicationTypes: ['mobile', 'browserExtension'],
  platformSupport: {
    desktop: {
      supported: false,
    },
    mobile: {
      supported: true,
      operatingSystems: ['iOS', 'Android'],
      iosAppStoreUrl:
        'https://apps.apple.com/app/trust-crypto-bitcoin-wallet/id1288339409',
      androidPlayStoreUrl:
        'https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp',
    },
    browserExtension: {
      supported: true,
      browsers: ['Chrome', 'Brave', 'Edge', 'Opera'],
      chromeWebStoreUrl:
        'https://chromewebstore.google.com/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph',
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
      'SOL',
      'TRX',
      'BNB',
      'ALGO',
      'DOT',
      'XTZ',
    ],
    additionalChains: [
      'Polygon',
      'BNB Smart Chain',
      'Avalanche',
      'Arbitrum',
      'Optimism',
      'Base',
      'Cardano',
      'Aptos',
      'Sui',
      'Cosmos hub',
    ],
    approximateTotalSupported: '100+ blockchains, 10M+ tokens',
    notes:
      'First-party support for most L1 / L2 chains. Owned by Binance but remains a non-custodial wallet — keys are stored encrypted on the user device.',
  },
  features: [
    'In-app dApp browser (mobile)',
    'Multi-chain swap aggregator',
    'Staking (BNB, ATOM, SOL, TRX, XTZ, ALGO, etc.)',
    'NFT gallery (ERC-721, ERC-1155, BEP-721, Solana)',
    'Fiat on-ramp (MoonPay, Ramp, Transak)',
    'WalletConnect v2',
  ],
  openSource: true,
  custodial: false,
};

export default trustWalletData;
