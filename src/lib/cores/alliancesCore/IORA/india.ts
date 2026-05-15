import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IORA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const india: IoraCountry = {
  name: 'India',
  iso3166Alpha2: 'IN',
  capital: 'New Delhi',
  coordinates: { latitude: 28.6139, longitude: 77.209 },
  independence:
    '1947 independence partition lineage; Indo-Pacific maritime power; oft IORA chair economy; Charter-era member Mar 1997 — informational',
  topMajorCities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'],
  population: 1420000000,
  mainLanguages: ['Hindi', 'English', 'Bengali / Tamil / Telugu regional'],
  currency: 'Indian rupee (INR)',
  timezone: 'Asia/Kolkata',
  foundingLeader:
    'Jawaharlal Nehru non-alignment-era reference; Rao liberalisation reference — informational',
  currentLeader: 'President Droupadi Murmu — verify; Prime Minister Narendra Modi — verify',
  cryptocurrencyExchanges: ['RBI prohibition retail bank crypto routes; offshore P2P — informational'],
  stablecoin: 'CBDC pilots e-₹ narratives; predominant INR fiat rails — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['IN'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['IN'],
  stockExchange: 'National Stock Exchange (NSE); BSE Bombay context — informational',
}
