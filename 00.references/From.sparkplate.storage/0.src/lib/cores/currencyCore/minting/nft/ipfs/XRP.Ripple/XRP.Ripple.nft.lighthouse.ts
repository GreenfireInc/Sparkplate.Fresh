// XRP NFT Minting via Lighthouse IPFS

import { Client, Wallet } from 'xrpl';
import axios from 'axios';
import FormData from 'form-data';

export interface LighthouseConfig { apiKey: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; nftokenId: string; txHash: string; explorerUrl: string }

export class XRPLighthouseNFTMinter {
  private lighthouseConfig: LighthouseConfig;
  private lighthouseBaseUrl = 'https://node.lighthouse.storage/api/v0';
  private lighthouseGateway = 'https://gateway.lighthouse.storage/ipfs';
  private client: Client;
  private network: 'mainnet' | 'testnet' | 'devnet';

  constructor(lighthouseConfig: LighthouseConfig, xrplServer: string = 'wss://xrplcluster.com', network: 'mainnet' | 'testnet' | 'devnet' = 'mainnet') {
    this.lighthouseConfig = lighthouseConfig;
    this.client = new Client(xrplServer);
    this.network = network;
  }

  private async uploadFileToLighthouse(fileData: Buffer, fileName: string): Promise<{ cid: string; url: string }> {
    const formData = new FormData();
    formData.append('file', fileData, fileName);
    const response = await axios.post(`${this.lighthouseBaseUrl}/add`, formData, { headers: { ...formData.getHeaders(), Authorization: `Bearer ${this.lighthouseConfig.apiKey}` }, maxContentLength: Infinity, maxBodyLength: Infinity });
    const cid = response.data.Hash;
    return { cid, url: `${this.lighthouseGateway}/${cid}` };
  }

  private async uploadJSONToLighthouse(metadata: NFTMetadata, fileName: string): Promise<{ cid: string; url: string }> {
    const jsonBuffer = Buffer.from(JSON.stringify(metadata, null, 2));
    const formData = new FormData();
    formData.append('file', jsonBuffer, fileName);
    const response = await axios.post(`${this.lighthouseBaseUrl}/add`, formData, { headers: { ...formData.getHeaders(), Authorization: `Bearer ${this.lighthouseConfig.apiKey}` } });
    const cid = response.data.Hash;
    return { cid, url: `${this.lighthouseGateway}/${cid}` };
  }

  private convertStringToHex(str: string): string {
    return Buffer.from(str, 'utf-8').toString('hex').toUpperCase();
  }

  private async mintXRPNFT(seed: string, metadataUrl: string, taxon: number = 0): Promise<{ nftokenId: string; txHash: string }> {
    await this.client.connect();
    
    try {
      const wallet = Wallet.fromSeed(seed);
      
      const nftMintTx = {
        TransactionType: 'NFTokenMint',
        Account: wallet.address,
        URI: this.convertStringToHex(metadataUrl),
        Flags: 8,
        TransferFee: 0,
        NFTokenTaxon: taxon,
      };

      const prepared = await this.client.autofill(nftMintTx);
      const signed = wallet.sign(prepared);
      const result = await this.client.submitAndWait(signed.tx_blob);

      const meta = result.result.meta as any;
      const nftokenId = meta?.nftoken_id || meta?.CreatedNode?.find((n: any) => n.CreatedNode?.LedgerEntryType === 'NFTokenPage')?.CreatedNode?.NewFields?.NFTokens?.[0]?.NFToken?.NFTokenID || '';

      return { nftokenId, txHash: result.result.hash };
    } finally {
      await this.client.disconnect();
    }
  }

  async mintNFT(seed: string, fileData: Buffer, metadata: Omit<NFTMetadata, 'image'>, taxon: number = 0, fileName: string = 'nft-asset'): Promise<MintResult> {
    console.log('Starting XRP NFT minting process...');
    const fileUpload = await this.uploadFileToLighthouse(fileData, fileName);
    console.log(`File uploaded: ${fileUpload.cid}`);

    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${fileUpload.cid}` };
    const metadataUpload = await this.uploadJSONToLighthouse(completeMetadata, `${fileName.replace(/\.[^/.]+$/, '')}_metadata.json`);
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
}

export default XRPLighthouseNFTMinter;

