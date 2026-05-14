// Ordinals.com Marketplace Information
// Secondary NFT marketplace for Bitcoin Ordinals
// Source: Research compiled from multiple sources

export interface OrdinalsListing {
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

export interface OrdinalsCollection {
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

export interface OrdinalsPricing {
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

export const ordinalsMarketplace = {
  name: "Ordinals.com",
  blockchain: "Bitcoin",
  type: "Ordinals Explorer & Marketplace",
  description: "Secondary NFT marketplace and explorer for Bitcoin Ordinals. Browse, search, and trade Ordinals inscriptions on the Bitcoin blockchain.",
  
  urls: {
    main: "https://ordinals.com/",
    app: "https://ordinals.com/",
    docs: "https://docs.ordinals.com/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.ordinals.com/v1/",
      base: "https://api.ordinals.com/v1/",
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
      getInscriptionByNumber: "GET /inscriptions/number/{inscriptionNumber}",
      getInscriptionsByCollection: "GET /collections/{collectionId}/inscriptions",
      getInscriptionsByOwner: "GET /accounts/{address}/inscriptions",
      searchInscriptions: "GET /inscriptions/search",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{collectionId}/metrics",
    },
    documentation: "https://docs.ordinals.com/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://ordinals.com/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.ordinals.com/",
    typescriptSupport: true,
    features: [
      "Browse Ordinals",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Inscription explorer",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch Ordinal pricing data
async function getInscriptionPricing(inscriptionId: string) {
  const response = await fetch(\`https://api.ordinals.com/v1/inscriptions/\${inscriptionId}/price\`);
  const pricing: OrdinalsPricing = await response.json();
  return pricing;
}

// Get inscription by number
async function getInscriptionByNumber(inscriptionNumber: number) {
  const response = await fetch(\`https://api.ordinals.com/v1/inscriptions/number/\${inscriptionNumber}\`);
  const inscription = await response.json();
  return inscription;
}

// Search Ordinals
async function searchInscriptions(keyword: string) {
  const response = await fetch(\`https://api.ordinals.com/v1/inscriptions/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/ordinals",
    discord: null,
    telegram: null,
    medium: null,
    github: "https://github.com/ordinals",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    inscriptionExplorer: true,
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
    "Secondary NFT marketplace for Bitcoin Ordinals",
    "Uses Ordinals protocol (inscription-based NFTs on satoshis)",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Inscription explorer functionality",
    "Supports both inscription IDs and numbers",
  ],
};

export default ordinalsMarketplace;

