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
export const hungary: BeltAndRoadInitiativeCountry = {
  name: 'Hungary',
  iso3166Alpha2: 'HU',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Budapest',
  coordinates: { latitude: 47, longitude: 20 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Budapest', 'Hungary — city 2 (verify)', 'Hungary — city 3 (verify)', 'Hungary — city 4 (verify)', 'Hungary — city 5 (verify)' ] as [string, string, string, string, string],
  population: 9539502,
  mainLanguages: [ 'Hungarian', 'English', 'Regional languages' ],
  currency: 'Hungarian forint (HUF)',
  timezone: 'UTC+01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['HU'],
  newsOutlets: BRI_NEWS_OUTLETS['HU'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['HU'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['HU'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['HU'],
  rareEarths: BRI_RARE_EARTHS['HU'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['HU'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['HU'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['HU'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['HU'],
}
