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
export const armenia: BeltAndRoadInitiativeCountry = {
  name: 'Armenia',
  iso3166Alpha2: 'AM',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Yerevan',
  coordinates: { latitude: 40, longitude: 45 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Yerevan', 'Armenia — city 2 (verify)', 'Armenia — city 3 (verify)', 'Armenia — city 4 (verify)', 'Armenia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 3076200,
  mainLanguages: [ 'Armenian', 'English', 'Regional languages' ],
  currency: 'Armenian dram (AMD)',
  timezone: 'UTC+04:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['AM'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['AM'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['AM'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['AM'],
  newsOutlets: BRI_NEWS_OUTLETS['AM'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['AM'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['AM'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['AM'],
  rareEarths: BRI_RARE_EARTHS['AM'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['AM'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['AM'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['AM'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['AM'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['AM'],
}
