/**
 * Ripple (XRP) Smart Contract-based Escrow System
 * On-chain escrow for multiplayer games using XRP Ledger native Escrow
 */

/**
 * XRP LEDGER ESCROW
 * Uses native Escrow functionality of XRP Ledger
 * 
 * Note: XRP Ledger has built-in Escrow transactions that can be
 * time-locked or crypto-conditionally released
 */

/**
 * TYPESCRIPT CLIENT CODE
 */

import {
  Client,
  Wallet,
  xrpToDrops,
  dropsToXrp,
  EscrowCreate,
  EscrowFinish,
  EscrowCancel,
} from 'xrpl';

export interface EscrowConfig {
  network: 'mainnet' | 'testnet' | 'devnet';
  gameManagerSeed: string;
}

export interface GameState {
  escrowSequence?: number;
  buyInAmount: number;
  players: string[];
  gameActive: boolean;
  winner?: string;
}

export class RippleEscrowContractClient {
  private client: Client;
  private gameManager: Wallet;
  private network: 'mainnet' | 'testnet' | 'devnet';
  private gameState: Map<string, GameState> = new Map();

  constructor(config: EscrowConfig) {
    this.network = config.network;
    this.gameManager = Wallet.fromSeed(config.gameManagerSeed);

    const serverUrl = this.getServerUrl(config.network);
    this.client = new Client(serverUrl);
  }

  private getServerUrl(network: 'mainnet' | 'testnet' | 'devnet'): string {
    switch (network) {
      case 'mainnet':
        return 'wss://xrplcluster.com';
      case 'testnet':
        return 'wss://s.altnet.rippletest.net:51233';
      case 'devnet':
        return 'wss://s.devnet.rippletest.net:51233';
    }
  }

  async connect(): Promise<void> {
    if (!this.client.isConnected()) {
      await this.client.connect();
    }
  }

  async disconnect(): Promise<void> {
    if (this.client.isConnected()) {
      await this.client.disconnect();
    }
  }

  async createGame(gameId: string, buyInXrp: number, requiredPlayers: number): Promise<string> {
    try {
      await this.connect();

      this.gameState.set(gameId, {
        buyInAmount: buyInXrp,
        players: [],
        gameActive: false,
      });

      console.log(`✅ Game ${gameId} created`);
      console.log(`   Buy-in: ${buyInXrp} XRP`);
      console.log(`   Required players: ${requiredPlayers}`);

      return gameId;
    } catch (error) {
      throw new Error(`Game creation failed: ${error}`);
    }
  }

  async joinGame(gameId: string, playerSeed: string): Promise<string> {
    try {
      await this.connect();

      const state = this.gameState.get(gameId);
      if (!state) {
        throw new Error('Game not found');
      }

      const player = Wallet.fromSeed(playerSeed);

      // Create escrow to game manager
      const escrowCreate: EscrowCreate = {
        TransactionType: 'EscrowCreate',
        Account: player.address,
        Destination: this.gameManager.address,
        Amount: xrpToDrops(state.buyInAmount),
        FinishAfter: Math.floor(Date.now() / 1000) + 3600,
      };

      const prepared = await this.client.autofill(escrowCreate);
      const signed = player.sign(prepared);
      const result = await this.client.submitAndWait(signed.tx_blob);

      state.players.push(player.address);

      if (!state.escrowSequence && result.result.meta && typeof result.result.meta === 'object') {
        // @ts-ignore
        state.escrowSequence = result.result.Sequence;
      }

      console.log(`✅ Player ${player.address} joined game`);
      console.log(`   Transaction: ${result.result.hash}`);

      return result.result.hash;
    } catch (error) {
      throw new Error(`Join game failed: ${error}`);
    }
  }

  async declareWinner(gameId: string, winnerAddress: string): Promise<string> {
    try {
      await this.connect();

      const state = this.gameState.get(gameId);
      if (!state) {
        throw new Error('Game not found');
      }

      if (!state.players.includes(winnerAddress)) {
        throw new Error('Winner not in game');
      }

      if (!state.escrowSequence) {
        throw new Error('No escrow found');
      }

      // Finish escrow to release funds to winner
      const escrowFinish: EscrowFinish = {
        TransactionType: 'EscrowFinish',
        Account: this.gameManager.address,
        Owner: state.players[0],
        OfferSequence: state.escrowSequence,
      };

      const prepared = await this.client.autofill(escrowFinish);
      const signed = this.gameManager.sign(prepared);
      const result = await this.client.submitAndWait(signed.tx_blob);

      state.winner = winnerAddress;
      state.gameActive = false;

      console.log(`🏆 Winner declared: ${winnerAddress}`);
      console.log(`   Transaction: ${result.result.hash}`);

      return result.result.hash;
    } catch (error) {
      throw new Error(`Declare winner failed: ${error}`);
    }
  }

  async cancelGame(gameId: string): Promise<string> {
    try {
      await this.connect();

      const state = this.gameState.get(gameId);
      if (!state) {
        throw new Error('Game not found');
      }

      if (!state.escrowSequence) {
        throw new Error('No escrow found');
      }

      // Cancel escrow to return funds
      const escrowCancel: EscrowCancel = {
        TransactionType: 'EscrowCancel',
        Account: this.gameManager.address,
        Owner: state.players[0],
        OfferSequence: state.escrowSequence,
      };

      const prepared = await this.client.autofill(escrowCancel);
      const signed = this.gameManager.sign(prepared);
      const result = await this.client.submitAndWait(signed.tx_blob);

      this.gameState.delete(gameId);

      console.log(`✅ Game ${gameId} cancelled`);
      console.log(`   Transaction: ${result.result.hash}`);

      return result.result.hash;
    } catch (error) {
      throw new Error(`Cancel game failed: ${error}`);
    }
  }

  async getGameState(gameId: string): Promise<GameState | undefined> {
    return this.gameState.get(gameId);
  }

  async getPlayerCount(gameId: string): Promise<number> {
    const state = this.gameState.get(gameId);
    return state ? state.players.length : 0;
  }

  async isGameActive(gameId: string): Promise<boolean> {
    const state = this.gameState.get(gameId);
    return state ? state.gameActive : false;
  }

  async getWinner(gameId: string): Promise<string | undefined> {
    const state = this.gameState.get(gameId);
    return state?.winner;
  }
}

export default RippleEscrowContractClient;
