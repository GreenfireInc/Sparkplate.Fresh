// OKX Ordinals Marketplace Information
// Exchange-backed Ordinals marketplace on Bitcoin
// Source: Research compiled from multiple sources

export interface OKXOrdinalsListing {
  inscriptionId: string;
  inscriptionNumber?: number;
  collection?: string;
  name?: string;
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

export interface OKXOrdinalsCollection {
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

export interface OKXOrdinalsPricing {
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

export const okxOrdinalsMarketplace = {
  name: "OKX Ordinals",
  blockchain: "Bitcoin (Ordinals)",
  type: "Exchange Ordinals Marketplace",
  description: "Ordinals marketplace operated by OKX providing orderbook liquidity, wallet custody, and launchpad drops for Bitcoin inscriptions.",
  
  urls: {
    main: "https://www.okx.com/",
    app: "https://www.okx.com/web3/marketplace/ordinals",
    docs: "https://www.okx.com/web3/build/docs/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://www.okx.com/api/v5/web3/ordinals/",
      base: "https://www.okx.com/api/v5/web3/ordinals/",
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
      getListingsByOwner: "GET /accounts/{address}/listings",
    },
    collections: {
      getCollections: "GET /collections",
      getCollectionById: "GET /collections/{collectionSlug}",
      getCollectionStats: "GET /collections/{collectionSlug}/stats",
      searchCollections: "GET /collections/search",
    },
    inscriptions: {
      getInscription: "GET /inscriptions/{inscriptionId}",
      getInscriptionsByOwner: "GET /accounts/{address}/inscriptions",
      searchInscriptions: "GET /inscriptions/search",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{collectionSlug}/metrics",
    },
    documentation: "https://www.okx.com/web3/build/docs#/ordinals",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: true,
    authentication: {
      type: "API Key required",
      headerName: "OK-ACCESS-KEY",
      getApiKey: "https://www.okx.com/account/api",
    },
  },
  
  sdk: {
    npm: {
      package: "okx-node",
      version: "latest",
      installCommand: "npm install okx-node",
      github: "https://github.com/okx/okx-node",
      npmLink: "https://www.npmjs.com/package/okx-node",
    },
    documentation: "https://www.okx.com/web3/build/docs",
    typescriptSupport: true,
    features: [
      "Orderbook trading",
      "Batch listings",
      "Launchpad drops",
      "Wallet custody integration",
      "Analytics dashboards",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch OKX Ordinals pricing data
async function getOKXOrdinalsPricing(inscriptionId: string, apiKey: string, signature: string, timestamp: string) {
  const response = await fetch(\`https://www.okx.com/api/v5/web3/ordinals/inscriptions/\${inscriptionId}/price\`, {
    headers: {
      'OK-ACCESS-KEY': apiKey,
      'OK-ACCESS-SIGN': signature,
      'OK-ACCESS-TIMESTAMP': timestamp,
    }
  });
  const pricing: OKXOrdinalsPricing = await response.json();
  return pricing;
}

// Get collection floor price (requires OKX API auth)
async function getOKXCollectionFloorPrice(collectionSlug: string, apiKey: string, signature: string, timestamp: string) {
  const response = await fetch(\`https://www.okx.com/api/v5/web3/ordinals/collections/\${collectionSlug}/floor-price\`, {
    headers: {
      'OK-ACCESS-KEY': apiKey,
      'OK-ACCESS-SIGN': signature,
      'OK-ACCESS-TIMESTAMP': timestamp,
    }
  });
  const data = await response.json();
  return data.floorPrice;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/okxweb3",
    discord: null,
    telegram: null,
    medium: "https://medium.com/@okxweb3",
    github: "https://github.com/okx",
  },
  
  features: {
    buyInscriptions: true,
    sellInscriptions: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    launchpad: true,
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
    "Requires OKX account and API credentials for programmatic access",
    "Supports custody via OKX Web3 wallet and CEX integration",
    "Provides launchpad for curated Ordinals drops",
  ],
};

export default okxOrdinalsMarketplace;
