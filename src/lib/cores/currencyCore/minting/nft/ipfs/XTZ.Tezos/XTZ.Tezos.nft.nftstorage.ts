// Tezos NFT Minting via NFT.Storage

import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import { NFTStorage, File } from 'nft.storage';

export interface NFTStorageConfig { apiToken: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; tokenId: string; contractAddress: string; opHash: string; explorerUrl: string }

export class TezosNFTStorageMinter {
  private client: NFTStorage;
  private nftStorageGateway = 'https://nftstorage.link/ipfs';
  private tezos: TezosToolkit;
  private network: 'mainnet' | 'ghostnet' | 'kathmandunet';

  constructor(nftStorageConfig: NFTStorageConfig, rpcUrl: string = 'https://mainnet.api.tez.ie', network: 'mainnet' | 'ghostnet' | 'kathmandunet' = 'mainnet') {
    this.client = new NFTStorage({ token: nftStorageConfig.apiToken });
    this.tezos = new TezosToolkit(rpcUrl);
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
    const nftPackage = await this.storeNFT(fileData, fileName, { ...metadata, image: '' } as NFTMetadata);
    console.log(`File and metadata uploaded: ${nftPackage.imageCid}`);

    const tezosNFT = await this.mintTezosNFT(privateKey, contractAddress, `ipfs://${nftPackage.metadataCid}`, tokenId);
    console.log(`Tezos NFT minted: Token ID ${tokenId}`);

    const explorerBase = this.network === 'mainnet' 
      ? 'https://tzkt.io' 
      : this.network === 'ghostnet' 
      ? 'https://ghostnet.tzkt.io' 
      : 'https://kathmandunet.tzkt.io';

    return {
      ipfsCid: nftPackage.imageCid,
      ipfsUrl: `${this.nftStorageGateway}/${nftPackage.imageCid}`,
      metadataCid: nftPackage.metadataCid,
      metadataUrl: nftPackage.url,
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

  async checkStatus(cid: string): Promise<any> { return await this.client.status(cid); }
}

export default TezosNFTStorageMinter;

