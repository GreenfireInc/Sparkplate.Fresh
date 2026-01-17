// Tron NFT Minting via Fleek IPFS

import TronWeb from 'tronweb';
import axios from 'axios';
import FormData from 'form-data';

export interface FleekConfig { apiKey: string; apiSecret: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; tokenId: string; contractAddress: string; txId: string; explorerUrl: string }

export class TronFleekNFTMinter {
  private fleekConfig: FleekConfig;
  private fleekBaseUrl = 'https://api.fleek.co/ipfs';
  private fleekGateway = 'https://ipfs.fleek.co/ipfs';
  private tronWeb: TronWeb;
  private network: 'mainnet' | 'shasta' | 'nile';

  constructor(fleekConfig: FleekConfig, fullNode: string = 'https://api.trongrid.io', network: 'mainnet' | 'shasta' | 'nile' = 'mainnet') {
    this.fleekConfig = fleekConfig;
    this.tronWeb = new TronWeb({ fullHost: fullNode });
    this.network = network;
  }

  private async uploadFileToFleek(fileData: Buffer, fileName: string): Promise<{ cid: string; url: string }> {
    const formData = new FormData();
    formData.append('file', fileData, fileName);
    const response = await axios.post(`${this.fleekBaseUrl}/add`, formData, { headers: { ...formData.getHeaders(), 'x-api-key': this.fleekConfig.apiKey, 'x-api-secret': this.fleekConfig.apiSecret }, maxContentLength: Infinity, maxBodyLength: Infinity });
    const cid = response.data.hash;
    return { cid, url: `${this.fleekGateway}/${cid}` };
  }

  private async uploadJSONToFleek(metadata: NFTMetadata, fileName: string): Promise<{ cid: string; url: string }> {
    const jsonBuffer = Buffer.from(JSON.stringify(metadata, null, 2));
    const formData = new FormData();
    formData.append('file', jsonBuffer, fileName);
    const response = await axios.post(`${this.fleekBaseUrl}/add`, formData, { headers: { ...formData.getHeaders(), 'x-api-key': this.fleekConfig.apiKey, 'x-api-secret': this.fleekConfig.apiSecret } });
    const cid = response.data.hash;
    return { cid, url: `${this.fleekGateway}/${cid}` };
  }

  private async mintTronNFT(privateKey: string, contractAddress: string, metadataUrl: string, tokenId: string): Promise<{ txId: string }> {
    this.tronWeb.setPrivateKey(privateKey);
    const contract = await this.tronWeb.contract().at(contractAddress);
    const tx = await contract.mint(this.tronWeb.address.fromPrivateKey(privateKey), tokenId, metadataUrl).send({ feeLimit: 1000000000, callValue: 0, shouldPollResponse: true });
    return { txId: tx };
  }

  async mintNFT(privateKey: string, contractAddress: string, fileData: Buffer, fileName: string, metadata: Omit<NFTMetadata, 'image'>, tokenId: string): Promise<MintResult> {
    const fileUpload = await this.uploadFileToFleek(fileData, fileName);
    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${fileUpload.cid}` };
    const metadataUpload = await this.uploadJSONToFleek(completeMetadata, `${fileName.replace(/\.[^/.]+$/, '')}_metadata.json`);
    const tronNFT = await this.mintTronNFT(privateKey, contractAddress, `ipfs://${metadataUpload.cid}`, tokenId);
    const explorerBase = this.network === 'mainnet' ? 'https://tronscan.org/#/transaction' : `https://${this.network}.tronscan.org/#/transaction`;
    return { ipfsCid: fileUpload.cid, ipfsUrl: fileUpload.url, metadataCid: metadataUpload.cid, metadataUrl: metadataUpload.url, tokenId, contractAddress, txId: tronNFT.txId, explorerUrl: `${explorerBase}/${tronNFT.txId}` };
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
    return { address, balanceTrx: (balance / 1000000).toString() };
  }
}

export default TronFleekNFTMinter;
