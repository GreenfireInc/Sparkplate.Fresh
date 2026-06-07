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

export const hongKong: ApecCountry = {
  name: 'Hong Kong',
  iso3166Alpha2: 'HK',
  capital: 'Hong Kong (Special Administrative Region central business district)',
  coordinates: { latitude: 22.3193, longitude: 114.1694 },
  independence:
    '1997 PRC SAR under Basic Law; separate customs territory WTO-member style; participates APEC as Hong Kong China — informational',
  topMajorCities: ['Hong Kong Island Central', 'Kowloon', 'Tsuen Wan', 'Yuen Long', 'Sha Tin'],
  population: 7480000,
  mainLanguages: ['Cantonese', 'English', 'Mandarin'],
  currency: 'Hong Kong dollar (HKD linked exchange rate regime — informational)',
  timezone: 'Asia/Hong_Kong',
  foundingLeader:
    'Colonial-era financial infrastructure reference — informational',
  currentLeader:
    'Chief Executive — verify SAR appointment cycle; Liaison oversight — informational',
  cryptocurrencyExchanges: ['HashKey OSL licensed VA trading evolution — informational'],
  stablecoin: 'HKMA stable-token regulatory sandbox narratives — informational',
  domesticCourierServices: APEC_DOMESTIC_COURIERS['HK'],
  domesticPostService: APEC_DOMESTIC_POST_SERVICES['HK'],
  nationalBankingInstitutions: APEC_NATIONAL_BANKING_INSTITUTIONS['HK'],
  corporationFormationOffice: APEC_CORPORATION_FORMATION_OFFICES['HK'],
  newsOutlets: APEC_NEWS_OUTLETS['HK'],
  notableUniversities: APEC_NOTABLE_UNIVERSITIES['HK'],
  mainExportCommodities: APEC_MAIN_EXPORT_COMMODITIES['HK'],
  mainExportedElements: APEC_MAIN_EXPORTED_ELEMENTS['HK'],
  rareEarths: APEC_RARE_EARTHS['HK'],
  stockExchange: 'Hong Kong Stock Exchange (HKEX)',
  bondMarkets: APEC_BOND_MARKETS['HK'],
  intellectualPropertyDepartments: APEC_INTELLECTUAL_PROPERTY_DEPARTMENTS['HK'],
  securitiesExchangeCommission: APEC_SECURITIES_EXCHANGE_COMMISSIONS['HK'],
  mainInternationalAirport: APEC_MAIN_INTERNATIONAL_AIRPORTS['HK'],
  mainInternationalSeaport: APEC_MAIN_INTERNATIONAL_SEAPORTS['HK'],
}
