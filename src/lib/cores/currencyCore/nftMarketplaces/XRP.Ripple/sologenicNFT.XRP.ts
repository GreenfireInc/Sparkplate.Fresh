// Sologenic NFT Marketplace Information
// NFT marketplace on XRP Ledger blockchain
// Source: Research compiled from multiple sources

export interface SologenicNFTListing {
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

export interface SologenicNFTCollection {
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

export interface SologenicNFTPricing {
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

export const sologenicNFTMarketplace = {
  name: "Sologenic NFT",
  blockchain: "XRP Ledger",
  type: "NFT Marketplace & DEX",
  description: "NFT marketplace integrated with Sologenic DEX on XRP Ledger blockchain. Features XLS-20 NFT trading with DEX functionality and tokenized assets.",
  
  urls: {
    main: "https://sologenic.com/",
    app: "https://sologenic.com/",
    docs: "https://docs.sologenic.com/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.sologenic.com/v1/xrpl/nft/",
      xrpl: "https://api.sologenic.com/v1/xrpl/nft/",
      base: "https://api.sologenic.com/v1/xrpl/nft/",
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
    dex: {
      getOrderbook: "GET /dex/orderbook/{nftId}",
      getTrades: "GET /dex/trades/{nftId}",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{collectionId}/metrics",
    },
    documentation: "https://docs.sologenic.com/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://sologenic.com/api",
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
    documentation: "https://docs.sologenic.com/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "DEX integration",
      "Tokenized assets",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(nftId: string) {
  const response = await fetch(\`https://api.sologenic.com/v1/xrpl/nft/nft/\${nftId}/price\`);
  const pricing: SologenicNFTPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(collectionId: string) {
  const response = await fetch(\`https://api.sologenic.com/v1/xrpl/nft/collections/\${collectionId}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Get DEX orderbook
async function getOrderbook(nftId: string) {
  const response = await fetch(\`https://api.sologenic.com/v1/xrpl/nft/dex/orderbook/\${nftId}\`);
  const orderbook = await response.json();
  return orderbook;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/sologenic",
    discord: "https://discord.gg/sologenic",
    telegram: "https://t.me/sologenic",
    medium: "https://medium.com/@sologenic",
    github: "https://github.com/sologenic",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    dexIntegration: true,
    tokenizedAssets: true,
  },
  
  metrics: {
    supported: true,
    endpoints: [
      "Volume statistics",
      "Trading statistics",
      "Collection metrics",
      "Price history",
      "Market trends",
      "DEX metrics",
    ],
  },
  
  notes: [
    "NFT marketplace integrated with Sologenic DEX",
    "Uses XLS-20 (native NFT standard on XRP Ledger)",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "DEX integration for trading",
    "Tokenized assets support",
  ],
};

export default sologenicNFTMarketplace;

