// Terra Z Marketplace Information
// Real-world asset (RWA) NFT marketplace on Terra blockchain
// Source: Research compiled from multiple sources

export interface TerraZListing {
  tokenId: string;
  contractAddress: string;
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

export interface TerraZCollection {
  contractAddress: string;
  name: string;
  description?: string;
  creator: string;
  totalSupply: number;
  floorPrice?: number;
  totalVolume?: number;
  imageUrl?: string;
  verified: boolean;
}

export interface TerraZPricing {
  tokenId: string;
  contractAddress: string;
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

export const terraZMarketplace = {
  name: "Terra Z",
  blockchain: "Terra",
  type: "RWA NFT Marketplace",
  description: "Real-world asset NFT marketplace on Terra enabling tokenized real estate, travel experiences, and land-linked NFTs backed by the TerraZ ecosystem.",
  
  urls: {
    main: "https://terraz.io/",
    app: "https://terraz.io/",
    docs: "https://docs.terraz.io/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.terraz.io/v1/",
      base: "https://api.terraz.io/v1/",
    },
    pricing: {
      getNFTPrice: "GET /nft/{contractAddress}/{tokenId}/price",
      getCollectionFloorPrice: "GET /collections/{contractAddress}/floor-price",
      getPriceHistory: "GET /nft/{contractAddress}/{tokenId}/price-history",
      getMarketStats: "GET /market/stats",
    },
    listings: {
      getListings: "GET /listings",
      getListingById: "GET /listings/{listingId}",
      getListingsByCollection: "GET /collections/{contractAddress}/listings",
      getListingsByOwner: "GET /accounts/{address}/listings",
    },
    collections: {
      getCollections: "GET /collections",
      getCollectionById: "GET /collections/{contractAddress}",
      getCollectionStats: "GET /collections/{contractAddress}/stats",
      searchCollections: "GET /collections/search",
    },
    nfts: {
      getNFT: "GET /nft/{contractAddress}/{tokenId}",
      getNFTsByCollection: "GET /collections/{contractAddress}/nfts",
      getNFTsByOwner: "GET /accounts/{address}/nfts",
      searchNFTs: "GET /nfts/search",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{contractAddress}/metrics",
      getRWAUsage: "GET /metrics/rwa",
    },
    documentation: "https://docs.terraz.io/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://terraz.io/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.terraz.io/developers",
    typescriptSupport: true,
    features: [
      "Tokenized real estate",
      "Travel experience NFTs",
      "Land ownership records",
      "Analytics dashboards",
      "DeFi integrations",
      "Reward programs",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch Terra Z NFT pricing data
async function getTerraZNFTPricing(contractAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.terraz.io/v1/nft/\${contractAddress}/\${tokenId}/price\`);
  const pricing: TerraZPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(contractAddress: string) {
  const response = await fetch(\`https://api.terraz.io/v1/collections/\${contractAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchTerraZNFTs(keyword: string) {
  const response = await fetch(\`https://api.terraz.io/v1/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/terra_z_io",
    discord: "https://discord.gg/terraz",
    telegram: "https://t.me/terrazio",
    medium: "https://medium.com/@terra-z",
    github: null,
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    rwaTokenization: true,
    rewards: true,
  },
  
  metrics: {
    supported: true,
    endpoints: [
      "Volume statistics",
      "Trading statistics",
      "Collection metrics",
      "Price history",
      "Market trends",
      "RWA engagement",
    ],
  },
  
  notes: [
    "Focuses on real-world asset NFTs such as real estate and travel rewards",
    "Integrates with Terra DeFi protocols for yield and staking",
    "Provides on-chain registry for land and property-linked tokens",
  ],
};

export default terraZMarketplace;
