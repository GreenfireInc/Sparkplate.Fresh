// BNB Smart Chain NFT Minting via Filebase IPFS
// S3-compatible IPFS for BSC BEP-721

import { ethers } from 'ethers';
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
  tokenId: string;
  contractAddress: string;
  txHash: string;
  bscScanUrl: string;
}

const BEP721_ABI = [
  'function mint(address to, uint256 tokenId, string memory tokenURI) public returns (bool)',
  'function balanceOf(address owner) public view returns (uint256)',
];

export class BNBFilebaseNFTMinter {
  private s3: AWS.S3;
  private filebaseConfig: FilebaseConfig;
  private filebaseGateway = 'https://ipfs.filebase.io/ipfs';
  private rpcEndpoint: string;
  private network: 'mainnet' | 'testnet';

  constructor(
    filebaseConfig: FilebaseConfig,
    rpcEndpoint: string = 'https://bsc-dataseed.binance.org',
    network: 'mainnet' | 'testnet' = 'mainnet'
  ) {
    this.filebaseConfig = filebaseConfig;
    this.rpcEndpoint = rpcEndpoint;
    this.network = network;

    this.s3 = new AWS.S3({
      accessKeyId: filebaseConfig.accessKeyId,
      secretAccessKey: filebaseConfig.secretAccessKey,
      endpoint: 'https://s3.filebase.com',
      region: 'us-east-1',
      s3ForcePathStyle: true,
      signatureVersion: 'v4',
    });
  }

  private getMimeType(fileName: string): string {
    const ext = fileName.split('.').pop()?.toLowerCase();
    const mimeTypes: Record<string, string> = {
      'png': 'image/png',
      'jpg': 'image/jpeg',
      'gif': 'image/gif',
      'webp': 'image/webp',
      'mp4': 'video/mp4',
      'mp3': 'audio/mpeg',
    };
    return mimeTypes[ext || ''] || 'application/octet-stream';
  }

  private async uploadFileToFilebase(
    fileData: Buffer,
    fileName: string
  ): Promise<{ cid: string; url: string }> {
    const params = {
      Bucket: this.filebaseConfig.bucket,
      Key: fileName,
      Body: fileData,
      ContentType: this.getMimeType(fileName),
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
  }

  private async uploadJSONToFilebase(
    metadata: NFTMetadata,
    fileName: string
  ): Promise<{ cid: string; url: string }> {
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
  }

  private async mintBSCNFT(
    privateKeyOrMnemonic: string,
    contractAddress: string,
    metadataUrl: string,
    tokenId: string
  ): Promise<{ txHash: string; tokenId: string }> {
    let wallet: ethers.Wallet;
    if (privateKeyOrMnemonic.split(' ').length >= 12) {
      wallet = ethers.Wallet.fromPhrase(privateKeyOrMnemonic);
    } else {
      wallet = new ethers.Wallet(privateKeyOrMnemonic);
    }

    const provider = new ethers.JsonRpcProvider(this.rpcEndpoint);
    const signer = wallet.connect(provider);
    const contract = new ethers.Contract(contractAddress, BEP721_ABI, signer);

    const tx = await contract.mint(signer.address, tokenId, metadataUrl);
    const receipt = await tx.wait();

    return {
      txHash: receipt.hash,
      tokenId,
    };
  }

  async mintNFT(
    privateKeyOrMnemonic: string,
    contractAddress: string,
    fileData: Buffer,
    fileName: string,
    metadata: Omit<NFTMetadata, 'image'>,
    tokenId: string
  ): Promise<MintResult> {
    console.log('Starting NFT minting with Filebase...');

    const fileUpload = await this.uploadFileToFilebase(fileData, fileName);
    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: `ipfs://${fileUpload.cid}`,
    };

    const metadataUpload = await this.uploadJSONToFilebase(
      completeMetadata,
      `${fileName.replace(/\.[^/.]+$/, '')}_metadata.json`
    );

    const bscNFT = await this.mintBSCNFT(
      privateKeyOrMnemonic,
      contractAddress,
      `ipfs://${metadataUpload.cid}`,
      tokenId
    );

    const explorerBase = this.network === 'mainnet' 
      ? 'https://bscscan.com/tx' 
      : 'https://testnet.bscscan.com/tx';

    return {
      ipfsCid: fileUpload.cid,
      ipfsUrl: fileUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
      tokenId: bscNFT.tokenId,
      contractAddress,
      txHash: bscNFT.txHash,
      bscScanUrl: `${explorerBase}/${bscNFT.txHash}`,
    };
  }

  async checkBalance(privateKeyOrMnemonicOrAddress: string): Promise<{
    address: string;
    balanceBNB: string;
  }> {
    const provider = new ethers.JsonRpcProvider(this.rpcEndpoint);
    let address: string;
    
    if (privateKeyOrMnemonicOrAddress.split(' ').length >= 12) {
      const wallet = ethers.Wallet.fromPhrase(privateKeyOrMnemonicOrAddress);
      address = wallet.address;
    } else if (privateKeyOrMnemonicOrAddress.startsWith('0x') && privateKeyOrMnemonicOrAddress.length === 42) {
      address = privateKeyOrMnemonicOrAddress;
    } else {
      const wallet = new ethers.Wallet(privateKeyOrMnemonicOrAddress);
      address = wallet.address;
    }

    const balance = await provider.getBalance(address);
    return {
      address,
      balanceBNB: ethers.formatEther(balance),
    };
  }
}

export default BNBFilebaseNFTMinter;
