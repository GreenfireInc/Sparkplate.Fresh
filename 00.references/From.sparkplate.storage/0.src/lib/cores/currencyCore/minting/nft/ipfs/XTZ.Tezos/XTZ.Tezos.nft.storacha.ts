// Tezos NFT Minting via Storacha

import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';

export interface StorachaConfig { email: string; space?: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; tokenId: string; contractAddress: string; opHash: string; explorerUrl: string }

export class TezosStorachaNFTMinter {
  private storachaConfig: StorachaConfig;
  private storachaGateway = 'https://w3s.link/ipfs';
  private tezos: TezosToolkit;
  private network: 'mainnet' | 'ghostnet' | 'kathmandunet';

  constructor(storachaConfig: StorachaConfig, rpcUrl: string = 'https://mainnet.api.tez.ie', network: 'mainnet' | 'ghostnet' | 'kathmandunet' = 'mainnet') {
    this.storachaConfig = storachaConfig;
    this.tezos = new TezosToolkit(rpcUrl);
    this.network = network;
  }

  private async mintTezosNFT(privateKey: string, contractAddress: string, metadataUrl: string, tokenId: string): Promise<{ opHash: string }> {
    const signer = new InMemorySigner(privateKey);
    this.tezos.setProvider({ signer });

    const contract = await this.tezos.contract.at(contractAddress);
    
    const operation = await contract.methods.mint(
      tokenId,
      { 
        token_id: tokenId,
        token_info: {
          '': Buffer.from(metadataUrl).toString('hex')
        }
      }
    ).send();

    await operation.confirmation();
    return { opHash: operation.hash };
  }

  async mintNFT(privateKey: string, contractAddress: string, fileData: Buffer, metadata: Omit<NFTMetadata, 'image'>, tokenId: string, fileName: string = 'nft-asset'): Promise<MintResult> {
    // Placeholder implementation - Storacha requires additional setup
    const fileCid = 'placeholder-cid';
    const metadataCid = 'placeholder-metadata-cid';
    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${fileCid}` };
    const tezosNFT = await this.mintTezosNFT(privateKey, contractAddress, `ipfs://${metadataCid}`, tokenId);
    
    const explorerBase = this.network === 'mainnet' 
      ? 'https://tzkt.io' 
      : this.network === 'ghostnet' 
      ? 'https://ghostnet.tzkt.io' 
      : 'https://kathmandunet.tzkt.io';

    return {
      ipfsCid: fileCid,
      ipfsUrl: `${this.storachaGateway}/${fileCid}`,
      metadataCid,
      metadataUrl: `${this.storachaGateway}/${metadataCid}`,
      tokenId,
      contractAddress,
      opHash: tezosNFT.opHash,
      explorerUrl: `${explorerBase}/${tezosNFT.opHash}`,
    };
  }

  async checkBalance(privateKeyOrAddress: string): Promise<{ address: string; balanceXtz: string }> {
    let address: string;
    if (privateKeyOrAddress.startsWith('edsk')) {
      const signer = new InMemorySigner(privateKeyOrAddress);
      address = await signer.publicKeyHash();
    } else {
      address = privateKeyOrAddress;
    }

    const balance = await this.tezos.tz.getBalance(address);
    const balanceXtz = (balance.toNumber() / 1000000).toString();

    return { address, balanceXtz };
  }
}

export default TezosStorachaNFTMinter;

