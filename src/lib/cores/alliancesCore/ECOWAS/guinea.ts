import type { EcowasCountry } from './types'
import { ECOWAS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ECOWAS_NEWS_OUTLETS } from './newsOutletsByIso'
import { ECOWAS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const guinea: EcowasCountry = {
  name: 'Guinea',
  iso3166Alpha2: 'GN',
  capital: 'Conakry',
  coordinates: { latitude: 9.6412, longitude: -13.5784 },
  independence: '1958-10-02',
  topMajorCities: ['Conakry', 'Nzérékoré', 'Kankan', 'Kindia', 'Labé'],
  population: 14000000,
  mainLanguages: ['French', 'Fula', 'Maninka'],
  currency: 'Guinean franc (GNF)',
  timezone: 'Africa/Conakry',
  foundingLeader: 'Ahmed Sékou Touré (first President)',
  currentLeader: 'Transition military leadership (Colonel Mamady Doumbouya era) — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card (regional)', 'OTC'],
  stablecoin: 'USDT informal',
  domesticCourierServices: ECOWAS_DOMESTIC_COURIERS['GN'],
  newsOutlets: ECOWAS_NEWS_OUTLETS['GN'],
  notableUniversities: ECOWAS_NOTABLE_UNIVERSITIES['GN'],
  stockExchange: 'No major national exchange; informal OTC',
}
