/**
 * Reference payloads for G20 members (Group of Twenty — premier forum for international economic
 * cooperation; finance ministers' track est. 1999, leaders' summits since 2008; informational;
 * verify for production).
 */

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

/**
 * Notable higher-education row (economics / accounting / CS / EE-style faculties — informational; verify).
 */
export interface NotableUniversity {
  name: string
  website: string
  email: string
  instagram: string
  twitter: string
  linkedin: string
}

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
  /** Domestic / national courier or parcel carriers with public contact hints (verify locally). */
  domesticCourierServices: DomesticCourierService[]
  /** Three notable universities covering economics / accounting / computer science / electrical engineering style programmes (informational). */
  notableUniversities: readonly [NotableUniversity, NotableUniversity, NotableUniversity]
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
  /** Informational courier rows for logistics context (supranational seat — verify applicability). */
  domesticCourierServices: DomesticCourierService[]
  /** Three notable universities sourced from the institutional seat's HQ economy (informational). */
  notableUniversities: readonly [NotableUniversity, NotableUniversity, NotableUniversity]
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
