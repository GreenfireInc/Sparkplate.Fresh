// Waves NFT Minting via Storacha

import { issue, broadcast } from '@waves/waves-transactions';
import { publicKey } from '@waves/ts-lib-crypto';
import axios from 'axios';

export interface StorachaConfig { email: string; space?: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; assetId: string; txId: string; explorerUrl: string }

export class WavesStorachaNFTMinter {
  private storachaConfig: StorachaConfig;
  private storachaGateway = 'https://w3s.link/ipfs';
  private nodeUrl: string;
  private chainId: 'W' | 'T';

  constructor(storachaConfig: StorachaConfig, nodeUrl: string = 'https://nodes.wavesnodes.com', chainId: 'W' | 'T' = 'W') {
    this.storachaConfig = storachaConfig;
    this.nodeUrl = nodeUrl;
    this.chainId = chainId;
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
    // Placeholder implementation - Storacha requires additional setup
    const fileCid = 'placeholder-cid';
    const metadataCid = 'placeholder-metadata-cid';
    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${fileCid}` };
    const wavesNFT = await this.mintWavesNFT(seed, `ipfs://${metadataCid}`, completeMetadata);
    const explorerBase = this.chainId === 'W' ? 'https://wavesexplorer.com/tx' : 'https://wavesexplorer.com/testnet/tx';

    return {
      ipfsCid: fileCid,
      ipfsUrl: `${this.storachaGateway}/${fileCid}`,
      metadataCid,
      metadataUrl: `${this.storachaGateway}/${metadataCid}`,
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

export default WavesStorachaNFTMinter;

