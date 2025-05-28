/**
 * Domain Name Services module
 *
 * @module domains
 * @description Exports all domain name services and provides methods for domain resolution
 */

import { ens } from './ens';
import { uns } from './uns';
import { tezosUtils as tezos } from './tezos';

/**
 * Interface for domain resolution result
 */
export interface DomainResolutionResult {
  address: string;
  service: string;
}

/**
 * Interface for domain resolver
 */
export interface DomainResolver {
  getAddress: (params: { 
    domain: string; 
    coinTicker: string; 
    network?: string;
  }) => Promise<string>;
}

/**
 * Type for service map
 */
type ServiceMap = {
  [key: string]: DomainResolver;
};

/**
 * Configure domain extension to service mappings
 *
 * @returns {Record<string, string>} Object mapping domain extensions to service names
 */
export function configExtensionServices(): Record<string, string> {
  // Create an object with key value pairs pointing to each domain service
  const services: Record<string, string> = {
    eth: 'ens',
    tez: 'tezos'
  };

  const unstoppabledomains = [
    'x',
    'crypto',
    'coin',
    'wallet',
    'bitcoin',
    '888',
    'nft',
    'dao',
    'zil',
    'blockchain'
  ];

  unstoppabledomains.forEach((ext) => {
    services[ext] = 'uns';
  });

  return services;
}

/**
 * Resolves a domain name to a cryptocurrency address
 *
 * @param {Object} params - Parameters object
 * @param {string} params.domain - Domain name to resolve
 * @param {string} params.coinTicker - Cryptocurrency ticker
 * @param {string} params.network - Blockchain network (for ENS)
 * @returns {Promise<DomainResolutionResult>} Object containing resolved address and service used
 */
export async function resolveAddress({ 
  domain, 
  coinTicker, 
  network 
}: { 
  domain: string; 
  coinTicker: string; 
  network?: string;
}): Promise<DomainResolutionResult> {
  // Get domain extension to determine what resolution service to use
  const domainExtension = domain.split('.').slice(-1)[0];
  let domainService = services[domainExtension];

  // If extension is not registered with a service, use ENS
  if (!domainService) domainService = 'ens';

  const serviceMap: ServiceMap = {
    ens,
    uns,
    tezos
  };

  // Make sure the service exists
  if (!serviceMap[domainService]) {
    throw new Error(`Domain service ${domainService} not supported`);
  }

  const address = await serviceMap[domainService].getAddress({
    domain,
    coinTicker,
    network
  });

  return { address, service: domainService };
}

/**
 * Domain extension to service mapping
 */
export const services = configExtensionServices();

/**
 * Domain services object with all available resolvers
 */
export const domains = {
  ens,
  uns,
  tezos,
  services,
  resolveAddress
};

/**
 * Default export for backward compatibility
 */
export default domains; 