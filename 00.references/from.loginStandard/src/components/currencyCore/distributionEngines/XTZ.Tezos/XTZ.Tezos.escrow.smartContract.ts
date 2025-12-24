/**
 * Tezos (XTZ) Smart Contract-based Escrow System
 * On-chain escrow for multiplayer games using Michelson smart contracts
 */

/**
 * TEZOS SMART CONTRACT (Michelson/SmartPy/LIGO)
 * Deploy this contract to the Tezos network (Mainnet/Testnet)
 * 
 * File: game_escrow_contract.py (SmartPy)
 */

/*
import smartpy as sp

class GameEscrowContract(sp.Contract):
    def __init__(self, owner, buy_in_amount, required_players):
        self.init(
            owner = owner,
            buy_in_amount = buy_in_amount,
            required_players = required_players,
            game_active = False,
            player_count = 0,
            total_pot = sp.mutez(0),
            winner = sp.none,
            players = sp.set(t=sp.TAddress)
        )
    
    @sp.entry_point
    def join_game(self):
        sp.verify(~self.data.game_active, "Game already started")
        sp.verify(~self.data.players.contains(sp.sender), "Player already joined")
        sp.verify(self.data.player_count < self.data.required_players, "Game is full")
        sp.verify(sp.amount >= self.data.buy_in_amount, "Insufficient buy-in amount")
        
        self.data.players.add(sp.sender)
        self.data.player_count += 1
        self.data.total_pot += sp.amount
        
        # Start game if all players joined
        sp.if self.data.player_count == self.data.required_players:
            self.data.game_active = True
    
    @sp.entry_point
    def declare_winner(self, winner):
        sp.set_type(winner, sp.TAddress)
        sp.verify(sp.sender == self.data.owner, "Only owner can declare winner")
        sp.verify(self.data.game_active, "Game not started")
        sp.verify(self.data.players.contains(winner), "Winner not in game")
        sp.verify(~self.data.winner.is_some(), "Winner already declared")
        
        self.data.winner = sp.some(winner)
        self.data.game_active = False
        
        # Send pot to winner
        sp.send(winner, self.data.total_pot)
    
    @sp.entry_point
    def reset_game(self):
        sp.verify(sp.sender == self.data.owner, "Only owner can reset")
        
        self.data.game_active = False
        self.data.player_count = 0
        self.data.total_pot = sp.mutez(0)
        self.data.winner = sp.none
        self.data.players = sp.set(t=sp.TAddress)

@sp.add_test(name="GameEscrowContract")
def test():
    alice = sp.test_account("Alice")
    bob = sp.test_account("Bob")
    charlie = sp.test_account("Charlie")
    
    c = GameEscrowContract(
        owner=alice.address,
        buy_in_amount=sp.tez(10),
        required_players=2
    )
    
    scenario = sp.test_scenario()
    scenario += c
*/

/**
 * TYPESCRIPT CLIENT CODE
 */

import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';

export interface ContractConfig {
  contractAddress: string;
  network: 'mainnet' | 'testnet';
}

export interface GameState {
  gameActive: boolean;
  playerCount: number;
  requiredPlayers: number;
  totalPot: number;
  winner?: string;
}

export class TezosEscrowContractClient {
  private tezos: TezosToolkit;
  private contractAddress: string;
  private network: 'mainnet' | 'testnet';

  constructor(config: ContractConfig) {
    this.contractAddress = config.contractAddress;
    this.network = config.network;

    const rpcUrl = this.getRpcUrl(config.network);
    this.tezos = new TezosToolkit(rpcUrl);
  }

  private getRpcUrl(network: 'mainnet' | 'testnet'): string {
    switch (network) {
      case 'mainnet':
        return 'https://mainnet.api.tez.ie';
      case 'testnet':
        return 'https://ghostnet.ecadinfra.com';
    }
  }

  async joinGame(playerPrivateKey: string, buyInTez: number): Promise<string> {
    try {
      this.tezos.setProvider({
        signer: new InMemorySigner(playerPrivateKey),
      });

      const contract = await this.tezos.contract.at(this.contractAddress);
      const operation = await contract.methods.join_game().send({ amount: buyInTez });

      await operation.confirmation();

      console.log(`✅ Player joined game`);
      console.log(`   Transaction: ${operation.hash}`);

      return operation.hash;
    } catch (error) {
      throw new Error(`Join game failed: ${error}`);
    }
  }

  async declareWinner(ownerPrivateKey: string, winnerAddress: string): Promise<string> {
    try {
      this.tezos.setProvider({
        signer: new InMemorySigner(ownerPrivateKey),
      });

      const contract = await this.tezos.contract.at(this.contractAddress);
      const operation = await contract.methods.declare_winner(winnerAddress).send();

      await operation.confirmation();

      console.log(`🏆 Winner declared: ${winnerAddress}`);
      console.log(`   Transaction: ${operation.hash}`);

      return operation.hash;
    } catch (error) {
      throw new Error(`Declare winner failed: ${error}`);
    }
  }

  async resetGame(ownerPrivateKey: string): Promise<string> {
    try {
      this.tezos.setProvider({
        signer: new InMemorySigner(ownerPrivateKey),
      });

      const contract = await this.tezos.contract.at(this.contractAddress);
      const operation = await contract.methods.reset_game().send();

      await operation.confirmation();

      console.log(`✅ Game reset`);
      console.log(`   Transaction: ${operation.hash}`);

      return operation.hash;
    } catch (error) {
      throw new Error(`Reset game failed: ${error}`);
    }
  }

  async getGameState(): Promise<GameState> {
    try {
      const contract = await this.tezos.contract.at(this.contractAddress);
      const storage: any = await contract.storage();

      return {
        gameActive: storage.game_active,
        playerCount: storage.player_count.toNumber(),
        requiredPlayers: storage.required_players.toNumber(),
        totalPot: storage.total_pot.toNumber() / 1000000,
        winner: storage.winner,
      };
    } catch (error) {
      throw new Error(`Failed to get game state: ${error}`);
    }
  }

  async getPlayerCount(): Promise<number> {
    const state = await this.getGameState();
    return state.playerCount;
  }

  async isGameActive(): Promise<boolean> {
    const state = await this.getGameState();
    return state.gameActive;
  }

  async getWinner(): Promise<string | undefined> {
    const state = await this.getGameState();
    return state.winner;
  }

  async getTotalPot(): Promise<number> {
    const state = await this.getGameState();
    return state.totalPot;
  }
}

export default TezosEscrowContractClient;
