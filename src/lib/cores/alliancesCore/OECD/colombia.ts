import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const colombia: OecdCountry = {
  name: 'Colombia',
  iso3166Alpha2: 'CO',
  capital: 'Bogotá',
  coordinates: { latitude: 4.711, longitude: -74.0721 },
  independence:
    '1819 Greater Colombia dissolution legacy; OECD member since Apr 2020 — informational',
  topMajorCities: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena'],
  population: 52000000,
  mainLanguages: ['Spanish', 'Indigenous languages (~65 variants)', 'English (San Andrés bilingual programs)'],
  currency: 'Colombian peso (COP)',
  timezone: 'America/Bogota',
  foundingLeader:
    'Simón Bolívar liberation reference; Rafael Núñez constitutional era — informational',
  currentLeader: 'President Gustavo Petro — verify successor per elections',
  cryptocurrencyExchanges: ['Buda LATAM onboarding; Colombian UIF supervisory evolution — informational'],
  stablecoin: 'COP digital pilots; predominant USD-stable informal — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['CO'],
  stockExchange: 'Bolsa de Valores de Colombia (bvc Colombia)',
}
