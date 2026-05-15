import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const comoros: IoraCountry = {
  name: 'Comoros',
  iso3166Alpha2: 'KM',
  capital: 'Moroni',
  coordinates: { latitude: -11.6986, longitude: 43.2551 },
  independence:
    '1975 independence from France federation evolution; Mozambique Channel Indian Ocean positioning; IORA member — informational',
  topMajorCities: ['Moroni', 'Mutsamudu', 'Fomboni', 'Domoni', 'Tsimbeo'],
  population: 860000,
  mainLanguages: ['Comorian', 'Arabic', 'French'],
  currency: 'Comorian franc (KMF pegged EUR via French Treasury mechanism — informational)',
  timezone: 'Indian/Comoro',
  foundingLeader: 'Ahmed Abdallah Mohamed reference — informational',
  currentLeader: 'President Azali Assoumani — verify',
  cryptocurrencyExchanges: ['Thin formal licensing; diaspora OTC — informational'],
  stablecoin: 'EUR informal pricing; scarce onshore rails — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['KM'],
  stockExchange: 'No substantive national equities market — informational',
}
