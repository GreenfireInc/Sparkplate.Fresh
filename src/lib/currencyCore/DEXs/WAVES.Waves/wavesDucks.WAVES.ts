// Waves Ducks - NFT/Gaming DEX on Waves
// Type: NFT Marketplace with Token Swaps
// Blockchain: Waves (WAVES)

export const wavesDucksDEX = {
  name: "Waves Ducks",
  blockchain: "Waves (WAVES)",
  type: "NFT/Gaming DEX",
  description: "NFT-focused marketplace with integrated token swaps, breeding mechanics, and gaming elements on Waves",
  
  url: "https://wavesducks.com/",
  app: "https://wavesducks.com/",
  docs: "https://docs.wavesducks.com/",
  
  api: {
    restEndpoint: "https://api.wavesducks.com/v1",
    nodeEndpoint: "https://nodes.wavesnodes.com",
    dappAddress: "3PDVuU45H7Eh5dmtNbnRNRStGwULA7NY6Hb", // Waves Ducks dApp
    nftEndpoint: "https://nft.wavesducks.com/",
    documentation: "https://docs.wavesducks.com/",
    rateLimit: "Public endpoints available",
    authentication: "None required for public data",
  },
  
  sdk: {
    npm: "@waves/signer, @waves/waves-transactions",
    installation: "npm install @waves/signer @waves/waves-transactions",
    documentation: "https://docs.wavesducks.com/integration",
    features: [
      "NFT trading",
      "Duck breeding",
      "Token swaps",
      "Farm earnings",
      "Incubator access",
    ],
  },
  
  integration: {
    example: `
// Waves Ducks Integration Example
import { invokeScript, issue } from '@waves/waves-transactions';
import { Signer } from '@waves/signer';
import fetch from 'node-fetch';

const DUCKS_DAPP = '3PDVuU45H7Eh5dmtNbnRNRStGwULA7NY6Hb';
const DUCKS_API = 'https://api.wavesducks.com/v1';
const NODE_URL = 'https://nodes.wavesnodes.com';

// Get EGG token price
async function getEGGPrice() {
  const response = await fetch(\`\${DUCKS_API}/price/egg\`);
  const price = await response.json();
  
  console.log('EGG Token Price:', price);
  return price;
}`,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/WavesDucks",
    telegram: "https://t.me/waves_ducks",
    discord: "https://discord.gg/wavesducks",
    medium: "https://wavesducks.medium.com/",
  },
  
  features: {
    nft_marketplace: true,
    nft_breeding: true,
    play_to_earn: true,
    token_farming: true,
    token_swap: true,
    gamification: true,
    rarity_system: true,
    incubator: true,
  },
  
  fees: {
    marketplace: "2.5% on NFT sales",
    breeding: "100 EGG tokens per breed",
    farming: "Free",
    swap: "0.5% on token swaps",
  },
  
  notes: [
    "First play-to-earn NFT game on Waves",
    "EGG token used for breeding and governance",
    "Ducks generate passive income through farming",
    "Rarity system based on genes and generation",
    "Integrated marketplace for duck trading",
    "Incubator for hatching new ducks",
    "Community-driven governance",
    "Cross-platform with SignArt",
  ],
};
