// Solana NFT Marketplaces Index
// Exports all available NFT marketplace implementations for Solana blockchain

// Magic Eden
export { 
  magicEdenSolanaMarketplace,
  type MagicEdenSolanaListing,
  type MagicEdenSolanaCollection,
  type MagicEdenSolanaPricing,
  type MagicEdenSolanaMetrics
} from './magicEdenSolana.SOL';

// Tensor
export {
  tensorMarketplace,
  type TensorListing,
  type TensorCollection,
  type TensorPricing,
  type TensorMetrics
} from './tensor.SOL';

// Solanart
export {
  solanartMarketplace,
  type SolanartListing,
  type SolanartCollection,
  type SolanartPricing
} from './solanart.SOL';

// Hadeswap
export {
  hadeswapMarketplace,
  type HadeswapListing,
  type HadeswapCollection,
  type HadeswapPricing
} from './hadeswap.SOL';

// OpenSea Solana
export {
  openseaSolanaMarketplace,
  type OpenSeaSolanaListing,
  type OpenSeaSolanaCollection,
  type OpenSeaSolanaPricing
} from './openseaSolana.SOL';

// Exchange Art
export {
  exchangeArtMarketplace,
  type ExchangeArtListing,
  type ExchangeArtCollection,
  type ExchangeArtPricing
} from './exchangeArt.SOL';


// SolSea
export {
  solseaMarketplace,
  type SolSeaListing,
  type SolSeaCollection,
  type SolSeaPricing
} from './solsea.SOL';

// Hyperspace
export {
  hyperspaceMarketplace,
  type HyperspaceListing,
  type HyperspaceCollection,
  type HyperspacePricing
} from './hyperspace.SOL';

// Default export: Magic Eden (primary marketplace)
export { magicEdenSolanaMarketplace as default } from './magicEdenSolana.SOL';

