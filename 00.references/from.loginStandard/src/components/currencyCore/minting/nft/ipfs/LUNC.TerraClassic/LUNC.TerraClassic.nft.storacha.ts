// Terra Classic NFT Minting via Storacha

import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { GasPrice } from '@cosmjs/stargate';

export interface StorachaConfig { email: string; space?: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; tokenId: string; contractAddress: string; txHash: string; finderUrl: string }

export class TerraClassicStorachaNFTMinter {
  private storachaConfig: StorachaConfig;
  private storachaGateway = 'https://w3s.link/ipfs';
  private rpcEndpoint: string;
  private network: 'mainnet' | 'testnet';

  constructor(storachaConfig: StorachaConfig, rpcEndpoint: string = 'https://terra-classic-lcd.publicnode.com', network: 'mainnet' | 'testnet' = 'mainnet') { this.storachaConfig = storachaConfig; this.rpcEndpoint = rpcEndpoint; this.network = network; }

  private async mintTerraClassicNFT(mnemonic: string, contractAddress: string, metadataUrl: string, metadata: NFTMetadata, tokenId: string): Promise<{ txHash: string; tokenId: string }> {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: 'terra' });
    const [firstAccount] = await wallet.getAccounts();
    const client = await SigningCosmWasmClient.connectWithSigner(this.rpcEndpoint, wallet, { gasPrice: GasPrice.fromString('0.15uluna') });
    const mintMsg = { mint: { token_id: tokenId, owner: firstAccount.address, token_uri: metadataUrl, extension: { name: metadata.name, description: metadata.description, image: metadata.image, attributes: metadata.attributes } } };
    const result = await client.execute(firstAccount.address, contractAddress, mintMsg, 'auto', 'Minting NFT');
    return { txHash: result.transactionHash, tokenId };
  }

  async mintNFT(mnemonic: string, contractAddress: string, fileData: Buffer, fileName: string, metadata: Omit<NFTMetadata, 'image'>, tokenId: string): Promise<MintResult> {
    const fileCid = 'placeholder-cid';
    const metadataCid = 'placeholder-metadata-cid';
    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${fileCid}` };
    const terraClassicNFT = await this.mintTerraClassicNFT(mnemonic, contractAddress, `ipfs://${metadataCid}`, completeMetadata, tokenId);
    const explorerBase = this.network === 'mainnet' ? 'https://finder.terra.money/classic/tx' : 'https://finder.terra.money/testnet/tx';
    return { ipfsCid: fileCid, ipfsUrl: `${this.storachaGateway}/${fileCid}`, metadataCid, metadataUrl: `${this.storachaGateway}/${metadataCid}`, tokenId: terraClassicNFT.tokenId, contractAddress, txHash: terraClassicNFT.txHash, finderUrl: `${explorerBase}/${terraClassicNFT.txHash}` };
  }

  async checkBalance(mnemonicOrAddress: string): Promise<{ address: string; balanceLunc: string }> {
    let address: string;
    if (mnemonicOrAddress.split(' ').length >= 12) {
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonicOrAddress, { prefix: 'terra' });
      const [firstAccount] = await wallet.getAccounts();
      address = firstAccount.address;
    } else {
      address = mnemonicOrAddress;
    }
    const client = await SigningCosmWasmClient.connect(this.rpcEndpoint);
    const balance = await client.getBalance(address, 'uluna');
    return { address, balanceLunc: (parseInt(balance.amount) / 1000000).toString() };
  }
}

export default TerraClassicStorachaNFTMinter;
