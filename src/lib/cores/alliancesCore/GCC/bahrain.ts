import type { GccCountry } from './types'
import { GCC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { GCC_NEWS_OUTLETS } from './newsOutletsByIso'
import { GCC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { GCC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { GCC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { GCC_RARE_EARTHS } from './rareEarthsByIso'
import { GCC_BOND_MARKETS } from './bondMarketsByIso'

export const bahrain: GccCountry = {
  name: 'Bahrain',
  iso3166Alpha2: 'BH',
  capital: 'Manama',
  coordinates: { latitude: 26.2285, longitude: 50.586 },
  independence:
    '1971 independent from British protectorate treaty; Bahraini state continuity; GCC charter signatory May 1981 — informational',
  topMajorCities: ['Manama', 'Riffa', 'Muharraq', 'Hamad Town', "A'ali"],
  population: 1500000,
  mainLanguages: ['Arabic', 'English (business)', 'Urdu / Hindi (resident communities)'],
  currency: 'Bahraini dinar (BHD); GCC single currency deliberations stalled — informational',
  timezone: 'Asia/Bahrain',
  foundingLeader: 'Isa bin Salman Al Khalifa reference (GCC founding Amir-era continuity — informational)',
  currentLeader:
    'King Hamad bin Isa Al Khalifa; Crown Prince Salman bin Hamad Al Khalifa Crown Prince Prime Minister — verify',
  cryptocurrencyExchanges: ['Rain / regional licensed PSP context', 'Regional OTC hubs — informational'],
  stablecoin: 'USD-pegged regional stable narratives; BD pegged broadly to USD basket — informational',
  domesticCourierServices: GCC_DOMESTIC_COURIERS['BH'],
  newsOutlets: GCC_NEWS_OUTLETS['BH'],
  notableUniversities: GCC_NOTABLE_UNIVERSITIES['BH'],
  mainExportCommodities: GCC_MAIN_EXPORT_COMMODITIES['BH'],
  mainExportedElements: GCC_MAIN_EXPORTED_ELEMENTS['BH'],
  rareEarths: GCC_RARE_EARTHS['BH'],
  stockExchange: 'Bahrain Bourse',
  bondMarkets: GCC_BOND_MARKETS['BH'],
}
