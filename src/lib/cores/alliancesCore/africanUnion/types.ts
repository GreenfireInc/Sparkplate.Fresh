/**
 * Reference payloads for African Union member states (informational; verify for production).
 */

export type AfricanUnionMembership = 'member' | 'suspended'

export interface AfricanUnionCountry {
  /** Display name */
  name: string
  /** ISO 3166-1 alpha-2 where applicable (Sahrawi Republic uses descriptive placeholder). */
  iso3166Alpha2: string
  africanUnionStatus: AfricanUnionMembership
  capital: string
  /** Geographic coordinates of the capital (decimal degrees). */
  coordinates: { latitude: number; longitude: number }
  /** Primary independence observance or sovereignty note (ISO date when applicable). */
  independence: string
  topMajorCities: [string, string, string, string, string]
  /** Approximate mid-decade population (informational). */
  population: number
  mainLanguages: [string, string, string]
  currency: string
  /** Primary IANA timezone for the capital / economic hub. */
  timezone: string
  /** First head of state/government at independence or founding figure (context-dependent). */
  foundingLeader: string
  /** Head of state/government or transitional leader (as of authoring; verify periodically). */
  currentLeader: string
  cryptocurrencyExchanges: string[]
  /** Common stablecoin usage or locally relevant notes (not legal tender unless stated). */
  stablecoin: string
  stockExchange: string
}

/**
 * High-level facts about the African Union (AU) as an institution — reference only; verify for production.
 */
export interface AfricanUnionOrganizationInfo {
  officialName: string
  abbreviation: string
  predecessorOrganization: string
  /** Key dates (ISO where helpful). */
  established: {
    organisationOfAfricanUnity: string
    africanUnion: string
  }
  headquarters: {
    city: string
    country: string
    coordinates: { latitude: number; longitude: number }
  }
  /** AU working languages (Assembly / Commission context). */
  workingLanguages: readonly string[]
  principalOrgans: readonly string[]
  objectivesSummary: readonly string[]
  /** Matches `africanUnionMembers` length in this package. */
  memberRecordsInModule: number
}
