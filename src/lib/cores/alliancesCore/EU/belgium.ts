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

export const belgium: EuCountry = {
  name: 'Belgium',
  iso3166Alpha2: 'BE',
  capital: 'Brussels',
  coordinates: { latitude: 50.8503, longitude: 4.3517 },
  independence: '1830 Kingdom; EU founding state (Treaty of Rome 1957) — informational',
  topMajorCities: ['Brussels', 'Antwerp', 'Ghent', 'Charleroi', 'Liège'],
  population: 11800000,
  mainLanguages: ['Dutch (Flemish)', 'French', 'German'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Brussels',
  foundingLeader: 'EU institutions host; Érasme / Leopold I national reference — informational',
  currentLeader: 'Monarch Philippe; Prime Minister — verify coalition',
  cryptocurrencyExchanges: ['Bitstamp (legacy BE ties)', 'EU-licensed CASPs MiCA-era'],
  stablecoin: 'EUR stablecoins; ECB digital euro exploratory',
  domesticCourierServices: EU_DOMESTIC_COURIERS['BE'],
  domesticPostService: EU_DOMESTIC_POST_SERVICES['BE'],
  nationalBankingInstitutions: EU_NATIONAL_BANKING_INSTITUTIONS['BE'],
  corporationFormationOffice: EU_CORPORATION_FORMATION_OFFICES['BE'],
  newsOutlets: EU_NEWS_OUTLETS['BE'],
  notableUniversities: EU_NOTABLE_UNIVERSITIES['BE'],
  mainExportCommodities: EU_MAIN_EXPORT_COMMODITIES['BE'],
  mainExportedElements: EU_MAIN_EXPORTED_ELEMENTS['BE'],
  rareEarths: EU_RARE_EARTHS['BE'],
  stockExchange: 'Euronext Brussels',
  bondMarkets: EU_BOND_MARKETS['BE'],
  intellectualPropertyDepartments: EU_INTELLECTUAL_PROPERTY_DEPARTMENTS['BE'],

  securitiesExchangeCommission: EU_SECURITIES_EXCHANGE_COMMISSIONS['BE'],
  mainInternationalAirport: EU_MAIN_INTERNATIONAL_AIRPORTS['BE'],
  mainInternationalSeaport: EU_MAIN_INTERNATIONAL_SEAPORTS['BE'],
}
