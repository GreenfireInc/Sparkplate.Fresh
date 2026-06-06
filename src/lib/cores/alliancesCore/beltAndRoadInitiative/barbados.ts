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
export const barbados: BeltAndRoadInitiativeCountry = {
  name: 'Barbados',
  iso3166Alpha2: 'BB',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Bridgetown',
  coordinates: { latitude: 13.16666666, longitude: -59.53333333 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Bridgetown', 'Barbados — city 2 (verify)', 'Barbados — city 3 (verify)', 'Barbados — city 4 (verify)', 'Barbados — city 5 (verify)' ] as [string, string, string, string, string],
  population: 267800,
  mainLanguages: [ 'English', 'English', 'Regional languages' ],
  currency: 'Barbadian dollar (BBD)',
  timezone: 'UTC-04:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['BB'],
  newsOutlets: BRI_NEWS_OUTLETS['BB'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['BB'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['BB'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['BB'],
  rareEarths: BRI_RARE_EARTHS['BB'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['BB'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['BB'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['BB'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['BB'],
}
