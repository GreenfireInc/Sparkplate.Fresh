// JustLend NFT Marketplace Information
// NFT marketplace on Tron blockchain
// Source: Research compiled from multiple sources

export interface JustLendNFTListing {
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

export interface JustLendNFTCollection {
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

export interface JustLendNFTPricing {
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

export const justlendNFTMarketplace = {
  name: "JustLend NFT",
  blockchain: "Tron",
  type: "NFT Marketplace & DeFi Protocol",
  description: "NFT marketplace integrated with JustLend DeFi protocol on Tron blockchain. Features TRC-721 NFT trading with lending and staking capabilities.",
  
  urls: {
    main: "https://justlend.org/",
    app: "https://justlend.org/",
    docs: "https://docs.justlend.org/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.justlend.org/v1/tron/nft/",
      tron: "https://api.justlend.org/v1/tron/nft/",
      base: "https://api.justlend.org/v1/tron/nft/",
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
    lending: {
      getLendingInfo: "GET /lending/info",
      getCollateralInfo: "GET /lending/collateral",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{contractAddress}/metrics",
    },
    documentation: "https://docs.justlend.org/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://justlend.org/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.justlend.org/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "NFT lending",
      "Collateral support",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(contractAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.justlend.org/v1/tron/nft/nft/\${contractAddress}/\${tokenId}/price\`);
  const pricing: JustLendNFTPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(contractAddress: string) {
  const response = await fetch(\`https://api.justlend.org/v1/tron/nft/collections/\${contractAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Get lending information
async function getLendingInfo() {
  const response = await fetch(\`https://api.justlend.org/v1/tron/nft/lending/info\`);
  const info = await response.json();
  return info;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/justlend",
    discord: "https://discord.gg/justlend",
    telegram: "https://t.me/justlend",
    medium: null,
    github: "https://github.com/justlend",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    nftLending: true,
    collateralSupport: true,
  },
  
  metrics: {
    supported: true,
    endpoints: [
      "Volume statistics",
      "Trading statistics",
      "Collection metrics",
      "Price history",
      "Market trends",
      "Lending metrics",
    ],
  },
  
  notes: [
    "NFT marketplace integrated with JustLend DeFi protocol",
    "Uses TRC-721 (ERC-721 compatible)",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "NFT lending and collateral features",
    "Integrated with JustLend DeFi ecosystem",
  ],
};

export default justlendNFTMarketplace;

