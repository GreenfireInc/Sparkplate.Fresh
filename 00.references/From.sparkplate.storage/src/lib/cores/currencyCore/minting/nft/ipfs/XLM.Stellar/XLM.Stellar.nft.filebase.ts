// Stellar NFT Minting via Filebase IPFS

import { Keypair, Asset, Operation, TransactionBuilder, Networks, Server } from '@stellar/stellar-sdk';
import AWS from 'aws-sdk';

export interface FilebaseConfig { accessKeyId: string; secretAccessKey: string; bucket: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; assetCode: string; issuerAddress: string; txHash: string; explorerUrl: string }

export class StellarFilebaseNFTMinter {
  private s3: AWS.S3;
  private filebaseConfig: FilebaseConfig;
  private filebaseGateway = 'https://ipfs.filebase.io/ipfs';
  private server: Server;
  private network: typeof Networks.PUBLIC | typeof Networks.TESTNET;
  private networkName: 'mainnet' | 'testnet';

  constructor(filebaseConfig: FilebaseConfig, horizonUrl: string = 'https://horizon.stellar.org', network: 'mainnet' | 'testnet' = 'mainnet') {
    this.filebaseConfig = filebaseConfig;
    this.server = new Server(horizonUrl);
    this.network = network === 'mainnet' ? Networks.PUBLIC : Networks.TESTNET;
    this.networkName = network;
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

  private async mintStellarNFT(secretKey: string, metadataUrl: string, assetCode: string): Promise<{ assetCode: string; issuerAddress: string; txHash: string }> {
    const sourceKeypair = Keypair.fromSecret(secretKey);
    const account = await this.server.loadAccount(sourceKeypair.publicKey());
    
    const asset = new Asset(assetCode.substring(0, 12), sourceKeypair.publicKey());

    const transaction = new TransactionBuilder(account, {
      fee: '100000',
      networkPassphrase: this.network,
    })
      .addOperation(Operation.payment({
        destination: sourceKeypair.publicKey(),
        asset: asset,
        amount: '1',
      }))
      .addOperation(Operation.setOptions({
        setFlags: 2,
      }))
      .addOperation(Operation.manageData({
        name: 'ipfs_hash',
        value: metadataUrl,
      }))
      .setTimeout(180)
      .build();

    transaction.sign(sourceKeypair);
    const result = await this.server.submitTransaction(transaction);

    return { assetCode, issuerAddress: sourceKeypair.publicKey(), txHash: result.hash };
  }

  async mintNFT(secretKey: string, fileData: Buffer, metadata: Omit<NFTMetadata, 'image'>, assetCode: string, fileName: string = 'nft-asset'): Promise<MintResult> {
    console.log('Starting Stellar NFT minting process...');
    const fileUpload = await this.uploadFileToFilebase(fileData, fileName);
    console.log(`File uploaded: ${fileUpload.cid}`);

    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${fileUpload.cid}` };
    const metadataUpload = await this.uploadJSONToFilebase(completeMetadata, `${fileName.replace(/\.[^/.]+$/, '')}_metadata.json`);
    console.log(`Metadata uploaded: ${metadataUpload.cid}`);

    const stellarNFT = await this.mintStellarNFT(secretKey, `ipfs://${metadataUpload.cid}`, assetCode);
    console.log(`Stellar NFT minted: Asset ${stellarNFT.assetCode}`);

    const explorerBase = this.networkName === 'mainnet' ? 'https://stellar.expert/explorer/public/tx' : 'https://stellar.expert/explorer/testnet/tx';

    return {
      ipfsCid: fileUpload.cid,
      ipfsUrl: fileUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
      assetCode: stellarNFT.assetCode,
      issuerAddress: stellarNFT.issuerAddress,
      txHash: stellarNFT.txHash,
      explorerUrl: `${explorerBase}/${stellarNFT.txHash}`,
    };
  }

  async checkBalance(secretKeyOrAddress: string): Promise<{ address: string; balanceXlm: string }> {
    let address: string;
    if (secretKeyOrAddress.startsWith('S')) {
      const keypair = Keypair.fromSecret(secretKeyOrAddress);
      address = keypair.publicKey();
    } else {
      address = secretKeyOrAddress;
    }

    const account = await this.server.loadAccount(address);
    const xlmBalance = account.balances.find(b => b.asset_type === 'native');
    const balanceXlm = xlmBalance ? xlmBalance.balance : '0';

    return { address, balanceXlm };
  }
}

export default StellarFilebaseNFTMinter;

