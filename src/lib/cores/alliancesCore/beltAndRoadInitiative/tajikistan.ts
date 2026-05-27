import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const tajikistan: BeltAndRoadInitiativeCountry = {
  name: 'Tajikistan',
  iso3166Alpha2: 'TJ',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Dushanbe',
  coordinates: { latitude: 39, longitude: 71 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Dushanbe', 'Tajikistan — city 2 (verify)', 'Tajikistan — city 3 (verify)', 'Tajikistan — city 4 (verify)', 'Tajikistan — city 5 (verify)' ] as [string, string, string, string, string],
  population: 10499000,
  mainLanguages: [ 'Russian', 'Tajik', 'Regional languages' ],
  currency: 'Tajikistani somoni (TJS)',
  timezone: 'UTC+05:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['TJ'],
  newsOutlets: BRI_NEWS_OUTLETS['TJ'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['TJ'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['TJ'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['TJ'],
  rareEarths: BRI_RARE_EARTHS['TJ'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['TJ'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['TJ'],
}
