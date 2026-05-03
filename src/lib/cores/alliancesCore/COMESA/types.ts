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
