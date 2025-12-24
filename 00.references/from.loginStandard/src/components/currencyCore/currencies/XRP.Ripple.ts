// Currency: Ripple (XRP)
// Source: Cryptocurrency Data
// Research Data Compiled from Multiple Sources

import type { CurrencyData, DerivedInfo } from './currencyData';
import { toHex } from './utils';

export const rippleData: CurrencyData = {
  basicInfo: {
    name: "Ripple",
    symbolTicker: "XRP",
    description: "A real-time gross settlement system, currency exchange and remittance network created by Ripple Labs Inc. XRP is the native cryptocurrency of the Ripple network.",
    creator: "Arthur Britto, David Schwartz, and Ryan Fugger",
    debutYear: 2012,
    website: "https://ripple.com/",
    whitePaper: "https://ripple.com/files/ripple_consensus_whitepaper.pdf",
    primaryNFTMarketplace: "https://xrp.cafe/",
    secondaryNFTMarketplace: "https://onxrp.com/",
  },

  technicalInfo: {
    proofingType: "Other",
    class: "Layer 1 Blockchain (XRP Ledger Consensus Protocol / Payment Network)",
    totalSupply: "100,000,000,000 XRP (pre-mined, deflationary through tx fees)",
    libraryHashing: "SHA-256, SHA-512",
    librarySigning: "Ed25519, ECDSA-secp256k1",
    mnemonicSeedPhraseLengths: "12, 24 words (BIP39)",
    privateKeyFormat: "Hex private key (Ed25519 or secp256k1)",
    privateKeyToPublicKeyCurve: "Ed25519 or secp256k1",
    publicKeyToPublicWalletAddressHashing: "SHA-256 + RIPEMD-160 + Base58Check (starts with 'r')",
    NPMLibraryHashing: "@noble/hashes",
    NPMLibrarySigning: "@noble/curves",
    keyStoreFormat: "XRP Ledger JSON Keystore (ripple-keypairs format)",
    jsonFormat: "XRP Ledger JSON format / rippled API compatible",
    smartContractLanguage: "Hooks (C-like) - in development",
    primaryNPMPackage: "xrpl",
    secondaryNPMPackage: "ripple-keypairs",
    tertiaryNPMPackage: "@noble/curves",
    web3ConnectMechanism: "Xumm / Gem Wallet / Crossmark",
    nativeWallet: "Xumm / XRPL Wallet",
    humanReadableAddressingPlatform: "XRP Name Service (XNS)",
    humanReadableAddressingNPMPackage: "N/A",
    SendingMechanism: "XRP Ledger transaction submission via rippled",
    NFTMintingMechanism: "XLS-20 (native NFT standard on XRP Ledger)",
    AssetTokenSupportAndMechanism: "IOUs / Trust Lines (native multi-currency)",
    evmChainID: "N/A (XRP Ledger Consensus Protocol, non-EVM)",
    typicalDerivationPath: "m/44'/144'/0'/0/0 (BIP44 XRP standard)",
    sendingFunctionality: "xrpl.Client with wallet.autofill(), sign(), and submitAndWait()",
  },

  dex: [
    {
      name: "Sologenic DEX",
      url: "https://sologenic.com/",
      type: "Native DEX",
      description: "Leading DEX on XRP Ledger with tokenized assets and AMM functionality",
    },
    {
      name: "XRP Toolkit",
      url: "https://www.xrptoolkit.com/",
      type: "Native DEX Interface",
      description: "Professional interface for XRPL's built-in decentralized exchange",
    },
    {
      name: "Xumm DEX",
      url: "https://xumm.app/",
      type: "Wallet DEX",
      description: "Built-in DEX functionality within Xumm wallet for XRPL assets",
    },
    {
      name: "GateHub",
      url: "https://gatehub.net/",
      type: "Hybrid Exchange",
      description: "Wallet and exchange with access to XRPL DEX and gateway services",
    },
    {
      name: "XRPL DEX (Native)",
      url: "https://xrpl.org/decentralized-exchange.html",
      type: "Protocol DEX",
      description: "Built-in decentralized exchange at the protocol level on XRP Ledger",
    },
    {
      name: "Crossmark DEX",
      url: "https://crossmark.io/",
      type: "Wallet & DEX",
      description: "Browser extension wallet with integrated XRPL DEX trading",
    },
    {
      name: "Bitrue",
      url: "https://www.bitrue.com/",
      type: "Hybrid Exchange",
      description: "Centralized exchange with XRP focus and XRPL integration",
    },
  ],

  stakingProviders: [
    {
      name: "N/A - XRP Ledger Consensus",
      url: "https://xrpl.org/consensus.html",
      type: "Validator Consensus",
      description: "XRP uses validator consensus without staking rewards. Validators secure the network pro bono.",
    },
    {
      name: "Flare Networks (FLR)",
      url: "https://flare.network/",
      type: "Airdrop & Delegation",
      description: "XRP holders received FLR airdrop and can delegate for rewards on Flare Network",
    },
    {
      name: "Songbird (SGB)",
      url: "https://flare.network/songbird/",
      type: "Canary Network",
      description: "Canary network for Flare with SGB tokens for XRP holders to delegate and earn",
    },
    {
      name: "Nexo",
      url: "https://nexo.io/",
      type: "Centralized Lending",
      description: "Earn interest on XRP through Nexo's lending platform",
    },
    {
      name: "Binance Earn",
      url: "https://www.binance.com/en/earn",
      type: "Exchange Savings",
      description: "Flexible and locked savings for XRP on Binance",
    },
    {
      name: "Crypto.com Earn",
      url: "https://crypto.com/earn",
      type: "Exchange Earn",
      description: "Earn rewards on XRP through Crypto.com platform",
    },
    {
      name: "Uphold Earn",
      url: "https://uphold.com/",
      type: "Exchange Earn",
      description: "Earn interest on XRP holdings through Uphold",
    },
  ],

  miningPools: "N/A (XRP Ledger Consensus Protocol - Uses validators, no mining or staking rewards)",

  marketInfo: {
    allTimeHigh: {
      price: 3.65,
      currency: "USD",
      date: "2025-07-18",
    },
  },

  socialMedia: {
    discord: "https://discord.gg/ripple",
    instagram: "https://www.instagram.com/ripple/",
    linkedin: "https://www.linkedin.com/company/ripple/",
    reddit: "https://www.reddit.com/r/ripple/",
    slack: "N/A",
    telegram: "https://t.me/Ripple",
    twitterX: "https://twitter.com/Ripple",
  },

  identifiers: {
    UCID: "52",
    identifierBraveNewCoin: "XRP",
    identifierCoinAPI: "XRP",
    identifierCoinCap: "ripple",
    identifierCoinGecko: "ripple",
    identifierCoinPaprika: "xrp-xrp",
  },

  blockExplorer: {
    blockExplorerAPI: "https://api.xrpscan.com/",
    blockExplorerLink: "https://livenet.xrpl.org/account/",
  },

  rpcEndpoints: [
    {
      name: "XRP Ledger (XRPL) - MainNet",
      url: "https://s1.ripple.com",
      port: 51234,
      protocol: "https",
      type: "JSON-RPC (Public)",
      description: "Official XRP Ledger public server. Provides complete ledger data access, transaction submission, account information and balances, payment channels, escrows and checks, order books and DEX trading, trust lines (issued currencies), and WebSocket support. Free access, no authentication required.",
      npmPackage: "xrpl",
      documentation: "https://xrpl.org/docs/references/http-websocket-apis/",
      network: "mainnet",
      serviceType: "rpc",
    },
    {
      name: "XRP Ledger (XRPL) - TestNet",
      url: "https://s.altnet.rippletest.net",
      port: 51234,
      protocol: "https",
      type: "JSON-RPC (Public)",
      description: "Official XRP Ledger testnet public server. Provides complete ledger data access for testing, transaction submission, account information and balances, payment channels, escrows and checks, order books and DEX trading, trust lines (issued currencies), and WebSocket support. Free access, no authentication required.",
      npmPackage: "xrpl",
      documentation: "https://xrpl.org/docs/references/http-websocket-apis/",
      network: "testnet",
      serviceType: "rpc",
    },
    {
      name: "XRP Ledger (XRPL) - DevNet",
      url: "https://s.devnet.rippletest.net",
      port: 51234,
      protocol: "https",
      type: "JSON-RPC (Public)",
      description: "Official XRP Ledger devnet public server. Provides complete ledger data access for development, transaction submission, account information and balances, payment channels, escrows and checks, order books and DEX trading, trust lines (issued currencies), and WebSocket support. Free access, no authentication required.",
      npmPackage: "xrpl",
      documentation: "https://xrpl.org/docs/references/http-websocket-apis/",
      network: "devnet",
      serviceType: "rpc",
    },
    {
      name: "XRPL Cluster - MainNet (WebSocket)",
      url: "wss://xrplcluster.com",
      port: 443,
      protocol: "wss",
      type: "WebSocket RPC (Public)",
      description: "XRPL Cluster WebSocket endpoint for real-time subscriptions. Provides WebSocket access to XRP Ledger for real-time updates, transaction streaming, ledger subscriptions, and account monitoring. Free access, no authentication required.",
      npmPackage: "xrpl",
      documentation: "https://xrpl.org/docs/references/http-websocket-apis/",
      network: "mainnet",
      serviceType: "websocket",
    },
    {
      name: "XRPL Cluster - MainNet Alternative 1 (WebSocket)",
      url: "wss://s1.ripple.com",
      port: 443,
      protocol: "wss",
      type: "WebSocket RPC (Public)",
      description: "Alternative XRP Ledger WebSocket endpoint (s1.ripple.com). Provides WebSocket access to XRP Ledger for real-time updates, transaction streaming, ledger subscriptions, and account monitoring. Free access, no authentication required.",
      npmPackage: "xrpl",
      documentation: "https://xrpl.org/docs/references/http-websocket-apis/",
      network: "mainnet",
      serviceType: "websocket",
    },
    {
      name: "XRPL Cluster - MainNet Alternative 2 (WebSocket)",
      url: "wss://s2.ripple.com",
      port: 443,
      protocol: "wss",
      type: "WebSocket RPC (Public)",
      description: "Alternative XRP Ledger WebSocket endpoint (s2.ripple.com). Provides WebSocket access to XRP Ledger for real-time updates, transaction streaming, ledger subscriptions, and account monitoring. Free access, no authentication required.",
      npmPackage: "xrpl",
      documentation: "https://xrpl.org/docs/references/http-websocket-apis/",
      network: "mainnet",
      serviceType: "websocket",
    },
    {
      name: "XRPL Cluster - TestNet (WebSocket)",
      url: "wss://s.altnet.rippletest.net",
      port: 51233,
      protocol: "wss",
      type: "WebSocket RPC (Public)",
      description: "XRPL Cluster WebSocket endpoint for testnet. Provides WebSocket access to XRP Ledger testnet for real-time updates, transaction streaming, ledger subscriptions, and account monitoring. Free access, no authentication required.",
      npmPackage: "xrpl",
      documentation: "https://xrpl.org/docs/references/http-websocket-apis/",
      network: "testnet",
      serviceType: "websocket",
    },
    {
      name: "XRPSCAN - MainNet",
      url: "https://api.xrpscan.com/api/v1",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Comprehensive XRP Ledger Explorer. Provides account information and balances, transaction histories, token (IOU) tracking, MPT (Multi-Purpose Tokens), NFT tracking and metadata, DID and credentials, oracles and validators, AMM (Automated Market Makers), XRP rich list, and network metrics and charts. Free public API access, no authentication required.",
      npmPackage: "axios",
      documentation: "https://xrpscan.com/",
      network: "mainnet",
      serviceType: "rest-api",
    },
    {
      name: "XRPSCAN - TestNet",
      url: "https://api-testnet.xrpscan.com/api/v1",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Comprehensive XRP Ledger Explorer for testnet. Provides account information and balances, transaction histories, token (IOU) tracking, MPT (Multi-Purpose Tokens), NFT tracking and metadata, DID and credentials, oracles and validators, AMM (Automated Market Makers), XRP rich list, and network metrics and charts. Free public API access, no authentication required.",
      npmPackage: "axios",
      documentation: "https://xrpscan.com/",
      network: "testnet",
      serviceType: "rest-api",
    },
    {
      name: "Bithomp - MainNet",
      url: "https://bithomp.com/api/v2",
      port: 443,
      protocol: "https",
      type: "REST API (Public, Optional API Key)",
      description: "Fast and trusted XRP Ledger Explorer. Provides fast account scanning, transaction tracking, token (IOU) information, NFT support, username resolution (Bithomp names), payment history, and high performance. Free access. API key recommended for higher limits.",
      npmPackage: "axios",
      documentation: "https://docs.bithomp.com/",
      network: "mainnet",
      serviceType: "rest-api",
    },
    {
      name: "Bitquery - MainNet",
      url: "https://graphql.bitquery.io",
      port: 443,
      protocol: "https",
      type: "GraphQL API (API Key Required)",
      description: "GraphQL API with real-time and historical data. Provides historical and real-time blockchain data, flexible GraphQL queries, transfers, offers, checks, escrows, payment tracking, and complex filtering. Free tier available. Requires API key.",
      npmPackage: "graphql-request",
      documentation: "https://bitquery.io/blockchains/ripple-blockchain-api",
      network: "mainnet",
      serviceType: "graphql",
      requiresApiKey: true,
    },
    {
      name: "NOWNodes - MainNet",
      url: "https://xrp.nownodes.io",
      port: 443,
      protocol: "https",
      type: "REST API (API Key Required)",
      description: "Full node access with free tier. Provides full node access, transaction tracking, account queries, JSON-RPC support, and high uptime. Free tier: 5,000 requests/day. Requires API key.",
      npmPackage: "axios",
      documentation: "https://nownodes.io/nodes/ripple-xrp",
      network: "mainnet",
      serviceType: "rest-api",
      requiresApiKey: true,
    },
    {
      name: "GetBlock - MainNet",
      url: "https://go.getblock.io",
      port: 443,
      protocol: "https",
      type: "RPC API (API Key Required)",
      description: "RPC node provider for XRP Ledger. Provides instant XRP RPC node access, transaction retrieval, account queries, high availability, and reliable infrastructure. Free tier available with API key. Requires API key.",
      npmPackage: "xrpl",
      documentation: "https://getblock.io/docs/xrp/",
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
      description: "RPC node provider for XRP Ledger testnet. Provides instant XRP RPC node access for testing, transaction retrieval, account queries, high availability, and reliable infrastructure. Free tier available with API key. Requires API key.",
      npmPackage: "xrpl",
      documentation: "https://getblock.io/docs/xrp/",
      network: "testnet",
      serviceType: "rpc",
      requiresApiKey: true,
    },
    {
      name: "QuickNode - MainNet",
      url: "https://example.xrpl.quiknode.pro",
      port: 443,
      protocol: "https",
      type: "RPC API (API Key Required)",
      description: "Reliable XRP Ledger RPC endpoints. Provides fast RPC nodes, Web3 application support, high performance, global infrastructure, account lines and offers. Free tier available. Requires API key.",
      npmPackage: "xrpl",
      documentation: "https://www.quicknode.com/docs/xrpl",
      network: "mainnet",
      serviceType: "rpc",
      requiresApiKey: true,
    },
  ],

  decryptKeystore: async (keystore: unknown, password: string): Promise<string> => {
    try {
      const rippleKeystore = keystore as {
        encrypted?: boolean;
        ciphertext?: string;
        salt?: string;
        kdf?: string;
        version?: string;
      };

      console.log('🔧 Decrypting Ripple keystore...');

      if (!rippleKeystore.ciphertext || !rippleKeystore.encrypted) {
        throw new Error('Invalid keystore format');
      }

      // Use CryptoJS for AES decryption (common for Ripple keystores)
      const cryptoJs = await import('crypto-js');

      // Extract parameters
      const { ciphertext, salt } = rippleKeystore;

      // Decrypt using AES
      const decrypted = cryptoJs.AES.decrypt(ciphertext, password);

      const decryptedText = decrypted.toString(cryptoJs.enc.Utf8);

      if (!decryptedText) {
        throw new Error('Invalid password or corrupted keystore');
      }

      console.log(`✅ Ripple keystore decrypted successfully`);
      return decryptedText;
    } catch (error) {
      throw new Error(`Failed to decrypt Ripple keystore: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  deriveFromPrivateKey: async (privateKey: string): Promise<DerivedInfo> => {
    console.log("XRP case entered with priv:", privateKey);

    try {
      const trimmedPriv = privateKey.trim();

      // Import required libraries
      const { ed25519: nobleEd25519 } = await import('@noble/curves/ed25519');
      const { secp256k1: nobleSecp256k1 } = await import('@noble/curves/secp256k1');
      const { bytesToHex } = await import('@noble/hashes/utils');

      // Import ripple-keypairs utilities for algorithm detection
      const { getAlgorithmFromPrivateKey } = await import('ripple-keypairs/dist/utils/getAlgorithmFromKey');

      // Determine algorithm from private key
      const ED_ALGO = 'ed25519';
      const SECP256K1_ALGO = 'ecdsa-secp256k1';

      const algorithm = getAlgorithmFromPrivateKey(trimmedPriv);
      console.log("Detected algorithm:", algorithm);

      let publicKey: string;

      if (algorithm === ED_ALGO) {
        console.log("Processing Ed25519 private key");

        // Remove '00' prefix if present for Ed25519 keys
        const rawPrivateKey = trimmedPriv.startsWith('00') ? trimmedPriv.slice(2) : trimmedPriv;

        // Convert hex string to Uint8Array
        const privateKeyBytes = Uint8Array.from(rawPrivateKey.match(/.{1,2}/g)!.map((b) => parseInt(b, 16)));

        // Derive public key using Ed25519
        const publicKeyBytes = nobleEd25519.getPublicKey(privateKeyBytes);

        // Format public key with ED prefix
        publicKey = 'ED' + bytesToHex(publicKeyBytes);

        console.log("Ed25519 public key derived:", publicKey);

      } else if (algorithm === SECP256K1_ALGO) {
        console.log("Processing secp256k1 private key");

        // Remove '00' prefix if present for secp256k1 keys
        const rawPrivateKey = trimmedPriv.startsWith('00') ? trimmedPriv.slice(2) : trimmedPriv;

        // Convert hex string to Uint8Array
        const privateKeyBytes = Uint8Array.from(rawPrivateKey.match(/.{1,2}/g)!.map((b) => parseInt(b, 16)));

        // Derive public key using secp256k1 (compressed format)
        const publicKeyBytes = nobleSecp256k1.getPublicKey(privateKeyBytes, true);

        // Format public key as hex (no prefix for secp256k1)
        publicKey = bytesToHex(publicKeyBytes);

        console.log("secp256k1 public key derived:", publicKey);

      } else {
        throw new Error(`Unsupported algorithm: ${algorithm}. XRP supports Ed25519 and secp256k1.`);
      }

      // Create XRP wallet using xrpl library to get the address
      const xrpl = await import('xrpl');
      const wallet = new xrpl.Wallet(publicKey, trimmedPriv);

      const address = wallet.classicAddress;
      console.log("XRP address generated:", address);

      return {
        publicKey: publicKey,
        address: address
      };

    } catch (error) {
      console.error("XRP derivation error:", error);
      throw new Error(`XRP derivation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  getBlockExplorerLink: (address: string, format?: string): string | null => {
    // XRP uses xrpscan.com for address exploration (preferred over livenet.xrpl.org)
    // Format parameter is ignored since XRP uses a single address format
    return `https://xrpscan.com/account/${address}`;
  }
};
