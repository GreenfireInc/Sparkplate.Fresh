/**
 * Reference payloads for BRICS members (informational; verify for production).
 */

export type BricsMembership = 'founding_member'

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

/** National news outlet row (informational; verify URLs, handles, RSS/API bases). */
export interface NewsOutlet {
  name: string
  website: string
  email: string
  instagram: string
  twitter: string
  apiEndpoint: string
}

/** Three major + four minor national outlets per BRICS economy. */
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

export type IntellectualPropertyDepartmentKind = 'copyright' | 'trademarks' | 'patents'

/**
 * National IP office row (informational; verify URLs, handles, forms portals, and API bases
 * before production). `apiEndpoint` almost always empty.
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

/** Copyright, trademarks, and patents competent offices per member (informational; verify). */
export interface IntellectualPropertyDepartmentsRoster {
  copyright: IntellectualPropertyDepartment
  trademarks: IntellectualPropertyDepartment
  patents: IntellectualPropertyDepartment
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

export interface BricsCountry {
  name: string
  iso3166Alpha2: string
  bricsStatus: BricsMembership
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
  /** Three major + four minor national news outlets with public hints (informational). */
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
  /** Competent offices for copyright, trademarks, and patents (informational; verify). */
  intellectualPropertyDepartments: IntellectualPropertyDepartmentsRoster
  /** National or regional securities / capital-markets regulator (informational; verify). */
  securitiesExchangeCommission: SecuritiesExchangeCommission
  /** Main international airport — capital or primary commercial gateway (informational; verify). */
  mainInternationalAirport: MainInternationalAirport
}

/**
 * High-level facts about BRICS — reference only; verify for production.
 */
export interface BricsOrganizationInfo {
  officialName: string
  abbreviation: string
  predecessorContext: string
  established: {
    firstBricsForeignMinistersMeeting: string
    firstLeadersSummit: string
    southAfricaJoined: string
  }
  headquarters: {
    city: string
    country: string
    coordinates: { latitude: number; longitude: number }
    arrangementNotes: string
  }
  principalOrgans: readonly string[]
  objectivesSummary: readonly string[]
  foundingMembersBric2009Iso2: readonly string[]
  foundingBrics2011Iso2: readonly string[]
  memberRecordsInModule: number
}
