// fxhash Marketplace Information
// Secondary NFT marketplace on Tezos blockchain
// Source: Research compiled from multiple sources

export interface FxhashListing {
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

export interface FxhashCollection {
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

export interface FxhashPricing {
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

export const fxhashMarketplace = {
  name: "fxhash",
  blockchain: "Tezos",
  type: "Generative Art NFT Marketplace",
  description: "Secondary NFT marketplace for generative art on Tezos blockchain. Features FA2 (TZIP-12) NFT trading with focus on generative and algorithmic art.",
  
  urls: {
    main: "https://fxhash.xyz/",
    app: "https://fxhash.xyz/",
    docs: "https://docs.fxhash.xyz/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.fxhash.xyz/v1/",
      tezos: "https://api.fxhash.xyz/v1/",
      base: "https://api.fxhash.xyz/v1/",
    },
    pricing: {
      getNFTPrice: "GET /tokens/{contractAddress}/{tokenId}/price",
      getCollectionFloorPrice: "GET /collections/{contractAddress}/floor-price",
      getPriceHistory: "GET /tokens/{contractAddress}/{tokenId}/price-history",
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
      getNFT: "GET /tokens/{contractAddress}/{tokenId}",
      getNFTsByCollection: "GET /collections/{contractAddress}/tokens",
      getNFTsByOwner: "GET /accounts/{address}/tokens",
      searchNFTs: "GET /tokens/search",
    },
    generative: {
      getGenerativeProjects: "GET /generative/projects",
      getProjectStats: "GET /generative/projects/{projectId}/stats",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{contractAddress}/metrics",
    },
    documentation: "https://docs.fxhash.xyz/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://fxhash.xyz/api",
    },
  },
  
  sdk: {
    npm: {
      package: "@taquito/taquito",
      version: "latest",
      installCommand: "npm install @taquito/taquito",
      github: "https://github.com/ecadlabs/taquito",
      npmLink: "https://www.npmjs.com/package/@taquito/taquito",
    },
    documentation: "https://docs.fxhash.xyz/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Generative art focus",
      "Algorithmic art support",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(contractAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.fxhash.xyz/v1/tokens/\${contractAddress}/\${tokenId}/price\`);
  const pricing: FxhashPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(contractAddress: string) {
  const response = await fetch(\`https://api.fxhash.xyz/v1/collections/\${contractAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Get generative projects
async function getGenerativeProjects() {
  const response = await fetch(\`https://api.fxhash.xyz/v1/generative/projects\`);
  const projects = await response.json();
  return projects;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/fx_hash_",
    discord: "https://discord.gg/fxhash",
    telegram: null,
    medium: "https://medium.com/@fxhash",
    github: "https://github.com/fxhash",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    generativeArtFocus: true,
    algorithmicArtSupport: true,
  },
  
  metrics: {
    supported: true,
    endpoints: [
      "Volume statistics",
      "Trading statistics",
      "Collection metrics",
      "Price history",
      "Market trends",
      "Generative art statistics",
    ],
  },
  
  notes: [
    "Secondary NFT marketplace for generative art on Tezos",
    "Uses FA2 (TZIP-12 multi-asset standard)",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Focus on generative and algorithmic art",
    "Integrated with Temple wallet",
  ],
};

export default fxhashMarketplace;

