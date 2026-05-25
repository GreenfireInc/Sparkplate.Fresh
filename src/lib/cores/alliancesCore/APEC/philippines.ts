import type { ApecCountry } from './types'
import { APEC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { APEC_NEWS_OUTLETS } from './newsOutletsByIso'
import { APEC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { APEC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { APEC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { APEC_RARE_EARTHS } from './rareEarthsByIso'
import { APEC_BOND_MARKETS } from './bondMarketsByIso'

export const philippines: ApecCountry = {
  name: 'Philippines',
  iso3166Alpha2: 'PH',
  capital: 'Manila (capital region Metro Manila)',
  coordinates: { latitude: 14.5995, longitude: 120.9842 },
  independence:
    '1946 US-recognised independence; OFW-remittance transpacific diaspora stalwart ASEAN APEC member — informational',
  topMajorCities: ['Manila', 'Quezon City', 'Davao City', 'Cebu City', 'Zamboanga City'],
  population: 115000000,
  mainLanguages: ['Filipino', 'English', 'Cebuano / Ilocano regional'],
  currency: 'Philippine peso (PHP)',
  timezone: 'Asia/Manila',
  foundingLeader: 'Fidel Ramos APEC Manila host-cycle reference — informational',
  currentLeader: 'President Ferdinand Marcos Jr. — verify',
  cryptocurrencyExchanges: ['BSP VASP registry evolution — informational'],
  stablecoin: 'PHP pilots; USDT remittance overlays — informational',
  domesticCourierServices: APEC_DOMESTIC_COURIERS['PH'],
  newsOutlets: APEC_NEWS_OUTLETS['PH'],
  notableUniversities: APEC_NOTABLE_UNIVERSITIES['PH'],
  mainExportCommodities: APEC_MAIN_EXPORT_COMMODITIES['PH'],
  mainExportedElements: APEC_MAIN_EXPORTED_ELEMENTS['PH'],
  rareEarths: APEC_RARE_EARTHS['PH'],
  stockExchange: 'Philippine Stock Exchange (PSE)',
  bondMarkets: APEC_BOND_MARKETS['PH'],
}
