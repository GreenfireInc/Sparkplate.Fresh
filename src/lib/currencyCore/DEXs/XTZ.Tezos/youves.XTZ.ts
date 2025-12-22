// Youves - Synthetic Asset Platform and DEX on Tezos
// Type: Synthetic Asset Platform
// Blockchain: Tezos (XTZ)

export const youvesDEX = {
  name: "Youves",
  blockchain: "Tezos (XTZ)",
  type: "Synthetic Asset Platform",
  description: "Decentralized platform for minting and trading synthetic assets (YOU tokens) collateralized by XTZ and other assets",
  
  url: "https://youves.com/",
  app: "https://app.youves.com/",
  docs: "https://docs.youves.com/",
  
  api: {
    restEndpoint: "https://api.youves.com",
    graphql: "https://api.youves.com/graphql",
    rpcEndpoint: "https://mainnet.api.tez.ie",
    documentation: "https://docs.youves.com/developers",
    rateLimit: "Public API available",
  },
  
  sdk: {
    npm: "@taquito/taquito",
    installation: "npm install @taquito/taquito @taquito/signer",
    documentation: "https://docs.youves.com/",
    github: "https://github.com/youves-com",
    features: [
      "Synthetic asset minting",
      "Collateralized vaults",
      "Unified stablecoin (uUSD)",
      "Governance with YOU token",
      "Savings rate",
    ],
  },
  
  integration: {
    example: `
// Youves Synthetic Asset Integration Example
import { TezosToolkit } from '@taquito/taquito';
import axios from 'axios';

const Tezos = new TezosToolkit('https://mainnet.api.tez.ie');
const YOUVES_API = 'https://api.youves.com';

// Get all synthetic assets
async function getAllSyntheticAssets() {
  try {
    const response = await axios.get(\`\${YOUVES_API}/assets\`);
    console.log(\`Found \${response.data.length} synthetic assets\`);
    return response.data;
  } catch (error) {
    console.error('Error fetching synthetic assets:', error);
    throw error;
  }
}

// Get asset price
async function getAssetPrice(assetSymbol: string) {
  try {
    const response = await axios.get(\`\${YOUVES_API}/assets/\${assetSymbol}/price\`);
    
    console.log(\`\${assetSymbol} Price: $\${response.data.priceUsd}\`);
    console.log(\`Collateralization Ratio: \${response.data.collateralizationRatio}%\`);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching asset price:', error);
    throw error;
  }
}

// Get vault statistics
async function getVaultStats(vaultAddress: string) {
  try {
    const response = await axios.get(\`\${YOUVES_API}/vaults/\${vaultAddress}\`);
    
    console.log('Vault Stats:', {
      collateral: response.data.collateral,
      debt: response.data.debt,
      collateralizationRatio: response.data.collateralizationRatio,
      liquidationPrice: response.data.liquidationPrice,
      stabilityFee: response.data.stabilityFee,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching vault stats:', error);
    throw error;
  }
}

// Get user vaults
async function getUserVaults(userAddress: string) {
  try {
    const response = await axios.get(\`\${YOUVES_API}/users/\${userAddress}/vaults\`);
    
    console.log(\`User has \${response.data.length} vaults\`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user vaults:', error);
    throw error;
  }
}

// Mint synthetic asset (create vault)
async function mintSyntheticAsset(
  engineAddress: string,
  collateralAmount: number,
  mintAmount: number
) {
  try {
    const contract = await Tezos.wallet.at(engineAddress);
    
    const operation = await contract.methods
      .mint(collateralAmount, mintAmount)
      .send({ amount: collateralAmount, mutez: false });
    
    await operation.confirmation();
    console.log('Synthetic asset minted:', operation.hash);
    return operation;
  } catch (error) {
    console.error('Error minting synthetic asset:', error);
    throw error;
  }
}

// Add collateral to vault
async function addCollateral(vaultId: number, collateralAmount: number) {
  try {
    const engineAddress = 'KT1...(engine_address)';
    const contract = await Tezos.wallet.at(engineAddress);
    
    const operation = await contract.methods
      .addCollateral(vaultId)
      .send({ amount: collateralAmount, mutez: false });
    
    await operation.confirmation();
    console.log('Collateral added:', operation.hash);
    return operation;
  } catch (error) {
    console.error('Error adding collateral:', error);
    throw error;
  }
}

// Burn synthetic asset (repay debt)
async function burnSyntheticAsset(vaultId: number, burnAmount: number) {
  try {
    const engineAddress = 'KT1...(engine_address)';
    const contract = await Tezos.wallet.at(engineAddress);
    
    const operation = await contract.methods
      .burn(vaultId, burnAmount)
      .send();
    
    await operation.confirmation();
    console.log('Synthetic asset burned:', operation.hash);
    return operation;
  } catch (error) {
    console.error('Error burning synthetic asset:', error);
    throw error;
  }
}

// Get liquidation data
async function getLiquidationData() {
  try {
    const response = await axios.get(\`\${YOUVES_API}/liquidations\`);
    
    console.log(\`Total liquidations: \${response.data.totalLiquidations}\`);
    console.log(\`Total liquidated value: $\${response.data.totalLiquidatedValue}\`);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching liquidation data:', error);
    throw error;
  }
}

// Get governance proposals
async function getGovernanceProposals() {
  try {
    const response = await axios.get(\`\${YOUVES_API}/governance/proposals\`);
    
    console.log(\`Active proposals: \${response.data.length}\`);
    return response.data;
  } catch (error) {
    console.error('Error fetching governance proposals:', error);
    throw error;
  }
}

// Vote on governance proposal
async function voteOnProposal(proposalId: number, support: boolean) {
  try {
    const governanceAddress = 'KT1...(governance_address)';
    const contract = await Tezos.wallet.at(governanceAddress);
    
    const operation = await contract.methods
      .vote(proposalId, support)
      .send();
    
    await operation.confirmation();
    console.log('Vote submitted:', operation.hash);
    return operation;
  } catch (error) {
    console.error('Error voting on proposal:', error);
    throw error;
  }
}

// Get uUSD savings rate
async function getSavingsRate() {
  try {
    const response = await axios.get(\`\${YOUVES_API}/savings-rate\`);
    
    console.log(\`Current uUSD Savings Rate: \${response.data.rate}%\`);
    return response.data;
  } catch (error) {
    console.error('Error fetching savings rate:', error);
    throw error;
  }
}

// Usage
getAllSyntheticAssets().then(assets => console.log(\`Total synthetic assets: \${assets.length}\`));
getAssetPrice('uUSD').then(price => console.log('uUSD price:', price));
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/youves_com",
    telegram: "https://t.me/youves",
    discord: "https://discord.gg/youves",
    medium: "https://youves.medium.com/",
    github: "https://github.com/youves-com",
  },
  
  features: {
    syntheticAssets: true,
    collateralizedVaults: true,
    governance: true,
    savingsRate: true,
    liquidation: true,
    multiCollateral: true,
    fa12Support: true,
    fa2Support: true,
  },
  
  fees: {
    mintingFee: "Varies by vault type (typically 0.5-2%)",
    stabilityFee: "Annual interest on minted assets (varies by vault)",
    liquidationPenalty: "12.5% of liquidated collateral",
    withdrawal: "Network fee only (~0.01-0.05 XTZ)",
  },
  
  contracts: {
    uUSDEngine: "KT1Xbx9pykNd38zag4yZvnuyGRGhh6L6aH",
    uBTCEngine: "KT1VjQoL5QvyZtm9m1voQKNTNcQLi5QiGsRZ",
    governance: "KT1GRSvLoikDsXujKgZPsGLX8k8Vvpd2e8bd",
  },
  
  notes: [
    "Leading synthetic asset platform on Tezos",
    "Unified stablecoin (uUSD) pegged to USD",
    "Collateralized by XTZ, tzBTC, and other assets",
    "Decentralized governance with YOU token",
    "Savings rate for uUSD holders",
    "Multiple vault types for different risk profiles",
    "Audited smart contracts",
    "Liquidation mechanism to maintain peg",
    "TVL: ~$5-10M as of October 2025",
  ],
  
  syntheticAssets: [
    {
      symbol: "uUSD",
      name: "Unified USD",
      peg: "USD",
      description: "Stablecoin collateralized by XTZ",
    },
    {
      symbol: "uBTC",
      name: "Unified Bitcoin",
      peg: "BTC",
      description: "Synthetic BTC collateralized by tzBTC",
    },
    {
      symbol: "uDEFI",
      name: "Unified DeFi Index",
      peg: "DeFi Index",
      description: "Synthetic DeFi index token",
    },
  ],
  
  tokenInfo: {
    governanceToken: "YOU",
    tokenContract: "KT1Xbx9pykNd38zag4yZvnuyGRGhh6L6aH",
    tokenSymbol: "YOU",
    tokenDecimals: 12,
  },
};

