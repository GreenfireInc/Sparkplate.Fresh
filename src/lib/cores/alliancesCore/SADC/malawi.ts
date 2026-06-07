import type { SadcCountry } from './types'
import { SADC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { SADC_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { SADC_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { SADC_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { SADC_NEWS_OUTLETS } from './newsOutletsByIso'
import { SADC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { SADC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { SADC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { SADC_RARE_EARTHS } from './rareEarthsByIso'
import { SADC_BOND_MARKETS } from './bondMarketsByIso'
import { SADC_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { SADC_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { SADC_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { SADC_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const malawi: SadcCountry = {
  name: 'Malawi',
  iso3166Alpha2: 'MW',
  capital: 'Lilongwe',
  coordinates: { latitude: -13.9626, longitude: 33.7741 },
  independence: '1964-07-06',
  topMajorCities: ['Lilongwe', 'Blantyre', 'Mzuzu', 'Zomba', 'Kasungu'],
  population: 21200000,
  mainLanguages: ['English', 'Chichewa', 'Chinyanja'],
  currency: 'Malawian kwacha (MWK)',
  timezone: 'Africa/Blantyre',
  foundingLeader: 'Hastings Banda (first Prime Minister)',
  currentLeader: 'President Lazarus Chakwera — verify',
  cryptocurrencyExchanges: ['Yellow Card context', 'OTC informal'],
  stablecoin: 'Informal USDT',
  domesticCourierServices: SADC_DOMESTIC_COURIERS['MW'],
  domesticPostService: SADC_DOMESTIC_POST_SERVICES['MW'],
  nationalBankingInstitutions: SADC_NATIONAL_BANKING_INSTITUTIONS['MW'],
  corporationFormationOffice: SADC_CORPORATION_FORMATION_OFFICES['MW'],
  newsOutlets: SADC_NEWS_OUTLETS['MW'],
  notableUniversities: SADC_NOTABLE_UNIVERSITIES['MW'],
  mainExportCommodities: SADC_MAIN_EXPORT_COMMODITIES['MW'],
  mainExportedElements: SADC_MAIN_EXPORTED_ELEMENTS['MW'],
  rareEarths: SADC_RARE_EARTHS['MW'],
  stockExchange: 'Malawi Stock Exchange',
  bondMarkets: SADC_BOND_MARKETS['MW'],
  mainInternationalAirport: SADC_MAIN_INTERNATIONAL_AIRPORTS['MW'],
  mainInternationalSeaport: SADC_MAIN_INTERNATIONAL_SEAPORTS['MW'],
  intellectualPropertyDepartments: SADC_INTELLECTUAL_PROPERTY_DEPARTMENTS['MW'],
  securitiesExchangeCommission: SADC_SECURITIES_EXCHANGE_COMMISSIONS['MW'],
}
