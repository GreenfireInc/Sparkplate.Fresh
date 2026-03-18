/*
 * Contributors: Corey
 *
 * Description: Methods for resolving Solana Name Service (.sol) domains
 * Based on: tez.ts reference implementation
 * Docs: https://docs.bonfida.org/collection/v/name-service/
 * 
 * Last Updated: 2025-10-09
 * Fixed: Corrected HTTP API response parsing for favorite domain lookup
 *        - API returns: { s: "ok", result: { domain: "key", reverse: "name" } }
 *        - Previously was checking wrong field names causing wallet addresses
 *          to be returned as ".sol" domains
 */

// Types for Solana Name Service resolution
interface ResolveAddressParams {
  domain: string;
  coinTicker: string;
}

interface SolanaDomainsResolver {
  getAddress(params: ResolveAddressParams): Promise<string>;
  isSolanaDomain(domain: string): boolean;
  resolveDomainForAddress(address: string): Promise<string | null>;
}

// Supported Solana Name Service TLDs
const SOLANA_TLDS = ['.sol'];

// RPC endpoints for reverse lookup fallback (when HTTP favorite-domain returns null)
const SOLANA_RPC_ENDPOINTS = [
  'https://mainnet.helius-rpc.com/?api-key=public',
  'https://solana-mainnet.rpc.extrnode.com',
  'https://rpc.ankr.com/solana',
  'https://api.mainnet-beta.solana.com',
];

// Bonfida SNS HTTP proxy — avoids @solana/web3.js bundling issues in Vite
const SNS_PROXY_BASE = 'https://sns-sdk-proxy.bonfida.workers.dev';

const solanaDomainsResolver: SolanaDomainsResolver = {
  async getAddress({ domain, coinTicker }: ResolveAddressParams): Promise<string> {
    if (coinTicker.toLowerCase() !== 'sol') {
      throw new Error(`Solana Name Service only supports SOL addresses, not ${coinTicker}`);
    }

    if (!this.isSolanaDomain(domain)) {
      throw new Error(`${domain} is not a valid Solana domain`);
    }

    // Strip .sol — the proxy endpoint takes just the name
    const domainName = domain.toLowerCase().replace(/\.sol$/, '');
    const url = `${SNS_PROXY_BASE}/resolve/${encodeURIComponent(domainName)}`;

    console.log(`🔍 [Solana Name Service] Resolving ${domain} via SNS proxy...`);

    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    const json = await res.json() as { s: string; result: string };

    if (json.s !== 'ok' || !json.result) {
      throw new Error(
        json.result
          ? String(json.result)
          : `No address found for Solana domain: ${domain}`
      );
    }

    console.log(`✅ [Solana Name Service] Resolved: ${domain} → ${json.result}`);
    return json.result;
  },

  // Helper method to check if a string looks like a Solana domain
  isSolanaDomain(domain: string): boolean {
    if (typeof domain !== 'string' || domain.length < 5) {
      return false;
    }

    return SOLANA_TLDS.some(tld => domain.toLowerCase().endsWith(tld));
  },

  // Reverse lookup: Get Solana domain for an address
  async resolveDomainForAddress(address: string): Promise<string | null> {
    try {
      console.log(`🔍 [Solana Name Service] Starting reverse lookup for address: ${address}`);

      // Validate Solana address format (base58, 32-44 characters typically)
      if (!address.match(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/)) {
        console.warn(`⚠️ [Solana Name Service] Invalid Solana address format: ${address}`);
        return null;
      }

      // Strategy 1: Try SNS HTTP API first (no RPC rate limits)
      console.log(`🔍 [Solana Name Service] Trying SNS HTTP API...`);
      try {
        const apiUrl = `https://sns-sdk-proxy.bonfida.workers.dev/favorite-domain/${address}`;
        console.log(`🔧 [Solana Name Service] Fetching from: ${apiUrl}`);
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(`🔍 [Solana Name Service] API response:`, JSON.stringify(data, null, 2));
          
          // Check for correct Bonfida API response format
          // Format: { s: "ok", result: { domain: "domainKey", reverse: "humanReadableName" } }
          // or      { s: "ok", result: null } if no favorite domain set
          if (data && data.s === 'ok') {
            if (data.result === null) {
              // No favorite domain set for this address
              console.log(`ℹ️ [Solana Name Service] No favorite domain set for ${address}, trying RPC fallback...`);
              // Fall through to RPC methods
            } else if (data.result && typeof data.result === 'object' && data.result.reverse) {
              // data.result.domain = domain key (PublicKey as base58 string)
              // data.result.reverse = human-readable name (without .sol)
              const domainName = data.result.reverse;
              const fullDomain = domainName.endsWith('.sol') 
                ? domainName 
                : `${domainName}.sol`;
              console.log(`✅ [Solana Name Service] Found favorite domain via HTTP API: ${address} → ${fullDomain}`);
              return fullDomain;
            } else {
              console.log(`ℹ️ [Solana Name Service] API response format unexpected, trying RPC fallback...`);
            }
          } else if (data && data.s === 'error') {
            console.log(`ℹ️ [Solana Name Service] API returned error: ${data.result}, trying RPC fallback...`);
          }
        } else {
          console.log(`ℹ️ [Solana Name Service] HTTP API returned ${response.status}, trying RPC fallback...`);
        }
      } catch (apiError) {
        console.log(`ℹ️ [Solana Name Service] HTTP API failed:`, apiError);
        console.log(`ℹ️ [Solana Name Service] Trying RPC fallback...`);
      }

      // Strategy 2: Try RPC-based resolution (fallback)
      // Dynamically import Solana dependencies
      const { Connection, PublicKey } = await import('@solana/web3.js');
      const { getFavoriteDomain, getAllDomains, reverseLookup } = await import('@bonfida/spl-name-service');

      // Convert address string to PublicKey
      const publicKey = new PublicKey(address);

      // Try multiple RPC endpoints until one works
      for (let i = 0; i < SOLANA_RPC_ENDPOINTS.length; i++) {
        const rpcUrl = SOLANA_RPC_ENDPOINTS[i];
        console.log(`🔧 [Solana Name Service] Trying RPC endpoint ${i + 1}/${SOLANA_RPC_ENDPOINTS.length}: ${rpcUrl.split('?')[0]}`);

        try {
          // Create connection to Solana mainnet with current RPC endpoint
          const connection = new Connection(rpcUrl, 'confirmed');

          // Try getFavoriteDomain first (favorite domain - fastest and most efficient)
          console.log(`🔍 [Solana Name Service] Trying to get favorite domain via RPC...`);
          try {
            const favoriteResult = await getFavoriteDomain(connection, publicKey);
            if (favoriteResult && favoriteResult.reverse) {
              const fullDomain = favoriteResult.reverse.endsWith('.sol') 
                ? favoriteResult.reverse 
                : `${favoriteResult.reverse}.sol`;
              console.log(`✅ [Solana Name Service] Found favorite domain: ${address} → ${fullDomain}`);
              return fullDomain;
            }
          } catch (favoriteError) {
            const errMsg = favoriteError instanceof Error ? favoriteError.message : String(favoriteError);
            console.log(`ℹ️ [Solana Name Service] No favorite domain set (${errMsg}), trying getAllDomains...`);
          }

          // Try getAllDomains (get all domain PublicKeys owned by this address)
          console.log(`🔍 [Solana Name Service] Getting all domains for owner...`);
          const domainKeys = await getAllDomains(connection, publicKey);
          console.log(`🔍 [Solana Name Service] Found ${domainKeys.length} domain key(s) for address`);
          
          if (domainKeys && domainKeys.length > 0) {
            // Get the first domain and resolve it to a human-readable name
            const firstDomainKey = domainKeys[0];
            console.log(`🔍 [Solana Name Service] First domain key:`, firstDomainKey.toBase58());
            
            // Use reverseLookup to convert domain PublicKey to human-readable name
            const domainName = await reverseLookup(connection, firstDomainKey);
            const fullDomain = domainName.endsWith('.sol') ? domainName : `${domainName}.sol`;
            
            console.log(`✅ [Solana Name Service] Successfully resolved: ${address} → ${fullDomain}`);
            if (domainKeys.length > 1) {
              console.log(`ℹ️ [Solana Name Service] Note: This address owns ${domainKeys.length} domains, showing first one`);
            }
            return fullDomain;
          }

          // If we get here with no results, it means no domains found (not an error)
          console.log(`ℹ️ [Solana Name Service] No domain found for address: ${address}`);
          console.log(`ℹ️ [Solana Name Service] This address may not own any .sol domains`);
          return null;

        } catch (rpcError) {
          const errorMsg = rpcError instanceof Error ? rpcError.message : String(rpcError);
          console.warn(`⚠️ [Solana Name Service] RPC endpoint ${i + 1} failed: ${errorMsg}`);
          
          // If this is the last endpoint, continue (don't throw, we tried our best)
          if (i === SOLANA_RPC_ENDPOINTS.length - 1) {
            console.log(`ℹ️ [Solana Name Service] All RPC endpoints failed, address may not have domains`);
          } else {
            // Try next endpoint
            console.log(`🔄 [Solana Name Service] Trying next RPC endpoint...`);
          }
        }
      }

      // Gracefully return null if nothing worked
      console.log(`ℹ️ [Solana Name Service] No domain found after trying all methods`);
      return null;

    } catch (error) {
      console.error(`❌ [Solana Name Service] Reverse lookup error for ${address}:`, error);
      if (error instanceof Error) {
        console.error(`❌ [Solana Name Service] Error message: ${error.message}`);
      }
      return null;
    }
  }
};

export default solanaDomainsResolver;
export type { ResolveAddressParams, SolanaDomainsResolver };
export { SOLANA_TLDS };

