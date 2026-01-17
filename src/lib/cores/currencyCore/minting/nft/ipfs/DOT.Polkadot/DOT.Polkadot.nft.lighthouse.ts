// Polkadot NFT Minting via Lighthouse IPFS
// Decentralized storage with encryption for Polkadot RMRK

import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import axios from 'axios';
import FormData from 'form-data';

export interface LighthouseConfig {
  apiKey: string;
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

export class PolkadotLighthouseNFTMinter {
  private lighthouseConfig: LighthouseConfig;
  private lighthouseBaseUrl = 'https://node.lighthouse.storage/api/v0';
  private lighthouseGateway = 'https://gateway.lighthouse.storage/ipfs';
  private wsEndpoint: string;
  private network: 'polkadot' | 'kusama' | 'moonbeam' | 'unique';

  constructor(
    lighthouseConfig: LighthouseConfig,
    wsEndpoint: string = 'wss://rpc.polkadot.io',
    network: 'polkadot' | 'kusama' | 'moonbeam' | 'unique' = 'polkadot'
  ) {
    this.lighthouseConfig = lighthouseConfig;
    this.wsEndpoint = wsEndpoint;
    this.network = network;
  }

  private async uploadFileToLighthouse(
    fileData: Buffer,
    fileName: string
  ): Promise<{ cid: string; url: string }> {
    const formData = new FormData();
    formData.append('file', fileData, fileName);

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
    return {
      cid,
      url: `${this.lighthouseGateway}/${cid}`,
    };
  }

  private async uploadJSONToLighthouse(
    metadata: NFTMetadata,
    fileName: string
  ): Promise<{ cid: string; url: string }> {
    const jsonString = JSON.stringify(metadata, null, 2);
    const jsonBuffer = Buffer.from(jsonString);
    const formData = new FormData();
    formData.append('file', jsonBuffer, fileName);

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
    console.log('Starting NFT minting with Lighthouse...');

    const fileUpload = await this.uploadFileToLighthouse(fileData, fileName);
    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: `ipfs://${fileUpload.cid}`,
      mediaUri: `ipfs://${fileUpload.cid}`,
    };

    const metadataUpload = await this.uploadJSONToLighthouse(
      completeMetadata,
      `${fileName.replace(/\.[^/.]+$/, '')}_metadata.json`
    );

    const polkadotNFT = await this.mintPolkadotNFT(
      mnemonicOrSeed,
      collectionId,
      `ipfs://${metadataUpload.cid}`,
      completeMetadata,
      nftId
    );

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

export default PolkadotLighthouseNFTMinter;
