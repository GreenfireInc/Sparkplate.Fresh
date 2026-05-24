/**
 * Reference payloads for countries associated with the Belt and Road Initiative (BRI) — informational;
 * partnership depth varies by country and over time. Verify for production.
 */

export type BeltAndRoadInitiativeMembership = 'participant'

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
 * National news outlet row (informational; verify URLs, handles, RSS/API bases).
 * Empty strings mean undocumented in seed or not applicable yet.
 */
export interface NewsOutlet {
  name: string
  website: string
  email: string
  instagram: string
  twitter: string
  /** Public RSS/API/feed developer base when documented; otherwise empty string. */
  apiEndpoint: string
}

/** Three major + four minor outlets per participant economy where seed supplies data — or placeholders. */
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
  /** Domestic / national courier or parcel carriers with public contact hints (verify locally). */
  domesticCourierServices: DomesticCourierService[]
  /** Three major + four minor national news outlets (seeded or placeholders; verify locally). */
  newsOutlets: NewsOutletsRoster
  /** Three notable universities covering economics / accounting / computer science / electrical engineering style programmes (informational). */
  notableUniversities: readonly [NotableUniversity, NotableUniversity, NotableUniversity]
  /** Seven principal export commodities (informational; verify trade statistics periodically). */
  mainExportCommodities: MainExportCommodities
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
