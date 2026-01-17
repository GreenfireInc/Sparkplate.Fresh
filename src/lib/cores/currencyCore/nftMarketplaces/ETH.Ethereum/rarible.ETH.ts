// Rarible Marketplace Information
// NFT marketplace on Ethereum
// Source: Research compiled from multiple sources

export interface RaribleListing {
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

export interface RaribleCollection {
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

export interface RariblePricing {
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

export const raribleMarketplace = {
  name: "Rarible",
  blockchain: "Ethereum",
  type: "NFT Marketplace",
  description: "NFT marketplace on Ethereum. Community-owned NFT marketplace with creator royalties, multi-chain support, and decentralized governance.",
  
  urls: {
    main: "https://rarible.com/",
    app: "https://rarible.com/",
    docs: "https://docs.rarible.com/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.rarible.org/v0.1/",
      ethereum: "https://ethereum-api.rarible.org/v0.1/",
      base: "https://api.rarible.org/v0.1/",
    },
    pricing: {
      getNFTPrice: "GET /items/{contractAddress}:{tokenId}/price",
      getCollectionFloorPrice: "GET /collections/{contractAddress}/floor-price",
      getPriceHistory: "GET /items/{contractAddress}:{tokenId}/price-history",
      getMarketStats: "GET /market/stats",
    },
    listings: {
      getListings: "GET /items/all",
      getListingById: "GET /items/{contractAddress}:{tokenId}",
      getListingsByCollection: "GET /items/byCollection?collection={contractAddress}",
      getListingsByOwner: "GET /items/byOwner?owner={address}",
    },
    collections: {
      getCollections: "GET /collections",
      getCollectionById: "GET /collections/{contractAddress}",
      getCollectionStats: "GET /collections/{contractAddress}/stats",
      searchCollections: "GET /collections/search",
    },
    nfts: {
      getNFT: "GET /items/{contractAddress}:{tokenId}",
      getNFTsByCollection: "GET /items/byCollection?collection={contractAddress}",
      getNFTsByOwner: "GET /items/byOwner?owner={address}",
      searchNFTs: "GET /items/search",
    },
    metrics: {
      getVolumeStats: "GET /market/stats/volume",
      getTradingStats: "GET /market/stats/trading",
      getCollectionMetrics: "GET /collections/{contractAddress}/metrics",
    },
    documentation: "https://docs.rarible.com/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-KEY",
      getApiKey: "https://rarible.com/api",
    },
  },
  
  sdk: {
    npm: {
      package: "@rarible/sdk",
      version: "latest",
      installCommand: "npm install @rarible/sdk",
      github: "https://github.com/rarible/sdk",
      npmLink: "https://www.npmjs.com/package/@rarible/sdk",
    },
    documentation: "https://docs.rarible.com/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Creator royalties",
      "Multi-chain support",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(contractAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.rarible.org/v0.1/items/\${contractAddress}:\${tokenId}/price\`);
  const pricing: RariblePricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(contractAddress: string) {
  const response = await fetch(\`https://api.rarible.org/v0.1/collections/\${contractAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchNFTs(keyword: string) {
  const response = await fetch(\`https://api.rarible.org/v0.1/items/search?text=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.items;
}

// Using Rarible SDK
import { createRaribleSdk } from '@rarible/sdk';

const sdk = createRaribleSdk(provider, 'ethereum');
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/rarible",
    discord: "https://discord.gg/rarible",
    telegram: "https://t.me/rarible",
    medium: "https://medium.com/@rarible",
    github: "https://github.com/rarible",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    creatorRoyalties: true,
    multiChainSupport: true,
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
    "NFT marketplace on Ethereum",
    "Uses ERC-721 and ERC-1155 standards",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Community-owned with decentralized governance",
    "Multi-chain support",
  ],
};

export default raribleMarketplace;

