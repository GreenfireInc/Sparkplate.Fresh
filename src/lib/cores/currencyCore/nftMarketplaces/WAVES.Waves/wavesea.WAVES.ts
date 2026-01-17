// WaveSea Marketplace Information
// NFT marketplace on Waves blockchain
// Source: Research compiled from multiple sources

export interface WaveSeaListing {
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
  properties?: Record<string, unknown>;
}

export interface WaveSeaCollection {
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

export interface WaveSeaPricing {
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

export const waveseaMarketplace = {
  name: "WaveSea",
  blockchain: "Waves",
  type: "NFT Marketplace",
  description: "Community-focused NFT marketplace on Waves with creator launchpad, collection analytics, and low-cost trading infrastructure.",
  
  urls: {
    main: "https://wavesea.app/",
    app: "https://wavesea.app/",
    docs: "https://docs.wavesea.app/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.wavesea.app/v1/",
      base: "https://api.wavesea.app/v1/",
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
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{assetId}/metrics",
    },
    documentation: "https://docs.wavesea.app/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://wavesea.app/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.wavesea.app/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "Launchpad support",
      "Analytics dashboards",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch WaveSea NFT pricing data
async function getWaveSeaNFTPricing(assetId: string) {
  const response = await fetch(\`https://api.wavesea.app/v1/nft/\${assetId}/price\`);
  const pricing: WaveSeaPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getWaveSeaCollectionFloor(assetId: string) {
  const response = await fetch(\`https://api.wavesea.app/v1/collections/\${assetId}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchWaveSeaNFTs(keyword: string) {
  const response = await fetch(\`https://api.wavesea.app/v1/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/wavesea_nft",
    discord: "https://discord.gg/wavesea",
    telegram: "https://t.me/wavesea",
    medium: "https://medium.com/@wavesea",
    github: null,
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
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
    "Built on Waves with support for native asset issuance and launchpad",
    "Provides low-fee trading and analytics dashboards",
    "Integrates with Waves Keeper and other Waves wallets",
  ],
};

export default waveseaMarketplace;
