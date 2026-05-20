// Polkadot NFT Minting via NFT.Storage
// Free NFT-specific IPFS storage for Polkadot RMRK

import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';
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

export class PolkadotNFTStorageMinter {
  private client: NFTStorage;
  private nftStorageGateway = 'https://nftstorage.link/ipfs';
  private wsEndpoint: string;
  private network: 'polkadot' | 'kusama' | 'moonbeam' | 'unique';

  constructor(
    nftStorageConfig: NFTStorageConfig,
    wsEndpoint: string = 'wss://rpc.polkadot.io',
    network: 'polkadot' | 'kusama' | 'moonbeam' | 'unique' = 'polkadot'
  ) {
    this.client = new NFTStorage({
      token: nftStorageConfig.apiToken,
    });
    this.wsEndpoint = wsEndpoint;
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

  private async mintPolkadotNFT(
    mnemonicOrSeed: string,
    collectionId: string,
    metadataUrl: string,
    metadata: NFTMetadata,
    nftId: string
  ): Promise<{ txHash: string; nftId: string }> {
    await cryptoWaitReady();
    const provider = new WsProvider(this.wsEndpoint);
    const api = await ApiPromise.create({ provider });

    const keyring = new Keyring({ type: 'sr25519' });
    let account;
    
    if (mnemonicOrSeed.split(' ').length >= 12) {
      account = keyring.addFromUri(mnemonicOrSeed);
    } else {
      account = keyring.addFromUri(`0x${mnemonicOrSeed}`);
    }

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
    const tx = await api.tx.system.remark(remark).signAndSend(account);

    await api.disconnect();

    return {
      txHash: tx.toString(),
      nftId,
    };
  }

  async mintNFT(
    mnemonicOrSeed: string,
    collectionId: string,
    fileData: Buffer,
    fileName: string,
    metadata: Omit<NFTMetadata, 'image'>,
    nftId: string
  ): Promise<MintResult> {
    console.log('Starting NFT minting with NFT.Storage...');

    const nftPackage = await this.storeNFT(fileData, fileName, {
      ...metadata,
      image: '',
    } as NFTMetadata);

    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: `ipfs://${nftPackage.imageCid}`,
      mediaUri: `ipfs://${nftPackage.imageCid}`,
    };

    const polkadotNFT = await this.mintPolkadotNFT(
      mnemonicOrSeed,
      collectionId,
      `ipfs://${nftPackage.metadataCid}`,
      nftId
    );

    const explorerBase = this.getExplorerUrl();

    return {
      ipfsCid: nftPackage.imageCid,
      ipfsUrl: `${this.nftStorageGateway}/${nftPackage.imageCid}`,
      metadataCid: nftPackage.metadataCid,
      metadataUrl: nftPackage.url,
      nftId: polkadotNFT.nftId,
      collectionId,
      txHash: polkadotNFT.txHash,
      explorerUrl: `${explorerBase}/${polkadotNFT.txHash}`,
    };
  }

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

  async checkStatus(cid: string): Promise<any> {
    return await this.client.status(cid);
  }

  async checkBalance(mnemonicOrSeedOrAddress: string): Promise<{
    address: string;
    balanceDOT: string;
  }> {
    await cryptoWaitReady();
    const provider = new WsProvider(this.wsEndpoint);
    const api = await ApiPromise.create({ provider });
    
    let address: string;
    
    if (mnemonicOrSeedOrAddress.startsWith('1') || mnemonicOrSeedOrAddress.startsWith('5')) {
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
}

export default PolkadotNFTStorageMinter;
