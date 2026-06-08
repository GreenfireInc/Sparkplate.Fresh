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
export const bangladesh: BeltAndRoadInitiativeCountry = {
  name: 'Bangladesh',
  iso3166Alpha2: 'BD',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Dhaka',
  coordinates: { latitude: 24, longitude: 90 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Dhaka', 'Bangladesh — city 2 (verify)', 'Bangladesh — city 3 (verify)', 'Bangladesh — city 4 (verify)', 'Bangladesh — city 5 (verify)' ] as [string, string, string, string, string],
  population: 169828911,
  mainLanguages: [ 'Bengali', 'English', 'Regional languages' ],
  currency: 'Bangladeshi taka (BDT)',
  timezone: 'UTC+06:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['BD'],
  domesticPostService: BRI_DOMESTIC_POST_SERVICES['BD'],
  nationalBankingInstitutions: BRI_NATIONAL_BANKING_INSTITUTIONS['BD'],
  corporationFormationOffice: BRI_CORPORATION_FORMATION_OFFICES['BD'],
  newsOutlets: BRI_NEWS_OUTLETS['BD'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['BD'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['BD'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['BD'],
  rareEarths: BRI_RARE_EARTHS['BD'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['BD'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['BD'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['BD'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['BD'],
  mainInternationalSeaport: BRI_MAIN_INTERNATIONAL_SEAPORTS['BD'],
}
