// Tezos NFT Minting via Infura IPFS

import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import { create } from 'kubo-rpc-client';
import type { IPFSHTTPClient } from 'kubo-rpc-client';

export interface InfuraConfig { projectId: string; projectSecret: string; dedicatedGateway?: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; tokenId: string; contractAddress: string; opHash: string; explorerUrl: string }

export class TezosInfuraNFTMinter {
  private ipfs: IPFSHTTPClient;
  private infuraGateway: string;
  private tezos: TezosToolkit;
  private network: 'mainnet' | 'ghostnet' | 'kathmandunet';

  constructor(infuraConfig: InfuraConfig, rpcUrl: string = 'https://mainnet.api.tez.ie', network: 'mainnet' | 'ghostnet' | 'kathmandunet' = 'mainnet') {
    const auth = 'Basic ' + Buffer.from(infuraConfig.projectId + ':' + infuraConfig.projectSecret).toString('base64');
    this.ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', headers: { authorization: auth } });
    this.infuraGateway = infuraConfig.dedicatedGateway || 'https://infura-ipfs.io/ipfs';
    this.tezos = new TezosToolkit(rpcUrl);
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

  private async mintTezosNFT(privateKey: string, contractAddress: string, metadataUrl: string, tokenId: string): Promise<{ opHash: string }> {
    const signer = new InMemorySigner(privateKey);
    this.tezos.setProvider({ signer });

    const contract = await this.tezos.contract.at(contractAddress);
    
    const operation = await contract.methods.mint(
      tokenId,
      { 
        token_id: tokenId,
        token_info: {
          '': Buffer.from(metadataUrl).toString('hex')
        }
      }
    ).send();

    await operation.confirmation();
    return { opHash: operation.hash };
  }

  async mintNFT(privateKey: string, contractAddress: string, fileData: Buffer, metadata: Omit<NFTMetadata, 'image'>, tokenId: string, fileName: string = 'nft-asset'): Promise<MintResult> {
    console.log('Starting Tezos NFT minting process...');
    const fileUpload = await this.uploadFileToInfura(fileData, fileName);
    console.log(`File uploaded: ${fileUpload.cid}`);

    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${fileUpload.cid}` };
    const metadataUpload = await this.uploadMetadataToInfura(completeMetadata, `${fileName.replace(/\.[^/.]+$/, '')}_metadata.json`);
    console.log(`Metadata uploaded: ${metadataUpload.cid}`);

    const tezosNFT = await this.mintTezosNFT(privateKey, contractAddress, `ipfs://${metadataUpload.cid}`, tokenId);
    console.log(`Tezos NFT minted: Token ID ${tokenId}`);

    const explorerBase = this.network === 'mainnet' 
      ? 'https://tzkt.io' 
      : this.network === 'ghostnet' 
      ? 'https://ghostnet.tzkt.io' 
      : 'https://kathmandunet.tzkt.io';

    return {
      ipfsCid: fileUpload.cid,
      ipfsUrl: fileUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
      tokenId,
      contractAddress,
      opHash: tezosNFT.opHash,
      explorerUrl: `${explorerBase}/${tezosNFT.opHash}`,
    };
  }

  async checkBalance(privateKeyOrAddress: string): Promise<{ address: string; balanceXtz: string }> {
    let address: string;
    if (privateKeyOrAddress.startsWith('edsk')) {
      const signer = new InMemorySigner(privateKeyOrAddress);
      address = await signer.publicKeyHash();
    } else {
      address = privateKeyOrAddress;
    }

    const balance = await this.tezos.tz.getBalance(address);
    const balanceXtz = (balance.toNumber() / 1000000).toString();

    return { address, balanceXtz };
  }
}

export default TezosInfuraNFTMinter;

