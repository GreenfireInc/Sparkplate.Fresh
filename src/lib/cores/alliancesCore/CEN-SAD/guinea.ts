import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const guinea: CensadCountry = {
  name: 'Guinea',
  iso3166Alpha2: 'GN',
  capital: 'Conakry',
  coordinates: { latitude: 9.537, longitude: -13.6785 },
  independence: '1958-10-02 (Republic of Guinea; post-2021 transition — verify)',
  topMajorCities: ['Conakry', 'Nzérékoré', 'Kankan', 'Kindia', 'Labé'],
  population: 14600000,
  mainLanguages: ['French', 'Fula', 'Maninka'],
  currency: 'Guinean franc (GNF)',
  timezone: 'Africa/Conakry',
  foundingLeader: 'Ahmed Sékou Touré (first president)',
  currentLeader: 'Colonel Mamadi Doumbouya-led transition — verify',
  cryptocurrencyExchanges: ['Informal OTC predominant'],
  stablecoin: 'Informal USD/USDT',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['GN'],
  stockExchange: 'Regional BRVM not primary; no major national bourse',
}
