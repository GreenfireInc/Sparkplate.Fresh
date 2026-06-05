import type { IgadCountry } from './types'
import { IGAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { IGAD_NEWS_OUTLETS } from './newsOutletsByIso'
import { IGAD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { IGAD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { IGAD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { IGAD_RARE_EARTHS } from './rareEarthsByIso'
import { IGAD_BOND_MARKETS } from './bondMarketsByIso'
import { IGAD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { IGAD_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { IGAD_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const ethiopia: IgadCountry = {
  name: 'Ethiopia',
  iso3166Alpha2: 'ET',
  capital: 'Addis Ababa',
  coordinates: { latitude: 9.032, longitude: 38.7469 },
  independence:
    'Italian occupation ended empire restoration; IGADD founding state Jan 1986; Ethiopian federal republic continuity — informational',
  topMajorCities: ['Addis Ababa', 'Dire Dawa', 'Mekelle', 'Bahir Dar', 'Hawassa'],
  population: 129000000,
  mainLanguages: ['Amharic', 'Oromo', 'Tigrinya / Somali regional'],
  currency: 'Ethiopian birr (ETB); national bank monetary rule — informational',
  timezone: 'Africa/Addis_Ababa',
  foundingLeader: 'Mengistu Haile Mariam–era transition / Meles Zenawi regional integration reference — informational',
  currentLeader: 'Prime Minister Abiy Ahmed — verify; President (ceremonial) — verify',
  cryptocurrencyExchanges: ['Ethiopian Securities Exchange digital pilots; peer informal — informational'],
  stablecoin: 'ETB-referenced digital payments; CBDC study narratives — informational',
  domesticCourierServices: IGAD_DOMESTIC_COURIERS['ET'],
  newsOutlets: IGAD_NEWS_OUTLETS['ET'],
  notableUniversities: IGAD_NOTABLE_UNIVERSITIES['ET'],
  mainExportCommodities: IGAD_MAIN_EXPORT_COMMODITIES['ET'],
  mainExportedElements: IGAD_MAIN_EXPORTED_ELEMENTS['ET'],
  rareEarths: IGAD_RARE_EARTHS['ET'],
  stockExchange: 'Ethiopian Securities Exchange Addis debut-era listings — informational',
  bondMarkets: IGAD_BOND_MARKETS['ET'],
  mainInternationalAirport: IGAD_MAIN_INTERNATIONAL_AIRPORTS['ET'],
  intellectualPropertyDepartments: IGAD_INTELLECTUAL_PROPERTY_DEPARTMENTS['ET'],
  securitiesExchangeCommission: IGAD_SECURITIES_EXCHANGE_COMMISSIONS['ET'],
}
