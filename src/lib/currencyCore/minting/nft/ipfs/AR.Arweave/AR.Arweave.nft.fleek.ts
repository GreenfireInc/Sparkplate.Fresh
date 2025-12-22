// Arweave NFT Minting via Fleek IPFS
// Web3 infrastructure platform with IPFS storage

/**
 * OVERVIEW:
 * 
 * Fleek provides Web3 infrastructure including IPFS storage and CDN.
 * - Upload files via Fleek SDK
 * - Automatic CDN distribution
 * - IPFS pinning
 * - Create Arweave NFT metadata
 * 
 * BENEFITS:
 * - Web3 CDN integration
 * - Fast global delivery
 * - Developer-friendly SDK
 * - Integrated hosting platform
 * 
 * COSTS:
 * - Fleek: Free tier available
 * - Arweave: ~0.005-0.01 AR for metadata
 */

// @ts-expect-error - arweave is a runtime dependency
import Arweave from 'arweave';
// @ts-expect-error - arweave types may not be available
import { JWKInterface } from 'arweave/node/lib/wallet';
// @ts-expect-error - fleek-platform/sdk is a runtime dependency
import { FleekSdk } from '@fleek-platform/sdk';

export interface FleekConfig {
  accessToken: string; // Fleek access token
  projectId?: string; // Optional project ID
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

export class ArweaveFleekNFTMinter {
  private arweave: Arweave;
  private fleek: FleekSdk;
  private fleekGateway = 'https://ipfs.fleek.co/ipfs';

  constructor(
    fleekConfig: FleekConfig,
    arweaveHost: string = 'arweave.net',
    arweavePort: number = 443,
    arweaveProtocol: string = 'https'
  ) {
    this.fleek = new FleekSdk({
      accessToken: fleekConfig.accessToken,
    });

    this.arweave = Arweave.init({
      host: arweaveHost,
      port: arweavePort,
      protocol: arweaveProtocol,
    });
  }

  /**
   * Upload file to Fleek IPFS
   */
  private async uploadFileToFleek(
    fileData: Buffer,
    fileName: string
  ): Promise<{ cid: string; url: string }> {
    try {
      const result = await this.fleek.ipfs().add({
        path: fileName,
        content: fileData,
      });

      const cid = result.cid;
      return {
        cid,
        url: `${this.fleekGateway}/${cid}`,
      };
    } catch (error: any) {
      throw new Error(`Fleek upload failed: ${error.message}`);
    }
  }

  /**
   * Upload JSON metadata to Fleek
   */
  private async uploadMetadataToFleek(
    metadata: NFTMetadata,
    fileName: string = 'metadata.json'
  ): Promise<{ cid: string; url: string }> {
    try {
      const jsonString = JSON.stringify(metadata, null, 2);
      const jsonBuffer = Buffer.from(jsonString);

      const result = await this.fleek.ipfs().add({
        path: fileName,
        content: jsonBuffer,
      });

      const cid = result.cid;
      return {
        cid,
        url: `${this.fleekGateway}/${cid}`,
      };
    } catch (error: any) {
      throw new Error(`Fleek metadata upload failed: ${error.message}`);
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
        gateway: `${this.fleekGateway}/${metadataCid}`,
        storage: 'fleek',
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
    transaction.addTag('Storage-Provider', 'Fleek');

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
   * Mint NFT with Fleek storage
   */
  async mintNFT(
    privateKey: JWKInterface,
    fileData: Buffer,
    fileName: string,
    metadata: Omit<NFTMetadata, 'image'>
  ): Promise<MintResult> {
    console.log('Starting NFT minting with Fleek...');

    // 1. Upload file to Fleek
    console.log('Uploading file to Fleek IPFS...');
    const fileUpload = await this.uploadFileToFleek(fileData, fileName);
    console.log(`File uploaded: ${fileUpload.cid}`);

    // 2. Create complete metadata
    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: fileUpload.cid,
    };

    // 3. Upload metadata to Fleek
    console.log('Uploading metadata to Fleek...');
    const metadataUpload = await this.uploadMetadataToFleek(
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
    console.log('Starting media NFT minting with Fleek...');

    // 1. Upload media
    console.log('Uploading media to Fleek...');
    const mediaUpload = await this.uploadFileToFleek(mediaData, mediaFileName);
    console.log(`Media uploaded: ${mediaUpload.cid}`);

    // 2. Upload thumbnail
    console.log('Uploading thumbnail to Fleek...');
    const thumbnailUpload = await this.uploadFileToFleek(
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
    console.log('Uploading metadata to Fleek...');
    const metadataUpload = await this.uploadMetadataToFleek(
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
   * Get storage usage
   */
  async getStorageUsage(): Promise<any> {
    try {
      return await this.fleek.storage().getUsage();
    } catch (error: any) {
      throw new Error(`Failed to get storage usage: ${error.message}`);
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
 * import { ArweaveFleekNFTMinter } from './AR.Arweave.fleek.nft';
 * import * as fs from 'fs';
 * 
 * const minter = new ArweaveFleekNFTMinter({
 *   accessToken: process.env.FLEEK_ACCESS_TOKEN!,
 *   projectId: process.env.FLEEK_PROJECT_ID,
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
 *     name: "Web3 CDN NFT #1",
 *     description: "Stored on Fleek with global CDN",
 *     attributes: [
 *       { trait_type: "Storage", value: "Fleek" },
 *       { trait_type: "CDN", value: "Global" }
 *     ]
 *   }
 * );
 * 
 * console.log('NFT Minted with Fleek!');
 * console.log('IPFS:', result.ipfsUrl);
 * console.log('Arweave:', result.arweaveUrl);
 * 
 * // Check storage usage
 * const usage = await minter.getStorageUsage();
 * console.log('Storage used:', usage);
 */

export default ArweaveFleekNFTMinter;

