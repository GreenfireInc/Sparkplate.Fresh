// Loop Marketplace Information
// NFT launchpad and marketplace on Terra Classic (Loop Markets)
// Source: Research compiled from multiple sources

export interface LoopClassicListing {
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
  properties?: Record<string, unknown>;
}

export interface LoopClassicCollection {
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

export interface LoopClassicPricing {
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

export const loopClassicMarketplace = {
  name: "Loop Markets",
  blockchain: "Terra Classic",
  type: "NFT Marketplace & Launchpad",
  description: "Loop's Terra Classic NFT marketplace and launchpad providing CW721 minting, staking incentives, and DeFi integrations for the LUNC ecosystem.",
  
  urls: {
    main: "https://www.loop.markets/",
    app: "https://app.loop.markets/nft",
    docs: "https://docs.loop.markets/",
  },
  
  api: {
    endpoints: {
      classic: "https://classic-api.loop.markets/v1/",
      base: "https://api.loop.markets/v1/",
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
      getStakingStats: "GET /metrics/staking",
    },
    documentation: "https://docs.loop.markets/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://www.loop.markets/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.loop.markets/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "Launchpad participation",
      "Staking incentives",
      "DeFi integrations",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch Loop Markets NFT pricing data
async function getLoopNFTPricing(collectionAddress: string, tokenId: string) {
  const response = await fetch(\`https://classic-api.loop.markets/v1/nft/\${collectionAddress}/\${tokenId}/price\`);
  const pricing: LoopClassicPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getLoopCollectionFloor(collectionAddress: string) {
  const response = await fetch(\`https://classic-api.loop.markets/v1/collections/\${collectionAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchLoopNFTs(keyword: string) {
  const response = await fetch(\`https://classic-api.loop.markets/v1/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/loop_finance",
    discord: "https://discord.gg/loopfinance",
    telegram: "https://t.me/loopfinance",
    medium: "https://medium.com/@loopfinance",
    github: "https://github.com/loopfinance",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    launchpad: true,
    stakingIncentives: true,
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
    "Loop Markets provided NFT launchpad and marketplace services on Terra Classic",
    "Integrates with Loop DEX and DeFi suite for staking and liquidity",
    "Supports CW721 NFTs with launchpad scheduling and analytics",
  ],
};

export default loopClassicMarketplace;
