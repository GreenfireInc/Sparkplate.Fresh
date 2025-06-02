/**
 * Unstoppable Domains Service utilities
 *
 * @module uns
 * @description Methods for interacting with Unstoppable Domain Services
 * @see {@link https://github.com/unstoppabledomains/resolution|Resolution Docs}
 */

// import Resolution from '@unstoppabledomains/resolution';

// Initialize resolution with default provider
// const resolution = new Resolution();

/**
 * Resolves an Unstoppable Domain to an address for a given cryptocurrency
 *
 * @param {Object} params - Parameters object
 * @param {string} params.domain - Unstoppable domain name
 * @param {string} params.coinTicker - Cryptocurrency ticker
 * @returns {Promise<string>} Resolved address
 */
export async function getAddress({ 
  domain, 
  coinTicker 
}: { 
  domain: string; 
  coinTicker: string;
}): Promise<string> {
  try {
    // REMOVED: Unstoppable Domains resolution dependency
    // Using stub implementation instead
    throw new Error('Unstoppable Domains resolution temporarily unavailable');
    
    /*
    // Use the resolution library to get the address
    const address = await resolution.addr(domain, coinTicker.toUpperCase());
    
    if (!address) {
      throw new Error(`No ${coinTicker.toUpperCase()} address found for ${domain}`);
    }
    
    return address;
    */
  } catch (error: any) {
    // Handle specific resolution errors
    if (error.code === 'RECORD_NOT_FOUND') {
      throw new Error(`No ${coinTicker.toUpperCase()} address found for ${domain}`);
    } else if (error.code === 'UNSUPPORTED_DOMAIN') {
      throw new Error(`Domain ${domain} is not supported by Unstoppable Domains`);
    } else if (error.code === 'UNREGISTERED_DOMAIN') {
      throw new Error(`Domain ${domain} is not registered`);
    } else {
      throw new Error(`Failed to resolve ${domain}: ${error.message}`);
    }
  }
}

/**
 * UNS utilities object
 */
export const uns = {
  getAddress
};

/**
 * Default export for backward compatibility
 */
export default uns; 