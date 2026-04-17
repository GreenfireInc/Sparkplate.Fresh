/**
 * Reference payloads for Commonwealth of Nations members (informational; verify for production).
 */

export type CommonwealthMembership = 'member'

export interface CommonwealthCountry {
  name: string
  iso3166Alpha2: string
  commonwealthStatus: CommonwealthMembership
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
  stockExchange: string
}

/**
 * High-level facts about the Commonwealth of Nations — reference only; verify for production.
 */
export interface BritishCommonwealthOrganizationInfo {
  officialName: string
  abbreviation: string
  predecessorContext: string
  established: {
    londonDeclaration: string
    modernCharterContext: string
  }
  headquarters: {
    city: string
    country: string
    coordinates: { latitude: number; longitude: number }
    arrangementNotes: string
  }
  headOfTheCommonwealth: string
  principalOrgans: readonly string[]
  objectivesSummary: readonly string[]
  /** ISO 3166-1 alpha-2 codes for members represented in this module. */
  memberStatesIso2: readonly string[]
  memberRecordsInModule: number
}
