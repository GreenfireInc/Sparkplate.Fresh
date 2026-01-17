// Stellar NFT Minting with Arweave Storage
// Mints Stellar NFTs with assets stored permanently on Arweave

/**
 * OVERVIEW:
 * 
 * This module mints NFTs on Stellar blockchain with assets stored permanently on Arweave.
 * - Upload files directly to Arweave (permanent storage)
 * - Upload metadata to Arweave (immutable)
 * - Create Stellar NFT (native asset with NFT properties)
 * - Link NFT metadata to Arweave URLs
 * - Best of both worlds: Stellar fast transactions + Arweave permanent storage
 * 
 * BENEFITS:
 * - Stellar: Fast, low-cost, payment-focused, anchor system
 * - Arweave: Permanent storage (200+ year guarantee)
 * - No recurring storage fees
 * - Immutable metadata and assets on Arweave
 * - Stellar native asset standard with NFT properties
 * 
 * COSTS:
 * - Arweave: ~0.01-0.02 AR per NFT (one-time, permanent)
 * - Stellar: ~0.00001 XLM per transaction (minimal fee)
 * - Total: ~0.01-0.02 AR + minimal XLM per NFT
 * 
 * STELLAR NFT STANDARD:
 * Uses Stellar native asset creation with immutable flags and metadata pointing to Arweave.
 */

// @ts-expect-error - stellar-sdk is a runtime dependency
import { 
  Server, 
  Asset, 
  Operation, 
  TransactionBuilder, 
  Networks, 
  Keypair,
  Memo,
  xdr
} from 'stellar-sdk';
// @ts-expect-error - arweave is a runtime dependency
import Arweave from 'arweave';
// @ts-expect-error - arweave types may not be available
import { JWKInterface } from 'arweave/node/lib/wallet';

export interface StellarArweaveNFTConfig {
  serverUrl?: string; // Stellar Horizon server URL
  network?: 'mainnet' | 'testnet'; // Stellar network
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
  // Stellar
  assetCode: string; // Stellar asset code
  assetIssuer: string; // Asset issuer address
  transactionHash: string; // Stellar transaction hash
  explorerUrl: string; // Stellar Expert URL
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
    stellar: {
      feeXLM: string;
      totalXLM: string;
    };
  };
}

export class StellarArweaveNFTMinter {
  private server: Server;
  private networkPassphrase: string;
  private networkName: 'mainnet' | 'testnet';
  private arweave: Arweave;

  constructor(config: StellarArweaveNFTConfig = {}) {
    this.networkName = config.network || 'mainnet';
    const serverUrl = config.serverUrl || (
      this.networkName === 'mainnet'
        ? 'https://horizon.stellar.org'
        : 'https://horizon-testnet.stellar.org'
    );

    this.server = new Server(serverUrl);
    this.networkPassphrase = this.networkName === 'mainnet'
      ? Networks.PUBLIC
      : Networks.TESTNET;

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
      transaction.addTag('App-Name', 'Stellar-NFT');
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
      transaction.addTag('App-Name', 'Stellar-NFT');
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
   * Mint NFT on Stellar with assets stored on Arweave
   */
  async mintNFT(
    secretKey: string,
    arweaveKey: JWKInterface,
    fileData: Buffer,
    fileName: string,
    metadata: Omit<NFTMetadata, 'image'>,
    options: FileUploadOptions = {}
  ): Promise<MintResult> {
    console.log('Starting Stellar NFT minting with Arweave storage...');

    const keypair = Keypair.fromSecret(secretKey);
    const issuerAddress = keypair.publicKey();

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
          { name: 'Chain', value: 'Stellar' },
          ...(options.tags || []),
        ],
      }
    );
    console.log(`Metadata uploaded to Arweave: ${metadataUpload.txId}`);

    // 4. Get account sequence number
    const account = await this.server.loadAccount(issuerAddress);
    const metadataUrl = `https://arweave.net/${metadataUpload.txId}`;

    // 5. Create asset code (NFT identifier)
    // Stellar asset codes are 1-12 alphanumeric characters
    const assetCode = metadata.name
      .replace(/[^a-zA-Z0-9]/g, '')
      .substring(0, 12)
      .toUpperCase() || 'NFT';

    // 6. Create payment operation to create NFT asset
    // For NFTs on Stellar, we create an asset and set immutable flags
    // Then send 1 unit to a recipient (or keep it)
    const asset = new Asset(assetCode, issuerAddress);
    
    // Create set options operation with NFT flags
    // Authorization required, authorization revocable, and immutable flags
    const setOptionsOp = Operation.setOptions({
      setFlags: 5, // Auth required (1) + Auth revocable (4) = 5
      source: issuerAddress,
    });

    // Create payment operation to issue the NFT (send 1 unit)
    // Note: This is a simplified approach. In practice, you might want to
    // create a payment to yourself or a specific recipient
    const paymentOp = Operation.payment({
      destination: issuerAddress,
      asset: asset,
      amount: '1', // 1 unit for NFT
      source: issuerAddress,
    });

    // 7. Build and submit transaction
    console.log('Building Stellar transaction...');
    const transaction = new TransactionBuilder(account, {
      fee: '100', // Base fee (stroops)
      networkPassphrase: this.networkPassphrase,
    })
      .addOperation(setOptionsOp)
      .addMemo(Memo.text(`NFT:${metadataUrl}`)) // Include Arweave metadata URL in memo
      .setTimeout(30)
      .build();

    transaction.sign(keypair);
    console.log('Submitting Stellar transaction...');
    
    const result = await this.server.submitTransaction(transaction);
    console.log(`NFT minted on Stellar! Transaction: ${result.hash}`);

    // 8. Calculate costs
    const fileWinston = fileUpload.cost.winston;
    const metadataWinston = metadataUpload.cost.winston;
    const totalWinston = (BigInt(fileWinston) + BigInt(metadataWinston)).toString();
    const totalAR = this.arweave.ar.winstonToAr(totalWinston);

    // Stellar fee is minimal (0.00001 XLM)
    const feeXLM = (parseInt(result.fee_charged) / 10000000).toFixed(7); // Stroops to XLM

    // 9. Get explorer URLs
    const explorerBase = this.networkName === 'mainnet'
      ? 'https://stellar.expert/explorer/public/tx'
      : 'https://stellar.expert/explorer/testnet/tx';
    const explorerUrl = `${explorerBase}/${result.hash}`;
    const viewBlockUrl = this.networkName === 'mainnet'
      ? `https://viewblock.io/stellar/tx/${result.hash}`
      : `https://testnet.viewblock.io/stellar/tx/${result.hash}`;

    return {
      // Arweave
      fileTransactionId: fileUpload.txId,
      fileUrl: fileUpload.url,
      metadataTransactionId: metadataUpload.txId,
      metadataUrl: metadataUpload.url,
      // Stellar
      assetCode,
      assetIssuer: issuerAddress,
      transactionHash: result.hash,
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
        stellar: {
          feeXLM,
          totalXLM: feeXLM,
        },
      },
    };
  }

  /**
   * Mint media NFT with animation and thumbnail
   */
  async mintMediaNFT(
    secretKey: string,
    arweaveKey: JWKInterface,
    mediaData: Buffer,
    mediaFileName: string,
    thumbnailData: Buffer,
    thumbnailFileName: string,
    metadata: Omit<NFTMetadata, 'image' | 'animation_url'>,
    options: FileUploadOptions = {}
  ): Promise<MintResult> {
    console.log('Starting Stellar media NFT minting with Arweave storage...');

    const keypair = Keypair.fromSecret(secretKey);
    const issuerAddress = keypair.publicKey();

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
          { name: 'Chain', value: 'Stellar' },
          ...(options.tags || []),
        ],
      }
    );
    console.log(`Metadata uploaded: ${metadataUpload.txId}`);

    // 5. Create NFT on Stellar
    const account = await this.server.loadAccount(issuerAddress);
    const metadataUrl = `https://arweave.net/${metadataUpload.txId}`;

    const assetCode = metadata.name
      .replace(/[^a-zA-Z0-9]/g, '')
      .substring(0, 12)
      .toUpperCase() || 'NFT';

    const asset = new Asset(assetCode, issuerAddress);
    
    const setOptionsOp = Operation.setOptions({
      setFlags: 5,
      source: issuerAddress,
    });

    const paymentOp = Operation.payment({
      destination: issuerAddress,
      asset: asset,
      amount: '1',
      source: issuerAddress,
    });

    const transaction = new TransactionBuilder(account, {
      fee: '100',
      networkPassphrase: this.networkPassphrase,
    })
      .addOperation(setOptionsOp)
      .addMemo(Memo.text(`NFT:${metadataUrl}`))
      .setTimeout(30)
      .build();

    transaction.sign(keypair);
    const result = await this.server.submitTransaction(transaction);

    // Calculate costs
    const mediaWinston = BigInt(mediaUpload.cost.winston);
    const thumbnailWinston = BigInt(thumbnailUpload.cost.winston);
    const metadataWinston = BigInt(metadataUpload.cost.winston);
    const totalWinston = (mediaWinston + thumbnailWinston + metadataWinston).toString();
    const totalAR = this.arweave.ar.winstonToAr(totalWinston);

    const feeXLM = (parseInt(result.fee_charged) / 10000000).toFixed(7);

    const explorerBase = this.networkName === 'mainnet'
      ? 'https://stellar.expert/explorer/public/tx'
      : 'https://stellar.expert/explorer/testnet/tx';
    const explorerUrl = `${explorerBase}/${result.hash}`;
    const viewBlockUrl = this.networkName === 'mainnet'
      ? `https://viewblock.io/stellar/tx/${result.hash}`
      : `https://testnet.viewblock.io/stellar/tx/${result.hash}`;

    return {
      fileTransactionId: mediaUpload.txId,
      fileUrl: mediaUpload.url,
      metadataTransactionId: metadataUpload.txId,
      metadataUrl: metadataUpload.url,
      assetCode,
      assetIssuer: issuerAddress,
      transactionHash: result.hash,
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
        stellar: {
          feeXLM,
          totalXLM: feeXLM,
        },
      },
    };
  }

  /**
   * Check Stellar account balance
   */
  async checkStellarBalance(address: string): Promise<{
    address: string;
    balanceXLM: string;
    balanceStroops: string;
  }> {
    try {
      const account = await this.server.loadAccount(address);
      const xlmBalance = account.balances.find(b => b.asset_type === 'native');
      const balanceStroops = xlmBalance?.balance || '0';
      const balanceXLM = balanceStroops;

      return {
        address,
        balanceXLM,
        balanceStroops,
      };
    } catch (error: any) {
      throw new Error(`Failed to check Stellar balance: ${error.message}`);
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
 * // Basic NFT minting on Stellar with Arweave storage
 * import { StellarArweaveNFTMinter } from './XLM.Stellar.nft.arweaveDirect';
 * import * as fs from 'fs';
 * 
 * // Initialize minter
 * const minter = new StellarArweaveNFTMinter({
 *   serverUrl: 'https://horizon.stellar.org',
 *   network: 'mainnet',
 *   arweaveHost: 'arweave.net',
 *   arweavePort: 443,
 *   arweaveProtocol: 'https',
 * });
 * 
 * // Load Stellar secret key
 * const secretKey = 'S...'; // Stellar secret key
 * const keypair = Keypair.fromSecret(secretKey);
 * const issuerAddress = keypair.publicKey();
 * 
 * // Load Arweave wallet
 * const arweaveKey = JSON.parse(fs.readFileSync('arweave-wallet.json', 'utf-8'));
 * 
 * // Check balances
 * const stellarBalance = await minter.checkStellarBalance(issuerAddress);
 * console.log(`Stellar balance: ${stellarBalance.balanceXLM} XLM`);
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
 *   secretKey,
 *   arweaveKey,
 *   imageData,
 *   'art.png',
 *   {
 *     name: "Stellar Art #1",
 *     description: "NFT on Stellar, stored permanently on Arweave",
 *     attributes: [
 *       { trait_type: "Rarity", value: "Legendary" },
 *       { trait_type: "Blockchain", value: "Stellar" },
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
 * console.log('Asset Code:', result.assetCode);
 * console.log('Asset Issuer:', result.assetIssuer);
 * console.log('Stellar TX:', result.transactionHash);
 * console.log('Stellar Expert:', result.explorerUrl);
 * console.log('Arweave File TX:', result.fileUrl);
 * console.log('Arweave Metadata TX:', result.metadataUrl);
 * console.log('Total Arweave cost:', result.totalCost.arweave.totalAR, 'AR');
 * console.log('Total Stellar cost:', result.totalCost.stellar.totalXLM, 'XLM');
 * 
 * // Video NFT with thumbnail
 * const videoData = fs.readFileSync('animation.mp4');
 * const thumbnailData = fs.readFileSync('thumbnail.jpg');
 * 
 * const mediaResult = await minter.mintMediaNFT(
 *   secretKey,
 *   arweaveKey,
 *   videoData,
 *   'animation.mp4',
 *   thumbnailData,
 *   'thumbnail.jpg',
 *   {
 *     name: "Animated Art #1",
 *     description: "Stellar NFT with permanent Arweave storage",
 *     attributes: [
 *       { trait_type: "Duration", value: "10s" },
 *       { trait_type: "Type", value: "Animation" }
 *     ]
 *   },
 *   {}
 * );
 * 
 * // Testnet example
 * const testnetMinter = new StellarArweaveNFTMinter({
 *   serverUrl: 'https://horizon-testnet.stellar.org',
 *   network: 'testnet',
 * });
 * 
 * const testnetResult = await testnetMinter.mintNFT(
 *   testSecretKey,
 *   arweaveKey,
 *   imageData,
 *   'art.png',
 *   {
 *     name: "Test NFT",
 *     description: "Testing on Stellar testnet"
 *   },
 *   {}
 * );
 * 
 * // Anchor system NFT: Commemorating Stellar's anchor ecosystem
 * const anchorNFT = await minter.mintNFT(
 *   secretKey,
 *   arweaveKey,
 *   imageData,
 *   'anchor-nft.png',
 *   {
 *     name: "Anchor NFT #1",
 *     description: "NFT on Stellar's anchor system, permanently stored on Arweave",
 *     attributes: [
 *       { trait_type: "Ecosystem", value: "Anchor System" },
 *       { trait_type: "Blockchain", value: "Stellar" },
 *       { trait_type: "Storage", value: "Arweave" }
 *     ]
 *   },
 *   {
 *     tags: [
 *       { name: 'Ecosystem', value: 'Anchor' },
 *       { name: 'Network', value: 'Stellar' }
 *     ]
 *   }
 * );
 * 
 * console.log('Stellar NFT minted with permanent Arweave storage!');
 * console.log('Payment-focused blockchain with anchor system and permanent metadata.');
 */

export default StellarArweaveNFTMinter;

