// Algorand NFT Minting via Infura IPFS
// Enterprise-grade IPFS infrastructure by ConsenSys

/**
 * OVERVIEW:
 * 
 * Infura provides reliable, enterprise-grade IPFS infrastructure.
 * - Upload files via IPFS HTTP API
 * - Dedicated gateways available
 * - Enterprise SLA
 * - Create Algorand ASA NFT metadata
 * 
 * BENEFITS:
 * - Enterprise reliability
 * - Dedicated support
 * - 5GB free tier
 * - Ethereum ecosystem integration
 * 
 * COSTS:
 * - Infura: 5GB free, then paid plans
 * - Algorand: ~0.001 ALGO for ASA creation + 0.1 ALGO reserve
 */

import algosdk from 'algosdk';
import { create } from 'kubo-rpc-client';
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
  image_integrity?: string;
  image_mimetype?: string;
  animation_url?: string;
  animation_url_integrity?: string;
  animation_url_mimetype?: string;
  external_url?: string;
  properties?: Record<string, any>;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

export interface MintResult {
  ipfsCid: string;
  ipfsUrl: string;
  metadataCid: string;
  metadataUrl: string;
  assetId: number;
  txId: string;
  algoExplorerUrl: string;
}

export class AlgorandInfuraNFTMinter {
  private algodClient: algosdk.Algodv2;
  private ipfs: IPFSHTTPClient;
  private infuraGateway: string;
  private network: 'mainnet' | 'testnet';

  constructor(
    infuraConfig: InfuraConfig,
    algodServer: string = 'https://mainnet-api.algonode.cloud',
    algodPort: number = 443,
    algodToken: string = '',
    network: 'mainnet' | 'testnet' = 'mainnet'
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

    this.network = network;
    this.algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
  }

  /**
   * Upload file to Infura IPFS
   */
  private async uploadFileToInfura(
    fileData: Buffer,
    fileName: string
  ): Promise<{ cid: string; url: string; hash: string }> {
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
      
      // Calculate SHA-256 hash
      const crypto = await import('crypto');
      const hash = crypto.createHash('sha256').update(fileData).digest('base64');

      return {
        cid,
        url: `${this.infuraGateway}/${cid}`,
        hash,
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
   * Create Algorand ASA NFT transaction
   */
  private async createAlgorandNFT(
    privateKeyMnemonic: string,
    metadataUrl: string,
    metadata: NFTMetadata
  ): Promise<{ assetId: number; txId: string }> {
    const account = algosdk.mnemonicToSecretKey(privateKeyMnemonic);
    
    const params = await this.algodClient.getTransactionParams().do();

    const assetCreateTxn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      from: account.addr,
      total: 1,
      decimals: 0,
      assetName: metadata.name.substring(0, 32),
      unitName: 'NFT',
      assetURL: metadataUrl.substring(0, 96),
      assetMetadataHash: undefined,
      defaultFrozen: false,
      freeze: account.addr,
      manager: account.addr,
      clawback: account.addr,
      reserve: account.addr,
      suggestedParams: params,
    });

    const signedTxn = assetCreateTxn.signTxn(account.sk);
    const { txId } = await this.algodClient.sendRawTransaction(signedTxn).do();
    const confirmedTxn = await algosdk.waitForConfirmation(this.algodClient, txId, 4);
    const assetId = confirmedTxn['asset-index'];

    return {
      assetId,
      txId,
    };
  }

  /**
   * Mint NFT with Infura storage
   */
  async mintNFT(
    privateKeyMnemonic: string,
    fileData: Buffer,
    fileName: string,
    metadata: Omit<NFTMetadata, 'image' | 'image_integrity' | 'image_mimetype'>
  ): Promise<MintResult> {
    console.log('Starting NFT minting with Infura...');

    // 1. Upload file to Infura
    console.log('Uploading file to Infura IPFS...');
    const fileUpload = await this.uploadFileToInfura(fileData, fileName);
    console.log(`File uploaded: ${fileUpload.cid}`);

    // 2. Create complete metadata (ARC-3)
    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: `ipfs://${fileUpload.cid}`,
      image_integrity: `sha256-${fileUpload.hash}`,
      image_mimetype: this.getMimeType(fileName),
    };

    // 3. Upload metadata to Infura
    console.log('Uploading metadata to Infura...');
    const metadataUpload = await this.uploadMetadataToInfura(
      completeMetadata,
      `${fileName.replace(/\.[^/.]+$/, '')}_metadata.json`
    );
    console.log(`Metadata uploaded: ${metadataUpload.cid}`);

    // 4. Create Algorand ASA NFT
    console.log('Creating Algorand ASA NFT...');
    const algorandNFT = await this.createAlgorandNFT(
      privateKeyMnemonic,
      `ipfs://${metadataUpload.cid}`,
      completeMetadata
    );
    console.log(`Algorand NFT created: Asset ID ${algorandNFT.assetId}`);

    const explorerBase = this.network === 'mainnet' 
      ? 'https://algoexplorer.io/asset' 
      : 'https://testnet.algoexplorer.io/asset';

    return {
      ipfsCid: fileUpload.cid,
      ipfsUrl: fileUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
      assetId: algorandNFT.assetId,
      txId: algorandNFT.txId,
      algoExplorerUrl: `${explorerBase}/${algorandNFT.assetId}`,
    };
  }

  /**
   * Mint media NFT with thumbnail
   */
  async mintMediaNFT(
    privateKeyMnemonic: string,
    mediaData: Buffer,
    mediaFileName: string,
    thumbnailData: Buffer,
    thumbnailFileName: string,
    metadata: Omit<NFTMetadata, 'image' | 'animation_url' | 'image_integrity' | 'image_mimetype' | 'animation_url_integrity' | 'animation_url_mimetype'>
  ): Promise<MintResult> {
    console.log('Starting media NFT minting with Infura...');

    const mediaUpload = await this.uploadFileToInfura(mediaData, mediaFileName);
    const thumbnailUpload = await this.uploadFileToInfura(thumbnailData, thumbnailFileName);

    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: `ipfs://${thumbnailUpload.cid}`,
      image_integrity: `sha256-${thumbnailUpload.hash}`,
      image_mimetype: this.getMimeType(thumbnailFileName),
      animation_url: `ipfs://${mediaUpload.cid}`,
      animation_url_integrity: `sha256-${mediaUpload.hash}`,
      animation_url_mimetype: this.getMimeType(mediaFileName),
    };

    const metadataUpload = await this.uploadMetadataToInfura(
      completeMetadata,
      `${mediaFileName.replace(/\.[^/.]+$/, '')}_metadata.json`
    );

    const algorandNFT = await this.createAlgorandNFT(
      privateKeyMnemonic,
      `ipfs://${metadataUpload.cid}`,
      completeMetadata
    );

    const explorerBase = this.network === 'mainnet' 
      ? 'https://algoexplorer.io/asset' 
      : 'https://testnet.algoexplorer.io/asset';

    return {
      ipfsCid: mediaUpload.cid,
      ipfsUrl: mediaUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
      assetId: algorandNFT.assetId,
      txId: algorandNFT.txId,
      algoExplorerUrl: `${explorerBase}/${algorandNFT.assetId}`,
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
   * Check wallet balance
   */
  async checkBalance(mnemonicOrAddress: string): Promise<{
    address: string;
    balanceAlgo: number;
  }> {
    let address: string;
    
    if (mnemonicOrAddress.split(' ').length === 25) {
      const account = algosdk.mnemonicToSecretKey(mnemonicOrAddress);
      address = account.addr;
    } else {
      address = mnemonicOrAddress;
    }

    const accountInfo = await this.algodClient.accountInformation(address).do();
    const balanceAlgo = accountInfo.amount / 1000000;

    return {
      address,
      balanceAlgo,
    };
  }
}

/**
 * USAGE EXAMPLE:
 * 
 * import { AlgorandInfuraNFTMinter } from './ALGO.Algorand.infura.nft';
 * import * as fs from 'fs';
 * 
 * const minter = new AlgorandInfuraNFTMinter({
 *   projectId: process.env.INFURA_PROJECT_ID!,
 *   projectSecret: process.env.INFURA_PROJECT_SECRET!,
 * });
 * 
 * const mnemonic = 'your 25-word algorand mnemonic here...';
 * const imageData = fs.readFileSync('art.png');
 * 
 * const result = await minter.mintNFT(
 *   mnemonic,
 *   imageData,
 *   'art.png',
 *   {
 *     name: "Enterprise NFT #1",
 *     description: "Stored on Infura enterprise infrastructure",
 *     attributes: [
 *       { trait_type: "Storage", value: "Infura" }
 *     ]
 *   }
 * );
 */

export default AlgorandInfuraNFTMinter;
