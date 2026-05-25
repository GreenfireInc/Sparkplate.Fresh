import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OECD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { OECD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { OECD_RARE_EARTHS } from './rareEarthsByIso'
import { OECD_BOND_MARKETS } from './bondMarketsByIso'

export const france: OecdCountry = {
  name: 'France',
  iso3166Alpha2: 'FR',
  capital: 'Paris',
  coordinates: { latitude: 48.8566, longitude: 2.3522 },
  independence:
    'Fifth Republic continuity; EU founding Treaty of Rome; OECD founding member Sep 1961 — informational',
  topMajorCities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice'],
  population: 68000000,
  mainLanguages: ['French', 'Occitan / regional languages', 'Arabic (community)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Paris',
  foundingLeader: 'Charles de Gaulle (Fifth Republic reference)',
  currentLeader: 'President Emmanuel Macron; Prime Minister — verify',
  cryptocurrencyExchanges: ['Coinhouse', 'European MiCA-compliant CASPs', 'Paymium'],
  stablecoin: 'EUR stablecoins; ECB digital euro pilots — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['FR'],
  newsOutlets: OECD_NEWS_OUTLETS['FR'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['FR'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['FR'],
  mainExportedElements: OECD_MAIN_EXPORTED_ELEMENTS['FR'],
  rareEarths: OECD_RARE_EARTHS['FR'],
  stockExchange: 'Euronext Paris',
  bondMarkets: OECD_BOND_MARKETS['FR'],
}
