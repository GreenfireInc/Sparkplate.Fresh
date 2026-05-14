// ArSwap - Swap Protocol for Arweave
// Type: Swap Protocol
// Blockchain: Arweave (AR)

export const arswapDEX = {
  name: "ArSwap",
  blockchain: "Arweave (AR)",
  type: "Swap Protocol",
  description: "A swap protocol facilitating token exchanges within the Arweave ecosystem. Currently in early/alpha stages.",
  
  url: "https://arswap.org/",
  
  features: {
    swap: true,
    liquidity: true,
    alpha: true,
  },
  
  integration: {
    note: "As an alpha project, public API documentation and SDKs may be limited. Integration typically involves direct contract interaction or future SDK releases."
  },
  
  notes: [
    "Early stage project (Alpha)",
    "Focuses on Arweave ecosystem token swaps",
  ],
};
