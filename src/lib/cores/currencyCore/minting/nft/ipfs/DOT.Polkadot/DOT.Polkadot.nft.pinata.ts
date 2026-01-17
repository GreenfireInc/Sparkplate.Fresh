// Polkadot NFT Minting via Pinata IPFS
// Uploads files to Pinata IPFS, then creates RMRK NFT on Polkadot/Kusama

/**
 * OVERVIEW:
 * 
 * This module enables NFT minting on Polkadot ecosystem with asset storage on Pinata IPFS.
 * - Upload media files to Pinata IPFS (images, videos, audio, documents)
 * - Create RMRK NFT metadata referencing IPFS CID
 * - Deploy NFT to Polkadot/Kusama relay chain or parachains
 * 
 * BENEFITS:
 * - Fast IPFS upload via Pinata
 * - Permanent metadata on Polkadot
 * - RMRK 2.0 compatible
 * - Multi-chain support (Polkadot, Kusama, parachains)
 * 
 * COSTS:
 * - Pinata: Free tier available (1GB storage, unlimited gateways)
 * - Polkadot: ~0.01 DOT for transaction fees
 * - Kusama: ~0.001 KSM for transaction fees
 */

import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';
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
  mediaUri?: string;
  thumbnailUri?: string;
}

export interface MintResult {
  ipfsCid: string;
  ipfsUrl: string;
  metadataCid: string;
  metadataUrl: string;
  nftId: string;
  collectionId: string;
  txHash: string;
  explorerUrl: string;
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

export class PolkadotPinataNFTMinter {
  private pinataConfig: PinataConfig;
  private pinataBaseUrl = 'https://api.pinata.cloud';
  private pinataGateway = 'https://gateway.pinata.cloud/ipfs';
  private wsEndpoint: string;
  private network: 'polkadot' | 'kusama' | 'moonbeam' | 'unique';

  constructor(
    pinataConfig: PinataConfig,
    wsEndpoint: string = 'wss://rpc.polkadot.io',
    network: 'polkadot' | 'kusama' | 'moonbeam' | 'unique' = 'polkadot'
  ) {
    this.pinataConfig = pinataConfig;
    this.wsEndpoint = wsEndpoint;
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
   * Mint RMRK NFT on Polkadot/Kusama
   */
  private async mintPolkadotNFT(
    mnemonicOrSeed: string,
    collectionId: string,
    metadataUrl: string,
    metadata: NFTMetadata,
    nftId: string
  ): Promise<{ txHash: string; nftId: string }> {
    await cryptoWaitReady();

    // Create API instance
    const provider = new WsProvider(this.wsEndpoint);
    const api = await ApiPromise.create({ provider });

    // Create keyring and add account
    const keyring = new Keyring({ type: 'sr25519' });
    let account;
    
    if (mnemonicOrSeed.split(' ').length >= 12) {
      // It's a mnemonic
      account = keyring.addFromUri(mnemonicOrSeed);
    } else {
      // It's a seed/private key
      account = keyring.addFromUri(`0x${mnemonicOrSeed}`);
    }

    // Create RMRK remark transaction
    // RMRK uses system.remark extrinsic for NFT operations
    const rmrkString = JSON.stringify({
      op: 'MINT',
      collection: collectionId,
      nft: nftId,
      sn: nftId,
      metadata: metadataUrl,
      transferable: 1,
      owner: account.address,
    });

    const remark = `RMRK::MINT::2.0.0::${rmrkString}`;

    // Submit transaction
    const tx = await api.tx.system.remark(remark).signAndSend(account);

    await api.disconnect();

    return {
      txHash: tx.toString(),
      nftId,
    };
  }

  /**
   * Mint NFT: Upload file to Pinata, create metadata, deploy to Polkadot
   */
  async mintNFT(
    mnemonicOrSeed: string,
    collectionId: string,
    fileData: Buffer,
    metadata: Omit<NFTMetadata, 'image'>,
    nftId: string,
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
      mediaUri: `ipfs://${fileUpload.cid}`,
    };

    // 3. Upload metadata to Pinata IPFS
    console.log('Uploading metadata to Pinata IPFS...');
    const metadataUpload = await this.uploadMetadataToPinata(completeMetadata, {
      pinataMetadata: {
        name: `${metadata.name} - Metadata`,
        keyvalues: {
          type: 'nft-metadata',
          standard: 'RMRK',
          nftName: metadata.name,
        },
      },
    });
    console.log(`Metadata uploaded: ${metadataUpload.cid}`);

    // 4. Mint Polkadot NFT
    console.log('Minting Polkadot NFT...');
    const polkadotNFT = await this.mintPolkadotNFT(
      mnemonicOrSeed,
      collectionId,
      `ipfs://${metadataUpload.cid}`,
      completeMetadata,
      nftId
    );
    console.log(`Polkadot NFT minted: NFT ID ${polkadotNFT.nftId}`);

    const explorerBase = this.getExplorerUrl();

    return {
      ipfsCid: fileUpload.cid,
      ipfsUrl: fileUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
      nftId: polkadotNFT.nftId,
      collectionId,
      txHash: polkadotNFT.txHash,
      explorerUrl: `${explorerBase}/${polkadotNFT.txHash}`,
    };
  }

  /**
   * Mint video/audio NFT with animation_url
   */
  async mintMediaNFT(
    mnemonicOrSeed: string,
    collectionId: string,
    mediaData: Buffer,
    thumbnailData: Buffer,
    metadata: Omit<NFTMetadata, 'image' | 'animation_url'>,
    nftId: string,
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
      mediaUri: `ipfs://${mediaUpload.cid}`,
      thumbnailUri: `ipfs://${thumbnailUpload.cid}`,
    };

    // 4. Upload metadata
    const metadataUpload = await this.uploadMetadataToPinata(completeMetadata, {
      pinataMetadata: {
        name: `${metadata.name} - Metadata`,
        keyvalues: {
          type: 'media-nft-metadata',
          standard: 'RMRK',
          nftName: metadata.name,
        },
      },
    });
    console.log(`Metadata uploaded: ${metadataUpload.cid}`);

    // 5. Mint Polkadot NFT
    const polkadotNFT = await this.mintPolkadotNFT(
      mnemonicOrSeed,
      collectionId,
      `ipfs://${metadataUpload.cid}`,
      completeMetadata,
      nftId
    );
    console.log(`Polkadot NFT minted: NFT ID ${polkadotNFT.nftId}`);

    const explorerBase = this.getExplorerUrl();

    return {
      ipfsCid: mediaUpload.cid,
      ipfsUrl: mediaUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
      nftId: polkadotNFT.nftId,
      collectionId,
      txHash: polkadotNFT.txHash,
      explorerUrl: `${explorerBase}/${polkadotNFT.txHash}`,
    };
  }

  /**
   * Get explorer URL based on network
   */
  private getExplorerUrl(): string {
    switch (this.network) {
      case 'polkadot':
        return 'https://polkadot.subscan.io/extrinsic';
      case 'kusama':
        return 'https://kusama.subscan.io/extrinsic';
      case 'moonbeam':
        return 'https://moonbeam.subscan.io/extrinsic';
      case 'unique':
        return 'https://unique.subscan.io/extrinsic';
      default:
        return 'https://polkadot.subscan.io/extrinsic';
    }
  }

  /**
   * Check wallet balance
   */
  async checkBalance(mnemonicOrSeedOrAddress: string): Promise<{
    address: string;
    balanceDOT: string;
  }> {
    await cryptoWaitReady();
    const provider = new WsProvider(this.wsEndpoint);
    const api = await ApiPromise.create({ provider });
    
    let address: string;
    
    // Check if it's a mnemonic, seed, or address
    if (mnemonicOrSeedOrAddress.startsWith('1') || mnemonicOrSeedOrAddress.startsWith('5')) {
      // It's likely an SS58 address
      address = mnemonicOrSeedOrAddress;
    } else {
      const keyring = new Keyring({ type: 'sr25519' });
      if (mnemonicOrSeedOrAddress.split(' ').length >= 12) {
        const account = keyring.addFromUri(mnemonicOrSeedOrAddress);
        address = account.address;
      } else {
        const account = keyring.addFromUri(`0x${mnemonicOrSeedOrAddress}`);
        address = account.address;
      }
    }

    const { data: { free } } = await api.query.system.account(address);
    const balanceDOT = (Number(free.toString()) / 1e10).toFixed(4);

    await api.disconnect();

    return {
      address,
      balanceDOT,
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
 * import { PolkadotPinataNFTMinter } from './DOT.Polkadot.nft.pinata';
 * import * as fs from 'fs';
 * 
 * const minter = new PolkadotPinataNFTMinter({
 *   apiKey: process.env.PINATA_API_KEY!,
 *   apiSecret: process.env.PINATA_API_SECRET!,
 * });
 * 
 * const mnemonic = 'your 12 or 24-word polkadot mnemonic here...';
 * const collectionId = 'my-collection-001';
 * const imageData = fs.readFileSync('art.png');
 * 
 * const result = await minter.mintNFT(
 *   mnemonic,
 *   collectionId,
 *   imageData,
 *   {
 *     name: "Polkadot Art #001",
 *     description: "A unique digital artwork on Polkadot",
 *     attributes: [
 *       { trait_type: "Rarity", value: "Legendary" },
 *       { trait_type: "Artist", value: "CryptoArtist" }
 *     ]
 *   },
 *   'nft-001',
 *   {
 *     fileName: 'art.png',
 *     pinataMetadata: {
 *       name: 'Polkadot Art #001',
 *       keyvalues: {
 *         collection: 'polkadot-art',
 *         edition: '1'
 *       }
 *     }
 *   }
 * );
 * 
 * console.log('NFT Minted!');
 * console.log('IPFS Image:', result.ipfsUrl);
 * console.log('IPFS Metadata:', result.metadataUrl);
 * console.log('NFT ID:', result.nftId);
 * console.log('Subscan:', result.explorerUrl);
 */

export default PolkadotPinataNFTMinter;
