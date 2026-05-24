import type { G20Country } from './types'
import { G20_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { G20_NEWS_OUTLETS } from './newsOutletsByIso'
import { G20_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { G20_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const italy: G20Country = {
  name: 'Italy',
  iso3166Alpha2: 'IT',
  capital: 'Rome',
  coordinates: { latitude: 41.9028, longitude: 12.4964 },
  independence:
    '1946 republic continuity; OECD/IMF European anchor state; longstanding G7 member; G20 founding member (finance track 1999; 2021 Rome leaders summit host) — informational',
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
  domesticCourierServices: G20_DOMESTIC_COURIERS['IT'],
  newsOutlets: G20_NEWS_OUTLETS['IT'],
  notableUniversities: G20_NOTABLE_UNIVERSITIES['IT'],
  mainExportCommodities: G20_MAIN_EXPORT_COMMODITIES['IT'],
  stockExchange: 'Euronext Milan (Borsa Italiana legacy)',
}
