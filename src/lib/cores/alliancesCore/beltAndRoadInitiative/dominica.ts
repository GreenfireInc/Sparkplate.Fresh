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
export const dominica: BeltAndRoadInitiativeCountry = {
  name: 'Dominica',
  iso3166Alpha2: 'DM',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Roseau',
  coordinates: { latitude: 15.41666666, longitude: -61.33333333 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Roseau', 'Dominica — city 2 (verify)', 'Dominica — city 3 (verify)', 'Dominica — city 4 (verify)', 'Dominica — city 5 (verify)' ] as [string, string, string, string, string],
  population: 67408,
  mainLanguages: [ 'English', 'English', 'Regional languages' ],
  currency: 'Eastern Caribbean dollar (XCD)',
  timezone: 'UTC-04:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['DM'],
  newsOutlets: BRI_NEWS_OUTLETS['DM'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['DM'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['DM'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['DM'],
  rareEarths: BRI_RARE_EARTHS['DM'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['DM'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['DM'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['DM'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['DM'],
}
