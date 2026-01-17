// KodaDot Marketplace Information
// Secondary NFT marketplace for Polkadot ecosystem
// Source: Research compiled from multiple sources

export interface KodaDotListing {
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

export interface KodaDotCollection {
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

export interface KodaDotPricing {
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

export const kodadotMarketplace = {
  name: "KodaDot",
  blockchain: "Polkadot",
  type: "Multi-Chain NFT Marketplace",
  description: "Secondary NFT marketplace for Polkadot ecosystem. Multi-chain NFT marketplace supporting RMRK, Unique Network, and other Polkadot NFT standards across multiple parachains.",
  
  urls: {
    main: "https://kodadot.xyz/",
    app: "https://kodadot.xyz/",
    docs: "https://docs.kodadot.xyz/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.kodadot.xyz/v1/",
      rmrk: "https://api.kodadot.xyz/v1/rmrk/",
      unique: "https://api.kodadot.xyz/v1/unique/",
      base: "https://api.kodadot.xyz/v1/",
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
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{collectionId}/metrics",
    },
    documentation: "https://docs.kodadot.xyz/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://kodadot.xyz/api",
    },
  },
  
  sdk: {
    npm: {
      package: "@kodadot1/nft-sdk",
      version: "latest",
      installCommand: "npm install @kodadot1/nft-sdk",
      github: "https://github.com/kodadot/nft-gallery",
      npmLink: "https://www.npmjs.com/package/@kodadot1/nft-sdk",
    },
    documentation: "https://docs.kodadot.xyz/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Multi-chain support",
      "RMRK support",
      "Unique Network support",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(collectionId: string, nftId: string) {
  const response = await fetch(\`https://api.kodadot.xyz/v1/nft/\${collectionId}/\${nftId}/price\`);
  const pricing: KodaDotPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(collectionId: string) {
  const response = await fetch(\`https://api.kodadot.xyz/v1/collections/\${collectionId}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchNFTs(keyword: string) {
  const response = await fetch(\`https://api.kodadot.xyz/v1/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}

// Using KodaDot SDK
import { KodaDot } from '@kodadot1/nft-sdk';

const kodadot = new KodaDot({
  apiEndpoint: 'https://api.kodadot.xyz/v1/',
});
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/kodadot",
    discord: "https://discord.gg/kodadot",
    telegram: "https://t.me/kodadot",
    medium: "https://medium.com/@kodadot",
    github: "https://github.com/kodadot",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    multiChainSupport: true,
    rmrkSupport: true,
    uniqueNetworkSupport: true,
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
    "Secondary NFT marketplace for Polkadot ecosystem",
    "Multi-chain marketplace supporting multiple parachains",
    "Supports RMRK and Unique Network NFT standards",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Cross-chain support via XCM",
  ],
};

export default kodadotMarketplace;

