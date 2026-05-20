// Arweave NFT Minting via Infura IPFS
// Enterprise-grade IPFS infrastructure by ConsenSys

/**
 * OVERVIEW:
 * 
 * Infura provides reliable, enterprise-grade IPFS infrastructure.
 * - Upload files via IPFS HTTP API
 * - Dedicated gateways available
 * - Enterprise SLA
 * - Create Arweave NFT metadata
 * 
 * BENEFITS:
 * - Enterprise reliability
 * - Dedicated support
 * - 5GB free tier
 * - Ethereum ecosystem integration
 * 
 * COSTS:
 * - Infura: 5GB free, then paid plans
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

export interface InfuraConfig {
  projectId: string;
  projectSecret: string;
  dedicatedGateway?: string; // Optional dedicated gateway URL
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

export class ArweaveInfuraNFTMinter {
  private arweave: Arweave;
  private ipfs: IPFSHTTPClient;
  private infuraGateway: string;

  constructor(
    infuraConfig: InfuraConfig,
    arweaveHost: string = 'arweave.net',
    arweavePort: number = 443,
    arweaveProtocol: string = 'https'
  ) {
    // Create auth string for Infura
    const auth = 'Basic ' + 
      Buffer.from(
        infuraConfig.projectId + ':' + infuraConfig.projectSecret
      ).toString('base64');

    // Initialize IPFS client with Infura endpoint
    this.ipfs = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        authorization: auth,
      },
    });

    this.infuraGateway = infuraConfig.dedicatedGateway || 
      `https://infura-ipfs.io/ipfs`;

    this.arweave = Arweave.init({
      host: arweaveHost,
      port: arweavePort,
      protocol: arweaveProtocol,
    });
  }

  /**
   * Upload file to Infura IPFS
   */
  private async uploadFileToInfura(
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
        url: `${this.infuraGateway}/${cid}`,
      };
    } catch (error: any) {
      throw new Error(`Infura upload failed: ${error.message}`);
    }
  }

  /**
   * Upload JSON metadata to Infura IPFS
   */
  private async uploadMetadataToInfura(
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
        url: `${this.infuraGateway}/${cid}`,
      };
    } catch (error: any) {
      throw new Error(`Infura metadata upload failed: ${error.message}`);
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
        gateway: `${this.infuraGateway}/${metadataCid}`,
        storage: 'infura',
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
    transaction.addTag('Storage-Provider', 'Infura');

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
   * Mint NFT with Infura storage
   */
  async mintNFT(
    privateKey: JWKInterface,
    fileData: Buffer,
    fileName: string,
    metadata: Omit<NFTMetadata, 'image'>
  ): Promise<MintResult> {
    console.log('Starting NFT minting with Infura...');

    // 1. Upload file to Infura
    console.log('Uploading file to Infura IPFS...');
    const fileUpload = await this.uploadFileToInfura(fileData, fileName);
    console.log(`File uploaded: ${fileUpload.cid}`);

    // 2. Create complete metadata
    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: fileUpload.cid,
    };

    // 3. Upload metadata to Infura
    console.log('Uploading metadata to Infura...');
    const metadataUpload = await this.uploadMetadataToInfura(
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
    console.log('Starting media NFT minting with Infura...');

    // 1. Upload media
    console.log('Uploading media to Infura...');
    const mediaUpload = await this.uploadFileToInfura(mediaData, mediaFileName);
    console.log(`Media uploaded: ${mediaUpload.cid}`);

    // 2. Upload thumbnail
    console.log('Uploading thumbnail to Infura...');
    const thumbnailUpload = await this.uploadFileToInfura(
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
    console.log('Uploading metadata to Infura...');
    const metadataUpload = await this.uploadMetadataToInfura(
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
   * Pin existing CID
   */
  async pinCID(cid: string): Promise<void> {
    try {
      await this.ipfs.pin.add(cid);
    } catch (error: any) {
      throw new Error(`Failed to pin CID: ${error.message}`);
    }
  }

  /**
   * Unpin CID
   */
  async unpinCID(cid: string): Promise<void> {
    try {
      await this.ipfs.pin.rm(cid);
    } catch (error: any) {
      throw new Error(`Failed to unpin CID: ${error.message}`);
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
 * import { ArweaveInfuraNFTMinter } from './AR.Arweave.infura.nft';
 * import * as fs from 'fs';
 * 
 * const minter = new ArweaveInfuraNFTMinter({
 *   projectId: process.env.INFURA_PROJECT_ID!,
 *   projectSecret: process.env.INFURA_PROJECT_SECRET!,
 *   dedicatedGateway: 'https://my-gateway.infura-ipfs.io/ipfs', // Optional
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
 *     name: "Enterprise NFT #1",
 *     description: "Stored on Infura enterprise infrastructure",
 *     attributes: [
 *       { trait_type: "Storage", value: "Infura" },
 *       { trait_type: "Reliability", value: "Enterprise" }
 *     ]
 *   }
 * );
 * 
 * console.log('NFT Minted with Infura!');
 * console.log('IPFS:', result.ipfsUrl);
 * console.log('Arweave:', result.arweaveUrl);
 * 
 * // Pin existing content
 * await minter.pinCID('QmExampleCID...');
 */

export default ArweaveInfuraNFTMinter;

