// OnXRP Marketplace Information
// Secondary NFT marketplace on XRP Ledger blockchain
// Source: Research compiled from multiple sources

export interface OnXRPListing {
  nftId: string;
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

export interface OnXRPCollection {
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

export interface OnXRPPricing {
  nftId: string;
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

export const onxrpMarketplace = {
  name: "OnXRP",
  blockchain: "XRP Ledger",
  type: "NFT Marketplace",
  description: "Secondary NFT marketplace for XRP Ledger ecosystem. Enables trading of XLS-20 NFTs on XRP Ledger blockchain with marketplace tools and analytics.",
  
  urls: {
    main: "https://onxrp.com/",
    app: "https://onxrp.com/",
    docs: "https://docs.onxrp.com/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.onxrp.com/v1/xrpl/",
      xrpl: "https://api.onxrp.com/v1/xrpl/",
      base: "https://api.onxrp.com/v1/xrpl/",
    },
    pricing: {
      getNFTPrice: "GET /nft/{nftId}/price",
      getCollectionFloorPrice: "GET /collections/{collectionId}/floor-price",
      getPriceHistory: "GET /nft/{nftId}/price-history",
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
      getNFT: "GET /nft/{nftId}",
      getNFTsByCollection: "GET /collections/{collectionId}/nfts",
      getNFTsByOwner: "GET /accounts/{address}/nfts",
      searchNFTs: "GET /nfts/search",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{collectionId}/metrics",
    },
    documentation: "https://docs.onxrp.com/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://onxrp.com/api",
    },
  },
  
  sdk: {
    npm: {
      package: "xrpl",
      version: "latest",
      installCommand: "npm install xrpl",
      github: "https://github.com/XRPLF/xrpl.js",
      npmLink: "https://www.npmjs.com/package/xrpl",
    },
    documentation: "https://docs.onxrp.com/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Multi-wallet support",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(nftId: string) {
  const response = await fetch(\`https://api.onxrp.com/v1/xrpl/nft/\${nftId}/price\`);
  const pricing: OnXRPPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(collectionId: string) {
  const response = await fetch(\`https://api.onxrp.com/v1/xrpl/collections/\${collectionId}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchNFTs(keyword: string) {
  const response = await fetch(\`https://api.onxrp.com/v1/xrpl/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/onxrp",
    discord: "https://discord.gg/onxrp",
    telegram: "https://t.me/onxrp",
    medium: null,
    github: "https://github.com/onxrp",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    multiWalletSupport: true,
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
    "Secondary NFT marketplace for XRP Ledger ecosystem",
    "Uses XLS-20 (native NFT standard on XRP Ledger)",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Multi-wallet support (Xumm, Gem Wallet, Crossmark)",
    "XRP Ledger DEX integration",
  ],
};

export default onxrpMarketplace;

