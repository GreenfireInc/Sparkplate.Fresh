import type { RcepCountry } from './types'
import { RCEP_DOMESTIC_COURIERS } from './domesticCouriersByIso'

export const southKorea: RcepCountry = {
  name: 'South Korea',
  iso3166Alpha2: 'KR',
  capital: 'Seoul',
  coordinates: { latitude: 37.5665, longitude: 126.978 },
  independence:
    '1948 Republic of Korea lineage; RCEP Party (deposit ratification enabling entry Feb 2022 — informational)',
  topMajorCities: ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon'],
  population: 51700000,
  mainLanguages: ['Korean', 'English education', 'Chinese / Vietnamese (resident communities)'],
  currency: 'South Korean won (KRW)',
  timezone: 'Asia/Seoul',
  foundingLeader: 'Syngman Rhee state-formation reference; Park Chung-hee industrialisation — informational',
  currentLeader:
    'President — verify (Yoon / successor electoral cycle); Prime Minister — verify',
  cryptocurrencyExchanges: ['Upbit', 'Bithumb', 'FSC VASP registrations — informational'],
  stablecoin: 'KRW won-linked experimentation thin; predominant USDT OTC — informational',
  domesticCourierServices: RCEP_DOMESTIC_COURIERS['KR'],
  stockExchange: 'Korea Exchange KOSPI/KOSDAQ',
}
