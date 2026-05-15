import type { ApecCountry } from './types'
import { APEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { APEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const philippines: ApecCountry = {
  name: 'Philippines',
  iso3166Alpha2: 'PH',
  capital: 'Manila (capital region Metro Manila)',
  coordinates: { latitude: 14.5995, longitude: 120.9842 },
  independence:
    '1946 US-recognised independence; OFW-remittance transpacific diaspora stalwart ASEAN APEC member — informational',
  topMajorCities: ['Manila', 'Quezon City', 'Davao City', 'Cebu City', 'Zamboanga City'],
  population: 115000000,
  mainLanguages: ['Filipino', 'English', 'Cebuano / Ilocano regional'],
  currency: 'Philippine peso (PHP)',
  timezone: 'Asia/Manila',
  foundingLeader: 'Fidel Ramos APEC Manila host-cycle reference — informational',
  currentLeader: 'President Ferdinand Marcos Jr. — verify',
  cryptocurrencyExchanges: ['BSP VASP registry evolution — informational'],
  stablecoin: 'PHP pilots; USDT remittance overlays — informational',
  domesticCourierServices: APEC_DOMESTIC_COURIERS['PH'],
  notableUniversities: APEC_NOTABLE_UNIVERSITIES['PH'],
  stockExchange: 'Philippine Stock Exchange (PSE)',
}
