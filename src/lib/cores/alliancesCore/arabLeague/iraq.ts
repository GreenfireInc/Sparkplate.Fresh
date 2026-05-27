import type { ArabLeagueCountry } from './types'
import { ARAB_LEAGUE_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ARAB_LEAGUE_NEWS_OUTLETS } from './newsOutletsByIso'
import { ARAB_LEAGUE_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ARAB_LEAGUE_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ARAB_LEAGUE_RARE_EARTHS } from './rareEarthsByIso'
import { ARAB_LEAGUE_BOND_MARKETS } from './bondMarketsByIso'
import { ARAB_LEAGUE_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const iraq: ArabLeagueCountry = {
  name: 'Iraq',
  iso3166Alpha2: 'IQ',
  arabLeagueStatus: 'member',
  capital: 'Baghdad',
  coordinates: { latitude: 33.3152, longitude: 44.3661 },
  independence: '1932-10-03 (Kingdom); 2005 constitution (federal republic)',
  topMajorCities: ['Baghdad', 'Basra', 'Mosul', 'Erbil', 'Najaf'],
  population: 46000000,
  mainLanguages: ['Arabic', 'Kurdish (official in Kurdistan Region)', 'Turkmen'],
  currency: 'Iraqi dinar (IQD)',
  timezone: 'Asia/Baghdad',
  foundingLeader: 'Faisal I (King)',
  currentLeader: 'Abdul Latif Rashid (President); Mohammed Shia\' al-Sudani (Prime Minister)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Regional OTC', 'Limited licensed venues'],
  stablecoin: 'USDT informal; banking sector rebuilding',
  domesticCourierServices: ARAB_LEAGUE_DOMESTIC_COURIERS['IQ'],
  newsOutlets: ARAB_LEAGUE_NEWS_OUTLETS['IQ'],
  notableUniversities: ARAB_LEAGUE_NOTABLE_UNIVERSITIES['IQ'],
  mainExportCommodities: ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES['IQ'],
  mainExportedElements: ARAB_LEAGUE_MAIN_EXPORTED_ELEMENTS['IQ'],
  rareEarths: ARAB_LEAGUE_RARE_EARTHS['IQ'],
  stockExchange: 'Iraq Stock Exchange',
  bondMarkets: ARAB_LEAGUE_BOND_MARKETS['IQ'],
  mainInternationalAirport: ARAB_LEAGUE_MAIN_INTERNATIONAL_AIRPORTS['IQ'],
}
