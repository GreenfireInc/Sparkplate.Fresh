import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const brunei: BeltAndRoadInitiativeCountry = {
  name: 'Brunei',
  iso3166Alpha2: 'BN',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Bandar Seri Begawan',
  coordinates: { latitude: 4.5, longitude: 114.66666666 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Bandar Seri Begawan', 'Brunei — city 2 (verify)', 'Brunei — city 3 (verify)', 'Brunei — city 4 (verify)', 'Brunei — city 5 (verify)' ] as [string, string, string, string, string],
  population: 455500,
  mainLanguages: [ 'Malay', 'English', 'Regional languages' ],
  currency: 'Brunei dollar (BND)',
  timezone: 'UTC+08:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['BN'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['BN'],
  stockExchange: 'National or regional exchange (verify)',
}
