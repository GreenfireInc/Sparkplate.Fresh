import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
export const northMacedonia: BeltAndRoadInitiativeCountry = {
  name: 'North Macedonia',
  iso3166Alpha2: 'MK',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Skopje',
  coordinates: { latitude: 41.83333333, longitude: 22 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Skopje', 'North Macedonia — city 2 (verify)', 'North Macedonia — city 3 (verify)', 'North Macedonia — city 4 (verify)', 'North Macedonia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 1822612,
  mainLanguages: [ 'Macedonian', 'English', 'Regional languages' ],
  currency: 'denar (MKD)',
  timezone: 'UTC+01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['MK'],
  newsOutlets: BRI_NEWS_OUTLETS['MK'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['MK'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['MK'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['MK'],
  rareEarths: BRI_RARE_EARTHS['MK'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['MK'],
}
