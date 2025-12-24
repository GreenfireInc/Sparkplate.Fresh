// OrdSwap Marketplace Information
// Ordinal trading marketplace on Bitcoin (Ordinals protocol)
// Source: Research compiled from multiple sources

export interface OrdSwapListing {
  inscriptionId: string;
  inscriptionNumber?: number;
  collection?: string;
  name: string;
  description?: string;
  creator?: string;
  owner: string;
  price?: number;
  currency: string;
  imageUrl?: string;
  contentUrl?: string;
  listedAt?: string;
  properties?: Record<string, unknown>;
}

export interface OrdSwapCollection {
  collectionSlug: string;
  name: string;
  description?: string;
  creator?: string;
  totalSupply: number;
  floorPrice?: number;
  totalVolume?: number;
  imageUrl?: string;
  verified: boolean;
}

export interface OrdSwapPricing {
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

export const ordswapMarketplace = {
  name: "OrdSwap",
  blockchain: "Bitcoin (Ordinals)",
  type: "Ordinal Trading Marketplace",
  description: "Early Ordinals marketplace providing swaps, auction-style listings, and rarity exploration tools for Bitcoin inscriptions.",
  
  urls: {
    main: "https://ordswap.io/",
    app: "https://ordswap.io/",
    docs: "https://docs.ordswap.io/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.ordswap.io/v1/",
      base: "https://api.ordswap.io/v1/",
    },
    pricing: {
      getInscriptionPrice: "GET /inscriptions/{inscriptionId}/price",
      getCollectionFloorPrice: "GET /collections/{collectionSlug}/floor-price",
      getPriceHistory: "GET /inscriptions/{inscriptionId}/price-history",
      getMarketStats: "GET /market/stats",
    },
    listings: {
      getListings: "GET /listings",
      getListingById: "GET /listings/{listingId}",
      getListingsByCollection: "GET /collections/{collectionSlug}/listings",
      getListingsByOwner: "GET /owners/{address}/listings",
    },
    collections: {
      getCollections: "GET /collections",
      getCollectionById: "GET /collections/{collectionSlug}",
      getCollectionStats: "GET /collections/{collectionSlug}/stats",
      searchCollections: "GET /collections/search",
    },
    inscriptions: {
      getInscription: "GET /inscriptions/{inscriptionId}",
      getInscriptionsByOwner: "GET /owners/{address}/inscriptions",
      searchInscriptions: "GET /inscriptions/search",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{collectionSlug}/metrics",
    },
    documentation: "https://docs.ordswap.io/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://ordswap.io/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.ordswap.io/developers",
    typescriptSupport: true,
    features: [
      "Browse inscriptions",
      "Collection rarity tools",
      "Auction-style swaps",
      "Pricing analytics",
      "Collection floor monitoring",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch Ordinal pricing data
async function getOrdinalPricing(inscriptionId: string) {
  const response = await fetch(\`https://api.ordswap.io/v1/inscriptions/\${inscriptionId}/price\`);
  const pricing: OrdSwapPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(collectionSlug: string) {
  const response = await fetch(\`https://api.ordswap.io/v1/collections/\${collectionSlug}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search inscriptions
async function searchInscriptions(keyword: string) {
  const response = await fetch(\`https://api.ordswap.io/v1/inscriptions/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/ordswap",
    discord: "https://discord.gg/ordswap",
    telegram: null,
    medium: null,
    github: null,
  },
  
  features: {
    buyInscriptions: true,
    sellInscriptions: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    rarityTools: true,
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
    "Focuses on early Ordinals collections and rare sats",
    "Supports PSBT-based swaps and custom escrow",
    "Provides rarity scoring and inscription filtering tools",
  ],
};

export default ordswapMarketplace;
