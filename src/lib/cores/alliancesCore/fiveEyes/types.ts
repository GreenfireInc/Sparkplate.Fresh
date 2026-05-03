/**
 * Reference payloads for Five Eyes members (signals intelligence-sharing alliance —
 * informational; verify for production).
 */

export interface FiveEyesCountry {
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
 * Reference summary for the Five Eyes bloc — informational; verify for production.
 */
export interface FiveEyesOrganizationInfo {
  officialName: string
  abbreviation: string
  established: string
  headquartersCity: string
  headquartersCountry: string
  memberStatesIso2: readonly string[]
  memberRecordsInModule: number
}
