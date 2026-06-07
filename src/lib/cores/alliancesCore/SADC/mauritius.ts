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

export const mauritius: SadcCountry = {
  name: 'Mauritius',
  iso3166Alpha2: 'MU',
  capital: 'Port Louis',
  coordinates: { latitude: -20.1609, longitude: 57.5012 },
  independence: '1968-03-12',
  topMajorCities: ['Port Louis', 'Beau Bassin-Rose Hill', 'Vacoas-Phoenix', 'Curepipe', 'Quatre Bornes'],
  population: 1270000,
  mainLanguages: ['English', 'French (heritage)', 'Creole (Mauritian Creole)'],
  currency: 'Mauritian rupee (MUR)',
  timezone: 'Indian/Mauritius',
  foundingLeader: 'Seewoosagur Ramgoolam (first Prime Minister)',
  currentLeader:
    'President Dharambeer Gokhool; Prime Minister Navin Ramgoolam — verify cabinet composition',
  cryptocurrencyExchanges: ['Regulatory sandbox / VASP discourse — informal markets exist'],
  stablecoin: 'Informal USD/USDT in tourism-finance corridors',
  domesticCourierServices: SADC_DOMESTIC_COURIERS['MU'],
  domesticPostService: SADC_DOMESTIC_POST_SERVICES['MU'],
  nationalBankingInstitutions: SADC_NATIONAL_BANKING_INSTITUTIONS['MU'],
  corporationFormationOffice: SADC_CORPORATION_FORMATION_OFFICES['MU'],
  newsOutlets: SADC_NEWS_OUTLETS['MU'],
  notableUniversities: SADC_NOTABLE_UNIVERSITIES['MU'],
  mainExportCommodities: SADC_MAIN_EXPORT_COMMODITIES['MU'],
  mainExportedElements: SADC_MAIN_EXPORTED_ELEMENTS['MU'],
  rareEarths: SADC_RARE_EARTHS['MU'],
  stockExchange: 'Stock Exchange of Mauritius (SEM)',
  bondMarkets: SADC_BOND_MARKETS['MU'],
  mainInternationalAirport: SADC_MAIN_INTERNATIONAL_AIRPORTS['MU'],
  mainInternationalSeaport: SADC_MAIN_INTERNATIONAL_SEAPORTS['MU'],
  intellectualPropertyDepartments: SADC_INTELLECTUAL_PROPERTY_DEPARTMENTS['MU'],
  securitiesExchangeCommission: SADC_SECURITIES_EXCHANGE_COMMISSIONS['MU'],
}
