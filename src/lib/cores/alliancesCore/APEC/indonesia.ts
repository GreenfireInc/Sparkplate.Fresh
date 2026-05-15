import type { ApecCountry } from './types'
import { APEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const indonesia: ApecCountry = {
  name: 'Indonesia',
  iso3166Alpha2: 'ID',
  capital: 'Jakarta (capital transition Nusantara roadmap — informational)',
  coordinates: { latitude: -6.2088, longitude: 106.8456 },
  independence:
    '1949 recognition archipelagic sovereignty; ASEAN heavy-weight transpacific chokepoint stakeholder APEC economy — informational',
  topMajorCities: ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang'],
  population: 279000000,
  mainLanguages: ['Indonesian (Bahasa Indonesia)', 'Javanese', 'Sundanese regional'],
  currency: 'Indonesian rupiah (IDR)',
  timezone: 'Asia/Jakarta',
  foundingLeader: 'Sukarno nationalist reference — informational',
  currentLeader: 'President Prabowo Subianto — verify',
  cryptocurrencyExchanges: ['OJK digital-asset routes licensing evolution — informational'],
  stablecoin: 'IDR payment rails; OTC USDT — informational',
  domesticCourierServices: APEC_DOMESTIC_COURIERS['ID'],
  stockExchange: 'Indonesia Stock Exchange (IDX)',
}
