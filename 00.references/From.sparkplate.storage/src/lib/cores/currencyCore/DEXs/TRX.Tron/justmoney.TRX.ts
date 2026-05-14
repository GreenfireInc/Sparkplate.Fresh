// JustMoney DEX Information
// Stablecoin-focused DEX on Tron
// Source: Research compiled from Oct14.Research.Cryptocurrency.TRX.Tron

export const justmoneyDEX = {
  name: "JustMoney",
  blockchain: "Tron (TRX)",
  type: "Stablecoin DEX",
  description: "Stablecoin-focused decentralized exchange on Tron offering efficient swaps between stablecoins with minimal slippage and yield farming opportunities. Optimized for stable-to-stable trading.",
  
  urls: {
    main: "https://justmoney.exchange/",
    app: "https://justmoney.exchange/swap",
    swap: "https://justmoney.exchange/swap",
    pools: "https://justmoney.exchange/pools",
    docs: "https://docs.justmoney.exchange/",
  },
  
  api: {
    endpoints: {
      tronGridApi: "https://api.trongrid.io",
      contractRead: "Tron Blockchain API for contract queries",
    },
    documentation: "https://docs.justmoney.exchange/",
    apiReference: "https://developers.tron.network/reference/introduction",
    rateLimit: "Public Tron API available",
    requiresApiKey: false,
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "tronweb",
          package: "tronweb",
          description: "Official Tron JavaScript SDK",
          installCommand: "npm install tronweb",
        },
      ],
      documentation: "https://developers.tron.network/docs/tronweb",
    },
  },
  
  integration: {
    example: `
import TronWeb from 'tronweb';

// Initialize TronWeb
const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io',
});

// Get JustMoney pool reserves
async function getJustMoneyPool(stablecoinA: string, stablecoinB: string) {
  const contractAddress = 'TJUSTMONEY_CONTRACT_ADDRESS';
  
  const contract = await tronWeb.contract().at(contractAddress);
  const reserves = await contract.getReserves().call();
  
  console.log('JustMoney Pool Reserves:', reserves);
  
  return reserves;
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/JustMoneyIO",
    telegram: "https://t.me/justmoneyofficial",
  },
  
  features: {
    hasApi: true,
    hasSdk: true,
    hasSubgraph: false,
    hasGraphQL: false,
    isActive: true,
    supportsCrossChain: false,
    hasLiquidityMining: true,
    isEvmCompatible: false,
    isTVM: true,
    hasSolidityContracts: true,
    hasStablecoinFocus: true,
    tvl: "$50+ million",
    volume24h: "$10+ million",
  },
  
  notes: [
    "JustMoney specializes in stablecoin trading",
    "Minimal slippage for stable-to-stable swaps",
    "Efficient for USDT, USDC, USDJ, and other stablecoins",
    "Lower fees for stablecoin pairs",
    "Yield farming opportunities",
    "Built on Tron Virtual Machine (TVM)",
    "Integrated with Tron DeFi ecosystem",
  ],
};
