// Superfandom Marketplace Information
// Creator engagement and NFT marketplace on Stacks blockchain
// Source: Research compiled from multiple sources

export interface SuperfandomListing {
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
  properties?: Record<string, unknown>;
}

export interface SuperfandomCollection {
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

export interface SuperfandomPricing {
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

export const superfandomMarketplace = {
  name: "Superfandom",
  blockchain: "Stacks",
  type: "Creator Engagement NFT Marketplace",
  description: "Creator economy platform on Stacks enabling artists and influencers to launch NFTs with fan engagement utilities and experiences secured by Bitcoin.",
  
  urls: {
    main: "https://superfandom.com/",
    app: "https://superfandom.com/",
    docs: "https://docs.superfandom.com/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.superfandom.com/v1/",
      base: "https://api.superfandom.com/v1/",
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
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{contractAddress}/metrics",
      getEngagementMetrics: "GET /metrics/engagement",
    },
    documentation: "https://docs.superfandom.com/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://superfandom.com/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.superfandom.com/developers",
    typescriptSupport: true,
    features: [
      "Creator NFTs",
      "Fan experiences",
      "Analytics dashboards",
      "Engagement tokens",
      "Community governance",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch Superfandom NFT pricing data
async function getSuperfandomNFTPricing(contractAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.superfandom.com/v1/nft/\${contractAddress}/\${tokenId}/price\`);
  const pricing: SuperfandomPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getSuperfandomCollectionFloor(contractAddress: string) {
  const response = await fetch(\`https://api.superfandom.com/v1/collections/\${contractAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchSuperfandomNFTs(keyword: string) {
  const response = await fetch(\`https://api.superfandom.com/v1/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/SuperfandomNFT",
    discord: "https://discord.gg/superfandom",
    telegram: null,
    medium: "https://medium.com/superfandom",
    github: null,
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    fanEngagement: true,
    governance: true,
  },
  
  metrics: {
    supported: true,
    endpoints: [
      "Volume statistics",
      "Trading statistics",
      "Collection metrics",
      "Price history",
      "Market trends",
      "Engagement metrics",
    ],
  },
  
  notes: [
    "Focuses on creator-fan engagement with NFTs on Stacks",
    "Provides experiences like AMAs, virtual events, and gated content",
    "Integrates with Stacks wallets (Xverse, Leather) and Bitcoin settlement",
  ],
};

export default superfandomMarketplace;
