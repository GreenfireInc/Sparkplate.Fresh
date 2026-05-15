import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const ireland: OecdCountry = {
  name: 'Ireland',
  iso3166Alpha2: 'IE',
  capital: 'Dublin',
  coordinates: { latitude: 53.3498, longitude: -6.2603 },
  independence:
    '1922 Dominion to republic evolution; EU since 1973; euro participant; OECD founding member Sep 1961 — informational',
  topMajorCities: ['Dublin', 'Cork', 'Limerick', 'Galway', 'Waterford'],
  population: 5300000,
  mainLanguages: ['English', 'Irish (Gaelige)', 'Polish (community)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Dublin',
  foundingLeader: 'Éamon de Valera (early state reference)',
  currentLeader: 'President Michael D. Higgins; Taoiseach — verify',
  cryptocurrencyExchanges: ['Kraken EU', 'IDA tech hub onboarding; MiCA-aligned — informational'],
  stablecoin: 'EUR stablecoins; Irish issuer vehicles referencing SFDR — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['IE'],
  stockExchange: 'Euronext Dublin',
}
