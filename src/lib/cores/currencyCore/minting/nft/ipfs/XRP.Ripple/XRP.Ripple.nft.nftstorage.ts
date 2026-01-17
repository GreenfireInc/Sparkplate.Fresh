// XRP NFT Minting via NFT.Storage

import { Client, Wallet } from 'xrpl';
import { NFTStorage, File } from 'nft.storage';

export interface NFTStorageConfig { apiToken: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; nftokenId: string; txHash: string; explorerUrl: string }

export class XRPNFTStorageMinter {
  private client: NFTStorage;
  private nftStorageGateway = 'https://nftstorage.link/ipfs';
  private xrplClient: Client;
  private network: 'mainnet' | 'testnet' | 'devnet';

  constructor(nftStorageConfig: NFTStorageConfig, xrplServer: string = 'wss://xrplcluster.com', network: 'mainnet' | 'testnet' | 'devnet' = 'mainnet') {
    this.client = new NFTStorage({ token: nftStorageConfig.apiToken });
    this.xrplClient = new Client(xrplServer);
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

  private convertStringToHex(str: string): string {
    return Buffer.from(str, 'utf-8').toString('hex').toUpperCase();
  }

  private async mintXRPNFT(seed: string, metadataUrl: string, taxon: number = 0): Promise<{ nftokenId: string; txHash: string }> {
    await this.xrplClient.connect();
    
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

      const prepared = await this.xrplClient.autofill(nftMintTx);
      const signed = wallet.sign(prepared);
      const result = await this.xrplClient.submitAndWait(signed.tx_blob);

      const meta = result.result.meta as any;
      const nftokenId = meta?.nftoken_id || meta?.CreatedNode?.find((n: any) => n.CreatedNode?.LedgerEntryType === 'NFTokenPage')?.CreatedNode?.NewFields?.NFTokens?.[0]?.NFToken?.NFTokenID || '';

      return { nftokenId, txHash: result.result.hash };
    } finally {
      await this.xrplClient.disconnect();
    }
  }

  async mintNFT(seed: string, fileData: Buffer, metadata: Omit<NFTMetadata, 'image'>, taxon: number = 0, fileName: string = 'nft-asset'): Promise<MintResult> {
    console.log('Starting XRP NFT minting process...');
    const nftPackage = await this.storeNFT(fileData, fileName, { ...metadata, image: '' } as NFTMetadata);
    console.log(`File and metadata uploaded: ${nftPackage.imageCid}`);

    const xrpNFT = await this.mintXRPNFT(seed, `ipfs://${nftPackage.metadataCid}`, taxon);
    console.log(`XRP NFT minted: ${xrpNFT.nftokenId}`);

    const explorerBase = this.network === 'mainnet' 
      ? 'https://livenet.xrpl.org/transactions' 
      : this.network === 'testnet' 
      ? 'https://testnet.xrpl.org/transactions' 
      : 'https://devnet.xrpl.org/transactions';

    return {
      ipfsCid: nftPackage.imageCid,
      ipfsUrl: `${this.nftStorageGateway}/${nftPackage.imageCid}`,
      metadataCid: nftPackage.metadataCid,
      metadataUrl: nftPackage.url,
      nftokenId: xrpNFT.nftokenId,
      txHash: xrpNFT.txHash,
      explorerUrl: `${explorerBase}/${xrpNFT.txHash}`,
    };
  }

  async checkBalance(seedOrAddress: string): Promise<{ address: string; balanceXrp: string }> {
    await this.xrplClient.connect();
    
    try {
      let address: string;
      if (seedOrAddress.split(' ').length >= 12 || seedOrAddress.startsWith('s')) {
        const wallet = Wallet.fromSeed(seedOrAddress);
        address = wallet.address;
      } else {
        address = seedOrAddress;
      }

      const balance = await this.xrplClient.getXrpBalance(address);
      return { address, balanceXrp: balance };
    } finally {
      await this.xrplClient.disconnect();
    }
  }

  async checkStatus(cid: string): Promise<any> { return await this.client.status(cid); }
}

export default XRPNFTStorageMinter;

