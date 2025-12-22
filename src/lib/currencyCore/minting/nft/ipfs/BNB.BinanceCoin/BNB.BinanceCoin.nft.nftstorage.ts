// BNB Smart Chain NFT Minting via NFT.Storage
// Free NFT-specific IPFS storage for BSC BEP-721

import { ethers } from 'ethers';
import { NFTStorage, File, Blob } from 'nft.storage';

export interface NFTStorageConfig {
  apiToken: string;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image?: string;
  animation_url?: string;
  external_url?: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
  properties?: Record<string, any>;
}

export interface MintResult {
  ipfsCid: string;
  ipfsUrl: string;
  metadataCid: string;
  metadataUrl: string;
  tokenId: string;
  contractAddress: string;
  txHash: string;
  bscScanUrl: string;
}

const BEP721_ABI = [
  'function mint(address to, uint256 tokenId, string memory tokenURI) public returns (bool)',
  'function balanceOf(address owner) public view returns (uint256)',
];

export class BNBNFTStorageMinter {
  private client: NFTStorage;
  private nftStorageGateway = 'https://nftstorage.link/ipfs';
  private rpcEndpoint: string;
  private network: 'mainnet' | 'testnet';

  constructor(
    nftStorageConfig: NFTStorageConfig,
    rpcEndpoint: string = 'https://bsc-dataseed.binance.org',
    network: 'mainnet' | 'testnet' = 'mainnet'
  ) {
    this.client = new NFTStorage({
      token: nftStorageConfig.apiToken,
    });
    this.rpcEndpoint = rpcEndpoint;
    this.network = network;
  }

  private getMimeType(fileName: string): string {
    const ext = fileName.split('.').pop()?.toLowerCase();
    const mimeTypes: Record<string, string> = {
      'png': 'image/png',
      'jpg': 'image/jpeg',
      'gif': 'image/gif',
      'webp': 'image/webp',
      'mp4': 'video/mp4',
      'mp3': 'audio/mpeg',
    };
    return mimeTypes[ext || ''] || 'application/octet-stream';
  }

  private async storeNFT(
    imageData: Buffer,
    imageName: string,
    metadata: NFTMetadata
  ): Promise<{ imageCid: string; metadataCid: string; url: string }> {
    const imageFile = new File([imageData], imageName, {
      type: this.getMimeType(imageName),
    });

    const nftMetadata = await this.client.store({
      name: metadata.name,
      description: metadata.description,
      image: imageFile,
      properties: {
        ...metadata.properties,
        attributes: metadata.attributes,
      },
    });

    const metadataCid = nftMetadata.url.replace('ipfs://', '');
    const imageCid = nftMetadata.data.image.href.replace('ipfs://', '');

    return {
      imageCid,
      metadataCid,
      url: `${this.nftStorageGateway}/${metadataCid}`,
    };
  }

  private async mintBSCNFT(
    privateKeyOrMnemonic: string,
    contractAddress: string,
    metadataUrl: string,
    tokenId: string
  ): Promise<{ txHash: string; tokenId: string }> {
    let wallet: ethers.Wallet;
    if (privateKeyOrMnemonic.split(' ').length >= 12) {
      wallet = ethers.Wallet.fromPhrase(privateKeyOrMnemonic);
    } else {
      wallet = new ethers.Wallet(privateKeyOrMnemonic);
    }

    const provider = new ethers.JsonRpcProvider(this.rpcEndpoint);
    const signer = wallet.connect(provider);
    const contract = new ethers.Contract(contractAddress, BEP721_ABI, signer);

    const tx = await contract.mint(signer.address, tokenId, metadataUrl);
    const receipt = await tx.wait();

    return {
      txHash: receipt.hash,
      tokenId,
    };
  }

  async mintNFT(
    privateKeyOrMnemonic: string,
    contractAddress: string,
    fileData: Buffer,
    fileName: string,
    metadata: Omit<NFTMetadata, 'image'>,
    tokenId: string
  ): Promise<MintResult> {
    console.log('Starting NFT minting with NFT.Storage...');

    const nftPackage = await this.storeNFT(fileData, fileName, {
      ...metadata,
      image: '',
    } as NFTMetadata);

    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: `ipfs://${nftPackage.imageCid}`,
    };

    const bscNFT = await this.mintBSCNFT(
      privateKeyOrMnemonic,
      contractAddress,
      `ipfs://${nftPackage.metadataCid}`,
      tokenId
    );

    const explorerBase = this.network === 'mainnet' 
      ? 'https://bscscan.com/tx' 
      : 'https://testnet.bscscan.com/tx';

    return {
      ipfsCid: nftPackage.imageCid,
      ipfsUrl: `${this.nftStorageGateway}/${nftPackage.imageCid}`,
      metadataCid: nftPackage.metadataCid,
      metadataUrl: nftPackage.url,
      tokenId: bscNFT.tokenId,
      contractAddress,
      txHash: bscNFT.txHash,
      bscScanUrl: `${explorerBase}/${bscNFT.txHash}`,
    };
  }

  async checkStatus(cid: string): Promise<any> {
    return await this.client.status(cid);
  }

  async checkBalance(privateKeyOrMnemonicOrAddress: string): Promise<{
    address: string;
    balanceBNB: string;
  }> {
    const provider = new ethers.JsonRpcProvider(this.rpcEndpoint);
    let address: string;
    
    if (privateKeyOrMnemonicOrAddress.split(' ').length >= 12) {
      const wallet = ethers.Wallet.fromPhrase(privateKeyOrMnemonicOrAddress);
      address = wallet.address;
    } else if (privateKeyOrMnemonicOrAddress.startsWith('0x') && privateKeyOrMnemonicOrAddress.length === 42) {
      address = privateKeyOrMnemonicOrAddress;
    } else {
      const wallet = new ethers.Wallet(privateKeyOrMnemonicOrAddress);
      address = wallet.address;
    }

    const balance = await provider.getBalance(address);
    return {
      address,
      balanceBNB: ethers.formatEther(balance),
    };
  }
}

export default BNBNFTStorageMinter;
