// Zest Marketplace Information
// NFT marketplace on Algorand blockchain
// Source: Research compiled from multiple sources

export interface ZestListing {
  assetId: number;
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

export interface ZestCollection {
  collectionId: string;
  name: string;
  description?: string;
  creator: string;
  totalSupply: number;
  floorPrice?: number;
  totalVolume?: number;
  imageUrl?: string;
  verified: boolean;
}

export interface ZestPricing {
  assetId: number;
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

export const zestMarketplace = {
  name: "Zest",
  blockchain: "Algorand",
  type: "NFT Marketplace",
  description: "NFT marketplace for Algorand Standard Assets. Browse, buy, and sell NFTs with a focus on digital art and collectibles.",
  
  urls: {
    main: "https://zestbloom.com/",
    app: "https://zestbloom.com/",
    docs: "https://zestbloom.com/docs",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.zestbloom.com/v1/",
      base: "https://api.zestbloom.com/",
    },
    pricing: {
      getNFTPrice: "GET /nft/{assetId}/price",
      getCollectionFloorPrice: "GET /collection/{collectionId}/floor-price",
      getPriceHistory: "GET /nft/{assetId}/price-history",
      getMarketStats: "GET /market/stats",
    },
    listings: {
      getListings: "GET /listings",
      getListingById: "GET /listings/{listingId}",
      getListingsByCollection: "GET /collections/{collectionId}/listings",
      getListingsByOwner: "GET /accounts/{address}/listings",
    },
    collections: {
      getCollections: "GET /collections",
      getCollectionById: "GET /collections/{collectionId}",
      getCollectionStats: "GET /collections/{collectionId}/stats",
      searchCollections: "GET /collections/search",
    },
    nfts: {
      getNFT: "GET /nft/{assetId}",
      getNFTsByCollection: "GET /collections/{collectionId}/nfts",
      getNFTsByOwner: "GET /accounts/{address}/nfts",
      searchNFTs: "GET /nfts/search",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{collectionId}/metrics",
    },
    documentation: "https://zestbloom.com/api-docs",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://zestbloom.com/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://zestbloom.com/docs",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(assetId: number) {
  const response = await fetch(\`https://api.zestbloom.com/v1/nft/\${assetId}/price\`);
  const pricing: ZestPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(collectionId: string) {
  const response = await fetch(\`https://api.zestbloom.com/v1/collections/\${collectionId}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchNFTs(query: string) {
  const response = await fetch(\`https://api.zestbloom.com/v1/nfts/search?q=\${encodeURIComponent(query)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/zestbloom",
    discord: null,
    telegram: null,
    medium: null,
    github: null,
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
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
    "NFT marketplace for Algorand",
    "Supports Algorand Standard Assets (ASA) NFTs",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
  ],
};

export default zestMarketplace;

