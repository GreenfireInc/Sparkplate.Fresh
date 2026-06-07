import type { ApecCountry } from './types'
import { APEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { APEC_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { APEC_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { APEC_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { APEC_NEWS_OUTLETS } from './newsOutletsByIso'
import { APEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { APEC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { APEC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { APEC_RARE_EARTHS } from './rareEarthsByIso'
import { APEC_BOND_MARKETS } from './bondMarketsByIso'
import { APEC_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { APEC_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { APEC_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { APEC_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const russia: ApecCountry = {
  name: 'Russia',
  iso3166Alpha2: 'RU',
  capital: 'Moscow',
  coordinates: { latitude: 55.7558, longitude: 37.6173 },
  independence:
    '1991 Russian Federation continuity; EurAsian Pacific Eastern vectors Vladivostok APEC linkage; sanction-screened trade overlays — informational',
  topMajorCities: ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Vladivostok'],
  population: 144000000,
  mainLanguages: ['Russian', 'Tatar regional', 'English business elite'],
  currency: 'Russian ruble (RUB FX volatility overlays — informational)',
  timezone: 'Europe/Moscow',
  foundingLeader: 'Yeltsin transition reference — informational',
  currentLeader: 'President Vladimir Putin — verify succession narratives',
  cryptocurrencyExchanges: ['Domestic licences thin vs sanctions; OTC mining episodes — informational'],
  stablecoin: 'RUB digital sandbox narratives predominant cashless push — informational',
  domesticCourierServices: APEC_DOMESTIC_COURIERS['RU'],
  domesticPostService: APEC_DOMESTIC_POST_SERVICES['RU'],
  nationalBankingInstitutions: APEC_NATIONAL_BANKING_INSTITUTIONS['RU'],
  corporationFormationOffice: APEC_CORPORATION_FORMATION_OFFICES['RU'],
  newsOutlets: APEC_NEWS_OUTLETS['RU'],
  notableUniversities: APEC_NOTABLE_UNIVERSITIES['RU'],
  mainExportCommodities: APEC_MAIN_EXPORT_COMMODITIES['RU'],
  mainExportedElements: APEC_MAIN_EXPORTED_ELEMENTS['RU'],
  rareEarths: APEC_RARE_EARTHS['RU'],
  stockExchange: 'Moscow Exchange (sanctions segregation vs Western indices — informational)',
  bondMarkets: APEC_BOND_MARKETS['RU'],
  intellectualPropertyDepartments: APEC_INTELLECTUAL_PROPERTY_DEPARTMENTS['RU'],
  securitiesExchangeCommission: APEC_SECURITIES_EXCHANGE_COMMISSIONS['RU'],
  mainInternationalAirport: APEC_MAIN_INTERNATIONAL_AIRPORTS['RU'],
  mainInternationalSeaport: APEC_MAIN_INTERNATIONAL_SEAPORTS['RU'],
}
