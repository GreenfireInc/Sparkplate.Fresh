/**
 * Ethereum Classic (ETC) Smart Contract Escrow System
 * Solidity-based escrow for multiplayer gaming on Ethereum Classic
 * "Code is Law" - Immutable smart contract logic
 */

import { ethers } from 'ethers';

export const ESCROW_CONTRACT_SOLIDITY = \`
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ETCGameEscrow {
    address public player1;
    address public player2;
    address public serverAddress;
    uint256 public betAmount;
    uint256 public totalPot;
    
    bool public player1Deposited;
    bool public player2Deposited;
    bool public gameStarted;
    bool public gameEnded;
    
    event PlayerDeposited(address indexed player, uint256 amount);
    event GameStarted(uint256 totalPot);
    event WinnerPaid(address indexed winner, uint256 amount);
    
    constructor(
        address _player1,
        address _player2,
        address _serverAddress,
        uint256 _betAmount
    ) {
        player1 = _player1;
        player2 = _player2;
        serverAddress = _serverAddress;
        betAmount = _betAmount;
    }
    
    function deposit() external payable {
        require(!gameEnded, "Game has ended");
        require(msg.sender == player1 || msg.sender == player2, "Not a player");
        require(msg.value == betAmount, "Incorrect bet amount");
        
        if (msg.sender == player1) {
            require(!player1Deposited, "Player 1 already deposited");
            player1Deposited = true;
        } else {
            require(!player2Deposited, "Player 2 already deposited");
            player2Deposited = true;
        }
        
        totalPot += msg.value;
        emit PlayerDeposited(msg.sender, msg.value);
        
        if (player1Deposited && player2Deposited && !gameStarted) {
            gameStarted = true;
            emit GameStarted(totalPot);
        }
    }
    
    function payoutWinner(address winner, bytes memory signature) external {
        require(gameStarted && !gameEnded, "Game not in progress");
        require(winner == player1 || winner == player2, "Invalid winner");
        
        bytes32 messageHash = keccak256(abi.encodePacked(winner, address(this)));
        bytes32 ethSignedHash = keccak256(abi.encodePacked("\\x19Ethereum Signed Message:\\n32", messageHash));
        address signer = recoverSigner(ethSignedHash, signature);
        
        require(signer == serverAddress, "Invalid signature");
        
        gameEnded = true;
        uint256 payout = totalPot;
        totalPot = 0;
        
        payable(winner).transfer(payout);
        emit WinnerPaid(winner, payout);
    }
    
    function refund() external {
        require(!gameStarted, "Game already started");
        require(msg.sender == player1 || msg.sender == player2, "Not a player");
        
        if (player1Deposited && msg.sender == player1) {
            player1Deposited = false;
            payable(player1).transfer(betAmount);
        }
        
        if (player2Deposited && msg.sender == player2) {
            player2Deposited = false;
            payable(player2).transfer(betAmount);
        }
    }
    
    function recoverSigner(bytes32 ethSignedHash, bytes memory signature) internal pure returns (address) {
        require(signature.length == 65, "Invalid signature length");
        bytes32 r; bytes32 s; uint8 v;
        assembly {
            r := mload(add(signature, 32))
            s := mload(add(signature, 64))
            v := byte(0, mload(add(signature, 96)))
        }
        return ecrecover(ethSignedHash, v, r, s);
    }
    
    function getGameState() external view returns (
        bool _player1Deposited,
        bool _player2Deposited,
        bool _gameStarted,
        bool _gameEnded,
        uint256 _totalPot
    ) {
        return (player1Deposited, player2Deposited, gameStarted, gameEnded, totalPot);
    }
}
\`;

export class EthereumClassicEscrowContractClient {
  private provider: ethers.JsonRpcProvider;
  private contract: ethers.Contract | null = null;
  private contractAddress: string;

  constructor(contractAddress: string, network: 'mainnet' | 'mordor' = 'mainnet') {
    this.contractAddress = contractAddress;
    const rpcUrl = network === 'mainnet' 
      ? 'https://etc.rivet.link'
      : 'https://rpc.mordor.etccooperative.org';
    
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
  }

  async initialize(): Promise<void> {
    const abi = [
      'function deposit() external payable',
      'function payoutWinner(address winner, bytes memory signature) external',
      'function refund() external',
      'function getGameState() external view returns (bool, bool, bool, bool, uint256)',
      'function betAmount() external view returns (uint256)',
      'function totalPot() external view returns (uint256)',
    ];

    this.contract = new ethers.Contract(this.contractAddress, abi, this.provider);
    console.log('Escrow contract initialized at:', this.contractAddress);
  }

  async depositToEscrow(playerPrivateKey: string, betAmountETC: string): Promise<string> {
    if (!this.contract) throw new Error('Contract not initialized');
    
    const wallet = new ethers.Wallet(playerPrivateKey, this.provider);
    const contractWithSigner = this.contract.connect(wallet);
    
    const betAmountWei = ethers.parseEther(betAmountETC);
    const tx = await contractWithSigner.deposit({ value: betAmountWei });
    console.log(\`Deposit transaction sent: \${tx.hash}\`);
    
    const receipt = await tx.wait();
    return receipt.hash;
  }

  async payoutWinner(serverPrivateKey: string, winnerAddress: string): Promise<string> {
    if (!this.contract) throw new Error('Contract not initialized');
    
    const serverWallet = new ethers.Wallet(serverPrivateKey, this.provider);
    
    const messageHash = ethers.solidityPackedKeccak256(
      ['address', 'address'],
      [winnerAddress, this.contractAddress]
    );
    const signature = await serverWallet.signMessage(ethers.getBytes(messageHash));
    
    const contractWithSigner = this.contract.connect(serverWallet);
    const tx = await contractWithSigner.payoutWinner(winnerAddress, signature);
    console.log(\`Payout transaction sent: \${tx.hash}\`);
    
    const receipt = await tx.wait();
    return receipt.hash;
  }

  async getEscrowBalance(): Promise<string> {
    if (!this.contract) throw new Error('Contract not initialized');
    const totalPot = await this.contract.totalPot();
    return ethers.formatEther(totalPot);
  }

  async getGameState(): Promise<{
    player1Deposited: boolean;
    player2Deposited: boolean;
    gameStarted: boolean;
    gameEnded: boolean;
    totalPot: string;
  }> {
    if (!this.contract) throw new Error('Contract not initialized');
    
    const state = await this.contract.getGameState();
    
    return {
      player1Deposited: state[0],
      player2Deposited: state[1],
      gameStarted: state[2],
      gameEnded: state[3],
      totalPot: ethers.formatEther(state[4]),
    };
  }
}

export default EthereumClassicEscrowContractClient;
