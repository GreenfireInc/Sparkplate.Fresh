// Solana NFT Minting via Filebase IPFS

import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { Metaplex, keypairIdentity, bundlrStorage } from '@metaplex-foundation/js';
import bs58 from 'bs58';
import AWS from 'aws-sdk';

export interface FilebaseConfig { accessKeyId: string; secretAccessKey: string; bucket: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; mintAddress: string; txSignature: string; explorerUrl: string }

export class SolanaFilebaseNFTMinter {
  private s3: AWS.S3;
  private filebaseConfig: FilebaseConfig;
  private filebaseGateway = 'https://ipfs.filebase.io/ipfs';
  private connection: Connection;
  private metaplex: Metaplex | null = null;
  private network: 'mainnet-beta' | 'devnet' | 'testnet';

  constructor(filebaseConfig: FilebaseConfig, rpcEndpoint: string = 'https://api.mainnet-beta.solana.com', network: 'mainnet-beta' | 'devnet' | 'testnet' = 'mainnet-beta') {
    this.filebaseConfig = filebaseConfig; this.connection = new Connection(rpcEndpoint, 'confirmed'); this.network = network;
    this.s3 = new AWS.S3({ accessKeyId: filebaseConfig.accessKeyId, secretAccessKey: filebaseConfig.secretAccessKey, endpoint: 'https://s3.filebase.com', region: 'us-east-1', s3ForcePathStyle: true, signatureVersion: 'v4' });
  }

  private initMetaplex(keypair: Keypair) {
    if (!this.metaplex) {
      this.metaplex = Metaplex.make(this.connection).use(keypairIdentity(keypair)).use(bundlrStorage());
    }
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

  private async mintSolanaNFT(privateKey: string, metadataUrl: string, metadata: NFTMetadata): Promise<{ mintAddress: string; txSignature: string }> {
    const keypair = privateKey.length === 64 ? Keypair.fromSecretKey(Buffer.from(privateKey, 'hex')) : Keypair.fromSecretKey(bs58.decode(privateKey));
    this.initMetaplex(keypair);
    const { nft } = await this.metaplex!.nfts().create({ uri: metadataUrl, name: metadata.name, sellerFeeBasisPoints: 500, symbol: metadata.properties?.category?.substring(0, 10) || 'NFT' });
    return { mintAddress: nft.address.toString(), txSignature: nft.mint.address.toString() };
  }

  async mintNFT(privateKey: string, fileData: Buffer, fileName: string, metadata: Omit<NFTMetadata, 'image'>): Promise<MintResult> {
    const fileUpload = await this.uploadFileToFilebase(fileData, fileName);
    const completeMetadata: NFTMetadata = { ...metadata, image: fileUpload.url };
    const metadataUpload = await this.uploadJSONToFilebase(completeMetadata, `${fileName.replace(/\.[^/.]+$/, '')}_metadata.json`);
    const solanaNFT = await this.mintSolanaNFT(privateKey, metadataUpload.url, completeMetadata);
    const explorerBase = this.network === 'mainnet-beta' ? 'https://solscan.io/token' : `https://solscan.io/token?cluster=${this.network}`;
    return { ipfsCid: fileUpload.cid, ipfsUrl: fileUpload.url, metadataCid: metadataUpload.cid, metadataUrl: metadataUpload.url, mintAddress: solanaNFT.mintAddress, txSignature: solanaNFT.txSignature, explorerUrl: `${explorerBase}/${solanaNFT.mintAddress}` };
  }

  async checkBalance(privateKeyOrAddress: string): Promise<{ address: string; balanceSol: string }> {
    let publicKey: PublicKey;
    if (privateKeyOrAddress.length === 64 || privateKeyOrAddress.length === 88) {
      const keypair = privateKeyOrAddress.length === 64 ? Keypair.fromSecretKey(Buffer.from(privateKey, 'hex')) : Keypair.fromSecretKey(bs58.decode(privateKeyOrAddress));
      publicKey = keypair.publicKey;
    } else {
      publicKey = new PublicKey(privateKeyOrAddress);
    }
    const balance = await this.connection.getBalance(publicKey);
    return { address: publicKey.toString(), balanceSol: (balance / 1e9).toString() };
  }
}

export default SolanaFilebaseNFTMinter;
