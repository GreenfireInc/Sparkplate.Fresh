// Objkt One Marketplace Information
// Fractionalized NFT marketplace on Tezos
// Source: Research compiled from multiple sources

export interface ObjktOneListing {
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

export interface ObjktOneCollection {
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

export interface ObjktOnePricing {
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

export const objktOneMarketplace = {
  name: "objkt.one",
  blockchain: "Tezos",
  type: "Fractional NFT Marketplace",
  description: "Fractionalized NFT marketplace on Tezos allowing collectors to own fractions of high-value art with secondary trading and governance features.",
  
  urls: {
    main: "https://objkt.one/",
    app: "https://objkt.one/",
    docs: "https://docs.objkt.one/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.objkt.one/v1/",
      base: "https://api.objkt.one/v1/",
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
      getFractionMetrics: "GET /metrics/fractions",
    },
    documentation: "https://docs.objkt.one/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://objkt.one/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.objkt.one/developers",
    typescriptSupport: true,
    features: [
      "Fractional ownership",
      "Analytics dashboards",
      "Secondary trading",
      "Governance tooling",
      "Collection curation",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch objkt.one fractional NFT pricing data
async function getObjktOnePricing(contractAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.objkt.one/v1/nft/\${contractAddress}/\${tokenId}/price\`);
  const pricing: ObjktOnePricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getObjktOneCollectionFloor(contractAddress: string) {
  const response = await fetch(\`https://api.objkt.one/v1/collections/\${contractAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search fractional NFTs
async function searchObjktOneNFTs(keyword: string) {
  const response = await fetch(\`https://api.objkt.one/v1/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/objkt_one",
    discord: "https://discord.gg/objktone",
    telegram: null,
    medium: "https://medium.com/@objktone",
    github: null,
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    fractionalOwnership: true,
  },
  
  metrics: {
    supported: true,
    endpoints: [
      "Volume statistics",
      "Trading statistics",
      "Collection metrics",
      "Price history",
      "Market trends",
      "Fractional metrics",
    ],
  },
  
  notes: [
    "Enables fractional ownership of high-value Tezos NFTs",
    "Offers governance features for fractional holders",
    "Integrates with Tezos wallets like Temple and Kukai",
  ],
};

export default objktOneMarketplace;
