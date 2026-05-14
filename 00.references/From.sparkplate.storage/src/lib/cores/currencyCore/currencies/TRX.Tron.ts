// ==========================================
// TRX.Tron - Tron Currency Implementation
// ==========================================
// Based on key-generator-key-generator-vue3 reference
// Uses TronWeb library for address generation
//
// Address Format:
// - Base58 encoded addresses starting with 'T'
// - Hex addresses starting with '41'

import type { CurrencyData, DerivedInfo } from './currencyData';
import { toHex, fromHex } from './utils';

// Import TronWeb constructor from tronweb module
import { TronWeb } from 'tronweb';
// Import secp256k1 for proper public key derivation
import { getPublicKey } from '@noble/secp256k1';

export type TronAddressFormat = 'Base58' | 'Hex';

export const tronData: CurrencyData = {
  basicInfo: {
    name: "Tron",
    symbolTicker: "TRX",
    description: "A decentralized blockchain-based operating system that aims to build a free, global digital content entertainment system with distributed storage technology, and allows easy and cost-effective sharing of digital content.",
    creator: "Tron Foundation",
    debutYear: 2017,
    website: "https://tron.network/",
    whitePaper: "https://tron.network/resources?lng=en&name=1",
    primaryNFTMarketplace: "https://apenft.io/",
    secondaryNFTMarketplace: "https://www.okx.com/web3/marketplace/nft/tron",
  },

  technicalInfo: {
    proofingType: "Other",
    class: "Layer 1 Blockchain (Delegated Proof of Stake)",
    totalSupply: "100,000,000,000 TRX (initial supply, no hard cap)",
    libraryHashing: "SHA-256 / Keccak-256",
    librarySigning: "ECDSA",
    mnemonicSeedPhraseLengths: "12, 24 words (BIP39)",
    privateKeyFormat: "64-character hexadecimal (32 bytes) with optional 0x prefix",
    privateKeyToPublicKeyCurve: "secp256k1",
    publicKeyToPublicWalletAddressHashing: "Keccak-256 + Base58Check (starts with 'T')",
    NPMLibraryHashing: "tronweb",
    NPMLibrarySigning: "tronweb",
    keyStoreFormat: "Tron JSON Keystore (similar to Ethereum)",
    jsonFormat: "Tron JSON-RPC / TRC-20 compatible",
    smartContractLanguage: "Solidity (Tron Virtual Machine - TVM)",
    primaryNPMPackage: "tronweb",
    secondaryNPMPackage: "@noble/secp256k1",
    tertiaryNPMPackage: "tronlink",
    web3ConnectMechanism: "TronLink / WalletConnect",
    nativeWallet: "TronLink",
    humanReadableAddressingPlatform: "N/A (no native name service)",
    humanReadableAddressingNPMPackage: "N/A",
    SendingMechanism: "Tron transaction broadcasting via TronGrid API",
    NFTMintingMechanism: "TRC-721 (ERC-721 compatible)",
    AssetTokenSupportAndMechanism: "TRC-20 (ERC-20 compatible) / TRC-10 (native tokens)",
    evmChainID: "N/A (TVM - Tron Virtual Machine, EVM-compatible but separate)",
    typicalDerivationPath: "m/44'/195'/0'/0/0 (BIP44 Tron standard)",
    sendingFunctionality: "tronweb.transactionBuilder.sendTrx() and tronweb.trx.sendRawTransaction()",
  },

  dex: [
    {
      name: "SunSwap",
      url: "https://sunswap.com/",
      type: "AMM DEX",
      description: "Official decentralized exchange on Tron with deep liquidity and low fees",
    },
    {
      name: "JustMoney",
      url: "https://justmoney.exchange/",
      type: "Stablecoin DEX",
      description: "Stablecoin-focused DEX with efficient swaps and yield farming",
    },
    {
      name: "JustLend DAO Swap",
      url: "https://justlend.org/",
      type: "DeFi Protocol",
      description: "Lending protocol with integrated swap functionality",
    },
    {
      name: "Poloniex DEX",
      url: "https://poloniex.com/trade",
      type: "Hybrid Exchange",
      description: "Exchange with DEX features supporting TRC-20 tokens",
    },
    {
      name: "SunSwap V2",
      url: "https://v2.sunswap.com/",
      type: "AMM DEX V2",
      description: "Enhanced version of SunSwap with improved features",
    },
    {
      name: "TronTrade",
      url: "https://trontrade.io/",
      type: "Multi-Feature DEX",
      description: "Comprehensive DeFi platform with trading, staking, and NFT features",
    },
    {
      name: "ZapperFi (Tron)",
      url: "https://zapper.fi/",
      type: "DeFi Dashboard",
      description: "Multi-chain DeFi dashboard with Tron DEX aggregation",
    },
  ],

  stakingProviders: [
    {
      name: "Tron Super Representatives",
      url: "https://tronscan.org/#/sr/representatives",
      type: "Native Voting/Staking",
      description: "Vote for 27 Super Representatives and earn TRX rewards",
    },
    {
      name: "Binance Staking",
      url: "https://www.binance.com/en/staking",
      type: "Exchange Staking",
      description: "Stake TRX through Binance with flexible and locked options",
    },
    {
      name: "Poloniex Staking",
      url: "https://poloniex.com/staking",
      type: "Exchange Staking",
      description: "Stake TRX through Poloniex exchange",
    },
    {
      name: "JustLend DAO",
      url: "https://justlend.org/",
      type: "DeFi Staking",
      description: "Supply TRX to lending pools and earn interest",
    },
    {
      name: "SUN.io Staking",
      url: "https://sun.io/",
      type: "DeFi Staking",
      description: "Stake TRX and earn SUN tokens through liquidity mining",
    },
    {
      name: "APENFT Marketplace Staking",
      url: "https://apenft.io/",
      type: "NFT Platform Staking",
      description: "Stake TRX to participate in APENFT ecosystem",
    },
    {
      name: "TronLink Wallet Staking",
      url: "https://www.tronlink.org/",
      type: "Wallet Staking",
      description: "Vote for SRs directly through TronLink wallet",
    },
  ],

  miningPools: "N/A (Delegated Proof of Stake - Vote for Super Representatives, no mining)",

  marketInfo: {
    allTimeHigh: {
      price: 0.43,
      currency: "USD",
      date: "2024-12-04",
    },
  },

  socialMedia: {
    discord: "https://discord.gg/tron",
    instagram: "https://www.instagram.com/tronfoundation/",
    linkedin: "https://www.linkedin.com/company/tronfoundation/",
    reddit: "https://www.reddit.com/r/Tronix/",
    slack: "N/A",
    telegram: "https://t.me/tronnetworkEN",
    twitterX: "https://twitter.com/trondao",
  },

  identifiers: {
    UCID: "1958",
    identifierBraveNewCoin: "TRX",
    identifierCoinAPI: "TRX",
    identifierCoinCap: "tron",
    identifierCoinGecko: "tron",
    identifierCoinPaprika: "trx-tron",
  },

  blockExplorer: {
    blockExplorerAPI: "https://api.trongrid.io",
    blockExplorerLink: "https://tronscan.org/#/address/",
  },

  rpcEndpoints: [
    {
      name: "TronGrid - MainNet",
      url: "https://api.trongrid.io",
      port: 443,
      protocol: "https",
      type: "REST API (Public, Optional API Key)",
      description: "Official TRON API with fast and reliable node access. Provides full node HTTP APIs, smart contract deployment and interaction, transaction broadcasting, account and balance queries, block and transaction data, and energy and bandwidth tracking. Free access with rate limits. API key recommended for higher limits.",
      npmPackage: "tronweb",
      documentation: "https://developers.tron.network/docs/trongrid",
      network: "mainnet",
      serviceType: "rest-api",
    },
    {
      name: "TronGrid - Shasta TestNet",
      url: "https://api.shasta.trongrid.io",
      port: 443,
      protocol: "https",
      type: "REST API (Public, Optional API Key)",
      description: "Official TRON Shasta testnet API with fast and reliable node access. Provides full node HTTP APIs for testing, smart contract deployment and interaction, transaction broadcasting, account and balance queries, block and transaction data, and energy and bandwidth tracking. Free access with rate limits. API key recommended for higher limits.",
      npmPackage: "tronweb",
      documentation: "https://developers.tron.network/docs/trongrid",
      network: "shasta",
      serviceType: "rest-api",
    },
    {
      name: "TronGrid - Nile TestNet",
      url: "https://api.nile.trongrid.io",
      port: 443,
      protocol: "https",
      type: "REST API (Public, Optional API Key)",
      description: "Official TRON Nile testnet API with fast and reliable node access. Provides full node HTTP APIs for testing, smart contract deployment and interaction, transaction broadcasting, account and balance queries, block and transaction data, and energy and bandwidth tracking. Free access with rate limits. API key recommended for higher limits.",
      npmPackage: "tronweb",
      documentation: "https://developers.tron.network/docs/trongrid",
      network: "nile",
      serviceType: "rest-api",
    },
    {
      name: "TRONSCAN - MainNet",
      url: "https://apilist.tronscanapi.com/api",
      port: 443,
      protocol: "https",
      type: "REST API (Public, Optional API Key)",
      description: "Official blockchain explorer for the TRON network. Provides detailed block, transaction, and account information, token tracking (TRC10, TRC20), smart contract data, voting and staking info, network statistics, and witness (super representative) data. Free with registration for API key. API key recommended for higher limits.",
      npmPackage: "axios",
      documentation: "https://docs.tronscan.org/",
      network: "mainnet",
      serviceType: "rest-api",
    },
    {
      name: "GetBlock - MainNet",
      url: "https://trx.getblock.io",
      port: 443,
      protocol: "https",
      type: "RPC API (API Key Required)",
      description: "RPC node access for Tron blockchain. Provides fast and reliable RPC node access, transaction broadcasting, smart contract interaction, and multiple network support. Free tier available with API key. Requires API key.",
      npmPackage: "tronweb",
      documentation: "https://getblock.io/docs/tron/",
      network: "mainnet",
      serviceType: "rpc",
      requiresApiKey: true,
    },
    {
      name: "GetBlock - TestNet",
      url: "https://trx.getblock.io",
      port: 443,
      protocol: "https",
      type: "RPC API (API Key Required)",
      description: "RPC node access for Tron testnet. Provides fast and reliable RPC node access for testing, transaction broadcasting, smart contract interaction, and multiple network support. Free tier available with API key. Requires API key.",
      npmPackage: "tronweb",
      documentation: "https://getblock.io/docs/tron/",
      network: "testnet",
      serviceType: "rpc",
      requiresApiKey: true,
    },
    {
      name: "NOWNodes - MainNet",
      url: "https://trx.nownodes.io",
      port: 443,
      protocol: "https",
      type: "REST API (API Key Required)",
      description: "Full node access with free tier. Provides full node access, multiple endpoints, high availability, REST endpoints, real-time data, transaction broadcasting, and contract interaction. Free tier: 5000 requests/month. Requires API key.",
      npmPackage: "axios",
      documentation: "https://nownodes.io/docs/",
      network: "mainnet",
      serviceType: "rest-api",
      requiresApiKey: true,
    },
    {
      name: "Blockchair - MainNet",
      url: "https://api.blockchair.com/tron",
      port: 443,
      protocol: "https",
      type: "REST API (Public, Optional API Key)",
      description: "Fast and reliable blockchain explorer. Provides address information, transaction data, block queries, network statistics, and comprehensive blockchain analytics. Free tier available. API key recommended for higher limits.",
      npmPackage: "axios",
      documentation: "https://blockchair.com/api/docs",
      network: "mainnet",
      serviceType: "rest-api",
    },
  ],

  deriveFromPrivateKey: async (privateKey: string, format?: TronAddressFormat): Promise<DerivedInfo> => {
    try {
      console.log('🔧 [TRX] Deriving Tron address from private key...');

      // Initialize TronWeb instance using static import
      console.log('[TRX] Using static TronWeb import');
      const tronWeb = new TronWeb({
        fullHost: 'https://api.trongrid.io',
        privateKey: '',
      });

      let address: string;
      let publicKey: string;

      // Handle different private key formats
      if (privateKey.startsWith('0x')) {
        // Remove 0x prefix if present
        privateKey = privateKey.slice(2);
      }

      // Ensure private key is 64 characters (32 bytes)
      if (privateKey.length !== 64) {
        throw new Error(`Invalid Tron private key length: expected 64 hex characters, got ${privateKey.length}`);
      }

      // Validate hex format
      if (!/^[0-9a-fA-F]+$/.test(privateKey)) {
        throw new Error('Invalid Tron private key: must be valid hexadecimal');
      }

      try {
        // Set the private key in TronWeb
        tronWeb.setPrivateKey(privateKey);

        // Get the address from private key
        const account = tronWeb.address.fromPrivateKey(privateKey);

        // Ensure account is a string
        if (!account || typeof account !== 'string') {
          throw new Error('Failed to generate Tron address from private key');
        }

        // Generate the actual public key using secp256k1
        // Convert private key to Uint8Array for secp256k1
        const privateKeyBytes = fromHex(privateKey);
        const publicKeyBytes = getPublicKey(privateKeyBytes, true); // true for compressed format
        const compressedPublicKey = toHex(publicKeyBytes);

        if (format === 'Hex') {
          // Return hex format (starts with 41)
          address = tronWeb.address.toHex(account);
          // Use the actual compressed public key
          publicKey = compressedPublicKey;
        } else {
          // Return Base58 format (starts with T) - default
          address = account;
          // Use the actual compressed public key
          publicKey = compressedPublicKey;
        }

        // Validate address format
        if (format === 'Base58' && !address.startsWith('T')) {
          throw new Error(`Generated address does not start with 'T': ${address}`);
        }

        if (format === 'Hex' && !address.startsWith('41')) {
          throw new Error(`Generated hex address does not start with '41': ${address}`);
        }

        console.log(`✅ [TRX] Successfully generated Tron ${format || 'Base58'} address: ${address}`);

        return {
          publicKey: publicKey,
          address: address,
          formatDescription: format === 'Hex'
            ? "Hex Address (starts with '41')"
            : "Base58 Address (starts with 'T')"
        };

      } catch (tronError) {
        console.error('[TRX] TronWeb error:', tronError);
        throw new Error(`Tron address generation failed: ${tronError instanceof Error ? tronError.message : 'Unknown error'}`);
      }

    } catch (error) {
      console.error('[TRX] Tron derivation error:', error);
      throw new Error(`Tron derivation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  getBlockExplorerLink: (address: string, format?: string): string | null => {
    // Tron uses tronscan.org for address exploration
    // Works for both Base58 and Hex address formats
    return `https://tronscan.org/#/address/${address}`;
  }
};
