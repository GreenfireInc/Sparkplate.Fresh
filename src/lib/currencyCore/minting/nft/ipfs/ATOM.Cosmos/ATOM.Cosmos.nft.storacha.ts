// Cosmos NFT Minting via Storacha
// Free decentralized storage for Cosmos CW721

import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { GasPrice } from '@cosmjs/stargate';

export interface StorachaConfig {
  email: string;
  space?: string;
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

export class CosmosStorachaNFTMinter {
  private storachaConfig: StorachaConfig;
  private storachaGateway = 'https://w3s.link/ipfs';
  private rpcEndpoint: string;
  private network: 'mainnet' | 'testnet';

  constructor(
    storachaConfig: StorachaConfig,
    rpcEndpoint: string = 'https://rpc.cosmos.network',
    network: 'mainnet' | 'testnet' = 'mainnet'
  ) {
    this.storachaConfig = storachaConfig;
    this.rpcEndpoint = rpcEndpoint;
    this.network = network;
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
    console.log('Starting NFT minting with Storacha...');

    // Placeholder CIDs (actual implementation would use Storacha client)
    const fileCid = 'placeholder-cid';
    const metadataCid = 'placeholder-metadata-cid';

    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: `ipfs://${fileCid}`,
    };

    const cosmosNFT = await this.mintCosmosNFT(
      mnemonic,
      contractAddress,
      `ipfs://${metadataCid}`,
      completeMetadata,
      tokenId
    );

    const explorerBase = this.network === 'mainnet' 
      ? 'https://www.mintscan.io/cosmos/txs' 
      : 'https://testnet.mintscan.io/cosmoshub-testnet/txs';

    return {
      ipfsCid: fileCid,
      ipfsUrl: `${this.storachaGateway}/${fileCid}`,
      metadataCid,
      metadataUrl: `${this.storachaGateway}/${metadataCid}`,
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
    return {
      address,
      balanceAtom: (parseInt(balance.amount) / 1000000).toString(),
    };
  }
}

export default CosmosStorachaNFTMinter;
