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
export const ukraine: BeltAndRoadInitiativeCountry = {
  name: 'Ukraine',
  iso3166Alpha2: 'UA',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Kyiv',
  coordinates: { latitude: 49, longitude: 32 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Kyiv', 'Ukraine — city 2 (verify)', 'Ukraine — city 3 (verify)', 'Ukraine — city 4 (verify)', 'Ukraine — city 5 (verify)' ] as [string, string, string, string, string],
  population: 32862000,
  mainLanguages: [ 'Ukrainian', 'English', 'Regional languages' ],
  currency: 'Ukrainian hryvnia (UAH)',
  timezone: 'UTC+02:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['UA'],
  newsOutlets: BRI_NEWS_OUTLETS['UA'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['UA'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['UA'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['UA'],
  rareEarths: BRI_RARE_EARTHS['UA'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['UA'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['UA'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['UA'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['UA'],
}
