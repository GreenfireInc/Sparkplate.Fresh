import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IORA_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { IORA_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { IORA_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { IORA_NEWS_OUTLETS } from './newsOutletsByIso'
import { IORA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { IORA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { IORA_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { IORA_RARE_EARTHS } from './rareEarthsByIso'
import { IORA_BOND_MARKETS } from './bondMarketsByIso'
import { IORA_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { IORA_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { IORA_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { IORA_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const kenya: IoraCountry = {
  name: 'Kenya',
  iso3166Alpha2: 'KE',
  capital: 'Nairobi',
  coordinates: { latitude: -1.2921, longitude: 36.8219 },
  independence:
    '1963 independence from UK; western Indian Ocean / Mombasa port gateway economy; IORA member — informational',
  topMajorCities: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'],
  population: 56000000,
  mainLanguages: ['Swahili', 'English', 'Kikuyu / Luhya regional'],
  currency: 'Kenyan shilling (KES)',
  timezone: 'Africa/Nairobi',
  foundingLeader: 'Jomo Kenyatta independence reference — informational',
  currentLeader: 'President William Ruto — verify',
  cryptocurrencyExchanges: ['Yellow Card regional; CMA onboarding narratives — informational'],
  stablecoin: 'KES informal USDT overlays — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['KE'],
  domesticPostService: IORA_DOMESTIC_POST_SERVICES['KE'],
  nationalBankingInstitutions: IORA_NATIONAL_BANKING_INSTITUTIONS['KE'],
  corporationFormationOffice: IORA_CORPORATION_FORMATION_OFFICES['KE'],
  newsOutlets: IORA_NEWS_OUTLETS['KE'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['KE'],
  mainExportCommodities: IORA_MAIN_EXPORT_COMMODITIES['KE'],
  mainExportedElements: IORA_MAIN_EXPORTED_ELEMENTS['KE'],
  rareEarths: IORA_RARE_EARTHS['KE'],
  stockExchange: 'Nairobi Securities Exchange (NSE)',
  bondMarkets: IORA_BOND_MARKETS['KE'],
  mainInternationalAirport: IORA_MAIN_INTERNATIONAL_AIRPORTS['KE'],
  mainInternationalSeaport: IORA_MAIN_INTERNATIONAL_SEAPORTS['KE'],
  intellectualPropertyDepartments: IORA_INTELLECTUAL_PROPERTY_DEPARTMENTS['KE'],
  securitiesExchangeCommission: IORA_SECURITIES_EXCHANGE_COMMISSIONS['KE'],
}
