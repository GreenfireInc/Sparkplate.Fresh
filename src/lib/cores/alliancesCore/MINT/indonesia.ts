import type { MintCountry } from './types'
import { MINT_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { MINT_NEWS_OUTLETS } from './newsOutletsByIso'
import { MINT_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { MINT_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { MINT_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { MINT_RARE_EARTHS } from './rareEarthsByIso'
import { MINT_BOND_MARKETS } from './bondMarketsByIso'
import { MINT_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

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
  newsOutlets: MINT_NEWS_OUTLETS['ID'],
  notableUniversities: MINT_NOTABLE_UNIVERSITIES['ID'],
  mainExportCommodities: MINT_MAIN_EXPORT_COMMODITIES['ID'],
  mainExportedElements: MINT_MAIN_EXPORTED_ELEMENTS['ID'],
  rareEarths: MINT_RARE_EARTHS['ID'],
  stockExchange: 'Indonesia Stock Exchange IDX Jakarta',
  bondMarkets: MINT_BOND_MARKETS['ID'],
  mainInternationalAirport: MINT_MAIN_INTERNATIONAL_AIRPORTS['ID'],
}
