import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
export const belarus: BeltAndRoadInitiativeCountry = {
  name: 'Belarus',
  iso3166Alpha2: 'BY',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Minsk',
  coordinates: { latitude: 53, longitude: 28 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Minsk', 'Belarus — city 2 (verify)', 'Belarus — city 3 (verify)', 'Belarus — city 4 (verify)', 'Belarus — city 5 (verify)' ] as [string, string, string, string, string],
  population: 9109280,
  mainLanguages: [ 'Belarusian', 'Russian', 'Regional languages' ],
  currency: 'Belarusian ruble (BYN)',
  timezone: 'UTC+03:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['BY'],
  newsOutlets: BRI_NEWS_OUTLETS['BY'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['BY'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['BY'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['BY'],
  rareEarths: BRI_RARE_EARTHS['BY'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['BY'],
}
