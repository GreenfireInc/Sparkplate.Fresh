/**
 * Reference payloads for countries associated with the Belt and Road Initiative (BRI) — informational;
 * partnership depth varies by country and over time. Verify for production.
 */

export type BeltAndRoadInitiativeMembership = 'participant'

export interface BeltAndRoadInitiativeCountry {
  name: string
  iso3166Alpha2: string
  beltAndRoadInitiativeStatus: BeltAndRoadInitiativeMembership
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
 * High-level facts about the Belt and Road Initiative — reference only; verify for production.
 */
export interface BeltAndRoadInitiativeOrganizationInfo {
  officialName: string
  officialNameChinese: string
  abbreviation: string
  predecessorContext: string
  established: {
    silkRoadEconomicBelt: string
    maritimeSilkRoad: string
  }
  headquarters: {
    notes: string
  }
  /** Working languages across BRI cooperation (not exclusive). */
  cooperationLanguages: readonly string[]
  principalThemes: readonly string[]
  objectivesSummary: readonly string[]
  /** ISO 3166-1 alpha-2 codes for members represented in this module (BRI partner-country list — informational). */
  participantStatesIso2: readonly string[]
  memberRecordsInModule: number
}
