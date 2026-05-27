import type { EcowasCountry } from './types'
import { ECOWAS_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { ECOWAS_NEWS_OUTLETS } from './newsOutletsByIso'
import { ECOWAS_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { ECOWAS_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { ECOWAS_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { ECOWAS_RARE_EARTHS } from './rareEarthsByIso'
import { ECOWAS_BOND_MARKETS } from './bondMarketsByIso'
import { ECOWAS_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const ghana: EcowasCountry = {
  name: 'Ghana',
  iso3166Alpha2: 'GH',
  capital: 'Accra',
  coordinates: { latitude: 5.6037, longitude: -0.187 },
  independence: '1957-03-06',
  topMajorCities: ['Accra', 'Kumasi', 'Tamale', 'Takoradi', 'Ashaiman'],
  population: 34000000,
  mainLanguages: ['English', 'Akan', 'Ewe'],
  currency: 'Ghanaian cedi (GHS)',
  timezone: 'Africa/Accra',
  foundingLeader: 'Kwame Nkrumah (first Prime Minister / President)',
  currentLeader: 'President John Mahama — verify',
  cryptocurrencyExchanges: ['Yellow Card', 'Binance (P2P)', 'Quidax', 'Licensed VASP evolution'],
  stablecoin: 'USDT / USDC; Bank of Ghana eCedi CBDC pilots — verify',
  domesticCourierServices: ECOWAS_DOMESTIC_COURIERS['GH'],
  newsOutlets: ECOWAS_NEWS_OUTLETS['GH'],
  notableUniversities: ECOWAS_NOTABLE_UNIVERSITIES['GH'],
  mainExportCommodities: ECOWAS_MAIN_EXPORT_COMMODITIES['GH'],
  mainExportedElements: ECOWAS_MAIN_EXPORTED_ELEMENTS['GH'],
  rareEarths: ECOWAS_RARE_EARTHS['GH'],
  stockExchange: 'Ghana Stock Exchange (GSE)',
  bondMarkets: ECOWAS_BOND_MARKETS['GH'],
  mainInternationalAirport: ECOWAS_MAIN_INTERNATIONAL_AIRPORTS['GH'],
}
