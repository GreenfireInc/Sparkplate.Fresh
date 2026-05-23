import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const iceland: OecdCountry = {
  name: 'Iceland',
  iso3166Alpha2: 'IS',
  capital: 'Reykjavík',
  coordinates: { latitude: 64.1466, longitude: -21.9426 },
  independence:
    '1944 sovereignty from Danish crown; OECD founding member Sep 1961 — informational',
  topMajorCities: ['Reykjavík', 'Kópavogur', 'Hafnarfjörður', 'Akureyri', 'Reykjanesbær'],
  population: 400000,
  mainLanguages: ['Icelandic', 'English', 'Polish / Lithuanian (immigrant communities)'],
  currency: 'Icelandic króna (ISK)',
  timezone: 'Atlantic/Reykjavik',
  foundingLeader:
    'Jón Sigurðsson independence movement reference; post-2008 bank restructuring saga — informational',
  currentLeader: 'President Halla Tómasdóttir; Prime Minister — verify',
  cryptocurrencyExchanges: ['Nordic EU passport venues; OTC limited licensed retail — informational'],
  stablecoin: 'EUR/ISK pairs onshore thin; predominant USD-stable — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['IS'],
  newsOutlets: OECD_NEWS_OUTLETS['IS'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['IS'],
  stockExchange: 'Nasdaq Iceland (equities thin vs fishing/tourism economies — informational)',
}
