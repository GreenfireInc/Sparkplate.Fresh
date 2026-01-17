// WeaveDB Oracle - Decentralized Database Oracle
// Type: Database Oracle
// Blockchain: Arweave (AR) - SmartWeave-based database

export const weavedbOracleAR = {
  name: "WeaveDB",
  blockchain: "Arweave (AR)",
  type: "Decentralized Database Oracle",
  description: "NoSQL database as a smart contract on Arweave. It can act as an oracle by storing and retrieving complex data structures directly on the Permaweb using SmartWeave contracts.",
  
  url: "https://weavedb.dev/",
  docs: "https://docs.weavedb.dev/",
  
  api: {
    documentation: "https://docs.weavedb.dev/",
  },
  
  sdk: {
    npm: "weavedb-sdk-node",
    installation: "npm install weavedb-sdk-node",
    documentation: "https://docs.weavedb.dev/",
    github: "https://github.com/weavedb/weavedb",
  },
  
  integration: {
    example: `
// WeaveDB Oracle Integration for Arweave
import WeaveDB from "weavedb-sdk-node";

async function queryWeaveDBOracle(contractTxId: string) {
  try {
    // Initialize WeaveDB with the contract transaction ID
    const db = new WeaveDB({
      contractTxId: contractTxId
    });
    
    await db.init();

    // Example 1: Get price data stored in the DB
    console.log("Fetching price data from WeaveDB...");
    const prices = await db.get("prices", "AR");
    
    console.log("AR Price Data:", prices);

    // Example 2: Complex query
    const results = await db.get("oracle_feeds", [
      ["source", "==", "redstone"],
      ["timestamp", "desc"],
      ["limit", 5]
    ]);
    
    return {
      latestPrice: prices,
      recentFeeds: results
    };
  } catch (error) {
    console.error("Error querying WeaveDB oracle:", error);
    throw error;
  }
}

// Example usage
// queryWeaveDBOracle("your-contract-tx-id").then(console.log);
`
  },
  
  features: {
    noSqlDatabase: true,
    smartContract: true,
    permanentStorage: true,
    decentralized: true,
    complexQueries: true,
    accessControl: true,
  },
  
  useCases: [
    "Storing complex oracle data structures",
    "Decentralized application state management",
    "Social graph data storage",
    "Indexing and querying Arweave data",
  ],
  
  notes: [
    "WeaveDB allows complex NoSQL queries on Arweave data",
    "Acts as a smart contract-based database",
    "Can serve as a flexible storage layer for oracle data",
    "Supports cryptographic access control",
  ],
};
