// Asalytic Marketplace Information
// NFT analytics and marketplace on Algorand blockchain
// Source: Research compiled from multiple sources

export interface AsalyticListing {
  assetId: number;
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

export interface AsalyticCollection {
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

export interface AsalyticPricing {
  assetId: number;
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

export interface AsalyticMetrics {
  collectionId: string;
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

export const asalyticMarketplace = {
  name: "Asalytic",
  blockchain: "Algorand",
  type: "NFT Analytics & Marketplace",
  description: "Advanced NFT analytics platform and marketplace for Algorand. Provides comprehensive market data, pricing analytics, and trading insights.",
  
  urls: {
    main: "https://www.asalytic.app/",
    app: "https://www.asalytic.app/",
    docs: "https://www.asalytic.app/develop",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.asalytic.app/v1/",
      base: "https://api.asalytic.app/",
    },
    pricing: {
      getNFTPrice: "GET /nft/{assetId}/price",
      getCollectionFloorPrice: "GET /collection/{collectionId}/floor-price",
      getPriceHistory: "GET /nft/{assetId}/price-history",
      getMarketStats: "GET /market/stats",
      getPricePredictions: "GET /nft/{assetId}/price-predictions",
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
      getNFT: "GET /nft/{assetId}",
      getNFTsByCollection: "GET /collections/{collectionId}/nfts",
      getNFTsByOwner: "GET /accounts/{address}/nfts",
      searchNFTs: "GET /nfts/search",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{collectionId}/metrics",
      getMarketTrends: "GET /metrics/trends",
      getRarityRanking: "GET /nft/{assetId}/rarity",
      getCollectionRarity: "GET /collections/{collectionId}/rarity",
    },
    analytics: {
      getCollectionAnalytics: "GET /collections/{collectionId}/analytics",
      getNFTAnalytics: "GET /nft/{assetId}/analytics",
      getMarketAnalytics: "GET /market/analytics",
      getTrendingCollections: "GET /collections/trending",
      getTopCollections: "GET /collections/top",
    },
    documentation: "https://www.asalytic.app/develop",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: true,
    authentication: {
      type: "API Key required",
      headerName: "X-API-Key",
      getApiKey: "https://www.asalytic.app/develop",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://www.asalytic.app/develop",
    typescriptSupport: true,
    features: [
      "Advanced analytics",
      "Price predictions",
      "Rarity rankings",
      "Market trends",
      "Collection metrics",
      "Trading insights",
      "NFT valuations",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data with analytics
async function getNFTPricing(assetId: number) {
  const response = await fetch(\`https://api.asalytic.app/v1/nft/\${assetId}/price\`, {
    headers: {
      'X-API-Key': 'YOUR_API_KEY'
    }
  });
  const pricing: AsalyticPricing = await response.json();
  return pricing;
}

// Get collection metrics
async function getCollectionMetrics(collectionId: string) {
  const response = await fetch(\`https://api.asalytic.app/v1/collections/\${collectionId}/metrics\`, {
    headers: {
      'X-API-Key': 'YOUR_API_KEY'
    }
  });
  const metrics: AsalyticMetrics = await response.json();
  return metrics;
}

// Get rarity ranking
async function getRarityRanking(assetId: number) {
  const response = await fetch(\`https://api.asalytic.app/v1/nft/\${assetId}/rarity\`, {
    headers: {
      'X-API-Key': 'YOUR_API_KEY'
    }
  });
  const data = await response.json();
  return data;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/Asalytic",
    discord: "https://discord.gg/asalytic",
    telegram: null,
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
    rarityRanking: true,
    pricePredictions: true,
    marketTrends: true,
  },
  
  metrics: {
    supported: true,
    endpoints: [
      "Volume statistics",
      "Trading statistics",
      "Collection metrics",
      "Price history",
      "Market trends",
      "Rarity rankings",
      "Price predictions",
      "Market analytics",
    ],
  },
  
  notes: [
    "Advanced NFT analytics platform for Algorand",
    "Requires API key for access",
    "Comprehensive market data and insights",
    "Rarity ranking and price prediction features",
    "Real-time pricing and market analytics",
    "Collection verification available",
  ],
};

export default asalyticMarketplace;

