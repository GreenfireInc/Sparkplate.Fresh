// Ethereum Classic NFT Minting via Infura IPFS
// Enterprise-grade IPFS infrastructure for ETC ERC-721 NFTs

import { ethers } from 'ethers';
import { create } from 'kubo-rpc-client';
import type { IPFSHTTPClient } from 'kubo-rpc-client';

export interface InfuraConfig {
  projectId: string;
  projectSecret: string;
  dedicatedGateway?: string;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image?: string;
  animation_url?: string;
  external_url?: string;
  attributes?: Array<{ trait_type: string; value: string | number }>;
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
  blockscoutUrl: string;
}

const ERC721_ABI = [
  'function mint(address to, uint256 tokenId, string memory tokenURI) public returns (bool)',
  'function balanceOf(address owner) public view returns (uint256)',
];

export class ETCInfuraNFTMinter {
  private ipfs: IPFSHTTPClient;
  private infuraGateway: string;
  private rpcEndpoint: string;
  private network: 'mainnet' | 'mordor';

  constructor(
    infuraConfig: InfuraConfig,
    rpcEndpoint: string = 'https://etc.rivet.link',
    network: 'mainnet' | 'mordor' = 'mainnet'
  ) {
    const auth = 'Basic ' + Buffer.from(
      infuraConfig.projectId + ':' + infuraConfig.projectSecret
    ).toString('base64');

    this.ipfs = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: { authorization: auth },
    });

    this.infuraGateway = infuraConfig.dedicatedGateway || 'https://infura-ipfs.io/ipfs';
    this.rpcEndpoint = rpcEndpoint;
    this.network = network;
  }

  private async uploadFileToInfura(
    fileData: Buffer,
    fileName: string
  ): Promise<{ cid: string; url: string }> {
    const result = await this.ipfs.add({ path: fileName, content: fileData }, { pin: true });
    const cid = result.cid.toString();
    return { cid, url: `${this.infuraGateway}/${cid}` };
  }

  private async uploadMetadataToInfura(
    metadata: NFTMetadata,
    fileName: string = 'metadata.json'
  ): Promise<{ cid: string; url: string }> {
    const jsonString = JSON.stringify(metadata, null, 2);
    const jsonBuffer = Buffer.from(jsonString);
    const result = await this.ipfs.add({ path: fileName, content: jsonBuffer }, { pin: true });
    const cid = result.cid.toString();
    return { cid, url: `${this.infuraGateway}/${cid}` };
  }

  private async mintETCNFT(
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
    const contract = new ethers.Contract(contractAddress, ERC721_ABI, signer);
    const tx = await contract.mint(signer.address, tokenId, metadataUrl);
    const receipt = await tx.wait();

    return { txHash: receipt.hash, tokenId };
  }

  async mintNFT(
    privateKeyOrMnemonic: string,
    contractAddress: string,
    fileData: Buffer,
    fileName: string,
    metadata: Omit<NFTMetadata, 'image'>,
    tokenId: string
  ): Promise<MintResult> {
    const fileUpload = await this.uploadFileToInfura(fileData, fileName);
    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${fileUpload.cid}` };
    const metadataUpload = await this.uploadMetadataToInfura(completeMetadata, `${fileName.replace(/\.[^/.]+$/, '')}_metadata.json`);
    const etcNFT = await this.mintETCNFT(privateKeyOrMnemonic, contractAddress, `ipfs://${metadataUpload.cid}`, tokenId);
    const explorerBase = this.network === 'mainnet' ? 'https://blockscout.com/etc/mainnet/tx' : 'https://blockscout.com/etc/mordor/tx';

    return {
      ipfsCid: fileUpload.cid,
      ipfsUrl: fileUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
      tokenId: etcNFT.tokenId,
      contractAddress,
      txHash: etcNFT.txHash,
      blockscoutUrl: `${explorerBase}/${etcNFT.txHash}`,
    };
  }

  async checkBalance(privateKeyOrMnemonicOrAddress: string): Promise<{ address: string; balanceETC: string }> {
    const provider = new ethers.JsonRpcProvider(this.rpcEndpoint);
    let address: string;
    
    if (privateKeyOrMnemonicOrAddress.split(' ').length >= 12) {
      address = ethers.Wallet.fromPhrase(privateKeyOrMnemonicOrAddress).address;
    } else if (privateKeyOrMnemonicOrAddress.startsWith('0x') && privateKeyOrMnemonicOrAddress.length === 42) {
      address = privateKeyOrMnemonicOrAddress;
    } else {
      address = new ethers.Wallet(privateKeyOrMnemonicOrAddress).address;
    }

    const balance = await provider.getBalance(address);
    return { address, balanceETC: ethers.formatEther(balance) };
  }
}

export default ETCInfuraNFTMinter;
