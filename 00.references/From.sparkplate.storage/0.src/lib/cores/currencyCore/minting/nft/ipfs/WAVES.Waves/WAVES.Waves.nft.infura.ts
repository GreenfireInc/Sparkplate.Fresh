// Waves NFT Minting via Infura IPFS

import { issue, broadcast } from '@waves/waves-transactions';
import { publicKey } from '@waves/ts-lib-crypto';
import { create } from 'kubo-rpc-client';
import type { IPFSHTTPClient } from 'kubo-rpc-client';
import axios from 'axios';

export interface InfuraConfig { projectId: string; projectSecret: string; dedicatedGateway?: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; assetId: string; txId: string; explorerUrl: string }

export class WavesInfuraNFTMinter {
  private ipfs: IPFSHTTPClient;
  private infuraGateway: string;
  private nodeUrl: string;
  private chainId: 'W' | 'T';

  constructor(infuraConfig: InfuraConfig, nodeUrl: string = 'https://nodes.wavesnodes.com', chainId: 'W' | 'T' = 'W') {
    const auth = 'Basic ' + Buffer.from(infuraConfig.projectId + ':' + infuraConfig.projectSecret).toString('base64');
    this.ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', headers: { authorization: auth } });
    this.infuraGateway = infuraConfig.dedicatedGateway || 'https://infura-ipfs.io/ipfs';
    this.nodeUrl = nodeUrl;
    this.chainId = chainId;
  }

  private async uploadFileToInfura(fileData: Buffer, fileName: string): Promise<{ cid: string; url: string }> {
    const result = await this.ipfs.add({ path: fileName, content: fileData }, { pin: true });
    const cid = result.cid.toString();
    return { cid, url: `${this.infuraGateway}/${cid}` };
  }

  private async uploadMetadataToInfura(metadata: NFTMetadata, fileName: string = 'metadata.json'): Promise<{ cid: string; url: string }> {
    const jsonBuffer = Buffer.from(JSON.stringify(metadata, null, 2));
    const result = await this.ipfs.add({ path: fileName, content: jsonBuffer }, { pin: true });
    const cid = result.cid.toString();
    return { cid, url: `${this.infuraGateway}/${cid}` };
  }

  private async mintWavesNFT(seed: string, metadataUrl: string, metadata: NFTMetadata): Promise<{ assetId: string; txId: string }> {
    const issueTx = issue({
      name: metadata.name.substring(0, 16),
      description: `${metadata.description.substring(0, 900)} | ${metadataUrl}`,
      quantity: 1,
      decimals: 0,
      reissuable: false,
      chainId: this.chainId,
    }, seed);

    const response = await broadcast(issueTx, this.nodeUrl);
    return { assetId: response.id, txId: response.id };
  }

  async mintNFT(seed: string, fileData: Buffer, metadata: Omit<NFTMetadata, 'image'>, fileName: string = 'nft-asset'): Promise<MintResult> {
    console.log('Starting Waves NFT minting process...');
    const fileUpload = await this.uploadFileToInfura(fileData, fileName);
    console.log(`File uploaded: ${fileUpload.cid}`);

    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${fileUpload.cid}` };
    const metadataUpload = await this.uploadMetadataToInfura(completeMetadata, `${fileName.replace(/\.[^/.]+$/, '')}_metadata.json`);
    console.log(`Metadata uploaded: ${metadataUpload.cid}`);

    const wavesNFT = await this.mintWavesNFT(seed, `ipfs://${metadataUpload.cid}`, completeMetadata);
    console.log(`Waves NFT minted: Asset ID ${wavesNFT.assetId}`);

    const explorerBase = this.chainId === 'W' ? 'https://wavesexplorer.com/tx' : 'https://wavesexplorer.com/testnet/tx';

    return {
      ipfsCid: fileUpload.cid,
      ipfsUrl: fileUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
      assetId: wavesNFT.assetId,
      txId: wavesNFT.txId,
      explorerUrl: `${explorerBase}/${wavesNFT.txId}`,
    };
  }

  async checkBalance(seedOrAddress: string): Promise<{ address: string; balanceWaves: string }> {
    let address: string;
    if (seedOrAddress.split(' ').length === 15) {
      address = publicKey(seedOrAddress);
    } else {
      address = seedOrAddress;
    }

    const response = await axios.get(`${this.nodeUrl}/addresses/balance/${address}`);
    const balanceWaves = (response.data.balance / 100000000).toString();

    return { address, balanceWaves };
  }
}

export default WavesInfuraNFTMinter;

