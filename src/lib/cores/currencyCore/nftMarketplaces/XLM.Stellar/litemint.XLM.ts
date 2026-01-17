// Litemint Marketplace Information
// Primary NFT marketplace on Stellar blockchain
// Source: Research compiled from multiple sources

export interface LitemintListing {
  assetId: string;
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

export interface LitemintCollection {
  assetId: string;
  name: string;
  description?: string;
  creator: string;
  totalSupply: number;
  floorPrice?: number;
  totalVolume?: number;
  imageUrl?: string;
  verified: boolean;
}

export interface LitemintPricing {
  assetId: string;
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

export interface LitemintMetrics {
  assetId: string;
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

export const litemintMarketplace = {
  name: "Litemint",
  blockchain: "Stellar",
  type: "NFT Marketplace",
  description: "Primary NFT marketplace on Stellar blockchain. Features Stellar native asset NFTs, collections, and marketplace tools integrated with Stellar ecosystem.",
  
  urls: {
    main: "https://litemint.com/",
    app: "https://litemint.com/",
    docs: "https://docs.litemint.com/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.litemint.com/v1/stellar/",
      stellar: "https://api.litemint.com/v1/stellar/",
      base: "https://api.litemint.com/v1/stellar/",
    },
    pricing: {
      getNFTPrice: "GET /nft/{assetId}/price",
      getCollectionFloorPrice: "GET /collections/{assetId}/floor-price",
      getPriceHistory: "GET /nft/{assetId}/price-history",
      getMarketStats: "GET /market/stats",
    },
    listings: {
      getListings: "GET /listings",
      getListingById: "GET /listings/{listingId}",
      getListingsByCollection: "GET /collections/{assetId}/listings",
      getListingsByOwner: "GET /accounts/{address}/listings",
    },
    collections: {
      getCollections: "GET /collections",
      getCollectionById: "GET /collections/{assetId}",
      getCollectionStats: "GET /collections/{assetId}/stats",
      searchCollections: "GET /collections/search",
    },
    nfts: {
      getNFT: "GET /nft/{assetId}",
      getNFTsByCollection: "GET /collections/{assetId}/nfts",
      getNFTsByOwner: "GET /accounts/{address}/nfts",
      searchNFTs: "GET /nfts/search",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{assetId}/metrics",
      getMarketTrends: "GET /metrics/trends",
    },
    documentation: "https://docs.litemint.com/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://litemint.com/api",
    },
  },
  
  sdk: {
    npm: {
      package: "@stellar/stellar-sdk",
      version: "latest",
      installCommand: "npm install @stellar/stellar-sdk",
      github: "https://github.com/stellar/js-stellar-sdk",
      npmLink: "https://www.npmjs.com/package/@stellar/stellar-sdk",
    },
    documentation: "https://docs.litemint.com/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Freighter wallet integration",
      "Stellar DEX integration",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(assetId: string) {
  const response = await fetch(\`https://api.litemint.com/v1/stellar/nft/\${assetId}/price\`);
  const pricing: LitemintPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(assetId: string) {
  const response = await fetch(\`https://api.litemint.com/v1/stellar/collections/\${assetId}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchNFTs(keyword: string) {
  const response = await fetch(\`https://api.litemint.com/v1/stellar/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}

// Using Stellar SDK
import { Server, Asset, Keypair } from '@stellar/stellar-sdk';

const server = new Server('https://horizon.stellar.org');
const asset = new Asset(assetCode, issuerAddress);
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/litemint",
    discord: "https://discord.gg/litemint",
    telegram: "https://t.me/litemint",
    medium: null,
    github: "https://github.com/litemint",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    freighterWalletIntegration: true,
    stellarDEXIntegration: true,
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
    "Primary NFT marketplace for Stellar blockchain",
    "Uses Stellar native assets / Soroban tokens",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Integrated with Freighter wallet",
    "Uses assetId for NFT identification",
    "Stellar DEX integration for trading",
  ],
};

export default litemintMarketplace;

