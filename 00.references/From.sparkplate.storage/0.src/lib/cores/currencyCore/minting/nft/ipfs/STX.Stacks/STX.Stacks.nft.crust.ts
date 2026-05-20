// Stacks NFT Minting via Crust Network

import { makeContractCall, broadcastTransaction, AnchorMode, PostConditionMode, Cl } from '@stacks/transactions';
import { StacksMainnet, StacksTestnet } from '@stacks/network';
import axios from 'axios';
import FormData from 'form-data';

export interface CrustConfig { authToken: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; tokenId: string; contractAddress: string; txId: string; explorerUrl: string }

export class StacksCrustNFTMinter {
  private crustConfig: CrustConfig;
  private crustBaseUrl = 'https://gw.crustfiles.app/api/v0';
  private crustGateway = 'https://gw.crustfiles.app/ipfs';
  private network: StacksMainnet | StacksTestnet;
  private networkName: 'mainnet' | 'testnet';

  constructor(crustConfig: CrustConfig, network: 'mainnet' | 'testnet' = 'mainnet') {
    this.crustConfig = crustConfig;
    this.network = network === 'mainnet' ? new StacksMainnet() : new StacksTestnet();
    this.networkName = network;
  }

  private async uploadFileToCrust(fileData: Buffer, fileName: string): Promise<{ cid: string; url: string }> {
    const formData = new FormData();
    formData.append('file', fileData, fileName);
    const response = await axios.post(`${this.crustBaseUrl}/add`, formData, { headers: { ...formData.getHeaders(), Authorization: `Bearer ${this.crustConfig.authToken}` }, maxContentLength: Infinity, maxBodyLength: Infinity });
    const cid = response.data.Hash;
    return { cid, url: `${this.crustGateway}/${cid}` };
  }

  private async uploadJSONToCrust(metadata: NFTMetadata, fileName: string): Promise<{ cid: string; url: string }> {
    const jsonBuffer = Buffer.from(JSON.stringify(metadata, null, 2));
    const formData = new FormData();
    formData.append('file', jsonBuffer, fileName);
    const response = await axios.post(`${this.crustBaseUrl}/add`, formData, { headers: { ...formData.getHeaders(), Authorization: `Bearer ${this.crustConfig.authToken}` } });
    const cid = response.data.Hash;
    return { cid, url: `${this.crustGateway}/${cid}` };
  }

  private async mintStacksNFT(privateKey: string, contractAddress: string, contractName: string, metadataUrl: string, tokenId: string): Promise<{ txId: string }> {
    const txOptions = {
      contractAddress, contractName, functionName: 'mint', functionArgs: [Cl.uint(tokenId), Cl.stringAscii(metadataUrl)],
      senderKey: privateKey, network: this.network, anchorMode: AnchorMode.Any, postConditionMode: PostConditionMode.Allow,
    };
    const transaction = await makeContractCall(txOptions);
    const broadcastResponse = await broadcastTransaction(transaction, this.network);
    if (typeof broadcastResponse === 'string') { return { txId: broadcastResponse }; }
    else if ('txid' in broadcastResponse) { return { txId: broadcastResponse.txid }; }
    else { throw new Error('Transaction broadcast failed'); }
  }

  async mintNFT(privateKey: string, contractAddress: string, contractName: string, fileData: Buffer, fileName: string, metadata: Omit<NFTMetadata, 'image'>, tokenId: string): Promise<MintResult> {
    const fileUpload = await this.uploadFileToCrust(fileData, fileName);
    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${fileUpload.cid}` };
    const metadataUpload = await this.uploadJSONToCrust(completeMetadata, `${fileName.replace(/\.[^/.]+$/, '')}_metadata.json`);
    const stacksNFT = await this.mintStacksNFT(privateKey, contractAddress, contractName, `ipfs://${metadataUpload.cid}`, tokenId);
    const explorerBase = this.networkName === 'mainnet' ? 'https://explorer.stacks.co/txid' : 'https://explorer.stacks.co/txid?chain=testnet';
    return { ipfsCid: fileUpload.cid, ipfsUrl: fileUpload.url, metadataCid: metadataUpload.cid, metadataUrl: metadataUpload.url, tokenId, contractAddress: `${contractAddress}.${contractName}`, txId: stacksNFT.txId, explorerUrl: `${explorerBase}/${stacksNFT.txId}` };
  }

  async checkBalance(address: string): Promise<{ address: string; balanceStx: string }> {
    const apiUrl = this.networkName === 'mainnet' ? 'https://stacks-node-api.mainnet.stacks.co' : 'https://stacks-node-api.testnet.stacks.co';
    const response = await axios.get(`${apiUrl}/v2/accounts/${address}`);
    return { address, balanceStx: (parseInt(response.data.balance) / 1000000).toString() };
  }
}

export default StacksCrustNFTMinter;
