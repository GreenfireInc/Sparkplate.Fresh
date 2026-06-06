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
export const grenada: BeltAndRoadInitiativeCountry = {
  name: 'Grenada',
  iso3166Alpha2: 'GD',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'St. George\'s',
  coordinates: { latitude: 12.11666666, longitude: -61.66666666 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'St. George\'s', 'Grenada — city 2 (verify)', 'Grenada — city 3 (verify)', 'Grenada — city 4 (verify)', 'Grenada — city 5 (verify)' ] as [string, string, string, string, string],
  population: 109021,
  mainLanguages: [ 'English', 'English', 'Regional languages' ],
  currency: 'Eastern Caribbean dollar (XCD)',
  timezone: 'UTC-04:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['GD'],
  newsOutlets: BRI_NEWS_OUTLETS['GD'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['GD'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['GD'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['GD'],
  rareEarths: BRI_RARE_EARTHS['GD'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['GD'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['GD'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['GD'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['GD'],
}
