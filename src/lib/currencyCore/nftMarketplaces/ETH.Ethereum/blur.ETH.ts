// Blur Marketplace Information
// Secondary NFT marketplace on Ethereum
// Source: Research compiled from multiple sources

export interface BlurListing {
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

export interface BlurCollection {
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

export interface BlurPricing {
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

export interface BlurMetrics {
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

export const blurMarketplace = {
  name: "Blur",
  blockchain: "Ethereum",
  type: "NFT Marketplace & Aggregator",
  description: "Secondary NFT marketplace and aggregator on Ethereum. Professional-grade NFT trading platform with advanced analytics, portfolio tracking, and marketplace aggregation.",
  
  urls: {
    main: "https://blur.io/",
    app: "https://blur.io/",
    docs: "https://docs.blur.io/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.blur.io/v1/",
      base: "https://api.blur.io/v1/",
    },
    pricing: {
      getNFTPrice: "GET /nft/{contractAddress}/{tokenId}/price",
      getCollectionFloorPrice: "GET /collections/{contractAddress}/floor-price",
      getPriceHistory: "GET /nft/{contractAddress}/{tokenId}/price-history",
      getMarketStats: "GET /market/stats",
    },
    listings: {
      getListings: "GET /listings",
      getListingById: "GET /listings/{listingId}",
      getListingsByCollection: "GET /collections/{contractAddress}/listings",
      getListingsByOwner: "GET /accounts/{address}/listings",
    },
    collections: {
      getCollections: "GET /collections",
      getCollectionById: "GET /collections/{contractAddress}",
      getCollectionStats: "GET /collections/{contractAddress}/stats",
      searchCollections: "GET /collections/search",
    },
    nfts: {
      getNFT: "GET /nft/{contractAddress}/{tokenId}",
      getNFTsByCollection: "GET /collections/{contractAddress}/nfts",
      getNFTsByOwner: "GET /accounts/{address}/nfts",
      searchNFTs: "GET /nfts/search",
    },
    analytics: {
      getCollectionAnalytics: "GET /collections/{contractAddress}/analytics",
      getNFTAnalytics: "GET /nft/{contractAddress}/{tokenId}/analytics",
      getPortfolioAnalytics: "GET /accounts/{address}/portfolio",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{contractAddress}/metrics",
      getMarketTrends: "GET /metrics/trends",
    },
    documentation: "https://docs.blur.io/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: true,
    authentication: {
      type: "API Key required",
      headerName: "X-API-KEY",
      getApiKey: "https://blur.io/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.blur.io/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Portfolio tracking",
      "Marketplace aggregation",
      "Advanced analytics",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(contractAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.blur.io/v1/nft/\${contractAddress}/\${tokenId}/price\`, {
    headers: {
      'X-API-KEY': 'YOUR_API_KEY'
    }
  });
  const pricing: BlurPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(contractAddress: string) {
  const response = await fetch(\`https://api.blur.io/v1/collections/\${contractAddress}/floor-price\`, {
    headers: {
      'X-API-KEY': 'YOUR_API_KEY'
    }
  });
  const data = await response.json();
  return data.floorPrice;
}

// Get portfolio analytics
async function getPortfolioAnalytics(address: string) {
  const response = await fetch(\`https://api.blur.io/v1/accounts/\${address}/portfolio\`, {
    headers: {
      'X-API-KEY': 'YOUR_API_KEY'
    }
  });
  const analytics = await response.json();
  return analytics;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/blur_io",
    discord: "https://discord.gg/blur",
    telegram: null,
    medium: null,
    github: "https://github.com/blur-io",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    portfolioTracking: true,
    marketplaceAggregation: true,
    advancedAnalytics: true,
  },
  
  metrics: {
    supported: true,
    endpoints: [
      "Volume statistics",
      "Trading statistics",
      "Collection metrics",
      "Price history",
      "Market trends",
      "Portfolio analytics",
      "Advanced market analytics",
    ],
  },
  
  notes: [
    "Secondary NFT marketplace for Ethereum",
    "Uses ERC-721 and ERC-1155 standards",
    "Requires API key for access",
    "Real-time pricing and market data",
    "Collection verification available",
    "Professional-grade analytics and portfolio tracking",
    "Marketplace aggregation across multiple platforms",
  ],
};

export default blurMarketplace;

