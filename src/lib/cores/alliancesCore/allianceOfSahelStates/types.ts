/**
 * Reference payloads for Alliance of Sahel States members (informational; verify for production).
 */

export type AllianceOfSahelStatesMembership = 'founding_member'

export interface AllianceOfSahelStatesCountry {
  name: string
  iso3166Alpha2: string
  allianceOfSahelStatesStatus: AllianceOfSahelStatesMembership
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
 * High-level facts about the Alliance of Sahel States (AES) — reference only; verify for production.
 */
export interface AllianceOfSahelStatesOrganizationInfo {
  officialName: string
  officialNameFrench: string
  abbreviation: string
  predecessorContext: string
  established: {
    /** Liptako–Gourma mutual defense charter (often Bamako). */
    allianceDefensePact: string
    /** Confederation treaty (Niamey summit). */
    confederationTreaty: string
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
