import type { IgadCountry } from './types'
import { IGAD_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const somalia: IgadCountry = {
  name: 'Somalia',
  iso3166Alpha2: 'SO',
  capital: 'Mogadishu',
  coordinates: { latitude: 2.0469, longitude: 45.3182 },
  independence:
    '1960-07-01 Republic formation; IGADD founding state Jan 1986; federal Somalia restoration narrative — informational',
  topMajorCities: ['Mogadishu', 'Bosaso', 'Kismayo', 'Baidoa', 'Garowe'],
  population: 18000000,
  mainLanguages: ['Somali', 'Arabic', 'Italian legacy / English education'],
  currency: 'Somali shilling (SOS central bank efforts; USD widespread informal — informational)',
  timezone: 'Africa/Mogadishu',
  foundingLeader:
    'Siad Barre–era territorial state / post-2000 transitional-federal roadmap — informational',
  currentLeader: 'President Hassan Sheikh Mohamud — verify; Prime Minister — verify clan-federal bargains',
  cryptocurrencyExchanges: ['Hargeisa OTC informal; Mogadishu mobile-money predominance — informational'],
  stablecoin: 'USD/USDT hawala overlays; SOS thin banknote supply — informational',
  domesticCourierServices: IGAD_DOMESTIC_COURIERS['SO'],
  stockExchange: 'No substantive national equities exchange consolidated (subsidiary regional plans — informational)',
}
