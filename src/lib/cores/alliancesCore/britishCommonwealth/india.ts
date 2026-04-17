import type { CommonwealthCountry } from './types'

export const india: CommonwealthCountry = {
  name: 'India',
  iso3166Alpha2: 'IN',
  commonwealthStatus: 'member',
  capital: 'New Delhi',
  coordinates: { latitude: 28.6139, longitude: 77.209 },
  independence: '1947-08-15',
  topMajorCities: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'],
  population: 1420000000,
  mainLanguages: ['Hindi', 'English', 'Bengali'],
  currency: 'Indian rupee (INR)',
  timezone: 'Asia/Kolkata',
  foundingLeader: 'Jawaharlal Nehru (first Prime Minister)',
  currentLeader: 'Narendra Modi (Prime Minister)',
  cryptocurrencyExchanges: ['CoinDCX', 'WazirX', 'ZebPay'],
  stablecoin: 'No INR retail CBDC at scale; USDT on global platforms',
  stockExchange: 'National Stock Exchange (NSE); BSE',
}
