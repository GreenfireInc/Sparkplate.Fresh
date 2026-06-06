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
export const philippines: BeltAndRoadInitiativeCountry = {
  name: 'Philippines',
  iso3166Alpha2: 'PH',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Manila',
  coordinates: { latitude: 13, longitude: 122 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Manila', 'Philippines — city 2 (verify)', 'Philippines — city 3 (verify)', 'Philippines — city 4 (verify)', 'Philippines — city 5 (verify)' ] as [string, string, string, string, string],
  population: 114123600,
  mainLanguages: [ 'English', 'Filipino', 'Regional languages' ],
  currency: 'Philippine peso (PHP)',
  timezone: 'UTC+08:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['PH'],
  newsOutlets: BRI_NEWS_OUTLETS['PH'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['PH'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['PH'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['PH'],
  rareEarths: BRI_RARE_EARTHS['PH'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['PH'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['PH'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['PH'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['PH'],
}
