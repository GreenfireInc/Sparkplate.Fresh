// OneOf Marketplace Information
// Music and entertainment-focused NFT marketplace on Tezos (and multi-chain)
// Source: Research compiled from multiple sources

export interface OneOfListing {
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

export interface OneOfCollection {
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

export interface OneOfPricing {
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

export const oneOfMarketplace = {
  name: "OneOf",
  blockchain: "Tezos",
  type: "Music & Entertainment NFT Marketplace",
  description: "Eco-conscious NFT platform focused on music, sports, and entertainment collectibles. Runs primarily on Tezos with multi-chain support (Flow, Polygon).",
  
  urls: {
    main: "https://www.oneof.com/",
    app: "https://www.oneof.com/",
    docs: "https://docs.oneof.com/",
  },
  
  api: {
    endpoints: {
      tezos: "https://api.oneof.com/v1/",
      base: "https://api.oneof.com/v1/",
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
    documentation: "https://docs.oneof.com/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: true,
    authentication: {
      type: "API Key required",
      headerName: "X-API-Key",
      getApiKey: "https://www.oneof.com/account/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.oneof.com/developers",
    typescriptSupport: true,
    features: [
      "Music drops",
      "Artist collectibles",
      "Sports partnerships",
      "Fiat onramps",
      "Marketplace trading",
      "Analytics dashboards",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch OneOf NFT pricing data (requires API key)
async function getOneOfPricing(contractAddress: string, tokenId: string, apiKey: string) {
  const response = await fetch(\`https://api.oneof.com/v1/nft/\${contractAddress}/\${tokenId}/price\`, {
    headers: { 'X-API-Key': apiKey }
  });
  const pricing: OneOfPricing = await response.json();
  return pricing;
}

// Get collection floor price (requires API key)
async function getOneOfCollectionFloor(contractAddress: string, apiKey: string) {
  const response = await fetch(\`https://api.oneof.com/v1/collections/\${contractAddress}/floor-price\`, {
    headers: { 'X-API-Key': apiKey }
  });
  const data = await response.json();
  return data.floorPrice;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/OneOfNFT",
    discord: "https://discord.gg/oneof",
    telegram: null,
    medium: "https://medium.com/@OneOfNFT",
    github: null,
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    musicDrops: true,
    fiatSupport: true,
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
    "Focuses on music, sports, and entertainment partnerships",
    "Offers fiat-friendly onboarding and environmental sustainability via Tezos",
    "Requires API key for programmatic access",
  ],
};

export default oneOfMarketplace;
