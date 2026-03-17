/*
 * Contributors: Corey
 *
 * Description: Methods for resolving Unstoppable Domains
 * Resolution Docs: https://github.com/unstoppabledomains/resolution
 */

import Resolution from '@unstoppabledomains/resolution';

// Types for Unstoppable Domains resolution
interface ResolveAddressParams {
  domain: string;
  coinTicker: string;
}

interface UNSResolver {
  getAddress(params: ResolveAddressParams): Promise<string>;
  isUnstoppableDomain(domain: string): boolean;
  resolveDomainForAddress(address: string, coinTicker: string): Promise<string | null>;
}

// Supported Unstoppable Domains TLDs
const UNSTOPPABLE_TLDS = [
  '.crypto',
  '.nft',
  '.blockchain',
  '.bitcoin',
  '.coin',
  '.wallet',
  '.888',
  '.dao',
  '.x',
  '.zil'
];

// Initialize Resolution instance with Infura
const getResolution = (): Resolution => {
  const infuraKey = import.meta.env.VITE_INFURA_PROJECT_ID || '9aa3d95b3bc440fa88ea12eaa4456161';
  
  return Resolution.infura(infuraKey);
};

const unsResolver: UNSResolver = {
  async getAddress({ domain, coinTicker }: ResolveAddressParams): Promise<string> {
    try {
      const resolution = getResolution();
      
      // Check if domain is an Unstoppable Domain
      if (!this.isUnstoppableDomain(domain)) {
        throw new Error(`Domain ${domain} is not a valid Unstoppable Domain`);
      }

      // Normalize ticker to uppercase
      const ticker = coinTicker.toUpperCase();
      
      // Try to get the address for the specified cryptocurrency
      // First check if it's a token (ERC20, etc.)
      try {
        // Try multichain address resolution first
        const address = await resolution.multiChainAddr(domain, ticker, 'ERC20');
        if (address) {
          return address;
        }
      } catch (error) {
        // If ERC20 fails, try regular address resolution
        console.log(`Trying regular address resolution for ${ticker}...`);
      }
      
      // Fallback to regular address resolution
      const address = await resolution.addr(domain, ticker);
      
      if (!address) {
        throw new Error(`No ${ticker} address found for domain: ${domain}`);
      }

      return address;
    } catch (error) {
      console.error(`Unstoppable Domains resolution error for ${domain}:`, error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to resolve Unstoppable Domain ${domain}: ${errorMessage}`);
    }
  },

  // Helper method to check if a string looks like an Unstoppable Domain
  isUnstoppableDomain(domain: string): boolean {
    if (typeof domain !== 'string' || domain.length < 5) {
      return false;
    }

    return UNSTOPPABLE_TLDS.some(tld => domain.toLowerCase().endsWith(tld));
  },

  // Reverse lookup: Get Unstoppable Domain for an address (limited support)
  async resolveDomainForAddress(address: string, coinTicker: string): Promise<string | null> {
    try {
      console.log(`🔍 [UNS] Starting reverse lookup for ${coinTicker} address: ${address}`);
      const resolution = getResolution();
      const ticker = coinTicker.toUpperCase();
      
      // Note: Reverse resolution is limited in Unstoppable Domains
      // This is a placeholder for future functionality
      console.warn(`⚠️ [UNS] Reverse resolution for Unstoppable Domains is not fully supported yet`);
      console.log(`ℹ️ [UNS] Unstoppable Domains API does not support reverse lookup (address → domain)`);
      console.log(`ℹ️ [UNS] Only forward lookup (domain → address) is currently available`);
      
      return null;
    } catch (error) {
      console.error(`❌ [UNS] Reverse lookup error for ${address}:`, error);
      return null;
    }
  }
};

export default unsResolver;
export type { ResolveAddressParams, UNSResolver };
export { UNSTOPPABLE_TLDS };


