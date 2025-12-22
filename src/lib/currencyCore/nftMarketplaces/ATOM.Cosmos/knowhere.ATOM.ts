// Knowhere Marketplace Information
// NFT marketplace on Cosmos/Terra ecosystem
// Source: Research compiled from multiple sources

export interface KnowhereListing {
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
  properties?: Record<string, any>;
}

export interface KnowhereCollection {
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

export interface KnowherePricing {
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

export const knowhereMarketplace = {
  name: "Knowhere",
  blockchain: "Cosmos/Terra",
  type: "NFT Marketplace",
  description: "NFT marketplace for Terra and Cosmos ecosystem. Enables trading of NFTs across the Cosmos ecosystem with IBC support.",
  
  urls: {
    main: "https://knowhere.art/",
    app: "https://knowhere.art/",
    docs: "https://docs.knowhere.art/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.knowhere.art/v1/",
      terra: "https://api.knowhere.art/terra/v1/",
      base: "https://api.knowhere.art/",
    },
    pricing: {
      getNFTPrice: "GET /nft/{collectionAddress}/{tokenId}/price",
      getCollectionFloorPrice: "GET /collection/{collectionAddress}/floor-price",
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
    },
    documentation: "https://docs.knowhere.art/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://knowhere.art/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.knowhere.art/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Cross-chain support",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(collectionAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.knowhere.art/v1/nft/\${collectionAddress}/\${tokenId}/price\`);
  const pricing: KnowherePricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(collectionAddress: string) {
  const response = await fetch(\`https://api.knowhere.art/v1/collections/\${collectionAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchNFTs(query: string) {
  const response = await fetch(\`https://api.knowhere.art/v1/nfts/search?q=\${encodeURIComponent(query)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/knowhere_art",
    discord: "https://discord.gg/knowhere",
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
    crossChainSupport: true,
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
    "NFT marketplace for Terra and Cosmos ecosystem",
    "Uses CosmWasm smart contracts (CW721 standard)",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Supports IBC (Inter-Blockchain Communication)",
    "Cross-chain NFT trading capabilities",
  ],
};

export default knowhereMarketplace;

