import type { BricsCountry } from './types'

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
  stockExchange: 'National Stock Exchange of India (NSE); BSE',
}
