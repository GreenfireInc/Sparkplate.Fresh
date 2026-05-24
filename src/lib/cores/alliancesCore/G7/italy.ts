import type { G7Country } from './types'
import { G7_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { G7_NEWS_OUTLETS } from './newsOutletsByIso'
import { G7_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { G7_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const italy: G7Country = {
  name: 'Italy',
  iso3166Alpha2: 'IT',
  capital: 'Rome',
  coordinates: { latitude: 41.9028, longitude: 12.4964 },
  independence:
    '1946 republic continuity; OECD/IMF European anchor state; longstanding G7 member — informational',
  topMajorCities: ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo'],
  population: 58700000,
  mainLanguages: ['Italian', 'German (South Tyrol)', 'French (Valle d Aosta)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Rome',
  foundingLeader:
    'Alcide De Gasperi (Christian democratic integration / republic reference — informational)',
  currentLeader: 'President Sergio Mattarella / successor — verify; Prime Minister Giorgia Meloni — verify',
  cryptocurrencyExchanges: ['Conio', 'Young Platform', 'MiCA-aligned CASPs'],
  stablecoin: 'EUR stablecoins; ECB digital euro pilots — informational',
  domesticCourierServices: G7_DOMESTIC_COURIERS['IT'],
  newsOutlets: G7_NEWS_OUTLETS['IT'],
  notableUniversities: G7_NOTABLE_UNIVERSITIES['IT'],
  mainExportCommodities: G7_MAIN_EXPORT_COMMODITIES['IT'],
  stockExchange: 'Euronext Milan (Borsa Italiana legacy)',
}
