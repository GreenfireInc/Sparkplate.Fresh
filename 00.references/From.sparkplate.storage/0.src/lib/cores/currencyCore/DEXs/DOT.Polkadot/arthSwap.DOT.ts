// ArthSwap DEX Information
// One-stop DeFi protocol on Astar Network
// Source: Research compiled from Oct14.Research.Cryptocurrency.DOT.Polkadot

export const arthSwapDEX = {
  name: "ArthSwap",
  blockchain: "Astar (Polkadot)",
  type: "AMM DEX",
  description: "One-stop DeFi protocol on Astar Network. ArthSwap is a comprehensive DeFi protocol on Astar Network (Polkadot's smart contract parachain) offering swaps, liquidity provision, and yield farming.",
  
  urls: {
    main: "https://app.arthswap.org/",
    app: "https://app.arthswap.org/#/swap",
    docs: "https://docs.arthswap.org/",
    developerDocs: "https://docs.arthswap.org/developers",
    guide: "https://docs.arthswap.org/guide",
  },
  
  api: {
    endpoints: {
      astarRpc: "https://evm.astar.network",
      subgraph: "https://api.subquery.network/sq/arthswap",
      baseUrl: "https://api.arthswap.org",
    },
    documentation: "https://docs.arthswap.org/",
    rateLimit: "Public endpoints available",
    requiresApiKey: false,
  },
  
  contracts: {
    astar: {
      router: "Check ArthSwap docs for current addresses",
      factory: "Check ArthSwap docs for current addresses",
    },
  },
  
  tokens: {
    ASTR: {
      symbol: "ASTR",
      name: "Astar",
      isNative: true,
      decimals: 18,
    },
    xcDOT: {
      address: "Check ArthSwap docs for current address",
      symbol: "xcDOT",
      name: "Cross-chain DOT",
      decimals: 10,
    },
    USDT: {
      address: "Check ArthSwap docs for current address",
      symbol: "USDT",
      decimals: 6,
    },
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "@arthswap/sdk",
          package: "@arthswap/sdk",
          description: "Official ArthSwap SDK for EVM integration",
          installCommand: "npm install @arthswap/sdk",
          github: "https://github.com/ArthSwap",
        },
        {
          name: "ethers.js",
          package: "ethers",
          description: "Ethereum library for smart contract interaction",
          installCommand: "npm install ethers",
        },
      ],
      documentation: "https://docs.arthswap.org/developers",
    },
  },
  
  integration: {
    evmExample: `
import { ethers } from 'ethers';

// Astar EVM endpoint
const ASTAR_RPC = 'https://evm.astar.network';

async function connectToArthSwap() {
  const provider = new ethers.providers.JsonRpcProvider(ASTAR_RPC);

  // ArthSwap contract addresses (example)
  const ARTHSWAP_ROUTER = '0x...'; // Replace with actual address
  const ARTHSWAP_FACTORY = '0x...'; // Replace with actual address

  // Get pair address
  const factoryAbi = [
    'function getPair(address tokenA, address tokenB) view returns (address pair)'
  ];

  const factory = new ethers.Contract(ARTHSWAP_FACTORY, factoryAbi, provider);

  const dotAddress = '0x...'; // xcDOT address on Astar
  const usdtAddress = '0x...'; // USDT address on Astar

  const pairAddress = await factory.getPair(dotAddress, usdtAddress);
  console.log('DOT/USDT Pair:', pairAddress);

  return { provider, factory };
}
    `,
    
    swapExample: `
import { ethers } from 'ethers';

async function executeSwap() {
  const provider = new ethers.providers.JsonRpcProvider('https://evm.astar.network');
  const signer = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);

  const routerAbi = [
    'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)'
  ];

  const routerAddress = '0x...'; // Replace with actual ArthSwap router
  const router = new ethers.Contract(routerAddress, routerAbi, signer);

  const DOT = '0x...'; // xcDOT on Astar
  const USDT = '0x...'; // USDT on Astar

  // Approve tokens first
  const erc20Abi = [
    'function approve(address spender, uint256 amount) returns (bool)'
  ];

  const dotContract = new ethers.Contract(DOT, erc20Abi, signer);
  await dotContract.approve(routerAddress, ethers.utils.parseEther('1'));

  // Execute swap
  const path = [DOT, USDT];
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes

  const tx = await router.swapExactTokensForTokens(
    ethers.utils.parseEther('1'), // 1 DOT
    0, // amountOutMin (set to 0 for example)
    path,
    signer.address,
    deadline
  );

  console.log('Swap Transaction:', tx.hash);
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/ArthSwap",
    telegram: "https://t.me/ArthSwap",
    discord: "https://discord.gg/arthswap",
    github: "https://github.com/ArthSwap",
    medium: "https://medium.com/arthswap",
  },
  
  features: {
    hasApi: true,
    hasSdk: true,
    hasSubgraph: true,
    isActive: true,
    supportsCrossChain: true,
    hasLiquidityMining: true,
    isEvmCompatible: true, // Astar is EVM-compatible
    supportsYieldFarming: true,
    hasCrossChainAssets: true,
  },
  
  notes: [
    "ArthSwap runs on Astar, an EVM-compatible Polkadot parachain",
    "Supports cross-chain assets from Polkadot via XCM",
    "Full EVM compatibility allows using standard Ethereum tools",
    "Integrated yield farming and liquidity mining programs",
  ],
};
