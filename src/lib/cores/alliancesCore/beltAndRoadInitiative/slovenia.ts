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
export const slovenia: BeltAndRoadInitiativeCountry = {
  name: 'Slovenia',
  iso3166Alpha2: 'SI',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Ljubljana',
  coordinates: { latitude: 46.11666666, longitude: 14.81666666 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Ljubljana', 'Slovenia — city 2 (verify)', 'Slovenia — city 3 (verify)', 'Slovenia — city 4 (verify)', 'Slovenia — city 5 (verify)' ] as [string, string, string, string, string],
  population: 2130638,
  mainLanguages: [ 'Slovene', 'English', 'Regional languages' ],
  currency: 'euro (EUR)',
  timezone: 'UTC+01:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['SI'],
  newsOutlets: BRI_NEWS_OUTLETS['SI'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['SI'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['SI'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['SI'],
  rareEarths: BRI_RARE_EARTHS['SI'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['SI'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['SI'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['SI'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['SI'],
}
