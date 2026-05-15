import type { CptppCountry } from './types'
import { CPTPP_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const brunei: CptppCountry = {
  name: 'Brunei',
  iso3166Alpha2: 'BN',
  capital: 'Bandar Seri Begawan',
  coordinates: { latitude: 4.9031, longitude: 114.9398 },
  independence: '1984-01-01 (from United Kingdom)',
  topMajorCities: ['Bandar Seri Begawan', 'Kuala Belait', 'Seria', 'Tutong', 'Bangar'],
  population: 460000,
  mainLanguages: ['Malay', 'English', 'Chinese (Mandarin & dialects)'],
  currency: 'Brunei dollar (BND); Singapore dollar (SGD) pegged interchange',
  timezone: 'Asia/Brunei',
  foundingLeader: 'Hassanal Bolkiah (Sultan; independence era)',
  currentLeader: 'Sultan Hassanal Bolkiah — verify',
  cryptocurrencyExchanges: ['Limited domestic venues; regional Singapore rails'],
  stablecoin: 'BND / SGD peg context; USDT informal access',
  domesticCourierServices: CPTPP_DOMESTIC_COURIERS['BN'],
  stockExchange: 'Brunei Darussalam Central Moneymarket (money market; thin equity market — verify)',
}
