// Bitcoin NFT Marketplaces Index
// Exports all available NFT marketplace implementations for Bitcoin (Ordinals)

// Magic Eden Ordinals
export { 
  magicEdenOrdinalsMarketplace,
  type MagicEdenOrdinalsListing,
  type MagicEdenOrdinalsCollection,
  type MagicEdenOrdinalsPricing,
  type MagicEdenOrdinalsMetrics
} from './magicEdenOrdinals.BTC';

// Ordinals.com
export {
  ordinalsMarketplace,
  type OrdinalsListing,
  type OrdinalsCollection,
  type OrdinalsPricing
} from './ordinals.BTC';

// Gamma.io
export {
  gammaMarketplace,
  type GammaListing,
  type GammaCollection,
  type GammaPricing
} from './gamma.BTC';

// OpenOrdex
export {
  openOrdexMarketplace,
  type OpenOrdexListing,
  type OpenOrdexCollection,
  type OpenOrdexPricing
} from './openOrdex.BTC';

// Hiro Marketplace
export {
  hiroMarketplace,
  type HiroListing,
  type HiroCollection,
  type HiroPricing
} from './hiro.BTC';

// Unisat Marketplace
export {
  unisatMarketplace,
  type UnisatListing,
  type UnisatCollection,
  type UnisatPricing
} from './unisat.BTC';


// OrdSwap
export {
  ordswapMarketplace,
  type OrdSwapListing,
  type OrdSwapCollection,
  type OrdSwapPricing
} from './ordswap.BTC';

// OKX Ordinals
export {
  okxOrdinalsMarketplace,
  type OKXOrdinalsListing,
  type OKXOrdinalsCollection,
  type OKXOrdinalsPricing
} from './okxOrdinals.BTC';

// Default export: Magic Eden Ordinals (primary marketplace)
export { magicEdenOrdinalsMarketplace as default } from './magicEdenOrdinals.BTC';

