// Common interfaces for all currency data
// These interfaces define the structure for currency information

export interface DerivedInfo {
  publicKey: string;
  publicKeyUncompressed?: string;
  address: string;
  // Optional fields for extended format information (used by Bitcoin)
  format?: string;
  formatDescription?: string;
  // Optional field for the actual derived private key (used by STX for seed phrases)
  derivedPrivateKey?: string;
  // Optional fields for multi-format addresses (used by Polkadot and Litecoin)
  formattedDisplay?: string;
  // Polkadot network addresses
  polkadotAddress?: string;
  kusamaAddress?: string;
  substrateAddress?: string;
  // Litecoin format addresses
  p2pkhAddress?: string;
  p2shAddress?: string;
  p2wpkhAddress?: string;
  // Bitcoin format addresses
  p2trAddress?: string;
  // Stacks format addresses
  mainnetAddress?: string;
  testnetAddress?: string;
  nativeSegwitAddress?: string;
  taprootAddress?: string;
  // Backward compatibility aliases
  rawPolkadotAddress?: string;
  rawKusamaAddress?: string;
  rawSubstrateAddress?: string;
  rawP2PKHAddress?: string;
  rawP2SHAddress?: string;
  rawP2WPKHAddress?: string;
  rawP2TRAddress?: string;
  rawMainnetAddress?: string;
  rawTestnetAddress?: string;
  rawNativeSegwitAddress?: string;
  rawTaprootAddress?: string;
}

// Keystore structure interface
export interface KeystoreData {
  version?: number | string;
  cipher?: string;
  ciphertext?: string;
  cipherparams?: {
    iv?: string;
  };
  kdf?: string;
  kdfparams?: {
    n?: number;
    r?: number;
    p?: number;
    dklen?: number;
    salt?: string;
  };
  mac?: string;
  crypto?: {
    cipher?: string;
    ciphertext?: string;
    cipherparams?: {
      iv?: string;
    };
    kdf?: string;
    kdfparams?: Record<string, unknown>;
    mac?: string;
  };
  [key: string]: unknown; // Allow additional properties
}

// Import wallet result interface
export interface ImportWalletResult {
  privateKey?: string;
  publicKey?: string;
  address?: string;
  mnemonic?: string;
  derivedInfo?: DerivedInfo;
  [key: string]: unknown; // Allow additional properties
}

export interface CurrencyData {
  basicInfo: BasicInfo;
  technicalInfo: TechnicalInfo;
  marketInfo: MarketInfo;
  socialMedia: SocialMedia;
  identifiers: Identifiers;
  blockExplorer: BlockExplorer;
  dex?: DEXInfo[];
  stakingProviders?: StakingProvider[];
  miningPools?: string | MiningPool[];
  deriveFromPrivateKey?: (privateKey: string, ...options: unknown[]) => Promise<DerivedInfo>;
  decryptKeystore?: (keystore: KeystoreData, password: string) => Promise<string>;
  exportKeystore?: (privateKey: string, password: string, metadata?: { name?: string; address?: string }) => Promise<object>;
  importWallet?: (input: unknown) => Promise<ImportWalletResult>;
  getBlockExplorerLink?: (address: string, format?: string) => string | null;
  
  // Transaction-related functions (optional, currency-specific)
  generateWalletFromSeed?: (seed: Uint8Array, derivationIndex?: number, network?: string) => Promise<unknown>;
  importWalletFromWIF?: (wif: string, network?: string) => Promise<unknown>;
  createTransaction?: (params: unknown) => Promise<unknown>;
  estimateTransactionSize?: (inputCount: number, outputCount: number) => number;
  calculateFee?: (inputCount: number, outputCount: number, feeRate?: number) => number;
  fetchUTXOs?: (address: string, network?: string) => Promise<unknown>;
  getBalance?: (address: string, network?: string) => Promise<unknown>;
  broadcastTransaction?: (txHex: string, network?: string) => Promise<unknown>;
  getTransactionHistory?: (address: string, network?: string, limit?: number) => Promise<unknown>;
  // High-level send function
  [key: string]: unknown; // Allow additional currency-specific properties
}

export interface BasicInfo {
  name: string;
  symbolTicker: string;
  description: string;
  creator: string;
  debutYear: number;
  website: string;
  whitePaper?: string;
  primaryNFTMarketplace?: string;
  secondaryNFTMarketplace?: string;
}

export interface TechnicalInfo {
  proofingType: "Proof of Work" | "Proof of Stake" | "Proof of Authority" | "Proof of Space" | "Proof of Time" | "Other";
  class: string;
  totalSupply: string;
  libraryHashing?: string;
  librarySigning?: string;
  mnemonicSeedPhraseLengths?: string;
  privateKeyFormat?: string;
  privateKeyToPublicKeyCurve?: string;
  publicKeyToPublicWalletAddressHashing?: string;
  NPMLibraryHashing?: string;
  NPMLibrarySigning?: string;
  keyStoreFormat?: string;
  jsonFormat?: string;
  smartContractLanguage?: string;
  primaryNPMPackage?: string;
  secondaryNPMPackage?: string;
  tertiaryNPMPackage?: string;
  web3ConnectMechanism?: string;
  nativeWallet?: string;
  humanReadableAddressingPlatform?: string;
  humanReadableAddressingNPMPackage?: string;
  SendingMechanism?: string;
  NFTMintingMechanism?: string;
  AssetTokenSupportAndMechanism?: string;
  evmChainID?: string | number;
  typicalDerivationPath?: string;
  sendingFunctionality?: string;
}

export interface MarketInfo {
  allTimeHigh: {
    price: number;
    currency: string;
    date: string;
  };
}

export interface SocialMedia {
  discord?: string;
  instagram?: string;
  linkedin?: string;
  reddit?: string;
  slack?: string;
  telegram?: string;
  twitterX?: string;
}

export interface Identifiers {
  UCID: string;
  identifierBraveNewCoin?: string;
  identifierCoinAPI?: string;
  identifierCoinCap?: string;
  identifierCoinGecko?: string;
  identifierCoinPaprika?: string;
}

export interface BlockExplorer {
  blockExplorerAPI?: string;
  blockExplorerLink?: string;
}

export interface DEXInfo {
  name: string;
  url: string;
  type?: string;
  description?: string;
}

export interface StakingProvider {
  name: string;
  url: string;
  type: string;
  description?: string;
}

export interface MiningPool {
  name: string;
  url: string;
  type?: string;
  description?: string;
}
