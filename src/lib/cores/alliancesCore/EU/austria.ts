import type { EuCountry } from './types'
import { EU_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { EU_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { EU_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { EU_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { EU_NEWS_OUTLETS } from './newsOutletsByIso'
import { EU_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { EU_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { EU_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { EU_RARE_EARTHS } from './rareEarthsByIso'
import { EU_BOND_MARKETS } from './bondMarketsByIso'
import { EU_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { EU_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { EU_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { EU_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const austria: EuCountry = {
  name: 'Austria',
  iso3166Alpha2: 'AT',
  capital: 'Vienna',
  coordinates: { latitude: 48.2082, longitude: 16.3738 },
  independence: '1955 State Treaty neutrality era; EU member since 1995-01-01 — informational',
  topMajorCities: ['Vienna', 'Graz', 'Linz', 'Salzburg', 'Innsbruck'],
  population: 9100000,
  mainLanguages: ['German (Austrian Standard)', 'Bosnian / Croatian / Serbian (minority)', 'Turkish (community)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Vienna',
  foundingLeader: 'Leopold Figl (Federal Chancellor; republic reference)',
  currentLeader: 'Federal President / Federal Chancellor coalition — verify',
  cryptocurrencyExchanges: ['European MiCA-aligned providers; Kraken EUR', 'Bitpanda (AT)'],
  stablecoin: 'EUR-stable tokens under MiCA; USDC/USDT EUR pairs',
  domesticCourierServices: EU_DOMESTIC_COURIERS['AT'],
  domesticPostService: EU_DOMESTIC_POST_SERVICES['AT'],
  nationalBankingInstitutions: EU_NATIONAL_BANKING_INSTITUTIONS['AT'],
  corporationFormationOffice: EU_CORPORATION_FORMATION_OFFICES['AT'],
  newsOutlets: EU_NEWS_OUTLETS['AT'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['AT'],
  mainExportCommodities: EU_MAIN_EXPORT_COMMODITIES['AT'],
  mainExportedElements: EU_MAIN_EXPORTED_ELEMENTS['AT'],
  rareEarths: EU_RARE_EARTHS['AT'],
  stockExchange: 'Wiener Börse (Vienna Stock Exchange)',
  bondMarkets: EU_BOND_MARKETS['AT'],
  intellectualPropertyDepartments: EU_INTELLECTUAL_PROPERTY_DEPARTMENTS['AT'],

  securitiesExchangeCommission: EU_SECURITIES_EXCHANGE_COMMISSIONS['AT'],
  mainInternationalAirport: EU_MAIN_INTERNATIONAL_AIRPORTS['AT'],
  mainInternationalSeaport: EU_MAIN_INTERNATIONAL_SEAPORTS['AT'],
}
