// Edge Protocol DEX Information
// Hybrid orderbook and AMM DEX on Terra
// Source: Research compiled from Oct14.Research.Cryptocurrency.LUNA.Terra

export const edgeProtocolDEX = {
  name: "Edge Protocol",
  blockchain: "Terra (LUNA)",
  type: "Hybrid DEX (Orderbook + AMM)",
  description: "Hybrid decentralized exchange combining orderbook and AMM models on Terra. Edge Protocol offers both traditional limit orders and automated market making for optimal trading flexibility.",
  
  urls: {
    main: "https://edgeprotocol.io/",
    app: "https://app.edgeprotocol.io/",
    docs: "https://docs.edgeprotocol.io/",
    analytics: "https://app.edgeprotocol.io/analytics",
  },
  
  api: {
    endpoints: {
      terraLcd: "https://phoenix-lcd.terra.dev/",
      contractQuery: "CosmWasm smart contract queries via LCD",
      orderbookApi: "https://api.edgeprotocol.io/",
    },
    documentation: "https://docs.edgeprotocol.io/",
    apiReference: "https://docs.edgeprotocol.io/api-reference",
    rateLimit: "Public API available with rate limits",
    requiresApiKey: false,
  },
  
  contracts: {
    terra2: {
      chainId: "phoenix-1",
      orderbookFactory: "terra1...",
      ammFactory: "terra1...",
      router: "terra1...",
    },
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "@terra-money/feather.js",
          package: "@terra-money/feather.js",
          description: "Terra multi-chain SDK for contract interaction",
          installCommand: "npm install @terra-money/feather.js",
        },
        {
          name: "@cosmjs/stargate",
          package: "@cosmjs/stargate",
          description: "CosmJS for Cosmos SDK chain interaction",
          installCommand: "npm install @cosmjs/stargate",
        },
        {
          name: "axios",
          package: "axios",
          description: "HTTP client for API requests",
          installCommand: "npm install axios",
        },
      ],
      documentation: "https://docs.edgeprotocol.io/",
    },
  },
  
  integration: {
    orderbookQueryExample: `
import axios from 'axios';

// Query orderbook from Edge Protocol API
async function getEdgeOrderbook(pairSymbol: string) {
  const response = await axios.get(
    \`https://api.edgeprotocol.io/orderbook/\${pairSymbol}\`
  );
  
  console.log('Orderbook:', response.data);
  console.log('Bids:', response.data.bids);
  console.log('Asks:', response.data.asks);
  
  return response.data;
}

getEdgeOrderbook('LUNA-USDC');
    `,
    
    ammPoolQueryExample: `
import { LCDClient } from '@terra-money/feather.js';

const lcd = new LCDClient({
  terra: {
    lcd: 'https://phoenix-lcd.terra.dev',
    chainID: 'phoenix-1',
    gasAdjustment: 1.75,
    gasPrices: { uluna: 0.015 },
    prefix: 'terra',
  },
});

// Query AMM pool from Edge Protocol
async function getEdgeAmmPool(poolAddress: string) {
  const poolInfo = await lcd.wasm.contractQuery(poolAddress, {
    pool: {}
  });
  
  console.log('AMM Pool Info:', poolInfo);
  return poolInfo;
}

getEdgeAmmPool('terra1...');
    `,
    
    limitOrderExample: `
import { LCDClient, MsgExecuteContract, Wallet } from '@terra-money/feather.js';

const lcd = new LCDClient({
  terra: {
    lcd: 'https://phoenix-lcd.terra.dev',
    chainID: 'phoenix-1',
    gasAdjustment: 1.75,
    gasPrices: { uluna: 0.015 },
    prefix: 'terra',
  },
});

// Place limit order on Edge Protocol
async function placeLimitOrder(
  wallet: Wallet,
  orderbookAddress: string,
  offerAsset: any,
  askAsset: any,
  price: string
) {
  const msg = new MsgExecuteContract(
    wallet.key.accAddress('terra'),
    orderbookAddress,
    {
      place_limit_order: {
        offer_asset: offerAsset,
        ask_asset: askAsset,
        price: price
      }
    }
  );
  
  const tx = await wallet.createAndSignTx({
    msgs: [msg],
    chainID: 'phoenix-1',
  });
  
  const result = await lcd.tx.broadcast(tx, 'phoenix-1');
  console.log('Limit order placed:', result.txhash);
  
  return result;
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/EdgeProtocol",
    discord: "https://discord.gg/edgeprotocol",
    telegram: "https://t.me/edgeprotocol",
    github: "https://github.com/edge-protocol",
  },
  
  features: {
    hasApi: true,
    hasSdk: false,
    hasSubgraph: false,
    hasGraphQL: false,
    isActive: true,
    supportsCrossChain: false,
    hasLiquidityMining: true,
    isEvmCompatible: false,
    isCosmWasm: true,
    hasOrderbook: true,
    hasAMM: true,
    hasLimitOrders: true,
    hasMarketOrders: true,
    tvl: "$3+ million",
    volume24h: "$300k+",
  },
  
  notes: [
    "Edge Protocol combines orderbook and AMM models",
    "Supports both limit orders and instant swaps",
    "Built on CosmWasm smart contracts",
    "Hybrid model provides flexibility for traders",
    "Orderbook for price discovery, AMM for liquidity",
    "Native to Terra blockchain",
    "Lower slippage for large trades via orderbook",
  ],
};
