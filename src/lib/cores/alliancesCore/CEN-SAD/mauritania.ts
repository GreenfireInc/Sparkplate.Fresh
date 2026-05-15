import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const mauritania: CensadCountry = {
  name: 'Mauritania',
  iso3166Alpha2: 'MR',
  capital: 'Nouakchott',
  coordinates: { latitude: 18.0735, longitude: -15.9582 },
  independence: '1960-11-28',
  topMajorCities: ['Nouakchott', 'Nouadhibou', 'Néma', 'Kaédi', 'Zouérat'],
  population: 4940000,
  mainLanguages: ['Arabic (Hassaniya)', 'French', 'Pulaar'],
  currency: 'Ouguiya (MRU)',
  timezone: 'Africa/Nouakchott',
  foundingLeader: 'Moktar Ould Daddah (first president)',
  currentLeader: 'President Mohamed Ould Ghazouani — verify',
  cryptocurrencyExchanges: ['Informal P2P'],
  stablecoin: 'Informal USD/USDT',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['MR'],
  stockExchange: 'Bourse de Mauritanie (Nouakchott — verify depth)',
}
