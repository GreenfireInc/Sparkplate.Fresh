/**
 * Ethereum Name Service utilities
 *
 * @module ens
 * @description Methods for interacting with ENS services
 * @see {@link https://github.com/ensdomains/ensjs|ENSJS Docs}
 */

import { ethers } from 'ethers';

/**
 * Resolves an ENS domain to an address for a given cryptocurrency
 *
 * @param {Object} params - Parameters object
 * @param {string} params.domain - ENS domain name
 * @param {string} params.coinTicker - Cryptocurrency ticker
 * @param {string} params.network - Ethereum network name
 * @returns {Promise<string>} Resolved address
 * @throws {Error} If no address is found for the domain
 */
export async function getAddress({ 
  domain, 
  coinTicker, 
  network = 'mainnet' 
}: { 
  domain: string; 
  coinTicker: string; 
  network?: string;
}): Promise<string> {
  try {
    // Create provider for the specified network
    let provider: ethers.Provider;
    
    if (network === 'mainnet') {
      // Use a public provider for mainnet
      provider = new ethers.CloudflareProvider();
    } else {
      // For other networks, use the default provider
      provider = ethers.getDefaultProvider(network);
    }
    
    // For now, we'll resolve to ETH address for all coin types
    // This is a simplified implementation - in production you'd want to use
    // the full ENS library with proper coin type support
    const address = await provider.resolveName(domain);
    
    if (!address) {
      throw new Error(`No address found for ${domain}`);
    }
    
    // Note: This returns the ETH address for all coin types
    // In a full implementation, you would need to query specific coin type records
    if (coinTicker.toLowerCase() !== 'eth') {
      console.warn(`ENS resolution for ${coinTicker} not fully implemented, returning ETH address`);
    }
    
    return address;
    
  } catch (error: any) {
    if (error.message.includes('ENS name not configured') || error.message.includes('resolver or addr is not configured')) {
      throw new Error(`Domain ${domain} is not configured in ENS`);
    } else if (error.message.includes('network does not support ENS')) {
      throw new Error(`Network ${network} does not support ENS`);
    } else if (error.message.includes('invalid ENS name')) {
      throw new Error(`Invalid ENS domain: ${domain}`);
    } else {
      throw new Error(`Failed to resolve ${domain}: ${error.message}`);
    }
  }
}

/**
 * ENS utilities object
 */
export const ens = {
  getAddress
};

/**
 * Default export for backward compatibility
 */
export default ens; 