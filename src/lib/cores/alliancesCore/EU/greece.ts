import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const greece: EuCountry = {
  name: 'Greece',
  iso3166Alpha2: 'GR',
  capital: 'Athens',
  coordinates: { latitude: 37.9838, longitude: 23.7275 },
  independence: '1830 Kingdom lineage; EU since 1981-01-01; Euro 2001 — informational',
  topMajorCities: ['Athens', 'Thessaloniki', 'Patras', 'Heraklion', 'Larissa'],
  population: 10400000,
  mainLanguages: ['Greek', 'English (tourism)', 'Albanian (community)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Athens',
  foundingLeader: 'Ioannis Kapodistrias-era reference — informational',
  currentLeader: 'President / Prime Minister — verify',
  cryptocurrencyExchanges: ['EU-licensed gateways; OTC alongside capital controls lifted — informational'],
  stablecoin: 'EUR stablecoins; banking sector cautions historical',
  domesticCourierServices: EU_DOMESTIC_COURIERS['GR'],
  stockExchange: 'Athens Stock Exchange',
}
