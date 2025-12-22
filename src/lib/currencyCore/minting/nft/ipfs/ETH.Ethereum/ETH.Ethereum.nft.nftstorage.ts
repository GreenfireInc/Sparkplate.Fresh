// Ethereum NFT Minting via NFT.Storage

import { ethers } from 'ethers';
import { NFTStorage, File } from 'nft.storage';

export interface NFTStorageConfig { apiToken: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; tokenId: string; contractAddress: string; txHash: string; etherscanUrl: string }
const ERC721_ABI = ['function mint(address to, uint256 tokenId, string memory tokenURI) public returns (bool)'];

export class ETHNFTStorageMinter {
  private client: NFTStorage;
  private nftStorageGateway = 'https://nftstorage.link/ipfs';
  private rpcEndpoint: string;
  private network: 'mainnet' | 'sepolia' | 'goerli';

  constructor(nftStorageConfig: NFTStorageConfig, rpcEndpoint: string = 'https://eth.llamarpc.com', network: 'mainnet' | 'sepolia' | 'goerli' = 'mainnet') {
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

  private async mintETHNFT(privateKeyOrMnemonic: string, contractAddress: string, metadataUrl: string, tokenId: string): Promise<{ txHash: string; tokenId: string }> {
    let wallet: ethers.Wallet = privateKeyOrMnemonic.split(' ').length >= 12 ? ethers.Wallet.fromPhrase(privateKeyOrMnemonic) : new ethers.Wallet(privateKeyOrMnemonic);
    const provider = new ethers.JsonRpcProvider(this.rpcEndpoint);
    const signer = wallet.connect(provider);
    const contract = new ethers.Contract(contractAddress, ERC721_ABI, signer);
    const tx = await contract.mint(signer.address, tokenId, metadataUrl);
    const receipt = await tx.wait();
    return { txHash: receipt.hash, tokenId };
  }

  async mintNFT(privateKeyOrMnemonic: string, contractAddress: string, fileData: Buffer, fileName: string, metadata: Omit<NFTMetadata, 'image'>, tokenId: string): Promise<MintResult> {
    const nftPackage = await this.storeNFT(fileData, fileName, { ...metadata, image: '' } as NFTMetadata);
    const ethNFT = await this.mintETHNFT(privateKeyOrMnemonic, contractAddress, `ipfs://${nftPackage.metadataCid}`, tokenId);
    const explorerBase = this.network === 'mainnet' ? 'https://etherscan.io/tx' : this.network === 'sepolia' ? 'https://sepolia.etherscan.io/tx' : 'https://goerli.etherscan.io/tx';
    return { ipfsCid: nftPackage.imageCid, ipfsUrl: `${this.nftStorageGateway}/${nftPackage.imageCid}`, metadataCid: nftPackage.metadataCid, metadataUrl: nftPackage.url, tokenId: ethNFT.tokenId, contractAddress, txHash: ethNFT.txHash, etherscanUrl: `${explorerBase}/${ethNFT.txHash}` };
  }

  async checkBalance(privateKeyOrMnemonicOrAddress: string): Promise<{ address: string; balanceETH: string }> {
    const provider = new ethers.JsonRpcProvider(this.rpcEndpoint);
    let address: string;
    if (privateKeyOrMnemonicOrAddress.split(' ').length >= 12) { address = ethers.Wallet.fromPhrase(privateKeyOrMnemonicOrAddress).address; }
    else if (privateKeyOrMnemonicOrAddress.startsWith('0x') && privateKeyOrMnemonicOrAddress.length === 42) { address = privateKeyOrMnemonicOrAddress; }
    else { address = new ethers.Wallet(privateKeyOrMnemonicOrAddress).address; }
    const balance = await provider.getBalance(address);
    return { address, balanceETH: ethers.formatEther(balance) };
  }

  async checkStatus(cid: string): Promise<any> { return await this.client.status(cid); }
}

export default ETHNFTStorageMinter;
