import type { G20Country } from './types'
import { G20_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const indonesia: G20Country = {
  name: 'Indonesia',
  iso3166Alpha2: 'ID',
  capital: 'Jakarta (transition to Nusantara capital roadmap — informational)',
  coordinates: { latitude: -6.2088, longitude: 106.8456 },
  independence:
    '1945 proclaimed independence Sukarno–Hatta; decolonisation recognised 1949; archipelagic ASEAN anchor; G20 founding member (finance track 1999; 2022 Bali leaders summit host) — informational',
  topMajorCities: ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang'],
  population: 279000000,
  mainLanguages: ['Indonesian (Bahasa Indonesia)', 'Javanese', 'Sundanese regional'],
  currency: 'Indonesian rupiah (IDR)',
  timezone: 'Asia/Jakarta',
  foundingLeader:
    'Sukarno (proclamation unity); Soeharto New Order-era industrial base reference — informational',
  currentLeader: 'President Prabowo Subianto — verify',
  cryptocurrencyExchanges: ['Indonesia CFX licensed trading (Bappebti-era evolution to OJK oversight — informational)'],
  stablecoin: 'IDR digital rupiah / CBDC narratives; offshore USDT OTC — informational',
  domesticCourierServices: G20_DOMESTIC_COURIERS['ID'],
  stockExchange: 'Indonesia Stock Exchange IDX Jakarta',
}
