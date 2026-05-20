// Unique Network Marketplace Information
// NFT marketplace on Unique Network parachain
// Source: Research compiled from multiple sources

export interface UniqueNetworkListing {
  nftId: string;
  collectionId: string;
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

export interface UniqueNetworkCollection {
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

export interface UniqueNetworkPricing {
  nftId: string;
  collectionId: string;
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

export const uniqueNetworkMarketplace = {
  name: "Unique Network",
  blockchain: "Polkadot",
  type: "NFT Parachain Marketplace",
  description: "NFT marketplace on Unique Network parachain. Features advanced NFT capabilities including refungible NFTs, fractionalization, and custom royalty structures.",
  
  urls: {
    main: "https://unique.network/",
    app: "https://unqnft.io/",
    docs: "https://docs.unique.network/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.unique.network/v1/",
      base: "https://api.unique.network/v1/",
    },
    pricing: {
      getNFTPrice: "GET /nft/{collectionId}/{nftId}/price",
      getCollectionFloorPrice: "GET /collections/{collectionId}/floor-price",
      getPriceHistory: "GET /nft/{collectionId}/{nftId}/price-history",
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
      getNFT: "GET /nft/{collectionId}/{nftId}",
      getNFTsByCollection: "GET /collections/{collectionId}/nfts",
      getNFTsByOwner: "GET /accounts/{address}/nfts",
      searchNFTs: "GET /nfts/search",
    },
    unique: {
      getRefungibleNFTs: "GET /nft/{collectionId}/{nftId}/refungible",
      getFractionalizedNFTs: "GET /nft/{collectionId}/{nftId}/fractionalized",
      getCustomRoyalties: "GET /collections/{collectionId}/royalties",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{collectionId}/metrics",
    },
    documentation: "https://docs.unique.network/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://unique.network/api",
    },
  },
  
  sdk: {
    npm: {
      package: "@unique-nft/sdk",
      version: "latest",
      installCommand: "npm install @unique-nft/sdk",
      github: "https://github.com/UniqueNetwork/unique-sdk",
      npmLink: "https://www.npmjs.com/package/@unique-nft/sdk",
    },
    documentation: "https://docs.unique.network/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Refungible NFTs",
      "Fractionalization",
      "Custom royalties",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(collectionId: string, nftId: string) {
  const response = await fetch(\`https://api.unique.network/v1/nft/\${collectionId}/\${nftId}/price\`);
  const pricing: UniqueNetworkPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(collectionId: string) {
  const response = await fetch(\`https://api.unique.network/v1/collections/\${collectionId}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchNFTs(keyword: string) {
  const response = await fetch(\`https://api.unique.network/v1/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}

// Using Unique Network SDK
import { UniqueSDK } from '@unique-nft/sdk';

const sdk = new UniqueSDK({
  baseUrl: 'https://api.unique.network/v1/',
});
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/Unique_NFT_Chain",
    discord: "https://discord.gg/uniquenetwork",
    telegram: "https://t.me/UniqueNetwork",
    medium: "https://medium.com/@uniquenetwork",
    github: "https://github.com/UniqueNetwork",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    refungibleNFTs: true,
    fractionalization: true,
    customRoyalties: true,
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
    "NFT marketplace on Unique Network parachain",
    "Advanced NFT features: refungible NFTs, fractionalization",
    "Custom royalty structures supported",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Cross-chain support via XCM",
  ],
};

export default uniqueNetworkMarketplace;

