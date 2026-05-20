// Algorand NFT Minting via NFT.Storage
// Free NFT-specific IPFS storage backed by Filecoin

/**
 * OVERVIEW:
 * 
 * NFT.Storage provides free, permanent NFT storage backed by Filecoin.
 * - Upload NFT assets and metadata
 * - Automatic IPFS pinning
 * - Filecoin deals for permanence
 * - Create Algorand ASA NFT metadata
 * 
 * BENEFITS:
 * - Free storage for NFTs
 * - Filecoin redundancy
 * - NFT-specific features
 * - Protocol Labs infrastructure
 * 
 * COSTS:
 * - NFT.Storage: Free
 * - Algorand: ~0.001 ALGO for ASA creation + 0.1 ALGO reserve
 */

import algosdk from 'algosdk';
import { NFTStorage, File, Blob } from 'nft.storage';

export interface NFTStorageConfig {
  apiToken: string;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image?: string;
  image_integrity?: string;
  image_mimetype?: string;
  animation_url?: string;
  external_url?: string;
  properties?: Record<string, any>;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

export interface MintResult {
  ipfsCid: string;
  ipfsUrl: string;
  metadataCid: string;
  metadataUrl: string;
  assetId: number;
  txId: string;
  algoExplorerUrl: string;
}

export class AlgorandNFTStorageMinter {
  private algodClient: algosdk.Algodv2;
  private client: NFTStorage;
  private nftStorageGateway = 'https://nftstorage.link/ipfs';
  private network: 'mainnet' | 'testnet';

  constructor(
    nftStorageConfig: NFTStorageConfig,
    algodServer: string = 'https://mainnet-api.algonode.cloud',
    algodPort: number = 443,
    algodToken: string = '',
    network: 'mainnet' | 'testnet' = 'mainnet'
  ) {
    this.client = new NFTStorage({
      token: nftStorageConfig.apiToken,
    });
    this.network = network;
    this.algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
  }

  private getMimeType(fileName: string): string {
    const ext = fileName.split('.').pop()?.toLowerCase();
    const mimeTypes: Record<string, string> = {
      'png': 'image/png',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
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
    try {
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
    } catch (error: any) {
      throw new Error(`NFT.Storage upload failed: ${error.message}`);
    }
  }

  private async createAlgorandNFT(
    privateKeyMnemonic: string,
    metadataUrl: string,
    metadata: NFTMetadata
  ): Promise<{ assetId: number; txId: string }> {
    const account = algosdk.mnemonicToSecretKey(privateKeyMnemonic);
    const params = await this.algodClient.getTransactionParams().do();

    const assetCreateTxn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      from: account.addr,
      total: 1,
      decimals: 0,
      assetName: metadata.name.substring(0, 32),
      unitName: 'NFT',
      assetURL: metadataUrl.substring(0, 96),
      defaultFrozen: false,
      freeze: account.addr,
      manager: account.addr,
      clawback: account.addr,
      reserve: account.addr,
      suggestedParams: params,
    });

    const signedTxn = assetCreateTxn.signTxn(account.sk);
    const { txId } = await this.algodClient.sendRawTransaction(signedTxn).do();
    const confirmedTxn = await algosdk.waitForConfirmation(this.algodClient, txId, 4);
    const assetId = confirmedTxn['asset-index'];

    return { assetId, txId };
  }

  async mintNFT(
    privateKeyMnemonic: string,
    fileData: Buffer,
    fileName: string,
    metadata: Omit<NFTMetadata, 'image'>
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

    const algorandNFT = await this.createAlgorandNFT(
      privateKeyMnemonic,
      `ipfs://${nftPackage.metadataCid}`,
      completeMetadata
    );

    const explorerBase = this.network === 'mainnet' 
      ? 'https://algoexplorer.io/asset' 
      : 'https://testnet.algoexplorer.io/asset';

    return {
      ipfsCid: nftPackage.imageCid,
      ipfsUrl: `${this.nftStorageGateway}/${nftPackage.imageCid}`,
      metadataCid: nftPackage.metadataCid,
      metadataUrl: nftPackage.url,
      assetId: algorandNFT.assetId,
      txId: algorandNFT.txId,
      algoExplorerUrl: `${explorerBase}/${algorandNFT.assetId}`,
    };
  }

  async checkStatus(cid: string): Promise<any> {
    return await this.client.status(cid);
  }

  async checkBalance(mnemonicOrAddress: string): Promise<{
    address: string;
    balanceAlgo: number;
  }> {
    let address: string;
    if (mnemonicOrAddress.split(' ').length === 25) {
      const account = algosdk.mnemonicToSecretKey(mnemonicOrAddress);
      address = account.addr;
    } else {
      address = mnemonicOrAddress;
    }

    const accountInfo = await this.algodClient.accountInformation(address).do();
    return {
      address,
      balanceAlgo: accountInfo.amount / 1000000,
    };
  }
}

export default AlgorandNFTStorageMinter;
