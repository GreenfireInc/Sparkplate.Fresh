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

export const bangladesh: IoraCountry = {
  name: 'Bangladesh',
  iso3166Alpha2: 'BD',
  capital: 'Dhaka',
  coordinates: { latitude: 23.8103, longitude: 90.4125 },
  independence:
    '1971 liberation war to sovereign Bangladesh; Bay of Bengal / Indian Ocean trade corridor; IORA member Charter era — informational',
  topMajorCities: ['Dhaka', 'Chittagong', 'Khulna', 'Rajshahi', 'Sylhet'],
  population: 173000000,
  mainLanguages: ['Bengali (Bangla)', 'English', 'Chittagonian dialects regional'],
  currency: 'Bangladeshi taka (BDT)',
  timezone: 'Asia/Dhaka',
  foundingLeader: 'Sheikh Mujibur Rahman independence-era reference — informational',
  currentLeader:
    'President Mohammed Shahabuddin — verify; Chief Adviser interim government cycles — verify',
  cryptocurrencyExchanges: ['Bangladesh Bank restrictive stance; informal P2P — informational'],
  stablecoin: 'BDT OTC thin; migrant remittance USDT overlays — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['BD'],
  domesticPostService: IORA_DOMESTIC_POST_SERVICES['BD'],
  nationalBankingInstitutions: IORA_NATIONAL_BANKING_INSTITUTIONS['BD'],
  corporationFormationOffice: IORA_CORPORATION_FORMATION_OFFICES['BD'],
  newsOutlets: IORA_NEWS_OUTLETS['BD'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['BD'],
  mainExportCommodities: IORA_MAIN_EXPORT_COMMODITIES['BD'],
  mainExportedElements: IORA_MAIN_EXPORTED_ELEMENTS['BD'],
  rareEarths: IORA_RARE_EARTHS['BD'],
  stockExchange: 'Dhaka Stock Exchange (DSE); Chittagong Stock Exchange context — informational',
  bondMarkets: IORA_BOND_MARKETS['BD'],
  mainInternationalAirport: IORA_MAIN_INTERNATIONAL_AIRPORTS['BD'],
  mainInternationalSeaport: IORA_MAIN_INTERNATIONAL_SEAPORTS['BD'],
  intellectualPropertyDepartments: IORA_INTELLECTUAL_PROPERTY_DEPARTMENTS['BD'],
  securitiesExchangeCommission: IORA_SECURITIES_EXCHANGE_COMMISSIONS['BD'],
}
