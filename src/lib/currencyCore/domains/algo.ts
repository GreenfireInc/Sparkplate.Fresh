/*
 * Contributors: Corey
 *
 * Description: Methods for resolving Algorand NF Domains (.algo)
 * Based on: tez.ts reference implementation
 * Docs: https://api-docs.nf.domains/reference/integrators-guide/
 * API Endpoint: https://api.nf.domains/nfd/lookup
 */

// Types for NF Domains resolution
interface ResolveAddressParams {
  domain: string;
  coinTicker: string;
}

interface AlgoDomainsResolver {
  getAddress(params: ResolveAddressParams): Promise<string>;
  isAlgoDomain(domain: string): boolean;
  resolveDomainForAddress(address: string): Promise<string | null>;
}

// Supported Algorand NF Domains TLDs
const ALGO_TLDS = ['.algo'];

// NF Domains API base URL
// Use proxy in development to avoid CORS issues
const NFD_API_BASE = import.meta.env.DEV ? '/api/nfd' : 'https://api.nf.domains/nfd';
const NFD_TESTNET_API_BASE = import.meta.env.DEV ? '/api/testnet-nfd' : 'https://api.testnet.nf.domains/nfd';

const algoDomainsResolver: AlgoDomainsResolver = {
  async getAddress({ domain, coinTicker }: ResolveAddressParams): Promise<string> {
    try {
      console.log(`🔍 [NF Domains] Resolving domain: ${domain} for ${coinTicker}`);
      
      // NF Domains only supports ALGO addresses
      if (coinTicker.toLowerCase() !== 'algo') {
        throw new Error(`NF Domains only supports ALGO addresses, not ${coinTicker}`);
      }

      // Check if domain is a valid Algorand domain
      if (!this.isAlgoDomain(domain)) {
        throw new Error(`Domain ${domain} is not a valid Algorand domain`);
      }

      // Remove .algo extension for API call
      const domainName = domain.toLowerCase().replace('.algo', '');

      console.log(`🔧 [NF Domains] Querying API for domain: ${domainName}`);

      // Query NF Domains API for the domain
      const apiUrl = `${NFD_API_BASE}/${domainName}`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Domain ${domain} not found`);
        }
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log(`🔍 [NF Domains] API response:`, data);

      // The NFD data contains the owner address in the 'owner' field
      if (!data || !data.owner) {
        throw new Error(`No owner address found for domain: ${domain}`);
      }

      const address = data.owner;
      console.log(`✅ [NF Domains] Successfully resolved: ${domain} → ${address}`);
      return address;

    } catch (error) {
      console.error(`❌ [NF Domains] Resolution error for ${domain}:`, error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to resolve Algorand domain ${domain}: ${errorMessage}`);
    }
  },

  // Helper method to check if a string looks like an Algorand domain
  isAlgoDomain(domain: string): boolean {
    if (typeof domain !== 'string' || domain.length < 6) {
      return false;
    }

    return ALGO_TLDS.some(tld => domain.toLowerCase().endsWith(tld));
  },

  // Reverse lookup: Get Algorand domain for an address
  async resolveDomainForAddress(address: string): Promise<string | null> {
    try {
      console.log(`🔍 [NF Domains] Starting reverse lookup for address: ${address}`);

      // Validate Algorand address format (58 characters, base32 encoded)
      // Note: Algorand addresses are case-insensitive in base32, but should be uppercase
      const normalizedAddress = address.toUpperCase().trim();
      
      if (!normalizedAddress.match(/^[A-Z2-7]{58}$/)) {
        console.warn(`⚠️ [NF Domains] Invalid Algorand address format: ${address}`);
        return null;
      }

      console.log(`✅ [NF Domains] Address validation passed`);

      // Helper function to try fetching from an API endpoint
      const tryFetchJson = async (url: string): Promise<unknown> => {
        const response = await fetch(url, {
          headers: { 'Accept': 'application/json' }
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
      };

      // Helper function to extract domain name from various NFD API response formats
      const extractDomainName = (data: unknown): string | null => {
        try {
          const obj = data as Record<string, unknown>;

          // Check if it's directly keyed by address (lookup/v2/address endpoints)
          if (obj && obj[normalizedAddress]) {
            const nfdData = obj[normalizedAddress] as Record<string, unknown>;

            // Handle v2/address format (array of NFDs)
            if (Array.isArray(nfdData) && nfdData.length > 0) {
              const firstNfd = nfdData[0] as Record<string, unknown>;
              const name = firstNfd.name;
              if (typeof name === 'string') return name;
            }

            // Handle lookup format (single NFD object)
            const name = nfdData.name;
            if (typeof name === 'string') return name;
          }

          // Check if it's a search response with nfds array
          if (obj && obj.nfds && Array.isArray(obj.nfds) && obj.nfds.length > 0) {
            const firstNfd = obj.nfds[0] as Record<string, unknown>;
            const name = firstNfd.name;
            if (typeof name === 'string') return name;
          }

          // Check common field names
          const candidates: Array<unknown> = [
            obj?.name,
            obj?.domain,
            obj?.nfdName,
          ];

          for (const cand of candidates) {
            if (typeof cand === 'string' && cand.length > 0) {
              // Remove .algo if present, we'll add it back
              return cand.replace('.algo', '');
            }
          }

          // Check if response is an array
          if (Array.isArray(obj) && obj.length > 0) {
            return extractDomainName(obj[0]);
          }

          // Check nested objects
          if (obj && typeof obj === 'object') {
            for (const key of Object.keys(obj)) {
              const val = obj[key];
              if (val && typeof val === 'object') {
                const found = extractDomainName(val);
                if (found) return found;
              }
            }
          }
        } catch (error) {
          console.warn(`⚠️ [NF Domains] Error parsing response:`, error);
        }
        return null;
      };

      // Try multiple API approaches for reverse lookup
      const candidates = [
        // Primary reverse lookup endpoint (get NFDs linked to address)
        `${NFD_API_BASE}/v2/address?address=${encodeURIComponent(normalizedAddress)}&limit=1&view=thumbnail`,
        // Try testnet endpoint
        `${NFD_TESTNET_API_BASE}/v2/address?address=${encodeURIComponent(normalizedAddress)}&limit=1&view=thumbnail`,
        // Alternative: Search for NFDs owned by this address
        `${NFD_API_BASE}/v2/search?owner=${encodeURIComponent(normalizedAddress)}&limit=1&view=tiny`,
        // Try testnet search
        `${NFD_TESTNET_API_BASE}/v2/search?owner=${encodeURIComponent(normalizedAddress)}&limit=1&view=tiny`,
        // Fallback: Original lookup endpoint
        `${NFD_API_BASE}/lookup?address=${encodeURIComponent(normalizedAddress)}&view=thumbnail&allowUnverified=true`,
      ];

      console.log('🔧 [NF Domains] Trying multiple API endpoints...');

      for (const url of candidates) {
        try {
          console.log(`🔧 [NF Domains] Trying: ${url.split('?')[0]}`);
          const json = await tryFetchJson(url);
          const domainName = extractDomainName(json);
          
          if (domainName) {
            const fullDomain = domainName.endsWith('.algo') ? domainName : `${domainName}.algo`;
            console.log(`✅ [NF Domains] Successfully resolved: ${normalizedAddress} → ${fullDomain}`);
            return fullDomain;
          }
        } catch (err) {
          // Try next endpoint
          const errMsg = err instanceof Error ? err.message : String(err);
          console.log(`ℹ️ [NF Domains] Endpoint failed: ${errMsg}`);
        }
      }

      console.log(`ℹ️ [NF Domains] No domain found for address after trying all endpoints`);
      console.log(`ℹ️ [NF Domains] This address may not have an associated NFD`);
      return null;

    } catch (error) {
      console.error(`❌ [NF Domains] Reverse lookup error for ${address}:`, error);
      if (error instanceof Error) {
        console.error(`❌ [NF Domains] Error message: ${error.message}`);
      }
      return null;
    }
  }
};

export default algoDomainsResolver;
export type { ResolveAddressParams, AlgoDomainsResolver };
export { ALGO_TLDS };

