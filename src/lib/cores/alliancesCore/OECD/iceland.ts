import type { OecdCountry } from './types'
import { OECD_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { OECD_NEWS_OUTLETS } from './newsOutletsByIso'
import { OECD_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { OECD_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { OECD_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { OECD_RARE_EARTHS } from './rareEarthsByIso'
import { OECD_BOND_MARKETS } from './bondMarketsByIso'
import { OECD_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'
import { OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS } from './intellectualPropertyDepartmentsByIso'
import { OECD_SECURITIES_EXCHANGE_COMMISSIONS } from './securitiesExchangeCommissionByIso'

export const iceland: OecdCountry = {
  name: 'Iceland',
  iso3166Alpha2: 'IS',
  capital: 'Reykjavík',
  coordinates: { latitude: 64.1466, longitude: -21.9426 },
  independence:
    '1944 sovereignty from Danish crown; OECD founding member Sep 1961 — informational',
  topMajorCities: ['Reykjavík', 'Kópavogur', 'Hafnarfjörður', 'Akureyri', 'Reykjanesbær'],
  population: 400000,
  mainLanguages: ['Icelandic', 'English', 'Polish / Lithuanian (immigrant communities)'],
  currency: 'Icelandic króna (ISK)',
  timezone: 'Atlantic/Reykjavik',
  foundingLeader:
    'Jón Sigurðsson independence movement reference; post-2008 bank restructuring saga — informational',
  currentLeader: 'President Halla Tómasdóttir; Prime Minister — verify',
  cryptocurrencyExchanges: ['Nordic EU passport venues; OTC limited licensed retail — informational'],
  stablecoin: 'EUR/ISK pairs onshore thin; predominant USD-stable — informational',
  domesticCourierServices: OECD_DOMESTIC_COURIERS['IS'],
  newsOutlets: OECD_NEWS_OUTLETS['IS'],
  notableUniversities: OECD_NOTABLE_UNIVERSITIES['IS'],
  mainExportCommodities: OECD_MAIN_EXPORT_COMMODITIES['IS'],
  mainExportedElements: OECD_MAIN_EXPORTED_ELEMENTS['IS'],
  rareEarths: OECD_RARE_EARTHS['IS'],
  stockExchange: 'Nasdaq Iceland (equities thin vs fishing/tourism economies — informational)',
  bondMarkets: OECD_BOND_MARKETS['IS'],
  mainInternationalAirport: OECD_MAIN_INTERNATIONAL_AIRPORTS['IS'],
  intellectualPropertyDepartments: OECD_INTELLECTUAL_PROPERTY_DEPARTMENTS['IS'],
  securitiesExchangeCommission: OECD_SECURITIES_EXCHANGE_COMMISSIONS['IS'],
}
