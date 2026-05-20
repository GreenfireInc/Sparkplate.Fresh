// Polkadot NFT Marketplaces Index
// Exports all available NFT marketplace implementations for Polkadot ecosystem

// Singular
export { 
  singularMarketplace,
  type SingularListing,
  type SingularCollection,
  type SingularPricing,
  type SingularMetrics
} from './singular.DOT';

// KodaDot
export {
  kodadotMarketplace,
  type KodaDotListing,
  type KodaDotCollection,
  type KodaDotPricing
} from './kodadot.DOT';

// Unique Network
export {
  uniqueNetworkMarketplace,
  type UniqueNetworkListing,
  type UniqueNetworkCollection,
  type UniqueNetworkPricing
} from './uniqueNetwork.DOT';

// RMRK.app
export {
  rmrkMarketplace,
  type RMRKListing,
  type RMRKCollection,
  type RMRKPricing
} from './rmrk.DOT';

// Efinity
export {
  efinityMarketplace,
  type EfinityListing,
  type EfinityCollection,
  type EfinityPricing
} from './efinity.DOT';


// Bit.Country (Metaverse Network)
export {
  bitCountryMarketplace,
  type BitCountryListing,
  type BitCountryCollection,
  type BitCountryPricing
} from './bitcountry.DOT';

// Parallel NFT (Parallel Finance)
export {
  parallelNFTMarketplace,
  type ParallelNFTListing,
  type ParallelNFTCollection,
  type ParallelNFTPricing
} from './parallelNFT.DOT';

// Default export: Singular (primary marketplace)
export { singularMarketplace as default } from './singular.DOT';

