import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IORA_NEWS_OUTLETS } from './newsOutletsByIso'
import { IORA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { IORA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const somalia: IoraCountry = {
  name: 'Somalia',
  iso3166Alpha2: 'SO',
  capital: 'Mogadishu',
  coordinates: { latitude: 2.0469, longitude: 45.3182 },
  independence:
    '1960 republic formation lineage; Horn of Africa / western Indian Ocean exposure; fragile federal restoration; IORA member — informational',
  topMajorCities: ['Mogadishu', 'Bosaso', 'Kismayo', 'Baidoa', 'Garowe'],
  population: 18000000,
  mainLanguages: ['Somali', 'Arabic', 'Italian legacy / English education'],
  currency: 'Somali shilling (SOS nominal; USD predominant informal)',
  timezone: 'Africa/Mogadishu',
  foundingLeader: 'Post-conflict transitional-federal roadmap leaders — informational',
  currentLeader: 'President Hassan Sheikh Mohamud — verify; Prime Minister — verify federal bargains',
  cryptocurrencyExchanges: ['Mobile-money economy; OTC informal — informational'],
  stablecoin: 'USD/USDT hawala overlays predominant — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['SO'],
  newsOutlets: IORA_NEWS_OUTLETS['SO'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['SO'],
  mainExportCommodities: IORA_MAIN_EXPORT_COMMODITIES['SO'],
  stockExchange: 'No consolidated national exchange (fragmented governance — informational)',
}
