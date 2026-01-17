// AssetMantle Marketplace Information
// NFT marketplace on AssetMantle (Cosmos SDK chain)
// Source: Research compiled from multiple sources

export interface AssetMantleListing {
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
  properties?: Record<string, unknown>;
}

export interface AssetMantleCollection {
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

export interface AssetMantlePricing {
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

export const assetMantleMarketplace = {
  name: "AssetMantle",
  blockchain: "Cosmos (AssetMantle)",
  type: "NFT Marketplace",
  description: "Multi-tenant NFT marketplace framework on the AssetMantle chain (Cosmos SDK) enabling creators and brands to launch custom storefronts with on-chain governance.",
  
  urls: {
    main: "https://assetmantle.one/",
    app: "https://marketplace.assetmantle.one/",
    docs: "https://docs.assetmantle.one/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.assetmantle.one/v1/",
      mantleRpc: "https://rpc.assetmantle.one/",
      mantleRest: "https://rest.assetmantle.one/",
      base: "https://api.assetmantle.one/",
    },
    pricing: {
      getNFTPrice: "GET /nft/{collectionAddress}/{tokenId}/price",
      getCollectionFloorPrice: "GET /collections/{collectionAddress}/floor-price",
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
    documentation: "https://docs.assetmantle.one/developers/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://assetmantle.one/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.assetmantle.one/developers",
    typescriptSupport: true,
    features: [
      "Launch custom storefronts",
      "Mint and manage NFTs",
      "Configure royalties",
      "Multi-tenant governance",
      "Analytics dashboards",
      "Marketplace theming",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch AssetMantle NFT pricing data
async function getMantleNFTPricing(collectionAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.assetmantle.one/v1/nft/\${collectionAddress}/\${tokenId}/price\`);
  const pricing: AssetMantlePricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(collectionAddress: string) {
  const response = await fetch(\`https://api.assetmantle.one/v1/collections/\${collectionAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchAssetMantleNFTs(keyword: string) {
  const response = await fetch(\`https://api.assetmantle.one/v1/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/AssetMantle",
    discord: "https://discord.gg/assetmantle",
    telegram: "https://t.me/assetmantle",
    medium: "https://blog.assetmantle.one/",
    github: "https://github.com/AssetMantle",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    customStorefronts: true,
    governanceControls: true,
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
    "Built on AssetMantle chain with InterNFT-compatible metadata",
    "Provides white-label storefront infrastructure for creators",
    "Integrates with Keplr, Leap, and other Cosmos wallets",
    "Supports on-chain royalties and fractional ownership",
  ],
};

export default assetMantleMarketplace;
