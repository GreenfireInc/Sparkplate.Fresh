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

export const indonesia: IoraCountry = {
  name: 'Indonesia',
  iso3166Alpha2: 'ID',
  capital: 'Jakarta (capital transition to Nusantara roadmap — informational)',
  coordinates: { latitude: -6.2088, longitude: 106.8456 },
  independence:
    'Archipelagic sovereignty 1949 recognition; ASEAN economy; eastern Indian Ocean rim; IORA Member Mar 1997 — informational',
  topMajorCities: ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang'],
  population: 279000000,
  mainLanguages: ['Indonesian (Bahasa Indonesia)', 'Javanese', 'Sundanese regional'],
  currency: 'Indonesian rupiah (IDR)',
  timezone: 'Asia/Jakarta',
  foundingLeader: 'Sukarno maritime-national archipelago reference — informational',
  currentLeader: 'President Prabowo Subianto — verify',
  cryptocurrencyExchanges: ['OJK digital-asset licensing evolution — informational'],
  stablecoin: 'IDR payment stacks; OTC USDT — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['ID'],
  domesticPostService: IORA_DOMESTIC_POST_SERVICES['ID'],
  nationalBankingInstitutions: IORA_NATIONAL_BANKING_INSTITUTIONS['ID'],
  corporationFormationOffice: IORA_CORPORATION_FORMATION_OFFICES['ID'],
  newsOutlets: IORA_NEWS_OUTLETS['ID'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['ID'],
  mainExportCommodities: IORA_MAIN_EXPORT_COMMODITIES['ID'],
  mainExportedElements: IORA_MAIN_EXPORTED_ELEMENTS['ID'],
  rareEarths: IORA_RARE_EARTHS['ID'],
  stockExchange: 'Indonesia Stock Exchange (IDX)',
  bondMarkets: IORA_BOND_MARKETS['ID'],
  mainInternationalAirport: IORA_MAIN_INTERNATIONAL_AIRPORTS['ID'],
  mainInternationalSeaport: IORA_MAIN_INTERNATIONAL_SEAPORTS['ID'],
  intellectualPropertyDepartments: IORA_INTELLECTUAL_PROPERTY_DEPARTMENTS['ID'],
  securitiesExchangeCommission: IORA_SECURITIES_EXCHANGE_COMMISSIONS['ID'],
}
