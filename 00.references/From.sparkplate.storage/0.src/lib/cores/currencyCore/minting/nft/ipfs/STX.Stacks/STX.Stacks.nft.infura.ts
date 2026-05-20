// Stacks NFT Minting via Infura IPFS

import { makeContractCall, broadcastTransaction, AnchorMode, PostConditionMode, Cl } from '@stacks/transactions';
import { StacksMainnet, StacksTestnet } from '@stacks/network';
import { create } from 'kubo-rpc-client';
import type { IPFSHTTPClient } from 'kubo-rpc-client';
import axios from 'axios';

export interface InfuraConfig { projectId: string; projectSecret: string; dedicatedGateway?: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; tokenId: string; contractAddress: string; txId: string; explorerUrl: string }

export class StacksInfuraNFTMinter {
  private ipfs: IPFSHTTPClient;
  private infuraGateway: string;
  private network: StacksMainnet | StacksTestnet;
  private networkName: 'mainnet' | 'testnet';

  constructor(infuraConfig: InfuraConfig, network: 'mainnet' | 'testnet' = 'mainnet') {
    const auth = 'Basic ' + Buffer.from(infuraConfig.projectId + ':' + infuraConfig.projectSecret).toString('base64');
    this.ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', headers: { authorization: auth } });
    this.infuraGateway = infuraConfig.dedicatedGateway || 'https://infura-ipfs.io/ipfs';
    this.network = network === 'mainnet' ? new StacksMainnet() : new StacksTestnet();
    this.networkName = network;
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
    const fileUpload = await this.uploadFileToInfura(fileData, fileName);
    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${fileUpload.cid}` };
    const metadataUpload = await this.uploadMetadataToInfura(completeMetadata, `${fileName.replace(/\.[^/.]+$/, '')}_metadata.json`);
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

export default StacksInfuraNFTMinter;
