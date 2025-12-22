/*
 * Domain Resolution Services Index
 * 
 * Centralizes domain resolution services for cryptocurrency addresses
 */

import ensResolver from './ens';
import unsResolver from './uns';
import tezosDomainsResolver from './tez';
import solanaDomainsResolver from './sol';
import algoDomainsResolver from './algo';
import stacksBnsResolver from './stx';

export { ensResolver, unsResolver, tezosDomainsResolver, solanaDomainsResolver, algoDomainsResolver, stacksBnsResolver };

// Combined resolver that tries multiple services
export const resolveAddress = async (
  domain: string,
  coinTicker: string
): Promise<{ address: string; service: 'ENS' | 'UNS' | 'TEZ' | 'SOL' | 'ALGO' | 'STX' | null }> => {
  // Try ENS first for Ethereum
  if (coinTicker.toLowerCase() === 'eth' && ensResolver.isEnsDomain(domain)) {
    try {
      const address = await ensResolver.getAddress({ domain, coinTicker });
      return { address, service: 'ENS' };
    } catch (error) {
      console.error('ENS resolution failed:', error);
    }
  }

  // Try Tezos Domains for Tezos
  if (coinTicker.toLowerCase() === 'xtz' && tezosDomainsResolver.isTezosDomain(domain)) {
    try {
      const address = await tezosDomainsResolver.getAddress({ domain, coinTicker });
      return { address, service: 'TEZ' };
    } catch (error) {
      console.error('Tezos Domains resolution failed:', error);
    }
  }

  // Try Solana Name Service for Solana
  if (coinTicker.toLowerCase() === 'sol' && solanaDomainsResolver.isSolanaDomain(domain)) {
    try {
      const address = await solanaDomainsResolver.getAddress({ domain, coinTicker });
      return { address, service: 'SOL' };
    } catch (error) {
      console.error('Solana Name Service resolution failed:', error);
    }
  }

  // Try Algorand NF Domains for Algorand
  if (coinTicker.toLowerCase() === 'algo' && algoDomainsResolver.isAlgoDomain(domain)) {
    try {
      const address = await algoDomainsResolver.getAddress({ domain, coinTicker });
      return { address, service: 'ALGO' };
    } catch (error) {
      console.error('NF Domains resolution failed:', error);
    }
  }

  // Try Stacks BNS for Stacks
  if (coinTicker.toLowerCase() === 'stx' && stacksBnsResolver.isStacksDomain(domain)) {
    try {
      const address = await stacksBnsResolver.getAddress({ domain, coinTicker });
      return { address, service: 'STX' };
    } catch (error) {
      console.error('Stacks BNS resolution failed:', error);
    }
  }

  // Try Unstoppable Domains
  if (unsResolver.isUnstoppableDomain(domain)) {
    try {
      const address = await unsResolver.getAddress({ domain, coinTicker });
      return { address, service: 'UNS' };
    } catch (error) {
      console.error('Unstoppable Domains resolution failed:', error);
    }
  }

  throw new Error(`Unable to resolve domain ${domain} for ${coinTicker}`);
};

// Reverse lookup: Get domain for an address
export const resolveDomainForAddress = async (
  address: string,
  coinTicker: string
): Promise<{ domain: string; service: 'ENS' | 'UNS' | 'TEZ' | 'SOL' | 'ALGO' | 'STX' } | null> => {
  console.log(`🔍 [Domain Resolution] Starting reverse lookup for ${coinTicker} address: ${address}`);
  
  // Try ENS reverse lookup for Ethereum
  if (coinTicker.toLowerCase() === 'eth') {
    console.log(`🔍 [Domain Resolution] Checking ENS for Ethereum address...`);
    if (ensResolver.isValidEthereumAddress(address)) {
      try {
        const domain = await ensResolver.resolveDomainForAddress(address);
        if (domain) {
          console.log(`✅ [Domain Resolution] ENS domain found: ${domain}`);
          return { domain, service: 'ENS' };
        } else {
          console.log(`ℹ️ [Domain Resolution] No ENS domain found`);
        }
      } catch (error) {
        console.error('❌ [Domain Resolution] ENS reverse lookup failed:', error);
      }
    } else {
      console.warn(`⚠️ [Domain Resolution] Invalid Ethereum address: ${address}`);
    }
  } else {
    console.log(`ℹ️ [Domain Resolution] Skipping ENS (not ETH network)`);
  }

  // Try Tezos Domains reverse lookup for Tezos
  if (coinTicker.toLowerCase() === 'xtz') {
    console.log(`🔍 [Domain Resolution] Checking Tezos Domains for XTZ address...`);
    try {
      const domain = await tezosDomainsResolver.resolveDomainForAddress(address);
      if (domain) {
        console.log(`✅ [Domain Resolution] Tezos Domain found: ${domain}`);
        return { domain, service: 'TEZ' };
      } else {
        console.log(`ℹ️ [Domain Resolution] No Tezos Domain found`);
      }
    } catch (error) {
      console.error('❌ [Domain Resolution] Tezos Domains reverse lookup failed:', error);
    }
  } else {
    console.log(`ℹ️ [Domain Resolution] Skipping Tezos Domains (not XTZ network)`);
  }

  // Try Solana Name Service reverse lookup for Solana
  if (coinTicker.toLowerCase() === 'sol') {
    console.log(`🔍 [Domain Resolution] Checking Solana Name Service for SOL address...`);
    try {
      const domain = await solanaDomainsResolver.resolveDomainForAddress(address);
      if (domain) {
        console.log(`✅ [Domain Resolution] Solana domain found: ${domain}`);
        return { domain, service: 'SOL' };
      } else {
        console.log(`ℹ️ [Domain Resolution] No Solana domain found`);
      }
    } catch (error) {
      console.error('❌ [Domain Resolution] Solana Name Service reverse lookup failed:', error);
    }
  } else {
    console.log(`ℹ️ [Domain Resolution] Skipping Solana Name Service (not SOL network)`);
  }

  // Try Algorand NF Domains reverse lookup for Algorand
  if (coinTicker.toLowerCase() === 'algo') {
    console.log(`🔍 [Domain Resolution] Checking NF Domains for ALGO address...`);
    try {
      const domain = await algoDomainsResolver.resolveDomainForAddress(address);
      if (domain) {
        console.log(`✅ [Domain Resolution] Algorand domain found: ${domain}`);
        return { domain, service: 'ALGO' };
      } else {
        console.log(`ℹ️ [Domain Resolution] No Algorand domain found`);
      }
    } catch (error) {
      console.error('❌ [Domain Resolution] NF Domains reverse lookup failed:', error);
    }
  } else {
    console.log(`ℹ️ [Domain Resolution] Skipping NF Domains (not ALGO network)`);
  }

  // Try Stacks BNS reverse lookup for Stacks
  if (coinTicker.toLowerCase() === 'stx') {
    console.log(`🔍 [Domain Resolution] Checking Stacks BNS for STX address...`);
    try {
      const domain = await stacksBnsResolver.resolveDomainForAddress(address);
      if (domain) {
        console.log(`✅ [Domain Resolution] Stacks BNS domain found: ${domain}`);
        return { domain, service: 'STX' };
      } else {
        console.log(`ℹ️ [Domain Resolution] No Stacks BNS domain found`);
      }
    } catch (error) {
      console.error('❌ [Domain Resolution] Stacks BNS reverse lookup failed:', error);
    }
  } else {
    console.log(`ℹ️ [Domain Resolution] Skipping Stacks BNS (not STX network)`);
  }

  // Try Unstoppable Domains reverse lookup
  console.log(`🔍 [Domain Resolution] Checking Unstoppable Domains...`);
  try {
    const domain = await unsResolver.resolveDomainForAddress(address, coinTicker);
    if (domain) {
      console.log(`✅ [Domain Resolution] Unstoppable Domain found: ${domain}`);
      return { domain, service: 'UNS' };
    } else {
      console.log(`ℹ️ [Domain Resolution] No Unstoppable Domain found`);
    }
  } catch (error) {
    console.error('❌ [Domain Resolution] Unstoppable Domains reverse lookup failed:', error);
  }

  console.log(`ℹ️ [Domain Resolution] No domain found for address ${address}`);
  return null;
};

// Check if a string is a domain name
export const isDomain = (input: string): boolean => {
  return ensResolver.isEnsDomain(input) || unsResolver.isUnstoppableDomain(input) || tezosDomainsResolver.isTezosDomain(input) || solanaDomainsResolver.isSolanaDomain(input) || algoDomainsResolver.isAlgoDomain(input) || stacksBnsResolver.isStacksDomain(input);
};


