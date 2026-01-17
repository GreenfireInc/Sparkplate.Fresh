// Stargaze Marketplace Information
// Primary NFT marketplace on Cosmos blockchain
// Source: Research compiled from multiple sources

export interface StargazeListing {
  tokenId: string;
  collectionAddress: string;
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

export interface StargazeCollection {
  collectionAddress: string;
  name: string;
  description?: string;
  creator: string;
  totalSupply: number;
  floorPrice?: number;
  totalVolume?: number;
  imageUrl?: string;
  verified: boolean;
}

export interface StargazePricing {
  tokenId: string;
  collectionAddress: string;
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

export interface StargazeMetrics {
  collectionAddress: string;
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

export const stargazeMarketplace = {
  name: "Stargaze",
  blockchain: "Cosmos",
  type: "NFT Marketplace",
  description: "Primary NFT marketplace on the Cosmos blockchain. Built on Stargaze chain, a Cosmos SDK blockchain dedicated to NFTs. Features decentralized marketplace, minting, and trading capabilities.",
  
  urls: {
    main: "https://www.stargaze.zone/",
    app: "https://www.stargaze.zone/",
    docs: "https://docs.stargaze.zone/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.stargaze.zone/v1/",
      rpc: "https://rpc.stargaze-apis.com/",
      rest: "https://rest.stargaze-apis.com/",
      base: "https://api.stargaze.zone/",
    },
    pricing: {
      getNFTPrice: "GET /nft/{collectionAddress}/{tokenId}/price",
      getCollectionFloorPrice: "GET /collection/{collectionAddress}/floor-price",
      getPriceHistory: "GET /nft/{collectionAddress}/{tokenId}/price-history",
      getMarketStats: "GET /market/stats",
    },
    listings: {
      getListings: "GET /listings",
      getListingById: "GET /listings/{listingId}",
      getListingsByCollection: "GET /collections/{collectionAddress}/listings",
      getListingsByOwner: "GET /accounts/{address}/listings",
    },
    collections: {
      getCollections: "GET /collections",
      getCollectionById: "GET /collections/{collectionAddress}",
      getCollectionStats: "GET /collections/{collectionAddress}/stats",
      searchCollections: "GET /collections/search",
    },
    nfts: {
      getNFT: "GET /nft/{collectionAddress}/{tokenId}",
      getNFTsByCollection: "GET /collections/{collectionAddress}/nfts",
      getNFTsByOwner: "GET /accounts/{address}/nfts",
      searchNFTs: "GET /nfts/search",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{collectionAddress}/metrics",
      getMarketTrends: "GET /metrics/trends",
    },
    documentation: "https://docs.stargaze.zone/developers/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://www.stargaze.zone/api",
    },
  },
  
  sdk: {
    npm: {
      package: "@stargaze-zone/stargaze-sdk",
      version: "latest",
      installCommand: "npm install @stargaze-zone/stargaze-sdk",
      github: "https://github.com/public-awesome/stargaze",
      npmLink: "https://www.npmjs.com/package/@stargaze-zone/stargaze-sdk",
    },
    documentation: "https://docs.stargaze.zone/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Mint NFTs",
      "Create collections",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(collectionAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.stargaze.zone/v1/nft/\${collectionAddress}/\${tokenId}/price\`);
  const pricing: StargazePricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(collectionAddress: string) {
  const response = await fetch(\`https://api.stargaze.zone/v1/collections/\${collectionAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchNFTs(query: string) {
  const response = await fetch(\`https://api.stargaze.zone/v1/nfts/search?q=\${encodeURIComponent(query)}\`);
  const data = await response.json();
  return data.results;
}

// Using Stargaze SDK
import { StargazeClient } from "@stargaze-zone/stargaze-sdk";

const client = new StargazeClient({
  rpcEndpoint: "https://rpc.stargaze-apis.com/",
  restEndpoint: "https://rest.stargaze-apis.com/",
});

const nft = await client.getNFT(collectionAddress, tokenId);
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/StargazeZone",
    discord: "https://discord.gg/stargaze",
    telegram: "https://t.me/joinchat/stargaze",
    medium: "https://medium.com/@stargazezone",
    github: "https://github.com/public-awesome/stargaze",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    mintNFTs: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    royaltySupport: true,
  },
  
  metrics: {
    supported: true,
    endpoints: [
      "Volume statistics",
      "Trading statistics",
      "Collection metrics",
      "Price history",
      "Market trends",
      "Sales analytics",
    ],
  },
  
  notes: [
    "Primary NFT marketplace for Cosmos ecosystem",
    "Built on dedicated Stargaze chain (Cosmos SDK)",
    "Uses CosmWasm smart contracts (CW721 standard)",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Supports IBC (Inter-Blockchain Communication)",
  ],
};

export default stargazeMarketplace;

