/**
 * Tron (TRX) Smart Contract-based Escrow System
 * On-chain escrow for multiplayer games
 */

/**
 * TRON SMART CONTRACT (Solidity)
 * Deploy this contract to the TRON network (Mainnet/Shasta/Nile)
 * 
 * File: GamePot.sol
 */

/*
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GamePot {
    address public owner;
    uint256 public buyInAmount;
    uint256 public requiredPlayers;
    bool public gameStarted;
    bool public gameEnded;

    struct Player {
        address addr;
        bool deposited;
    }

    mapping(address => Player) public players;
    address[] public playerList;
    address public winner;

    event PlayerJoined(address indexed player);
    event GameStarted(uint256 totalPot, uint256 playersCount);
    event GameEnded(address indexed winner, uint256 reward);
    event FundsWithdrawn(address indexed owner, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    modifier onlyBeforeStart() {
        require(!gameStarted, "Game already started");
        _;
    }

    modifier onlyAfterEnd() {
        require(gameEnded, "Game not ended");
        _;
    }

    constructor(uint256 _buyInTRX, uint256 _requiredPlayers) {
        owner = msg.sender;
        buyInAmount = _buyInTRX * 1_000_000;
        requiredPlayers = _requiredPlayers;
        gameStarted = false;
        gameEnded = false;
    }

    function joinGame() external payable onlyBeforeStart {
        require(msg.value == buyInAmount, "Incorrect deposit amount");
        require(!players[msg.sender].deposited, "Already joined");

        players[msg.sender] = Player({addr: msg.sender, deposited: true});
        playerList.push(msg.sender);

        emit PlayerJoined(msg.sender);

        if (playerList.length == requiredPlayers) {
            gameStarted = true;
            emit GameStarted(address(this).balance, playerList.length);
        }
    }

    function declareWinner(address _winner) external onlyOwner {
        require(gameStarted, "Game not started");
        require(!gameEnded, "Game already ended");
        require(players[_winner].deposited, "Winner not a player");

        winner = _winner;
        gameEnded = true;

        uint256 reward = address(this).balance;

        (bool success, ) = winner.call{value: reward}("");
        require(success, "Reward transfer failed");

        emit GameEnded(winner, reward);
    }

    function withdrawFunds(uint256 amount) external onlyOwner onlyAfterEnd {
        require(address(this).balance >= amount, "Insufficient balance");
        (bool success, ) = owner.call{value: amount}("");
        require(success, "Withdraw failed");
        emit FundsWithdrawn(owner, amount);
    }

    function getPlayer(address _player) external view returns (Player memory) {
        return players[_player];
    }

    function getPlayerCount() external view returns (uint256) {
        return playerList.length;
    }

    function getPlayerList() external view returns (address[] memory) {
        return playerList;
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    receive() external payable {}
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

export interface Player {
  addr: string;
  deposited: boolean;
}

export class TronEscrowContractClient {
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

  async joinGame(playerPrivateKey: string, buyInTrx: number): Promise<string> {
    const playerTronWeb = new TronWeb({
      fullHost: this.tronWeb.fullHost,
      privateKey: playerPrivateKey,
    });

    const playerContract = await playerTronWeb.contract().at(this.contractAddress);
    const buyInSun = this.tronWeb.toSun(buyInTrx);

    const tx = await playerContract.joinGame().send({
      feeLimit: 100_000_000,
      callValue: buyInSun,
    });

    console.log(`✅ Player joined game`);
    console.log(`   Transaction: ${tx}`);

    return tx;
  }

  async declareWinner(winnerAddress: string, ownerPrivateKey: string): Promise<string> {
    const ownerTronWeb = new TronWeb({
      fullHost: this.tronWeb.fullHost,
      privateKey: ownerPrivateKey,
    });

    const ownerContract = await ownerTronWeb.contract().at(this.contractAddress);

    const tx = await ownerContract.declareWinner(winnerAddress).send({
      feeLimit: 100_000_000,
    });

    console.log(`🏆 Winner declared: ${winnerAddress}`);
    console.log(`   Transaction: ${tx}`);

    return tx;
  }

  async withdrawFunds(amount: number, ownerPrivateKey: string): Promise<string> {
    const ownerTronWeb = new TronWeb({
      fullHost: this.tronWeb.fullHost,
      privateKey: ownerPrivateKey,
    });

    const ownerContract = await ownerTronWeb.contract().at(this.contractAddress);
    const amountSun = this.tronWeb.toSun(amount);

    const tx = await ownerContract.withdrawFunds(amountSun).send({
      feeLimit: 100_000_000,
    });

    console.log(`💰 Funds withdrawn: ${amount} TRX`);
    console.log(`   Transaction: ${tx}`);

    return tx;
  }

  async getPlayer(playerAddress: string): Promise<Player> {
    const player = await this.contract.getPlayer(playerAddress).call();

    return {
      addr: player.addr,
      deposited: player.deposited,
    };
  }

  async getPlayerCount(): Promise<number> {
    const count = await this.contract.getPlayerCount().call();
    return Number(count);
  }

  async getPlayerList(): Promise<string[]> {
    return await this.contract.getPlayerList().call();
  }

  async getContractBalance(): Promise<number> {
    const balance = await this.contract.getContractBalance().call();
    return this.tronWeb.fromSun(balance);
  }

  async getBuyInAmount(): Promise<number> {
    const amount = await this.contract.buyInAmount().call();
    return this.tronWeb.fromSun(amount);
  }

  async getRequiredPlayers(): Promise<number> {
    return await this.contract.requiredPlayers().call();
  }

  async isGameStarted(): Promise<boolean> {
    return await this.contract.gameStarted().call();
  }

  async isGameEnded(): Promise<boolean> {
    return await this.contract.gameEnded().call();
  }

  async getWinner(): Promise<string | null> {
    const winner = await this.contract.winner().call();
    return winner === this.tronWeb.address.toHex('T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb') ? null : winner;
  }

  async getOwner(): Promise<string> {
    return await this.contract.owner().call();
  }
}

export default TronEscrowContractClient;
