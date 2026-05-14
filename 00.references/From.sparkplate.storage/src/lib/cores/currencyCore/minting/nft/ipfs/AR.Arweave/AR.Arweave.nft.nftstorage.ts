// Arweave NFT Minting via NFT.Storage
// Free NFT-specific IPFS storage by Protocol Labs

/**
 * OVERVIEW:
 * 
 * NFT.Storage provides free, permanent NFT storage backed by Filecoin.
 * - Upload NFT assets and metadata
 * - Automatic IPFS pinning
 * - Filecoin deals for permanence
 * - Create Arweave NFT metadata
 * 
 * BENEFITS:
 * - Free storage for NFTs
 * - Filecoin redundancy
 * - NFT-specific features
 * - Protocol Labs infrastructure
 * 
 * COSTS:
 * - NFT.Storage: Free
 * - Arweave: ~0.005-0.01 AR for metadata
 * 
 * NOTE: Classic upload API was decommissioned June 30, 2024.
 * This implementation uses the current API where available.
 */

// @ts-expect-error - arweave is a runtime dependency
import Arweave from 'arweave';
// @ts-expect-error - arweave types may not be available
import { JWKInterface } from 'arweave/node/lib/wallet';
// @ts-expect-error - nft.storage is a runtime dependency
import { NFTStorage, File, Blob } from 'nft.storage';

export interface NFTStorageConfig {
  apiToken: string; // NFT.Storage API token
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

export class ArweaveNFTStorageMinter {
  private arweave: Arweave;
  private client: NFTStorage;
  private nftStorageGateway = 'https://nftstorage.link/ipfs';

  constructor(
    nftStorageConfig: NFTStorageConfig,
    arweaveHost: string = 'arweave.net',
    arweavePort: number = 443,
    arweaveProtocol: string = 'https'
  ) {
    this.client = new NFTStorage({
      token: nftStorageConfig.apiToken,
    });

    this.arweave = Arweave.init({
      host: arweaveHost,
      port: arweavePort,
      protocol: arweaveProtocol,
    });
  }

  /**
   * Upload file to NFT.Storage
   */
  private async uploadFileToNFTStorage(
    fileData: Buffer,
    fileName: string
  ): Promise<{ cid: string; url: string }> {
    try {
      // Create File object from buffer
      const file = new File([fileData], fileName, {
        type: this.getMimeType(fileName),
      });

      // Store file
      const cid = await this.client.storeBlob(new Blob([fileData]));
      
      return {
        cid,
        url: `${this.nftStorageGateway}/${cid}`,
      };
    } catch (error: any) {
      throw new Error(`NFT.Storage upload failed: ${error.message}`);
    }
  }

  /**
   * Upload complete NFT package (image + metadata) to NFT.Storage
   */
  private async storeNFT(
    imageData: Buffer,
    imageName: string,
    metadata: NFTMetadata
  ): Promise<{ imageCid: string; metadataCid: string; url: string }> {
    try {
      // Create File object
      const imageFile = new File([imageData], imageName, {
        type: this.getMimeType(imageName),
      });

      // Store NFT with metadata (uses NFT.Storage's store method)
      const nftMetadata = await this.client.store({
        name: metadata.name,
        description: metadata.description,
        image: imageFile,
        properties: {
          ...metadata.properties,
          attributes: metadata.attributes,
          external_url: metadata.external_url,
        },
      });

      // Extract CIDs from response
      const metadataCid = nftMetadata.url.replace('ipfs://', '');
      const imageCid = nftMetadata.data.image.href.replace('ipfs://', '');

      return {
        imageCid,
        metadataCid,
        url: `${this.nftStorageGateway}/${metadataCid}`,
      };
    } catch (error: any) {
      throw new Error(`NFT.Storage package upload failed: ${error.message}`);
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
        gateway: `${this.nftStorageGateway}/${metadataCid}`,
        storage: 'nft-storage',
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
    transaction.addTag('Storage-Provider', 'NFT-Storage');

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
   * Mint NFT with NFT.Storage (uses store method for complete package)
   */
  async mintNFT(
    privateKey: JWKInterface,
    fileData: Buffer,
    fileName: string,
    metadata: Omit<NFTMetadata, 'image'>
  ): Promise<MintResult> {
    console.log('Starting NFT minting with NFT.Storage...');

    // 1. Upload file and metadata together to NFT.Storage
    console.log('Uploading NFT package to NFT.Storage...');
    const nftPackage = await this.storeNFT(fileData, fileName, {
      ...metadata,
      image: '', // Will be filled by storeNFT
    } as NFTMetadata);
    console.log(`File uploaded: ${nftPackage.imageCid}`);
    console.log(`Metadata uploaded: ${nftPackage.metadataCid}`);

    // 2. Create complete metadata with CIDs
    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: nftPackage.imageCid,
    };

    // 3. Create Arweave NFT
    console.log('Creating Arweave NFT transaction...');
    const arweaveNFT = await this.createArweaveNFT(
      privateKey,
      nftPackage.metadataCid,
      completeMetadata
    );
    console.log(`Arweave NFT created: ${arweaveNFT.txId}`);

    return {
      ipfsCid: nftPackage.imageCid,
      ipfsUrl: `${this.nftStorageGateway}/${nftPackage.imageCid}`,
      metadataCid: nftPackage.metadataCid,
      metadataUrl: nftPackage.url,
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
    console.log('Starting media NFT minting with NFT.Storage...');

    // 1. Upload media file separately
    console.log('Uploading media to NFT.Storage...');
    const mediaUpload = await this.uploadFileToNFTStorage(mediaData, mediaFileName);
    console.log(`Media uploaded: ${mediaUpload.cid}`);

    // 2. Upload complete NFT with thumbnail
    console.log('Uploading NFT package with thumbnail...');
    const nftPackage = await this.storeNFT(thumbnailData, thumbnailFileName, {
      ...metadata,
      animation_url: mediaUpload.cid,
      image: '', // Will be filled by storeNFT
    } as NFTMetadata);
    console.log(`Thumbnail uploaded: ${nftPackage.imageCid}`);
    console.log(`Metadata uploaded: ${nftPackage.metadataCid}`);

    // 3. Create complete metadata
    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: nftPackage.imageCid,
      animation_url: mediaUpload.cid,
    };

    // 4. Create Arweave NFT
    console.log('Creating Arweave NFT transaction...');
    const arweaveNFT = await this.createArweaveNFT(
      privateKey,
      nftPackage.metadataCid,
      completeMetadata
    );
    console.log(`Arweave NFT created: ${arweaveNFT.txId}`);

    return {
      ipfsCid: mediaUpload.cid,
      ipfsUrl: mediaUpload.url,
      metadataCid: nftPackage.metadataCid,
      metadataUrl: nftPackage.url,
      arweaveTxId: arweaveNFT.txId,
      arweaveUrl: arweaveNFT.url,
      viewBlockUrl: `https://viewblock.io/arweave/tx/${arweaveNFT.txId}`,
    };
  }

  /**
   * Check NFT.Storage status
   */
  async checkStatus(cid: string): Promise<any> {
    try {
      return await this.client.status(cid);
    } catch (error: any) {
      throw new Error(`Failed to check status: ${error.message}`);
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
 * import { ArweaveNFTStorageMinter } from './AR.Arweave.nftstorage.nft';
 * import * as fs from 'fs';
 * 
 * const minter = new ArweaveNFTStorageMinter({
 *   apiToken: process.env.NFT_STORAGE_TOKEN!,
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
 *     name: "Free NFT Storage #1",
 *     description: "Stored on NFT.Storage with Filecoin",
 *     attributes: [
 *       { trait_type: "Storage", value: "NFT.Storage" },
 *       { trait_type: "Backup", value: "Filecoin" }
 *     ]
 *   }
 * );
 * 
 * console.log('NFT Minted with NFT.Storage!');
 * console.log('IPFS:', result.ipfsUrl);
 * console.log('Arweave:', result.arweaveUrl);
 * 
 * // Check storage status
 * const status = await minter.checkStatus(result.ipfsCid);
 * console.log('Storage status:', status);
 * 
 * NOTE: NFT.Storage Classic API was decommissioned June 30, 2024.
 * New uploads should use alternative providers like Pinata or Lighthouse.
 * This implementation works with legacy data and current API where available.
 */

export default ArweaveNFTStorageMinter;

