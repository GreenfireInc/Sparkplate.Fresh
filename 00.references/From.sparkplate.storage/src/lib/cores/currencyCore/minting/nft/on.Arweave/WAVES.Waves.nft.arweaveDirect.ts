// WAVES NFT Minting with Arweave Storage
// Mints WAVES NFTs with assets stored permanently on Arweave

/**
 * OVERVIEW:
 * 
 * This module mints NFTs on WAVES blockchain with assets stored permanently on Arweave.
 * - Upload files directly to Arweave (permanent storage)
 * - Upload metadata to Arweave (immutable)
 * - Create WAVES NFT (native asset with NFT properties)
 * - Link NFT metadata to Arweave URLs
 * - Best of both worlds: WAVES fast transactions + Arweave permanent storage
 * 
 * BENEFITS:
 * - WAVES: Fast, low-cost, native asset issuance, LPoS consensus
 * - Arweave: Permanent storage (200+ year guarantee)
 * - No recurring storage fees
 * - Immutable metadata and assets on Arweave
 * - Native WAVES NFT standard (asset with reissuable: false, decimals: 0)
 * 
 * COSTS:
 * - Arweave: ~0.01-0.02 AR per NFT (one-time, permanent)
 * - WAVES: ~1 WAVES per asset issuance (one-time fee)
 * - Total: ~0.01-0.02 AR + 1 WAVES per NFT
 * 
 * WAVES NFT STANDARD:
 * Uses native WAVES asset with reissuable: false and decimals: 0, with metadata pointing to Arweave.
 */

// @ts-expect-error - @waves/waves-transactions is a runtime dependency
import { issue, broadcast, setScript } from '@waves/waves-transactions';
// @ts-expect-error - @waves/waves-crypto is a runtime dependency
import { privateKey, publicKey, address, base58 } from '@waves/waves-crypto';
// @ts-expect-error - arweave is a runtime dependency
import Arweave from 'arweave';
// @ts-expect-error - arweave types may not be available
import { JWKInterface } from 'arweave/node/lib/wallet';

export interface WavesArweaveNFTConfig {
  nodeUrl?: string; // WAVES node URL
  chainId?: string; // Chain ID ('W' for mainnet, 'T' for testnet)
  arweaveHost?: string; // Arweave gateway host
  arweavePort?: number; // Gateway port
  arweaveProtocol?: string; // http or https
  timeout?: number; // Request timeout
  logging?: boolean; // Enable logging
}

export interface NFTMetadata {
  name: string;
  description: string;
  image?: string; // Arweave TX ID or URL of image
  animation_url?: string; // Arweave TX ID or URL of animation/video
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
  // Arweave
  fileTransactionId: string; // Arweave TX ID of file
  fileUrl: string; // Gateway URL to file
  metadataTransactionId: string; // Arweave TX ID of metadata
  metadataUrl: string; // Gateway URL to metadata
  // WAVES
  assetId: string; // WAVES asset ID
  transactionId: string; // WAVES transaction ID
  explorerUrl: string; // WAVES Explorer URL
  viewBlockUrl: string; // ViewBlock explorer URL
  // Costs
  totalCost: {
    arweave: {
      fileAR: string;
      metadataAR: string;
      totalAR: string;
      fileWinston: string;
      metadataWinston: string;
      totalWinston: string;
    };
    waves: {
      issueFee: string;
      totalWAVES: string;
    };
  };
}

export class WavesArweaveNFTMinter {
  private nodeUrl: string;
  private chainId: string;
  private arweave: Arweave;

  constructor(config: WavesArweaveNFTConfig = {}) {
    this.nodeUrl = config.nodeUrl || 'https://nodes.wavesnodes.com';
    this.chainId = config.chainId || 'W'; // Mainnet

    // Initialize Arweave
    this.arweave = Arweave.init({
      host: config.arweaveHost || 'arweave.net',
      port: config.arweavePort || 443,
      protocol: config.arweaveProtocol || 'https',
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
      
      // Audio
      'mp3': 'audio/mpeg',
      'wav': 'audio/wav',
      'ogg': 'audio/ogg',
      'flac': 'audio/flac',
      
      // Documents
      'pdf': 'application/pdf',
      'json': 'application/json',
      'txt': 'text/plain',
      
      // 3D Models
      'glb': 'model/gltf-binary',
      'gltf': 'model/gltf+json',
    };
    
    return mimeTypes[ext || ''] || 'application/octet-stream';
  }

  /**
   * Upload file to Arweave
   */
  private async uploadFileToArweave(
    fileData: Buffer,
    fileName: string,
    arweaveKey: JWKInterface,
    options: FileUploadOptions = {}
  ): Promise<{ txId: string; url: string; cost: { ar: string; winston: string } }> {
    try {
      // Create transaction
      const transaction = await this.arweave.createTransaction(
        { data: fileData },
        arweaveKey
      );

      // Add Content-Type tag
      const contentType = options.contentType || this.getMimeType(fileName);
      transaction.addTag('Content-Type', contentType);

      // Add standard NFT tags
      transaction.addTag('App-Name', 'WAVES-NFT');
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
      await this.arweave.transactions.sign(transaction, arweaveKey);

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
          `Failed to post Arweave transaction. Status: ${response.status}`
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
    arweaveKey: JWKInterface,
    options: FileUploadOptions = {}
  ): Promise<{ txId: string; url: string; cost: { ar: string; winston: string } }> {
    try {
      const jsonString = JSON.stringify(metadata, null, 2);
      const jsonBuffer = Buffer.from(jsonString);

      // Create transaction
      const transaction = await this.arweave.createTransaction(
        { data: jsonBuffer },
        arweaveKey
      );

      // Add metadata tags
      transaction.addTag('Content-Type', 'application/json');
      transaction.addTag('App-Name', 'WAVES-NFT');
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
      await this.arweave.transactions.sign(transaction, arweaveKey);

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
   * Mint NFT on WAVES with assets stored on Arweave
   */
  async mintNFT(
    seedPhrase: string,
    arweaveKey: JWKInterface,
    fileData: Buffer,
    fileName: string,
    metadata: Omit<NFTMetadata, 'image'>,
    options: FileUploadOptions = {}
  ): Promise<MintResult> {
    console.log('Starting WAVES NFT minting with Arweave storage...');

    // 1. Upload file to Arweave
    console.log('Uploading file to Arweave...');
    const fileUpload = await this.uploadFileToArweave(
      fileData,
      fileName,
      arweaveKey,
      options
    );
    console.log(`File uploaded to Arweave: ${fileUpload.txId}`);

    // 2. Create complete metadata with Arweave TX ID
    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: `https://arweave.net/${fileUpload.txId}`,
    };

    // 3. Upload metadata to Arweave
    console.log('Uploading metadata to Arweave...');
    const metadataUpload = await this.uploadMetadataToArweave(
      completeMetadata,
      arweaveKey,
      {
        tags: [
          { name: 'File-TX', value: fileUpload.txId },
          { name: 'Chain', value: 'WAVES' },
          ...(options.tags || []),
        ],
      }
    );
    console.log(`Metadata uploaded to Arweave: ${metadataUpload.txId}`);

    // 4. Get key pair from seed
    const keyPair = privateKey(seedPhrase);
    const pubKey = publicKey(seedPhrase);
    const senderAddress = address(seedPhrase, this.chainId);

    // 5. Create WAVES asset issue transaction (NFT)
    const metadataUrl = `https://arweave.net/${metadataUpload.txId}`;
    
    // WAVES NFT: Issue asset with reissuable: false, decimals: 0, quantity: 1
    const issueTx = issue({
      name: metadata.name.substring(0, 16), // Max 16 chars
      description: `${metadata.description.substring(0, 1000)} | Metadata: ${metadataUrl}`, // Include Arweave URL in description
      quantity: 1, // NFT: only 1 unit
      decimals: 0, // NFT: no decimals
      reissuable: false, // NFT: not reissuable
      chainId: this.chainId,
      senderPublicKey: pubKey,
    }, keyPair);

    console.log('Broadcasting WAVES transaction...');
    const result = await broadcast(issueTx, this.nodeUrl);
    
    if (result.error) {
      throw new Error(`WAVES transaction failed: ${result.error}`);
    }

    const txId = result.id || '';
    const assetId = result.assetId || txId; // Asset ID is in the result
    console.log(`NFT minted on WAVES! Asset ID: ${assetId}`);

    // 6. Calculate costs
    const fileWinston = fileUpload.cost.winston;
    const metadataWinston = metadataUpload.cost.winston;
    const totalWinston = (BigInt(fileWinston) + BigInt(metadataWinston)).toString();
    const totalAR = this.arweave.ar.winstonToAr(totalWinston);

    // WAVES asset issuance fee is 1 WAVES
    const issueFee = '1.0';

    // 7. Get explorer URLs
    const explorerBase = this.chainId === 'W'
      ? 'https://wavesexplorer.com/tx'
      : 'https://testnet.wavesexplorer.com/tx';
    const explorerUrl = `${explorerBase}/${txId}`;
    const viewBlockUrl = this.chainId === 'W'
      ? `https://viewblock.io/waves/tx/${txId}`
      : `https://testnet.viewblock.io/waves/tx/${txId}`;

    return {
      // Arweave
      fileTransactionId: fileUpload.txId,
      fileUrl: fileUpload.url,
      metadataTransactionId: metadataUpload.txId,
      metadataUrl: metadataUpload.url,
      // WAVES
      assetId,
      transactionId: txId,
      explorerUrl,
      viewBlockUrl,
      // Costs
      totalCost: {
        arweave: {
          fileAR: fileUpload.cost.ar,
          metadataAR: metadataUpload.cost.ar,
          totalAR,
          fileWinston,
          metadataWinston,
          totalWinston,
        },
        waves: {
          issueFee,
          totalWAVES: issueFee,
        },
      },
    };
  }

  /**
   * Mint media NFT with animation and thumbnail
   */
  async mintMediaNFT(
    seedPhrase: string,
    arweaveKey: JWKInterface,
    mediaData: Buffer,
    mediaFileName: string,
    thumbnailData: Buffer,
    thumbnailFileName: string,
    metadata: Omit<NFTMetadata, 'image' | 'animation_url'>,
    options: FileUploadOptions = {}
  ): Promise<MintResult> {
    console.log('Starting WAVES media NFT minting with Arweave storage...');

    // 1. Upload media file to Arweave
    console.log('Uploading media to Arweave...');
    const mediaUpload = await this.uploadFileToArweave(
      mediaData,
      mediaFileName,
      arweaveKey,
      options
    );
    console.log(`Media uploaded: ${mediaUpload.txId}`);

    // 2. Upload thumbnail to Arweave
    console.log('Uploading thumbnail to Arweave...');
    const thumbnailUpload = await this.uploadFileToArweave(
      thumbnailData,
      thumbnailFileName,
      arweaveKey,
      options
    );
    console.log(`Thumbnail uploaded: ${thumbnailUpload.txId}`);

    // 3. Create complete metadata with both TX IDs
    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: `https://arweave.net/${thumbnailUpload.txId}`,
      animation_url: `https://arweave.net/${mediaUpload.txId}`,
    };

    // 4. Upload metadata to Arweave
    console.log('Uploading metadata to Arweave...');
    const metadataUpload = await this.uploadMetadataToArweave(
      completeMetadata,
      arweaveKey,
      {
        tags: [
          { name: 'Media-TX', value: mediaUpload.txId },
          { name: 'Thumbnail-TX', value: thumbnailUpload.txId },
          { name: 'Chain', value: 'WAVES' },
          ...(options.tags || []),
        ],
      }
    );
    console.log(`Metadata uploaded: ${metadataUpload.txId}`);

    // 5. Mint on WAVES
    const keyPair = privateKey(seedPhrase);
    const pubKey = publicKey(seedPhrase);
    const metadataUrl = `https://arweave.net/${metadataUpload.txId}`;

    const issueTx = issue({
      name: metadata.name.substring(0, 16),
      description: `${metadata.description.substring(0, 1000)} | Metadata: ${metadataUrl}`,
      quantity: 1,
      decimals: 0,
      reissuable: false,
      chainId: this.chainId,
      senderPublicKey: pubKey,
    }, keyPair);

    const result = await broadcast(issueTx, this.nodeUrl);

    if (result.error) {
      throw new Error(`WAVES transaction failed: ${result.error}`);
    }

    const txId = result.id || '';
    const assetId = result.assetId || txId;

    // Calculate costs
    const mediaWinston = BigInt(mediaUpload.cost.winston);
    const thumbnailWinston = BigInt(thumbnailUpload.cost.winston);
    const metadataWinston = BigInt(metadataUpload.cost.winston);
    const totalWinston = (mediaWinston + thumbnailWinston + metadataWinston).toString();
    const totalAR = this.arweave.ar.winstonToAr(totalWinston);

    const issueFee = '1.0';

    const explorerBase = this.chainId === 'W'
      ? 'https://wavesexplorer.com/tx'
      : 'https://testnet.wavesexplorer.com/tx';
    const explorerUrl = `${explorerBase}/${txId}`;
    const viewBlockUrl = this.chainId === 'W'
      ? `https://viewblock.io/waves/tx/${txId}`
      : `https://testnet.viewblock.io/waves/tx/${txId}`;

    return {
      fileTransactionId: mediaUpload.txId,
      fileUrl: mediaUpload.url,
      metadataTransactionId: metadataUpload.txId,
      metadataUrl: metadataUpload.url,
      assetId,
      transactionId: txId,
      explorerUrl,
      viewBlockUrl,
      totalCost: {
        arweave: {
          fileAR: mediaUpload.cost.ar,
          metadataAR: metadataUpload.cost.ar,
          totalAR,
          fileWinston: mediaUpload.cost.winston,
          metadataWinston: metadataUpload.cost.winston,
          totalWinston,
        },
        waves: {
          issueFee,
          totalWAVES: issueFee,
        },
      },
    };
  }

  /**
   * Check WAVES account balance
   */
  async checkWavesBalance(address: string): Promise<{
    address: string;
    balanceWAVES: string;
    balanceWavelets: number;
  }> {
    try {
      const response = await fetch(`${this.nodeUrl}/addresses/balance/${address}`);
      const data = await response.json();
      const balanceWavelets = data.balance || 0;
      const balanceWAVES = (balanceWavelets / 100000000).toFixed(8); // 1 WAVES = 100,000,000 wavelets

      return {
        address,
        balanceWAVES,
        balanceWavelets,
      };
    } catch (error: any) {
      throw new Error(`Failed to check WAVES balance: ${error.message}`);
    }
  }

  /**
   * Check Arweave wallet balance
   */
  async checkArweaveBalance(arweaveKey: JWKInterface): Promise<{
    address: string;
    balanceAR: string;
    balanceWinston: string;
  }> {
    try {
      const address = await this.arweave.wallets.jwkToAddress(arweaveKey);
      const balanceWinston = await this.arweave.wallets.getBalance(address);
      const balanceAR = this.arweave.ar.winstonToAr(balanceWinston);

      return {
        address,
        balanceAR,
        balanceWinston,
      };
    } catch (error: any) {
      throw new Error(`Failed to check Arweave balance: ${error.message}`);
    }
  }

  /**
   * Estimate Arweave cost for file upload
   */
  async estimateArweaveCost(fileData: Buffer): Promise<{
    ar: string;
    winston: string;
  }> {
    try {
      const dummyKey = await this.arweave.wallets.generate();
      const transaction = await this.arweave.createTransaction(
        { data: fileData },
        dummyKey
      );

      const winston = transaction.reward;
      const ar = this.arweave.ar.winstonToAr(winston);

      return { ar, winston };
    } catch (error: any) {
      throw new Error(`Failed to estimate Arweave cost: ${error.message}`);
    }
  }
}

/**
 * USAGE EXAMPLES:
 * 
 * // Basic NFT minting on WAVES with Arweave storage
 * import { WavesArweaveNFTMinter } from './WAVES.Waves.nft.arweaveDirect';
 * import * as fs from 'fs';
 * 
 * // Initialize minter
 * const minter = new WavesArweaveNFTMinter({
 *   nodeUrl: 'https://nodes.wavesnodes.com',
 *   chainId: 'W', // Mainnet ('T' for testnet)
 *   arweaveHost: 'arweave.net',
 *   arweavePort: 443,
 *   arweaveProtocol: 'https',
 * });
 * 
 * // Load WAVES seed phrase
 * const seedPhrase = 'your seed phrase here'; // 15 words
 * const senderAddress = address(seedPhrase, 'W');
 * 
 * // Load Arweave wallet
 * const arweaveKey = JSON.parse(fs.readFileSync('arweave-wallet.json', 'utf-8'));
 * 
 * // Check balances
 * const wavesBalance = await minter.checkWavesBalance(senderAddress);
 * console.log(`WAVES balance: ${wavesBalance.balanceWAVES} WAVES`);
 * 
 * const arBalance = await minter.checkArweaveBalance(arweaveKey);
 * console.log(`Arweave balance: ${arBalance.balanceAR} AR`);
 * 
 * // Load image
 * const imageData = fs.readFileSync('art.png');
 * 
 * // Estimate Arweave cost
 * const arCost = await minter.estimateArweaveCost(imageData);
 * console.log(`Estimated Arweave cost: ${arCost.ar} AR`);
 * 
 * // Mint NFT
 * const result = await minter.mintNFT(
 *   seedPhrase,
 *   arweaveKey,
 *   imageData,
 *   'art.png',
 *   {
 *     name: "WAVES Art #1",
 *     description: "NFT on WAVES, stored permanently on Arweave",
 *     attributes: [
 *       { trait_type: "Rarity", value: "Legendary" },
 *       { trait_type: "Blockchain", value: "WAVES" },
 *       { trait_type: "Consensus", value: "LPoS" },
 *       { trait_type: "Storage", value: "Arweave" }
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
 * console.log('Asset ID:', result.assetId);
 * console.log('WAVES TX:', result.transactionId);
 * console.log('WAVES Explorer:', result.explorerUrl);
 * console.log('Arweave File TX:', result.fileUrl);
 * console.log('Arweave Metadata TX:', result.metadataUrl);
 * console.log('Total Arweave cost:', result.totalCost.arweave.totalAR, 'AR');
 * console.log('Total WAVES cost:', result.totalCost.waves.totalWAVES, 'WAVES');
 * 
 * // Video NFT with thumbnail
 * const videoData = fs.readFileSync('animation.mp4');
 * const thumbnailData = fs.readFileSync('thumbnail.jpg');
 * 
 * const mediaResult = await minter.mintMediaNFT(
 *   seedPhrase,
 *   arweaveKey,
 *   videoData,
 *   'animation.mp4',
 *   thumbnailData,
 *   'thumbnail.jpg',
 *   {
 *     name: "Animated Art #1",
 *     description: "WAVES NFT with permanent Arweave storage",
 *     attributes: [
 *       { trait_type: "Duration", value: "10s" },
 *       { trait_type: "Type", value: "Animation" }
 *     ]
 *   },
 *   {}
 * );
 * 
 * // Testnet example
 * const testnetMinter = new WavesArweaveNFTMinter({
 *   nodeUrl: 'https://nodes-testnet.wavesnodes.com',
 *   chainId: 'T', // Testnet
 * });
 * 
 * const testnetResult = await testnetMinter.mintNFT(
 *   testSeedPhrase,
 *   arweaveKey,
 *   imageData,
 *   'art.png',
 *   {
 *     name: "Test NFT",
 *     description: "Testing on WAVES testnet"
 *   },
 *   {}
 * );
 * 
 * // LPoS (Leased Proof of Stake) NFT
 * const lposNFT = await minter.mintNFT(
 *   seedPhrase,
 *   arweaveKey,
 *   imageData,
 *   'lpos-nft.png',
 *   {
 *     name: "LPoS NFT #1",
 *     description: "NFT on WAVES LPoS blockchain, permanently stored on Arweave",
 *     attributes: [
 *       { trait_type: "Consensus", value: "Leased Proof of Stake" },
 *       { trait_type: "Blockchain", value: "WAVES" },
 *       { trait_type: "Storage", value: "Arweave" }
 *     ]
 *   },
 *   {
 *     tags: [
 *       { name: 'Consensus', value: 'LPoS' },
 *       { name: 'Type', value: 'NFT' }
 *     ]
 *   }
 * );
 * 
 * console.log('WAVES NFT minted with permanent Arweave storage!');
 * console.log('Native asset issuance with LPoS consensus and permanent metadata.');
 */

export default WavesArweaveNFTMinter;

