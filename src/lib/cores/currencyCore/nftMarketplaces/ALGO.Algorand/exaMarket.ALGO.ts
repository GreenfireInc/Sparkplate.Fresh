// EXA Market Marketplace Information
// NFT marketplace on Algorand blockchain
// Source: Research compiled from multiple sources

export interface EXAMarketListing {
  assetId: number;
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

export interface EXAMarketCollection {
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

export interface EXAMarketPricing {
  assetId: number;
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

export const exaMarketMarketplace = {
  name: "EXA Market",
  blockchain: "Algorand",
  type: "NFT Marketplace",
  description: "Artist-centric NFT marketplace on Algorand known for curated drops, lootbox campaigns, and activity rewards for traders.",
  
  urls: {
    main: "https://exa.market/",
    app: "https://exa.market/",
    docs: "https://docs.exa.market/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.exa.market/v1/",
      base: "https://api.exa.market/v1/",
    },
    pricing: {
      getNFTPrice: "GET /nft/{assetId}/price",
      getCollectionFloorPrice: "GET /collections/{collectionId}/floor-price",
      getPriceHistory: "GET /nft/{assetId}/price-history",
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
    nfts: {
      getNFT: "GET /nft/{assetId}",
      getNFTsByCollection: "GET /collections/{collectionId}/nfts",
      getNFTsByOwner: "GET /accounts/{address}/nfts",
      searchNFTs: "GET /nfts/search",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{collectionId}/metrics",
      getRewardsActivity: "GET /rewards/activity",
    },
    documentation: "https://docs.exa.market/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://exa.market/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.exa.market/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Lootbox campaigns",
      "Activity rewards",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(assetId: number) {
  const response = await fetch(\`https://api.exa.market/v1/nft/\${assetId}/price\`);
  const pricing: EXAMarketPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(collectionId: string) {
  const response = await fetch(\`https://api.exa.market/v1/collections/\${collectionId}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchNFTs(query: string) {
  const response = await fetch(\`https://api.exa.market/v1/nfts/search?q=\${encodeURIComponent(query)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/examarket_",
    discord: "https://discord.gg/examarket",
    telegram: null,
    medium: "https://medium.com/@EXAMarket",
    github: "https://github.com/examarket",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    lootboxes: true,
    tradingRewards: true,
  },
  
  metrics: {
    supported: true,
    endpoints: [
      "Volume statistics",
      "Trading statistics",
      "Collection metrics",
      "Price history",
      "Market trends",
      "Rewards activity",
    ],
  },
  
  notes: [
    "Artist-focused marketplace featuring curated drops and experimental campaigns",
    "Supports Algorand Standard Asset (ASA) NFTs",
    "Offers lootbox mechanics and trading incentives",
    "Provides analytics dashboards for collections and wallets",
  ],
};

export default exaMarketMarketplace;
