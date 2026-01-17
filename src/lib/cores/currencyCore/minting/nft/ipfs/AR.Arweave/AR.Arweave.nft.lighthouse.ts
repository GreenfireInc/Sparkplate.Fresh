// Arweave NFT Minting via Lighthouse IPFS
// Uploads files to Lighthouse Storage, then creates Arweave NFT metadata

/**
 * OVERVIEW:
 * 
 * Lighthouse provides encrypted, permanent storage with IPFS and Filecoin.
 * - Upload to IPFS via Lighthouse with optional encryption
 * - Files automatically backed up to Filecoin
 * - Create Arweave NFT metadata referencing IPFS CID
 * - Support for PoDSI (Proof of Data Segment Inclusion)
 * 
 * BENEFITS:
 * - Encrypted storage available
 * - Filecoin backup for redundancy
 * - Fast IPFS retrieval
 * - Verifiable data integrity (PoDSI)
 * 
 * COSTS:
 * - Lighthouse: Pay-as-you-go pricing
 * - Arweave: ~0.005-0.01 AR for metadata
 */

// @ts-expect-error - arweave is a runtime dependency
import Arweave from 'arweave';
// @ts-expect-error - arweave types may not be available
import { JWKInterface } from 'arweave/node/lib/wallet';
// @ts-expect-error - lighthouse-web3/sdk is a runtime dependency
import lighthouse from '@lighthouse-web3/sdk';

export interface LighthouseConfig {
  apiKey: string; // Lighthouse API token
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
  dealInfo?: {
    dealId?: string;
    storageProviders?: string[];
  };
}

export class ArweaveLighthouseNFTMinter {
  private arweave: Arweave;
  private apiKey: string;
  private lighthouseGateway = 'https://gateway.lighthouse.storage/ipfs';

  constructor(
    lighthouseConfig: LighthouseConfig,
    arweaveHost: string = 'arweave.net',
    arweavePort: number = 443,
    arweaveProtocol: string = 'https'
  ) {
    this.apiKey = lighthouseConfig.apiKey;
    this.arweave = Arweave.init({
      host: arweaveHost,
      port: arweavePort,
      protocol: arweaveProtocol,
    });
  }

  /**
   * Upload file to Lighthouse
   */
  private async uploadFileToLighthouse(
    fileData: Buffer,
    fileName: string
  ): Promise<{ cid: string; url: string }> {
    try {
      // Lighthouse expects file path or buffer
      // Using buffer upload
      const response = await lighthouse.upload(fileData, this.apiKey, fileName);
      
      const cid = response.data.Hash;
      return {
        cid,
        url: `${this.lighthouseGateway}/${cid}`,
      };
    } catch (error: any) {
      throw new Error(`Lighthouse upload failed: ${error.message}`);
    }
  }

  /**
   * Upload JSON to Lighthouse
   */
  private async uploadJsonToLighthouse(
    metadata: NFTMetadata,
    fileName: string = 'metadata.json'
  ): Promise<{ cid: string; url: string }> {
    try {
      const jsonBuffer = Buffer.from(JSON.stringify(metadata, null, 2));
      const response = await lighthouse.upload(jsonBuffer, this.apiKey, fileName);
      
      const cid = response.data.Hash;
      return {
        cid,
        url: `${this.lighthouseGateway}/${cid}`,
      };
    } catch (error: any) {
      throw new Error(`Lighthouse metadata upload failed: ${error.message}`);
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
        gateway: `${this.lighthouseGateway}/${metadataCid}`,
        storage: 'lighthouse',
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
    transaction.addTag('Storage-Provider', 'Lighthouse');

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
   * Mint NFT with Lighthouse storage
   */
  async mintNFT(
    privateKey: JWKInterface,
    fileData: Buffer,
    fileName: string,
    metadata: Omit<NFTMetadata, 'image'>
  ): Promise<MintResult> {
    console.log('Starting NFT minting with Lighthouse...');

    // 1. Upload file to Lighthouse
    console.log('Uploading file to Lighthouse...');
    const fileUpload = await this.uploadFileToLighthouse(fileData, fileName);
    console.log(`File uploaded: ${fileUpload.cid}`);

    // 2. Create complete metadata
    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: fileUpload.cid,
    };

    // 3. Upload metadata to Lighthouse
    console.log('Uploading metadata to Lighthouse...');
    const metadataUpload = await this.uploadJsonToLighthouse(
      completeMetadata,
      `${metadata.name.replace(/\s+/g, '_')}_metadata.json`
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
   * Mint media NFT (video/audio) with thumbnail
   */
  async mintMediaNFT(
    privateKey: JWKInterface,
    mediaData: Buffer,
    mediaFileName: string,
    thumbnailData: Buffer,
    thumbnailFileName: string,
    metadata: Omit<NFTMetadata, 'image' | 'animation_url'>
  ): Promise<MintResult> {
    console.log('Starting media NFT minting with Lighthouse...');

    // 1. Upload media file
    console.log('Uploading media file to Lighthouse...');
    const mediaUpload = await this.uploadFileToLighthouse(mediaData, mediaFileName);
    console.log(`Media uploaded: ${mediaUpload.cid}`);

    // 2. Upload thumbnail
    console.log('Uploading thumbnail to Lighthouse...');
    const thumbnailUpload = await this.uploadFileToLighthouse(
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
    console.log('Uploading metadata to Lighthouse...');
    const metadataUpload = await this.uploadJsonToLighthouse(
      completeMetadata,
      `${metadata.name.replace(/\s+/g, '_')}_metadata.json`
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
   * Upload encrypted file to Lighthouse
   */
  async uploadEncryptedFile(
    fileData: Buffer,
    fileName: string,
    publicKey: string
  ): Promise<{ cid: string; url: string }> {
    try {
      const response = await lighthouse.uploadEncrypted(
        fileData,
        this.apiKey,
        publicKey,
        fileName
      );
      
      const cid = response.data.Hash;
      return {
        cid,
        url: `${this.lighthouseGateway}/${cid}`,
      };
    } catch (error: any) {
      throw new Error(`Lighthouse encrypted upload failed: ${error.message}`);
    }
  }

  /**
   * Get upload stats
   */
  async getUploadStats(): Promise<any> {
    try {
      return await lighthouse.getUploads(this.apiKey);
    } catch (error: any) {
      throw new Error(`Failed to get upload stats: ${error.message}`);
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
 * USAGE EXAMPLES:
 * 
 * import { ArweaveLighthouseNFTMinter } from './AR.Arweave.lighthouse.nft';
 * import * as fs from 'fs';
 * 
 * const minter = new ArweaveLighthouseNFTMinter({
 *   apiKey: process.env.LIGHTHOUSE_API_KEY!,
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
 *     name: "Digital Masterpiece #1",
 *     description: "A stunning digital artwork",
 *     attributes: [
 *       { trait_type: "Style", value: "Abstract" },
 *       { trait_type: "Year", value: 2025 }
 *     ]
 *   }
 * );
 * 
 * console.log('NFT Minted with Lighthouse!');
 * console.log('IPFS:', result.ipfsUrl);
 * console.log('Arweave:', result.arweaveUrl);
 * 
 * // Encrypted NFT (private content)
 * const publicKey = "0x..."; // Encryption public key
 * const encryptedUpload = await minter.uploadEncryptedFile(
 *   imageData,
 *   'private-art.png',
 *   publicKey
 * );
 * 
 * console.log('Encrypted file CID:', encryptedUpload.cid);
 */

export default ArweaveLighthouseNFTMinter;

