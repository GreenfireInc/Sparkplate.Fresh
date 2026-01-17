// Stellar NFT Minting via Storacha

import { Keypair, Asset, Operation, TransactionBuilder, Networks, Server } from '@stellar/stellar-sdk';

export interface StorachaConfig { email: string; space?: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; assetCode: string; issuerAddress: string; txHash: string; explorerUrl: string }

export class StellarStorachaNFTMinter {
  private storachaConfig: StorachaConfig;
  private storachaGateway = 'https://w3s.link/ipfs';
  private server: Server;
  private network: typeof Networks.PUBLIC | typeof Networks.TESTNET;
  private networkName: 'mainnet' | 'testnet';

  constructor(storachaConfig: StorachaConfig, horizonUrl: string = 'https://horizon.stellar.org', network: 'mainnet' | 'testnet' = 'mainnet') {
    this.storachaConfig = storachaConfig;
    this.server = new Server(horizonUrl);
    this.network = network === 'mainnet' ? Networks.PUBLIC : Networks.TESTNET;
    this.networkName = network;
  }

  private async mintStellarNFT(secretKey: string, metadataUrl: string, assetCode: string): Promise<{ assetCode: string; issuerAddress: string; txHash: string }> {
    const sourceKeypair = Keypair.fromSecret(secretKey);
    const account = await this.server.loadAccount(sourceKeypair.publicKey());
    
    const asset = new Asset(assetCode.substring(0, 12), sourceKeypair.publicKey());

    const transaction = new TransactionBuilder(account, {
      fee: '100000',
      networkPassphrase: this.network,
    })
      .addOperation(Operation.payment({
        destination: sourceKeypair.publicKey(),
        asset: asset,
        amount: '1',
      }))
      .addOperation(Operation.setOptions({
        setFlags: 2,
      }))
      .addOperation(Operation.manageData({
        name: 'ipfs_hash',
        value: metadataUrl,
      }))
      .setTimeout(180)
      .build();

    transaction.sign(sourceKeypair);
    const result = await this.server.submitTransaction(transaction);

    return { assetCode, issuerAddress: sourceKeypair.publicKey(), txHash: result.hash };
  }

  async mintNFT(secretKey: string, fileData: Buffer, metadata: Omit<NFTMetadata, 'image'>, assetCode: string, fileName: string = 'nft-asset'): Promise<MintResult> {
    // Placeholder implementation - Storacha requires additional setup
    const fileCid = 'placeholder-cid';
    const metadataCid = 'placeholder-metadata-cid';
    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${fileCid}` };
    const stellarNFT = await this.mintStellarNFT(secretKey, `ipfs://${metadataCid}`, assetCode);
    const explorerBase = this.networkName === 'mainnet' ? 'https://stellar.expert/explorer/public/tx' : 'https://stellar.expert/explorer/testnet/tx';

    return {
      ipfsCid: fileCid,
      ipfsUrl: `${this.storachaGateway}/${fileCid}`,
      metadataCid,
      metadataUrl: `${this.storachaGateway}/${metadataCid}`,
      assetCode: stellarNFT.assetCode,
      issuerAddress: stellarNFT.issuerAddress,
      txHash: stellarNFT.txHash,
      explorerUrl: `${explorerBase}/${stellarNFT.txHash}`,
    };
  }

  async checkBalance(secretKeyOrAddress: string): Promise<{ address: string; balanceXlm: string }> {
    let address: string;
    if (secretKeyOrAddress.startsWith('S')) {
      const keypair = Keypair.fromSecret(secretKeyOrAddress);
      address = keypair.publicKey();
    } else {
      address = secretKeyOrAddress;
    }

    const account = await this.server.loadAccount(address);
    const xlmBalance = account.balances.find(b => b.asset_type === 'native');
    const balanceXlm = xlmBalance ? xlmBalance.balance : '0';

    return { address, balanceXlm };
  }
}

export default StellarStorachaNFTMinter;

