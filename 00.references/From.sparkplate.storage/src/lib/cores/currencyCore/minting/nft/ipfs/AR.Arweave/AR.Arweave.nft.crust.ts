// Arweave NFT Minting via Crust Network IPFS
// Decentralized IPFS pinning on Crust Network

/**
 * OVERVIEW:
 * 
 * Crust Network provides decentralized IPFS storage with incentivized pinning.
 * - Upload files via standard IPFS HTTP API
 * - Decentralized pinning network
 * - Token-incentivized storage
 * - Create Arweave NFT metadata
 * 
 * BENEFITS:
 * - Decentralized infrastructure
 * - Incentivized pinning
 * - Pinning Services API compatible
 * - Multiple gateway options
 * 
 * COSTS:
 * - Crust: Pay with CRU tokens
 * - Arweave: ~0.005-0.01 AR for metadata
 */

// @ts-expect-error - arweave is a runtime dependency
import Arweave from 'arweave';
// @ts-expect-error - arweave types may not be available
import { JWKInterface } from 'arweave/node/lib/wallet';
// @ts-expect-error - kubo-rpc-client is a runtime dependency
import { create } from 'kubo-rpc-client';
// @ts-expect-error - kubo types
import type { IPFSHTTPClient } from 'kubo-rpc-client';

export interface CrustConfig {
  apiEndpoint?: string; // Crust IPFS API endpoint
  authToken?: string; // Optional auth token
  gatewayUrl?: string; // Custom gateway URL
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

export class ArweaveCrustNFTMinter {
  private arweave: Arweave;
  private ipfs: IPFSHTTPClient;
  private crustGateway: string;

  constructor(
    crustConfig: CrustConfig = {},
    arweaveHost: string = 'arweave.net',
    arweavePort: number = 443,
    arweaveProtocol: string = 'https'
  ) {
    // Use Crust public IPFS gateway or custom endpoint
    const apiEndpoint = crustConfig.apiEndpoint || 'https://gw-seattle.crustcloud.io';
    
    const headers: Record<string, string> = {};
    if (crustConfig.authToken) {
      headers.authorization = `Bearer ${crustConfig.authToken}`;
    }

    // Initialize IPFS client with Crust endpoint
    this.ipfs = create({
      url: apiEndpoint,
      headers,
    });

    this.crustGateway = crustConfig.gatewayUrl || 
      'https://ipfs-gw.crust.network/ipfs';

    this.arweave = Arweave.init({
      host: arweaveHost,
      port: arweavePort,
      protocol: arweaveProtocol,
    });
  }

  /**
   * Upload file to Crust Network IPFS
   */
  private async uploadFileToCrust(
    fileData: Buffer,
    fileName: string
  ): Promise<{ cid: string; url: string }> {
    try {
      const result = await this.ipfs.add(
        {
          path: fileName,
          content: fileData,
        },
        {
          pin: true,
        }
      );

      const cid = result.cid.toString();
      return {
        cid,
        url: `${this.crustGateway}/${cid}`,
      };
    } catch (error: any) {
      throw new Error(`Crust Network upload failed: ${error.message}`);
    }
  }

  /**
   * Upload JSON metadata to Crust Network
   */
  private async uploadMetadataToCrust(
    metadata: NFTMetadata,
    fileName: string = 'metadata.json'
  ): Promise<{ cid: string; url: string }> {
    try {
      const jsonString = JSON.stringify(metadata, null, 2);
      const jsonBuffer = Buffer.from(jsonString);

      const result = await this.ipfs.add(
        {
          path: fileName,
          content: jsonBuffer,
        },
        {
          pin: true,
        }
      );

      const cid = result.cid.toString();
      return {
        cid,
        url: `${this.crustGateway}/${cid}`,
      };
    } catch (error: any) {
      throw new Error(`Crust metadata upload failed: ${error.message}`);
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
        gateway: `${this.crustGateway}/${metadataCid}`,
        storage: 'crust-network',
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
    transaction.addTag('Storage-Provider', 'Crust-Network');

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
   * Mint NFT with Crust Network storage
   */
  async mintNFT(
    privateKey: JWKInterface,
    fileData: Buffer,
    fileName: string,
    metadata: Omit<NFTMetadata, 'image'>
  ): Promise<MintResult> {
    console.log('Starting NFT minting with Crust Network...');

    // 1. Upload file to Crust
    console.log('Uploading file to Crust Network...');
    const fileUpload = await this.uploadFileToCrust(fileData, fileName);
    console.log(`File uploaded: ${fileUpload.cid}`);

    // 2. Create complete metadata
    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: fileUpload.cid,
    };

    // 3. Upload metadata to Crust
    console.log('Uploading metadata to Crust Network...');
    const metadataUpload = await this.uploadMetadataToCrust(
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
    console.log('Starting media NFT minting with Crust Network...');

    // 1. Upload media
    console.log('Uploading media to Crust...');
    const mediaUpload = await this.uploadFileToCrust(mediaData, mediaFileName);
    console.log(`Media uploaded: ${mediaUpload.cid}`);

    // 2. Upload thumbnail
    console.log('Uploading thumbnail to Crust...');
    const thumbnailUpload = await this.uploadFileToCrust(
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
    console.log('Uploading metadata to Crust...');
    const metadataUpload = await this.uploadMetadataToCrust(
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
   * Pin existing CID on Crust Network
   */
  async pinCID(cid: string): Promise<void> {
    try {
      await this.ipfs.pin.add(cid);
    } catch (error: any) {
      throw new Error(`Failed to pin CID on Crust: ${error.message}`);
    }
  }

  /**
   * Unpin CID from Crust Network
   */
  async unpinCID(cid: string): Promise<void> {
    try {
      await this.ipfs.pin.rm(cid);
    } catch (error: any) {
      throw new Error(`Failed to unpin CID from Crust: ${error.message}`);
    }
  }

  /**
   * List pinned CIDs
   */
  async listPins(): Promise<string[]> {
    try {
      const pins: string[] = [];
      for await (const pin of this.ipfs.pin.ls()) {
        pins.push(pin.cid.toString());
      }
      return pins;
    } catch (error: any) {
      throw new Error(`Failed to list pins: ${error.message}`);
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
 * import { ArweaveCrustNFTMinter } from './AR.Arweave.crust.nft';
 * import * as fs from 'fs';
 * 
 * const minter = new ArweaveCrustNFTMinter({
 *   apiEndpoint: 'https://gw-seattle.crustcloud.io', // Optional
 *   gatewayUrl: 'https://ipfs-gw.crust.network/ipfs', // Optional
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
 *     name: "Decentralized NFT #1",
 *     description: "Stored on Crust Network",
 *     attributes: [
 *       { trait_type: "Storage", value: "Crust Network" },
 *       { trait_type: "Type", value: "Decentralized" }
 *     ]
 *   }
 * );
 * 
 * console.log('NFT Minted with Crust Network!');
 * console.log('IPFS:', result.ipfsUrl);
 * console.log('Arweave:', result.arweaveUrl);
 * 
 * // Pin existing content
 * await minter.pinCID('QmExampleCID...');
 * 
 * // List all pins
 * const pins = await minter.listPins();
 * console.log('Pinned CIDs:', pins);
 */

export default ArweaveCrustNFTMinter;

