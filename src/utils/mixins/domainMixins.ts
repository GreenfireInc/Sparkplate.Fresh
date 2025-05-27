/**
 * Domain mixins module
 *
 * @module domainMixins
 * @description Domain resolution methods for usage in Vue components
 */

import { domains, type DomainResolutionResult } from '../domains/index';

/**
 * Domain resolution methods
 */
export const domainMethods = {
  /**
   * Check if a string is a valid domain name
   *
   * @param {string} name - String to check
   * @returns {boolean} True if string is a valid domain
   */
  isDomain(name: string): boolean {
    const domainReg = /.+\..+/;
    return domainReg.test(name);
  },

  /**
   * Resolve a cryptocurrency address from a domain name
   *
   * @param {Object} params - Parameters object
   * @param {string} params.domain - Domain name to resolve
   * @param {string} params.coinTicker - Cryptocurrency ticker
   * @param {string} params.network - Ethereum network name
   * @returns {Promise<DomainResolutionResult>} Resolved address and service information
   */
  async resolveAddressFromDomain({ 
    domain, 
    coinTicker,
    network
  }: { 
    domain: string; 
    coinTicker: string;
    network?: string;
  }): Promise<DomainResolutionResult> {
    const result = await domains.resolveAddress({ domain, coinTicker, network });
    return result;
  }
};

/**
 * Domain mixins object with methods
 */
export const domainMixins = {
  ...domainMethods
};

/**
 * Default export for backward compatibility
 */
export default domainMixins; 