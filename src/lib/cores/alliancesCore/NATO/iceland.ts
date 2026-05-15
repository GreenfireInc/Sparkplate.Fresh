import type { NatoCountry } from './types'
import { NATO_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const iceland: NatoCountry = {
  name: 'Iceland',
  iso3166Alpha2: 'IS',
  capital: 'Reykjavík',
  coordinates: { latitude: 64.1466, longitude: -21.9426 },
  independence:
    '1944 sovereignty from Danish crown; no standing military (Allied air policing); NATO founding Ally 1949-04-04 — informational',
  topMajorCities: ['Reykjavík', 'Kópavogur', 'Hafnarfjörður', 'Akureyri', 'Reykjanesbær'],
  population: 400000,
  mainLanguages: ['Icelandic', 'English', 'Polish / Lithuanian (immigrant communities)'],
  currency: 'Icelandic króna (ISK)',
  timezone: 'Atlantic/Reykjavik',
  foundingLeader: 'Post-war alignment under Bjarni Benediktsson-era reference — informational',
  currentLeader: 'President Halla Tómasdóttir; Prime Minister — verify',
  cryptocurrencyExchanges: ['Nordic EU passport venues; thin licensed retail — informational'],
  stablecoin: 'ISK thin; USD/EUR-stable informal — informational',
  domesticCourierServices: NATO_DOMESTIC_COURIERS['IS'],
  stockExchange: 'Nasdaq Iceland',
}
