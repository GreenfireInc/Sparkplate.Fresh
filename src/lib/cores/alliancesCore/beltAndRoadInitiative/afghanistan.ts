import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { BRI_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
export const afghanistan: BeltAndRoadInitiativeCountry = {
  name: 'Afghanistan',
  iso3166Alpha2: 'AF',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Kabul',
  coordinates: { latitude: 33, longitude: 65 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Kabul', 'Afghanistan — city 2 (verify)', 'Afghanistan — city 3 (verify)', 'Afghanistan — city 4 (verify)', 'Afghanistan — city 5 (verify)' ] as [string, string, string, string, string],
  population: 43844000,
  mainLanguages: [ 'Dari', 'Pashto', 'Turkmen' ],
  currency: 'Afghan afghani (AFN)',
  timezone: 'UTC+04:30',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['AF'],
  newsOutlets: BRI_NEWS_OUTLETS['AF'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['AF'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['AF'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['AF'],
  rareEarths: BRI_RARE_EARTHS['AF'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['AF'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['AF'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['AF'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['AF'],
}
