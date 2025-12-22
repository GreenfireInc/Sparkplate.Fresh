// NFT Explorer Marketplace Information
// Primary NFT marketplace on Algorand blockchain
// Source: Research compiled from multiple sources

export interface NFTExplorerListing {
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

export interface NFTExplorerCollection {
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

export interface NFTExplorerPricing {
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

export const nftExplorerMarketplace = {
  name: "NFT Explorer",
  blockchain: "Algorand",
  type: "NFT Marketplace",
  description: "Primary NFT marketplace and explorer for Algorand Standard Assets (ASA) NFTs. Browse, buy, and sell NFTs on the Algorand blockchain.",
  
  urls: {
    main: "https://www.nftexplorer.app/",
    app: "https://www.nftexplorer.app/",
    docs: "https://www.nftexplorer.app/docs",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.nftexplorer.app/v1/",
      base: "https://api.nftexplorer.app/",
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
    documentation: "https://www.nftexplorer.app/api-docs",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://www.nftexplorer.app/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://www.nftexplorer.app/docs",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(assetId: number) {
  const response = await fetch(\`https://api.nftexplorer.app/v1/nft/\${assetId}/price\`);
  const pricing: NFTExplorerPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(collectionId: string) {
  const response = await fetch(\`https://api.nftexplorer.app/v1/collections/\${collectionId}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchNFTs(query: string) {
  const response = await fetch(\`https://api.nftexplorer.app/v1/nfts/search?q=\${encodeURIComponent(query)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/nftexplorer",
    discord: null,
    telegram: null,
    medium: null,
    github: null,
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
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
    "Primary NFT marketplace for Algorand",
    "Supports Algorand Standard Assets (ASA) NFTs",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
  ],
};

export default nftExplorerMarketplace;

