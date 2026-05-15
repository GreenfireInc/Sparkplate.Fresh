import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const oman: IoraCountry = {
  name: 'Oman',
  iso3166Alpha2: 'OM',
  capital: 'Muscat',
  coordinates: { latitude: 23.5859, longitude: 58.4059 },
  independence:
    'Sultanate continuity post-British withdrawal; Strait of Hormuz / Arabian Sea Indian Ocean littoral; IORA member GCC overlap — informational',
  topMajorCities: ['Muscat', 'Salalah', 'Seeb', 'Sohar', 'Nizwa'],
  population: 4800000,
  mainLanguages: ['Arabic', 'English', 'Urdu / Swahili communities'],
  currency: 'Omani rial (OMR; USD-pegged de facto)',
  timezone: 'Asia/Muscat',
  foundingLeader: 'Sultan Qaboos modernization reference — informational',
  currentLeader: 'Sultan Haitham bin Tariq — verify',
  cryptocurrencyExchanges: ['CBO licensing evolution narratives — informational'],
  stablecoin: 'OMR dollar peg overlays — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['OM'],
  stockExchange: 'Muscat Stock Exchange',
}
