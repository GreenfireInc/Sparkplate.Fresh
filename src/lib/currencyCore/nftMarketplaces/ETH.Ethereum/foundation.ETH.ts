// Foundation Marketplace Information
// NFT marketplace on Ethereum
// Source: Research compiled from multiple sources

export interface FoundationListing {
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
  properties?: Record<string, any>;
}

export interface FoundationCollection {
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

export interface FoundationPricing {
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

export const foundationMarketplace = {
  name: "Foundation",
  blockchain: "Ethereum",
  type: "Creator-Focused NFT Marketplace",
  description: "Creator-focused NFT marketplace on Ethereum. Curated platform for digital art and collectibles with emphasis on creator royalties and community.",
  
  urls: {
    main: "https://foundation.app/",
    app: "https://foundation.app/",
    docs: "https://docs.foundation.app/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.foundation.app/v1/",
      base: "https://api.foundation.app/v1/",
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
    creators: {
      getCreator: "GET /creators/{address}",
      getCreatorCollections: "GET /creators/{address}/collections",
      getCreatorStats: "GET /creators/{address}/stats",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{contractAddress}/metrics",
    },
    documentation: "https://docs.foundation.app/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://foundation.app/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.foundation.app/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Creator profiles",
      "Curated collections",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(contractAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.foundation.app/v1/nft/\${contractAddress}/\${tokenId}/price\`);
  const pricing: FoundationPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(contractAddress: string) {
  const response = await fetch(\`https://api.foundation.app/v1/collections/\${contractAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Get creator profile
async function getCreatorProfile(address: string) {
  const response = await fetch(\`https://api.foundation.app/v1/creators/\${address}\`);
  const creator = await response.json();
  return creator;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/foundation",
    discord: "https://discord.gg/foundation",
    telegram: null,
    medium: "https://medium.com/@foundation",
    github: "https://github.com/foundation",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    creatorProfiles: true,
    curatedCollections: true,
  },
  
  metrics: {
    supported: true,
    endpoints: [
      "Volume statistics",
      "Trading statistics",
      "Collection metrics",
      "Price history",
      "Market trends",
      "Creator statistics",
    ],
  },
  
  notes: [
    "Creator-focused NFT marketplace on Ethereum",
    "Uses ERC-721 and ERC-1155 standards",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Emphasis on creator royalties and community",
    "Curated platform for digital art",
  ],
};

export default foundationMarketplace;

