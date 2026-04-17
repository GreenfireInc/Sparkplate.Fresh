import type { BricsCountry } from './types'

export const china: BricsCountry = {
  name: 'China',
  iso3166Alpha2: 'CN',
  bricsStatus: 'founding_member',
  capital: 'Beijing',
  coordinates: { latitude: 39.9042, longitude: 116.4074 },
  independence: '1949-10-01',
  topMajorCities: ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen', 'Chengdu'],
  population: 1410000000,
  mainLanguages: ['Standard Chinese (Mandarin)', 'Regional languages (e.g. Cantonese, Uyghur, Tibetan — regional use)', 'English (education and business)'],
  currency: 'Renminbi (CNY)',
  timezone: 'Asia/Shanghai',
  foundingLeader: 'Mao Zedong (PRC founding context — informational)',
  currentLeader: 'Xi Jinping (President; CPC General Secretary)',
  cryptocurrencyExchanges: ['Offshore access only for mainland residents; Hong Kong SAR has separate licensed venues — verify jurisdiction'],
  stablecoin: 'e-CNY pilot (central bank digital currency); private stablecoin trading restricted onshore',
  stockExchange: 'Shanghai Stock Exchange; Shenzhen Stock Exchange',
}
