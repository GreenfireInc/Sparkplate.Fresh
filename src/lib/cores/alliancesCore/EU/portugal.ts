import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EU_NEWS_OUTLETS } from './newsOutletsByIso'
import { EU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const portugal: EuCountry = {
  name: 'Portugal',
  iso3166Alpha2: 'PT',
  capital: 'Lisbon',
  coordinates: { latitude: 38.7223, longitude: -9.1393 },
  independence: '1974 Carnation legacy republic; EU 1986; Euro — informational',
  topMajorCities: ['Lisbon', 'Porto', 'Vila Nova de Gaia', 'Amadora', 'Braga'],
  population: 10500000,
  mainLanguages: ['Portuguese', 'Miranda do Douro linguistic minority', 'English'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Lisbon',
  foundingLeader: 'António de Oliveira Salazar Estado Novo-era contrast — informational',
  currentLeader: 'President Marcelo Rebelo de Sousa — verify; Prime Minister Luís Montenegro — verify',
  cryptocurrencyExchanges: ['European brokers; Portuguese CMVM supervision MiCA-era'],
  stablecoin: 'EUR stablecoins; digital euro preparedness',
  domesticCourierServices: EU_DOMESTIC_COURIERS['PT'],
  newsOutlets: EU_NEWS_OUTLETS['PT'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['PT'],
  stockExchange: 'Euronext Lisbon',
}
