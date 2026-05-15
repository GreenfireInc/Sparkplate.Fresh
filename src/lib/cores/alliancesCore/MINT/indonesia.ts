import type { MintCountry } from './types'
import { MINT_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { MINT_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'

export const indonesia: MintCountry = {
  name: 'Indonesia',
  iso3166Alpha2: 'ID',
  capital: 'Jakarta (transition to Nusantara capital roadmap — informational)',
  coordinates: { latitude: -6.2088, longitude: 106.8456 },
  independence:
    '1945 proclaimed independence Sukarno–Hatta; decolonisation recognised 1949; archipelagic ASEAN anchor MINT acronym context — informational',
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
  domesticCourierServices: MINT_DOMESTIC_COURIERS['ID'],
  notableUniversities: MINT_NOTABLE_UNIVERSITIES['ID'],
  stockExchange: 'Indonesia Stock Exchange IDX Jakarta',
}
