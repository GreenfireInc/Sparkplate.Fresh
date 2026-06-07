import type { ApecCountry } from './types'
import { APEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { APEC_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { APEC_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { APEC_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { APEC_NEWS_OUTLETS } from './newsOutletsByIso'
import { APEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { APEC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { APEC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { APEC_RARE_EARTHS } from './rareEarthsByIso'
import { APEC_BOND_MARKETS } from './bondMarketsByIso'
import { APEC_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { APEC_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { APEC_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { APEC_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const thailand: ApecCountry = {
  name: 'Thailand',
  iso3166Alpha2: 'TH',
  capital: 'Bangkok',
  coordinates: { latitude: 13.7563, longitude: 100.5018 },
  independence:
    'Constitutional monarchy continuity; ASEAN auto-industrial hub Mekong gateways APEC facilitation member — informational',
  topMajorCities: ['Bangkok', 'Chiang Mai', 'Pattaya', 'Hat Yai', 'Nakhon Ratchasima'],
  population: 69800000,
  mainLanguages: ['Thai', 'Isan / Lao varieties', 'English tourism business'],
  currency: 'Thai baht (THB)',
  timezone: 'Asia/Bangkok',
  foundingLeader:
    'Bhumibol modernisation stature reference — informational',
  currentLeader: 'King Rama X; Prime Minister — verify parliamentary cycle',
  cryptocurrencyExchanges: ['SEC Thai DMA operator licences evolving — informational'],
  stablecoin: 'BOT sandbox CBDC — informational',
  domesticCourierServices: APEC_DOMESTIC_COURIERS['TH'],
  domesticPostService: APEC_DOMESTIC_POST_SERVICES['TH'],
  nationalBankingInstitutions: APEC_NATIONAL_BANKING_INSTITUTIONS['TH'],
  corporationFormationOffice: APEC_CORPORATION_FORMATION_OFFICES['TH'],
  newsOutlets: APEC_NEWS_OUTLETS['TH'],
  notableUniversities: APEC_NOTABLE_UNIVERSITIES['TH'],
  mainExportCommodities: APEC_MAIN_EXPORT_COMMODITIES['TH'],
  mainExportedElements: APEC_MAIN_EXPORTED_ELEMENTS['TH'],
  rareEarths: APEC_RARE_EARTHS['TH'],
  stockExchange: 'Stock Exchange of Thailand SET',
  bondMarkets: APEC_BOND_MARKETS['TH'],
  intellectualPropertyDepartments: APEC_INTELLECTUAL_PROPERTY_DEPARTMENTS['TH'],
  securitiesExchangeCommission: APEC_SECURITIES_EXCHANGE_COMMISSIONS['TH'],
  mainInternationalAirport: APEC_MAIN_INTERNATIONAL_AIRPORTS['TH'],
  mainInternationalSeaport: APEC_MAIN_INTERNATIONAL_SEAPORTS['TH'],
}
