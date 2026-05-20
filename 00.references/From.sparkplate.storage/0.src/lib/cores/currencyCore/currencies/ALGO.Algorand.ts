// Currency: Algorand (ALGO)
// Source: Cryptocurrency Data
// Research Data Compiled from Multiple Sources

import type { CurrencyData, DerivedInfo } from './currencyData';
import { toHex, fromHex } from './utils';

export const algorandData: CurrencyData = {
  basicInfo: {
    name: "Algorand",
    symbolTicker: "ALGO",
    description: "A pure proof-of-stake blockchain protocol that aims to deliver decentralization, scalability, and security for the next generation of financial products and applications.",
    creator: "Silvio Micali",
    debutYear: 2019,
    website: "https://www.algorand.com/",
    whitePaper: "https://algorandcom.cdn.prismic.io/algorandcom/eed2b6b6-f8b2-4b59-bcf9-564e86a252d5_Algorand_WhitePaper_v1.pdf",
    primaryNFTMarketplace: "https://www.nftexplorer.app/",
    secondaryNFTMarketplace: "https://ab2.gallery/",
  },

  technicalInfo: {
    proofingType: "Proof of Stake",
    class: "Layer 1 Blockchain",
    totalSupply: "10,000,000,000 ALGO",
    libraryHashing: "SHA-512/256",
    librarySigning: "Ed25519",
    mnemonicSeedPhraseLengths: "25 words",
    privateKeyFormat: "64-character hexadecimal (32 bytes)",
    privateKeyToPublicKeyCurve: "Ed25519",
    publicKeyToPublicWalletAddressHashing: "Base32 encoding with checksum",
    NPMLibraryHashing: "@noble/hashes/sha2.js",
    NPMLibrarySigning: "@noble/ed25519",
    keyStoreFormat: "Algorand JSON Keystore",
    jsonFormat: "Algorand Standard Asset (ASA) JSON",
    smartContractLanguage: "TEAL (Transaction Execution Approval Language) / PyTeal",
    primaryNPMPackage: "algosdk",
    secondaryNPMPackage: "@noble/ed25519",
    tertiaryNPMPackage: "tweetnacl",
    web3ConnectMechanism: "WalletConnect / Pera Connect / MyAlgo Connect",
    nativeWallet: "Pera Wallet / Algorand Wallet",
    humanReadableAddressingPlatform: "Algorand Name Service (ANS)",
    humanReadableAddressingNPMPackage: "N/A",
    SendingMechanism: "Algorand SDK transaction signing",
    NFTMintingMechanism: "Algorand Standard Assets (ASA) - Arc3/Arc19",
    AssetTokenSupportAndMechanism: "Algorand Standard Assets (ASA) - native token support",
    evmChainID: "N/A (Non-EVM Chain)",
    typicalDerivationPath: "N/A (Uses 25-word mnemonic with algosdk.mnemonicToSecretKey)",
    sendingFunctionality: "algosdk.makePaymentTxnWithSuggestedParams() and algosdk.signTransaction()",
  },

  dex: [
    {
      name: "Tinyman",
      url: "https://tinyman.org/",
      type: "AMM DEX",
      description: "Leading decentralized exchange on Algorand with automated market making",
    },
    {
      name: "Pact",
      url: "https://www.pact.fi/",
      type: "AMM DEX",
      description: "Community-driven DEX with efficient liquidity pools",
    },
    {
      name: "Humble Swap",
      url: "https://www.humble.sh/",
      type: "AMM DEX",
      description: "User-friendly DEX with multiple trading pairs",
    },
    {
      name: "AlgoFi AMM",
      url: "https://app.algofi.org/swap",
      type: "AMM DEX",
      description: "Part of the AlgoFi DeFi suite with swap functionality",
    },
    {
      name: "Folks Finance Swap",
      url: "https://folks.finance/",
      type: "Integrated DEX",
      description: "Swap functionality within Folks Finance platform",
    },
    {
      name: "Vestige",
      url: "https://vestige.fi/",
      type: "AMM DEX",
      description: "Next-generation DEX focused on capital efficiency",
    },
    {
      name: "WagmiSwap",
      url: "https://www.wagmiswap.io/",
      type: "AMM DEX",
      description: "Decentralized exchange with farming opportunities",
    },
  ],

  stakingProviders: [
    {
      name: "Algorand Foundation",
      url: "https://algorand.foundation/governance",
      type: "Governance Staking",
      description: "Participate in Algorand governance and earn rewards",
    },
    {
      name: "AlgoFi",
      url: "https://www.algofi.org/",
      type: "DeFi Staking",
      description: "Liquid staking and lending protocol",
    },
    {
      name: "Folks Finance",
      url: "https://folks.finance/",
      type: "DeFi Staking",
      description: "Decentralized capital markets protocol",
    },
    {
      name: "Participation Node",
      url: "https://developer.algorand.org/docs/run-a-node/participate/",
      type: "Network Participation",
      description: "Run a participation node to help secure the network",
    },
  ],

  miningPools: "N/A (Proof of Stake - No Mining)",

  marketInfo: {
    allTimeHigh: {
      price: 3.56,
      currency: "USD",
      date: "2019-06-20",
    },
  },

  socialMedia: {
    discord: "https://discord.gg/algorand",
    instagram: "https://www.instagram.com/algorand/",
    linkedin: "https://www.linkedin.com/company/algorand/",
    reddit: "https://www.reddit.com/r/AlgorandOfficial/",
    slack: "https://algorand.foundation/slack",
    telegram: "https://t.me/algorand",
    twitterX: "https://twitter.com/Algorand",
  },

  identifiers: {
    UCID: "4030",
    identifierBraveNewCoin: "ALGO",
    identifierCoinAPI: "ALGO",
    identifierCoinCap: "algorand",
    identifierCoinGecko: "algorand",
    identifierCoinPaprika: "algo-algorand",
  },

  blockExplorer: {
    blockExplorerAPI: "https://algoexplorer.io/api",
    blockExplorerLink: "https://allo.info/account/",
  },

  rpcEndpoints: [
    {
      name: "Algonode - MainNet Algod",
      url: "https://mainnet-api.algonode.cloud",
      port: 443,
      protocol: "https",
      type: "Algod Node (Public)",
      description: "Free public Algod node for MainNet. Supports transaction broadcasting, account queries, and suggested transaction parameters.",
      npmPackage: "algosdk",
      documentation: "https://algonode.io/",
      network: "mainnet",
      serviceType: "algod",
    },
    {
      name: "Algonode - MainNet Indexer",
      url: "https://mainnet-idx.algonode.cloud",
      port: 443,
      protocol: "https",
      type: "Indexer Node (Public)",
      description: "Free public Indexer node for MainNet. Provides advanced transaction history, search, and asset queries.",
      npmPackage: "algosdk",
      documentation: "https://algonode.io/",
      network: "mainnet",
      serviceType: "indexer",
    },
    {
      name: "Algonode - TestNet Algod",
      url: "https://testnet-api.algonode.cloud",
      port: 443,
      protocol: "https",
      type: "Algod Node (Public)",
      description: "Free public Algod node for TestNet. Supports transaction broadcasting, account queries, and suggested transaction parameters.",
      npmPackage: "algosdk",
      documentation: "https://algonode.io/",
      network: "testnet",
      serviceType: "algod",
    },
    {
      name: "Algonode - TestNet Indexer",
      url: "https://testnet-idx.algonode.cloud",
      port: 443,
      protocol: "https",
      type: "Indexer Node (Public)",
      description: "Free public Indexer node for TestNet. Provides advanced transaction history, search, and asset queries.",
      npmPackage: "algosdk",
      documentation: "https://algonode.io/",
      network: "testnet",
      serviceType: "indexer",
    },
    {
      name: "Nodely - MainNet Algod",
      url: "https://mainnet-api.4160.nodely.dev",
      port: 443,
      protocol: "https",
      type: "Algod Node (Public)",
      description: "Free public Algod node for MainNet via Nodely. Supports transaction broadcasting, account queries, and suggested transaction parameters.",
      npmPackage: "algosdk",
      documentation: "https://nodely.io/docs/free/start",
      network: "mainnet",
      serviceType: "algod",
    },
    {
      name: "Nodely - MainNet Indexer",
      url: "https://mainnet-idx.4160.nodely.dev",
      port: 443,
      protocol: "https",
      type: "Indexer Node (Public)",
      description: "Free public Indexer node for MainNet via Nodely. Provides advanced transaction history, search, and asset queries.",
      npmPackage: "algosdk",
      documentation: "https://nodely.io/docs/free/start",
      network: "mainnet",
      serviceType: "indexer",
    },
    {
      name: "Nodely - TestNet Algod",
      url: "https://testnet-api.4160.nodely.dev",
      port: 443,
      protocol: "https",
      type: "Algod Node (Public)",
      description: "Free public Algod node for TestNet via Nodely. Supports transaction broadcasting, account queries, and suggested transaction parameters.",
      npmPackage: "algosdk",
      documentation: "https://nodely.io/docs/free/start",
      network: "testnet",
      serviceType: "algod",
    },
    {
      name: "Nodely - TestNet Indexer",
      url: "https://testnet-idx.4160.nodely.dev",
      port: 443,
      protocol: "https",
      type: "Indexer Node (Public)",
      description: "Free public Indexer node for TestNet via Nodely. Provides advanced transaction history, search, and asset queries.",
      npmPackage: "algosdk",
      documentation: "https://nodely.io/docs/free/start",
      network: "testnet",
      serviceType: "indexer",
    },
    {
      name: "Nodely - BetaNet Algod",
      url: "https://betanet-api.4160.nodely.dev",
      port: 443,
      protocol: "https",
      type: "Algod Node (Public)",
      description: "Free public Algod node for BetaNet via Nodely. Supports transaction broadcasting, account queries, and suggested transaction parameters.",
      npmPackage: "algosdk",
      documentation: "https://nodely.io/docs/free/start",
      network: "betanet",
      serviceType: "algod",
    },
    {
      name: "Nodely - BetaNet Indexer",
      url: "https://betanet-idx.4160.nodely.dev",
      port: 443,
      protocol: "https",
      type: "Indexer Node (Public)",
      description: "Free public Indexer node for BetaNet via Nodely. Provides advanced transaction history, search, and asset queries.",
      npmPackage: "algosdk",
      documentation: "https://nodely.io/docs/free/start",
      network: "betanet",
      serviceType: "indexer",
    },
    {
      name: "Nodely - FNet Algod",
      url: "https://fnet-api.4160.nodely.dev",
      port: 443,
      protocol: "https",
      type: "Algod Node (Public)",
      description: "Free public Algod node for FNet via Nodely. Supports transaction broadcasting, account queries, and suggested transaction parameters.",
      npmPackage: "algosdk",
      documentation: "https://nodely.io/docs/free/start",
      network: "fnet",
      serviceType: "algod",
    },
    {
      name: "Nodely - FNet Indexer",
      url: "https://fnet-idx.4160.nodely.dev",
      port: 443,
      protocol: "https",
      type: "Indexer Node (Public)",
      description: "Free public Indexer node for FNet via Nodely. Provides advanced transaction history, search, and asset queries.",
      npmPackage: "algosdk",
      documentation: "https://nodely.io/docs/free/start",
      network: "fnet",
      serviceType: "indexer",
    },
    {
      name: "AlgoExplorer - MainNet",
      url: "https://algoexplorerapi.io",
      port: 443,
      protocol: "https",
      type: "Explorer API (Public)",
      description: "Free public API for MainNet. Provides account balance, transaction history, network statistics, and transaction broadcasting. Recommended for simple queries.",
      npmPackage: "algosdk",
      documentation: "https://algoexplorer.io/",
      network: "mainnet",
      serviceType: "explorer",
    },
    {
      name: "AlgoExplorer - TestNet",
      url: "https://testnet.algoexplorerapi.io",
      port: 443,
      protocol: "https",
      type: "Explorer API (Public)",
      description: "Free public API for TestNet. Provides account balance, transaction history, network statistics, and transaction broadcasting. Recommended for simple queries.",
      npmPackage: "algosdk",
      documentation: "https://algoexplorer.io/",
      network: "testnet",
      serviceType: "explorer",
    },
    {
      name: "PureStake - MainNet Algod",
      url: "https://mainnet-algorand.api.purestake.io/ps2",
      port: 443,
      protocol: "https",
      type: "Algod Node (API Key Required)",
      description: "Algod node for MainNet via PureStake. Requires API key (25,000 requests/day free tier). Higher rate limits available on paid plans.",
      npmPackage: "algosdk",
      documentation: "https://developer.purestake.io/",
      network: "mainnet",
      serviceType: "algod",
      requiresApiKey: true,
    },
    {
      name: "PureStake - MainNet Indexer",
      url: "https://mainnet-algorand.api.purestake.io/idx2",
      port: 443,
      protocol: "https",
      type: "Indexer Node (API Key Required)",
      description: "Indexer node for MainNet via PureStake. Requires API key (25,000 requests/day free tier). Higher rate limits available on paid plans.",
      npmPackage: "algosdk",
      documentation: "https://developer.purestake.io/",
      network: "mainnet",
      serviceType: "indexer",
      requiresApiKey: true,
    },
    {
      name: "PureStake - TestNet Algod",
      url: "https://testnet-algorand.api.purestake.io/ps2",
      port: 443,
      protocol: "https",
      type: "Algod Node (API Key Required)",
      description: "Algod node for TestNet via PureStake. Requires API key (25,000 requests/day free tier). Higher rate limits available on paid plans.",
      npmPackage: "algosdk",
      documentation: "https://developer.purestake.io/",
      network: "testnet",
      serviceType: "algod",
      requiresApiKey: true,
    },
    {
      name: "PureStake - TestNet Indexer",
      url: "https://testnet-algorand.api.purestake.io/idx2",
      port: 443,
      protocol: "https",
      type: "Indexer Node (API Key Required)",
      description: "Indexer node for TestNet via PureStake. Requires API key (25,000 requests/day free tier). Higher rate limits available on paid plans.",
      npmPackage: "algosdk",
      documentation: "https://developer.purestake.io/",
      network: "testnet",
      serviceType: "indexer",
      requiresApiKey: true,
    },
    {
      name: "Dappflow - MainNet",
      url: "https://mainnet-api.dappflow.org",
      port: 443,
      protocol: "https",
      type: "API (Public, Optional API Key)",
      description: "Free public API for MainNet. Provides account balance, transaction broadcasting, suggested parameters, and basic transaction history. Optional API key for higher limits.",
      npmPackage: "algosdk",
      documentation: "https://docs.dappflow.org",
      network: "mainnet",
      serviceType: "api",
    },
    {
      name: "Dappflow - TestNet",
      url: "https://testnet-api.dappflow.org",
      port: 443,
      protocol: "https",
      type: "API (Public, Optional API Key)",
      description: "Free public API for TestNet. Provides account balance, transaction broadcasting, suggested parameters, and basic transaction history. Optional API key for higher limits.",
      npmPackage: "algosdk",
      documentation: "https://docs.dappflow.org",
      network: "testnet",
      serviceType: "api",
    },
  ],
  
  deriveFromPrivateKey: async (privateKey: string): Promise<DerivedInfo> => {
    // Import dependencies when needed to avoid loading them if not used
    const algosdk = await import('algosdk');
    const nacl = await import('tweetnacl');
    const { sha512_256 } = await import('@noble/hashes/sha2.js');
    const { base32 } = await import('@scure/base');
    
    let secretKey: Uint8Array;
    let publicKey: Uint8Array;
    let address: string = '';
    
    // Check if input is a mnemonic (25 words for Algorand)
    if (privateKey.trim().split(" ").length >= 10) {
      // Handle mnemonic input
      const acct = algosdk.mnemonicToSecretKey(privateKey.trim());
      secretKey = acct.sk;
      address = String(acct.addr);
      
      // In Algorand, the first 32 bytes of the 64-byte secret key are the private key
      // The last 32 bytes are the public key
      publicKey = secretKey.slice(32);
    } else {
      // Handle raw private key input (hex string)
      try {
        // Try to interpret as a hex private key
        const rawPrivateKey = fromHex(privateKey.trim());
        
        if (rawPrivateKey.length !== 32) {
          throw new Error("Private key must be 32 bytes (64 hex characters)");
        }
        
        // Derive public key from private key using Ed25519
        publicKey = nacl.sign.keyPair.fromSeed(rawPrivateKey).publicKey;
        
        // In Algorand, the full secret key is the private key concatenated with the public key
        secretKey = new Uint8Array(64);
        secretKey.set(rawPrivateKey);
        secretKey.set(publicKey, 32);
        
        // Generate address from public key
        // Algorand address is the first 32 bytes of the SHA-512/256 hash of the public key with checksum
        const hashBytes = sha512_256(publicKey);
        
        // Add 4-byte checksum (first 4 bytes of the hash of the hash)
        const checksum = sha512_256(hashBytes).slice(0, 4);
        
        // Concatenate hash and checksum
        const addressBytes = new Uint8Array(32 + 4);
        addressBytes.set(hashBytes);
        addressBytes.set(checksum, 32);
        
        // Encode with base32 + strip padding
        address = base32.encode(addressBytes).replace(/=/g, '') as string;
      } catch (error) {
        throw new Error(`Invalid Algorand private key: ${error.message}`);
      }
    }
    
    return { publicKey: toHex(publicKey), address };
  }
};
