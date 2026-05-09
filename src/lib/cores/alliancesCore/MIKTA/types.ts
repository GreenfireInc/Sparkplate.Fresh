/**
 * Reference payloads for MIKTA members (Mexico, Indonesia, South Korea, Türkiye, Australia —
 * cross-regional middle-power consultative grouping est. 2013 UN General Assembly sidelines;
 * informational; verify for production).
 */

export interface MiktaCountry {
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
 * Reference summary for the MIKTA grouping — informal cross-regional consultative partnership
 * of middle powers (no permanent secretariat; rotating chair); informational.
 */
export interface MiktaOrganizationInfo {
  officialName: string
  abbreviation: string
  established: string
  headquartersCity: string
  headquartersCountry: string
  memberStatesIso2: readonly string[]
  memberRecordsInModule: number
}
