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
export const cookIslands: BeltAndRoadInitiativeCountry = {
  name: 'Cook Islands',
  iso3166Alpha2: 'CK',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Avarua',
  coordinates: { latitude: -21.23333333, longitude: -159.76666666 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Avarua', 'Cook Islands — city 2 (verify)', 'Cook Islands — city 3 (verify)', 'Cook Islands — city 4 (verify)', 'Cook Islands — city 5 (verify)' ] as [string, string, string, string, string],
  population: 15040,
  mainLanguages: [ 'English', 'Cook Islands Māori', 'Regional languages' ],
  currency: 'Cook Islands dollar (CKD)',
  timezone: 'UTC-10:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['CK'],
  newsOutlets: BRI_NEWS_OUTLETS['CK'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['CK'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['CK'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['CK'],
  rareEarths: BRI_RARE_EARTHS['CK'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['CK'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['CK'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['CK'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['CK'],
}
