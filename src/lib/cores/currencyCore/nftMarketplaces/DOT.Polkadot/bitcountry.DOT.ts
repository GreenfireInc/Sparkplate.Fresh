// Bit.Country Marketplace Information
// Metaverse and land NFT marketplace on Polkadot (Bit.Country / Metaverse.Network)
// Source: Research compiled from multiple sources

export interface BitCountryListing {
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

export interface BitCountryCollection {
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

export interface BitCountryPricing {
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

export const bitCountryMarketplace = {
  name: "Bit.Country",
  blockchain: "Polkadot (Metaverse.Network)",
  type: "Metaverse NFT Marketplace",
  description: "Metaverse platform on Polkadot enabling land sales, 3D asset trading, and virtual economy tooling via the Metaverse.Network and Pioneer parachains.",
  
  urls: {
    main: "https://bit.country/",
    app: "https://app.bit.country/",
    docs: "https://docs.bit.country/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.metaverse.network/v1/",
      pioneer: "https://pioneer-api.bit.country/v1/",
      base: "https://api.metaverse.network/",
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
      getMetaverseUsage: "GET /metrics/worlds",
    },
    documentation: "https://docs.bit.country/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://bit.country/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.bit.country/developers",
    typescriptSupport: true,
    features: [
      "Browse land NFTs",
      "3D asset trading",
      "World governance tools",
      "Analytics dashboards",
      "Metaverse land auctions",
      "IBC-ready transfers",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch Bit.Country NFT pricing data
async function getBitCountryNFTPricing(collectionAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.metaverse.network/v1/nft/\${collectionAddress}/\${tokenId}/price\`);
  const pricing: BitCountryPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(collectionAddress: string) {
  const response = await fetch(\`https://api.metaverse.network/v1/collections/\${collectionAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchBitCountryNFTs(keyword: string) {
  const response = await fetch(\`https://api.metaverse.network/v1/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/bitdotcountry",
    discord: "https://discord.gg/bitcountry",
    telegram: "https://t.me/bitcountry",
    medium: "https://medium.com/@BitCountry",
    github: "https://github.com/bit-country",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    metaverseLand: true,
    governance: true,
  },
  
  metrics: {
    supported: true,
    endpoints: [
      "Volume statistics",
      "Trading statistics",
      "Collection metrics",
      "Price history",
      "Market trends",
      "World engagement",
    ],
  },
  
  notes: [
    "Runs on Metaverse.Network Pioneer parachain with bridges to Polkadot",
    "Offers land staking, mining, and governance for metaverse projects",
    "Supports NFT series for worlds, avatars, and 3D items",
  ],
};

export default bitCountryMarketplace;
