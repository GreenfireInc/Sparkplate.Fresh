import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const papuaNewGuinea: BeltAndRoadInitiativeCountry = {
  name: 'Papua New Guinea',
  iso3166Alpha2: 'PG',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Port Moresby',
  coordinates: { latitude: -6, longitude: 147 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Port Moresby', 'Papua New Guinea — city 2 (verify)', 'Papua New Guinea — city 3 (verify)', 'Papua New Guinea — city 4 (verify)', 'Papua New Guinea — city 5 (verify)' ] as [string, string, string, string, string],
  population: 11781559,
  mainLanguages: [ 'English', 'Hiri Motu', 'Tok Pisin' ],
  currency: 'Papua New Guinean kina (PGK)',
  timezone: 'UTC+10:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['PG'],
  newsOutlets: BRI_NEWS_OUTLETS['PG'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['PG'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['PG'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['PG'],
  rareEarths: BRI_RARE_EARTHS['PG'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['PG'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['PG'],
}
