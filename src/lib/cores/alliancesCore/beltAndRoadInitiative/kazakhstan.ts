import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
export const kazakhstan: BeltAndRoadInitiativeCountry = {
  name: 'Kazakhstan',
  iso3166Alpha2: 'KZ',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Astana',
  coordinates: { latitude: 48.0196, longitude: 66.9237 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Astana', 'Kazakhstan — city 2 (verify)', 'Kazakhstan — city 3 (verify)', 'Kazakhstan — city 4 (verify)', 'Kazakhstan — city 5 (verify)' ] as [string, string, string, string, string],
  population: 20426568,
  mainLanguages: [ 'Kazakh', 'Russian', 'Regional languages' ],
  currency: 'Kazakhstani tenge (KZT)',
  timezone: 'UTC+05:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['KZ'],
  newsOutlets: BRI_NEWS_OUTLETS['KZ'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['KZ'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['KZ'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['KZ'],
  rareEarths: BRI_RARE_EARTHS['KZ'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['KZ'],
}
