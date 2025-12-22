// Magic Eden Solana Marketplace Information
// Primary NFT marketplace on Solana blockchain
// Source: Research compiled from multiple sources

export interface MagicEdenSolanaListing {
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

export interface MagicEdenSolanaCollection {
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

export interface MagicEdenSolanaPricing {
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

export interface MagicEdenSolanaMetrics {
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

export const magicEdenSolanaMarketplace = {
  name: "Magic Eden",
  blockchain: "Solana",
  type: "NFT Marketplace",
  description: "Primary NFT marketplace on Solana blockchain. The largest NFT marketplace on Solana featuring Metaplex NFTs, collections, and comprehensive marketplace tools.",
  
  urls: {
    main: "https://magiceden.io/",
    app: "https://magiceden.io/",
    docs: "https://docs.magiceden.io/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api-mainnet.magiceden.io/v2/",
      solana: "https://api-mainnet.magiceden.io/v2/",
      base: "https://api-mainnet.magiceden.io/v2/",
    },
    pricing: {
      getNFTPrice: "GET /tokens/{tokenMint}/listings",
      getCollectionFloorPrice: "GET /collections/{symbol}/stats",
      getPriceHistory: "GET /tokens/{tokenMint}/activities",
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
      getNFT: "GET /tokens/{tokenMint}",
      getNFTsByCollection: "GET /collections/{symbol}/tokens",
      getNFTsByOwner: "GET /wallets/{address}/tokens",
      searchNFTs: "GET /tokens/search",
    },
    activities: {
      getActivities: "GET /activities",
      getNFTActivities: "GET /tokens/{tokenMint}/activities",
      getCollectionActivities: "GET /collections/{symbol}/activities",
    },
    metrics: {
      getVolumeStats: "GET /market/stats/volume",
      getTradingStats: "GET /market/stats/trading",
      getCollectionMetrics: "GET /collections/{symbol}/metrics",
      getMarketTrends: "GET /market/stats/trends",
    },
    documentation: "https://docs.magiceden.io/reference/solana-api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://magiceden.io/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.magiceden.io/",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Activity tracking",
      "Multi-chain support",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(tokenMint: string) {
  const response = await fetch(\`https://api-mainnet.magiceden.io/v2/tokens/\${tokenMint}/listings\`);
  const listings = await response.json();
  return listings;
}

// Get collection floor price
async function getCollectionFloorPrice(symbol: string) {
  const response = await fetch(\`https://api-mainnet.magiceden.io/v2/collections/\${symbol}/stats\`);
  const stats = await response.json();
  return stats.floorPrice;
}

// Search NFTs
async function searchNFTs(keyword: string) {
  const response = await fetch(\`https://api-mainnet.magiceden.io/v2/tokens/search?q=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.tokens;
}

// Get NFT activities
async function getNFTActivities(tokenMint: string) {
  const response = await fetch(\`https://api-mainnet.magiceden.io/v2/tokens/\${tokenMint}/activities\`);
  const activities = await response.json();
  return activities;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/MagicEden",
    discord: "https://discord.gg/magiceden",
    telegram: null,
    medium: "https://medium.com/@magiceden",
    github: "https://github.com/magiceden-io",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    activityTracking: true,
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
      "Activity tracking",
    ],
  },
  
  notes: [
    "Primary NFT marketplace for Solana blockchain",
    "Uses Metaplex NFT standard (SPL Token)",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Comprehensive activity tracking",
    "Multi-chain support (Solana, Bitcoin, Ethereum)",
  ],
};

export default magicEdenSolanaMarketplace;

