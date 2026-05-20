// Currency: Waves (WAVES)
// Source: Cryptocurrency Data
// Research Data Compiled from Multiple Sources

import type { CurrencyData, DerivedInfo } from './currencyData';
import { toHex } from './utils';

export const wavesData: CurrencyData = {
  basicInfo: {
    name: "Waves",
    symbolTicker: "WAVES",
    description: "A multi-purpose blockchain platform that supports custom blockchain tokens, smart contracts, and decentralized applications with high throughput and low fees.",
    creator: "Alexander Ivanov",
    debutYear: 2016,
    website: "https://waves.tech/",
    whitePaper: "https://docs.waves.tech/en/",
    primaryNFTMarketplace: "https://sign-art.app/",
    secondaryNFTMarketplace: "https://waves.exchange/",
  },

  technicalInfo: {
    proofingType: "Proof of Stake",
    class: "Layer 1 Blockchain (Multi-Purpose Platform)",
    totalSupply: "100,000,000 WAVES (fixed supply)",
    libraryHashing: "Blake2b, Keccak-256, SHA-256",
    librarySigning: "Curve25519 (Ed25519)",
    mnemonicSeedPhraseLengths: "15 words (Waves-specific seed phrase)",
    privateKeyFormat: "Base58-encoded private key (Waves-specific format)",
    privateKeyToPublicKeyCurve: "Curve25519",
    publicKeyToPublicWalletAddressHashing: "Base58 encoding with address version byte + Blake2b-256",
    NPMLibraryHashing: "@waves/ts-lib-crypto",
    NPMLibrarySigning: "@waves/ts-lib-crypto",
    keyStoreFormat: "Waves JSON Keystore (AES encrypted)",
    jsonFormat: "Waves JSON format / Ride dApp compatible",
    smartContractLanguage: "Ride (functional smart contract language)",
    primaryNPMPackage: "@waves/ts-lib-crypto",
    secondaryNPMPackage: "@waves/waves-transactions",
    tertiaryNPMPackage: "@waves/signer",
    web3ConnectMechanism: "Waves Signer / Waves Keeper / WalletConnect",
    nativeWallet: "Waves Keeper / Waves.Exchange",
    humanReadableAddressingPlatform: "Waves Name Service (WNS)",
    humanReadableAddressingNPMPackage: "N/A",
    SendingMechanism: "Waves transaction broadcasting via Waves nodes",
    NFTMintingMechanism: "Waves NFT standard (Issue Transaction)",
    AssetTokenSupportAndMechanism: "Waves native assets (Issue Transaction) - built-in token support",
    evmChainID: "N/A (Waves VM with Ride language, non-EVM)",
    typicalDerivationPath: "N/A (Uses unique 15-word Waves seed phrase, not BIP44 derivation)",
    sendingFunctionality: "@waves/waves-transactions transfer() and broadcast()",
  },

  dex: [
    {
      name: "Waves.Exchange",
      url: "https://waves.exchange/",
      type: "Hybrid Exchange",
      description: "Official Waves exchange with DEX features, gateway services, and staking",
    },
    {
      name: "Swop.fi",
      url: "https://swop.fi/",
      type: "AMM DEX",
      description: "Automated market maker DEX on Waves with liquidity pools and governance",
    },
    {
      name: "Puzzle Swap",
      url: "https://puzzleswap.org/",
      type: "Aggregator DEX",
      description: "DEX aggregator finding best prices across Waves ecosystem",
    },
    {
      name: "Waves Ducks",
      url: "https://wavesducks.com/",
      type: "NFT DEX",
      description: "NFT-focused marketplace with token swaps and gaming elements",
    },
    {
      name: "SignArt Marketplace",
      url: "https://sign-art.app/",
      type: "NFT Marketplace",
      description: "Primary NFT marketplace on Waves with trading features",
    },
    {
      name: "ViresFinance",
      url: "https://vires.finance/",
      type: "Lending Protocol",
      description: "Decentralized lending protocol with integrated swap functionality",
    },
    {
      name: "Neutrino Protocol",
      url: "https://neutrino.at/",
      type: "Stablecoin Protocol",
      description: "Algorithmic stablecoin protocol with swap features for USDN",
    },
  ],

  stakingProviders: [
    {
      name: "Waves.Exchange Leasing",
      url: "https://waves.exchange/leasing",
      type: "Native Leasing",
      description: "Lease WAVES to nodes directly through Waves.Exchange",
    },
    {
      name: "Waves Keeper Leasing",
      url: "https://wavesplatform.com/products-keeper",
      type: "Wallet Leasing",
      description: "Lease to nodes directly from Waves Keeper wallet",
    },
    {
      name: "Neutrino Staking",
      url: "https://neutrino.at/",
      type: "DeFi Staking",
      description: "Stake WAVES to mint USDN stablecoin and earn rewards",
    },
    {
      name: "WavesDAO",
      url: "https://waves.exchange/governance",
      type: "Governance Staking",
      description: "Stake WAVES in governance to participate in protocol decisions",
    },
    {
      name: "Community Nodes",
      url: "https://dev.pywaves.org/generators/",
      type: "Direct Node Leasing",
      description: "Lease directly to any of 100+ active generating nodes",
    },
    {
      name: "Binance Staking",
      url: "https://www.binance.com/en/staking",
      type: "Exchange Staking",
      description: "Stake WAVES through Binance exchange",
    },
    {
      name: "ViresFinance Staking",
      url: "https://vires.finance/",
      type: "DeFi Staking",
      description: "Supply WAVES to lending pools and earn interest",
    },
  ],

  miningPools: "N/A (Leased Proof of Stake - Lease to generating nodes, no mining)",

  marketInfo: {
    allTimeHigh: {
      price: 61.30,
      currency: "USD",
      date: "2022-03-31",
    },
  },

  socialMedia: {
    discord: "https://discord.gg/waves",
    instagram: "https://www.instagram.com/wavesprotocol/",
    linkedin: "https://www.linkedin.com/company/waves-platform/",
    reddit: "https://www.reddit.com/r/Wavesplatform/",
    slack: "N/A",
    telegram: "https://t.me/wavesnews",
    twitterX: "https://twitter.com/wavesprotocol",
  },

  identifiers: {
    UCID: "1274",
    identifierBraveNewCoin: "WAVES",
    identifierCoinAPI: "WAVES",
    identifierCoinCap: "waves",
    identifierCoinGecko: "waves",
    identifierCoinPaprika: "waves-waves",
  },

  blockExplorer: {
    blockExplorerAPI: "https://nodes.wavesnodes.com/",
    blockExplorerLink: "https://wavesexplorer.com/address/",
  },

  rpcEndpoints: [
    {
      name: "Waves Node REST API - MainNet",
      url: "https://nodes.wavesnodes.com",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Official node REST API - main interface for blockchain interaction. Provides complete blockchain data access, transaction broadcasting, smart contract (dApp) interaction, asset and NFT queries, staking and leasing information, data entries and script evaluation, and alias management. Free access with rate limits, no API key required.",
      npmPackage: "@waves/waves-transactions",
      documentation: "https://docs.waves.tech/en/waves-node/node-api/",
      network: "mainnet",
      serviceType: "rest-api",
    },
    {
      name: "Waves Node REST API - TestNet",
      url: "https://nodes-testnet.wavesnodes.com",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Official node REST API for Waves testnet. Provides complete blockchain data access for testing, transaction broadcasting, smart contract (dApp) interaction, asset and NFT queries, staking and leasing information, data entries and script evaluation, and alias management. Free access with rate limits, no API key required.",
      npmPackage: "@waves/waves-transactions",
      documentation: "https://docs.waves.tech/en/waves-node/node-api/",
      network: "testnet",
      serviceType: "rest-api",
    },
    {
      name: "Waves Node REST API - Stagenet",
      url: "https://nodes-stagenet.wavesnodes.com",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Official node REST API for Waves stagenet (staging environment). Provides complete blockchain data access for staging, transaction broadcasting, smart contract (dApp) interaction, asset and NFT queries, staking and leasing information, data entries and script evaluation, and alias management. Free access with rate limits, no API key required.",
      npmPackage: "@waves/waves-transactions",
      documentation: "https://docs.waves.tech/en/waves-node/node-api/",
      network: "stagenet",
      serviceType: "rest-api",
    },
    {
      name: "WScan - MainNet",
      url: "https://api.wscan.io",
      port: 443,
      protocol: "https",
      type: "REST API (Public, Optional API Key)",
      description: "Explorer with tokens, NFTs, and portfolio tracking. Provides latest tokens and NFTs, transaction search with filters, portfolio overviews, NFT tracking by owner, and CSV export capabilities. Free access with rate limits. API key recommended for higher limits.",
      npmPackage: "axios",
      documentation: "https://wscan.io/",
      network: "mainnet",
      serviceType: "rest-api",
    },
    {
      name: "Waves.Exchange - MainNet",
      url: "https://api.waves.exchange",
      port: 443,
      protocol: "https",
      type: "REST API (Public, Optional API Key)",
      description: "Official Waves exchange REST API. Provides exchange data, trading information, gateway services, staking data, and comprehensive trading tools. Free tier: 100 requests/second. API key recommended for higher limits.",
      npmPackage: "axios",
      documentation: "https://docs.waves.exchange/",
      network: "mainnet",
      serviceType: "rest-api",
    },
    {
      name: "Waves.Exchange Matcher - MainNet",
      url: "https://matcher.waves.exchange/api/v1",
      port: 443,
      protocol: "https",
      type: "REST API (Public, Optional API Key)",
      description: "Waves.Exchange matcher API for orderbook matching and DEX functionality. Provides orderbook data, order placement and cancellation, trade history, and market data. Free tier: 100 requests/second. API key recommended for higher limits.",
      npmPackage: "axios",
      documentation: "https://docs.waves.exchange/",
      network: "mainnet",
      serviceType: "rest-api",
    },
    {
      name: "Waves Protocol Data Service - MainNet",
      url: "https://api.wavesprotocol.org/v0",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Waves Protocol data service API. Provides blockchain data, network statistics, and protocol information. Free access with rate limits, no API key required.",
      npmPackage: "axios",
      documentation: "https://docs.waves.tech/",
      network: "mainnet",
      serviceType: "rest-api",
    },
    {
      name: "Waves Platform Data Service - MainNet",
      url: "https://api.wavesplatform.com/v0",
      port: 443,
      protocol: "https",
      type: "REST API (Public)",
      description: "Waves Platform data service API. Provides platform data, network statistics, and ecosystem information. Free access with rate limits, no API key required.",
      npmPackage: "axios",
      documentation: "https://docs.waves.tech/",
      network: "mainnet",
      serviceType: "rest-api",
    },
    {
      name: "GetBlock - MainNet",
      url: "https://go.getblock.io",
      port: 443,
      protocol: "https",
      type: "RPC API (API Key Required)",
      description: "RPC node provider for Waves blockchain. Provides instant access to Waves RPC nodes, reliable infrastructure, high availability, transaction broadcasting, and asset queries. Free tier available with API key. Requires API key.",
      npmPackage: "@waves/waves-transactions",
      documentation: "https://getblock.io/docs/waves/",
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
      description: "RPC node provider for Waves testnet. Provides instant access to Waves RPC nodes for testing, reliable infrastructure, high availability, transaction broadcasting, and asset queries. Free tier available with API key. Requires API key.",
      npmPackage: "@waves/waves-transactions",
      documentation: "https://getblock.io/docs/waves/",
      network: "testnet",
      serviceType: "rpc",
      requiresApiKey: true,
    },
  ],

  deriveFromPrivateKey: async (privateKey: string): Promise<DerivedInfo> => {
    try {
      console.log("Processing Waves private key:", privateKey);

      // Import the Waves crypto library
      const wavesLib = await import('@waves/ts-lib-crypto');

      // For private keys, we need to derive the public key first, then the address
      // This is the correct approach according to Waves cryptography specification
      const publicKey = wavesLib.publicKey({ privateKey: privateKey });
      const address = wavesLib.address({ publicKey: publicKey });

      console.log("Derived Waves address:", address);
      console.log("Derived Waves public key:", publicKey);

      return {
        publicKey: publicKey,
        address: address
      };

    } catch (error) {
      console.error("WAVES derivation error:", error);
      throw new Error(`Waves derivation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },
  
  decryptKeystore: async (keystore: unknown, password: string): Promise<string> => {
    try {
      const wavesKeystore = keystore as {
        version?: string;
        crypto?: {
          cipher: string;
          ciphertext: string;
          cipherparams: { iv: string };
          kdf: string;
          kdfparams: { dklen: number; n: number; r: number; p: number; salt: string };
          mac: string;
        };
      };
      
      console.log('🔧 Decrypting Waves keystore...');
      
      if (!wavesKeystore.crypto) {
        throw new Error('Invalid keystore format');
      }
      
      // Use CryptoJS for decryption
      const cryptoJs = await import('crypto-js');
      
      // Extract parameters
      const { ciphertext, cipherparams } = wavesKeystore.crypto;
      const iv = cryptoJs.enc.Hex.parse(cipherparams.iv);
      
      // Decrypt using AES
      const decrypted = cryptoJs.AES.decrypt(
        ciphertext,
        password
      );
      
      const decryptedText = decrypted.toString(cryptoJs.enc.Utf8);
      
      if (!decryptedText) {
        throw new Error('Invalid password or corrupted keystore');
      }
      
      console.log(`✅ Waves keystore decrypted successfully`);
      return decryptedText;
    } catch (error) {
      throw new Error(`Failed to decrypt Waves keystore: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  getBlockExplorerLink: (address: string, format?: string): string | null => {
    // Waves uses wavesexplorer.com for address exploration
    // Format parameter is ignored since Waves uses a single address format
    return `https://wavesexplorer.com/address/${address}`;
  }
};
