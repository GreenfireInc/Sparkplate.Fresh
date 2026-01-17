// XRP NFT Minting via Pinata IPFS
// Uploads files to Pinata IPFS, then creates native XRP NFT via NFTokenMint

import { Client, Wallet, xrpToDrops } from 'xrpl';
import FormData from 'form-data';
import axios from 'axios';

export interface PinataConfig { apiKey: string; apiSecret: string; jwt?: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; nftokenId: string; txHash: string; explorerUrl: string }
export interface FileUploadOptions { fileName?: string; pinataMetadata?: { name?: string; keyvalues?: Record<string, string | number> }; pinataOptions?: { cidVersion?: 0 | 1 } }

export class XRPPinataNFTMinter {
  private pinataConfig: PinataConfig;
  private pinataBaseUrl = 'https://api.pinata.cloud';
  private pinataGateway = 'https://gateway.pinata.cloud/ipfs';
  private client: Client;
  private network: 'mainnet' | 'testnet' | 'devnet';

  constructor(pinataConfig: PinataConfig, xrplServer: string = 'wss://xrplcluster.com', network: 'mainnet' | 'testnet' | 'devnet' = 'mainnet') {
    this.pinataConfig = pinataConfig;
    this.client = new Client(xrplServer);
    this.network = network;
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

  private convertStringToHex(str: string): string {
    return Buffer.from(str, 'utf-8').toString('hex').toUpperCase();
  }

  private async mintXRPNFT(seed: string, metadataUrl: string, taxon: number = 0): Promise<{ nftokenId: string; txHash: string }> {
    await this.client.connect();
    
    try {
      const wallet = Wallet.fromSeed(seed);
      
      // Prepare NFTokenMint transaction
      const nftMintTx = {
        TransactionType: 'NFTokenMint',
        Account: wallet.address,
        URI: this.convertStringToHex(metadataUrl),
        Flags: 8, // tfTransferable
        TransferFee: 0,
        NFTokenTaxon: taxon,
      };

      // Submit transaction
      const prepared = await this.client.autofill(nftMintTx);
      const signed = wallet.sign(prepared);
      const result = await this.client.submitAndWait(signed.tx_blob);

      // Extract NFTokenID from metadata
      const meta = result.result.meta as any;
      const nftokenId = meta?.nftoken_id || meta?.CreatedNode?.find((n: any) => n.CreatedNode?.LedgerEntryType === 'NFTokenPage')?.CreatedNode?.NewFields?.NFTokens?.[0]?.NFToken?.NFTokenID || '';

      return { nftokenId, txHash: result.result.hash };
    } finally {
      await this.client.disconnect();
    }
  }

  async mintNFT(seed: string, fileData: Buffer, metadata: Omit<NFTMetadata, 'image'>, taxon: number = 0, options: FileUploadOptions = {}): Promise<MintResult> {
    console.log('Starting XRP NFT minting process...');
    const fileUpload = await this.uploadFileToPinata(fileData, options);
    console.log(`File uploaded: ${fileUpload.cid}`);

    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${fileUpload.cid}` };
    const metadataUpload = await this.uploadMetadataToPinata(completeMetadata, { pinataMetadata: { name: `${metadata.name} - Metadata`, keyvalues: { type: 'nft-metadata', standard: 'XLS-20', nftName: metadata.name } } });
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

  async mintMediaNFT(seed: string, mediaData: Buffer, thumbnailData: Buffer, metadata: Omit<NFTMetadata, 'image' | 'animation_url'>, taxon: number = 0, options: { mediaOptions?: FileUploadOptions; thumbnailOptions?: FileUploadOptions } = {}): Promise<MintResult> {
    const mediaUpload = await this.uploadFileToPinata(mediaData, options.mediaOptions);
    const thumbnailUpload = await this.uploadFileToPinata(thumbnailData, options.thumbnailOptions);
    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${thumbnailUpload.cid}`, animation_url: `ipfs://${mediaUpload.cid}` };
    const metadataUpload = await this.uploadMetadataToPinata(completeMetadata, { pinataMetadata: { name: `${metadata.name} - Metadata`, keyvalues: { type: 'media-nft-metadata', standard: 'XLS-20', nftName: metadata.name } } });
    const xrpNFT = await this.mintXRPNFT(seed, `ipfs://${metadataUpload.cid}`, taxon);
    
    const explorerBase = this.network === 'mainnet' 
      ? 'https://livenet.xrpl.org/transactions' 
      : this.network === 'testnet' 
      ? 'https://testnet.xrpl.org/transactions' 
      : 'https://devnet.xrpl.org/transactions';

    return {
      ipfsCid: mediaUpload.cid,
      ipfsUrl: mediaUpload.url,
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

export default XRPPinataNFTMinter;
