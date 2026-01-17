// Waves Ducks Marketplace Information
// NFT marketplace on Waves blockchain
// Source: Research compiled from multiple sources

export interface WavesDucksListing {
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

export interface WavesDucksCollection {
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

export interface WavesDucksPricing {
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

export const wavesDucksMarketplace = {
  name: "Waves Ducks",
  blockchain: "Waves",
  type: "NFT Marketplace & Gaming Platform",
  description: "NFT marketplace and gaming platform on Waves blockchain. Features Waves NFT trading with gaming elements, token swaps, and collectible trading.",
  
  urls: {
    main: "https://wavesducks.com/",
    app: "https://wavesducks.com/",
    docs: "https://docs.wavesducks.com/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.wavesducks.com/v1/waves/",
      waves: "https://api.wavesducks.com/v1/waves/",
      base: "https://api.wavesducks.com/v1/waves/",
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
    gaming: {
      getGameAssets: "GET /gaming/assets",
      getGameStats: "GET /gaming/stats",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{assetId}/metrics",
    },
    documentation: "https://docs.wavesducks.com/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://wavesducks.com/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.wavesducks.com/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Gaming features",
      "Token swaps",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(assetId: string) {
  const response = await fetch(\`https://api.wavesducks.com/v1/waves/nft/\${assetId}/price\`);
  const pricing: WavesDucksPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(assetId: string) {
  const response = await fetch(\`https://api.wavesducks.com/v1/waves/collections/\${assetId}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Get game assets
async function getGameAssets() {
  const response = await fetch(\`https://api.wavesducks.com/v1/waves/gaming/assets\`);
  const assets = await response.json();
  return assets;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/wavesducks",
    discord: "https://discord.gg/wavesducks",
    telegram: "https://t.me/wavesducks",
    medium: null,
    github: null,
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    gamingFeatures: true,
    tokenSwaps: true,
  },
  
  metrics: {
    supported: true,
    endpoints: [
      "Volume statistics",
      "Trading statistics",
      "Collection metrics",
      "Price history",
      "Market trends",
      "Gaming statistics",
    ],
  },
  
  notes: [
    "NFT marketplace and gaming platform on Waves blockchain",
    "Uses Waves NFT standard (Issue Transaction)",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Gaming features and collectible trading",
    "Token swap functionality",
  ],
};

export default wavesDucksMarketplace;

