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
export const czechRepublic: BeltAndRoadInitiativeCountry = {
  name: 'Czech Republic',
  iso3166Alpha2: 'CZ',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Prague',
  coordinates: { latitude: 49.75, longitude: 15.5 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Prague', 'Czech Republic — city 2 (verify)', 'Czech Republic — city 3 (verify)', 'Czech Republic — city 4 (verify)', 'Czech Republic — city 5 (verify)' ] as [string, string, string, string, string],
  population: 10882341,
  mainLanguages: [ 'Czech', 'Slovak', 'Regional languages' ],
  currency: 'Czech koruna (CZK)',
  timezone: 'UTC+01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['CZ'],
  newsOutlets: BRI_NEWS_OUTLETS['CZ'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['CZ'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['CZ'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['CZ'],
  rareEarths: BRI_RARE_EARTHS['CZ'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['CZ'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['CZ'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['CZ'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['CZ'],
}
