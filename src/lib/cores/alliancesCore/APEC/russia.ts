import type { ApecCountry } from './types'
import { APEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { APEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const russia: ApecCountry = {
  name: 'Russia',
  iso3166Alpha2: 'RU',
  capital: 'Moscow',
  coordinates: { latitude: 55.7558, longitude: 37.6173 },
  independence:
    '1991 Russian Federation continuity; EurAsian Pacific Eastern vectors Vladivostok APEC linkage; sanction-screened trade overlays — informational',
  topMajorCities: ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Vladivostok'],
  population: 144000000,
  mainLanguages: ['Russian', 'Tatar regional', 'English business elite'],
  currency: 'Russian ruble (RUB FX volatility overlays — informational)',
  timezone: 'Europe/Moscow',
  foundingLeader: 'Yeltsin transition reference — informational',
  currentLeader: 'President Vladimir Putin — verify succession narratives',
  cryptocurrencyExchanges: ['Domestic licences thin vs sanctions; OTC mining episodes — informational'],
  stablecoin: 'RUB digital sandbox narratives predominant cashless push — informational',
  domesticCourierServices: APEC_DOMESTIC_COURIERS['RU'],
  notableUniversities: APEC_NOTABLE_UNIVERSITIES['RU'],
  stockExchange: 'Moscow Exchange (sanctions segregation vs Western indices — informational)',
}
