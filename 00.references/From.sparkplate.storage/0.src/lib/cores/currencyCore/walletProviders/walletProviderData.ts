// Wallet Provider data structure
// Describes non-custodial / self-custody cryptocurrency wallet products.
// Compiled from public marketing pages, docs, and app-store listings.

import type { SupportedTicker } from '../currencies';

/** Where a wallet product is available */
export type WalletApplicationType =
  | 'desktop'
  | 'mobile'
  | 'browserExtension'
  | 'web'
  | 'hardware';

export type DesktopOS = 'Windows' | 'macOS' | 'Linux';
export type MobileOS = 'iOS' | 'Android';
export type SupportedBrowser =
  | 'Chrome'
  | 'Firefox'
  | 'Edge'
  | 'Brave'
  | 'Opera'
  | 'Safari';

export interface DesktopSupport {
  supported: boolean;
  operatingSystems?: DesktopOS[];
  downloadUrl?: string;
}

export interface MobileSupport {
  supported: boolean;
  operatingSystems?: MobileOS[];
  iosAppStoreUrl?: string;
  androidPlayStoreUrl?: string;
}

export interface BrowserExtensionSupport {
  supported: boolean;
  browsers?: SupportedBrowser[];
  chromeWebStoreUrl?: string;
  firefoxAddonUrl?: string;
  edgeAddonUrl?: string;
}

export interface WebSupport {
  supported: boolean;
  url?: string;
}

export interface HardwareSupport {
  supported: boolean;
  /** Compatible external hardware wallet devices, if any (e.g. "Ledger Nano S"). */
  compatibleDevices?: string[];
  notes?: string;
}

export interface PlatformSupport {
  desktop: DesktopSupport;
  mobile: MobileSupport;
  browserExtension: BrowserExtensionSupport;
  web?: WebSupport;
  hardware?: HardwareSupport;
}

export interface SocialMedia {
  twitter?: string;
  telegram?: string;
  discord?: string;
  reddit?: string;
  github?: string;
  youtube?: string;
  medium?: string;
  facebook?: string;
  linkedin?: string;
}

export interface CurrencySupport {
  /** True when the wallet manages assets across multiple chains. */
  isMultiCurrency: boolean;
  /**
   * When the wallet is specialized for a single ecosystem (e.g. Temple → XTZ),
   * this is the primary ticker it is built around.
   */
  specializedFor?: SupportedTicker | string;
  /**
   * Tickers supported by the wallet that also exist in our currencies catalog
   * (see `src/lib/cores/currencyCore/currencies`). This is intentionally a
   * curated subset — not an exhaustive list of every token the wallet can hold.
   */
  supportedTickers: (SupportedTicker | string)[];
  /**
   * Approximate total number of coins / tokens the wallet advertises support
   * for, e.g. "500+", "70+ blockchains", "10M+ tokens".
   */
  approximateTotalSupported?: string | number;
  /** EVM / L1 chains the wallet supports natively, outside of our ticker list. */
  additionalChains?: string[];
  notes?: string;
}

export interface WalletProviderData {
  basicInfo: {
    /** Public brand name, e.g. "MetaMask", "Atomic Wallet". */
    name: string;
    /** Short slug for lookups / URLs, e.g. "metamask". */
    slug: string;
    /** 1–2 sentence description. */
    description: string;
    /** Year the product was first released publicly. */
    debutYear?: number;
    /** Company or team that builds the wallet. */
    creator?: string;
    /** Headquarters or legal jurisdiction if publicly known. */
    headquarters?: string;
    /** Canonical marketing website. */
    website: string;
  };
  socialMedia: SocialMedia;
  /**
   * High-level list of application form factors the wallet ships.
   * Use `platformSupport` for detailed OS / browser coverage.
   */
  applicationTypes: WalletApplicationType[];
  platformSupport: PlatformSupport;
  currencySupport: CurrencySupport;
  /** Notable product features (staking, swap, NFT, dApp browser, etc.). */
  features?: string[];
  /** True for wallets whose codebase is fully open source. */
  openSource?: boolean;
  /**
   * True when the wallet custodies user keys (uncommon for the wallets we
   * describe here — most are self-custody). Left undefined when irrelevant.
   */
  custodial?: boolean;
}
