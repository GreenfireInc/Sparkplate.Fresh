import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
export const turkmenistan: BeltAndRoadInitiativeCountry = {
  name: 'Turkmenistan',
  iso3166Alpha2: 'TM',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Ashgabat',
  coordinates: { latitude: 40, longitude: 60 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Ashgabat', 'Turkmenistan — city 2 (verify)', 'Turkmenistan — city 3 (verify)', 'Turkmenistan — city 4 (verify)', 'Turkmenistan — city 5 (verify)' ] as [string, string, string, string, string],
  population: 7057841,
  mainLanguages: [ 'Russian', 'Turkmen', 'Regional languages' ],
  currency: 'Turkmenistan manat (TMT)',
  timezone: 'UTC+05:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['TM'],
  newsOutlets: BRI_NEWS_OUTLETS['TM'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['TM'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['TM'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['TM'],
  rareEarths: BRI_RARE_EARTHS['TM'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['TM'],
}
