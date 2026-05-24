import type { CaricomCountry } from './types'
import { CARICOM_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CARICOM_NEWS_OUTLETS } from './newsOutletsByIso'
import { CARICOM_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CARICOM_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const britishVirginIslands: CaricomCountry = {
  name: 'British Virgin Islands',
  iso3166Alpha2: 'VG',
  caricomStatus: 'associate_member',
  capital: 'Road Town',
  coordinates: { latitude: 18.4289, longitude: -64.6185 },
  independence: 'British Overseas Territory (UK); associate CARICOM member',
  topMajorCities: ['Road Town', 'Spanish Town', 'East End', 'West End', 'The Settlement'],
  population: 30000,
  mainLanguages: ['English', 'Virgin Islands Creole', 'Spanish'],
  currency: 'United States dollar (USD)',
  timezone: 'America/Tortola',
  foundingLeader: 'Chief Minister era — verify',
  currentLeader: 'Premier — verify; Governor (UK) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Offshore crypto funds context — verify'],
  stablecoin: 'USD; USDT/USDC common',
  domesticCourierServices: CARICOM_DOMESTIC_COURIERS['VG'],
  newsOutlets: CARICOM_NEWS_OUTLETS['VG'],
  notableUniversities: CARICOM_NOTABLE_UNIVERSITIES['VG'],
  mainExportCommodities: CARICOM_MAIN_EXPORT_COMMODITIES['VG'],
  stockExchange: 'BVI finance centre; no large local bourse like major markets',
}
