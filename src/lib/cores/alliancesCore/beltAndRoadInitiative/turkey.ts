import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const turkey: BeltAndRoadInitiativeCountry = {
  name: 'Turkey',
  iso3166Alpha2: 'TR',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Ankara',
  coordinates: { latitude: 39, longitude: 35 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Ankara', 'Turkey — city 2 (verify)', 'Turkey — city 3 (verify)', 'Turkey — city 4 (verify)', 'Turkey — city 5 (verify)' ] as [string, string, string, string, string],
  population: 85664944,
  mainLanguages: [ 'Turkish', 'English', 'Regional languages' ],
  currency: 'Turkish lira (TRY)',
  timezone: 'UTC+03:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['TR'],
  newsOutlets: BRI_NEWS_OUTLETS['TR'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['TR'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['TR'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['TR'],
  rareEarths: BRI_RARE_EARTHS['TR'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['TR'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['TR'],
}
