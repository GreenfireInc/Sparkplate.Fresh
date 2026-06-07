import type { EccasCountry } from './types'
import { ECCAS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ECCAS_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { ECCAS_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { ECCAS_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { ECCAS_NEWS_OUTLETS } from './newsOutletsByIso'
import { ECCAS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ECCAS_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ECCAS_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ECCAS_RARE_EARTHS } from './rareEarthsByIso'
import { ECCAS_BOND_MARKETS } from './bondMarketsByIso'
import { ECCAS_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { ECCAS_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { ECCAS_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { ECCAS_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const gabon: EccasCountry = {
  name: 'Gabon',
  iso3166Alpha2: 'GA',
  capital: 'Libreville',
  coordinates: { latitude: 0.4162, longitude: 9.4673 },
  independence: '1960-08-17',
  topMajorCities: ['Libreville', 'Port-Gentil', 'Franceville', 'Oyem', 'Moanda'],
  population: 2500000,
  mainLanguages: ['French', 'Fang', 'Myene'],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'Africa/Libreville',
  foundingLeader: "Léon M'ba (first Prime Minister / President)",
  currentLeader:
    'Transitional presidency Brice Clotaire Oligui Nguema — verify (constitutional order)',
  cryptocurrencyExchanges: ['Binance (P2P)', 'CFA-region OTC'],
  stablecoin: 'USDT P2P; XAF peg via BEAC',
  domesticCourierServices: ECCAS_DOMESTIC_COURIERS['GA'],
  domesticPostService: ECCAS_DOMESTIC_POST_SERVICES['GA'],
  nationalBankingInstitutions: ECCAS_NATIONAL_BANKING_INSTITUTIONS['GA'],
  corporationFormationOffice: ECCAS_CORPORATION_FORMATION_OFFICES['GA'],
  newsOutlets: ECCAS_NEWS_OUTLETS['GA'],
  notableUniversities: ECCAS_NOTABLE_UNIVERSITIES['GA'],
  mainExportCommodities: ECCAS_MAIN_EXPORT_COMMODITIES['GA'],
  mainExportedElements: ECCAS_MAIN_EXPORTED_ELEMENTS['GA'],
  rareEarths: ECCAS_RARE_EARTHS['GA'],
  stockExchange: 'Regional CEMAC markets; Libreville financial hub — verify listings',
  bondMarkets: ECCAS_BOND_MARKETS['GA'],
  intellectualPropertyDepartments: ECCAS_INTELLECTUAL_PROPERTY_DEPARTMENTS['GA'],

  securitiesExchangeCommission: ECCAS_SECURITIES_EXCHANGE_COMMISSIONS['GA'],
  mainInternationalAirport: ECCAS_MAIN_INTERNATIONAL_AIRPORTS['GA'],
  mainInternationalSeaport: ECCAS_MAIN_INTERNATIONAL_SEAPORTS['GA'],
}
