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

export const thailand: AseanCountry = {
  name: 'Thailand',
  iso3166Alpha2: 'TH',
  capital: 'Bangkok',
  coordinates: { latitude: 13.7563, longitude: 100.5018 },
  independence:
    '1932 constitutional monarchy continuity lineage; ASEAN founding Bangkok Declaration host Aug 1967 — informational',
  topMajorCities: ['Bangkok', 'Chiang Mai', 'Pattaya', 'Hat Yai', 'Nakhon Ratchasima'],
  population: 69800000,
  mainLanguages: ['Thai', 'Isan / Lao tonal varieties', 'English (tourism / business)'],
  currency: 'Thai baht (THB)',
  timezone: 'Asia/Bangkok',
  foundingLeader: 'Marshal Sarit Thanarat / modernization reference — informational',
  currentLeader: 'King Maha Vajiralongkorn; Prime Minister — verify parliamentary cycle',
  cryptocurrencyExchanges: ['SEC Thai digital-asset operator licences (evolving — informational)'],
  stablecoin: 'BOT CBDC sandbox; THB OTC pairs — informational',
  domesticCourierServices: ASEAN_DOMESTIC_COURIERS['TH'],
  domesticPostService: ASEAN_DOMESTIC_POST_SERVICES['TH'],
  nationalBankingInstitutions: ASEAN_NATIONAL_BANKING_INSTITUTIONS['TH'],
  corporationFormationOffice: ASEAN_CORPORATION_FORMATION_OFFICES['TH'],
  newsOutlets: ASEAN_NEWS_OUTLETS['TH'],
  notableUniversities: ASEAN_NOTABLE_UNIVERSITIES['TH'],
  mainExportCommodities: ASEAN_MAIN_EXPORT_COMMODITIES['TH'],
  mainExportedElements: ASEAN_MAIN_EXPORTED_ELEMENTS['TH'],
  rareEarths: ASEAN_RARE_EARTHS['TH'],
  stockExchange: 'Stock Exchange of Thailand SET Bangkok',
  bondMarkets: ASEAN_BOND_MARKETS['TH'],
  intellectualPropertyDepartments: ASEAN_INTELLECTUAL_PROPERTY_DEPARTMENTS['TH'],
  securitiesExchangeCommission: ASEAN_SECURITIES_EXCHANGE_COMMISSIONS['TH'],
  mainInternationalAirport: ASEAN_MAIN_INTERNATIONAL_AIRPORTS['TH'],
  mainInternationalSeaport: ASEAN_MAIN_INTERNATIONAL_SEAPORTS['TH'],
}
