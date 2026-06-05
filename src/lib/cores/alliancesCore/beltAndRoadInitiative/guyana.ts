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
export const guyana: BeltAndRoadInitiativeCountry = {
  name: 'Guyana',
  iso3166Alpha2: 'GY',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Georgetown',
  coordinates: { latitude: 5, longitude: -59 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Georgetown', 'Guyana — city 2 (verify)', 'Guyana — city 3 (verify)', 'Guyana — city 4 (verify)', 'Guyana — city 5 (verify)' ] as [string, string, string, string, string],
  population: 772975,
  mainLanguages: [ 'English', 'English', 'Regional languages' ],
  currency: 'Guyanese dollar (GYD)',
  timezone: 'UTC-04:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['GY'],
  newsOutlets: BRI_NEWS_OUTLETS['GY'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['GY'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['GY'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['GY'],
  rareEarths: BRI_RARE_EARTHS['GY'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['GY'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['GY'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['GY'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['GY'],
}
