import type { BricsCountry } from './types'
import { BRICS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { BRICS_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { BRICS_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { BRICS_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { BRICS_NEWS_OUTLETS } from './newsOutletsByIso'
import { BRICS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { BRICS_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { BRICS_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { BRICS_RARE_EARTHS } from './rareEarthsByIso'
import { BRICS_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { BRICS_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { BRICS_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { BRICS_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const brazil: BricsCountry = {
  name: 'Brazil',
  iso3166Alpha2: 'BR',
  bricsStatus: 'founding_member',
  capital: 'Brasília',
  coordinates: { latitude: -15.7942, longitude: -47.8822 },
  independence: '1822-09-07',
  topMajorCities: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza'],
  population: 215000000,
  mainLanguages: ['Portuguese', 'Brazilian Sign Language (official recognition)', 'Indigenous languages (co-official in territories)'],
  currency: 'Brazilian real (BRL)',
  timezone: 'America/Sao_Paulo',
  foundingLeader: 'Pedro I (Emperor; independence from Portugal)',
  currentLeader: 'Luiz Inácio Lula da Silva (President)',
  cryptocurrencyExchanges: ['Mercado Bitcoin', 'Foxbit', 'Binance (P2P)', 'Regional OTC'],
  stablecoin: 'BRZ and BRL-pegged tokens on some platforms; USDT/USDC widely used in crypto markets',
  domesticCourierServices: BRICS_DOMESTIC_COURIERS['BR'],
  domesticPostService: BRICS_DOMESTIC_POST_SERVICES['BR'],
  nationalBankingInstitutions: BRICS_NATIONAL_BANKING_INSTITUTIONS['BR'],
  corporationFormationOffice: BRICS_CORPORATION_FORMATION_OFFICES['BR'],
  newsOutlets: BRICS_NEWS_OUTLETS['BR'],
  notableUniversities: BRICS_NOTABLE_UNIVERSITIES['BR'],
  mainExportCommodities: BRICS_MAIN_EXPORT_COMMODITIES['BR'],
  mainExportedElements: BRICS_MAIN_EXPORTED_ELEMENTS['BR'],
  rareEarths: BRICS_RARE_EARTHS['BR'],
  stockExchange: 'B3 — Brasil Bolsa Balcão',
  intellectualPropertyDepartments: BRICS_INTELLECTUAL_PROPERTY_DEPARTMENTS['BR'],
  securitiesExchangeCommission: BRICS_SECURITIES_EXCHANGE_COMMISSIONS['BR'],
  mainInternationalAirport: BRICS_MAIN_INTERNATIONAL_AIRPORTS['BR'],
  mainInternationalSeaport: BRICS_MAIN_INTERNATIONAL_SEAPORTS['BR'],
}
