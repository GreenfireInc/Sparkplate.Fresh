import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const france: IoraCountry = {
  name: 'France',
  iso3166Alpha2: 'FR',
  capital: 'Paris',
  coordinates: { latitude: 48.8566, longitude: 2.3522 },
  independence:
    'Fifth Republic continuity; Réunion Mayotte overseas Indian Ocean littoral; full IORA member among Charter states — informational',
  topMajorCities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice'],
  population: 68000000,
  mainLanguages: ['French', 'Arabic community', 'Portuguese regional'],
  currency: 'Euro (EUR); CFP franc overlays French Pacific/Indian OCT contexts — informational',
  timezone: 'Europe/Paris',
  foundingLeader: 'Charles de Gaulle Fifth Republic continuity reference — informational',
  currentLeader: 'President Emmanuel Macron; Prime Minister — verify',
  cryptocurrencyExchanges: ['Coinhouse', 'MiCA-compliant CASPs', 'Paymium'],
  stablecoin: 'EUR stablecoins; ECB digital euro pilots — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['FR'],
  stockExchange: 'Euronext Paris',
}
