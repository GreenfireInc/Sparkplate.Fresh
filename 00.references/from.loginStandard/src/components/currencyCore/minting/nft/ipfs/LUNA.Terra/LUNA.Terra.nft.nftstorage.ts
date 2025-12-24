// Terra NFT Minting via NFT.Storage

import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { GasPrice } from '@cosmjs/stargate';
import { NFTStorage, File } from 'nft.storage';

export interface NFTStorageConfig { apiToken: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; tokenId: string; contractAddress: string; txHash: string; finderUrl: string }

export class TerraNFTStorageMinter {
  private client: NFTStorage;
  private nftStorageGateway = 'https://nftstorage.link/ipfs';
  private rpcEndpoint: string;
  private network: 'mainnet' | 'testnet';

  constructor(nftStorageConfig: NFTStorageConfig, rpcEndpoint: string = 'https://phoenix-lcd.terra.dev', network: 'mainnet' | 'testnet' = 'mainnet') {
    this.client = new NFTStorage({ token: nftStorageConfig.apiToken });
    this.rpcEndpoint = rpcEndpoint;
    this.network = network;
  }

  private getMimeType(fileName: string): string {
    const ext = fileName.split('.').pop()?.toLowerCase();
    const mimeTypes: Record<string, string> = { 'png': 'image/png', 'jpg': 'image/jpeg', 'gif': 'image/gif', 'webp': 'image/webp', 'mp4': 'video/mp4', 'mp3': 'audio/mpeg' };
    return mimeTypes[ext || ''] || 'application/octet-stream';
  }

  private async storeNFT(imageData: Buffer, imageName: string, metadata: NFTMetadata): Promise<{ imageCid: string; metadataCid: string; url: string }> {
    const imageFile = new File([imageData], imageName, { type: this.getMimeType(imageName) });
    const nftMetadata = await this.client.store({ name: metadata.name, description: metadata.description, image: imageFile, properties: { ...metadata.properties, attributes: metadata.attributes } });
    const metadataCid = nftMetadata.url.replace('ipfs://', '');
    const imageCid = nftMetadata.data.image.href.replace('ipfs://', '');
    return { imageCid, metadataCid, url: `${this.nftStorageGateway}/${metadataCid}` };
  }

  private async mintTerraNFT(mnemonic: string, contractAddress: string, metadataUrl: string, metadata: NFTMetadata, tokenId: string): Promise<{ txHash: string; tokenId: string }> {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: 'terra' });
    const [firstAccount] = await wallet.getAccounts();
    const client = await SigningCosmWasmClient.connectWithSigner(this.rpcEndpoint, wallet, { gasPrice: GasPrice.fromString('0.15uluna') });
    const mintMsg = { mint: { token_id: tokenId, owner: firstAccount.address, token_uri: metadataUrl, extension: { name: metadata.name, description: metadata.description, image: metadata.image, attributes: metadata.attributes } } };
    const result = await client.execute(firstAccount.address, contractAddress, mintMsg, 'auto', 'Minting NFT');
    return { txHash: result.transactionHash, tokenId };
  }

  async mintNFT(mnemonic: string, contractAddress: string, fileData: Buffer, fileName: string, metadata: Omit<NFTMetadata, 'image'>, tokenId: string): Promise<MintResult> {
    const nftPackage = await this.storeNFT(fileData, fileName, { ...metadata, image: '' } as NFTMetadata);
    const terraNFT = await this.mintTerraNFT(mnemonic, contractAddress, `ipfs://${nftPackage.metadataCid}`, { ...metadata, image: `ipfs://${nftPackage.imageCid}` } as NFTMetadata, tokenId);
    const explorerBase = this.network === 'mainnet' ? 'https://finder.terra.money/mainnet/tx' : 'https://finder.terra.money/testnet/tx';
    return { ipfsCid: nftPackage.imageCid, ipfsUrl: `${this.nftStorageGateway}/${nftPackage.imageCid}`, metadataCid: nftPackage.metadataCid, metadataUrl: nftPackage.url, tokenId: terraNFT.tokenId, contractAddress, txHash: terraNFT.txHash, finderUrl: `${explorerBase}/${terraNFT.txHash}` };
  }

  async checkBalance(mnemonicOrAddress: string): Promise<{ address: string; balanceLuna: string }> {
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
    return { address, balanceLuna: (parseInt(balance.amount) / 1000000).toString() };
  }

  async checkStatus(cid: string): Promise<any> { return await this.client.status(cid); }
}

export default TerraNFTStorageMinter;
