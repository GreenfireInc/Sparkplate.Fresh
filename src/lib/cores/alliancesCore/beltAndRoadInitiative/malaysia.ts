import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const malaysia: BeltAndRoadInitiativeCountry = {
  name: 'Malaysia',
  iso3166Alpha2: 'MY',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Kuala Lumpur',
  coordinates: { latitude: 2.5, longitude: 112.5 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Kuala Lumpur', 'Malaysia — city 2 (verify)', 'Malaysia — city 3 (verify)', 'Malaysia — city 4 (verify)', 'Malaysia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 34231700,
  mainLanguages: [ 'English', 'Malay', 'Regional languages' ],
  currency: 'Malaysian ringgit (MYR)',
  timezone: 'UTC+08:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['MY'],
  newsOutlets: BRI_NEWS_OUTLETS['MY'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['MY'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['MY'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['MY'],
  rareEarths: BRI_RARE_EARTHS['MY'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['MY'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['MY'],
}
