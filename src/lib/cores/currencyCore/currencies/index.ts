// Currencies Index - Cryptocurrency Data System
// Currencies: ALGO, AR, ATOM, BCH, BNB, BTC, DOGE, ETC, ETH, LTC, DOT, LUNA, SOL, LUNC, STX, XLM, XRP, XTZ
// Note: ADA (Cardano) is currently DISABLED due to address generation issues
// Cosmos (ATOM) added with full secp256k1 implementation and keystore support

// Currency Imports
// import { cardanoData } from './ADA.Cardano'; // DISABLED
import { algorandData } from './ALGO.Algorand';
import { arweaveData } from './AR.Arweave';
import { binanceCoinData } from './BNB.BinanceCoin';
import { bitcoinCashData } from './BCH.BitcoinCash';
import { bitcoinData } from './BTC.Bitcoin';
import { cosmosData } from './ATOM.Cosmos';
import { dogecoinData } from './DOGE.Dogecoin';
import { ethereumClassicData } from './ETC.EthereumClassic';
import { ethereumData } from './ETH.Ethereum';
import { litecoinData } from './LTC.Litecoin';
import { terraData } from './LUNA.Terra';
import { polkadotData } from './DOT.Polkadot';
import { rippleData } from './XRP.Ripple';
import { solanaData } from './SOL.Solana';
import { stacksData } from './STX.Stacks';
import { stellarData } from './XLM.Stellar';
import { tronData } from './TRX.Tron';
import { terraClassicData } from './LUNC.TerraClassic';
import { tezosData } from './XTZ.Tezos';
import { wavesData } from './WAVES.Waves';
import type { CurrencyData } from './currencyData';

// Export all currency data
export {
  // cardanoData, // DISABLED
  algorandData,
  arweaveData,
  binanceCoinData,
  bitcoinCashData,
  bitcoinData,
  cosmosData,
  dogecoinData,
  ethereumClassicData,
  ethereumData,
  litecoinData,
  terraData,
  polkadotData,
  rippleData,
  solanaData,
  stacksData,
  stellarData,
  terraClassicData,
  tezosData,
  tronData,
  wavesData,
};

// Export types
export type { CurrencyData } from './currencyData';

// Supported cryptocurrency tickers
export type SupportedTicker = /* "ADA" | */ "ALGO" | "AR" | "ATOM" | "BCH" | "BNB" | "BTC" | "DOGE" | "DOT" | "ETC" | "ETH" | "LTC" | "LUNA" | "LUNC" | "SOL" | "STX" | "TRX" | "WAVES" | "XLM" | "XRP" | "XTZ";

// Network configurations for supported cryptocurrencies
export const NETWORKS: Array<{ ticker: SupportedTicker; label: string; icon: string }> = [
  // { ticker: "ADA", label: "ADA://", icon: "/assets/icons/crypto/ada.svg" }, // DISABLED
  { ticker: "ALGO", label: "ALGO://", icon: "/assets/icons/crypto/algo.svg" },
  { ticker: "AR", label: "AR://", icon: "/assets/icons/crypto/ar.svg" },
  { ticker: "ATOM", label: "ATOM://", icon: "/assets/icons/crypto/atom.svg" },
  { ticker: "BCH", label: "BCH://", icon: "/assets/icons/crypto/bch.svg" },
  { ticker: "BNB", label: "BNB://", icon: "/assets/icons/crypto/bnb.svg" },
  { ticker: "BTC", label: "BTC://", icon: "/assets/icons/crypto/btc.svg" },
  { ticker: "DOGE", label: "DOGE://", icon: "/assets/icons/crypto/doge.svg" },
  { ticker: "DOT", label: "DOT://", icon: "/assets/icons/crypto/dot.svg" },
  { ticker: "ETC", label: "ETC://", icon: "/assets/icons/crypto/etc.svg" },
  { ticker: "ETH", label: "ETH://", icon: "/assets/icons/crypto/eth.svg" },
  { ticker: "LTC", label: "LTC://", icon: "/assets/icons/crypto/ltc.svg" },
  { ticker: "LUNA", label: "LUNA://", icon: "/assets/icons/crypto/luna.svg" },
  { ticker: "LUNC", label: "LUNC://", icon: "/assets/icons/crypto/lunc.svg" },
  { ticker: "SOL", label: "SOL://", icon: "/assets/icons/crypto/sol.svg" },
  { ticker: "STX", label: "STX://", icon: "/assets/icons/crypto/stx.svg" },
  { ticker: "TRX", label: "TRX://", icon: "/assets/icons/crypto/trx.svg" },
  { ticker: "WAVES", label: "WAVES://", icon: "/assets/icons/crypto/waves.svg" },
  { ticker: "XLM", label: "XLM://", icon: "/assets/icons/crypto/xlm.svg" },
  { ticker: "XRP", label: "XRP://", icon: "/assets/icons/crypto/xrp.svg" },
  { ticker: "XTZ", label: "XTZ://", icon: "/assets/icons/crypto/xtz.svg" },
];

// Protocol prefixes for different networks (for Polkadot multi-network support)
export const PROTOCOL_PREFIXES: Record<SupportedTicker, string> = {
  // ADA: "ADA://", // DISABLED
  ALGO: "ALGO://",
  AR: "AR://",
  ATOM: "ATOM://",
  BCH: "BCH://",
  BNB: "BNB://",
  BTC: "BTC://",
  DOGE: "DOGE://",
  DOT: "DOT://",
  ETC: "ETC://",
  ETH: "ETH://",
  LTC: "LTC://",
  LUNA: "LUNA://",
  LUNC: "LUNC://",
  SOL: "SOL://",
  STX: "STX://",
  TRX: "TRX://",
  WAVES: "WAVES://",
  XLM: "XLM://",
  XRP: "XRP://",
  XTZ: "XTZ://",
};

// Currency data array for easy iteration
export const allCurrencies = [
  // cardanoData, // DISABLED
  algorandData,
  arweaveData,
  binanceCoinData,
  bitcoinCashData,
  bitcoinData,
  cosmosData,
  dogecoinData,
  ethereumClassicData,
  ethereumData,
  litecoinData,
  terraData,
  polkadotData,
  rippleData,
  solanaData,
  stacksData,
  stellarData,
  terraClassicData,
  tezosData,
  tronData,
  wavesData,
];

// Currency lookup by ticker symbol
export const currencyByTicker: Record<string, CurrencyData> = {
  // ADA: cardanoData, // DISABLED
  ALGO: algorandData,
  AR: arweaveData,
  ATOM: cosmosData,
  BCH: bitcoinCashData,
  BNB: binanceCoinData,
  BTC: bitcoinData,
  DOGE: dogecoinData,
  ETC: ethereumClassicData,
  ETH: ethereumData,
  LTC: litecoinData,
  LUNA: terraData,
  DOT: polkadotData,
  SOL: solanaData,
  STX: stacksData,
  XLM: stellarData,
  LUNC: terraClassicData,
  XTZ: tezosData,
  TRX: tronData,
  XRP: rippleData,
  WAVES: wavesData,
};

// Currency lookup by UCID
export const currencyByUCID: Record<string, CurrencyData> = {
  // '2010': cardanoData, // DISABLED
  '4030': algorandData,
  '5632': arweaveData,
  '3794': cosmosData,
  '1831': bitcoinCashData,
  '1839': binanceCoinData,
  '1': bitcoinData,
  '74': dogecoinData,
  '1321': ethereumClassicData,
  '1027': ethereumData,
  '2': litecoinData,
  '20314': terraData,
  '6636': polkadotData,
  '5426': solanaData,
  '4847': stacksData,
  '512': stellarData,
  '4172': terraClassicData,
  '2011': tezosData,
  '1958': tronData,
  '52': rippleData,
  '1274': wavesData,
};
