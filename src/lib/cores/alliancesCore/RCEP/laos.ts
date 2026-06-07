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

export const laos: RcepCountry = {
  name: 'Laos',
  iso3166Alpha2: 'LA',
  capital: 'Vientiane',
  coordinates: { latitude: 17.9757, longitude: 102.6331 },
  independence:
    '1953 kingdom / Lao PDR continuity; ASEAN member; RCEP Party (2022 opening tranche — informational)',
  topMajorCities: ['Vientiane', 'Pakse', 'Savannakhet', 'Luang Prabang', 'Thakhek'],
  population: 7700000,
  mainLanguages: ['Lao', 'Hmong / Khmu languages', 'Thai (border)'],
  currency: 'Lao kip (LAK)',
  timezone: 'Asia/Vientiane',
  foundingLeader: 'Kaysone Phomvihane reference — informational',
  currentLeader: 'Party General Secretary / President — verify titles',
  cryptocurrencyExchanges: ['BOL restrictive; OTC sparse — informational'],
  stablecoin: 'LAK rails thin; USD/Baht informal — informational',
  domesticCourierServices: RCEP_DOMESTIC_COURIERS['LA'],
  domesticPostService: RCEP_DOMESTIC_POST_SERVICES['LA'],
  nationalBankingInstitutions: RCEP_NATIONAL_BANKING_INSTITUTIONS['LA'],
  corporationFormationOffice: RCEP_CORPORATION_FORMATION_OFFICES['LA'],
  newsOutlets: RCEP_NEWS_OUTLETS['LA'],
  notableUniversities: RCEP_NOTABLE_UNIVERSITIES['LA'],
  mainExportCommodities: RCEP_MAIN_EXPORT_COMMODITIES['LA'],
  mainExportedElements: RCEP_MAIN_EXPORTED_ELEMENTS['LA'],
  rareEarths: RCEP_RARE_EARTHS['LA'],
  stockExchange: 'Lao Securities Exchange (thin listings — informational)',
  bondMarkets: RCEP_BOND_MARKETS['LA'],
  mainInternationalAirport: RCEP_MAIN_INTERNATIONAL_AIRPORTS['LA'],
  mainInternationalSeaport: RCEP_MAIN_INTERNATIONAL_SEAPORTS['LA'],
  intellectualPropertyDepartments: RCEP_INTELLECTUAL_PROPERTY_DEPARTMENTS['LA'],
  securitiesExchangeCommission: RCEP_SECURITIES_EXCHANGE_COMMISSIONS['LA'],
}
