/**
 * Tezos Domains Service utilities (Production Implementation)
 *
 * @module tezosDomains
 * @description Production methods for interacting with Tezos domains using Taquito client
 * @contributors Aciel Ochoa
 */

import { TezosToolkit } from '@taquito/taquito';
import { TaquitoTezosDomainsClient } from '@tezos-domains/taquito-client';

// Create Tezos toolkit instance
const tezos = new TezosToolkit('https://mainnet.smartpy.io');

// Create Tezos Domains client
const client = new TaquitoTezosDomainsClient({
  tezos,
  network: 'mainnet',
  caching: { enabled: true }
});

/**
 * Resolves a Tezos domain to an address for a given cryptocurrency
 *
 * @param {Object} params - Parameters object
 * @param {string} params.domain - Tezos domain name
 * @param {string} params.coinTicker - Cryptocurrency ticker
 * @returns {Promise<string>} Resolved address
 * @throws {Error} If coin ticker is not supported for .tez domains
 */
export async function getAddress({ 
  domain, 
  coinTicker 
}: { 
  domain: string; 
  coinTicker: string;
}): Promise<string> {
  // Throw Error for coins other than tezos
  if (coinTicker.toLowerCase() !== 'xtz') {
    throw new Error(`${coinTicker} not supported for .tez domains`);
  }
  
  try {
    // Resolve address using Taquito Tezos Domains client
    const address = await client.resolver.resolveNameToAddress(domain);
    
    if (!address) {
      throw new Error(`No address found for domain ${domain}`);
    }
    
    return address;
  } catch (error: any) {
    // Handle specific Tezos Domains errors
    if (error.message?.includes('not found') || error.message?.includes('does not exist')) {
      throw new Error(`Domain ${domain} not found or not registered`);
    }
    
    // Re-throw other errors
    throw new Error(`Failed to resolve ${domain}: ${error.message}`);
  }
}

/**
 * Tezos domains utilities object (Production)
 */
export const tezosDomainsProduction = {
  getAddress
};

/**
 * Default export for backward compatibility
 */
export default tezosDomainsProduction; 