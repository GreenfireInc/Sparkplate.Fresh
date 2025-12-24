// Arweave Name System (ANS) & ArDrive - Metadata Oracle
// Type: Metadata and File Oracle
// Blockchain: Arweave (AR)

export const ansOracleAR = {
  name: "Arweave Name System (ANS) & ArDrive",
  blockchain: "Arweave (AR)",
  type: "Metadata and File Verification Oracle",
  description: "ANS acts as a decentralized registry for names and metadata on Arweave, while ArDrive provides permanent file storage. Together, they function as an oracle for file verification, metadata resolution, and identity management on the Permaweb.",
  
  url: "https://ar.io/arns/",
  ardriveUrl: "https://ardrive.io/",
  
  api: {
    ansEndpoint: "https://api.arns.app/v1/contract", // Example endpoint
  },
  
  sdk: {
    npm: "@ar-io/sdk",
    ardriveNpm: "ardrive-core-js",
    installation: "npm install @ar-io/sdk ardrive-core-js",
    documentation: "https://docs.ar.io/",
    github: "https://github.com/ar-io/ar-io-sdk",
  },
  
  integration: {
    example: `
// ANS & ArDrive Integration
import { ArIO } from '@ar-io/sdk';
import { readContract } from 'smartweave'; // Conceptual import

async function resolveArNS(name: string) {
  try {
    // Conceptual example of resolving an ArNS name
    // The actual implementation depends on the specific SDK version and contract interactions
    
    console.log(\`Resolving ArNS name: \${name}\`);
    
    // In a real scenario, you might interact with the ArNS smart contract
    // const contractState = await readContract(ARNS_CONTRACT_ID);
    // const record = contractState.records[name];
    
    // Using an SDK wrapper (conceptual)
    // const ario = ArIO.init();
    // const record = await ario.getArNSRecord(name);
    
    return {
      name,
      // transactionId: record.transactionId,
      // owner: record.owner
    };
  } catch (error) {
    console.error("Error resolving ArNS name:", error);
    throw error;
  }
}

// Example usage
// resolveArNS("myname.ar").then(console.log);
`
  },
  
  features: {
    nameResolution: true,
    metadataStorage: true,
    fileVerification: true,
    decentralizedIdentity: true,
    permanentHosting: true,
  },
  
  useCases: [
    "Resolving human-readable names to Arweave transaction IDs",
    "Verifying file integrity and ownership",
    "Managing decentralized identity metadata",
    "Permanent hosting of dApp frontends",
  ],
  
  notes: [
    "ANS maps friendly names (e.g., user.ar) to Arweave transaction IDs",
    "ArDrive provides a filesystem-like interface for Arweave data",
    "Crucial for user-friendly dApp experiences on the Permaweb",
  ],
};
