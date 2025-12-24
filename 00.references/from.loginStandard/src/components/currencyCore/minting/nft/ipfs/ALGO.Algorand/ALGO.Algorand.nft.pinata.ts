// Algorand NFT Minting via Pinata IPFS
// Uploads files to Pinata IPFS, then creates Algorand ASA NFT referencing the IPFS CID

/**
 * OVERVIEW:
 * 
 * This module enables NFT minting on Algorand with asset storage on Pinata IPFS.
 * - Upload media files to Pinata IPFS (images, videos, audio, documents)
 * - Create Algorand ASA NFT metadata referencing IPFS CID
 * - Deploy NFT to Algorand blockchain using ARC-3/ARC-69 standard
 * 
 * BENEFITS:
 * - Fast IPFS upload via Pinata
 * - Permanent metadata on Algorand
 * - ARC-3/ARC-69 compatible
 * - Supports all file types
 * 
 * COSTS:
 * - Pinata: Free tier available (1GB storage, unlimited gateways)
 * - Algorand: ~0.001 ALGO for ASA creation + 0.1 ALGO reserve
 */

import algosdk from 'algosdk';
import FormData from 'form-data';
import axios from 'axios';

export interface PinataConfig {
  apiKey: string; // Pinata API Key
  apiSecret: string; // Pinata API Secret
  jwt?: string; // Optional JWT token (preferred method)
}

export interface NFTMetadata {
  name: string;
  description: string;
  image?: string; // IPFS CID or URL
  image_integrity?: string; // SHA-256 hash of image
  image_mimetype?: string; // MIME type
  animation_url?: string; // For videos/audio
  animation_url_integrity?: string;
  animation_url_mimetype?: string;
  external_url?: string;
  properties?: Record<string, any>;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

export interface MintResult {
  ipfsCid: string; // IPFS CID of uploaded file
  ipfsUrl: string; // Gateway URL to file
  metadataCid: string; // IPFS CID of metadata JSON
  metadataUrl: string; // Gateway URL to metadata
  assetId: number; // Algorand ASA ID
  txId: string; // Transaction ID
  algoExplorerUrl: string; // AlgoExplorer URL
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

export class AlgorandPinataNFTMinter {
  private algodClient: algosdk.Algodv2;
  private pinataConfig: PinataConfig;
  private pinataBaseUrl = 'https://api.pinata.cloud';
  private pinataGateway = 'https://gateway.pinata.cloud/ipfs';
  private network: 'mainnet' | 'testnet';

  constructor(
    pinataConfig: PinataConfig,
    algodServer: string = 'https://mainnet-api.algonode.cloud',
    algodPort: number = 443,
    algodToken: string = '',
    network: 'mainnet' | 'testnet' = 'mainnet'
  ) {
    this.pinataConfig = pinataConfig;
    this.network = network;
    this.algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
  }

  /**
   * Upload file to Pinata IPFS
   */
  private async uploadFileToPinata(
    fileData: Buffer,
    options: FileUploadOptions = {}
  ): Promise<{ cid: string; url: string; hash?: string }> {
    const formData = new FormData();
    formData.append('file', fileData, options.fileName || 'file');

    // Add optional metadata
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
      
      // Calculate SHA-256 hash for integrity
      const crypto = await import('crypto');
      const hash = crypto.createHash('sha256').update(fileData).digest('base64');

      return {
        cid,
        url: `${this.pinataGateway}/${cid}`,
        hash,
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
   * Get MIME type from filename
   */
  private getMimeType(fileName: string): string {
    const ext = fileName.split('.').pop()?.toLowerCase();
    const mimeTypes: Record<string, string> = {
      'png': 'image/png',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'gif': 'image/gif',
      'svg': 'image/svg+xml',
      'webp': 'image/webp',
      'mp4': 'video/mp4',
      'webm': 'video/webm',
      'mp3': 'audio/mpeg',
      'wav': 'audio/wav',
      'pdf': 'application/pdf',
      'json': 'application/json',
    };
    return mimeTypes[ext || ''] || 'application/octet-stream';
  }

  /**
   * Create Algorand ASA NFT transaction referencing IPFS metadata
   */
  private async createAlgorandNFT(
    privateKeyMnemonic: string,
    metadataUrl: string,
    metadata: NFTMetadata
  ): Promise<{ assetId: number; txId: string }> {
    const account = algosdk.mnemonicToSecretKey(privateKeyMnemonic);
    
    // Get suggested params
    const params = await this.algodClient.getTransactionParams().do();

    // Create ASA (ARC-3 compliant)
    const assetCreateTxn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      from: account.addr,
      total: 1, // NFT has total supply of 1
      decimals: 0, // NFTs have 0 decimals
      assetName: metadata.name.substring(0, 32), // Max 32 bytes
      unitName: 'NFT', // Max 8 bytes
      assetURL: metadataUrl.substring(0, 96), // Max 96 bytes (ipfs://CID or https://...)
      assetMetadataHash: undefined, // Optional: hash of metadata
      defaultFrozen: false,
      freeze: account.addr, // Can freeze transfers
      manager: account.addr, // Can reconfigure or destroy
      clawback: account.addr, // Can revoke assets
      reserve: account.addr, // Holds reserve assets
      suggestedParams: params,
    });

    // Sign transaction
    const signedTxn = assetCreateTxn.signTxn(account.sk);

    // Submit transaction
    const { txId } = await this.algodClient.sendRawTransaction(signedTxn).do();

    // Wait for confirmation
    const confirmedTxn = await algosdk.waitForConfirmation(this.algodClient, txId, 4);
    
    // Get asset ID
    const assetId = confirmedTxn['asset-index'];

    return {
      assetId,
      txId,
    };
  }

  /**
   * Mint NFT: Upload file to Pinata, create metadata, deploy to Algorand
   */
  async mintNFT(
    privateKeyMnemonic: string,
    fileData: Buffer,
    metadata: Omit<NFTMetadata, 'image' | 'image_integrity' | 'image_mimetype'>,
    options: FileUploadOptions = {}
  ): Promise<MintResult> {
    console.log('Starting NFT minting process...');

    // 1. Upload file to Pinata IPFS
    console.log('Uploading file to Pinata IPFS...');
    const fileUpload = await this.uploadFileToPinata(fileData, options);
    console.log(`File uploaded: ${fileUpload.cid}`);

    // 2. Create complete metadata with IPFS CID (ARC-3 format)
    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: `ipfs://${fileUpload.cid}`,
      image_integrity: `sha256-${fileUpload.hash}`,
      image_mimetype: this.getMimeType(options.fileName || ''),
    };

    // 3. Upload metadata to Pinata IPFS
    console.log('Uploading metadata to Pinata IPFS...');
    const metadataUpload = await this.uploadMetadataToPinata(completeMetadata, {
      pinataMetadata: {
        name: `${metadata.name} - Metadata`,
        keyvalues: {
          type: 'nft-metadata',
          standard: 'ARC-3',
          nftName: metadata.name,
        },
      },
    });
    console.log(`Metadata uploaded: ${metadataUpload.cid}`);

    // 4. Create Algorand ASA NFT
    console.log('Creating Algorand ASA NFT...');
    const algorandNFT = await this.createAlgorandNFT(
      privateKeyMnemonic,
      `ipfs://${metadataUpload.cid}`,
      completeMetadata
    );
    console.log(`Algorand NFT created: Asset ID ${algorandNFT.assetId}`);

    const explorerBase = this.network === 'mainnet' 
      ? 'https://algoexplorer.io/asset' 
      : 'https://testnet.algoexplorer.io/asset';

    return {
      ipfsCid: fileUpload.cid,
      ipfsUrl: fileUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
      assetId: algorandNFT.assetId,
      txId: algorandNFT.txId,
      algoExplorerUrl: `${explorerBase}/${algorandNFT.assetId}`,
    };
  }

  /**
   * Mint video/audio NFT with animation_url
   */
  async mintMediaNFT(
    privateKeyMnemonic: string,
    mediaData: Buffer,
    thumbnailData: Buffer,
    metadata: Omit<NFTMetadata, 'image' | 'animation_url' | 'image_integrity' | 'image_mimetype' | 'animation_url_integrity' | 'animation_url_mimetype'>,
    options: {
      mediaOptions?: FileUploadOptions;
      thumbnailOptions?: FileUploadOptions;
    } = {}
  ): Promise<MintResult> {
    console.log('Starting media NFT minting process...');

    // 1. Upload media file to Pinata IPFS
    console.log('Uploading media file to Pinata IPFS...');
    const mediaUpload = await this.uploadFileToPinata(mediaData, options.mediaOptions);
    console.log(`Media uploaded: ${mediaUpload.cid}`);

    // 2. Upload thumbnail to Pinata IPFS
    console.log('Uploading thumbnail to Pinata IPFS...');
    const thumbnailUpload = await this.uploadFileToPinata(
      thumbnailData,
      options.thumbnailOptions
    );
    console.log(`Thumbnail uploaded: ${thumbnailUpload.cid}`);

    // 3. Create complete metadata with both CIDs (ARC-3 format)
    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: `ipfs://${thumbnailUpload.cid}`,
      image_integrity: `sha256-${thumbnailUpload.hash}`,
      image_mimetype: this.getMimeType(options.thumbnailOptions?.fileName || ''),
      animation_url: `ipfs://${mediaUpload.cid}`,
      animation_url_integrity: `sha256-${mediaUpload.hash}`,
      animation_url_mimetype: this.getMimeType(options.mediaOptions?.fileName || ''),
    };

    // 4. Upload metadata to Pinata IPFS
    console.log('Uploading metadata to Pinata IPFS...');
    const metadataUpload = await this.uploadMetadataToPinata(completeMetadata, {
      pinataMetadata: {
        name: `${metadata.name} - Metadata`,
        keyvalues: {
          type: 'media-nft-metadata',
          standard: 'ARC-3',
          nftName: metadata.name,
        },
      },
    });
    console.log(`Metadata uploaded: ${metadataUpload.cid}`);

    // 5. Create Algorand ASA NFT
    console.log('Creating Algorand ASA NFT...');
    const algorandNFT = await this.createAlgorandNFT(
      privateKeyMnemonic,
      `ipfs://${metadataUpload.cid}`,
      completeMetadata
    );
    console.log(`Algorand NFT created: Asset ID ${algorandNFT.assetId}`);

    const explorerBase = this.network === 'mainnet' 
      ? 'https://algoexplorer.io/asset' 
      : 'https://testnet.algoexplorer.io/asset';

    return {
      ipfsCid: mediaUpload.cid,
      ipfsUrl: mediaUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
      assetId: algorandNFT.assetId,
      txId: algorandNFT.txId,
      algoExplorerUrl: `${explorerBase}/${algorandNFT.assetId}`,
    };
  }

  /**
   * Check wallet balance
   */
  async checkBalance(mnemonicOrAddress: string): Promise<{
    address: string;
    balanceAlgo: number;
    balanceMicroAlgo: number;
  }> {
    let address: string;
    
    // Check if it's a mnemonic or address
    if (mnemonicOrAddress.split(' ').length === 25) {
      const account = algosdk.mnemonicToSecretKey(mnemonicOrAddress);
      address = account.addr;
    } else {
      address = mnemonicOrAddress;
    }

    const accountInfo = await this.algodClient.accountInformation(address).do();
    const balanceMicroAlgo = accountInfo.amount;
    const balanceAlgo = balanceMicroAlgo / 1000000;

    return {
      address,
      balanceAlgo,
      balanceMicroAlgo,
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
 * import { AlgorandPinataNFTMinter } from './ALGO.Algorand.pinata.nft';
 * import * as fs from 'fs';
 * 
 * const minter = new AlgorandPinataNFTMinter({
 *   apiKey: process.env.PINATA_API_KEY!,
 *   apiSecret: process.env.PINATA_API_SECRET!,
 * });
 * 
 * const mnemonic = 'your 25-word algorand mnemonic here...';
 * const imageData = fs.readFileSync('art.png');
 * 
 * const result = await minter.mintNFT(
 *   mnemonic,
 *   imageData,
 *   {
 *     name: "Cyber Punk #001",
 *     description: "A unique digital artwork on Algorand",
 *     properties: {
 *       category: "art"
 *     },
 *     attributes: [
 *       { trait_type: "Rarity", value: "Legendary" },
 *       { trait_type: "Artist", value: "CryptoArtist" }
 *     ]
 *   },
 *   {
 *     fileName: 'art.png',
 *     pinataMetadata: {
 *       name: 'Cyber Punk #001',
 *       keyvalues: {
 *         collection: 'cyber-punks',
 *         edition: '1'
 *       }
 *     }
 *   }
 * );
 * 
 * console.log('NFT Minted!');
 * console.log('IPFS Image:', result.ipfsUrl);
 * console.log('IPFS Metadata:', result.metadataUrl);
 * console.log('Algorand Asset ID:', result.assetId);
 * console.log('AlgoExplorer:', result.algoExplorerUrl);
 * 
 * // Video NFT with thumbnail
 * const videoData = fs.readFileSync('video.mp4');
 * const thumbnailData = fs.readFileSync('thumbnail.jpg');
 * 
 * const mediaResult = await minter.mintMediaNFT(
 *   mnemonic,
 *   videoData,
 *   thumbnailData,
 *   {
 *     name: "Epic Animation #001",
 *     description: "An epic 3D animation on Algorand",
 *     properties: {
 *       category: "video"
 *     },
 *     attributes: [
 *       { trait_type: "Duration", value: "30s" },
 *       { trait_type: "Resolution", value: "4K" }
 *     ]
 *   },
 *   {
 *     mediaOptions: { fileName: 'video.mp4' },
 *     thumbnailOptions: { fileName: 'thumbnail.jpg' }
 *   }
 * );
 * 
 * // Check connection
 * const isConnected = await minter.testPinataConnection();
 * console.log('Pinata connected:', isConnected);
 * 
 * // Check balance
 * const balance = await minter.checkBalance(mnemonic);
 * console.log(`Balance: ${balance.balanceAlgo} ALGO`);
 */

export default AlgorandPinataNFTMinter;
