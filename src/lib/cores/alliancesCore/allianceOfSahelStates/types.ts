/**
 * Reference payloads for Alliance of Sahel States members (informational; verify for production).
 */

export type AllianceOfSahelStatesMembership = 'founding_member'

/**
 * National postal code format descriptor (informational; verify against UPU / national post
 * authority publications before production). `format` uses N = digit, A = letter. `pattern` is
 * an ECMAScript regex when a structured national postcode exists; otherwise empty string.
 */
export interface PostalCodeSchema {
  format: string
  pattern: string
  example: string
  notes: string
}

/**
 * National designated postal operator (informational; verify URLs, handles, and API bases
 * before production). Distinct from private couriers in {@link DomesticCourierService}.
 * `apiEndpoint` is a public tracking / developer REST base when documented; otherwise empty.
 */
export interface DomesticPostService {
  name: string
  website: string
  email: string
  twitter: string
  instagram: string
  linkedin: string
  apiEndpoint: string
  postalCodeSchema: PostalCodeSchema
}

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
 * and API bases before production). `kind` distinguishes copyright from industrial property.
 * `formsUrl` is the online filing / e-services portal when known, else a contact or main site.
 * `apiEndpoint` is a documented public REST / developer API only; almost always empty.
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
 * handles, forms portals, and API bases before production use). AES founding members are
 * UEMOA states supervised regionally by CREPMF. `formsUrl` is the online filing / e-services
 * portal when known, else the main site. `apiEndpoint` is almost always empty.
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

/**
 * Customs office contact row for a seaport gateway (informational; verify addresses,
 * emails, and websites before production use).
 */
export interface CustomsOffice {
  email: string
  website: string
  address: string
}

/**
 * National retail / commercial banking institution used by residents and foreign nationals
 * (informational; verify branch contacts, licensing, routing codes, and API bases before production).
 * `mobileAppIos` / `mobileAppAndroid` are public App Store / Play Store URLs when documented; otherwise empty.
 * `generalRoutingNumber` is the national sort / bank / branch routing code where applicable (not US ABA); otherwise empty.
 * `swiftCode` is the institution SWIFT/BIC when documented; otherwise empty.
 * `apiEndpoint` is a public open-banking / developer REST base when documented; otherwise empty.
 */
export interface NationalBankingInstitution {
  name: string
  phone: string
  address: string
  mobileAppIos: string
  mobileAppAndroid: string
  website: string
  email: string
  twitter: string
  instagram: string
  linkedin: string
  generalRoutingNumber: string
  swiftCode: string
  apiEndpoint: string
}

/** Three principal national banking institutions per economy (informational; verify). */
export type NationalBankingInstitutions = readonly [
  NationalBankingInstitution,
  NationalBankingInstitution,
  NationalBankingInstitution,
]

/**
 * National corporation / company formation and business-registration office used by residents
 * and foreign nationals to incorporate, register entities, and obtain official registration
 * identifiers (informational; verify contacts, filing portals, and identifier taxonomy before production).
 * `registrationNumberLabel` names the primary company identifier issued (analogous to a US EIN/entity
 * number in purpose; may differ from the separate tax-ID label in each jurisdiction).
 * `formsUrl` is the online incorporation / registration filing portal when documented; otherwise empty.
 * `checklistsUrl` is a public step-by-step or documentary checklist when documented; otherwise empty.
 */
export interface CorporationFormationOffice {
  name: string
  phone: string
  address: string
  website: string
  email: string
  twitter: string
  instagram: string
  linkedin: string
  formsUrl: string
  checklistsUrl: string
  registrationNumberLabel: string
}

/**
 * Main international seaport serving the capital or primary commercial maritime gateway
 * (informational; verify URLs, handles, and API bases before production). UN/LOCODE may
 * appear in the name where helpful. Landlocked economies note the principal maritime
 * gateway used for imports/exports. `apiEndpoint` is a public port-data / developer REST
 * base when documented; otherwise empty string.
 */
export interface MainInternationalSeaport {
  name: string
  website: string
  email: string
  twitter: string
  instagram: string
  linkedin: string
  apiEndpoint: string
  customsOffice: CustomsOffice
}

export interface AllianceOfSahelStatesCountry {
  name: string
  iso3166Alpha2: string
  allianceOfSahelStatesStatus: AllianceOfSahelStatesMembership
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
  /** National designated postal operator with postal code schema (informational; verify). */
  domesticPostService: DomesticPostService
  /** Three main national banking institutions for residents and foreign nationals (informational; verify). */
  nationalBankingInstitutions: NationalBankingInstitutions
  /** National corporation formation / business-registration office (informational; verify). */
  corporationFormationOffice: CorporationFormationOffice
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
   * Competent offices for copyright, trademarks, and patents — national copyright registries
   * plus OAPI (regional industrial property for UEMOA / Bangui Agreement members).
   */
  intellectualPropertyDepartments: IntellectualPropertyDepartmentsRoster
  /** National or regional securities / capital-markets regulator (informational; verify). */
  securitiesExchangeCommission: SecuritiesExchangeCommission
  /** Main international airport — capital or primary commercial gateway (informational; verify). */
  mainInternationalAirport: MainInternationalAirport
  /** Main international seaport — coastal gateway or principal maritime access point (informational; verify). */
  mainInternationalSeaport: MainInternationalSeaport
}

/**
 * High-level facts about the Alliance of Sahel States (AES) — reference only; verify for production.
 */
export interface AllianceOfSahelStatesOrganizationInfo {
  officialName: string
  officialNameFrench: string
  abbreviation: string
  predecessorContext: string
  established: {
    /** Liptako–Gourma mutual defense charter (often Bamako). */
    allianceDefensePact: string
    /** Confederation treaty (Niamey summit). */
    confederationTreaty: string
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
