/**
 * Reference payloads for NATO members (North Atlantic Treaty Organization allies — informational;
 * verify against northatlantictreaty.org / national releases).
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

export interface NatoCountry {
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

/** Reference summary for NATO itself — informational. */
export interface NatoOrganizationInfo {
  officialName: string
  abbreviation: string
  established: string
  headquartersCity: string
  headquartersCountry: string
  memberStatesIso2: readonly string[]
  memberRecordsInModule: number
}
