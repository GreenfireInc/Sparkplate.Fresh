import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
export const poland: BeltAndRoadInitiativeCountry = {
  name: 'Poland',
  iso3166Alpha2: 'PL',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Warsaw',
  coordinates: { latitude: 52, longitude: 20 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Warsaw', 'Poland — city 2 (verify)', 'Poland — city 3 (verify)', 'Poland — city 4 (verify)', 'Poland — city 5 (verify)' ] as [string, string, string, string, string],
  population: 37392000,
  mainLanguages: [ 'Polish', 'English', 'Regional languages' ],
  currency: 'Polish złoty (PLN)',
  timezone: 'UTC+01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['PL'],
  newsOutlets: BRI_NEWS_OUTLETS['PL'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['PL'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['PL'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['PL'],
  rareEarths: BRI_RARE_EARTHS['PL'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['PL'],
}
