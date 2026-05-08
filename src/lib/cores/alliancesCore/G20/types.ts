/**
 * Reference payloads for G20 members (Group of Twenty — premier forum for international economic
 * cooperation; finance ministers' track est. 1999, leaders' summits since 2008; informational;
 * verify for production).
 */

export interface G20Country {
  name: string
  iso3166Alpha2: string
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
 * Reference payload for G20 institutional / supranational members (European Union since founding;
 * African Union admitted 2023 New Delhi summit). These seats represent intergovernmental bodies
 * rather than sovereign states, so the country shape (independence, single capital / currency /
 * timezone, head of state) does not cleanly apply — this companion shape captures the relevant
 * institutional facts instead. Informational; verify for production.
 */
export interface G20InstitutionalMember {
  name: string
  abbreviation: string
  /** ISO 3166 user-assigned / supranational code used loosely for this body (e.g. 'EU', 'AU'). */
  code: string
  headquartersCity: string
  headquartersCountry: string
  coordinates: { latitude: number; longitude: number }
  established: string
  /** Year (or descriptive milestone) the body became a G20 member. */
  g20Membership: string
  /** ISO 3166-1 alpha-2 codes of constituent member states (informational; may shift). */
  memberStatesIso2: readonly string[]
  primaryWorkingLanguages: readonly string[]
  representativeBodies: readonly string[]
  currentRepresentatives: string
}

/**
 * Reference summary for the Group of Twenty — informational; verify for production.
 */
export interface G20OrganizationInfo {
  officialName: string
  abbreviation: string
  established: string
  headquartersCity: string
  headquartersCountry: string
  memberStatesIso2: readonly string[]
  institutionalMembersCode: readonly string[]
  memberRecordsInModule: number
}
