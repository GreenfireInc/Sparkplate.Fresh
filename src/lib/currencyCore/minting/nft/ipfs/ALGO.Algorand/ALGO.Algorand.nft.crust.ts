// Algorand NFT Minting via Crust Network
// Decentralized cloud storage built on IPFS and Polkadot

/**
 * OVERVIEW:
 * 
 * Crust Network provides decentralized cloud storage on IPFS.
 * - Decentralized storage layer
 * - Built on Polkadot
 * - Incentivized storage
 * - Create Algorand ASA NFT metadata
 * 
 * BENEFITS:
 * - Decentralized infrastructure
 * - Storage incentives
 * - Polkadot integration
 * - Data privacy
 * 
 * COSTS:
 * - Crust: Pay per GB stored
 * - Algorand: ~0.001 ALGO for ASA creation + 0.1 ALGO reserve
 */

import algosdk from 'algosdk';
import axios from 'axios';
import FormData from 'form-data';

export interface CrustConfig {
  authToken: string; // Crust authentication token
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

export class AlgorandCrustNFTMinter {
  private algodClient: algosdk.Algodv2;
  private crustConfig: CrustConfig;
  private crustBaseUrl = 'https://gw.crustfiles.app/api/v0';
  private crustGateway = 'https://gw.crustfiles.app/ipfs';
  private network: 'mainnet' | 'testnet';

  constructor(
    crustConfig: CrustConfig,
    algodServer: string = 'https://mainnet-api.algonode.cloud',
    algodPort: number = 443,
    algodToken: string = '',
    network: 'mainnet' | 'testnet' = 'mainnet'
  ) {
    this.crustConfig = crustConfig;
    this.network = network;
    this.algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
  }

  private async uploadFileToCrust(
    fileData: Buffer,
    fileName: string
  ): Promise<{ cid: string; url: string; hash: string }> {
    const formData = new FormData();
    formData.append('file', fileData, fileName);

    try {
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
      const crypto = await import('crypto');
      const hash = crypto.createHash('sha256').update(fileData).digest('base64');

      return {
        cid,
        url: `${this.crustGateway}/${cid}`,
        hash,
      };
    } catch (error: any) {
      throw new Error(`Crust upload failed: ${error.message}`);
    }
  }

  private async uploadJSONToCrust(
    metadata: NFTMetadata,
    fileName: string
  ): Promise<{ cid: string; url: string }> {
    const jsonString = JSON.stringify(metadata, null, 2);
    const jsonBuffer = Buffer.from(jsonString);

    const formData = new FormData();
    formData.append('file', jsonBuffer, fileName);

    try {
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
    } catch (error: any) {
      throw new Error(`Crust metadata upload failed: ${error.message}`);
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
    console.log('Starting NFT minting with Crust...');

    const fileUpload = await this.uploadFileToCrust(fileData, fileName);
    console.log(`File uploaded: ${fileUpload.cid}`);

    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: `ipfs://${fileUpload.cid}`,
      image_integrity: `sha256-${fileUpload.hash}`,
      image_mimetype: this.getMimeType(fileName),
    };

    const metadataUpload = await this.uploadJSONToCrust(
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

export default AlgorandCrustNFTMinter;
