// Babylons Tron Marketplace Information
// DAO-governed NFT marketplace with Tron support
// Source: Research compiled from multiple sources

export interface BabylonsTronListing {
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

export interface BabylonsTronCollection {
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

export interface BabylonsTronPricing {
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

export const babylonsTronMarketplace = {
  name: "Babylons",
  blockchain: "Tron",
  type: "NFT Marketplace & Launchpad",
  description: "DAO-governed multi-chain marketplace offering launchpad drops, staking rewards, and creator tools with Tron network support.",
  
  urls: {
    main: "https://babylons.io/",
    app: "https://babylons.io/",
    docs: "https://docs.babylons.io/",
  },
  
  api: {
    endpoints: {
      tron: "https://tron-api.babylons.io/v1/",
      base: "https://api.babylons.io/v1/",
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
      getStakingStats: "GET /metrics/staking",
    },
    documentation: "https://docs.babylons.io/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://babylons.io/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.babylons.io/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "Launchpad participation",
      "DAO governance",
      "Staking rewards",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch Babylons NFT pricing data on Tron
async function getBabylonsTronPricing(contractAddress: string, tokenId: string) {
  const response = await fetch(\`https://tron-api.babylons.io/v1/nft/\${contractAddress}/\${tokenId}/price\`);
  const pricing: BabylonsTronPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getBabylonsTronCollectionFloor(contractAddress: string) {
  const response = await fetch(\`https://tron-api.babylons.io/v1/collections/\${contractAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchBabylonsTronNFTs(keyword: string) {
  const response = await fetch(\`https://tron-api.babylons.io/v1/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/babylonsofficial",
    discord: "https://discord.gg/babylons",
    telegram: "https://t.me/babylonsofficial",
    medium: "https://medium.com/@babylons",
    github: null,
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    launchpad: true,
    daoGovernance: true,
    stakingRewards: true,
  },
  
  metrics: {
    supported: true,
    endpoints: [
      "Volume statistics",
      "Trading statistics",
      "Collection metrics",
      "Price history",
      "Market trends",
      "Staking metrics",
    ],
  },
  
  notes: [
    "Supports Tron alongside BNB Chain and other networks",
    "DAO-governed with BABY token for governance",
    "Launchpad for curated NFT projects and game partnerships",
  ],
};

export default babylonsTronMarketplace;
