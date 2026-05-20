// Wallet Provider: Temple Wallet
// Source: https://templewallet.com/ (Madfish Solutions)
// Single-chain wallet specialized for Tezos and its FA1.2 / FA2 tokens.

import type { WalletProviderData } from './walletProviderData';

export const templeWalletData: WalletProviderData = {
  basicInfo: {
    name: 'Temple Wallet',
    slug: 'temple',
    description:
      'Tezos-native self-custody wallet from Madfish Solutions. Supports XTZ, FA1.2 / FA2 tokens, Tezos NFTs, staking (baking / delegation), dApp connection, and Ledger hardware wallets.',
    debutYear: 2020,
    creator: 'Madfish Solutions',
    headquarters: 'Remote',
    website: 'https://templewallet.com/',
  },
  socialMedia: {
    twitter: 'https://twitter.com/TempleWallet',
    telegram: 'https://t.me/MadfishCommunity',
    reddit: 'https://www.reddit.com/r/TempleWallet/',
    youtube: 'https://www.youtube.com/@MadfishOfficial',
    github: 'https://github.com/madfish-solutions/templewallet-extension',
    discord: 'https://discord.gg/Kg8HKqHqJa',
    medium: 'https://madfish.medium.com/',
  },
  applicationTypes: ['mobile', 'browserExtension'],
  platformSupport: {
    desktop: {
      supported: false,
    },
    mobile: {
      supported: true,
      operatingSystems: ['iOS', 'Android'],
      iosAppStoreUrl: 'https://apps.apple.com/app/temple-tezos-wallet/id1606199673',
      androidPlayStoreUrl:
        'https://play.google.com/store/apps/details?id=com.templewallet',
    },
    browserExtension: {
      supported: true,
      browsers: ['Chrome', 'Firefox', 'Brave', 'Edge', 'Opera'],
      chromeWebStoreUrl:
        'https://chromewebstore.google.com/detail/temple-tezos-wallet-ex-th/ookjlbkiijinhpmnjffcofjonbfbgaoc',
      firefoxAddonUrl:
        'https://addons.mozilla.org/firefox/addon/templewallet/',
    },
    hardware: {
      supported: true,
      compatibleDevices: ['Ledger Nano S', 'Ledger Nano X', 'Ledger Nano S Plus'],
    },
  },
  currencySupport: {
    isMultiCurrency: false,
    specializedFor: 'XTZ',
    supportedTickers: ['XTZ'],
    approximateTotalSupported: 'XTZ + all FA1.2 / FA2 tokens on Tezos',
    notes:
      'Specialized for the Tezos ecosystem — does not manage Bitcoin / Ethereum / other chains. All token standards native to Tezos (FA1.2, FA2) are supported automatically.',
  },
  features: [
    'Tezos dApp connector (Beacon / TZIP-10)',
    'Built-in swap (Quipuswap aggregator)',
    'Baker delegation and staking',
    'Tezos NFT gallery (OBJKT / Teia)',
    'Ledger hardware support',
    'Multiple accounts from one seed',
  ],
  openSource: true,
  custodial: false,
};

export default templeWalletData;
