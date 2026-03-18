/*
 * Contributors: Corey
 *
 * Description: Methods for resolving Tezos Domains (.tez)
 * Uses the Tezos Domains public GraphQL API — no taquito dependency required.
 * Docs: https://docs.tezos.domains/
 */

const TEZOS_DOMAINS_API = 'https://api.tezos.domains/graphql';
const TEZOS_TLDS = ['.tez'];

interface ResolveAddressParams {
  domain: string;
  coinTicker: string;
}

interface TezosDomainsResolver {
  getAddress(params: ResolveAddressParams): Promise<string>;
  isTezosDomain(domain: string): boolean;
  resolveDomainForAddress(address: string): Promise<string | null>;
}

async function graphql<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const res = await fetch(TEZOS_DOMAINS_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`Tezos Domains API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json() as { data?: T; errors?: { message: string }[] };

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join('; '));
  }

  if (!json.data) {
    throw new Error('Tezos Domains API returned no data');
  }

  return json.data;
}

const tezosDomainsResolver: TezosDomainsResolver = {
  async getAddress({ domain, coinTicker }: ResolveAddressParams): Promise<string> {
    if (coinTicker.toLowerCase() !== 'xtz') {
      throw new Error(`Tezos Domains only supports XTZ addresses, not ${coinTicker}`);
    }

    if (!this.isTezosDomain(domain)) {
      throw new Error(`${domain} is not a valid Tezos domain`);
    }

    console.log(`🔍 [Tezos Domains] Resolving ${domain} via GraphQL API...`);

    const data = await graphql<{ domain: { owner: string } | null }>(
      `query ResolveDomain($name: String!) {
         domain(name: $name) {
           owner
         }
       }`,
      { name: domain }
    );

    const address = data.domain?.owner;
    if (!address) {
      throw new Error(`No address found for Tezos domain: ${domain}`);
    }

    console.log(`✅ [Tezos Domains] Resolved: ${domain} → ${address}`);
    return address;
  },

  isTezosDomain(domain: string): boolean {
    return (
      typeof domain === 'string' &&
      domain.length > 4 &&
      TEZOS_TLDS.some((tld) => domain.toLowerCase().endsWith(tld))
    );
  },

  async resolveDomainForAddress(address: string): Promise<string | null> {
    if (!address.match(/^(tz1|tz2|tz3|KT1)[a-zA-Z0-9]{33}$/)) {
      console.warn(`⚠️ [Tezos Domains] Invalid Tezos address: ${address}`);
      return null;
    }

    console.log(`🔍 [Tezos Domains] Reverse lookup for ${address}...`);

    try {
      const data = await graphql<{ reverseRecord: { name: string } | null }>(
        `query ReverseResolve($address: String!) {
           reverseRecord(address: $address) {
             name
           }
         }`,
        { address }
      );

      const name = data.reverseRecord?.name ?? null;
      if (name) console.log(`✅ [Tezos Domains] Resolved: ${address} → ${name}`);
      return name;
    } catch (error) {
      console.error(`❌ [Tezos Domains] Reverse lookup failed:`, error);
      return null;
    }
  },
};

export default tezosDomainsResolver;
export type { ResolveAddressParams, TezosDomainsResolver };
export { TEZOS_TLDS };
