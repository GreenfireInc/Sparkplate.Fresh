import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const bosniaAndHerzegovina: BeltAndRoadInitiativeCountry = {
  name: 'Bosnia and Herzegovina',
  iso3166Alpha2: 'BA',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Sarajevo',
  coordinates: { latitude: 44, longitude: 18 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Sarajevo', 'Bosnia and Herzegovina — city 2 (verify)', 'Bosnia and Herzegovina — city 3 (verify)', 'Bosnia and Herzegovina — city 4 (verify)', 'Bosnia and Herzegovina — city 5 (verify)' ] as [string, string, string, string, string],
  population: 3422000,
  mainLanguages: [ 'Bosnian', 'Croatian', 'Serbian' ],
  currency: 'Bosnia and Herzegovina convertible mark (BAM)',
  timezone: 'UTC+01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['BA'],
  newsOutlets: BRI_NEWS_OUTLETS['BA'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['BA'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['BA'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['BA'],
  rareEarths: BRI_RARE_EARTHS['BA'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['BA'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['BA'],
}
