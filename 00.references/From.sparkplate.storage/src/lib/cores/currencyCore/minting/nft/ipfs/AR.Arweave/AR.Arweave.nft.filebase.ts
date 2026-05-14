// Arweave NFT Minting via Filebase IPFS
// S3-compatible IPFS storage with multi-region redundancy

/**
 * OVERVIEW:
 * 
 * Filebase provides S3-compatible IPFS storage with geographic redundancy.
 * - Upload files using familiar S3 API
 * - Automatic IPFS pinning
 * - Multi-region geo-redundant storage
 * - Create Arweave NFT metadata
 * 
 * BENEFITS:
 * - S3-compatible API (easy migration)
 * - Geographic redundancy
 * - 5GB free tier
 * - Multiple storage backends (IPFS, Storj, Skynet)
 * 
 * COSTS:
 * - Filebase: 5GB free, then $5.99/TB/month
 * - Arweave: ~0.005-0.01 AR for metadata
 */

// @ts-expect-error - arweave is a runtime dependency
import Arweave from 'arweave';
// @ts-expect-error - arweave types may not be available
import { JWKInterface } from 'arweave/node/lib/wallet';
// @ts-expect-error - filebase/sdk is a runtime dependency
import { FilebaseClient } from '@filebase/sdk';

export interface FilebaseConfig {
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image?: string;
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
  arweaveTxId: string;
  arweaveUrl: string;
  viewBlockUrl: string;
}

export class ArweaveFilebaseNFTMinter {
  private arweave: Arweave;
  private filebase: FilebaseClient;
  private bucket: string;
  private filebaseGateway = 'https://ipfs.filebase.io/ipfs';

  constructor(
    filebaseConfig: FilebaseConfig,
    arweaveHost: string = 'arweave.net',
    arweavePort: number = 443,
    arweaveProtocol: string = 'https'
  ) {
    this.bucket = filebaseConfig.bucket;
    this.filebase = new FilebaseClient({
      accessKeyId: filebaseConfig.accessKeyId,
      secretAccessKey: filebaseConfig.secretAccessKey,
    });

    this.arweave = Arweave.init({
      host: arweaveHost,
      port: arweavePort,
      protocol: arweaveProtocol,
    });
  }

  /**
   * Upload file to Filebase IPFS
   */
  private async uploadFileToFilebase(
    fileData: Buffer,
    fileName: string
  ): Promise<{ cid: string; url: string }> {
    try {
      const response = await this.filebase.upload(this.bucket, fileName, fileData);
      
      const cid = response.cid;
      return {
        cid,
        url: `${this.filebaseGateway}/${cid}`,
      };
    } catch (error: any) {
      throw new Error(`Filebase upload failed: ${error.message}`);
    }
  }

  /**
   * Upload JSON metadata to Filebase
   */
  private async uploadMetadataToFilebase(
    metadata: NFTMetadata,
    fileName: string = 'metadata.json'
  ): Promise<{ cid: string; url: string }> {
    try {
      const jsonBuffer = Buffer.from(JSON.stringify(metadata, null, 2));
      const response = await this.filebase.upload(this.bucket, fileName, jsonBuffer);
      
      const cid = response.cid;
      return {
        cid,
        url: `${this.filebaseGateway}/${cid}`,
      };
    } catch (error: any) {
      throw new Error(`Filebase metadata upload failed: ${error.message}`);
    }
  }

  /**
   * Create Arweave NFT transaction
   */
  private async createArweaveNFT(
    privateKey: JWKInterface,
    metadataCid: string,
    metadata: NFTMetadata
  ): Promise<{ txId: string; url: string }> {
    const nftData = {
      ...metadata,
      ipfs: {
        metadataCid,
        gateway: `${this.filebaseGateway}/${metadataCid}`,
        storage: 'filebase',
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

    transaction.addTag('Content-Type', 'application/json');
    transaction.addTag('App-Name', 'Atomic-NFT');
    transaction.addTag('Type', 'nft-asset');
    transaction.addTag('Title', metadata.name);
    transaction.addTag('Description', metadata.description);
    transaction.addTag('IPFS-CID', metadataCid);
    transaction.addTag('Storage-Provider', 'Filebase');

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
   * Mint NFT with Filebase storage
   */
  async mintNFT(
    privateKey: JWKInterface,
    fileData: Buffer,
    fileName: string,
    metadata: Omit<NFTMetadata, 'image'>
  ): Promise<MintResult> {
    console.log('Starting NFT minting with Filebase...');

    // 1. Upload file to Filebase
    console.log('Uploading file to Filebase IPFS...');
    const fileUpload = await this.uploadFileToFilebase(fileData, fileName);
    console.log(`File uploaded: ${fileUpload.cid}`);

    // 2. Create complete metadata
    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: fileUpload.cid,
    };

    // 3. Upload metadata to Filebase
    console.log('Uploading metadata to Filebase...');
    const metadataUpload = await this.uploadMetadataToFilebase(
      completeMetadata,
      `${fileName.replace(/\.[^/.]+$/, '')}_metadata.json`
    );
    console.log(`Metadata uploaded: ${metadataUpload.cid}`);

    // 4. Create Arweave NFT
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
   * Mint media NFT with thumbnail
   */
  async mintMediaNFT(
    privateKey: JWKInterface,
    mediaData: Buffer,
    mediaFileName: string,
    thumbnailData: Buffer,
    thumbnailFileName: string,
    metadata: Omit<NFTMetadata, 'image' | 'animation_url'>
  ): Promise<MintResult> {
    console.log('Starting media NFT minting with Filebase...');

    // 1. Upload media file
    console.log('Uploading media to Filebase...');
    const mediaUpload = await this.uploadFileToFilebase(mediaData, mediaFileName);
    console.log(`Media uploaded: ${mediaUpload.cid}`);

    // 2. Upload thumbnail
    console.log('Uploading thumbnail to Filebase...');
    const thumbnailUpload = await this.uploadFileToFilebase(
      thumbnailData,
      thumbnailFileName
    );
    console.log(`Thumbnail uploaded: ${thumbnailUpload.cid}`);

    // 3. Create complete metadata
    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: thumbnailUpload.cid,
      animation_url: mediaUpload.cid,
    };

    // 4. Upload metadata
    console.log('Uploading metadata to Filebase...');
    const metadataUpload = await this.uploadMetadataToFilebase(
      completeMetadata,
      `${mediaFileName.replace(/\.[^/.]+$/, '')}_metadata.json`
    );
    console.log(`Metadata uploaded: ${metadataUpload.cid}`);

    // 5. Create Arweave NFT
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
   * List files in bucket
   */
  async listFiles(): Promise<any[]> {
    try {
      return await this.filebase.list(this.bucket);
    } catch (error: any) {
      throw new Error(`Failed to list files: ${error.message}`);
    }
  }

  /**
   * Delete file from Filebase
   */
  async deleteFile(fileName: string): Promise<void> {
    try {
      await this.filebase.delete(this.bucket, fileName);
    } catch (error: any) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }

  /**
   * Check wallet balance
   */
  async checkBalance(privateKey: JWKInterface): Promise<{
    address: string;
    balanceAR: string;
  }> {
    const address = await this.arweave.wallets.jwkToAddress(privateKey);
    const balanceWinston = await this.arweave.wallets.getBalance(address);
    const balanceAR = this.arweave.ar.winstonToAr(balanceWinston);

    return {
      address,
      balanceAR,
    };
  }
}

/**
 * USAGE EXAMPLE:
 * 
 * import { ArweaveFilebaseNFTMinter } from './AR.Arweave.filebase.nft';
 * import * as fs from 'fs';
 * 
 * const minter = new ArweaveFilebaseNFTMinter({
 *   accessKeyId: process.env.FILEBASE_ACCESS_KEY!,
 *   secretAccessKey: process.env.FILEBASE_SECRET_KEY!,
 *   bucket: 'my-nft-bucket',
 * });
 * 
 * const privateKey = JSON.parse(fs.readFileSync('wallet.json', 'utf-8'));
 * const imageData = fs.readFileSync('art.png');
 * 
 * const result = await minter.mintNFT(
 *   privateKey,
 *   imageData,
 *   'art.png',
 *   {
 *     name: "S3-Compatible NFT #1",
 *     description: "Stored on Filebase with geo-redundancy",
 *     attributes: [
 *       { trait_type: "Storage", value: "Filebase" },
 *       { trait_type: "Redundancy", value: "Multi-region" }
 *     ]
 *   }
 * );
 * 
 * console.log('NFT Minted with Filebase!');
 * console.log('IPFS:', result.ipfsUrl);
 * console.log('Arweave:', result.arweaveUrl);
 */

export default ArweaveFilebaseNFTMinter;

