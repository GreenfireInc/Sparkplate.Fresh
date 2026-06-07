import type { AseanCountry } from './types'
import { ASEAN_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ASEAN_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { ASEAN_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { ASEAN_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { ASEAN_NEWS_OUTLETS } from './newsOutletsByIso'
import { ASEAN_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ASEAN_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ASEAN_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ASEAN_RARE_EARTHS } from './rareEarthsByIso'
import { ASEAN_BOND_MARKETS } from './bondMarketsByIso'
import { ASEAN_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { ASEAN_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { ASEAN_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { ASEAN_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const laos: AseanCountry = {
  name: 'Laos',
  iso3166Alpha2: 'LA',
  capital: 'Vientiane',
  coordinates: { latitude: 17.9757, longitude: 102.6331 },
  independence:
    '1953 Kingdom / 1975 Lao PDR continuity; ASEAN member since Jul 1997 — informational',
  topMajorCities: ['Vientiane', 'Pakse', 'Savannakhet', 'Luang Prabang', 'Thakhek'],
  population: 7700000,
  mainLanguages: ['Lao', 'Hmong / Khmu highland languages', 'Thai (border)'],
  currency: 'Lao kip (LAK)',
  timezone: 'Asia/Vientiane',
  foundingLeader: 'Kaysone Phomvihane revolutionary reference — informational',
  currentLeader: 'General Secretary / President Thongloun Sisoulith — verify titles',
  cryptocurrencyExchanges: ['BOL restrictive licensing; OTC sparse — informational'],
  stablecoin: 'LAK thin digital rails; USD/Baht informal — informational',
  domesticCourierServices: ASEAN_DOMESTIC_COURIERS['LA'],
  domesticPostService: ASEAN_DOMESTIC_POST_SERVICES['LA'],
  nationalBankingInstitutions: ASEAN_NATIONAL_BANKING_INSTITUTIONS['LA'],
  corporationFormationOffice: ASEAN_CORPORATION_FORMATION_OFFICES['LA'],
  newsOutlets: ASEAN_NEWS_OUTLETS['LA'],
  notableUniversities: ASEAN_NOTABLE_UNIVERSITIES['LA'],
  mainExportCommodities: ASEAN_MAIN_EXPORT_COMMODITIES['LA'],
  mainExportedElements: ASEAN_MAIN_EXPORTED_ELEMENTS['LA'],
  rareEarths: ASEAN_RARE_EARTHS['LA'],
  stockExchange: 'Lao Securities Exchange (Vientiane — thin listings — informational)',
  bondMarkets: ASEAN_BOND_MARKETS['LA'],
  intellectualPropertyDepartments: ASEAN_INTELLECTUAL_PROPERTY_DEPARTMENTS['LA'],
  securitiesExchangeCommission: ASEAN_SECURITIES_EXCHANGE_COMMISSIONS['LA'],
  mainInternationalAirport: ASEAN_MAIN_INTERNATIONAL_AIRPORTS['LA'],
  mainInternationalSeaport: ASEAN_MAIN_INTERNATIONAL_SEAPORTS['LA'],
}
