/**
 * Reference payloads for CARICOM members (informational; verify for production).
 */

export type CaricomMembership = 'full_member' | 'associate_member'

/**
 * Domestic / national courier row (informational; verify URLs, handles, and API bases before production).
 * `apiEndpoint` is a public developer / REST base URL when documented; otherwise empty string.
 */
export interface DomesticCourierService {
  name: string
  website: string
  email: string
  instagram: string
  twitter: string
  apiEndpoint: string
}

export interface CaricomCountry {
  name: string
  iso3166Alpha2: string
  caricomStatus: CaricomMembership
  capital: string
  coordinates: { latitude: number; longitude: number }
  independence: string
  topMajorCities: [string, string, string, string, string]
  population: number
  mainLanguages: [string, string, string]
  currency: string
  timezone: string
  foundingLeader: string
  currentLeader: string
  cryptocurrencyExchanges: string[]
  stablecoin: string
  /** Domestic / national courier or parcel carriers with public contact hints (verify locally). */
  domesticCourierServices: DomesticCourierService[]
  stockExchange: string
}

/**
 * High-level facts about CARICOM — reference only; verify for production.
 */
export interface CaricomOrganizationInfo {
  officialName: string
  abbreviation: string
  predecessorContext: string
  established: {
    treatyOfChaguaramas: string
    revisedTreatyContext: string
  }
  headquarters: {
    city: string
    country: string
    coordinates: { latitude: number; longitude: number }
    arrangementNotes: string
  }
  principalOrgans: readonly string[]
  objectivesSummary: readonly string[]
  fullMemberStatesIso2: readonly string[]
  associateMemberStatesIso2: readonly string[]
  memberRecordsInModule: number
}
