/**
 * Reference payloads for Arab Maghreb Union (AMU) members (informational; verify for production).
 */

export type AmuMembership = 'founding_member'

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
 * Notable higher-education institution (informational; verify programmes and contacts locally).
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
 * production. Empty when no documented commercial-scale REE exports.
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

export type IntellectualPropertyDepartmentKind = 'copyright' | 'trademarks' | 'patents'

/**
 * National or regional IP office row (informational; verify URLs, handles, forms portals,
 * and API bases before production). `formsUrl` is the online filing / e-services portal when
 * known. `apiEndpoint` is a documented public REST / developer API only; almost always empty.
 */
export interface IntellectualPropertyDepartment {
  kind: IntellectualPropertyDepartmentKind
  name: string
  website: string
  email: string
  twitter: string
  linkedin: string
  formsUrl: string
  apiEndpoint: string
}

/** Copyright, trademarks, and patents competent offices per economy (informational; verify). */
export interface IntellectualPropertyDepartmentsRoster {
  copyright: IntellectualPropertyDepartment
  trademarks: IntellectualPropertyDepartment
  patents: IntellectualPropertyDepartment
}

/**
 * National or regional securities / capital-markets regulator (informational; verify URLs,
 * handles, forms portals, and API bases before production use). `formsUrl` is the online
 * filing / e-services portal when known, else the main site. `apiEndpoint` is almost always empty.
 */
export interface SecuritiesExchangeCommission {
  name: string
  website: string
  email: string
  twitter: string
  linkedin: string
  formsUrl: string
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

export interface AmuCountry {
  name: string
  iso3166Alpha2: string
  amuStatus: AmuMembership
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
   * venue exists. Empty array when no bond venue is documented.
   */
  bondMarkets: readonly BondMarketVenue[]
  /**
   * Competent offices for copyright, trademarks, and patents — national registries and, for
   * Mauritania, OAPI (regional industrial property).
   */
  intellectualPropertyDepartments: IntellectualPropertyDepartmentsRoster
  /** National or regional securities / capital-markets regulator (informational; verify). */
  securitiesExchangeCommission: SecuritiesExchangeCommission
  /** Main international airport — capital or primary commercial gateway (informational; verify). */
  mainInternationalAirport: MainInternationalAirport
}

/**
 * High-level facts about the Arab Maghreb Union (AMU) — reference only; verify for production.
 */
export interface AmuOrganizationInfo {
  officialName: string
  officialNameFrench: string
  officialNameArabic: string
  abbreviation: string
  abbreviationFrench: string
  predecessorContext: string
  established: {
    treatyOfMarrakesh: string
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
