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
export const cambodia: BeltAndRoadInitiativeCountry = {
  name: 'Cambodia',
  iso3166Alpha2: 'KH',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Phnom Penh',
  coordinates: { latitude: 13, longitude: 105 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Phnom Penh', 'Cambodia — city 2 (verify)', 'Cambodia — city 3 (verify)', 'Cambodia — city 4 (verify)', 'Cambodia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 17577760,
  mainLanguages: [ 'Khmer', 'English', 'Regional languages' ],
  currency: 'Cambodian riel (KHR)',
  timezone: 'UTC+07:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['KH'],
  newsOutlets: BRI_NEWS_OUTLETS['KH'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['KH'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['KH'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['KH'],
  rareEarths: BRI_RARE_EARTHS['KH'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['KH'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['KH'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['KH'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['KH'],
}
