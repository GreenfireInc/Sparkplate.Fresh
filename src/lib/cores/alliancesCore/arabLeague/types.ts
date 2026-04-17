/**
 * Reference payloads for League of Arab States members (informational; verify for production).
 */

export type ArabLeagueMembership = 'member'

export interface ArabLeagueCountry {
  name: string
  iso3166Alpha2: string
  arabLeagueStatus: ArabLeagueMembership
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
 * High-level facts about the League of Arab States — reference only; verify for production.
 */
export interface ArabLeagueOrganizationInfo {
  officialName: string
  officialNameArabic: string
  abbreviation: string
  predecessorContext: string
  established: {
    alexandriaProtocol: string
    leagueCharterCairo: string
  }
  headquarters: {
    city: string
    country: string
    coordinates: { latitude: number; longitude: number }
    arrangementNotes: string
  }
  officialLanguage: string
  principalOrgans: readonly string[]
  objectivesSummary: readonly string[]
  /** Original signatories to the 1945 Charter (state names evolved; informational). */
  foundingMembers1945Iso2: readonly string[]
  /** All members represented in this module. */
  memberStatesIso2: readonly string[]
  memberRecordsInModule: number
}
