/**
 * Reference payloads for League of Arab States members (informational; verify for production).
 */

export type ArabLeagueMembership = 'member'

/** Domestic / national courier row (informational; verify URLs, handles, and API bases before production). */
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

/** Seven principal export commodities by trade value (informational; verify periodically). */
export type MainExportCommodities = readonly [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
]

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
  /** Domestic / national courier or parcel carriers with public contact hints (verify locally). */
  domesticCourierServices: DomesticCourierService[]
  /** Three notable universities covering economics / accounting / computer science / electrical engineering style programmes (informational). */
  notableUniversities: readonly [NotableUniversity, NotableUniversity, NotableUniversity]
  /** Three major + four minor national news outlets with public contact hints (verify locally). */
  newsOutlets: NewsOutletsRoster
  /** Seven principal export commodities (informational; verify trade statistics periodically). */
  mainExportCommodities: MainExportCommodities
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
