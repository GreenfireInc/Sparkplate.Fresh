// StacksArt Marketplace Information
// NFT marketplace on Stacks blockchain
// Source: Research compiled from multiple sources

export interface StacksArtListing {
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

export interface StacksArtCollection {
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

export interface StacksArtPricing {
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

export const stacksArtMarketplace = {
  name: "StacksArt",
  blockchain: "Stacks",
  type: "NFT Marketplace",
  description: "Early NFT marketplace on Stacks providing curated drops, artist onboarding, and gallery-style browsing for STX-based NFTs.",
  
  urls: {
    main: "https://www.stacksart.com/",
    app: "https://www.stacksart.com/",
    docs: "https://docs.stacksart.com/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.stacksart.com/v1/",
      base: "https://api.stacksart.com/v1/",
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
    },
    documentation: "https://docs.stacksart.com/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://www.stacksart.com/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.stacksart.com/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Curated drops",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch StacksArt NFT pricing data
async function getStacksArtNFTPricing(contractAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.stacksart.com/v1/nft/\${contractAddress}/\${tokenId}/price\`);
  const pricing: StacksArtPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getStacksArtCollectionFloor(contractAddress: string) {
  const response = await fetch(\`https://api.stacksart.com/v1/collections/\${contractAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchStacksArtNFTs(keyword: string) {
  const response = await fetch(\`https://api.stacksart.com/v1/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/StacksArt",
    discord: "https://discord.gg/stacksart",
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
    curatedDrops: true,
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
    "First NFT marketplace launched on the Stacks blockchain",
    "Supports STX-based NFTs with curated drops and collector profiles",
    "Integrates with Gamma and other Stacks wallets",
  ],
};

export default stacksArtMarketplace;
