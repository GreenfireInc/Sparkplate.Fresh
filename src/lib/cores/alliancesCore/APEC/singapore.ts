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

export const singapore: ApecCountry = {
  name: 'Singapore',
  iso3166Alpha2: 'SG',
  capital: 'Singapore (city-state)',
  coordinates: { latitude: 1.3521, longitude: 103.8198 },
  independence:
    '1965 separation Malaysia; hosts APEC Secretariat premises; transpacific chokepoint logistics finance hub — informational',
  topMajorCities: ['Singapore Central', 'Jurong West', 'Tampines', 'Woodlands', 'Sengkang'],
  population: 5920000,
  mainLanguages: ['English', 'Mandarin', 'Malay / Tamil official minorities'],
  currency: 'Singapore dollar (SGD)',
  timezone: 'Asia/Singapore',
  foundingLeader: 'Lee Kuan Yew developmental reference — informational',
  currentLeader: 'President Tharman Shanmugaratnam; Prime Minister Lawrence Wong — verify',
  cryptocurrencyExchanges: ['MAS DPT licensing regime flagship — informational'],
  stablecoin: 'MAS stable-value digital guidance flagship — informational',
  domesticCourierServices: APEC_DOMESTIC_COURIERS['SG'],
  newsOutlets: APEC_NEWS_OUTLETS['SG'],
  notableUniversities: APEC_NOTABLE_UNIVERSITIES['SG'],
  mainExportCommodities: APEC_MAIN_EXPORT_COMMODITIES['SG'],
  mainExportedElements: APEC_MAIN_EXPORTED_ELEMENTS['SG'],
  rareEarths: APEC_RARE_EARTHS['SG'],
  stockExchange: 'Singapore Exchange (SGX)',
  bondMarkets: APEC_BOND_MARKETS['SG'],
  intellectualPropertyDepartments: APEC_INTELLECTUAL_PROPERTY_DEPARTMENTS['SG'],
  securitiesExchangeCommission: APEC_SECURITIES_EXCHANGE_COMMISSIONS['SG'],
  mainInternationalAirport: APEC_MAIN_INTERNATIONAL_AIRPORTS['SG'],
}
