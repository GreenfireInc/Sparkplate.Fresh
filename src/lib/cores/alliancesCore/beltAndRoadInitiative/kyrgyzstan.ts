import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const kyrgyzstan: BeltAndRoadInitiativeCountry = {
  name: 'Kyrgyzstan',
  iso3166Alpha2: 'KG',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Bishkek',
  coordinates: { latitude: 41, longitude: 75 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Bishkek', 'Kyrgyzstan — city 2 (verify)', 'Kyrgyzstan — city 3 (verify)', 'Kyrgyzstan — city 4 (verify)', 'Kyrgyzstan — city 5 (verify)' ] as [string, string, string, string, string],
  population: 7281800,
  mainLanguages: [ 'Kyrgyz', 'Russian', 'Regional languages' ],
  currency: 'Kyrgyzstani som (KGS)',
  timezone: 'UTC+06:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['KG'],
  newsOutlets: BRI_NEWS_OUTLETS['KG'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['KG'],
  stockExchange: 'National or regional exchange (verify)',
}
