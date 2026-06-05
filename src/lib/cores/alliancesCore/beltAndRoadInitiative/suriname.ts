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
export const suriname: BeltAndRoadInitiativeCountry = {
  name: 'Suriname',
  iso3166Alpha2: 'SR',
  beltAndRoadInitiativeStatus: 'participant',
  capital: 'Paramaribo',
  coordinates: { latitude: 4, longitude: -56 },
  independence: '(Historical — verify)',
  topMajorCities: [ 'Paramaribo', 'Suriname — city 2 (verify)', 'Suriname — city 3 (verify)', 'Suriname — city 4 (verify)', 'Suriname — city 5 (verify)' ] as [string, string, string, string, string],
  population: 616500,
  mainLanguages: [ 'Dutch', 'English', 'Regional languages' ],
  currency: 'Surinamese dollar (SRD)',
  timezone: 'UTC-03:00',
  foundingLeader: '(Historical — verify)',
  currentLeader: '(Verify with official government sources)',
  cryptocurrencyExchanges: [ 'Binance (P2P)', 'International OTC', 'Local regulation varies' ],
  stablecoin: 'USDT / USDC common globally; legality varies by jurisdiction',
  domesticCourierServices: BRI_DOMESTIC_COURIERS['SR'],
  newsOutlets: BRI_NEWS_OUTLETS['SR'],
  notableUniversities: BRI_NOTABLE_UNIVERSITIES['SR'],
  mainExportCommodities: BRI_MAIN_EXPORT_COMMODITIES['SR'],
  mainExportedElements: BRI_MAIN_EXPORTED_ELEMENTS['SR'],
  rareEarths: BRI_RARE_EARTHS['SR'],
  stockExchange: 'National or regional exchange (verify)',
  bondMarkets: BRI_BOND_MARKETS['SR'],
  intellectualPropertyDepartments: BRI_INTELLECTUAL_PROPERTY_DEPARTMENTS['SR'],
  securitiesExchangeCommission: BRI_SECURITIES_EXCHANGE_COMMISSIONS['SR'],
  mainInternationalAirport: BRI_MAIN_INTERNATIONAL_AIRPORTS['SR'],
}
