import type { G20Country } from './types'
import { G20_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { G20_NEWS_OUTLETS } from './newsOutletsByIso'
import { G20_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { G20_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { G20_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { G20_RARE_EARTHS } from './rareEarthsByIso'
import { G20_BOND_MARKETS } from './bondMarketsByIso'

export const france: G20Country = {
  name: 'France',
  iso3166Alpha2: 'FR',
  capital: 'Paris',
  coordinates: { latitude: 48.8566, longitude: 2.3522 },
  independence:
    'Fifth Republic continuity; G7 Rambouillet host context; G20 founding member (finance track 1999; 2011 Cannes leaders summit host) — informational',
  topMajorCities: ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice'],
  population: 68000000,
  mainLanguages: ['French', 'Occitan / regional languages', 'Arabic (community)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Paris',
  foundingLeader: 'Charles de Gaulle (Fifth Republic reference; post-war IMF/Bretton Woods continuity — informational)',
  currentLeader: 'President Emmanuel Macron; Prime Minister — verify',
  cryptocurrencyExchanges: ['Coinhouse', 'European MiCA-compliant CASPs', 'Paymium'],
  stablecoin: 'EUR stablecoins; ECB digital euro pilots — informational',
  domesticCourierServices: G20_DOMESTIC_COURIERS['FR'],
  newsOutlets: G20_NEWS_OUTLETS['FR'],
  notableUniversities: G20_NOTABLE_UNIVERSITIES['FR'],
  mainExportCommodities: G20_MAIN_EXPORT_COMMODITIES['FR'],
  mainExportedElements: G20_MAIN_EXPORTED_ELEMENTS['FR'],
  rareEarths: G20_RARE_EARTHS['FR'],
  stockExchange: 'Euronext Paris',
  bondMarkets: G20_BOND_MARKETS['FR'],
}
