import type { AseanCountry } from './types'
import { ASEAN_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ASEAN_NEWS_OUTLETS } from './newsOutletsByIso'
import { ASEAN_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ASEAN_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ASEAN_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ASEAN_RARE_EARTHS } from './rareEarthsByIso'
import { ASEAN_BOND_MARKETS } from './bondMarketsByIso'
import { ASEAN_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const brunei: AseanCountry = {
  name: 'Brunei',
  iso3166Alpha2: 'BN',
  capital: 'Bandar Seri Begawan',
  coordinates: { latitude: 4.9031, longitude: 114.9398 },
  independence:
    '1984 full UN member state independence from UK; ASEAN member since Jan 1984 — informational',
  topMajorCities: ['Bandar Seri Begawan', 'Kuala Belait', 'Seria', 'Tutong', 'Bangar'],
  population: 460000,
  mainLanguages: ['Malay', 'English', 'Chinese dialects (community)'],
  currency: 'Brunei dollar (BND); Singapore dollar interchangeable de facto band — informational',
  timezone: 'Asia/Brunei',
  foundingLeader:
    'Sultan Hassanal Bolkiah accession-era modernisation reference — informational',
  currentLeader:
    'Sultan Hassanal Bolkiah Yang Di-Pertuan; Crown Prince Prince Al-Muhtadee Billah — verify',
  cryptocurrencyExchanges: ['Autoriti Monetari Brunei cautious posture; regional OTC — informational'],
  stablecoin: 'BND-USD-linked monetary board; informal USDT overlays — informational',
  domesticCourierServices: ASEAN_DOMESTIC_COURIERS['BN'],
  newsOutlets: ASEAN_NEWS_OUTLETS['BN'],
  notableUniversities: ASEAN_NOTABLE_UNIVERSITIES['BN'],
  mainExportCommodities: ASEAN_MAIN_EXPORT_COMMODITIES['BN'],
  mainExportedElements: ASEAN_MAIN_EXPORTED_ELEMENTS['BN'],
  rareEarths: ASEAN_RARE_EARTHS['BN'],
  stockExchange: 'No national retail exchange consolidated; regional ASEAN bond context — informational',
  bondMarkets: ASEAN_BOND_MARKETS['BN'],
  mainInternationalAirport: ASEAN_MAIN_INTERNATIONAL_AIRPORTS['BN'],
}
