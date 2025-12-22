// SuperRare Marketplace Information
// NFT marketplace on Ethereum
// Source: Research compiled from multiple sources

export interface SuperRareListing {
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

export interface SuperRareCollection {
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

export interface SuperRarePricing {
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

export const superrareMarketplace = {
  name: "SuperRare",
  blockchain: "Ethereum",
  type: "Curated NFT Art Marketplace",
  description: "Curated NFT art marketplace on Ethereum. Exclusive platform for digital art with artist verification and curation process.",
  
  urls: {
    main: "https://superrare.com/",
    app: "https://superrare.com/",
    docs: "https://docs.superrare.com/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.superrare.com/v1/",
      base: "https://api.superrare.com/v1/",
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
    artists: {
      getArtist: "GET /artists/{address}",
      getArtistCollections: "GET /artists/{address}/collections",
      getArtistStats: "GET /artists/{address}/stats",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{contractAddress}/metrics",
    },
    documentation: "https://docs.superrare.com/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://superrare.com/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.superrare.com/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Artist profiles",
      "Curated art",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(contractAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.superrare.com/v1/nft/\${contractAddress}/\${tokenId}/price\`);
  const pricing: SuperRarePricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(contractAddress: string) {
  const response = await fetch(\`https://api.superrare.com/v1/collections/\${contractAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Get artist profile
async function getArtistProfile(address: string) {
  const response = await fetch(\`https://api.superrare.com/v1/artists/\${address}\`);
  const artist = await response.json();
  return artist;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/superrare",
    discord: "https://discord.gg/superrare",
    telegram: null,
    medium: "https://medium.com/@superrare",
    github: "https://github.com/superrare",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    artistProfiles: true,
    curatedArt: true,
  },
  
  metrics: {
    supported: true,
    endpoints: [
      "Volume statistics",
      "Trading statistics",
      "Collection metrics",
      "Price history",
      "Market trends",
      "Artist statistics",
    ],
  },
  
  notes: [
    "Curated NFT art marketplace on Ethereum",
    "Uses ERC-721 and ERC-1155 standards",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Exclusive platform with artist verification",
    "Focus on digital art curation",
  ],
};

export default superrareMarketplace;

