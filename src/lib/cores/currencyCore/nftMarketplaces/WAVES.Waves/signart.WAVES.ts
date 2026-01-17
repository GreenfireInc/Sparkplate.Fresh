// SignArt Marketplace Information
// Primary NFT marketplace on Waves blockchain
// Source: Research compiled from multiple sources

export interface SignArtListing {
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

export interface SignArtCollection {
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

export interface SignArtPricing {
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

export interface SignArtMetrics {
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

export const signartMarketplace = {
  name: "SignArt",
  blockchain: "Waves",
  type: "NFT Marketplace",
  description: "Primary NFT marketplace on Waves blockchain. Features Waves NFT trading, collections, and marketplace tools integrated with Waves ecosystem.",
  
  urls: {
    main: "https://sign-art.app/",
    app: "https://sign-art.app/",
    docs: "https://docs.sign-art.app/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.sign-art.app/v1/waves/",
      waves: "https://api.sign-art.app/v1/waves/",
      base: "https://api.sign-art.app/v1/waves/",
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
    documentation: "https://docs.sign-art.app/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://sign-art.app/api",
    },
  },
  
  sdk: {
    npm: {
      package: "@waves/waves-transactions",
      version: "latest",
      installCommand: "npm install @waves/waves-transactions",
      github: "https://github.com/wavesplatform/waves-transactions",
      npmLink: "https://www.npmjs.com/package/@waves/waves-transactions",
    },
    documentation: "https://docs.sign-art.app/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Waves Keeper integration",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(assetId: string) {
  const response = await fetch(\`https://api.sign-art.app/v1/waves/nft/\${assetId}/price\`);
  const pricing: SignArtPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(assetId: string) {
  const response = await fetch(\`https://api.sign-art.app/v1/waves/collections/\${assetId}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchNFTs(keyword: string) {
  const response = await fetch(\`https://api.sign-art.app/v1/waves/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}

// Using Waves SDK
import { transfer, broadcast } from '@waves/waves-transactions';
import { nodeInteraction } from '@waves/waves-transactions';

const nodeUrl = 'https://nodes.wavesnodes.com';
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/signart",
    discord: "https://discord.gg/signart",
    telegram: "https://t.me/signart",
    medium: null,
    github: "https://github.com/signart",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    wavesKeeperIntegration: true,
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
    "Primary NFT marketplace for Waves blockchain",
    "Uses Waves NFT standard (Issue Transaction)",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Integrated with Waves Keeper wallet",
    "Uses assetId for NFT identification",
  ],
};

export default signartMarketplace;

