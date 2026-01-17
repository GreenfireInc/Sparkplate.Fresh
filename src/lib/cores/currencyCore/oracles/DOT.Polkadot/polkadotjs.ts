// Polkadot.js API - Direct Blockchain Data Access
// Type: SDK / Direct RPC Access
// Blockchain: Polkadot (DOT) and Substrate chains

export const polkadotjsOracle = {
  name: "Polkadot.js API",
  fullName: "Polkadot.js JavaScript API",
  blockchain: "Polkadot (DOT) and Substrate ecosystem",
  type: "SDK / Direct RPC Access",
  description: "The standard JavaScript/TypeScript library for interacting with Polkadot and Substrate-based chains. Enables direct blockchain data queries, transaction submission, and state reading without intermediate services.",
  
  url: "https://polkadot.js.org/",
  apps: "https://polkadot.js.org/apps/",
  docs: "https://polkadot.js.org/docs/",
  
  api: {
    rpcEndpoint: "wss://rpc.polkadot.io",
    documentation: "https://polkadot.js.org/docs/api/",
    polkadotDocs: "https://docs.polkadot.com/develop/toolkit/api-libraries/polkadot-js-api/",
    githubDocs: "https://github.com/polkadot-js/api",
  },
  
  sdk: {
    npm: "@polkadot/api",
    utilCrypto: "@polkadot/util-crypto",
    keyring: "@polkadot/keyring",
    installation: "npm install @polkadot/api @polkadot/util @polkadot/util-crypto",
    documentation: "https://polkadot.js.org/docs/",
    github: "https://github.com/polkadot-js/api",
    features: [
      "Direct blockchain RPC access",
      "Query chain state and storage",
      "Submit transactions",
      "Subscribe to events and state changes",
      "Account and balance queries",
      "Staking information",
      "Runtime metadata access",
    ],
  },
  
  integration: {
    example: `
// Polkadot.js API Integration Examples
import { ApiPromise, WsProvider } from '@polkadot/api';

// Connect to Polkadot
async function connectToPolkadot() {
  const wsProvider = new WsProvider('wss://rpc.polkadot.io');
  const api = await ApiPromise.create({ provider: wsProvider });
  
  console.log('Connected to:', await api.rpc.system.chain());
  return api;
}

// Get account balance
async function getBalance(api: ApiPromise, address: string) {
  try {
    const { data: balance } = await api.query.system.account(address);
    
    const free = balance.free.toString();
    const reserved = balance.reserved.toString();
    const frozen = balance.frozen.toString();
    
    console.log(\`Balance for \${address}:\`, {
      free: api.createType('Balance', free).toHuman(),
      reserved: api.createType('Balance', reserved).toHuman(),
      frozen: api.createType('Balance', frozen).toHuman(),
    });
    
    return balance;
  } catch (error) {
    console.error('Error fetching balance:', error);
    throw error;
  }
}

// Get current block number
async function getCurrentBlock(api: ApiPromise) {
  const blockNumber = await api.query.system.number();
  console.log('Current block:', blockNumber.toNumber());
  return blockNumber.toNumber();
}

// Get block hash
async function getBlockHash(api: ApiPromise, blockNumber: number) {
  const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
  console.log(\`Block \${blockNumber} hash:\`, blockHash.toHex());
  return blockHash;
}

// Get block details
async function getBlock(api: ApiPromise, blockHash: string) {
  const signedBlock = await api.rpc.chain.getBlock(blockHash);
  const block = signedBlock.block;
  
  console.log('Block details:', {
    parentHash: block.header.parentHash.toHex(),
    number: block.header.number.toNumber(),
    stateRoot: block.header.stateRoot.toHex(),
    extrinsicsRoot: block.header.extrinsicsRoot.toHex(),
    extrinsicsCount: block.extrinsics.length,
  });
  
  return block;
}

// Subscribe to new blocks
async function subscribeNewBlocks(api: ApiPromise, callback: (blockNumber: number) => void) {
  const unsubscribe = await api.rpc.chain.subscribeNewHeads((header) => {
    const blockNumber = header.number.toNumber();
    console.log(\`New block: #\${blockNumber}\`);
    callback(blockNumber);
  });
  
  return unsubscribe;
}

// Subscribe to balance changes
async function subscribeBalanceChanges(
  api: ApiPromise,
  address: string,
  callback: (balance: any) => void
) {
  const unsubscribe = await api.query.system.account(address, ({ data: balance }) => {
    console.log('Balance updated:', balance.free.toHuman());
    callback(balance);
  });
  
  return unsubscribe;
}

// Get runtime metadata
async function getMetadata(api: ApiPromise) {
  const metadata = await api.rpc.state.getMetadata();
  const version = await api.runtimeVersion;
  
  console.log('Runtime metadata:', {
    specName: version.specName.toString(),
    specVersion: version.specVersion.toNumber(),
    implVersion: version.implVersion.toNumber(),
  });
  
  return metadata;
}

// Query constants
async function getConstants(api: ApiPromise) {
  const existentialDeposit = api.consts.balances.existentialDeposit;
  const epochDuration = api.consts.babe.epochDuration;
  
  console.log('Constants:', {
    existentialDeposit: existentialDeposit.toHuman(),
    epochDuration: epochDuration.toNumber(),
  });
  
  return {
    existentialDeposit: existentialDeposit.toString(),
    epochDuration: epochDuration.toNumber(),
  };
}

// Get staking information
async function getStakingInfo(api: ApiPromise, address: string) {
  try {
    const [ledger, validators, nominators] = await Promise.all([
      api.query.staking.ledger(address),
      api.query.staking.validators.entries(),
      api.query.staking.nominators(address),
    ]);
    
    console.log('Staking info:', {
      hasLedger: !ledger.isEmpty,
      totalValidators: validators.length,
      nominations: nominators.isSome ? nominators.unwrap().targets.length : 0,
    });
    
    return { ledger, validators, nominators };
  } catch (error) {
    console.error('Error fetching staking info:', error);
    throw error;
  }
}

// Get events in a block
async function getBlockEvents(api: ApiPromise, blockHash: string) {
  const apiAt = await api.at(blockHash);
  const events = await apiAt.query.system.events();
  
  console.log(\`Events in block \${blockHash}:\`, events.length);
  
  events.forEach((record, index) => {
    const { event } = record;
    console.log(\`Event \${index}:\`, {
      section: event.section,
      method: event.method,
      data: event.data.toHuman(),
    });
  });
  
  return events;
}

// Query storage at specific key
async function queryStorage(api: ApiPromise, module: string, method: string, args: any[] = []) {
  try {
    const result = await api.query[module][method](...args);
    console.log(\`Storage [\${module}.\${method}]:\`, result.toHuman());
    return result;
  } catch (error) {
    console.error('Error querying storage:', error);
    throw error;
  }
}

// Get transaction fee estimate
async function estimateFee(api: ApiPromise, tx: any, address: string) {
  try {
    const info = await tx.paymentInfo(address);
    
    console.log('Fee estimate:', {
      partialFee: info.partialFee.toHuman(),
      weight: info.weight.toHuman(),
    });
    
    return info;
  } catch (error) {
    console.error('Error estimating fee:', error);
    throw error;
  }
}

// Multi-query example
async function getMultipleAccounts(api: ApiPromise, addresses: string[]) {
  const accounts = await api.query.system.account.multi(addresses);
  
  accounts.forEach((account, index) => {
    console.log(\`Account \${addresses[index]}:\`, {
      free: account.data.free.toHuman(),
      reserved: account.data.reserved.toHuman(),
    });
  });
  
  return accounts;
}

// Usage example
async function main() {
  console.log('=== Polkadot.js API Integration Examples ===\\n');
  
  const api = await connectToPolkadot();
  
  // Get current block
  const currentBlock = await getCurrentBlock(api);
  console.log('Current block:', currentBlock);
  
  // Get example account balance
  const exampleAddress = '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg';
  const balance = await getBalance(api, exampleAddress);
  
  // Get constants
  const constants = await getConstants(api);
  console.log('Constants:', constants);
  
  // Subscribe to new blocks (will run continuously)
  const unsubscribe = await subscribeNewBlocks(api, (blockNumber) => {
    console.log('New block callback:', blockNumber);
  });
  
  // Later: unsubscribe()
  
  // Disconnect
  // await api.disconnect();
}

main().catch(console.error);
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/polkadot",
    github: "https://github.com/polkadot-js",
  },
  
  features: {
    directRPC: true,
    stateQueries: true,
    eventSubscriptions: true,
    transactionSubmission: true,
    metadataAccess: true,
    multiQuery: true,
    freeAccess: true,
  },
  
  supportedData: [
    "Account balances and nonces",
    "Block data and headers",
    "Transaction/extrinsic details",
    "Events and logs",
    "Runtime constants",
    "Staking information",
    "Storage queries",
    "Runtime metadata",
  ],
  
  rpcEndpoints: [
    "wss://rpc.polkadot.io (Polkadot mainnet)",
    "wss://kusama-rpc.polkadot.io (Kusama)",
    "wss://westend-rpc.polkadot.io (Westend testnet)",
    "Various parachain RPC endpoints",
  ],
  
  useCases: [
    "Direct blockchain data queries",
    "Wallet applications",
    "Transaction monitoring",
    "Block exploration",
    "Account tracking",
    "Staking interfaces",
    "DApp integration",
    "Custom blockchain tools",
  ],
  
  notes: [
    "Official JavaScript/TypeScript library for Polkadot",
    "Direct RPC access without intermediaries",
    "Completely free and open-source",
    "No API keys required",
    "Real-time subscriptions to blockchain events",
    "Type-safe with TypeScript support",
    "Comprehensive documentation",
    "Used by most Polkadot applications",
    "Can query any Substrate-based chain",
    "Active development and community support",
  ],
  
  resources: {
    website: "https://polkadot.js.org/",
    docs: "https://polkadot.js.org/docs/",
    apps: "https://polkadot.js.org/apps/",
    github: "https://github.com/polkadot-js/api",
    polkadotDocs: "https://docs.polkadot.com/develop/toolkit/api-libraries/polkadot-js-api/",
  },
  
  advantages: [
    "No third-party dependencies",
    "Most up-to-date blockchain data",
    "No rate limits (depends on RPC provider)",
    "Free to use",
    "Full blockchain access",
    "Type-safe API",
  ],
  
  limitations: [
    "Requires running or accessing an RPC node",
    "No historical data aggregation (raw blockchain only)",
    "More complex than REST APIs",
    "Need to understand Substrate/Polkadot architecture",
  ],
};

