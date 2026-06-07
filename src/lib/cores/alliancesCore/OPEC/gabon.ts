import type { OpecCountry } from './types'
import { OPEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OPEC_DOMESTIC_POST_SERVICES } from './domesticPostServicesByIso'
import { OPEC_NATIONAL_BANKING_INSTITUTIONS } from './nationalBankingInstitutionsByIso'
import { OPEC_CORPORATION_FORMATION_OFFICES } from './corporationFormationOfficesByIso'
import { OPEC_NEWS_OUTLETS } from './newsOutletsByIso'
import { OPEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OPEC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { OPEC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { OPEC_RARE_EARTHS } from './rareEarthsByIso'
import { OPEC_BOND_MARKETS } from './bondMarketsByIso'
import { OPEC_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { OPEC_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { OPEC_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'
import { OPEC_MAIN_INTERNATIONAL_SEAPORTS } from './mainInternationalSeaportsByIso'

export const gabon: OpecCountry = {
  name: 'Gabon',
  iso3166Alpha2: 'GA',
  capital: 'Libreville',
  coordinates: { latitude: 0.4162, longitude: 9.4673 },
  independence:
    '1960 independence from France; crude-dependent fiscal model; OPEC member (rejoined Jul 2016 after 1995 withdrawal) — informational',
  topMajorCities: ['Libreville', 'Port-Gentil', 'Franceville', 'Oyem', 'Moanda'],
  population: 2400000,
  mainLanguages: ['French', 'Fang', 'Myene / regional Bantu'],
  currency: 'Central African CFA franc (XAF)',
  timezone: 'Africa/Libreville',
  foundingLeader: "Léon M'ba / Omar Bongo reference (long-ruling continuity — informational)",
  currentLeader: 'President Brice Oligui Nguema — verify (transitional post-2023 cycle)',
  cryptocurrencyExchanges: ['Regional OTC; Gabonese banking USD clearance — informational'],
  stablecoin: 'XAF EUR peg; informal USDT — informational',
  domesticCourierServices: OPEC_DOMESTIC_COURIERS['GA'],
  domesticPostService: OPEC_DOMESTIC_POST_SERVICES['GA'],
  nationalBankingInstitutions: OPEC_NATIONAL_BANKING_INSTITUTIONS['GA'],
  corporationFormationOffice: OPEC_CORPORATION_FORMATION_OFFICES['GA'],
  newsOutlets: OPEC_NEWS_OUTLETS['GA'],
  notableUniversities: OPEC_NOTABLE_UNIVERSITIES['GA'],
  mainExportCommodities: OPEC_MAIN_EXPORT_COMMODITIES['GA'],
  mainExportedElements: OPEC_MAIN_EXPORTED_ELEMENTS['GA'],
  rareEarths: OPEC_RARE_EARTHS['GA'],
  stockExchange: 'Bourse Régionale des Valeurs Mobilières (BRVM context sub-regional — informational)',
  bondMarkets: OPEC_BOND_MARKETS['GA'],
  mainInternationalAirport: OPEC_MAIN_INTERNATIONAL_AIRPORTS['GA'],
  mainInternationalSeaport: OPEC_MAIN_INTERNATIONAL_SEAPORTS['GA'],
  intellectualPropertyDepartments: OPEC_INTELLECTUAL_PROPERTY_DEPARTMENTS['GA'],
  securitiesExchangeCommission: OPEC_SECURITIES_EXCHANGE_COMMISSIONS['GA'],
}
