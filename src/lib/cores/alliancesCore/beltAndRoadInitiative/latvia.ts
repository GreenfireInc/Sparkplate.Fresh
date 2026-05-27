import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const latvia: BeltAndRoadInitiativeCountry = {
  name: 'Latvia',
  iso3166Alpha2: 'LV',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Riga',
  coordinates: { latitude: 57, longitude: 25 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Riga', 'Latvia — city 2 (verify)', 'Latvia — city 3 (verify)', 'Latvia — city 4 (verify)', 'Latvia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 1829000,
  mainLanguages: [ 'Latvian', 'English', 'Regional languages' ],
  currency: 'euro (EUR)',
  timezone: 'UTC+02:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['LV'],
  newsOutlets: BRI_NEWS_OUTLETS['LV'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['LV'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['LV'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['LV'],
  rareEarths: BRI_RARE_EARTHS['LV'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['LV'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['LV'],
}
