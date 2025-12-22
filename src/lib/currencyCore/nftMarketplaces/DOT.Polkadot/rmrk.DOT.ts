// RMRK.app Marketplace Information
// RMRK protocol marketplace for Polkadot ecosystem
// Source: Research compiled from multiple sources

export interface RMRKListing {
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

export interface RMRKCollection {
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

export interface RMRKPricing {
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

export const rmrkMarketplace = {
  name: "RMRK.app",
  blockchain: "Polkadot",
  type: "RMRK Protocol Marketplace",
  description: "NFT marketplace built on RMRK protocol. Features RMRK 2.0 capabilities including nested NFTs, equippable NFTs, and multi-resource NFTs.",
  
  urls: {
    main: "https://rmrk.app/",
    app: "https://rmrk.app/",
    docs: "https://docs.rmrk.app/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.rmrk.app/v1/",
      rmrk: "https://api.rmrk.app/v1/rmrk/",
      base: "https://api.rmrk.app/v1/",
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
    },
    documentation: "https://docs.rmrk.app/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://rmrk.app/api",
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
    documentation: "https://docs.rmrk.app/developers",
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
  const response = await fetch(\`https://api.rmrk.app/v1/nft/\${collectionId}/\${nftId}/price\`);
  const pricing: RMRKPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(collectionId: string) {
  const response = await fetch(\`https://api.rmrk.app/v1/collections/\${collectionId}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchNFTs(keyword: string) {
  const response = await fetch(\`https://api.rmrk.app/v1/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}

// Using RMRK SDK
import { RMRK } from '@rmrk-team/rmrk-sdk';

const rmrk = new RMRK({
  apiEndpoint: 'https://api.rmrk.app/v1/rmrk/',
});
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/RMRKapp",
    discord: "https://discord.gg/rmrk",
    telegram: "https://t.me/rmrkapp",
    medium: "https://medium.com/@rmrk",
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
    ],
  },
  
  notes: [
    "NFT marketplace built on RMRK protocol",
    "RMRK 2.0 standard (NFT 2.0)",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Supports advanced RMRK features: nested, equippable, multi-resource NFTs",
    "Cross-chain support via XCM",
  ],
};

export default rmrkMarketplace;

