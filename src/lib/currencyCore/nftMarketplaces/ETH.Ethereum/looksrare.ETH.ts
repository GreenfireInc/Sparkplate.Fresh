// LooksRare Marketplace Information
// NFT marketplace on Ethereum
// Source: Research compiled from multiple sources

export interface LooksRareListing {
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

export interface LooksRareCollection {
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

export interface LooksRarePricing {
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

export const looksrareMarketplace = {
  name: "LooksRare",
  blockchain: "Ethereum",
  type: "NFT Marketplace",
  description: "NFT marketplace on Ethereum. Community-first NFT marketplace with LOOKS token rewards, zero marketplace fees for traders, and creator royalties.",
  
  urls: {
    main: "https://looksrare.org/",
    app: "https://looksrare.org/",
    docs: "https://docs.looksrare.org/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.looksrare.org/api/v1/",
      base: "https://api.looksrare.org/api/v1/",
    },
    pricing: {
      getNFTPrice: "GET /orders?collection={contractAddress}&tokenId={tokenId}",
      getCollectionFloorPrice: "GET /collections/{contractAddress}/floor-price",
      getPriceHistory: "GET /events?collection={contractAddress}&tokenId={tokenId}",
      getMarketStats: "GET /collections/stats",
    },
    listings: {
      getListings: "GET /orders",
      getListingById: "GET /orders/{orderHash}",
      getListingsByCollection: "GET /orders?collection={contractAddress}",
      getListingsByOwner: "GET /orders?maker={address}",
    },
    collections: {
      getCollections: "GET /collections",
      getCollectionById: "GET /collections/{contractAddress}",
      getCollectionStats: "GET /collections/{contractAddress}/stats",
      searchCollections: "GET /collections/search",
    },
    nfts: {
      getNFT: "GET /tokens?collection={contractAddress}&tokenId={tokenId}",
      getNFTsByCollection: "GET /tokens?collection={contractAddress}",
      getNFTsByOwner: "GET /tokens?owner={address}",
      searchNFTs: "GET /tokens/search",
    },
    events: {
      getEvents: "GET /events",
      getNFTEvents: "GET /events?collection={contractAddress}&tokenId={tokenId}",
      getCollectionEvents: "GET /events?collection={contractAddress}",
    },
    metrics: {
      getVolumeStats: "GET /collections/stats/volume",
      getTradingStats: "GET /collections/stats/trading",
      getCollectionMetrics: "GET /collections/{contractAddress}/metrics",
    },
    documentation: "https://docs.looksrare.org/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-KEY",
      getApiKey: "https://looksrare.org/api",
    },
  },
  
  sdk: {
    npm: {
      package: "@looksrare/sdk",
      version: "latest",
      installCommand: "npm install @looksrare/sdk",
      github: "https://github.com/LooksRare/looksrare-sdk",
      npmLink: "https://www.npmjs.com/package/@looksrare/sdk",
    },
    documentation: "https://docs.looksrare.org/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Token rewards",
      "Zero marketplace fees",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(contractAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.looksrare.org/api/v1/orders?collection=\${contractAddress}&tokenId=\${tokenId}\`);
  const orders = await response.json();
  return orders.data?.[0]?.price;
}

// Get collection floor price
async function getCollectionFloorPrice(contractAddress: string) {
  const response = await fetch(\`https://api.looksrare.org/api/v1/collections/\${contractAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchNFTs(keyword: string) {
  const response = await fetch(\`https://api.looksrare.org/api/v1/tokens/search?query=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.data;
}

// Using LooksRare SDK
import { LooksRareSDK } from '@looksrare/sdk';

const sdk = new LooksRareSDK({
  chainId: 1, // Ethereum mainnet
  rpcUrl: 'https://eth.llamarpc.com',
});
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/looksrarenft",
    discord: "https://discord.gg/looksrare",
    telegram: null,
    medium: "https://medium.com/@looksrare",
    github: "https://github.com/LooksRare",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    tokenRewards: true,
    zeroMarketplaceFees: true,
  },
  
  metrics: {
    supported: true,
    endpoints: [
      "Volume statistics",
      "Trading statistics",
      "Collection metrics",
      "Price history",
      "Market trends",
      "Event tracking",
    ],
  },
  
  notes: [
    "NFT marketplace on Ethereum",
    "Uses ERC-721 and ERC-1155 standards",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Community-first with LOOKS token rewards",
    "Zero marketplace fees for traders",
  ],
};

export default looksrareMarketplace;

