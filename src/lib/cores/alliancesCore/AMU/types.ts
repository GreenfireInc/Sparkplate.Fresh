/**
 * Reference payloads for Arab Maghreb Union (AMU) members (informational; verify for production).
 */

export type AmuMembership = 'founding_member'

/** Domestic / national courier row (informational; verify URLs and handles before production). */
export interface DomesticCourierService {
  name: string
  website: string
  email: string
  instagram: string
  twitter: string
}

export interface AmuCountry {
  name: string
  iso3166Alpha2: string
  amuStatus: AmuMembership
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
 * High-level facts about the Arab Maghreb Union (AMU) — reference only; verify for production.
 */
export interface AmuOrganizationInfo {
  officialName: string
  officialNameFrench: string
  officialNameArabic: string
  abbreviation: string
  abbreviationFrench: string
  predecessorContext: string
  established: {
    treatyOfMarrakesh: string
  }
  headquarters: {
    city: string
    country: string
    coordinates: { latitude: number; longitude: number }
    arrangementNotes: string
  }
  workingLanguages: readonly string[]
  principalOrgans: readonly string[]
  objectivesSummary: readonly string[]
  foundingMembersIso2: readonly string[]
  memberRecordsInModule: number
}
