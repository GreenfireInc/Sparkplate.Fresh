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

export const indonesia: AseanCountry = {
  name: 'Indonesia',
  iso3166Alpha2: 'ID',
  capital: 'Jakarta (ASEAN Secretariat host; Nusantara capital transition roadmap — informational)',
  coordinates: { latitude: -6.2088, longitude: 106.8456 },
  independence:
    '1945 proclaimed independence Sukarno–Hatta; recognised 1949; ASEAN founding member Aug 1967 — informational',
  topMajorCities: ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang'],
  population: 279000000,
  mainLanguages: ['Indonesian (Bahasa Indonesia)', 'Javanese', 'Sundanese regional'],
  currency: 'Indonesian rupiah (IDR)',
  timezone: 'Asia/Jakarta',
  foundingLeader: 'Sukarno (Bandung Conference / non-aligned stature — informational)',
  currentLeader: 'President Prabowo Subianto — verify',
  cryptocurrencyExchanges: ['OJK-supervised digital-asset routes (CFX licensing evolution — informational)'],
  stablecoin: 'IDR digital payment pilots; USDT OTC informal — informational',
  domesticCourierServices: ASEAN_DOMESTIC_COURIERS['ID'],
  domesticPostService: ASEAN_DOMESTIC_POST_SERVICES['ID'],
  nationalBankingInstitutions: ASEAN_NATIONAL_BANKING_INSTITUTIONS['ID'],
  corporationFormationOffice: ASEAN_CORPORATION_FORMATION_OFFICES['ID'],
  newsOutlets: ASEAN_NEWS_OUTLETS['ID'],
  notableUniversities: ASEAN_NOTABLE_UNIVERSITIES['ID'],
  mainExportCommodities: ASEAN_MAIN_EXPORT_COMMODITIES['ID'],
  mainExportedElements: ASEAN_MAIN_EXPORTED_ELEMENTS['ID'],
  rareEarths: ASEAN_RARE_EARTHS['ID'],
  stockExchange: 'Indonesia Stock Exchange (IDX Jakarta)',
  bondMarkets: ASEAN_BOND_MARKETS['ID'],
  intellectualPropertyDepartments: ASEAN_INTELLECTUAL_PROPERTY_DEPARTMENTS['ID'],
  securitiesExchangeCommission: ASEAN_SECURITIES_EXCHANGE_COMMISSIONS['ID'],
  mainInternationalAirport: ASEAN_MAIN_INTERNATIONAL_AIRPORTS['ID'],
  mainInternationalSeaport: ASEAN_MAIN_INTERNATIONAL_SEAPORTS['ID'],
}
