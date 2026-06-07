import type { RcepCountry } from './types'
import { RCEP_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { RCEP_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { RCEP_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { RCEP_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { RCEP_NEWS_OUTLETS } from './newsOutletsByIso'
import { RCEP_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { RCEP_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { RCEP_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { RCEP_RARE_EARTHS } from './rareEarthsByIso'
import { RCEP_BOND_MARKETS } from './bondMarketsByIso'
import { RCEP_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { RCEP_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { RCEP_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { RCEP_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const malaysia: RcepCountry = {
  name: 'Malaysia',
  iso3166Alpha2: 'MY',
  capital: 'Kuala Lumpur (national capital); Putrajaya administrative centre',
  coordinates: { latitude: 3.139, longitude: 101.6869 },
  independence:
    '1957 Malaya independence; Malaysia 1963; ASEAN founder; RCEP Party Jan 2022 wave — informational',
  topMajorCities: ['Kuala Lumpur', 'George Town', 'Ipoh', 'Johor Bahru', 'Malacca City'],
  population: 34500000,
  mainLanguages: ['Malay', 'English', 'Mandarin / Tamil (communities)'],
  currency: 'Malaysian ringgit (MYR)',
  timezone: 'Asia/Kuala_Lumpur',
  foundingLeader: 'Tunku Abdul Rahman ASEAN founder reference — informational',
  currentLeader:
    'Yang di-Pertuan Agong — verify rotation; Prime Minister Anwar Ibrahim — verify coalition',
  cryptocurrencyExchanges: ['SC-regulated digital exchange pilots — informational'],
  stablecoin: 'MYR digital bank narratives; ringgit controls — informational',
  domesticCourierServices: RCEP_DOMESTIC_COURIERS['MY'],
  domesticPostService: RCEP_DOMESTIC_POST_SERVICES['MY'],
  nationalBankingInstitutions: RCEP_NATIONAL_BANKING_INSTITUTIONS['MY'],
  corporationFormationOffice: RCEP_CORPORATION_FORMATION_OFFICES['MY'],
  newsOutlets: RCEP_NEWS_OUTLETS['MY'],
  notableUniversities: RCEP_NOTABLE_UNIVERSITIES['MY'],
  mainExportCommodities: RCEP_MAIN_EXPORT_COMMODITIES['MY'],
  mainExportedElements: RCEP_MAIN_EXPORTED_ELEMENTS['MY'],
  rareEarths: RCEP_RARE_EARTHS['MY'],
  stockExchange: 'Bursa Malaysia',
  bondMarkets: RCEP_BOND_MARKETS['MY'],
  mainInternationalAirport: RCEP_MAIN_INTERNATIONAL_AIRPORTS['MY'],
  mainInternationalSeaport: RCEP_MAIN_INTERNATIONAL_SEAPORTS['MY'],
  intellectualPropertyDepartments: RCEP_INTELLECTUAL_PROPERTY_DEPARTMENTS['MY'],
  securitiesExchangeCommission: RCEP_SECURITIES_EXCHANGE_COMMISSIONS['MY'],
}
