import type { G20Country } from './types'
import { G20_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { G20_NEWS_OUTLETS } from './newsOutletsByIso'
import { G20_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const russia: G20Country = {
  name: 'Russia',
  iso3166Alpha2: 'RU',
  capital: 'Moscow',
  coordinates: { latitude: 55.7558, longitude: 37.6176 },
  independence:
    '1991-12 Russian Federation succession to USSR; 1992 IMF accession; BRICS / G20 founding member (finance track 1999; 2013 Saint Petersburg leaders summit host) — informational',
  topMajorCities: ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Kazan'],
  population: 144000000,
  mainLanguages: ['Russian', 'Tatar / regional Turkic', 'English (business / tech)'],
  currency: 'Russian ruble (RUB)',
  timezone: 'Europe/Moscow',
  foundingLeader:
    'Boris Yeltsin (first Russian Federation president); Vladimir Putin (modern political reference — informational)',
  currentLeader: 'President Vladimir Putin; Prime Minister Mikhail Mishustin — verify',
  cryptocurrencyExchanges: ['Garantex (sanctioned context — informational)', 'Domestic OTC / P2P USDT corridors — informational'],
  stablecoin: 'Digital ruble Bank of Russia CBDC pilots; sanctions-era stablecoin payment narratives — informational',
  domesticCourierServices: G20_DOMESTIC_COURIERS['RU'],
  newsOutlets: G20_NEWS_OUTLETS['RU'],
  notableUniversities: G20_NOTABLE_UNIVERSITIES['RU'],
  stockExchange: 'Moscow Exchange (MOEX)',
}
