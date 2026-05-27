/**
 * Reference payloads for African Union member states (informational; verify for production).
 */

export type AfricanUnionMembership = 'member' | 'suspended'

/**
 * National / domestic courier row (informational; verify URLs, handles, and API bases before production).
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
 * Notable higher-education institution row (informational; verify programmes, URLs, and contacts locally).
 * Rows are chosen for visibility of economics / accounting / computer science / electrical engineering style faculties.
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
 * production. Empty when no documented commercial-scale REE exports. Format mirrors
 * {@link MainExportedElements}: `Element name (Symbol)`, e.g. `Neodymium (Nd)`.
 */
export type RareEarths = readonly string[]

/**
 * Bond market venue row (informational; verify URLs, handles, and API bases before production).
 * Captures national listed-bond exchanges (e.g. BSE Botswana), regional listed-bond exchanges
 * (BRVM for UEMOA, BVMAC for CEMAC), and central-bank Treasury bill / bond desks where no
 * listed venue exists. `apiEndpoint` is a public developer / REST / data base URL when
 * documented; otherwise empty string (most African venues distribute data only via paid
 * Bloomberg / Refinitiv / IRESS channels).
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
 * otherwise empty string (most African airport operators do not publish open APIs).
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
  /** Domestic / national courier or parcel carriers with public contact hints (verify locally). */
  domesticCourierServices: DomesticCourierService[]
  /** Three notable universities with economics, accounting, computer science and/or electrical-engineering faculties (informational). */
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
   * Documented bond market venues — national listed-bond exchanges, regional listed-bond
   * exchanges (BRVM / BVMAC), and central-bank Treasury bill / bond desks where no listed
   * venue exists. Empty array when no bond venue is documented (e.g. Sahrawi Republic).
   */
  bondMarkets: readonly BondMarketVenue[]
  /** Main international airport — capital or primary commercial gateway (informational; verify). */
  mainInternationalAirport: MainInternationalAirport
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
