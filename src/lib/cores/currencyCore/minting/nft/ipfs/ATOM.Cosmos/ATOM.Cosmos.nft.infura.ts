// Cosmos NFT Minting via Infura IPFS
// Enterprise-grade IPFS infrastructure for Cosmos CW721 NFTs

/**
 * OVERVIEW:
 * - Enterprise-grade IPFS via Infura
 * - Cosmos CW721 NFT standard
 * - CosmWasm smart contracts
 * 
 * COSTS:
 * - Infura: 5GB free, then paid
 * - Cosmos: ~0.025 ATOM gas fees
 */

import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { GasPrice } from '@cosmjs/stargate';
import { create } from 'kubo-rpc-client';
import type { IPFSHTTPClient } from 'kubo-rpc-client';

export interface InfuraConfig {
  projectId: string;
  projectSecret: string;
  dedicatedGateway?: string;
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

export class CosmosInfuraNFTMinter {
  private ipfs: IPFSHTTPClient;
  private infuraGateway: string;
  private rpcEndpoint: string;
  private network: 'mainnet' | 'testnet';

  constructor(
    infuraConfig: InfuraConfig,
    rpcEndpoint: string = 'https://rpc.cosmos.network',
    network: 'mainnet' | 'testnet' = 'mainnet'
  ) {
    const auth = 'Basic ' + 
      Buffer.from(
        infuraConfig.projectId + ':' + infuraConfig.projectSecret
      ).toString('base64');

    this.ipfs = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        authorization: auth,
      },
    });

    this.infuraGateway = infuraConfig.dedicatedGateway || 
      `https://infura-ipfs.io/ipfs`;
    this.rpcEndpoint = rpcEndpoint;
    this.network = network;
  }

  private async uploadFileToInfura(
    fileData: Buffer,
    fileName: string
  ): Promise<{ cid: string; url: string }> {
    const result = await this.ipfs.add(
      {
        path: fileName,
        content: fileData,
      },
      { pin: true }
    );

    const cid = result.cid.toString();
    return {
      cid,
      url: `${this.infuraGateway}/${cid}`,
    };
  }

  private async uploadMetadataToInfura(
    metadata: NFTMetadata,
    fileName: string = 'metadata.json'
  ): Promise<{ cid: string; url: string }> {
    const jsonString = JSON.stringify(metadata, null, 2);
    const jsonBuffer = Buffer.from(jsonString);

    const result = await this.ipfs.add(
      {
        path: fileName,
        content: jsonBuffer,
      },
      { pin: true }
    );

    const cid = result.cid.toString();
    return {
      cid,
      url: `${this.infuraGateway}/${cid}`,
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
    console.log('Starting NFT minting with Infura...');

    const fileUpload = await this.uploadFileToInfura(fileData, fileName);
    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: `ipfs://${fileUpload.cid}`,
    };

    const metadataUpload = await this.uploadMetadataToInfura(
      completeMetadata,
      `${fileName.replace(/\.[^/.]+$/, '')}_metadata.json`
    );

    const cosmosNFT = await this.mintCosmosNFT(
      mnemonic,
      contractAddress,
      `ipfs://${metadataUpload.cid}`,
      completeMetadata,
      tokenId
    );

    const explorerBase = this.network === 'mainnet' 
      ? 'https://www.mintscan.io/cosmos/txs' 
      : 'https://testnet.mintscan.io/cosmoshub-testnet/txs';

    return {
      ipfsCid: fileUpload.cid,
      ipfsUrl: fileUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
      tokenId: cosmosNFT.tokenId,
      contractAddress,
      txHash: cosmosNFT.txHash,
      mintscanUrl: `${explorerBase}/${cosmosNFT.txHash}`,
    };
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
    const balanceAtom = (parseInt(balance.amount) / 1000000).toString();

    return {
      address,
      balanceAtom,
    };
  }
}

export default CosmosInfuraNFTMinter;
