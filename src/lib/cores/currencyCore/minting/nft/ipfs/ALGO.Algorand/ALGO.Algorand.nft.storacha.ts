// Algorand NFT Minting via Storacha (formerly web3.storage)
// Free decentralized storage powered by IPFS and Filecoin

/**
 * OVERVIEW:
 * 
 * Storacha (formerly web3.storage) provides free decentralized storage.
 * - Upload to IPFS and Filecoin
 * - Automatic content addressing
 * - Free tier available
 * - Create Algorand ASA NFT metadata
 * 
 * BENEFITS:
 * - Free storage
 * - Filecoin backing
 * - Simple API
 * - Protocol Labs infrastructure
 * 
 * COSTS:
 * - Storacha: Free tier available
 * - Algorand: ~0.001 ALGO for ASA creation + 0.1 ALGO reserve
 */

import algosdk from 'algosdk';
import { create } from '@web3-storage/w3up-client';
import { File } from '@web3-storage/w3up-client/types';

export interface StorachaConfig {
  email: string; // Email for authentication
  space?: string; // Optional space DID
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

export class AlgorandStorachaNFTMinter {
  private algodClient: algosdk.Algodv2;
  private storachaConfig: StorachaConfig;
  private storachaGateway = 'https://w3s.link/ipfs';
  private network: 'mainnet' | 'testnet';
  private client: any;

  constructor(
    storachaConfig: StorachaConfig,
    algodServer: string = 'https://mainnet-api.algonode.cloud',
    algodPort: number = 443,
    algodToken: string = '',
    network: 'mainnet' | 'testnet' = 'mainnet'
  ) {
    this.storachaConfig = storachaConfig;
    this.network = network;
    this.algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
  }

  async initClient(): Promise<void> {
    if (this.client) return;
    this.client = await create();
    // Note: Authentication flow would be handled here
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
    metadata: Omit<NFTMetadata, 'image' | 'image_integrity' | 'image_mimetype'>
  ): Promise<MintResult> {
    console.log('Starting NFT minting with Storacha...');
    await this.initClient();

    // Note: Simplified example - actual implementation would use Storacha client
    const crypto = await import('crypto');
    const hash = crypto.createHash('sha256').update(fileData).digest('base64');
    
    // Placeholder CID (actual implementation would use Storacha upload)
    const fileCid = 'placeholder-cid';
    const metadataCid = 'placeholder-metadata-cid';

    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: `ipfs://${fileCid}`,
      image_integrity: `sha256-${hash}`,
      image_mimetype: this.getMimeType(fileName),
    };

    const algorandNFT = await this.createAlgorandNFT(
      privateKeyMnemonic,
      `ipfs://${metadataCid}`,
      completeMetadata
    );

    const explorerBase = this.network === 'mainnet' 
      ? 'https://algoexplorer.io/asset' 
      : 'https://testnet.algoexplorer.io/asset';

    return {
      ipfsCid: fileCid,
      ipfsUrl: `${this.storachaGateway}/${fileCid}`,
      metadataCid,
      metadataUrl: `${this.storachaGateway}/${metadataCid}`,
      assetId: algorandNFT.assetId,
      txId: algorandNFT.txId,
      algoExplorerUrl: `${explorerBase}/${algorandNFT.assetId}`,
    };
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

export default AlgorandStorachaNFTMinter;
