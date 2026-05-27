import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const unitedArabEmirates: BeltAndRoadInitiativeCountry = {
  name: 'United Arab Emirates',
  iso3166Alpha2: 'AE',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Abu Dhabi',
  coordinates: { latitude: 24.4539, longitude: 54.3773 },
  independence: '1971-12-02 (federation; from British treaty)',
  topMajorCities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah'] as [string, string, string, string, string],
  population: 11294243,
  mainLanguages: [ 'Arabic', 'English', 'Regional languages' ],
  currency: 'United Arab Emirates dirham (AED)',
  timezone: 'UTC+04:00',
  foundingLeader: 'Zayed bin Sultan Al Nahyan (first President)',
  currentLeader: 'Mohamed bin Zayed Al Nahyan (President); Mohammed bin Rashid Al Maktoum (Vice President & PM of UAE, Ruler of Dubai)',
  cryptocurrencyExchanges: ['BitOasis (historical)', 'International brokers', 'VARA-regulated Dubai activity'],
  stablecoin: 'USDT / USDC; AED-linked experiments',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['AE'],
  newsOutlets: BRI_NEWS_OUTLETS['AE'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['AE'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['AE'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['AE'],
  rareEarths: BRI_RARE_EARTHS['AE'],
  stockExchange: 'Abu Dhabi Securities Exchange (ADX); Dubai Financial Market (DFM)',
  bondMarkets: BRI_BOND_MARKETS['AE'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['AE'],
}
