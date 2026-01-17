// Tensor Marketplace Information
// Secondary NFT marketplace on Solana blockchain
// Source: Research compiled from multiple sources

export interface TensorListing {
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

export interface TensorCollection {
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

export interface TensorPricing {
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

export interface TensorMetrics {
  symbol: string;
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

export const tensorMarketplace = {
  name: "Tensor",
  blockchain: "Solana",
  type: "NFT Marketplace & Aggregator",
  description: "Secondary NFT marketplace and aggregator on Solana. Professional-grade NFT trading platform with advanced analytics, portfolio tracking, and marketplace aggregation.",
  
  urls: {
    main: "https://tensor.trade/",
    app: "https://tensor.trade/",
    docs: "https://docs.tensor.trade/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.tensor.trade/api/v1/",
      graphql: "https://api.tensor.trade/graphql",
      base: "https://api.tensor.trade/api/v1/",
    },
    pricing: {
      getNFTPrice: "GET /nft/{tokenMint}/price",
      getCollectionFloorPrice: "GET /collections/{symbol}/floor-price",
      getPriceHistory: "GET /nft/{tokenMint}/price-history",
      getMarketStats: "GET /market/stats",
    },
    listings: {
      getListings: "GET /listings",
      getListingById: "GET /listings/{listingId}",
      getListingsByCollection: "GET /collections/{symbol}/listings",
      getListingsByOwner: "GET /wallets/{address}/listings",
    },
    collections: {
      getCollections: "GET /collections",
      getCollectionById: "GET /collections/{symbol}",
      getCollectionStats: "GET /collections/{symbol}/stats",
      searchCollections: "GET /collections/search",
    },
    nfts: {
      getNFT: "GET /nft/{tokenMint}",
      getNFTsByCollection: "GET /collections/{symbol}/tokens",
      getNFTsByOwner: "GET /wallets/{address}/tokens",
      searchNFTs: "GET /tokens/search",
    },
    analytics: {
      getCollectionAnalytics: "GET /collections/{symbol}/analytics",
      getNFTAnalytics: "GET /nft/{tokenMint}/analytics",
      getPortfolioAnalytics: "GET /wallets/{address}/portfolio",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{symbol}/metrics",
      getMarketTrends: "GET /metrics/trends",
    },
    documentation: "https://docs.tensor.trade/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: true,
    authentication: {
      type: "API Key required",
      headerName: "X-API-Key",
      getApiKey: "https://tensor.trade/api",
    },
  },
  
  sdk: {
    npm: {
      package: "@tensor-hq/tensor-sdk",
      version: "latest",
      installCommand: "npm install @tensor-hq/tensor-sdk",
      github: "https://github.com/tensor-hq/tensor-sdk",
      npmLink: "https://www.npmjs.com/package/@tensor-hq/tensor-sdk",
    },
    documentation: "https://docs.tensor.trade/developers",
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
async function getNFTPricing(tokenMint: string) {
  const response = await fetch(\`https://api.tensor.trade/api/v1/nft/\${tokenMint}/price\`, {
    headers: {
      'X-API-Key': 'YOUR_API_KEY'
    }
  });
  const pricing: TensorPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(symbol: string) {
  const response = await fetch(\`https://api.tensor.trade/api/v1/collections/\${symbol}/floor-price\`, {
    headers: {
      'X-API-Key': 'YOUR_API_KEY'
    }
  });
  const data = await response.json();
  return data.floorPrice;
}

// Get portfolio analytics
async function getPortfolioAnalytics(address: string) {
  const response = await fetch(\`https://api.tensor.trade/api/v1/wallets/\${address}/portfolio\`, {
    headers: {
      'X-API-Key': 'YOUR_API_KEY'
    }
  });
  const analytics = await response.json();
  return analytics;
}

// Using Tensor SDK
import { TensorSDK } from '@tensor-hq/tensor-sdk';

const sdk = new TensorSDK({
  apiKey: 'YOUR_API_KEY',
  network: 'mainnet-beta',
});
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/tensor_hq",
    discord: "https://discord.gg/tensor",
    telegram: null,
    medium: null,
    github: "https://github.com/tensor-hq",
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
    "Secondary NFT marketplace for Solana blockchain",
    "Uses Metaplex NFT standard (SPL Token)",
    "Requires API key for access",
    "Real-time pricing and market data",
    "Collection verification available",
    "Professional-grade analytics and portfolio tracking",
    "Marketplace aggregation across multiple platforms",
  ],
};

export default tensorMarketplace;

