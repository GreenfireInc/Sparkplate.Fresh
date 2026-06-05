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
export const jamaica: BeltAndRoadInitiativeCountry = {
  name: 'Jamaica',
  iso3166Alpha2: 'JM',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Kingston',
  coordinates: { latitude: 18.25, longitude: -77.5 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Kingston', 'Jamaica — city 2 (verify)', 'Jamaica — city 3 (verify)', 'Jamaica — city 4 (verify)', 'Jamaica — city 5 (verify)' ] as [string, string, string, string, string],
  population: 2825544,
  mainLanguages: [ 'English', 'Jamaican Patois', 'Regional languages' ],
  currency: 'Jamaican dollar (JMD)',
  timezone: 'UTC-05:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['JM'],
  newsOutlets: BRI_NEWS_OUTLETS['JM'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['JM'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['JM'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['JM'],
  rareEarths: BRI_RARE_EARTHS['JM'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['JM'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['JM'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['JM'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['JM'],
}
