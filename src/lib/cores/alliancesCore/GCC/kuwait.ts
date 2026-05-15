import type { GccCountry } from './types'
import { GCC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { GCC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const kuwait: GccCountry = {
  name: 'Kuwait',
  iso3166Alpha2: 'KW',
  capital: 'Kuwait City',
  coordinates: { latitude: 29.3759, longitude: 47.9774 },
  independence:
    '1961 independence from British protectorate; Gulf War restoration 1991; GCC founding member — informational',
  topMajorCities: ['Kuwait City', 'Al Ahmadi', 'Hawalli', 'Salmiya', 'Farwaniya'],
  population: 4500000,
  mainLanguages: ['Arabic', 'English', 'Urdu / Bengali / Hindi (resident communities)'],
  currency: 'Kuwaiti dinar (KWD); GCC monetary union exploratory — informational',
  timezone: 'Asia/Kuwait',
  foundingLeader: 'Sabah Al-Salem Al-Sabah / Amir Abdullah Al-Salem (state-building continuity — informational)',
  currentLeader: 'Amir Mishal Al-Ahmad Al-Jaber Al-Sabah — verify; Prime Minister — verify',
  cryptocurrencyExchanges: ['Central Bank prohibition stance historically easing toward regulated pilots — informational'],
  stablecoin: 'CBK digital-payment supervision evolution; fiat KWD anchored — informational',
  domesticCourierServices: GCC_DOMESTIC_COURIERS['KW'],
  notableUniversities: GCC_NOTABLE_UNIVERSITIES['KW'],
  stockExchange: 'Boursa Kuwait',
}
