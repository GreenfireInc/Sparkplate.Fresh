import type { CaricomCountry } from './types'
import { CARICOM_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CARICOM_NEWS_OUTLETS } from './newsOutletsByIso'
import { CARICOM_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const suriname: CaricomCountry = {
  name: 'Suriname',
  iso3166Alpha2: 'SR',
  caricomStatus: 'full_member',
  capital: 'Paramaribo',
  coordinates: { latitude: 5.852, longitude: -55.2038 },
  independence: '1975-11-25',
  topMajorCities: ['Paramaribo', 'Lelydorp', 'Nieuw Nickerie', 'Moengo', 'Nieuw Amsterdam'],
  population: 630000,
  mainLanguages: ['Dutch', 'Sranan Tongo', 'Hindi'],
  currency: 'Surinamese dollar (SRD)',
  timezone: 'America/Paramaribo',
  foundingLeader: 'Johan Ferrier (first President)',
  currentLeader: 'Chan Santokhi (President) — verify',
  cryptocurrencyExchanges: ['Regional OTC', 'Binance (P2P)'],
  stablecoin: 'USDT informal',
  domesticCourierServices: CARICOM_DOMESTIC_COURIERS['SR'],
  newsOutlets: CARICOM_NEWS_OUTLETS['SR'],
  notableUniversities: CARICOM_NOTABLE_UNIVERSITIES['SR'],
  stockExchange: 'Suriname Stock Exchange',
}
