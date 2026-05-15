import type { EcowasCountry } from './types'
import { ECOWAS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ECOWAS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const capeVerde: EcowasCountry = {
  name: 'Cape Verde',
  iso3166Alpha2: 'CV',
  capital: 'Praia',
  coordinates: { latitude: 14.9311, longitude: -23.5087 },
  independence: '1975-07-05',
  topMajorCities: ['Praia', 'Mindelo', 'Santa Maria', 'Assomada', 'Pedra Badejo'],
  population: 600000,
  mainLanguages: ['Portuguese', 'Cape Verdean Creole', 'English (limited)'],
  currency: 'Cape Verdean escudo (CVE)',
  timezone: 'Atlantic/Cape_Verde',
  foundingLeader: 'Aristides Pereira (first President)',
  currentLeader: 'President José Maria Neves — verify',
  cryptocurrencyExchanges: ['Binance (P2P)', 'European-facing brokers'],
  stablecoin: 'EUR-linked usage; USDT via international rails',
  domesticCourierServices: ECOWAS_DOMESTIC_COURIERS['CV'],
  notableUniversities: ECOWAS_NOTABLE_UNIVERSITIES['CV'],
  stockExchange: 'Bolsa de Valores de Cabo Verde (limited listings)',
}
