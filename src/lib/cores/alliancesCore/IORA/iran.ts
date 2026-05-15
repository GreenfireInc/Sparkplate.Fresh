import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IORA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const iran: IoraCountry = {
  name: 'Iran',
  iso3166Alpha2: 'IR',
  capital: 'Tehran',
  coordinates: { latitude: 35.6892, longitude: 51.389 },
  independence:
    '1979 Islamic Republic continuity; Hormuz Gulf / Arabian Sea littoral stakeholder; IORA member — informational',
  topMajorCities: ['Tehran', 'Mashhad', 'Isfahan', 'Karaj', 'Shiraz'],
  population: 89000000,
  mainLanguages: ['Persian (Farsi)', 'Azerbaijani regional', 'Kurdish regional'],
  currency: 'Iranian rial (IRR parallel FX layers — informational)',
  timezone: 'Asia/Tehran',
  foundingLeader: 'Mossadegh oil-nationalisation narrative reference — informational',
  currentLeader: 'Supreme Leader Ali Khamenei; President — verify',
  cryptocurrencyExchanges: ['Sanction-screened mining / informal trade — informational'],
  stablecoin: 'USD informal parallel rate settlement — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['IR'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['IR'],
  stockExchange: 'Tehran Stock Exchange',
}
