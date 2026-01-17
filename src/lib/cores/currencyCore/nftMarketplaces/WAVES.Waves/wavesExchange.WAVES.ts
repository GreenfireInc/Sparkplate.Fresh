// Waves Exchange Marketplace Information
// Secondary NFT marketplace on Waves blockchain
// Source: Research compiled from multiple sources

export interface WavesExchangeListing {
  assetId: string;
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

export interface WavesExchangeCollection {
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

export interface WavesExchangePricing {
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

export const wavesExchangeMarketplace = {
  name: "Waves Exchange",
  blockchain: "Waves",
  type: "Hybrid Exchange & NFT Marketplace",
  description: "Secondary NFT marketplace on Waves blockchain. Official Waves exchange with NFT trading features, gateway services, and staking integration.",
  
  urls: {
    main: "https://waves.exchange/",
    app: "https://waves.exchange/",
    docs: "https://docs.waves.exchange/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.waves.exchange/v1/waves/nft/",
      waves: "https://api.waves.exchange/v1/waves/nft/",
      base: "https://api.waves.exchange/v1/waves/nft/",
    },
    pricing: {
      getNFTPrice: "GET /nft/{assetId}/price",
      getCollectionFloorPrice: "GET /collections/{assetId}/floor-price",
      getPriceHistory: "GET /nft/{assetId}/price-history",
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
      getNFT: "GET /nft/{assetId}",
      getNFTsByCollection: "GET /collections/{assetId}/nfts",
      getNFTsByOwner: "GET /accounts/{address}/nfts",
      searchNFTs: "GET /nfts/search",
    },
    exchange: {
      getOrderbook: "GET /exchange/orderbook/{assetId}",
      getTrades: "GET /exchange/trades/{assetId}",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{assetId}/metrics",
    },
    documentation: "https://docs.waves.exchange/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://waves.exchange/api",
    },
  },
  
  sdk: {
    npm: {
      package: "@waves/waves-transactions",
      version: "latest",
      installCommand: "npm install @waves/waves-transactions",
      github: "https://github.com/wavesplatform/waves-transactions",
      npmLink: "https://www.npmjs.com/package/@waves/waves-transactions",
    },
    documentation: "https://docs.waves.exchange/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Exchange integration",
      "Gateway services",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(assetId: string) {
  const response = await fetch(\`https://api.waves.exchange/v1/waves/nft/nft/\${assetId}/price\`);
  const pricing: WavesExchangePricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(assetId: string) {
  const response = await fetch(\`https://api.waves.exchange/v1/waves/nft/collections/\${assetId}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Get orderbook
async function getOrderbook(assetId: string) {
  const response = await fetch(\`https://api.waves.exchange/v1/waves/nft/exchange/orderbook/\${assetId}\`);
  const orderbook = await response.json();
  return orderbook;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/wavesexchange",
    discord: "https://discord.gg/waves",
    telegram: "https://t.me/wavesnews",
    medium: null,
    github: "https://github.com/wavesplatform",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    exchangeIntegration: true,
    gatewayServices: true,
  },
  
  metrics: {
    supported: true,
    endpoints: [
      "Volume statistics",
      "Trading statistics",
      "Collection metrics",
      "Price history",
      "Market trends",
      "Exchange metrics",
    ],
  },
  
  notes: [
    "Secondary NFT marketplace for Waves blockchain",
    "Uses Waves NFT standard (Issue Transaction)",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Integrated with Waves Exchange",
    "Gateway services for fiat on/off-ramps",
  ],
};

export default wavesExchangeMarketplace;

