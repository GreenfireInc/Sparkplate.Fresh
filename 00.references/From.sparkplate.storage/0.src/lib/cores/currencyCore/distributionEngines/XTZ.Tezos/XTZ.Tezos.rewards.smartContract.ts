/**
 * Tezos (XTZ) Smart Contract-based Reward System
 * On-chain rewards using Michelson smart contracts
 */

/**
 * TEZOS SMART CONTRACT (Michelson/SmartPy/LIGO)
 * Deploy this contract to the Tezos network (Mainnet/Testnet)
 * 
 * File: game_reward_contract.py (SmartPy)
 */

/*
import smartpy as sp

class GameRewardContract(sp.Contract):
    def __init__(self, owner, reward_amount, score_threshold):
        self.init(
            owner = owner,
            reward_amount = reward_amount,
            score_threshold = score_threshold,
            contract_active = True,
            players = sp.big_map(tkey=sp.TAddress, tvalue=sp.TRecord(
                registered=sp.TBool,
                score=sp.TInt,
                rewarded=sp.TBool
            ))
        )
    
    @sp.entry_point
    def register_player(self):
        sp.verify(self.data.contract_active, "Contract is not active")
        sp.verify(~self.data.players.contains(sp.sender), "Player already registered")
        
        self.data.players[sp.sender] = sp.record(
            registered=True,
            score=0,
            rewarded=False
        )
    
    @sp.entry_point
    def update_score(self, new_score):
        sp.set_type(new_score, sp.TInt)
        sp.verify(self.data.contract_active, "Contract is not active")
        sp.verify(self.data.players.contains(sp.sender), "Player not registered")
        
        player = self.data.players[sp.sender]
        sp.verify(new_score >= player.score, "Score can only increase")
        
        self.data.players[sp.sender].score = new_score
    
    @sp.entry_point
    def claim_reward(self):
        sp.verify(self.data.contract_active, "Contract is not active")
        sp.verify(self.data.players.contains(sp.sender), "Player not registered")
        
        player = self.data.players[sp.sender]
        sp.verify(player.score >= self.data.score_threshold, "Score threshold not met")
        sp.verify(~player.rewarded, "Reward already claimed")
        sp.verify(sp.balance >= self.data.reward_amount, "Insufficient contract balance")
        
        self.data.players[sp.sender].rewarded = True
        sp.send(sp.sender, self.data.reward_amount)
    
    @sp.entry_point
    def set_reward_amount(self, new_amount):
        sp.set_type(new_amount, sp.TMutez)
        sp.verify(sp.sender == self.data.owner, "Only owner can change reward amount")
        self.data.reward_amount = new_amount
    
    @sp.entry_point
    def set_score_threshold(self, new_threshold):
        sp.set_type(new_threshold, sp.TInt)
        sp.verify(sp.sender == self.data.owner, "Only owner can change threshold")
        self.data.score_threshold = new_threshold
    
    @sp.entry_point
    def set_active(self, active):
        sp.set_type(active, sp.TBool)
        sp.verify(sp.sender == self.data.owner, "Only owner can change status")
        self.data.contract_active = active
    
    @sp.entry_point
    def fund_contract(self):
        pass  # Accept tez
    
    @sp.entry_point
    def withdraw(self, amount):
        sp.set_type(amount, sp.TMutez)
        sp.verify(sp.sender == self.data.owner, "Only owner can withdraw")
        sp.send(self.data.owner, amount)

@sp.add_test(name="GameRewardContract")
def test():
    alice = sp.test_account("Alice")
    bob = sp.test_account("Bob")
    
    c = GameRewardContract(
        owner=alice.address,
        reward_amount=sp.tez(10),
        score_threshold=10000
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

export interface PlayerData {
  registered: boolean;
  score: number;
  rewarded: boolean;
}

export class TezosSmartContractRewarder {
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

  async registerPlayer(playerPrivateKey: string): Promise<string> {
    try {
      this.tezos.setProvider({
        signer: new InMemorySigner(playerPrivateKey),
      });

      const contract = await this.tezos.contract.at(this.contractAddress);
      const operation = await contract.methods.register_player().send();

      await operation.confirmation();

      console.log(`✅ Player registered`);
      console.log(`   Transaction: ${operation.hash}`);

      return operation.hash;
    } catch (error) {
      throw new Error(`Registration failed: ${error}`);
    }
  }

  async updateScore(playerPrivateKey: string, newScore: number): Promise<string> {
    try {
      this.tezos.setProvider({
        signer: new InMemorySigner(playerPrivateKey),
      });

      const contract = await this.tezos.contract.at(this.contractAddress);
      const operation = await contract.methods.update_score(newScore).send();

      await operation.confirmation();

      console.log(`✅ Score updated to ${newScore}`);
      console.log(`   Transaction: ${operation.hash}`);

      return operation.hash;
    } catch (error) {
      throw new Error(`Score update failed: ${error}`);
    }
  }

  async claimReward(playerPrivateKey: string): Promise<string> {
    try {
      this.tezos.setProvider({
        signer: new InMemorySigner(playerPrivateKey),
      });

      const contract = await this.tezos.contract.at(this.contractAddress);
      const operation = await contract.methods.claim_reward().send();

      await operation.confirmation();

      console.log(`✅ Reward claimed!`);
      console.log(`   Transaction: ${operation.hash}`);

      return operation.hash;
    } catch (error) {
      throw new Error(`Reward claim failed: ${error}`);
    }
  }

  async getPlayerData(playerAddress: string): Promise<PlayerData> {
    try {
      const contract = await this.tezos.contract.at(this.contractAddress);
      const storage: any = await contract.storage();

      const playerData = await storage.players.get(playerAddress);

      if (!playerData) {
        return {
          registered: false,
          score: 0,
          rewarded: false,
        };
      }

      return {
        registered: playerData.registered,
        score: playerData.score.toNumber(),
        rewarded: playerData.rewarded,
      };
    } catch (error) {
      throw new Error(`Failed to get player data: ${error}`);
    }
  }

  async setRewardAmount(ownerPrivateKey: string, newAmountTez: number): Promise<string> {
    try {
      this.tezos.setProvider({
        signer: new InMemorySigner(ownerPrivateKey),
      });

      const contract = await this.tezos.contract.at(this.contractAddress);
      const amountMutez = newAmountTez * 1000000;
      const operation = await contract.methods.set_reward_amount(amountMutez).send();

      await operation.confirmation();

      console.log(`✅ Reward amount updated to ${newAmountTez} XTZ`);
      console.log(`   Transaction: ${operation.hash}`);

      return operation.hash;
    } catch (error) {
      throw new Error(`Set reward amount failed: ${error}`);
    }
  }

  async setScoreThreshold(ownerPrivateKey: string, newThreshold: number): Promise<string> {
    try {
      this.tezos.setProvider({
        signer: new InMemorySigner(ownerPrivateKey),
      });

      const contract = await this.tezos.contract.at(this.contractAddress);
      const operation = await contract.methods.set_score_threshold(newThreshold).send();

      await operation.confirmation();

      console.log(`✅ Score threshold updated to ${newThreshold}`);
      console.log(`   Transaction: ${operation.hash}`);

      return operation.hash;
    } catch (error) {
      throw new Error(`Set score threshold failed: ${error}`);
    }
  }

  async setActive(ownerPrivateKey: string, active: boolean): Promise<string> {
    try {
      this.tezos.setProvider({
        signer: new InMemorySigner(ownerPrivateKey),
      });

      const contract = await this.tezos.contract.at(this.contractAddress);
      const operation = await contract.methods.set_active(active).send();

      await operation.confirmation();

      console.log(`✅ Contract ${active ? 'activated' : 'deactivated'}`);
      console.log(`   Transaction: ${operation.hash}`);

      return operation.hash;
    } catch (error) {
      throw new Error(`Set active failed: ${error}`);
    }
  }

  async fundContract(privateKey: string, amountTez: number): Promise<string> {
    try {
      this.tezos.setProvider({
        signer: new InMemorySigner(privateKey),
      });

      const contract = await this.tezos.contract.at(this.contractAddress);
      const operation = await contract.methods.fund_contract().send({ amount: amountTez });

      await operation.confirmation();

      console.log(`✅ Contract funded with ${amountTez} XTZ`);
      console.log(`   Transaction: ${operation.hash}`);

      return operation.hash;
    } catch (error) {
      throw new Error(`Fund contract failed: ${error}`);
    }
  }

  async withdraw(ownerPrivateKey: string, amountTez: number): Promise<string> {
    try {
      this.tezos.setProvider({
        signer: new InMemorySigner(ownerPrivateKey),
      });

      const contract = await this.tezos.contract.at(this.contractAddress);
      const amountMutez = amountTez * 1000000;
      const operation = await contract.methods.withdraw(amountMutez).send();

      await operation.confirmation();

      console.log(`✅ Withdrawn ${amountTez} XTZ from contract`);
      console.log(`   Transaction: ${operation.hash}`);

      return operation.hash;
    } catch (error) {
      throw new Error(`Withdraw failed: ${error}`);
    }
  }
}

export default TezosSmartContractRewarder;
