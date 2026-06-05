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
export const sriLanka: BeltAndRoadInitiativeCountry = {
  name: 'Sri Lanka',
  iso3166Alpha2: 'LK',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Sri Jayawardenepura Kotte',
  coordinates: { latitude: 7, longitude: 81 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Sri Jayawardenepura Kotte', 'Sri Lanka — city 2 (verify)', 'Sri Lanka — city 3 (verify)', 'Sri Lanka — city 4 (verify)', 'Sri Lanka — city 5 (verify)' ] as [string, string, string, string, string],
  population: 21763170,
  mainLanguages: [ 'Sinhala', 'Tamil', 'Regional languages' ],
  currency: 'Sri Lankan rupee (LKR)',
  timezone: 'UTC+05:30',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['LK'],
  newsOutlets: BRI_NEWS_OUTLETS['LK'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['LK'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['LK'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['LK'],
  rareEarths: BRI_RARE_EARTHS['LK'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['LK'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['LK'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['LK'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['LK'],
}
