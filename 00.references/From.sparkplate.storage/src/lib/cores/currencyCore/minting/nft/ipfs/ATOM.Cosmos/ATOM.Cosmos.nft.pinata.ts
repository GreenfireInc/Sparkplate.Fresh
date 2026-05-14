// Cosmos NFT Minting via Pinata IPFS
// Uploads files to Pinata IPFS, then creates Cosmos CW721 NFT referencing the IPFS CID

/**
 * OVERVIEW:
 * 
 * This module enables NFT minting on Cosmos with asset storage on Pinata IPFS.
 * - Upload media files to Pinata IPFS (images, videos, audio, documents)
 * - Create Cosmos CW721 NFT metadata referencing IPFS CID
 * - Deploy NFT to Cosmos blockchain using CosmWasm smart contracts
 * 
 * BENEFITS:
 * - Fast IPFS upload via Pinata
 * - Permanent metadata on Cosmos
 * - CW721 compatible
 * - Supports all file types
 * 
 * COSTS:
 * - Pinata: Free tier available (1GB storage, unlimited gateways)
 * - Cosmos: ~0.025 ATOM for contract instantiation + gas fees
 */

import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { GasPrice } from '@cosmjs/stargate';
import FormData from 'form-data';
import axios from 'axios';

export interface PinataConfig {
  apiKey: string;
  apiSecret: string;
  jwt?: string;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image?: string; // IPFS CID or URL
  animation_url?: string;
  external_url?: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
  properties?: Record<string, any>;
}

export interface MintResult {
  ipfsCid: string;
  ipfsUrl: string;
  metadataCid: string;
  metadataUrl: string;
  tokenId: string;
  contractAddress: string;
  txHash: string;
  mintscanUrl: string;
}

export interface FileUploadOptions {
  fileName?: string;
  pinataMetadata?: {
    name?: string;
    keyvalues?: Record<string, string | number>;
  };
  pinataOptions?: {
    cidVersion?: 0 | 1;
  };
}

export class CosmosPinataNFTMinter {
  private pinataConfig: PinataConfig;
  private pinataBaseUrl = 'https://api.pinata.cloud';
  private pinataGateway = 'https://gateway.pinata.cloud/ipfs';
  private rpcEndpoint: string;
  private network: 'mainnet' | 'testnet';

  constructor(
    pinataConfig: PinataConfig,
    rpcEndpoint: string = 'https://rpc.cosmos.network',
    network: 'mainnet' | 'testnet' = 'mainnet'
  ) {
    this.pinataConfig = pinataConfig;
    this.rpcEndpoint = rpcEndpoint;
    this.network = network;
  }

  /**
   * Upload file to Pinata IPFS
   */
  private async uploadFileToPinata(
    fileData: Buffer,
    options: FileUploadOptions = {}
  ): Promise<{ cid: string; url: string }> {
    const formData = new FormData();
    formData.append('file', fileData, options.fileName || 'file');

    if (options.pinataMetadata) {
      formData.append('pinataMetadata', JSON.stringify(options.pinataMetadata));
    }

    if (options.pinataOptions) {
      formData.append('pinataOptions', JSON.stringify(options.pinataOptions));
    }

    const headers = this.pinataConfig.jwt
      ? { Authorization: `Bearer ${this.pinataConfig.jwt}` }
      : {
          pinata_api_key: this.pinataConfig.apiKey,
          pinata_secret_api_key: this.pinataConfig.apiSecret,
        };

    try {
      const response = await axios.post(
        `${this.pinataBaseUrl}/pinning/pinFileToIPFS`,
        formData,
        {
          headers: {
            ...headers,
            ...formData.getHeaders(),
          },
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        }
      );

      const cid = response.data.IpfsHash;
      return {
        cid,
        url: `${this.pinataGateway}/${cid}`,
      };
    } catch (error: any) {
      throw new Error(`Pinata upload failed: ${error.message}`);
    }
  }

  /**
   * Upload JSON metadata to Pinata IPFS
   */
  private async uploadMetadataToPinata(
    metadata: NFTMetadata,
    options: FileUploadOptions = {}
  ): Promise<{ cid: string; url: string }> {
    const headers = this.pinataConfig.jwt
      ? { Authorization: `Bearer ${this.pinataConfig.jwt}` }
      : {
          pinata_api_key: this.pinataConfig.apiKey,
          pinata_secret_api_key: this.pinataConfig.apiSecret,
        };

    const body: any = {
      pinataContent: metadata,
    };

    if (options.pinataMetadata) {
      body.pinataMetadata = options.pinataMetadata;
    }

    if (options.pinataOptions) {
      body.pinataOptions = options.pinataOptions;
    }

    try {
      const response = await axios.post(
        `${this.pinataBaseUrl}/pinning/pinJSONToIPFS`,
        body,
        { headers }
      );

      const cid = response.data.IpfsHash;
      return {
        cid,
        url: `${this.pinataGateway}/${cid}`,
      };
    } catch (error: any) {
      throw new Error(`Pinata metadata upload failed: ${error.message}`);
    }
  }

  /**
   * Mint NFT on Cosmos CW721 contract
   */
  private async mintCosmosNFT(
    mnemonic: string,
    contractAddress: string,
    metadataUrl: string,
    metadata: NFTMetadata,
    tokenId: string
  ): Promise<{ txHash: string; tokenId: string }> {
    // Create wallet from mnemonic
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
      prefix: 'cosmos',
    });
    
    const [firstAccount] = await wallet.getAccounts();
    
    // Create signing client
    const client = await SigningCosmWasmClient.connectWithSigner(
      this.rpcEndpoint,
      wallet,
      {
        gasPrice: GasPrice.fromString('0.025uatom'),
      }
    );

    // Mint message for CW721
    const mintMsg = {
      mint: {
        token_id: tokenId,
        owner: firstAccount.address,
        token_uri: metadataUrl,
        extension: {
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
          attributes: metadata.attributes,
        },
      },
    };

    // Execute contract
    const result = await client.execute(
      firstAccount.address,
      contractAddress,
      mintMsg,
      'auto',
      'Minting NFT'
    );

    return {
      txHash: result.transactionHash,
      tokenId,
    };
  }

  /**
   * Mint NFT: Upload file to Pinata, create metadata, deploy to Cosmos
   */
  async mintNFT(
    mnemonic: string,
    contractAddress: string,
    fileData: Buffer,
    metadata: Omit<NFTMetadata, 'image'>,
    tokenId: string,
    options: FileUploadOptions = {}
  ): Promise<MintResult> {
    console.log('Starting NFT minting process...');

    // 1. Upload file to Pinata IPFS
    console.log('Uploading file to Pinata IPFS...');
    const fileUpload = await this.uploadFileToPinata(fileData, options);
    console.log(`File uploaded: ${fileUpload.cid}`);

    // 2. Create complete metadata with IPFS CID
    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: `ipfs://${fileUpload.cid}`,
    };

    // 3. Upload metadata to Pinata IPFS
    console.log('Uploading metadata to Pinata IPFS...');
    const metadataUpload = await this.uploadMetadataToPinata(completeMetadata, {
      pinataMetadata: {
        name: `${metadata.name} - Metadata`,
        keyvalues: {
          type: 'nft-metadata',
          standard: 'CW721',
          nftName: metadata.name,
        },
      },
    });
    console.log(`Metadata uploaded: ${metadataUpload.cid}`);

    // 4. Mint Cosmos NFT
    console.log('Minting Cosmos NFT...');
    const cosmosNFT = await this.mintCosmosNFT(
      mnemonic,
      contractAddress,
      `ipfs://${metadataUpload.cid}`,
      completeMetadata,
      tokenId
    );
    console.log(`Cosmos NFT minted: Token ID ${cosmosNFT.tokenId}`);

    const explorerBase = this.network === 'mainnet' 
      ? 'https://www.mintscan.io/cosmos/txs' 
      : 'https://testnet.mintscan.io/cosmoshub-testnet/txs';

    return {
      ipfsCid: fileUpload.cid,
      ipfsUrl: fileUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
      tokenId: cosmosNFT.tokenId,
      contractAddress,
      txHash: cosmosNFT.txHash,
      mintscanUrl: `${explorerBase}/${cosmosNFT.txHash}`,
    };
  }

  /**
   * Mint video/audio NFT with animation_url
   */
  async mintMediaNFT(
    mnemonic: string,
    contractAddress: string,
    mediaData: Buffer,
    thumbnailData: Buffer,
    metadata: Omit<NFTMetadata, 'image' | 'animation_url'>,
    tokenId: string,
    options: {
      mediaOptions?: FileUploadOptions;
      thumbnailOptions?: FileUploadOptions;
    } = {}
  ): Promise<MintResult> {
    console.log('Starting media NFT minting process...');

    // 1. Upload media file
    const mediaUpload = await this.uploadFileToPinata(mediaData, options.mediaOptions);
    console.log(`Media uploaded: ${mediaUpload.cid}`);

    // 2. Upload thumbnail
    const thumbnailUpload = await this.uploadFileToPinata(
      thumbnailData,
      options.thumbnailOptions
    );
    console.log(`Thumbnail uploaded: ${thumbnailUpload.cid}`);

    // 3. Create complete metadata
    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: `ipfs://${thumbnailUpload.cid}`,
      animation_url: `ipfs://${mediaUpload.cid}`,
    };

    // 4. Upload metadata
    const metadataUpload = await this.uploadMetadataToPinata(completeMetadata, {
      pinataMetadata: {
        name: `${metadata.name} - Metadata`,
        keyvalues: {
          type: 'media-nft-metadata',
          standard: 'CW721',
          nftName: metadata.name,
        },
      },
    });
    console.log(`Metadata uploaded: ${metadataUpload.cid}`);

    // 5. Mint Cosmos NFT
    const cosmosNFT = await this.mintCosmosNFT(
      mnemonic,
      contractAddress,
      `ipfs://${metadataUpload.cid}`,
      completeMetadata,
      tokenId
    );
    console.log(`Cosmos NFT minted: Token ID ${cosmosNFT.tokenId}`);

    const explorerBase = this.network === 'mainnet' 
      ? 'https://www.mintscan.io/cosmos/txs' 
      : 'https://testnet.mintscan.io/cosmoshub-testnet/txs';

    return {
      ipfsCid: mediaUpload.cid,
      ipfsUrl: mediaUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
      tokenId: cosmosNFT.tokenId,
      contractAddress,
      txHash: cosmosNFT.txHash,
      mintscanUrl: `${explorerBase}/${cosmosNFT.txHash}`,
    };
  }

  /**
   * Check wallet balance
   */
  async checkBalance(mnemonicOrAddress: string): Promise<{
    address: string;
    balanceAtom: string;
  }> {
    let address: string;
    
    // Check if it's a mnemonic or address
    if (mnemonicOrAddress.split(' ').length >= 12) {
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonicOrAddress, {
        prefix: 'cosmos',
      });
      const [firstAccount] = await wallet.getAccounts();
      address = firstAccount.address;
    } else {
      address = mnemonicOrAddress;
    }

    const client = await SigningCosmWasmClient.connect(this.rpcEndpoint);
    const balance = await client.getBalance(address, 'uatom');
    const balanceAtom = (parseInt(balance.amount) / 1000000).toString();

    return {
      address,
      balanceAtom,
    };
  }

  /**
   * Test Pinata connection
   */
  async testPinataConnection(): Promise<boolean> {
    const headers = this.pinataConfig.jwt
      ? { Authorization: `Bearer ${this.pinataConfig.jwt}` }
      : {
          pinata_api_key: this.pinataConfig.apiKey,
          pinata_secret_api_key: this.pinataConfig.apiSecret,
        };

    try {
      await axios.get(`${this.pinataBaseUrl}/data/testAuthentication`, { headers });
      return true;
    } catch (error) {
      return false;
    }
  }
}

/**
 * USAGE EXAMPLES:
 * 
 * // Basic image NFT
 * import { CosmosPinataNFTMinter } from './ATOM.Cosmos.pinata.nft';
 * import * as fs from 'fs';
 * 
 * const minter = new CosmosPinataNFTMinter({
 *   apiKey: process.env.PINATA_API_KEY!,
 *   apiSecret: process.env.PINATA_API_SECRET!,
 * });
 * 
 * const mnemonic = 'your 12 or 24-word cosmos mnemonic here...';
 * const contractAddress = 'cosmos1...'; // CW721 contract address
 * const imageData = fs.readFileSync('art.png');
 * 
 * const result = await minter.mintNFT(
 *   mnemonic,
 *   contractAddress,
 *   imageData,
 *   {
 *     name: "Cosmic Art #001",
 *     description: "A unique digital artwork on Cosmos",
 *     attributes: [
 *       { trait_type: "Rarity", value: "Legendary" },
 *       { trait_type: "Artist", value: "CryptoArtist" }
 *     ]
 *   },
 *   'token-001',
 *   {
 *     fileName: 'art.png',
 *     pinataMetadata: {
 *       name: 'Cosmic Art #001',
 *       keyvalues: {
 *         collection: 'cosmic-art',
 *         edition: '1'
 *       }
 *     }
 *   }
 * );
 * 
 * console.log('NFT Minted!');
 * console.log('IPFS Image:', result.ipfsUrl);
 * console.log('IPFS Metadata:', result.metadataUrl);
 * console.log('Token ID:', result.tokenId);
 * console.log('Mintscan:', result.mintscanUrl);
 */

export default CosmosPinataNFTMinter;
