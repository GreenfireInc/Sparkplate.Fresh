/**
 * Reference payloads for BRICS members (informational; verify for production).
 */

export type BricsMembership = 'founding_member'

export interface BricsCountry {
  name: string
  iso3166Alpha2: string
  bricsStatus: BricsMembership
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
 * High-level facts about BRICS — reference only; verify for production.
 */
export interface BricsOrganizationInfo {
  officialName: string
  abbreviation: string
  predecessorContext: string
  established: {
    firstBricsForeignMinistersMeeting: string
    firstLeadersSummit: string
    southAfricaJoined: string
  }
  headquarters: {
    city: string
    country: string
    coordinates: { latitude: number; longitude: number }
    arrangementNotes: string
  }
  principalOrgans: readonly string[]
  objectivesSummary: readonly string[]
  foundingMembersBric2009Iso2: readonly string[]
  foundingBrics2011Iso2: readonly string[]
  memberRecordsInModule: number
}
