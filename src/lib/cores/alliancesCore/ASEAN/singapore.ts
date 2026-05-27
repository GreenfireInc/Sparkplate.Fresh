import type { AseanCountry } from './types'
import { ASEAN_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ASEAN_NEWS_OUTLETS } from './newsOutletsByIso'
import { ASEAN_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ASEAN_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ASEAN_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ASEAN_RARE_EARTHS } from './rareEarthsByIso'
import { ASEAN_BOND_MARKETS } from './bondMarketsByIso'
import { ASEAN_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const singapore: AseanCountry = {
  name: 'Singapore',
  iso3166Alpha2: 'SG',
  capital: 'Singapore (city-state)',
  coordinates: { latitude: 1.3521, longitude: 103.8198 },
  independence:
    '1965 separation from Malaysia; ASEAN founding member Aug 1967 — informational',
  topMajorCities: ['Singapore Central', 'Jurong West', 'Tampines', 'Woodlands', 'Sengkang'],
  population: 5920000,
  mainLanguages: ['English', 'Mandarin', 'Malay / Tamil official community languages'],
  currency: 'Singapore dollar (SGD)',
  timezone: 'Asia/Singapore',
  foundingLeader:
    'Lee Kuan Yew (first Prime Minister developmental state reference — informational)',
  currentLeader: 'President Tharman Shanmugaratnam; Prime Minister Lawrence Wong — verify',
  cryptocurrencyExchanges: ['MAS DPT licensing regime; regulated institutional ramps — informational'],
  stablecoin: 'MAS stable-value digital guidelines; institutional SGD/USDC — informational',
  domesticCourierServices: ASEAN_DOMESTIC_COURIERS['SG'],
  newsOutlets: ASEAN_NEWS_OUTLETS['SG'],
  notableUniversities: ASEAN_NOTABLE_UNIVERSITIES['SG'],
  mainExportCommodities: ASEAN_MAIN_EXPORT_COMMODITIES['SG'],
  mainExportedElements: ASEAN_MAIN_EXPORTED_ELEMENTS['SG'],
  rareEarths: ASEAN_RARE_EARTHS['SG'],
  stockExchange: 'Singapore Exchange SGX',
  bondMarkets: ASEAN_BOND_MARKETS['SG'],
  mainInternationalAirport: ASEAN_MAIN_INTERNATIONAL_AIRPORTS['SG'],
}
