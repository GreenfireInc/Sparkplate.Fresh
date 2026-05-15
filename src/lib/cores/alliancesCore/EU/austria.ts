import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const austria: EuCountry = {
  name: 'Austria',
  iso3166Alpha2: 'AT',
  capital: 'Vienna',
  coordinates: { latitude: 48.2082, longitude: 16.3738 },
  independence: '1955 State Treaty neutrality era; EU member since 1995-01-01 — informational',
  topMajorCities: ['Vienna', 'Graz', 'Linz', 'Salzburg', 'Innsbruck'],
  population: 9100000,
  mainLanguages: ['German (Austrian Standard)', 'Bosnian / Croatian / Serbian (minority)', 'Turkish (community)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Vienna',
  foundingLeader: 'Leopold Figl (Federal Chancellor; republic reference)',
  currentLeader: 'Federal President / Federal Chancellor coalition — verify',
  cryptocurrencyExchanges: ['European MiCA-aligned providers; Kraken EUR', 'Bitpanda (AT)'],
  stablecoin: 'EUR-stable tokens under MiCA; USDC/USDT EUR pairs',
  domesticCourierServices: EU_DOMESTIC_COURIERS['AT'],
  stockExchange: 'Wiener Börse (Vienna Stock Exchange)',
}
