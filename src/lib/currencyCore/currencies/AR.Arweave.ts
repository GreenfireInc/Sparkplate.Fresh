// Currency: Arweave (AR)
// Source: Cryptocurrency Data
// Research Data Compiled from Multiple Sources

import type { CurrencyData, DerivedInfo } from './currencyData';

export const arweaveData: CurrencyData = {
  basicInfo: {
    name: "Arweave",
    symbolTicker: "AR",
    description: "A decentralized storage network that enables permanent data storage through its innovative blockweave technology. Offers a 'pay once, store forever' model ensuring data remains accessible indefinitely without recurring fees.",
    creator: "Sam Williams",
    debutYear: 2018,
    website: "https://www.arweave.org/",
    whitePaper: "https://www.arweave.org/whitepaper.pdf",
    primaryNFTMarketplace: "https://atomic.market/",
    secondaryNFTMarketplace: "https://pianity.com/",
  },

  technicalInfo: {
    proofingType: "Other",
    class: "Layer 1 Blockchain / Permanent Storage Network",
    totalSupply: "66,000,000 AR",
    libraryHashing: "SHA-256",
    librarySigning: "RSA-4096",
    mnemonicSeedPhraseLengths: "N/A (Uses JWK format)",
    privateKeyFormat: "JWK (JSON Web Key) - RSA-4096",
    privateKeyToPublicKeyCurve: "RSA-4096",
    publicKeyToPublicWalletAddressHashing: "Base64URL encoding of RSA public key with SHA-256",
    NPMLibraryHashing: "@noble/hashes/sha256",
    NPMLibrarySigning: "arweave (RSA-4096)",
    keyStoreFormat: "Arweave JWK (JSON Web Key)",
    jsonFormat: "Arweave Transaction JSON",
    smartContractLanguage: "SmartWeave (JavaScript-based smart contracts)",
    primaryNPMPackage: "arweave",
    secondaryNPMPackage: "arweave-account",
    tertiaryNPMPackage: "arconnect",
    web3ConnectMechanism: "ArConnect / Arweave Wallet Extension",
    nativeWallet: "Arweave Wallet / ArConnect",
    humanReadableAddressingPlatform: "ArNS (Arweave Name Service)",
    humanReadableAddressingNPMPackage: "@ar-io/sdk",
    SendingMechanism: "Arweave SDK transaction signing",
    NFTMintingMechanism: "Arweave transactions with metadata tags",
    AssetTokenSupportAndMechanism: "SmartWeave PSTs (Profit Sharing Tokens) / Atomic NFTs / ANS-110 standard",
    evmChainID: "N/A (Non-EVM Chain)",
    typicalDerivationPath: "N/A (Uses JWK format, not BIP44)",
    sendingFunctionality: "arweave.createTransaction(), arweave.transactions.sign() and arweave.transactions.post()",
  },

  dex: [
    {
      name: "Permaswap",
      url: "https://permaswap.network/",
      type: "AMM DEX",
      description: "The primary automated market maker for Arweave ecosystem tokens and PSTs",
    },
    {
      name: "Verto",
      url: "https://verto.exchange/",
      type: "DEX",
      description: "Decentralized exchange for Arweave tokens and profit sharing tokens (PSTs)",
    },
    {
      name: "ArSwap",
      url: "https://arswap.org/",
      type: "Swap Protocol",
      description: "Cross-chain swap protocol connecting Arweave to other networks",
    },
    {
      name: "EverPay",
      url: "https://everpay.io/",
      type: "Cross-Chain DEX",
      description: "Real-time cross-chain clearing protocol with instant finality",
    },
  ],

  stakingProviders: [
    {
      name: "Arweave Gateway Operators",
      url: "https://ar.io/",
      type: "Gateway Staking",
      description: "Stake AR tokens to operate Arweave gateways and earn rewards",
    },
    {
      name: "AR.IO Network",
      url: "https://ar.io/",
      type: "Network Participation",
      description: "Participate in the AR.IO network for decentralized gateway services",
    },
  ],

  miningPools: [
    {
      name: "Arweave Mining",
      url: "https://www.arweave.org/mining",
      type: "Proof of Access Mining",
      description: "Mine blocks by storing historical data and providing access to it",
    },
  ],

  marketInfo: {
    allTimeHigh: {
      price: 90.94,
      currency: "USD",
      date: "2021-11-05",
    },
  },

  socialMedia: {
    discord: "https://discord.gg/arweave",
    twitterX: "https://twitter.com/arweave",
    telegram: "https://t.me/arweave",
    reddit: "https://www.reddit.com/r/Arweave/",
    linkedin: "https://www.linkedin.com/company/arweave/",
  },

  identifiers: {
    UCID: "5632",
    identifierBraveNewCoin: "AR",
    identifierCoinAPI: "AR",
    identifierCoinCap: "arweave",
    identifierCoinGecko: "arweave",
    identifierCoinPaprika: "ar-arweave",
  },

  blockExplorer: {
    blockExplorerAPI: "https://arweave.net",
    blockExplorerLink: "https://viewblock.io/arweave/address/",
  },

  rpcEndpoints: [
    {
      name: "Arweave.net (Canonical Gateway)",
      url: "https://arweave.net",
      port: 443,
      protocol: "https",
      type: "Public Gateway",
      description: "The canonical public gateway. Supports most HTTP-API endpoints (get transaction, get wallet balance, post transactions, etc).",
      npmPackage: "arweave",
      documentation: "https://docs.arweave.org/developers/arweave-node-server/http-api",
    },
    {
      name: "Arweave.world",
      url: "https://arweave.world",
      port: 443,
      protocol: "https",
      type: "Public Gateway",
      description: "Alternative gateway — works as a substitute to arweave.net. Useful for redundancy.",
      npmPackage: "arweave",
      documentation: "https://cookbook.arweave.net/fundamentals/gateways/http-api.html",
    },
    {
      name: "Arweave.live",
      url: "https://arweave.live",
      port: 443,
      protocol: "https",
      type: "Public Gateway",
      description: "Another alternative public gateway. Good for fallback scenarios.",
      npmPackage: "arweave",
      documentation: "https://cookbook.arweave.net/fundamentals/gateways/http-api.html",
    },
    {
      name: "G8way.io",
      url: "https://g8way.io",
      port: 443,
      protocol: "https",
      type: "Community Gateway",
      description: "Community-run gateway. Useful for redundancy or if the main gateway is overloaded.",
      npmPackage: "arweave",
      documentation: "https://cookbook.arweave.net/fundamentals/gateways/http-api.html",
    },
    {
      name: "AR.IO Network Gateways",
      url: "https://ar.io",
      port: 443,
      protocol: "https",
      type: "Decentralized Gateway Network",
      description: "AR.IO network provides decentralized gateway services with multiple community-operated gateways for enhanced reliability and censorship resistance.",
      npmPackage: "arweave",
      documentation: "https://ar.io/",
    },
  ],
  
  deriveFromPrivateKey: async (privateKey: string): Promise<DerivedInfo> => {
    // Import Arweave SDK when needed
    // Note: arweave package must be installed: npm install arweave
    const Arweave = (await import('arweave')).default;
    
    interface JWKInterface {
      kty: string;
      n: string;
      e: string;
      d?: string;
      p?: string;
      q?: string;
      dp?: string;
      dq?: string;
      qi?: string;
    }
    
    let jwk: JWKInterface;
    let address: string = '';
    let publicKey: string = '';
    
    try {
      // Arweave uses JWK (JSON Web Key) format for private keys
      // The private key can be:
      // 1. A JSON string of the JWK
      // 2. An object (already parsed JWK)
      
      const trimmedKey = privateKey.trim();
      
      // Try to parse as JSON if it's a string
      if (trimmedKey.startsWith('{')) {
        jwk = JSON.parse(trimmedKey) as JWKInterface;
      } else {
        // If it's not JSON, try to parse it anyway
        try {
          jwk = JSON.parse(trimmedKey) as JWKInterface;
        } catch {
          throw new Error("Arweave private key must be in JWK (JSON Web Key) format");
        }
      }
      
      // Validate JWK structure
      if (!jwk.kty || !jwk.n || !jwk.e) {
        throw new Error("Invalid JWK format. JWK must contain kty, n, and e fields");
      }
      
      if (jwk.kty !== 'RSA') {
        throw new Error("Arweave requires RSA keys (kty must be 'RSA')");
      }
      
      // Initialize Arweave instance
      const arweave = Arweave.init({
        host: 'arweave.net',
        port: 443,
        protocol: 'https',
        timeout: 20000,
        logging: false,
      });
      
      // Get address from JWK
      address = await arweave.wallets.jwkToAddress(jwk);
      
      // Extract public key from JWK
      // The public key in Arweave is the RSA public key (n and e)
      // We'll represent it as a JSON string of the public key components
      const publicKeyJWK = {
        kty: jwk.kty,
        n: jwk.n,
        e: jwk.e,
      };
      publicKey = JSON.stringify(publicKeyJWK);
      
    } catch (error) {
      throw new Error(`Invalid Arweave private key: ${error instanceof Error ? error.message : String(error)}`);
    }
    
    return { 
      publicKey: publicKey, 
      address: address 
    };
  },

  getBlockExplorerLink: (address: string, format?: string): string | null => {
    // Arweave uses ViewBlock for address exploration
    // Format parameter is ignored since Arweave has a single address format
    return `https://viewblock.io/arweave/address/${address}`;
  },

  // Additional Arweave-specific properties
  github: "https://github.com/ArweaveTeam/arweave"
};

