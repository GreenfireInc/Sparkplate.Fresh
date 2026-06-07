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

export const cambodia: RcepCountry = {
  name: 'Cambodia',
  iso3166Alpha2: 'KH',
  capital: 'Phnom Penh',
  coordinates: { latitude: 11.5564, longitude: 104.9282 },
  independence:
    '1953 independence from France lineage; ASEAN continuity; RCEP Party (initial in-force wave 2022 — informational)',
  topMajorCities: ['Phnom Penh', 'Siem Reap', 'Battambang', 'Sihanoukville', 'Poipet'],
  population: 17200000,
  mainLanguages: ['Khmer', 'Vietnamese (border communities)', 'Cham'],
  currency: 'Cambodian riel (KHR); United States dollar circulating — informational',
  timezone: 'Asia/Phnom_Penh',
  foundingLeader: 'Norodom Sihanouk reference — informational',
  currentLeader: 'King Norodom Sihamoni; Prime Minister Hun Manet — verify',
  cryptocurrencyExchanges: ['NBC licensing evolution; P2P informal — informational'],
  stablecoin: 'USD cash dominant; KHR digital thin — informational',
  domesticCourierServices: RCEP_DOMESTIC_COURIERS['KH'],
  domesticPostService: RCEP_DOMESTIC_POST_SERVICES['KH'],
  nationalBankingInstitutions: RCEP_NATIONAL_BANKING_INSTITUTIONS['KH'],
  corporationFormationOffice: RCEP_CORPORATION_FORMATION_OFFICES['KH'],
  newsOutlets: RCEP_NEWS_OUTLETS['KH'],
  notableUniversities: RCEP_NOTABLE_UNIVERSITIES['KH'],
  mainExportCommodities: RCEP_MAIN_EXPORT_COMMODITIES['KH'],
  mainExportedElements: RCEP_MAIN_EXPORTED_ELEMENTS['KH'],
  rareEarths: RCEP_RARE_EARTHS['KH'],
  stockExchange: 'Cambodia Securities Exchange (CSX)',
  bondMarkets: RCEP_BOND_MARKETS['KH'],
  mainInternationalAirport: RCEP_MAIN_INTERNATIONAL_AIRPORTS['KH'],
  mainInternationalSeaport: RCEP_MAIN_INTERNATIONAL_SEAPORTS['KH'],
  intellectualPropertyDepartments: RCEP_INTELLECTUAL_PROPERTY_DEPARTMENTS['KH'],
  securitiesExchangeCommission: RCEP_SECURITIES_EXCHANGE_COMMISSIONS['KH'],
}
