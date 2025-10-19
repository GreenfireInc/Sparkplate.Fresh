/*
 * Contributors: Corey
 *
 * Description: Methods for resolving Ethereum Name Service (ENS) domains
 * to Ethereum addresses
 */

import { ethers } from 'ethers';

// Types for ENS resolution
interface ResolveAddressParams {
  domain: string;
  coinTicker: string;
}

interface ENSResolver {
  getAddress(params: ResolveAddressParams): Promise<string>;
  isEnsDomain(domain: string): boolean;
  isValidEthereumAddress(address: string): boolean;
  resolveDomainForAddress(address: string): Promise<string | null>;
}

// Create a provider for ENS resolution
const getProvider = (): ethers.Provider | null => {
  // Only enable ENS resolution if user has provided their own API key
  if (import.meta.env.VITE_INFURA_PROJECT_ID) {
    console.log('🔑 [ENS] Using custom Infura key');
    return new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_PROJECT_ID}`);
  }
  
  if (import.meta.env.VITE_ALCHEMY_API_KEY) {
    console.log('🔑 [ENS] Using custom Alchemy key');
    return new ethers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_API_KEY}`);
  }
  
  // No API keys configured - domain resolution disabled
  console.warn('⚠️ [ENS] No API keys configured. ENS resolution disabled.');
  console.warn('⚠️ [ENS] Set VITE_INFURA_PROJECT_ID or VITE_ALCHEMY_API_KEY in .env to enable.');
  return null;
};

const ensResolver: ENSResolver = {
  async getAddress({ domain, coinTicker }: ResolveAddressParams): Promise<string> {
    // ENS only supports Ethereum addresses
    if (coinTicker.toLowerCase() !== 'eth') {
      throw new Error(`ENS resolution only supports Ethereum addresses, not ${coinTicker}`);
    }

    try {
      const provider = getProvider();
      
      // Resolve the ENS domain to an Ethereum address
      const address = await provider.resolveName(domain);

      if (!address) {
        throw new Error(`No Ethereum address found for ENS domain: ${domain}`);
      }

      return address;
    } catch (error) {
      console.error(`ENS resolution error for ${domain}:`, error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to resolve ENS domain ${domain}: ${errorMessage}`);
    }
  },

  // Helper method to check if a string looks like an ENS domain
  isEnsDomain(domain: string): boolean {
    return typeof domain === 'string' &&
           domain.endsWith('.eth') &&
           domain.length > 4; // minimum .eth length
  },

  // Helper method to validate if an address is a valid Ethereum address
  isValidEthereumAddress(address: string): boolean {
    return ethers.isAddress(address);
  },

  // Reverse lookup: Get ENS domain for an Ethereum address
  async resolveDomainForAddress(address: string): Promise<string | null> {
    try {
      console.log(`🔍 [ENS] Starting reverse lookup for address: ${address}`);
      
      if (!ethers.isAddress(address)) {
        console.warn(`⚠️ [ENS] Invalid Ethereum address format: ${address}`);
        throw new Error('Invalid Ethereum address');
      }

      // Normalize address to checksummed format
      const checksummedAddress = ethers.getAddress(address);
      console.log(`🔍 [ENS] Checksummed address: ${checksummedAddress}`);

      const provider = getProvider();
      
      // If no provider (no API keys configured), skip resolution
      if (!provider) {
        console.log(`ℹ️ [ENS] Skipping resolution - no API keys configured`);
        return null;
      }
      
      console.log(`🔗 [ENS] Provider initialized, performing lookupAddress...`);
      
      // Perform reverse lookup with checksummed address (with 10 second timeout)
      const domainPromise = provider.lookupAddress(checksummedAddress);
      const timeoutPromise = new Promise<null>((resolve) => 
        setTimeout(() => {
          console.warn(`⏱️ [ENS] Lookup timed out after 10 seconds`);
          resolve(null);
        }, 10000)
      );
      
      const domain = await Promise.race([domainPromise, timeoutPromise]);
      
      if (domain) {
        console.log(`✅ [ENS] Successfully resolved domain: ${domain}`);
      } else {
        console.log(`ℹ️ [ENS] No domain found for address: ${checksummedAddress}`);
      }

      return domain;
    } catch (error) {
      console.error(`❌ [ENS] Reverse lookup error for ${address}:`, error);
      if (error instanceof Error) {
        console.error(`❌ [ENS] Error message: ${error.message}`);
        console.error(`❌ [ENS] Error stack:`, error.stack);
      }
      return null;
    }
  }
};

export default ensResolver;
export type { ResolveAddressParams, ENSResolver };



