import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const tanzania: IoraCountry = {
  name: 'Tanzania',
  iso3166Alpha2: 'TZ',
  capital: 'Dodoma',
  coordinates: { latitude: -6.163, longitude: 35.7516 },
  independence:
    '1964 Tanzania union Tanganyika Zanzibar; Kilwa / Dar Indian Ocean littoral gateways; IORA member — informational',
  topMajorCities: ['Dar es Salaam', 'Mwanza', 'Arusha', 'Dodoma', 'Mbeya'],
  population: 67000000,
  mainLanguages: ['Swahili', 'English', 'Sukuma / Nyamwezi regional'],
  currency: 'Tanzanian shilling (TZS)',
  timezone: 'Africa/Dar_es_Salaam',
  foundingLeader: 'Julius Nyerere unity reference — informational',
  currentLeader:
    'President Samia Suluhu Hassan — verify Zanzibar co-sovereignty politics',
  cryptocurrencyExchanges: ['BOT cautious licensing; diaspora OTC — informational'],
  stablecoin: 'USD informal TZS parallel segments — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['TZ'],
  stockExchange: 'Dar es Salaam Stock Exchange (DSE)',
}
