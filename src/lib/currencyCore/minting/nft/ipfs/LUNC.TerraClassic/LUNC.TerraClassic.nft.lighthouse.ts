// Terra Classic NFT Minting via Lighthouse IPFS

import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { GasPrice } from '@cosmjs/stargate';
import axios from 'axios';
import FormData from 'form-data';

export interface LighthouseConfig { apiKey: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; tokenId: string; contractAddress: string; txHash: string; finderUrl: string }

export class TerraClassicLighthouseNFTMinter {
  private lighthouseConfig: LighthouseConfig;
  private lighthouseBaseUrl = 'https://node.lighthouse.storage/api/v0';
  private lighthouseGateway = 'https://gateway.lighthouse.storage/ipfs';
  private rpcEndpoint: string;
  private network: 'mainnet' | 'testnet';

  constructor(lighthouseConfig: LighthouseConfig, rpcEndpoint: string = 'https://terra-classic-lcd.publicnode.com', network: 'mainnet' | 'testnet' = 'mainnet') { this.lighthouseConfig = lighthouseConfig; this.rpcEndpoint = rpcEndpoint; this.network = network; }

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

  private async mintTerraClassicNFT(mnemonic: string, contractAddress: string, metadataUrl: string, metadata: NFTMetadata, tokenId: string): Promise<{ txHash: string; tokenId: string }> {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: 'terra' });
    const [firstAccount] = await wallet.getAccounts();
    const client = await SigningCosmWasmClient.connectWithSigner(this.rpcEndpoint, wallet, { gasPrice: GasPrice.fromString('0.15uluna') });
    const mintMsg = { mint: { token_id: tokenId, owner: firstAccount.address, token_uri: metadataUrl, extension: { name: metadata.name, description: metadata.description, image: metadata.image, attributes: metadata.attributes } } };
    const result = await client.execute(firstAccount.address, contractAddress, mintMsg, 'auto', 'Minting NFT');
    return { txHash: result.transactionHash, tokenId };
  }

  async mintNFT(mnemonic: string, contractAddress: string, fileData: Buffer, fileName: string, metadata: Omit<NFTMetadata, 'image'>, tokenId: string): Promise<MintResult> {
    const fileUpload = await this.uploadFileToLighthouse(fileData, fileName);
    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${fileUpload.cid}` };
    const metadataUpload = await this.uploadJSONToLighthouse(completeMetadata, `${fileName.replace(/\.[^/.]+$/, '')}_metadata.json`);
    const terraClassicNFT = await this.mintTerraClassicNFT(mnemonic, contractAddress, `ipfs://${metadataUpload.cid}`, completeMetadata, tokenId);
    const explorerBase = this.network === 'mainnet' ? 'https://finder.terra.money/classic/tx' : 'https://finder.terra.money/testnet/tx';
    return { ipfsCid: fileUpload.cid, ipfsUrl: fileUpload.url, metadataCid: metadataUpload.cid, metadataUrl: metadataUpload.url, tokenId: terraClassicNFT.tokenId, contractAddress, txHash: terraClassicNFT.txHash, finderUrl: `${explorerBase}/${terraClassicNFT.txHash}` };
  }

  async checkBalance(mnemonicOrAddress: string): Promise<{ address: string; balanceLunc: string }> {
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
    return { address, balanceLunc: (parseInt(balance.amount) / 1000000).toString() };
  }
}

export default TerraClassicLighthouseNFTMinter;
