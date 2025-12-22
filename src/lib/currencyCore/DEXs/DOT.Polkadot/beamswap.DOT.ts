// Beamswap DEX Information
// Decentralized exchange on Moonbeam
// Source: Research compiled from Oct14.Research.Cryptocurrency.DOT.Polkadot

export const beamswapDEX = {
  name: "Beamswap",
  blockchain: "Moonbeam (Polkadot)",
  type: "AMM DEX",
  description: "Decentralized exchange on Moonbeam. Beamswap is a comprehensive DEX on Moonbeam (Polkadot's EVM parachain) offering swaps, liquidity provision, yield farming, and cross-chain asset support.",
  
  urls: {
    main: "https://beamswap.io/",
    app: "https://beamswap.io/exchange/swap",
    docs: "https://docs.beamswap.io/",
    developerDocs: "https://docs.beamswap.io/developers",
    guide: "https://docs.beamswap.io/guide",
  },
  
  api: {
    endpoints: {
      moonbeamRpc: "https://rpc.api.moonbeam.network",
      subgraph: "https://api.subquery.network/sq/beamswap",
      baseUrl: "https://api.beamswap.io",
    },
    documentation: "https://docs.beamswap.io/",
    rateLimit: "Public endpoints available",
    requiresApiKey: false,
  },
  
  contracts: {
    moonbeam: {
      router: "Check Beamswap docs for current addresses",
      factory: "Check Beamswap docs for current addresses",
    },
  },
  
  tokens: {
    GLMR: {
      address: "0x0000000000000000000000000000000000000802",
      symbol: "GLMR",
      name: "Moonbeam",
      isNative: true,
      decimals: 18,
    },
    xcDOT: {
      address: "0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080",
      symbol: "xcDOT",
      name: "Cross-chain DOT",
      decimals: 10,
    },
    USDC: {
      address: "0x931715FEE2d06333043d11F658C8CE934aC61D0c",
      symbol: "USDC",
      decimals: 6,
    },
    xcUSDT: {
      address: "0xFFFFFFfFea09FB06d082fd1275CD48b191cbCD1d",
      symbol: "xcUSDT",
      decimals: 6,
    },
    xcUSDC: {
      address: "0xFFfffffF7D2B0B761Af01Ca8Ee22b74E2a521041",
      symbol: "xcUSDC",
      decimals: 6,
    },
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "@beamswap/sdk",
          package: "@beamswap/sdk",
          description: "Official Beamswap SDK for EVM integration",
          installCommand: "npm install @beamswap/sdk",
          github: "https://github.com/beamswap",
        },
        {
          name: "ethers.js",
          package: "ethers",
          description: "Ethereum library for smart contract interaction",
          installCommand: "npm install ethers",
        },
      ],
      documentation: "https://docs.beamswap.io/developers",
    },
  },
  
  integration: {
    evmExample: `
import { ethers } from 'ethers';

// Moonbeam EVM endpoint
const MOONBEAM_RPC = 'https://rpc.api.moonbeam.network';

async function connectToBeamswap() {
  const provider = new ethers.providers.JsonRpcProvider(MOONBEAM_RPC);

  // Beamswap contract addresses (example - replace with actual)
  const BEAMSWAP_ROUTER = '0x...'; // Beamswap router address
  const BEAMSWAP_FACTORY = '0x...'; // Beamswap factory address

  // Get pair information
  const factoryAbi = [
    'function getPair(address tokenA, address tokenB) view returns (address pair)'
  ];

  const factory = new ethers.Contract(BEAMSWAP_FACTORY, factoryAbi, provider);

  const dotAddress = '0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080'; // xcDOT on Moonbeam
  const usdcAddress = '0x931715FEE2d06333043d11F658C8CE934aC61D0c'; // USDC on Moonbeam

  const pairAddress = await factory.getPair(dotAddress, usdcAddress);
  console.log('DOT/USDC Pair on Beamswap:', pairAddress);

  return { provider, factory };
}
    `,
    
    swapExample: `
import { ethers } from 'ethers';

async function getBeamswapQuote() {
  const provider = new ethers.providers.JsonRpcProvider('https://rpc.api.moonbeam.network');

  const routerAbi = [
    'function getAmountsOut(uint amountIn, address[] memory path) view returns (uint[] memory amounts)',
    'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)'
  ];

  const routerAddress = '0x...'; // Replace with actual Beamswap router
  const router = new ethers.Contract(routerAddress, routerAbi, provider);

  // Token addresses on Moonbeam
  const DOT = '0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080'; // xcDOT
  const GLMR = '0x0000000000000000000000000000000000000802'; // GLMR (native)

  // Get price quote
  const path = [DOT, GLMR];
  const amounts = await router.getAmountsOut(
    ethers.utils.parseEther('1'), // 1 DOT
    path
  );

  console.log('Expected GLMR output:', ethers.utils.formatEther(amounts[1]));

  return amounts;
}
    `,
    
    crossChainAssetsExample: `
import { ethers } from 'ethers';

async function handleMoonbeamAssets() {
  const provider = new ethers.providers.JsonRpcProvider('https://rpc.api.moonbeam.network');

  const erc20Abi = [
    'function balanceOf(address account) view returns (uint256)',
    'function symbol() view returns (string)',
    'function name() view returns (string)'
  ];

  // Check various cross-chain assets
  const assets = [
    {
      symbol: 'xcDOT',
      address: '0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080',
      decimals: 10
    },
    {
      symbol: 'xcUSDT',
      address: '0xFFFFFFfFea09FB06d082fd1275CD48b191cbCD1d',
      decimals: 6
    },
    {
      symbol: 'xcUSDC',
      address: '0xFFfffffF7D2B0B761Af01Ca8Ee22b74E2a521041',
      decimals: 6
    }
  ];

  const walletAddress = 'YOUR_ADDRESS';

  for (const asset of assets) {
    const contract = new ethers.Contract(asset.address, erc20Abi, provider);
    const balance = await contract.balanceOf(walletAddress);
    const symbol = await contract.symbol();

    console.log(
      \`\${symbol} Balance: \${ethers.utils.formatUnits(balance, asset.decimals)}\`
    );
  }
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/beamswapio",
    telegram: "https://t.me/beamswap",
    discord: "https://discord.gg/beamswap",
    github: "https://github.com/beamswap",
    medium: "https://medium.com/beamswap",
  },
  
  features: {
    hasApi: true,
    hasSdk: true,
    hasSubgraph: true,
    isActive: true,
    supportsCrossChain: true,
    hasLiquidityMining: true,
    isEvmCompatible: true, // Moonbeam is EVM-compatible
    hasYieldFarming: true,
    supportsXcmAssets: true, // Cross-chain assets via XCM
  },
  
  notes: [
    "Beamswap runs on Moonbeam, an EVM-compatible Polkadot parachain",
    "Supports XCM cross-chain assets from Polkadot ecosystem",
    "Full EVM compatibility allows using standard Ethereum tools",
    "Integrated yield farming and liquidity mining programs",
  ],
};
