// Manifold Marketplace Information
// Creator tooling and marketplace for Ethereum NFTs
// Source: Research compiled from multiple sources

export interface ManifoldListing {
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

export interface ManifoldCollection {
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

export interface ManifoldPricing {
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

export const manifoldMarketplace = {
  name: "Manifold",
  blockchain: "Ethereum",
  type: "Creator Platform & Marketplace",
  description: "Creator-focused NFT tooling and marketplace on Ethereum providing minting apps, claim pages, drops, and collector analytics.",
  
  urls: {
    main: "https://manifold.xyz/",
    app: "https://studio.manifold.xyz/",
    docs: "https://docs.manifold.xyz/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.manifold.xyz/v1/",
      base: "https://api.manifold.xyz/v1/",
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
    drops: {
      getDrop: "GET /drops/{dropId}",
      getDropStats: "GET /drops/{dropId}/stats",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{contractAddress}/metrics",
    },
    documentation: "https://docs.manifold.xyz/developer-tools/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://manifold.xyz/api",
    },
  },
  
  sdk: {
    npm: {
      package: "@manifoldxyz/creator",
      version: "latest",
      installCommand: "npm install @manifoldxyz/creator",
      github: "https://github.com/manifoldxyz/creator",
      npmLink: "https://www.npmjs.com/package/@manifoldxyz/creator",
    },
    documentation: "https://docs.manifold.xyz/developer-tools",
    typescriptSupport: true,
    features: [
      "Creator minting apps",
      "Claim pages",
      "Burn/Redeem mechanics",
      "Collector analytics",
      "Marketplace listings",
      "Drops and airdrops",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getManifoldNFTPricing(contractAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.manifold.xyz/v1/nft/\${contractAddress}/\${tokenId}/price\`);
  const pricing: ManifoldPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(contractAddress: string) {
  const response = await fetch(\`https://api.manifold.xyz/v1/collections/\${contractAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchManifoldNFTs(keyword: string) {
  const response = await fetch(\`https://api.manifold.xyz/v1/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/manifoldxyz",
    discord: "https://discord.gg/manifold",
    telegram: null,
    medium: "https://manifold.substack.com/",
    github: "https://github.com/manifoldxyz",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    dropMechanics: true,
    redeemMechanics: true,
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
    "Popular with artists for custom ERC-721/1155 minting",
    "Supports on-chain creator contracts and claim pages",
    "Integrates with OpenSea, LooksRare, and other aggregators",
  ],
};

export default manifoldMarketplace;
