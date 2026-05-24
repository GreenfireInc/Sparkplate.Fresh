import type { G20Country } from './types'
import { G20_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { G20_NEWS_OUTLETS } from './newsOutletsByIso'
import { G20_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { G20_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'

export const india: G20Country = {
  name: 'India',
  iso3166Alpha2: 'IN',
  capital: 'New Delhi',
  coordinates: { latitude: 28.6139, longitude: 77.209 },
  independence:
    '1947-08-15 independence from the United Kingdom; 1950 Republic; BRICS / G20 founding member (finance track 1999; 2023 New Delhi leaders summit host) — informational',
  topMajorCities: ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai'],
  population: 1430000000,
  mainLanguages: ['Hindi', 'English', 'Bengali / Marathi / Tamil (regional plurality)'],
  currency: 'Indian rupee (INR)',
  timezone: 'Asia/Kolkata',
  foundingLeader:
    'Mahatma Gandhi (independence movement); Jawaharlal Nehru (first Prime Minister; non-aligned founding reference)',
  currentLeader: 'President Droupadi Murmu; Prime Minister Narendra Modi — verify',
  cryptocurrencyExchanges: ['CoinDCX', 'WazirX', 'CoinSwitch / FIU-IND VDA registration regime — informational'],
  stablecoin: 'eINR (Digital Rupee) RBI retail/wholesale CBDC pilots; INR-pegged private issuance constrained — informational',
  domesticCourierServices: G20_DOMESTIC_COURIERS['IN'],
  newsOutlets: G20_NEWS_OUTLETS['IN'],
  notableUniversities: G20_NOTABLE_UNIVERSITIES['IN'],
  mainExportCommodities: G20_MAIN_EXPORT_COMMODITIES['IN'],
  stockExchange: 'National Stock Exchange of India (NSE) / Bombay Stock Exchange (BSE)',
}
