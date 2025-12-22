// Cosmos NFT Minting via NFT.Storage
// Free NFT-specific IPFS storage for Cosmos CW721

import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { GasPrice } from '@cosmjs/stargate';
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
}

export interface MintResult {
  ipfsCid: string;
  ipfsUrl: string;
  metadataCid: string;
  metadataUrl: string;
  tokenId: string;
  contractAddress: string;
  txHash: string;
  mintscanUrl: string;
}

export class CosmosNFTStorageMinter {
  private client: NFTStorage;
  private nftStorageGateway = 'https://nftstorage.link/ipfs';
  private rpcEndpoint: string;
  private network: 'mainnet' | 'testnet';

  constructor(
    nftStorageConfig: NFTStorageConfig,
    rpcEndpoint: string = 'https://rpc.cosmos.network',
    network: 'mainnet' | 'testnet' = 'mainnet'
  ) {
    this.client = new NFTStorage({
      token: nftStorageConfig.apiToken,
    });
    this.rpcEndpoint = rpcEndpoint;
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

  private async mintCosmosNFT(
    mnemonic: string,
    contractAddress: string,
    metadataUrl: string,
    metadata: NFTMetadata,
    tokenId: string
  ): Promise<{ txHash: string; tokenId: string }> {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
      prefix: 'cosmos',
    });
    const [firstAccount] = await wallet.getAccounts();
    const client = await SigningCosmWasmClient.connectWithSigner(
      this.rpcEndpoint,
      wallet,
      { gasPrice: GasPrice.fromString('0.025uatom') }
    );

    const mintMsg = {
      mint: {
        token_id: tokenId,
        owner: firstAccount.address,
        token_uri: metadataUrl,
        extension: {
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
          attributes: metadata.attributes,
        },
      },
    };

    const result = await client.execute(
      firstAccount.address,
      contractAddress,
      mintMsg,
      'auto',
      'Minting NFT'
    );

    return {
      txHash: result.transactionHash,
      tokenId,
    };
  }

  async mintNFT(
    mnemonic: string,
    contractAddress: string,
    fileData: Buffer,
    fileName: string,
    metadata: Omit<NFTMetadata, 'image'>,
    tokenId: string
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

    const cosmosNFT = await this.mintCosmosNFT(
      mnemonic,
      contractAddress,
      `ipfs://${nftPackage.metadataCid}`,
      completeMetadata,
      tokenId
    );

    const explorerBase = this.network === 'mainnet' 
      ? 'https://www.mintscan.io/cosmos/txs' 
      : 'https://testnet.mintscan.io/cosmoshub-testnet/txs';

    return {
      ipfsCid: nftPackage.imageCid,
      ipfsUrl: `${this.nftStorageGateway}/${nftPackage.imageCid}`,
      metadataCid: nftPackage.metadataCid,
      metadataUrl: nftPackage.url,
      tokenId: cosmosNFT.tokenId,
      contractAddress,
      txHash: cosmosNFT.txHash,
      mintscanUrl: `${explorerBase}/${cosmosNFT.txHash}`,
    };
  }

  async checkStatus(cid: string): Promise<any> {
    return await this.client.status(cid);
  }

  async checkBalance(mnemonicOrAddress: string): Promise<{
    address: string;
    balanceAtom: string;
  }> {
    let address: string;
    if (mnemonicOrAddress.split(' ').length >= 12) {
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonicOrAddress, {
        prefix: 'cosmos',
      });
      const [firstAccount] = await wallet.getAccounts();
      address = firstAccount.address;
    } else {
      address = mnemonicOrAddress;
    }

    const client = await SigningCosmWasmClient.connect(this.rpcEndpoint);
    const balance = await client.getBalance(address, 'uatom');
    return {
      address,
      balanceAtom: (parseInt(balance.amount) / 1000000).toString(),
    };
  }
}

export default CosmosNFTStorageMinter;
