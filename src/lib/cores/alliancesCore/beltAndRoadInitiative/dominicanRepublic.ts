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
export const dominicanRepublic: BeltAndRoadInitiativeCountry = {
  name: 'Dominican Republic',
  iso3166Alpha2: 'DO',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Santo Domingo',
  coordinates: { latitude: 19, longitude: -70.66666666 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Santo Domingo', 'Dominican Republic — city 2 (verify)', 'Dominican Republic — city 3 (verify)', 'Dominican Republic — city 4 (verify)', 'Dominican Republic — city 5 (verify)' ] as [string, string, string, string, string],
  population: 10771504,
  mainLanguages: [ 'Spanish', 'English', 'Regional languages' ],
  currency: 'Dominican peso (DOP)',
  timezone: 'UTC-04:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['DO'],
  newsOutlets: BRI_NEWS_OUTLETS['DO'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['DO'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['DO'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['DO'],
  rareEarths: BRI_RARE_EARTHS['DO'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['DO'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['DO'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['DO'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['DO'],
}
