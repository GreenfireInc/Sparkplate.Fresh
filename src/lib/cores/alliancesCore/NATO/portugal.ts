import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_NEWS_OUTLETS } from './newsOutletsByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { NATO_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { NATO_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { NATO_RARE_EARTHS } from './rareEarthsByIso'
import { NATO_BOND_MARKETS } from './bondMarketsByIso'
import { NATO_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const portugal: NatoCountry = {
  name: 'Portugal',
  iso3166Alpha2: 'PT',
  capital: 'Lisbon',
  coordinates: { latitude: 38.7223, longitude: -9.1393 },
  independence:
    '1974 Carnation republic lineage; EU 1986 euro participant; NATO founding Ally 1949-04-04 — informational',
  topMajorCities: ['Lisbon', 'Porto', 'Vila Nova de Gaia', 'Amadora', 'Braga'],
  population: 10500000,
  mainLanguages: ['Portuguese', 'Miranda linguistic minority', 'English'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Lisbon',
  foundingLeader: 'Marcelo Caetano contrast; democracy transition narrative — informational',
  currentLeader: 'President Marcelo Rebelo de Sousa — verify; Prime Minister Luís Montenegro — verify',
  cryptocurrencyExchanges: ['European brokers; CMVM supervision MiCA-era — informational'],
  stablecoin: 'EUR stablecoins — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['PT'],
  newsOutlets: NATO_NEWS_OUTLETS['PT'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['PT'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['PT'],
  mainExportedElements: NATO_MAIN_EXPORTED_ELEMENTS['PT'],
  rareEarths: NATO_RARE_EARTHS['PT'],
  stockExchange: 'Euronext Lisbon',
  bondMarkets: NATO_BOND_MARKETS['PT'],
  mainInternationalAirport: NATO_MAIN_INTERNATIONAL_AIRPORTS['PT'],
}
