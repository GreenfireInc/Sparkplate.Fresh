// Polkaswap DEX Information
// Multi-algorithm DEX on SORA network
// Source: Research compiled from Oct14.Research.Cryptocurrency.DOT.Polkadot

export const polkaswapDEX = {
  name: "Polkaswap",
  blockchain: "SORA (Polkadot ecosystem)",
  type: "Multi-Algorithm DEX",
  description: "Cross-chain liquidity aggregator on SORA network. Polkaswap is a non-custodial, cross-chain AMM DEX built for Polkadot and Kusama, hosted on the SORA 2.0 network using Aggregate Liquidity Technology (ALT).",
  
  urls: {
    main: "https://polkaswap.io/",
    app: "https://polkaswap.io/#/swap",
    docs: "https://docs.sora2.soramitsu.co.jp/",
    wiki: "https://wiki.sora.org/",
  },
  
  api: {
    endpoints: {
      soraRpc: "wss://ws.sora2.soramitsu.co.jp",
      soraApi: "https://api.sora2.soramitsu.co.jp",
      baseUrl: "https://polkaswap.io",
    },
    documentation: "https://docs.sora2.soramitsu.co.jp/",
    rateLimit: "Public endpoints available",
    requiresApiKey: false,
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "@sora-substrate/sdk",
          package: "@sora-substrate/sdk",
          description: "Official SORA Substrate SDK",
          installCommand: "npm install @sora-substrate/sdk",
          github: "https://github.com/sora-xor/sora2-substrate-js-library",
        },
        {
          name: "@polkadot/api",
          package: "@polkadot/api",
          description: "Polkadot.js API for Substrate chains",
          installCommand: "npm install @polkadot/api",
        },
      ],
      documentation: "https://docs.sora2.soramitsu.co.jp/",
    },
  },
  
  integration: {
    substrateExample: `
import { ApiPromise, WsProvider } from '@polkadot/api';

const SORA_WS_ENDPOINT = 'wss://ws.sora2.soramitsu.co.jp';

async function connectToSora() {
  const provider = new WsProvider(SORA_WS_ENDPOINT);
  const api = await ApiPromise.create({ provider });

  // Query pool data
  const poolXyk = await api.query.poolXyk.accountPools('XOR', 'DOT');
  console.log('XOR/DOT Pool:', poolXyk.toHuman());

  return api;
}

// Get swap quote
async function getSwapQuote(api: ApiPromise) {
  const quote = await api.call.swapRouter.quote({
    dexId: 0, // Polkaswap DEX ID
    inputAssetId: 'DOT',
    outputAssetId: 'XOR',
    amount: '1000000000000', // 1 DOT
    swapVariant: 'WithDesiredInput'
  });

  console.log('Swap Quote:', quote.toHuman());
}
    `,
    
    crossChainExample: `
import { ApiPromise, WsProvider } from '@polkadot/api';

async function crossChainSwap() {
  const soraApi = await ApiPromise.create({
    provider: new WsProvider('wss://ws.sora2.soramitsu.co.jp')
  });

  // Bridge tokens from Polkadot to SORA network
  const bridgeTx = soraApi.tx.ethBridge.transferToSidechain({
    assetId: 'DOT',
    amount: '1000000000000', // 1 DOT
    sidechainAddress: '0x...', // Target address on SORA
    additionalData: null
  });

  console.log('Bridge Transaction:', bridgeTx.toHuman());
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/polkaswap",
    telegram: "https://t.me/polkaswap",
    discord: "https://discord.gg/sora",
    github: "https://github.com/sora-xor",
    medium: "https://medium.com/sora-xor",
  },
  
  features: {
    hasApi: true,
    hasSdk: true,
    hasSubgraph: false, // Limited subgraph support
    isActive: true,
    supportsCrossChain: true,
    hasLiquidityMining: true,
    usesAggregateLiquidity: true, // ALT technology
  },
  
  notes: [
    "Polkaswap uses Aggregate Liquidity Technology (ALT) for optimal pricing",
    "Built on SORA network, connected to Polkadot ecosystem",
    "Supports cross-chain swaps between multiple blockchains",
    "Limited public API - primarily accessed via SORA network",
  ],
};
