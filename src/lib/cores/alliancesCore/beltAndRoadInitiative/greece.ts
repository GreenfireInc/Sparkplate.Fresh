import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
export const greece: BeltAndRoadInitiativeCountry = {
  name: 'Greece',
  iso3166Alpha2: 'GR',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Athens',
  coordinates: { latitude: 39, longitude: 22 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Athens', 'Greece — city 2 (verify)', 'Greece — city 3 (verify)', 'Greece — city 4 (verify)', 'Greece — city 5 (verify)' ] as [string, string, string, string, string],
  population: 10400720,
  mainLanguages: [ 'Greek', 'English', 'Regional languages' ],
  currency: 'euro (EUR)',
  timezone: 'UTC+02:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['GR'],
  newsOutlets: BRI_NEWS_OUTLETS['GR'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['GR'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['GR'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['GR'],
  rareEarths: BRI_RARE_EARTHS['GR'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['GR'],
}
