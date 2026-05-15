import type { OpecCountry } from './types'
import { OPEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const kuwait: OpecCountry = {
  name: 'Kuwait',
  iso3166Alpha2: 'KW',
  capital: 'Kuwait City',
  coordinates: { latitude: 29.3759, longitude: 47.9774 },
  independence:
    '1961 independence from British protectorate; GCC member; OPEC founding member Sep 1960 — informational',
  topMajorCities: ['Kuwait City', 'Al Ahmadi', 'Hawalli', 'Salmiya', 'Farwaniya'],
  population: 4500000,
  mainLanguages: ['Arabic', 'English', 'Urdu / Bengali / Hindi (resident communities)'],
  currency: 'Kuwaiti dinar (KWD)',
  timezone: 'Asia/Kuwait',
  foundingLeader:
    'Amir Abdullah Al-Salem era state-building continuity — informational',
  currentLeader: 'Amir Mishal Al-Ahmad Al-Jaber Al-Sabah — verify; Prime Minister — verify',
  cryptocurrencyExchanges: ['Central Bank prohibition historically easing pilots — informational'],
  stablecoin: 'KWD fiat anchoring; digital-payment supervision CBK — informational',
  domesticCourierServices: OPEC_DOMESTIC_COURIERS['KW'],
  stockExchange: 'Boursa Kuwait',
}
