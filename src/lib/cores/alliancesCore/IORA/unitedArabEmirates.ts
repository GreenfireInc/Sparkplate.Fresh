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

export const unitedArabEmirates: IoraCountry = {
  name: 'United Arab Emirates',
  iso3166Alpha2: 'AE',
  capital: 'Abu Dhabi',
  coordinates: { latitude: 24.4539, longitude: 54.3773 },
  independence:
    '1971 federation from British treaties; Gulf / Arabian Sea energy-finance pillar; GCC member overlapping IORA — informational',
  topMajorCities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Al Ain'],
  population: 10500000,
  mainLanguages: ['Arabic', 'English', 'Urdu / Hindi / Tagalog (expatriate majority)'],
  currency: 'United Arab Emirates dirham (AED)',
  timezone: 'Asia/Dubai',
  foundingLeader: 'Sheikh Zayed federation reference — informational',
  currentLeader:
    'President Mohamed bin Zayed Al Nahyan — verify; Dubai Ruler Sheikh Mohammed bin Rashid — verify',
  cryptocurrencyExchanges: ['VARA Dubai', 'ADGM FSRA digital-asset licences — informational'],
  stablecoin: 'AED-referenced issuance supervisory pilots — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['AE'],
  domesticPostService: IORA_DOMESTIC_POST_SERVICES['AE'],
  nationalBankingInstitutions: IORA_NATIONAL_BANKING_INSTITUTIONS['AE'],
  corporationFormationOffice: IORA_CORPORATION_FORMATION_OFFICES['AE'],
  newsOutlets: IORA_NEWS_OUTLETS['AE'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['AE'],
  mainExportCommodities: IORA_MAIN_EXPORT_COMMODITIES['AE'],
  mainExportedElements: IORA_MAIN_EXPORTED_ELEMENTS['AE'],
  rareEarths: IORA_RARE_EARTHS['AE'],
  stockExchange: 'ADX Abu Dhabi; DFM Dubai',
  bondMarkets: IORA_BOND_MARKETS['AE'],
  mainInternationalAirport: IORA_MAIN_INTERNATIONAL_AIRPORTS['AE'],
  mainInternationalSeaport: IORA_MAIN_INTERNATIONAL_SEAPORTS['AE'],
  intellectualPropertyDepartments: IORA_INTELLECTUAL_PROPERTY_DEPARTMENTS['AE'],
  securitiesExchangeCommission: IORA_SECURITIES_EXCHANGE_COMMISSIONS['AE'],
}
