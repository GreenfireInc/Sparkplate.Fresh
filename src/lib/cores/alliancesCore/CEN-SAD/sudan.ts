import type { CensadCountry } from './types'
import { CENSAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { CENSAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { CENSAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { CENSAD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { CENSAD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { CENSAD_RARE_EARTHS } from './rareEarthsByIso'
import { CENSAD_BOND_MARKETS } from './bondMarketsByIso'
import { CENSAD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const sudan: CensadCountry = {
  name: 'Sudan',
  iso3166Alpha2: 'SD',
  capital: 'Khartoum',
  coordinates: { latitude: 15.5007, longitude: 32.5599 },
  independence: '1956-01-01 (from Anglo-Egyptian condominium)',
  topMajorCities: ['Omdurman', 'Khartoum', 'Khartoum North', 'Port Sudan', 'Kassala'],
  population: 48100000,
  mainLanguages: ['Arabic', 'English', 'Nubian languages'],
  currency: 'Sudanese pound (SDG); conflict economy — verify',
  timezone: 'Africa/Khartoum',
  foundingLeader: 'Ismail al-Azhari transitional leadership era — informational',
  currentLeader:
    'Sovereignty Council / armed conflict fragmentation since 2023 — verify effective authority',
  cryptocurrencyExchanges: ['Sanctions regime; OTC informal dominant'],
  stablecoin: 'Informal USD and stablecoins amidst banking stress',
  domesticCourierServices: CENSAD_DOMESTIC_COURIERS['SD'],
  newsOutlets: CENSAD_NEWS_OUTLETS['SD'],
  notableUniversities: CENSAD_NOTABLE_UNIVERSITIES['SD'],
  mainExportCommodities: CENSAD_MAIN_EXPORT_COMMODITIES['SD'],
  mainExportedElements: CENSAD_MAIN_EXPORTED_ELEMENTS['SD'],
  rareEarths: CENSAD_RARE_EARTHS['SD'],
  stockExchange: 'Khartoum Stock Exchange (operations disrupted — verify)',
  bondMarkets: CENSAD_BOND_MARKETS['SD'],
  mainInternationalAirport: CENSAD_MAIN_INTERNATIONAL_AIRPORTS['SD'],
}
