// PancakeSwap NFT Marketplace Information
// NFT marketplace on BNB Smart Chain by PancakeSwap
// Source: Research compiled from multiple sources

export interface PancakeSwapNFTListing {
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

export interface PancakeSwapNFTCollection {
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

export interface PancakeSwapNFTPricing {
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

export const pancakeSwapNFTMarketplace = {
  name: "PancakeSwap NFT Marketplace",
  blockchain: "BNB Smart Chain",
  type: "NFT Marketplace",
  description: "NFT marketplace integrated with PancakeSwap DEX on BNB Smart Chain. Features NFT trading, collections, and integration with PancakeSwap ecosystem.",
  
  urls: {
    main: "https://pancakeswap.finance/nfts",
    app: "https://pancakeswap.finance/nfts",
    docs: "https://docs.pancakeswap.finance/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.pancakeswap.info/api/v2/",
      nft: "https://nft.pancakeswap.com/api/v1/",
      base: "https://nft.pancakeswap.com/api/v1/",
    },
    pricing: {
      getNFTPrice: "GET /nft/{contractAddress}/{tokenId}/price",
      getCollectionFloorPrice: "GET /collection/{contractAddress}/floor-price",
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
    documentation: "https://docs.pancakeswap.finance/developers/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://pancakeswap.finance/api",
    },
  },
  
  sdk: {
    npm: {
      package: "@pancakeswap/sdk",
      version: "latest",
      installCommand: "npm install @pancakeswap/sdk",
      github: "https://github.com/pancakeswap/pancake-frontend",
      npmLink: "https://www.npmjs.com/package/@pancakeswap/sdk",
    },
    documentation: "https://docs.pancakeswap.finance/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "DEX integration",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(contractAddress: string, tokenId: string) {
  const response = await fetch(\`https://nft.pancakeswap.com/api/v1/nft/\${contractAddress}/\${tokenId}/price\`);
  const pricing: PancakeSwapNFTPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(contractAddress: string) {
  const response = await fetch(\`https://nft.pancakeswap.com/api/v1/collections/\${contractAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchNFTs(keyword: string) {
  const response = await fetch(\`https://nft.pancakeswap.com/api/v1/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/pancakeswap",
    discord: "https://discord.gg/pancakeswap",
    telegram: "https://t.me/pancakeswap",
    medium: "https://medium.com/@pancakeswap",
    github: "https://github.com/pancakeswap",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    dexIntegration: true,
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
    "NFT marketplace integrated with PancakeSwap DEX",
    "Uses BEP-721 (ERC-721 compatible) and BEP-1155 standards",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Integrated with PancakeSwap ecosystem",
  ],
};

export default pancakeSwapNFTMarketplace;

