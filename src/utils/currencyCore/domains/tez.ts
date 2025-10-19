/*
 * Contributors: Corey
 *
 * Description: Methods for resolving Tezos Domains (.tez)
 * Based on: tezosDomains.js reference implementation
 * Docs: https://docs.tezos.domains/
 */

// Types for Tezos Domains resolution
interface ResolveAddressParams {
  domain: string;
  coinTicker: string;
}

interface TezosDomainsResolver {
  getAddress(params: ResolveAddressParams): Promise<string>;
  isTezosDomain(domain: string): boolean;
  resolveDomainForAddress(address: string): Promise<string | null>;
}

// Supported Tezos Domains TLDs
const TEZOS_TLDS = ['.tez'];

const tezosDomainsResolver: TezosDomainsResolver = {
  async getAddress({ domain, coinTicker }: ResolveAddressParams): Promise<string> {
    try {
      console.log(`🔍 [Tezos Domains] Resolving domain: ${domain} for ${coinTicker}`);
      
      // Tezos Domains only supports XTZ addresses
      if (coinTicker.toLowerCase() !== 'xtz') {
        throw new Error(`Tezos Domains only supports XTZ addresses, not ${coinTicker}`);
      }

      // Check if domain is a valid Tezos domain
      if (!this.isTezosDomain(domain)) {
        throw new Error(`Domain ${domain} is not a valid Tezos domain`);
      }

      // Dynamically import Tezos dependencies
      const { TezosToolkit } = await import('@taquito/taquito');
      const { TaquitoTezosDomainsClient } = await import('@tezos-domains/taquito-client');
      const { Tzip16Module } = await import('@taquito/tzip16');

      console.log('🔧 [Tezos Domains] Initializing Taquito client...');

      // Create Tezos toolkit instance with CORS-enabled RPC endpoint
      // Using public RPC that supports CORS from browser
      const tezos = new TezosToolkit('https://mainnet.smartpy.io');
      
      // Add TZIP-16 extension for metadata support
      tezos.addExtension(new Tzip16Module());

      console.log('🔧 [Tezos Domains] Creating Tezos Domains client...');

      // Create Tezos Domains client
      const client = new TaquitoTezosDomainsClient({
        tezos,
        network: 'mainnet',
        caching: { enabled: true }
      });

      console.log(`🔍 [Tezos Domains] Resolving ${domain} to address...`);

      // Resolve domain to address
      const address = await client.resolver.resolveNameToAddress(domain);

      if (!address) {
        throw new Error(`No address found for Tezos domain: ${domain}`);
      }

      console.log(`✅ [Tezos Domains] Successfully resolved: ${domain} → ${address}`);
      return address;
    } catch (error) {
      console.error(`❌ [Tezos Domains] Resolution error for ${domain}:`, error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to resolve Tezos domain ${domain}: ${errorMessage}`);
    }
  },

  // Helper method to check if a string looks like a Tezos domain
  isTezosDomain(domain: string): boolean {
    if (typeof domain !== 'string' || domain.length < 5) {
      return false;
    }

    return TEZOS_TLDS.some(tld => domain.toLowerCase().endsWith(tld));
  },

  // Reverse lookup: Get Tezos domain for an address
  async resolveDomainForAddress(address: string): Promise<string | null> {
    try {
      console.log(`🔍 [Tezos Domains] Starting reverse lookup for address: ${address}`);

      // Validate Tezos address format (tz1, tz2, tz3, or KT1)
      if (!address.match(/^(tz1|tz2|tz3|KT1)[a-zA-Z0-9]{33}$/)) {
        console.warn(`⚠️ [Tezos Domains] Invalid Tezos address format: ${address}`);
        return null;
      }

      // Dynamically import Tezos dependencies
      const { TezosToolkit } = await import('@taquito/taquito');
      const { TaquitoTezosDomainsClient } = await import('@tezos-domains/taquito-client');
      const { Tzip16Module } = await import('@taquito/tzip16');

      console.log('🔧 [Tezos Domains] Initializing Taquito client for reverse lookup...');

      // Create Tezos toolkit instance with CORS-enabled RPC endpoint
      // Using public RPC that supports CORS from browser
      const tezos = new TezosToolkit('https://mainnet.smartpy.io');
      
      // Add TZIP-16 extension for metadata support
      tezos.addExtension(new Tzip16Module());

      console.log('🔧 [Tezos Domains] Creating Tezos Domains client...');

      // Create Tezos Domains client
      const client = new TaquitoTezosDomainsClient({
        tezos,
        network: 'mainnet',
        caching: { enabled: true }
      });

      console.log(`🔍 [Tezos Domains] Performing reverse lookup for ${address}...`);

      // Perform reverse lookup (address to domain)
      // Note: resolveAddressToName returns the primary/default domain for an address
      const domain = await client.resolver.resolveAddressToName(address);

      if (domain) {
        console.log(`✅ [Tezos Domains] Successfully resolved: ${address} → ${domain}`);
        console.log(`ℹ️ [Tezos Domains] Note: If multiple domains exist, this is the primary domain`);
        return domain;
      } else {
        console.log(`ℹ️ [Tezos Domains] No domain found for address: ${address}`);
        console.log(`ℹ️ [Tezos Domains] This address may not have set a reverse record`);
        return null;
      }
    } catch (error) {
      console.error(`❌ [Tezos Domains] Reverse lookup error for ${address}:`, error);
      if (error instanceof Error) {
        console.error(`❌ [Tezos Domains] Error message: ${error.message}`);
        console.error(`❌ [Tezos Domains] Error stack:`, error.stack);
      }
      return null;
    }
  }
};

export default tezosDomainsResolver;
export type { ResolveAddressParams, TezosDomainsResolver };
export { TEZOS_TLDS };


