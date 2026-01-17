// Tron NFT Minting via Filebase IPFS

import TronWeb from 'tronweb';
import AWS from 'aws-sdk';

export interface FilebaseConfig { accessKeyId: string; secretAccessKey: string; bucket: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; tokenId: string; contractAddress: string; txId: string; explorerUrl: string }

export class TronFilebaseNFTMinter {
  private s3: AWS.S3;
  private filebaseConfig: FilebaseConfig;
  private filebaseGateway = 'https://ipfs.filebase.io/ipfs';
  private tronWeb: TronWeb;
  private network: 'mainnet' | 'shasta' | 'nile';

  constructor(filebaseConfig: FilebaseConfig, fullNode: string = 'https://api.trongrid.io', network: 'mainnet' | 'shasta' | 'nile' = 'mainnet') {
    this.filebaseConfig = filebaseConfig;
    this.tronWeb = new TronWeb({ fullHost: fullNode });
    this.network = network;
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

  private async mintTronNFT(privateKey: string, contractAddress: string, metadataUrl: string, tokenId: string): Promise<{ txId: string }> {
    this.tronWeb.setPrivateKey(privateKey);
    const contract = await this.tronWeb.contract().at(contractAddress);
    const tx = await contract.mint(this.tronWeb.address.fromPrivateKey(privateKey), tokenId, metadataUrl).send({ feeLimit: 1000000000, callValue: 0, shouldPollResponse: true });
    return { txId: tx };
  }

  async mintNFT(privateKey: string, contractAddress: string, fileData: Buffer, fileName: string, metadata: Omit<NFTMetadata, 'image'>, tokenId: string): Promise<MintResult> {
    const fileUpload = await this.uploadFileToFilebase(fileData, fileName);
    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${fileUpload.cid}` };
    const metadataUpload = await this.uploadJSONToFilebase(completeMetadata, `${fileName.replace(/\.[^/.]+$/, '')}_metadata.json`);
    const tronNFT = await this.mintTronNFT(privateKey, contractAddress, `ipfs://${metadataUpload.cid}`, tokenId);
    const explorerBase = this.network === 'mainnet' ? 'https://tronscan.org/#/transaction' : `https://${this.network}.tronscan.org/#/transaction`;
    return { ipfsCid: fileUpload.cid, ipfsUrl: fileUpload.url, metadataCid: metadataUpload.cid, metadataUrl: metadataUpload.url, tokenId, contractAddress, txId: tronNFT.txId, explorerUrl: `${explorerBase}/${tronNFT.txId}` };
  }

  async checkBalance(privateKeyOrAddress: string): Promise<{ address: string; balanceTrx: string }> {
    let address: string;
    if (privateKeyOrAddress.length === 64 || (privateKeyOrAddress.startsWith('0x') && privateKeyOrAddress.length === 66)) {
      const key = privateKeyOrAddress.startsWith('0x') ? privateKeyOrAddress.slice(2) : privateKeyOrAddress;
      address = this.tronWeb.address.fromPrivateKey(key);
    } else {
      address = privateKeyOrAddress;
    }
    const balance = await this.tronWeb.trx.getBalance(address);
    return { address, balanceTrx: (balance / 1000000).toString() };
  }
}

export default TronFilebaseNFTMinter;
