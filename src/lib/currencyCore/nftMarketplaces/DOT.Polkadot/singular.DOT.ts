// Singular Marketplace Information
// Primary NFT marketplace for Polkadot ecosystem
// Source: Research compiled from multiple sources

export interface SingularListing {
  nftId: string;
  collectionId: string;
  name: string;
  description?: string;
  collection?: string;
  creator: string;
  owner: string;
  price?: number;
  currency: string;
  imageUrl?: string;
  metadataUrl?: string;
  listedAt?: string;
  properties?: Record<string, any>;
}

export interface SingularCollection {
  collectionId: string;
  name: string;
  description?: string;
  creator: string;
  totalSupply: number;
  floorPrice?: number;
  totalVolume?: number;
  imageUrl?: string;
  verified: boolean;
}

export interface SingularPricing {
  nftId: string;
  collectionId: string;
  currentPrice?: number;
  floorPrice?: number;
  averagePrice?: number;
  currency: string;
  priceHistory?: Array<{
    price: number;
    timestamp: string;
  }>;
  volume24h?: number;
  volume7d?: number;
  volume30d?: number;
}

export interface SingularMetrics {
  collectionId: string;
  totalVolume: number;
  floorPrice: number;
  averagePrice: number;
  salesCount: number;
  uniqueOwners: number;
  marketCap?: number;
  priceChange24h?: number;
  priceChange7d?: number;
  priceChange30d?: number;
  volumeChange24h?: number;
  volumeChange7d?: number;
  volumeChange30d?: number;
}

export const singularMarketplace = {
  name: "Singular",
  blockchain: "Polkadot",
  type: "RMRK NFT Marketplace",
  description: "Primary NFT marketplace for Polkadot ecosystem. Built on RMRK 2.0 protocol, featuring advanced NFT capabilities like nested NFTs, equippable NFTs, and multi-resource NFTs.",
  
  urls: {
    main: "https://singular.app/",
    app: "https://singular.app/",
    docs: "https://docs.singular.app/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.singular.app/v1/",
      rmrk: "https://api.singular.app/v1/rmrk/",
      base: "https://api.singular.app/v1/",
    },
    pricing: {
      getNFTPrice: "GET /nft/{collectionId}/{nftId}/price",
      getCollectionFloorPrice: "GET /collections/{collectionId}/floor-price",
      getPriceHistory: "GET /nft/{collectionId}/{nftId}/price-history",
      getMarketStats: "GET /market/stats",
    },
    listings: {
      getListings: "GET /listings",
      getListingById: "GET /listings/{listingId}",
      getListingsByCollection: "GET /collections/{collectionId}/listings",
      getListingsByOwner: "GET /accounts/{address}/listings",
    },
    collections: {
      getCollections: "GET /collections",
      getCollectionById: "GET /collections/{collectionId}",
      getCollectionStats: "GET /collections/{collectionId}/stats",
      searchCollections: "GET /collections/search",
    },
    nfts: {
      getNFT: "GET /nft/{collectionId}/{nftId}",
      getNFTsByCollection: "GET /collections/{collectionId}/nfts",
      getNFTsByOwner: "GET /accounts/{address}/nfts",
      searchNFTs: "GET /nfts/search",
    },
    rmrk: {
      getRMRKData: "GET /rmrk/{nftId}",
      getNestedNFTs: "GET /nft/{collectionId}/{nftId}/nested",
      getEquippableNFTs: "GET /nft/{collectionId}/{nftId}/equippable",
      getMultiResourceNFTs: "GET /nft/{collectionId}/{nftId}/resources",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{collectionId}/metrics",
      getMarketTrends: "GET /metrics/trends",
    },
    documentation: "https://docs.singular.app/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://singular.app/api",
    },
  },
  
  sdk: {
    npm: {
      package: "@rmrk-team/rmrk-sdk",
      version: "latest",
      installCommand: "npm install @rmrk-team/rmrk-sdk",
      github: "https://github.com/rmrk-team/rmrk-sdk",
      npmLink: "https://www.npmjs.com/package/@rmrk-team/rmrk-sdk",
    },
    documentation: "https://docs.singular.app/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "RMRK 2.0 features",
      "Nested NFTs",
      "Equippable NFTs",
      "Multi-resource NFTs",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(collectionId: string, nftId: string) {
  const response = await fetch(\`https://api.singular.app/v1/nft/\${collectionId}/\${nftId}/price\`);
  const pricing: SingularPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(collectionId: string) {
  const response = await fetch(\`https://api.singular.app/v1/collections/\${collectionId}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchNFTs(keyword: string) {
  const response = await fetch(\`https://api.singular.app/v1/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}

// Get nested NFTs
async function getNestedNFTs(collectionId: string, nftId: string) {
  const response = await fetch(\`https://api.singular.app/v1/nft/\${collectionId}/\${nftId}/nested\`);
  const nested = await response.json();
  return nested;
}

// Using RMRK SDK
import { RMRK } from '@rmrk-team/rmrk-sdk';

const rmrk = new RMRK({
  apiEndpoint: 'https://api.singular.app/v1/rmrk/',
});
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/singularapp",
    discord: "https://discord.gg/singular",
    telegram: "https://t.me/singularapp",
    medium: "https://medium.com/@singularapp",
    github: "https://github.com/rmrk-team",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    nestedNFTs: true,
    equippableNFTs: true,
    multiResourceNFTs: true,
  },
  
  metrics: {
    supported: true,
    endpoints: [
      "Volume statistics",
      "Trading statistics",
      "Collection metrics",
      "Price history",
      "Market trends",
      "RMRK-specific analytics",
    ],
  },
  
  notes: [
    "Primary NFT marketplace for Polkadot ecosystem",
    "Built on RMRK 2.0 protocol (NFT 2.0 standard)",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Supports advanced RMRK features: nested, equippable, multi-resource NFTs",
    "Cross-chain support via XCM (Cross-Consensus Messaging)",
  ],
};

export default singularMarketplace;

