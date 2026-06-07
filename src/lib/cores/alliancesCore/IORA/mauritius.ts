import type { IoraCountry } from './types'
import { IORA_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IORA_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { IORA_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { IORA_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { IORA_NEWS_OUTLETS } from './newsOutletsByIso'
import { IORA_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { IORA_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { IORA_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { IORA_RARE_EARTHS } from './rareEarthsByIso'
import { IORA_BOND_MARKETS } from './bondMarketsByIso'
import { IORA_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { IORA_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { IORA_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { IORA_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const mauritius: IoraCountry = {
  name: 'Mauritius',
  iso3166Alpha2: 'MU',
  capital: 'Port Louis',
  coordinates: { latitude: -20.1609, longitude: 57.5012 },
  independence:
    '1968 independence from UK; hosts IORA Secretariat Ebene; founding Indian Ocean rim hub Mar 1997 — informational',
  topMajorCities: ['Port Louis', 'Beau Bassin-Rose Hill', 'Vacoas-Phoenix', 'Curepipe', 'Quatre Bornes'],
  population: 1260000,
  mainLanguages: ['English', 'French', 'Mauritian Creole'],
  currency: 'Mauritian rupee (MUR)',
  timezone: 'Indian/Mauritius',
  foundingLeader: 'Seewoosagur Ramgoolam independence reference — informational',
  currentLeader: 'President — verify; Prime Minister — verify',
  cryptocurrencyExchanges: ['IFC narrative; FSC regulatory evolution — informational'],
  stablecoin: 'MUR informal USD/EUR tourist rails — informational',
  domesticCourierServices: IORA_DOMESTIC_COURIERS['MU'],
  domesticPostService: IORA_DOMESTIC_POST_SERVICES['MU'],
  nationalBankingInstitutions: IORA_NATIONAL_BANKING_INSTITUTIONS['MU'],
  corporationFormationOffice: IORA_CORPORATION_FORMATION_OFFICES['MU'],
  newsOutlets: IORA_NEWS_OUTLETS['MU'],
  notableUniversities: IORA_NOTABLE_UNIVERSITIES['MU'],
  mainExportCommodities: IORA_MAIN_EXPORT_COMMODITIES['MU'],
  mainExportedElements: IORA_MAIN_EXPORTED_ELEMENTS['MU'],
  rareEarths: IORA_RARE_EARTHS['MU'],
  stockExchange: 'Stock Exchange of Mauritius (SEM)',
  bondMarkets: IORA_BOND_MARKETS['MU'],
  mainInternationalAirport: IORA_MAIN_INTERNATIONAL_AIRPORTS['MU'],
  mainInternationalSeaport: IORA_MAIN_INTERNATIONAL_SEAPORTS['MU'],
  intellectualPropertyDepartments: IORA_INTELLECTUAL_PROPERTY_DEPARTMENTS['MU'],
  securitiesExchangeCommission: IORA_SECURITIES_EXCHANGE_COMMISSIONS['MU'],
}
