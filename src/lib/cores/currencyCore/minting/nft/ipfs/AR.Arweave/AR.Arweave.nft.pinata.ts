// Arweave NFT Minting via Pinata IPFS
// Uploads files to Pinata IPFS, then creates Arweave NFT metadata referencing the IPFS CID

/**
 * OVERVIEW:
 * 
 * This module enables NFT minting on Arweave with asset storage on Pinata IPFS.
 * - Upload media files to Pinata IPFS (images, videos, audio, documents)
 * - Create Arweave NFT metadata referencing IPFS CID
 * - Deploy NFT to Arweave blockchain with permanent metadata
 * 
 * BENEFITS:
 * - Fast IPFS upload via Pinata
 * - Permanent metadata on Arweave
 * - Widely compatible with NFT marketplaces
 * - Supports all file types
 * 
 * COSTS:
 * - Pinata: Free tier available (1GB storage, unlimited gateways)
 * - Arweave: ~0.005-0.01 AR for metadata transaction
 */

// @ts-expect-error - arweave is a runtime dependency
import Arweave from 'arweave';
// @ts-expect-error - arweave types may not be available
import { JWKInterface } from 'arweave/node/lib/wallet';
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
  animation_url?: string; // For videos/audio
  external_url?: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
  properties?: Record<string, any>;
}

export interface MintResult {
  ipfsCid: string; // IPFS CID of uploaded file
  ipfsUrl: string; // Gateway URL to file
  metadataCid: string; // IPFS CID of metadata JSON
  metadataUrl: string; // Gateway URL to metadata
  arweaveTxId: string; // Arweave transaction ID
  arweaveUrl: string; // Arweave URL
  viewBlockUrl: string; // ViewBlock explorer URL
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

export class ArweavePinataNFTMinter {
  private arweave: Arweave;
  private pinataConfig: PinataConfig;
  private pinataBaseUrl = 'https://api.pinata.cloud';
  private pinataGateway = 'https://gateway.pinata.cloud/ipfs';

  constructor(
    pinataConfig: PinataConfig,
    arweaveHost: string = 'arweave.net',
    arweavePort: number = 443,
    arweaveProtocol: string = 'https'
  ) {
    this.pinataConfig = pinataConfig;
    this.arweave = Arweave.init({
      host: arweaveHost,
      port: arweavePort,
      protocol: arweaveProtocol,
    });
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
   * Create Arweave NFT transaction referencing IPFS metadata
   */
  private async createArweaveNFT(
    privateKey: JWKInterface,
    metadataCid: string,
    metadata: NFTMetadata
  ): Promise<{ txId: string; url: string }> {
    // Create Arweave transaction with NFT metadata
    const nftData = {
      ...metadata,
      ipfs: {
        metadataCid,
        gateway: `${this.pinataGateway}/${metadataCid}`,
      },
      mintedAt: new Date().toISOString(),
      standard: 'atomic-nft-v1',
    };

    const transaction = await this.arweave.createTransaction(
      {
        data: JSON.stringify(nftData),
      },
      privateKey
    );

    // Add Atomic NFT tags
    transaction.addTag('Content-Type', 'application/json');
    transaction.addTag('App-Name', 'Atomic-NFT');
    transaction.addTag('Type', 'nft-asset');
    transaction.addTag('Title', metadata.name);
    transaction.addTag('Description', metadata.description);
    transaction.addTag('IPFS-CID', metadataCid);

    if (metadata.image) {
      transaction.addTag('Image-CID', metadata.image);
    }

    await this.arweave.transactions.sign(transaction, privateKey);
    await this.arweave.transactions.post(transaction);

    return {
      txId: transaction.id,
      url: `https://arweave.net/${transaction.id}`,
    };
  }

  /**
   * Mint NFT: Upload file to Pinata, create metadata, deploy to Arweave
   */
  async mintNFT(
    privateKey: JWKInterface,
    fileData: Buffer,
    metadata: Omit<NFTMetadata, 'image' | 'animation_url'>,
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
      image: fileUpload.cid,
    };

    // 3. Upload metadata to Pinata IPFS
    console.log('Uploading metadata to Pinata IPFS...');
    const metadataUpload = await this.uploadMetadataToPinata(completeMetadata, {
      pinataMetadata: {
        name: `${metadata.name} - Metadata`,
        keyvalues: {
          type: 'nft-metadata',
          nftName: metadata.name,
        },
      },
    });
    console.log(`Metadata uploaded: ${metadataUpload.cid}`);

    // 4. Create Arweave NFT transaction
    console.log('Creating Arweave NFT transaction...');
    const arweaveNFT = await this.createArweaveNFT(
      privateKey,
      metadataUpload.cid,
      completeMetadata
    );
    console.log(`Arweave NFT created: ${arweaveNFT.txId}`);

    return {
      ipfsCid: fileUpload.cid,
      ipfsUrl: fileUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
      arweaveTxId: arweaveNFT.txId,
      arweaveUrl: arweaveNFT.url,
      viewBlockUrl: `https://viewblock.io/arweave/tx/${arweaveNFT.txId}`,
    };
  }

  /**
   * Mint video/audio NFT with animation_url
   */
  async mintMediaNFT(
    privateKey: JWKInterface,
    mediaData: Buffer,
    thumbnailData: Buffer,
    metadata: Omit<NFTMetadata, 'image' | 'animation_url'>,
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

    // 3. Create complete metadata with both CIDs
    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: thumbnailUpload.cid,
      animation_url: mediaUpload.cid,
    };

    // 4. Upload metadata to Pinata IPFS
    console.log('Uploading metadata to Pinata IPFS...');
    const metadataUpload = await this.uploadMetadataToPinata(completeMetadata, {
      pinataMetadata: {
        name: `${metadata.name} - Metadata`,
        keyvalues: {
          type: 'media-nft-metadata',
          nftName: metadata.name,
        },
      },
    });
    console.log(`Metadata uploaded: ${metadataUpload.cid}`);

    // 5. Create Arweave NFT transaction
    console.log('Creating Arweave NFT transaction...');
    const arweaveNFT = await this.createArweaveNFT(
      privateKey,
      metadataUpload.cid,
      completeMetadata
    );
    console.log(`Arweave NFT created: ${arweaveNFT.txId}`);

    return {
      ipfsCid: mediaUpload.cid,
      ipfsUrl: mediaUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
      arweaveTxId: arweaveNFT.txId,
      arweaveUrl: arweaveNFT.url,
      viewBlockUrl: `https://viewblock.io/arweave/tx/${arweaveNFT.txId}`,
    };
  }

  /**
   * Check wallet balance
   */
  async checkBalance(privateKey: JWKInterface): Promise<{
    address: string;
    balanceAR: string;
    balanceWinston: string;
  }> {
    const address = await this.arweave.wallets.jwkToAddress(privateKey);
    const balanceWinston = await this.arweave.wallets.getBalance(address);
    const balanceAR = this.arweave.ar.winstonToAr(balanceWinston);

    return {
      address,
      balanceAR,
      balanceWinston,
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
 * import { ArweavePinataNFTMinter } from './AR.Arweave.pinata.nft';
 * import * as fs from 'fs';
 * 
 * const minter = new ArweavePinataNFTMinter({
 *   apiKey: process.env.PINATA_API_KEY!,
 *   apiSecret: process.env.PINATA_API_SECRET!,
 * });
 * 
 * const privateKey = JSON.parse(fs.readFileSync('wallet.json', 'utf-8'));
 * const imageData = fs.readFileSync('art.png');
 * 
 * const result = await minter.mintNFT(
 *   privateKey,
 *   imageData,
 *   {
 *     name: "Cyber Punk #001",
 *     description: "A unique digital artwork",
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
 * console.log('Arweave NFT:', result.arweaveUrl);
 * 
 * // Video NFT with thumbnail
 * const videoData = fs.readFileSync('video.mp4');
 * const thumbnailData = fs.readFileSync('thumbnail.jpg');
 * 
 * const mediaResult = await minter.mintMediaNFT(
 *   privateKey,
 *   videoData,
 *   thumbnailData,
 *   {
 *     name: "Epic Animation #001",
 *     description: "An epic 3D animation",
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
 * const balance = await minter.checkBalance(privateKey);
 * console.log(`Balance: ${balance.balanceAR} AR`);
 */

export default ArweavePinataNFTMinter;

