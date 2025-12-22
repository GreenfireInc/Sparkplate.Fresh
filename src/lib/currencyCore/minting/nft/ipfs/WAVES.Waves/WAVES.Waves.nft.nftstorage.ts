// Waves NFT Minting via NFT.Storage

import { issue, broadcast } from '@waves/waves-transactions';
import { publicKey } from '@waves/ts-lib-crypto';
import { NFTStorage, File } from 'nft.storage';
import axios from 'axios';

export interface NFTStorageConfig { apiToken: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; assetId: string; txId: string; explorerUrl: string }

export class WavesNFTStorageMinter {
  private client: NFTStorage;
  private nftStorageGateway = 'https://nftstorage.link/ipfs';
  private nodeUrl: string;
  private chainId: 'W' | 'T';

  constructor(nftStorageConfig: NFTStorageConfig, nodeUrl: string = 'https://nodes.wavesnodes.com', chainId: 'W' | 'T' = 'W') {
    this.client = new NFTStorage({ token: nftStorageConfig.apiToken });
    this.nodeUrl = nodeUrl;
    this.chainId = chainId;
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

  private async mintWavesNFT(seed: string, metadataUrl: string, metadata: NFTMetadata): Promise<{ assetId: string; txId: string }> {
    const issueTx = issue({
      name: metadata.name.substring(0, 16),
      description: `${metadata.description.substring(0, 900)} | ${metadataUrl}`,
      quantity: 1,
      decimals: 0,
      reissuable: false,
      chainId: this.chainId,
    }, seed);

    const response = await broadcast(issueTx, this.nodeUrl);
    return { assetId: response.id, txId: response.id };
  }

  async mintNFT(seed: string, fileData: Buffer, metadata: Omit<NFTMetadata, 'image'>, fileName: string = 'nft-asset'): Promise<MintResult> {
    console.log('Starting Waves NFT minting process...');
    const nftPackage = await this.storeNFT(fileData, fileName, { ...metadata, image: '' } as NFTMetadata);
    console.log(`File and metadata uploaded: ${nftPackage.imageCid}`);

    const wavesNFT = await this.mintWavesNFT(seed, `ipfs://${nftPackage.metadataCid}`, { ...metadata, image: `ipfs://${nftPackage.imageCid}` });
    console.log(`Waves NFT minted: Asset ID ${wavesNFT.assetId}`);

    const explorerBase = this.chainId === 'W' ? 'https://wavesexplorer.com/tx' : 'https://wavesexplorer.com/testnet/tx';

    return {
      ipfsCid: nftPackage.imageCid,
      ipfsUrl: `${this.nftStorageGateway}/${nftPackage.imageCid}`,
      metadataCid: nftPackage.metadataCid,
      metadataUrl: nftPackage.url,
      assetId: wavesNFT.assetId,
      txId: wavesNFT.txId,
      explorerUrl: `${explorerBase}/${wavesNFT.txId}`,
    };
  }

  async checkBalance(seedOrAddress: string): Promise<{ address: string; balanceWaves: string }> {
    let address: string;
    if (seedOrAddress.split(' ').length === 15) {
      address = publicKey(seedOrAddress);
    } else {
      address = seedOrAddress;
    }

    const response = await axios.get(`${this.nodeUrl}/addresses/balance/${address}`);
    const balanceWaves = (response.data.balance / 100000000).toString();

    return { address, balanceWaves };
  }

  async checkStatus(cid: string): Promise<any> { return await this.client.status(cid); }
}

export default WavesNFTStorageMinter;

