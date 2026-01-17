// XRPL Native Price Oracle - Built-in XRP Ledger Oracle
// Type: Native On-Chain Price Oracle
// Blockchain: XRP Ledger (XRPL)

export const xrplNativeOracle = {
  name: "XRPL Native Price Oracle",
  blockchain: "XRP Ledger (XRPL)",
  type: "Native On-Chain Price Oracle",
  description: "Built-in price oracle system on the XRP Ledger that allows authorized accounts to publish external data directly to the ledger. Supports up to 10 asset pairs per oracle entry with aggregation capabilities.",
  
  url: "https://xrpl.org/docs/concepts/decentralized-storage/price-oracles",
  docs: "https://xrpl.org/docs/concepts/decentralized-storage/price-oracles",
  
  api: {
    rpcEndpoint: "wss://xrplcluster.com", // Mainnet
    testnetEndpoint: "wss://s.altnet.rippletest.net:51233",
    documentation: "https://xrpl.org/docs/references/http-websocket-apis/public-api-methods/get_aggregate_price",
    oracleSetTransaction: "https://xrpl.org/docs/references/protocol/transactions/types/oracleset",
    oracleEntry: "https://xrpl.org/docs/references/protocol/ledger-data/ledger-entry-types/oracle",
  },
  
  sdk: {
    npm: "xrpl",
    installation: "npm install xrpl",
    documentation: "https://js.xrpl.org/",
    github: "https://github.com/XRPLF/xrpl.js",
    features: [
      "Native on-chain price storage",
      "Multi-oracle aggregation",
      "Mean, median, and trimmed mean calculations",
      "Up to 10 asset pairs per oracle",
      "Tamper-resistant ledger storage",
    ],
  },
  
  integration: {
    example: `
// XRPL Native Oracle Integration Example
import xrpl from 'xrpl';

const client = new xrpl.Client('wss://xrplcluster.com');

// Query specific oracle entry
async function queryOracleData(oracleAccount: string, oracleDocumentId: number) {
  await client.connect();
  
  try {
    const response = await client.request({
      command: 'ledger_entry',
      ledger_index: 'validated',
      oracle: {
        account: oracleAccount,
        oracle_document_id: oracleDocumentId
      }
    });

    const oracleData = response.result.node;
    const priceSeries = oracleData.PriceDataSeries || [];
    
    console.log('Oracle Price Data Series:', priceSeries);
    
    // Extract specific price pair
    const xrpUsdPrice = priceSeries.find(p => 
      p.PriceData.BaseAsset === 'XRP' && p.PriceData.QuoteAsset === 'USD'
    );
    
    if (xrpUsdPrice) {
      const price = Number(xrpUsdPrice.PriceData.AssetPrice) / 
                   Math.pow(10, xrpUsdPrice.PriceData.Scale);
      console.log(\`XRP/USD Price: $\${price}\`);
      return price;
    }
    
    return null;
  } catch (error) {
    console.error('Error querying oracle:', error);
    throw error;
  } finally {
    await client.disconnect();
  }
}

// Get aggregate price from multiple oracles
async function getAggregatePrice(baseAsset: string, quoteAsset: string, oracles: any[]) {
  await client.connect();
  
  try {
    const response = await client.request({
      command: 'get_aggregate_price',
      base_asset: baseAsset,
      quote_asset: quoteAsset,
      oracles: oracles,
      trim: 20 // Outlier trim percentage (0-50)
    });

    const { mean, median, trimmed_mean } = response.result;
    
    console.log(\`\${baseAsset}/\${quoteAsset} Aggregate Prices:\`);
    console.log(\`Mean: \${mean}\`);
    console.log(\`Median: \${median}\`);
    console.log(\`Trimmed Mean: \${trimmed_mean}\`);
    
    return { mean, median, trimmed_mean };
  } catch (error) {
    console.error('Error fetching aggregate price:', error);
    throw error;
  } finally {
    await client.disconnect();
  }
}

// Create/Update Oracle (requires authorized account)
async function updateOracleData(wallet: any, oracleDocumentId: number, priceData: any[]) {
  await client.connect();
  
  try {
    const oracleSetTx = {
      TransactionType: "OracleSet",
      Account: wallet.address,
      OracleDocumentID: oracleDocumentId,
      OracleDataSeries: priceData.map(data => ({
        BaseAsset: data.baseAsset,
        QuoteAsset: data.quoteAsset,
        AssetPrice: (data.price * Math.pow(10, data.scale)).toString(),
        Scale: data.scale,
        LastUpdateTime: Math.floor(Date.now() / 1000)
      }))
    };

    const prepared = await client.autofill(oracleSetTx);
    const signed = wallet.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);
    
    console.log('Oracle updated successfully:', result.result.hash);
    return result;
  } catch (error) {
    console.error('Error updating oracle:', error);
    throw error;
  } finally {
    await client.disconnect();
  }
}

// Usage examples
// queryOracleData('rNZ9m6AP9K7z3EVg6GhPMx36V4QmZKeWds', 34);
// getAggregatePrice('XRP', 'USD', [
//   { account: 'rNZ9m6AP9K7z3EVg6GhPMx36V4QmZKeWds', last_update_time: 1724871860 }
// ]);
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/XRPLF",
    github: "https://github.com/XRPLF",
    discord: "https://discord.gg/xrpl",
    reddit: "https://www.reddit.com/r/XRP/",
  },
  
  features: {
    nativeOnChain: true,
    multiOracleAggregation: true,
    tamperResistant: true,
    lowLatency: true,
    costEffective: true,
    authorizedPublishers: true,
  },
  
  supportedData: [
    "Asset prices (crypto/fiat pairs)",
    "Exchange rates",
    "Market data",
    "Custom data feeds",
  ],
  
  dataFormat: {
    maxAssetPairs: 10,
    priceScale: "Configurable (typically 6-8 decimals)",
    updateFrequency: "Real-time (as published by oracles)",
    aggregationMethods: ["Mean", "Median", "Trimmed Mean"],
  },
  
  contracts: {
    mainnet: {
      network: "XRP Ledger Mainnet",
      rpcEndpoint: "wss://xrplcluster.com",
      alternativeEndpoints: ["wss://s1.ripple.com", "wss://s2.ripple.com"]
    },
    testnet: {
      network: "XRP Ledger Testnet",
      rpcEndpoint: "wss://s.altnet.rippletest.net:51233"
    }
  },
  
  notes: [
    "Native to XRP Ledger protocol (enabled via Price Oracle amendment)",
    "Requires authorized oracle accounts to publish data",
    "Supports up to 10 asset pairs per oracle entry",
    "Provides mean, median, and trimmed mean aggregation",
    "Data stored directly on-chain for tamper resistance",
    "Low latency access via standard XRPL RPC calls",
    "No external dependencies or bridges required",
    "Ideal for XRPL-native DeFi applications",
    "Oracle data persists in ledger history",
    "Supports custom trim percentages for outlier removal",
  ],
  
  useCases: [
    "DeFi applications (AMMs, lending protocols)",
    "Tokenized asset pricing",
    "Cross-currency payments",
    "Conditional escrows",
    "Automated trading systems",
    "Risk management systems",
  ],
  
  apiEndpoints: {
    ledgerEntry: "ledger_entry (oracle object)",
    aggregatePrice: "get_aggregate_price",
    accountObjects: "account_objects (type: oracle)",
    oracleSet: "OracleSet transaction type",
  },
  
  resources: {
    priceOracleAmendment: "https://xrpl.org/known-amendments.html#priceoracle",
    developerDocs: "https://xrpl.org/docs/concepts/decentralized-storage/price-oracles",
    xrplExplorer: "https://xrpscan.com/",
  },
};
