// Arweave Direct NFT Minting
// Mints NFTs directly to Arweave with permanent on-chain storage

/**
 * OVERVIEW:
 * 
 * This module mints NFTs directly to Arweave blockchain with all assets stored permanently.
 * - Upload files directly to Arweave (permanent storage)
 * - Upload metadata to Arweave (immutable)
 * - No external dependencies (no IPFS, no other chains)
 * - Pay once, store forever
 * 
 * BENEFITS:
 * - True permanence (200+ year guarantee)
 * - No recurring storage fees
 * - Immutable metadata and assets
 * - Decentralized storage
 * - Fast retrieval via gateways
 * 
 * COSTS:
 * - File upload: ~0.0001-0.01 AR per MB (one-time)
 * - Metadata: ~0.005-0.01 AR per transaction
 * - Total: ~0.01-0.02 AR per NFT (depending on file size)
 * 
 * ARWEAVE NFT STANDARD:
 * Uses Atomic NFT standard with tags for marketplace compatibility.
 */

// @ts-expect-error - arweave is a runtime dependency
import Arweave from 'arweave';
// @ts-expect-error - arweave types may not be available
import { JWKInterface } from 'arweave/node/lib/wallet';

export interface ArweaveNFTConfig {
  host?: string; // Arweave gateway host
  port?: number; // Gateway port
  protocol?: string; // http or https
  timeout?: number; // Request timeout
  logging?: boolean; // Enable logging
}

export interface NFTMetadata {
  name: string;
  description: string;
  image?: string; // Arweave TX ID of image
  animation_url?: string; // Arweave TX ID of animation/video
  external_url?: string; // External website
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
  properties?: Record<string, unknown>;
}

export interface FileUploadOptions {
  contentType?: string; // MIME type
  tags?: Array<{ name: string; value: string }>; // Custom tags
}

export interface MintResult {
  fileTransactionId: string; // Arweave TX ID of file
  fileUrl: string; // Gateway URL to file
  metadataTransactionId: string; // Arweave TX ID of metadata
  metadataUrl: string; // Gateway URL to metadata
  viewBlockUrl: string; // ViewBlock explorer URL
  totalCost: {
    fileAR: string;
    metadataAR: string;
    totalAR: string;
    fileWinston: string;
    metadataWinston: string;
    totalWinston: string;
  };
}

export class ArweaveDirectNFTMinter {
  private arweave: Arweave;

  constructor(config: ArweaveNFTConfig = {}) {
    this.arweave = Arweave.init({
      host: config.host || 'arweave.net',
      port: config.port || 443,
      protocol: config.protocol || 'https',
      timeout: config.timeout || 60000,
      logging: config.logging || false,
    });
  }

  /**
   * Get MIME type from filename
   */
  private getMimeType(fileName: string): string {
    const ext = fileName.split('.').pop()?.toLowerCase();
    const mimeTypes: Record<string, string> = {
      // Images
      'png': 'image/png',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'gif': 'image/gif',
      'svg': 'image/svg+xml',
      'webp': 'image/webp',
      'avif': 'image/avif',
      'bmp': 'image/bmp',
      'ico': 'image/x-icon',
      
      // Videos
      'mp4': 'video/mp4',
      'webm': 'video/webm',
      'mov': 'video/quicktime',
      'avi': 'video/x-msvideo',
      'mkv': 'video/x-matroska',
      'flv': 'video/x-flv',
      
      // Audio
      'mp3': 'audio/mpeg',
      'wav': 'audio/wav',
      'ogg': 'audio/ogg',
      'flac': 'audio/flac',
      'm4a': 'audio/mp4',
      'aac': 'audio/aac',
      
      // Documents
      'pdf': 'application/pdf',
      'doc': 'application/msword',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'txt': 'text/plain',
      'md': 'text/markdown',
      'html': 'text/html',
      'css': 'text/css',
      'js': 'application/javascript',
      'json': 'application/json',
      'xml': 'application/xml',
      
      // 3D Models
      'glb': 'model/gltf-binary',
      'gltf': 'model/gltf+json',
      'obj': 'model/obj',
      'fbx': 'application/octet-stream',
      'stl': 'model/stl',
      
      // Archives
      'zip': 'application/zip',
      'rar': 'application/x-rar-compressed',
      'tar': 'application/x-tar',
      'gz': 'application/gzip',
    };
    
    return mimeTypes[ext || ''] || 'application/octet-stream';
  }

  /**
   * Upload file to Arweave
   */
  private async uploadFileToArweave(
    fileData: Buffer,
    fileName: string,
    privateKey: JWKInterface,
    options: FileUploadOptions = {}
  ): Promise<{ txId: string; url: string; cost: { ar: string; winston: string } }> {
    try {
      // Create transaction
      const transaction = await this.arweave.createTransaction(
        { data: fileData },
        privateKey
      );

      // Add Content-Type tag
      const contentType = options.contentType || this.getMimeType(fileName);
      transaction.addTag('Content-Type', contentType);

      // Add standard NFT tags
      transaction.addTag('App-Name', 'Atomic-NFT');
      transaction.addTag('Type', 'nft-file');
      transaction.addTag('File-Name', fileName);

      // Add custom tags
      if (options.tags) {
        for (const tag of options.tags) {
          transaction.addTag(tag.name, tag.value);
        }
      }

      // Get cost before signing
      const winston = transaction.reward;
      const ar = this.arweave.ar.winstonToAr(winston);

      // Sign transaction
      await this.arweave.transactions.sign(transaction, privateKey);

      // Post transaction
      const response = await this.arweave.transactions.post(transaction);

      if (response.status >= 200 && response.status < 300) {
        return {
          txId: transaction.id,
          url: `https://arweave.net/${transaction.id}`,
          cost: { ar, winston },
        };
      } else {
        throw new Error(
          `Failed to post Arweave transaction. Status: ${response.status}, Data: ${JSON.stringify(response.data)}`
        );
      }
    } catch (error: any) {
      throw new Error(`Arweave file upload failed: ${error.message}`);
    }
  }

  /**
   * Upload JSON metadata to Arweave
   */
  private async uploadMetadataToArweave(
    metadata: NFTMetadata,
    privateKey: JWKInterface,
    options: FileUploadOptions = {}
  ): Promise<{ txId: string; url: string; cost: { ar: string; winston: string } }> {
    try {
      const jsonString = JSON.stringify(metadata, null, 2);
      const jsonBuffer = Buffer.from(jsonString);

      // Create transaction
      const transaction = await this.arweave.createTransaction(
        { data: jsonBuffer },
        privateKey
      );

      // Add metadata tags
      transaction.addTag('Content-Type', 'application/json');
      transaction.addTag('App-Name', 'Atomic-NFT');
      transaction.addTag('Type', 'nft-metadata');
      transaction.addTag('Title', metadata.name);
      transaction.addTag('Description', metadata.description);

      // Add image reference
      if (metadata.image) {
        transaction.addTag('Image-TX', metadata.image);
      }

      // Add animation reference
      if (metadata.animation_url) {
        transaction.addTag('Animation-TX', metadata.animation_url);
      }

      // Add custom tags
      if (options.tags) {
        for (const tag of options.tags) {
          transaction.addTag(tag.name, tag.value);
        }
      }

      // Get cost before signing
      const winston = transaction.reward;
      const ar = this.arweave.ar.winstonToAr(winston);

      // Sign transaction
      await this.arweave.transactions.sign(transaction, privateKey);

      // Post transaction
      const response = await this.arweave.transactions.post(transaction);

      if (response.status >= 200 && response.status < 300) {
        return {
          txId: transaction.id,
          url: `https://arweave.net/${transaction.id}`,
          cost: { ar, winston },
        };
      } else {
        throw new Error(
          `Failed to post Arweave metadata transaction. Status: ${response.status}`
        );
      }
    } catch (error: any) {
      throw new Error(`Arweave metadata upload failed: ${error.message}`);
    }
  }

  /**
   * Mint NFT with file and metadata on Arweave
   */
  async mintNFT(
    privateKey: JWKInterface,
    fileData: Buffer,
    fileName: string,
    metadata: Omit<NFTMetadata, 'image'>,
    options: FileUploadOptions = {}
  ): Promise<MintResult> {
    console.log('Starting Arweave direct NFT minting...');

    // 1. Upload file to Arweave
    console.log('Uploading file to Arweave...');
    const fileUpload = await this.uploadFileToArweave(
      fileData,
      fileName,
      privateKey,
      options
    );
    console.log(`File uploaded: ${fileUpload.txId}`);

    // 2. Create complete metadata with Arweave TX ID
    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: fileUpload.txId, // Reference Arweave TX ID
    };

    // 3. Upload metadata to Arweave
    console.log('Uploading metadata to Arweave...');
    const metadataUpload = await this.uploadMetadataToArweave(
      completeMetadata,
      privateKey,
      {
        tags: [
          { name: 'File-TX', value: fileUpload.txId },
          ...(options.tags || []),
        ],
      }
    );
    console.log(`Metadata uploaded: ${metadataUpload.txId}`);

    // Calculate total cost
    const fileWinston = fileUpload.cost.winston;
    const metadataWinston = metadataUpload.cost.winston;
    const totalWinston = (BigInt(fileWinston) + BigInt(metadataWinston)).toString();
    const totalAR = this.arweave.ar.winstonToAr(totalWinston);

    console.log(`Total cost: ${totalAR} AR`);

    return {
      fileTransactionId: fileUpload.txId,
      fileUrl: fileUpload.url,
      metadataTransactionId: metadataUpload.txId,
      metadataUrl: metadataUpload.url,
      viewBlockUrl: `https://viewblock.io/arweave/tx/${metadataUpload.txId}`,
      totalCost: {
        fileAR: fileUpload.cost.ar,
        metadataAR: metadataUpload.cost.ar,
        totalAR,
        fileWinston,
        metadataWinston,
        totalWinston,
      },
    };
  }

  /**
   * Mint media NFT with animation and thumbnail
   */
  async mintMediaNFT(
    privateKey: JWKInterface,
    mediaData: Buffer,
    mediaFileName: string,
    thumbnailData: Buffer,
    thumbnailFileName: string,
    metadata: Omit<NFTMetadata, 'image' | 'animation_url'>,
    options: FileUploadOptions = {}
  ): Promise<MintResult> {
    console.log('Starting Arweave media NFT minting...');

    // 1. Upload media file
    console.log('Uploading media to Arweave...');
    const mediaUpload = await this.uploadFileToArweave(
      mediaData,
      mediaFileName,
      privateKey,
      options
    );
    console.log(`Media uploaded: ${mediaUpload.txId}`);

    // 2. Upload thumbnail
    console.log('Uploading thumbnail to Arweave...');
    const thumbnailUpload = await this.uploadFileToArweave(
      thumbnailData,
      thumbnailFileName,
      privateKey,
      options
    );
    console.log(`Thumbnail uploaded: ${thumbnailUpload.txId}`);

    // 3. Create complete metadata with both TX IDs
    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: thumbnailUpload.txId,
      animation_url: mediaUpload.txId,
    };

    // 4. Upload metadata
    console.log('Uploading metadata to Arweave...');
    const metadataUpload = await this.uploadMetadataToArweave(
      completeMetadata,
      privateKey,
      {
        tags: [
          { name: 'Media-TX', value: mediaUpload.txId },
          { name: 'Thumbnail-TX', value: thumbnailUpload.txId },
          ...(options.tags || []),
        ],
      }
    );
    console.log(`Metadata uploaded: ${metadataUpload.txId}`);

    // Calculate total cost
    const mediaWinston = BigInt(mediaUpload.cost.winston);
    const thumbnailWinston = BigInt(thumbnailUpload.cost.winston);
    const metadataWinston = BigInt(metadataUpload.cost.winston);
    const totalWinston = (mediaWinston + thumbnailWinston + metadataWinston).toString();
    const totalAR = this.arweave.ar.winstonToAr(totalWinston);

    // For result, use media as main file
    const fileWinston = mediaUpload.cost.winston;
    const fileAR = mediaUpload.cost.ar;

    console.log(`Total cost: ${totalAR} AR`);

    return {
      fileTransactionId: mediaUpload.txId,
      fileUrl: mediaUpload.url,
      metadataTransactionId: metadataUpload.txId,
      metadataUrl: metadataUpload.url,
      viewBlockUrl: `https://viewblock.io/arweave/tx/${metadataUpload.txId}`,
      totalCost: {
        fileAR,
        metadataAR: metadataUpload.cost.ar,
        totalAR,
        fileWinston,
        metadataWinston: metadataUpload.cost.winston,
        totalWinston,
      },
    };
  }

  /**
   * Check if transaction is confirmed
   */
  async checkTransactionStatus(txId: string): Promise<{
    confirmed: boolean;
    confirmations?: number;
    blockHeight?: number;
  }> {
    try {
      const status = await this.arweave.transactions.getStatus(txId);
      
      return {
        confirmed: status.confirmed !== null && status.confirmed.number_of_confirmations > 0,
        confirmations: status.confirmed?.number_of_confirmations,
        blockHeight: status.confirmed?.block_height,
      };
    } catch (error: any) {
      throw new Error(`Failed to get transaction status: ${error.message}`);
    }
  }

  /**
   * Estimate cost for file upload
   */
  async estimateCost(fileData: Buffer): Promise<{
    ar: string;
    winston: string;
  }> {
    try {
      // Create a dummy transaction to estimate cost
      const dummyKey = await this.arweave.wallets.generate();
      const transaction = await this.arweave.createTransaction(
        { data: fileData },
        dummyKey
      );

      const winston = transaction.reward;
      const ar = this.arweave.ar.winstonToAr(winston);

      return { ar, winston };
    } catch (error: any) {
      throw new Error(`Failed to estimate cost: ${error.message}`);
    }
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
   * Get transaction data
   */
  async getTransaction(txId: string): Promise<any> {
    try {
      return await this.arweave.transactions.get(txId);
    } catch (error: any) {
      throw new Error(`Failed to get transaction: ${error.message}`);
    }
  }

  /**
   * Get transaction tags
   */
  async getTransactionTags(txId: string): Promise<Array<{ name: string; value: string }>> {
    try {
      const tx = await this.arweave.transactions.get(txId);
      return tx.tags.map((tag: any) => ({
        name: tag.get('name', { decode: true, string: true }),
        value: tag.get('value', { decode: true, string: true }),
      }));
    } catch (error: any) {
      throw new Error(`Failed to get transaction tags: ${error.message}`);
    }
  }
}

/**
 * USAGE EXAMPLES:
 * 
 * // Basic NFT minting
 * import { ArweaveDirectNFTMinter } from './AR.Arweave.nft.direct';
 * import * as fs from 'fs';
 * 
 * const minter = new ArweaveDirectNFTMinter({
 *   host: 'arweave.net',
 *   port: 443,
 *   protocol: 'https',
 * });
 * 
 * const privateKey = JSON.parse(fs.readFileSync('wallet.json', 'utf-8'));
 * const imageData = fs.readFileSync('art.png');
 * 
 * // Check balance first
 * const balance = await minter.checkBalance(privateKey);
 * console.log(`Balance: ${balance.balanceAR} AR`);
 * 
 * // Estimate cost
 * const cost = await minter.estimateCost(imageData);
 * console.log(`Estimated cost: ${cost.ar} AR`);
 * 
 * // Mint NFT
 * const result = await minter.mintNFT(
 *   privateKey,
 *   imageData,
 *   'art.png',
 *   {
 *     name: "Permanent Art #1",
 *     description: "Stored permanently on Arweave",
 *     attributes: [
 *       { trait_type: "Rarity", value: "Legendary" },
 *       { trait_type: "Storage", value: "Permanent" }
 *     ]
 *   },
 *   {
 *     tags: [
 *       { name: 'Collection', value: 'My Collection' },
 *       { name: 'Creator', value: 'Artist Name' }
 *     ]
 *   }
 * );
 * 
 * console.log('NFT Minted!');
 * console.log('File TX:', result.fileUrl);
 * console.log('Metadata TX:', result.metadataUrl);
 * console.log('Total cost:', result.totalCost.totalAR, 'AR');
 * 
 * // Check transaction status
 * const status = await minter.checkTransactionStatus(result.fileTransactionId);
 * console.log('Confirmed:', status.confirmed);
 * console.log('Confirmations:', status.confirmations);
 * 
 * // Video NFT with thumbnail
 * const videoData = fs.readFileSync('animation.mp4');
 * const thumbnailData = fs.readFileSync('thumbnail.jpg');
 * 
 * const mediaResult = await minter.mintMediaNFT(
 *   privateKey,
 *   videoData,
 *   'animation.mp4',
 *   thumbnailData,
 *   'thumbnail.jpg',
 *   {
 *     name: "Animated Art #1",
 *     description: "Permanent animation on Arweave",
 *     attributes: [
 *       { trait_type: "Duration", value: "10s" },
 *       { trait_type: "Type", value: "Animation" }
 *     ]
 *   }
 * );
 * 
 * // Get transaction details
 * const tags = await minter.getTransactionTags(result.metadataTransactionId);
 * console.log('NFT Tags:', tags);
 */

export default ArweaveDirectNFTMinter;


