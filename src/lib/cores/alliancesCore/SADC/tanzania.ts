import type { SadcCountry } from './types'
import { SADC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { SADC_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { SADC_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { SADC_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { SADC_NEWS_OUTLETS } from './newsOutletsByIso'
import { SADC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { SADC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { SADC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { SADC_RARE_EARTHS } from './rareEarthsByIso'
import { SADC_BOND_MARKETS } from './bondMarketsByIso'
import { SADC_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { SADC_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { SADC_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { SADC_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const tanzania: SadcCountry = {
  name: 'Tanzania',
  iso3166Alpha2: 'TZ',
  capital: 'Dodoma',
  coordinates: { latitude: -6.163, longitude: 35.7516 },
  independence: '1961-12-09 (Tanganyika); union with Zanzibar 1964',
  topMajorCities: ['Dar es Salaam', 'Mwanza', 'Arusha', 'Dodoma', 'Mbeya'],
  population: 67000000,
  mainLanguages: ['Swahili', 'English', 'Arabic influences (coast/Zanzibar)'],
  currency: 'Tanzanian shilling (TZS)',
  timezone: 'Africa/Dar_es_Salaam',
  foundingLeader: 'Julius Nyerere (Mwalimu; union architect)',
  currentLeader: 'President Samia Suluhu Hassan — verify',
  cryptocurrencyExchanges: ['Bank of Tanzania wary stance historically; OTC informal'],
  stablecoin: 'Informal USD/USDT',
  domesticCourierServices: SADC_DOMESTIC_COURIERS['TZ'],
  domesticPostService: SADC_DOMESTIC_POST_SERVICES['TZ'],
  nationalBankingInstitutions: SADC_NATIONAL_BANKING_INSTITUTIONS['TZ'],
  corporationFormationOffice: SADC_CORPORATION_FORMATION_OFFICES['TZ'],
  newsOutlets: SADC_NEWS_OUTLETS['TZ'],
  notableUniversities: SADC_NOTABLE_UNIVERSITIES['TZ'],
  mainExportCommodities: SADC_MAIN_EXPORT_COMMODITIES['TZ'],
  mainExportedElements: SADC_MAIN_EXPORTED_ELEMENTS['TZ'],
  rareEarths: SADC_RARE_EARTHS['TZ'],
  stockExchange: 'Dar es Salaam Stock Exchange (DSE)',
  bondMarkets: SADC_BOND_MARKETS['TZ'],
  mainInternationalAirport: SADC_MAIN_INTERNATIONAL_AIRPORTS['TZ'],
  mainInternationalSeaport: SADC_MAIN_INTERNATIONAL_SEAPORTS['TZ'],
  intellectualPropertyDepartments: SADC_INTELLECTUAL_PROPERTY_DEPARTMENTS['TZ'],
  securitiesExchangeCommission: SADC_SECURITIES_EXCHANGE_COMMISSIONS['TZ'],
}
