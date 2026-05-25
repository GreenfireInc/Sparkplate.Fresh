import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
export const saudiArabia: BeltAndRoadInitiativeCountry = {
  name: 'Saudi Arabia',
  iso3166Alpha2: 'SA',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Riyadh',
  coordinates: { latitude: 24.7136, longitude: 46.6753 },
  independence: '1932-09-23 (Kingdom unification)',
  topMajorCities: ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam'] as [string, string, string, string, string],
  population: 35300280,
  mainLanguages: [ 'Arabic', 'English', 'Regional languages' ],
  currency: 'Saudi riyal (SAR)',
  timezone: 'UTC+03:00',
  foundingLeader: 'Ibn Saud (Abdulaziz Al Saud, first King)',
  currentLeader: 'Salman bin Abdulaziz Al Saud (King); Mohammed bin Salman (Crown Prince & Prime Minister)',
  cryptocurrencyExchanges: ['Rain', 'Regional OTC', 'International P2P'],
  stablecoin: 'USDT informal; sandbox experiments',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['SA'],
  newsOutlets: BRI_NEWS_OUTLETS['SA'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['SA'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['SA'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['SA'],
  rareEarths: BRI_RARE_EARTHS['SA'],
  stockExchange: 'Saudi Exchange (Tadawul)',
  bondMarkets: BRI_BOND_MARKETS['SA'],
}
