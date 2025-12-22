// JustLend DAO Swap DEX Information
// Lending protocol with integrated swap on Tron
// Source: Research compiled from Oct14.Research.Cryptocurrency.TRX.Tron

export const justlendDEX = {
  name: "JustLend DAO Swap",
  blockchain: "Tron (TRX)",
  type: "DeFi Protocol",
  description: "Comprehensive DeFi lending protocol on Tron with integrated swap functionality. JustLend offers lending, borrowing, and token swaps in a unified platform, powered by Chainlink oracles.",
  
  urls: {
    main: "https://justlend.org/",
    app: "https://app.justlend.org/",
    swap: "https://app.justlend.org/swap",
    lend: "https://app.justlend.org/lend",
    docs: "https://docs.justlend.org/",
  },
  
  api: {
    endpoints: {
      tronGridApi: "https://api.trongrid.io",
      chainlinkOracle: "Chainlink Data Feeds on Tron",
      contractRead: "Tron Blockchain API",
    },
    documentation: "https://docs.justlend.org/",
    apiReference: "https://developers.tron.network/reference/introduction",
    rateLimit: "Public API available",
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
        {
          name: "@chainlink/contracts",
          package: "@chainlink/contracts",
          description: "Chainlink oracle contracts for price feeds",
          installCommand: "npm install @chainlink/contracts",
        },
      ],
      documentation: "https://docs.justlend.org/",
    },
  },
  
  integration: {
    example: `
import TronWeb from 'tronweb';

// Initialize TronWeb
const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io',
});

// Get JustLend lending rates
async function getJustLendRates(token: string) {
  const contractAddress = 'TJUSTLEND_CONTRACT_ADDRESS';
  
  const contract = await tronWeb.contract().at(contractAddress);
  const supplyRate = await contract.getSupplyRate().call();
  const borrowRate = await contract.getBorrowRate().call();
  
  console.log('JustLend Supply Rate:', supplyRate);
  console.log('JustLend Borrow Rate:', borrowRate);
  
  return {
    supplyRate,
    borrowRate
  };
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/DeFi_JUST",
    telegram: "https://t.me/JustLendOfficial",
    medium: "https://justlend.medium.com/",
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
    hasLending: true,
    hasBorrowing: true,
    hasSwap: true,
    usesChainlinkOracles: true,
    tvl: "$1+ billion",
    volume24h: "$50+ million",
  },
  
  notes: [
    "JustLend is the largest lending protocol on Tron",
    "Powered by Chainlink price oracles for security",
    "Integrated swap functionality within the platform",
    "Secures $1B+ in TVL",
    "Supports major TRC-20 tokens",
    "JST governance token",
    "Competitive lending and borrowing rates",
    "Part of TRON DAO ecosystem",
  ],
};
