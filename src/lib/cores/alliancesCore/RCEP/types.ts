/**
 * Reference payloads for RCEP members / parties (Regional Comprehensive Economic Partnership — informational;
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
 * Captures national listed-bond exchanges, OTC fixed-income platforms, sovereign primary-market
 * desks (Treasury / DMO), and central-bank auction platforms where no listed venue exists.
 * `apiEndpoint` is a public developer / REST / data base URL when documented; otherwise empty string.
 */
export interface BondMarketVenue {
  name: string
  website: string
  email: string
  twitter: string
  linkedin: string
  apiEndpoint: string
}

export interface RcepCountry {
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
  /** Three major + four minor national news outlets with public contact hints (verify locally). */
  newsOutlets: NewsOutletsRoster
  /** Seven principal export commodities (informational; verify trade statistics periodically). */
  mainExportCommodities: MainExportCommodities
  /** Seven principal exported chemical elements (informational; verify periodically). */
  mainExportedElements: MainExportedElements
  /** Documented rare-earth element exports; empty when no commercial-scale REE exports. */
  rareEarths: RareEarths
  stockExchange: string
  /**
   * Documented bond market venues — listed-bond exchanges, OTC fixed-income platforms,
   * sovereign primary-market desks, and central-bank auction platforms. Empty array when
   * no bond venue is documented.
   */
  bondMarkets: readonly BondMarketVenue[]
}

/**
 * Reference summary for the RCEP Agreement — informational; verify against depositary publications.
 */
export interface RcepOrganizationInfo {
  officialName: string
  abbreviation: string
  established: string
  headquartersCity: string
  headquartersCountry: string
  memberStatesIso2: readonly string[]
  memberRecordsInModule: number
}
