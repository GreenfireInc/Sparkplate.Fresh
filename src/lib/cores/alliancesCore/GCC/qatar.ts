import type { GccCountry } from './types'
import { GCC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { GCC_NEWS_OUTLETS } from './newsOutletsByIso'
import { GCC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { GCC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { GCC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { GCC_RARE_EARTHS } from './rareEarthsByIso'
import { GCC_BOND_MARKETS } from './bondMarketsByIso'
import { GCC_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { GCC_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { GCC_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const qatar: GccCountry = {
  name: 'Qatar',
  iso3166Alpha2: 'QA',
  capital: 'Doha',
  coordinates: { latitude: 25.2854, longitude: 51.531 },
  independence:
    '1971 independence from British protectorate; Amir al-Thani continuity; GCC charter signatory; 2017–2021 boycott resolved — informational',
  topMajorCities: ['Doha', 'Al Rayyan', 'Al Wakrah', 'Al Khor', 'Umm Salal'],
  population: 3000000,
  mainLanguages: ['Arabic', 'English', 'Urdu / Hindi / Nepali (expatriate majority)'],
  currency: 'Qatari riyal (QAR); USD-pegged de facto GCC alignment — informational',
  timezone: 'Asia/Qatar',
  foundingLeader: 'Sheikh Khalifa bin Hamad Al Thani Amir-era modernization (GCC founding reference — informational)',
  currentLeader:
    'Amir Tamim bin Hamad Al Thani — verify; Sheikh Mohammed bin Abdulrahman Al Thani Prime Minister — verify',
  cryptocurrencyExchanges: ['QFCRA licensing evolution; regional institutional custody narratives — informational'],
  stablecoin: 'QCB fintech sandbox; USD/QAR-stable experiments — informational',
  domesticCourierServices: GCC_DOMESTIC_COURIERS['QA'],
  newsOutlets: GCC_NEWS_OUTLETS['QA'],
  notableUniversities: GCC_NOTABLE_UNIVERSITIES['QA'],
  mainExportCommodities: GCC_MAIN_EXPORT_COMMODITIES['QA'],
  mainExportedElements: GCC_MAIN_EXPORTED_ELEMENTS['QA'],
  rareEarths: GCC_RARE_EARTHS['QA'],
  stockExchange: 'Qatar Stock Exchange',
  bondMarkets: GCC_BOND_MARKETS['QA'],
  mainInternationalAirport: GCC_MAIN_INTERNATIONAL_AIRPORTS['QA'],
  intellectualPropertyDepartments: GCC_INTELLECTUAL_PROPERTY_DEPARTMENTS['QA'],
  securitiesExchangeCommission: GCC_SECURITIES_EXCHANGE_COMMISSIONS['QA'],
}
