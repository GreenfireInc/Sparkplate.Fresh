// 0rbit Oracle - Decentralized Oracle Network for AO/Arweave
// Type: Permissionless Oracle for Arbitrary Data
// Blockchain: Arweave (AR) - Built on AO (Arweave's compute layer)

export const orbitOracleAR = {
  name: "0rbit",
  blockchain: "Arweave (AR)",
  type: "Decentralized Permissionless Oracle Network",
  description: "First oracle system built on AO (Arweave's hyper-parallel compute layer) that enables AO processes to fetch arbitrary data from any URL in a decentralized, trustless manner. Unlike other oracles that collect only specific data types, 0rbit allows access to any web data source.",
  
  url: "https://0rbit.co/",
  docs: "https://docs.0rbit.co/",
  arweaveLists: "https://list.weavescan.com/project/0rbit",
  
  api: {
    baseURL: "https://api.0rbit.co",
    documentation: "https://docs.0rbit.co/",
    aoProcess: "0rbit oracle process ID (verify from 0rbit docs)",
    rateLimit: "Oracle-specific rate limits",
  },
  
  sdk: {
    npm: "@permaweb/aoconnect",
    installation: "npm install @permaweb/aoconnect",
    walletKitNpm: "arweave-wallet-kit",
    walletKitInstallation: "npm install arweave-wallet-kit",
    documentation: "https://docs.0rbit.co/",
    github: "https://github.com/permaweb/aoconnect",
  },
  
  integration: {
    example: `
// 0rbit Oracle Integration for Arweave/AO
import { message, result, createDataItemSigner } from '@permaweb/aoconnect';
import Arweave from 'arweave';

// Initialize Arweave
const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
});

// Method 1: Request data from 0rbit oracle
async function requestOracleData(apiUrl: string, wallet: any) {
  try {
    // 0rbit process ID (verify from official docs)
    const ORBIT_PROCESS_ID = 'YOUR_ORBIT_PROCESS_ID'; // Replace with actual process ID
    
    console.log('📡 Requesting data from 0rbit oracle...');
    console.log('API URL:', apiUrl);
    
    // Send message to 0rbit oracle
    const messageId = await message({
      process: ORBIT_PROCESS_ID,
      signer: createDataItemSigner(wallet),
      tags: [
        { name: 'Action', value: 'Get-Real-Data' },
        { name: 'X-Url', value: apiUrl },
        { name: 'Content-Type', value: 'application/json' }
      ],
      data: ''
    });
    
    console.log('✅ Message sent to 0rbit. Message ID:', messageId);
    
    // Wait for result (0rbit processes the request)
    let response = null;
    let attempts = 0;
    const maxAttempts = 30;
    
    while (!response && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
      
      try {
        const resultData = await result({
          message: messageId,
          process: ORBIT_PROCESS_ID
        });
        
        if (resultData && resultData.Output && resultData.Output.data) {
          response = resultData;
          break;
        }
      } catch (error) {
        // Result not ready yet, continue waiting
        attempts++;
        console.log(\`Waiting for result... (attempt \${attempts}/\${maxAttempts})\`);
      }
    }
    
    if (!response) {
      throw new Error('Timeout waiting for 0rbit oracle response');
    }
    
    console.log('✅ Oracle data received');
    console.log('Response:', response.Output.data);
    
    return JSON.parse(response.Output.data);
  } catch (error) {
    console.error('Error requesting data from 0rbit:', error);
    throw error;
  }
}

// Method 2: Fetch price data from external API via 0rbit
async function getPriceViaOrbit(assetSymbol: string, wallet: any) {
  try {
    // Example: Fetch price from CoinGecko API
    const apiUrl = \`https://api.coingecko.com/api/v3/simple/price?ids=\${assetSymbol}&vs_currencies=usd\`;
    
    const data = await requestOracleData(apiUrl, wallet);
    
    console.log(\`\${assetSymbol} Price (USD):\`, data[assetSymbol.toLowerCase()].usd);
    
    return data;
  } catch (error) {
    console.error('Error fetching price via 0rbit:', error);
    throw error;
  }
}

// Method 3: Fetch arbitrary JSON data
async function fetchJsonData(url: string, wallet: any) {
  try {
    const data = await requestOracleData(url, wallet);
    return data;
  } catch (error) {
    console.error('Error fetching JSON data via 0rbit:', error);
    throw error;
  }
}

// Method 4: Create a wrapper class for 0rbit oracle
class OrbitOracleClient {
  private processId: string;
  private wallet: any;
  
  constructor(processId: string, wallet: any) {
    this.processId = processId;
    this.wallet = wallet;
  }
  
  async fetchData(url: string, options: {
    method?: string;
    headers?: Record<string, string>;
    body?: string;
  } = {}): Promise<any> {
    try {
      const tags = [
        { name: 'Action', value: 'Get-Real-Data' },
        { name: 'X-Url', value: url }
      ];
      
      if (options.method) {
        tags.push({ name: 'X-Method', value: options.method });
      }
      
      if (options.headers) {
        Object.entries(options.headers).forEach(([key, value]) => {
          tags.push({ name: \`X-Header-\${key}\`, value: value });
        });
      }
      
      if (options.body) {
        tags.push({ name: 'X-Body', value: options.body });
      }
      
      const messageId = await message({
        process: this.processId,
        signer: createDataItemSigner(this.wallet),
        tags,
        data: options.body || ''
      });
      
      // Poll for result
      return await this.waitForResult(messageId);
    } catch (error) {
      console.error('0rbit fetch error:', error);
      throw error;
    }
  }
  
  private async waitForResult(messageId: string, maxWait: number = 60000): Promise<any> {
    const startTime = Date.now();
    const pollInterval = 2000;
    
    while (Date.now() - startTime < maxWait) {
      try {
        const resultData = await result({
          message: messageId,
          process: this.processId
        });
        
        if (resultData && resultData.Output && resultData.Output.data) {
          return JSON.parse(resultData.Output.data);
        }
      } catch {
        // Result not ready, continue polling
      }
      
      await new Promise(resolve => setTimeout(resolve, pollInterval));
    }
    
    throw new Error('Timeout waiting for 0rbit oracle response');
  }
}

// Usage example
// const wallet = await arweave.wallets.generate();
// const orbitClient = new OrbitOracleClient('ORBIT_PROCESS_ID', wallet);
// const priceData = await orbitClient.fetchData('https://api.coingecko.com/api/v3/simple/price?ids=arweave&vs_currencies=usd');
`
  },
  
  features: {
    arbitraryData: true,
    anyUrl: true,
    decentralized: true,
    permissionless: true,
    aoIntegration: true,
    arweaveStorage: true,
    trustless: true,
    web2Bridge: true,
  },
  
  aoIntegration: {
    description: "0rbit is built on AO (Arweave's compute layer)",
    processBased: true,
    messagePassing: true,
    hyperParallel: true,
    documentation: "https://cookbook.arweave.net/fundamentals/decentralized-computing/ao-processes/what-are-ao-processes.html",
  },
  
  useCases: [
    "Fetching data from any REST API",
    "Bridging Web2 data to Arweave/AO",
    "Real-time price feeds from external sources",
    "Weather data, sports scores, or any web data",
    "Custom oracle data for specific applications",
    "Decentralized data aggregation",
  ],
  
  advantages: {
    flexibility: "Can fetch data from any URL, not limited to specific data types",
    decentralization: "Permissionless oracle network on AO",
    permanence: "Results can be stored permanently on Arweave",
    trustless: "Decentralized validation of fetched data",
    costEffective: "Leverages Arweave's permanent storage model",
  },
  
  limitations: {
    aoRequired: "Requires AO process understanding",
    responseTime: "May have longer response times than centralized APIs",
    processId: "Requires knowledge of 0rbit process ID",
    messagePassing: "Uses AO message-passing model (different from traditional APIs)",
  },
  
  notes: [
    "0rbit is the first oracle built specifically for AO/Arweave",
    "Enables AO processes to access any web data in a trustless manner",
    "Uses @permaweb/aoconnect for TypeScript/JavaScript integration",
    "Primary language for AO processes is Lua, but frontend can use TypeScript",
    "Results are stored on Arweave for permanent verification",
    "Permissionless - anyone can use 0rbit without approval",
    "Ideal for bridging Web2 APIs to Web3 applications on Arweave",
    "Requires understanding of AO process semantics and message passing",
  ],
};
