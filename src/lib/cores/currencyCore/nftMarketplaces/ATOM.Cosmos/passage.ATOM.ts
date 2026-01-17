// Passage Marketplace Information
// Metaverse-focused NFT marketplace on Cosmos (Passage chain)
// Source: Research compiled from multiple sources

export interface PassageListing {
  tokenId: string;
  collectionAddress: string;
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

export interface PassageCollection {
  collectionAddress: string;
  name: string;
  description?: string;
  creator: string;
  totalSupply: number;
  floorPrice?: number;
  totalVolume?: number;
  imageUrl?: string;
  verified: boolean;
}

export interface PassagePricing {
  tokenId: string;
  collectionAddress: string;
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

export const passageMarketplace = {
  name: "Passage",
  blockchain: "Cosmos (Passage)",
  type: "Metaverse NFT Marketplace",
  description: "Immersive metaverse marketplace on the Passage chain (Cosmos SDK) supporting 3D assets, virtual experiences, and game-ready NFTs with cross-chain support via IBC.",
  
  urls: {
    main: "https://passage.io/",
    app: "https://marketplace.passage.io/",
    docs: "https://docs.passage.io/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.passage.io/v1/",
      passageRpc: "https://rpc.passage3d.com/",
      passageRest: "https://rest.passage3d.com/",
      base: "https://api.passage.io/",
    },
    pricing: {
      getNFTPrice: "GET /nft/{collectionAddress}/{tokenId}/price",
      getCollectionFloorPrice: "GET /collections/{collectionAddress}/floor-price",
      getPriceHistory: "GET /nft/{collectionAddress}/{tokenId}/price-history",
      getMarketStats: "GET /market/stats",
    },
    listings: {
      getListings: "GET /listings",
      getListingById: "GET /listings/{listingId}",
      getListingsByCollection: "GET /collections/{collectionAddress}/listings",
      getListingsByOwner: "GET /accounts/{address}/listings",
    },
    collections: {
      getCollections: "GET /collections",
      getCollectionById: "GET /collections/{collectionAddress}",
      getCollectionStats: "GET /collections/{collectionAddress}/stats",
      searchCollections: "GET /collections/search",
    },
    nfts: {
      getNFT: "GET /nft/{collectionAddress}/{tokenId}",
      getNFTsByCollection: "GET /collections/{collectionAddress}/nfts",
      getNFTsByOwner: "GET /accounts/{address}/nfts",
      searchNFTs: "GET /nfts/search",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{collectionAddress}/metrics",
      getMetaverseUsage: "GET /metrics/metaverse",
    },
    documentation: "https://docs.passage.io/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://passage.io/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.passage.io/developers",
    typescriptSupport: true,
    features: [
      "Browse metaverse NFTs",
      "3D asset previews",
      "Experience ticketing",
      "Analytics dashboards",
      "IBC-enabled swaps",
      "Creator storefronts",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch Passage NFT pricing data
async function getPassageNFTPricing(collectionAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.passage.io/v1/nft/\${collectionAddress}/\${tokenId}/price\`);
  const pricing: PassagePricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(collectionAddress: string) {
  const response = await fetch(\`https://api.passage.io/v1/collections/\${collectionAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchPassageNFTs(keyword: string) {
  const response = await fetch(\`https://api.passage.io/v1/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/passageio",
    discord: "https://discord.gg/passage",
    telegram: null,
    medium: "https://medium.com/@passage3d",
    github: "https://github.com/passage-official",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    metaverseExperiences: true,
    ibcEnabled: true,
  },
  
  metrics: {
    supported: true,
    endpoints: [
      "Volume statistics",
      "Trading statistics",
      "Collection metrics",
      "Price history",
      "Market trends",
      "Metaverse usage",
    ],
  },
  
  notes: [
    "Supports 3D NFTs and virtual event ticketing for Passage worlds",
    "Built on Cosmos SDK with IBC interoperability",
    "Integrates with Keplr, Leap, and Passage mobile wallet",
    "Offers staking and reward programs for creators and collectors",
  ],
};

export default passageMarketplace;
