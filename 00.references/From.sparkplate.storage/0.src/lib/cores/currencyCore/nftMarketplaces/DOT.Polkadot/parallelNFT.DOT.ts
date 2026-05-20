// Parallel Finance NFT Marketplace Information
// NFT marketplace and lending platform on Polkadot (Parallel Finance)
// Source: Research compiled from multiple sources

export interface ParallelNFTListing {
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

export interface ParallelNFTCollection {
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

export interface ParallelNFTPricing {
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

export const parallelNFTMarketplace = {
  name: "Parallel NFT",
  blockchain: "Polkadot (Parallel Finance)",
  type: "NFT & DeFi Marketplace",
  description: "NFT marketplace integrated with Parallel Finance parachain, enabling collateralized NFTs, liquid staking rewards, and lending utilities across Polkadot.",
  
  urls: {
    main: "https://parallel.fi/",
    app: "https://app.parallel.fi/nft",
    docs: "https://docs.parallel.fi/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.parallel.fi/v1/",
      base: "https://api.parallel.fi/v1/",
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
      getCollateralStats: "GET /metrics/collateral",
    },
    documentation: "https://docs.parallel.fi/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://parallel.fi/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.parallel.fi/developers",
    typescriptSupport: true,
    features: [
      "Browse Polkadot NFTs",
      "Collateralized lending",
      "Liquid staking rewards",
      "Analytics dashboards",
      "Cross-chain support",
      "Launchpad drops",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch Parallel NFT pricing data
async function getParallelNFTPricing(collectionAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.parallel.fi/v1/nft/\${collectionAddress}/\${tokenId}/price\`);
  const pricing: ParallelNFTPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(collectionAddress: string) {
  const response = await fetch(\`https://api.parallel.fi/v1/collections/\${collectionAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchParallelNFTs(keyword: string) {
  const response = await fetch(\`https://api.parallel.fi/v1/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/ParallelFi",
    discord: "https://discord.gg/parallelfi",
    telegram: "https://t.me/parallelfi",
    medium: "https://blog.parallel.fi/",
    github: "https://github.com/parallel-finance",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    collateralization: true,
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
      "Collateral metrics",
    ],
  },
  
  notes: [
    "Integrates with Parallel Finance DeFi suite for NFT-backed loans",
    "Supports xDOT staking derivatives and cross-chain transfers",
    "Launchpad for ecosystem NFT drops and game partners",
  ],
};

export default parallelNFTMarketplace;
