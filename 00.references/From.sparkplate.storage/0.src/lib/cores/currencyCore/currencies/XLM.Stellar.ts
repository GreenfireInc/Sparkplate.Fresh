// Currency: Stellar (XLM)
// Source: Cryptocurrency Data
// Research Data Compiled from Multiple Sources

import type { CurrencyData, DerivedInfo } from './currencyData';
import { toHex, fromHex } from './utils';

export const stellarData: CurrencyData = {
  basicInfo: {
    name: "Stellar",
    symbolTicker: "XLM",
    description: "Stellar is an open-source, distributed, and community-owned network used to facilitate cross-asset transfers of value, including payments.",
    creator: "Jed McCaleb",
    debutYear: 2014,
    website: "https://www.stellar.org/",
    whitePaper: "https://www.stellar.org/papers/stellar-consensus-protocol",
    primaryNFTMarketplace: "https://litemint.com/",
    secondaryNFTMarketplace: "N/A",
  },

  technicalInfo: {
    proofingType: "Other",
    class: "Layer 1 Blockchain (Federated Byzantine Agreement / Payment Network)",
    totalSupply: "50,001,804,086 XLM (initial supply, ~1% annual inflation)",
    libraryHashing: "SHA-256",
    librarySigning: "Ed25519",
    mnemonicSeedPhraseLengths: "12, 24 words (BIP39)",
    privateKeyFormat: "Stellar secret key (starts with 'S') or 32-byte hex",
    privateKeyToPublicKeyCurve: "Ed25519",
    publicKeyToPublicWalletAddressHashing: "Ed25519 public key + Base32 encoding (starts with 'G')",
    NPMLibraryHashing: "@stellar/stellar-base",
    NPMLibrarySigning: "@stellar/stellar-base",
    keyStoreFormat: "Stellar JSON Keystore (Base32 secret key)",
    jsonFormat: "Stellar JSON format / Horizon API compatible",
    smartContractLanguage: "Soroban (Rust-based smart contracts)",
    primaryNPMPackage: "@stellar/stellar-sdk",
    secondaryNPMPackage: "@stellar/stellar-base",
    tertiaryNPMPackage: "@noble/ed25519",
    web3ConnectMechanism: "Freighter / Albedo / WalletConnect",
    nativeWallet: "Freighter / LOBSTR",
    humanReadableAddressingPlatform: "Stellar Federation Protocol",
    humanReadableAddressingNPMPackage: "N/A",
    SendingMechanism: "Stellar Horizon API transaction submission",
    NFTMintingMechanism: "Stellar native assets / Soroban tokens",
    AssetTokenSupportAndMechanism: "Stellar native assets (built-in multi-currency support)",
    evmChainID: "N/A (Stellar Consensus Protocol, non-EVM)",
    typicalDerivationPath: "m/44'/148'/0' (BIP44 Stellar standard)",
    sendingFunctionality: "@stellar/stellar-sdk TransactionBuilder and Server.submitTransaction()",
  },

  dex: [
    {
      name: "StellarX",
      url: "https://www.stellarx.com/",
      type: "Native DEX",
      description: "Built on Stellar's native decentralized exchange with advanced trading features",
    },
    {
      name: "LOBSTR",
      url: "https://lobstr.co/",
      type: "Wallet & DEX",
      description: "Popular Stellar wallet with integrated DEX trading",
    },
    {
      name: "StellarTerm",
      url: "https://stellarterm.com/",
      type: "Native DEX",
      description: "Open-source trading client for Stellar's built-in decentralized exchange",
    },
    {
      name: "Stellarport",
      url: "https://stellarport.io/",
      type: "Trading Platform",
      description: "Multi-asset trading platform built on Stellar DEX",
    },
    {
      name: "Scopuly",
      url: "https://scopuly.com/",
      type: "Multi-Chain DEX",
      description: "Cross-chain exchange with Stellar DEX integration",
    },
    {
      name: "Aqua",
      url: "https://aqua.network/",
      type: "AMM on Stellar",
      description: "Liquidity rewards and governance protocol for Stellar DEX",
    },
    {
      name: "Litemint",
      url: "https://litemint.com/",
      type: "NFT Marketplace",
      description: "NFT marketplace and trading on Stellar network",
    },
  ],

  stakingProviders: [
    {
      name: "N/A - Stellar Consensus Protocol",
      url: "https://www.stellar.org/developers/guides/concepts/scp",
      type: "Federated Byzantine Agreement",
      description: "Stellar uses SCP consensus with validators, not traditional staking. Users can run validators or use anchor services.",
    },
    {
      name: "Stellar Validators",
      url: "https://stellar.expert/explorer/public/validators",
      type: "Network Validators",
      description: "Run or support validators in the Stellar consensus network",
    },
    {
      name: "Anchors (Asset Issuers)",
      url: "https://www.stellar.org/learn/anchor-basics",
      type: "Asset Anchors",
      description: "Trusted entities that issue assets on Stellar and provide liquidity",
    },
    {
      name: "Stellar Community Fund",
      url: "https://communityfund.stellar.org/",
      type: "Community Governance",
      description: "Participate in community governance and project funding",
    },
    {
      name: "Aqua Rewards",
      url: "https://aqua.network/",
      type: "Liquidity Rewards",
      description: "Earn AQUA tokens by providing liquidity to Stellar DEX",
    },
    {
      name: "Ultra Stellar",
      url: "https://ultrastellar.com/",
      type: "DeFi Platform",
      description: "Liquidity aggregation and yield opportunities on Stellar",
    },
    {
      name: "Binance Savings",
      url: "https://www.binance.com/en/savings",
      type: "Exchange Savings",
      description: "Earn interest on XLM through Binance flexible savings",
    },
  ],

  miningPools: "N/A (Stellar Consensus Protocol - Uses validators in federated Byzantine agreement, no mining)",

  marketInfo: {
    allTimeHigh: {
      price: 0.88,
      currency: "USD",
      date: "2018-01-03",
    },
  },

  socialMedia: {
    discord: "https://discord.gg/stellar",
    instagram: "https://www.instagram.com/stellarorg/",
    linkedin: "https://www.linkedin.com/company/stellar-development-foundation/",
    reddit: "https://www.reddit.com/r/Stellar/",
    slack: "N/A",
    telegram: "https://t.me/stellar",
    twitterX: "https://twitter.com/StellarOrg",
  },

  identifiers: {
    UCID: "512",
    identifierBraveNewCoin: "XLM",
    identifierCoinAPI: "XLM",
    identifierCoinCap: "stellar",
    identifierCoinGecko: "stellar",
    identifierCoinPaprika: "xlm-stellar",
  },

  blockExplorer: {
    blockExplorerAPI: "https://horizon.stellar.org/",
    blockExplorerLink: "https://stellarchain.io/address/",
  },

  rpcEndpoints: [
    {
      name: "Horizon API - MainNet",
      url: "https://horizon.stellar.org",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Official API for the Stellar network. Provides complete blockchain data access, transaction submission, account operations and balances, asset tracking, payment streams, order book queries, and network info. Free access, no authentication required.",
      npmPackage: "@stellar/stellar-sdk",
      documentation: "https://developers.stellar.org/docs/data/apis/horizon",
      network: "mainnet",
      serviceType: "rest-api",
    },
    {
      name: "Horizon API - TestNet",
      url: "https://horizon-testnet.stellar.org",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Official API for the Stellar testnet. Provides complete blockchain data access for testing, transaction submission, account operations and balances, asset tracking, payment streams, order book queries, and network info. Free access, no authentication required.",
      npmPackage: "@stellar/stellar-sdk",
      documentation: "https://developers.stellar.org/docs/data/apis/horizon",
      network: "testnet",
      serviceType: "rest-api",
    },
    {
      name: "Stellar RPC - MainNet",
      url: "https://rpc.stellar.org",
      port: 443,
      protocol: "https",
      type: "RPC API (Public)",
      description: "Official Stellar RPC endpoint. Provides RPC access to Stellar network for blockchain queries and transaction submission. Free access, no authentication required.",
      npmPackage: "@stellar/stellar-sdk",
      documentation: "https://developers.stellar.org/",
      network: "mainnet",
      serviceType: "rpc",
    },
    {
      name: "StellarExpert - MainNet",
      url: "https://api.stellar.expert/explorer/public",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Comprehensive block explorer and analytics platform. Provides detailed account statistics, asset analytics and ratings, price history and market data, network metrics, liquidity pool information, top accounts directory, and advanced search. Free access, no authentication, CORS enabled.",
      npmPackage: "axios",
      documentation: "https://stellar.expert/openapi.html",
      network: "mainnet",
      serviceType: "rest-api",
    },
    {
      name: "StellarExpert - TestNet",
      url: "https://api.stellar.expert/explorer/testnet",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Comprehensive block explorer and analytics platform for Stellar testnet. Provides detailed account statistics, asset analytics and ratings, price history and market data, network metrics, liquidity pool information, top accounts directory, and advanced search. Free access, no authentication, CORS enabled.",
      npmPackage: "axios",
      documentation: "https://stellar.expert/openapi.html",
      network: "testnet",
      serviceType: "rest-api",
    },
    {
      name: "Ankr - MainNet",
      url: "https://rpc.ankr.com/stellar",
      port: 443,
      protocol: "https",
      type: "RPC API (Public, Optional API Key)",
      description: "Stellar RPC for dApps and crypto projects. Provides free tier available, reliable web3 data, blockchain interaction, RPC endpoints, and high-performance infrastructure. Free public endpoint. API key recommended for higher limits.",
      npmPackage: "@stellar/stellar-sdk",
      documentation: "https://www.ankr.com/docs/rpc-service/chains/chains-list/#stellar",
      network: "mainnet",
      serviceType: "rpc",
    },
    {
      name: "NOWNodes - MainNet",
      url: "https://xlm.nownodes.io",
      port: 443,
      protocol: "https",
      type: "REST API (API Key Required)",
      description: "Full node access with free tier. Provides real-time blockchain data, transaction and block details, full node access, and high uptime guarantee (99.95%). Free tier: 5,000 requests/day. Requires API key.",
      npmPackage: "axios",
      documentation: "https://nownodes.io/nodes/stellar-xlm",
      network: "mainnet",
      serviceType: "rest-api",
      requiresApiKey: true,
    },
    {
      name: "Bitquery - MainNet",
      url: "https://graphql.bitquery.io",
      port: 443,
      protocol: "https",
      type: "GraphQL API (API Key Required)",
      description: "GraphQL API with real-time data streaming. Provides historical and real-time blockchain data, flexible GraphQL queries, token transfers and payments, real-time data streaming, and complex filtering. Free tier available. Requires API key.",
      npmPackage: "graphql-request",
      documentation: "https://bitquery.io/blockchains/stellar-blockchain-api",
      network: "mainnet",
      serviceType: "graphql",
      requiresApiKey: true,
    },
    {
      name: "Tatum - MainNet",
      url: "https://api.tatum.io/v3",
      port: 443,
      protocol: "https",
      type: "REST API (API Key Required)",
      description: "Powerful APIs and RPCs for Stellar blockchain. Provides mainnet and testnet endpoints, blockchain data retrieval, transaction operations, payment processing, account management, and fee statistics. Free tier available with API key. Requires API key.",
      npmPackage: "axios",
      documentation: "https://tatum.io/chain/stellar",
      network: "mainnet",
      serviceType: "rest-api",
      requiresApiKey: true,
    },
    {
      name: "Tatum - TestNet",
      url: "https://api.tatum.io/v3",
      port: 443,
      protocol: "https",
      type: "REST API (API Key Required)",
      description: "Powerful APIs and RPCs for Stellar testnet. Provides testnet endpoints, blockchain data retrieval for testing, transaction operations, payment processing, account management, and fee statistics. Free tier available with API key. Requires API key.",
      npmPackage: "axios",
      documentation: "https://tatum.io/chain/stellar",
      network: "testnet",
      serviceType: "rest-api",
      requiresApiKey: true,
    },
    {
      name: "GetBlock - MainNet",
      url: "https://go.getblock.io",
      port: 443,
      protocol: "https",
      type: "RPC API (API Key Required)",
      description: "RPC node provider for Stellar blockchain. Provides instant access to Stellar RPC nodes, reliable infrastructure, high availability, and transaction broadcasting. Free tier available with API key. Requires API key.",
      npmPackage: "@stellar/stellar-sdk",
      documentation: "https://getblock.io/docs/stellar/",
      network: "mainnet",
      serviceType: "rpc",
      requiresApiKey: true,
    },
    {
      name: "GetBlock - TestNet",
      url: "https://go.getblock.io",
      port: 443,
      protocol: "https",
      type: "RPC API (API Key Required)",
      description: "RPC node provider for Stellar testnet. Provides instant access to Stellar RPC nodes for testing, reliable infrastructure, high availability, and transaction broadcasting. Free tier available with API key. Requires API key.",
      npmPackage: "@stellar/stellar-sdk",
      documentation: "https://getblock.io/docs/stellar/",
      network: "testnet",
      serviceType: "rpc",
      requiresApiKey: true,
    },
  ],

  deriveFromPrivateKey: async (privateKey: string): Promise<DerivedInfo> => {
    // Import dependencies when needed to avoid loading them if not used
    const StellarBase = await import('@stellar/stellar-base');

    let keypair;

    // Handle different private key formats
    const trimmedKey = privateKey.trim();

    try {
      // Try to create keypair from secret key (Stellar private key format)
      keypair = StellarBase.Keypair.fromSecret(trimmedKey);
    } catch (error) {
      // If it's not a valid Stellar secret, try to interpret as hex
      try {
        const hexKey = trimmedKey.startsWith('0x') ? trimmedKey.slice(2) : trimmedKey;

        if (!/^[0-9a-fA-F]+$/.test(hexKey)) {
          throw new Error('Invalid hex format');
        }

        if (hexKey.length !== 64) {
          throw new Error('Hex private key must be 64 characters (32 bytes)');
        }

        // Convert hex to Stellar secret format
        // Stellar uses a specific format for secrets starting with 'S'
        const rawPrivateKeyBytes = fromHex(hexKey);
        const rawPrivateKey = Buffer.from(rawPrivateKeyBytes);

        // Create keypair from raw bytes
        keypair = StellarBase.Keypair.fromRawEd25519Seed(rawPrivateKey);

      } catch (hexError) {
        // If hex doesn't work, try mnemonic interpretation (if it looks like one)
        if (trimmedKey.split(' ').length >= 12) {
          throw new Error('Mnemonic support not implemented yet for Stellar. Please use a Stellar private key (starting with S) or 32-byte hex.');
        }

        throw new Error(`Invalid Stellar private key format. Expected Stellar secret key (starting with 'S') or 32-byte hex. ${error instanceof Error ? error.message : ''}`);
      }
    }

    // Extract the public key and address
    const address = keypair.publicKey();
    const rawPublicKey = keypair.rawPublicKey();
    const publicKey = toHex(rawPublicKey);

    return {
      publicKey: publicKey, // Raw Ed25519 public key as hex
      address: address      // Base32-encoded Stellar address
    };
  },

  getBlockExplorerLink: (address: string, format?: string): string | null => {
    // Stellar uses stellarchain.io for address exploration
    // Format parameter is ignored since Stellar uses a single address format (Base32)
    return `https://stellarchain.io/address/${address}`;
  }
};
