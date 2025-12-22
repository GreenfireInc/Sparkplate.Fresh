// Stellar Society Marketplace Information
// NFT platform on Stellar tokenizing real-world stars
// Source: Research compiled from multiple sources

export interface StellarSocietyListing {
  tokenId: string;
  assetId: string;
  name: string;
  description?: string;
  constellation?: string;
  creator: string;
  owner: string;
  price?: number;
  currency: string;
  imageUrl?: string;
  metadataUrl?: string;
  listedAt?: string;
  properties?: Record<string, unknown>;
}

export interface StellarSocietyCollection {
  assetId: string;
  name: string;
  description?: string;
  creator: string;
  totalSupply: number;
  floorPrice?: number;
  totalVolume?: number;
  imageUrl?: string;
  verified: boolean;
}

export interface StellarSocietyPricing {
  tokenId: string;
  assetId: string;
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

export const stellarSocietyMarketplace = {
  name: "Stellar Society",
  blockchain: "Stellar",
  type: "RWA NFT Marketplace",
  description: "NFT platform on Stellar that tokenizes real-world stars and celestial bodies, providing scientifically annotated star ownership NFTs with viewing applications.",
  
  urls: {
    main: "https://www.stellarsociety.io/",
    app: "https://app.stellarsociety.io/",
    docs: "https://docs.stellarsociety.io/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.stellarsociety.io/v1/",
      base: "https://api.stellarsociety.io/v1/",
    },
    pricing: {
      getNFTPrice: "GET /nft/{assetId}/{tokenId}/price",
      getCollectionFloorPrice: "GET /collections/{assetId}/floor-price",
      getPriceHistory: "GET /nft/{assetId}/{tokenId}/price-history",
      getMarketStats: "GET /market/stats",
    },
    listings: {
      getListings: "GET /listings",
      getListingById: "GET /listings/{listingId}",
      getListingsByCollection: "GET /collections/{assetId}/listings",
      getListingsByOwner: "GET /accounts/{address}/listings",
    },
    collections: {
      getCollections: "GET /collections",
      getCollectionById: "GET /collections/{assetId}",
      getCollectionStats: "GET /collections/{assetId}/stats",
      searchCollections: "GET /collections/search",
    },
    nfts: {
      getNFT: "GET /nft/{assetId}/{tokenId}",
      getNFTsByCollection: "GET /collections/{assetId}/nfts",
      getNFTsByOwner: "GET /accounts/{address}/nfts",
      searchNFTs: "GET /nfts/search",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{assetId}/metrics",
      getAstronomyStats: "GET /metrics/astronomy",
    },
    documentation: "https://docs.stellarsociety.io/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://www.stellarsociety.io/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.stellarsociety.io/developers",
    typescriptSupport: true,
    features: [
      "Star ownership NFTs",
      "Scientific annotations",
      "3D star viewer",
      "Analytics dashboards",
      "Constellation exploration",
      "Real-world asset linkage",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch Stellar Society NFT pricing data
async function getStellarSocietyPricing(assetId: string, tokenId: string) {
  const response = await fetch(\`https://api.stellarsociety.io/v1/nft/\${assetId}/\${tokenId}/price\`);
  const pricing: StellarSocietyPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getStellarSocietyCollectionFloor(assetId: string) {
  const response = await fetch(\`https://api.stellarsociety.io/v1/collections/\${assetId}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search star NFTs
async function searchStellarSocietyNFTs(keyword: string) {
  const response = await fetch(\`https://api.stellarsociety.io/v1/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/StellarSociety_",
    discord: "https://discord.gg/stellarsociety",
    telegram: "https://t.me/stellarsociety",
    medium: "https://medium.com/@stellarsociety",
    github: null,
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    starViewer: true,
    realWorldLink: true,
  },
  
  metrics: {
    supported: true,
    endpoints: [
      "Volume statistics",
      "Trading statistics",
      "Collection metrics",
      "Price history",
      "Market trends",
      "Astronomy metrics",
    ],
  },
  
  notes: [
    "Each NFT corresponds to a real-world star with scientific data",
    "Provides mobile and web star viewer apps",
    "Offers staking rewards and governance utilities",
  ],
};

export default stellarSocietyMarketplace;
