import type { G20Country } from './types'
import { G20_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { G20_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { G20_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { G20_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { G20_NEWS_OUTLETS } from './newsOutletsByIso'
import { G20_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { G20_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { G20_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { G20_RARE_EARTHS } from './rareEarthsByIso'
import { G20_BOND_MARKETS } from './bondMarketsByIso'
import { G20_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { G20_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { G20_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { G20_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const italy: G20Country = {
  name: 'Italy',
  iso3166Alpha2: 'IT',
  capital: 'Rome',
  coordinates: { latitude: 41.9028, longitude: 12.4964 },
  independence:
    '1946 republic continuity; OECD/IMF European anchor state; longstanding G7 member; G20 founding member (finance track 1999; 2021 Rome leaders summit host) — informational',
  topMajorCities: ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo'],
  population: 58700000,
  mainLanguages: ['Italian', 'German (South Tyrol)', 'French (Valle d Aosta)'],
  currency: 'Euro (EUR)',
  timezone: 'Europe/Rome',
  foundingLeader:
    'Alcide De Gasperi (Christian democratic integration / republic reference — informational)',
  currentLeader: 'President Sergio Mattarella / successor — verify; Prime Minister Giorgia Meloni — verify',
  cryptocurrencyExchanges: ['Conio', 'Young Platform', 'MiCA-aligned CASPs'],
  stablecoin: 'EUR stablecoins; ECB digital euro pilots — informational',
  domesticCourierServices: G20_DOMESTIC_COURIERS['IT'],
  domesticPostService: G20_DOMESTIC_POST_SERVICES['IT'],
  nationalBankingInstitutions: G20_NATIONAL_BANKING_INSTITUTIONS['IT'],
  corporationFormationOffice: G20_CORPORATION_FORMATION_OFFICES['IT'],
  newsOutlets: G20_NEWS_OUTLETS['IT'],
  notableUniversities: G20_NOTABLE_UNIVERSITIES['IT'],
  mainExportCommodities: G20_MAIN_EXPORT_COMMODITIES['IT'],
  mainExportedElements: G20_MAIN_EXPORTED_ELEMENTS['IT'],
  rareEarths: G20_RARE_EARTHS['IT'],
  stockExchange: 'Euronext Milan (Borsa Italiana legacy)',
  bondMarkets: G20_BOND_MARKETS['IT'],
  mainInternationalAirport: G20_MAIN_INTERNATIONAL_AIRPORTS['IT'],
  mainInternationalSeaport: G20_MAIN_INTERNATIONAL_SEAPORTS['IT'],
  intellectualPropertyDepartments: G20_INTELLECTUAL_PROPERTY_DEPARTMENTS['IT'],
  securitiesExchangeCommission: G20_SECURITIES_EXCHANGE_COMMISSIONS['IT'],
}
