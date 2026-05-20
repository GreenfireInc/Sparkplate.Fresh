// Arweave NFT Minting via Storacha (web3.storage)
// Free decentralized storage with UCAN-based authentication

/**
 * OVERVIEW:
 * 
 * Storacha (formerly web3.storage) provides free IPFS/Filecoin storage.
 * - Upload files to IPFS via Storacha
 * - Automatic Filecoin backup
 * - UCAN-based authentication
 * - Create Arweave NFT metadata
 * 
 * BENEFITS:
 * - Free storage (5GB+)
 * - Filecoin redundancy
 * - No API keys (UCAN auth)
 * - Web3-native authentication
 * 
 * COSTS:
 * - Storacha: Free
 * - Arweave: ~0.005-0.01 AR for metadata
 */

// @ts-expect-error - arweave is a runtime dependency
import Arweave from 'arweave';
// @ts-expect-error - arweave types may not be available
import { JWKInterface } from 'arweave/node/lib/wallet';
// @ts-expect-error - storacha/client is a runtime dependency
import { create } from '@storacha/client';
// @ts-expect-error - storacha types
import type { Client } from '@storacha/client';

export interface StorachaConfig {
  email?: string; // For email-based authentication
  principal?: any; // UCAN principal
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

export class ArweaveStorachaNFTMinter {
  private arweave: Arweave;
  private client: Client;
  private storachaGateway = 'https://w3s.link/ipfs';

  constructor(
    storachaConfig: StorachaConfig,
    arweaveHost: string = 'arweave.net',
    arweavePort: number = 443,
    arweaveProtocol: string = 'https'
  ) {
    this.client = create();
    
    // Initialize with email or principal
    if (storachaConfig.email) {
      // Email-based login would be handled separately
      // this.client.login(storachaConfig.email)
    }

    this.arweave = Arweave.init({
      host: arweaveHost,
      port: arweavePort,
      protocol: arweaveProtocol,
    });
  }

  /**
   * Upload file to Storacha
   */
  private async uploadFileToStoracha(
    fileData: Buffer,
    fileName: string
  ): Promise<{ cid: string; url: string }> {
    try {
      // Create File object from buffer
      const file = new File([fileData], fileName, {
        type: this.getMimeType(fileName),
      });

      // Upload to Storacha
      const cid = await this.client.uploadFile(file);
      
      return {
        cid: cid.toString(),
        url: `${this.storachaGateway}/${cid.toString()}`,
      };
    } catch (error: any) {
      throw new Error(`Storacha upload failed: ${error.message}`);
    }
  }

  /**
   * Upload JSON metadata to Storacha
   */
  private async uploadMetadataToStoracha(
    metadata: NFTMetadata,
    fileName: string = 'metadata.json'
  ): Promise<{ cid: string; url: string }> {
    try {
      const jsonString = JSON.stringify(metadata, null, 2);
      const jsonBlob = new Blob([jsonString], { type: 'application/json' });
      const file = new File([jsonBlob], fileName, { type: 'application/json' });

      const cid = await this.client.uploadFile(file);
      
      return {
        cid: cid.toString(),
        url: `${this.storachaGateway}/${cid.toString()}`,
      };
    } catch (error: any) {
      throw new Error(`Storacha metadata upload failed: ${error.message}`);
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
        gateway: `${this.storachaGateway}/${metadataCid}`,
        storage: 'storacha',
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
    transaction.addTag('Storage-Provider', 'Storacha');

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
   * Mint NFT with Storacha storage
   */
  async mintNFT(
    privateKey: JWKInterface,
    fileData: Buffer,
    fileName: string,
    metadata: Omit<NFTMetadata, 'image'>
  ): Promise<MintResult> {
    console.log('Starting NFT minting with Storacha...');

    // 1. Upload file to Storacha
    console.log('Uploading file to Storacha...');
    const fileUpload = await this.uploadFileToStoracha(fileData, fileName);
    console.log(`File uploaded: ${fileUpload.cid}`);

    // 2. Create complete metadata
    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: fileUpload.cid,
    };

    // 3. Upload metadata to Storacha
    console.log('Uploading metadata to Storacha...');
    const metadataUpload = await this.uploadMetadataToStoracha(
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
    console.log('Starting media NFT minting with Storacha...');

    // 1. Upload media
    console.log('Uploading media to Storacha...');
    const mediaUpload = await this.uploadFileToStoracha(mediaData, mediaFileName);
    console.log(`Media uploaded: ${mediaUpload.cid}`);

    // 2. Upload thumbnail
    console.log('Uploading thumbnail to Storacha...');
    const thumbnailUpload = await this.uploadFileToStoracha(
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
    console.log('Uploading metadata to Storacha...');
    const metadataUpload = await this.uploadMetadataToStoracha(
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
 * import { ArweaveStorachaNFTMinter } from './AR.Arweave.storacha.nft';
 * import * as fs from 'fs';
 * 
 * const minter = new ArweaveStorachaNFTMinter({
 *   email: '[email protected]', // Optional
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
 *     name: "Free Storage NFT #1",
 *     description: "Stored on Storacha with Filecoin backup",
 *     attributes: [
 *       { trait_type: "Storage", value: "Storacha" },
 *       { trait_type: "Cost", value: "Free" }
 *     ]
 *   }
 * );
 * 
 * console.log('NFT Minted with Storacha!');
 * console.log('IPFS:', result.ipfsUrl);
 * console.log('Arweave:', result.arweaveUrl);
 */

export default ArweaveStorachaNFTMinter;

