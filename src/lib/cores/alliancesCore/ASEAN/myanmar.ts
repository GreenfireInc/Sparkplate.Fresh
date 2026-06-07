import type { AseanCountry } from './types'
import { ASEAN_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ASEAN_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { ASEAN_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { ASEAN_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { ASEAN_NEWS_OUTLETS } from './newsOutletsByIso'
import { ASEAN_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ASEAN_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ASEAN_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ASEAN_RARE_EARTHS } from './rareEarthsByIso'
import { ASEAN_BOND_MARKETS } from './bondMarketsByIso'
import { ASEAN_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { ASEAN_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { ASEAN_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { ASEAN_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const myanmar: AseanCountry = {
  name: 'Myanmar',
  iso3166Alpha2: 'MM',
  capital: 'Nay Pyi Taw (de jure); Yangon largest city',
  coordinates: { latitude: 19.7633, longitude: 96.0785 },
  independence:
    '1948 independence from UK; post-2021 junta governance; ASEAN member since Jul 1997 — informational',
  topMajorCities: ['Yangon', 'Mandalay', 'Nay Pyi Taw', 'Mawlamyine', 'Bago'],
  population: 54000000,
  mainLanguages: ['Burmese', 'Shan', 'Karen / regional languages'],
  currency: 'Myanmar kyat (MMK banking disruption episodes — informational)',
  timezone: 'Asia/Yangon',
  foundingLeader: 'Aung San independence martyr reference — informational',
  currentLeader:
    'State Administration Council chair Senior General Min Aung Hlaing — verify international recognition',
  cryptocurrencyExchanges: ['CBM restrictive; informal USDT prevalent under sanctions context — informational'],
  stablecoin: 'USD informal settlement; MMK volatility — informational',
  domesticCourierServices: ASEAN_DOMESTIC_COURIERS['MM'],
  domesticPostService: ASEAN_DOMESTIC_POST_SERVICES['MM'],
  nationalBankingInstitutions: ASEAN_NATIONAL_BANKING_INSTITUTIONS['MM'],
  corporationFormationOffice: ASEAN_CORPORATION_FORMATION_OFFICES['MM'],
  newsOutlets: ASEAN_NEWS_OUTLETS['MM'],
  notableUniversities: ASEAN_NOTABLE_UNIVERSITIES['MM'],
  mainExportCommodities: ASEAN_MAIN_EXPORT_COMMODITIES['MM'],
  mainExportedElements: ASEAN_MAIN_EXPORTED_ELEMENTS['MM'],
  rareEarths: ASEAN_RARE_EARTHS['MM'],
  stockExchange: 'Yangon Stock Exchange (operational constraints — informational)',
  bondMarkets: ASEAN_BOND_MARKETS['MM'],
  intellectualPropertyDepartments: ASEAN_INTELLECTUAL_PROPERTY_DEPARTMENTS['MM'],
  securitiesExchangeCommission: ASEAN_SECURITIES_EXCHANGE_COMMISSIONS['MM'],
  mainInternationalAirport: ASEAN_MAIN_INTERNATIONAL_AIRPORTS['MM'],
  mainInternationalSeaport: ASEAN_MAIN_INTERNATIONAL_SEAPORTS['MM'],
}
