/**
 * Ethereum MetaMask Integration
 * 
 * Handles MetaMask browser extension wallet connection for Ethereum.
 * MetaMask is the most popular wallet for Ethereum.
 */

// MetaMask API types
interface MetaMaskWindow extends Window {
  ethereum?: {
    request(args: { method: string; params?: any[] }): Promise<any>;
    isMetaMask?: boolean;
    isConnected(): boolean;
    on(event: string, handler: (...args: any[]) => void): void;
    removeListener(event: string, handler: (...args: any[]) => void): void;
    selectedAddress?: string;
    chainId?: string;
  };
}

declare const window: MetaMaskWindow;

// Ethereum Network configurations
const ethNetworks = {
  mainnet: {
    chainId: '0x1', // 1 in hex
    chainName: 'Ethereum Mainnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://eth.llamarpc.com'],
    blockExplorerUrls: ['https://etherscan.io']
  },
  sepolia: {
    chainId: '0xAA36A7', // 11155111 in hex
    chainName: 'Sepolia Testnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://rpc.sepolia.org'],
    blockExplorerUrls: ['https://sepolia.etherscan.io']
  },
  goerli: {
    chainId: '0x5', // 5 in hex
    chainName: 'Goerli Testnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://rpc.ankr.com/eth_goerli'],
    blockExplorerUrls: ['https://goerli.etherscan.io']
  },
  holesky: {
    chainId: '0x4268', // 17000 in hex
    chainName: 'Holesky Testnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://rpc.holesky.ethpandaops.io'],
    blockExplorerUrls: ['https://holesky.etherscan.io']
  }
};

class MetaMaskConnect {
  private dispatch: any = null;
  private connectedAddress: string | null = null;
  private chainId: string | null = null;

  constructor() {
    this.messageType = {
      CONNECT: 'connect',
      DISCONNECT: 'disconnect',
      ACCOUNTS_CHANGED: 'accountsChanged',
      CHAIN_CHANGED: 'chainChanged'
    };
  }

  /**
   * Initialize MetaMask client
   */
  async initClient(modal: any, gtag: any, dispatch: any) {
    if (!this.dispatch) this.dispatch = dispatch;
    
    // Check if MetaMask is available
    if (!this.isAvailable()) {
      throw new Error('MetaMask extension not installed');
    }

    // Set up event handlers
    this.setHooks(modal, gtag, dispatch);

    return window.ethereum;
  }

  /**
   * Check if MetaMask is available
   */
  isAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.ethereum && !!window.ethereum.isMetaMask;
  }

  /**
   * Set up event handlers for MetaMask
   */
  setHooks(modal: any, gtag: any, dispatch: any) {
    if (!window.ethereum) return;

    // Handle account changes
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      if (accounts.length === 0) {
        this.connectedAddress = null;
      } else {
        this.connectedAddress = accounts[0];
      }
      dispatch('metamaskAccountsChanged', { accounts });
    });

    // Handle chain changes
    window.ethereum.on('chainChanged', (chainId: string) => {
      this.chainId = chainId;
      dispatch('metamaskChainChanged', { chainId });
    });
  }

  /**
   * Connect to MetaMask wallet
   */
  async connect() {
    if (!this.isAvailable()) {
      throw new Error('MetaMask extension not installed');
    }

    try {
      // Request account access
      const accounts = await window.ethereum!.request({
        method: 'eth_requestAccounts'
      });

      if (accounts && accounts.length > 0) {
        this.connectedAddress = accounts[0];
        
        // Get current chain ID
        this.chainId = await window.ethereum!.request({
          method: 'eth_chainId'
        });

        return {
          address: this.connectedAddress,
          chainId: this.chainId
        };
      }

      return null;
    } catch (error: any) {
      if (error.code === 4001) {
        // User rejected
        return null;
      }
      throw error;
    }
  }

  /**
   * Disconnect from MetaMask wallet
   */
  async disconnect() {
    // MetaMask doesn't have a disconnect method
    // Just clear our tracking
    this.connectedAddress = null;
    this.chainId = null;
  }

  /**
   * Get connected address
   */
  async getAddress(): Promise<string | null> {
    if (!this.isAvailable()) {
      return null;
    }

    try {
      const accounts = await window.ethereum!.request({
        method: 'eth_accounts'
      });

      if (accounts && accounts.length > 0) {
        this.connectedAddress = accounts[0];
        return this.connectedAddress;
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Get current chain ID
   */
  async getChainId(): Promise<string | null> {
    if (!this.isAvailable()) {
      return null;
    }

    try {
      this.chainId = await window.ethereum!.request({
        method: 'eth_chainId'
      });
      return this.chainId;
    } catch (error) {
      return null;
    }
  }

  /**
   * Switch to Ethereum network
   */
  async switchToETH(network: 'mainnet' | 'sepolia' | 'goerli' | 'holesky' = 'mainnet') {
    if (!this.isAvailable()) {
      throw new Error('MetaMask extension not installed');
    }

    const networkConfig = ethNetworks[network];

    try {
      // Try to switch to the network
      await window.ethereum!.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: networkConfig.chainId }]
      });
    } catch (error: any) {
      // If the network doesn't exist, add it
      if (error.code === 4902) {
        await window.ethereum!.request({
          method: 'wallet_addEthereumChain',
          params: [networkConfig]
        });
      } else {
        throw error;
      }
    }
  }

  /**
   * Sign a transaction
   */
  async signTransaction(transaction: any) {
    if (!this.isAvailable()) {
      throw new Error('MetaMask extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const txHash = await window.ethereum!.request({
        method: 'eth_sendTransaction',
        params: [transaction]
      });
      return txHash;
    } catch (error: any) {
      if (error.code === 4001) {
        // User rejected
        return null;
      }
      throw error;
    }
  }

  /**
   * Sign a message
   */
  async signMessage(message: string) {
    if (!this.isAvailable()) {
      throw new Error('MetaMask extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const signature = await window.ethereum!.request({
        method: 'personal_sign',
        params: [message, this.connectedAddress]
      });
      return signature;
    } catch (error: any) {
      if (error.code === 4001) {
        // User rejected
        return null;
      }
      throw error;
    }
  }

  /**
   * Sign typed data (EIP-712)
   */
  async signTypedData(typedData: any) {
    if (!this.isAvailable()) {
      throw new Error('MetaMask extension not installed');
    }

    if (!this.connectedAddress) {
      throw new Error('Wallet not connected');
    }

    try {
      const signature = await window.ethereum!.request({
        method: 'eth_signTypedData_v4',
        params: [this.connectedAddress, JSON.stringify(typedData)]
      });
      return signature;
    } catch (error: any) {
      if (error.code === 4001) {
        // User rejected
        return null;
      }
      throw error;
    }
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.connectedAddress !== null;
  }

  /**
   * Check if on Ethereum network
   */
  async isOnETH(): Promise<boolean> {
    const chainId = await this.getChainId();
    if (!chainId) return false;
    
    const chainIdNum = parseInt(chainId, 16);
    return chainIdNum === 1 || chainIdNum === 11155111 || chainIdNum === 5 || chainIdNum === 17000;
  }
}

export default new MetaMaskConnect();

