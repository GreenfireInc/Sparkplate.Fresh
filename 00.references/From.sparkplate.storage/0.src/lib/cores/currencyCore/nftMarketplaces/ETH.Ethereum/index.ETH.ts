// Ethereum NFT Marketplaces Index
// Exports all available NFT marketplace implementations for Ethereum

// OpenSea
export { 
  openseaMarketplace,
  type OpenSeaListing,
  type OpenSeaCollection,
  type OpenSeaPricing,
  type OpenSeaMetrics
} from './opensea.ETH';

// Blur
export {
  blurMarketplace,
  type BlurListing,
  type BlurCollection,
  type BlurPricing,
  type BlurMetrics
} from './blur.ETH';

// Rarible
export {
  raribleMarketplace,
  type RaribleListing,
  type RaribleCollection,
  type RariblePricing
} from './rarible.ETH';

// LooksRare
export {
  looksrareMarketplace,
  type LooksRareListing,
  type LooksRareCollection,
  type LooksRarePricing
} from './looksrare.ETH';

// Foundation
export {
  foundationMarketplace,
  type FoundationListing,
  type FoundationCollection,
  type FoundationPricing
} from './foundation.ETH';

// SuperRare
export {
  superrareMarketplace,
  type SuperRareListing,
  type SuperRareCollection,
  type SuperRarePricing
} from './superrare.ETH';

// X2Y2
export {
  x2y2Marketplace,
  type X2Y2Listing,
  type X2Y2Collection,
  type X2Y2Pricing
} from './x2y2.ETH';

// Zora
export {
  zoraMarketplace,
  type ZoraListing,
  type ZoraCollection,
  type ZoraPricing
} from './zora.ETH';


// Manifold
export {
  manifoldMarketplace,
  type ManifoldListing,
  type ManifoldCollection,
  type ManifoldPricing
} from './manifold.ETH';

// Nifty Gateway
export {
  niftyGatewayMarketplace,
  type NiftyGatewayListing,
  type NiftyGatewayCollection,
  type NiftyGatewayPricing
} from './niftyGateway.ETH';

// Default export: OpenSea (primary marketplace)
export { openseaMarketplace as default } from './opensea.ETH';

