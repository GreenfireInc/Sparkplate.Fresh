// Stacks NFT Minting via Pinata IPFS
// Uploads files to Pinata IPFS, then creates SIP-009 NFT on Stacks

import { makeContractCall, broadcastTransaction, AnchorMode, PostConditionMode, Cl } from '@stacks/transactions';
import { StacksMainnet, StacksTestnet } from '@stacks/network';
import FormData from 'form-data';
import axios from 'axios';

export interface PinataConfig { apiKey: string; apiSecret: string; jwt?: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; tokenId: string; contractAddress: string; txId: string; explorerUrl: string }
export interface FileUploadOptions { fileName?: string; pinataMetadata?: { name?: string; keyvalues?: Record<string, string | number> }; pinataOptions?: { cidVersion?: 0 | 1 } }

export class StacksPinataNFTMinter {
  private pinataConfig: PinataConfig;
  private pinataBaseUrl = 'https://api.pinata.cloud';
  private pinataGateway = 'https://gateway.pinata.cloud/ipfs';
  private network: StacksMainnet | StacksTestnet;
  private networkName: 'mainnet' | 'testnet';

  constructor(pinataConfig: PinataConfig, network: 'mainnet' | 'testnet' = 'mainnet') {
    this.pinataConfig = pinataConfig;
    this.network = network === 'mainnet' ? new StacksMainnet() : new StacksTestnet();
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

  private async mintStacksNFT(privateKey: string, contractAddress: string, contractName: string, metadataUrl: string, tokenId: string): Promise<{ txId: string }> {
    const txOptions = {
      contractAddress,
      contractName,
      functionName: 'mint',
      functionArgs: [Cl.uint(tokenId), Cl.stringAscii(metadataUrl)],
      senderKey: privateKey,
      network: this.network,
      anchorMode: AnchorMode.Any,
      postConditionMode: PostConditionMode.Allow,
    };

    const transaction = await makeContractCall(txOptions);
    const broadcastResponse = await broadcastTransaction(transaction, this.network);
    
    if (typeof broadcastResponse === 'string') {
      return { txId: broadcastResponse };
    } else if ('txid' in broadcastResponse) {
      return { txId: broadcastResponse.txid };
    } else {
      throw new Error('Transaction broadcast failed');
    }
  }

  async mintNFT(privateKey: string, contractAddress: string, contractName: string, fileData: Buffer, metadata: Omit<NFTMetadata, 'image'>, tokenId: string, options: FileUploadOptions = {}): Promise<MintResult> {
    console.log('Starting Stacks NFT minting process...');
    const fileUpload = await this.uploadFileToPinata(fileData, options);
    console.log(`File uploaded: ${fileUpload.cid}`);

    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${fileUpload.cid}` };
    const metadataUpload = await this.uploadMetadataToPinata(completeMetadata, { pinataMetadata: { name: `${metadata.name} - Metadata`, keyvalues: { type: 'nft-metadata', standard: 'SIP-009', nftName: metadata.name } } });
    console.log(`Metadata uploaded: ${metadataUpload.cid}`);

    const stacksNFT = await this.mintStacksNFT(privateKey, contractAddress, contractName, `ipfs://${metadataUpload.cid}`, tokenId);
    console.log(`Stacks NFT minted: Token ID ${tokenId}`);

    const explorerBase = this.networkName === 'mainnet' ? 'https://explorer.stacks.co/txid' : 'https://explorer.stacks.co/txid?chain=testnet';

    return {
      ipfsCid: fileUpload.cid,
      ipfsUrl: fileUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
      tokenId,
      contractAddress: `${contractAddress}.${contractName}`,
      txId: stacksNFT.txId,
      explorerUrl: `${explorerBase}/${stacksNFT.txId}`,
    };
  }

  async mintMediaNFT(privateKey: string, contractAddress: string, contractName: string, mediaData: Buffer, thumbnailData: Buffer, metadata: Omit<NFTMetadata, 'image' | 'animation_url'>, tokenId: string, options: { mediaOptions?: FileUploadOptions; thumbnailOptions?: FileUploadOptions } = {}): Promise<MintResult> {
    const mediaUpload = await this.uploadFileToPinata(mediaData, options.mediaOptions);
    const thumbnailUpload = await this.uploadFileToPinata(thumbnailData, options.thumbnailOptions);
    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${thumbnailUpload.cid}`, animation_url: `ipfs://${mediaUpload.cid}` };
    const metadataUpload = await this.uploadMetadataToPinata(completeMetadata, { pinataMetadata: { name: `${metadata.name} - Metadata`, keyvalues: { type: 'media-nft-metadata', standard: 'SIP-009', nftName: metadata.name } } });
    const stacksNFT = await this.mintStacksNFT(privateKey, contractAddress, contractName, `ipfs://${metadataUpload.cid}`, tokenId);
    const explorerBase = this.networkName === 'mainnet' ? 'https://explorer.stacks.co/txid' : 'https://explorer.stacks.co/txid?chain=testnet';

    return {
      ipfsCid: mediaUpload.cid,
      ipfsUrl: mediaUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
      tokenId,
      contractAddress: `${contractAddress}.${contractName}`,
      txId: stacksNFT.txId,
      explorerUrl: `${explorerBase}/${stacksNFT.txId}`,
    };
  }

  async checkBalance(address: string): Promise<{ address: string; balanceStx: string }> {
    const apiUrl = this.networkName === 'mainnet' ? 'https://stacks-node-api.mainnet.stacks.co' : 'https://stacks-node-api.testnet.stacks.co';
    const response = await axios.get(`${apiUrl}/v2/accounts/${address}`);
    const balanceStx = (parseInt(response.data.balance) / 1000000).toString();
    return { address, balanceStx };
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

export default StacksPinataNFTMinter;
