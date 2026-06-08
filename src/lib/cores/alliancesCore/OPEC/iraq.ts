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

export const iraq: OpecCountry = {
  name: 'Iraq',
  iso3166Alpha2: 'IQ',
  capital: 'Baghdad',
  coordinates: { latitude: 33.3152, longitude: 44.3661 },
  independence:
    '1932 Kingdom / 1958 republic lineages; post-2003 federal Iraq; OPEC founding member Sep 1960 — informational',
  topMajorCities: ['Baghdad', 'Basra', 'Mosul', 'Erbil', 'Najaf'],
  population: 46000000,
  mainLanguages: ['Arabic', 'Kurdish (KRG region)', 'Turkmen / Syriac communities'],
  currency: 'Iraqi dinar (IQD)',
  timezone: 'Asia/Baghdad',
  foundingLeader: 'Abdul Karim Kassem-era nationalisation prelude — informational',
  currentLeader:
    'President Abdul Latif Rashid — verify; Prime Minister Mohammed Shia al-Sudani — verify coalition',
  cryptocurrencyExchanges: ['CBI cautious posture; OTC informal dollarisation — informational'],
  stablecoin: 'USD settlement oil exports; IQD volatility — informational',
  domesticCourierServices: OPEC_DOMESTIC_COURIERS['IQ'],
  domesticPostService: OPEC_DOMESTIC_POST_SERVICES['IQ'],
  nationalBankingInstitutions: OPEC_NATIONAL_BANKING_INSTITUTIONS['IQ'],
  corporationFormationOffice: OPEC_CORPORATION_FORMATION_OFFICES['IQ'],
  newsOutlets: OPEC_NEWS_OUTLETS['IQ'],
  notableUniversities: OPEC_NOTABLE_UNIVERSITIES['IQ'],
  mainExportCommodities: OPEC_MAIN_EXPORT_COMMODITIES['IQ'],
  mainExportedElements: OPEC_MAIN_EXPORTED_ELEMENTS['IQ'],
  rareEarths: OPEC_RARE_EARTHS['IQ'],
  stockExchange: 'Iraq Stock Exchange Baghdad (liquidity episodic — informational)',
  bondMarkets: OPEC_BOND_MARKETS['IQ'],
  mainInternationalAirport: OPEC_MAIN_INTERNATIONAL_AIRPORTS['IQ'],
  mainInternationalSeaport: OPEC_MAIN_INTERNATIONAL_SEAPORTS['IQ'],
  intellectualPropertyDepartments: OPEC_INTELLECTUAL_PROPERTY_DEPARTMENTS['IQ'],
  securitiesExchangeCommission: OPEC_SECURITIES_EXCHANGE_COMMISSIONS['IQ'],
}
