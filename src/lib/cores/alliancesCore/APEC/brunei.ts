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

export const brunei: ApecCountry = {
  name: 'Brunei',
  iso3166Alpha2: 'BN',
  capital: 'Bandar Seri Begawan',
  coordinates: { latitude: 4.9031, longitude: 114.9398 },
  independence:
    '1984 full UN sovereignty; ASEAN monarchy hydrocarbon stakeholder; small open APEC economy — informational',
  topMajorCities: ['Bandar Seri Begawan', 'Kuala Belait', 'Seria', 'Tutong', 'Bangar'],
  population: 460000,
  mainLanguages: ['Malay', 'English', 'Chinese dialects (community)'],
  currency: 'Brunei dollar (BND)',
  timezone: 'Asia/Brunei',
  foundingLeader: 'Sultan Hassanal Bolkiah continuity reference — informational',
  currentLeader:
    'Sultan Hassanal Bolkiah; Crown Prince Prince Al-Muhtadee Billah — verify',
  cryptocurrencyExchanges: ['Autoriti Monetari cautious; regional OTC — informational'],
  stablecoin: 'BND monetary board USD anchor — informational',
  domesticCourierServices: APEC_DOMESTIC_COURIERS['BN'],
  domesticPostService: APEC_DOMESTIC_POST_SERVICES['BN'],
  nationalBankingInstitutions: APEC_NATIONAL_BANKING_INSTITUTIONS['BN'],
  corporationFormationOffice: APEC_CORPORATION_FORMATION_OFFICES['BN'],
  newsOutlets: APEC_NEWS_OUTLETS['BN'],
  notableUniversities: APEC_NOTABLE_UNIVERSITIES['BN'],
  mainExportCommodities: APEC_MAIN_EXPORT_COMMODITIES['BN'],
  mainExportedElements: APEC_MAIN_EXPORTED_ELEMENTS['BN'],
  rareEarths: APEC_RARE_EARTHS['BN'],
  stockExchange: 'No consolidated national equities exchange narrative — informational',
  bondMarkets: APEC_BOND_MARKETS['BN'],
  intellectualPropertyDepartments: APEC_INTELLECTUAL_PROPERTY_DEPARTMENTS['BN'],
  securitiesExchangeCommission: APEC_SECURITIES_EXCHANGE_COMMISSIONS['BN'],
  mainInternationalAirport: APEC_MAIN_INTERNATIONAL_AIRPORTS['BN'],
  mainInternationalSeaport: APEC_MAIN_INTERNATIONAL_SEAPORTS['BN'],
}
