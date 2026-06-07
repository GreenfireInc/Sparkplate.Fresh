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

export const indonesia: ApecCountry = {
  name: 'Indonesia',
  iso3166Alpha2: 'ID',
  capital: 'Jakarta (capital transition Nusantara roadmap — informational)',
  coordinates: { latitude: -6.2088, longitude: 106.8456 },
  independence:
    '1949 recognition archipelagic sovereignty; ASEAN heavy-weight transpacific chokepoint stakeholder APEC economy — informational',
  topMajorCities: ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang'],
  population: 279000000,
  mainLanguages: ['Indonesian (Bahasa Indonesia)', 'Javanese', 'Sundanese regional'],
  currency: 'Indonesian rupiah (IDR)',
  timezone: 'Asia/Jakarta',
  foundingLeader: 'Sukarno nationalist reference — informational',
  currentLeader: 'President Prabowo Subianto — verify',
  cryptocurrencyExchanges: ['OJK digital-asset routes licensing evolution — informational'],
  stablecoin: 'IDR payment rails; OTC USDT — informational',
  domesticCourierServices: APEC_DOMESTIC_COURIERS['ID'],
  domesticPostService: APEC_DOMESTIC_POST_SERVICES['ID'],
  nationalBankingInstitutions: APEC_NATIONAL_BANKING_INSTITUTIONS['ID'],
  corporationFormationOffice: APEC_CORPORATION_FORMATION_OFFICES['ID'],
  newsOutlets: APEC_NEWS_OUTLETS['ID'],
  notableUniversities: APEC_NOTABLE_UNIVERSITIES['ID'],
  mainExportCommodities: APEC_MAIN_EXPORT_COMMODITIES['ID'],
  mainExportedElements: APEC_MAIN_EXPORTED_ELEMENTS['ID'],
  rareEarths: APEC_RARE_EARTHS['ID'],
  stockExchange: 'Indonesia Stock Exchange (IDX)',
  bondMarkets: APEC_BOND_MARKETS['ID'],
  intellectualPropertyDepartments: APEC_INTELLECTUAL_PROPERTY_DEPARTMENTS['ID'],
  securitiesExchangeCommission: APEC_SECURITIES_EXCHANGE_COMMISSIONS['ID'],
  mainInternationalAirport: APEC_MAIN_INTERNATIONAL_AIRPORTS['ID'],
  mainInternationalSeaport: APEC_MAIN_INTERNATIONAL_SEAPORTS['ID'],
}
