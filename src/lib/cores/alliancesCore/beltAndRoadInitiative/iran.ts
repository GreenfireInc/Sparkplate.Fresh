import type { BeltAndRoadInitiativeCountry } from './types'
import { BRI_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRI_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRI_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRI_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRI_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRI_RARE_EARTHS } from './rareEarthsByIso'
import { BRI_BOND_MARKETS } from './bondMarketsByIso'
import { BRI_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { BRI_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
export const iran: BeltAndRoadInitiativeCountry = {
  name: 'Iran',
  iso3166Alpha2: 'IR',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Tehran',
  coordinates: { latitude: 32, longitude: 53 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Tehran', 'Iran — city 2 (verify)', 'Iran — city 3 (verify)', 'Iran — city 4 (verify)', 'Iran — city 5 (verify)' ] as [string, string, string, string, string],
  population: 85961000,
  mainLanguages: [ 'Persian (Farsi)', 'English', 'Regional languages' ],
  currency: 'Iranian rial (IRR)',
  timezone: 'UTC+03:30',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['IR'],
  newsOutlets: BRI_NEWS_OUTLETS['IR'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['IR'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['IR'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['IR'],
  rareEarths: BRI_RARE_EARTHS['IR'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['IR'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['IR'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['IR'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['IR'],
}
