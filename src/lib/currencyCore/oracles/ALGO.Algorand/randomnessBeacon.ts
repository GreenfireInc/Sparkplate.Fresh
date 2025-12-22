// Algorand Randomness Beacon - Official VRF-based Randomness Oracle
// Type: Verifiable Random Function (VRF) Oracle
// Blockchain: Algorand (ALGO)

export const randomnessBeaconOracle = {
  name: "Algorand Randomness Beacon",
  blockchain: "Algorand (ALGO)",
  type: "Verifiable Random Function (VRF) Oracle",
  description: "Official randomness service for Algorand providing verifiable randomness via VRF (Verifiable Random Function). Essential for lotteries, NFT generation, gaming, and fair selection mechanisms. Maintained by Applied Blockchain and the Algorand Foundation.",
  
  url: "https://algorand.co/learn/what-is-an-oracle-in-blockchain",
  announcement: "https://algorand.co/blog/randomness-has-arrived",
  docs: "https://developer.algorand.org/articles/usage-and-best-practices-for-randomness-beacon/",
  
  api: {
    mainnetAppId: 1615566206,
    testnetAppId: 600011887,
    methods: {
      get: "get(uint64 round, byte[] user_data) → byte[]",
      mustGet: "must_get(uint64 round, byte[] user_data) → byte[]",
    },
    documentation: "https://developer.algorand.org/articles/usage-and-best-practices-for-randomness-beacon/",
    bestPractices: "https://developer.algorand.org/articles/usage-and-best-practices-for-randomness-beacon/",
  },
  
  sdk: {
    npm: "algosdk",
    installation: "npm install algosdk",
    avmVersion: "AVM version 7+ (supports block and vrf_verify opcodes)",
    documentation: "https://developer.algorand.org/articles/randomness-on-algorand/",
    github: "https://github.com/algorand",
  },
  
  integration: {
    example: `
// Algorand Randomness Beacon Integration
import algosdk from "algosdk";

const algodClient = new algosdk.Algodv2("", "https://mainnet-api.algonode.cloud", 443);

// Randomness Beacon App IDs
const BEACON_APP_ID = {
  mainnet: 1615566206,
  testnet: 600011887,
};

// Method 1: Request randomness from beacon (basic pattern)
async function getRandomnessFromBeacon(
  senderAccount: algosdk.Account,
  targetRound: number,
  userData: Uint8Array = new Uint8Array(0)
) {
  try {
    const suggestedParams = await algodClient.getTransactionParams().do();
    
    // Call beacon's "get" method
    const appArgs = [
      new Uint8Array(Buffer.from("get")),
      algosdk.encodeUint64(targetRound),
      userData,
    ];

    const txn = algosdk.makeApplicationCallTxnFromObject({
      from: senderAccount.addr,
      appIndex: BEACON_APP_ID.mainnet,
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      appArgs,
      suggestedParams,
    });

    const signedTxn = txn.signTxn(senderAccount.sk);
    const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
    const confirmed = await algosdk.waitForConfirmation(algodClient, txId, 4);

    // The randomness is returned in the transaction logs
    const logs = confirmed["logs"] || [];
    if (logs.length > 0) {
      const randomness = logs[0];
      console.log("Random value (base64):", randomness);
      console.log("Random value (hex):", Buffer.from(randomness, "base64").toString("hex"));
      return Buffer.from(randomness, "base64");
    }

    return null;
  } catch (error) {
    console.error("Error getting randomness from beacon:", error);
    throw error;
  }
}

// Method 2: Use "must_get" for guaranteed randomness (fails if not available)
async function mustGetRandomness(
  senderAccount: algosdk.Account,
  targetRound: number,
  userData: Uint8Array = new Uint8Array(0)
) {
  try {
    const suggestedParams = await algodClient.getTransactionParams().do();
    
    const appArgs = [
      new Uint8Array(Buffer.from("must_get")),
      algosdk.encodeUint64(targetRound),
      userData,
    ];

    const txn = algosdk.makeApplicationCallTxnFromObject({
      from: senderAccount.addr,
      appIndex: BEACON_APP_ID.mainnet,
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      appArgs,
      suggestedParams,
    });

    const signedTxn = txn.signTxn(senderAccount.sk);
    const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
    const confirmed = await algosdk.waitForConfirmation(algodClient, txId, 4);

    const logs = confirmed["logs"] || [];
    if (logs.length > 0) {
      return Buffer.from(logs[0], "base64");
    }

    throw new Error("Randomness not available");
  } catch (error) {
    console.error("Error using must_get for randomness:", error);
    throw error;
  }
}

// Method 3: Best practice pattern with commit-reveal
async function commitRevealRandomness(
  senderAccount: algosdk.Account,
  commitData: Uint8Array
) {
  try {
    // Step 1: Commit to a future round
    const status = await algodClient.status().do();
    const currentRound = status["last-round"];
    const commitRound = currentRound;
    const revealRound = commitRound + 10; // Wait 10 rounds before revealing

    console.log(\`Committing at round \${commitRound}, will reveal at round \${revealRound}\`);

    // Step 2: Store commitment on-chain (in your contract)
    // This would be done via your application's smart contract

    // Step 3: Wait for reveal round
    console.log("Waiting for reveal round...");
    while (true) {
      const currentStatus = await algodClient.status().do();
      const current = currentStatus["last-round"];
      if (current >= revealRound) {
        break;
      }
      await new Promise(resolve => setTimeout(resolve, 4000)); // Wait ~4 seconds per round
    }

    // Step 4: Get randomness for the committed round
    const randomness = await getRandomnessFromBeacon(
      senderAccount,
      revealRound,
      commitData
    );

    console.log("Revealed randomness:", randomness);
    return {
      commitRound,
      revealRound,
      randomness,
    };
  } catch (error) {
    console.error("Error in commit-reveal randomness:", error);
    throw error;
  }
}

// Method 4: Generate random number from beacon output
function generateRandomNumber(
  randomnessBytes: Buffer,
  min: number,
  max: number
): number {
  // Convert bytes to BigInt, then to number in range
  const randomBigInt = BigInt(\`0x\${randomnessBytes.toString("hex")}\`);
  const range = BigInt(max - min + 1);
  const randomInRange = Number(randomBigInt % range) + min;
  
  return randomInRange;
}

// Method 5: Select random winner from list
async function selectRandomWinner(
  senderAccount: algosdk.Account,
  participants: string[],
  revealRound: number
) {
  try {
    const userData = new Uint8Array(Buffer.from("lottery"));
    const randomness = await getRandomnessFromBeacon(
      senderAccount,
      revealRound,
      userData
    );

    if (!randomness) {
      throw new Error("Randomness not available");
    }

    const randomIndex = generateRandomNumber(
      randomness,
      0,
      participants.length - 1
    );

    const winner = participants[randomIndex];
    console.log(\`Winner selected: \${winner} (index \${randomIndex})\`);

    return {
      winner,
      index: randomIndex,
      randomness: randomness.toString("hex"),
    };
  } catch (error) {
    console.error("Error selecting random winner:", error);
    throw error;
  }
}

// Usage examples
// const myAccount = algosdk.mnemonicToSecretKey("your mnemonic here");
// getRandomnessFromBeacon(myAccount, 12345678, new Uint8Array(Buffer.from("my_data")));
// commitRevealRandomness(myAccount, new Uint8Array(Buffer.from("lottery_commit")));
// selectRandomWinner(myAccount, ["Alice", "Bob", "Charlie", "Dave"], 12345700);
    `,
  },
  
  socialMedia: {
    algorandFoundation: "https://algorand.foundation/",
    algorandBlog: "https://algorand.co/blog",
    appliedBlockchain: "https://www.appliedblockchain.com/projects/algorand",
    developerPortal: "https://developer.algorand.org/",
  },
  
  features: {
    verifiableRandomness: true,
    vrfBased: true,
    tamperProof: true,
    unpredictable: true,
    officialService: true,
    periodicUpdates: true,
    onChainVerification: true,
  },
  
  supportedData: [
    "Verifiable random numbers",
    "VRF proofs for verification",
    "Unpredictable pseudo-random values",
  ],
  
  serviceDetails: {
    operator: "Applied Blockchain (in partnership with Algorand Foundation)",
    launchDate: "November 2022 (MainNet)",
    updateFrequency: "Every few rounds (periodic VRF proof posting)",
    verification: "On-chain VRF proof verification via vrf_verify opcode",
  },
  
  algorandIntegration: {
    method: "ABI method calls to beacon smart contract",
    avmVersion: "Requires AVM version 7+ (for block and vrf_verify opcodes)",
    appIds: {
      mainnet: 1615566206,
      testnet: 600011887,
    },
    methods: {
      get: {
        signature: "get(uint64 round, byte[] user_data) → byte[]",
        description: "Get randomness for a specific round (returns empty if not available)",
      },
      mustGet: {
        signature: "must_get(uint64 round, byte[] user_data) → byte[]",
        description: "Get randomness or fail if not available",
      },
    },
    benefits: [
      "Official Algorand randomness service",
      "Verifiable via VRF proofs",
      "Tamper-proof and unpredictable",
      "Essential for fair lotteries and gaming",
      "On-chain verification available",
      "Periodic updates ensure availability",
    ],
    bestFor: [
      "Lotteries and raffles",
      "NFT generation and minting",
      "Gaming applications",
      "Fair selection mechanisms",
      "Random airdrops",
      "Provably fair protocols",
    ],
  },
  
  bestPractices: [
    "Commit to a future round before requesting randomness",
    "Wait enough rounds for VRF proof to be submitted (typically 3-5 rounds)",
    "Use user_data parameter to bind randomness to specific application context",
    "Check for staleness - don't use very old randomness",
    "Use must_get when you need guaranteed availability (will fail if not ready)",
    "Implement commit-reveal pattern for maximum security",
    "Store commitment on-chain before revealing",
    "Handle case where randomness is not yet available for a round",
  ],
  
  notes: [
    "Official randomness beacon for Algorand blockchain",
    "Launched on MainNet in November 2022",
    "Provides verifiable randomness via VRF (Verifiable Random Function)",
    "Smart contracts can verify VRF proofs using vrf_verify opcode",
    "Beacon publishes VRF proofs every few rounds",
    "Two methods: get() and must_get()",
    "get() returns empty if randomness not available yet",
    "must_get() fails transaction if randomness not available",
    "Best practice: commit to future round, wait, then reveal",
    "Essential for lotteries, NFTs, games requiring provably fair randomness",
  ],
  
  useCases: [
    "Lottery and raffle systems",
    "NFT random generation and minting",
    "Gaming applications (dice rolls, card shuffling)",
    "Fair selection and winner picking",
    "Random airdrop distribution",
    "Provably fair gambling",
    "Random assignment systems",
    "Generative art with random attributes",
  ],
  
  security: {
    vrfBased: true,
    verifiable: "On-chain VRF proof verification",
    unpredictable: "Cannot be predicted in advance",
    tamperProof: "Cannot be manipulated after commitment",
    cryptographic: "Based on cryptographic VRF functions",
  },
  
  resources: {
    announcement: "https://algorand.co/blog/randomness-has-arrived",
    usageGuide: "https://developer.algorand.org/articles/usage-and-best-practices-for-randomness-beacon/",
    randomnessArticle: "https://developer.algorand.org/articles/randomness-on-algorand/",
    appliedBlockchain: "https://www.appliedblockchain.com/projects/algorand",
    developerPortal: "https://developer.algorand.org/",
  },
  
  timing: {
    commitmentRequired: true,
    minimumWaitRounds: 3,
    recommendedWaitRounds: "5-10 rounds for safety",
    proofAvailability: "VRF proof posted within a few rounds",
    staleness: "Don't use randomness from very old rounds",
  },
};

