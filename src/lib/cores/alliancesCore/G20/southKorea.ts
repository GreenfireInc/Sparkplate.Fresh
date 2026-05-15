import type { G20Country } from './types'
import { G20_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const southKorea: G20Country = {
  name: 'South Korea',
  iso3166Alpha2: 'KR',
  capital: 'Seoul',
  coordinates: { latitude: 37.5665, longitude: 126.978 },
  independence:
    '1945 liberation from Japanese rule; 1948-08-15 Republic of Korea proclaimed; armistice 1953; OECD advanced economy; G20 founding member (finance track 1999; 2010 Seoul leaders summit host) — informational',
  topMajorCities: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon'],
  population: 51700000,
  mainLanguages: ['Korean', 'English (business / education)', 'Japanese / Mandarin (regional trade)'],
  currency: 'South Korean won (KRW)',
  timezone: 'Asia/Seoul',
  foundingLeader:
    'Syngman Rhee (first ROK president); Park Chung-hee industrial-era reference — informational',
  currentLeader: 'President Lee Jae-myung — verify',
  cryptocurrencyExchanges: ['Upbit', 'Bithumb', 'Coinone / Korbit FSC VASP registration regime — informational'],
  stablecoin: 'KRW-pegged issuance constrained by FSC; offshore USDT/USDC liquidity — informational',
  domesticCourierServices: G20_DOMESTIC_COURIERS['KR'],
  stockExchange: 'Korea Exchange KRX (KOSPI / KOSDAQ)',
}
