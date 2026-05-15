import type { OpecCountry } from './types'
import { OPEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const equatorialGuinea: OpecCountry = {
  name: 'Equatorial Guinea',
  iso3166Alpha2: 'GQ',
  capital: 'Malabo (insular administrative); Oyala mainland capital project — informational',
  coordinates: { latitude: 3.7523, longitude: 8.7833 },
  independence:
    '1968 independence from Spain; liquefied-gas prominence; OPEC member since May 2017 — informational',
  topMajorCities: ['Malabo', 'Bata', 'Ebebiyín', 'Aconibe', 'Añisoc'],
  population: 1800000,
  mainLanguages: ['Spanish', 'French', 'Portuguese (Pidgin / Fang / Bubi regional)'],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'Africa/Malabo',
  foundingLeader: 'Francisco Macías Nguema-era contrast Teodoro Obiang continuity — informational',
  currentLeader: 'President Teodoro Obiang Nguema — verify succession planning',
  cryptocurrencyExchanges: ['Strict banking environment; OTC sparse — informational'],
  stablecoin: 'USD/EUR pricing of hydrocarbons; informal stable settlement — informational',
  domesticCourierServices: OPEC_DOMESTIC_COURIERS['GQ'],
  stockExchange: 'Malabo regional listings nascent / thin — informational',
}
