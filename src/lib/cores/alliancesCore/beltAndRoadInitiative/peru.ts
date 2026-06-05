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
export const peru: BeltAndRoadInitiativeCountry = {
  name: 'Peru',
  iso3166Alpha2: 'PE',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Lima',
  coordinates: { latitude: -10, longitude: -76 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Lima', 'Peru — city 2 (verify)', 'Peru — city 3 (verify)', 'Peru — city 4 (verify)', 'Peru — city 5 (verify)' ] as [string, string, string, string, string],
  population: 34350244,
  mainLanguages: [ 'Aymara', 'Quechua', 'Spanish' ],
  currency: 'Peruvian sol (PEN)',
  timezone: 'UTC-05:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['PE'],
  newsOutlets: BRI_NEWS_OUTLETS['PE'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['PE'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['PE'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['PE'],
  rareEarths: BRI_RARE_EARTHS['PE'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['PE'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['PE'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['PE'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['PE'],
}
