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
export const vietnam: BeltAndRoadInitiativeCountry = {
  name: 'Vietnam',
  iso3166Alpha2: 'VN',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Hanoi',
  coordinates: { latitude: 16.16666666, longitude: 107.83333333 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Hanoi', 'Vietnam — city 2 (verify)', 'Vietnam — city 3 (verify)', 'Vietnam — city 4 (verify)', 'Vietnam — city 5 (verify)' ] as [string, string, string, string, string],
  population: 101343800,
  mainLanguages: [ 'Vietnamese', 'English', 'Regional languages' ],
  currency: 'Vietnamese đồng (VND)',
  timezone: 'UTC+07:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['VN'],
  newsOutlets: BRI_NEWS_OUTLETS['VN'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['VN'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['VN'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['VN'],
  rareEarths: BRI_RARE_EARTHS['VN'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['VN'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['VN'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['VN'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['VN'],
}
