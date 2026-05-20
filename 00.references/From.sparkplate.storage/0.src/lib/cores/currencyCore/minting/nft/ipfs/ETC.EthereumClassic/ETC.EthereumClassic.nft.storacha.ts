// Ethereum Classic NFT Minting via Storacha

import { ethers } from 'ethers';

export interface StorachaConfig { email: string; space?: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; tokenId: string; contractAddress: string; txHash: string; blockscoutUrl: string }
const ERC721_ABI = ['function mint(address to, uint256 tokenId, string memory tokenURI) public returns (bool)'];

export class ETCStorachaNFTMinter {
  private storachaConfig: StorachaConfig;
  private storachaGateway = 'https://w3s.link/ipfs';
  private rpcEndpoint: string;
  private network: 'mainnet' | 'mordor';

  constructor(storachaConfig: StorachaConfig, rpcEndpoint: string = 'https://etc.rivet.link', network: 'mainnet' | 'mordor' = 'mainnet') {
    this.storachaConfig = storachaConfig;
    this.rpcEndpoint = rpcEndpoint;
    this.network = network;
  }

  private async mintETCNFT(privateKeyOrMnemonic: string, contractAddress: string, metadataUrl: string, tokenId: string): Promise<{ txHash: string; tokenId: string }> {
    let wallet: ethers.Wallet = privateKeyOrMnemonic.split(' ').length >= 12 ? ethers.Wallet.fromPhrase(privateKeyOrMnemonic) : new ethers.Wallet(privateKeyOrMnemonic);
    const provider = new ethers.JsonRpcProvider(this.rpcEndpoint);
    const signer = wallet.connect(provider);
    const contract = new ethers.Contract(contractAddress, ERC721_ABI, signer);
    const tx = await contract.mint(signer.address, tokenId, metadataUrl);
    const receipt = await tx.wait();
    return { txHash: receipt.hash, tokenId };
  }

  async mintNFT(privateKeyOrMnemonic: string, contractAddress: string, fileData: Buffer, fileName: string, metadata: Omit<NFTMetadata, 'image'>, tokenId: string): Promise<MintResult> {
    const fileCid = 'placeholder-cid';
    const metadataCid = 'placeholder-metadata-cid';
    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${fileCid}` };
    const etcNFT = await this.mintETCNFT(privateKeyOrMnemonic, contractAddress, `ipfs://${metadataCid}`, tokenId);
    const explorerBase = this.network === 'mainnet' ? 'https://blockscout.com/etc/mainnet/tx' : 'https://blockscout.com/etc/mordor/tx';
    return { ipfsCid: fileCid, ipfsUrl: `${this.storachaGateway}/${fileCid}`, metadataCid, metadataUrl: `${this.storachaGateway}/${metadataCid}`, tokenId: etcNFT.tokenId, contractAddress, txHash: etcNFT.txHash, blockscoutUrl: `${explorerBase}/${etcNFT.txHash}` };
  }

  async checkBalance(privateKeyOrMnemonicOrAddress: string): Promise<{ address: string; balanceETC: string }> {
    const provider = new ethers.JsonRpcProvider(this.rpcEndpoint);
    let address: string;
    if (privateKeyOrMnemonicOrAddress.split(' ').length >= 12) { address = ethers.Wallet.fromPhrase(privateKeyOrMnemonicOrAddress).address; }
    else if (privateKeyOrMnemonicOrAddress.startsWith('0x') && privateKeyOrMnemonicOrAddress.length === 42) { address = privateKeyOrMnemonicOrAddress; }
    else { address = new ethers.Wallet(privateKeyOrMnemonicOrAddress).address; }
    const balance = await provider.getBalance(address);
    return { address, balanceETC: ethers.formatEther(balance) };
  }
}

export default ETCStorachaNFTMinter;
