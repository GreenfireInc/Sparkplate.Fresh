import type { BricsCountry } from './types'
import { BRICS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRICS_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRICS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRICS_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRICS_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRICS_RARE_EARTHS } from './rareEarthsByIso'
import { BRICS_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const india: BricsCountry = {
  name: 'India',
  iso3166Alpha2: 'IN',
  bricsStatus: 'founding_member',
  capital: 'New Delhi',
  coordinates: { latitude: 28.6139, longitude: 77.209 },
  independence: '1947-08-15',
  topMajorCities: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'],
  population: 1420000000,
  mainLanguages: ['Hindi', 'English (associate official)', 'Bengali'],
  currency: 'Indian rupee (INR)',
  timezone: 'Asia/Kolkata',
  foundingLeader: 'Jawaharlal Nehru (first Prime Minister)',
  currentLeader: 'Narendra Modi (Prime Minister)',
  cryptocurrencyExchanges: ['CoinDCX', 'WazirX', 'ZebPay', 'International P2P (regulatory environment evolving)'],
  stablecoin: 'No INR official stablecoin at central-bank retail scale; USDT/USDC common on global platforms',
  domesticCourierServices: BRICS_DOMESTIC_COURIERS['IN'],
  newsOutlets: BRICS_NEWS_OUTLETS['IN'],
  notableUniversities: BRICS_NOTABLE_UNIVERSITIES['IN'],
  mainExportCommodities: BRICS_MAIN_EXPORT_COMMODITIES['IN'],
  mainExportedElements: BRICS_MAIN_EXPORTED_ELEMENTS['IN'],
  rareEarths: BRICS_RARE_EARTHS['IN'],
  stockExchange: 'National Stock Exchange of India (NSE); BSE',
  mainInternationalAirport: BRICS_MAIN_INTERNATIONAL_AIRPORTS['IN'],
}
