import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
export const indonesia: BeltAndRoadInitiativeCountry = {
  name: 'Indonesia',
  iso3166Alpha2: 'ID',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Jakarta',
  coordinates: { latitude: -5, longitude: 120 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Jakarta', 'Indonesia — city 2 (verify)', 'Indonesia — city 3 (verify)', 'Indonesia — city 4 (verify)', 'Indonesia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 284438782,
  mainLanguages: [ 'Indonesian', 'English', 'Regional languages' ],
  currency: 'Indonesian rupiah (IDR)',
  timezone: 'UTC+07:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['ID'],
  newsOutlets: BRI_NEWS_OUTLETS['ID'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['ID'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['ID'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['ID'],
  rareEarths: BRI_RARE_EARTHS['ID'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['ID'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['ID'],
}
