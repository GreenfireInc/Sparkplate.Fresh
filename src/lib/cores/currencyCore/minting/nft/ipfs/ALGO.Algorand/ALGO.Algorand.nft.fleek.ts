// Algorand NFT Minting via Fleek IPFS
// Fast IPFS storage with CDN acceleration

/**
 * OVERVIEW:
 * 
 * Fleek provides fast IPFS storage with CDN acceleration.
 * - Upload via Fleek Storage API
 * - CDN-accelerated delivery
 * - DNS integration
 * - Create Algorand ASA NFT metadata
 * 
 * BENEFITS:
 * - CDN acceleration
 * - Fast global delivery
 * - Easy integration
 * - Web3 infrastructure
 * 
 * COSTS:
 * - Fleek: Free tier available
 * - Algorand: ~0.001 ALGO for ASA creation + 0.1 ALGO reserve
 */

import algosdk from 'algosdk';
import axios from 'axios';
import FormData from 'form-data';

export interface FleekConfig {
  apiKey: string;
  apiSecret: string;
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

export class AlgorandFleekNFTMinter {
  private algodClient: algosdk.Algodv2;
  private fleekConfig: FleekConfig;
  private fleekBaseUrl = 'https://api.fleek.co/ipfs';
  private fleekGateway = 'https://ipfs.fleek.co/ipfs';
  private network: 'mainnet' | 'testnet';

  constructor(
    fleekConfig: FleekConfig,
    algodServer: string = 'https://mainnet-api.algonode.cloud',
    algodPort: number = 443,
    algodToken: string = '',
    network: 'mainnet' | 'testnet' = 'mainnet'
  ) {
    this.fleekConfig = fleekConfig;
    this.network = network;
    this.algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
  }

  private async uploadFileToFleek(
    fileData: Buffer,
    fileName: string
  ): Promise<{ cid: string; url: string; hash: string }> {
    const formData = new FormData();
    formData.append('file', fileData, fileName);

    try {
      const response = await axios.post(
        `${this.fleekBaseUrl}/add`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            'x-api-key': this.fleekConfig.apiKey,
            'x-api-secret': this.fleekConfig.apiSecret,
          },
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        }
      );

      const cid = response.data.hash;
      const crypto = await import('crypto');
      const hash = crypto.createHash('sha256').update(fileData).digest('base64');

      return {
        cid,
        url: `${this.fleekGateway}/${cid}`,
        hash,
      };
    } catch (error: any) {
      throw new Error(`Fleek upload failed: ${error.message}`);
    }
  }

  private async uploadJSONToFleek(
    metadata: NFTMetadata,
    fileName: string
  ): Promise<{ cid: string; url: string }> {
    const jsonString = JSON.stringify(metadata, null, 2);
    const jsonBuffer = Buffer.from(jsonString);

    const formData = new FormData();
    formData.append('file', jsonBuffer, fileName);

    try {
      const response = await axios.post(
        `${this.fleekBaseUrl}/add`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            'x-api-key': this.fleekConfig.apiKey,
            'x-api-secret': this.fleekConfig.apiSecret,
          },
        }
      );

      const cid = response.data.hash;
      return {
        cid,
        url: `${this.fleekGateway}/${cid}`,
      };
    } catch (error: any) {
      throw new Error(`Fleek metadata upload failed: ${error.message}`);
    }
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
    console.log('Starting NFT minting with Fleek...');

    const fileUpload = await this.uploadFileToFleek(fileData, fileName);
    console.log(`File uploaded: ${fileUpload.cid}`);

    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: `ipfs://${fileUpload.cid}`,
      image_integrity: `sha256-${fileUpload.hash}`,
      image_mimetype: this.getMimeType(fileName),
    };

    const metadataUpload = await this.uploadJSONToFleek(
      completeMetadata,
      `${fileName.replace(/\.[^/.]+$/, '')}_metadata.json`
    );

    const algorandNFT = await this.createAlgorandNFT(
      privateKeyMnemonic,
      `ipfs://${metadataUpload.cid}`,
      completeMetadata
    );

    const explorerBase = this.network === 'mainnet' 
      ? 'https://algoexplorer.io/asset' 
      : 'https://testnet.algoexplorer.io/asset';

    return {
      ipfsCid: fileUpload.cid,
      ipfsUrl: fileUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
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

export default AlgorandFleekNFTMinter;
