// Algorand NFT Minting with Arweave Storage
// Mints Algorand Standard Assets (NFTs) with assets stored permanently on Arweave

/**
 * OVERVIEW:
 * 
 * This module mints NFTs on Algorand blockchain with assets stored permanently on Arweave.
 * - Upload files directly to Arweave (permanent storage)
 * - Upload metadata to Arweave (immutable)
 * - Create ASA (Algorand Standard Asset) NFT on Algorand
 * - Link ASA metadata to Arweave URLs
 * - Best of both worlds: Algorand fast transactions + Arweave permanent storage
 * 
 * BENEFITS:
 * - Algorand: Fast, low-cost, finality in ~4 seconds
 * - Arweave: Permanent storage (200+ year guarantee)
 * - No recurring storage fees
 * - Immutable metadata and assets on Arweave
 * - ASA NFT standard on Algorand
 * 
 * COSTS:
 * - Arweave: ~0.01-0.02 AR per NFT (one-time, permanent)
 * - Algorand: ~0.001 ALGO per ASA creation (minimal fee)
 * - Total: ~0.01-0.02 AR + 0.001 ALGO per NFT
 * 
 * ALGORAND NFT STANDARD:
 * Uses ASA (Algorand Standard Asset) with ARC3/ARC19 metadata standard.
 */

// @ts-expect-error - algosdk is a runtime dependency
import algosdk from 'algosdk';
// @ts-expect-error - arweave is a runtime dependency
import Arweave from 'arweave';
// @ts-expect-error - arweave types may not be available
import { JWKInterface } from 'arweave/node/lib/wallet';

export interface AlgorandArweaveNFTConfig {
  algodToken?: string; // Algorand API token
  algodServer?: string; // Algorand node URL
  algodPort?: number; // Algorand node port
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
  // Algorand
  assetId: number; // Algorand ASA asset ID
  assetIndex: number; // Same as assetId
  transactionId: string; // Algorand transaction ID
  explorerUrl: string; // AlgoExplorer URL
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
    algorand: {
      feeALGO: string;
      totalALGO: string;
    };
  };
}

export class AlgorandArweaveNFTMinter {
  private algodClient: algosdk.Algodv2;
  private arweave: Arweave;

  constructor(config: AlgorandArweaveNFTConfig = {}) {
    // Initialize Algorand client
    const algodServer = config.algodServer || 'https://testnet-api.algonode.cloud';
    const algodPort = config.algodPort || 443;
    const algodToken = config.algodToken || '';

    this.algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

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
      transaction.addTag('App-Name', 'Algorand-NFT');
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
      transaction.addTag('App-Name', 'Algorand-NFT');
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
   * Mint NFT on Algorand with assets stored on Arweave
   */
  async mintNFT(
    algorandAccount: algosdk.Account,
    arweaveKey: JWKInterface,
    fileData: Buffer,
    fileName: string,
    metadata: Omit<NFTMetadata, 'image'>,
    options: FileUploadOptions = {},
    network: 'mainnet' | 'testnet' = 'testnet'
  ): Promise<MintResult> {
    console.log('Starting Algorand NFT minting with Arweave storage...');

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
      image: `https://arweave.net/${fileUpload.txId}`, // Use full URL for ARC3 compatibility
    };

    // 3. Upload metadata to Arweave
    console.log('Uploading metadata to Arweave...');
    const metadataUpload = await this.uploadMetadataToArweave(
      completeMetadata,
      arweaveKey,
      {
        tags: [
          { name: 'File-TX', value: fileUpload.txId },
          ...(options.tags || []),
        ],
      }
    );
    console.log(`Metadata uploaded to Arweave: ${metadataUpload.txId}`);

    // 4. Create ARC3 metadata URL (points to Arweave)
    const metadataUrl = `https://arweave.net/${metadataUpload.txId}`;

    // 5. Get suggested parameters from Algorand
    const suggestedParams = await this.algodClient.getTransactionParams().do();

    // 6. Create ASA (Algorand Standard Asset) NFT
    console.log('Creating ASA NFT on Algorand...');
    const assetName = metadata.name.substring(0, 32); // Max 32 bytes
    const unitName = metadata.name.substring(0, 8).toUpperCase(); // Max 8 bytes
    
    const assetCreateTxn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      from: algorandAccount.addr,
      suggestedParams,
      total: 1, // NFT: only 1 unit
      decimals: 0, // NFT: no decimals
      defaultFrozen: false,
      unitName: unitName,
      assetName: assetName,
      assetURL: metadataUrl, // Point to Arweave metadata
      manager: algorandAccount.addr,
      reserve: algorandAccount.addr,
      freeze: algorandAccount.addr,
      clawback: algorandAccount.addr,
    });

    // 7. Sign and submit Algorand transaction
    const signedTxn = assetCreateTxn.signTxn(algorandAccount.sk);
    const txResult = await this.algodClient.sendRawTransaction(signedTxn).do();
    
    // Wait for confirmation
    console.log('Waiting for Algorand transaction confirmation...');
    const confirmedTxn = await algosdk.waitForConfirmation(
      this.algodClient,
      txResult.txId,
      4
    );

    const assetId = confirmedTxn['asset-index'];
    console.log(`ASA NFT created: Asset ID ${assetId}`);

    // 8. Calculate costs
    const fileWinston = fileUpload.cost.winston;
    const metadataWinston = metadataUpload.cost.winston;
    const totalWinston = (BigInt(fileWinston) + BigInt(metadataWinston)).toString();
    const totalAR = this.arweave.ar.winstonToAr(totalWinston);

    const feeMicroAlgos = suggestedParams.fee || 1000;
    const feeALGO = (feeMicroAlgos / 1000000).toFixed(6);

    // 9. Get explorer URLs
    const explorerBase = network === 'mainnet' 
      ? 'https://algoexplorer.io/asset'
      : 'https://testnet.algoexplorer.io/asset';
    const explorerUrl = `${explorerBase}/${assetId}`;
    const viewBlockUrl = network === 'mainnet'
      ? `https://viewblock.io/algorand/asset/${assetId}`
      : `https://testnet.viewblock.io/algorand/asset/${assetId}`;

    return {
      // Arweave
      fileTransactionId: fileUpload.txId,
      fileUrl: fileUpload.url,
      metadataTransactionId: metadataUpload.txId,
      metadataUrl: metadataUpload.url,
      // Algorand
      assetId,
      assetIndex: assetId,
      transactionId: txResult.txId,
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
        algorand: {
          feeALGO,
          totalALGO: feeALGO,
        },
      },
    };
  }

  /**
   * Mint media NFT with animation and thumbnail
   */
  async mintMediaNFT(
    algorandAccount: algosdk.Account,
    arweaveKey: JWKInterface,
    mediaData: Buffer,
    mediaFileName: string,
    thumbnailData: Buffer,
    thumbnailFileName: string,
    metadata: Omit<NFTMetadata, 'image' | 'animation_url'>,
    options: FileUploadOptions = {},
    network: 'mainnet' | 'testnet' = 'testnet'
  ): Promise<MintResult> {
    console.log('Starting Algorand media NFT minting with Arweave storage...');

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
          ...(options.tags || []),
        ],
      }
    );
    console.log(`Metadata uploaded: ${metadataUpload.txId}`);

    // 5. Create ASA NFT on Algorand
    const metadataUrl = `https://arweave.net/${metadataUpload.txId}`;
    const suggestedParams = await this.algodClient.getTransactionParams().do();

    const assetName = metadata.name.substring(0, 32);
    const unitName = metadata.name.substring(0, 8).toUpperCase();
    
    const assetCreateTxn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      from: algorandAccount.addr,
      suggestedParams,
      total: 1,
      decimals: 0,
      defaultFrozen: false,
      unitName: unitName,
      assetName: assetName,
      assetURL: metadataUrl,
      manager: algorandAccount.addr,
      reserve: algorandAccount.addr,
      freeze: algorandAccount.addr,
      clawback: algorandAccount.addr,
    });

    const signedTxn = assetCreateTxn.signTxn(algorandAccount.sk);
    const txResult = await this.algodClient.sendRawTransaction(signedTxn).do();
    
    const confirmedTxn = await algosdk.waitForConfirmation(
      this.algodClient,
      txResult.txId,
      4
    );

    const assetId = confirmedTxn['asset-index'];

    // Calculate costs
    const mediaWinston = BigInt(mediaUpload.cost.winston);
    const thumbnailWinston = BigInt(thumbnailUpload.cost.winston);
    const metadataWinston = BigInt(metadataUpload.cost.winston);
    const totalWinston = (mediaWinston + thumbnailWinston + metadataWinston).toString();
    const totalAR = this.arweave.ar.winstonToAr(totalWinston);

    const feeMicroAlgos = suggestedParams.fee || 1000;
    const feeALGO = (feeMicroAlgos / 1000000).toFixed(6);

    const explorerBase = network === 'mainnet' 
      ? 'https://algoexplorer.io/asset'
      : 'https://testnet.algoexplorer.io/asset';
    const explorerUrl = `${explorerBase}/${assetId}`;
    const viewBlockUrl = network === 'mainnet'
      ? `https://viewblock.io/algorand/asset/${assetId}`
      : `https://testnet.viewblock.io/algorand/asset/${assetId}`;

    return {
      fileTransactionId: mediaUpload.txId,
      fileUrl: mediaUpload.url,
      metadataTransactionId: metadataUpload.txId,
      metadataUrl: metadataUpload.url,
      assetId,
      assetIndex: assetId,
      transactionId: txResult.txId,
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
        algorand: {
          feeALGO,
          totalALGO: feeALGO,
        },
      },
    };
  }

  /**
   * Check Algorand account balance
   */
  async checkAlgorandBalance(account: algosdk.Account): Promise<{
    address: string;
    balanceALGO: string;
    balanceMicroAlgos: number;
  }> {
    try {
      const accountInfo = await this.algodClient.accountInformation(account.addr).do();
      const balanceMicroAlgos = accountInfo.amount;
      const balanceALGO = (balanceMicroAlgos / 1000000).toFixed(6);

      return {
        address: account.addr,
        balanceALGO,
        balanceMicroAlgos,
      };
    } catch (error: any) {
      throw new Error(`Failed to check Algorand balance: ${error.message}`);
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

  /**
   * Get Algorand asset information
   */
  async getAssetInfo(assetId: number): Promise<any> {
    try {
      return await this.algodClient.getAssetByID(assetId).do();
    } catch (error: any) {
      throw new Error(`Failed to get asset info: ${error.message}`);
    }
  }
}

/**
 * USAGE EXAMPLES:
 * 
 * // Basic NFT minting on Algorand with Arweave storage
 * import { AlgorandArweaveNFTMinter } from './ALGO.Algorand.nft.arweaveDirect';
 * import algosdk from 'algosdk';
 * import * as fs from 'fs';
 * 
 * // Initialize minter
 * const minter = new AlgorandArweaveNFTMinter({
 *   algodServer: 'https://testnet-api.algonode.cloud',
 *   algodPort: 443,
 *   arweaveHost: 'arweave.net',
 *   arweavePort: 443,
 *   arweaveProtocol: 'https',
 * });
 * 
 * // Load Algorand account (mnemonic or private key)
 * const mnemonic = 'your mnemonic phrase here';
 * const algorandAccount = algosdk.mnemonicToSecretKey(mnemonic);
 * 
 * // Load Arweave wallet
 * const arweaveKey = JSON.parse(fs.readFileSync('arweave-wallet.json', 'utf-8'));
 * 
 * // Check balances
 * const algoBalance = await minter.checkAlgorandBalance(algorandAccount);
 * console.log(`Algorand balance: ${algoBalance.balanceALGO} ALGO`);
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
 *   algorandAccount,
 *   arweaveKey,
 *   imageData,
 *   'art.png',
 *   {
 *     name: "Algorand Art #1",
 *     description: "NFT on Algorand, stored permanently on Arweave",
 *     attributes: [
 *       { trait_type: "Rarity", value: "Legendary" },
 *       { trait_type: "Blockchain", value: "Algorand" },
 *       { trait_type: "Storage", value: "Arweave" }
 *     ]
 *   },
 *   {
 *     tags: [
 *       { name: 'Collection', value: 'My Collection' },
 *       { name: 'Creator', value: 'Artist Name' }
 *     ]
 *   },
 *   'testnet'
 * );
 * 
 * console.log('NFT Minted!');
 * console.log('Algorand Asset ID:', result.assetId);
 * console.log('Algorand Explorer:', result.explorerUrl);
 * console.log('Arweave File TX:', result.fileUrl);
 * console.log('Arweave Metadata TX:', result.metadataUrl);
 * console.log('Total Arweave cost:', result.totalCost.arweave.totalAR, 'AR');
 * console.log('Total Algorand cost:', result.totalCost.algorand.totalALGO, 'ALGO');
 * 
 * // Video NFT with thumbnail
 * const videoData = fs.readFileSync('animation.mp4');
 * const thumbnailData = fs.readFileSync('thumbnail.jpg');
 * 
 * const mediaResult = await minter.mintMediaNFT(
 *   algorandAccount,
 *   arweaveKey,
 *   videoData,
 *   'animation.mp4',
 *   thumbnailData,
 *   'thumbnail.jpg',
 *   {
 *     name: "Animated Art #1",
 *     description: "Algorand NFT with permanent Arweave storage",
 *     attributes: [
 *       { trait_type: "Duration", value: "10s" },
 *       { trait_type: "Type", value: "Animation" }
 *     ]
 *   },
 *   {},
 *   'testnet'
 * );
 * 
 * // Get asset information
 * const assetInfo = await minter.getAssetInfo(result.assetId);
 * console.log('Asset URL (points to Arweave):', assetInfo.params.url);
 * 
 * // Mainnet example
 * const mainnetMinter = new AlgorandArweaveNFTMinter({
 *   algodServer: 'https://mainnet-api.algonode.cloud',
 *   algodPort: 443,
 * });
 * 
 * const mainnetResult = await mainnetMinter.mintNFT(
 *   mainnetAccount,
 *   arweaveKey,
 *   imageData,
 *   'art.png',
 *   {
 *     name: "Mainnet NFT",
 *     description: "Production NFT on Algorand mainnet"
 *   },
 *   {},
 *   'mainnet'
 * );
 */

export default AlgorandArweaveNFTMinter;

