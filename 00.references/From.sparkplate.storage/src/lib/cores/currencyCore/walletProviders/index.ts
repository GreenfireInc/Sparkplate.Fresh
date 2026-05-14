// Wallet Providers Index
// Self-custody wallet product catalog. Each entry describes a consumer wallet
// brand (desktop / mobile / browser extension) and which assets it supports.

import type { WalletProviderData } from './walletProviderData';
import { atomicWalletData } from './Atomic';
import { braveWalletData } from './Brave';
import { coinomiWalletData } from './Coinomi';
import { exodusWalletData } from './Exodus';
import { metamaskWalletData } from './Metamask';
import { operaWalletData } from './Opera';
import { templeWalletData } from './Temple';
import { trustWalletData } from './Trust';

export {
  atomicWalletData,
  braveWalletData,
  coinomiWalletData,
  exodusWalletData,
  metamaskWalletData,
  operaWalletData,
  templeWalletData,
  trustWalletData,
};

export type {
  WalletProviderData,
  WalletApplicationType,
  PlatformSupport,
  DesktopSupport,
  MobileSupport,
  BrowserExtensionSupport,
  WebSupport,
  HardwareSupport,
  SocialMedia,
  CurrencySupport,
  DesktopOS,
  MobileOS,
  SupportedBrowser,
} from './walletProviderData';

/** Canonical slug for each wallet product we ship data for. */
export type SupportedWalletProvider =
  | 'atomic'
  | 'brave'
  | 'coinomi'
  | 'exodus'
  | 'metamask'
  | 'opera'
  | 'temple'
  | 'trust';

/** Array of every wallet provider, handy for iteration / rendering lists. */
export const allWalletProviders: WalletProviderData[] = [
  atomicWalletData,
  braveWalletData,
  coinomiWalletData,
  exodusWalletData,
  metamaskWalletData,
  operaWalletData,
  templeWalletData,
  trustWalletData,
];

/** Lookup by slug (the value of `basicInfo.slug`). */
export const walletProviderBySlug: Record<SupportedWalletProvider, WalletProviderData> = {
  atomic: atomicWalletData,
  brave: braveWalletData,
  coinomi: coinomiWalletData,
  exodus: exodusWalletData,
  metamask: metamaskWalletData,
  opera: operaWalletData,
  temple: templeWalletData,
  trust: trustWalletData,
};

/** Lookup by display name (`basicInfo.name`). */
export const walletProviderByName: Record<string, WalletProviderData> = {
  [atomicWalletData.basicInfo.name]: atomicWalletData,
  [braveWalletData.basicInfo.name]: braveWalletData,
  [coinomiWalletData.basicInfo.name]: coinomiWalletData,
  [exodusWalletData.basicInfo.name]: exodusWalletData,
  [metamaskWalletData.basicInfo.name]: metamaskWalletData,
  [operaWalletData.basicInfo.name]: operaWalletData,
  [templeWalletData.basicInfo.name]: templeWalletData,
  [trustWalletData.basicInfo.name]: trustWalletData,
};
