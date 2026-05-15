/**
 * Reference payloads for COMESA members (Common Market for Eastern and Southern Africa — informational; verify for production).
 *
 * User grouping (informational only):
 * • Horn / North Africa corridor: Djibouti, Egypt, Eritrea, Ethiopia, Libya, Sudan, Tunisia
 * • Indian Ocean: Comoros, Madagascar, Mauritius, Seychelles
 * • African Great Lakes: Burundi, Kenya, Malawi, Rwanda, Uganda
 * • Southern Africa: Eswatini, Zambia, Zimbabwe
 * • Central Africa: Democratic Republic of the Congo
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

export interface ComesaCountry {
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
  stockExchange: string
}

/**
 * Reference summary for COMESA itself — informational; verify for production.
 */
export interface ComesaOrganizationInfo {
  officialName: string
  abbreviation: string
  established: string
  headquartersCity: string
  headquartersCountry: string
  memberStatesIso2: readonly string[]
  memberRecordsInModule: number
}
