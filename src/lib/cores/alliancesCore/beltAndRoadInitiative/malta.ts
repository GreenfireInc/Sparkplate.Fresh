import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
export const malta: BeltAndRoadInitiativeCountry = {
  name: 'Malta',
  iso3166Alpha2: 'MT',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Valletta',
  coordinates: { latitude: 35.9375, longitude: 14.3754 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Valletta', 'Malta — city 2 (verify)', 'Malta — city 3 (verify)', 'Malta — city 4 (verify)', 'Malta — city 5 (verify)' ] as [string, string, string, string, string],
  population: 574250,
  mainLanguages: [ 'English', 'Maltese', 'Regional languages' ],
  currency: 'euro (EUR)',
  timezone: 'UTC+01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['MT'],
  newsOutlets: BRI_NEWS_OUTLETS['MT'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['MT'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['MT'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['MT'],
  rareEarths: BRI_RARE_EARTHS['MT'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['MT'],
}
