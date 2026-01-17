// OpenSea Marketplace Information
// Primary NFT marketplace on Ethereum
// Source: Research compiled from multiple sources

export interface OpenSeaListing {
  tokenId: string;
  contractAddress: string;
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

export interface OpenSeaCollection {
  contractAddress: string;
  name: string;
  description?: string;
  creator: string;
  totalSupply: number;
  floorPrice?: number;
  totalVolume?: number;
  imageUrl?: string;
  verified: boolean;
}

export interface OpenSeaPricing {
  tokenId: string;
  contractAddress: string;
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

export interface OpenSeaMetrics {
  contractAddress: string;
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

export const openseaMarketplace = {
  name: "OpenSea",
  blockchain: "Ethereum",
  type: "NFT Marketplace",
  description: "Primary NFT marketplace on Ethereum. The world's largest NFT marketplace featuring ERC-721 and ERC-1155 NFTs with comprehensive trading, collections, and marketplace tools.",
  
  urls: {
    main: "https://opensea.io/",
    app: "https://opensea.io/",
    docs: "https://docs.opensea.io/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.opensea.io/api/v2/",
      v1: "https://api.opensea.io/api/v1/",
      base: "https://api.opensea.io/api/v2/",
    },
    pricing: {
      getNFTPrice: "GET /chain/ethereum/contract/{contractAddress}/nfts/{tokenId}/listings",
      getCollectionFloorPrice: "GET /chain/ethereum/collection/{collectionSlug}/stats",
      getPriceHistory: "GET /chain/ethereum/contract/{contractAddress}/nfts/{tokenId}/events",
      getMarketStats: "GET /chain/ethereum/stats",
    },
    listings: {
      getListings: "GET /chain/ethereum/listings",
      getListingById: "GET /chain/ethereum/listings/{listingId}",
      getListingsByCollection: "GET /chain/ethereum/collection/{collectionSlug}/listings",
      getListingsByOwner: "GET /chain/ethereum/accounts/{address}/listings",
    },
    collections: {
      getCollections: "GET /chain/ethereum/collections",
      getCollectionById: "GET /chain/ethereum/collection/{collectionSlug}",
      getCollectionStats: "GET /chain/ethereum/collection/{collectionSlug}/stats",
      searchCollections: "GET /chain/ethereum/collections/search",
    },
    nfts: {
      getNFT: "GET /chain/ethereum/contract/{contractAddress}/nfts/{tokenId}",
      getNFTsByCollection: "GET /chain/ethereum/collection/{collectionSlug}/nfts",
      getNFTsByOwner: "GET /chain/ethereum/accounts/{address}/nfts",
      searchNFTs: "GET /chain/ethereum/nfts/search",
    },
    events: {
      getEvents: "GET /chain/ethereum/events",
      getNFTEvents: "GET /chain/ethereum/contract/{contractAddress}/nfts/{tokenId}/events",
      getCollectionEvents: "GET /chain/ethereum/collection/{collectionSlug}/events",
    },
    metrics: {
      getVolumeStats: "GET /chain/ethereum/stats/volume",
      getTradingStats: "GET /chain/ethereum/stats/trading",
      getCollectionMetrics: "GET /chain/ethereum/collection/{collectionSlug}/metrics",
      getMarketTrends: "GET /chain/ethereum/stats/trends",
    },
    documentation: "https://docs.opensea.io/reference/overview",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: true,
    authentication: {
      type: "API Key required",
      headerName: "X-API-KEY",
      getApiKey: "https://opensea.io/account/api-keys",
    },
  },
  
  sdk: {
    npm: {
      package: "opensea-js",
      version: "latest",
      installCommand: "npm install opensea-js",
      github: "https://github.com/ProjectOpenSea/opensea-js",
      npmLink: "https://www.npmjs.com/package/opensea-js",
    },
    documentation: "https://docs.opensea.io/",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Multi-chain support",
      "Bundles",
      "Auctions",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(contractAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.opensea.io/api/v2/chain/ethereum/contract/\${contractAddress}/nfts/\${tokenId}/listings\`, {
    headers: {
      'X-API-KEY': 'YOUR_API_KEY'
    }
  });
  const pricing: OpenSeaPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(collectionSlug: string) {
  const response = await fetch(\`https://api.opensea.io/api/v2/chain/ethereum/collection/\${collectionSlug}/stats\`, {
    headers: {
      'X-API-KEY': 'YOUR_API_KEY'
    }
  });
  const data = await response.json();
  return data.stats?.floor_price;
}

// Search NFTs
async function searchNFTs(keyword: string) {
  const response = await fetch(\`https://api.opensea.io/api/v2/chain/ethereum/nfts/search?query=\${encodeURIComponent(keyword)}\`, {
    headers: {
      'X-API-KEY': 'YOUR_API_KEY'
    }
  });
  const data = await response.json();
  return data.nfts;
}

// Using OpenSea SDK
import { OpenSeaSDK, Network } from 'opensea-js';

const sdk = new OpenSeaSDK(provider, {
  chain: Network.Ethereum,
  apiKey: 'YOUR_API_KEY'
});
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/opensea",
    discord: "https://discord.gg/opensea",
    telegram: null,
    medium: "https://medium.com/@opensea",
    github: "https://github.com/ProjectOpenSea",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    multiChainSupport: true,
    bundles: true,
    auctions: true,
  },
  
  metrics: {
    supported: true,
    endpoints: [
      "Volume statistics",
      "Trading statistics",
      "Collection metrics",
      "Price history",
      "Market trends",
      "Event tracking",
    ],
  },
  
  notes: [
    "Primary NFT marketplace for Ethereum",
    "Uses ERC-721 and ERC-1155 standards",
    "Requires API key for access",
    "Real-time pricing and market data",
    "Collection verification available",
    "Multi-chain support (Ethereum, Polygon, etc.)",
    "Comprehensive event tracking and analytics",
  ],
};

export default openseaMarketplace;

