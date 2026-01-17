// Algorand NFT Minting via Filebase IPFS
// S3-compatible IPFS storage with multi-region redundancy

/**
 * OVERVIEW:
 * 
 * Filebase provides S3-compatible IPFS storage with geographic redundancy.
 * - S3-compatible API (use AWS SDK)
 * - Multi-region redundancy
 * - 5GB free tier
 * - Create Algorand ASA NFT metadata
 * 
 * BENEFITS:
 * - Familiar S3 API
 * - Geographic redundancy
 * - Multiple storage backends
 * - Free tier available
 * 
 * COSTS:
 * - Filebase: 5GB free, then paid plans
 * - Algorand: ~0.001 ALGO for ASA creation + 0.1 ALGO reserve
 */

import algosdk from 'algosdk';
import AWS from 'aws-sdk';

export interface FilebaseConfig {
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image?: string;
  image_integrity?: string;
  image_mimetype?: string;
  animation_url?: string;
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

export class AlgorandFilebaseNFTMinter {
  private algodClient: algosdk.Algodv2;
  private s3: AWS.S3;
  private filebaseConfig: FilebaseConfig;
  private filebaseGateway = 'https://ipfs.filebase.io/ipfs';
  private network: 'mainnet' | 'testnet';

  constructor(
    filebaseConfig: FilebaseConfig,
    algodServer: string = 'https://mainnet-api.algonode.cloud',
    algodPort: number = 443,
    algodToken: string = '',
    network: 'mainnet' | 'testnet' = 'mainnet'
  ) {
    this.filebaseConfig = filebaseConfig;
    this.network = network;

    // Initialize S3 client for Filebase
    this.s3 = new AWS.S3({
      accessKeyId: filebaseConfig.accessKeyId,
      secretAccessKey: filebaseConfig.secretAccessKey,
      endpoint: 'https://s3.filebase.com',
      region: 'us-east-1',
      s3ForcePathStyle: true,
      signatureVersion: 'v4',
    });

    this.algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
  }

  private async uploadFileToFilebase(
    fileData: Buffer,
    fileName: string
  ): Promise<{ cid: string; url: string; hash: string }> {
    try {
      const params = {
        Bucket: this.filebaseConfig.bucket,
        Key: fileName,
        Body: fileData,
        ContentType: this.getMimeType(fileName),
      };

      await this.s3.putObject(params).promise();

      // Get CID from object metadata
      const headObject = await this.s3.headObject({
        Bucket: this.filebaseConfig.bucket,
        Key: fileName,
      }).promise();

      const cid = headObject.Metadata?.['ipfs-cid'] || headObject.Metadata?.cid || '';
      
      if (!cid) {
        throw new Error('CID not found in object metadata');
      }

      const crypto = await import('crypto');
      const hash = crypto.createHash('sha256').update(fileData).digest('base64');

      return {
        cid,
        url: `${this.filebaseGateway}/${cid}`,
        hash,
      };
    } catch (error: any) {
      throw new Error(`Filebase upload failed: ${error.message}`);
    }
  }

  private async uploadJSONToFilebase(
    metadata: NFTMetadata,
    fileName: string
  ): Promise<{ cid: string; url: string }> {
    try {
      const jsonString = JSON.stringify(metadata, null, 2);
      const jsonBuffer = Buffer.from(jsonString);

      const params = {
        Bucket: this.filebaseConfig.bucket,
        Key: fileName,
        Body: jsonBuffer,
        ContentType: 'application/json',
      };

      await this.s3.putObject(params).promise();

      const headObject = await this.s3.headObject({
        Bucket: this.filebaseConfig.bucket,
        Key: fileName,
      }).promise();

      const cid = headObject.Metadata?.['ipfs-cid'] || headObject.Metadata?.cid || '';

      return {
        cid,
        url: `${this.filebaseGateway}/${cid}`,
      };
    } catch (error: any) {
      throw new Error(`Filebase metadata upload failed: ${error.message}`);
    }
  }

  private getMimeType(fileName: string): string {
    const ext = fileName.split('.').pop()?.toLowerCase();
    const mimeTypes: Record<string, string> = {
      'png': 'image/png',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'gif': 'image/gif',
      'webp': 'image/webp',
      'mp4': 'video/mp4',
      'mp3': 'audio/mpeg',
    };
    return mimeTypes[ext || ''] || 'application/octet-stream';
  }

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

    return { assetId, txId };
  }

  async mintNFT(
    privateKeyMnemonic: string,
    fileData: Buffer,
    fileName: string,
    metadata: Omit<NFTMetadata, 'image' | 'image_integrity' | 'image_mimetype'>
  ): Promise<MintResult> {
    console.log('Starting NFT minting with Filebase...');

    const fileUpload = await this.uploadFileToFilebase(fileData, fileName);
    console.log(`File uploaded: ${fileUpload.cid}`);

    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: `ipfs://${fileUpload.cid}`,
      image_integrity: `sha256-${fileUpload.hash}`,
      image_mimetype: this.getMimeType(fileName),
    };

    const metadataUpload = await this.uploadJSONToFilebase(
      completeMetadata,
      `${fileName.replace(/\.[^/.]+$/, '')}_metadata.json`
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
      ipfsCid: fileUpload.cid,
      ipfsUrl: fileUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
      assetId: algorandNFT.assetId,
      txId: algorandNFT.txId,
      algoExplorerUrl: `${explorerBase}/${algorandNFT.assetId}`,
    };
  }

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
    return {
      address,
      balanceAlgo: accountInfo.amount / 1000000,
    };
  }
}

export default AlgorandFilebaseNFTMinter;
