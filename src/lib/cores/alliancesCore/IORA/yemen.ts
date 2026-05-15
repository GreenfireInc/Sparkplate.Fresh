import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const yemen: IoraCountry = {
  name: 'Yemen',
  iso3166Alpha2: 'YE',
  capital: 'Sana\'a (de jure disputed; provisional authorities Aden-era narratives — informational)',
  coordinates: { latitude: 15.3694, longitude: 44.191 },
  independence:
    '1990 North-South Yemen unification ruptured civil war arcs; Bab-el-Mandeb Red Sea chokepoint littoral stakeholder; fragile IORA member — informational',
  topMajorCities: ['Sana\'a', 'Aden', 'Taiz', 'Hodeidah', 'Ibb'],
  population: 34500000,
  mainLanguages: ['Arabic', 'Soqotri (Soqotra)', 'Somali coastal communities minority'],
  currency: 'Yemeni rial (YER fractured banking sovereignty — informational)',
  timezone: 'Asia/Aden',
  foundingLeader: 'Ali Abdullah Saleh long-rule reference contrast — informational',
  currentLeader:
    'Dual-authority fragmentation Presidential Leadership Council vs Sana’a administration — verify',
  cryptocurrencyExchanges: ['Infrastructure collapse; OTC informal hawala predominant — informational'],
  stablecoin: 'USD predominant informal economy — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['YE'],
  stockExchange: 'Aden Securities micro-market disruptions — informational',
}
