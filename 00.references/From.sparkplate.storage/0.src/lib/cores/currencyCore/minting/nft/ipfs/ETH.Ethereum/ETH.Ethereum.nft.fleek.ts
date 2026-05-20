// Ethereum NFT Minting via Fleek IPFS

import { ethers } from 'ethers';
import axios from 'axios';
import FormData from 'form-data';

export interface FleekConfig { apiKey: string; apiSecret: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; tokenId: string; contractAddress: string; txHash: string; etherscanUrl: string }
const ERC721_ABI = ['function mint(address to, uint256 tokenId, string memory tokenURI) public returns (bool)'];

export class ETHFleekNFTMinter {
  private fleekConfig: FleekConfig;
  private fleekBaseUrl = 'https://api.fleek.co/ipfs';
  private fleekGateway = 'https://ipfs.fleek.co/ipfs';
  private rpcEndpoint: string;
  private network: 'mainnet' | 'sepolia' | 'goerli';

  constructor(fleekConfig: FleekConfig, rpcEndpoint: string = 'https://eth.llamarpc.com', network: 'mainnet' | 'sepolia' | 'goerli' = 'mainnet') { this.fleekConfig = fleekConfig; this.rpcEndpoint = rpcEndpoint; this.network = network; }

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
    const fileUpload = await this.uploadFileToFleek(fileData, fileName);
    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${fileUpload.cid}` };
    const metadataUpload = await this.uploadJSONToFleek(completeMetadata, `${fileName.replace(/\.[^/.]+$/, '')}_metadata.json`);
    const ethNFT = await this.mintETHNFT(privateKeyOrMnemonic, contractAddress, `ipfs://${metadataUpload.cid}`, tokenId);
    const explorerBase = this.network === 'mainnet' ? 'https://etherscan.io/tx' : this.network === 'sepolia' ? 'https://sepolia.etherscan.io/tx' : 'https://goerli.etherscan.io/tx';
    return { ipfsCid: fileUpload.cid, ipfsUrl: fileUpload.url, metadataCid: metadataUpload.cid, metadataUrl: metadataUpload.url, tokenId: ethNFT.tokenId, contractAddress, txHash: ethNFT.txHash, etherscanUrl: `${explorerBase}/${ethNFT.txHash}` };
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
}

export default ETHFleekNFTMinter;
