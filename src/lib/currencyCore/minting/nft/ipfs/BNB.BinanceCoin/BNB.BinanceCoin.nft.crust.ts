// BNB Smart Chain NFT Minting via Crust Network
// Decentralized cloud storage for BSC BEP-721

import { ethers } from 'ethers';
import axios from 'axios';
import FormData from 'form-data';

export interface CrustConfig {
  authToken: string;
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

export class BNBCrustNFTMinter {
  private crustConfig: CrustConfig;
  private crustBaseUrl = 'https://gw.crustfiles.app/api/v0';
  private crustGateway = 'https://gw.crustfiles.app/ipfs';
  private rpcEndpoint: string;
  private network: 'mainnet' | 'testnet';

  constructor(
    crustConfig: CrustConfig,
    rpcEndpoint: string = 'https://bsc-dataseed.binance.org',
    network: 'mainnet' | 'testnet' = 'mainnet'
  ) {
    this.crustConfig = crustConfig;
    this.rpcEndpoint = rpcEndpoint;
    this.network = network;
  }

  private async uploadFileToCrust(
    fileData: Buffer,
    fileName: string
  ): Promise<{ cid: string; url: string }> {
    const formData = new FormData();
    formData.append('file', fileData, fileName);

    const response = await axios.post(
      `${this.crustBaseUrl}/add`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${this.crustConfig.authToken}`,
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    const cid = response.data.Hash;
    return {
      cid,
      url: `${this.crustGateway}/${cid}`,
    };
  }

  private async uploadJSONToCrust(
    metadata: NFTMetadata,
    fileName: string
  ): Promise<{ cid: string; url: string }> {
    const jsonString = JSON.stringify(metadata, null, 2);
    const jsonBuffer = Buffer.from(jsonString);
    const formData = new FormData();
    formData.append('file', jsonBuffer, fileName);

    const response = await axios.post(
      `${this.crustBaseUrl}/add`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${this.crustConfig.authToken}`,
        },
      }
    );

    const cid = response.data.Hash;
    return {
      cid,
      url: `${this.crustGateway}/${cid}`,
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
    console.log('Starting NFT minting with Crust...');

    const fileUpload = await this.uploadFileToCrust(fileData, fileName);
    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: `ipfs://${fileUpload.cid}`,
    };

    const metadataUpload = await this.uploadJSONToCrust(
      completeMetadata,
      `${fileName.replace(/\.[^/.]+$/, '')}_metadata.json`
    );

    const bscNFT = await this.mintBSCNFT(
      privateKeyOrMnemonic,
      contractAddress,
      `ipfs://${metadataUpload.cid}`,
      tokenId
    );

    const explorerBase = this.network === 'mainnet' 
      ? 'https://bscscan.com/tx' 
      : 'https://testnet.bscscan.com/tx';

    return {
      ipfsCid: fileUpload.cid,
      ipfsUrl: fileUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
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

export default BNBCrustNFTMinter;
