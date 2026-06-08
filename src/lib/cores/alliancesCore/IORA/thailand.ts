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

export const thailand: IoraCountry = {
  name: 'Thailand',
  iso3166Alpha2: 'TH',
  capital: 'Bangkok',
  coordinates: { latitude: 13.7563, longitude: 100.5018 },
  independence:
    'Constitutional monarchy continuity; Andaman Sea / eastern Indian Ocean shipping lane stake; ASEAN economy; IORA member — informational',
  topMajorCities: ['Bangkok', 'Chiang Mai', 'Pattaya', 'Hat Yai', 'Nakhon Ratchasima'],
  population: 69800000,
  mainLanguages: ['Thai', 'Isan / Lao varieties', 'English (tourism / business)'],
  currency: 'Thai baht (THB)',
  timezone: 'Asia/Bangkok',
  foundingLeader: 'Bhumibol-era modernization reference — informational',
  currentLeader: 'King Rama X; Prime Minister — verify parliamentary churn',
  cryptocurrencyExchanges: ['SEC Thai digital-asset licences evolution — informational'],
  stablecoin: 'BOT sandbox CBDC pilots — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['TH'],
  domesticPostService: IORA_DOMESTIC_POST_SERVICES['TH'],
  nationalBankingInstitutions: IORA_NATIONAL_BANKING_INSTITUTIONS['TH'],
  corporationFormationOffice: IORA_CORPORATION_FORMATION_OFFICES['TH'],
  newsOutlets: IORA_NEWS_OUTLETS['TH'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['TH'],
  mainExportCommodities: IORA_MAIN_EXPORT_COMMODITIES['TH'],
  mainExportedElements: IORA_MAIN_EXPORTED_ELEMENTS['TH'],
  rareEarths: IORA_RARE_EARTHS['TH'],
  stockExchange: 'Stock Exchange of Thailand (SET)',
  bondMarkets: IORA_BOND_MARKETS['TH'],
  mainInternationalAirport: IORA_MAIN_INTERNATIONAL_AIRPORTS['TH'],
  mainInternationalSeaport: IORA_MAIN_INTERNATIONAL_SEAPORTS['TH'],
  intellectualPropertyDepartments: IORA_INTELLECTUAL_PROPERTY_DEPARTMENTS['TH'],
  securitiesExchangeCommission: IORA_SECURITIES_EXCHANGE_COMMISSIONS['TH'],
}
