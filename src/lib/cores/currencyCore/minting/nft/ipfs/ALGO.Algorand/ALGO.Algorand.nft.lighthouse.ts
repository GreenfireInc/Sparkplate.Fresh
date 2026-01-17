// Algorand NFT Minting via Lighthouse IPFS
// Decentralized storage with encryption and Filecoin backup

/**
 * OVERVIEW:
 * 
 * Lighthouse provides decentralized storage with optional encryption.
 * - Upload files with optional encryption
 * - Automatic Filecoin deals
 * - PoDSI (Proof of Data Segment Inclusion)
 * - Create Algorand ASA NFT metadata
 * 
 * BENEFITS:
 * - Optional encryption
 * - Filecoin redundancy
 * - PoDSI verification
 * - Pay-as-you-go pricing
 * 
 * COSTS:
 * - Lighthouse: Pay per GB stored
 * - Algorand: ~0.001 ALGO for ASA creation + 0.1 ALGO reserve
 */

import algosdk from 'algosdk';
import axios from 'axios';
import FormData from 'form-data';

export interface LighthouseConfig {
  apiKey: string;
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

export class AlgorandLighthouseNFTMinter {
  private algodClient: algosdk.Algodv2;
  private lighthouseConfig: LighthouseConfig;
  private lighthouseBaseUrl = 'https://node.lighthouse.storage/api/v0';
  private lighthouseGateway = 'https://gateway.lighthouse.storage/ipfs';
  private network: 'mainnet' | 'testnet';

  constructor(
    lighthouseConfig: LighthouseConfig,
    algodServer: string = 'https://mainnet-api.algonode.cloud',
    algodPort: number = 443,
    algodToken: string = '',
    network: 'mainnet' | 'testnet' = 'mainnet'
  ) {
    this.lighthouseConfig = lighthouseConfig;
    this.network = network;
    this.algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
  }

  private async uploadFileToLighthouse(
    fileData: Buffer,
    fileName: string
  ): Promise<{ cid: string; url: string; hash: string }> {
    const formData = new FormData();
    formData.append('file', fileData, fileName);

    try {
      const response = await axios.post(
        `${this.lighthouseBaseUrl}/add`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            Authorization: `Bearer ${this.lighthouseConfig.apiKey}`,
          },
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        }
      );

      const cid = response.data.Hash;
      const crypto = await import('crypto');
      const hash = crypto.createHash('sha256').update(fileData).digest('base64');

      return {
        cid,
        url: `${this.lighthouseGateway}/${cid}`,
        hash,
      };
    } catch (error: any) {
      throw new Error(`Lighthouse upload failed: ${error.message}`);
    }
  }

  private async uploadJSONToLighthouse(
    metadata: NFTMetadata,
    fileName: string
  ): Promise<{ cid: string; url: string }> {
    const jsonString = JSON.stringify(metadata, null, 2);
    const jsonBuffer = Buffer.from(jsonString);

    const formData = new FormData();
    formData.append('file', jsonBuffer, fileName);

    try {
      const response = await axios.post(
        `${this.lighthouseBaseUrl}/add`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            Authorization: `Bearer ${this.lighthouseConfig.apiKey}`,
          },
        }
      );

      const cid = response.data.Hash;
      return {
        cid,
        url: `${this.lighthouseGateway}/${cid}`,
      };
    } catch (error: any) {
      throw new Error(`Lighthouse metadata upload failed: ${error.message}`);
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
    console.log('Starting NFT minting with Lighthouse...');

    const fileUpload = await this.uploadFileToLighthouse(fileData, fileName);
    console.log(`File uploaded: ${fileUpload.cid}`);

    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: `ipfs://${fileUpload.cid}`,
      image_integrity: `sha256-${fileUpload.hash}`,
      image_mimetype: this.getMimeType(fileName),
    };

    const metadataUpload = await this.uploadJSONToLighthouse(
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

export default AlgorandLighthouseNFTMinter;
