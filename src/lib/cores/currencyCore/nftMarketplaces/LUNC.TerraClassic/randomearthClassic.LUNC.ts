// RandomEarth Classic Marketplace Information
// Primary NFT marketplace on Terra Classic blockchain
// Source: Research compiled from multiple sources

export interface RandomEarthClassicListing {
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

export interface RandomEarthClassicCollection {
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

export interface RandomEarthClassicPricing {
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

export interface RandomEarthClassicMetrics {
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

export const randomearthClassicMarketplace = {
  name: "RandomEarth (Terra Classic)",
  blockchain: "Terra Classic",
  type: "NFT Marketplace",
  description: "Primary NFT marketplace on Terra Classic blockchain. Features CW721 NFT trading, collections, and marketplace tools for the legacy Terra Classic ecosystem.",
  
  urls: {
    main: "https://randomearth.io/",
    app: "https://randomearth.io/",
    docs: "https://docs.randomearth.io/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.randomearth.io/v1/classic/",
      classic: "https://api.randomearth.io/v1/classic/",
      base: "https://api.randomearth.io/v1/classic/",
    },
    pricing: {
      getNFTPrice: "GET /nft/{collectionAddress}/{tokenId}/price",
      getCollectionFloorPrice: "GET /collections/{collectionAddress}/floor-price",
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
    documentation: "https://docs.randomearth.io/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://randomearth.io/api",
    },
  },
  
  sdk: {
    npm: {
      package: "@terra-money/terra.js",
      version: "latest",
      installCommand: "npm install @terra-money/terra.js",
      github: "https://github.com/terra-money/terra.js",
      npmLink: "https://www.npmjs.com/package/@terra-money/terra.js",
    },
    documentation: "https://docs.randomearth.io/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Terra Station Classic integration",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(collectionAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.randomearth.io/v1/classic/nft/\${collectionAddress}/\${tokenId}/price\`);
  const pricing: RandomEarthClassicPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(collectionAddress: string) {
  const response = await fetch(\`https://api.randomearth.io/v1/classic/collections/\${collectionAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchNFTs(keyword: string) {
  const response = await fetch(\`https://api.randomearth.io/v1/classic/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}

// Using Terra Classic SDK
import { LCDClient } from '@terra-money/terra.js';

const lcd = new LCDClient({
  chainID: 'columbus-5',
  URL: 'https://terra-classic-lcd.publicnode.com',
});
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/randomearth_io",
    discord: "https://discord.gg/randomearth",
    telegram: "https://t.me/randomearth",
    medium: null,
    github: "https://github.com/randomearth",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    terraStationClassicIntegration: true,
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
    "Primary NFT marketplace for Terra Classic blockchain",
    "Uses CW721 (CosmWasm NFT standard)",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Integrated with Terra Station Classic wallet",
    "Supports Terra Classic ecosystem tokens",
    "Legacy marketplace for pre-fork Terra NFTs",
  ],
};

export default randomearthClassicMarketplace;

