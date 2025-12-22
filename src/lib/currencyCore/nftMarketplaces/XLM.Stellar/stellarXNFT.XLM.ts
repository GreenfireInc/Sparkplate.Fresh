// StellarX NFT Marketplace Information
// NFT marketplace on Stellar blockchain
// Source: Research compiled from multiple sources

export interface StellarXNFTListing {
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

export interface StellarXNFTCollection {
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

export interface StellarXNFTPricing {
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

export const stellarXNFTMarketplace = {
  name: "StellarX NFT",
  blockchain: "Stellar",
  type: "Native DEX & NFT Marketplace",
  description: "NFT marketplace built on Stellar's native decentralized exchange. Features Stellar native asset NFTs with advanced trading features and DEX integration.",
  
  urls: {
    main: "https://www.stellarx.com/",
    app: "https://www.stellarx.com/",
    docs: "https://docs.stellarx.com/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.stellarx.com/v1/stellar/nft/",
      stellar: "https://api.stellarx.com/v1/stellar/nft/",
      base: "https://api.stellarx.com/v1/stellar/nft/",
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
    dex: {
      getOrderbook: "GET /dex/orderbook/{assetId}",
      getTrades: "GET /dex/trades/{assetId}",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{assetId}/metrics",
    },
    documentation: "https://docs.stellarx.com/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://www.stellarx.com/api",
    },
  },
  
  sdk: {
    npm: {
      package: "@stellar/stellar-sdk",
      version: "latest",
      installCommand: "npm install @stellar/stellar-sdk",
      github: "https://github.com/stellar/js-stellar-sdk",
      npmLink: "https://www.npmjs.com/package/@stellar/stellar-sdk",
    },
    documentation: "https://docs.stellarx.com/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Native DEX integration",
      "Advanced trading features",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(assetId: string) {
  const response = await fetch(\`https://api.stellarx.com/v1/stellar/nft/nft/\${assetId}/price\`);
  const pricing: StellarXNFTPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(assetId: string) {
  const response = await fetch(\`https://api.stellarx.com/v1/stellar/nft/collections/\${assetId}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Get DEX orderbook
async function getOrderbook(assetId: string) {
  const response = await fetch(\`https://api.stellarx.com/v1/stellar/nft/dex/orderbook/\${assetId}\`);
  const orderbook = await response.json();
  return orderbook;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/stellarx",
    discord: "https://discord.gg/stellar",
    telegram: "https://t.me/stellar",
    medium: null,
    github: "https://github.com/stellarx",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    nativeDEXIntegration: true,
    advancedTradingFeatures: true,
  },
  
  metrics: {
    supported: true,
    endpoints: [
      "Volume statistics",
      "Trading statistics",
      "Collection metrics",
      "Price history",
      "Market trends",
      "DEX metrics",
    ],
  },
  
  notes: [
    "NFT marketplace built on Stellar's native DEX",
    "Uses Stellar native assets / Soroban tokens",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Native DEX integration for trading",
    "Advanced trading features",
  ],
};

export default stellarXNFTMarketplace;

