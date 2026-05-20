// Acurast Oracle - Decentralized Off-Chain Computation for Polkadot
// Type: Oracle + Off-Chain Compute Platform
// Blockchain: Polkadot (DOT) / Substrate

export const acurastOracle = {
  name: "Acurast",
  fullName: "Acurast Decentralized Cloud",
  blockchain: "Polkadot (DOT) / Substrate",
  type: "Oracle + Off-Chain Compute Platform",
  description: "Decentralized, serverless cloud platform using distributed network of mobile devices for oracle services. Provides secure off-chain data and computation with TEE (Trusted Execution Environment) for Substrate chains.",
  
  url: "https://acurast.com",
  docs: "https://docs.acurast.com",
  console: "https://console.acurast.com",
  
  api: {
    documentation: "https://docs.acurast.com",
    palletDocs: "https://acurast.com/blog/oracle-blockchain-acurast/off-chain-data-and-computation-for-the-polkadot-ecosystem-with-acurasts-oracle-pallet/",
    ecosystem: "https://acurast.com/ecosystem/",
    integration: "https://acurast.com/blog/announcements/acurast-and-polkadot-uniting-for-a-stronger-web3-ecosystem/",
  },
  
  sdk: {
    npm: "@polkadot/api",
    installation: "npm install @polkadot/api @polkadot/util-crypto",
    documentation: "https://docs.acurast.com",
    github: "https://github.com/Acurast",
    features: [
      "Off-chain data fetching with TEE security",
      "Custom job execution (API calls, computation)",
      "Cryptographic proofs of correctness",
      "Runtime pallet integration",
      "Marketplace for data jobs",
      "Cross-chain support (Substrate, EVM, Tezos)",
    ],
  },
  
  integration: {
    example: `
// Acurast Oracle Integration for Polkadot
import { ApiPromise, WsProvider } from '@polkadot/api';

// Connect to a parachain with Acurast pallet
async function initAcurastConnection(wsUrl: string) {
  const provider = new WsProvider(wsUrl);
  const api = await ApiPromise.create({ provider });
  return api;
}

// Query Acurast job result
async function getAcurastJobResult(api: ApiPromise, jobId: number) {
  try {
    // Suppose pallet is 'acurastOracle' and storage 'jobResults'
    const result = await api.query.acurastOracle.jobResults(jobId);
    
    const data = result.toJSON();
    console.log(\`Job \${jobId} result:\`, data);
    
    return data;
  } catch (error) {
    console.error('Error querying Acurast job:', error);
    throw error;
  }
}

// Query DOT price via Acurast oracle
async function getDOTPrice(api: ApiPromise) {
  try {
    // Example: Query price oracle pallet (adjust based on actual implementation)
    const price = await api.query.acurastOracle.price('DOT');
    
    const priceData = price.toHuman();
    console.log('DOT price from Acurast:', priceData);
    
    return priceData;
  } catch (error) {
    console.error('Error fetching DOT price:', error);
    throw error;
  }
}

// Submit a new job to Acurast
async function submitAcurastJob(api: ApiPromise, jobScript: string, reward: number) {
  try {
    // This is a conceptual example - actual implementation depends on pallet
    const tx = api.tx.acurastOracle.submitJob({
      script: jobScript,
      reward: reward,
      maxDuration: 300, // 5 minutes
    });
    
    // Sign and send transaction
    // const hash = await tx.signAndSend(signer);
    
    console.log('Job submitted');
    return tx;
  } catch (error) {
    console.error('Error submitting job:', error);
    throw error;
  }
}

// Monitor job completion events
async function monitorJobEvents(api: ApiPromise, callback: (event: any) => void) {
  api.query.system.events((events) => {
    events.forEach((record) => {
      const { event } = record;
      
      if (event.section === 'acurastOracle' && event.method === 'JobCompleted') {
        const [jobId, result] = event.data;
        console.log(\`Job \${jobId} completed:\`, result.toHuman());
        callback({ jobId: jobId.toNumber(), result: result.toJSON() });
      }
    });
  });
}

// Example: Fetch external API data via Acurast
async function fetchExternalData(api: ApiPromise, apiUrl: string) {
  const jobScript = \`
    async function fetchData() {
      const response = await fetch('\${apiUrl}');
      const data = await response.json();
      return data;
    }
    fetchData();
  \`;
  
  const tx = await submitAcurastJob(api, jobScript, 1000);
  return tx;
}

// Usage example
async function main() {
  const api = await initAcurastConnection('wss://your-parachain-node');
  
  // Get price from oracle
  const price = await getDOTPrice(api);
  console.log('Current DOT Price:', price);
  
  // Query specific job result
  const jobResult = await getAcurastJobResult(api, 123);
  console.log('Job Result:', jobResult);
  
  // Monitor for new job completions
  monitorJobEvents(api, (event) => {
    console.log('New job completed:', event);
  });
  
  await api.disconnect();
}

// Run example
main().catch(console.error);
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/Acurast",
    telegram: "https://t.me/acurast",
    discord: "https://discord.gg/acurast",
    github: "https://github.com/Acurast",
    linkedin: "https://www.linkedin.com/company/acurast",
  },
  
  features: {
    decentralized: true,
    teeSecured: true,
    offChainCompute: true,
    customJobs: true,
    crossChain: true,
    proofOfCorrectness: true,
    marketplace: true,
  },
  
  supportedData: [
    "Price feeds (DOT and other assets)",
    "External API data",
    "Custom computation results",
    "Cross-chain data",
    "Real-time data feeds",
    "IoT data",
  ],
  
  deployment: {
    palletIntegration: "Runtime pallet for Substrate chains",
    teeEnvironment: "Trusted Execution Environment on mobile devices",
    dataTransmitters: "Distributed network of secure devices",
    proofVerification: "On-chain verification of computation proofs",
  },
  
  useCases: [
    "Price oracles for DeFi applications",
    "Off-chain computation for complex logic",
    "External API integration",
    "Cross-chain data bridging",
    "IoT data collection",
    "Decentralized confidential computing",
    "AI inference on-chain",
  ],
  
  notes: [
    "Integrated with Polkadot ecosystem since 2020",
    "Uses TEE for secure off-chain execution",
    "Supports arbitrary job definitions (not just price feeds)",
    "Data transmitters execute jobs and submit proofs",
    "Marketplace model with token payments for jobs",
    "Can act as oracle hub for multiple parachains",
    "Polkadot docs list Acurast as recommended oracle",
    "Supports multiple blockchain ecosystems (Substrate, EVM, Tezos)",
    "Cryptographic proofs ensure data integrity",
    "More flexible than traditional price feed oracles",
  ],
  
  resources: {
    blog: "https://acurast.com/blog/oracle-blockchain-acurast/",
    caseStudy: "https://polkadot.com/case-studies/acurast-decentralized-cloud-confidential-ai/",
    announcement: "https://acurast.com/blog/announcements/acurast-and-polkadot-uniting-for-a-stronger-web3-ecosystem/",
    polkadotDocs: "https://docs.polkadot.com/develop/toolkit/integrations/oracles/",
  },
};

