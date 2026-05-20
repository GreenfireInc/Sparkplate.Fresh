// Terra NFT Minting via Pinata IPFS
// Uploads files to Pinata IPFS, then creates CW721 NFT on Terra

import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { GasPrice } from '@cosmjs/stargate';
import FormData from 'form-data';
import axios from 'axios';

export interface PinataConfig { apiKey: string; apiSecret: string; jwt?: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; tokenId: string; contractAddress: string; txHash: string; finderUrl: string }
export interface FileUploadOptions { fileName?: string; pinataMetadata?: { name?: string; keyvalues?: Record<string, string | number> }; pinataOptions?: { cidVersion?: 0 | 1 } }

export class TerraPinataNFTMinter {
  private pinataConfig: PinataConfig;
  private pinataBaseUrl = 'https://api.pinata.cloud';
  private pinataGateway = 'https://gateway.pinata.cloud/ipfs';
  private rpcEndpoint: string;
  private network: 'mainnet' | 'testnet';

  constructor(pinataConfig: PinataConfig, rpcEndpoint: string = 'https://phoenix-lcd.terra.dev', network: 'mainnet' | 'testnet' = 'mainnet') {
    this.pinataConfig = pinataConfig;
    this.rpcEndpoint = rpcEndpoint;
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

  private async mintTerraNFT(mnemonic: string, contractAddress: string, metadataUrl: string, metadata: NFTMetadata, tokenId: string): Promise<{ txHash: string; tokenId: string }> {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: 'terra' });
    const [firstAccount] = await wallet.getAccounts();
    const client = await SigningCosmWasmClient.connectWithSigner(this.rpcEndpoint, wallet, { gasPrice: GasPrice.fromString('0.15uluna') });

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

    const result = await client.execute(firstAccount.address, contractAddress, mintMsg, 'auto', 'Minting NFT');
    return { txHash: result.transactionHash, tokenId };
  }

  async mintNFT(mnemonic: string, contractAddress: string, fileData: Buffer, metadata: Omit<NFTMetadata, 'image'>, tokenId: string, options: FileUploadOptions = {}): Promise<MintResult> {
    console.log('Starting NFT minting process...');
    const fileUpload = await this.uploadFileToPinata(fileData, options);
    console.log(`File uploaded: ${fileUpload.cid}`);

    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${fileUpload.cid}` };
    const metadataUpload = await this.uploadMetadataToPinata(completeMetadata, { pinataMetadata: { name: `${metadata.name} - Metadata`, keyvalues: { type: 'nft-metadata', standard: 'CW721', nftName: metadata.name } } });
    console.log(`Metadata uploaded: ${metadataUpload.cid}`);

    const terraNFT = await this.mintTerraNFT(mnemonic, contractAddress, `ipfs://${metadataUpload.cid}`, completeMetadata, tokenId);
    console.log(`Terra NFT minted: Token ID ${terraNFT.tokenId}`);

    const explorerBase = this.network === 'mainnet' ? 'https://finder.terra.money/mainnet/tx' : 'https://finder.terra.money/testnet/tx';

    return {
      ipfsCid: fileUpload.cid,
      ipfsUrl: fileUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
      tokenId: terraNFT.tokenId,
      contractAddress,
      txHash: terraNFT.txHash,
      finderUrl: `${explorerBase}/${terraNFT.txHash}`,
    };
  }

  async mintMediaNFT(mnemonic: string, contractAddress: string, mediaData: Buffer, thumbnailData: Buffer, metadata: Omit<NFTMetadata, 'image' | 'animation_url'>, tokenId: string, options: { mediaOptions?: FileUploadOptions; thumbnailOptions?: FileUploadOptions } = {}): Promise<MintResult> {
    const mediaUpload = await this.uploadFileToPinata(mediaData, options.mediaOptions);
    const thumbnailUpload = await this.uploadFileToPinata(thumbnailData, options.thumbnailOptions);
    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${thumbnailUpload.cid}`, animation_url: `ipfs://${mediaUpload.cid}` };
    const metadataUpload = await this.uploadMetadataToPinata(completeMetadata, { pinataMetadata: { name: `${metadata.name} - Metadata`, keyvalues: { type: 'media-nft-metadata', standard: 'CW721', nftName: metadata.name } } });
    const terraNFT = await this.mintTerraNFT(mnemonic, contractAddress, `ipfs://${metadataUpload.cid}`, completeMetadata, tokenId);
    const explorerBase = this.network === 'mainnet' ? 'https://finder.terra.money/mainnet/tx' : 'https://finder.terra.money/testnet/tx';

    return {
      ipfsCid: mediaUpload.cid,
      ipfsUrl: mediaUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
      tokenId: terraNFT.tokenId,
      contractAddress,
      txHash: terraNFT.txHash,
      finderUrl: `${explorerBase}/${terraNFT.txHash}`,
    };
  }

  async checkBalance(mnemonicOrAddress: string): Promise<{ address: string; balanceLuna: string }> {
    let address: string;
    if (mnemonicOrAddress.split(' ').length >= 12) {
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonicOrAddress, { prefix: 'terra' });
      const [firstAccount] = await wallet.getAccounts();
      address = firstAccount.address;
    } else {
      address = mnemonicOrAddress;
    }

    const client = await SigningCosmWasmClient.connect(this.rpcEndpoint);
    const balance = await client.getBalance(address, 'uluna');
    const balanceLuna = (parseInt(balance.amount) / 1000000).toString();

    return { address, balanceLuna };
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

export default TerraPinataNFTMinter;
