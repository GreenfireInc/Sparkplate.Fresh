/*
 * Contributors: Corey
 *
 * Description: Methods for resolving Stacks BNS (Bitcoin Name System) domains
 * Based on: Stacks wallet source code and BNS V2 API implementation
 * Docs: https://docs.stacks.co/docs/blockchain/bitcoin-name-system
 */

// Types for Stacks BNS resolution
interface ResolveAddressParams {
  domain: string;
  coinTicker: string;
}

interface StacksBnsResolver {
  getAddress(params: ResolveAddressParams): Promise<string>;
  isStacksDomain(domain: string): boolean;
  resolveDomainForAddress(address: string): Promise<string | null>;
}

// BNS V2 API response types
interface BnsV2ApiName {
  name_string: string;
  namespace_string: string;
  full_name: string;
  owner: string;
  registered_at: string;
  renewal_height: string;
  stx_burn: string;
  revoked: boolean;
  imported_at?: string;
  preordered_by?: string;
  is_valid: boolean;
}

interface BnsV2ApiNameResponse {
  current_burn_block: number;
  status: string;
  data: BnsV2ApiName;
}

interface BnsV2ApiAddressName {
  full_name: string;
  name_string: string;
  namespace_string: string;
  owner: string;
  registered_at: string;
  renewal_height: string;
  stx_burn: string;
  revoked: boolean;
}

interface BnsV2ApiAddressNamesResponse {
  total: number;
  current_burn_block: number;
  limit: number;
  offset: number;
  names: BnsV2ApiAddressName[];
}

// Supported Stacks BNS namespaces
const STACKS_BNS_NAMESPACES = ['.stx', '.btc', '.id'];

// BNS V2 API base URL
const BNS_V2_API_URL = 'https://api.bnsv2.com';

const stacksBnsResolver: StacksBnsResolver = {
  async getAddress({ domain, coinTicker }: ResolveAddressParams): Promise<string> {
    try {
      console.log(`🔍 [Stacks BNS] Resolving domain: ${domain} for ${coinTicker}`);

      // Stacks BNS supports STX addresses primarily, but may support other crypto addresses in profiles
      if (coinTicker.toLowerCase() !== 'stx') {
        console.log(`ℹ️ [Stacks BNS] Domain resolution for ${coinTicker} not directly supported, trying profile lookup...`);
      }

      // Check if domain is a valid Stacks BNS domain
      if (!this.isStacksDomain(domain)) {
        throw new Error(`Domain ${domain} is not a valid Stacks BNS domain`);
      }

      console.log('🔧 [Stacks BNS] Fetching domain information from BNS V2 API...');

      // Fetch domain information from BNS V2 API
      const response = await fetch(`${BNS_V2_API_URL}/names/${domain}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Domain ${domain} not found in BNS registry`);
        }
        throw new Error(`BNS API error: ${response.status} ${response.statusText}`);
      }

      const nameData: BnsV2ApiNameResponse = await response.json();

      // Validate response
      if (!nameData.data || nameData.status !== 'active') {
        throw new Error(`Domain ${domain} is not active or valid`);
      }

      if (!nameData.data.is_valid || nameData.data.revoked) {
        throw new Error(`Domain ${domain} is not valid or has been revoked`);
      }

      const ownerAddress = nameData.data.owner;

      // For STX addresses, return the owner directly
      if (coinTicker.toLowerCase() === 'stx') {
        console.log(`✅ [Stacks BNS] Successfully resolved: ${domain} → ${ownerAddress}`);
        return ownerAddress;
      }

      // For other cryptocurrencies, try to get from zone file profile
      console.log(`🔍 [Stacks BNS] Fetching zone file for ${domain} to find ${coinTicker} address...`);

      try {
        const zoneResponse = await fetch(`${BNS_V2_API_URL}/zonefile/${domain}/raw`);
        if (zoneResponse.ok) {
          const zoneData = await zoneResponse.json();
          const zoneFile = zoneData.zonefile;

          // Check for address in zone file based on coin ticker
          const ticker = coinTicker.toLowerCase();
          if (zoneFile.addresses && Array.isArray(zoneFile.addresses)) {
            for (const addr of zoneFile.addresses) {
              if (addr.network === ticker && addr.type === 'wallet') {
                console.log(`✅ [Stacks BNS] Found ${coinTicker} address in zone file: ${addr.address}`);
                return addr.address;
              }
              // Special handling for Bitcoin
              if (ticker === 'btc' && addr.network === 'btc') {
                console.log(`✅ [Stacks BNS] Found Bitcoin address in zone file: ${addr.address}`);
                return addr.address;
              }
            }
          }

          // Check legacy BTC field
          if (ticker === 'btc' && zoneFile.btc) {
            console.log(`✅ [Stacks BNS] Found Bitcoin address (legacy field): ${zoneFile.btc}`);
            return zoneFile.btc;
          }
        }
      } catch (zoneError) {
        console.warn(`⚠️ [Stacks BNS] Failed to fetch zone file for ${domain}:`, zoneError);
      }

      // If no specific cryptocurrency address found, but domain exists, inform user
      throw new Error(`Domain ${domain} exists but no ${coinTicker} address found in profile`);

    } catch (error) {
      console.error(`❌ [Stacks BNS] Resolution error for ${domain}:`, error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to resolve Stacks BNS domain ${domain}: ${errorMessage}`);
    }
  },

  // Helper method to check if a string looks like a Stacks BNS domain
  isStacksDomain(domain: string): boolean {
    if (typeof domain !== 'string' || domain.length < 3) {
      return false;
    }

    // Check against known BNS namespaces
    const lowerDomain = domain.toLowerCase();
    return STACKS_BNS_NAMESPACES.some(namespace => lowerDomain.endsWith(namespace));
  },

  // Reverse lookup: Get Stacks BNS domain for an address
  async resolveDomainForAddress(address: string): Promise<string | null> {
    try {
      console.log(`🔍 [Stacks BNS] Starting reverse lookup for address: ${address}`);

      // Validate Stacks address format (SP... or SM... addresses)
      if (!address.match(/^(SP|SM)[0-9A-Z]{39}$/)) {
        console.warn(`⚠️ [Stacks BNS] Invalid Stacks address format: ${address}`);
        return null;
      }

      console.log('🔧 [Stacks BNS] Fetching BNS names for address from BNS V2 API...');

      // Fetch all BNS names owned by this address
      const response = await fetch(`${BNS_V2_API_URL}/names/address/${address}/valid`);

      if (!response.ok) {
        if (response.status === 404) {
          console.log(`ℹ️ [Stacks BNS] No BNS names found for address: ${address}`);
          return null;
        }
        throw new Error(`BNS API error: ${response.status} ${response.statusText}`);
      }

      const addressNamesData: BnsV2ApiAddressNamesResponse = await response.json();

      if (!addressNamesData.names || addressNamesData.names.length === 0) {
        console.log(`ℹ️ [Stacks BNS] No BNS names found for address: ${address}`);
        return null;
      }

      // For now, return the first name found (primary name lookup requires additional setup)
      // TODO: Implement primary name lookup using Stacks contract calls
      console.log('🔍 [Stacks BNS] Using first available name (primary name lookup not implemented yet)...');
      const firstName = addressNamesData.names[0];
      const firstFullName = firstName.full_name;

      console.log(`✅ [Stacks BNS] Found BNS name: ${firstFullName} (${addressNamesData.total} total names)`);
      if (addressNamesData.names.length > 1) {
        console.log(`ℹ️ [Stacks BNS] Note: Address has ${addressNamesData.names.length} BNS names, returning first one`);
      }

      return firstFullName;

    } catch (error) {
      console.error(`❌ [Stacks BNS] Reverse lookup error for ${address}:`, error);
      if (error instanceof Error) {
        console.error(`❌ [Stacks BNS] Error message: ${error.message}`);
        console.error(`❌ [Stacks BNS] Error stack:`, error.stack);
      }
      return null;
    }
  }
};

export default stacksBnsResolver;
export type { ResolveAddressParams, StacksBnsResolver };
export { STACKS_BNS_NAMESPACES, BNS_V2_API_URL };