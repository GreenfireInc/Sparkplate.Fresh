import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { OECD_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { OECD_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OECD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { OECD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { OECD_RARE_EARTHS } from './rareEarthsByIso'
import { OECD_BOND_MARKETS } from './bondMarketsByIso'
import { OECD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { OECD_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { OECD_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const belgium: OecdCountry = {
  name: 'Belgium',
  iso3166Alpha2: 'BE',
  capital: 'Brussels',
  coordinates: { latitude: 50.8503, longitude: 4.3517 },
  independence:
    '1830 Kingdom; EU founding state (Treaty of Rome); OECD founding member Sep 1961 — informational',
  topMajorCities: ['Brussels', 'Antwerp', 'Ghent', 'Charleroi', 'Liège'],
  population: 11800000,
  mainLanguages: ['Dutch (Flemish)', 'French', 'German'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Brussels',
  foundingLeader: 'EU institutions host; Leopold I constitutional monarchy reference — informational',
  currentLeader: 'Monarch Philippe; Prime Minister — verify coalition',
  cryptocurrencyExchanges: ['Bitstamp (legacy BE ties)', 'EU-licensed CASPs MiCA-era'],
  stablecoin: 'EUR stablecoins; ECB digital euro exploratory',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['BE'],
  domesticPostService: OECD_DOMESTIC_POST_SERVICES['BE'],
  nationalBankingInstitutions: OECD_NATIONAL_BANKING_INSTITUTIONS['BE'],
  corporationFormationOffice: OECD_CORPORATION_FORMATION_OFFICES['BE'],
  newsOutlets: OECD_NEWS_OUTLETS['BE'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['BE'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['BE'],
  mainExportedElements: OECD_MAIN_EXPORTED_ELEMENTS['BE'],
  rareEarths: OECD_RARE_EARTHS['BE'],
  stockExchange: 'Euronext Brussels',
  bondMarkets: OECD_BOND_MARKETS['BE'],
  mainInternationalAirport: OECD_MAIN_INTERNATIONAL_AIRPORTS['BE'],
  mainInternationalSeaport: OECD_MAIN_INTERNATIONAL_SEAPORTS['BE'],
  intellectualPropertyDepartments: OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS['BE'],
  securitiesExchangeCommission: OECD_SECURITIES_EXCHANGE_COMMISSIONS['BE'],
}
