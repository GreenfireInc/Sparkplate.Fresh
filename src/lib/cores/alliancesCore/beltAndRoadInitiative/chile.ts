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
export const chile: BeltAndRoadInitiativeCountry = {
  name: 'Chile',
  iso3166Alpha2: 'CL',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Santiago',
  coordinates: { latitude: -30, longitude: -71 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Santiago', 'Chile — city 2 (verify)', 'Chile — city 3 (verify)', 'Chile — city 4 (verify)', 'Chile — city 5 (verify)' ] as [string, string, string, string, string],
  population: 20206953,
  mainLanguages: [ 'Spanish', 'English', 'Regional languages' ],
  currency: 'Chilean peso (CLP)',
  timezone: 'UTC-06:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['CL'],
  newsOutlets: BRI_NEWS_OUTLETS['CL'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['CL'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['CL'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['CL'],
  rareEarths: BRI_RARE_EARTHS['CL'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['CL'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['CL'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['CL'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['CL'],
}
