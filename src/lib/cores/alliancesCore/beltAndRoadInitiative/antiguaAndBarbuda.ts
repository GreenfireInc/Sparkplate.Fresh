import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const antiguaAndBarbuda: BeltAndRoadInitiativeCountry = {
  name: 'Antigua and Barbuda',
  iso3166Alpha2: 'AG',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Saint John\'s',
  coordinates: { latitude: 17.05, longitude: -61.8 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Saint John\'s', 'Antigua and Barbuda — city 2 (verify)', 'Antigua and Barbuda — city 3 (verify)', 'Antigua and Barbuda — city 4 (verify)', 'Antigua and Barbuda — city 5 (verify)' ] as [string, string, string, string, string],
  population: 103603,
  mainLanguages: [ 'English', 'English', 'Regional languages' ],
  currency: 'Eastern Caribbean dollar (XCD)',
  timezone: 'UTC-04:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['AG'],
  newsOutlets: BRI_NEWS_OUTLETS['AG'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['AG'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['AG'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['AG'],
  rareEarths: BRI_RARE_EARTHS['AG'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['AG'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['AG'],
}
