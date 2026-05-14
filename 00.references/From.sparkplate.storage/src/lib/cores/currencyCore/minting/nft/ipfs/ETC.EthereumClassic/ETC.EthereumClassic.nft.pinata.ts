// Ethereum Classic NFT Minting via Pinata IPFS
// Uploads files to Pinata IPFS, then creates ERC-721 NFT referencing the IPFS CID

/**
 * OVERVIEW:
 * 
 * This module enables NFT minting on Ethereum Classic with asset storage on Pinata IPFS.
 * - Upload media files to Pinata IPFS (images, videos, audio, documents)
 * - Create ERC-721 NFT metadata referencing IPFS CID
 * - Deploy NFT to ETC blockchain using EVM-compatible contracts
 * 
 * BENEFITS:
 * - Fast IPFS upload via Pinata
 * - Permanent metadata on Ethereum Classic
 * - ERC-721/ERC-1155 compatible
 * - Original Ethereum protocol (no DAO fork)
 * 
 * COSTS:
 * - Pinata: Free tier available (1GB storage, unlimited gateways)
 * - ETC: ~0.001 ETC for contract deployment + gas fees (~0.0001 ETC per mint)
 */

import { ethers } from 'ethers';
import FormData from 'form-data';
import axios from 'axios';

export interface PinataConfig {
  apiKey: string;
  apiSecret: string;
  jwt?: string;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image?: string; // IPFS CID or URL
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
  blockscoutUrl: string;
}

export interface FileUploadOptions {
  fileName?: string;
  pinataMetadata?: {
    name?: string;
    keyvalues?: Record<string, string | number>;
  };
  pinataOptions?: {
    cidVersion?: 0 | 1;
  };
}

// Simple ERC-721 NFT Contract ABI (mint function)
const ERC721_ABI = [
  'function mint(address to, uint256 tokenId, string memory tokenURI) public returns (bool)',
  'function balanceOf(address owner) public view returns (uint256)',
  'function ownerOf(uint256 tokenId) public view returns (address)',
];

export class ETCPinataNFTMinter {
  private pinataConfig: PinataConfig;
  private pinataBaseUrl = 'https://api.pinata.cloud';
  private pinataGateway = 'https://gateway.pinata.cloud/ipfs';
  private rpcEndpoint: string;
  private network: 'mainnet' | 'mordor';

  constructor(
    pinataConfig: PinataConfig,
    rpcEndpoint: string = 'https://etc.rivet.link',
    network: 'mainnet' | 'mordor' = 'mainnet'
  ) {
    this.pinataConfig = pinataConfig;
    this.rpcEndpoint = rpcEndpoint;
    this.network = network;
  }

  /**
   * Upload file to Pinata IPFS
   */
  private async uploadFileToPinata(
    fileData: Buffer,
    options: FileUploadOptions = {}
  ): Promise<{ cid: string; url: string }> {
    const formData = new FormData();
    formData.append('file', fileData, options.fileName || 'file');

    if (options.pinataMetadata) {
      formData.append('pinataMetadata', JSON.stringify(options.pinataMetadata));
    }

    if (options.pinataOptions) {
      formData.append('pinataOptions', JSON.stringify(options.pinataOptions));
    }

    const headers = this.pinataConfig.jwt
      ? { Authorization: `Bearer ${this.pinataConfig.jwt}` }
      : {
          pinata_api_key: this.pinataConfig.apiKey,
          pinata_secret_api_key: this.pinataConfig.apiSecret,
        };

    try {
      const response = await axios.post(
        `${this.pinataBaseUrl}/pinning/pinFileToIPFS`,
        formData,
        {
          headers: {
            ...headers,
            ...formData.getHeaders(),
          },
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        }
      );

      const cid = response.data.IpfsHash;
      return {
        cid,
        url: `${this.pinataGateway}/${cid}`,
      };
    } catch (error: any) {
      throw new Error(`Pinata upload failed: ${error.message}`);
    }
  }

  /**
   * Upload JSON metadata to Pinata IPFS
   */
  private async uploadMetadataToPinata(
    metadata: NFTMetadata,
    options: FileUploadOptions = {}
  ): Promise<{ cid: string; url: string }> {
    const headers = this.pinataConfig.jwt
      ? { Authorization: `Bearer ${this.pinataConfig.jwt}` }
      : {
          pinata_api_key: this.pinataConfig.apiKey,
          pinata_secret_api_key: this.pinataConfig.apiSecret,
        };

    const body: any = {
      pinataContent: metadata,
    };

    if (options.pinataMetadata) {
      body.pinataMetadata = options.pinataMetadata;
    }

    if (options.pinataOptions) {
      body.pinataOptions = options.pinataOptions;
    }

    try {
      const response = await axios.post(
        `${this.pinataBaseUrl}/pinning/pinJSONToIPFS`,
        body,
        { headers }
      );

      const cid = response.data.IpfsHash;
      return {
        cid,
        url: `${this.pinataGateway}/${cid}`,
      };
    } catch (error: any) {
      throw new Error(`Pinata metadata upload failed: ${error.message}`);
    }
  }

  /**
   * Mint NFT on ETC ERC-721 contract
   */
  private async mintETCNFT(
    privateKeyOrMnemonic: string,
    contractAddress: string,
    metadataUrl: string,
    tokenId: string
  ): Promise<{ txHash: string; tokenId: string }> {
    // Create wallet
    let wallet: ethers.Wallet;
    if (privateKeyOrMnemonic.split(' ').length >= 12) {
      // It's a mnemonic
      wallet = ethers.Wallet.fromPhrase(privateKeyOrMnemonic);
    } else {
      // It's a private key
      wallet = new ethers.Wallet(privateKeyOrMnemonic);
    }

    // Connect to ETC
    const provider = new ethers.JsonRpcProvider(this.rpcEndpoint);
    const signer = wallet.connect(provider);

    // Create contract instance
    const contract = new ethers.Contract(contractAddress, ERC721_ABI, signer);

    // Mint NFT
    const tx = await contract.mint(
      signer.address,
      tokenId,
      metadataUrl
    );

    // Wait for confirmation
    const receipt = await tx.wait();

    return {
      txHash: receipt.hash,
      tokenId,
    };
  }

  /**
   * Mint NFT: Upload file to Pinata, create metadata, deploy to ETC
   */
  async mintNFT(
    privateKeyOrMnemonic: string,
    contractAddress: string,
    fileData: Buffer,
    metadata: Omit<NFTMetadata, 'image'>,
    tokenId: string,
    options: FileUploadOptions = {}
  ): Promise<MintResult> {
    console.log('Starting NFT minting process...');

    // 1. Upload file to Pinata IPFS
    console.log('Uploading file to Pinata IPFS...');
    const fileUpload = await this.uploadFileToPinata(fileData, options);
    console.log(`File uploaded: ${fileUpload.cid}`);

    // 2. Create complete metadata with IPFS CID
    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: `ipfs://${fileUpload.cid}`,
    };

    // 3. Upload metadata to Pinata IPFS
    console.log('Uploading metadata to Pinata IPFS...');
    const metadataUpload = await this.uploadMetadataToPinata(completeMetadata, {
      pinataMetadata: {
        name: `${metadata.name} - Metadata`,
        keyvalues: {
          type: 'nft-metadata',
          standard: 'ERC-721',
          nftName: metadata.name,
        },
      },
    });
    console.log(`Metadata uploaded: ${metadataUpload.cid}`);

    // 4. Mint ETC NFT
    console.log('Minting ETC NFT...');
    const etcNFT = await this.mintETCNFT(
      privateKeyOrMnemonic,
      contractAddress,
      `ipfs://${metadataUpload.cid}`,
      tokenId
    );
    console.log(`ETC NFT minted: Token ID ${etcNFT.tokenId}`);

    const explorerBase = this.network === 'mainnet' 
      ? 'https://blockscout.com/etc/mainnet/tx' 
      : 'https://blockscout.com/etc/mordor/tx';

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

  /**
   * Mint video/audio NFT with animation_url
   */
  async mintMediaNFT(
    privateKeyOrMnemonic: string,
    contractAddress: string,
    mediaData: Buffer,
    thumbnailData: Buffer,
    metadata: Omit<NFTMetadata, 'image' | 'animation_url'>,
    tokenId: string,
    options: {
      mediaOptions?: FileUploadOptions;
      thumbnailOptions?: FileUploadOptions;
    } = {}
  ): Promise<MintResult> {
    console.log('Starting media NFT minting process...');

    // 1. Upload media file
    const mediaUpload = await this.uploadFileToPinata(mediaData, options.mediaOptions);
    console.log(`Media uploaded: ${mediaUpload.cid}`);

    // 2. Upload thumbnail
    const thumbnailUpload = await this.uploadFileToPinata(
      thumbnailData,
      options.thumbnailOptions
    );
    console.log(`Thumbnail uploaded: ${thumbnailUpload.cid}`);

    // 3. Create complete metadata
    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: `ipfs://${thumbnailUpload.cid}`,
      animation_url: `ipfs://${mediaUpload.cid}`,
    };

    // 4. Upload metadata
    const metadataUpload = await this.uploadMetadataToPinata(completeMetadata, {
      pinataMetadata: {
        name: `${metadata.name} - Metadata`,
        keyvalues: {
          type: 'media-nft-metadata',
          standard: 'ERC-721',
          nftName: metadata.name,
        },
      },
    });
    console.log(`Metadata uploaded: ${metadataUpload.cid}`);

    // 5. Mint ETC NFT
    const etcNFT = await this.mintETCNFT(
      privateKeyOrMnemonic,
      contractAddress,
      `ipfs://${metadataUpload.cid}`,
      tokenId
    );
    console.log(`ETC NFT minted: Token ID ${etcNFT.tokenId}`);

    const explorerBase = this.network === 'mainnet' 
      ? 'https://blockscout.com/etc/mainnet/tx' 
      : 'https://blockscout.com/etc/mordor/tx';

    return {
      ipfsCid: mediaUpload.cid,
      ipfsUrl: mediaUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
      tokenId: etcNFT.tokenId,
      contractAddress,
      txHash: etcNFT.txHash,
      blockscoutUrl: `${explorerBase}/${etcNFT.txHash}`,
    };
  }

  /**
   * Check wallet balance
   */
  async checkBalance(privateKeyOrMnemonicOrAddress: string): Promise<{
    address: string;
    balanceETC: string;
  }> {
    const provider = new ethers.JsonRpcProvider(this.rpcEndpoint);
    let address: string;
    
    // Check if it's a mnemonic, private key, or address
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
    const balanceETC = ethers.formatEther(balance);

    return {
      address,
      balanceETC,
    };
  }

  /**
   * Test Pinata connection
   */
  async testPinataConnection(): Promise<boolean> {
    const headers = this.pinataConfig.jwt
      ? { Authorization: `Bearer ${this.pinataConfig.jwt}` }
      : {
          pinata_api_key: this.pinataConfig.apiKey,
          pinata_secret_api_key: this.pinataConfig.apiSecret,
        };

    try {
      await axios.get(`${this.pinataBaseUrl}/data/testAuthentication`, { headers });
      return true;
    } catch (error) {
      return false;
    }
  }
}

/**
 * USAGE EXAMPLES:
 * 
 * // Basic image NFT
 * import { ETCPinataNFTMinter } from './ETC.EthereumClassic.nft.pinata';
 * import * as fs from 'fs';
 * 
 * const minter = new ETCPinataNFTMinter({
 *   apiKey: process.env.PINATA_API_KEY!,
 *   apiSecret: process.env.PINATA_API_SECRET!,
 * });
 * 
 * const privateKey = '0x...'; // or use mnemonic
 * const contractAddress = '0x...'; // ERC-721 contract address
 * const imageData = fs.readFileSync('art.png');
 * 
 * const result = await minter.mintNFT(
 *   privateKey,
 *   contractAddress,
 *   imageData,
 *   {
 *     name: "ETC Art #001",
 *     description: "A unique digital artwork on Ethereum Classic",
 *     attributes: [
 *       { trait_type: "Rarity", value: "Legendary" },
 *       { trait_type: "Artist", value: "CryptoArtist" }
 *     ]
 *   },
 *   '1', // Token ID
 *   {
 *     fileName: 'art.png',
 *     pinataMetadata: {
 *       name: 'ETC Art #001',
 *       keyvalues: {
 *         collection: 'etc-art',
 *         edition: '1'
 *       }
 *     }
 *   }
 * );
 * 
 * console.log('NFT Minted!');
 * console.log('IPFS Image:', result.ipfsUrl);
 * console.log('IPFS Metadata:', result.metadataUrl);
 * console.log('Token ID:', result.tokenId);
 * console.log('Blockscout:', result.blockscoutUrl);
 */

export default ETCPinataNFTMinter;
