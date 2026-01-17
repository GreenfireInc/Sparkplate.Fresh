// Proof of Existence Oracle for Bitcoin (BTC)
// Data Timestamping and Verification Service

export const proofOfExistenceOracle = {
  name: "Proof of Existence",
  blockchain: "Bitcoin (BTC)",
  type: "Timestamping Oracle",
  description: "Proof of Existence uses Bitcoin's blockchain for data timestamping and verification. Any data can be hashed and the hash stored on Bitcoin's blockchain, providing cryptographic proof that the data existed at a specific time. Leverages Bitcoin's immutability and security for data integrity.",
  url: "https://proofofexistence.com/",
  docs: "https://proofofexistence.com/about",
  api: {
    register: "POST https://api.proofofexistence.com/v1/register",
    verify: "GET https://api.proofofexistence.com/v1/proof/{digest}",
    documentation: "https://proofofexistence.com/developers",
  },
  features: [
    "SHA-256 hash registration on Bitcoin",
    "Cryptographic proof of existence",
    "Timestamp verification",
    "Document certification",
    "Data integrity validation",
    "Immutable blockchain anchoring",
    "Global accessibility",
    "Low-cost timestamping",
    "No data storage (hash only)",
    "Privacy-preserving",
  ],
  useCases: [
    "Document verification and notarization",
    "Copyright protection",
    "Data integrity proofs",
    "Legal evidence timestamping",
    "Academic credential verification",
    "Supply chain tracking",
    "Intellectual property protection",
    "Contract signing validation",
    "Medical record verification",
    "Audit trail creation",
  ],
  integrationMethod: "REST API / Bitcoin OP_RETURN transactions",
  dataFrequency: "On-demand registration, permanent verification",
  pricing: "Small Bitcoin transaction fee for registration",
  coverage: "Universal - any data can be timestamped",
  howItWorks: {
    registration: [
      "User provides document or data",
      "SHA-256 hash is computed",
      "Hash is embedded in Bitcoin transaction (OP_RETURN)",
      "Transaction is broadcast to Bitcoin network",
      "Blockchain confirmation provides timestamp",
    ],
    verification: [
      "User provides document and claimed digest",
      "Hash is computed and compared",
      "Blockchain is queried for matching transaction",
      "Timestamp and block height are returned",
      "Verification status confirmed",
    ],
  },
  technicalDetails: {
    hashAlgorithm: "SHA-256",
    storage: "Bitcoin OP_RETURN (80 bytes max)",
    confirmation: "Bitcoin block confirmation (~10 minutes)",
    immutability: "Protected by Bitcoin's proof-of-work",
  },
  socialMedia: {
    twitter: "https://twitter.com/ManuelAraoz",
    github: "https://github.com/maraoz/proofofexistence",
  },
  integrationNotes: "Use SHA-256 to hash documents, then POST to registration endpoint. For verification, query blockchain with digest. Minimal Bitcoin transaction fee required. Alternative: use bitcoinjs-lib to create custom OP_RETURN transactions.",
  npmPackages: [
    "bitcoinjs-lib",
    "crypto (Node.js native)",
  ],
  sampleEndpoints: [
    "POST /v1/register { digest: 'sha256_hash' }",
    "GET /v1/proof/{digest}",
  ],
  alternatives: [
    "OpenTimestamps (more advanced timestamping)",
    "Custom OP_RETURN implementations",
    "Chainpoint (multi-chain timestamping)",
  ],
};

