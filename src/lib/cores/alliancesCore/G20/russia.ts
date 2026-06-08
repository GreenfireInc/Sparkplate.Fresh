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

export const russia: G20Country = {
  name: 'Russia',
  iso3166Alpha2: 'RU',
  capital: 'Moscow',
  coordinates: { latitude: 55.7558, longitude: 37.6176 },
  independence:
    '1991-12 Russian Federation succession to USSR; 1992 IMF accession; BRICS / G20 founding member (finance track 1999; 2013 Saint Petersburg leaders summit host) — informational',
  topMajorCities: ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Kazan'],
  population: 144000000,
  mainLanguages: ['Russian', 'Tatar / regional Turkic', 'English (business / tech)'],
  currency: 'Russian ruble (RUB)',
  timezone: 'Europe/Moscow',
  foundingLeader:
    'Boris Yeltsin (first Russian Federation president); Vladimir Putin (modern political reference — informational)',
  currentLeader: 'President Vladimir Putin; Prime Minister Mikhail Mishustin — verify',
  cryptocurrencyExchanges: ['Garantex (sanctioned context — informational)', 'Domestic OTC / P2P USDT corridors — informational'],
  stablecoin: 'Digital ruble Bank of Russia CBDC pilots; sanctions-era stablecoin payment narratives — informational',
  domesticCourierServices: G20_DOMESTIC_COURIERS['RU'],
  domesticPostService: G20_DOMESTIC_POST_SERVICES['RU'],
  nationalBankingInstitutions: G20_NATIONAL_BANKING_INSTITUTIONS['RU'],
  corporationFormationOffice: G20_CORPORATION_FORMATION_OFFICES['RU'],
  newsOutlets: G20_NEWS_OUTLETS['RU'],
  notableUniversities: G20_NOTABLE_UNIVERSITIES['RU'],
  mainExportCommodities: G20_MAIN_EXPORT_COMMODITIES['RU'],
  mainExportedElements: G20_MAIN_EXPORTED_ELEMENTS['RU'],
  rareEarths: G20_RARE_EARTHS['RU'],
  stockExchange: 'Moscow Exchange (MOEX)',
  bondMarkets: G20_BOND_MARKETS['RU'],
  mainInternationalAirport: G20_MAIN_INTERNATIONAL_AIRPORTS['RU'],
  mainInternationalSeaport: G20_MAIN_INTERNATIONAL_SEAPORTS['RU'],
  intellectualPropertyDepartments: G20_INTELLECTUAL_PROPERTY_DEPARTMENTS['RU'],
  securitiesExchangeCommission: G20_SECURITIES_EXCHANGE_COMMISSIONS['RU'],
}
