/**
 * Reference payloads for Commonwealth of Nations members (informational; verify for production).
 */

export type CommonwealthMembership = 'member'

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

/**
 * National news outlet row (informational; verify URLs, handles, and API bases before production).
 * `apiEndpoint` is a public developer / REST / RSS / feed base URL when documented; otherwise empty string.
 */
export interface NewsOutlet {
  name: string
  website: string
  email: string
  instagram: string
  twitter: string
  apiEndpoint: string
}

/**
 * Three major + four minor national news outlets per economy (informational; verify).
 */
export interface NewsOutletsRoster {
  major: readonly [NewsOutlet, NewsOutlet, NewsOutlet]
  minor: readonly [NewsOutlet, NewsOutlet, NewsOutlet, NewsOutlet]
}

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
  /** Domestic / national courier or parcel carriers with public contact hints (verify locally). */
  domesticCourierServices: DomesticCourierService[]
  /** Three notable universities covering economics / accounting / computer science / electrical engineering style programmes (informational). */
  notableUniversities: readonly [NotableUniversity, NotableUniversity, NotableUniversity]
  /** Three major + four minor national news outlets with public contact hints (verify locally). */
  newsOutlets: NewsOutletsRoster
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
