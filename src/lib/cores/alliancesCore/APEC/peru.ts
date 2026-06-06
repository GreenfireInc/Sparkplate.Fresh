import type { ApecCountry } from './types'
import { APEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { APEC_NEWS_OUTLETS } from './newsOutletsByIso'
import { APEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { APEC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { APEC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { APEC_RARE_EARTHS } from './rareEarthsByIso'
import { APEC_BOND_MARKETS } from './bondMarketsByIso'
import { APEC_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { APEC_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { APEC_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const peru: ApecCountry = {
  name: 'Peru',
  iso3166Alpha2: 'PE',
  capital: 'Lima',
  coordinates: { latitude: -12.0464, longitude: -77.0428 },
  independence:
    '1824 independence lineage; copper-gold fisheries Pacific South America CPTPP overlapping APEC member — informational',
  topMajorCities: ['Lima', 'Arequipa', 'Trujillo', 'Chiclayo', 'Piura'],
  population: 34500000,
  mainLanguages: ['Spanish', 'Quechua', 'Aymara regional'],
  currency: 'Peruvian sol (PEN)',
  timezone: 'America/Lima',
  foundingLeader: 'Alan García / Fujimori eras contrast stabilization — informational',
  currentLeader: 'President — verify Peruvian presidential cycle turbulence',
  cryptocurrencyExchanges: ['Sunat regulatory overlays; OTC informal — informational'],
  stablecoin: 'USD informal predominant mining-export settlements — informational',
  domesticCourierServices: APEC_DOMESTIC_COURIERS['PE'],
  newsOutlets: APEC_NEWS_OUTLETS['PE'],
  notableUniversities: APEC_NOTABLE_UNIVERSITIES['PE'],
  mainExportCommodities: APEC_MAIN_EXPORT_COMMODITIES['PE'],
  mainExportedElements: APEC_MAIN_EXPORTED_ELEMENTS['PE'],
  rareEarths: APEC_RARE_EARTHS['PE'],
  stockExchange: 'Bolsa de Valores de Lima (Lima Stock Exchange)',
  bondMarkets: APEC_BOND_MARKETS['PE'],
  intellectualPropertyDepartments: APEC_INTELLECTUAL_PROPERTY_DEPARTMENTS['PE'],
  securitiesExchangeCommission: APEC_SECURITIES_EXCHANGE_COMMISSIONS['PE'],
  mainInternationalAirport: APEC_MAIN_INTERNATIONAL_AIRPORTS['PE'],
}
