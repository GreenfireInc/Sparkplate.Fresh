// Stellar NFT Minting via Pinata IPFS
// Uploads files to Pinata IPFS, then creates Stellar native asset NFT

import { Keypair, Asset, Operation, TransactionBuilder, Networks, Server } from '@stellar/stellar-sdk';
import FormData from 'form-data';
import axios from 'axios';

export interface PinataConfig { apiKey: string; apiSecret: string; jwt?: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; assetCode: string; issuerAddress: string; txHash: string; explorerUrl: string }
export interface FileUploadOptions { fileName?: string; pinataMetadata?: { name?: string; keyvalues?: Record<string, string | number> }; pinataOptions?: { cidVersion?: 0 | 1 } }

export class StellarPinataNFTMinter {
  private pinataConfig: PinataConfig;
  private pinataBaseUrl = 'https://api.pinata.cloud';
  private pinataGateway = 'https://gateway.pinata.cloud/ipfs';
  private server: Server;
  private network: typeof Networks.PUBLIC | typeof Networks.TESTNET;
  private networkName: 'mainnet' | 'testnet';

  constructor(pinataConfig: PinataConfig, horizonUrl: string = 'https://horizon.stellar.org', network: 'mainnet' | 'testnet' = 'mainnet') {
    this.pinataConfig = pinataConfig;
    this.server = new Server(horizonUrl);
    this.network = network === 'mainnet' ? Networks.PUBLIC : Networks.TESTNET;
    this.networkName = network;
  }

  private async uploadFileToPinata(fileData: Buffer, options: FileUploadOptions = {}): Promise<{ cid: string; url: string }> {
    const formData = new FormData();
    formData.append('file', fileData, options.fileName || 'file');
    if (options.pinataMetadata) formData.append('pinataMetadata', JSON.stringify(options.pinataMetadata));
    if (options.pinataOptions) formData.append('pinataOptions', JSON.stringify(options.pinataOptions));

    const headers = this.pinataConfig.jwt ? { Authorization: `Bearer ${this.pinataConfig.jwt}` } : { pinata_api_key: this.pinataConfig.apiKey, pinata_secret_api_key: this.pinataConfig.apiSecret };

    try {
      const response = await axios.post(`${this.pinataBaseUrl}/pinning/pinFileToIPFS`, formData, { headers: { ...headers, ...formData.getHeaders() }, maxContentLength: Infinity, maxBodyLength: Infinity });
      const cid = response.data.IpfsHash;
      return { cid, url: `${this.pinataGateway}/${cid}` };
    } catch (error: any) {
      throw new Error(`Pinata upload failed: ${error.message}`);
    }
  }

  private async uploadMetadataToPinata(metadata: NFTMetadata, options: FileUploadOptions = {}): Promise<{ cid: string; url: string }> {
    const headers = this.pinataConfig.jwt ? { Authorization: `Bearer ${this.pinataConfig.jwt}` } : { pinata_api_key: this.pinataConfig.apiKey, pinata_secret_api_key: this.pinataConfig.apiSecret };
    const body: any = { pinataContent: metadata };
    if (options.pinataMetadata) body.pinataMetadata = options.pinataMetadata;
    if (options.pinataOptions) body.pinataOptions = options.pinataOptions;

    try {
      const response = await axios.post(`${this.pinataBaseUrl}/pinning/pinJSONToIPFS`, body, { headers });
      const cid = response.data.IpfsHash;
      return { cid, url: `${this.pinataGateway}/${cid}` };
    } catch (error: any) {
      throw new Error(`Pinata metadata upload failed: ${error.message}`);
    }
  }

  private async mintStellarNFT(secretKey: string, metadataUrl: string, assetCode: string): Promise<{ assetCode: string; issuerAddress: string; txHash: string }> {
    const sourceKeypair = Keypair.fromSecret(secretKey);
    const account = await this.server.loadAccount(sourceKeypair.publicKey());
    
    // Create asset with issuer as source
    const asset = new Asset(assetCode.substring(0, 12), sourceKeypair.publicKey()); // Max 12 chars for asset code

    // Build transaction to issue NFT (1 unit, non-divisible)
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
        setFlags: 2, // AUTH_IMMUTABLE_FLAG (can't issue more)
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

  async mintNFT(secretKey: string, fileData: Buffer, metadata: Omit<NFTMetadata, 'image'>, assetCode: string, options: FileUploadOptions = {}): Promise<MintResult> {
    console.log('Starting Stellar NFT minting process...');
    const fileUpload = await this.uploadFileToPinata(fileData, options);
    console.log(`File uploaded: ${fileUpload.cid}`);

    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${fileUpload.cid}` };
    const metadataUpload = await this.uploadMetadataToPinata(completeMetadata, { pinataMetadata: { name: `${metadata.name} - Metadata`, keyvalues: { type: 'nft-metadata', standard: 'Stellar-NFT', nftName: metadata.name } } });
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

  async mintMediaNFT(secretKey: string, mediaData: Buffer, thumbnailData: Buffer, metadata: Omit<NFTMetadata, 'image' | 'animation_url'>, assetCode: string, options: { mediaOptions?: FileUploadOptions; thumbnailOptions?: FileUploadOptions } = {}): Promise<MintResult> {
    const mediaUpload = await this.uploadFileToPinata(mediaData, options.mediaOptions);
    const thumbnailUpload = await this.uploadFileToPinata(thumbnailData, options.thumbnailOptions);
    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${thumbnailUpload.cid}`, animation_url: `ipfs://${mediaUpload.cid}` };
    const metadataUpload = await this.uploadMetadataToPinata(completeMetadata, { pinataMetadata: { name: `${metadata.name} - Metadata`, keyvalues: { type: 'media-nft-metadata', standard: 'Stellar-NFT', nftName: metadata.name } } });
    const stellarNFT = await this.mintStellarNFT(secretKey, `ipfs://${metadataUpload.cid}`, assetCode);
    const explorerBase = this.networkName === 'mainnet' ? 'https://stellar.expert/explorer/public/tx' : 'https://stellar.expert/explorer/testnet/tx';

    return {
      ipfsCid: mediaUpload.cid,
      ipfsUrl: mediaUpload.url,
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

  async testPinataConnection(): Promise<boolean> {
    const headers = this.pinataConfig.jwt ? { Authorization: `Bearer ${this.pinataConfig.jwt}` } : { pinata_api_key: this.pinataConfig.apiKey, pinata_secret_api_key: this.pinataConfig.apiSecret };
    try {
      await axios.get(`${this.pinataBaseUrl}/data/testAuthentication`, { headers });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default StellarPinataNFTMinter;
