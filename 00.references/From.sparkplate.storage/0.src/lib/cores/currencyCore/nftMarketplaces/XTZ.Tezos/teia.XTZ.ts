// Teia Marketplace Information
// NFT marketplace on Tezos blockchain
// Source: Research compiled from multiple sources

export interface TeiaListing {
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

export interface TeiaCollection {
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

export interface TeiaPricing {
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

export const teiaMarketplace = {
  name: "Teia",
  blockchain: "Tezos",
  type: "Community NFT Marketplace",
  description: "Community-driven NFT marketplace on Tezos blockchain. Features FA2 (TZIP-12) NFT trading with focus on community governance and low fees.",
  
  urls: {
    main: "https://teia.art/",
    app: "https://teia.art/",
    docs: "https://docs.teia.art/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.teia.art/v1/",
      tezos: "https://api.teia.art/v1/",
      base: "https://api.teia.art/v1/",
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
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{contractAddress}/metrics",
    },
    documentation: "https://docs.teia.art/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://teia.art/api",
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
    documentation: "https://docs.teia.art/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Community governance",
      "Low fees",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(contractAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.teia.art/v1/tokens/\${contractAddress}/\${tokenId}/price\`);
  const pricing: TeiaPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(contractAddress: string) {
  const response = await fetch(\`https://api.teia.art/v1/collections/\${contractAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchNFTs(keyword: string) {
  const response = await fetch(\`https://api.teia.art/v1/tokens/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/teia_art",
    discord: "https://discord.gg/teia",
    telegram: null,
    medium: null,
    github: "https://github.com/teia",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    communityGovernance: true,
    lowFees: true,
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
    "Community-driven NFT marketplace on Tezos",
    "Uses FA2 (TZIP-12 multi-asset standard)",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Community governance and low fees",
    "Integrated with Temple wallet",
  ],
};

export default teiaMarketplace;

