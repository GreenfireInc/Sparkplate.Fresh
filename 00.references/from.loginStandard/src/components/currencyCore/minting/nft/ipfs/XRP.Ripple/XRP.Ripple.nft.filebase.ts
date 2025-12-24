// XRP NFT Minting via Filebase IPFS

import { Client, Wallet } from 'xrpl';
import AWS from 'aws-sdk';

export interface FilebaseConfig { accessKeyId: string; secretAccessKey: string; bucket: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; nftokenId: string; txHash: string; explorerUrl: string }

export class XRPFilebaseNFTMinter {
  private s3: AWS.S3;
  private filebaseConfig: FilebaseConfig;
  private filebaseGateway = 'https://ipfs.filebase.io/ipfs';
  private client: Client;
  private network: 'mainnet' | 'testnet' | 'devnet';

  constructor(filebaseConfig: FilebaseConfig, xrplServer: string = 'wss://xrplcluster.com', network: 'mainnet' | 'testnet' | 'devnet' = 'mainnet') {
    this.filebaseConfig = filebaseConfig;
    this.client = new Client(xrplServer);
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

  private convertStringToHex(str: string): string {
    return Buffer.from(str, 'utf-8').toString('hex').toUpperCase();
  }

  private async mintXRPNFT(seed: string, metadataUrl: string, taxon: number = 0): Promise<{ nftokenId: string; txHash: string }> {
    await this.client.connect();
    
    try {
      const wallet = Wallet.fromSeed(seed);
      
      const nftMintTx = {
        TransactionType: 'NFTokenMint',
        Account: wallet.address,
        URI: this.convertStringToHex(metadataUrl),
        Flags: 8,
        TransferFee: 0,
        NFTokenTaxon: taxon,
      };

      const prepared = await this.client.autofill(nftMintTx);
      const signed = wallet.sign(prepared);
      const result = await this.client.submitAndWait(signed.tx_blob);

      const meta = result.result.meta as any;
      const nftokenId = meta?.nftoken_id || meta?.CreatedNode?.find((n: any) => n.CreatedNode?.LedgerEntryType === 'NFTokenPage')?.CreatedNode?.NewFields?.NFTokens?.[0]?.NFToken?.NFTokenID || '';

      return { nftokenId, txHash: result.result.hash };
    } finally {
      await this.client.disconnect();
    }
  }

  async mintNFT(seed: string, fileData: Buffer, metadata: Omit<NFTMetadata, 'image'>, taxon: number = 0, fileName: string = 'nft-asset'): Promise<MintResult> {
    console.log('Starting XRP NFT minting process...');
    const fileUpload = await this.uploadFileToFilebase(fileData, fileName);
    console.log(`File uploaded: ${fileUpload.cid}`);

    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${fileUpload.cid}` };
    const metadataUpload = await this.uploadJSONToFilebase(completeMetadata, `${fileName.replace(/\.[^/.]+$/, '')}_metadata.json`);
    console.log(`Metadata uploaded: ${metadataUpload.cid}`);

    const xrpNFT = await this.mintXRPNFT(seed, `ipfs://${metadataUpload.cid}`, taxon);
    console.log(`XRP NFT minted: ${xrpNFT.nftokenId}`);

    const explorerBase = this.network === 'mainnet' 
      ? 'https://livenet.xrpl.org/transactions' 
      : this.network === 'testnet' 
      ? 'https://testnet.xrpl.org/transactions' 
      : 'https://devnet.xrpl.org/transactions';

    return {
      ipfsCid: fileUpload.cid,
      ipfsUrl: fileUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
      nftokenId: xrpNFT.nftokenId,
      txHash: xrpNFT.txHash,
      explorerUrl: `${explorerBase}/${xrpNFT.txHash}`,
    };
  }

  async checkBalance(seedOrAddress: string): Promise<{ address: string; balanceXrp: string }> {
    await this.client.connect();
    
    try {
      let address: string;
      if (seedOrAddress.split(' ').length >= 12 || seedOrAddress.startsWith('s')) {
        const wallet = Wallet.fromSeed(seedOrAddress);
        address = wallet.address;
      } else {
        address = seedOrAddress;
      }

      const balance = await this.client.getXrpBalance(address);
      return { address, balanceXrp: balance };
    } finally {
      await this.client.disconnect();
    }
  }
}

export default XRPFilebaseNFTMinter;

