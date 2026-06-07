import type { AfricanUnionCountry } from './types'
import { AU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { AU_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { AU_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { AU_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { AU_NEWS_OUTLETS } from './newsOutletsByIso'
import { AU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { AU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { AU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { AU_RARE_EARTHS } from './rareEarthsByIso'
import { AU_BOND_MARKETS } from './bondMarketsByIso'
import { AU_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { AU_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { AU_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { AU_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'
export const malawi: AfricanUnionCountry = {
  name: 'Malawi',
  iso3166Alpha2: 'MW',
  africanUnionStatus: 'member',
  capital: 'Lilongwe',
  coordinates: { latitude: -13.9626, longitude: 33.7741 },
  independence: '1964-07-06',
  topMajorCities: ['Lilongwe', 'Blantyre', 'Mzuzu', 'Zomba', 'Kasungu'],
  population: 21000000,
  mainLanguages: ['English', 'Chichewa', 'Tumbuka'],
  currency: 'Malawian kwacha (MWK)',
  timezone: 'Africa/Blantyre',
  foundingLeader: 'Hastings Banda',
  currentLeader: 'Lazarus Chakwera (President)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'Yellow Card', 'Local OTC'],
  stablecoin: 'USDT / USDC informal',
  domesticCourierServices: AU_DOMESTIC_COURIERS['MW'],
  domesticPostService: AU_DOMESTIC_POST_SERVICES['MW'],
  nationalBankingInstitutions: AU_NATIONAL_BANKING_INSTITUTIONS['MW'],
  corporationFormationOffice: AU_CORPORATION_FORMATION_OFFICES['MW'],
  newsOutlets: AU_NEWS_OUTLETS['MW'],
  notableUniversities: AU_NOTABLE_UNIVERSITIES['MW'],
  mainExportCommodities: AU_MAIN_EXPORT_COMMODITIES['MW'],
  mainExportedElements: AU_MAIN_EXPORTED_ELEMENTS['MW'],
  rareEarths: AU_RARE_EARTHS['MW'],
  stockExchange: 'Malawi Stock Exchange',
  bondMarkets: AU_BOND_MARKETS['MW'],
  intellectualPropertyDepartments: AU_INTELLECTUAL_PROPERTY_DEPARTMENTS['MW'],
  securitiesExchangeCommission: AU_SECURITIES_EXCHANGE_COMMISSIONS['MW'],
  mainInternationalAirport: AU_MAIN_INTERNATIONAL_AIRPORTS['MW'],
  mainInternationalSeaport: AU_MAIN_INTERNATIONAL_SEAPORTS['MW'],
}
