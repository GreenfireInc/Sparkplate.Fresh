import type { ArabLeagueCountry } from './types'
import { ARAB_LEAGUE_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ARAB_LEAGUE_NEWS_OUTLETS } from './newsOutletsByIso'
import { ARAB_LEAGUE_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ARAB_LEAGUE_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ARAB_LEAGUE_RARE_EARTHS } from './rareEarthsByIso'
import { ARAB_LEAGUE_BOND_MARKETS } from './bondMarketsByIso'
import { ARAB_LEAGUE_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const somalia: ArabLeagueCountry = {
  name: 'Somalia',
  iso3166Alpha2: 'SO',
  arabLeagueStatus: 'member',
  capital: 'Mogadishu',
  coordinates: { latitude: 2.0469, longitude: 45.3182 },
  independence: '1960-07-01',
  topMajorCities: ['Mogadishu', 'Hargeisa', 'Bosaso', 'Kismayo', 'Baidoa'],
  population: 18000000,
  mainLanguages: ['Somali', 'Arabic', 'Italian (legacy)'],
  currency: 'Somali shilling (SOS); United States dollar widely used',
  timezone: 'Africa/Mogadishu',
  foundingLeader: 'Aden Abdullah Osman Daar',
  currentLeader: 'Hassan Sheikh Mohamud (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Hawala-linked OTC', 'Diaspora remittance apps'],
  stablecoin: 'USDT informal; USD cash economy',
  domesticCourierServices: ARAB_LEAGUE_DOMESTIC_COURIERS['SO'],
  newsOutlets: ARAB_LEAGUE_NEWS_OUTLETS['SO'],
  notableUniversities: ARAB_LEAGUE_NOTABLE_UNIVERSITIES['SO'],
  mainExportCommodities: ARAB_LEAGUE_MAIN_EXPORT_COMMODITIES['SO'],
  mainExportedElements: ARAB_LEAGUE_MAIN_EXPORTED_ELEMENTS['SO'],
  rareEarths: ARAB_LEAGUE_RARE_EARTHS['SO'],
  stockExchange: 'No functioning national exchange',
  bondMarkets: ARAB_LEAGUE_BOND_MARKETS['SO'],
  mainInternationalAirport: ARAB_LEAGUE_MAIN_INTERNATIONAL_AIRPORTS['SO'],
}
