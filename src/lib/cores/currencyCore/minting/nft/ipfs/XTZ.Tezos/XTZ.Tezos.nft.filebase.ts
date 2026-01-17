// Tezos NFT Minting via Filebase IPFS

import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import AWS from 'aws-sdk';

export interface FilebaseConfig { accessKeyId: string; secretAccessKey: string; bucket: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; tokenId: string; contractAddress: string; opHash: string; explorerUrl: string }

export class TezosFilebaseNFTMinter {
  private s3: AWS.S3;
  private filebaseConfig: FilebaseConfig;
  private filebaseGateway = 'https://ipfs.filebase.io/ipfs';
  private tezos: TezosToolkit;
  private network: 'mainnet' | 'ghostnet' | 'kathmandunet';

  constructor(filebaseConfig: FilebaseConfig, rpcUrl: string = 'https://mainnet.api.tez.ie', network: 'mainnet' | 'ghostnet' | 'kathmandunet' = 'mainnet') {
    this.filebaseConfig = filebaseConfig;
    this.tezos = new TezosToolkit(rpcUrl);
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

  private async mintTezosNFT(privateKey: string, contractAddress: string, metadataUrl: string, tokenId: string): Promise<{ opHash: string }> {
    const signer = new InMemorySigner(privateKey);
    this.tezos.setProvider({ signer });

    const contract = await this.tezos.contract.at(contractAddress);
    
    const operation = await contract.methods.mint(
      tokenId,
      { 
        token_id: tokenId,
        token_info: {
          '': Buffer.from(metadataUrl).toString('hex')
        }
      }
    ).send();

    await operation.confirmation();
    return { opHash: operation.hash };
  }

  async mintNFT(privateKey: string, contractAddress: string, fileData: Buffer, metadata: Omit<NFTMetadata, 'image'>, tokenId: string, fileName: string = 'nft-asset'): Promise<MintResult> {
    console.log('Starting Tezos NFT minting process...');
    const fileUpload = await this.uploadFileToFilebase(fileData, fileName);
    console.log(`File uploaded: ${fileUpload.cid}`);

    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${fileUpload.cid}` };
    const metadataUpload = await this.uploadJSONToFilebase(completeMetadata, `${fileName.replace(/\.[^/.]+$/, '')}_metadata.json`);
    console.log(`Metadata uploaded: ${metadataUpload.cid}`);

    const tezosNFT = await this.mintTezosNFT(privateKey, contractAddress, `ipfs://${metadataUpload.cid}`, tokenId);
    console.log(`Tezos NFT minted: Token ID ${tokenId}`);

    const explorerBase = this.network === 'mainnet' 
      ? 'https://tzkt.io' 
      : this.network === 'ghostnet' 
      ? 'https://ghostnet.tzkt.io' 
      : 'https://kathmandunet.tzkt.io';

    return {
      ipfsCid: fileUpload.cid,
      ipfsUrl: fileUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
      tokenId,
      contractAddress,
      opHash: tezosNFT.opHash,
      explorerUrl: `${explorerBase}/${tezosNFT.opHash}`,
    };
  }

  async checkBalance(privateKeyOrAddress: string): Promise<{ address: string; balanceXtz: string }> {
    let address: string;
    if (privateKeyOrAddress.startsWith('edsk')) {
      const signer = new InMemorySigner(privateKeyOrAddress);
      address = await signer.publicKeyHash();
    } else {
      address = privateKeyOrAddress;
    }

    const balance = await this.tezos.tz.getBalance(address);
    const balanceXtz = (balance.toNumber() / 1000000).toString();

    return { address, balanceXtz };
  }
}

export default TezosFilebaseNFTMinter;

