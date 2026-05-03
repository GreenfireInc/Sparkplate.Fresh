/**
 * Reference payloads for ASEAN members (Association of Southeast Asian Nations — informational;
 * verify for production).
 */

export interface AseanCountry {
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
 * Reference summary for ASEAN — informational; verify against asean.org and Charter instruments.
 */
export interface AseanOrganizationInfo {
  officialName: string
  abbreviation: string
  established: string
  headquartersCity: string
  headquartersCountry: string
  memberStatesIso2: readonly string[]
  memberRecordsInModule: number
}
