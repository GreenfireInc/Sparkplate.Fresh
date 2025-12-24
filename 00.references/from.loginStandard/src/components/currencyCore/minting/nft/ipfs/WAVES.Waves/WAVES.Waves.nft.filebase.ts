// Waves NFT Minting via Filebase IPFS

import { issue, broadcast } from '@waves/waves-transactions';
import { publicKey } from '@waves/ts-lib-crypto';
import AWS from 'aws-sdk';

export interface FilebaseConfig { accessKeyId: string; secretAccessKey: string; bucket: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; assetId: string; txId: string; explorerUrl: string }

export class WavesFilebaseNFTMinter {
  private s3: AWS.S3;
  private filebaseConfig: FilebaseConfig;
  private filebaseGateway = 'https://ipfs.filebase.io/ipfs';
  private nodeUrl: string;
  private chainId: 'W' | 'T';

  constructor(filebaseConfig: FilebaseConfig, nodeUrl: string = 'https://nodes.wavesnodes.com', chainId: 'W' | 'T' = 'W') {
    this.filebaseConfig = filebaseConfig;
    this.nodeUrl = nodeUrl;
    this.chainId = chainId;
    this.s3 = new AWS.S3({ accessKeyId: filebaseConfig.accessKeyId, secretAccessKey: filebaseConfig.secretAccessKey, endpoint: 'https://s3.filebase.com', region: 'us-east-1', s3ForcePathStyle: true, signatureVersion: 'v4' });
  }

  private getMimeType(fileName: string): string {
    const ext = fileName.split('.').pop()?.toLowerCase();
    const mimeTypes: Record<string, string> = { 'png': 'image/png', 'jpg': 'image/jpeg', 'gif': 'image/gif', 'webp': 'image/webp', 'mp4': 'video/mp4', 'mp3': 'audio/mpeg' };
    return mimeTypes[ext || ''] || 'application/octet-stream';
  }

  private async uploadFileToFilebase(fileData: Buffer, fileName: string): Promise<{ cid: string; url: string }> {
    await this.s3.putObject({ Bucket: this.filebaseConfig.bucket, Key: fileName, Body: fileData, ContentType: this.getMimeType(fileName) }).promise();
    const headObject = await this.s3.headObject({ Bucket: this.filebaseConfig.bucket, Key: fileName }).promise();
    const cid = headObject.Metadata?.['ipfs-cid'] || headObject.Metadata?.cid || '';
    return { cid, url: `${this.filebaseGateway}/${cid}` };
  }

  private async uploadJSONToFilebase(metadata: NFTMetadata, fileName: string): Promise<{ cid: string; url: string }> {
    const jsonBuffer = Buffer.from(JSON.stringify(metadata, null, 2));
    await this.s3.putObject({ Bucket: this.filebaseConfig.bucket, Key: fileName, Body: jsonBuffer, ContentType: 'application/json' }).promise();
    const headObject = await this.s3.headObject({ Bucket: this.filebaseConfig.bucket, Key: fileName }).promise();
    const cid = headObject.Metadata?.['ipfs-cid'] || headObject.Metadata?.cid || '';
    return { cid, url: `${this.filebaseGateway}/${cid}` };
  }

  private async mintWavesNFT(seed: string, metadataUrl: string, metadata: NFTMetadata): Promise<{ assetId: string; txId: string }> {
    const issueTx = issue({
      name: metadata.name.substring(0, 16),
      description: `${metadata.description.substring(0, 900)} | ${metadataUrl}`,
      quantity: 1,
      decimals: 0,
      reissuable: false,
      chainId: this.chainId,
    }, seed);

    const response = await broadcast(issueTx, this.nodeUrl);
    return { assetId: response.id, txId: response.id };
  }

  async mintNFT(seed: string, fileData: Buffer, metadata: Omit<NFTMetadata, 'image'>, fileName: string = 'nft-asset'): Promise<MintResult> {
    console.log('Starting Waves NFT minting process...');
    const fileUpload = await this.uploadFileToFilebase(fileData, fileName);
    console.log(`File uploaded: ${fileUpload.cid}`);

    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${fileUpload.cid}` };
    const metadataUpload = await this.uploadJSONToFilebase(completeMetadata, `${fileName.replace(/\.[^/.]+$/, '')}_metadata.json`);
    console.log(`Metadata uploaded: ${metadataUpload.cid}`);

    const wavesNFT = await this.mintWavesNFT(seed, `ipfs://${metadataUpload.cid}`, completeMetadata);
    console.log(`Waves NFT minted: Asset ID ${wavesNFT.assetId}`);

    const explorerBase = this.chainId === 'W' ? 'https://wavesexplorer.com/tx' : 'https://wavesexplorer.com/testnet/tx';

    return {
      ipfsCid: fileUpload.cid,
      ipfsUrl: fileUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
      assetId: wavesNFT.assetId,
      txId: wavesNFT.txId,
      explorerUrl: `${explorerBase}/${wavesNFT.txId}`,
    };
  }

  async checkBalance(seedOrAddress: string): Promise<{ address: string; balanceWaves: string }> {
    let address: string;
    if (seedOrAddress.split(' ').length === 15) {
      address = publicKey(seedOrAddress);
    } else {
      address = seedOrAddress;
    }

    const axios = require('axios');
    const response = await axios.get(`${this.nodeUrl}/addresses/balance/${address}`);
    const balanceWaves = (response.data.balance / 100000000).toString();

    return { address, balanceWaves };
  }
}

export default WavesFilebaseNFTMinter;

