import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { NATO_NEWS_OUTLETS } from './newsOutletsByIso'
import { NATO_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { NATO_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { NATO_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { NATO_RARE_EARTHS } from './rareEarthsByIso'
import { NATO_BOND_MARKETS } from './bondMarketsByIso'
import { NATO_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const northMacedonia: NatoCountry = {
  name: 'North Macedonia',
  iso3166Alpha2: 'MK',
  capital: 'Skopje',
  coordinates: { latitude: 41.9981, longitude: 21.4254 },
  independence:
    '1991 Yugoslav succession; Prespa Agreement identity lineages; NATO Ally since Mar 2020 — informational',
  topMajorCities: ['Skopje', 'Bitola', 'Kumanovo', 'Prilep', 'Tetovo'],
  population: 1830000,
  mainLanguages: ['Macedonian', 'Albanian (co-official communities)', 'Turkish / Romani'],
  currency: 'Macedonian denar (MKD)',
  timezone: 'Europe/Skopje',
  foundingLeader: 'Kiro Gligorov first president reference — informational',
  currentLeader: 'President Gordana Siljanovska-Davkova — verify; Prime Minister — verify',
  cryptocurrencyExchanges: ['EU MiCA passport retail limited; OTC — informational'],
  stablecoin: 'MKD/EUR informal rails — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['MK'],
  newsOutlets: NATO_NEWS_OUTLETS['MK'],
  notableUniversities: NATO_NOTABLE_UNIVERSITIES['MK'],
  mainExportCommodities: NATO_MAIN_EXPORT_COMMODITIES['MK'],
  mainExportedElements: NATO_MAIN_EXPORTED_ELEMENTS['MK'],
  rareEarths: NATO_RARE_EARTHS['MK'],
  stockExchange: 'Macedonian Stock Exchange (Skopje — informational)',
  bondMarkets: NATO_BOND_MARKETS['MK'],
  mainInternationalAirport: NATO_MAIN_INTERNATIONAL_AIRPORTS['MK'],
}
