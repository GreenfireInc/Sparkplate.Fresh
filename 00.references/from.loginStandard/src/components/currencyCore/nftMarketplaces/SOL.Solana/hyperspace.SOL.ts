// Hyperspace Marketplace Information
// Aggregator and marketplace on Solana blockchain
// Source: Research compiled from multiple sources

export interface HyperspaceListing {
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
  properties?: Record<string, unknown>;
}

export interface HyperspaceCollection {
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

export interface HyperspacePricing {
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

export const hyperspaceMarketplace = {
  name: "Hyperspace",
  blockchain: "Solana",
  type: "NFT Aggregator & Marketplace",
  description: "Solana NFT aggregator providing unified listings, analytics dashboards, and cross-market trading tools across major Solana marketplaces.",
  
  urls: {
    main: "https://hyperspace.xyz/",
    app: "https://hyperspace.xyz/",
    docs: "https://docs.hyperspace.xyz/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.hyperspace.xyz/v1/",
      base: "https://api.hyperspace.xyz/v1/",
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
      getListingsByOwner: "GET /accounts/{address}/listings",
    },
    collections: {
      getCollections: "GET /collections",
      getCollectionById: "GET /collections/{symbol}",
      getCollectionStats: "GET /collections/{symbol}/stats",
      searchCollections: "GET /collections/search",
    },
    nfts: {
      getNFT: "GET /nft/{tokenMint}",
      getNFTsByCollection: "GET /collections/{symbol}/nfts",
      getNFTsByOwner: "GET /accounts/{address}/nfts",
      searchNFTs: "GET /nfts/search",
    },
    analytics: {
      getCollectionAnalytics: "GET /analytics/collections/{symbol}",
      getWalletAnalytics: "GET /analytics/wallets/{address}",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{symbol}/metrics",
    },
    documentation: "https://docs.hyperspace.xyz/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://hyperspace.xyz/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.hyperspace.xyz/developers",
    typescriptSupport: true,
    features: [
      "Cross-market aggregation",
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "Unified listings",
      "Analytics dashboards",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch Hyperspace NFT pricing data
async function getHyperspaceNFTPricing(tokenMint: string) {
  const response = await fetch(\`https://api.hyperspace.xyz/v1/nft/\${tokenMint}/price\`);
  const pricing: HyperspacePricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getHyperspaceCollectionFloor(symbol: string) {
  const response = await fetch(\`https://api.hyperspace.xyz/v1/collections/\${symbol}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs across marketplaces
async function searchHyperspaceNFTs(keyword: string) {
  const response = await fetch(\`https://api.hyperspace.xyz/v1/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/Hyperspace_xyz",
    discord: "https://discord.gg/hyperspace",
    telegram: null,
    medium: "https://medium.com/@hyperspace_xyz",
    github: null,
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    crossMarketAggregation: true,
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
    "Aggregates listings from major Solana marketplaces (Magic Eden, Tensor, etc.)",
    "Provides wallet and collection analytics dashboards",
    "Supports offer aggregation and cross-market execution",
  ],
};

export default hyperspaceMarketplace;
