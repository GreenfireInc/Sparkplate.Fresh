/**
 * Tron (TRX) Smart Contract-based Reward System
 * On-chain rewards using Solidity smart contracts
 */

/**
 * TRON SMART CONTRACT (Solidity)
 * Deploy this contract to the TRON network (Mainnet/Shasta/Nile)
 * 
 * File: GameRewardContract.sol
 */

/*
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GameRewardContract {
    address public owner;
    uint256 public rewardAmount;
    uint256 public scoreThreshold;
    bool public contractPaused;
    
    uint256 public totalGamesPlayed;
    uint256 public totalRewardsDistributed;
    uint256 public totalRewardsAmount;
    
    struct GameSession {
        uint256 score;
        uint256 startBlock;
        bool isActive;
        bool rewardClaimed;
    }
    
    struct PlayerStats {
        uint256 totalGames;
        uint256 totalRewards;
        uint256 highestScore;
    }
    
    mapping(address => GameSession) public gameSessions;
    mapping(address => PlayerStats) public playerStats;
    
    event GameStarted(address indexed player, uint256 blockNumber);
    event ScoreUpdated(address indexed player, uint256 newScore);
    event RewardClaimed(address indexed player, uint256 amount, uint256 score);
    event GameEnded(address indexed player, uint256 finalScore, bool rewardClaimed);
    event RewardAmountUpdated(uint256 oldAmount, uint256 newAmount);
    event ScoreThresholdUpdated(uint256 oldThreshold, uint256 newThreshold);
    event ContractFunded(address indexed funder, uint256 amount);
    event ContractPaused(bool paused);
    event EmergencyWithdraw(address indexed recipient, uint256 amount);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier whenNotPaused() {
        require(!contractPaused, "Contract is paused");
        _;
    }
    
    modifier hasActiveGame() {
        require(gameSessions[msg.sender].isActive, "No active game session");
        _;
    }
    
    modifier noActiveGame() {
        require(!gameSessions[msg.sender].isActive, "Already have active game");
        _;
    }
    
    constructor(uint256 _rewardAmount, uint256 _scoreThreshold) {
        owner = msg.sender;
        rewardAmount = _rewardAmount;
        scoreThreshold = _scoreThreshold;
        contractPaused = false;
    }
    
    function startGame() external whenNotPaused noActiveGame {
        gameSessions[msg.sender] = GameSession({
            score: 0,
            startBlock: block.number,
            isActive: true,
            rewardClaimed: false
        });
        
        totalGamesPlayed++;
        playerStats[msg.sender].totalGames++;
        
        emit GameStarted(msg.sender, block.number);
    }
    
    function updateScore(uint256 _newScore) external whenNotPaused hasActiveGame {
        GameSession storage session = gameSessions[msg.sender];
        require(_newScore >= session.score, "Score can only increase");
        
        session.score = _newScore;
        
        if (_newScore > playerStats[msg.sender].highestScore) {
            playerStats[msg.sender].highestScore = _newScore;
        }
        
        emit ScoreUpdated(msg.sender, _newScore);
    }
    
    function claimReward() external whenNotPaused hasActiveGame {
        GameSession storage session = gameSessions[msg.sender];
        
        require(session.score >= scoreThreshold, "Score threshold not reached");
        require(!session.rewardClaimed, "Reward already claimed");
        require(address(this).balance >= rewardAmount, "Insufficient contract balance");
        
        session.rewardClaimed = true;
        session.isActive = false;
        
        playerStats[msg.sender].totalRewards += rewardAmount;
        totalRewardsDistributed++;
        totalRewardsAmount += rewardAmount;
        
        (bool success, ) = msg.sender.call{value: rewardAmount}("");
        require(success, "Transfer failed");
        
        emit RewardClaimed(msg.sender, rewardAmount, session.score);
    }
    
    function endGame() external hasActiveGame {
        GameSession storage session = gameSessions[msg.sender];
        session.isActive = false;
        
        emit GameEnded(msg.sender, session.score, session.rewardClaimed);
    }
    
    function setRewardAmount(uint256 _newAmount) external onlyOwner {
        uint256 oldAmount = rewardAmount;
        rewardAmount = _newAmount;
        emit RewardAmountUpdated(oldAmount, _newAmount);
    }
    
    function setScoreThreshold(uint256 _newThreshold) external onlyOwner {
        uint256 oldThreshold = scoreThreshold;
        scoreThreshold = _newThreshold;
        emit ScoreThresholdUpdated(oldThreshold, _newThreshold);
    }
    
    function pauseContract() external onlyOwner {
        contractPaused = true;
        emit ContractPaused(true);
    }
    
    function unpauseContract() external onlyOwner {
        contractPaused = false;
        emit ContractPaused(false);
    }
    
    function fundContract() external payable {
        emit ContractFunded(msg.sender, msg.value);
    }
    
    function emergencyWithdraw(address payable _recipient, uint256 _amount) external onlyOwner {
        require(address(this).balance >= _amount, "Insufficient balance");
        (bool success, ) = _recipient.call{value: _amount}("");
        require(success, "Withdrawal failed");
        emit EmergencyWithdraw(_recipient, _amount);
    }
    
    function getPlayerSession(address _player) external view returns (GameSession memory) {
        return gameSessions[_player];
    }
    
    function getPlayerStats(address _player) external view returns (PlayerStats memory) {
        return playerStats[_player];
    }
    
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
    
    receive() external payable {
        emit ContractFunded(msg.sender, msg.value);
    }
}
*/

/**
 * TYPESCRIPT CLIENT CODE
 */

import TronWeb from 'tronweb';

export interface ContractConfig {
  contractAddress: string;
  network: 'mainnet' | 'shasta' | 'nile';
  ownerPrivateKey?: string;
}

export interface GameSession {
  score: bigint;
  startBlock: bigint;
  isActive: boolean;
  rewardClaimed: boolean;
}

export interface PlayerStats {
  totalGames: bigint;
  totalRewards: bigint;
  highestScore: bigint;
}

export class TronSmartContractRewarder {
  private tronWeb: TronWeb;
  private contract: any;
  private contractAddress: string;

  constructor(config: ContractConfig) {
    this.contractAddress = config.contractAddress;

    const fullHost = this.getFullHost(config.network);

    this.tronWeb = new TronWeb({
      fullHost,
      privateKey: config.ownerPrivateKey || '0'.repeat(64),
    });
  }

  private getFullHost(network: 'mainnet' | 'shasta' | 'nile'): string {
    switch (network) {
      case 'mainnet':
        return 'https://api.trongrid.io';
      case 'shasta':
        return 'https://api.shasta.trongrid.io';
      case 'nile':
        return 'https://nile.trongrid.io';
    }
  }

  async initialize(): Promise<void> {
    this.contract = await this.tronWeb.contract().at(this.contractAddress);
  }

  async startGame(playerPrivateKey: string): Promise<string> {
    const playerTronWeb = new TronWeb({
      fullHost: this.tronWeb.fullHost,
      privateKey: playerPrivateKey,
    });

    const playerContract = await playerTronWeb.contract().at(this.contractAddress);

    const tx = await playerContract.startGame().send({
      feeLimit: 100_000_000,
    });

    console.log(`✅ Game started for player`);
    console.log(`   Transaction: ${tx}`);

    return tx;
  }

  async updateScore(playerPrivateKey: string, newScore: number): Promise<string> {
    const playerTronWeb = new TronWeb({
      fullHost: this.tronWeb.fullHost,
      privateKey: playerPrivateKey,
    });

    const playerContract = await playerTronWeb.contract().at(this.contractAddress);

    const tx = await playerContract.updateScore(newScore).send({
      feeLimit: 100_000_000,
    });

    console.log(`✅ Score updated to ${newScore}`);
    console.log(`   Transaction: ${tx}`);

    return tx;
  }

  async claimReward(playerPrivateKey: string): Promise<string> {
    const playerTronWeb = new TronWeb({
      fullHost: this.tronWeb.fullHost,
      privateKey: playerPrivateKey,
    });

    const playerContract = await playerTronWeb.contract().at(this.contractAddress);

    const tx = await playerContract.claimReward().send({
      feeLimit: 100_000_000,
    });

    console.log(`✅ Reward claimed!`);
    console.log(`   Transaction: ${tx}`);

    return tx;
  }

  async endGame(playerPrivateKey: string): Promise<string> {
    const playerTronWeb = new TronWeb({
      fullHost: this.tronWeb.fullHost,
      privateKey: playerPrivateKey,
    });

    const playerContract = await playerTronWeb.contract().at(this.contractAddress);

    const tx = await playerContract.endGame().send({
      feeLimit: 100_000_000,
    });

    console.log(`✅ Game ended`);
    console.log(`   Transaction: ${tx}`);

    return tx;
  }

  async getPlayerSession(playerAddress: string): Promise<GameSession> {
    const session = await this.contract.getPlayerSession(playerAddress).call();

    return {
      score: BigInt(session.score.toString()),
      startBlock: BigInt(session.startBlock.toString()),
      isActive: session.isActive,
      rewardClaimed: session.rewardClaimed,
    };
  }

  async getPlayerStats(playerAddress: string): Promise<PlayerStats> {
    const stats = await this.contract.getPlayerStats(playerAddress).call();

    return {
      totalGames: BigInt(stats.totalGames.toString()),
      totalRewards: BigInt(stats.totalRewards.toString()),
      highestScore: BigInt(stats.highestScore.toString()),
    };
  }

  async getContractBalance(): Promise<number> {
    const balance = await this.contract.getContractBalance().call();
    return this.tronWeb.fromSun(balance);
  }

  async getRewardAmount(): Promise<number> {
    const amount = await this.contract.rewardAmount().call();
    return this.tronWeb.fromSun(amount);
  }

  async getScoreThreshold(): Promise<number> {
    return await this.contract.scoreThreshold().call();
  }

  async setRewardAmount(newAmount: number, ownerPrivateKey: string): Promise<string> {
    const ownerTronWeb = new TronWeb({
      fullHost: this.tronWeb.fullHost,
      privateKey: ownerPrivateKey,
    });

    const ownerContract = await ownerTronWeb.contract().at(this.contractAddress);
    const amountSun = this.tronWeb.toSun(newAmount);

    const tx = await ownerContract.setRewardAmount(amountSun).send({
      feeLimit: 100_000_000,
    });

    console.log(`✅ Reward amount updated to ${newAmount} TRX`);
    console.log(`   Transaction: ${tx}`);

    return tx;
  }

  async setScoreThreshold(newThreshold: number, ownerPrivateKey: string): Promise<string> {
    const ownerTronWeb = new TronWeb({
      fullHost: this.tronWeb.fullHost,
      privateKey: ownerPrivateKey,
    });

    const ownerContract = await ownerTronWeb.contract().at(this.contractAddress);

    const tx = await ownerContract.setScoreThreshold(newThreshold).send({
      feeLimit: 100_000_000,
    });

    console.log(`✅ Score threshold updated to ${newThreshold}`);
    console.log(`   Transaction: ${tx}`);

    return tx;
  }

  async fundContract(amount: number, privateKey: string): Promise<string> {
    const senderTronWeb = new TronWeb({
      fullHost: this.tronWeb.fullHost,
      privateKey: privateKey,
    });

    const senderContract = await senderTronWeb.contract().at(this.contractAddress);
    const amountSun = this.tronWeb.toSun(amount);

    const tx = await senderContract.fundContract().send({
      feeLimit: 100_000_000,
      callValue: amountSun,
    });

    console.log(`✅ Contract funded with ${amount} TRX`);
    console.log(`   Transaction: ${tx}`);

    return tx;
  }

  async pauseContract(ownerPrivateKey: string): Promise<string> {
    const ownerTronWeb = new TronWeb({
      fullHost: this.tronWeb.fullHost,
      privateKey: ownerPrivateKey,
    });

    const ownerContract = await ownerTronWeb.contract().at(this.contractAddress);

    const tx = await ownerContract.pauseContract().send({
      feeLimit: 100_000_000,
    });

    console.log(`✅ Contract paused`);
    console.log(`   Transaction: ${tx}`);

    return tx;
  }

  async unpauseContract(ownerPrivateKey: string): Promise<string> {
    const ownerTronWeb = new TronWeb({
      fullHost: this.tronWeb.fullHost,
      privateKey: ownerPrivateKey,
    });

    const ownerContract = await ownerTronWeb.contract().at(this.contractAddress);

    const tx = await ownerContract.unpauseContract().send({
      feeLimit: 100_000_000,
    });

    console.log(`✅ Contract unpaused`);
    console.log(`   Transaction: ${tx}`);

    return tx;
  }

  async emergencyWithdraw(
    recipient: string,
    amount: number,
    ownerPrivateKey: string
  ): Promise<string> {
    const ownerTronWeb = new TronWeb({
      fullHost: this.tronWeb.fullHost,
      privateKey: ownerPrivateKey,
    });

    const ownerContract = await ownerTronWeb.contract().at(this.contractAddress);
    const amountSun = this.tronWeb.toSun(amount);

    const tx = await ownerContract.emergencyWithdraw(recipient, amountSun).send({
      feeLimit: 100_000_000,
    });

    console.log(`✅ Emergency withdrawal of ${amount} TRX to ${recipient}`);
    console.log(`   Transaction: ${tx}`);

    return tx;
  }
}

export default TronSmartContractRewarder;
