import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { BRI_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { BRI_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { BRI_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { BRI_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'
export const china: BeltAndRoadInitiativeCountry = {
  name: 'China',
  iso3166Alpha2: 'CN',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Beijing',
  coordinates: { latitude: 35, longitude: 105 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Beijing', 'China — city 2 (verify)', 'China — city 3 (verify)', 'China — city 4 (verify)', 'China — city 5 (verify)' ] as [string, string, string, string, string],
  population: 1408280000,
  mainLanguages: [ 'Chinese', 'English', 'Regional languages' ],
  currency: 'Chinese yuan (CNY)',
  timezone: 'UTC+08:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['CN'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['CN'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['CN'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['CN'],
  newsOutlets: BRI_NEWS_OUTLETS['CN'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['CN'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['CN'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['CN'],
  rareEarths: BRI_RARE_EARTHS['CN'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['CN'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['CN'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['CN'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['CN'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['CN'],
}
