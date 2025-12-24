// OpenOrdex Marketplace Information
// Decentralized NFT marketplace for Bitcoin Ordinals
// Source: Research compiled from multiple sources

export interface OpenOrdexListing {
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

export interface OpenOrdexCollection {
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

export interface OpenOrdexPricing {
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

export const openOrdexMarketplace = {
  name: "OpenOrdex",
  blockchain: "Bitcoin",
  type: "Decentralized Ordinals Marketplace",
  description: "Decentralized NFT marketplace for Bitcoin Ordinals. Features trustless trading using Partially Signed Bitcoin Transactions (PSBTs).",
  
  urls: {
    main: "https://openordex.org/",
    app: "https://openordex.org/",
    docs: "https://docs.openordex.org/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.openordex.org/v1/",
      base: "https://api.openordex.org/v1/",
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
    psbt: {
      createPSBT: "POST /psbt/create",
      getPSBT: "GET /psbt/{psbtId}",
      broadcastPSBT: "POST /psbt/broadcast",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{collectionId}/metrics",
    },
    documentation: "https://docs.openordex.org/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://openordex.org/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.openordex.org/",
    typescriptSupport: true,
    features: [
      "Browse Ordinals",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "PSBT support",
      "Decentralized trading",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch Ordinal pricing data
async function getInscriptionPricing(inscriptionId: string) {
  const response = await fetch(\`https://api.openordex.org/v1/inscriptions/\${inscriptionId}/price\`);
  const pricing: OpenOrdexPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(collectionId: string) {
  const response = await fetch(\`https://api.openordex.org/v1/collections/\${collectionId}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Create PSBT for trade
async function createPSBT(listingId: string) {
  const response = await fetch(\`https://api.openordex.org/v1/psbt/create\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ listingId })
  });
  const psbt = await response.json();
  return psbt;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/openordex",
    discord: "https://discord.gg/openordex",
    telegram: null,
    medium: null,
    github: "https://github.com/openordex",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    psbtSupport: true,
    decentralizedTrading: true,
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
    "Decentralized NFT marketplace for Bitcoin Ordinals",
    "Uses Ordinals protocol (inscription-based NFTs on satoshis)",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "PSBT (Partially Signed Bitcoin Transactions) support",
    "Trustless trading without intermediaries",
  ],
};

export default openOrdexMarketplace;

