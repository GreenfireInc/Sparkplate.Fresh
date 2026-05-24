import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const vanuatu: BeltAndRoadInitiativeCountry = {
  name: 'Vanuatu',
  iso3166Alpha2: 'VU',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Port Vila',
  coordinates: { latitude: -16, longitude: 167 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Port Vila', 'Vanuatu — city 2 (verify)', 'Vanuatu — city 3 (verify)', 'Vanuatu — city 4 (verify)', 'Vanuatu — city 5 (verify)' ] as [string, string, string, string, string],
  population: 321409,
  mainLanguages: [ 'Bislama', 'English', 'French' ],
  currency: 'Vanuatu vatu (VUV)',
  timezone: 'UTC+11:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['VU'],
  newsOutlets: BRI_NEWS_OUTLETS['VU'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['VU'],
  stockExchange: 'National or regional exchange (verify)',
}
