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

export const zambia: SadcCountry = {
  name: 'Zambia',
  iso3166Alpha2: 'ZM',
  capital: 'Lusaka',
  coordinates: { latitude: -15.3875, longitude: 28.3228 },
  independence: '1964-10-24',
  topMajorCities: ['Lusaka', 'Kitwe', 'Ndola', 'Kabwe', 'Chipata'],
  population: 21000000,
  mainLanguages: ['English', 'Bemba', 'Nyanja'],
  currency: 'Zambian kwacha (ZMW)',
  timezone: 'Africa/Lusaka',
  foundingLeader: 'Kenneth Kaunda (first President)',
  currentLeader: 'President Hakainde Hichilema — verify',
  cryptocurrencyExchanges: ['Yellow Card', 'Regional P2P'],
  stablecoin: 'Informal USDT/USDC alongside kwacha liquidity',
  domesticCourierServices: SADC_DOMESTIC_COURIERS['ZM'],
  domesticPostService: SADC_DOMESTIC_POST_SERVICES['ZM'],
  nationalBankingInstitutions: SADC_NATIONAL_BANKING_INSTITUTIONS['ZM'],
  corporationFormationOffice: SADC_CORPORATION_FORMATION_OFFICES['ZM'],
  newsOutlets: SADC_NEWS_OUTLETS['ZM'],
  notableUniversities: SADC_NOTABLE_UNIVERSITIES['ZM'],
  mainExportCommodities: SADC_MAIN_EXPORT_COMMODITIES['ZM'],
  mainExportedElements: SADC_MAIN_EXPORTED_ELEMENTS['ZM'],
  rareEarths: SADC_RARE_EARTHS['ZM'],
  stockExchange: 'Lusaka Securities Exchange',
  bondMarkets: SADC_BOND_MARKETS['ZM'],
  mainInternationalAirport: SADC_MAIN_INTERNATIONAL_AIRPORTS['ZM'],
  mainInternationalSeaport: SADC_MAIN_INTERNATIONAL_SEAPORTS['ZM'],
  intellectualPropertyDepartments: SADC_INTELLECTUAL_PROPERTY_DEPARTMENTS['ZM'],
  securitiesExchangeCommission: SADC_SECURITIES_EXCHANGE_COMMISSIONS['ZM'],
}
