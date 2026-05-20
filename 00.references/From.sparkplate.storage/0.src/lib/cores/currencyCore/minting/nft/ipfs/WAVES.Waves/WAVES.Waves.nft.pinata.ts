// Waves NFT Minting via Pinata IPFS
// Uploads files to Pinata IPFS, then creates native Waves NFT via Issue Transaction

import { issue, broadcast } from '@waves/waves-transactions';
import { publicKey } from '@waves/ts-lib-crypto';
import FormData from 'form-data';
import axios from 'axios';

export interface PinataConfig { apiKey: string; apiSecret: string; jwt?: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; assetId: string; txId: string; explorerUrl: string }
export interface FileUploadOptions { fileName?: string; pinataMetadata?: { name?: string; keyvalues?: Record<string, string | number> }; pinataOptions?: { cidVersion?: 0 | 1 } }

export class WavesPinataNFTMinter {
  private pinataConfig: PinataConfig;
  private pinataBaseUrl = 'https://api.pinata.cloud';
  private pinataGateway = 'https://gateway.pinata.cloud/ipfs';
  private nodeUrl: string;
  private chainId: 'W' | 'T';

  constructor(pinataConfig: PinataConfig, nodeUrl: string = 'https://nodes.wavesnodes.com', chainId: 'W' | 'T' = 'W') {
    this.pinataConfig = pinataConfig;
    this.nodeUrl = nodeUrl;
    this.chainId = chainId;
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

  private async mintWavesNFT(seed: string, metadataUrl: string, metadata: NFTMetadata): Promise<{ assetId: string; txId: string }> {
    const issueTx = issue({
      name: metadata.name.substring(0, 16), // Waves asset name max 16 chars
      description: `${metadata.description.substring(0, 900)} | ${metadataUrl}`, // Waves description max 1000 chars
      quantity: 1,
      decimals: 0,
      reissuable: false,
      chainId: this.chainId,
    }, seed);

    const response = await broadcast(issueTx, this.nodeUrl);
    return { assetId: response.id, txId: response.id };
  }

  async mintNFT(seed: string, fileData: Buffer, metadata: Omit<NFTMetadata, 'image'>, options: FileUploadOptions = {}): Promise<MintResult> {
    console.log('Starting Waves NFT minting process...');
    const fileUpload = await this.uploadFileToPinata(fileData, options);
    console.log(`File uploaded: ${fileUpload.cid}`);

    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${fileUpload.cid}` };
    const metadataUpload = await this.uploadMetadataToPinata(completeMetadata, { pinataMetadata: { name: `${metadata.name} - Metadata`, keyvalues: { type: 'nft-metadata', standard: 'Waves-NFT', nftName: metadata.name } } });
    console.log(`Metadata uploaded: ${metadataUpload.cid}`);

    const wavesNFT = await this.mintWavesNFT(seed, `ipfs://${metadataUpload.cid}`, completeMetadata);
    console.log(`Waves NFT minted: Asset ID ${wavesNFT.assetId}`);

    const explorerBase = this.chainId === 'W' ? 'https://wavesexplorer.com/tx' : 'https://wavesexplorer.com/testnet/tx';

    return {
      ipfsCid: fileUpload.cid,
      ipfsUrl: fileUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
      assetId: wavesNFT.assetId,
      txId: wavesNFT.txId,
      explorerUrl: `${explorerBase}/${wavesNFT.txId}`,
    };
  }

  async mintMediaNFT(seed: string, mediaData: Buffer, thumbnailData: Buffer, metadata: Omit<NFTMetadata, 'image' | 'animation_url'>, options: { mediaOptions?: FileUploadOptions; thumbnailOptions?: FileUploadOptions } = {}): Promise<MintResult> {
    const mediaUpload = await this.uploadFileToPinata(mediaData, options.mediaOptions);
    const thumbnailUpload = await this.uploadFileToPinata(thumbnailData, options.thumbnailOptions);
    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${thumbnailUpload.cid}`, animation_url: `ipfs://${mediaUpload.cid}` };
    const metadataUpload = await this.uploadMetadataToPinata(completeMetadata, { pinataMetadata: { name: `${metadata.name} - Metadata`, keyvalues: { type: 'media-nft-metadata', standard: 'Waves-NFT', nftName: metadata.name } } });
    const wavesNFT = await this.mintWavesNFT(seed, `ipfs://${metadataUpload.cid}`, completeMetadata);
    const explorerBase = this.chainId === 'W' ? 'https://wavesexplorer.com/tx' : 'https://wavesexplorer.com/testnet/tx';

    return {
      ipfsCid: mediaUpload.cid,
      ipfsUrl: mediaUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
      assetId: wavesNFT.assetId,
      txId: wavesNFT.txId,
      explorerUrl: `${explorerBase}/${wavesNFT.txId}`,
    };
  }

  async checkBalance(seedOrAddress: string): Promise<{ address: string; balanceWaves: string }> {
    let address: string;
    if (seedOrAddress.split(' ').length === 15) {
      address = publicKey(seedOrAddress);
    } else {
      address = seedOrAddress;
    }

    const response = await axios.get(`${this.nodeUrl}/addresses/balance/${address}`);
    const balanceWaves = (response.data.balance / 100000000).toString();

    return { address, balanceWaves };
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

export default WavesPinataNFTMinter;
