/**
 * Reference payloads for GCC members (Cooperation Council for the Arab States of the Gulf —
 * informational; verify for production).
 */

export interface GccCountry {
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
 * Reference summary for the GCC — informational; verify for production.
 */
export interface GccOrganizationInfo {
  officialName: string
  abbreviation: string
  established: string
  headquartersCity: string
  headquartersCountry: string
  memberStatesIso2: readonly string[]
  memberRecordsInModule: number
}
