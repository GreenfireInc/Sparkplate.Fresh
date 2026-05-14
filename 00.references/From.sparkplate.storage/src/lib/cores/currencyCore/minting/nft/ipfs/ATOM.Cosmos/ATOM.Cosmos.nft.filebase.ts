// Cosmos NFT Minting via Filebase IPFS
// S3-compatible IPFS for Cosmos CW721

import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { GasPrice } from '@cosmjs/stargate';
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
  mintscanUrl: string;
}

export class CosmosFilebaseNFTMinter {
  private s3: AWS.S3;
  private filebaseConfig: FilebaseConfig;
  private filebaseGateway = 'https://ipfs.filebase.io/ipfs';
  private rpcEndpoint: string;
  private network: 'mainnet' | 'testnet';

  constructor(
    filebaseConfig: FilebaseConfig,
    rpcEndpoint: string = 'https://rpc.cosmos.network',
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

  private async mintCosmosNFT(
    mnemonic: string,
    contractAddress: string,
    metadataUrl: string,
    metadata: NFTMetadata,
    tokenId: string
  ): Promise<{ txHash: string; tokenId: string }> {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
      prefix: 'cosmos',
    });
    const [firstAccount] = await wallet.getAccounts();
    const client = await SigningCosmWasmClient.connectWithSigner(
      this.rpcEndpoint,
      wallet,
      { gasPrice: GasPrice.fromString('0.025uatom') }
    );

    const mintMsg = {
      mint: {
        token_id: tokenId,
        owner: firstAccount.address,
        token_uri: metadataUrl,
        extension: {
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
          attributes: metadata.attributes,
        },
      },
    };

    const result = await client.execute(
      firstAccount.address,
      contractAddress,
      mintMsg,
      'auto',
      'Minting NFT'
    );

    return {
      txHash: result.transactionHash,
      tokenId,
    };
  }

  async mintNFT(
    mnemonic: string,
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

    const cosmosNFT = await this.mintCosmosNFT(
      mnemonic,
      contractAddress,
      `ipfs://${metadataUpload.cid}`,
      completeMetadata,
      tokenId
    );

    const explorerBase = this.network === 'mainnet' 
      ? 'https://www.mintscan.io/cosmos/txs' 
      : 'https://testnet.mintscan.io/cosmoshub-testnet/txs';

    return {
      ipfsCid: fileUpload.cid,
      ipfsUrl: fileUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
      tokenId: cosmosNFT.tokenId,
      contractAddress,
      txHash: cosmosNFT.txHash,
      mintscanUrl: `${explorerBase}/${cosmosNFT.txHash}`,
    };
  }

  async checkBalance(mnemonicOrAddress: string): Promise<{
    address: string;
    balanceAtom: string;
  }> {
    let address: string;
    if (mnemonicOrAddress.split(' ').length >= 12) {
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonicOrAddress, {
        prefix: 'cosmos',
      });
      const [firstAccount] = await wallet.getAccounts();
      address = firstAccount.address;
    } else {
      address = mnemonicOrAddress;
    }

    const client = await SigningCosmWasmClient.connect(this.rpcEndpoint);
    const balance = await client.getBalance(address, 'uatom');
    return {
      address,
      balanceAtom: (parseInt(balance.amount) / 1000000).toString(),
    };
  }
}

export default CosmosFilebaseNFTMinter;
