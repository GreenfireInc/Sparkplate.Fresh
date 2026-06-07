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

export const singapore: IoraCountry = {
  name: 'Singapore',
  iso3166Alpha2: 'SG',
  capital: 'Singapore (city-state)',
  coordinates: { latitude: 1.3521, longitude: 103.8198 },
  independence:
    '1965 sovereignty; Malacca Strait entrepôt global finance; IORA member Mar 1997 hub economy — informational',
  topMajorCities: ['Singapore Central', 'Jurong West', 'Tampines', 'Woodlands', 'Sengkang'],
  population: 5920000,
  mainLanguages: ['English', 'Mandarin', 'Malay / Tamil official minorities'],
  currency: 'Singapore dollar (SGD)',
  timezone: 'Asia/Singapore',
  foundingLeader: 'Lee Kuan Yew maritime-developmental reference — informational',
  currentLeader: 'President Tharman Shanmugaratnam; Prime Minister Lawrence Wong — verify',
  cryptocurrencyExchanges: ['MAS DPT licensing regime — informational'],
  stablecoin: 'MAS stable-value digital guidance — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['SG'],
  domesticPostService: IORA_DOMESTIC_POST_SERVICES['SG'],
  nationalBankingInstitutions: IORA_NATIONAL_BANKING_INSTITUTIONS['SG'],
  corporationFormationOffice: IORA_CORPORATION_FORMATION_OFFICES['SG'],
  newsOutlets: IORA_NEWS_OUTLETS['SG'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['SG'],
  mainExportCommodities: IORA_MAIN_EXPORT_COMMODITIES['SG'],
  mainExportedElements: IORA_MAIN_EXPORTED_ELEMENTS['SG'],
  rareEarths: IORA_RARE_EARTHS['SG'],
  stockExchange: 'Singapore Exchange (SGX)',
  bondMarkets: IORA_BOND_MARKETS['SG'],
  mainInternationalAirport: IORA_MAIN_INTERNATIONAL_AIRPORTS['SG'],
  mainInternationalSeaport: IORA_MAIN_INTERNATIONAL_SEAPORTS['SG'],
  intellectualPropertyDepartments: IORA_INTELLECTUAL_PROPERTY_DEPARTMENTS['SG'],
  securitiesExchangeCommission: IORA_SECURITIES_EXCHANGE_COMMISSIONS['SG'],
}
