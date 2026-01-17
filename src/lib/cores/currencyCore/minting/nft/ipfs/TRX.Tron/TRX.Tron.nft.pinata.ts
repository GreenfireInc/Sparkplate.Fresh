// Tron NFT Minting via Pinata IPFS
// Uploads files to Pinata IPFS, then creates TRC-721 NFT on Tron

import TronWeb from 'tronweb';
import FormData from 'form-data';
import axios from 'axios';

export interface PinataConfig { apiKey: string; apiSecret: string; jwt?: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; tokenId: string; contractAddress: string; txId: string; explorerUrl: string }
export interface FileUploadOptions { fileName?: string; pinataMetadata?: { name?: string; keyvalues?: Record<string, string | number> }; pinataOptions?: { cidVersion?: 0 | 1 } }

export class TronPinataNFTMinter {
  private pinataConfig: PinataConfig;
  private pinataBaseUrl = 'https://api.pinata.cloud';
  private pinataGateway = 'https://gateway.pinata.cloud/ipfs';
  private tronWeb: TronWeb;
  private network: 'mainnet' | 'shasta' | 'nile';

  constructor(pinataConfig: PinataConfig, fullNode: string = 'https://api.trongrid.io', network: 'mainnet' | 'shasta' | 'nile' = 'mainnet') {
    this.pinataConfig = pinataConfig;
    this.network = network;
    this.tronWeb = new TronWeb({ fullHost: fullNode });
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

  private async mintTronNFT(privateKey: string, contractAddress: string, metadataUrl: string, tokenId: string): Promise<{ txId: string }> {
    this.tronWeb.setPrivateKey(privateKey);
    const contract = await this.tronWeb.contract().at(contractAddress);
    
    // TRC-721 mint function (standard ERC-721 compatible)
    const tx = await contract.mint(this.tronWeb.address.fromPrivateKey(privateKey), tokenId, metadataUrl).send({
      feeLimit: 1000000000,
      callValue: 0,
      shouldPollResponse: true,
    });

    return { txId: tx };
  }

  async mintNFT(privateKey: string, contractAddress: string, fileData: Buffer, metadata: Omit<NFTMetadata, 'image'>, tokenId: string, options: FileUploadOptions = {}): Promise<MintResult> {
    console.log('Starting Tron NFT minting process...');
    const fileUpload = await this.uploadFileToPinata(fileData, options);
    console.log(`File uploaded: ${fileUpload.cid}`);

    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${fileUpload.cid}` };
    const metadataUpload = await this.uploadMetadataToPinata(completeMetadata, { pinataMetadata: { name: `${metadata.name} - Metadata`, keyvalues: { type: 'nft-metadata', standard: 'TRC-721', nftName: metadata.name } } });
    console.log(`Metadata uploaded: ${metadataUpload.cid}`);

    const tronNFT = await this.mintTronNFT(privateKey, contractAddress, `ipfs://${metadataUpload.cid}`, tokenId);
    console.log(`Tron NFT minted: Token ID ${tokenId}`);

    const explorerBase = this.network === 'mainnet' ? 'https://tronscan.org/#/transaction' : `https://${this.network}.tronscan.org/#/transaction`;

    return {
      ipfsCid: fileUpload.cid,
      ipfsUrl: fileUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
      tokenId,
      contractAddress,
      txId: tronNFT.txId,
      explorerUrl: `${explorerBase}/${tronNFT.txId}`,
    };
  }

  async mintMediaNFT(privateKey: string, contractAddress: string, mediaData: Buffer, thumbnailData: Buffer, metadata: Omit<NFTMetadata, 'image' | 'animation_url'>, tokenId: string, options: { mediaOptions?: FileUploadOptions; thumbnailOptions?: FileUploadOptions } = {}): Promise<MintResult> {
    const mediaUpload = await this.uploadFileToPinata(mediaData, options.mediaOptions);
    const thumbnailUpload = await this.uploadFileToPinata(thumbnailData, options.thumbnailOptions);
    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${thumbnailUpload.cid}`, animation_url: `ipfs://${mediaUpload.cid}` };
    const metadataUpload = await this.uploadMetadataToPinata(completeMetadata, { pinataMetadata: { name: `${metadata.name} - Metadata`, keyvalues: { type: 'media-nft-metadata', standard: 'TRC-721', nftName: metadata.name } } });
    const tronNFT = await this.mintTronNFT(privateKey, contractAddress, `ipfs://${metadataUpload.cid}`, tokenId);
    const explorerBase = this.network === 'mainnet' ? 'https://tronscan.org/#/transaction' : `https://${this.network}.tronscan.org/#/transaction`;

    return {
      ipfsCid: mediaUpload.cid,
      ipfsUrl: mediaUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
      tokenId,
      contractAddress,
      txId: tronNFT.txId,
      explorerUrl: `${explorerBase}/${tronNFT.txId}`,
    };
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
    const balanceTrx = (balance / 1000000).toString();

    return { address, balanceTrx };
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

export default TronPinataNFTMinter;
