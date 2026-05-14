// Tezos NFT Minting via Crust Network

import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import axios from 'axios';
import FormData from 'form-data';

export interface CrustConfig { authToken: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; tokenId: string; contractAddress: string; opHash: string; explorerUrl: string }

export class TezosCrustNFTMinter {
  private crustConfig: CrustConfig;
  private crustBaseUrl = 'https://gw.crustfiles.app/api/v0';
  private crustGateway = 'https://gw.crustfiles.app/ipfs';
  private tezos: TezosToolkit;
  private network: 'mainnet' | 'ghostnet' | 'kathmandunet';

  constructor(crustConfig: CrustConfig, rpcUrl: string = 'https://mainnet.api.tez.ie', network: 'mainnet' | 'ghostnet' | 'kathmandunet' = 'mainnet') {
    this.crustConfig = crustConfig;
    this.tezos = new TezosToolkit(rpcUrl);
    this.network = network;
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
    const fileUpload = await this.uploadFileToCrust(fileData, fileName);
    console.log(`File uploaded: ${fileUpload.cid}`);

    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${fileUpload.cid}` };
    const metadataUpload = await this.uploadJSONToCrust(completeMetadata, `${fileName.replace(/\.[^/.]+$/, '')}_metadata.json`);
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

export default TezosCrustNFTMinter;

