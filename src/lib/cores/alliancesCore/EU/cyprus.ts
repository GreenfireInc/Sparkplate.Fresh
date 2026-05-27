import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EU_NEWS_OUTLETS } from './newsOutletsByIso'
import { EU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { EU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { EU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { EU_RARE_EARTHS } from './rareEarthsByIso'
import { EU_BOND_MARKETS } from './bondMarketsByIso'
import { EU_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const cyprus: EuCountry = {
  name: 'Cyprus',
  iso3166Alpha2: 'CY',
  capital: 'Nicosia',
  coordinates: { latitude: 35.1856, longitude: 33.3823 },
  independence: '1960 UK independence; divided island context — EU since 2004-05-01',
  topMajorCities: ['Limassol', 'Nicosia', 'Larnaca', 'Paphos', 'Famagusta (de facto partitioned)'],
  population: 1300000,
  mainLanguages: ['Greek', 'Turkish', 'English (business / services)'],
  currency: 'Euro (EUR)',
  timezone: 'Asia/Nicosia',
  foundingLeader: 'Archbishop Makarios III era — informational',
  currentLeader: 'President / coalition government — verify (Green Line status)',
  cryptocurrencyExchanges: ['EU-licensed brokerage hub; CFD/crypto retail supervised'],
  stablecoin: 'EUR stablecoins; offshore sector legacy — informational',
  domesticCourierServices: EU_DOMESTIC_COURIERS['CY'],
  newsOutlets: EU_NEWS_OUTLETS['CY'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['CY'],
  mainExportCommodities: EU_MAIN_EXPORT_COMMODITIES['CY'],
  mainExportedElements: EU_MAIN_EXPORTED_ELEMENTS['CY'],
  rareEarths: EU_RARE_EARTHS['CY'],
  stockExchange: 'Cyprus Stock Exchange',
  bondMarkets: EU_BOND_MARKETS['CY'],
  mainInternationalAirport: EU_MAIN_INTERNATIONAL_AIRPORTS['CY'],
}
