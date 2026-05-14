// Cosmos NFT Marketplaces Index
// Exports all available NFT marketplace implementations for Cosmos blockchain

// Stargaze
export { 
  stargazeMarketplace,
  type StargazeListing,
  type StargazeCollection,
  type StargazePricing,
  type StargazeMetrics
} from './stargaze.ATOM';

// OmniFlix
export {
  omniflixMarketplace,
  type OmniFlixListing,
  type OmniFlixCollection,
  type OmniFlixPricing
} from './omniflix.ATOM';

// Knowhere
export {
  knowhereMarketplace,
  type KnowhereListing,
  type KnowhereCollection,
  type KnowherePricing
} from './knowhere.ATOM';


// Stashh
export {
  stashhMarketplace,
  type StashhListing,
  type StashhCollection,
  type StashhPricing,
  type StashhMetrics
} from './stashh.ATOM';

// AssetMantle
export {
  assetMantleMarketplace,
  type AssetMantleListing,
  type AssetMantleCollection,
  type AssetMantlePricing
} from './assetMantle.ATOM';

// Passage
export {
  passageMarketplace,
  type PassageListing,
  type PassageCollection,
  type PassagePricing
} from './passage.ATOM';

// Default export: Stargaze (primary marketplace)
export { stargazeMarketplace as default } from './stargaze.ATOM';

