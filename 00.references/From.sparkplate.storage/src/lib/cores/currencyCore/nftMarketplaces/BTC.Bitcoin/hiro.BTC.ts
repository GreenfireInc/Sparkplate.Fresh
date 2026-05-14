// Hiro Marketplace Information
// NFT marketplace for Bitcoin Ordinals by Hiro
// Source: Research compiled from multiple sources

export interface HiroListing {
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

export interface HiroCollection {
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

export interface HiroPricing {
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

export const hiroMarketplace = {
  name: "Hiro Marketplace",
  blockchain: "Bitcoin",
  type: "Ordinals NFT Marketplace",
  description: "NFT marketplace for Bitcoin Ordinals by Hiro. Features Ordinals trading, collections, and integration with Hiro wallet and tools.",
  
  urls: {
    main: "https://www.hiro.so/",
    app: "https://marketplace.hiro.so/",
    docs: "https://docs.hiro.so/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.hiro.so/v1/ordinals/",
      base: "https://api.hiro.so/v1/ordinals/",
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
    documentation: "https://docs.hiro.so/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://www.hiro.so/api",
    },
  },
  
  sdk: {
    npm: {
      package: "@stacks/connect",
      version: "latest",
      installCommand: "npm install @stacks/connect",
      github: "https://github.com/hirosystems",
      npmLink: "https://www.npmjs.com/package/@stacks/connect",
    },
    documentation: "https://docs.hiro.so/",
    typescriptSupport: true,
    features: [
      "Browse Ordinals",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Hiro wallet integration",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch Ordinal pricing data
async function getInscriptionPricing(inscriptionId: string) {
  const response = await fetch(\`https://api.hiro.so/v1/ordinals/inscriptions/\${inscriptionId}/price\`);
  const pricing: HiroPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(collectionId: string) {
  const response = await fetch(\`https://api.hiro.so/v1/ordinals/collections/\${collectionId}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search Ordinals
async function searchInscriptions(keyword: string) {
  const response = await fetch(\`https://api.hiro.so/v1/ordinals/inscriptions/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/hirosystems",
    discord: "https://discord.gg/hiro",
    telegram: null,
    medium: "https://medium.com/@hirosystems",
    github: "https://github.com/hirosystems",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    hiroWalletIntegration: true,
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
    "NFT marketplace for Bitcoin Ordinals by Hiro",
    "Uses Ordinals protocol (inscription-based NFTs on satoshis)",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Integrated with Hiro wallet and developer tools",
  ],
};

export default hiroMarketplace;

