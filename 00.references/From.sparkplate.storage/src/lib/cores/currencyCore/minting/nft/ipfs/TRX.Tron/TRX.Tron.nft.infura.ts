// Tron NFT Minting via Infura IPFS

import TronWeb from 'tronweb';
import { create } from 'kubo-rpc-client';
import type { IPFSHTTPClient } from 'kubo-rpc-client';

export interface InfuraConfig { projectId: string; projectSecret: string; dedicatedGateway?: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; tokenId: string; contractAddress: string; txId: string; explorerUrl: string }

export class TronInfuraNFTMinter {
  private ipfs: IPFSHTTPClient;
  private infuraGateway: string;
  private tronWeb: TronWeb;
  private network: 'mainnet' | 'shasta' | 'nile';

  constructor(infuraConfig: InfuraConfig, fullNode: string = 'https://api.trongrid.io', network: 'mainnet' | 'shasta' | 'nile' = 'mainnet') {
    const auth = 'Basic ' + Buffer.from(infuraConfig.projectId + ':' + infuraConfig.projectSecret).toString('base64');
    this.ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', headers: { authorization: auth } });
    this.infuraGateway = infuraConfig.dedicatedGateway || 'https://infura-ipfs.io/ipfs';
    this.tronWeb = new TronWeb({ fullHost: fullNode });
    this.network = network;
  }

  private async uploadFileToInfura(fileData: Buffer, fileName: string): Promise<{ cid: string; url: string }> {
    const result = await this.ipfs.add({ path: fileName, content: fileData }, { pin: true });
    const cid = result.cid.toString();
    return { cid, url: `${this.infuraGateway}/${cid}` };
  }

  private async uploadMetadataToInfura(metadata: NFTMetadata, fileName: string = 'metadata.json'): Promise<{ cid: string; url: string }> {
    const jsonBuffer = Buffer.from(JSON.stringify(metadata, null, 2));
    const result = await this.ipfs.add({ path: fileName, content: jsonBuffer }, { pin: true });
    const cid = result.cid.toString();
    return { cid, url: `${this.infuraGateway}/${cid}` };
  }

  private async mintTronNFT(privateKey: string, contractAddress: string, metadataUrl: string, tokenId: string): Promise<{ txId: string }> {
    this.tronWeb.setPrivateKey(privateKey);
    const contract = await this.tronWeb.contract().at(contractAddress);
    const tx = await contract.mint(this.tronWeb.address.fromPrivateKey(privateKey), tokenId, metadataUrl).send({ feeLimit: 1000000000, callValue: 0, shouldPollResponse: true });
    return { txId: tx };
  }

  async mintNFT(privateKey: string, contractAddress: string, fileData: Buffer, fileName: string, metadata: Omit<NFTMetadata, 'image'>, tokenId: string): Promise<MintResult> {
    const fileUpload = await this.uploadFileToInfura(fileData, fileName);
    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${fileUpload.cid}` };
    const metadataUpload = await this.uploadMetadataToInfura(completeMetadata, `${fileName.replace(/\.[^/.]+$/, '')}_metadata.json`);
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

export default TronInfuraNFTMinter;
