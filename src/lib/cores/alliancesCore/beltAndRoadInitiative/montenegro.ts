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
export const montenegro: BeltAndRoadInitiativeCountry = {
  name: 'Montenegro',
  iso3166Alpha2: 'ME',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Podgorica',
  coordinates: { latitude: 42.5, longitude: 19.3 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Podgorica', 'Montenegro — city 2 (verify)', 'Montenegro — city 3 (verify)', 'Montenegro — city 4 (verify)', 'Montenegro — city 5 (verify)' ] as [string, string, string, string, string],
  population: 623327,
  mainLanguages: [ 'Montenegrin', 'English', 'Regional languages' ],
  currency: 'euro (EUR)',
  timezone: 'UTC+01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['ME'],
  newsOutlets: BRI_NEWS_OUTLETS['ME'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['ME'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['ME'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['ME'],
  rareEarths: BRI_RARE_EARTHS['ME'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['ME'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['ME'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['ME'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['ME'],
}
