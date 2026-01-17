// Terra Classic NFT Minting via Fleek IPFS

import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { GasPrice } from '@cosmjs/stargate';
import axios from 'axios';
import FormData from 'form-data';

export interface FleekConfig { apiKey: string; apiSecret: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; tokenId: string; contractAddress: string; txHash: string; finderUrl: string }

export class TerraClassicFleekNFTMinter {
  private fleekConfig: FleekConfig;
  private fleekBaseUrl = 'https://api.fleek.co/ipfs';
  private fleekGateway = 'https://ipfs.fleek.co/ipfs';
  private rpcEndpoint: string;
  private network: 'mainnet' | 'testnet';

  constructor(fleekConfig: FleekConfig, rpcEndpoint: string = 'https://terra-classic-lcd.publicnode.com', network: 'mainnet' | 'testnet' = 'mainnet') { this.fleekConfig = fleekConfig; this.rpcEndpoint = rpcEndpoint; this.network = network; }

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

  private async mintTerraClassicNFT(mnemonic: string, contractAddress: string, metadataUrl: string, metadata: NFTMetadata, tokenId: string): Promise<{ txHash: string; tokenId: string }> {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: 'terra' });
    const [firstAccount] = await wallet.getAccounts();
    const client = await SigningCosmWasmClient.connectWithSigner(this.rpcEndpoint, wallet, { gasPrice: GasPrice.fromString('0.15uluna') });
    const mintMsg = { mint: { token_id: tokenId, owner: firstAccount.address, token_uri: metadataUrl, extension: { name: metadata.name, description: metadata.description, image: metadata.image, attributes: metadata.attributes } } };
    const result = await client.execute(firstAccount.address, contractAddress, mintMsg, 'auto', 'Minting NFT');
    return { txHash: result.transactionHash, tokenId };
  }

  async mintNFT(mnemonic: string, contractAddress: string, fileData: Buffer, fileName: string, metadata: Omit<NFTMetadata, 'image'>, tokenId: string): Promise<MintResult> {
    const fileUpload = await this.uploadFileToFleek(fileData, fileName);
    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${fileUpload.cid}` };
    const metadataUpload = await this.uploadJSONToFleek(completeMetadata, `${fileName.replace(/\.[^/.]+$/, '')}_metadata.json`);
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

export default TerraClassicFleekNFTMinter;
