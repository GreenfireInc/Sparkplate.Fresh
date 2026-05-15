import type { RcepCountry } from './types'
import { RCEP_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const vietnam: RcepCountry = {
  name: 'Vietnam',
  iso3166Alpha2: 'VN',
  capital: 'Hanoi',
  coordinates: { latitude: 21.0285, longitude: 105.8542 },
  independence:
    'Đổi Mới reform economy; ASEAN member since 1995; RCEP Party Jan 2022 wave manufacturing upside — informational',
  topMajorCities: ['Ho Chi Minh City', 'Hanoi', 'Da Nang', 'Haiphong', 'Can Tho'],
  population: 100300000,
  mainLanguages: ['Vietnamese', 'English', 'Khmer / Tay regional'],
  currency: 'Vietnamese dong (VND)',
  timezone: 'Asia/Ho_Chi_Minh',
  foundingLeader: 'Hồ Chí Minh reference — informational',
  currentLeader:
    'Party General Secretary — verify; State President — verify; Prime Minister — verify',
  cryptocurrencyExchanges: ['Retail trading prohibited; OTC informal mining episodes — informational'],
  stablecoin: 'Digital currency pilot narratives; predominant VND — informational',
  domesticCourierServices: RCEP_DOMESTIC_COURIERS['VN'],
  stockExchange: 'Ho Chi Minh City Stock Exchange (HOSE); HNX consolidated roadmap — informational',
}
