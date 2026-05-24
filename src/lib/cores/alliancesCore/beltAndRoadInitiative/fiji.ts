import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const fiji: BeltAndRoadInitiativeCountry = {
  name: 'Fiji',
  iso3166Alpha2: 'FJ',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Suva',
  coordinates: { latitude: -17.7134, longitude: 178.065 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Suva', 'Fiji — city 2 (verify)', 'Fiji — city 3 (verify)', 'Fiji — city 4 (verify)', 'Fiji — city 5 (verify)' ] as [string, string, string, string, string],
  population: 900869,
  mainLanguages: [ 'English', 'Fijian', 'Fiji Hindi' ],
  currency: 'Fijian dollar (FJD)',
  timezone: 'UTC+12:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['FJ'],
  newsOutlets: BRI_NEWS_OUTLETS['FJ'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['FJ'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['FJ'],
  stockExchange: 'National or regional exchange (verify)',
}
