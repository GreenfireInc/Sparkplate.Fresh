// Magic Eden Ordinals Marketplace Information
// Primary NFT marketplace for Bitcoin Ordinals
// Source: Research compiled from multiple sources

export interface MagicEdenOrdinalsListing {
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

export interface MagicEdenOrdinalsCollection {
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

export interface MagicEdenOrdinalsPricing {
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

export interface MagicEdenOrdinalsMetrics {
  collectionId: string;
  totalVolume: number;
  floorPrice: number;
  averagePrice: number;
  salesCount: number;
  uniqueOwners: number;
  marketCap?: number;
  priceChange24h?: number;
  priceChange7d?: number;
  priceChange30d?: number;
  volumeChange24h?: number;
  volumeChange7d?: number;
  volumeChange30d?: number;
}

export const magicEdenOrdinalsMarketplace = {
  name: "Magic Eden Ordinals",
  blockchain: "Bitcoin",
  type: "Ordinals NFT Marketplace",
  description: "Primary NFT marketplace for Bitcoin Ordinals. Features inscription-based NFTs, collections, and trading on the Bitcoin blockchain.",
  
  urls: {
    main: "https://magiceden.io/ordinals",
    app: "https://magiceden.io/ordinals",
    docs: "https://docs.magiceden.io/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api-mainnet.magiceden.io/v2/ord/btc/",
      base: "https://api-mainnet.magiceden.io/v2/ord/btc/",
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
      getMarketTrends: "GET /metrics/trends",
    },
    documentation: "https://docs.magiceden.io/reference/ordinals-api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://magiceden.io/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.magiceden.io/",
    typescriptSupport: true,
    features: [
      "Browse Ordinals",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Inscription details",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch Ordinal pricing data
async function getInscriptionPricing(inscriptionId: string) {
  const response = await fetch(\`https://api-mainnet.magiceden.io/v2/ord/btc/inscriptions/\${inscriptionId}/price\`);
  const pricing: MagicEdenOrdinalsPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(collectionId: string) {
  const response = await fetch(\`https://api-mainnet.magiceden.io/v2/ord/btc/collections/\${collectionId}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search Ordinals
async function searchInscriptions(keyword: string) {
  const response = await fetch(\`https://api-mainnet.magiceden.io/v2/ord/btc/inscriptions/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}

// Get inscription details
async function getInscription(inscriptionId: string) {
  const response = await fetch(\`https://api-mainnet.magiceden.io/v2/ord/btc/inscriptions/\${inscriptionId}\`);
  const inscription = await response.json();
  return inscription;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/MagicEden",
    discord: "https://discord.gg/magiceden",
    telegram: null,
    medium: "https://medium.com/@magiceden",
    github: "https://github.com/magiceden-io",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    inscriptionDetails: true,
  },
  
  metrics: {
    supported: true,
    endpoints: [
      "Volume statistics",
      "Trading statistics",
      "Collection metrics",
      "Price history",
      "Market trends",
      "Inscription analytics",
    ],
  },
  
  notes: [
    "Primary NFT marketplace for Bitcoin Ordinals",
    "Uses Ordinals protocol (inscription-based NFTs on satoshis)",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Supports BRC-20 tokens and Ordinals inscriptions",
    "Inscription numbers and IDs supported",
  ],
};

export default magicEdenOrdinalsMarketplace;

