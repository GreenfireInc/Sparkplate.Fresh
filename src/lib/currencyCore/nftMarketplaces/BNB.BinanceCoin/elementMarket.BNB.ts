// Element Market Marketplace Information
// Multi-chain NFT marketplace including BNB Smart Chain
// Source: Research compiled from multiple sources

export interface ElementListing {
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

export interface ElementCollection {
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

export interface ElementPricing {
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

export const elementMarketplace = {
  name: "Element Market",
  blockchain: "BNB Smart Chain",
  type: "Multi-Chain NFT Marketplace",
  description: "Multi-chain NFT marketplace supporting BNB Smart Chain. Features aggregated listings, advanced filtering, and cross-chain NFT trading capabilities.",
  
  urls: {
    main: "https://element.market/",
    app: "https://element.market/bsc",
    docs: "https://docs.element.market/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.element.market/api/v1/",
      bsc: "https://api.element.market/api/v1/bsc/",
      base: "https://api.element.market/api/v1/",
    },
    pricing: {
      getNFTPrice: "GET /nft/{contractAddress}/{tokenId}/price",
      getCollectionFloorPrice: "GET /collection/{contractAddress}/floor-price",
      getPriceHistory: "GET /nft/{contractAddress}/{tokenId}/price-history",
      getMarketStats: "GET /market/stats?chain=bsc",
    },
    listings: {
      getListings: "GET /listings?chain=bsc",
      getListingById: "GET /listings/{listingId}",
      getListingsByCollection: "GET /collections/{contractAddress}/listings?chain=bsc",
      getListingsByOwner: "GET /accounts/{address}/listings?chain=bsc",
    },
    collections: {
      getCollections: "GET /collections?chain=bsc",
      getCollectionById: "GET /collections/{contractAddress}?chain=bsc",
      getCollectionStats: "GET /collections/{contractAddress}/stats?chain=bsc",
      searchCollections: "GET /collections/search?chain=bsc&keyword={keyword}",
    },
    nfts: {
      getNFT: "GET /nft/{contractAddress}/{tokenId}?chain=bsc",
      getNFTsByCollection: "GET /collections/{contractAddress}/nfts?chain=bsc",
      getNFTsByOwner: "GET /accounts/{address}/nfts?chain=bsc",
      searchNFTs: "GET /nfts/search?chain=bsc&keyword={keyword}",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume?chain=bsc",
      getTradingStats: "GET /metrics/trading?chain=bsc",
      getCollectionMetrics: "GET /collections/{contractAddress}/metrics?chain=bsc",
    },
    documentation: "https://docs.element.market/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://element.market/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.element.market/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Cross-chain support",
      "Advanced filtering",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(contractAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.element.market/api/v1/nft/\${contractAddress}/\${tokenId}/price?chain=bsc\`);
  const pricing: ElementPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(contractAddress: string) {
  const response = await fetch(\`https://api.element.market/api/v1/collections/\${contractAddress}/floor-price?chain=bsc\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchNFTs(keyword: string) {
  const response = await fetch(\`https://api.element.market/api/v1/nfts/search?chain=bsc&keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/Element_Market",
    discord: "https://discord.gg/element",
    telegram: "https://t.me/elementmarket",
    medium: "https://medium.com/@elementmarket",
    github: "https://github.com/element-market",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    crossChainSupport: true,
    advancedFiltering: true,
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
    "Multi-chain NFT marketplace supporting BNB Smart Chain",
    "Uses BEP-721 (ERC-721 compatible) and BEP-1155 standards",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Cross-chain NFT aggregation",
    "Advanced search and filtering capabilities",
  ],
};

export default elementMarketplace;

