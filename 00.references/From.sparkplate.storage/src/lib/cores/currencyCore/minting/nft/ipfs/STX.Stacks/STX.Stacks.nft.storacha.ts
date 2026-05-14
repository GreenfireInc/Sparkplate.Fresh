// Stacks NFT Minting via Storacha

import { makeContractCall, broadcastTransaction, AnchorMode, PostConditionMode, Cl } from '@stacks/transactions';
import { StacksMainnet, StacksTestnet } from '@stacks/network';
import axios from 'axios';

export interface StorachaConfig { email: string; space?: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; tokenId: string; contractAddress: string; txId: string; explorerUrl: string }

export class StacksStorachaNFTMinter {
  private storachaConfig: StorachaConfig;
  private storachaGateway = 'https://w3s.link/ipfs';
  private network: StacksMainnet | StacksTestnet;
  private networkName: 'mainnet' | 'testnet';

  constructor(storachaConfig: StorachaConfig, network: 'mainnet' | 'testnet' = 'mainnet') {
    this.storachaConfig = storachaConfig;
    this.network = network === 'mainnet' ? new StacksMainnet() : new StacksTestnet();
    this.networkName = network;
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
    const fileCid = 'placeholder-cid';
    const metadataCid = 'placeholder-metadata-cid';
    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${fileCid}` };
    const stacksNFT = await this.mintStacksNFT(privateKey, contractAddress, contractName, `ipfs://${metadataCid}`, tokenId);
    const explorerBase = this.networkName === 'mainnet' ? 'https://explorer.stacks.co/txid' : 'https://explorer.stacks.co/txid?chain=testnet';
    return { ipfsCid: fileCid, ipfsUrl: `${this.storachaGateway}/${fileCid}`, metadataCid, metadataUrl: `${this.storachaGateway}/${metadataCid}`, tokenId, contractAddress: `${contractAddress}.${contractName}`, txId: stacksNFT.txId, explorerUrl: `${explorerBase}/${stacksNFT.txId}` };
  }

  async checkBalance(address: string): Promise<{ address: string; balanceStx: string }> {
    const apiUrl = this.networkName === 'mainnet' ? 'https://stacks-node-api.mainnet.stacks.co' : 'https://stacks-node-api.testnet.stacks.co';
    const response = await axios.get(`${apiUrl}/v2/accounts/${address}`);
    return { address, balanceStx: (parseInt(response.data.balance) / 1000000).toString() };
  }
}

export default StacksStorachaNFTMinter;
