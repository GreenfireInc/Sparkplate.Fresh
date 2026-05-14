// ALGOxNFT Marketplace Information
// NFT marketplace on Algorand blockchain
// Source: Research compiled from multiple sources

export interface ALGOxNFTListing {
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

export interface ALGOxNFTCollection {
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

export interface ALGOxNFTPricing {
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

export const algoxnftMarketplace = {
  name: "ALGOxNFT",
  blockchain: "Algorand",
  type: "NFT Marketplace",
  description: "Community-driven NFT marketplace on Algorand offering shuffles, auctions, and curated drops for Algorand Standard Assets (ASA).",
  
  urls: {
    main: "https://algoxnft.com/",
    app: "https://algoxnft.com/",
    docs: null,
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.algoxnft.com/",
      base: "https://api.algoxnft.com/",
    },
    pricing: {
      getNFTPrice: "GET /nft/{assetId}/price",
      getCollectionFloorPrice: "GET /collection/{collectionId}/floor-price",
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
    },
    documentation: null,
    rateLimit: "Rate limits apply (check platform announcements for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://algoxnft.com/",
    },
  },
  
  sdk: {
    npm: null,
    documentation: null,
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "Run collectible shuffles",
      "Auction support",
      "Whitelist-gated drops",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(assetId: number) {
  const response = await fetch(\`https://api.algoxnft.com/nft/\${assetId}/price\`);
  const pricing: ALGOxNFTPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(collectionId: string) {
  const response = await fetch(\`https://api.algoxnft.com/collection/\${collectionId}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchNFTs(query: string) {
  const response = await fetch(\`https://api.algoxnft.com/nfts/search?q=\${encodeURIComponent(query)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/ALGOxNFT",
    discord: "https://discord.gg/algoxnft",
    telegram: null,
    medium: "https://medium.com/@ALGOxNFT",
    github: null,
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    shuffles: true,
    auctions: true,
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
    "Algorand-native NFT marketplace with focus on shuffles and curated drops",
    "Supports Algorand Standard Asset (ASA) NFTs",
    "Provides auction, shuffle, and instant-buy mechanics",
    "Community-driven curation with featured artists",
  ],
};

export default algoxnftMarketplace;
