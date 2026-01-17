// BNB Smart Chain NFT Minting via Storacha
// Free decentralized storage for BSC BEP-721

import { ethers } from 'ethers';

export interface StorachaConfig {
  email: string;
  space?: string;
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

export class BNBStorachaNFTMinter {
  private storachaConfig: StorachaConfig;
  private storachaGateway = 'https://w3s.link/ipfs';
  private rpcEndpoint: string;
  private network: 'mainnet' | 'testnet';

  constructor(
    storachaConfig: StorachaConfig,
    rpcEndpoint: string = 'https://bsc-dataseed.binance.org',
    network: 'mainnet' | 'testnet' = 'mainnet'
  ) {
    this.storachaConfig = storachaConfig;
    this.rpcEndpoint = rpcEndpoint;
    this.network = network;
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
    console.log('Starting NFT minting with Storacha...');

    // Placeholder CIDs (actual implementation would use Storacha client)
    const fileCid = 'placeholder-cid';
    const metadataCid = 'placeholder-metadata-cid';

    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: `ipfs://${fileCid}`,
    };

    const bscNFT = await this.mintBSCNFT(
      privateKeyOrMnemonic,
      contractAddress,
      `ipfs://${metadataCid}`,
      tokenId
    );

    const explorerBase = this.network === 'mainnet' 
      ? 'https://bscscan.com/tx' 
      : 'https://testnet.bscscan.com/tx';

    return {
      ipfsCid: fileCid,
      ipfsUrl: `${this.storachaGateway}/${fileCid}`,
      metadataCid,
      metadataUrl: `${this.storachaGateway}/${metadataCid}`,
      tokenId: bscNFT.tokenId,
      contractAddress,
      txHash: bscNFT.txHash,
      bscScanUrl: `${explorerBase}/${bscNFT.txHash}`,
    };
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

export default BNBStorachaNFTMinter;
