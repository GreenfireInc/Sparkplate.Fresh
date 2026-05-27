import type { SadcCountry } from './types'
import { SADC_DOMESTIC_COURIERS } from './domesticCouriersByIso'
import { SADC_NEWS_OUTLETS } from './newsOutletsByIso'
import { SADC_NOTABLE_UNIVERSITIES } from './notableUniversitiesByIso'
import { SADC_MAIN_EXPORT_COMMODITIES } from './mainExportCommoditiesByIso'
import { SADC_MAIN_EXPORTED_ELEMENTS } from './mainExportedElementsByIso'
import { SADC_RARE_EARTHS } from './rareEarthsByIso'
import { SADC_BOND_MARKETS } from './bondMarketsByIso'
import { SADC_MAIN_INTERNATIONAL_AIRPORTS } from './mainInternationalAirportsByIso'

export const malawi: SadcCountry = {
  name: 'Malawi',
  iso3166Alpha2: 'MW',
  capital: 'Lilongwe',
  coordinates: { latitude: -13.9626, longitude: 33.7741 },
  independence: '1964-07-06',
  topMajorCities: ['Lilongwe', 'Blantyre', 'Mzuzu', 'Zomba', 'Kasungu'],
  population: 21200000,
  mainLanguages: ['English', 'Chichewa', 'Chinyanja'],
  currency: 'Malawian kwacha (MWK)',
  timezone: 'Africa/Blantyre',
  foundingLeader: 'Hastings Banda (first Prime Minister)',
  currentLeader: 'President Lazarus Chakwera — verify',
  cryptocurrencyExchanges: ['Yellow Card context', 'OTC informal'],
  stablecoin: 'Informal USDT',
  domesticCourierServices: SADC_DOMESTIC_COURIERS['MW'],
  newsOutlets: SADC_NEWS_OUTLETS['MW'],
  notableUniversities: SADC_NOTABLE_UNIVERSITIES['MW'],
  mainExportCommodities: SADC_MAIN_EXPORT_COMMODITIES['MW'],
  mainExportedElements: SADC_MAIN_EXPORTED_ELEMENTS['MW'],
  rareEarths: SADC_RARE_EARTHS['MW'],
  stockExchange: 'Malawi Stock Exchange',
  bondMarkets: SADC_BOND_MARKETS['MW'],
  mainInternationalAirport: SADC_MAIN_INTERNATIONAL_AIRPORTS['MW'],
}
