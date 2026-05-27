import type { GccCountry } from './types'
import { GCC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { GCC_NEWS_OUTLETS } from './newsOutletsByIso'
import { GCC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { GCC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { GCC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { GCC_RARE_EARTHS } from './rareEarthsByIso'
import { GCC_BOND_MARKETS } from './bondMarketsByIso'
import { GCC_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const oman: GccCountry = {
  name: 'Oman',
  iso3166Alpha2: 'OM',
  capital: 'Muscat',
  coordinates: { latitude: 23.5859, longitude: 58.4059 },
  independence:
    'Treaty-mediated British withdrawal 1951 modernization; Sultanate continuity; GCC charter signatory 1981 — informational',
  topMajorCities: ['Muscat', 'Salalah', 'Seeb', 'Sohar', 'Nizwa'],
  population: 4800000,
  mainLanguages: ['Arabic', 'English', 'Urdu / Swahili (resident communities)'],
  currency: 'Omani rial (OMR); GCC monetary convergence dialogue — informational',
  timezone: 'Asia/Muscat',
  foundingLeader: 'Sultan Qaboos bin Said (GCC founding-era modernization reference — informational)',
  currentLeader: 'Sultan Haitham bin Tariq — verify; heir-apparent Crown Prince — verify',
  cryptocurrencyExchanges: ['CBO cautious licensing evolution; OTC regional — informational'],
  stablecoin: 'OMR dollar peg narratives; sovereign digital-payment pilots — informational',
  domesticCourierServices: GCC_DOMESTIC_COURIERS['OM'],
  newsOutlets: GCC_NEWS_OUTLETS['OM'],
  notableUniversities: GCC_NOTABLE_UNIVERSITIES['OM'],
  mainExportCommodities: GCC_MAIN_EXPORT_COMMODITIES['OM'],
  mainExportedElements: GCC_MAIN_EXPORTED_ELEMENTS['OM'],
  rareEarths: GCC_RARE_EARTHS['OM'],
  stockExchange: 'Muscat Stock Exchange',
  bondMarkets: GCC_BOND_MARKETS['OM'],
  mainInternationalAirport: GCC_MAIN_INTERNATIONAL_AIRPORTS['OM'],
}
