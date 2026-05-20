// AirNFTs Tron Marketplace Information
// Multi-chain NFT marketplace with strong presence on Tron network
// Source: Research compiled from multiple sources

export interface AirNFTsTronListing {
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

export interface AirNFTsTronCollection {
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

export interface AirNFTsTronPricing {
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

export const airnftsTronMarketplace = {
  name: "AirNFTs (Tron)",
  blockchain: "Tron",
  type: "NFT Marketplace",
  description: "Creator-friendly NFT marketplace supporting Tron, BNB Chain, Polygon, and Fantom with low-cost minting and launchpad features.",
  
  urls: {
    main: "https://www.airnfts.com/",
    app: "https://www.airnfts.com/",
    docs: "https://docs.airnfts.com/",
  },
  
  api: {
    endpoints: {
      tron: "https://tron-api.airnfts.com/v1/",
      base: "https://api.airnfts.com/v1/",
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
    },
    documentation: "https://docs.airnfts.com/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://www.airnfts.com/",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.airnfts.com/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "Launchpad drops",
      "Cross-chain minting",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch AirNFTs pricing data on Tron
async function getAirNFTsTronPricing(contractAddress: string, tokenId: string) {
  const response = await fetch(\`https://tron-api.airnfts.com/v1/nft/\${contractAddress}/\${tokenId}/price\`);
  const pricing: AirNFTsTronPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getAirNFTsTronCollectionFloor(contractAddress: string) {
  const response = await fetch(\`https://tron-api.airnfts.com/v1/collections/\${contractAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchAirNFTsTron(keyword: string) {
  const response = await fetch(\`https://tron-api.airnfts.com/v1/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/airnfts",
    discord: "https://discord.gg/airnfts",
    telegram: "https://t.me/airnfts",
    medium: "https://medium.com/@airnfts",
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
    crossChainSupport: true,
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
    "Supports Tron alongside BNB Chain, Polygon, and Fantom",
    "Offers low-cost minting and launchpad for NFT creators",
    "Integrates with TronLink and WalletConnect",
  ],
};

export default airnftsTronMarketplace;
