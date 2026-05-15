import type { ApecCountry } from './types'
import { APEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { APEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const mexico: ApecCountry = {
  name: 'Mexico',
  iso3166Alpha2: 'MX',
  capital: 'Mexico City',
  coordinates: { latitude: 19.4326, longitude: -99.1332 },
  independence:
    '1821 federation continuity; transpacific CPTPP/USMCA overlap; Americas APEC heavyweight — informational',
  topMajorCities: ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana'],
  population: 130000000,
  mainLanguages: ['Spanish', 'Indigenous languages', 'English border business'],
  currency: 'Mexican peso (MXN)',
  timezone: 'America/Mexico_City',
  foundingLeader: 'Carlos Salinas NAFTA prelude reference — informational',
  currentLeader: 'President Claudia Sheinbaum — verify',
  cryptocurrencyExchanges: ['Bitso CNBV fintech onboarding — informational'],
  stablecoin: 'MXN issuance pilots OTC USDT overlays — informational',
  domesticCourierServices: APEC_DOMESTIC_COURIERS['MX'],
  notableUniversities: APEC_NOTABLE_UNIVERSITIES['MX'],
  stockExchange: 'Bolsa Mexicana de Valores (BMV)',
}
