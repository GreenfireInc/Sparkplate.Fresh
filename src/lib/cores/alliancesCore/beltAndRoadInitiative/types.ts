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

/**
 * Seven principal exported chemical elements by mined / refined trade significance
 * (informational; verify against USGS Mineral Commodity Summaries and UN Comtrade periodically).
 * Entries follow the `Element name (Symbol)` convention, e.g. `Gold (Au)`.
 */
export type MainExportedElements = readonly [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
]

/**
 * Documented rare-earth element exports (lanthanides plus Sc / Y) with commercial or near-commercial
 * production / processing. Empty when no documented commercial-scale REE exports.
 */
export type RareEarths = readonly string[]

/**
 * Bond market venue row (informational; verify URLs, handles, and API bases before production).
 * Captures national listed-bond exchanges, OTC fixed-income platforms, interbank bond markets,
 * sovereign primary-market desks (Treasury / DMO), and central-bank auction platforms where no
 * listed venue exists. `apiEndpoint` is a public developer / REST / data base URL when
 * documented; otherwise empty string.
 */
export interface BondMarketVenue {
  name: string
  website: string
  email: string
  twitter: string
  linkedin: string
  apiEndpoint: string
}

/**
 * Main international airport serving the capital or primary commercial gateway (informational;
 * verify URLs, handles, and API bases before production). IATA code appears in the name where
 * helpful. `apiEndpoint` is a public flight-data / developer REST base when documented;
 * otherwise empty string (most airport operators do not publish open APIs).
 */
export interface MainInternationalAirport {
  name: string
  website: string
  email: string
  twitter: string
  instagram: string
  linkedin: string
  apiEndpoint: string
}


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
  /** Seven principal exported chemical elements (informational; verify periodically). */
  mainExportedElements: MainExportedElements
  /** Documented rare-earth element exports; empty when no commercial-scale REE exports. */
  rareEarths: RareEarths
  stockExchange: string
  /**
   * Documented bond market venues — listed-bond exchanges, OTC fixed-income platforms,
   * interbank bond markets, sovereign primary-market desks, and central-bank auction
   * platforms. Empty array when no bond venue is documented.
   */
  bondMarkets: readonly BondMarketVenue[]
  /** Main international airport — capital or primary commercial gateway (informational; verify). */
  mainInternationalAirport: MainInternationalAirport
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
