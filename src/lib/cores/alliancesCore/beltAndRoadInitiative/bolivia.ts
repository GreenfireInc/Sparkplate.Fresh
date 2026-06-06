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
export const bolivia: BeltAndRoadInitiativeCountry = {
  name: 'Bolivia',
  iso3166Alpha2: 'BO',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Sucre',
  coordinates: { latitude: -17, longitude: -65 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Sucre', 'Bolivia — city 2 (verify)', 'Bolivia — city 3 (verify)', 'Bolivia — city 4 (verify)', 'Bolivia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 11365333,
  mainLanguages: [ 'Aymara', 'Guaraní', 'Quechua' ],
  currency: 'Bolivian boliviano (BOB)',
  timezone: 'UTC-04:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['BO'],
  newsOutlets: BRI_NEWS_OUTLETS['BO'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['BO'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['BO'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['BO'],
  rareEarths: BRI_RARE_EARTHS['BO'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['BO'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['BO'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['BO'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['BO'],
}
