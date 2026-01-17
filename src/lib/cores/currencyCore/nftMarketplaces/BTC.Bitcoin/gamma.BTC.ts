// Gamma.io Marketplace Information
// NFT marketplace for Bitcoin Ordinals
// Source: Research compiled from multiple sources

export interface GammaListing {
  inscriptionId: string;
  inscriptionNumber?: number;
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

export interface GammaCollection {
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

export interface GammaPricing {
  inscriptionId: string;
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

export const gammaMarketplace = {
  name: "Gamma.io",
  blockchain: "Bitcoin",
  type: "Ordinals NFT Marketplace",
  description: "NFT marketplace for Bitcoin Ordinals. Features Ordinals trading, collections, and marketplace tools for creators and collectors.",
  
  urls: {
    main: "https://gamma.io/",
    app: "https://gamma.io/ordinals",
    docs: "https://docs.gamma.io/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.gamma.io/v1/ordinals/",
      base: "https://api.gamma.io/v1/ordinals/",
    },
    pricing: {
      getInscriptionPrice: "GET /inscriptions/{inscriptionId}/price",
      getCollectionFloorPrice: "GET /collections/{collectionId}/floor-price",
      getPriceHistory: "GET /inscriptions/{inscriptionId}/price-history",
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
    inscriptions: {
      getInscription: "GET /inscriptions/{inscriptionId}",
      getInscriptionsByCollection: "GET /collections/{collectionId}/inscriptions",
      getInscriptionsByOwner: "GET /accounts/{address}/inscriptions",
      searchInscriptions: "GET /inscriptions/search",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{collectionId}/metrics",
    },
    documentation: "https://docs.gamma.io/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://gamma.io/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.gamma.io/",
    typescriptSupport: true,
    features: [
      "Browse Ordinals",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Creator tools",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch Ordinal pricing data
async function getInscriptionPricing(inscriptionId: string) {
  const response = await fetch(\`https://api.gamma.io/v1/ordinals/inscriptions/\${inscriptionId}/price\`);
  const pricing: GammaPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(collectionId: string) {
  const response = await fetch(\`https://api.gamma.io/v1/ordinals/collections/\${collectionId}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search Ordinals
async function searchInscriptions(keyword: string) {
  const response = await fetch(\`https://api.gamma.io/v1/ordinals/inscriptions/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/gamma_io",
    discord: "https://discord.gg/gamma",
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
    creatorTools: true,
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
    "NFT marketplace for Bitcoin Ordinals",
    "Uses Ordinals protocol (inscription-based NFTs on satoshis)",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Creator-focused tools and features",
  ],
};

export default gammaMarketplace;

