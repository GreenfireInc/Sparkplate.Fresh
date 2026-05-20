// OpenSea Solana Marketplace Information
// Multi-chain NFT marketplace supporting Solana network
// Source: Research compiled from multiple sources

export interface OpenSeaSolanaListing {
  tokenMint: string;
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

export interface OpenSeaSolanaCollection {
  symbol: string;
  name: string;
  description?: string;
  creator: string;
  totalSupply: number;
  floorPrice?: number;
  totalVolume?: number;
  imageUrl?: string;
  verified: boolean;
}

export interface OpenSeaSolanaPricing {
  tokenMint: string;
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

export const openseaSolanaMarketplace = {
  name: "OpenSea (Solana)",
  blockchain: "Solana",
  type: "Multi-Chain NFT Marketplace",
  description: "Multi-chain NFT marketplace supporting Solana network. Features Metaplex NFT trading with OpenSea's infrastructure and multi-chain support.",
  
  urls: {
    main: "https://opensea.io/",
    app: "https://opensea.io/collection?chain=solana",
    docs: "https://docs.opensea.io/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.opensea.io/api/v2/",
      solana: "https://api.opensea.io/api/v2/chain/solana/",
      base: "https://api.opensea.io/api/v2/",
    },
    pricing: {
      getNFTPrice: "GET /chain/solana/contract/{contractAddress}/nfts/{tokenMint}/listings",
      getCollectionFloorPrice: "GET /chain/solana/collection/{collectionSlug}/stats",
      getPriceHistory: "GET /chain/solana/contract/{contractAddress}/nfts/{tokenMint}/events",
      getMarketStats: "GET /chain/solana/stats",
    },
    listings: {
      getListings: "GET /chain/solana/listings",
      getListingById: "GET /chain/solana/listings/{listingId}",
      getListingsByCollection: "GET /chain/solana/collection/{collectionSlug}/listings",
      getListingsByOwner: "GET /chain/solana/accounts/{address}/listings",
    },
    collections: {
      getCollections: "GET /chain/solana/collections",
      getCollectionById: "GET /chain/solana/collection/{collectionSlug}",
      getCollectionStats: "GET /chain/solana/collection/{collectionSlug}/stats",
      searchCollections: "GET /chain/solana/collections/search",
    },
    nfts: {
      getNFT: "GET /chain/solana/contract/{contractAddress}/nfts/{tokenMint}",
      getNFTsByCollection: "GET /chain/solana/collection/{collectionSlug}/nfts",
      getNFTsByOwner: "GET /chain/solana/accounts/{address}/nfts",
      searchNFTs: "GET /chain/solana/nfts/search",
    },
    events: {
      getEvents: "GET /chain/solana/events",
      getNFTEvents: "GET /chain/solana/contract/{contractAddress}/nfts/{tokenMint}/events",
      getCollectionEvents: "GET /chain/solana/collection/{collectionSlug}/events",
    },
    metrics: {
      getVolumeStats: "GET /chain/solana/stats/volume",
      getTradingStats: "GET /chain/solana/stats/trading",
      getCollectionMetrics: "GET /chain/solana/collection/{collectionSlug}/metrics",
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
      "Event tracking",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(contractAddress: string, tokenMint: string) {
  const response = await fetch(\`https://api.opensea.io/api/v2/chain/solana/contract/\${contractAddress}/nfts/\${tokenMint}/listings\`, {
    headers: {
      'X-API-KEY': 'YOUR_API_KEY'
    }
  });
  const pricing: OpenSeaSolanaPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(collectionSlug: string) {
  const response = await fetch(\`https://api.opensea.io/api/v2/chain/solana/collection/\${collectionSlug}/stats\`, {
    headers: {
      'X-API-KEY': 'YOUR_API_KEY'
    }
  });
  const data = await response.json();
  return data.stats?.floor_price;
}

// Search NFTs
async function searchNFTs(keyword: string) {
  const response = await fetch(\`https://api.opensea.io/api/v2/chain/solana/nfts/search?query=\${encodeURIComponent(keyword)}\`, {
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
  chain: Network.Solana,
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
    eventTracking: true,
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
    "Multi-chain NFT marketplace supporting Solana",
    "Uses Metaplex NFT standard (SPL Token)",
    "Requires API key for access",
    "Real-time pricing and market data",
    "Collection verification available",
    "Part of OpenSea's multi-chain infrastructure",
    "Comprehensive event tracking and analytics",
  ],
};

export default openseaSolanaMarketplace;

